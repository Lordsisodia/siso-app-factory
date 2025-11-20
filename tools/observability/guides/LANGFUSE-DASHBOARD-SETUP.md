# LangFuse Dashboard Setup - Complete Configuration Guide

## The Problem You're Seeing

You can see traces, but the dashboard doesn't show:
- ❌ Cost by model name
- ❌ Cost by environment
- ❌ Cost breakdown
- ❌ Rich metadata

**Why?** We need to:
1. Configure model pricing in LangFuse
2. Use "generations" instead of "spans" for LLM calls
3. Add proper tags and metadata
4. Enable cost tracking features

Let me show you how to fix this step-by-step.

---

## Step 1: Configure Model Pricing in LangFuse Dashboard

### Go to Settings

1. Visit **https://cloud.langfuse.com**
2. Login
3. Click **⚙️ Settings** (bottom left sidebar)
4. Click **"Models"** tab

### Add Claude Sonnet 4.5 Pricing

Click **"+ Add Model"** and enter:

```
Model Name: claude-sonnet-4.5
Match Pattern: claude-sonnet-4
Provider: Anthropic

Pricing (per 1,000,000 tokens):
├─ Input Cost: $3.00
├─ Output Cost: $15.00
└─ Total Cost: [auto-calculated]

Unit: TOKENS
Currency: USD
```

Click **"Save"**

### Add Other Models (Optional)

If you use multiple models, add them too:

**Claude Opus 4**:
```
Model Name: claude-opus-4
Match Pattern: claude-opus-4
Input: $15.00
Output: $75.00
```

**GPT-5 Pro**:
```
Model Name: gpt-5-pro
Match Pattern: gpt-5-pro
Input: $10.00
Output: $30.00
```

**After adding models**, cost will automatically calculate when you use `generation()` with proper token counts.

---

## Step 2: Use Enhanced Tracking Script

Instead of `langfuse-track-phase.js`, use the new `langfuse-track-generation.js`:

### Old Way (No Cost Tracking):
Legacy span logging (formerly `langfuse-track-phase.js`) required manual cost input, had no model awareness, and offered no token breakdown—avoid this entirely.

### New Way (Full Tracking):
```bash
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12 minutes" 95
# ✅ Cost auto-calculated from token counts
# ✅ Model tracked (claude-sonnet-4.5)
# ✅ Input vs output tokens separated
# ✅ Rich metadata (agent, environment, tags)
```

**Arguments**:
1. Phase number (1, 2, 3, 4, 4.5, 5, 6, 7, 8, 9)
2. Model name (claude-sonnet-4.5, claude-opus-4, gpt-5-pro)
3. Input tokens (e.g., 8500)
4. Output tokens (e.g., 10000)
5. Duration (e.g., "12 minutes" or "12m")
6. Verification score (e.g., 95)

---

## Step 3: Tell Claude to Track with Full Metadata

### Enhanced Planning Prompt

```
"Plan a restaurant booking app for Indonesia.

LANGFUSE TRACKING (Enhanced):

1. Before starting:
   node tools/observability/scripts/langfuse-init.js "Restaurant Booking App" "restaurant" "Indonesia"

2. After EACH phase, track with FULL metadata:

   node tools/observability/scripts/langfuse-track-generation.js <phase> <model> <inputTokens> <outputTokens> <duration> <score>

   Examples:
   - After Phase 1:
     node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12 minutes" 95

   - After Phase 2:
     node tools/observability/scripts/langfuse-track-generation.js 2 "claude-sonnet-4.5" 12000 13000 "18 minutes" 92

   - After Phase 4.5 (UI/UX):
     node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38 minutes" 90

   [... for all 9 phases ...]

3. For token counts:
   - Input tokens: Estimate context size (prompts, previous docs read)
   - Output tokens: Estimate generated content size
   - Or use actual counts if you can track them

4. After all phases complete:
   node tools/observability/scripts/langfuse-finish.js

NOW BEGIN PLANNING with multi-agent orchestration.
Follow: .siso/project-setup-system/MASTER-SETUP-PROMPT.md
Use: .siso/project-setup-system/prompts/multi-agent/ specialist agents
Verify: Use validation/ checklists after each phase"
```

---

## Step 4: Enable Dashboard Features

### In LangFuse Dashboard

#### A. Enable Cost Tracking

1. Go to **Settings → Models**
2. Verify your models are added (claude-sonnet-4.5, etc.)
3. Pricing should show (Input: $3, Output: $15 per 1M tokens)

#### B. Configure Tags

1. Go to **Settings → Tags**
2. Add common tags:
   - `planning`
   - `researcher-agent`
   - `pm-agent`
   - `architect-agent`
   - `ui-ux-agent`
   - `domain-engineer-agent`
   - `qa-agent`
   - `restaurant`
   - `tour-guide`
   - `bike-rental`
   - `indonesia`
   - `verified`
   - `high-quality`

3. These tags will auto-complete when filtering

#### C. Create Dashboard Views

1. Go to **"Dashboards"** (left sidebar)
2. Click **"+ New Dashboard"**
3. Name: "SISO Planning Analytics"
4. Add widgets:

**Widget 1: Cost by Model**
- Type: Bar Chart
- Metric: Total Cost
- Group By: Model
- Time Range: Last 30 days

**Widget 2: Cost by Agent**
- Type: Pie Chart
- Metric: Total Cost
- Group By: metadata.agent
- Time Range: Last 30 days

**Widget 3: Cost by Industry**
- Type: Bar Chart
- Metric: Total Cost
- Group By: Tag (restaurant, tour-guide, bike-rental)

**Widget 4: Token Usage**
- Type: Line Chart
- Metric: Total Tokens
- Group By: Date
- Time Range: Last 30 days

**Widget 5: Verification Success Rate**
- Type: Percentage
- Metric: Spans where metadata.verified = true
- Time Range: Last 30 days

---

## Step 5: View Rich Data in Dashboard

After tracking a planning session with the enhanced script, you'll see:

### Cost by Model

```
┌─────────────────────────────────────┐
│ Cost by Model                       │
├─────────────────────────────────────┤
│                                     │
│ claude-sonnet-4.5  ████████ $5.12  │
│ claude-opus-4      ██       $1.23  │
│ gpt-5-pro          █        $0.45  │
│                                     │
└─────────────────────────────────────┘
```

### Cost by Agent (Environment)

```
┌─────────────────────────────────────┐
│ Cost by Agent                       │
├─────────────────────────────────────┤
│                                     │
│ domain-engineer  ███████  $2.08    │ ← Phases 5,6,7
│ architect        ██████   $1.23    │ ← Phase 4
│ ui-ux-agent      ████     $0.76    │ ← Phase 4.5
│ researcher       ███      $1.15    │ ← Phases 1,2
│ qa-agent         ██       $0.72    │ ← Phases 8,9
│ pm-agent         ██       $0.52    │ ← Phase 3
│                                     │
└─────────────────────────────────────┘
```

### Cost by Industry Tag

```
┌─────────────────────────────────────┐
│ Cost by Industry                    │
├─────────────────────────────────────┤
│                                     │
│ restaurant      ████████  $15.24   │ ← 3 projects
│ tour-guide      ████      $9.87    │ ← 2 projects
│ bike-rental     ██        $4.56    │ ← 1 project
│                                     │
└─────────────────────────────────────┘
```

### Token Usage Breakdown

```
┌─────────────────────────────────────┐
│ Token Usage - Restaurant App        │
├─────────────────────────────────────┤
│                                     │
│ Input Tokens:  120K (51%)          │
│ Output Tokens: 115K (49%)          │
│ Total: 235K                         │
│                                     │
│ By Phase:                           │
│ Phase 4:   45K tokens (19%)        │
│ Phase 6:   35K tokens (15%)        │
│ Phase 4.5: 28K tokens (12%)        │
│ Phase 2:   25K tokens (11%)        │
│ [... other phases ...]              │
│                                     │
└─────────────────────────────────────┘
```

---

## Step 6: Filter and Analyze

### Filter by Model

In dashboard, click "Filters":
- Model: `claude-sonnet-4.5`

Shows: All traces using Claude Sonnet 4.5

### Filter by Agent

- Tag: `ui-ux-agent`

Shows: All Phase 4.5 (UI/UX) generations

### Filter by Industry

- Tag: `restaurant`

Shows: All restaurant app planning sessions

### Filter by Quality

- Tag: `high-quality` (score ≥ 90%)

Shows: Only excellent outputs

---

## What Each Filter Shows

### Example: Filter by "ui-ux-agent"

```
UI/UX Agent Performance (Last 30 Days)

Projects: 5
Total Cost: $3.80
Avg Cost per Project: $0.76
Avg Duration: 38 minutes
Avg Tokens: 28K

Success Rate:
├─ First Try: 60% (3/5 passed)
├─ After Retry: 100% (5/5 passed)
└─ Avg Iterations: 1.4

Common Issues:
├─ Missing wireframes (2 projects)
├─ Accessibility incomplete (1 project)
└─ Design system vague (2 projects)

Action: Improve UI/UX agent prompt with:
- More wireframe examples
- Accessibility template
- Design system checklist
```

---

## Advanced: Custom Metadata

### Add More Metadata

You can track anything! Edit `langfuse-track-generation.js`:

```javascript
metadata: {
  // Existing
  duration: duration,
  agent: phaseData.agent,
  environment: 'planning',

  // Add custom metadata
  teamMember: 'shaan',  // Who ran this
  clientName: 'Quimimar',  // Client project
  budget: 'high',  // Project budget tier
  deadline: '2025-11-15',  // Project deadline
  complexity: 'medium',  // Estimated complexity
  multiTenant: true,  // Is multi-tenant
  targetUsers: 10000,  // Expected user count
  // ... any custom fields you want to track
}
```

Then in dashboard:
- Filter by: `metadata.clientName = "Quimimar"`
- Group by: `metadata.complexity`
- Sort by: `metadata.budget`

---

## Full Example: Track One Phase with All Metadata

```bash
# Track Phase 4.5 (UI/UX) with complete data
node tools/observability/scripts/langfuse-track-generation.js \
  4.5 \
  "claude-sonnet-4.5" \
  15000 \
  13000 \
  "38 minutes" \
  90

# What gets tracked:
# ✅ Phase: 4.5 (UI/UX Design)
# ✅ Model: claude-sonnet-4.5
# ✅ Input Tokens: 15,000
# ✅ Output Tokens: 13,000
# ✅ Total Tokens: 28,000
# ✅ Cost: $0.24 (input) + $0.195 (output) = $0.435 auto-calculated
# ✅ Duration: 38 minutes
# ✅ Verification Score: 90%
# ✅ Agent: ui-ux-agent
# ✅ Environment: planning
# ✅ Tags: planning, phase-4.5, ui-ux-agent, restaurant, indonesia, verified
```

**Dashboard will show**:
- Cost: $0.435 (calculated from tokens × model pricing)
- Model: claude-sonnet-4.5
- Agent: ui-ux-agent
- Industry: restaurant (from tag)
- Region: indonesia (from tag)
- Quality: verified (score 90%)

---

## What You Need to Do NOW

### 1. Add Model Pricing (One-Time Setup)

```
Visit: https://cloud.langfuse.com
├─ Settings (⚙️)
├─ Models tab
├─ + Add Model
└─ Enter:
    Name: claude-sonnet-4.5
    Input Cost: $3.00 per 1M tokens
    Output Cost: $15.00 per 1M tokens
    Save
```

**This unlocks automatic cost calculation!**

### 2. Use Enhanced Tracking Script

From now on, use `langfuse-track-generation.js` instead of `langfuse-track-phase.js`:

```bash
# After completing a phase, run:
node tools/observability/scripts/langfuse-track-generation.js \
  <phase> \
  "claude-sonnet-4.5" \
  <inputTokens> \
  <outputTokens> \
  "<duration>" \
  <score>
```

### 3. Tell Claude to Use Enhanced Tracking

```
"For each phase you complete, track with FULL metadata:

node tools/observability/scripts/langfuse-track-generation.js <phase> "claude-sonnet-4.5" <inputTokens> <outputTokens> "<duration>" <score>

Estimate tokens:
- Small phase (Phase 9 PDR): ~5K input, ~7K output
- Medium phase (Phase 3 Features): ~10K input, ~9K output
- Large phase (Phase 4 Architecture): ~20K input, ~25K output
- UI/UX phase (Phase 4.5): ~15K input, ~13K output

Example after completing Phase 4.5:
node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38 minutes" 90"
```

---

## Step 4: See the Results

### After Next Planning Session

Dashboard will show:

#### Traces with Cost

```
Restaurant Booking App
├─ Model: claude-sonnet-4.5
├─ Cost: $5.12 (auto-calculated!)
├─ Duration: 6.5 hours
├─ Tokens: 235K (120K input + 115K output)
└─ Quality: 94/100
```

#### Cost by Model Chart

```
claude-sonnet-4.5: $5.12 (100% of sessions)
```

#### Cost by Agent (metadata.agent)

```
domain-engineer-agent: $2.08 (41%)
architect-agent: $1.23 (24%)
ui-ux-agent: $0.76 (15%)
researcher-agent: $1.15 (22%)
qa-agent: $0.72 (14%)
pm-agent: $0.52 (10%)
```

#### Cost by Environment (metadata.environment)

```
planning: $5.12 (100%)
```

(You can add more environments later: development, testing, production)

#### Cost by Tag (Industry)

```
restaurant: $15.24 (3 projects)
tour-guide: $9.87 (2 projects)
bike-rental: $4.56 (1 project)
```

---

## Token Count Estimation Guide

### How to Estimate Tokens

**Rule of Thumb**: 1 token ≈ 0.75 words (English)

**For Planning Phases**:

#### Phase 1: Industry Research
- **Input**:
  - Prompt: ~500 tokens
  - Previous context: ~2K tokens
  - Research prompts: ~6K tokens
  - **Total Input**: ~8-9K tokens

- **Output**:
  - research-summary.md: ~10 pages = ~3K words = ~4K tokens
  - Analysis: ~6K tokens
  - **Total Output**: ~10K tokens

**Total Phase 1**: ~18-19K tokens

#### Phase 4.5: UI/UX Design (Largest)
- **Input**:
  - Agent prompt: ~11K tokens (long prompt!)
  - Features from Phase 3: ~3K tokens
  - Architecture from Phase 4: ~2K tokens
  - Wireframe examples: ~4K tokens
  - **Total Input**: ~15-20K tokens

- **Output**:
  - user-flows.md: ~10 pages = ~4K tokens
  - wireframes.md: ~20 pages = ~7K tokens
  - design-system.md: ~15 pages = ~6K tokens
  - accessibility.md: ~6 pages = ~2K tokens
  - **Total Output**: ~13-15K tokens

**Total Phase 4.5**: ~28-35K tokens

#### Small Phase (Phase 9: PDR)
- **Input**: ~8K (reads all previous docs)
- **Output**: ~10K (PDR compilation)
- **Total**: ~18K tokens

### Calculate Cost

```javascript
// Phase 4.5 example:
Input: 15,000 tokens
Output: 13,000 tokens

// Claude Sonnet 4.5 pricing:
Input Cost: 15,000 / 1,000,000 × $3.00 = $0.045
Output Cost: 13,000 / 1,000,000 × $15.00 = $0.195
Total Cost: $0.24

// Tell LangFuse:
node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38m" 90
// LangFuse auto-calculates: $0.24 ✅
```

---

## Dashboard Views You Can Create

### View 1: Planning Performance

**Widgets**:
1. Total cost (last 30 days)
2. Cost by project
3. Cost by phase
4. Average verification score
5. First-try pass rate

### View 2: Model Performance

**Widgets**:
1. Cost by model (claude-sonnet-4.5 vs opus vs gpt-5)
2. Token usage by model
3. Average quality by model
4. Speed by model (tokens/minute)

### View 3: Agent Performance

**Widgets**:
1. Cost by agent (researcher, pm, architect, ui-ux, domain-engineer, qa)
2. Success rate by agent
3. Retry rate by agent (which agents fail verification most often)
4. Duration by agent

### View 4: Industry Comparison

**Widgets**:
1. Cost by industry tag (restaurant vs tour-guide vs bike-rental)
2. Duration by industry
3. Complexity by industry (token usage proxy)
4. Quality by industry

---

## Example: Complete Planning Session with Full Tracking

```bash
# Initialize
node tools/observability/scripts/langfuse-init.js "Bali Tour Guide App" "tour-guide" "Indonesia"

# Claude completes phases and tracks each one:

# Phase 1
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95

# Phase 2
node tools/observability/scripts/langfuse-track-generation.js 2 "claude-sonnet-4.5" 12000 13000 "18m" 92

# Phase 3
node tools/observability/scripts/langfuse-track-generation.js 3 "claude-sonnet-4.5" 10000 9000 "15m" 88

# Phase 4
node tools/observability/scripts/langfuse-track-generation.js 4 "claude-sonnet-4.5" 20000 25000 "45m" 96

# Phase 4.5 (UI/UX) - Most important!
node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "38m" 90

# Phase 5
node tools/observability/scripts/langfuse-track-generation.js 5 "claude-sonnet-4.5" 11000 10000 "25m" 87

# Phase 6
node tools/observability/scripts/langfuse-track-generation.js 6 "claude-sonnet-4.5" 18000 17000 "42m" 91

# Phase 7
node tools/observability/scripts/langfuse-track-generation.js 7 "claude-sonnet-4.5" 9000 9000 "32m" 93

# Phase 8
node tools/observability/scripts/langfuse-track-generation.js 8 "claude-sonnet-4.5" 7000 7000 "28m" 89

# Phase 9 (Final)
node tools/observability/scripts/langfuse-track-generation.js 9 "claude-sonnet-4.5" 6000 6000 "22m" 97

# Finalize
node tools/observability/scripts/langfuse-finish.js
```

### Dashboard Result

```
Trace: Bali Tour Guide App
├─ Total Cost: $5.23 (auto-calculated from all tokens!)
├─ Total Tokens: 238K
│   ├─ Input: 122K
│   └─ Output: 116K
├─ Duration: 6.7 hours
├─ Model: claude-sonnet-4.5 (100%)
├─ Environment: planning
├─ Tags: tour-guide, indonesia, planning
├─ Quality: 93/100 avg
└─ Phases: 10 (including Phase 4.5)

Cost Breakdown by Agent:
├─ domain-engineer-agent: $2.15 (41%)
├─ architect-agent: $1.31 (25%)
├─ ui-ux-agent: $0.78 (15%)
├─ researcher-agent: $1.18 (23%)
├─ qa-agent: $0.71 (14%)
└─ pm-agent: $0.54 (10%)

Verification:
├─ First-Try Pass: 9/10 (90%)
├─ Retries: 1 (Phase 4.5)
└─ All phases eventually passed ✅
```

**You can now**:
- Click "Filter by: ui-ux-agent" → See all UI/UX work
- Click "Filter by: model = claude-sonnet-4.5" → See all Sonnet usage
- Click "Filter by: tour-guide tag" → See all tour guide projects
- Click "Group by: metadata.agent" → See cost per agent
- Click "Group by: metadata.industry" → See cost per industry

---

## Troubleshooting: "Still not seeing cost"

### Check 1: Model Added?

```
Settings → Models → Should see "claude-sonnet-4.5"
If not: Add it with pricing ($3 input, $15 output)
```

### Check 2: Using generation() not span()?

```javascript
// ❌ Wrong: span() doesn't track model/cost
const span = trace.span({ name: 'Phase 1' });

// ✅ Correct: generation() tracks model, tokens, cost
const generation = trace.generation({
  name: 'Phase 1: Research',
  model: 'claude-sonnet-4.5',
  usage: { promptTokens: 8500, completionTokens: 10000 }
});
```

Use `langfuse-track-generation.js` (new script) which uses generation()

### Check 3: Token Counts Provided?

```bash
# ❌ Wrong: No token counts
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 0 0 "12m" 95
# Cost shows $0.00 (no tokens = no cost)

# ✅ Correct: Token counts provided
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95
# Cost shows $0.176 (calculated from tokens)
```

---

## Summary: Getting Rich Dashboard Data

**Required Steps**:

1. ✅ **Add Model Pricing** (Settings → Models → claude-sonnet-4.5 → $3 input, $15 output)
2. ✅ **Use langfuse-track-generation.js** (not langfuse-track-phase.js)
3. ✅ **Provide Token Counts** (estimate or measure actual)
4. ✅ **Add Tags** (automatically added by script: agent, industry, region, quality)

**Then you'll see**:
- ✅ Cost by model (which model costs most)
- ✅ Cost by agent/environment (which agent costs most)
- ✅ Cost by industry (restaurant vs tour-guide vs bike-rental)
- ✅ Token breakdown (input vs output)
- ✅ Quality metrics (verification scores)
- ✅ Performance analytics (duration, retries, success rates)

**Dashboard access**: https://cloud.langfuse.com

**Next planning session**: Use enhanced tracking and you'll see ALL the rich data!

---

*Last updated: Oct 21, 2025*
*Status: Ready to use with full metadata tracking*
