# Cypress Testing Harness

> Generated from THE GREAT LIBRARY OF SISO (Testing & Deployment Automation playbooks). Copy this folder into each project workspace under `tools/testing/cypress/`.

## What’s Included
- `cypress.config.ts` – opinionated base config (component + e2e, retries, video/trace settings).
- `support/commands.ts` – reusable helpers (login, reset db, seed data).
- `support/index.ts` – global hooks (intercepts, error handling).
- Sample specs under `e2e/` and `component/` referencing the App Factory design system.
- Scripts for running locally and inside CI.

## Usage Steps (Per Project Workspace)
1. Install Cypress + dependencies:
   ```bash
   pnpm add -D cypress @testing-library/cypress @faker-js/faker
   ```
2. Copy this folder to `tools/testing/cypress/` in the workspace.
3. Wire package scripts:
   ```json
   {
     "scripts": {
       "cypress:run": "cypress run",
       "cypress:open": "cypress open"
     }
   }
   ```
4. Configure test data seeding in `support/commands.ts` (call Supabase, Prisma, etc.).
5. Update CI workflow to run `pnpm cypress:run --browser chromium`.
6. Store artifacts (videos/screenshots) under `validation/logs/cypress/` for checklist evidence.

## Checklist Integration
- Phase 4.5: Document planned tests + coverage targets.
- Phase 8: `pnpm cypress:run` must pass (100+ tasks gate), attach results to `validation/logs/phase-08.json`.
- Delivery handoff: include test summary in `docs/08-build-plan/master-checklist.md` and `docs/06-pdr/PDR.md` QA section.
