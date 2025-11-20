# Foundation Verification Checklist (Phase 1 – Steps 1‑10)

> Adapted from THE GREAT LIBRARY OF SISO → `APP FACTORY FOUNDATIONS / MASTER-IMPLEMENTATION-PLAN.md`.
> Run this **inside each project workspace** immediately after copying the planning system and before Discovery Phase begins.

For each criterion, mark ✅/❌ in the table at the bottom and attach evidence (links, logs, screenshots) in the project’s `validation/logs/` folder.

---

## 1. Audit Current System Architecture
- [ ] Component inventory created (`workspace-notes/architecture/audit.md`).
- [ ] Integration gaps + dependencies documented.
- [ ] AI-consumable formats confirmed (Markdown, YAML, JSON).

## 2. Test PDR Generation Process
- [ ] Dry-run `templates/09-pdr-template.md` end-to-end using a sample brief.
- [ ] Record blockers + timing in `validation/logs/foundation-pdr.md`.

## 3. Validate Testing Intelligence System
- [ ] Confirm testing templates exist (`tools/testing/` or project equivalent).
- [ ] Note current automation coverage % in `STATUS.md` (Planning column).

## 4. Verify Developer Workflow Integration
- [ ] Ensure `AI-START.md` + `MASTER-SETUP-PROMPT.md` align with dev workflow.
- [ ] Document code-quality/CI hooks available to implementation agents.

## 5. Confirm UI Design System Integration
- [ ] Component library + design tokens accessible (record path + commit).
- [ ] Accessibility + performance guardrails listed inside `docs/04-ui-ux/`.

## 6. System Integration Testing
- [ ] Run end-to-end mock (client brief → PDR outline) and log results.
- [ ] Verify AI decision-making + human oversight points exist.

## 7. Performance Benchmarking
- [ ] Capture baseline metrics (PDR generation time, AI latency) in `validation/logs/foundation-metrics.json`.
- [ ] Note scalability plan (multi-project concurrency strategy).

## 8. Quality Assurance Validation
- [ ] Confirm QA checkpoints per phase (`validation/phase-XX-*.md`).
- [ ] Document failure-prevention mechanisms + success patterns recognized.

## 9. Documentation Completeness Check
- [ ] Verify training materials + decision frameworks stored in `project-setup-system/context/` (or copied equivalent).
- [ ] Ensure implementation guides are linked from `README.md`.

## 10. System Readiness Assessment
- [ ] Foundation checklist scored (≥80%) and logged in `validation/logs/foundation-phase.json`.
- [ ] Outstanding gaps + owners listed in `workspace-notes/foundation-gaps.md`.

---

| Criterion | Pass? | Evidence Link |
|-----------|-------|---------------|
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |
| 6 |  |  |
| 7 |  |  |
| 8 |  |  |
| 9 |  |  |
| 10 |  |  |

- **Scoring**: `(passes / 10) × 100`. Minimum 80% before Discovery.
- **Logging**: Store structured result in `validation/logs/foundation-phase.json` and reference it from `STATUS.md` + `ROADMAP.md` (Planning column).
