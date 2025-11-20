#!/usr/bin/env node

/**
 * LangFuse Connection Test
 *
 * Tests connection to LangFuse and creates a sample trace to verify setup.
 *
 * Usage:
 *   node tools/observability/scripts/langfuse-test.js
 */

import { Langfuse } from "langfuse";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

console.log('\n🧪 Testing LangFuse Connection...\n');

// Check environment variables
console.log('Configuration:');
console.log('  Host:', process.env.LANGFUSE_HOST);
console.log('  Public Key:', process.env.LANGFUSE_PUBLIC_KEY?.substring(0, 15) + '...');
console.log('  Secret Key:', '***hidden***');
console.log('');

try {
  // Initialize LangFuse
  const langfuse = new Langfuse({
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    baseUrl: process.env.LANGFUSE_HOST,
  });

  console.log('✅ LangFuse client initialized\n');

  // Create test trace
  const trace = langfuse.trace({
    name: 'Test Trace - SISO App Factory',
    userId: 'test-user',
    metadata: {
      test: true,
      timestamp: new Date().toISOString(),
    },
  });

  console.log('✅ Test trace created:', trace.id, '\n');

  // Create a test span
  const span = trace.span({
    name: 'Test Phase: Connection Check',
    input: { test: true },
  });

  // Simulate some work
  console.log('⏳ Simulating phase execution...\n');

  setTimeout(async () => {
    // End span
    span.end({
      output: {
        status: 'success',
        message: 'Connection test completed successfully',
      },
      metadata: {
        duration: '2 seconds',
        tokensUsed: 100,
        cost: 0.01,
      },
    });

    console.log('✅ Test span completed\n');

    // Create verification span
    const verification = trace.span({
      name: 'Test Verification',
      input: { criteria: 5 },
    });

    verification.end({
      output: {
        passed: 5,
        failed: 0,
        score: 1.0,
      },
    });

    console.log('✅ Test verification logged\n');

    // End trace
    trace.update({
      output: {
        status: 'test_completed',
        success: true,
      },
    });

    console.log('✅ Test trace finalized\n');

    // Flush
    await langfuse.shutdownAsync();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🎉 SUCCESS! LangFuse is working correctly.\n');
    console.log('📊 View test trace at:');
    console.log(`   ${process.env.LANGFUSE_HOST}/traces/${trace.id}`);
    console.log('');
    console.log('Or visit: https://cloud.langfuse.com');
    console.log('  → Click "Traces"');
    console.log('  → Find "Test Trace - SISO App Factory"');
    console.log('  → Click to see details');
    console.log('');
    console.log('You should see:');
    console.log('  ✅ Trace with 2 spans (Test Phase + Verification)');
    console.log('  ✅ Metadata (duration, tokens, cost)');
    console.log('  ✅ Timeline visualization');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
  }, 2000);

} catch (error) {
  console.error('\n❌ Connection Failed!\n');
  console.error('Error:', error.message);
  console.error('');
  console.error('Troubleshooting:');
  console.error('  1. Check .env.local has correct keys');
  console.error('  2. Verify LANGFUSE_HOST is https://cloud.langfuse.com');
  console.error('  3. Ensure internet connection is working');
  console.error('  4. Check if keys are still valid (regenerate if needed)');
  console.error('');
  process.exit(1);
}
