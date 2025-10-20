# Architecture Overview (Tenant-per-Deployment)

Date: 2025-10-18
Status: Draft v0.1

## Goals
- Reusable, domain-based template
- Low-cost (free-tier-first)
- Per-client isolation (repo + Vercel + Supabase + Clerk)
- Mobile-first performance

## High-Level

- Next.js (App Router, TS) for web + API routes/server actions.
- Clerk for auth; role mapping via Clerk metadata + app RBAC.
- Supabase Postgres for persistence. Single-tenant DB per client.
- Storage for images via Cloudinary or S3/R2 (avoid Supabase storage growth).
- Email provider with generous free tier for transactional emails.

## Domain-Sliced Layout

```
src/
  domains/
    menu/
      components/
      server/
      db/
      schemas/
      tests/
    specials/
    loyalty/
    blog/
    cms/
    admin/
    auth/
  shared/
    ui/
    lib/
    config/
    hooks/
    analytics/
  app/ (Next.js routes)
    (public pages)
    admin/
```

- Each domain owns its UI, server logic, data access, and tests.
- Shared utilities are versioned and stable.

## Config-as-Data
- `SiteConfig` in DB drives: enabled pages, layout variant, theme tokens, enabled features (e.g., reviews, blog).
- Build-time safe defaults; runtime overrides via DB fetch + cache.

## Eventing
- Minimal at MVP. For queued tasks (receipt photo verification), use a job queue via serverless-friendly pattern (e.g., poller or lightweight cron) and store results in DB.

## Security
- Single-tenant DB (no RLS needed for isolation) but keep policies available for portability.
- RBAC in app code; audit logs for admin actions.

## Observability
- Vercel analytics; optional Sentry (free) for errors.

## Extensibility
- Payment/POS adapters as pluggable modules (future): `providers/payments/*`, `providers/pos/*`.
- Component variants registry per domain to enable quick UI swaps.
