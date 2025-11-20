#!/usr/bin/env node

/**
 * LangFuse Generation Tracking (Enhanced)
 *
 * Use this to track LLM generations with full metadata, model info, and cost tracking.
 * This provides much richer data than simple span tracking.
 *
 * Usage:
 *   node tools/observability/scripts/langfuse-track-generation.js <phase> <model> <inputTokens> <outputTokens> <duration> <score>
 *
 * Example:
 *   node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12 minutes" 95
 *   node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38 minutes" 90
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

// Parse arguments
const phaseNum = process.argv[2];
const model = process.argv[3] || 'claude-sonnet-4.5';
const inputTokens = parseInt(process.argv[4]) || 0;
const outputTokens = parseInt(process.argv[5]) || 0;
const duration = process.argv[6] || 'unknown';
const score = parseInt(process.argv[7]) || 0;

if (!phaseNum || !inputTokens || !outputTokens) {
  console.error('❌ Error: Missing required arguments');
  console.error('Usage: node tools/observability/scripts/langfuse-track-generation.js <phase> <model> <inputTokens> <outputTokens> <duration> <score>');
  console.error('Example: node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95');
  process.exit(1);
}

// Load trace info
const traceInfoPath = path.join(__dirname, '../../.langfuse-trace.json');
if (!fs.existsSync(traceInfoPath)) {
  console.error('❌ Error: No active trace. Run: node tools/observability/scripts/langfuse-init.js first');
  process.exit(1);
}

const traceInfo = JSON.parse(fs.readFileSync(traceInfoPath, 'utf-8'));

// Phase metadata
const phaseNames = {
  '1': { name: 'Industry Research', agent: 'researcher-agent' },
  '2': { name: 'Competitor Analysis', agent: 'researcher-agent' },
  '3': { name: 'Feature Planning', agent: 'pm-agent' },
  '4': { name: 'Architecture Design', agent: 'architect-agent' },
  '4.5': { name: 'UI/UX Design', agent: 'ui-ux-agent' },
  '5': { name: 'Component Mapping', agent: 'domain-engineer-agent' },
  '6': { name: 'Domain Operations', agent: 'domain-engineer-agent' },
  '7': { name: 'Database Schema', agent: 'domain-engineer-agent' },
  '8': { name: 'Build Plan', agent: 'qa-agent' },
  '9': { name: 'PDR Creation', agent: 'qa-agent' },
};

const phaseData = phaseNames[phaseNum] || { name: `Phase ${phaseNum}`, agent: 'unknown' };

// Calculate cost (based on model pricing)
const costs = {
  'claude-sonnet-4.5': { input: 0.003, output: 0.015 }, // per 1K tokens
  'claude-opus-4': { input: 0.015, output: 0.075 },
  'gpt-5-pro': { input: 0.010, output: 0.030 },
};

const modelCost = costs[model] || { input: 0.003, output: 0.015 };
const inputCost = (inputTokens / 1000) * modelCost.input;
const outputCost = (outputTokens / 1000) * modelCost.output;
const totalCost = inputCost + outputCost;

console.log(`\n📊 Tracking Phase ${phaseNum}: ${phaseData.name}...\n`);
console.log('Model:', model);
console.log('Input Tokens:', inputTokens.toLocaleString());
console.log('Output Tokens:', outputTokens.toLocaleString());
console.log('Total Tokens:', (inputTokens + outputTokens).toLocaleString());
console.log('Cost: $' + totalCost.toFixed(4));
console.log('Duration:', duration);
console.log('Score:', score + '%');
console.log('');

// Initialize LangFuse
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Get trace
const trace = langfuse.trace({ id: traceInfo.traceId });

// Create GENERATION (not span) - this gives model-specific tracking
const generation = trace.generation({
  name: `Phase ${phaseNum}: ${phaseData.name}`,
  model: model,
  modelParameters: {
    temperature: 0.7,
    maxTokens: 4096,
  },
  input: {
    phase: phaseNum,
    phaseName: phaseData.name,
    industry: traceInfo.industry,
    region: traceInfo.region,
  },
  output: {
    status: 'completed',
    verificationScore: score,
    filesCreated: `See docs/ for Phase ${phaseNum} deliverables`,
  },
  usage: {
    promptTokens: inputTokens,
    completionTokens: outputTokens,
    totalTokens: inputTokens + outputTokens,
  },
  metadata: {
    duration: duration,
    agent: phaseData.agent,
    environment: 'planning',
    systemVersion: '3.0',
    verified: score >= 80,
    iterations: score < 80 ? 2 : 1, // Estimate iterations
    phase: phaseNum,
    industry: traceInfo.industry,
    region: traceInfo.region,
  },
});

// Add tags for filtering
generation.update({
  tags: [
    'planning',
    `phase-${phaseNum}`,
    phaseData.agent,
    traceInfo.industry,
    traceInfo.region,
    score >= 90 ? 'high-quality' : score >= 80 ? 'verified' : 'retry-required',
  ],
  level: score >= 80 ? 'DEFAULT' : 'WARNING',
});

console.log('✅ Generation tracked successfully!\n');
console.log('Tags:', [
  'planning',
  `phase-${phaseNum}`,
  phaseData.agent,
  traceInfo.industry,
  traceInfo.region,
].join(', '));
console.log('');

// Also create a span for phase-level view
const phaseSpan = trace.span({
  name: `Phase ${phaseNum}: ${phaseData.name} (Container)`,
  input: { phase: phaseNum },
  metadata: {
    duration,
    cost: totalCost,
    tokensUsed: inputTokens + outputTokens,
    verificationScore: score,
    agent: phaseData.agent,
  },
});

phaseSpan.end({
  output: { status: 'completed' },
  level: score >= 80 ? 'DEFAULT' : 'WARNING',
});

// Flush
setTimeout(async () => {
  await langfuse.shutdownAsync();
  console.log('📤 Data sent to LangFuse with full metadata\n');
  console.log(`View at: ${process.env.LANGFUSE_HOST}/traces/${traceInfo.traceId}\n`);
  console.log('Dashboard will now show:');
  console.log('  ✅ Cost by model (claude-sonnet-4.5)');
  console.log('  ✅ Cost by environment (planning)');
  console.log('  ✅ Cost by agent (researcher-agent, ui-ux-agent, etc.)');
  console.log('  ✅ Cost by phase');
  console.log('  ✅ Cost by industry/region tags');
  console.log('  ✅ Token usage breakdown (input vs output)');
  console.log('');
}, 2000);
