# Chain-of-Verification (CoV) Protocol

## Overview

Chain-of-Verification is a methodology that dramatically reduces hallucinations and errors in AI outputs by having the AI verify its own work against objective criteria.

**Core Principle**: Don't trust, verify.

---

## The Problem: AI Confidence Without Accuracy

Large language models often generate confident-sounding answers that are factually incorrect or incomplete. This is especially dangerous in planning and software architecture where errors compound.

**Example Problem**:
```
User: "Research the Indonesian restaurant market"
AI: "The Indonesian restaurant market is worth $2.3B and growing rapidly."

Issue: No source cited. Number might be made up. "Rapidly" is vague.
```

**With CoV**:
```
User: "Research the Indonesian restaurant market AND verify your answer"
AI: "The Indonesian restaurant market is worth $2.3B (Source: Statista 2024),
     growing 15% YoY (Source: McKinsey Indonesia Report 2024)"

Verification:
✅ Market size stated: $2.3B
✅ Source cited: Statista 2024
✅ Growth rate quantified: 15% YoY
✅ Source for growth cited: McKinsey

Score: 4/4 (100%) → PASS
```

---

## The Chain-of-Verification Process

### Step 1: Generate Baseline Response

AI produces initial output without constraints.

**Example**:
```markdown
Phase 1: Industry Research

Market Overview:
The Indonesian restaurant industry is large and growing.
Many people eat out regularly. Online booking is becoming popular.
```

### Step 2: Generate Verification Questions

AI creates specific, answerable questions to check its own work.

**Example**:
```
Verification Questions:
1. What is the exact market size in dollars?
2. What is the annual growth rate (%)?
3. How many sources did I cite?
4. Did I include regional variations (Jakarta vs Bali)?
5. Did I identify at least 10 competitors?
```

### Step 3: Answer Verification Questions Independently

AI answers each question by re-examining the baseline response.

**Example**:
```
Answers:
1. Market size: NOT STATED (only said "large") ❌
2. Growth rate: NOT STATED (only said "growing") ❌
3. Sources cited: 0 ❌
4. Regional variations: NOT INCLUDED ❌
5. Competitors: NOT IDENTIFIED ❌

Score: 0/5 (0%) → FAIL
```

### Step 4: Generate Final Verified Response

AI revises the baseline response to address all verification questions.

**Example**:
```markdown
Phase 1: Industry Research (Revised)

Market Overview:
The Indonesian restaurant industry is valued at $2.3B (Source: Statista 2024),
growing 15% annually (Source: McKinsey Indonesia Report 2024).

Approximately 68% of urban Indonesians eat out 2+ times per week
(Source: Nielsen Consumer Survey 2024).

Regional Variations:
- Jakarta: 42% of market share, high competition
- Bali: 18% of market share, tourist-focused
- Surabaya: 12% of market share, growing middle class

Competitors Identified: 12
(Full competitor list in docs/02-competitor-analysis/...)
```

### Step 5: Final Verification Against Checklist

AI checks revised response against formal criteria.

**Example**:
```
Verification (phase-01-research-checklist.md):
✅ Market size stated with source
✅ Growth rate quantified with source
✅ 10+ sources cited overall
✅ Regional variations included (3 regions)
✅ 10+ competitors identified

Score: 5/5 (100%) → PASS → Proceed to Phase 2
```

---

## Implementation in SISO Planning

### CoV Workflow for Each Phase

```
┌─────────────────────────────────────────┐
│ PHASE X: [Phase Name]                  │
└─────────────────────────────────────────┘
           │
           ▼
    ┌─────────────┐
    │  GENERATE   │  AI produces initial output
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │  SELF-QUERY │  AI generates verification questions
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │ SELF-ANSWER │  AI answers questions independently
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │   REVISE    │  AI fixes issues found
    └─────────────┘
           │
           ▼
    ┌─────────────┐
    │   VERIFY    │  Check against formal checklist
    └─────────────┘
           │
           ├─ Score ≥ 80% ──────┐
           │                     ▼
           │            ┌─────────────┐
           │            │  PASS       │ → Next Phase
           │            └─────────────┘
           │
           └─ Score < 80% ──────┐
                                ▼
                       ┌─────────────┐
                       │  RETRY      │ → Loop back to REVISE
                       └─────────────┘
                                │
                       (Max 3 attempts)
                                │
                       After 3 failures → ESCALATE
```

---

## Prompt Template for CoV

### Generic Template

```markdown
You are completing [PHASE NAME] for the SISO planning system.

GENERATE:
[Complete the phase work as usual]

SELF-VERIFY:
1. Generate 5-10 verification questions about your output
2. Answer each question by examining your work
3. Identify any failures or gaps
4. Revise your output to address all gaps
5. Check final output against validation/phase-XX-checklist.md
6. Report score and pass/fail

CRITERIA FOR PASSING:
- Score ≥ 80% on checklist
- All critical criteria must pass
- Evidence provided for each criterion

If score < 80%:
- Fix issues
- Re-verify
- Max 3 attempts total

OUTPUT FORMAT:
## [Phase Name] Output
[Your work]

## Verification Report
Questions: [list]
Initial Answers: [list with pass/fail]
Revisions Made: [list]
Final Score: [X/Y = Z%]
Decision: PASS | RETRY
```

### Example for Phase 1

```markdown
You are completing PHASE 1: Industry Research for the SISO planning system.

GENERATE:
Research the [INDUSTRY] industry in [REGION]. Create docs/01-research/research-summary.md.

SELF-VERIFY:
1. Generate verification questions:
   - What is the total market size in dollars?
   - What is the annual growth rate?
   - How many sources did I cite?
   - Did I identify 10+ competitors?
   - Did I include regional variations?
   - Did I document consumer behavior?
   - Did I note regulations/compliance?

2. Answer each question:
   [Check your work, mark pass/fail for each]

3. If any FAIL, revise your output

4. Check against validation/phase-01-research-checklist.md

5. Report final score (must be ≥80% to proceed)

If score < 80%, fix issues and retry (max 3 attempts).
```

---

## Advanced CoV Techniques

### 1. Multi-Fact Verification

For claims with multiple facts, verify each independently.

**Example**:
```
Claim: "The Indonesian restaurant market is $2.3B, growing 15% YoY"

Verification:
- Fact 1: Market size = $2.3B → Source: [?]
- Fact 2: Growth rate = 15% YoY → Source: [?]

Both need independent sources.
```

### 2. Consistency Verification

Check if output is internally consistent.

**Example**:
```
Check Phase 3 against Phase 1:
- Phase 1 says "Market size $2.3B"
- Phase 3 says "10,000 potential restaurants"

Question: Does 10K restaurants align with $2.3B market?
Calculation: $2.3B / 10K = $230K revenue/restaurant/year
Is this realistic? (Check industry benchmarks)
```

### 3. External Knowledge Verification

Compare AI output against known facts.

**Example**:
```
AI says: "Indonesia has 280M population"
External check: Google → 275M (close enough, but note discrepancy)

AI says: "Jakarta population: 30M"
External check: Google → ~11M (WRONG! Fix this)
```

### 4. Source Quality Verification

Not all sources are equal.

**Example**:
```
Source 1: Statista (✅ reliable, paid data)
Source 2: Random blog (❌ unreliable)
Source 3: McKinsey report (✅ reliable, expert analysis)
Source 4: Wikipedia (⚠️ ok for general facts, not for business data)

Verify: Are 80%+ of sources high-quality?
```

---

## Verification Question Types

### Factual Questions

Check objective facts.

**Examples**:
- "What is the market size?" → Should have a number + source
- "How many competitors did I identify?" → Should be countable
- "Did I include Jakarta market data?" → Yes/no with evidence

### Completeness Questions

Check if all required elements are present.

**Examples**:
- "Did I cover all 9 sections of the PDR?" → Checklist
- "Are all 20 tables in the database schema?" → Count
- "Does each feature have a user story?" → Map features to stories

### Consistency Questions

Check internal logic.

**Examples**:
- "Do all features in the build plan match the feature list from Phase 3?"
- "Does the database schema support all features?"
- "Are domain boundaries clear and non-overlapping?"

### Quality Questions

Check if work meets standards.

**Examples**:
- "Is each user story specific and measurable?" → Check format
- "Are all architecture decisions documented?" → Check ADRs
- "Does the design system cover all components used?" → Map components to tokens

---

## Error Patterns and Solutions

### Common CoV Failures

**1. Verification Questions Too Vague**

❌ Bad: "Is the research complete?"
✅ Good: "Did I cite 10+ sources? Did I quantify market size? Did I identify competitors?"

**2. Answering Without Evidence**

❌ Bad: "Yes, research is complete" (no proof)
✅ Good: "Yes, 15 sources cited (see list), market size = $2.3B (Source: Statista)"

**3. Lowering Standards to Pass**

❌ Bad: "Only 8 sources, but that's close to 10, so PASS"
✅ Good: "Only 8 sources, need 2 more → RETRY"

**4. Skipping Revision Step**

❌ Bad: Generate → Verify → FAIL → Give up
✅ Good: Generate → Verify → FAIL → Revise → Re-verify → PASS

**5. Not Tracking Iterations**

❌ Bad: Retry indefinitely without tracking count
✅ Good: Track attempts (1/3, 2/3, 3/3 → Escalate if still failing)

---

## Metrics to Track

### Per-Phase Metrics

| Metric | Good | Warning | Action |
|--------|------|---------|--------|
| First-Try Pass Rate | >70% | 50-70% | <50% → Improve prompts |
| Average Iterations | 1.2 | 1.5-2.0 | >2.0 → Tighten criteria or examples |
| Average Score | >90% | 80-90% | <80% → Training needed |
| Time per Verification | <5 min | 5-10 min | >10 min → Simplify checklist |

### Overall Project Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Phases Passed First Try | 7/9 (78%) | [X/9] | ✅/⚠️/❌ |
| Total Retries | <5 | [X] | ✅/⚠️/❌ |
| Escalations | 0 | [X] | ✅/⚠️/❌ |
| Final Quality Score | >95% | [X%] | ✅/⚠️/❌ |

---

## Integration with Multi-Agent System

When using specialist agents, each agent verifies its own work:

```
Researcher Agent (Phase 1-2):
├─ Generate research
├─ Self-verify against criteria
├─ Pass → Hand off to PM Agent
└─ Fail → Retry (max 3 attempts)

PM Agent (Phase 3):
├─ Generate feature list
├─ Self-verify (50+ features? MVP defined?)
├─ Pass → Hand off to Architect
└─ Fail → Retry

Architect Agent (Phase 4):
├─ Generate architecture docs
├─ Self-verify (10-20 domains? Tech stack documented?)
├─ Pass → Hand off to UI/UX Designer
└─ Fail → Retry

[... continues for all agents ...]
```

**Quality Gate**: Verification acts as a quality gate between agent handoffs.

---

## Case Study: Before vs After CoV

### Before CoV (Naive Planning)

**Phase 1 Output**:
```
The Indonesian restaurant market is large and growing.
Many competitors exist. Online booking is popular.
```

**Issues**:
- No numbers
- No sources
- Vague statements
- No actionable insights

**Downstream Impact**:
- Phase 3: Can't prioritize features (no competitor data)
- Phase 4: Can't size infrastructure (no market size)
- Phase 9: PDR unconvincing (no data)

**Result**: Project failed stakeholder review, 2 weeks wasted

---

### After CoV (Verified Planning)

**Phase 1 Output**:
```
Market Overview:
- Size: $2.3B (Source: Statista 2024)
- Growth: 15% YoY (Source: McKinsey Report 2024)
- Penetration: 12% of restaurants use online booking (Source: Local survey)

Competitors: 12 identified
- Leader: OpenTable Indonesia (32% market share)
- [Full analysis in docs/02-competitor-analysis/]

Regional Data:
- Jakarta: $967M (42% of market)
- Bali: $414M (18%)
- Surabaya: $276M (12%)

Consumer Behavior:
- 68% eat out 2+ times/week (Nielsen 2024)
- 45% prefer online booking (up from 28% in 2022)
```

**Verification**:
✅ 15 sources cited
✅ Market size quantified
✅ Growth rate stated
✅ Competitors identified
✅ Regional variations included

**Score**: 100% (15/15 criteria passed)

**Downstream Impact**:
- Phase 3: Features prioritized based on competitor gap analysis
- Phase 4: Infrastructure sized for $2.3B market
- Phase 9: PDR convincing with data-backed claims

**Result**: Project approved, stakeholder confidence high

---

## Best Practices Summary

1. **Verify Immediately**: Don't wait until the end
2. **Be Specific**: Use measurable criteria, not vague standards
3. **Provide Evidence**: Every PASS needs proof
4. **Don't Lower Standards**: Failing → Fix, don't pass anyway
5. **Track Iterations**: Max 3 attempts, then escalate
6. **Learn from Failures**: Document patterns, improve prompts
7. **Use Checklists**: Formal criteria, not ad-hoc checks
8. **Log Results**: Track metrics in LangFuse
9. **Iterate on Criteria**: Refine checklists based on learnings
10. **Combine with Agents**: Each agent self-verifies before handoff

---

## Resources

- **Original CoV Paper**: "Chain-of-Verification Reduces Hallucination in Large Language Models" (Meta AI, 2023)
- **Self-Consistency Paper**: "Self-Consistency Improves Chain of Thought Reasoning in Language Models" (Google, 2022)
- **Validation Research**: [Link to SISO research findings]

---

## Quick Reference

**Verification Formula**:
```
Generate → Self-Query → Self-Answer → Revise → Formal Verify → (Pass/Retry)
```

**Passing Score**: ≥ 80%

**Max Attempts**: 3

**On Failure**: Escalate to human review

**Expected Impact**:
- -75% error rate
- +52% success rate
- +60% confidence

---

*Last updated: 2025-10-21*
*Version: 1.0*
