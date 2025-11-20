# Domain-Driven Layout Template

Use this structure when organizing `src/domains/` inside a SISO App Factory project. Each domain folder acts like a bounded context, containing **pages, flows, services, UI, and documentation** specific to that business capability.

```
src/domains/
└── <domain-slug>/
    ├── docs/
    │   ├── domain-overview.md          # Mission, KPIs, personas
    │   ├── data-contracts.md           # Entities, events, schemas
    │   └── runbooks.md                 # Ops + troubleshooting notes
    ├── pages/
    │   └── <page-slug>/
    │       ├── docs/
    │       │   └── ux-notes.md         # Page-specific UX + requirements
    │       ├── desktop/
    │       │   ├── page.tsx
    │       │   ├── layout.tsx
    │       │   └── components/
    │       │       ├── Hero.tsx
    │       │       ├── Hero.docs.md
    │       │       └── hooks/
    │       │           └── useHeroMetrics.ts
    │       ├── mobile/
    │       │   ├── page.tsx
    │       │   └── components/
    │       │       ├── HeroMobile.tsx
    │       │       └── utils/
    │       ├── hooks/
    │       │   └── useLandingMetrics.ts
    │       ├── utils/
    │       │   └── mapCta.ts
    │       └── styles/
    │           └── landing.css
    ├── workflows/
    │   ├── booking-flow.machine.ts
    │   └── triggers/                   # Event handlers, schedulers
    ├── services/
    │   ├── api.ts                      # Server actions, RPC handlers
    │   ├── repository.ts               # Data access per entity
    │   └── policies.ts                 # RLS + auth helpers
    ├── ui/
    │   ├── forms/
    │   ├── tables/
    │   └── modals/
    ├── hooks/                          # Shared across pages in this domain
    ├── utils/
    └── tests/
        ├── unit/
        └── e2e/
```

### Folder Guidelines
- **docs/** – Mirrors the PRD but scoped to this domain. Update whenever the domain evolves.
- **pages/** – Each page gets device-specific folders (`desktop/`, `mobile/`), local `components/`, and optional per-component docs. Hooks/utils/styles live alongside the page to keep ownership tight.
- **workflows/** – Long-running or multi-step processes (state machines, orchestrations, event handlers).
- **services/** – Application logic, repositories, RLS helpers, third-party integrations. Think “use cases.”
- **ui/** – Domain-specific building blocks; import shared primitives from `packages/platform/ui` and assemble bespoke variants here.
- **hooks/utils** – Shared helpers across pages within the domain.
- **tests/** – Domain-focused tests (unit + Playwright). Co-locating them keeps ownership clear.

### Bounded Context Checklist
1. Every domain owns its **entities** and **events** (document in `docs/data-contracts.md`).
2. Public APIs for other domains go through `services/api.ts` (or exported handlers) to avoid tight coupling.
3. Every page encapsulates multiple footprints (desktop/mobile, hooks, utils, docs) so mobile-specific changes never affect desktop, and vice versa.
4. Component-level docs (`components/Hero.docs.md`) capture intent, props, and handoff notes—valuable for multi-agent editing.
5. Shared utilities between domains live in `src/lib/` or `packages/`; avoid cross-importing domain internals.
6. Keep domain docs synced with global artifacts (PRD, buildplan.yaml) via checklists in `PRD-SETUP-CHECKLIST.md`.

### Example Domains
```
src/domains/
├── booking/
├── menu/
├── loyalty/
├── payments/
└── admin/
```
Each domain repeats the template above, ensuring the entire codebase maps 1:1 with planning deliverables and multi-agent ownership.
