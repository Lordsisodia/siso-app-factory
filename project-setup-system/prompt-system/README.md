# Prompt System Playbook

Purpose: Single source agents must read before working in the project-setup-system. Guides context gathering, routing (UI / Feature / Research), scratchpad usage, and handoff prompts.

## Guardrails
- No destructive git commands; never revert user changes.
- Prefer repo docs over assumptions; cite sources.
- Use `.blackbox/` for scratch; keep durable knowledge in `docs/agent/` when promoted.

## Core Loop
1. Understand intent: restate goal and success criteria from chat.
2. Inventory context: chat, repo docs, brand system, code entrypoints; list sources.
3. Fill gaps: search repo/web; record raw notes in `.blackbox/notes-YYYYMMDD.md`.
4. Synthesize: short context summary, assumptions, risks.
5. Route workstream(s): UI | Feature | Research (see routes below).
6. Plan steps: ordered tasks + tests.
7. Handoff: emit ready-to-run prompt (template below) with file pointers.

## Workstream Routes
- UI
  - Gather: screenshots/spec, brand system refs, layout/code entrypoints.
  - Analyze: gaps vs spec; reusable components/tokens.
  - Output: visual plan + code touchpoints + testing notes.
- Feature / Implementation
  - Gather: similar code paths/tests, data contracts, feature flags.
  - Validate: working examples; risks/edge cases.
  - Output: step plan + target files + test plan.
- Research
  - Gather: web sources → `.blackbox/research-*.md`.
  - Curate: relevance, credibility, contradictions.
  - Output: distilled insights + citations + next actions.

## Capture Rules
- Temporary/raw → `.blackbox/` (timestamped files with header: date, author, purpose).
- Durable knowledge → `docs/agent/` (curated summaries like brand system, codebase map).

## Templates
Context summary
```
Goal: …
Success criteria: …
Known context: …
Missing info: …
Sources checked: …
Risks/assumptions: …
```

Handoff prompt
```
You are Agent N continuing the same session.
Context:
- …
Workstream: UI | Feature | Research
Tasks (ordered):
1) …
2) …
3) …
Deliverables: …
Constraints: …
Notes/files: .blackbox/..., docs/agent/...
```

## Quick Checklist
- Clarify goal + success criteria
- Collect context (chat + docs + code + brand)
- Fill gaps; log to `.blackbox/`
- Pick route(s)
- Synthesize + assumptions
- Plan steps + tests
- Emit handoff prompt + file pointers
