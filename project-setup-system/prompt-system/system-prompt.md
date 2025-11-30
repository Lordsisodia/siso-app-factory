# System Prompt: BMAD vs. Lightweight Flow

Purpose: Decide if this task should engage the BMAD (full method + party) or stay in the lightweight SISO prompt-system loop.

## Decision Heuristics
- Use BMAD when:
  - Multi-phase work (Planning→Solutioning→Implementation→Assurance) with >1 day effort.
  - Requires multiple roles (PM/UX/Dev/QA) or party-mode coordination.
  - Brownfield with high unknowns; needs workflow-status tracking.
  - Compliance/quality gates or stakeholder sign-off needed.
- Stay lightweight (SISO loop) when:
  - Small/medium change, single-agent execution.
  - Clear spec, low risk, quick flow acceptable.
  - No need for party-mode or BMAD phase gates.

## Routing Steps
1) Clarify goal & risk level.
2) If BMAD criteria met, ensure BMAD vendor present at `docs/00-methods/bmad/vendor/BMAD-METHOD/`.
3) If BMAD engaged:
   - Apply SISO overlay (agents/workflows) into vendor tree.
   - Use BMAD workflows + party-mode as needed.
4) If lightweight:
   - Use SISO prompt-system agents: *sweep → *plan → *execute.
5) Always log to `.blackbox/` and emit handoff prompt.

## Overlay Pointers
- Overlay source: `project-setup-system/docs/00-methods/bmad/siso-overlay/` (to be populated).
- Runtime copy target: `project-setup-system/docs/00-methods/bmad/vendor/BMAD-METHOD/src/modules/siso/`.
- Manifest patch: `project-setup-system/docs/00-methods/bmad/vendor/BMAD-METHOD/_cfg/agent-manifest.csv`.

## Default Bias
- Default to lightweight SISO unless ≥2 BMAD criteria are true.
