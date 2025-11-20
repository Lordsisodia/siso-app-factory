# LangFuse Integration Guide - SISO App Factory

## Overview

LangFuse is an open-source observability and analytics platform for LLM applications. It allows you to track every AI decision, measure costs, debug failures, and optimize performance across all 9 phases of SISO planning.

**Key Benefits**:
- 📊 **Complete Visibility**: See every tool call, prompt, and AI decision
- 💰 **Cost Tracking**: Track token usage and costs per phase, per project
- 🐛 **Debug Failed Runs**: Understand why Phase X failed
- ⚡ **Performance Optimization**: Identify slow or expensive operations
- 📈 **Quality Metrics**: Success rates, iteration counts, token efficiency

---

## Installation

### 1. Install LangFuse SDK

```bash
npm install langfuse
# or
pnpm add langfuse
# or
yarn add langfuse
```

### 2. Get API Keys

**Option A: Self-Hosted (Recommended for Privacy)**
```bash
# Clone LangFuse
git clone https://github.com/langfuse/langfuse.git
cd langfuse

# Run with Docker
docker-compose up -d

# Access at http://localhost:3000
# Create project, get Public Key and Secret Key
```

**Option B: Cloud (Free Tier Available)**
1. Visit https://cloud.langfuse.com
2. Sign up for free account
3. Create new project
4. Copy Public Key and Secret Key

### 3. Configure Environment Variables

Add to your `.env.local`:

```bash
# LangFuse Configuration
LANGFUSE_PUBLIC_KEY="pk_lf_..."
LANGFUSE_SECRET_KEY="sk_lf_..."
LANGFUSE_HOST="http://localhost:3000"  # or https://cloud.langfuse.com

# Optional: User identification
LANGFUSE_USER_ID="your-email@example.com"
```

---

## Usage in Claude Code CLI

### Method 1: Manual Tracing (Simple)

Use this when running planning sessions manually with Claude Code CLI:

**Step 1**: Start trace at beginning of session

```javascript
// Save as: .siso/tools/langfuse-trace.js
import { Langfuse } from "langfuse";

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Start main trace
export const trace = langfuse.trace({
  name: `SISO Planning: ${process.env.PROJECT_NAME || 'New Project'}`,
  userId: process.env.LANGFUSE_USER_ID,
  metadata: {
    industry: process.env.PROJECT_INDUSTRY,
    multiTenant: process.env.PROJECT_MULTI_TENANT === 'true',
    startTime: new Date().toISOString(),
  },
});

console.log(`✅ LangFuse trace started: ${trace.id}`);
```

**Step 2**: Tell Claude to log each phase

In your conversation with Claude Code CLI:

```
"For each phase you complete, log it to LangFuse using this format:

import { trace } from './.siso/tools/langfuse-trace.js';

const phase1 = trace.span({
  name: 'Phase 1: Industry Research',
  input: { industry: 'restaurant', location: 'Indonesia' },
  metadata: { startTime: new Date().toISOString() }
});

// ... do the work ...

phase1.end({
  output: 'Created docs/01-research/research-summary.md',
  metadata: {
    filesCreated: ['research-summary.md'],
    tokensUsed: 12340,
    duration: '12 minutes'
  }
});
"
```

### Method 2: Automated Wrapper (Advanced)

Create a wrapper script that automatically logs all Claude interactions:

```javascript
// Save as: .siso/tools/claude-wrapper.js
import { Langfuse } from "langfuse";
import { spawn } from "child_process";

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Create main trace
const trace = langfuse.trace({
  name: `SISO Planning: ${process.argv[2] || 'New Project'}`,
  userId: process.env.USER || process.env.USERNAME,
  metadata: {
    command: process.argv.join(' '),
    cwd: process.cwd(),
  },
});

// Spawn Claude Code CLI
const claude = spawn('claude', process.argv.slice(2), {
  stdio: 'inherit',
  env: {
    ...process.env,
    LANGFUSE_TRACE_ID: trace.id,
  },
});

// Track execution
const execution = trace.span({ name: 'Claude Execution' });

claude.on('close', (code) => {
  execution.end({
    output: { exitCode: code },
    level: code === 0 ? 'DEFAULT' : 'ERROR',
  });

  trace.update({
    output: { exitCode: code, success: code === 0 },
  });

  langfuse.shutdownAsync();
});
```

**Usage**:
```bash
# Instead of: claude
# Run: node .siso/tools/claude-wrapper.js

node .siso/tools/claude-wrapper.js "Plan a restaurant booking app"
```

---

## Tracing Each Phase

### Phase 1: Industry Research

```javascript
const phase1 = trace.span({
  name: 'Phase 1: Industry Research',
  input: {
    industry: 'restaurant',
    location: 'Indonesia',
    researchDepth: 'comprehensive'
  }
});

// Log each tool call
const webSearch1 = phase1.event({
  name: 'WebSearch: Restaurant Booking Trends',
  input: 'restaurant booking trends Indonesia 2025',
  metadata: { tool: 'WebSearch' }
});
webSearch1.end({ output: '... search results ...', metadata: { resultsCount: 10 } });

const webFetch1 = phase1.event({
  name: 'WebFetch: Competitor Website',
  input: 'https://competitor1.com',
  metadata: { tool: 'WebFetch' }
});
webFetch1.end({
  output: '... page content ...',
  metadata: {
    statusCode: 200,
    contentLength: 45000,
    tokensUsed: 3400
  }
});

// End phase
phase1.end({
  output: {
    filesCreated: [
      'docs/01-research/research-summary.md',
      'docs/01-research/market-analysis.md'
    ],
    competitorsAnalyzed: 12,
    sourcesUsed: 15
  },
  metadata: {
    duration: '12 minutes',
    tokensUsed: 18500,
    estimatedCost: 0.47
  }
});
```

### Phase 4.5: UI/UX Design (New Phase)

```javascript
const phase45 = trace.span({
  name: 'Phase 4.5: UI/UX Design',
  input: {
    pages: 15,
    userFlows: ['guest-booking', 'restaurant-admin', 'super-admin'],
    designSystem: 'modern-minimal'
  }
});

// User flow creation
const userFlows = phase45.event({
  name: 'Generate User Flows',
  input: { flows: ['guest-booking', 'restaurant-admin'] }
});
userFlows.end({
  output: 'Created Mermaid diagrams for 3 user flows',
  metadata: { diagramsCreated: 3 }
});

// Wireframe generation
const wireframes = phase45.event({
  name: 'Generate Wireframes',
  input: { pages: ['home', 'booking', 'dashboard'] }
});
wireframes.end({
  output: 'Created wireframes for 15 pages',
  metadata: { pagesWireframed: 15, format: 'Mermaid + ASCII' }
});

// Design system
const designSystem = phase45.event({
  name: 'Define Design System',
  input: { colorPalette: 'warm', typography: 'modern-serif' }
});
designSystem.end({
  output: 'Created design-system.md with tokens',
  metadata: { tokensCount: 47, componentsStyled: 25 }
});

phase45.end({
  output: {
    filesCreated: [
      'docs/04.5-ui-design/user-flows.md',
      'docs/04.5-ui-design/wireframes.md',
      'docs/04.5-ui-design/design-system.md',
      'docs/04.5-ui-design/accessibility-checklist.md'
    ]
  },
  metadata: {
    duration: '35 minutes',
    tokensUsed: 28000,
    estimatedCost: 0.72
  }
});
```

### Tracking Verification Steps

```javascript
// After Phase 1 completes, run verification
const verification1 = trace.span({
  name: 'Verification: Phase 1',
  input: { phase: 1, checklistPath: 'validation/phase-01-research-checklist.md' }
});

const checks = [
  { criterion: '10+ sources cited', result: 'PASS', evidence: '15 sources found' },
  { criterion: 'Market size documented', result: 'PASS', evidence: '$2.3B market' },
  { criterion: 'Competitor analysis complete', result: 'PASS', evidence: '12 competitors' },
  { criterion: 'Regional variations noted', result: 'FAIL', evidence: 'Missing Bali data' }
];

verification1.end({
  output: {
    passed: 3,
    failed: 1,
    score: 0.75,
    requiresRework: true,
    checks
  },
  level: 'WARNING'
});

// If verification fails, log retry
if (verification1.output.requiresRework) {
  const retry = trace.span({
    name: 'Phase 1: Retry (Verification Failed)',
    input: { missingItems: ['Bali regional data'] }
  });

  // ... re-do work ...

  retry.end({ output: 'Added Bali market analysis' });
}
```

---

## Viewing Results

### LangFuse Dashboard

After running planning sessions, view results at:
- **Self-hosted**: http://localhost:3000
- **Cloud**: https://cloud.langfuse.com

**What You'll See**:

1. **Traces View**
   - List of all planning sessions
   - Project name, duration, cost, success/failure
   - Click to drill down

2. **Trace Details**
   - Timeline of all 9 phases
   - Each phase's duration, tokens, cost
   - Tool calls (WebSearch, WebFetch, mcp__ tools)
   - Verification results

3. **Analytics**
   - Average cost per project type
   - Phase duration trends
   - Token usage patterns
   - Success rates per phase

4. **Debug View**
   - Full prompts sent to Claude
   - Tool call parameters and responses
   - Error messages and stack traces

### Example Dashboard Metrics

**Project: Restaurant Booking App**
```
Total Duration: 6.2 hours
Total Cost: $4.87
Total Tokens: 234,567

Phase Breakdown:
├─ Phase 1: Research          12m  $0.47  18,500 tokens  ✅
├─ Phase 2: Competitors       18m  $0.68  25,000 tokens  ✅
├─ Phase 3: Features          15m  $0.52  19,200 tokens  ✅
├─ Phase 4: Architecture      45m  $1.23  45,000 tokens  ✅
├─ Phase 4.5: UI/UX Design    35m  $0.72  28,000 tokens  ✅
├─ Phase 5: Components        25m  $0.58  21,500 tokens  ✅
├─ Phase 6: Domain Ops        40m  $0.95  35,000 tokens  ⚠️ (1 retry)
├─ Phase 7: Database          30m  $0.48  18,000 tokens  ✅
├─ Phase 8: Build Plan        28m  $0.38  14,367 tokens  ✅
└─ Phase 9: PDR               22m  $0.32  12,000 tokens  ✅

Tool Usage:
├─ WebSearch              42 calls   $0.84
├─ WebFetch               28 calls   $1.12
├─ mcp__chrome-devtools   15 calls   $0.67
├─ Read                   89 calls   $0.23
└─ Write                  47 calls   $0.18

Verification:
├─ Phases Passed First Try: 8/9 (88.9%)
├─ Retries Required: 1 (Phase 6)
└─ Final Quality Score: 94/100
```

---

## Cost Estimation

### Token Usage by Phase (Typical Restaurant App)

| Phase | Avg Tokens | Avg Cost | Duration |
|-------|-----------|----------|----------|
| Phase 1: Research | 18,000 | $0.45 | 12 min |
| Phase 2: Competitors | 25,000 | $0.65 | 18 min |
| Phase 3: Features | 19,000 | $0.50 | 15 min |
| Phase 4: Architecture | 45,000 | $1.20 | 45 min |
| **Phase 4.5: UI/UX** | **28,000** | **$0.70** | **35 min** |
| Phase 5: Components | 21,000 | $0.55 | 25 min |
| Phase 6: Domain Ops | 35,000 | $0.90 | 40 min |
| Phase 7: Database | 18,000 | $0.45 | 30 min |
| Phase 8: Build Plan | 14,000 | $0.35 | 28 min |
| Phase 9: PDR | 12,000 | $0.30 | 22 min |
| **TOTAL** | **~235K** | **~$6.05** | **~6.5 hrs** |

**Note**: Costs based on Claude Sonnet 4.5 pricing ($3/M input, $15/M output tokens)

---

## Optimization Tips

### Reducing Costs

**1. Cache Research Results**
```javascript
// Before WebSearch, check if we've researched this before
const cached = await langfuse.getObservation({
  traceId: 'previous-trace-id',
  name: 'WebSearch: Restaurant Trends'
});

if (cached && isRecent(cached.createdAt, days=7)) {
  console.log('Using cached research');
  return cached.output;
}
```

**2. Identify Expensive Phases**
- Check dashboard: Which phase uses most tokens?
- Optimize prompts for that phase
- Use fewer examples, more concise instructions

**3. Parallel Processing**
```javascript
// Instead of sequential:
await phase1();
await phase2();

// Run in parallel where possible:
await Promise.all([
  phase1(), // Research
  phase2(), // Competitors (independent of Phase 1)
]);
```

**4. Early Stopping**
```javascript
// If verification fails badly, stop early
const verification = await verifyPhase(1);
if (verification.score < 0.5) {
  trace.update({ output: { earlyStop: true, reason: 'Quality too low' } });
  throw new Error('Phase 1 quality too low, stopping');
}
```

---

## Troubleshooting

### Issue: Traces not appearing in dashboard

**Solution**:
```javascript
// Make sure to flush at end of session
await langfuse.shutdownAsync();

// Or set flush interval
const langfuse = new Langfuse({
  publicKey: "...",
  secretKey: "...",
  flushInterval: 5000, // Flush every 5 seconds
});
```

### Issue: High costs, unclear why

**Solution**:
1. Go to LangFuse dashboard
2. Click on expensive trace
3. Expand all spans
4. Look for:
   - Large input/output tokens (maybe prompt too long?)
   - Repeated tool calls (maybe stuck in loop?)
   - Unnecessary WebFetch calls (maybe cache results?)

### Issue: Can't see tool call details

**Solution**:
```javascript
// Log tool calls with more detail
const toolCall = phase1.event({
  name: 'WebFetch',
  input: { url: 'https://competitor.com', fullPrompt: '...' }, // Include prompt
  metadata: {
    userAgent: '...',
    headers: {...}
  }
});

toolCall.end({
  output: { content: '...', truncated: false },
  metadata: {
    statusCode: 200,
    responseTime: 1234,
    tokensUsed: 4500
  }
});
```

---

## Advanced: Multi-Agent Tracing

When using specialist agents (UI/UX Designer, Researcher, PM, etc.):

```javascript
// Main orchestrator trace
const mainTrace = langfuse.trace({
  name: 'SISO Planning: Restaurant App',
  userId: 'shaan@siso.com'
});

// Each agent gets its own span
const uiDesignerAgent = mainTrace.span({
  name: 'Agent: UI/UX Designer',
  metadata: {
    agent: 'ui-designer',
    model: 'claude-sonnet-4.5',
    temperature: 0.7
  }
});

// Agent's work
const userFlows = uiDesignerAgent.span({ name: 'Task: User Flows' });
userFlows.end({ output: '3 flows created' });

const wireframes = uiDesignerAgent.span({ name: 'Task: Wireframes' });
wireframes.end({ output: '15 wireframes created' });

uiDesignerAgent.end({
  output: { tasksCompleted: 2, quality: 'high' },
  metadata: { duration: '35 minutes', tokensUsed: 28000 }
});

// Next agent
const architectAgent = mainTrace.span({
  name: 'Agent: Architect',
  metadata: { agent: 'architect' }
});
// ... architect work ...
```

**Dashboard View**:
```
Restaurant App Planning Session (6.2 hours, $4.87)
├─ Agent: Researcher (Phase 1-2)
│   ├─ Industry Research
│   └─ Competitor Analysis
├─ Agent: Product Manager (Phase 3)
│   └─ Feature Prioritization
├─ Agent: Architect (Phase 4)
│   └─ Architecture Design
├─ Agent: UI/UX Designer (Phase 4.5) ⭐
│   ├─ User Flows
│   ├─ Wireframes
│   └─ Design System
├─ Agent: Domain Engineer (Phase 5-7)
│   ├─ Component Mapping
│   ├─ Domain Operations
│   └─ Database Schema
└─ Agent: QA Engineer (Phase 8-9)
    ├─ Build Plan
    └─ PDR Review
```

---

## Best Practices

### 1. Always Trace Complete Sessions
```javascript
// ❌ Don't trace individual phases in isolation
const phase1 = langfuse.trace({ name: 'Phase 1' });

// ✅ Trace the entire session, phases as spans
const session = langfuse.trace({ name: 'Full Planning Session' });
const phase1 = session.span({ name: 'Phase 1' });
```

### 2. Include Metadata
```javascript
// ❌ Minimal metadata
span.end({ output: 'Done' });

// ✅ Rich metadata for analysis
span.end({
  output: { filesCreated: [...], summary: '...' },
  metadata: {
    duration: '12 minutes',
    tokensUsed: 18500,
    estimatedCost: 0.47,
    model: 'claude-sonnet-4.5',
    retries: 0,
    qualityScore: 0.95
  }
});
```

### 3. Tag for Filtering
```javascript
const trace = langfuse.trace({
  name: 'Planning Session',
  tags: ['restaurant', 'multi-tenant', 'indonesia'], // Filter by tags later
  metadata: {
    industry: 'restaurant',
    region: 'Indonesia',
    teamMember: 'shaan'
  }
});
```

### 4. Use Generations for LLM Calls
```javascript
// When Claude generates content, use generation tracking
const generation = trace.generation({
  name: 'Generate PDR',
  model: 'claude-sonnet-4.5',
  input: [{ role: 'user', content: 'Create PDR for...' }],
  metadata: { temperature: 0.7, maxTokens: 4096 }
});

// After response
generation.end({
  output: { content: '# PDR...' },
  usage: {
    promptTokens: 2400,
    completionTokens: 3200,
    totalTokens: 5600
  }
});
```

---

## Integration Checklist

- [ ] Install `langfuse` npm package
- [ ] Get API keys (self-hosted or cloud)
- [ ] Add keys to `.env.local`
- [ ] Create `.siso/tools/langfuse-trace.js`
- [ ] Test with simple trace
- [ ] Update planning prompts to log each phase
- [ ] Run full planning session
- [ ] Review dashboard results
- [ ] Optimize expensive phases
- [ ] Set up alerts for high costs (optional)

---

## Resources

- **LangFuse Docs**: https://langfuse.com/docs
- **GitHub**: https://github.com/langfuse/langfuse
- **Self-Hosting Guide**: https://langfuse.com/docs/deployment/self-host
- **Pricing Calculator**: https://langfuse.com/pricing (cloud)
- **Claude Token Pricing**: https://anthropic.com/pricing

---

## Summary

LangFuse gives you **complete visibility** into SISO planning:
- See every decision the AI makes
- Track costs per phase (optimize expensive ones)
- Debug failures (understand why Phase X failed)
- Measure quality (verification pass rates)
- Improve over time (analyze patterns across projects)

**ROI**: Even saving 1 retry per project (saved ~$1 and 30 minutes) pays for itself immediately.

---

*Last updated: 2025-10-21*
*Integration tested with: Claude Code CLI v1.0, LangFuse v2.0*
