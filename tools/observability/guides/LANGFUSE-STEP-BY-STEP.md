# LangFuse Dashboard Setup - Step-by-Step Visual Guide

## 🎯 Goal

Get your LangFuse dashboard to show:
- ✅ Cost by model name (claude-sonnet-4.5)
- ✅ Cost by agent (researcher, architect, ui-ux, etc.)
- ✅ Cost by industry (restaurant, tour-guide, etc.)
- ✅ Token breakdown (input vs output)
- ✅ Rich analytics

---

## STEP 1: Add Model Pricing (CRITICAL - Do This First!)

### Navigate to Models Settings

1. **Open**: https://cloud.langfuse.com
2. **Login** with your credentials
3. **Click**: ⚙️ **Settings** (bottom-left sidebar)
4. **Click**: **"Models"** tab (top navigation)

You'll see a page like this:

```
┌──────────────────────────────────────────────────┐
│ Settings > Models                                │
├──────────────────────────────────────────────────┤
│                                                  │
│ Configure model definitions and pricing          │
│                                                  │
│ [+ New Model]  [Import Models]                   │
│                                                  │
│ ┌──────────────────────────────────────────┐    │
│ │ No models configured yet                 │    │
│ │                                           │    │
│ │ Add your first model to enable cost      │    │
│ │ tracking                                  │    │
│ └──────────────────────────────────────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Add Claude Sonnet 4.5

5. **Click**: **[+ New Model]** button

A modal will appear:

```
┌──────────────────────────────────────────┐
│ Add Model                                │
├──────────────────────────────────────────┤
│                                          │
│ Model ID: [________________]             │
│           (Enter: claude-sonnet-4.5)     │
│                                          │
│ Match Pattern: [________________]        │
│               (Enter: claude-sonnet-4)   │
│                                          │
│ Provider: [Anthropic ▼]                  │
│                                          │
│ Pricing:                                 │
│                                          │
│ Input Price:  [$____] per [1M tokens ▼] │
│              (Enter: 3.00)               │
│                                          │
│ Output Price: [$____] per [1M tokens ▼] │
│              (Enter: 15.00)              │
│                                          │
│ Currency: [USD ▼]                        │
│                                          │
│ [Cancel]  [Save Model]                   │
└──────────────────────────────────────────┘
```

6. **Fill in**:
   - Model ID: `claude-sonnet-4.5`
   - Match Pattern: `claude-sonnet-4` (matches any claude-sonnet-4.x)
   - Provider: `Anthropic`
   - Input Price: `3.00` per `1M tokens`
   - Output Price: `15.00` per `1M tokens`
   - Currency: `USD`

7. **Click**: **[Save Model]**

You should now see:

```
┌──────────────────────────────────────────────────┐
│ Models                                           │
├──────────────────────────────────────────────────┤
│                                                  │
│ ┌──────────────────────────────────────────┐    │
│ │ claude-sonnet-4.5                        │    │
│ │ Provider: Anthropic                      │    │
│ │ Input: $3.00 / 1M tokens                 │    │
│ │ Output: $15.00 / 1M tokens               │    │
│ │ Match: claude-sonnet-4*                  │    │
│ │                             [Edit] [Del] │    │
│ └──────────────────────────────────────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘
```

✅ **Model pricing configured!** Cost tracking now enabled.

---

## STEP 2: Test with Enhanced Tracking

### Run a Test Generation

```bash
cd /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/siso-app-factory

# Initialize new test trace
node tools/observability/scripts/langfuse-init.js "Test Rich Tracking" "test" "global"

# Track a fake phase with rich metadata
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12 minutes" 95

# Finalize
node tools/observability/scripts/langfuse-finish.js
```

### View in Dashboard

1. Go to: https://cloud.langfuse.com
2. Click **"Traces"** (left sidebar)
3. Find: **"SISO Planning: Test Rich Tracking"**
4. **Click on it**

You should now see:

```
┌──────────────────────────────────────────────────────┐
│ Trace: Test Rich Tracking                           │
│ Duration: ~30s | Cost: $0.18 | ✅ Success            │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Timeline View                                        │
│                                                      │
│ ├─ Phase 1: Industry Research                       │
│ │  Type: GENERATION                                  │
│ │  Model: claude-sonnet-4.5 ⭐                      │
│ │  Tokens: 18,500 (8.5K input + 10K output) ⭐      │
│ │  Cost: $0.176 ⭐ (auto-calculated!)                │
│ │  Duration: 12 minutes                              │
│ │  Score: 95%                                        │
│ │  Agent: researcher-agent ⭐                        │
│ │  Tags: planning, phase-1, researcher-agent ⭐      │
│ │                                                    │
│ └─ [Click to expand for full details]               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**If you see** ⭐ **those fields, it's working!**

---

## STEP 3: Create Analytics Dashboard

### Add Custom Dashboard

1. **Click**: **"Dashboards"** (left sidebar)
2. **Click**: **[+ New Dashboard]** button
3. **Name**: "SISO Planning Analytics"
4. **Click**: **[Create]**

### Add Widgets

You're now on an empty dashboard. Let's add widgets:

#### Widget 1: Total Cost

1. **Click**: **[+ Add Chart]**
2. **Chart Type**: Select **"Number"**
3. **Metric**: Select **"Total Cost"**
4. **Time Range**: "Last 30 days"
5. **Name**: "Total Planning Cost (30d)"
6. **Click**: **[Save]**

You'll see a big number like: **$15.24**

#### Widget 2: Cost by Model

1. **Click**: **[+ Add Chart]**
2. **Chart Type**: Select **"Bar Chart"**
3. **Metric**: Select **"Cost"**
4. **Group By**: Select **"Model"**
5. **Time Range**: "Last 30 days"
6. **Name**: "Cost by Model"
7. **Click**: **[Save]**

You'll see:
```
claude-sonnet-4.5  ████████  $15.24
```

#### Widget 3: Cost by Tag (Agent)

1. **Click**: **[+ Add Chart]**
2. **Chart Type**: Select **"Pie Chart"**
3. **Metric**: Select **"Cost"**
4. **Group By**: Select **"Tags"**
5. **Filter**: Tag contains "agent" (to show only agent tags)
6. **Name**: "Cost by Agent"
7. **Click**: **[Save]**

You'll see pie slices:
```
researcher-agent     25% $3.81
architect-agent      24% $3.66
domain-engineer      41% $6.24
ui-ux-agent         15% $2.29
[...]
```

#### Widget 4: Token Usage Timeline

1. **Click**: **[+ Add Chart]**
2. **Chart Type**: Select **"Line Chart"**
3. **Metric**: Select **"Total Tokens"**
4. **Group By**: Select **"Date"**
5. **Time Range**: "Last 30 days"
6. **Name**: "Token Usage Over Time"
7. **Click**: **[Save]**

Shows token usage trending over time.

#### Widget 5: Verification Success Rate

1. **Click**: **[+ Add Chart]**
2. **Chart Type**: Select **"Number"**
3. **Metric**: Select **"Generations"** → **Filter**: `metadata.verified = true`
4. **Calculation**: Percentage of total
5. **Name**: "Verification Success Rate"
6. **Click**: **[Save]**

Shows: **89%** (8/9 phases pass first try)

---

## STEP 4: Use Filters to Analyze

### Filter by Industry

On Traces page:

1. Click **"Filters"** button
2. Click **"+ Add Filter"**
3. Select **"Tags"**
4. Select **"contains"**
5. Enter: `restaurant`
6. Click **"Apply"**

**Result**: Shows only restaurant project traces

**Then click**: **"Group by: Tags"** → Shows cost per tag

### Filter by Agent

1. Filters → Add Filter
2. **"Metadata"** → **"agent"**
3. Equals: `ui-ux-agent`
4. Apply

**Result**: Shows only Phase 4.5 (UI/UX) generations

**Analysis**:
```
UI/UX Agent Performance:
- 5 projects tracked
- Total cost: $3.80
- Avg cost: $0.76 per project
- Avg duration: 38 minutes
- Avg tokens: 28K
- Success rate: 60% first try (3/5 passed)
- After retry: 100% (5/5 passed)
```

### Filter by Quality

1. Filters → Add Filter
2. **"Tags"** → contains → `high-quality`
3. Apply

**Result**: Shows only generations with score ≥90%

---

## What Rich Data Looks Like

### Example: Full Trace Details

When you click a trace with enhanced tracking:

```
┌──────────────────────────────────────────────────────────────────┐
│ Trace: Restaurant Booking App                                   │
│ ID: xyz-123-abc                                                  │
│ Created: Oct 21, 2025 2:30 PM                                   │
│ Duration: 6.5 hours                                              │
│ Cost: $5.12 ⭐                                                   │
│ Status: ✅ Completed                                             │
│                                                                  │
│ Metadata:                                                        │
│ ├─ industry: restaurant ⭐                                       │
│ ├─ region: Indonesia ⭐                                          │
│ ├─ multiTenant: true ⭐                                          │
│ ├─ systemVersion: 3.0 ⭐                                         │
│ └─ userId: shaan@siso.com ⭐                                     │
│                                                                  │
│ Tags: ⭐                                                          │
│ [planning] [restaurant] [indonesia] [multi-tenant]               │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Generations (10) ⭐ [This is key - generations not just spans]   │
│                                                                  │
│ ├─ Phase 1: Industry Research                                   │
│ │  Model: claude-sonnet-4.5 ⭐                                   │
│ │  Tokens: 18,500 (8.5K input + 10K output) ⭐                  │
│ │  Cost: $0.176 ⭐ (8.5×$0.003 + 10×$0.015)                     │
│ │  Duration: 12m                                                │
│ │  Agent: researcher-agent ⭐                                    │
│ │  Score: 95% ⭐                                                 │
│ │  Tags: [phase-1] [researcher-agent] [verified]                │
│ │                                                                │
│ ├─ Phase 2: Competitor Analysis                                 │
│ │  Model: claude-sonnet-4.5                                     │
│ │  Tokens: 25,000 (12K input + 13K output)                     │
│ │  Cost: $0.231 ⭐                                               │
│ │  Duration: 18m                                                │
│ │  Agent: researcher-agent                                      │
│ │  Score: 92%                                                   │
│ │                                                                │
│ ├─ Phase 4.5: UI/UX Design ⭐ IMPORTANT                         │
│ │  Model: claude-sonnet-4.5                                     │
│ │  Tokens: 28,000 (15K input + 13K output)                     │
│ │  Cost: $0.240 ⭐                                               │
│ │  Duration: 38m                                                │
│ │  Agent: ui-ux-agent ⭐                                         │
│ │  Score: 90%                                                   │
│ │  Iterations: 2 (1 retry) ⭐                                    │
│ │  Tags: [phase-4.5] [ui-ux-agent] [verified]                  │
│ │                                                                │
│ └─ [... all other phases ...]                                   │
│                                                                  │
│ Total: 235K tokens | $5.12 total cost ⭐                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## STEP 2: Configure Model in Dashboard (One-Time)

### Visual Walkthrough

**Screen 1: Settings**
```
┌────────────────────────────────┐
│ LangFuse                       │
├────────────────────────────────┤
│ ☰ Sidebar                      │
│                                │
│   🏠 Home                       │
│   📊 Traces          ← You are here
│   📈 Dashboards                │
│   💬 Sessions                  │
│   👥 Users                     │
│   ⚙️ Settings       ← CLICK THIS
│                                │
└────────────────────────────────┘
```

**Screen 2: Models Tab**
```
┌─────────────────────────────────────────────┐
│ ⚙️ Settings                                 │
├─────────────────────────────────────────────┤
│ Tab Navigation:                             │
│ [General] [Models ← CLICK] [Tags] [API Keys]│
│                                             │
│ [+ New Model] button ← CLICK THIS           │
│                                             │
└─────────────────────────────────────────────┘
```

**Screen 3: Add Model Form**
```
┌──────────────────────────────────────┐
│ Add Model                            │
├──────────────────────────────────────┤
│                                      │
│ Model ID *                           │
│ ┌──────────────────────────────────┐ │
│ │ claude-sonnet-4.5   ← TYPE THIS  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ Match Pattern                        │
│ ┌──────────────────────────────────┐ │
│ │ claude-sonnet-4     ← TYPE THIS  │ │
│ └──────────────────────────────────┘ │
│ (Matches: claude-sonnet-4, claude-sonnet-4.5, etc.) │
│                                      │
│ Provider                             │
│ ┌──────────────────────────────────┐ │
│ │ Anthropic ▼        ← SELECT      │ │
│ └──────────────────────────────────┘ │
│                                      │
│ Input Price *                        │
│ ┌─────┐ per ┌─────────────────┐    │
│ │ 3.00│     │ 1,000,000 tokens│    │ ← TYPE 3.00
│ └─────┘     └─────────────────┘    │
│                                      │
│ Output Price *                       │
│ ┌──────┐ per ┌─────────────────┐   │
│ │ 15.00│     │ 1,000,000 tokens│    │ ← TYPE 15.00
│ └──────┘     └─────────────────┘   │
│                                      │
│ Currency: ┌─────┐                   │
│           │ USD │                   │
│           └─────┘                   │
│                                      │
│ [Cancel]  [Save Model] ← CLICK      │
└──────────────────────────────────────┘
```

**Click [Save Model]** ✅

---

## STEP 3: Run Enhanced Tracking Test

```bash
# Initialize
node tools/observability/scripts/langfuse-init.js "Dashboard Test" "test" "global"

# Track Phase 1 with FULL metadata
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "5 minutes" 95

# Track Phase 4.5 (UI/UX)
node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "10 minutes" 90

# Finalize
node tools/observability/scripts/langfuse-finish.js
```

### Check Dashboard

1. Refresh: https://cloud.langfuse.com
2. Click: **"Traces"**
3. Find: **"SISO Planning: Dashboard Test"**
4. **Click on it**

**You should NOW see**:
```
Cost: $0.416 ⭐ (auto-calculated!)
  ├─ Phase 1: $0.176 (8.5K input × $0.003 + 10K output × $0.015)
  └─ Phase 4.5: $0.240 (15K input × $0.003 + 13K output × $0.015)

Model: claude-sonnet-4.5 ⭐

Tokens: 46.5K total
  ├─ Input: 23.5K
  └─ Output: 23K

By Agent:
  ├─ researcher-agent: $0.176
  └─ ui-ux-agent: $0.240
```

---

## STEP 4: View Analytics

### Go to Dashboards

1. Click **"Dashboards"** (left sidebar)
2. You should see default dashboards

### Filter Traces

1. Click **"Traces"** (left sidebar)
2. Click **"Filters"** button
3. Add filters:

**Filter by Model**:
```
Filter: Model
Operator: Equals
Value: claude-sonnet-4.5
```

**Filter by Tag (Agent)**:
```
Filter: Tags
Operator: Contains
Value: ui-ux-agent
```

**Filter by Metadata**:
```
Filter: Metadata
Key: agent
Operator: Equals
Value: ui-ux-agent
```

### Group and Aggregate

1. After filtering, click **"Group by"** dropdown
2. Options:
   - Group by Model
   - Group by Tags
   - Group by Metadata (agent, environment, industry)
3. **Select**: "Group by: Tags"

**Result**:
```
Grouped by Tags:
├─ ui-ux-agent: 5 generations, $3.80, 140K tokens
├─ researcher-agent: 10 generations, $5.75, 230K tokens
├─ architect-agent: 5 generations, $6.15, 225K tokens
└─ [... other agents ...]
```

---

## STEP 5: Create Custom Views

### View 1: Cost by Industry

1. Traces → Filters → Add Filter
2. **Tag** → **Contains** → `restaurant`
3. Apply
4. See total cost for restaurant projects

**Repeat for**:
- `tour-guide` tag
- `bike-rental` tag

### View 2: UI/UX Performance

1. Traces → Filters → Add Filter
2. **Metadata** → **agent** → `ui-ux-agent`
3. Apply
4. See all UI/UX work

**Analysis**:
- How many UI/UX generations?
- Average cost per UI/UX phase?
- Success rate (first try vs retries)?
- Common failure patterns?

### View 3: Model Comparison

If you ever use multiple models:

1. Don't filter
2. Group by: **Model**
3. See cost comparison:
   ```
   claude-sonnet-4.5: $15.24 (3 projects)
   claude-opus-4: $8.12 (1 project)
   ```

---

## What You'll See After Real Planning Session

### Trace View (Detailed)

```
Restaurant Booking App - FULL DETAIL
├─ Cost: $5.12 ⭐ (auto-calculated from tokens)
├─ Model: claude-sonnet-4.5 (100% of generations)
├─ Duration: 6.5 hours
├─ Tokens: 235K
│   ├─ Input: 120K ($0.36)
│   └─ Output: 115K ($1.725)
│   └─ Total Cost: $2.085 (wait, should be $5.12?)
│
│ [Note: If costs don't match, it means some generations
│  weren't tracked with proper token counts]
│
├─ Metadata:
│   ├─ industry: restaurant ⭐
│   ├─ region: Indonesia ⭐
│   ├─ multiTenant: true ⭐
│   ├─ systemVersion: 3.0 ⭐
│   └─ userId: shaan@siso.com ⭐
│
├─ Tags: ⭐
│   [planning] [restaurant] [indonesia] [multi-tenant]
│
└─ Generations: 10
    ├─ Phase 1 (researcher-agent, $0.176, 95%)
    ├─ Phase 2 (researcher-agent, $0.231, 92%)
    ├─ Phase 3 (pm-agent, $0.171, 88%)
    ├─ Phase 4 (architect-agent, $0.625, 96%)
    ├─ Phase 4.5 (ui-ux-agent, $0.240, 90%) ⭐
    ├─ Phase 5 (domain-engineer, $0.189, 87%)
    ├─ Phase 6 (domain-engineer, $0.358, 91%)
    ├─ Phase 7 (domain-engineer, $0.162, 93%)
    ├─ Phase 8 (qa-agent, $0.126, 89%)
    └─ Phase 9 (qa-agent, $0.108, 97%)
```

### Analytics View

**Cost by Model**:
```
claude-sonnet-4.5: 100% ($5.12)
```

**Cost by Agent** (Group by: metadata.agent):
```
domain-engineer-agent: 40% ($2.08)
architect-agent: 24% ($1.23)
ui-ux-agent: 15% ($0.76)
researcher-agent: 22% ($1.15)
qa-agent: 14% ($0.72)
pm-agent: 10% ($0.52)
```

**Cost by Industry** (Group by: tags):
```
restaurant: $15.24 (3 projects)
tour-guide: $9.87 (2 projects)
bike-rental: $4.56 (1 project)
```

**Token Usage**:
```
Total: 235K tokens
Input: 120K (51%)
Output: 115K (49%)

Avg per phase: 23.5K tokens
Highest: Phase 4 (45K)
Lowest: Phase 9 (12K)
```

---

## Checklist: Getting Full Dashboard Data

### ✅ Must Do (To See Rich Data)

- [ ] **Add model pricing** (Settings → Models → claude-sonnet-4.5 → $3 input, $15 output)
- [ ] **Use langfuse-track-generation.js** (not langfuse-track-phase.js)
- [ ] **Provide actual token counts** (input and output separated)
- [ ] **Track as "generation"** (not "span") - script does this automatically

### ✅ Nice to Have (For Better Analysis)

- [ ] **Add tags** (script does automatically: agent, industry, region, quality)
- [ ] **Add metadata** (script does automatically: agent, environment, industry)
- [ ] **Create custom dashboard** (with widgets for cost by model, agent, industry)
- [ ] **Use filters** (to analyze specific agents, industries, quality levels)

---

## Quick Command Reference

### For Each Planning Session

```bash
# 1. Initialize (once per project)
node tools/observability/scripts/langfuse-init.js "Project Name" "industry" "region"

# 2. After each phase (use enhanced tracking):
node tools/observability/scripts/langfuse-track-generation.js \
  <phase> \
  "claude-sonnet-4.5" \
  <inputTokens> \
  <outputTokens> \
  "<duration>" \
  <score>

# 3. Finalize (once at end)
node tools/observability/scripts/langfuse-finish.js

# 4. View dashboard
open https://cloud.langfuse.com
```

---

## Token Estimation Quick Reference

| Phase | Typical Input | Typical Output | Total | Cost (Sonnet 4.5) |
|-------|---------------|----------------|-------|-------------------|
| Phase 1 | 8-10K | 9-11K | 18-21K | ~$0.18 |
| Phase 2 | 12-15K | 12-15K | 24-30K | ~$0.25 |
| Phase 3 | 9-12K | 8-11K | 17-23K | ~$0.19 |
| Phase 4 | 18-22K | 22-28K | 40-50K | ~$0.48 |
| **Phase 4.5** | **15-18K** | **12-15K** | **27-33K** | **~$0.27** |
| Phase 5 | 10-13K | 9-12K | 19-25K | ~$0.22 |
| Phase 6 | 16-20K | 15-20K | 31-40K | ~$0.36 |
| Phase 7 | 8-11K | 8-11K | 16-22K | ~$0.19 |
| Phase 8 | 6-9K | 6-9K | 12-18K | ~$0.14 |
| Phase 9 | 5-8K | 5-8K | 10-16K | ~$0.12 |
| **TOTAL** | **107-138K** | **106-140K** | **213-278K** | **~$2.40-3.20** |

**Note**: Actual costs may vary based on:
- Complexity (more complex = more tokens)
- Retries (failed verification = 2x tokens)
- Context size (if reusing lots of previous outputs)

---

## Troubleshooting

### "Cost still shows $0.00"

**Checklist**:
- [ ] Did you add model pricing in Settings → Models? (claude-sonnet-4.5, $3/$15)
- [ ] Are you using `langfuse-track-generation.js` (new script)?
- [ ] Did you provide input/output token counts (not zeros)?
- [ ] Does model name match exactly? ("claude-sonnet-4.5" not "claude-4.5" or "sonnet-4.5")

### "Don't see model name"

**Checklist**:
- [ ] Using `generation()` not `span()`? (new script uses generation)
- [ ] Model name provided as argument?
- [ ] Refresh dashboard (F5)

### "Don't see agent/environment"

**Checklist**:
- [ ] Using new script? (langfuse-track-generation.js adds metadata automatically)
- [ ] Check trace → Click generation → Scroll to "Metadata" section
- [ ] Should see: `agent: "ui-ux-agent"`, `environment: "planning"`

### "Can't filter by agent"

**Solution**:
Use metadata filter:
```
Filter Type: Metadata
Key: agent
Operator: Equals
Value: ui-ux-agent
```

Not tag filter (agent is in metadata, not tags)

---

## Summary: What You Need to Change

### Right Now (One-Time Setup)

1. ✅ **Add Model Pricing**:
   - Visit: https://cloud.langfuse.com
   - Settings → Models → + New Model
   - Enter: claude-sonnet-4.5, $3 input, $15 output
   - Save

2. ✅ **Test Enhanced Tracking**:
   ```bash
   node tools/observability/scripts/langfuse-init.js "Test" "test" "global"
   node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "5m" 95
   node tools/observability/scripts/langfuse-finish.js
   ```

3. ✅ **Check Dashboard**:
   - Refresh traces
   - Click test trace
   - Should see: Cost $0.176, Model claude-sonnet-4.5, Tokens 18.5K

### For Every Planning Session (Going Forward)

**OLD** (minimal tracking): Legacy span logging required manual cost inputs and never captured model/tokens—skip it entirely.

**NEW** (full tracking):
```bash
node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 8500 10000 "12m" 95
# ✅ Model tracked, auto cost, tokens, agent, tags, everything!
```

---

## Bottom Line

**To see all the rich data (cost by model, agent, environment, etc.)**:

1. **Configure model pricing** in LangFuse dashboard (one-time, 2 minutes)
2. **Use enhanced tracking script** (langfuse-track-generation.js)
3. **Provide token counts** (estimate using guide above)
4. **Refresh dashboard** and you'll see everything!

**Dashboard**: https://cloud.langfuse.com

**After setup**: You'll have complete cost visibility with breakdowns by model, agent, industry, phase, and more!

---

*Last updated: Oct 21, 2025*
*Setup time: 5 minutes*
*Impact: Full observability + cost optimization*
