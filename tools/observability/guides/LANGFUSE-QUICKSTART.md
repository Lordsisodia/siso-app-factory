# LangFuse Quick Start - SISO App Factory

## ✅ Setup Complete!

Your LangFuse tracking is configured and ready to use with **cloud.langfuse.com**.

---

## 🎯 How to Access Your Dashboard

### Step 1: Open LangFuse

```bash
# Open in browser
open https://cloud.langfuse.com

# Or visit manually:
# https://cloud.langfuse.com
```

### Step 2: Login

Use the credentials you created when you signed up for LangFuse cloud.

### Step 3: View Traces

You should see the test trace we just created:
- Name: "Test Trace - SISO App Factory"
- Status: ✅ Success
- 2 spans: Test Phase + Verification

Click on it to see the details!

---

## 📊 What You'll See in Dashboard

### Traces Page

```
┌──────────────────────────────────────────┐
│ Traces                                   │
├──────────────────────────────────────────┤
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ Test Trace - SISO App Factory      │ │
│ │ 2 seconds | $0.01 | ✅ Success      │ │
│ │ Just now                            │ │
│ │                                      │ │
│ │ [Click to expand]                    │ │
│ └──────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### When You Click the Trace

```
Trace Details:
├─ Span: Test Phase - Connection Check
│   Duration: 2 seconds
│   Tokens: 100
│   Cost: $0.01
│
└─ Span: Test Verification
    Criteria: 5
    Passed: 5
    Failed: 0
    Score: 100%
```

---

## 🚀 How to Use During Planning

### Before Starting a Planning Session

```bash
# 1. Initialize tracking
node tools/observability/scripts/langfuse-init.js "Restaurant Booking App" "restaurant" "Indonesia"

# You'll see:
# ✅ LangFuse trace created successfully!
# Trace ID: abc-123-xyz
# View at: https://cloud.langfuse.com/traces/abc-123-xyz
```

This creates a trace and saves the trace ID to `.langfuse-trace.json`.

### During Planning (Tell Claude)

```
"I want to plan a restaurant booking app for Indonesia.

TRACKING SETUP:
- LangFuse is already initialized (trace saved in .langfuse-trace.json)
- For each phase you complete, log it using:

  node tools/observability/scripts/langfuse-track-generation.js <phase> <model> <inputTokens> <outputTokens> <duration> <score>

Examples:
  node tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 12000 11000 "12 minutes" 95
  node tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 18000 15000 "38 minutes" 90
  node tools/observability/scripts/langfuse-track-generation.js 9 "claude-sonnet-4.5" 8000 7500 "22 minutes" 97

NOW START PLANNING:
Follow MASTER-SETUP-PROMPT.md with all 9 phases + Phase 4.5 UI/UX Design.
Use multi-agent orchestration for best results.
Verify after each phase using validation/ checklists."
```

### After Planning Complete

```bash
# Finalize the trace
node tools/observability/scripts/langfuse-finish.js

# You'll see:
# ✅ Trace finalized successfully!
# View at: https://cloud.langfuse.com/traces/[your-trace-id]
```

---

## 📈 What Gets Tracked

### Automatically Tracked

When you run the scripts above, LangFuse captures:

**Per Phase**:
- Phase name (e.g., "Phase 4.5: UI/UX Design")
- Duration (e.g., "38 minutes")
- Tokens used (e.g., 28,000)
- Estimated cost (e.g., $0.76)
- Verification score (e.g., 90%)
- Pass/fail status

**Overall Session**:
- Total duration (e.g., 6.5 hours)
- Total tokens (e.g., 235,000)
- Total cost (e.g., $5.12)
- All 9 phases in timeline
- Verification success rates

### What You'll Learn

**Cost Insights**:
```
"Phase 4 (Architecture) costs $1.23 (24% of total)"
→ Action: Optimize architecture prompts to reduce tokens
```

**Performance Insights**:
```
"Phase 6 (Domain Ops) takes 42 minutes (slowest)"
→ Action: Provide domain examples to speed this up
```

**Quality Insights**:
```
"Phase 4.5 (UI/UX) failed verification first try (85% score)"
→ Action: UI checklist might be too strict, or need better examples
```

---

## 🎬 Real Planning Session Example

### Complete Workflow

```bash
# STEP 1: Initialize tracking
node tools/observability/scripts/langfuse-init.js "Restaurant Booking App" "restaurant" "Indonesia"

# STEP 2: Open dashboard in browser (to watch in real-time)
open https://cloud.langfuse.com

# STEP 3: Start planning with Claude Code CLI
# Tell Claude the prompt from above (with tracking instructions)

# STEP 4: Claude completes planning (6-8 hours)
# Claude runs: node tools/observability/scripts/langfuse-track-generation.js after each phase
# You see phases appearing in LangFuse dashboard in real-time!

# STEP 5: Finalize trace
node tools/observability/scripts/langfuse-finish.js

# STEP 6: Review results in dashboard
# See cost breakdown, identify expensive phases, optimize for next project
```

---

## 📊 Dashboard Navigation Guide

### View 1: Traces List

1. Go to https://cloud.langfuse.com
2. Click "Traces" in left sidebar
3. You'll see all your planning sessions listed

**What you see**:
- Trace name (e.g., "SISO Planning: Restaurant App")
- Duration, cost, status
- Tags (industry, region)
- Timestamp

**Click any trace** to drill down →

---

### View 2: Trace Timeline

Shows waterfall view of all phases:

```
Restaurant App Planning
├─ Phase 1: Industry Research (12m, $0.47)
├─ Phase 2: Competitor Analysis (18m, $0.68)
├─ Phase 3: Feature Planning (15m, $0.52)
├─ Phase 4: Architecture (45m, $1.23)
├─ Phase 4.5: UI/UX Design (38m, $0.76) ⚠️ 1 retry
├─ Phase 5: Components (25m, $0.58)
├─ Phase 6: Domain Ops (42m, $0.98)
├─ Phase 7: Database (32m, $0.52)
├─ Phase 8: Build Plan (28m, $0.38)
└─ Phase 9: PDR (22m, $0.34)

Total: 6.5 hours, $5.12, 235K tokens
```

**Click any phase** to see details →

---

### View 3: Phase Details

Shows input, output, metadata for a specific phase:

```
Phase 4.5: UI/UX Design

Input:
{
  "pages": 21,
  "userFlows": ["guest-booking", "staff-mgmt", "admin"],
  "designSystem": "modern-minimal"
}

Output:
{
  "filesCreated": [
    "docs/04.5-ui-design/user-flows.md",
    "docs/04.5-ui-design/wireframes.md",
    "docs/04.5-ui-design/design-system.md",
    "docs/04.5-ui-design/accessibility-checklist.md"
  ],
  "pagesWireframed": 21,
  "componentsDesigned": 18
}

Metadata:
- Duration: 38 minutes
- Tokens: 28,000
- Cost: $0.76
- Verification Score: 90%
- Iterations: 2 (1 retry)
```

---

### View 4: Analytics

Click "Analytics" in sidebar to see:

**Aggregate Stats**:
- Total projects planned: X
- Average cost per project: $Y
- Average duration: Z hours
- Success rate: XX%

**Cost Breakdown**:
- Bar chart showing which phases are most expensive
- Token usage by tool type (WebSearch, WebFetch, etc.)

**Performance**:
- Average duration per phase
- Slowest phases identified
- Retry patterns

---

## 🎯 Pro Tips

### Tip 1: Watch in Real-Time

Keep LangFuse dashboard open in a browser tab while Claude is planning:

```bash
# Open dashboard
open https://cloud.langfuse.com

# Leave it open, refresh periodically
# Watch phases appear as Claude completes them!
```

### Tip 2: Compare Projects

After planning 2-3 projects, compare them:

1. Go to "Traces"
2. Filter by tag (e.g., "restaurant" vs "tour-guide")
3. Compare:
   - Which industry takes longer to plan?
   - Which industry costs more?
   - Which phases are consistent vs variable?

### Tip 3: Optimize Based on Data

After 5 projects, analyze patterns:

```
Pattern Found:
"Phase 2 (Competitors) always costs $0.60-0.80
 but Phase 4 (Architecture) varies widely: $0.90-1.50"

Hypothesis: Architecture phase depends on complexity
Action: For simple apps, provide architecture templates to speed up
```

### Tip 4: Set Cost Budgets

Free tier limits: 50K events/month

Typical planning session: ~100 events (9 phases + spans + verifications)

**You can track ~500 planning sessions/month on free tier** (way more than needed!)

If you exceed:
- Upgrade to paid tier ($20/month for 500K events)
- Or optimize to reduce events (batch smaller logs)

---

## 🐛 Troubleshooting

### "I don't see my trace in the dashboard"

**Solution**:
1. Wait 5-10 seconds (LangFuse batches uploads)
2. Refresh the page
3. Check if script ran successfully (should say "Data sent to LangFuse")
4. If still missing, check internet connection

### "Cost shows $0.00"

**Reason**: You're still logging spans without token counts (legacy `langfuse-track-phase` behavior) instead of using the generation script.

**How to get actual cost**:
1. Claude Sonnet 4.5 pricing:
   - Input tokens: $3 per 1M tokens
   - Output tokens: $15 per 1M tokens

2. Estimate:
   ```
   Phase 1 uses ~18K tokens
   Assume 50/50 input/output:
   - Input: 9K × $0.000003 = $0.027
   - Output: 9K × $0.000015 = $0.135
   - Total: ~$0.16 (we estimated $0.47, may be high)
   ```

3. For more accurate tracking:
   - Use Claude API directly (get exact token counts)
   - Or use conservative estimates and adjust

### "Trace ID lost"

**Solution**:
- Trace ID saved in `.langfuse-trace.json`
- If lost, check that file
- Or go to dashboard → Traces → Find by project name

---

## 📝 Manual Tracking (If Scripts Don't Work)

If helper scripts have issues, track manually:

```javascript
import { Langfuse } from "langfuse";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Create trace
const trace = langfuse.trace({
  name: 'SISO Planning: Restaurant App',
  userId: 'shaan@siso.com',
});

// Track phase
const phase1 = trace.span({ name: 'Phase 1: Research' });
// ... do work ...
phase1.end({
  output: { files: ['research-summary.md'] },
  metadata: { duration: '12m', tokens: 18500, cost: 0.47, score: 95 }
});

// Flush
await langfuse.shutdownAsync();
```

---

## 🎉 You're All Set!

**What you have now**:

✅ LangFuse configured (cloud.langfuse.com)
✅ API keys set up (.env.local)
✅ Helper scripts created (init, track-generation, finish, test)
✅ Connection tested ✅ Working!
✅ Test trace visible in dashboard

**Next time you plan a project**:

```bash
# 1. Initialize
node tools/observability/scripts/langfuse-init.js "My New App" "industry" "region"

# 2. Tell Claude to track phases
#    (Use the prompt from this guide)

# 3. Finalize
node tools/observability/scripts/langfuse-finish.js

# 4. View results
open https://cloud.langfuse.com
```

**Dashboard access**: https://cloud.langfuse.com

**Your test trace**: https://cloud.langfuse.com/traces/3649d6bd-13ca-4efb-aa83-2c3e242715e7

---

## 📚 Additional Resources

- **LangFuse Docs**: https://langfuse.com/docs
- **Integration Guide**: `project-setup-system/integrations/LANGFUSE-INTEGRATION-GUIDE.md`
- **API Reference**: https://langfuse.com/docs/sdk/typescript

---

*Setup completed: Oct 21, 2025*
*Connection tested: ✅ Working*
*Dashboard: https://cloud.langfuse.com*
