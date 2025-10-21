# 🚀 SISO App Factory - AI Planning System

**AI, READ THIS FIRST!**

You are about to help plan a complete application from scratch using the **SISO App Factory Universal PRD Framework**.

---

## 📋 Before You Begin

### Step 1: Ask the User These Questions

**REQUIRED INFORMATION**:

1. **What industry/type of app?**
   - Example: Restaurant booking, Tour guide marketplace, Bike rental, E-commerce, SaaS, etc.

2. **What's the core problem this app solves?**
   - Example: "Tourists can't easily book authentic Balinese cooking classes"

3. **Who are the primary users?**
   - Example: Tourists (customers) + Local chefs/restaurants (providers) + Platform admin

4. **Any specific requirements or constraints?**
   - Geographic focus? (Bali, Global, USA)
   - Must-have integrations? (Stripe, WhatsApp, specific POS)
   - Compliance needs? (GDPR, PCI-DSS, HIPAA)
   - Budget/timeline constraints?

5. **Is this multi-tenant?** (One codebase serving multiple clients)
   - YES: Multiple restaurants/businesses using same system
   - NO: Single business/brand

**WAIT FOR USER ANSWERS** before proceeding!

---

## Step 2: Understand the System

You have access to the **complete SISO App Factory**:

### What You Have Available:

**📦 Component Library** (1,983+ components):
- Location: `../packages/` (if in same repo) OR will be referenced
- 851 components in siso-app-factory packages
- 1,132 components in SISO-UI-Library (fallback)
- Organized by: primitives, patterns, domain-specific
- **Your goal**: Use 85%+ from library, only 10-15% custom

**🔧 Tools Available**:
- `tools/ai-search.js` - Search components by natural language
- `tools/generate-metadata.js` - Generate component metadata
- `docs/ai-catalog.json` - 650 components indexed with metadata

**📚 Integration Guides**:
- `integrations/SUPABASE-INTEGRATION-GUIDE.md` (18KB) - Database, RLS, Edge Functions
- `integrations/CLERK-INTEGRATION-GUIDE.md` (16KB) - Auth, JWT, webhooks
- `integrations/CONFIG-DRIVEN-THEMING-GUIDE.md` (18KB) - Multi-tenant theming
- `integrations/SISO-APP-FACTORY-COMPONENTS.md` - Component library guide

**🧠 Context Documents**:
- `context/UNIVERSAL-PRD-FRAMEWORK-VISION.md` - The vision
- `context/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` - Best practices for AI execution
- `context/AI-FRAMEWORK-RESEARCH-FINDINGS-PART1.md` - Planning best practices
- `context/AI-FRAMEWORK-RESEARCH-FINDINGS-PART2.md` - Reasoning patterns

**📝 Templates for All Phases**:
- `templates/01-research-phase.md` through `templates/07-build-plan.md`

**🤖 AI Prompts**:
- `prompts/industry-research-prompt.md` through `prompts/build-planning-prompt.md`

---

## Step 3: Execute the 9 Planning Phases

**READ**: `MASTER-SETUP-PROMPT.md` for complete instructions.

**Phases** (complete each fully before moving to next):

1. **Industry & Market Research** (Day 1-2)
   - Use: WebSearch, WebFetch, mcp__exa__deep_researcher_start
   - Output: `docs/01-research/research-summary.md`
   - Validation: 10+ sources, market size quantified

2. **Competitor Analysis** (Day 2-3)
   - Audit 10-15 competitor sites
   - Extract 50+ features
   - Output: `docs/03-features/feature-matrix.md`

3. **Feature Planning** (Day 3-4)
   - Consolidate features, prioritize by evidence
   - Define MVP (20-30 features)
   - Output: `docs/03-features/features.md`

4. **Architecture Design** (Day 4-5)
   - Define 10-20 domains
   - Select tech stack (defaults: Next.js 15, Supabase, Clerk)
   - Output: `docs/05-technical/architecture.md`

5. **Component Planning** (Day 5-6)
   - **CRITICAL**: Search component library FIRST
   - Map components from library (85%+ target)
   - Create `siso-site-config.yaml`
   - Output: `docs/05-technical/component-catalog.md`

6. **Domain Operations** (Day 6-7)
   - Use BMAD methodology
   - Define CRUD + business operations
   - Output: `docs/00-methods/bmad/domain-flows/*.md`

7. **Database Schema** (Day 7-8)
   - Design 20-50 tables
   - **Use SQL DDL + semantic comments** (research finding!)
   - Include RLS policies for multi-tenant
   - Output: `docs/05-technical/schema-spec.md`

8. **Build Plan** (Day 8-9)
   - **Use detailed task format** (research finding!)
   - 7 implementation phases, 100+ tasks
   - Include validation criteria per task
   - Output: `docs/08-build-plan/master-checklist.md`

9. **PDR Creation** (Day 9-10)
   - Consolidate everything
   - Output: `docs/06-pdr/PDR.md`

---

## Step 4: Quality Validation

After completing all 9 phases, verify:

**Planning Completeness** (from `meta.yaml`):
- [ ] Phase 1: 10+ sources cited
- [ ] Phase 2: 10-15 competitors audited, 50+ features
- [ ] Phase 3: 50+ features documented, MVP defined
- [ ] Phase 4: 10-20 domains defined
- [ ] Phase 5: 85%+ components from library
- [ ] Phase 7: 20+ tables, ERD created
- [ ] Phase 8: 100+ tasks, 12-16 week timeline
- [ ] Phase 9: Complete PDR (10+ pages)

**Self-Verification Protocol** (from research):
- [ ] All required sections present
- [ ] No [TBD] or [TODO] in critical sections
- [ ] All statistics have sources and dates
- [ ] No contradictions between phases
- [ ] Terminology used consistently

---

## Step 5: Generate Build Plan

After planning complete, **generate the executable build plan**:

**Read**:
- `context/CODEX-IMPLEMENTATION-DESIGN.md` - buildplan.yaml schema

**Create**:
- `buildplan.yaml` - Machine-executable build specification

**Using**:
- Detailed task format (steps + references + validation)
- Component references (path + props + examples)
- SQL DDL with semantic comments
- Validation gates between phases

---

## 🎯 Success Criteria

You've successfully completed planning when:

✅ All 9 phases complete with deliverables
✅ All validation rules from meta.yaml satisfied
✅ Self-verification protocol passes 100%
✅ buildplan.yaml generated and valid
✅ siso-site-config.yaml created
✅ Ready for AI coder to execute build

---

## 🚀 What Happens Next (After Planning)

**Implementation Phase** (NOT your job as planner, but good to know):

An AI Coder (Codex CLI, Claude Code, Cursor, etc.) will:
1. Read all your planning docs
2. Read `buildplan.yaml`
3. Execute build: scaffold → database → backend → frontend → integrate → test → deploy
4. Produce working application
5. Human reviews and customizes
6. Deploy for clients

**Your job**: Create the BEST planning docs possible so AI coder succeeds!

---

## 🆘 If You Get Stuck

### Resources:

**See Examples**:
- Previous restaurant project planning (if exists in docs/)
- Templates have examples and instructions

**Check Validation**:
- Review `meta.yaml` for requirements
- Use templates as checklists

**Ask Clarifying Questions**:
- If user requirements unclear → ASK before proceeding
- Better to clarify than make assumptions

**Use Available Tools**:
- WebSearch for industry research
- WebFetch for competitor analysis
- AI search for finding components in library
- Mermaid for diagrams

---

## 📚 Key Documents to Reference

**Must Read**:
1. `MASTER-SETUP-PROMPT.md` - Complete 9-phase guide
2. `meta.yaml` - Validation rules and stack defaults
3. `context/UNIVERSAL-PRD-FRAMEWORK-VISION.md` - The vision

**Reference As Needed**:
4. `context/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` - Best practices for AI execution
5. `integrations/*.md` - Supabase, Clerk, Theming guides
6. `templates/*.md` - Phase-specific templates
7. `prompts/*.md` - AI prompts for each phase

---

## 🎬 Ready to Start?

**Confirm with user**:
> "I understand you want to plan a [INDUSTRY] application. I'll guide you through the 9-phase SISO App Factory planning process to create comprehensive documentation. This will take about 6-8 hours of AI work (or 10 days human time).
>
> Before I begin, let me ask a few questions to understand your requirements..."

**Then**: Execute phases 1-9 following MASTER-SETUP-PROMPT.md

**Remember**:
- ✅ Be systematic (complete each phase fully)
- ✅ Use tools (WebSearch, component search, Mermaid)
- ✅ Document thoroughly (more detail now = less confusion later)
- ✅ Ask questions (clarify ambiguities early)
- ✅ Follow research findings (detailed tasks, SQL+comments, component examples)
- ✅ Self-verify (check against validation rules)

---

**Good luck! You're about to create a world-class application plan!** 🎉

---

## 🔄 Version

**SISO App Factory Planning System**: v3.0
**Last Updated**: October 21, 2025
**Optimized With**: Deep Research findings on AI coder execution patterns
