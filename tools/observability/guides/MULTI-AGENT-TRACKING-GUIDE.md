# Multi-Agent Concurrent Tracking - LangFuse Guide

## The Problem

You have **multiple Claude Code CLI sessions** running simultaneously:
- Session 1: Researcher Agent (Phases 1-2)
- Session 2: Architect Agent (Phase 4) - running in parallel
- Session 3: UI/UX Designer Agent (Phase 4.5)
- etc.

**Challenge**: How do you track all of them under ONE trace so you can see the complete project?

---

## Solution: Shared Trace ID

All agents share the **same trace ID** stored in `.langfuse-trace.json`.

### How It Works

```
┌──────────────────────────────────────────┐
│ Main Trace: "Restaurant App Planning"   │
│ Trace ID: abc-123-xyz                   │
├──────────────────────────────────────────┤
│                                          │
│ ├─ Agent 1: Researcher (Session 1)      │
│ │  ├─ Phase 1: Research                 │
│ │  └─ Phase 2: Competitors              │
│ │                                        │
│ ├─ Agent 2: Architect (Session 2)       │ ← Running in parallel!
│ │  └─ Phase 4: Architecture             │
│ │                                        │
│ ├─ Agent 3: UI/UX Designer (Session 3)  │
│ │  └─ Phase 4.5: UI/UX Design           │
│ │                                        │
│ └─ [... other agents ...]                │
│                                          │
└──────────────────────────────────────────┘

All agents use same trace ID (abc-123-xyz)
→ LangFuse shows them in ONE trace
→ Can see cost/time for ALL agents
```

---

## Setup: Multi-Agent Tracking

### Step 1: Initialize ONCE (Main Orchestrator)

```bash
# Run this ONCE at the start (before spawning agents)
cd ~/my-project
node .siso/tools/observability/scripts/langfuse-init.js "Restaurant App" "restaurant" "Indonesia"

# This creates: .langfuse-trace.json
# Contains: { traceId: "abc-123-xyz", ... }
```

✅ **All agents will read this file to get the shared trace ID**

### Step 2: Spawn Multiple Agent Sessions

**Session 1: Researcher Agent**
```bash
# New terminal window/tab
cd ~/my-project

# Tell Claude (Session 1):
"You are the RESEARCHER agent.
Read: .siso/project-setup-system/prompts/multi-agent/01-researcher-agent.md

Load trace: Read .langfuse-trace.json to get trace ID
Use that trace for ALL your tracking.

Complete Phases 1-2.
Track each phase to LangFuse using the SHARED trace."
```

**Session 2: Architect Agent** (can run in parallel!)
```bash
# New terminal window/tab
cd ~/my-project

# Tell Claude (Session 2):
"You are the ARCHITECT agent.
Read: .siso/project-setup-system/prompts/multi-agent/03-architect-agent.md

Load trace: Read .langfuse-trace.json to get trace ID
Use that trace for tracking.

Complete Phase 4.
Track to LangFuse using SHARED trace."
```

**Both agents running concurrently** → Both tracking to same trace!

---

## Tracking from Multiple Sessions

### Each Agent Reads Shared Trace ID

When agent tracks a phase:

```javascript
// In langfuse-track-generation.js (already handles this)

// Load trace info (SHARED across all agents)
const traceInfo = JSON.parse(fs.readFileSync('.langfuse-trace.json'));

// Use SAME trace ID
const trace = langfuse.trace({ id: traceInfo.traceId }); // ← Same ID for all agents

// Create generation under shared trace
const generation = trace.generation({
  name: 'Phase X: [Name]',
  model: 'claude-sonnet-4.5',
  // ... other fields
  metadata: {
    agent: 'researcher-agent', // ← Identifies which agent did this
    session: 'session-1',      // ← Identifies which CLI session
    // ...
  }
});
```

**Result**: All agents' work appears under ONE trace in LangFuse!

---

## Identifying Which Agent Did What

### Use Session IDs

Update the tracking script to include session identifier:

```bash
# Session 1 (Researcher)
SESSION_ID="session-1-researcher" node .siso/tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95

# Session 2 (Architect - running in parallel)
SESSION_ID="session-2-architect" node .siso/tools/observability/scripts/langfuse-track-generation.js 4 "claude-sonnet-4.5" 20000 25000 "45m" 96

# Session 3 (UI/UX Designer)
SESSION_ID="session-3-ui-ux" node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38m" 90
```

Let me create an enhanced tracking script that supports session IDs:

---

## Enhanced Multi-Session Tracking Script

Create this updated version:

```javascript
// tools/langfuse-track-multi.js

import { Langfuse } from "langfuse";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Parse arguments
const sessionId = process.env.SESSION_ID || 'session-1'; // From environment
const agentName = process.env.AGENT_NAME || 'unknown';  // From environment
const phaseNum = process.argv[2];
const model = process.argv[3] || 'claude-sonnet-4.5';
const inputTokens = parseInt(process.argv[4]) || 0;
const outputTokens = parseInt(process.argv[5]) || 0;
const duration = process.argv[6] || 'unknown';
const score = parseInt(process.argv[7]) || 0;

// Load SHARED trace
const traceInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../.langfuse-trace.json')));

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Get SHARED trace
const trace = langfuse.trace({ id: traceInfo.traceId });

// Track this agent's work
const generation = trace.generation({
  name: `Phase ${phaseNum}: ${phaseData[phaseNum].name}`,
  model: model,
  usage: {
    promptTokens: inputTokens,
    completionTokens: outputTokens,
    totalTokens: inputTokens + outputTokens,
  },
  metadata: {
    agent: agentName,           // Which agent (researcher, architect, ui-ux)
    session: sessionId,         // Which CLI session
    phase: phaseNum,
    duration: duration,
    verificationScore: score,
    environment: 'planning',
    industry: traceInfo.industry,
    region: traceInfo.region,
  },
  tags: [
    'planning',
    `phase-${phaseNum}`,
    agentName,
    sessionId,
    traceInfo.industry,
    traceInfo.region,
  ],
});

console.log(`✅ Tracked Phase ${phaseNum} from ${agentName} (${sessionId})`);

await langfuse.shutdownAsync();
```

**Usage**:
```bash
# Session 1 (Researcher Agent)
SESSION_ID="session-1" AGENT_NAME="researcher-agent" \
  node .siso/tools/langfuse-track-multi.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95

# Session 2 (Architect - running in parallel)
SESSION_ID="session-2" AGENT_NAME="architect-agent" \
  node .siso/tools/langfuse-track-multi.js 4 "claude-sonnet-4.5" 20000 25000 "45m" 96

# Session 3 (UI/UX Designer)
SESSION_ID="session-3" AGENT_NAME="ui-ux-agent" \
  node .siso/tools/langfuse-track-multi.js 4.5 "claude-sonnet-4.5" 15000 13000 "38m" 90
```

---

## LangFuse Dashboard View (Multi-Session)

### What You'll See

```
Trace: Restaurant App Planning
├─ Duration: 6.5 hours total
├─ Cost: $5.12 total
├─ Sessions: 6 concurrent agents
│
├─ Generations (10):
│   ├─ Phase 1 (session-1, researcher-agent) $0.18
│   ├─ Phase 2 (session-1, researcher-agent) $0.23
│   ├─ Phase 3 (session-2, pm-agent) $0.17
│   ├─ Phase 4 (session-3, architect-agent) $0.63 ← Running in parallel
│   ├─ Phase 4.5 (session-4, ui-ux-agent) $0.24 ← Running in parallel
│   ├─ Phase 5 (session-5, domain-engineer) $0.19
│   ├─ Phase 6 (session-5, domain-engineer) $0.36
│   ├─ Phase 7 (session-5, domain-engineer) $0.16
│   ├─ Phase 8 (session-6, qa-agent) $0.13
│   └─ Phase 9 (session-6, qa-agent) $0.11
│
└─ Metadata shows which session did what
```

### Filter by Session

```
Filter: Metadata
Key: session
Value: session-4

Result: Shows only UI/UX Designer's work (Phase 4.5)
```

### Filter by Agent

```
Filter: Tags
Contains: ui-ux-agent

Result: Shows all UI/UX work across all projects
```

---

## Simpler Approach: Tell Claude to Track

You don't need to manually run scripts for each session. Just tell each Claude session:

```
"You are Agent X.

Load the shared trace:
- Read .langfuse-trace.json
- Get trace ID

When you complete a phase, track it:
node .siso/tools/observability/scripts/langfuse-track-generation.js <phase> "claude-sonnet-4.5" <inputTokens> <outputTokens> <duration> <score>

The script automatically handles shared trace ID.
Your work will appear in the main project trace."
```

**Claude will**:
- Read `.langfuse-trace.json` (shared file)
- Get the trace ID
- Track its work under that trace
- Your dashboard shows all agents' work together!

---

## Parallel Agent Example

### Scenario: 3 Agents Running Simultaneously

**Terminal 1: Researcher** (Phases 1-2)
```bash
cd ~/my-project

# Claude 1:
"Researcher agent, complete Phases 1-2.
Track each phase to shared LangFuse trace."
```

**Terminal 2: Architect** (Phase 4 - can start after Phase 1 completes)
```bash
cd ~/my-project

# Claude 2 (in parallel):
"Architect agent, complete Phase 4.
Track to shared LangFuse trace."
```

**Terminal 3: PM** (Phase 3 - depends on Phase 2)
```bash
cd ~/my-project

# Claude 3:
"Product Manager agent, complete Phase 3 after Researcher finishes Phase 2.
Track to shared LangFuse trace."
```

**All 3 track to same trace** → LangFuse shows complete picture!

---

## Dashboard View: Concurrent Agents

```
Trace: Restaurant App (Multi-Agent)

Timeline (Gantt-like view):
├─ 0-12m:  Phase 1 (Researcher)
├─ 12-30m: Phase 2 (Researcher)
├─ 30-45m: Phase 3 (PM)
├─ 30-75m: Phase 4 (Architect) ← Started in parallel with PM!
├─ 75-113m: Phase 4.5 (UI/UX)
├─ 113-138m: Phase 5 (Domain Eng)
├─ [... etc ...]

Parallelism Detected:
- Phase 3 (PM) and Phase 4 (Architect) ran concurrently (30-45m overlap)
- Saved time: ~15 minutes

Total Cost: $5.12
Total Duration: 6.5 hours (wall-clock time)
Actual Work Time: ~8 hours (if sequential)
Efficiency: 23% faster due to parallelism!
```

---

## Test: Multi-Session Tracking

### Quick Test (5 Minutes)

**Terminal 1**:
```bash
cd ~/test-coffee-shop-booking

# Initialize ONCE
node .siso/tools/observability/scripts/langfuse-init.js "Multi-Session Test" "test" "global"

# Tell Claude (Session 1):
"Simulate Phase 1.
Track: SESSION_ID='session-1' AGENT_NAME='researcher' node .siso/tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 5000 5000 "2m" 90"
```

**Terminal 2** (while Terminal 1 is running):
```bash
cd ~/test-coffee-shop-booking

# Tell Claude (Session 2):
"Simulate Phase 4.5 (UI/UX).
Track: SESSION_ID='session-2' AGENT_NAME='ui-ux' node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 8000 7000 "3m" 85"
```

**Dashboard Result**:
```
Trace: Multi-Session Test
├─ Phase 1 (session-1, researcher) $0.09
└─ Phase 4.5 (session-2, ui-ux) $0.13

Both under SAME trace! ✅
```

---

## Best Practices

### 1. Initialize Once

```bash
# Main orchestrator or first agent initializes
node .siso/tools/observability/scripts/langfuse-init.js "Project Name" "industry" "region"

# Creates .langfuse-trace.json with shared trace ID
# All other agents read this file
```

### 2. Each Agent Tracks Independently

```bash
# Agent 1 (in its own terminal/session)
node .siso/tools/observability/scripts/langfuse-track-generation.js [phase] [model] [tokens] [tokens] [time] [score]

# Agent 2 (in different terminal/session)
node .siso/tools/observability/scripts/langfuse-track-generation.js [phase] [model] [tokens] [tokens] [time] [score]

# Both use .langfuse-trace.json → Same trace ID → Merged in dashboard
```

### 3. Finalize Once (At the End)

```bash
# After ALL agents complete
node .siso/tools/observability/scripts/langfuse-finish.js

# This marks trace as complete
# Cleans up .langfuse-trace.json
```

---

## Advanced: Agent-Specific Metadata

### Track Which Agent in Which Session

Update `.env.local` per session:

**Session 1 (Researcher)**:
```bash
# Terminal 1 - before starting Claude
export AGENT_NAME="researcher-agent"
export SESSION_ID="session-1-researcher"

# Start Claude, tell it to track
```

**Session 2 (UI/UX Designer)**:
```bash
# Terminal 2
export AGENT_NAME="ui-ux-agent"
export SESSION_ID="session-2-ui-ux"

# Start Claude
```

Then tracking scripts automatically include this metadata!

---

## Dashboard Filtering: Multi-Session Projects

### View All Work by Specific Agent

```
Filter: Metadata
Key: agent
Value: ui-ux-agent

Result: Shows ALL Phase 4.5 work across all projects from UI/UX agent
```

### View Specific Session

```
Filter: Metadata
Key: session
Value: session-2

Result: Shows only work from that specific Claude Code CLI session
```

### View Concurrent Work

```
Filter: Tags
Contains: parallel

Result: Shows generations that ran concurrently
(Add "parallel" tag to agents running at same time)
```

---

## Example: Full Multi-Agent Test

### Terminal 1: Orchestrator

```bash
mkdir ~/test-multiagent
cd ~/test-multiagent
cp -r /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/siso-app-factory .siso
cp .siso/.env.local .env.local

# Initialize SHARED trace
node .siso/tools/observability/scripts/langfuse-init.js "Multi-Agent Test" "coffee-shop" "Indonesia"

# Output: Trace ID: xyz-abc-123
# Saved to: .langfuse-trace.json
```

### Terminal 2: Researcher Agent (Sequential)

```bash
cd ~/test-multiagent

# Tell Claude (Session 1):
"RESEARCHER AGENT TEST

Load shared trace from: .langfuse-trace.json

Complete Phase 1 (concise for test: 5 sources, 5 competitors overview)

Track:
export AGENT_NAME='researcher-agent'
export SESSION_ID='session-1'
node .siso/tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 5000 5000 "8m" 90

Then do Phase 2 (5 competitors, 30 features)

Track:
node .siso/tools/observability/scripts/langfuse-track-generation.js 2 "claude-sonnet-4.5" 7000 7000 "12m" 88

Handoff to PM when done."
```

### Terminal 3: PM + Architect (Can Start After Phase 1)

```bash
cd ~/test-multiagent

# Tell Claude (Session 2):
"PRODUCT MANAGER + ARCHITECT TEST

Load shared trace from: .langfuse-trace.json

Wait for Phase 1 to complete (check docs/01-research/ exists)

Then do Phase 3 (Feature Planning):
export AGENT_NAME='pm-agent'
export SESSION_ID='session-2'
node .siso/tools/observability/scripts/langfuse-track-generation.js 3 "claude-sonnet-4.5" 6000 6000 "10m" 85

Then IMMEDIATELY start Phase 4 (Architecture - can run in parallel with Phase 2):
export AGENT_NAME='architect-agent'
node .siso/tools/observability/scripts/langfuse-track-generation.js 4 "claude-sonnet-4.5" 12000 15000 "25m" 92"
```

### Terminal 4: UI/UX Designer (After Architecture)

```bash
cd ~/test-multiagent

# Tell Claude (Session 3):
"UI/UX DESIGNER AGENT TEST

Load shared trace from: .langfuse-trace.json

Wait for Phase 4 (Architecture) to complete.

Read: .siso/project-setup-system/prompts/multi-agent/04-ui-ux-designer-agent.md

Complete Phase 4.5 (concise for test):
- User flows: 2 flows (guest booking, admin manage)
- Wireframes: 5 pages (Home, Shop Detail, Booking, Dashboard, Settings)
- Design system: Colors + Typography + 5 components
- Accessibility: Brief WCAG checklist

Verify: validation/phase-045-ui-design-checklist.md (aim for ≥85%)

Track:
export AGENT_NAME='ui-ux-agent'
export SESSION_ID='session-3'
node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 10000 9000 "20m" 90"
```

### View in LangFuse

**While agents are running**, refresh dashboard:

```
https://cloud.langfuse.com

You'll see phases appearing from DIFFERENT sessions:
├─ Phase 1 (session-1, researcher-agent) ✅
├─ Phase 2 (session-1, researcher-agent) ✅
├─ Phase 3 (session-2, pm-agent) ✅
├─ Phase 4 (session-2, architect-agent) ✅ (ran in parallel!)
├─ Phase 4.5 (session-3, ui-ux-agent) ✅
└─ [... more as they complete ...]
```

**All under ONE trace!**

---

## Simplified Test (No Multiple Terminals)

If managing multiple terminals is complex, do this:

### Single Session, Sequential Agents

Tell ONE Claude session to act as all agents:

```
"Multi-agent planning test (sequential in one session):

Load shared trace: .langfuse-trace.json

1. ACT AS RESEARCHER (Phases 1-2)
   - Complete research and competitors (concise)
   - Track Phase 1, then Phase 2

2. SWITCH TO PM (Phase 3)
   - Complete feature planning
   - Track Phase 3

3. SWITCH TO ARCHITECT (Phase 4)
   - Complete architecture
   - Track Phase 4

4. SWITCH TO UI/UX DESIGNER (Phase 4.5) ⭐
   - Complete UI/UX design
   - Track Phase 4.5

5. SWITCH TO DOMAIN ENGINEER (Phases 5-7)
   - Complete components, operations, database
   - Track Phases 5, 6, 7

6. SWITCH TO QA ENGINEER (Phases 8-9)
   - Complete build plan and PDR
   - Track Phases 8, 9

For each phase, update AGENT_NAME environment variable:
export AGENT_NAME='researcher-agent'  # For Phases 1-2
export AGENT_NAME='pm-agent'          # For Phase 3
export AGENT_NAME='architect-agent'   # For Phase 4
export AGENT_NAME='ui-ux-agent'       # For Phase 4.5
export AGENT_NAME='domain-engineer'   # For Phases 5-7
export AGENT_NAME='qa-agent'          # For Phases 8-9

This way dashboard can differentiate by agent even in one session."
```

**Dashboard will show**:
- All 10 phases tracked
- Each with correct agent name in metadata
- Cost by agent visible (filter by metadata.agent)

---

## What to Verify in Dashboard

### After Multi-Agent Test

Go to: https://cloud.langfuse.com

**Check 1: All Phases Present**
- [ ] 10 generations visible (9 phases + Phase 4.5)

**Check 2: Cost by Agent**
- [ ] Filter by: `metadata.agent = "ui-ux-agent"`
- [ ] Shows: Phase 4.5 only
- [ ] Cost: ~$0.15-0.30 (depends on tokens)

**Check 3: Cost by Model**
- [ ] All phases show: claude-sonnet-4.5
- [ ] Total cost calculated (not $0.00)

**Check 4: Tags Work**
- [ ] Each generation has tags: [planning] [phase-X] [agent-name] [industry] [region]
- [ ] Can filter by tag: `coffee-shop`
- [ ] Shows: Only coffee shop projects

**Check 5: Parallel Detection**
- [ ] If Phase 3 and Phase 4 ran in parallel, their timestamps overlap
- [ ] LangFuse timeline shows them side-by-side

**Check 6: Session Differentiation**
- [ ] metadata.session shows which CLI session did the work
- [ ] Can filter to see work from specific session

---

## Quick Validation Checklist

After running any test, verify these work:

### System Components
- [ ] All 9 phases + Phase 4.5 execute
- [ ] Verification runs after each phase (validation/ checklists loaded)
- [ ] PDR has 13 sections (including 5 new ones)
- [ ] UI/UX phase creates 4 deliverables
- [ ] Multi-agent prompts accessible (prompts/multi-agent/)

### LangFuse Integration
- [ ] Model pricing configured (claude-sonnet-4.5, $3/$15)
- [ ] Traces visible in dashboard
- [ ] Cost auto-calculated (not $0.00)
- [ ] Model name showing (claude-sonnet-4.5)
- [ ] Metadata present (agent, environment, industry, region)
- [ ] Tags present (planning, phase-X, agent, industry)
- [ ] Can filter by agent
- [ ] Can filter by industry
- [ ] Token breakdown visible (input vs output)

### Quality
- [ ] Verification catches incomplete work (test by making Phase 1 incomplete)
- [ ] Retries work (failed verification → fix → re-verify → pass)
- [ ] UI/UX has wireframes (not just descriptions)
- [ ] PDR is professional (could show to investor)

---

## Recommended Test Sequence

**Start Here** (Choose one):

### Option A: Quick UI/UX Test (10 min)
```
"Test ONLY Phase 4.5.
Create user flows + wireframes + design system for coffee shop booking.
Track to LangFuse.
Verify in dashboard: cost calculated, ui-ux-agent metadata visible."
```

### Option B: Small End-to-End (45-60 min)
```
"Test ALL 9 phases + Phase 4.5.
Coffee shop booking app (concise versions).
Track all phases.
Verify final PDR has all 13 sections."
```

### Option C: Multi-Agent Test (45-60 min)
```
"Test multi-agent orchestration.
All 6 agents execute their phases.
Verify agent handoffs work.
Track all to shared LangFuse trace."
```

**Recommendation**: Start with **Option A** (10 min UI/UX test), then if that works, do **Option B** (full end-to-end).

---

## What Success Looks Like

### After Test Completes

✅ **Files Created**:
```
docs/
├── 01-research/research-summary.md
├── 02-competitor-analysis/feature-matrix.md
├── 03-features/features.md
├── 04.5-ui-design/
│   ├── user-flows.md ⭐
│   ├── wireframes.md ⭐
│   ├── design-system.md ⭐
│   └── accessibility-checklist.md ⭐
├── 05-technical/architecture.md
├── 05-technical/component-catalog.md
├── 05-technical/schema-spec.md
├── 06-pdr/PDR.md ⭐ (with 5 new sections)
└── 08-build-plan/master-checklist.md
```

✅ **LangFuse Dashboard**:
```
Coffee Shop Booking Test
├─ Cost: $2.34 (auto-calculated)
├─ Model: claude-sonnet-4.5 ✅
├─ Duration: 55 minutes
├─ Quality: 89/100 avg
├─ Phases: 10 (all tracked)
├─ Metadata: agent, environment, industry ✅
├─ Tags: planning, agents, industry ✅
└─ Can filter by: agent, industry, model ✅
```

✅ **PDR Quality**:
```
docs/06-pdr/PDR.md contains:
├─ Press Release (customer-focused) ✅
├─ Assumptions (25+ items) ✅
├─ Non-Goals (10+ items) ✅
├─ Open Questions (5+ items) ✅
├─ Alternatives Considered (5+ items) ✅
└─ No [TBD] placeholders ✅
```

✅ **UI/UX Quality**:
```
docs/04.5-ui-design/ contains:
├─ User flows with decision points ✅
├─ Wireframes for all pages (ASCII or Mermaid) ✅
├─ Design system (colors, typography, components) ✅
├─ Accessibility (WCAG 2.1 AA compliance) ✅
└─ siso-site-config.yaml (multi-tenant theming) ✅
```

---

## Next Steps After Successful Test

1. ✅ **Delete test project**:
   ```bash
   rm -rf ~/test-coffee-shop-booking
   ```

2. ✅ **Use for real project**:
   ```bash
   mkdir ~/real-restaurant-app
   cd ~/real-restaurant-app
   cp -r /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/siso-app-factory .siso
   # Start planning for real!
   ```

3. ✅ **Optimize based on LangFuse data**:
   - Check which phases are expensive
   - Optimize prompts for those phases
   - Reduce retries by improving examples

---

## Summary: How to Test

**EASIEST TEST** (10 minutes):
```bash
cd ~/test-coffee-shop-booking
node .siso/tools/observability/scripts/langfuse-init.js "UI Test" "test" "global"

# Tell Claude: "Do ONLY Phase 4.5. Track to LangFuse."
# Verify: 4 UI files created, tracked in dashboard with cost/model/agent
```

**FULL TEST** (45-60 minutes):
```bash
# Tell Claude: "Do all 9 phases + Phase 4.5. Track everything. Verify each phase."
# Verify: PDR complete, all phases tracked, rich LangFuse data
```

**MULTI-AGENT TEST** (45-60 minutes):
```bash
# Tell Claude: "Use 6 specialist agents, sequential execution, shared trace"
# Verify: Agent handoffs work, all tracked to one trace
```

**Start with EASIEST, then progress to FULL if that works!**

---

*Test Plan Version: 1.0*
*Created: Oct 21, 2025*
*Ready to execute immediately!*
