# Master Build Plan (BMAD Execution Blueprint)

Use this checklist once the PRD + architecture are locked. It mirrors the BMAD phases (Planning → Solutioning → Implementation → Deployment/Assurance) and keeps prompts flexible while enforcing required gates.

---

## Phase 1 – Planning Refresh (BMAD Planning)
1. **Re-sync Specs**
   - [ ] Re-read PRD + architecture docs; list deltas since last planning session.
   - [ ] Update `docs/` with change log entries if scope moved.
2. **Blueprint Verification**
   - [ ] Re-open `buildplan.yaml`; confirm tasks and dependencies still align with latest PRD.
   - [ ] Note any adjustments needed before coding.
3. **Architecture + UI References**
   - [ ] Read `architecture/TEMPLATE-ARCHITECTURE.md` and `architecture/DOMAIN-DRIVEN-LAYOUT.md`.
   - [ ] Read `context/UI-BEST-PRACTICES/README.md` (and subfolders) to ground upcoming UI work.
   - [ ] Review security/privacy constraints (prompt-injection mitigation, PII handling) noted in PRD.
   - [ ] Review observability requirements (events, Langfuse traces, metrics) so telemetry stays consistent.
4. **Checklist & Credentials**
   - [ ] Verify `PRD-SETUP-CHECKLIST.md` is fully checked.
   - [ ] Confirm `.env` (Supabase, Clerk, Stripe, etc.) and observability keys are present.
5. **Safety & Sign-off Planning**
   - [ ] Confirm human review checkpoints (architecture approval, QA gate, deployment approval) and add entries to the “Human Sign-off Checklist” below.
6. **Architecture Touch-Up**
   - [ ] If requirements changed, refresh domain map/ADR before continuing (optional but recommended each sprint).
7. **Change Log Tracking**
   - [ ] For every delta discovered above, append a checkbox entry under “Planning Change Log” (see bottom) so it’s clear what still needs action.

**Prompt snippet:**
```
Step 1: Summarize changes since last planning pass.
Step 2: Confirm buildplan + architecture still hold.
Step 3: Record that you re-read architecture + UI best practice docs before coding.
```

---

## Phase 2 – Solutioning & Decomposition (BMAD Solutioning)
1. **Scaffold Structure**
   - [ ] For each domain/page in buildplan, run `pnpm scaffold:domain <domain> <page>` so folders match the template.
   - [ ] Append a checklist entry under “Active Build Checklist” (at bottom of this file or tracking doc) listing every domain + page; you’ll tick these as each slice completes.
   - [ ] Run `pnpm update:build-checklists` to sync checklist sections automatically. <!-- task:update-checklists command:pnpm update:build-checklists -->
2. **DB + Policies**
   - [ ] Generate/refresh SQL migrations + RLS scripts; stage them under `supabase/`.
3. **Design Tokens & UI Grounding**
   - [ ] Extract relevant patterns from `context/UI-BEST-PRACTICES` and copy tokens/guidelines into `src/config/design-tokens` (or equivalent).
4. **Story Sharding**
   - [ ] Split buildplan tasks into stories: each story must include description, files/domains affected, acceptance criteria, required tests, and references (PRD section, architecture diagram, UI doc snippet).
   - [ ] Link story IDs back to buildplan entries.
   - [ ] For each story created, add a checkbox under the “Story Tracker” section of this plan so progress is visible in real time.
5. **Plan Validation**
   - [ ] Review story backlog with Architect/PM agents; confirm priority order (core infra first, then vertical slices).
6. **Safety & Observability Hooks**
   - [ ] Add security/privacy to stories where needed (prompt injection guard, PII handling, etc.).
   - [ ] Add observability requirements (events, traces, metrics) to stories that touch those areas.

**Prompt snippet:**
```
Shard buildplan.yaml into concrete stories. For each story, include:
1) Story ID + description
2) Domain + folder path to edit (per scaffold)
3) Acceptance criteria + tests
4) References (PRD section, architecture doc, UI best practice snippet)
```

---

## Phase 3 – Implementation Loop (BMAD Implementation)
For **each story**:
1. **Prep**
   - [ ] Read story, linked PRD/architecture sections, and relevant UI best practice note.
   - [ ] Note domain/page paths (from scaffold) to touch.
2. **Code**
   - [ ] Implement UI + backend + tests inside correct domain/page folders (desktop & mobile variants as needed).
   - [ ] Reuse components (target ≥85% library use). Log new components + why custom.
3. **Docs**
   - [ ] Update page docs (`ux-notes.md`) and component docs (`Hero.docs.md`, etc.) with props/decisions.
   - [ ] Document any security/privacy handling or observability instrumentation added for this story (e.g., analytics events, Langfuse trace IDs) and, if prompts/tokens changed, run `pnpm prompt:log <artifact> <version> <note>` to append `docs/notes/prompt-version-log.md`. <!-- task:prompt-log command:pnpm prompt:log -->
4. **Validation**
   - [ ] Run unit/integration tests listed in story.
   - [ ] Run DeepEval scenario tied to story; upload Langfuse trace.
   - [ ] Record each validation step under the story’s dynamic “Tests & QA” sub-checklist.
5. **Commit & Tracking**
   - [ ] Commit with `feat(<domain>): story summary (buildplan-ID)`.
   - [ ] Mark story complete in tracking tool.
   - [ ] Add checkboxes for “Docs updated” (page + component) under the story’s entry; tick once documentation is refreshed.

Across the sprint:
- [ ] Track actual component reuse % (per story or aggregate).
- [ ] Apply DB migrations locally + to Supabase after review.
- [ ] Configure feature flags referenced in buildplan.

**Prompt snippet:**
```
Implement STORY-ID inside the scaffolded domain/page folders. Cite reused components, update docs, run tests + DeepEval <suite>. Provide commit hash + pass/fail for each validation.
```

---

## Phase 4 – Assurance & Deployment (BMAD Deployment/Assurance)
1. **Full Test Sweep**
   - [ ] Run `pnpm test:full` (unit + integration across workspaces); store logs in `validation/logs/test-phase4.txt`. <!-- task:phase4-tests command:pnpm test:full -->
   - [ ] Run Playwright/E2E suites; save screenshots/videos.
   - [ ] Execute DeepEval full suite; log to `validation/deepeval/` and Langfuse.
2. **Deployment Prep**
   - [ ] Verify Supabase migrations applied; note migration IDs.
   - [ ] Run deployment (Vercel/Supabase) and record preview URLs.
   - [ ] Add a checkbox per target environment under “Deployment Targets” (staging, prod, canary) and tick after verification.
3. **Ops & Monitoring**
   - [ ] Trigger monitoring hooks (Sentry errors, logging dashboards) to ensure alerts fire.
   - [ ] Confirm feature flags and environment configs match buildplan.
   - [ ] Add checkboxes under “Monitoring Checklist” for each signal (Sentry, logs, feature flags, DeepEval drift, etc.) and tick after validation.
4. **Sign-off**
   - [ ] Save this checklist with timestamp + owner.
   - [ ] Link final buildplan, story tracker export, test artifacts, and deployment URLs.

**Prompt snippet:**
```
Phase 4 validation: run `pnpm test:full`, Playwright, DeepEval. If any fail, halt deployment and list fixes. After deployment, record Supabase migration IDs, Vercel URLs, and monitoring checks.
```

---

## Phase 5 – Continuous Monitoring & Drift Control (Post-Deployment)
1. **Schedule Evaluations**
   - [ ] Set up recurring DeepEval drift tests (daily/weekly) and log them in `validation/deepeval/drift-log.md`. 
   - [ ] Schedule prompt/PII audits using `pnpm prompt:audit` on a cadence; record results in `validation/security/prompt-audit-log.md`. <!-- task:phase5-prompt command:pnpm prompt:audit -->
   - [ ] Schedule security scans using `pnpm security:scan`; archive summaries in `validation/security/scan-log.md`. <!-- task:phase5-security command:pnpm security:scan -->
   - [ ] Run `pnpm check:drift` to append any anomalies to the Planning Change Log automatically. <!-- task:phase5-drift command:pnpm check:drift -->
2. **Telemetry & Alerts**
   - [ ] Ensure analytics/observability dashboards include new events (verify in production).
   - [ ] Configure alert thresholds for error rates, latency, and AI evaluation scores.
3. **Feedback Loop**
   - [ ] Feed production learnings back into PRD/architecture (update Planning Change Log with new items).
   - [ ] Create backlog tickets for issues surfaced by monitoring or drift tests.
4. **Compliance & Security**
   - [ ] Run `pnpm security:scan` post-deploy; attach report to repo and tick the Drift & Audit checklist entry.
   - [ ] Document any policy exceptions or approvals in the Human Sign-off Checklist.

**Prompt snippet:**
```
After deployment, schedule drift/evaluation tasks, run security/prompt audits, and log new backlog items based on monitoring results. Provide links to dashboards and reports.
```

---

### Usage Notes
- Keep this file alongside PRD checklist; both must be complete before handoff.
- Customize story prompts per project, but never remove BMAD phase gates or required tests.
- Append extra checkboxes for industry-specific compliance (HIPAA, PCI, etc.).

### Active Build Checklist
- [ ] (Add one checkbox per domain/page combo generated in Phase 2.)

### Story Tracker
- [ ] (Add one checkbox per story created during sharding; tick when implementation + QA complete.)

#### Story Sub-Checklists Template
- Tests & QA:
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] DeepEval scenario
- Docs Updated:
  - [ ] Page docs (ux-notes)
  - [ ] Component docs

### Planning Change Log
- [ ] (Add one checkbox per delta discovered in Phase 1; resolve/tick before moving forward.)

### Deployment Targets
- [ ] (Add staging/prod/canary/etc. checkboxes here.)

### Monitoring Checklist
- [ ] (Add Sentry/logging/feature-flag/DeepEval drift checks here.)

### Human Sign-off Checklist
- [ ] Architecture approval (owner: ___)
- [ ] QA gate approval (owner: ___)
- [ ] Deployment approval (owner: ___)

### Drift & Audit Schedule
- [ ] DeepEval drift (date, scenario) \- log in `validation/deepeval/drift-log.md`
- [ ] Prompt audit (date) \- log in `validation/security/prompt-audit-log.md`
- [ ] Security scan (date) \- log in `validation/security/scan-log.md`
- [ ] (Add recurring DeepEval, prompt audit, and security scan entries here; tick each run.)
