# Context Library Index

Use this directory to preload background knowledge before an agent runs any planning phase. Everything is grouped so AI systems can selectively load only what they need.

## Directory Map

| Folder | Contents | When to Load |
| --- | --- | --- |
| `00-vision/` | North-star narratives (`UNIVERSAL-PRD-FRAMEWORK-VISION`, `CODEX-ARCHITECTURAL-VISION`) | Humans or agents that need the “why” behind the framework before kicking off a project. |
| `10-research/` | Research briefs, findings, and context-engineering notes | Phase 1-3 agents; anything that needs market research methods, AI framework lessons, or code-execution best practices. |
| `20-implementation/` | buildplan schemas, CLI architecture, condensed system context for AI coders | Phase 8-9 planners and any implementation agent translating plans into buildplan.yaml / CLI steps. |
| `30-special-topics/` | Emerging focus areas (currently `UI-BEST-PRACTICES/`) | Pull in Notebook LM exports or domain-specific heuristics before component planning (Phase 5). |

## Loading Guidance

1. **Always load** `10-research/DEEP-RESEARCH-CONTEXT.md` before running Discovery phases so the agent follows the approved research process.
2. **Reference** `10-research/AI-FRAMEWORK-RESEARCH-FINDINGS.md` for planning/agent orchestration best practices instead of the old PART1/PART2 files (now removed).
3. **When generating buildplan.yaml**, read `context/20-implementation/CODEX-IMPLEMENTATION-DESIGN.md` for the authoritative schema and CLI expectations.
4. **UI-focused work** should import anything under `30-special-topics/UI-BEST-PRACTICES/` prior to Phase 5 to keep component decisions aligned with current heuristics.

Feel free to add more folders under `30-special-topics/` as new research packets land—just document them here so agents know they exist.
