#!/usr/bin/env ts-node
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const projectRoot = process.cwd();
const driftPath = join(projectRoot, 'validation', 'deepeval', 'drift-log.md');
const changeLogPath = join(projectRoot, 'project-setup-system', 'BUILD-MASTER-PLAN.md');

if (!existsSync(driftPath) || !existsSync(changeLogPath)) {
  console.error('[check-drift] Missing drift log or Master Build Plan.');
  process.exit(1);
}

const driftEntries = readFileSync(driftPath, 'utf8')
  .split('\n')
  .filter((line) => line.trim().startsWith('|'));

const anomalies = driftEntries.filter((row) => /FAIL|ALERT|HIGH/i.test(row));
if (anomalies.length === 0) {
  console.log('[check-drift] No anomalies detected.');
  process.exit(0);
}

let plan = readFileSync(changeLogPath, 'utf8');
const marker = '### Planning Change Log\n';
const idx = plan.indexOf(marker);
if (idx === -1) {
  console.error('[check-drift] Planning Change Log section not found.');
  process.exit(1);
}
const insert = anomalies
  .map((row) => `- [ ] Drift follow-up: ${row}`)
  .join('\n') + '\n';

const before = plan.slice(0, idx + marker.length);
const after = plan.slice(idx + marker.length);
plan = `${before}${insert}${after}`;
writeFileSync(changeLogPath, plan);
console.log('[check-drift] Added drift follow-ups to Planning Change Log.');
