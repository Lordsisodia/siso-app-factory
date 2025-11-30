#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const manifestPath = path.resolve(__dirname, '..', '_cfg', 'agent-manifest.csv');

if (!fs.existsSync(manifestPath)) {
  console.error('agent-manifest.csv not found:', manifestPath);
  process.exit(1);
}

const csv = fs.readFileSync(manifestPath, 'utf8');
const records = parse(csv, { columns: true, skip_empty_lines: true });
console.log('ID | Name | Type | Triggers | Sidecar');
console.log('---------------------------------------------');
for (const r of records) {
  console.log(`${r.id} | ${r.name} | ${r.type} | ${r.triggers} | ${r.sidecar}`);
}
