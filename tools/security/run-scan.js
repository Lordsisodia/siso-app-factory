#!/usr/bin/env node
import { spawnSync } from 'child_process';

const result = spawnSync('npx', ['--yes', '@semgrep/semgrep', '--config', 'auto', '.'], {
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error('[security:scan] Semgrep scan failed or Semgrep unavailable. Please install @semgrep/semgrep or adjust the script to your preferred tool.');
  process.exit(result.status || 1);
}
