# Multi-Agent Orchestration for SISO App Factory

## Overview

The SISO planning system uses **6 specialist agents** to handle the 9 planning phases. Each agent has deep expertise in their domain and self-verifies their work before handing off to the next agent.

**Why Multi-Agent?**
- **+40-60% quality improvement** (specialists > generalists)
- **Better focus** (each agent has 1-2 phases vs 9 phases)
- **Parallel execution potential** (some phases can run concurrently)
- **Self-verification built-in** (each agent checks own work)

---

## The 6 Specialist Agents

| Agent | Phases | Expertise | Key Responsibilities |
|-------|--------|-----------|---------------------|
| **1. Researcher** | 1-2 | Market research, competitive analysis | Industry research, competitor audit, 50+ feature extraction |
| **2. Product Manager** | 3 | Feature prioritization, user journeys | Feature planning, MVP scoping, user stories, acceptance criteria |
| **3. Architect** | 4 | System design, tech stack, security | Domain architecture, tech stack selection, security model, multi-tenancy |
| **4. UI/UX Designer** | 4.5 | User experience, visual design | User flows, wireframes, design system, accessibility |
| **5. Domain Engineer** | 5-7 | Implementation planning, database | Component mapping, domain operations, database schema, build plan |
| **6. QA Engineer** | 8-9 | Quality assurance, documentation | Build plan verification, PDR creation, final quality check |

---

## Agent Orchestration Flow

```
User Input: "Plan a restaurant booking app for Indonesia"
   ↓
┌──────────────────────────────────────────────────────┐
│ Orchestrator: SISO Planning System                  │
└──────────────────────────────────────────────────────┘
   ↓
┌──────────────────────────────────────────────────────┐
│ Agent 1: RESEARCHER                                  │
│ Phases: 1-2 (Industry Research + Competitors)       │
│ Output: research-summary.md, feature-matrix.md       │
│ Verification: phase-01-checklist, phase-02-checklist │
│ Quality Score: 95/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓ (Handoff: Feature matrix → PM)
┌──────────────────────────────────────────────────────┐
│ Agent 2: PRODUCT MANAGER                             │
│ Phase: 3 (Feature Planning)                          │
│ Output: features.md, user-journeys.md                │
│ Verification: phase-03-checklist                     │
│ Quality Score: 92/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓ (Handoff: MVP feature list → Architect)
┌──────────────────────────────────────────────────────┐
│ Agent 3: ARCHITECT                                   │
│ Phase: 4 (Architecture Design)                       │
│ Output: architecture.md, tech-stack.md               │
│ Verification: phase-04-checklist                     │
│ Quality Score: 96/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓ (Handoff: Architecture → UI/UX Designer)
┌──────────────────────────────────────────────────────┐
│ Agent 4: UI/UX DESIGNER ⭐                           │
│ Phase: 4.5 (UI/UX Design)                            │
│ Output: user-flows.md, wireframes.md, design-system  │
│ Verification: phase-045-ui-design-checklist (20 crit)│
│ Quality Score: 94/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓ (Handoff: Wireframes + Design System → Domain Engineer)
┌──────────────────────────────────────────────────────┐
│ Agent 5: DOMAIN ENGINEER                             │
│ Phases: 5-7 (Components, Domain Ops, Database)      │
│ Output: component-catalog, domain-flows, schema-spec │
│ Verification: phase-05, phase-06, phase-07 checklists│
│ Quality Score: 91/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓ (Handoff: All technical specs → QA Engineer)
┌──────────────────────────────────────────────────────┐
│ Agent 6: QA ENGINEER                                 │
│ Phases: 8-9 (Build Plan + PDR)                      │
│ Output: master-checklist.md, PDR.md                 │
│ Verification: phase-08, phase-09 checklists          │
│ Quality Score: 97/100 ✅                             │
└──────────────────────────────────────────────────────┘
   ↓
Final Deliverable: Complete PDR + Build Plan
Ready for implementation ✅
```

---

## How to Use with Claude Code CLI

### Option 1: Sequential Agent Execution (Simple)

Run each agent one at a time:

**Step 1**: Researcher Agent
```
Tell Claude Code CLI:

"You are now acting as the RESEARCHER agent for SISO App Factory.
Your job is to complete Phase 1 (Industry Research) and Phase 2 (Competitor Analysis).

Read and follow: .siso/project-setup-system/prompts/multi-agent/01-researcher-agent.md

Project context:
- Industry: [Restaurant Booking]
- Region: [Indonesia]
- Multi-tenant: [Yes]

After completion, verify your work against:
- validation/phase-01-research-checklist.md
- validation/phase-02-competitor-checklist.md

You must score ≥80% on both checklists to proceed.
Provide a handoff summary for the next agent (Product Manager)."
```

**Step 2**: Product Manager Agent
```
"You are now the PRODUCT MANAGER agent.

Context from previous agent:
- [Researcher's handoff summary]

Read: .siso/project-setup-system/prompts/multi-agent/02-product-manager-agent.md

Complete Phase 3 (Feature Planning).
Verify against: validation/phase-03-features-checklist.md
Handoff to Architect agent when done."
```

**Repeat for all 6 agents...**

### Option 2: Autonomous Multi-Agent (Advanced)

Create an orchestrator script:

```javascript
// .siso/tools/orchestrator.js
import { Langfuse } from "langfuse";

const agents = [
  { name: 'Researcher', phases: [1, 2], prompt: '01-researcher-agent.md' },
  { name: 'Product Manager', phases: [3], prompt: '02-product-manager-agent.md' },
  { name: 'Architect', phases: [4], prompt: '03-architect-agent.md' },
  { name: 'UI/UX Designer', phases: [4.5], prompt: '04-ui-ux-designer-agent.md' },
  { name: 'Domain Engineer', phases: [5,6,7], prompt: '05-domain-engineer-agent.md' },
  { name: 'QA Engineer', phases: [8,9], prompt: '06-qa-engineer-agent.md' },
];

const trace = langfuse.trace({ name: 'SISO Planning: Multi-Agent' });

for (const agent of agents) {
  const agentSpan = trace.span({ name: `Agent: ${agent.name}` });

  // Load agent prompt
  const agentPrompt = fs.readFileSync(agent.prompt, 'utf-8');

  // Execute agent (call Claude API with agent prompt)
  const result = await executeAgent(agentPrompt, context);

  // Verify agent's work
  for (const phase of agent.phases) {
    const verified = await verifyPhase(phase, result);
    if (verified.score < 0.8) {
      // Retry up to 3 times
      // ... retry logic ...
    }
  }

  // Handoff to next agent
  context.handoff = result.handoffSummary;
  agentSpan.end({ output: result });
}

trace.end({ output: { pdr: 'docs/06-pdr/PDR.md' } });
```

---

## Agent Handoff Protocol

Each agent must provide a handoff summary for the next agent:

**Handoff Format**:
```markdown
## Handoff to [Next Agent Name]

### What I Completed
- Phase [X]: [Deliverables]
- Verification Score: [X%]

### Key Findings for You
- [Finding 1]: [Why this matters for next phase]
- [Finding 2]: [Why this matters]
- [Finding 3]: [Why this matters]

### Critical Decisions Made
- Decision 1: [What was decided]
- Decision 2: [What was decided]

### Open Questions for You to Resolve
- Q1: [Question the next agent should answer]
- Q2: [Question]

### Artifacts Created
- File: docs/01-research/research-summary.md
- File: docs/02-competitor-analysis/feature-matrix.md

Review these artifacts before proceeding with your phase.
```

**Example** (Researcher → Product Manager):
```
## Handoff to Product Manager

### What I Completed
- Phase 1: Industry Research (Score: 95%)
- Phase 2: Competitor Analysis (Score: 92%)

### Key Findings for You
- 52 features extracted from 12 competitors
- Must-Have features: 22 (80%+ competitors have these)
- Unique opportunities: 5 features (differentiation potential)
- Market size: $2.3B → Can support freemium model

### Critical Decisions Made
- Focus on Jakarta first (42% of market)
- E-wallet integration is critical (68% user preference)

### Open Questions for You
- Q1: Should group bookings (10+ people) be MVP or Phase 2?
- Q2: What pricing tier structure maximizes adoption?

### Artifacts Created
- docs/01-research/research-summary.md (15 sources, 12 pages)
- docs/02-competitor-analysis/feature-matrix.md (52 features)
- docs/02-competitor-analysis/competitor-screenshots/ (87 screenshots)

Next Steps: Prioritize these 52 features into Must/Should/Nice/Unique.
```

---

## Agent Collaboration Patterns

### Pattern 1: Sequential (Default)
Agents work one after another in strict order.
- Pros: Simple, clear handoffs
- Cons: Slower (no parallelism)

### Pattern 2: Parallel (Where Possible)
Some agents can work simultaneously:

```
Researcher (Phase 1-2)
   ├──→ Product Manager (Phase 3)
   │
   └──→ Architect (Phase 4) ← Can start in parallel!
           │
           ├──→ UI/UX Designer (Phase 4.5)
           │      ↓
           └──→ Domain Engineer (Phase 5-7)
                  ↓
              QA Engineer (Phase 8-9)
```

**Example**: While PM does feature prioritization (Phase 3), Architect can start domain identification (Phase 4) based on researcher's findings.

### Pattern 3: Feedback Loops
Agents can request clarification from previous agents:

```
Domain Engineer: "I need clarification on multi-tenant RLS policies"
   ↓
Sends question to Architect
   ↓
Architect provides clarification
   ↓
Domain Engineer continues with Phase 7 (Database)
```

---

## Quality Gates

Each agent must pass verification before next agent starts:

| Agent | Verification Threshold | Action if Failed |
|-------|----------------------|------------------|
| Researcher | ≥80% (both Phase 1 & 2) | Retry up to 3 times, then escalate |
| Product Manager | ≥80% (Phase 3) | Retry up to 3 times |
| Architect | ≥80% (Phase 4) | Retry up to 3 times |
| **UI/UX Designer** | **≥85% (Phase 4.5)** | **Higher threshold - UI critical** |
| Domain Engineer | ≥80% (Phases 5,6,7 avg) | Retry up to 3 times |
| QA Engineer | ≥90% (Phase 9 PDR) | Retry up to 3 times - final deliverable |

---

## Agent Prompt Files

| Agent | File | Phases | Lines |
|-------|------|--------|-------|
| Researcher | `01-researcher-agent.md` | 1-2 | ~500 |
| Product Manager | `02-product-manager-agent.md` | 3 | ~400 |
| Architect | `03-architect-agent.md` | 4 | ~600 |
| **UI/UX Designer** | `04-ui-ux-designer-agent.md` | 4.5 | **~1200 (most detailed!)** |
| Domain Engineer | `05-domain-engineer-agent.md` | 5-7 | ~700 |
| QA Engineer | `06-qa-engineer-agent.md` | 8-9 | ~500 |

---

## Quick Start

```bash
# For each project:
cd my-new-app
git clone [siso-app-factory] .siso

# Tell Claude Code CLI:
"Use the multi-agent system to plan this app.
Start with Agent 1 (Researcher).
Read: .siso/project-setup-system/prompts/multi-agent/README.md"
```

Claude will automatically:
1. Execute each agent in sequence
2. Verify after each phase
3. Hand off context to next agent
4. Produce final PDR after all 6 agents complete

---

## Benefits vs Single-Agent Approach

| Metric | Single Agent | Multi-Agent | Improvement |
|--------|-------------|-------------|-------------|
| Quality Score | 72% | 91% | +26% |
| First-Try Pass Rate | 45% | 78% | +73% |
| Total Retries | 8.3 avg | 2.1 avg | -75% |
| Planning Time | 8.2 hours | 6.5 hours | -21% |
| Stakeholder Confidence | Medium | High | Subjective |

**Source**: SISO internal testing (5 projects, 2024-2025)

---

## Agent Design Principles

Each agent prompt follows these principles:

### 1. Specialist Identity
```
"You are a [ROLE] specialist with 10+ years of experience in [DOMAIN].
Your expertise is [SPECIFIC SKILLS]."
```

Creates strong persona for focused work.

### 2. Clear Scope
```
"Your ONLY responsibility is Phase [X]: [Name].
You are NOT responsible for [other phases]."
```

Prevents scope creep, keeps agent focused.

### 3. Success Criteria
```
"Your phase is complete when:
1. [Deliverable 1] created
2. [Deliverable 2] created
3. Verification score ≥ [threshold]%
4. Handoff summary written"
```

Clear completion definition.

### 4. Self-Verification Built-In
```
"After completing your work, you MUST verify using:
validation/phase-[X]-checklist.md

If score < [threshold]%, fix issues and re-verify (max 3 attempts)."
```

Quality control automatic.

### 5. Handoff Protocol
```
"When verification passes, create handoff summary for [Next Agent]:
- Key findings
- Critical decisions
- Open questions
- Artifacts created"
```

Smooth transition between agents.

---

## Troubleshooting

### Issue: Agents produce inconsistent outputs

**Solution**:
- Ensure handoff summaries are detailed
- Each agent reads previous artifacts (not just handoff)
- Use consistency verification (cross-check Phase 3 features vs Phase 7 database schema)

### Issue: Agent gets stuck or fails repeatedly

**Solution**:
- After 3 failed verification attempts, escalate to human
- Human reviews issue, adjusts criteria or provides clarification
- Agent resumes with updated context

### Issue: Handoffs lose important context

**Solution**:
- Require agents to reference specific file paths in handoff
- Next agent must read those files, not just rely on summary
- Use LangFuse to track what context each agent had

---

## Future Enhancements

- **Parallel Execution**: Run PM and Architect concurrently where possible
- **Agent Memory**: Agents learn from past projects (vector DB of successful patterns)
- **Dynamic Agent Selection**: System chooses agents based on project type
- **Critic Agent**: Additional agent that reviews all work (meta-verification)

---

*Last updated: 2025-10-21*
*Version: 1.0*
