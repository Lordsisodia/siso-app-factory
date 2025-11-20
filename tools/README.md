# SISO Tools Suite

This folder now groups automation utilities by domain so teams can instantly tell which scripts are core to the product vs. optional helpers.

## Directory Map

- `core/`
  - `ai-search.cjs` – AI-powered component/feature lookup consumed by `pnpm search`
  - `generate-metadata.cjs` – crawler that rebuilds `docs/catalog/components-and-features.json`
  - `component-import/` – optional migration helpers (bulk import + recategorization)
- `observability/`
  - `scripts/` – LangFuse CLI helpers (init/track/finish/test)
  - `guides/` – the Markdown playbooks that explain how to use the scripts and dashboard

## Quick Commands

| Purpose | Command |
| --- | --- |
| Run semantic catalog search | `pnpm search "premium hero CTA"` |
| Rebuild AI catalog | `pnpm generate:metadata` |
| Bulk import components (requires `SISO-UI-Library`) | `pnpm tools:import -- --all` |
| Recategorize `misc/` primitives into patterns | `pnpm tools:recategorize` |
| Initialize LangFuse trace | `pnpm tools:lf:init "Project" "industry" "region"` |
| Track a phase with full metadata | `pnpm tools:lf:track <phase> <model> <promptTokens> <completionTokens> <duration> <score>` |
| Finish session + clean trace file | `pnpm tools:lf:finish` |
| Smoke-test LangFuse credentials | `pnpm tools:lf:test` |

## Notes

1. Docs in `observability/guides/` have been updated to point to the new layout—link to them rather than duplicating long instructions elsewhere.
2. Treat `core/component-import` as optional; it depends on external libraries and should not run in CI/CD.
