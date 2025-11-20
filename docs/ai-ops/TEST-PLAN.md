# SISO App Factory v3.0 - Complete Test Plan

## 🎯 Test Objective

Validate the entire planning system works end-to-end:
- ✅ 9 phases + Phase 4.5 (UI/UX) execute successfully
- ✅ Self-verification catches errors and improves quality
- ✅ Multi-agent orchestration works (optional test)
- ✅ LangFuse tracks all data (cost, tokens, model, agents, tags)
- ✅ All deliverables created (research, PDR, wireframes, etc.)
- ✅ Gold-standard PDR with all new sections

**Estimated Test Time**: 1-2 hours (AI does the work, you verify)

---

## Test Scenario: Simple Coffee Shop Booking App

**Why this scenario?**
- ✅ Simple enough to complete quickly (30-60 min AI time)
- ✅ Similar to restaurant booking (proven domain)
- ✅ Tests all phases (research, competitors, UI/UX, database, etc.)
- ✅ Multi-tenant (each coffee shop = 1 tenant)

**Project Brief**:
```
Industry: Coffee Shop Booking
Region: Indonesia (Jakarta)
Problem: Coffee shops lose customers during peak hours (no reservations)
Target Users: Remote workers, students who want guaranteed seating
Multi-Tenant: Yes (each coffee shop is a tenant)
```

---

## PRE-TEST SETUP (5 minutes)

### 1. Add Model Pricing in LangFuse

**Critical Step** (enables cost tracking):

```
1. Visit: https://cloud.langfuse.com
2. Login
3. Click: ⚙️ Settings (bottom-left)
4. Click: "Models" tab
5. Click: [+ New Model]
6. Fill in:
   - Model ID: claude-sonnet-4.5
   - Match Pattern: claude-sonnet-4
   - Provider: Anthropic
   - Input Price: 3.00 per 1,000,000 tokens
   - Output Price: 15.00 per 1,000,000 tokens
   - Currency: USD
7. Click: [Save Model]
```

✅ **Verify**: You see "claude-sonnet-4.5" in the models list

### 2. Create Test Project Folder

```bash
# Create test project
mkdir ~/test-coffee-shop-booking
cd ~/test-coffee-shop-booking

# Clone app factory
git clone /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/siso-app-factory .siso

# Copy .env.local (with your LangFuse keys)
cp .siso/.env.local .env.local

# Update project context
echo 'PROJECT_NAME="Coffee Shop Booking Test"' >> .env.local
echo 'PROJECT_INDUSTRY="coffee-shop"' >> .env.local
echo 'PROJECT_REGION="Indonesia"' >> .env.local
```

### 3. Initialize LangFuse Tracking

```bash
cd ~/test-coffee-shop-booking

# Initialize tracking
node .siso/tools/observability/scripts/langfuse-init.js "Coffee Shop Booking Test" "coffee-shop" "Indonesia"

# You should see:
# ✅ LangFuse trace created successfully!
# Trace ID: [some-id]
# View at: https://cloud.langfuse.com/traces/[some-id]
```

✅ **Verify**: Open that URL, you should see an empty trace (will populate as phases complete)

---

## TEST 1: Single Agent Planning (Simpler, 45-60 min)

### Step 1: Give Claude the Planning Prompt

Tell Claude Code CLI:

```
"I want to test the SISO App Factory v3.0 planning system.

Project: Coffee Shop Booking App
Industry: Coffee shops in Indonesia
Problem: Coffee shops lose customers during peak hours because they don't take reservations
Target Users: Remote workers, students who want guaranteed seating for work sessions
Multi-Tenant: Yes (each coffee shop is a tenant)

IMPORTANT: This is a TEST, so keep it concise:
- Phase 1: Research (aim for 5-7 sources minimum, not 10+)
- Phase 2: Competitors (analyze 5-7 competitors, extract 30+ features)
- Keep other phases proportionally smaller
- Goal: Complete all 9 phases + Phase 4.5 in 45-60 minutes

TRACKING:
After EACH phase you complete, track it:
node .siso/tools/observability/scripts/langfuse-track-generation.js <phase> "claude-sonnet-4.5" <inputTokens> <outputTokens> "<duration>" <score>

Estimate tokens conservatively:
- Small phases: ~5K input, ~5K output
- Medium phases: ~8K input, ~8K output
- Large phases (Architecture, UI/UX): ~12K input, ~12K output

Example:
node .siso/tools/observability/scripts/langfuse-track-generation.js 1 "claude-sonnet-4.5" 5000 5000 "8 minutes" 90

VERIFICATION:
After each phase, verify using validation/phase-XX-checklist.md
- Score ≥ 80% → Proceed
- Score < 80% → Fix and retry (max 1 retry for test)

NOW BEGIN:
Read: .siso/project-setup-system/MASTER-SETUP-PROMPT.md
Follow all 9 phases + Phase 4.5 (UI/UX Design)
Create docs in: docs/ folder (docs/01-research/, docs/04.5-ui-design/, etc.)

START WITH PHASE 1: Industry & Market Research"
```

### Step 2: Monitor Progress

**Keep LangFuse dashboard open**: https://cloud.langfuse.com

As Claude completes each phase, you should see:
```
Phase 1 appears → Cost: $0.09 → Model: claude-sonnet-4.5 ✅
Phase 2 appears → Cost: $0.11 ✅
Phase 3 appears → Cost: $0.08 ✅
Phase 4 appears → Cost: $0.21 ✅
Phase 4.5 appears → Cost: $0.18 ✅ (UI/UX!)
[... etc ...]
```

**Refresh dashboard periodically** to see phases appearing in real-time!

### Step 3: Verify Outputs

After Claude completes all phases, check:

```bash
cd ~/test-coffee-shop-booking

# Check all deliverables exist
ls docs/01-research/research-summary.md          # ✅ Phase 1
ls docs/02-competitor-analysis/feature-matrix.md  # ✅ Phase 2
ls docs/03-features/features.md                   # ✅ Phase 3
ls docs/05-technical/architecture.md              # ✅ Phase 4
ls docs/04.5-ui-design/user-flows.md              # ✅ Phase 4.5 (NEW!)
ls docs/04.5-ui-design/wireframes.md              # ✅ Phase 4.5
ls docs/04.5-ui-design/design-system.md           # ✅ Phase 4.5
ls docs/05-technical/component-catalog.md         # ✅ Phase 5
ls docs/05-technical/schema-spec.md               # ✅ Phase 7
ls docs/08-build-plan/master-checklist.md         # ✅ Phase 8
ls docs/06-pdr/PDR.md                             # ✅ Phase 9 (FINAL)

# Check PDR has new sections
grep "Press Release" docs/06-pdr/PDR.md           # ✅ New section
grep "Assumptions" docs/06-pdr/PDR.md             # ✅ New section
grep "Non-Goals" docs/06-pdr/PDR.md               # ✅ New section
grep "Open Questions" docs/06-pdr/PDR.md          # ✅ New section
grep "Alternatives Considered" docs/06-pdr/PDR.md # ✅ New section
```

### Step 4: Verify LangFuse Data

**Go to**: https://cloud.langfuse.com

**Check you see**:

1. **Trace exists**: "Coffee Shop Booking Test"

2. **Cost calculated**: Should show total cost (e.g., $1.50-2.50 for small test)

3. **Model visible**: claude-sonnet-4.5

4. **Phases tracked**: 10 generations (9 phases + Phase 4.5)

5. **Metadata present**:
   - Click trace → Click any generation (e.g., Phase 4.5)
   - Scroll to "Metadata" section
   - Should see:
     ```
     agent: ui-ux-agent
     environment: planning
     industry: coffee-shop
     region: Indonesia
     verified: true
     phase: 4.5
     ```

6. **Tags present**:
   - Should see: `[planning] [phase-4.5] [ui-ux-agent] [coffee-shop] [indonesia] [verified]`

7. **Tokens tracked**:
   - Input tokens: [number]
   - Output tokens: [number]
   - Total: [sum]

8. **Cost calculated**:
   - Should be: (inputTokens / 1M × $3) + (outputTokens / 1M × $15)
   - NOT $0.00!

✅ **If all 8 checks pass → LangFuse working perfectly!**

---

## TEST 2: Multi-Agent Planning (Advanced, 45-60 min)

### Step 1: Initialize New Test

```bash
# Create fresh test project
mkdir ~/test-coffee-shop-multiagent
cd ~/test-coffee-shop-multiagent
cp -r /Users/shaansisodia/DEV/PERSONAL/CLIENT-WORK/client-projects/Restraunt/siso-app-factory .siso
cp .siso/.env.local .env.local

# Initialize tracking
node .siso/tools/observability/scripts/langfuse-init.js "Coffee Shop Multi-Agent Test" "coffee-shop" "Indonesia"
```

### Step 2: Multi-Agent Planning Prompt

Tell Claude:

```
"Test SISO App Factory v3.0 MULTI-AGENT orchestration.

Project: Coffee Shop Booking App (same as before)

USE MULTI-AGENT SYSTEM:
Read: .siso/project-setup-system/prompts/multi-agent/README.md

Execute agents IN SEQUENCE:
1. Researcher Agent (Phases 1-2)
   - Read: .siso/project-setup-system/prompts/multi-agent/01-researcher-agent.md
   - Complete Phases 1-2
   - Verify both phases
   - Create handoff summary

2. Product Manager Agent (Phase 3)
   - Read handoff from Researcher
   - Read: .siso/project-setup-system/prompts/multi-agent/02-product-manager-agent.md
   - Complete Phase 3
   - Verify
   - Handoff to Architect

3. Architect Agent (Phase 4)
   - Read handoff from PM
   - Read: .siso/project-setup-system/prompts/multi-agent/03-architect-agent.md
   - Complete Phase 4
   - Verify
   - Handoff to UI/UX Designer

4. UI/UX Designer Agent (Phase 4.5) ⭐ CRITICAL TEST
   - Read handoff from Architect
   - Read: .siso/project-setup-system/prompts/multi-agent/04-ui-ux-designer-agent.md
   - Complete Phase 4.5 (user flows, wireframes, design system, accessibility)
   - Verify against validation/phase-045-ui-design-checklist.md (20 criteria, ≥85%)
   - Handoff to Domain Engineer

5. Domain Engineer Agent (Phases 5-7)
   - Read handoff from UI/UX Designer
   - Read: .siso/project-setup-system/prompts/multi-agent/05-domain-engineer-agent.md
   - Complete Phases 5-7
   - Verify all 3 phases
   - Handoff to QA

6. QA Engineer Agent (Phases 8-9)
   - Read handoff from Domain Engineer
   - Read: .siso/project-setup-system/prompts/multi-agent/06-qa-engineer-agent.md
   - Complete Phases 8-9
   - Verify both (Phase 9 needs ≥90%)
   - Final handoff

TRACKING:
After each phase, track to LangFuse:
node .siso/tools/observability/scripts/langfuse-track-generation.js <phase> "claude-sonnet-4.5" <inputTokens> <outputTokens> "<duration>" <score>

Keep it concise for TEST purposes (aim for 45-60 min total).

NOW START: Execute Researcher Agent (Phases 1-2)."
```

### Step 3: Verify Multi-Agent Handoffs

As Claude switches agents, verify:

**After Researcher → PM**:
```bash
# Check handoff summary exists
grep "Handoff to Product Manager" docs/01-research/research-summary.md

# OR check if Claude created separate handoff
ls docs/handoffs/researcher-to-pm.md
```

**After UI/UX Designer → Domain Engineer**:
```bash
# Verify UI/UX deliverables exist
ls docs/04.5-ui-design/user-flows.md       # ✅
ls docs/04.5-ui-design/wireframes.md       # ✅
ls docs/04.5-ui-design/design-system.md    # ✅
ls docs/04.5-ui-design/accessibility-checklist.md # ✅

# Check handoff mentions key design decisions
grep "Handoff to Domain Engineer" docs/04.5-ui-design/design-system.md
```

### Step 4: Verify Final Outputs

```bash
# Count deliverables
find docs -name "*.md" | wc -l
# Should have 15-25 files

# Check PDR completeness
wc -l docs/06-pdr/PDR.md
# Should be 200+ lines (comprehensive)

# Verify new PDR sections exist
grep -A 5 "Press Release" docs/06-pdr/PDR.md
grep -A 5 "Assumptions" docs/06-pdr/PDR.md
grep -A 5 "Non-Goals" docs/06-pdr/PDR.md
grep -A 5 "Open Questions" docs/06-pdr/PDR.md
grep -A 5 "Alternatives Considered" docs/06-pdr/PDR.md
```

### Step 5: Verify LangFuse Multi-Agent Tracking

**Go to**: https://cloud.langfuse.com

**Find**: "Coffee Shop Multi-Agent Test" trace

**Check you see**:

```
Trace: Coffee Shop Multi-Agent Test
├─ Cost: $X.XX (calculated)
├─ Model: claude-sonnet-4.5
├─ Duration: ~45-60 min
├─ Generations: 10

By Agent (in metadata):
├─ researcher-agent: 2 generations (Phases 1-2)
├─ pm-agent: 1 generation (Phase 3)
├─ architect-agent: 1 generation (Phase 4)
├─ ui-ux-agent: 1 generation (Phase 4.5) ⭐
├─ domain-engineer-agent: 3 generations (Phases 5-7)
└─ qa-agent: 2 generations (Phases 8-9)
```

**Filter Test**:
- Filter by: `metadata.agent = "ui-ux-agent"`
- Should show: Only Phase 4.5 generation

---

## TEST 3: Verification System (Quick Test)

### Test Scenario: Deliberately Fail Verification

Tell Claude:

```
"Quick verification test:

Do Phase 1 (Industry Research) but INTENTIONALLY make it incomplete:
- Only cite 3 sources (checklist requires 10+)
- Don't quantify market size
- Skip regional variations

Then verify against: .siso/validation/phase-01-research-checklist.md

Expected result: FAIL (score < 80%)

Then FIX the issues and re-verify.
Expected result: PASS (score ≥ 80%)

Track both attempts to LangFuse."
```

**Expected Behavior**:

```
Attempt 1:
├─ Generate Phase 1 (incomplete)
├─ Verify against checklist
├─ Score: 40% (6/15 passed)
│   ├─ ❌ Only 3 sources (need 10+)
│   ├─ ❌ Market size not quantified
│   ├─ ❌ Regional variations missing
│   └─ [... other failures ...]
└─ Decision: RETRY (< 80%)

Attempt 2:
├─ Fix issues (add 7 sources, quantify market, add regions)
├─ Re-verify
├─ Score: 87% (13/15 passed)
└─ Decision: PASS (≥ 80%) → Proceed to Phase 2 ✅
```

✅ **Verify**: LangFuse shows 2 generations for Phase 1 (failed attempt + successful retry)

---

## TEST 4: UI/UX Specialist Test (Detailed)

### Test Scenario: Verify UI/UX Agent Creates All Deliverables

Tell Claude:

```
"Skip to Phase 4.5 test (assume Phases 1-4 complete).

Context:
- Industry: Coffee shop booking
- Features: Browse coffee shops, book workspace seat, pay deposit, manage bookings
- Target: Remote workers 25-40 (mobile-first, 75% use mobile)

Execute UI/UX Designer Agent:
Read: .siso/project-setup-system/prompts/multi-agent/04-ui-ux-designer-agent.md

Create ALL 4 deliverables:
1. user-flows.md (guest booking flow, staff management, admin setup)
2. wireframes.md (minimum: Home, Search, Shop Detail, Booking Confirmation, Dashboard - 15+ pages)
3. design-system.md (colors, typography, spacing, 10+ components)
4. accessibility-checklist.md (WCAG 2.1 AA)

Verify against: .siso/validation/phase-045-ui-design-checklist.md
- Must pass 17/20 criteria (85%)
- Focus on: User flows, wireframes, color accessibility, mobile optimization

Track to LangFuse:
node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" <inputTokens> <outputTokens> "<duration>" <score>"
```

### Verify UI/UX Deliverables

```bash
# Check all 4 files created
ls docs/04.5-ui-design/user-flows.md              # ✅
ls docs/04.5-ui-design/wireframes.md              # ✅
ls docs/04.5-ui-design/design-system.md           # ✅
ls docs/04.5-ui-design/accessibility-checklist.md # ✅

# Check user flows have decision points
grep "Decision" docs/04.5-ui-design/user-flows.md
# Should show: Decision points like "Logged in?", "Deposit required?"

# Check wireframes exist for key pages
grep -i "home page\|search\|booking" docs/04.5-ui-design/wireframes.md

# Check design system has color palette
grep -A 10 "Color System\|Color Palette" docs/04.5-ui-design/design-system.md
# Should show: Primary, secondary, grays, semantic colors

# Check accessibility verified
grep "WCAG\|contrast\|keyboard" docs/04.5-ui-design/accessibility-checklist.md
# Should show: Contrast ratios, keyboard nav plan

# Check siso-site-config.yaml created
ls siso-site-config.yaml  # ✅ Multi-tenant theming config
```

---

## TEST 5: PDR Quality Test (Final Deliverable)

### Verify PDR Has All New Sections

```bash
# Phase 9 should create comprehensive PDR
cat docs/06-pdr/PDR.md

# Check sections exist
grep "## Press Release" docs/06-pdr/PDR.md        # ✅ NEW
grep "## Assumptions" docs/06-pdr/PDR.md          # ✅ NEW
grep "## Non-Goals" docs/06-pdr/PDR.md            # ✅ NEW
grep "## Open Questions" docs/06-pdr/PDR.md       # ✅ NEW
grep "## Alternatives Considered" docs/06-pdr/PDR.md # ✅ NEW

# Count assumptions
grep -c "- \[ \]" docs/06-pdr/PDR.md | head -1
# Should be 25-30+ (lots of checkboxed assumptions)

# Check no [TBD] placeholders
grep -i "TBD\|TODO" docs/06-pdr/PDR.md
# Should return 0 results (or only in examples, not actual content)

# Check PDR is substantial
wc -w docs/06-pdr/PDR.md
# Should be 3000-5000+ words (10+ pages)
```

---

## Success Criteria

### ✅ Test Passes If:

**Deliverables**:
- [ ] All 9 phases completed
- [ ] Phase 4.5 (UI/UX) created 4 files (flows, wireframes, design-system, accessibility)
- [ ] PDR has all 13 sections (including 5 new ones)
- [ ] No [TBD] placeholders in PDR
- [ ] 15-25 total documents created

**Verification**:
- [ ] Each phase ran self-verification (checked against validation/ checklists)
- [ ] Phases that failed verification were retried
- [ ] Final PDR score ≥ 90% (18/20 criteria)

**LangFuse Tracking**:
- [ ] All 10 phases tracked (9 + Phase 4.5)
- [ ] Cost auto-calculated (not $0.00)
- [ ] Model showing (claude-sonnet-4.5)
- [ ] Metadata visible (agent, environment, industry, region)
- [ ] Tags visible (planning, phase-X, agent-name, industry, region)
- [ ] Can filter by agent (e.g., show only ui-ux-agent work)
- [ ] Total cost reasonable ($1.50-3.00 for small test, $4-7 for full planning)

**Quality**:
- [ ] Press Release sounds like real announcement (customer-focused)
- [ ] Assumptions are specific and measurable (not vague)
- [ ] UI/UX includes wireframes (21+ pages for full app, 10+ for test)
- [ ] Design system has color contrast verification (WCAG 2.1 AA)

---

## Quick Test (15 minutes)

If you want a VERY quick test:

```
"Test ONLY Phase 4.5 (UI/UX).

Assume context:
- Coffee shop booking app
- Features: Browse shops, book seat, pay deposit
- Users: Remote workers (mobile-first)

Execute UI/UX Designer Agent:
Read: .siso/project-setup-system/prompts/multi-agent/04-ui-ux-designer-agent.md

Create:
1. User flow for guest booking (with decision points, edge cases)
2. Wireframes for 5 key pages (Home, Search, Shop Detail, Booking Confirm, Dashboard)
3. Design system (color palette with WCAG verification, typography, 5 components minimum)
4. Accessibility checklist

Verify: validation/phase-045-ui-design-checklist.md (aim for ≥85%)

Track: node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" <tokens> <tokens> <time> <score>

Expected time: 10-15 minutes"
```

**Verify**:
```bash
# Should create 4 files in 10-15 minutes
ls docs/04.5-ui-design/*.md | wc -l
# Should show: 4

# Check in LangFuse
# Should see: Phase 4.5 tracked with ui-ux-agent metadata
```

---

## Troubleshooting

### "Claude isn't tracking to LangFuse"

**Solution**:
```
Remind Claude after each phase:

"You just completed Phase X. Now track it:
node .siso/tools/observability/scripts/langfuse-track-generation.js X "claude-sonnet-4.5" [estimate input tokens] [estimate output tokens] "[time taken]" [verification score]

Example:
node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 15000 13000 "35 minutes" 90
"
```

### "Verification keeps failing"

**For test purposes**, you can lower threshold temporarily:
```
"For this test, if verification score is 70-79%, accept it and proceed.
We're testing the system, not achieving perfection."
```

### "Takes too long"

**Speed up**:
```
"Keep test concise:
- Phase 1: 5 sources (not 10+)
- Phase 2: 5 competitors (not 10-15)
- Phase 2: 30 features (not 50+)
- Phase 4.5: 10 wireframes (not 21+)
- Goal: Complete in 45-60 min total"
```

---

## Expected Test Results

### Small Test (Coffee Shop)

**Deliverables**:
- 15-20 markdown files in `docs/`
- Complete PDR with all 13 sections
- UI/UX design docs (4 files)

**Time**: 45-60 minutes

**Cost**: $1.50-2.50 (small test, concise outputs)

**LangFuse Data**:
- 10 generations tracked
- Cost by agent visible
- Model: claude-sonnet-4.5
- All metadata and tags present

### Full Test (Restaurant/Tour Guide)

**Deliverables**:
- 25-35 markdown files
- Comprehensive PDR (20+ pages)
- Complete UI/UX design (50+ pages across 4 files)

**Time**: 6-8 hours

**Cost**: $4-7

**LangFuse Data**:
- 10 generations with retries
- Detailed cost breakdown
- Quality scores per phase

---

## Test Completion Checklist

After running test, verify:

### Files Created
- [ ] `docs/01-research/research-summary.md`
- [ ] `docs/02-competitor-analysis/feature-matrix.md`
- [ ] `docs/03-features/features.md`
- [ ] `docs/05-technical/architecture.md`
- [ ] `docs/04.5-ui-design/user-flows.md` ⭐ NEW
- [ ] `docs/04.5-ui-design/wireframes.md` ⭐ NEW
- [ ] `docs/04.5-ui-design/design-system.md` ⭐ NEW
- [ ] `docs/04.5-ui-design/accessibility-checklist.md` ⭐ NEW
- [ ] `docs/05-technical/component-catalog.md`
- [ ] `docs/05-technical/schema-spec.md`
- [ ] `docs/08-build-plan/master-checklist.md`
- [ ] `docs/06-pdr/PDR.md`
- [ ] `siso-site-config.yaml` (theming config)

### PDR Quality
- [ ] Press Release section (Amazon PRFAQ style)
- [ ] Assumptions (25+ items)
- [ ] Non-Goals (10+ items with reasons)
- [ ] Open Questions (5+ with research plans)
- [ ] Alternatives Considered (5+ with pros/cons)
- [ ] No [TBD] placeholders

### LangFuse Dashboard
- [ ] Trace visible in dashboard
- [ ] Cost calculated (not $0.00)
- [ ] Model: claude-sonnet-4.5
- [ ] 10 generations (9 phases + Phase 4.5)
- [ ] Metadata: agent, environment, industry, region
- [ ] Tags: planning, agent names, industry, verified
- [ ] Can filter by agent (ui-ux-agent shows Phase 4.5 only)
- [ ] Can filter by industry (coffee-shop)

### Verification System
- [ ] Each phase ran verification
- [ ] Scores calculated (X/15 or X/20)
- [ ] Failed phases were retried
- [ ] Final Phase 9 score ≥ 90%

---

## If All Tests Pass ✅

**Congratulations!** SISO App Factory v3.0 is working perfectly:

✅ Planning system executes all 9 phases + UI/UX
✅ Self-verification catches errors and improves quality
✅ Multi-agent orchestration works (if tested)
✅ LangFuse tracks everything (cost, model, agents, tags)
✅ Gold-standard PDR generated (with all new sections)
✅ UI/UX specialist creates comprehensive design docs

**You can now**:
- Use for real projects (restaurant, tour guide, bike rental)
- Clone .siso folder into any new project
- Get professional planning in 6-8 hours
- Track costs and optimize over time

---

## If Tests Fail ❌

### Debug Checklist

**Phase execution issues**:
- Read error messages carefully
- Check if files are being created in docs/
- Verify prompts are clear

**Verification issues**:
- Check validation/ checklists are loaded
- Verify criteria are reasonable
- Allow 1-2 retries for test purposes

**LangFuse issues**:
- Verify model pricing added (Settings → Models)
- Check .env.local has correct keys
- Ensure using langfuse-track-generation.js (new script)
- Provide token counts (not zeros)

**UI/UX issues**:
- Verify Phase 4.5 exists in MASTER-SETUP-PROMPT.md (should be between Phase 4 and 5)
- Check UI/UX agent prompt exists (prompts/multi-agent/04-ui-ux-designer-agent.md)
- Verify checklist exists (validation/phase-045-ui-design-checklist.md)

---

## Recommended Test Order

**Day 1** (Today):
1. ✅ Add model pricing in LangFuse (2 min)
2. ✅ Run Quick UI/UX Test (15 min) - Test Phase 4.5 only
3. ✅ Verify deliverables created and tracked

**Day 2** (Tomorrow):
1. ✅ Run Small Test (Coffee Shop, single agent, 45-60 min)
2. ✅ Verify all phases work
3. ✅ Check LangFuse dashboard shows rich data

**Day 3** (Optional):
1. ✅ Run Multi-Agent Test (Coffee Shop, all 6 agents, 45-60 min)
2. ✅ Verify agent handoffs work
3. ✅ Compare quality vs single-agent

**Day 4** (Optional):
1. ✅ Run Full Test (Restaurant app, 6-8 hours)
2. ✅ Use for real client project
3. ✅ Analyze costs and optimize

---

## Quick Start Test (RIGHT NOW)

Want to test immediately? Run this:

```bash
cd ~/test-coffee-shop-booking

# Tell Claude:
"Quick 10-minute test of Phase 4.5 (UI/UX).

Assume: Coffee shop booking app for remote workers.

Read: .siso/project-setup-system/prompts/multi-agent/04-ui-ux-designer-agent.md

Create (CONCISE versions for test):
1. User flow: Guest books workspace seat
2. Wireframes: 3 pages (Home, Shop Detail, Booking Confirm)
3. Design system: Color palette + typography + 3 components
4. Accessibility: Brief WCAG checklist

Verify: .siso/validation/phase-045-ui-design-checklist.md

Track: node .siso/tools/observability/scripts/langfuse-track-generation.js 4.5 "claude-sonnet-4.5" 8000 7000 "10m" 85

Go!"
```

**Expected**: 10 minutes, 4 files created, tracked in LangFuse ✅

---

*Test Plan Version: 1.0*
*Created: Oct 21, 2025*
*Est. Test Time: 15 min (quick) to 8 hours (full)*
