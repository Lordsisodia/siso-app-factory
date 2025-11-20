#!/usr/bin/env node

/**
 * LangFuse Finish Script
 *
 * Run this AFTER completing a planning session to finalize the trace and view results.
 *
 * Usage:
 *   node tools/observability/scripts/langfuse-finish.js
 */

import { Langfuse } from "langfuse";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

// Load trace info
const traceInfoPath = path.join(__dirname, '../../.langfuse-trace.json');

if (!fs.existsSync(traceInfoPath)) {
  console.error('❌ Error: No active trace found.');
  console.error('   Please run: node tools/observability/scripts/langfuse-init.js first');
  process.exit(1);
}

const traceInfo = JSON.parse(fs.readFileSync(traceInfoPath, 'utf-8'));

console.log('\n🏁 Finalizing LangFuse Trace...\n');
console.log('Trace ID:', traceInfo.traceId);
console.log('Project:', traceInfo.projectName);
console.log('Started:', new Date(traceInfo.startTime).toLocaleString());
console.log('');

// Initialize LangFuse
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Update trace with completion
const trace = langfuse.trace({
  id: traceInfo.traceId,
  output: {
    status: 'completed',
    endTime: new Date().toISOString(),
    duration: calculateDuration(traceInfo.startTime),
  },
  metadata: {
    completedAt: new Date().toISOString(),
  },
});

function calculateDuration(startTime) {
  const start = new Date(startTime);
  const end = new Date();
  const diffMs = end - start;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

console.log('✅ Trace finalized successfully!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('📊 View Your Results:');
console.log('');
console.log(`   ${traceInfo.langfuseUrl}`);
console.log('');
console.log('   Or visit: https://cloud.langfuse.com');
console.log('   Click on your trace to see:');
console.log('   - Cost breakdown per phase');
console.log('   - Token usage analytics');
console.log('   - Duration per phase');
console.log('   - Verification results');
console.log('   - Complete decision trail');
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// Flush and shutdown
setTimeout(async () => {
  await langfuse.shutdownAsync();

  // Clean up trace file
  fs.unlinkSync(traceInfoPath);
  console.log('✅ Trace data flushed and cleaned up.\n');
}, 2000);
