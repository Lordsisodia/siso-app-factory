# Codex Architectural Vision - Universal PRD Framework

**Date**: October 21, 2025
**Source**: Codex CLI (GPT-5)
**Context**: Response to SISO App Factory system design question

---

## Key Insight

You're not building a *document template*. You're building an **AI-driven PRD Operating System** — a *universal planning framework* that lets autonomous AI agents take any idea and turn it into a complete, validated, build-ready plan.

---

## What the PRD System Is (In One Line)

A **checklist-driven, machine-readable blueprint** (plus validators) that drives an **AI build pipeline** (your OpenAI/Codex CLI) to scaffold, assemble components, configure services, generate code/tests, and deploy—repeatable for any app or niche via config.

---

## Do We Need "OpenAI Deep Research"?

**Short answer:** Not to ship the MVP. I can get you to a working PRD-→Build loop directly (and fast) with your Codex CLI plan.

**When deep research helps later:**
* Benchmarking codegen systems (v0.dev/bolt.new/Cursor/GPT-Engineer) for quality/cost.
* Specific domain patterns (payments in regulated markets, HIPAA workflows, etc.).
* Multi-tenant deployment topologies across clouds and cost models.
* Security hardening checklists for specific stacks.

But to **trial your simple projects**, we don't need that breadth yet—we need a tight PRD schema + CLI that executes it.

---

## What "Having the PRD System" Actually Means

You'll know it's real when this works:

```bash
# 1) Plan
codex-prd init my-project                  # creates meta.yaml + prd.yaml skeleton from templates
codex-prd validate                         # runs completeness/consistency/NFR gates
codex-prd generate buildplan               # emits buildplan.yaml (executable plan)

# 2) Build
codex-build scaffold                       # creates Next.js/Expo/Nest boilerplate per meta
codex-build assemble                       # pulls components from the library & wires them
codex-build integrate supabase clerk stripe # applies service recipes from the plan
codex-build migrate                        # generates & runs DB migrations
codex-build api                            # generates routes/handlers from operations in PRD
codex-build tests                          # generates Gherkin + test files and runs them
codex-build preview                        # local run with feature flags/seed data
codex-build deploy --env=dev               # deploys with config A/B, tenants, themes
```

Everything above is **driven by the PRD + Build Plan**, not ad-hoc prompts.

---

## The Minimal Artifacts to Make This Real

```
/project
  meta.yaml           # facets (domain, regulated, multi_tenant, locales, ai_features)
  prd.yaml            # requirements (REQ-*), NFRs, risks, ops, experiments
  buildplan.yaml      # <- executable steps for the CLI (see schema below)
  architecture.yaml   # C4 containers, data model, service wiring hints
  adr/                # decisions (why)
```

### `buildplan.yaml` Schema Example

The "how to build it" manifest the CLI executes:

```yaml
project:
  name: restaurant-booking
  stack: nextjs-15
  package_manager: pnpm
  runtime: node

targets:
  infra: "vercel"
  database: "supabase"
  auth: "clerk"
  payments: "stripe"
  email: "resend"

components:
  pages:
    - name: home
      template: marketing/HomeHero
    - name: bookings
      template: bookings/BookingsPage
  ui:
    - name: Button
      from: "@siso/ui/button"

  domains:
    - name: reservation
      entities:
        - Reservation(id, userId, partySize:int, time:datetime, status:enum)
        - Table(id, seats:int, location:string)
      operations:
        - createReservation(input: CreateReservationInput) -> Reservation
        - cancelReservation(id) -> Reservation

api:
  routes:
    - POST /api/reservations -> reservation.createReservation
    - DELETE /api/reservations/:id -> reservation.cancelReservation

database:
  schema:
    - fromEntities: reservation.entities
  rls:
    - entity: Reservation
      policy: "userId = auth.uid()"

integrations:
  supabase:
    tablesFrom: reservation.entities
    policiesFrom: database.rls
  clerk:
    roles: ["user","admin"]
    protectedRoutes: ["/bookings","/api/*"]
  stripe:
    mode: test
    products:
      - "reservation-deposit"

testing:
  gherkinFrom: prd.requirements
  e2e: "playwright"

rollout:
  featureFlags:
    - bookings-v2
  stages:
    - 10%
    - 50%
    - 100%
```

This file is **compiled from the PRD** (requirements, data model, integrations) and gives the CLI **deterministic steps** to execute.

---

## The Checklist the AI Follows

### A) Planning (PRD) — Machine-Checklist

* ✅ Background, personas, goals, KPIs
* ✅ Requirements (REQ-IDs) with Gherkin acceptance
* ✅ NFRs (ISO 25010 rows with metric/target/validation)
* ✅ Architecture (C4 Context/Container + initial ERD)
* ✅ Security/Privacy (ASVS rows, DPIA trigger if PII)
* ✅ Ops (SLOs + burn-rate alerts), Experiments (MDE), Risk register
* ✅ Traceability (REQ ↔ API ↔ Test ↔ Metric ↔ ADR)

When **validation passes**, the generator emits `buildplan.yaml`.

### B) Implementation (CLI) — Executable Steps

1. **Scaffold app** (Next.js/Nest/Expo skeletons)
2. **Assemble components** from your library (pages, UI atoms, patterns)
3. **Generate domain** (entities → Prisma/Supabase SQL, RLS, seeds)
4. **Generate API** (operations → routes/controllers, Zod validation, auth guards)
5. **Wire integrations** (Clerk/Stripe/Supabase/Resend recipes)
6. **Add tests** (Gherkin → Playwright/Cypress + Vitest unit)
7. **Instrument analytics** (events from PRD instrumentation spec)
8. **Provision flags & rollout** (config files + provider SDK)
9. **Preview** (local + seed data + default admin)
10. **Deploy** (env configs, multi-tenant theming, client A/B configs)

The CLI prints a **trace** of each step and writes a `validation_report.json` at the end.

---

## Where Codex CLI Fits

Great: you prefer building this as a CLI with OpenAI Codex. Perfect—design the CLI as the **single executor** of `buildplan.yaml`. Codex is used for:

* Filling templates
* Generating glue code
* Transforming entity → schema → API → tests
* Making incremental edits on the repo

Your CLI orchestrates; Codex generates/edits; validators keep it honest.

---

## Do We Have a PRD System Now?

Not yet. You have the monorepo + tooling; you **need**:

* `prd.schema.json`, `meta.schema.json`
* `prd.yaml` + `meta.yaml` (per project)
* A generator that compiles PRD → `buildplan.yaml`
* The Codex CLI commands above to **execute** the plan

Once that loop runs once, you have the Universal PRD system.

---

## Recommendation: Build MVP Now

Let's stand up the MVP **immediately**:

1. **Schemas**: `meta.schema.json`, `prd.schema.json`, `buildplan.schema.json`
2. **CLI** (Codex-friendly): `codex-prd init|validate|generate`, `codex-build scaffold|assemble|integrate|migrate|api|tests|deploy`
3. **Catalogs**: NFR defaults, security (ASVS) map, a11y (WCAG) map, risk library
4. **Templates**: Next.js skeletons, domain → Prisma/Supabase, API route stubs, test stubs
5. **Validation rules**: completeness, NFRs, ops, security/privacy, traceability

Then run a **simple "restaurant booking" project** through it. If it builds, we iterate.

---

## Next Steps

Codex can draft:
* The three JSON Schemas (meta/prd/buildplan)
* The exact CLI command scaffolds
* One working "reservation" domain recipe (entities → SQL → API → tests)

So you can trial the loop immediately.

---

**Status**: Architectural vision documented
**Action**: Proceed with schema design and CLI implementation
