#!/usr/bin/env node

/**
 * SISO App Factory - Bulk Component Importer
 *
 * Imports components from source libraries into organized structure
 * Auto-generates metadata and catalog entries
 */

const fs = require('fs')
const path = require('path')

const SOURCE_ROOT = path.join(__dirname, '../../SISO-UI-Library')
const DEST_ROOT = path.join(__dirname, '../packages/ui/src/primitives')

// Component type detection patterns - Match all 39 categories from restaurant-ui-library/docs/imports
const COMPONENT_TYPES = {
  // Must be checked in order (most specific first)
  'ai-chats': /ai.*chat|chat.*ai|conversation|messaging/i,
  'sign-ins': /sign.*in|login.*form|auth.*login/i,
  'sign-ups': /sign.*up|register.*form|auth.*register/i,
  'file-uploads': /file.*upload|upload.*file|file.*input/i,
  'file-trees': /file.*tree|tree.*view|tree.*explorer/i,
  'date-pickers': /date.*picker|datepicker|time.*picker/i,
  'empty-states': /empty.*state|no.*data|placeholder.*state/i,
  'radio-groups': /radio.*group|radio/i,
  'spinner-loaders': /spinner|loader|loading(?!.*state)|spinner.*loader/i,
  'text-areas': /textarea|text.*area/i,

  // Standard categories
  accordions: /accordion|collapse|collapsible/i,
  alerts: /alert(?!.*dialog)/i,
  avatars: /avatar/i,
  badges: /badge(?!.*avatar)/i,
  buttons: /button/i,
  calendars: /calendar(?!.*picker)/i,
  cards: /card/i,
  carousels: /carousel|swiper/i,
  checkboxes: /checkbox/i,
  dropdowns: /dropdown(?!.*menu)|listbox/i,
  forms: /form(?!.*field|.*label)/i,
  icons: /icon(?!.*button)/i,
  inputs: /input(?!.*otp)|textfield|text-field/i,
  links: /link(?!.*preview)/i,
  menus: /menu|menubar|navigation.*menu/i,
  notifications: /notification(?!s)/i,
  numbers: /number.*display|stat.*card|metric|counter/i,
  paginations: /pagination/i,
  popovers: /popover/i,
  selects: /select|combobox/i,
  sidebars: /sidebar|side.*nav/i,
  sliders: /slider|range(?!.*picker)/i,
  tables: /table|datagrid|data.*grid|data.*table/i,
  tabs: /tabs|tab(?!le)/i,
  tags: /tag(?!.*input|.*group)/i,
  toasts: /toast|toaster/i,
  toggles: /toggle|switch/i,
  tooltips: /tooltip/i,

  // Additional
  modals: /modal|dialog|alert.*dialog/i,
  progress: /progress|circular.*progress/i,
  skeletons: /skeleton/i,
  drawers: /drawer|sheet/i,
  breadcrumbs: /breadcrumb/i,
  charts: /chart|graph|visualization/i,
  heroes: /hero(?!.*section)/i,
  'hero-sections': /hero.*section/i
}

// Visual style detection from library names
const LIBRARY_STYLES = {
  'shadcn-ui': 'minimal, clean, professional',
  'magic-ui': 'modern, animated, premium',
  'aceternity-ui': 'premium, animated, modern',
  'chakra-ui': 'accessible, flexible, clean',
  'mui-library': 'material, professional, standard',
  'mantine-library': 'modern, accessible, feature-rich',
  'nextui-library': 'modern, beautiful, accessible',
  'ant-design-library': 'enterprise, professional, comprehensive',
  'daisyui-library': 'playful, colorful, component-rich',
  'flowbite-ui': 'modern, clean, tailwind-based'
}

/**
 * Detect component type from filename
 */
function detectComponentType(filename) {
  const lower = filename.toLowerCase()

  // Check patterns in order (most specific first)
  for (const [type, pattern] of Object.entries(COMPONENT_TYPES)) {
    if (pattern.test(lower)) {
      // Already plural categories
      if (type.endsWith('s') || type.includes('-')) {
        return type
      }
      // Singularize to match folder names
      return type + 's'
    }
  }

  return 'misc' // Fallback for truly misc components
}

/**
 * Generate default metadata for component
 */
function generateMetadata(componentName, componentType, sourceName, filePath) {
  const id = `${sourceName}-${componentName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const style = LIBRARY_STYLES[sourceName] || 'standard, clean'

  return {
    id,
    name: componentName,
    description: `${componentName} component from ${sourceName}`,
    type: componentType.slice(0, -1), // Remove 's' (buttons → button)
    category: 'primitive',

    visual_style: style,
    visual_weight: 'medium',
    aesthetic: 'professional',

    best_for: [getBestFor(componentType)],
    use_cases: [],
    avoid_for: [],

    complexity: 'simple',
    customization: 'high',
    accessibility: 'AA compliant',

    animation: sourceName.includes('magic') || sourceName.includes('aceternity'),
    responsive: true,
    dark_mode: true,

    source: sourceName,
    source_file: filePath,

    tags: [
      componentType.slice(0, -1),
      componentName.toLowerCase(),
      sourceName
    ],

    industry_fit: {
      restaurants: 0.9,
      'tour-guides': 0.9,
      'bike-rental': 0.9,
      general: 1.0
    },

    created_at: new Date().toISOString(),
    auto_generated: true
  }
}

function getBestFor(componentType) {
  const bestForMap = {
    buttons: 'User actions, CTAs, form submissions',
    cards: 'Content display, grid items, information containers',
    inputs: 'Form fields, user input, data entry',
    accordions: 'FAQs, collapsible content, space-saving layouts',
    modals: 'Dialogs, confirmations, focused interactions',
    selects: 'Dropdown selections, option picking',
    checkboxes: 'Multi-select options, toggles',
    radios: 'Single-select options',
    toggles: 'On/off states, feature toggles',
    sliders: 'Range selection, value adjustment',
    tables: 'Data display, lists, grids',
    tabs: 'Content organization, navigation',
    badges: 'Labels, status indicators, counts',
    avatars: 'User profiles, identity display',
    alerts: 'Notifications, messages, feedback',
    calendars: 'Date selection, scheduling',
    charts: 'Data visualization, analytics',
    forms: 'Data collection, user input',
    menus: 'Navigation, actions, options',
    tooltips: 'Help text, additional info'
  }

  return bestForMap[componentType] || 'General use'
}

/**
 * Import a single component file
 */
function importComponent(sourceFile, sourceName) {
  const filename = path.basename(sourceFile, path.extname(sourceFile))
  const componentType = detectComponentType(filename)
  const componentName = filename
    .replace(/\.(tsx|jsx|ts|js)$/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()

  // Create destination structure
  const destDir = path.join(DEST_ROOT, componentType, `${sourceName}-${componentName}`)

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  // Copy component file
  const destComponentFile = path.join(destDir, 'component' + path.extname(sourceFile))
  fs.copyFileSync(sourceFile, destComponentFile)

  // Generate metadata
  const metadata = generateMetadata(componentName, componentType, sourceName, sourceFile)
  fs.writeFileSync(
    path.join(destDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  )

  // Create index.ts
  const indexContent = `export * from './component'\n`
  fs.writeFileSync(path.join(destDir, 'index.ts'), indexContent)

  return { componentType, componentName, id: metadata.id }
}

/**
 * Import all components from a library
 */
function importLibrary(libraryName) {
  const libraryPath = path.join(SOURCE_ROOT, libraryName)

  if (!fs.existsSync(libraryPath)) {
    console.log(`❌ Library not found: ${libraryName}`)
    return { imported: 0, skipped: 0 }
  }

  console.log(`\n📦 Importing from: ${libraryName}`)

  const stats = { imported: 0, skipped: 0, byType: {} }

  // Find all component files
  const componentFiles = findComponentFiles(libraryPath)

  console.log(`   Found ${componentFiles.length} component files`)

  componentFiles.forEach(file => {
    try {
      const result = importComponent(file, libraryName)

      stats.imported++
      stats.byType[result.componentType] = (stats.byType[result.componentType] || 0) + 1

      process.stdout.write('.')
    } catch (error) {
      stats.skipped++
      // console.error(`   ⚠️  Skipped ${path.basename(file)}: ${error.message}`)
    }
  })

  console.log(`\n   ✅ Imported: ${stats.imported}`)
  console.log(`   ⚠️  Skipped: ${stats.skipped}`)
  console.log(`   📊 By type:`, stats.byType)

  return stats
}

/**
 * Find all component files in a directory
 */
function findComponentFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList

  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)

    // Skip node_modules, dist, .git
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file.startsWith('.')) {
      return
    }

    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findComponentFiles(filePath, fileList)
    } else if (/\.(tsx|jsx)$/.test(file) && !file.includes('.test.') && !file.includes('.spec.')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * Update category index files
 */
function updateCategoryIndices() {
  const typeDirs = fs.readdirSync(DEST_ROOT)

  typeDirs.forEach(typeDir => {
    const typePath = path.join(DEST_ROOT, typeDir)

    if (!fs.statSync(typePath).isDirectory()) return

    // Get all component folders
    const components = fs.readdirSync(typePath).filter(name => {
      const componentPath = path.join(typePath, name)
      return fs.statSync(componentPath).isDirectory()
    })

    // Create index.ts
    const indexContent = components
      .map(comp => `export * from './${comp}'`)
      .join('\n') + '\n'

    fs.writeFileSync(path.join(typePath, 'index.ts'), indexContent)
  })

  // Update primitives index
  const primitivesIndex = typeDirs
    .filter(dir => {
      const dirPath = path.join(DEST_ROOT, dir)
      return fs.statSync(dirPath).isDirectory()
    })
    .map(dir => `export * from './${dir}'`)
    .join('\n') + '\n'

  fs.writeFileSync(path.join(DEST_ROOT, 'index.ts'), primitivesIndex)

  console.log('\n✅ Updated all index files')
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
SISO App Factory - Bulk Importer

Usage:
  node bulk-import.js <library-name>
  node bulk-import.js --all

Examples:
  node bulk-import.js shadcn-ui
  node bulk-import.js magic-ui
  node bulk-import.js --all

Available libraries:
  ${getAvailableLibraries().join(', ')}
    `)
    return
  }

  if (args[0] === '--all') {
    console.log('🚀 Importing from ALL libraries...\n')

    const libraries = getAvailableLibraries()
    const totalStats = { imported: 0, skipped: 0 }

    libraries.forEach(lib => {
      const stats = importLibrary(lib)
      totalStats.imported += stats.imported
      totalStats.skipped += stats.skipped
    })

    console.log('\n' + '='.repeat(60))
    console.log('📊 TOTAL IMPORT STATS:')
    console.log(`   ✅ Imported: ${totalStats.imported} components`)
    console.log(`   ⚠️  Skipped: ${totalStats.skipped} files`)
    console.log('='.repeat(60) + '\n')

    updateCategoryIndices()

    console.log('🔄 Generating catalog...')
    require('./generate-metadata.js').generateCatalog()

  } else {
    const libraryName = args[0]
    const stats = importLibrary(libraryName)

    updateCategoryIndices()

    console.log('\n🔄 Generating catalog...')
    require('./generate-metadata.js').generateCatalog()
  }
}

function getAvailableLibraries() {
  if (!fs.existsSync(SOURCE_ROOT)) return []

  return fs.readdirSync(SOURCE_ROOT)
    .filter(name => {
      const libPath = path.join(SOURCE_ROOT, name)
      return fs.statSync(libPath).isDirectory() &&
        !name.startsWith('.') &&
        !name.includes('app-factory') &&
        !['docs', 'tools', 'node_modules'].includes(name)
    })
}

// Run
if (require.main === module) {
  main()
}

module.exports = { importComponent, importLibrary }
