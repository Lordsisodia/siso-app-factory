# Reference Architecture Template

> Copy this into new project docs to explain the expected repository structure after running `setup-new-project.sh` + importing the component packages. Replace `<project-slug>` with the client-specific name.

```
<project-slug>/
├── docs/
│   ├── 00-methods/bmad/
│   ├── 01-research/
│   ├── 03-features/
│   ├── 05-technical/
│   ├── 06-pdr/
│   └── 08-build-plan/
├── packages/                     # (Optional) local copy of siso-app-factory packages for offline use
│   ├── auth-system/
│   ├── bike-rental/
│   ├── restaurants/
│   ├── tour-guides/
│   └── ui/
├── project-setup-system/
│   ├── AI-START.md
│   ├── MASTER-SETUP-PROMPT.md
│   ├── PRD-SETUP-CHECKLIST.md
│   ├── context/
│   ├── integrations/
│   ├── prompts/
│   ├── templates/
│   └── validation/
├── tools/
│   ├── core/
│   │   ├── ai-search.cjs
│   │   └── generate-metadata.cjs
│   └── observability/
│       └── scripts/langfuse-track-generation.js
├── src/
│   ├── app/                      # Next.js App Router, route groups for admin/public/api/auth
│   ├── components/
│   ├── config/                   # Stack settings, site config loader, feature flags
│   ├── domains/                  # Domain-driven folders (see DOMAIN-DRIVEN-LAYOUT.md)
│   ├── features/                 # Cross-domain feature bundles
│   ├── lib/                      # Utilities, hooks, helpers
│   ├── providers/                # Context providers, theme, analytics
│   └── styles/
├── supabase/
│   ├── migrations/
│   ├── schema/
│   ├── seeds/
│   └── scripts/
├── scripts/
│   ├── setup/
│   ├── dev/
│   ├── config/
│   └── utils/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
├── .env.example
├── buildplan.yaml
├── package.json
├── pnpm-lock.yaml (or package-lock.json)
└── README.md
```

## Folder Purpose Cheat Sheet

| Path | Why it exists |
| --- | --- |
| `docs/` | Holds the 9-phase planning output (research, features, tech specs, build plan, PDR). Serves as the contract between planning + implementation agents. |
| `packages/` | Optional local mirror of the SISO component libraries; include when you want the project repo to be self-contained/offline. |
| `project-setup-system/` | Template + orchestration brain. Never edit the copy in `siso-app-factory` directly—modify the project’s copy. |
| `tools/` | Reusable scripts for Langfuse logging, metadata generation, bulk imports, etc. |
| `src/` | All application code (Next.js App Router, shared components, domain logic). Domain boundaries mirror what Phase 4/5 produced; follow `DOMAIN-DRIVEN-LAYOUT.md`. |
| `supabase/` | SQL migrations, schema snapshots, seeds, and scripts for Supabase CLI deployments. |
| `scripts/` | Automation (setup, configuration, CLI tasks). Distinct from `tools/` which hosts AI helper scripts. |
| `tests/` | Unit/integration/E2E suites generated during the build phase. |
| `buildplan.yaml` | Machine-executable plan used by Codex/Claude/Cursor agents. |

## Customizing Per Industry

1. Keep the top-level layout identical so automation scripts work across industries.  
2. Add industry overlays under `architecture/` (e.g., `architecture/wellness.md`) to document domain-specific folders (`src/domains/therapy/`, `supabase/functions/loyaltyPoints.ts`, etc.).  
3. Update this template whenever the scaffolding script changes to avoid drift.
