#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const filePath = resolve(process.cwd(), 'docs/metrics/roi-dashboard.json')

if (!existsSync(filePath)) {
  console.error('❌ Missing docs/metrics/roi-dashboard.json. Create it to track value/time-savings metrics.')
  process.exit(1)
}

let data
try {
  data = JSON.parse(readFileSync(filePath, 'utf-8'))
} catch (error) {
  console.error('❌ roi-dashboard.json is not valid JSON:', error.message)
  process.exit(1)
}

const requiredKeys = [
  'cycleTimeSavedHours',
  'accessibilityBugsPrevented',
  'regressionsCaughtPreRelease',
  'timeToPlanReductionPercent',
  'lastUpdated'
]

const missing = requiredKeys.filter(key => !(key in data))
if (missing.length) {
  console.error('❌ roi-dashboard.json missing keys:', missing.join(', '))
  process.exit(1)
}

for (const key of requiredKeys) {
  if (key === 'lastUpdated') {
    if (typeof data[key] !== 'string' || !data[key].match(/^\d{4}-\d{2}-\d{2}/)) {
      console.error('❌ lastUpdated must be an ISO date string (YYYY-MM-DD).')
      process.exit(1)
    }
  } else if (typeof data[key] !== 'number' || Number.isNaN(data[key])) {
    console.error(`❌ ${key} must be a number.`)
    process.exit(1)
  }
}

console.log('✅ ROI dashboard looks good. Metrics are ready for reporting.')
