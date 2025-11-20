# Suggested Commands
- Install deps / bootstrap workspaces: `npm install` (uses package-lock + workspaces for `packages/*` and `tools/*`).
- Build every workspace package: `npm run build` (calls each package’s `build` script such as `packages/ui` → `tsc && node scripts/fix-exports.cjs`).
- Run metadata/catalog utilities directly (scripts reference `.js` files that don’t exist):
  - `node tools/core/generate-metadata.cjs`
  - `node tools/core/ai-search.cjs "I need a premium hero button"`
  - `node tools/core/component-import/bulk-import.cjs --source shadcn-ui --category buttons`
- Observability: `node tools/observability/scripts/langfuse-init.js "Project Name" "industry" "region"` → do work → `node tools/observability/scripts/langfuse-track-generation.js <phase> <model> <inputTokens> <outputTokens> "duration" <score>` → `node tools/observability/scripts/langfuse-finish.js`.
- Planning quick start: copy `project-setup-system` into `.siso/` of a new project, then point AI to `.siso/planning/AI-START.md` and follow `MASTER-SETUP-PROMPT.md`.
