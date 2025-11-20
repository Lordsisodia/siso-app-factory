#!/usr/bin/env ts-node
import { appendFileSync, existsSync } from 'fs';
import { join } from 'path';

const [, , artifact, version, description = '', owner = ''] = process.argv;

if (!artifact || !version) {
  console.error('Usage: pnpm prompt:log <artifact> <version> [description] [owner]');
  process.exit(1);
}

const logPath = join(process.cwd(), 'docs', 'notes', 'prompt-version-log.md');
if (!existsSync(logPath)) {
  console.error(`[prompt:log] ${logPath} not found. Create it via PRD checklist.`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const row = `| ${date} | ${artifact} | ${version} | ${description} | ${owner} |\n`;
appendFileSync(logPath, row);
console.log(`[prompt:log] Recorded ${artifact} v${version}`);
