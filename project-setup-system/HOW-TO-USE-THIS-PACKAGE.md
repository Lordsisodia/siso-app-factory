# How to Use SISO App Factory - Universal Planning Package

**Quick Guide**: Get from idea → working app in 2 weeks

---

## 🎯 What You Have

A **complete, AI-navigable planning system** that:
1. Takes any app idea
2. Guides AI through comprehensive planning (9 phases)
3. Produces machine-executable build plan
4. AI coder builds the app automatically
5. You test, customize, deploy to infinite clients

**Location**: `siso-app-factory/project-setup-system/`

---

## 🚀 How to Use It (3 Simple Steps)

### Step 1: Copy Into New Project (1 minute)

```bash
# Create your new project
mkdir my-restaurant-app
cd my-restaurant-app

# Clone SISO App Factory
git clone https://github.com/Lordsisodia/siso-app-factory.git .siso
```

**Result**: You now have `.siso/` folder with complete planning system

---

### Step 2: Tell AI to Plan (6-8 hours AI time)

**Just say this to your AI**:

```
Read: .siso/project-setup-system/AI-START.md

Help me plan my new app using SISO App Factory.
```

**What Happens**:

1. **AI Reads AI-START.md** (entry point)
   - Understands the system
   - Knows what to do

2. **AI Asks You 5 Questions**:
   - What industry/type of app? (e.g., "Restaurant booking in Bali")
   - What problem does it solve? (e.g., "Tourists can't easily book authentic restaurants")
   - Who are the users? (e.g., "Tourists + Restaurant owners + Admin")
   - Any specific requirements? (e.g., "Must support WhatsApp, QR code payments")
   - Multi-tenant? (e.g., "Yes - multiple restaurants using same platform")

3. **AI Works Autonomously** (6-8 hours):
   - Phase 1-2: Industry research + competitor analysis
   - Phase 3: Feature planning (50+ features)
   - Phase 4-5: Architecture + component mapping (uses library)
   - Phase 6-7: Domain operations + database design
   - Phase 8: Build plan (100+ tasks)
   - Phase 9: Complete PDR

4. **AI Creates Complete Documentation**:
   ```
   your-project/
   ├── docs/
   │   ├── 01-research/research-summary.md
   │   ├── 03-features/features.md
   │   ├── 05-technical/architecture.md
   │   ├── 05-technical/component-catalog.md
   │   ├── 05-technical/schema-spec.md
   │   ├── 06-pdr/PDR.md
   │   └── 08-build-plan/master-checklist.md
   ├── buildplan.yaml              # ← Machine executable
   └── siso-site-config.yaml        # ← Theme config
   ```

---

### Step 3: AI Builds the App (1-2 days AI + 2-3 days human)

**Option A - Using Codex CLI** (future, when built):
```bash
codex-build scaffold     # Next.js app structure
codex-build assemble     # Copy components from library
codex-build migrate      # Database setup
codex-build api          # API routes
codex-build integrate    # Supabase, Clerk, Stripe
codex-build tests        # Generate tests
codex-build preview      # Test locally
```

**Option B - Manual AI Coding** (current):
```
Tell AI:

"Read the following planning docs and build the app:
- buildplan.yaml
- docs/05-technical/component-catalog.md
- docs/05-technical/schema-spec.md
- docs/08-build-plan/master-checklist.md

Follow the build plan step-by-step. Use components from the catalog (don't regenerate). Use the exact SQL from schema-spec.md."
```

**Then**: AI generates all code, you test and fix 10-15%

---

## 📁 The Files AI Reads

### For Planning (AI reads automatically):

1. **AI-START.md** - Entry point, asks questions
2. **MASTER-SETUP-PROMPT.md** - 9-phase guide
3. **meta.yaml** - Validation rules
4. **templates/*.md** - Phase templates
5. **integrations/*.md** - Supabase, Clerk, theming guides
6. **context/*.md** - Research, vision, best practices

### For Building (AI reads after planning):

1. **buildplan.yaml** - Executable build specification
2. **docs/05-technical/component-catalog.md** - Component mappings (path + props + examples)
3. **docs/05-technical/schema-spec.md** - SQL DDL with RLS policies
4. **docs/08-build-plan/master-checklist.md** - Task checklist
5. **siso-site-config.yaml** - Theme configuration

---

## 🎯 What Makes This Work

### 1. Component Library (1,983+ Components)

AI searches library and maps 85%+ components from existing:
- `packages/ui/src/primitives/` - 50+ categories (buttons, cards, heroes, etc.)
- `packages/restaurants/` - Restaurant-specific features
- `packages/bike-rental/` - Bike rental features
- `packages/tour-guides/` - Tour guide features

**Saves 30-40 hours** per project (no building from scratch)

### 2. Research-Optimized Formats

Based on Deep Research findings:
- **Detailed task format**: Steps + references + validation (+68% fewer iterations)
- **SQL with semantic comments**: (+28% accuracy)
- **Component refs with examples**: (+85% reuse rate)
- **Validation loops**: (+52% success rate)

### 3. Multi-Tenant Ready

One codebase serves infinite clients:
- YAML config controls theme per client
- Database isolates data with RLS
- Fork & deploy new client in 10 minutes

### 4. AI-Coder Agnostic

Works with ANY AI coder:
- Codex CLI (today)
- Claude Code (tomorrow)
- GPT-6 (next year)
- As AI improves, system automatically benefits

---

## 📊 Expected Timeline & Cost

### Traditional Development:
- **Time**: 14-20 weeks
- **Cost**: $55K-180K
- **Process**: Manual planning, coding, testing

### With SISO App Factory:
- **Planning**: 6-8 hours AI ($50-100)
- **Building**: 1-2 days AI + 2-3 days human ($300-800)
- **Total**: 2 weeks, $500-1,200

**Savings**: 100x-200x cheaper, 6-8x faster

---

## ✅ Success Checklist

### After Planning, You Should Have:

- [ ] Market research with 10+ sources
- [ ] 10-15 competitors analyzed
- [ ] 50+ features documented and prioritized
- [ ] 10-20 business domains defined
- [ ] 20-50 database tables designed with SQL DDL
- [ ] 50-100 pages mapped with components (85%+ from library)
- [ ] 100+ task build plan
- [ ] Complete PDR (10+ pages)
- [ ] buildplan.yaml (machine-executable)
- [ ] siso-site-config.yaml (theme config)

### After Building, You Should Have:

- [ ] Working Next.js 15 app
- [ ] TypeScript compiles (0 errors)
- [ ] ESLint passes (0 warnings)
- [ ] Unit tests pass (70%+ coverage)
- [ ] E2E tests pass (critical paths)
- [ ] Supabase connected and working
- [ ] Clerk auth working
- [ ] Stripe payments integrated (if applicable)
- [ ] App runs locally
- [ ] Ready to deploy

---

## 🎓 Real Example

### Input:
"I want a restaurant booking app for Bali that supports WhatsApp notifications and QR code payments"

### After Planning (6-8 hours AI):
- ✅ Research on Bali restaurant market (6.33M tourists, 245K outlets)
- ✅ 12 competitors analyzed (OpenTable, Resy, SevenRooms, etc.)
- ✅ 78 features extracted and prioritized
- ✅ 14 domains defined (Menu, Booking, User, Payment, Loyalty, etc.)
- ✅ 32 database tables designed
- ✅ 67 pages mapped
- ✅ 127 tasks in build plan
- ✅ Complete PDR (15 pages)

### After Building (1-2 days AI + 2 days human):
- ✅ Working Next.js 15 app
- ✅ 85% components from library (only 15% custom)
- ✅ WhatsApp integration via Twilio
- ✅ QR code payments via QRIS (local Indonesian standard)
- ✅ Multi-tenant (can serve multiple restaurants)
- ✅ Config-driven theming (each restaurant different colors)

### After Deploying (10 min per client):
- ✅ Client 1: Warung Bali (red theme, Indonesian menu)
- ✅ Client 2: Sushi Paradise (blue theme, Japanese menu)
- ✅ Client 3: Taco Town (orange theme, Mexican menu)

**Same app, different configs!**

---

## 🆘 If Something Goes Wrong

### "AI doesn't know where to start"
→ **Solution**: Point it to `AI-START.md`
```
Read: .siso/project-setup-system/AI-START.md
```

### "Planning docs are incomplete"
→ **Solution**: Check against meta.yaml validation rules
```
cat .siso/project-setup-system/meta.yaml
# Review validation section
```

### "AI keeps regenerating components instead of using library"
→ **Solution**: Update component-catalog.md with full paths + examples
```yaml
# Include in component catalog:
component: "packages/ui/src/primitives/heroes/HeroFullscreen.v2"
props: { title: string, subtitle: string, ... }
example: |
  <HeroFullscreen title="..." subtitle="..." />
```

### "buildplan.yaml is invalid"
→ **Solution**: Validate against schema
```bash
# Schema location:
.siso/project-setup-system/prd/schema/buildplan.schema.json
```

### "AI coder fails to build"
→ **Solution**: Check formats match research findings:
- Tasks: Detailed steps + references + validation
- Components: Path + props + examples
- Schema: SQL DDL + semantic comments

---

## 🚀 Pro Tips

### Tip 1: Let AI Work Autonomously

Don't micromanage phases. AI will:
- Use WebSearch for research
- Audit competitors systematically
- Search component library
- Generate all docs

Just answer initial questions, then wait for complete package.

### Tip 2: Review at Checkpoints

Key review moments:
- After Phase 3: Approve features and MVP scope
- After Phase 5: Verify component selections (85%+ from library?)
- After Phase 7: Review database schema (correct tables and RLS?)
- After Phase 9: Final PDR review before building

### Tip 3: Use Multi-Tenant from Day 1

Even if starting with one client, design multi-tenant:
- Easier to add clients later
- Costs less (one database)
- More valuable product

### Tip 4: Trust the Research

Formats are optimized based on research:
- Detailed task format → 68% fewer iterations
- SQL + comments → 28% better accuracy
- Validation loops → 52% higher success

Don't simplify or change unless you have data supporting it.

### Tip 5: Track Performance

After each project, note:
- Planning time actual vs estimated
- Build success rate (% working without fixes)
- Component reuse rate (target 85%+)
- Iterations needed per phase
- Human intervention points

Use data to improve future projects.

---

## 📚 Learn More

### Essential Reading:
1. **README.md** - System overview (you're reading it!)
2. **AI-START.md** - AI entry point
3. **UNIVERSAL-PRD-FRAMEWORK-VISION.md** - The vision
4. **MASTER-SETUP-PROMPT.md** - Complete guide

### Deep Dives:
5. **DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md** - AI coder patterns
6. **CODEX-IMPLEMENTATION-DESIGN.md** - buildplan.yaml schema
7. **Integration guides** (Supabase, Clerk, Theming)

---

## 🎬 Ready to Start?

```bash
# 1. Clone into new project
git clone https://github.com/Lordsisodia/siso-app-factory.git .siso

# 2. Tell your AI
"Read: .siso/project-setup-system/AI-START.md

Help me plan my new app."

# 3. Answer AI's questions

# 4. Wait 6-8 hours for complete planning

# 5. Review and approve

# 6. Build with AI coder

# 7. Deploy to clients

# 8. Profit! 🚀
```

---

**Version**: 3.0
**Last Updated**: October 21, 2025
**Status**: Production-Ready Universal Package

**You're ready to build apps 100x faster and 100x cheaper!** 🎉
