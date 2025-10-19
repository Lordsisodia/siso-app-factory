#!/usr/bin/env node

/**
 * SISO App Factory - Metadata Generator
 *
 * Scans all packages for metadata.json files and generates
 * a master AI catalog for intelligent component/feature search
 */

const fs = require('fs')
const path = require('path')

// Find all metadata.json files recursively
function findMetadataFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip node_modules and dist
      if (file !== 'node_modules' && file !== 'dist') {
        findMetadataFiles(filePath, fileList)
      }
    } else if (file === 'metadata.json') {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Main catalog generation
function generateCatalog() {
  console.log('🔍 Scanning for metadata files...\n')

  const packagesDir = path.join(__dirname, '../packages')
  const metadataFiles = findMetadataFiles(packagesDir)

  console.log(`Found ${metadataFiles.length} metadata files:\n`)
  metadataFiles.forEach(file => {
    console.log(`  ✅ ${path.relative(packagesDir, file)}`)
  })

  // Initialize catalog
  const catalog = {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    component_count: 0,
    feature_count: 0,

    ui_components: {},
    features: {},

    search_index: {
      by_type: {},
      by_visual_style: {},
      by_use_case: {},
      by_complexity: {},
      by_source: {},
      by_tag: {},
      by_industry: {}
    }
  }

  // Process each metadata file
  metadataFiles.forEach(file => {
    const metadata = JSON.parse(fs.readFileSync(file, 'utf8'))
    const relativePath = path.relative(packagesDir, path.dirname(file))
    const parts = relativePath.split(path.sep)

    // Determine if this is a UI component or feature
    // Path format: ui/src/primitives/buttons/solid-button
    const isUIComponent = parts[0] === 'ui' && parts[2] === 'primitives'
    const isFeature = parts.includes('features')

    if (isUIComponent) {
      // UI Component
      const componentType = parts[3] // e.g., "buttons"

      if (!catalog.ui_components[componentType]) {
        catalog.ui_components[componentType] = {
          count: 0,
          variations: []
        }
      }

      catalog.ui_components[componentType].variations.push({
        ...metadata,
        path: relativePath
      })

      catalog.ui_components[componentType].count++
      catalog.component_count++

      // Build search indices
      buildUIComponentIndices(metadata, catalog.search_index)

    } else if (isFeature) {
      // Feature
      const domain = parts[0] // e.g., "restaurants", "tour-guides"

      if (!catalog.features[domain]) {
        catalog.features[domain] = []
      }

      catalog.features[domain].push({
        ...metadata,
        path: relativePath
      })

      catalog.feature_count++

      // Build search indices
      buildFeatureIndices(metadata, catalog.search_index, domain)
    }
  })

  // Write catalog
  const catalogPath = path.join(__dirname, '../docs/ai-catalog.json')
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2))

  console.log('\n📊 Catalog Generated:\n')
  console.log(`  Component count: ${catalog.component_count}`)
  console.log(`  Feature count: ${catalog.feature_count}`)
  console.log(`  UI component types: ${Object.keys(catalog.ui_components).length}`)
  console.log(`  Domains: ${Object.keys(catalog.features).length}`)
  console.log(`\n  Search indices:`)
  console.log(`    - by_type: ${Object.keys(catalog.search_index.by_type).length} types`)
  console.log(`    - by_visual_style: ${Object.keys(catalog.search_index.by_visual_style).length} styles`)
  console.log(`    - by_use_case: ${Object.keys(catalog.search_index.by_use_case).length} use cases`)
  console.log(`    - by_tag: ${Object.keys(catalog.search_index.by_tag).length} tags`)
  console.log(`\n✅ Catalog written to: ${catalogPath}\n`)

  return catalog
}

function buildUIComponentIndices(metadata, searchIndex) {
  // Type index
  if (metadata.type) {
    if (!searchIndex.by_type[metadata.type]) {
      searchIndex.by_type[metadata.type] = []
    }
    searchIndex.by_type[metadata.type].push(metadata.id)
  }

  // Visual style index
  if (metadata.visual_style) {
    const styles = metadata.visual_style.split(',').map(s => s.trim())
    styles.forEach(style => {
      if (!searchIndex.by_visual_style[style]) {
        searchIndex.by_visual_style[style] = []
      }
      searchIndex.by_visual_style[style].push(metadata.id)
    })
  }

  // Use case index
  if (metadata.use_cases) {
    metadata.use_cases.forEach(useCase => {
      if (!searchIndex.by_use_case[useCase]) {
        searchIndex.by_use_case[useCase] = []
      }
      searchIndex.by_use_case[useCase].push(metadata.id)
    })
  }

  // Complexity index
  if (metadata.complexity) {
    if (!searchIndex.by_complexity[metadata.complexity]) {
      searchIndex.by_complexity[metadata.complexity] = []
    }
    searchIndex.by_complexity[metadata.complexity].push(metadata.id)
  }

  // Source index
  if (metadata.source) {
    if (!searchIndex.by_source[metadata.source]) {
      searchIndex.by_source[metadata.source] = []
    }
    searchIndex.by_source[metadata.source].push(metadata.id)
  }

  // Tag index
  if (metadata.tags) {
    metadata.tags.forEach(tag => {
      if (!searchIndex.by_tag[tag]) {
        searchIndex.by_tag[tag] = []
      }
      searchIndex.by_tag[tag].push(metadata.id)
    })
  }

  // Industry fit index
  if (metadata.industry_fit) {
    Object.keys(metadata.industry_fit).forEach(industry => {
      if (!searchIndex.by_industry[industry]) {
        searchIndex.by_industry[industry] = []
      }
      searchIndex.by_industry[industry].push(metadata.id)
    })
  }
}

function buildFeatureIndices(metadata, searchIndex, domain) {
  // Tag index
  if (metadata.tags) {
    metadata.tags.forEach(tag => {
      if (!searchIndex.by_tag[tag]) {
        searchIndex.by_tag[tag] = []
      }
      searchIndex.by_tag[tag].push(metadata.id)
    })
  }

  // Use case index (from "solves")
  if (metadata.solves) {
    metadata.solves.forEach(problem => {
      if (!searchIndex.by_use_case[problem]) {
        searchIndex.by_use_case[problem] = []
      }
      searchIndex.by_use_case[problem].push(metadata.id)
    })
  }

  // Industry index
  if (!searchIndex.by_industry[domain]) {
    searchIndex.by_industry[domain] = []
  }
  searchIndex.by_industry[domain].push(metadata.id)
}

// Run
if (require.main === module) {
  try {
    generateCatalog()
  } catch (error) {
    console.error('❌ Error generating catalog:', error.message)
    process.exit(1)
  }
}

module.exports = { generateCatalog }
