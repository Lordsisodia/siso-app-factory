# Upgrades Sourced from the Great Library of SISO

This folder tracks every improvement we plan to pull in from **THE GREAT LIBRARY OF SISO** before touching the live planning system. Each section now spells out the concrete integration surface inside the `siso-app-factory` repo so we can review, prioritize, and only merge when it is safe.

> ⚠️ Nothing is copied yet. This is a staging checklist. Once an item is approved, we’ll clone the referenced source files, make the edits, and back-link the commit here.

---

## 1. Foundation Verification & QA Guardrails
- **Gap**: `STATUS.md` / `ROADMAP.md` mark milestones as “complete” without an auditable quality gate. Catalog imports don’t prove metadata health, doc coverage, or LangFuse trace quality, even though Phase‑1 of the Master Plan requires it.
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/MASTER-IMPLEMENTATION-PLAN.md` (Phase 1 steps 1‑10)
  - `APP FACTORY FOUNDATIONS/insights/actionable-frameworks/ai-development-production-framework.md` (Week 1–2 validation checklists)
- **Integration Surface (SISO App Factory)**:
  - `project-setup-system/validation/foundation-checklist.md` (new) referenced by `MASTER-SETUP-PROMPT.md`.
  - `tools/observability/scripts/langfuse-test.js` + new `scripts/validate-foundation.mjs` (wired into `package.json`).
  - `STATUS.md` and `ROADMAP.md` sections replaced with links to generated validation reports.
- **Integration Plan**:
  1. Port the Phase‑1 checklist, mapping each step to automated probes (component diff, docs lint, LangFuse trace score, catalog schema validation).
  2. Update the metadata generator to emit `reports/foundation.json` and fail CI if thresholds dip below target.
  3. Gate the "🟢 OPERATIONAL" badge on that report so Master Plan compliance is provable.
  4. ✅ *Progress*: `project-setup-system/validation/foundation-checklist.md`, `pnpm validate foundation`, and the Workspace checklist gate now exist—next up is wiring LangFuse probes + CI report.

## 2. Product Owner / Client Execution System
- **Gap**: The planning CLI outputs PRDs but never defines Product Owner handoffs, stakeholder comms, acceptance criteria bundles, or KPI dashboards (Master Plan steps 11‑20).
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/MASTER-IMPLEMENTATION-PLAN.md` (Phase 2)
  - `PDR/comprehensive-pdr-template.md` + `PDR/pdr-process-guide.md` (8-agent research, 70+ steps)
- **Integration Surface**:
  - `project-setup-system/client-ops/` (new) with PO handbook, comms cadences, KPI scorecards.
  - `MASTER-SETUP-PROMPT.md`, `templates/02-feature-planning.md`, and `templates/07-build-plan.md` to emit PO deliverables.
  - `tools/observability/scripts/langfuse-track-generation.js` to capture PO/KPI metadata per phase.
- **Integration Plan**:
  1. Import the 8-agent methodology and bake it into `.siso/planning/AI-START.md` as "Client Intelligence" steps.
  2. Extend Phase 9 outputs so `docs/06-pdr/` includes stakeholder briefs, KPI dashboards, change logs, and acceptance criteria tables.
  3. Wire LangFuse prompts so each phase log stores the KPI deltas the PO expects.
  4. ✅ *Progress*: Added `project-setup-system/client-ops/*`, checklist gates for stakeholder brief + KPI dashboard, `pnpm po:report`, and build/PDR templates referencing these deliverables.

## 3. Automation & MCP Orchestration
- **Gap**: Metadata/search scripts exist, but no MCP orchestration, GitHub/Slack automation, or decision-support loops (Master Plan Phase 3). Developers still juggle AI tools manually.
- **Source Assets**:
  - `BEST-AI-DEV-STACK/README.md` (Revolutionary Stack, tool tiers)
  - `MCP-WORKHOUSE/MCP-List/README.md` + `Advanced-Integrations/`
  - `TRILLION-DOLLAR-INTELLIGENCE/Production-Development-Systems/`
- **Integration Surface**:
  - `tools/mcp/` (new) containing generated MCP config templates.
  - `project-setup-system/SETUP-GUIDES/mcp-orchestration.md` and updates to `AI-START.md` so AI always boots the orchestrated stack.
  - `package.json` helper scripts (`npm run mcp:add:github`, `mcp:add:reddit`, etc.).
- **Integration Plan**:
  1. Vendor the Revolutionary Stack guide and expose a one-command bootstrap for Claude↔Codex↔Zen↔GitHub.
  2. Import Advanced Integration patterns to define GitHub/Slack/Supabase MCP clients under `tools/mcp/`.
  3. Instrument LangFuse logs to include MCP call metadata (model, tool, latency) for Master Plan Step 26.
  4. ✅ *Progress*: Added `tools/mcp/` templates, `SETUP-GUIDES/mcp-orchestration.md`, `pnpm mcp:init`, AI-START/Master checklist updates, and `.mcp` gate in the workspace checklist.
  5. ✅ *Telemetry progress*: `pnpm logs:append` now captures MCP servers + Cypress artifacts in `validation/logs/run-history.json` for auditing.

## 4. Intelligent Testing & Deployment Automation
- **Gap**: No CI pipelines, browser automation templates, or AI-driven QA/monitoring even though Phases 4‑5 require AI-generated tests, visual regression, and smart deployment.
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/insights/actionable-frameworks/ai-development-production-framework.md` (Phases 3–5)
  - `BROWSER-AUTOMATION/README.md` + `Tools-List/`, `Research/`, `Playground/`
- **Integration Surface**:
  - `tools/testing/playwright/` + `tools/testing/cypress/` referencing the research hub.
  - `.github/workflows/ai-verification.yml` (or equivalent) running AI-generated suites and posting results to LangFuse.
  - Planning templates (`templates/05-database-schema.md`, `07-build-plan.md`) updated with "Testing & Monitoring" blocks.
  - `STATUS.md` to track automation coverage %, flaky-test rate, and deployment health.
- **Integration Plan**:
  1. Import benchmark matrices to a "Testing Hub" doc that AI consults before selecting a framework.
  2. Auto-generate Playwright suites from Phase 4.5 outputs and wire them into CI along with LangFuse logging (<5% flake, 80% journey coverage targets).
  3. Use the AI Production Framework deployment steps to add Sentry/New Relic/Pingdom guidance into the planning templates.
  4. ✅ *Progress*: Added `tools/testing/cypress/` harness, `pnpm cypress:run` checklist gate, and `.github/workflows/ai-verification.yml` CI workflow to enforce Delivery quality.

## 5. Gamification & Behavioral Intelligence
- **Gap**: Packages only cover structural UI/feature kits. No reusable gamification loops despite client demand for retention mechanics.
- **Source Assets**:
  - `GAMIFICATION/README.md` + Research/Psychology/Implementation folders
- **Integration Surface**:
  - New `packages/gamification/` workspace mirroring `packages/tour-guides` with metadata per component/feature.
  - `docs/catalog/components-and-features.json` plus CLI search to expose XP loops, streak engines, loss-aversion systems.
  - `templates/03-features/features.md` and `AI-USAGE-GUIDE.md` expanded with behavior KPIs.
- **Integration Plan**:
  1. Implement the XP math, streak multipliers, and flow-state components, tagging them in the catalog for queries like "increase retention".
  2. Ship demo snippets + KPIs (>80% 30-day retention, >60% streak success) and reference them in `STATUS.md` once live.
  3. Provide AI instructions for picking the right behavioral module based on user psychology and desired outcome.
  4. ✅ *Progress*: Added `packages/gamification/` bundle, planning + checklist hooks, and telemetry expectations.
  4. ✅ *Progress*: Added `packages/gamification/` modules (XP Loop, Streak Engine, Quest Builder), planning template guidance, and checklist enforcement via `docs/03-features/gamification.md`.

## 6. System Intelligence Layers
- **Gap**: The `.siso` bootstrap lacks the six knowledge layers (client onboarding, testing intelligence, UI, ops, psychology) described in the AI System Knowledge Base, so AI decisions aren’t traceable to a layer.
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/AI-SYSTEM-KNOWLEDGE-BASE.md`
- **Integration Surface**:
  - `project-setup-system/intelligence/layer-*.md` (summary per layer).
  - `AI-START.md`, `MASTER-SETUP-PROMPT.md`, and `meta.yaml` updated with "Load Layer X" instructions per phase.
  - LangFuse tracking to log the layer referenced during each phase.
- **Integration Plan**:
  1. Summarize each layer into short, AI-digestible files and add load instructions at the top of `AI-START.md`.
  2. Tag every template (research, features, architecture, QA) with the relevant layer to maintain traceability.
  3. Require LangFuse logs to note which layer informed the output, satisfying Master Plan quality gates.

## 7. Revenue, Pricing & Business Playbooks
- **Gap**: Frameworks lack value-based pricing, performance retainers, and ROI scripts despite App Factory business research showing 7‑figure models.
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/AI-AGENT-BUSINESS-INSIGHTS-MASTER.md`
  - `APP FACTORY FOUNDATIONS/REVENUE-MODEL-STRATEGIES.md`
- **Integration Surface**:
  - `frameworks/commercial/` bundle with pricing ladders, ROI calculators, objection scripts.
  - `project-setup-system/templates/06-component-mapping.md` & PDR outputs referencing those pricing models.
  - `docs/FINAL-REPORT.md` + `frameworks/README.md` to cite revenue strategies per domain.
- **Integration Plan**:
  1. Import the pricing playbooks and topic clustering strategies to auto-generate good/better/best engagement tiers in planning outputs.
  2. Tie LangFuse cost data to ROI calculators so each plan can show cost vs. projected earnings.
  3. Provide sales-ready snippets for frameworks (multi-tenant, restaurant, tour) referencing the imported strategies.
  4. ✅ *Progress*: Added `frameworks/commercial/` playbooks, templates for revenue strategy/plan, and checklist requirements for revenue docs.

## 8. Psychological Trap & No-Code Reality Safeguards
- **Gap**: Planning docs don’t warn AI or humans about the "Triple Reality" traps (instant gratification bias, shiny objects) highlighted in Discord research, so teams can still fall into the 90% failure pattern.
- **Source Assets**:
  - `APP FACTORY FOUNDATIONS/insights/comprehensive-discord-insights.md`
- **Integration Surface**:
  - `project-setup-system/intelligence/psychology.md` summarizing the seven deadly traps.
  - Add "Reality Check" callouts to `templates/01-research-phase.md` and `02-feature-planning.md`.
  - Gamification + onboarding docs referencing loss-aversion and validation avoidance mitigations.
- **Integration Plan**:
  1. Insert trap checklists at the top of each planning phase so AI must confirm validation before building.
  2. Add a "Psych Risk" column to feature and roadmap templates to make trap mitigation explicit.
  3. ✅ *Progress*: Added `project-setup-system/intelligence/psychology.md`, templates/logs, and checklist requirements for `docs/notes/psychology-safeguards.md`.
  3. Update LangFuse prompts to log when a trap is detected/mitigated for audit purposes.

## 9. Token Efficiency & IDE Autonomy
- **Gap**: AI instructions still rely on manual code search. We’re missing the Token Saver MCP tooling (VS Code LSP + CDP) that cuts token usage 90‑99% and lets AI run browsers/tests autonomously.
- **Source Assets**:
  - `MCP-WORKHOUSE/token-saver-mcp/README.md` + `README_USAGE_GUIDE.md`
- **Integration Surface**:
  - `tools/mcp/token-saver/` scripts + docs for installing the VS Code gateway and standalone server.
  - `AI-USAGE-GUIDE.md` updates showing `smart_resume`, LSP lookups, and CDP testing workflows.
  - `package.json` helper script (`npm run tools:token-saver`) for quick bootstrap.
- **Integration Plan**:
  1. Vendor the setup instructions into `project-setup-system/SETUP-GUIDES/token-saver.md`.
  2. Teach the AI search CLI to call Token Saver endpoints when resolving component definitions instead of `rg`.
  3. Capture token savings + browser automation stats in LangFuse to demonstrate ROI (Master Plan Step 30).

## 10. Community Insights & Phase-Based Development Enhancements
- **Gap**: Phase orchestration relies solely on internal docs; we’re not leveraging the community-proven phase-based development and top finds (90% success rate) captured in the Gold Mine.
- **Source Assets**:
  - `Community-Insights-Gold-Mine/Top-Finds-Collection/`
  - `Community-Insights-Gold-Mine/Reddit/`
- **Integration Surface**:
  - `project-setup-system/context/phase-based-success.md` (new) summarizing community wins.
  - `frameworks/README.md` + templates citing community KPIs to justify process steps.
  - `docs/catalog/components-and-features.json` metadata flag noting which components/features have community validation.
- **Integration Plan**:
  1. Import the top finds and reference them throughout `AI-START.md` so each phase cites at least one community pattern.
  2. Add "Community Validation" badges to catalog entries and CLI search results.
  3. Reference these stats inside proposals to strengthen credibility.
  4. ✅ *Progress*: Added `project-setup-system/context/phase-based-success.md`, checklist requirement for `docs/01-research/community-insights.md`, and Master Prompt instructions.

---

### Integration Targets (Quick Reference)

| Upgrade | Integration Points |
| --- | --- |
| Foundation QA | `project-setup-system/validation/`, `tools/observability/scripts/langfuse-test.js`, new `scripts/validate-foundation.mjs`, `package.json` script, `STATUS.md`, `ROADMAP.md`, `reports/foundation.json` |
| Product Owner System | `project-setup-system/client-ops/`, `MASTER-SETUP-PROMPT.md`, templates (`02-feature`, `07-build-plan`), `langfuse-track-generation.js`, `.siso/planning/AI-START.md` |
| Automation & MCP | `tools/mcp/`, `project-setup-system/SETUP-GUIDES/mcp-orchestration.md`, `AI-START.md`, `package.json` MCP scripts, LangFuse logging |
| Testing & Deployment | `tools/testing/`, `.github/workflows/ai-verification.yml`, planning templates (Phase 4/5), `STATUS.md` automation metrics |
| Gamification | `packages/gamification/`, `docs/ai-catalog.json`, `AI-USAGE-GUIDE.md`, feature templates, `STATUS.md` retention KPIs |
| Intelligence Layers | `project-setup-system/intelligence/`, `AI-START.md`, `MASTER-SETUP-PROMPT.md`, `meta.yaml`, LangFuse layer logs |
| Revenue Playbooks | `frameworks/commercial/`, planning templates (`06-component-mapping`, `07-build-plan`), `docs/FINAL-REPORT.md`, `frameworks/README.md` |
| Psychology Safeguards | `project-setup-system/intelligence/psychology.md`, Phase 1/2 templates, LangFuse trap tracking |
| Token Efficiency (Token Saver) | `tools/mcp/token-saver/`, `project-setup-system/SETUP-GUIDES/token-saver.md`, `AI-USAGE-GUIDE.md`, `package.json` helper script, LangFuse savings |
| Community Insights | `project-setup-system/context/phase-based-success.md`, catalog badges (`docs/ai-catalog.json`), `frameworks/README.md`, proposal templates |

### Implementation Order (Suggestion)
1. **Foundation & PO systems** – unlocks trustworthy STATUS claims and client onboarding.
2. **Automation/MCP + Testing** – multiplies developer throughput while tracking quality and performance.
3. **Gamification + Intelligence Layers + Psychology Safeguards** – differentiates product experience and prevents failure traps.
4. **Revenue + Community Playbooks** – ensures every exported framework earns App Factory-level margins and cites external validation.
5. **Token Efficiency** – once orchestration patterns are approved, roll Token Saver MCP into the toolchain to cut cost and unlock autonomous browser verification.

When we’re ready, we’ll clone the exact files listed above, adapt them, and update this log with completed tasks and commit references.
