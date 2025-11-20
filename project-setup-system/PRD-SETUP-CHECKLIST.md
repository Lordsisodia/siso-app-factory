# PRD Setup Checklist ✅

> Copy this file into every new project root. Mark each item as you work through the planning pipeline. Do not hand off to an AI coder until **all boxes are checked** and validation artifacts are linked.
>
> **Automation note**: Inline comments like `<!-- task:jtbd-gate command:pnpm setup:jtbd -->` show the CLI/Codex hook expected when you satisfy that checkbox so humans and autonomous agents follow the identical workflow.
>
> **Workspace reminder**: Every path in this checklist refers to the duplicated **project workspace** (e.g., `~/DEV/projects/<slug>/docs/...`). Never edit files inside `siso-app-factory/` directly—copy the planning system first, then run all commands from the new project root.

## 0. Workspace & Tooling
- [ ] Template cloned outside `siso-app-factory` (document commit/hash).
  - Run `pnpm workspace:check` from the copied project root to confirm.
  - Log provenance inside `workspace-notes/provenance.md` with repo hash + copy date.
- [ ] `project-setup-system/`, `packages/`, and `tools/` copied to the new project root.
  - Follow rsync commands in `AI-START.md:14`; verify with `ls` output pasted into `workspace-notes/setup.md`.
- [ ] `./project-setup-system/setup-new-project.sh` executed with correct project name + industry.
  - Output should scaffold `/docs`, `/validation`, and download BMAD.
- [ ] BMAD Method present at `docs/00-methods/bmad/vendor/BMAD-METHOD/`.
  - Attach screenshot or `tree` snippet in `workspace-notes/setup.md`.
- [ ] DeepEval installed + configured (`DEEPEVAL_API_KEY` set, virtualenv active).
  - Document interpreter path + API key location in `validation/deepeval/README.md`.
- [ ] `validation/deepeval/` folder contains baseline config (tests defined before Phase 1 ends).
  - Copy starter configs from `project-setup-system/validation/` and note test names.
- [ ] Supabase credentials captured (`SUPABASE_URL`, anon key, service role key, access token) and saved to `.env.local` + credential notes.
  - Reference `integrations/SUPABASE-INTEGRATION-GUIDE.md`; store context in `workspace-notes/credentials.md`.
- [ ] Clerk credentials captured (publishable key, secret key, webhooks/org IDs) and saved to `.env.local` + credential notes.
  - Reference `integrations/CLERK-INTEGRATION-GUIDE.md`.
- [ ] `architecture/TEMPLATE-ARCHITECTURE.md` + `architecture/DOMAIN-DRIVEN-LAYOUT.md` reviewed; domain/page scaffolds created accordingly.
  - Mention template version at top of `docs/05-technical/architecture.md`.
- [ ] `context/UI-BEST-PRACTICES/README.md` reviewed; relevant heuristics noted for Phase 5.
  - Summaries go in `docs/04-ui-ux/ui-best-practices.md` or equivalent.
- [ ] `docs/notes/prompt-version-log.md` created from template and seeded with initial prompt/design-token versions (update whenever prompts/tokens change).
- [ ] Security & privacy requirements captured (prompt-injection mitigation, PII handling, compliance notes) and referenced in PRD.
- [ ] Observability plan drafted (events, metrics, Langfuse traces, analytics) and added to `docs/05-technical/observability.md`.
- [ ] Human sign-off checkpoints defined (architecture approval, QA gate, deployment approval) with owner names in `project-config.yaml`.
- [ ] `project-config.yaml` populated with `jtbd`, `success_metrics`, `non_goals`, `target_regions`, and `primary_personas` (Codex halts Phase 1 if missing). <!-- task:jtbd-gate command:pnpm setup:jtbd -->
  - Use `pnpm setup:jtbd --jtbd "When..." --metric "..."` to inject starter block.
- [ ] `project-status.json` initialized (`phase`, `attempt`, `score`, `last_artifact`) so autonomous agents can resume interrupted runs. <!-- task:status-init command:pnpm setup:status -->
  - Default should be `{ "phase": "not-started" }`; update after every phase.
- [ ] Foundation QA verification run before Discovery (`validation/foundation-checklist.md` + `pnpm validate foundation`).
  - Evidence: `validation/logs/foundation-phase.json` saved in the project workspace.
- [ ] MCP configs bootstrapped (`pnpm mcp:init`) and `.mcp/config/*.json` populated with placeholders. <!-- task:mcp-init command:pnpm mcp:init -->
  - Ensure `.mcp/README.md` + entries in `workspace-notes/credentials.md` describe available servers.
- [ ] Foundation QA verification run before Discovery (`validation/foundation-checklist.md` + `pnpm validate foundation`).
  - Evidence: `validation/logs/foundation-phase.json` saved in the project workspace.

## 1. Discovery (Phases 1-3)
- [ ] `validation/phase-01-research-checklist.md` scored ≥80%.
  - Inputs: `templates/01-research-phase.md`, `prompts/multi-agent/01-researcher-agent.md`.
  - Output: `docs/01-research/research-plan.md` + `research-summary.md` with citations.
- [ ] `validation/phase-02-competitor-checklist.md` scored ≥80%.
  - Output: `docs/01-research/competitor-notes/`, `docs/03-features/feature-matrix.md`.
- [ ] `validation/phase-03-features-checklist.md` scored ≥80%.
  - Output: `docs/03-features/features.md`, `user-journeys.md`, `feature-priority-matrix.md`.
- [ ] DeepEval run logged (include link/hash in `validation/deepeval/`).
  - Run `deepeval test` with scenario names `phase-01`, `phase-02`, `phase-03`.
- [ ] Open questions (if any) captured for Definition phase.
  - Use `docs/notes/open-questions.md` (template in `templates/01-research-phase.md`).
- [ ] Community insights captured (`docs/01-research/community-insights.md`) referencing phase-based success research.
- [ ] Evidence ingestion pipeline executed before Phase 1 verification (`docs/03-features/feedback.md` refreshed via connectors + Codex research agent). <!-- task:discovery-feedback command:pnpm discovery:refresh -->
  - Append entry showing source (CRM, support, analytics) + link to raw data in `docs/03-features/evidence/`.
- [ ] Acceptance criteria auto-enriched after Phase 3 (`docs/03-features/features.md` updated with Given/When/Then AC via `pnpm phase3:ac`). <!-- task:phase3-ac command:pnpm phase3:ac -->
  - Verify every feature’s AC block contains `Given/When/Then` bullets + measurable targets.

## 2. Definition (Phases 4-7)
- [ ] `validation/phase-04-architecture-checklist.md` ≥80%.
  - Use `templates/03-architecture-design.md`, `prompts/multi-agent/03-architect-agent.md`.
- [ ] `validation/phase-045-ui-design-checklist.md` ≥80%.
  - Outputs: `docs/04-ui-ux/user-flows.md`, `wireframes/`, accessibility notes.
- [ ] `validation/phase-05-components-checklist.md` ≥80%.
  - Include gamification components (if used) mapped via `docs/03-features/gamification.md`.
  - Ensure `docs/05-technical/component-catalog.md` hits ≥85% reuse; cite component IDs.
- [ ] `validation/phase-06-domain-ops-checklist.md` ≥80%.
  - Document CRUD + workflows in `docs/00-methods/bmad/domain-flows/`.
  - Note behavioral hooks and KPIs from `docs/03-features/gamification.md`.
- [ ] `validation/phase-07-database-checklist.md` ≥80%.
  - `docs/05-technical/schema-spec.md` must include SQL DDL + RLS notes.
- [ ] Component reuse ≥85% documented in `docs/05-technical/component-catalog.md`.
  - Include columns: `feature_id`, `component_id`, `library_source`.
- [ ] All domains/pages in `src/` follow the template structure (docs, desktop/mobile, components, hooks, utils, tests).
  - Cross-check `architecture/DOMAIN-DRIVEN-LAYOUT.md` vs. actual directories.
- [ ] DeepEval run captured for architecture/domain reasoning.
- [ ] Architecture sharded into PRD epics (`docs/06-pdr/epics/<slug>.md`) + metadata YAML via `pnpm prd:shard` before component mapping begins. <!-- task:prd-shard command:pnpm prd:shard -->
  - Each epic file includes frontmatter with `id`, `title`, `source`, `updated`.
- [ ] Interface/contract bundle exported from `architecture.md` (`docs/05-technical/interfaces/*.json` or OpenAPI) for Domain + QA agents. <!-- task:arch-compile command:pnpm arch:compile -->
  - Domain engineer references IDs when creating flows; QA uses same IDs for test plans.
- [ ] Validation-as-code suite executed for phases 4-7 (`pnpm validate definition`) with JSON outputs written to `validation/logs/definition-phase.json`. <!-- task:definition-validate command:pnpm validate definition -->
  - Score ≥0.8 required; attach JSON to repo.

## 3. Delivery (Phases 8-9)
- [ ] Cypress test suite configured in the project workspace (`tools/testing/cypress/`) and passing (logs under `validation/logs/cypress/`). <!-- task:cypress-run command:pnpm cypress:run -->
- [ ] AI Verification CI workflow (`.github/workflows/ai-verification.yml`) green for this branch.
- [ ] `validation/phase-08-buildplan-checklist.md` ≥80%.
  - Deliverables: `docs/08-build-plan/master-checklist.md`, `buildplan.yaml` (phases, owners, dependencies).
- [ ] `validation/phase-09-pdr-checklist.md` ≥80%.
  - Use `templates/09-pdr-template.md`; ensure every requirement references research.
- [ ] Build tasks ≥100 with 12-16 week timeline confirmed.
  - Provide phase summary table (Weeks, Owner, Dependency) inside build plan.
- [ ] PDR spans ≥10 pages and references every requirement ID.
  - Cross-link requirement IDs to `buildplan.yaml` tasks.
- [ ] DeepEval run focused on build-plan reasoning/test coverage.
  - Store report in `validation/deepeval/phase-08-09.json`.
- [ ] Spec-enforcement command executed (`pnpm spec:verify`) so every build task links to requirement + AC IDs before implementation agents start. <!-- task:spec-verify command:pnpm spec:verify -->
- [ ] Automated PRD diff summary appended to `docs/06-pdr/changelog.md` via `pnpm prd:diff`. <!-- task:prd-diff command:pnpm prd:diff -->
  - Changelog entry includes new hash + section list.
- [ ] Phase 8-9 validation-as-code scripts run with outputs stored in `validation/logs/phase-08.json` + `phase-09.json`. <!-- task:delivery-validate command:pnpm validate delivery -->
- [ ] Product Owner KPI dashboard generated/updated via `pnpm po:report` (writes to `docs/06-pdr/po-dashboard.md`). <!-- task:po-report command:pnpm po:report -->
- [ ] Stakeholder brief + comms log reviewed with client before handoff (`docs/06-pdr/stakeholder-brief.md`, `docs/client-ops/comms-log.md`).

## 4. Required Artifacts Present
- [ ] `docs/03-features/revenue-strategy.md` (pricing tiers + upsells from frameworks/commercial)
- [ ] `docs/06-pdr/revenue-plan.md`
- [ ] `docs/notes/psychology-safeguards.md` (risks + mitigations)
- [ ] `docs/01-research/community-insights.md`
- [ ] `docs/01-research/research-summary.md`
- [ ] `docs/03-features/features.md` + `feature-matrix.md`
- [ ] `docs/05-technical/architecture.md`
- [ ] `docs/05-technical/component-catalog.md`
- [ ] `docs/05-technical/schema-spec.md` + ERD
- [ ] `docs/00-methods/bmad/domain-flows/`
- [ ] `docs/08-build-plan/master-checklist.md`
- [ ] `docs/06-pdr/PDR.md`
- [ ] `siso-site-config.yaml`
- [ ] `buildplan.yaml` (validated against `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md`)
- [ ] `docs/03-features/feedback.md` snapshot + ingestion notes committed.
- [ ] `docs/03-features/gamification.md` (behavior plan referencing packages/gamification components).
- [ ] `docs/06-pdr/epics/` shard set + metadata file present.
- [ ] `docs/06-pdr/changelog.md` updated with latest PRD diffs.
- [ ] `validation/logs/` directory populated with JSON traces for every phase + aggregated telemetry bundle (`definition-phase.json`, `delivery-phase.json`, `run-history.json`).
- [ ] `docs/06-pdr/stakeholder-brief.md` and `docs/06-pdr/po-dashboard.md` committed.
- [ ] `docs/client-ops/comms-log.md` + `docs/client-ops/risk-register.md` capture communication & risk decisions.
- [ ] `docs/03-features/acceptance-bundle.md` exported for QA/client review.
- [ ] `docs/03-features/gamification.md` references `packages/gamification/` modules with KPIs.

## 5. Final Handoff Gate
- [ ] All DeepEval reports committed/attached for auditing.
  - Reference them inside `docs/06-pdr/PDR.md` Appendix.
- [ ] `PRD-SETUP-CHECKLIST.md` saved with checkmarks + timestamp + agent signature.
  - Store a signed copy under `docs/06-pdr/appendix/checklist-signed.md`.
- [ ] Clear instructions left for the implementation agent (link to buildplan, docs, and any caveats).
  - Preferred doc: `docs/08-build-plan/handoff-notes.md`.
- [ ] Latest telemetry + verification metadata appended to `validation/logs/run-history.json` (JTBD, metrics, scores, attempts). <!-- task:telemetry-log command:pnpm logs:append -->
  - Include `--ci` and `--tokens <value>` flags so CI + token-saver telemetry is recorded.
- [ ] `project-status.json` updated to `phase: complete` for downstream Codex automation. <!-- task:status-complete command:pnpm status:complete -->
  - Fields: `phase`, `completed_at`, `last_artifact`.

## 6. Great Library Integration Targets
- [ ] **Foundation QA Guardrails** – `project-setup-system/validation/foundation-checklist.md` imported from `upgrades-from-siso-library/APP FACTORY FOUNDATIONS`, referenced by `MASTER-SETUP-PROMPT.md`, and executed via `pnpm validate foundation` before Discovery starts.
- [ ] **Product Owner / Client Execution System** – `project-setup-system/client-ops/` folder added with PO handbook, comms cadence, KPI dashboards; Phase 9 outputs include stakeholder brief + KPI report per Great Library guidance.
- [ ] **Automation & MCP Orchestration** – `tools/mcp/` templates + `SETUP-GUIDES/mcp-orchestration.md` exist, and `AI-START.md` instructs agents to run the orchestrator bootstrap before planning.
- [ ] **Testing & Deployment Automation** – AI-generated Playwright/Cypress suites and CI workflow (`.github/workflows/ai-verification.yml`) wired into build plan templates with automation coverage metrics captured in `STATUS.md`.
- [ ] **Gamification & Retention Systems** – Gamification frameworks from Great Library referenced inside `templates/02-feature-planning.md` + `templates/07-build-plan.md`, and metrics logged in `STATUS.md`.
- [ ] **Intelligence Layers** – `project-setup-system/intelligence/` folder (signal layers, LangFuse mappings) imported; `AI-START.md` + `MASTER-SETUP-PROMPT.md` enforce multi-layer reasoning.
- [ ] **Revenue Playbooks** – `frameworks/commercial/` (pricing, upsell, bundles) linked inside PDR + build plan so every feature references a monetization path.
- [ ] **Psychology Safeguards** – Bias/failure mode traps from Great Library documented in `project-setup-system/intelligence/psychology.md` and referenced during Discovery + Definition validation.
- [ ] **Token Efficiency (Token Saver)** – MCP token saver config + CLI helpers documented in `project-setup-system/SETUP-GUIDES/token-saver.md`; AI search CLI uses token saver endpoints.
- [ ] **Community Insights** – `project-setup-system/context/phase-based-success.md` summarizes Gold Mine findings, catalog badges mark community-validated components, and proposals cite community KPIs.

Only after this checklist is complete may you alert the AI coder that planning is finished.
