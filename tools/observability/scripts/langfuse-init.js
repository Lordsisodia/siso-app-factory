#!/usr/bin/env node

/**
 * LangFuse Initialization Script
 *
 * This script initializes LangFuse tracking for SISO App Factory planning sessions.
 * Run this BEFORE starting a planning session to enable cost/token tracking.
 *
 * Usage:
 *   node tools/observability/scripts/langfuse-init.js "Restaurant Booking App" "restaurant" "Indonesia"
 *
 * Arguments:
 *   1. Project Name (e.g., "Restaurant Booking App")
 *   2. Industry (e.g., "restaurant", "tour-guide", "bike-rental")
 *   3. Region (optional, e.g., "Indonesia", "Southeast Asia")
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

// Validate environment variables
const requiredEnvVars = [
  'LANGFUSE_PUBLIC_KEY',
  'LANGFUSE_SECRET_KEY',
  'LANGFUSE_HOST',
];

const missing = requiredEnvVars.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('❌ Error: Missing required environment variables:', missing.join(', '));
  console.error('\nPlease check .env.local file contains:');
  console.error('  LANGFUSE_PUBLIC_KEY=pk-lf-...');
  console.error('  LANGFUSE_SECRET_KEY=sk-lf-...');
  console.error('  LANGFUSE_HOST=https://cloud.langfuse.com');
  process.exit(1);
}

// Parse command line arguments
const projectName = process.argv[2] || 'New SISO Project';
const industry = process.argv[3] || 'unknown';
const region = process.argv[4] || 'global';

console.log('\n🚀 Initializing LangFuse Tracking...\n');
console.log('Project:', projectName);
console.log('Industry:', industry);
console.log('Region:', region);
console.log('Host:', process.env.LANGFUSE_HOST);
console.log('');

// Initialize LangFuse
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
  flushInterval: 5000, // Flush every 5 seconds
});

// Create main trace
const trace = langfuse.trace({
  name: `SISO Planning: ${projectName}`,
  userId: process.env.LANGFUSE_USER_ID || process.env.USER || 'unknown',
  metadata: {
    industry,
    region,
    multiTenant: process.env.PROJECT_MULTI_TENANT === 'true',
    startTime: new Date().toISOString(),
    systemVersion: '3.0',
  },
  tags: ['planning', 'siso-app-factory', industry, region],
});

console.log('✅ LangFuse trace created successfully!\n');
console.log('Trace ID:', trace.id);
console.log('View at:', `${process.env.LANGFUSE_HOST}/project/traces/${trace.id}`);
console.log('');

// Save trace ID for later use
const traceInfo = {
  traceId: trace.id,
  projectName,
  industry,
  region,
  startTime: new Date().toISOString(),
  langfuseUrl: `${process.env.LANGFUSE_HOST}/traces/${trace.id}`,
};

const traceInfoPath = path.join(__dirname, '../../.langfuse-trace.json');
fs.writeFileSync(traceInfoPath, JSON.stringify(traceInfo, null, 2));

console.log('📝 Trace info saved to:', traceInfoPath);
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('🎯 Next Steps:');
console.log('');
console.log('1. Start your planning session with Claude Code CLI');
console.log('');
console.log('2. Tell Claude to track phases:');
console.log('   "For each phase you complete, log it to LangFuse.');
console.log('    Use the trace from .langfuse-trace.json"');
console.log('');
console.log('3. After planning, run: node tools/observability/scripts/langfuse-finish.js');
console.log('');
console.log('4. View results at: https://cloud.langfuse.com');
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// Keep process alive briefly to ensure flush
setTimeout(async () => {
  await langfuse.shutdownAsync();
  console.log('✅ LangFuse initialized and ready!\n');
}, 2000);
