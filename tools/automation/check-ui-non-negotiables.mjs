#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const REQUIRED_SECTIONS = [
  'Axe Report:',
  'Lighthouse Report:',
  'BrowserStack Diffs:',
  'Assistive Tech Tests:',
  'Localization Proof:',
  'Privacy Review:',
  'Design System Changelog:'
]

const filePath = resolve(process.cwd(), 'docs/08-build-plan/ui-compliance.md')

if (!existsSync(filePath)) {
  console.error('❌ Missing docs/08-build-plan/ui-compliance.md. Run `pnpm run init:ui-docs` or copy the template before merging.')
  process.exit(1)
}

const contents = readFileSync(filePath, 'utf-8')

const missing = REQUIRED_SECTIONS.filter(label => !contents.includes(label))

if (missing.length) {
  console.error('❌ ui-compliance.md is missing required sections:')
  missing.forEach(label => console.error(`   - ${label}`))
  process.exit(1)
}

const unresolved = [...contents.matchAll(/TBD|TODO|FILL_THIS_IN/gi)].map(m => m[0])
if (unresolved.length) {
  console.error('❌ ui-compliance.md still contains placeholders (TBD/TODO). Fill them before merging.')
  process.exit(1)
}

console.log('✅ UI Non-Negotiables evidence found. Ready for review.')
