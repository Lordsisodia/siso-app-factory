#!/usr/bin/env node
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const promptDir = join(process.cwd(), 'prompts');
const suspiciousPatterns = [/\{\{user_input\}\}/i, /<\s*script/i];
let exitCode = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && /\.(md|txt|prompt)$/i.test(entry.name)) {
      const content = readFileSync(full, 'utf8');
      suspiciousPatterns.forEach((pattern) => {
        if (pattern.test(content)) {
          console.error(`[prompt:audit] Potential unsafe token ${pattern} in ${full}`);
          exitCode = 1;
        }
      });
    }
  }
}

try {
  walk(promptDir);
} catch (err) {
  console.error('[prompt:audit] Failed to scan prompts directory:', err.message);
  exitCode = 1;
}

if (exitCode !== 0) {
  console.error('[prompt:audit] Prompt audit found issues. Fix before proceeding.');
}
process.exit(exitCode);
