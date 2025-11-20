# SISO App Factory – Roadmap & Gap Analysis

**Last Updated:** October 21, 2025  
**Prepared By:** Claude (Sonnet 4.5) + Codex (GPT‑5)

This document merges the original system analysis, v2.0 release notes, and the v3.0 gap report into a single source of truth. Use it to understand what already exists, what shipped in v2.0, and what still needs to be built for the v3 vision of a fully autonomous AI PRD framework.

---

## 1. Vision & Guiding Principles

We are building a **Universal AI PRD Operating System** that carries an idea through:

> **Idea → PRD → Architecture → Build Plan → Implementation**

Core principles:
- **Standardized Stack:** Next.js 15 + Supabase + Clerk + Stripe + Vercel defaults.
- **AI-First Workflow:** Agents can run the nine planning phases with minimal human input.
- **Industry-Agnostic:** Works for restaurants, wellness, marketplaces, SaaS, etc.
- **Quality-Controlled:** Built-in validation, BMAD operations, DeepEval scoring.
- **Self-Contained:** Everything an AI needs lives in this repo template.

---

## 2. Current Capabilities (v2.0)

| Capability | Status | Notes |
| --- | --- | --- |
| Master setup prompt & templates | ✅ | 9 phases, 8 templates, prompts per phase.
| Validation rules (`meta.yaml`) | ✅ | Macro phases, min sources/features/tables/tasks, tool requirements.
| Integration guides | ✅ | Supabase (RLS, Edge Functions, Storage) + Clerk (JWT sync, RBAC, webhooks).
| Component ecosystem | ✅ | 1,983+ components + AI catalog + reuse targets (85%+).
| BMAD integration | ✅ | Auto-downloaded via setup script, domain-flow templates.
| Planning automation | ⚠️ | Single-agent loop, manual verification, limited memory.
| Implementation automation | ⚠️ | Buildplan schema drafted, but Codex CLI not yet executed end-to-end.

### v2.0 Enhancements (formerly `V2-WHATS-NEW.md`)
- Added Supabase + Clerk integration guides with copy-paste patterns.
- Authored deep research context doc + industry knowledge bases (restaurant + Indonesia verticals).
- Introduced `meta.yaml` orchestration metadata and validation checklists.
- Reorganized templates, prompts, and knowledge to follow 3 macro phases.

---

## 3. Critical Gaps Toward v3.0

| Gap | Impact | Proposed Solution |
| --- | --- | --- |
| Multi-agent orchestration | Single agent handles all phases → slower, less reliable | Define specialist agents (Researcher, PM, Architect, Domain Engineer, QA) coordinated via a crew/orchestrator pattern inspired by CrewAI/AutoGen. |
| Self-verification automation | Manual checklist review → human bottleneck | Implement Chain-of-Verification prompts + DeepEval hooks after each phase, auto-filling validation checklists before advancing. |
| Memory & knowledge persistence | Agents rely on current context window only | Add retrieval/memory layer (Context-Engineering patterns) so research findings, industry KBs, and prior project lessons are auto-loaded per phase. |
| Observability & cost tracking | No telemetry on why/when agents fail | Instrument Langfuse spans for each phase + verification pass; log cost/time per phase for debugging and governance. |
| Code generation templates | Buildplan schema exists but no executable CLI | Finish Codex CLI commands (`codex-build scaffold/assemble/...`) and connect to `buildplan.yaml`; generate migrations, Edge Functions, component wiring.
| Deployment & DevOps | Vercel + Supabase integration undocumented | Create deployment guide, `.env` patterns, GitHub Actions templates, monitoring (Sentry, LogRocket) checklist. |
| Documentation generation | No automatic API/UI docs | Add Storybook or MDX generation from `buildplan.yaml` + operations definitions.
| Example breadth | Only restaurant reference | Produce 4+ additional industry exemplars (wellness, e‑commerce, SaaS, marketplace) + knowledge bases.

---

## 4. Roadmap Overview

### Phase A – Core Defaults & Docs (✅ mostly done)
1. Supabase & Clerk guides with RLS/RBAC templates.  
2. Component catalog + AI tooling (ai-search, Langfuse guides).  
3. `meta.yaml` with validation gates + macro phase definitions.

### Phase B – AI Autonomy (🚧)
1. Multi-agent orchestration design (planner, executor, verifier).  
2. Automatic self-verification (DeepEval, checklists, error recovery).  
3. Context carryover + memory retrieval per phase.

### Phase C – Implementation Automation (⚙️ planned)
1. Codex CLI executing `buildplan.yaml` (scaffold → assemble → migrate → API → tests → deploy).  
2. Schema → SQL generator, BMAD → Edge Function mapper.  
3. Test generators + coverage tracking.

### Phase D – Scale & Examples (📅 later)
1. Multi-industry knowledge bases + reference projects.  
2. Cost/performance dashboards.  
3. Documentation/tooling (Storybook, API docs, admin manuals).

---

## 5. Release Notes Appendix (v2.0)

- **Release Date:** Oct 20, 2025.  
- **Highlights:** Supabase + Clerk guides, meta.yaml, deep-research context, restaurant knowledge base, gap analysis.  
- **Deferred:** Enhanced master prompt (multi-agent), code generation templates, additional industry examples.  
- **Next Actions (from v2 planning):** finalize macro-phase prompts, integrate validation loops, design Codex CLI MVP, expand knowledge bases.

---

## 6. Action Checklist

1. ✅ Keep this roadmap as the single source (old `SYSTEM-ANALYSIS.md`, `SYSTEM-GAP-ANALYSIS-V3.md`, and `V2-WHATS-NEW.md` are superseded).  
2. 🧠 Review gaps before prioritizing new work; log progress in this file.  
3. 🔁 When a roadmap item ships, update the relevant section and remove it from “Critical Gaps.”

