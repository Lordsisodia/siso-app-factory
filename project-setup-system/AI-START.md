# 🚀 SISO App Factory - AI Planning System

> **New?** Start with `project-setup-system/START-HERE.md` inside your copied workspace to learn the full pipeline.

**AI, READ THIS FIRST!**

You are about to help plan a complete application from scratch using the **SISO App Factory Universal PRD Framework**.

---

## 📋 Before You Begin

### ⚠️ Treat This Repository as a Template
Do **not** plan inside `siso-app-factory/project-setup-system`. Always duplicate the planning system into a new project folder before editing anything.

### Step 0: Prepare Your Workspace (Copy Template First)
1. **Create a project root outside this repo** (for example `~/DEV/projects/<project-slug>`).
2. **Copy the planning template + helpers into that root** so each client project is isolated (include platform + experiences + templates for reference):
   ```bash
   rsync -a --exclude node_modules --exclude .git project-setup-system/ ~/DEV/projects/<project-slug>/project-setup-system/
   rsync -a --exclude node_modules --exclude .git packages/platform/ ~/DEV/projects/<project-slug>/packages/platform/
   rsync -a --exclude node_modules --exclude .git packages/experiences/ ~/DEV/projects/<project-slug>/packages/experiences/
   rsync -a --exclude node_modules --exclude .git templates/ ~/DEV/projects/<project-slug>/templates/
   rsync -a tools/ ~/DEV/projects/<project-slug>/tools/
   ```
3. **Run the setup script from the new root** (still outside the template) to scaffold folders **and download the BMAD Method** automatically:
   ```bash
   cd ~/DEV/projects/<project-slug>
   ./project-setup-system/setup-new-project.sh "<Project Name>" "<Industry>"
   ```
   Confirm `docs/00-methods/bmad/vendor/BMAD-METHOD/` now exists. If not, rerun the script or manually unzip the BMAD package into that path.
4. **Install & configure DeepEval for validation loops** inside the new project:
   ```bash
   cd ~/DEV/projects/<project-slug>
   python -m venv .venv && source .venv/bin/activate
   pip install deepeval
   export DEEPEVAL_API_KEY=<your-key>
   ```
   - Keep configs/results in `project-setup-system/validation/deepeval/`.
   - After each planning phase, run `deepeval test` (or `deepeval run baseline`) to log reasoning scores.
5. **Collect environment credentials up front** (ask the user for these so implementation agents don't stall later):
   - **Supabase**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and **Access Token** for the Supabase MCP if database work is required.
   - **Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, webhook secret(s), and any organization IDs.
   - Store them in the new project's `.env.local` (or `.env`) and document them in `workspace-notes/credentials.md` so future agents know they exist.
   - If Supabase MCP integration is needed, run the MCP login/config commands now while credentials are handy.
6. **Track provenance** (note which template commit you cloned) and proceed with all planning steps **inside the duplicated copy**, not this repo.
7. **Initialize MCP configs** so research + automation agents have GitHub/Reddit/Token Saver access:
   ```bash
   pnpm mcp:init --workspace ~/DEV/projects/<project-slug>
   ```
   - Fill `.mcp/config/*.json` with tokens (never commit secrets).
   - Log credential storage in `workspace-notes/credentials.md`.
   - Note MCP availability inside `docs/01-research/research-plan.md` and `project-status.json` (`mcp` block).

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
- Location: `../packages/platform/ui` (primitives/patterns) + `../packages/experiences` (Blog, Reviews, Checkout, etc.)
- 851 components in `@siso/ui` + growing set of experience packs
- 1,132 components in SISO-UI-Library (fallback)
- Organized by: primitives, patterns, domain-specific experiences
- **Your goal**: Use 85%+ from library, only 10-15% custom

**🔧 Tools Available**:
- `tools/core/ai-search.cjs` - Search components/experiences by natural language
- `tools/core/generate-metadata.cjs` - Generate component/experience/template metadata
- `docs/catalog/components-and-features.json` - components/features/experiences indexed with metadata
- `deepeval` CLI - Run reasoning/test evaluations after each planning phase
- `pnpm update:build-checklists` - Sync the Master Build Plan’s dynamic checklists with the latest buildplan data
- `pnpm security:scan` / `pnpm prompt:audit` - Security + prompt guardrail audits used during Assurance/Drift phases

**📚 Integration & Architecture Guides**:
- `integrations/SUPABASE-INTEGRATION-GUIDE.md` (18KB) - Database, RLS, Edge Functions
- `integrations/CLERK-INTEGRATION-GUIDE.md` (16KB) - Auth, JWT, webhooks
- `integrations/CONFIG-DRIVEN-THEMING-GUIDE.md` (18KB) - Multi-tenant theming
- `integrations/SISO-APP-FACTORY-COMPONENTS.md` - Component library guide
- `architecture/TEMPLATE-ARCHITECTURE.md` + `architecture/DOMAIN-DRIVEN-LAYOUT.md` - Canonical folder + domain/page structures (copy these when generating code)

**🧠 Context Documents**:
- `context/00-vision/UNIVERSAL-PRD-FRAMEWORK-VISION.md` - The vision
- `context/10-research/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` - Best practices for AI execution
- `context/10-research/AI-FRAMEWORK-RESEARCH-FINDINGS.md` - Planning + reasoning patterns

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

After each macro-phase (Discovery, Definition, Delivery):
- Run your DeepEval suite (store outputs under `validation/deepeval/`).
- Open `PRD-SETUP-CHECKLIST.md` and ensure every box is ticked before progressing. If something is missing, loop back and fix it immediately.

---

## Step 5: Generate Build Plan

After planning complete, **generate the executable build plan**:

**Read**:
- `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md` - buildplan.yaml schema
- `PRD-SETUP-CHECKLIST.md` - Gate-by-gate verification list (copy this file into each project root alongside the planning system)

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
3. `context/00-vision/UNIVERSAL-PRD-FRAMEWORK-VISION.md` - The vision
4. `architecture/TEMPLATE-ARCHITECTURE.md` & `architecture/DOMAIN-DRIVEN-LAYOUT.md` - Copy these structures verbatim when scaffolding `src/`

**Reference As Needed**:
4. `context/10-research/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` - Best practices for AI execution
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
