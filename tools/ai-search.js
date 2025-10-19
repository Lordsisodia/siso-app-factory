#!/usr/bin/env node

/**
 * SISO App Factory - AI Search Tool
 *
 * Intelligent search for components and features
 * Takes natural language queries and returns ranked results
 */

const fs = require('fs')
const path = require('path')

// Load catalog
const catalogPath = path.join(__dirname, '../docs/ai-catalog.json')

if (!fs.existsSync(catalogPath)) {
  console.error('❌ Catalog not found. Run: npm run generate:metadata')
  process.exit(1)
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))

/**
 * Search for UI components
 */
function searchComponents(query) {
  const { type, visual_style, use_case, complexity, industry, tags } = parseQuery(query)

  let results = []

  // Get all components of specified type
  if (type && catalog.ui_components[type]) {
    results = catalog.ui_components[type].variations
  } else {
    // Search all component types
    results = Object.values(catalog.ui_components)
      .flatMap(cat => cat.variations)
  }

  // Filter and score
  results = results.map(component => ({
    ...component,
    score: scoreComponent(component, { visual_style, use_case, complexity, industry, tags })
  }))

  // Sort by score
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, 5) // Top 5
}

/**
 * Search for features
 */
function searchFeatures(query) {
  const { domain, problem, tags } = parseQuery(query)

  let results = []

  // Get features from domain
  if (domain && catalog.features[domain]) {
    results = catalog.features[domain]
  } else {
    // Search all domains
    results = Object.values(catalog.features).flat()
  }

  // Filter and score
  results = results.map(feature => ({
    ...feature,
    score: scoreFeature(feature, { problem, tags })
  }))

  // Sort by score
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, 3) // Top 3
}

/**
 * Parse natural language query into structured format
 */
function parseQuery(text) {
  if (typeof text !== 'string') return text // Already parsed

  const query = {
    type: null,
    domain: null,
    visual_style: null,
    use_case: null,
    complexity: null,
    industry: null,
    problem: null,
    tags: []
  }

  const lower = text.toLowerCase()

  // Detect component type
  const types = Object.keys(catalog.ui_components)
  types.forEach(type => {
    if (lower.includes(type) || lower.includes(type.slice(0, -1))) { // singular form
      query.type = type
    }
  })

  // Detect domain
  if (lower.includes('restaurant')) query.domain = 'restaurants'
  if (lower.includes('tour') || lower.includes('guide')) query.domain = 'tour-guides'
  if (lower.includes('bike') || lower.includes('rental')) query.domain = 'bike-rental'

  // Detect visual style
  if (lower.includes('premium') || lower.includes('luxury') || lower.includes('elegant')) {
    query.visual_style = 'premium'
  }
  if (lower.includes('minimal') || lower.includes('clean') || lower.includes('simple')) {
    query.visual_style = 'minimal'
  }
  if (lower.includes('bold') || lower.includes('vibrant')) {
    query.visual_style = 'bold'
  }

  // Detect use case
  if (lower.includes('hero')) query.use_case = 'hero'
  if (lower.includes('cta') || lower.includes('call to action') || lower.includes('call-to-action')) {
    query.use_case = 'cta'
  }
  if (lower.includes('form') || lower.includes('submit')) {
    query.use_case = 'form'
  }

  // Detect problem (for features)
  if (lower.includes('booking') || lower.includes('reservation')) {
    query.problem = 'booking'
    query.tags.push('booking', 'reservations')
  }
  if (lower.includes('payment') || lower.includes('stripe')) {
    query.problem = 'payment'
    query.tags.push('payment', 'stripe')
  }
  if (lower.includes('admin') || lower.includes('dashboard')) {
    query.problem = 'admin'
    query.tags.push('admin', 'dashboard')
  }

  return query
}

/**
 * Score component match
 */
function scoreComponent(component, query) {
  let score = 0

  // Visual style match (high weight)
  if (query.visual_style) {
    if (component.visual_style?.toLowerCase().includes(query.visual_style)) {
      score += 40
    }
  }

  // Use case match (high weight)
  if (query.use_case) {
    const useCaseMatch = component.use_cases?.some(uc =>
      uc.toLowerCase().includes(query.use_case.toLowerCase())
    ) || component.best_for?.some(bf =>
      bf.toLowerCase().includes(query.use_case.toLowerCase())
    )

    if (useCaseMatch) {
      score += 40
    }
  }

  // Industry fit (medium weight)
  if (query.industry && component.industry_fit) {
    const fit = component.industry_fit[query.industry] || 0
    score += fit * 20
  }

  // Complexity preference (prefer simple when no preference)
  if (component.complexity === 'simple') {
    score += 10
  }

  // Tag matches (low weight but additive)
  if (query.tags && query.tags.length > 0) {
    const tagMatches = query.tags.filter(tag =>
      component.tags?.includes(tag)
    ).length
    score += tagMatches * 5
  }

  return Math.min(score, 100) // Cap at 100
}

/**
 * Score feature match
 */
function scoreFeature(feature, query) {
  let score = 0

  // Problem match (high weight)
  if (query.problem) {
    const problemMatch = feature.solves?.some(s =>
      s.toLowerCase().includes(query.problem)
    )
    if (problemMatch) {
      score += 60
    }
  }

  // Tag matches
  if (query.tags && query.tags.length > 0) {
    const tagMatches = query.tags.filter(tag =>
      feature.tags?.includes(tag)
    ).length
    score += tagMatches * 10
  }

  // Maturity bonus (production-ready is better)
  if (feature.maturity === 'production-ready') {
    score += 20
  }

  return Math.min(score, 100)
}

/**
 * Format results for display
 */
function formatResults(results, isFeature = false) {
  if (results.length === 0) {
    return '\n❌ No results found\n'
  }

  let output = '\n'

  results.forEach((result, index) => {
    const rank = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`

    output += `${rank} **${result.name}** (${Math.round(result.score)}% match)\n`

    if (isFeature) {
      output += `   Domain: @siso/${result.domain}\n`
      output += `   Solves: ${result.solves?.join(', ')}\n`
      output += `   Path: ${result.path}\n`
    } else {
      output += `   Style: ${result.visual_style}\n`
      output += `   Best for: ${result.best_for?.slice(0, 2).join(', ')}\n`
      output += `   Path: ${result.path}\n`
    }

    if (index === 0 && result.examples && result.examples.length > 0) {
      output += `\n   💡 Example:\n`
      output += `   ${result.examples[0].code}\n`
    }

    output += '\n'
  })

  return output
}

/**
 * Main search function
 */
function search(query) {
  console.log(`\n🔍 Searching for: "${query}"\n`)

  const parsedQuery = parseQuery(query)
  console.log('📋 Detected:', JSON.stringify(parsedQuery, null, 2), '\n')

  // Search components
  const componentResults = searchComponents(parsedQuery)

  if (componentResults.length > 0) {
    console.log('🎨 UI Components Found:')
    console.log(formatResults(componentResults, false))
  }

  // Search features
  const featureResults = searchFeatures(parsedQuery)

  if (featureResults.length > 0) {
    console.log('🚀 Features Found:')
    console.log(formatResults(featureResults, true))
  }

  if (componentResults.length === 0 && featureResults.length === 0) {
    console.log('\n❌ No results found. Try a different query.\n')
  }
}

// CLI usage
if (require.main === module) {
  const query = process.argv.slice(2).join(' ')

  if (!query) {
    console.log(`
SISO App Factory - AI Search

Usage:
  npm run search "I need a button for restaurant hero"
  npm run search "I need a booking system for tours"

Examples:
  npm run search "premium button for CTA"
  npm run search "minimal accordion for FAQ"
  npm run search "booking system with deposits"
    `)
    process.exit(0)
  }

  search(query)
}

module.exports = { searchComponents, searchFeatures, search }
