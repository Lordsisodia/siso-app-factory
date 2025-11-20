# Task Completion Checklist
- If components/features changed, rerun `node tools/core/generate-metadata.cjs` to refresh `docs/ai-catalog.json` and re-index search data; verify CLI search (`node tools/core/ai-search.cjs <query>`) surfaces new entries.
- When editing packages, run `npm run build` to ensure TypeScript emits updated `dist` artifacts and that export fix scripts succeed.
- For planning-system updates, confirm `project-setup-system/` prompts/templates stay in sync and adjust ROADMAP/STATUS notes if scope changes.
- During any planning/test sessions, init/log/finalize LangFuse traces via scripts in `tools/observability/scripts/` and capture verification scores.
- Update docs (STATUS.md, ROADMAP.md, AI-USAGE-GUIDE.md) after major catalog/feature additions so AI instructions remain accurate before handoff.
