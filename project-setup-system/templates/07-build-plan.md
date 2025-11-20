# Build Plan Template

**Project**: [PROJECT_NAME]
**Duration**: [12 weeks]
**Date**: [DATE]

---

## Phase 0: Provisioning (Week 0)
- [ ] Create GitHub repository
- [ ] Set up Vercel project
- [ ] Set up Supabase project
- [ ] Set up Clerk instance
- [ ] Configure environment variables

## Phase 1: Repository Setup (Week 1)
- [ ] Initialize Next.js project
- [ ] Configure ESLint, Prettier
- [ ] Set up domain folder structure
- [ ] Configure path aliases
- [ ] Add CI/CD pipeline

## Phase 2: Database Layer (Week 2)
- [ ] Create migrations
- [ ] Add RLS policies
- [ ] Write seed data
- [ ] Test locally

## Phase 3: Shared Infrastructure (Week 3)
- [ ] Theme provider
- [ ] Auth setup
- [ ] Shared UI components
- [ ] Analytics integration

## Phase 4: Domain Implementation (Weeks 4-10)
- [ ] [Domain 1] - [X days]
- [ ] [Domain 2] - [X days]
- [ ] [Domain 3] - [X days]

## Phase 5: Testing & QA (Week 11)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Accessibility audit
- [ ] Performance optimization

## Phase 6: Launch (Week 12)
- [ ] Final QA
- [ ] Deploy to production
- [ ] Monitor for issues

## UI Non-Negotiables Compliance
- [ ] Run automated axe + Lighthouse audits in CI and attach the reports.
- [ ] Capture BrowserStack/Sauce Labs visual diffs for target devices.
- [ ] Execute assistive-tech smoke tests (screen reader + keyboard + switch control) and log findings.
- [ ] Complete localization/RTL screenshots proving text expansion works.
- [ ] Verify privacy & security UX flows (consent, data export/delete, incident messaging) with legal/compliance.
- [ ] Update the design system changelog with any new tokens/components.
- [ ] Confirm every item in `context/30-special-topics/UI-BEST-PRACTICES/UI-NON-NEGOTIABLES.md` is satisfied; link the filled checklist in `docs/08-build-plan/ui-compliance.md`.

---

**Total**: [X] tasks
**Estimated Completion**: [DATE]

## Product Owner Handoffs
- Stakeholder Brief: `docs/06-pdr/stakeholder-brief.md`
- KPI Dashboard: `docs/06-pdr/po-dashboard.md` (run `pnpm po:report` before handoff)
- Acceptance Bundle: `docs/03-features/acceptance-bundle.md`
- Comms Log Summary: `docs/client-ops/comms-log.md`
- Risk Register: `docs/client-ops/risk-register.md`
- Revenue Plan: `docs/06-pdr/revenue-plan.md`
- Gamification Plan: `docs/03-features/gamification.md`

> Update these artifacts before notifying implementation teams; link them in `docs/08-build-plan/handoff-notes.md`.
