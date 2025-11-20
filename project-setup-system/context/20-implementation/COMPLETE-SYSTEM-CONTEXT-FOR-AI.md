# Complete System Context (Condensed)

> **Purpose:** Give AI agents and humans a one-page orientation to the SISO App Factory without duplicating the full documentation set. Use this as a launchpad, then jump into the linked sources for depth.

---

## 🧭 System Snapshot

| Phase | What happens | Source of truth |
| --- | --- | --- |
| Discovery | Market research, competitor audits, feature discovery | `project-setup-system/templates/01-03*`, `context/10-research/DEEP-RESEARCH-CONTEXT.md` |
| Definition | Architecture, domains, database, components | `MASTER-SETUP-PROMPT.md`, `templates/03-06*`, `context/10-research/AI-FRAMEWORK-RESEARCH-FINDINGS.md` |
| Delivery | Build plan, validation, PDR, buildplan.yaml | `templates/07*`, `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md` |

AI agents work in this order and must pass the validation checklists in `validation/` before moving on.

---

## 🗺️ Context Library Map

See `context/README.md` for the complete index. Key jumping-off points:

- `context/00-vision/UNIVERSAL-PRD-FRAMEWORK-VISION.md` — Why we exist
- `context/00-vision/CODEX-ARCHITECTURAL-VISION.md` — CLI + workflow ambition
- `context/10-research/DEEP-RESEARCH-CONTEXT.md` — How to run high-quality research
- `context/10-research/AI-FRAMEWORK-RESEARCH-FINDINGS.md` — Agent orchestration + planning best practices
- `context/10-research/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` — Task sizing, prompt patterns, reference usage
- `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md` — Authoritative buildplan schema + CLI layout
- `context/30-special-topics/UI-BEST-PRACTICES/` — Notebook LM drops for modern UI heuristics

---

## 🧱 Minimum Artifacts per Project

Every project produced by the planning agents must ship with:

- `meta.yaml` — facets + validation guardrails
- `docs/` tree populated per templates (research, features, technicals, PDR)
- `docs/08-build-plan/master-checklist.md` — 100+ task execution plan
- `docs/05-technical/component-catalog.md` — With ≥85% library reuse
- `docs/05-technical/schema-spec.md` + ERD — ≥20 tables, RLS policies
- `siso-site-config.yaml` — Config-driven theme plus tenant toggles
- `buildplan.yaml` — Generated from `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md`

Once these exist and pass the validation checklists, hand off to the AI coder stack (Codex CLI, Claude Code, Cursor, etc.).

---

## 🚦 Quality Gates

Use `validation/phase-*.md` and `context/10-research/DEEP-RESEARCH-FINDINGS-CODE-EXECUTION.md` to enforce:

- ≥10 cited sources in research
- ≥50 features documented + prioritized
- 10-20 domains with RLS + NFR coverage
- 20+ tables with SQL + semantic comments
- 100+ build tasks across 12-16 week roadmap
- No `[TBD]` in critical sections

Log self-verification to Langfuse (see prompts in `validation/README.md`).

---

## 🧰 Implementation Hand-off

1. **Generate** `buildplan.yaml` by following `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md`.
2. **Run** the Codex CLI (or equivalent) phases: scaffold → assemble → integrate → migrate → API → tests → preview → deploy.
3. **Track** each action through Langfuse / telemetry to capture regressions.
4. **Capture learnings** back into `context/30-special-topics/` or `knowledge-bases/`.

This condensed guide intentionally defers to the linked files for detail so the knowledge stays DRY. Always treat those sources as canonical.
