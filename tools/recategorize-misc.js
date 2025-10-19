#!/usr/bin/env node

/**
 * Recategorize components in misc/ folder into proper categories
 */

const fs = require('fs')
const path = require('path')

const MISC_DIR = path.join(__dirname, '../packages/ui/src/primitives/misc')
const PATTERNS_DIR = path.join(__dirname, '../packages/ui/src/patterns')
const PRIMITIVES_DIR = path.join(__dirname, '../packages/ui/src/primitives')

// Create patterns directory structure
const PATTERN_CATEGORIES = {
  'layouts': /layout|header|footer|container|wrapper/i,
  'sections': /section|feature|how-it-works|info|pricing/i,
  'backgrounds': /background|aurora|gradient-bg/i,
  'lists': /list|item|collection/i,
  'editors': /editor|code-editor|preview/i,
  'navigation': /nav|navigation(?!.*menu)|sidebar(?!$)/i,
  'banners': /banner|announcement/i,
  'animations': /animation|animated|motion/i,
  'providers': /provider|context/i,
  'utilities': /util|helper|hook|use-/i
}

// Components that should move to patterns
function categorizeMiscComponent(name) {
  const lower = name.toLowerCase()

  for (const [category, pattern] of Object.entries(PATTERN_CATEGORIES)) {
    if (pattern.test(lower)) {
      return { type: 'pattern', category }
    }
  }

  // Stays in primitives/misc
  return { type: 'primitive', category: 'misc' }
}

function recategorize() {
  if (!fs.existsSync(MISC_DIR)) {
    console.log('❌ misc directory not found')
    return
  }

  const miscComponents = fs.readdirSync(MISC_DIR).filter(name => {
    const componentPath = path.join(MISC_DIR, name)
    return fs.statSync(componentPath).isDirectory()
  })

  console.log(`\n🔍 Found ${miscComponents.length} components in misc/\n`)

  const stats = {
    moved_to_patterns: 0,
    stayed_in_misc: 0,
    by_pattern_category: {}
  }

  // Create patterns directory if doesn't exist
  if (!fs.existsSync(PATTERNS_DIR)) {
    fs.mkdirSync(PATTERNS_DIR, { recursive: true })
  }

  miscComponents.forEach(componentName => {
    const result = categorizeMiscComponent(componentName)

    if (result.type === 'pattern') {
      // Move to patterns
      const patternCategoryDir = path.join(PATTERNS_DIR, result.category)

      if (!fs.existsSync(patternCategoryDir)) {
        fs.mkdirSync(patternCategoryDir, { recursive: true })
      }

      const sourcePath = path.join(MISC_DIR, componentName)
      const destPath = path.join(patternCategoryDir, componentName)

      // Move the component
      fs.renameSync(sourcePath, destPath)

      stats.moved_to_patterns++
      stats.by_pattern_category[result.category] = (stats.by_pattern_category[result.category] || 0) + 1

      console.log(`  ✅ Moved ${componentName} → patterns/${result.category}/`)
    } else {
      stats.stayed_in_misc++
    }
  })

  console.log(`\n📊 Recategorization Complete:\n`)
  console.log(`  Moved to patterns: ${stats.moved_to_patterns}`)
  console.log(`  Stayed in misc: ${stats.stayed_in_misc}`)
  console.log(`\n  Pattern categories:`)
  Object.entries(stats.by_pattern_category).forEach(([cat, count]) => {
    console.log(`    - ${cat}: ${count}`)
  })

  // Create index files for pattern categories
  Object.keys(stats.by_pattern_category).forEach(category => {
    const categoryDir = path.join(PATTERNS_DIR, category)
    const components = fs.readdirSync(categoryDir).filter(name =>
      fs.statSync(path.join(categoryDir, name)).isDirectory()
    )

    const indexContent = components.map(comp => `export * from './${comp}'`).join('\n') + '\n'
    fs.writeFileSync(path.join(categoryDir, 'index.ts'), indexContent)
  })

  // Create main patterns index
  const patternCategories = fs.readdirSync(PATTERNS_DIR).filter(name => {
    const catPath = path.join(PATTERNS_DIR, name)
    return fs.statSync(catPath).isDirectory()
  })

  const patternsIndex = patternCategories.map(cat => `export * from './${cat}'`).join('\n') + '\n'
  fs.writeFileSync(path.join(PATTERNS_DIR, 'index.ts'), patternsIndex)

  console.log(`\n✅ Created index files for ${patternCategories.length} pattern categories\n`)

  return stats
}

if (require.main === module) {
  recategorize()
}

module.exports = { recategorize }
