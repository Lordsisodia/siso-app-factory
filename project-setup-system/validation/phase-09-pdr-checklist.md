# Phase 9: PDR (Product Definition & Requirements) - Verification Checklist

## Overview

**Phase Objective**: Create comprehensive, gold-standard Product Definition & Requirements document that consolidates all planning phases into a single authoritative source.

**Key Deliverable**: `docs/06-pdr/PDR.md` (minimum 10 pages recommended)

**Pass Threshold**: ≥ 90% (18/20 criteria minimum) - **Highest threshold because PDR is the final deliverable**

**Why PDR Quality Matters**:
- Serves as contract with stakeholders (what we're building)
- Used by developers during implementation (must be clear and complete)
- Referenced during QA and testing (defines success criteria)
- Shared with investors/customers (must be professional)

---

## SECTION COMPLETENESS

### Criterion 1: Press Release Complete (Amazon PRFAQ Style)

**Description**: Customer-centric press release that starts with the "why" and customer benefit.

**How to Verify**:
- [ ] Headline: One-sentence customer benefit
- [ ] Opening paragraph: Who, what, when, where, problem solved
- [ ] Customer quote: Emotional, specific pain point and solution
- [ ] Key features list: 3-5 features with customer benefits (not technical jargon)
- [ ] Executive quote: Why we built this
- [ ] Call-to-action: Availability date, URL, pricing
- [ ] Internal FAQ: 5+ Q&A pairs answering key questions

**Evidence Required**:
```
## Press Release

**FOR IMMEDIATE RELEASE**

**TableMaster Launches: Indonesian Diners Book Restaurants in 30 Seconds**

Jakarta, April 2025 - SISO today announced TableMaster, a modern reservation platform
that eliminates the frustration of phone-only bookings for Indonesia's top restaurants.

"I used to spend 15 minutes calling restaurants during lunch break, often getting
busy signals. Now I book in 30 seconds on my phone," said Maya Putri, Jakarta professional.

The platform enables diners to:
- Browse real-time availability across 200+ restaurants
- Book instantly without phone calls or language barriers
- Manage reservations from a single app

[... complete press release ...]

### Press Release FAQ
Q1: Why did we build this?
A: 45% of Indonesian restaurant bookings still happen by phone, wasting 15 min average per booking.

Q2: Who is this for?
A: Urban professionals in Jakarta, Bali, Surabaya who dine out 2-4 times per week.

[... 5+ Q&A pairs ...]
```

**Pass Criteria**: All 7 checkboxes ✅, press release sounds like it's launching TODAY

**Common Failures**:
- ❌ Generic press release ("We're excited to announce...")
- ❌ No customer quote (lacks emotional resonance)
- ❌ Technical jargon instead of customer benefits
- ❌ Missing FAQ (no depth)

---

### Criterion 2: Assumptions Documented

**Description**: All assumptions (technical, business, user, regulatory) explicitly stated.

**How to Verify**:
- [ ] Technical assumptions (10+ items): Infrastructure, integrations, performance
- [ ] Business assumptions (10+ items): Market size, pricing, competition
- [ ] User assumptions (5+ items): Devices, behavior, preferences
- [ ] Regulatory assumptions (3+ items): Laws, compliance, accessibility
- [ ] Each assumption is testable/measurable

**Evidence Required**:
```
## Assumptions

### Technical Assumptions
- [ ] Supabase can handle 10K concurrent users per tenant without degradation
- [ ] Clerk webhook latency < 200ms at scale
- [ ] Stripe supports Indonesian payment methods (GoPay, Dana, OVO)
- [ ] Database queries with RLS < 100ms for p95
- [ ] Edge Functions handle 1K req/sec
- [ ] Component library covers 85%+ UI needs
- [ ] Next.js 15 app router stable for production
- [ ] Vercel can auto-scale to handle traffic spikes
- [ ] Email deliverability > 98% (SendGrid)
- [ ] Third-party APIs have 99.9% uptime SLAs
[... 10+ technical assumptions ...]

### Business Assumptions
- [ ] Indonesian restaurant market grows 15% YoY
- [ ] 60% of diners prefer online booking over phone
- [ ] Restaurants pay Rp 299K/month for booking software
- [ ] Restaurant staff learn system in < 30 minutes
- [ ] Can acquire customers at $25 CAC
- [ ] Churn rate < 5% monthly
- [ ] No major competitor launch in next 6 months
- [ ] 80% of bookings are 1-4 people (not large groups)
- [ ] Average 20 bookings/month per restaurant
- [ ] Commission model not viable (restaurants won't pay per booking)
[... 10+ business assumptions ...]

### User Assumptions
- [ ] Users have smartphones with internet (4G/WiFi)
- [ ] 68% prefer e-wallets over credit cards
- [ ] Users comfortable with online payments
- [ ] English/Indonesian UI sufficient (no Javanese, Sundanese initially)
- [ ] Users book 2-7 days in advance (not same-day majority)
[... 5+ user assumptions ...]

### Regulatory Assumptions
- [ ] No major regulatory changes in 2025
- [ ] Indonesia PDP Law compliance via GDPR approach sufficient
- [ ] PCI-DSS via Stripe delegation acceptable
- [ ] WCAG 2.1 AA recommended but not legally required yet
[... 3+ regulatory assumptions ...]
```

**Pass Criteria**: 28+ total assumptions (10+10+5+3) with checkboxes

**Common Failures**:
- ❌ Too few assumptions (<10 total)
- ❌ Vague assumptions ("System will scale") - not measurable
- ❌ Missing entire categories (no user assumptions, no regulatory)

---

### Criterion 3: Non-Goals Explicitly Stated

**Description**: Clear list of what we're NOT building to prevent scope creep.

**How to Verify**:
- [ ] Explicitly NOT building (MVP): 10+ features clearly marked ❌
- [ ] Future consideration (Phase 2+): 5+ features marked 🔮
- [ ] Never building (permanent out-of-scope): 3+ features marked 🚫
- [ ] Each non-goal has a reason WHY it's out of scope

**Evidence Required**:
```
## Non-Goals (Out of Scope)

### Explicitly NOT Building (MVP)
❌ **Food delivery/takeout ordering** - Reason: Different business model, requires logistics
❌ **Payment processing for meals** - Reason: Only reservation deposits in scope
❌ **Restaurant POS integration** - Reason: Too complex for MVP, manual confirmation ok
❌ **Waitlist management** - Reason: Fixed-time reservations only initially
❌ **Customer loyalty programs** - Reason: Nice-to-have, not core booking flow
❌ **Multi-language beyond EN/ID** - Reason: Covers 95% of users, others can use translate
❌ **Table layout visualization** - Reason: Not critical to booking success
❌ **Review/rating system** - Reason: Not competing with Google/TripAdvisor
❌ **Group bookings >10 people** - Reason: <5% of bookings, edge case
❌ **Restaurant analytics dashboard** - Reason: Phase 2 feature, basic reports ok for MVP
[... 10+ items ...]

### Future Consideration (Phase 2+)
🔮 **Table layout visualization** (Phase 2, Weeks 13-16)
🔮 **WhatsApp booking bot** (Phase 2, Weeks 17-20)
🔮 **Advanced analytics** (Phase 3, Months 7-9)
🔮 **Google Calendar sync** (Phase 3)
🔮 **Multi-location management for chains** (Phase 3)
[... 5+ items ...]

### Never Building
🚫 **Restaurant review platform** - Reason: Google/TripAdvisor own this space
🚫 **Restaurant supply chain** - Reason: Completely different business
🚫 **Catering/event management** - Reason: Separate product line
[... 3+ items ...]
```

**Pass Criteria**: 18+ total (10 ❌ + 5 🔮 + 3 🚫) with reasons

**Common Failures**:
- ❌ No non-goals section (everything is in scope?)
- ❌ Too few non-goals (<5 total) - unrealistic
- ❌ No reasons given (just list of features)

---

### Criterion 4: Open Questions & Risks Documented

**Description**: Honest list of unknowns with research plans and risk mitigation.

**How to Verify**:
- [ ] Open product questions (5+ questions with research plan & deadline)
- [ ] Open technical questions (3+ questions with POC plan & fallback)
- [ ] High-impact risks table (5+ risks with likelihood, impact, mitigation)
- [ ] Technical risks table (3+ risks with mitigation)
- [ ] Business/market risks table (3+ risks with mitigation)

**Evidence Required**:
```
## Open Questions

**Q1: Should we support group bookings (>10 people) differently?**
- Context: Large groups may need different flow (special requests, deposits)
- Research: Interview 5 restaurants with group booking experience
- Decision Owner: PM
- Decision Deadline: Week 2
- Impact if Wrong: Poor UX for 5% of bookings

**Q2: What's optimal pricing tier structure?**
- Context: Unclear if per-booking or flat monthly better
- Research: Survey 20 potential restaurant customers
- Decision Owner: CEO
- Decision Deadline: Week 4
- Impact if Wrong: Wrong pricing = low adoption or revenue

[... 5+ product questions ...]

**T1: Can Supabase Edge Functions handle real-time availability at scale?**
- Action: Build POC with 1000 concurrent requests
- Fallback: Use polling instead of real-time WebSockets
- Decision Deadline: Week 1

[... 3+ technical questions ...]

## Known Risks

### High-Impact Risks
| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|------------|-------|
| Low restaurant adoption | Medium | High | Free tier + onboarding training | Sales |
| Stripe lacks Indonesian wallets | Low | High | Add Xendit backup gateway | Tech Lead |
| Users abandon if deposit required | High | Medium | Make deposits optional, A/B test | PM |
| Competitor launches similar | Medium | Medium | Focus on superior UX | CEO |
| Market size overestimated | Medium | High | Start Jakarta only, validate first | CEO |
[... 5+ risks ...]

### Technical Risks
| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|------------|-------|
| RLS performance degrades | Low | High | Monitor queries, add indexes proactively | Backend |
| Email deliverability issues | Medium | Medium | SendGrid + SMS fallback | DevOps |
| API rate limits hit | Medium | Medium | Caching, queue non-urgent calls | Backend |
[... 3+ technical risks ...]

### Business/Market Risks
| Risk | Likelihood | Impact | Mitigation | Owner |
|------|-----------|--------|------------|-------|
| CAC too high | Medium | High | Organic growth via referrals | Marketing |
| Pricing model wrong | Medium | Medium | Survey customers, flexible tiers | PM |
| Regulatory changes | Low | High | Monitor PDP Law, GDPR-compliant by default | Legal |
[... 3+ business risks ...]
```

**Pass Criteria**: 8+ questions + 11+ risks (5+3+3) with details

**Common Failures**:
- ❌ No open questions (overconfident, unrealistic)
- ❌ Risks without mitigation (identified but not addressed)
- ❌ Vague risks ("something might go wrong")

---

### Criterion 5: Alternatives Considered Documented

**Description**: WHY we chose our approach over alternatives (architectural decisions).

**How to Verify**:
- [ ] Tech stack alternatives (3+ alternatives with pros/cons/decision)
- [ ] Architecture alternatives (2+ alternatives with rationale)
- [ ] Feature approach alternatives (2+ alternatives)
- [ ] Each alternative has: Pros (3+), Cons (3+), Decision rationale

**Evidence Required**:
```
## Alternatives Considered

### Tech Stack Alternatives

#### Alternative 1: Firebase instead of Supabase
**Pros**:
- More mature, larger community
- Better real-time database
- Google Cloud integration

**Cons**:
- 10x more expensive at scale (100K users)
- Vendor lock-in (harder to migrate off Google)
- No Postgres (we need relational joins for multi-tenant)

**Decision**: ✅ Chose Supabase for cost + Postgres + open-source

---

#### Alternative 2: Build custom auth instead of Clerk
**Pros**:
- Full control over auth logic
- No monthly recurring cost

**Cons**:
- 3-4 weeks additional dev time
- Security risks (not auth experts)
- Ongoing maintenance burden

**Decision**: ✅ Chose Clerk for speed + security

[... 3+ tech stack alternatives ...]

### Architecture Alternatives

#### Multi-Instance (Separate DB per Tenant) vs Shared DB with RLS
**Multi-Instance Pros**:
- True data isolation
- Easier to scale huge tenants

**Multi-Instance Cons**:
- 100 tenants = 100 DBs ($5K/month infrastructure)
- Complex provisioning
- Harder cross-tenant analytics

**Decision**: ✅ Chose shared DB with RLS for simplicity at MVP scale (<100 tenants)
**Revisit Criteria**: If we reach 50+ tenants or see performance issues

[... 2+ architecture alternatives ...]

### Feature Alternatives

#### Email vs SMS vs Both for confirmations
**Options**: A) Email only, B) SMS only, C) Both (user chooses)

**Decision**: ✅ Option C (both, user preference)
**Rationale**:
- SMS has 95% open rate in Indonesia (vs 20% email)
- Email preferred by business users for records
- Marginal cost ($0.01 SMS vs $0.001 email)

[... 2+ feature alternatives ...]
```

**Pass Criteria**: 7+ alternatives (3+2+2) with full pros/cons/decision

**Common Failures**:
- ❌ No alternatives considered (didn't explore options)
- ❌ Strawman alternatives (obviously bad options to make choice look good)
- ❌ Missing rationale (decision unclear)

---

## CONTENT QUALITY

### Criterion 6: Executive Summary Clear & Concise

**Description**: 2-3 paragraph summary that busy executives can read in 2 minutes.

**How to Verify**:
- [ ] Length: 2-3 paragraphs (200-400 words)
- [ ] Answers: What problem? For whom? How solved? Why us? Success metrics?
- [ ] Readable by non-technical stakeholders
- [ ] Compelling (makes reader want to continue)

**Evidence Required**:
Summary covers:
- Problem statement with quantified impact
- Solution overview
- Target users
- Key differentiators
- Success metrics (12-month targets)

**Pass Criteria**: All 4 checkboxes ✅

**Common Failures**:
- ❌ Too long (>500 words, not a summary)
- ❌ Too vague ("We're building a restaurant app")
- ❌ Too technical (full of jargon)

---

### Criterion 7: Features Comprehensively Documented

**Description**: All features from Phase 3 included with user stories and success criteria.

**How to Verify**:
- [ ] MVP features table: 20-30 features (Must-Have tier)
- [ ] Each feature has: User story ("As a [user], I want [action] so that [benefit]")
- [ ] Each feature has: Success criteria (measurable outcome)
- [ ] Post-MVP features documented (Should-Have, Nice-to-Have tiers)
- [ ] Unique differentiators highlighted

**Evidence Required**:
```
## Core Features Summary

### MVP Features (Must-Have)

| Feature | User Story | Success Criteria |
|---------|-----------|------------------|
| Real-time Search | As a diner, I want to search restaurants by name, cuisine, or location so that I find options quickly | Search returns results in <500ms, 95% relevance |
| Availability Calendar | As a diner, I want to see which dates/times are available so that I don't waste time requesting unavailable slots | Calendar loads in <1s, shows accurate availability |
[... 20-30 MVP features ...]

### Post-MVP Features (Phase 2)

| Feature | User Story | Timeline |
|---------|-----------|----------|
| Table Layout | As a diner, I want to select my preferred table location so that I can choose ambiance | Week 13-16 |
[... 10+ Phase 2 features ...]

### Unique Differentiators

| Feature | Competitive Advantage | Risk |
|---------|----------------------|------|
| Indonesian E-Wallet Support | Only solution with native GoPay/Dana/OVO | Low - Stripe + Xendit support confirmed |
| Multi-Tenant White-Label | Restaurants can brand as their own | Medium - Need good onboarding |
[... 3-5 differentiators ...]
```

**Pass Criteria**: 20+ MVP features + 10+ post-MVP + user stories

**Common Failures**:
- ❌ Feature list without user stories (no context)
- ❌ Too few features (<15 MVP)
- ❌ No success criteria (can't measure)

---

### Criterion 8: Architecture Summary Clear

**Description**: High-level architecture that developers can understand and stakeholders can follow.

**How to Verify**:
- [ ] Architecture diagram included (C4, Mermaid, or similar)
- [ ] Key architectural decisions documented (multi-tenancy, auth, data storage)
- [ ] Tech stack table with rationale for each choice
- [ ] Domain architecture: 10-20 domains listed with responsibilities
- [ ] Data architecture summary: Table count, RLS approach, indexing strategy

**Evidence Required**:
- Mermaid diagram showing: Frontend → Backend → Database → Integrations
- Tech stack table: Next.js (why?), Supabase (why?), Clerk (why?), etc.
- Domain list: User Management, Restaurant Management, Booking, Availability, Payments, Notifications
- Data summary: 25 tables, shared DB with RLS, foreign keys enforced, migrations planned

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ No diagram (text only)
- ❌ Vague ("We'll use modern tech stack")
- ❌ No rationale for choices

---

### Criterion 9: Multi-Tenancy & Cost Model Documented

**Description**: How does multi-tenancy work? What's the cost structure?

**How to Verify**:
- [ ] Multi-tenancy model explained (shared DB vs separate DB, RLS policies)
- [ ] Tenant onboarding flow (8 steps documented)
- [ ] Tenant limits defined (free vs pro vs enterprise tiers)
- [ ] Infrastructure cost breakdown (per 100 tenants)
- [ ] Revenue model with pricing tiers
- [ ] Unit economics calculated (gross margin per tenant)
- [ ] Break-even analysis (how many tenants to profitability)

**Evidence Required**:
```
## Multi-Tenancy Model

Architecture: Shared Database with Row-Level Security (RLS)
- Tenant isolation: `tenant_id` column on all tables
- RLS policies enforce data boundaries
- Domain: `[slug].tablemaster.id` per restaurant

Tenant Onboarding (8 steps):
1. Sign up → Email verification
2. Create tenant record
3. Assign subdomain
4. Upload logo, select colors
5. Set hours, capacity
6. Import initial data (optional)
7. 1-hour onboarding call (optional)
8. Go live

Pricing Tiers:
| Tier | Price/Month | Bookings | Staff | Target |
|------|------------|----------|-------|--------|
| Free | $0 | 100 | 2 | Small cafes |
| Starter | Rp 299K | 500 | 5 | Small restaurants |
| Pro | Rp 599K | 2K | 15 | Medium restaurants |
| Enterprise | Custom | Unlimited | Unlimited | Chains |

Infrastructure Cost (per 100 tenants): $135/month ($1.35/tenant)
Revenue (Pro tier avg): Rp 599K = $40/month
Gross Margin: 90% ($36.65 profit per tenant)
Break-Even: 140 paying tenants (achievable Month 6)
```

**Pass Criteria**: All 7 checkboxes ✅ with specific numbers

**Common Failures**:
- ❌ Multi-tenancy model unclear
- ❌ No cost breakdown (can't evaluate profitability)
- ❌ No break-even analysis

---

### Criterion 10: Security & Compliance Comprehensive

**Description**: Security model, data privacy, and compliance requirements.

**How to Verify**:
- [ ] Authentication & authorization model (RBAC with 4+ roles)
- [ ] GDPR compliance checklist (6 requirements)
- [ ] Data encryption (at rest + in transit)
- [ ] PCI-DSS compliance approach (if payments)
- [ ] WCAG 2.1 accessibility plan (Level AA)
- [ ] API security (rate limiting, validation, CORS)
- [ ] Incident response plan mentioned

**Evidence Required**:
```
## Security & Compliance

### Authentication
Provider: Clerk
Methods: Email/password, OAuth (Google, Facebook), Magic links, SMS OTP
MFA: Optional for users, required for admin roles

### Authorization (RBAC)
| Role | Permissions | Scope |
|------|-------------|-------|
| Super Admin | Full system access | Global |
| Restaurant Admin | Manage restaurant, bookings, staff | Single tenant |
| Restaurant Staff | View bookings, update status | Single tenant |
| Customer | Create bookings, view own bookings | Own data only |

### GDPR Compliance
- ✅ Right to access (data export)
- ✅ Right to erasure (account deletion)
- ✅ Right to rectification (user can edit)
- ✅ Data portability (JSON export)
- ✅ Consent management (cookie banner, privacy policy)
- ✅ Data retention: 2 years

### Data Encryption
- At Rest: Database encryption (Supabase native)
- In Transit: HTTPS/TLS 1.3
- Sensitive Fields: PII encrypted at app layer

### PCI-DSS
- Stripe delegation (PCI-certified payment processor)
- No credit card data stored in our database

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation, screen reader support, 4.5:1 contrast

### API Security
- Rate limiting: 100 req/min per IP
- Auth required for all non-public endpoints
- Input validation (SQL injection prevention)
- CORS: Whitelist approved domains only
```

**Pass Criteria**: All 7 checkboxes ✅

**Common Failures**:
- ❌ "We'll be secure" (too vague)
- ❌ Missing GDPR (required in many markets)
- ❌ No accessibility plan

---

## COMPLETENESS

### Criterion 11: All 13 Main Sections Present

**Description**: PDR template has 13 required sections, all must be present and complete.

**How to Verify**:
- [ ] 1. Press Release ✅
- [ ] 2. Assumptions ✅
- [ ] 3. Non-Goals ✅
- [ ] 4. Executive Summary & Vision ✅
- [ ] 5. Open Questions & Risks ✅
- [ ] 6. Alternatives Considered ✅
- [ ] 7. Core Features Summary ✅
- [ ] 8. Architecture Summary ✅
- [ ] 9. Multi-Tenancy & Cost Strategy ✅
- [ ] 10. Security & Compliance ✅
- [ ] 11. Operational Playbook ✅
- [ ] 12. Roadmap & Timeline ✅
- [ ] 13. Appendices (Glossary, References, Revision History) ✅

**Evidence Required**:
Table of contents shows all 13 sections, each section has substantial content (not just "TBD")

**Pass Criteria**: All 13 sections present with content

**Common Failures**:
- ❌ Missing sections (e.g., no Press Release, no Assumptions)
- ❌ Placeholder sections ("[TBD]" or "Coming soon")

---

### Criterion 12: No [TBD] Placeholders

**Description**: PDR must be complete, no missing information.

**How to Verify**:
- [ ] Search document for "[TBD]" → 0 results
- [ ] Search for "[TODO]" → 0 results
- [ ] Search for "..." (ellipsis indicating incomplete) → Only in examples, not in actual content
- [ ] All tables fully filled out (no empty cells)
- [ ] All questions answered (no "Will decide later")

**Evidence Required**:
```bash
# Run these searches:
grep -i "TBD" PDR.md    # Should return 0 matches
grep -i "TODO" PDR.md   # Should return 0 matches
grep "\.\.\.\"" PDR.md  # Should only match example quotes, not content

# Check for incomplete tables
# Visual inspection: All table cells have content
```

**Pass Criteria**: 0 TBD/TODO, all content complete

**Common Failures**:
- ❌ "Pricing: [TBD]" (not decided yet)
- ❌ "Timeline: TODO" (incomplete)
- ❌ Half-empty tables

---

### Criterion 13: Operational Playbook Included

**Description**: How to provision, monitor, backup, and support the system.

**How to Verify**:
- [ ] Tenant onboarding/provisioning process (step-by-step)
- [ ] Monitoring & alerts setup (uptime, errors, performance)
- [ ] Backup & disaster recovery plan (RTO, RPO, backup frequency)
- [ ] Support tiers defined (response times, channels)
- [ ] Maintenance windows defined
- [ ] Runbooks referenced (deployment, scaling, incident response)

**Evidence Required**:
```
## Operational Playbook

### Provisioning
[8-step tenant onboarding flow documented]

### Monitoring
- Uptime: Vercel built-in (99.9% SLA)
- Errors: Sentry for client-side
- Performance: Vercel Analytics for Web Vitals
- Database: Supabase dashboard for query performance

Alerts:
- Error rate > 1% for 5 min → Alert engineer
- DB CPU > 80% for 10 min → Scale database
- API p95 > 1s → Investigate

### Backup & DR
- Frequency: Daily automated backups (Supabase)
- Retention: 7 days (Pro), 30 days (Enterprise)
- RTO: 4 hours
- RPO: 24 hours (max 1 day data loss)
- Failover: Vercel auto-failover to backup region

### Support Tiers
| Tier | Response Time | Channels |
|------|--------------|----------|
| Free | 48 hours | Email |
| Starter | 24 hours | Email, chat |
| Pro | 4 hours | Email, chat, phone |
| Enterprise | 1 hour | Dedicated Slack, 24/7 |

### Maintenance
- Window: Sundays 2am-4am
- Notice: 48-hour advance email
- Emergency patches: Immediate if security-critical
```

**Pass Criteria**: All 6 checkboxes ✅

**Common Failures**:
- ❌ No operational plan (how do we run this?)
- ❌ Missing backup/DR (what if database fails?)
- ❌ No support tiers (how do we help customers?)

---

### Criterion 14: Roadmap & Timeline Clear

**Description**: 12-week MVP timeline + post-MVP roadmap.

**How to Verify**:
- [ ] MVP timeline: 7 implementation phases documented (Provisioning, Repo, DB, Infrastructure, Domains, Data, QA, Demo)
- [ ] Each phase has: Week number, tasks, deliverables
- [ ] Post-MVP roadmap: Phase 2 (Weeks 13-24), Phase 3 (Months 7-12)
- [ ] Milestones with success criteria (MVP launch, 50 customers, break-even, PMF)
- [ ] Long-term vision (Year 2+)

**Evidence Required**:
```
## Roadmap & Timeline

### MVP Timeline (12 Weeks)

Phase 0: Provisioning (Week 1)
- Set up Vercel, Supabase, Clerk, Stripe, GitHub
- Deliverable: All accounts created, keys configured

Phase 1: Repository (Week 1-2)
- Initialize Next.js 15, Tailwind, component library
- Deliverable: Dev environment running

[... all 7 phases ...]

Phase 6: QA (Week 11-12)
- User acceptance testing, bug fixes
- Deliverable: Production-ready app

Phase 7: Demo & Handoff (Week 12)
- Stakeholder demo, deploy to production
- Deliverable: Live app

### Post-MVP Roadmap

Phase 2 (Weeks 13-24):
- Table layout visualization
- WhatsApp booking bot
- Advanced analytics

Phase 3 (Months 7-12):
- AI recommendations
- Multi-location management

### Milestones

| Milestone | Date | Success Criteria |
|-----------|------|------------------|
| MVP Launch | Week 12 | 10 beta restaurants |
| 50 Customers | Month 4 | $2K MRR |
| Break-Even | Month 6 | 140 tenants, $5.6K MRR |
| PMF | Month 9 | NPS > 50, Churn < 5% |

### Long-Term (Year 2+)
- Expand to Thailand, Vietnam, Philippines
- White-label for hotel booking
```

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ Vague timeline ("MVP in 3 months")
- ❌ No phase breakdown
- ❌ Missing post-MVP roadmap

---

## QUALITY & PROFESSIONALISM

### Criterion 15: Document Well-Structured

**Description**: Professional formatting, clear organization, easy to navigate.

**How to Verify**:
- [ ] Table of contents (with section numbers or links)
- [ ] Consistent heading hierarchy (H1 → H2 → H3)
- [ ] Tables, bullet points, diagrams used (not wall of text)
- [ ] Document metadata (version, date, owner, status)
- [ ] Appendices included (glossary, references, revision history)

**Evidence Required**:
```
# Product Definition & Requirements

## Document Control
| Field | Value |
|-------|-------|
| Project Name | TableMaster |
| Version | 1.0 |
| Last Updated | 2025-04-15 |
| Owner | Product Team |
| Status | Approved |

## Table of Contents
1. Press Release
2. Executive Summary
3. Assumptions
4. Non-Goals
5. Open Questions & Risks
[... all 13 sections ...]

[Document uses consistent H2 for main sections, H3 for subsections]
[Tables for comparisons, bullet lists for features]
[Mermaid diagrams for architecture]

## Appendices
### Appendix A: Glossary
- RLS: Row-Level Security
- Tenant: Single restaurant using platform
[...]

### Appendix B: References
- Phase 1 Research: docs/01-research/research-summary.md
- Feature Matrix: docs/03-features/features.md
[...]

### Appendix C: Revision History
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-04-15 | Initial PDR |
```

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ No table of contents (hard to navigate)
- ❌ Inconsistent formatting
- ❌ No document metadata (who owns this? when was it updated?)

---

### Criterion 16: Writing Clear & Concise

**Description**: Professional, readable, free of jargon and errors.

**How to Verify**:
- [ ] Grammar and spelling correct (run spellcheck)
- [ ] Sentences clear (avg < 20 words/sentence)
- [ ] Jargon explained or avoided
- [ ] Consistent terminology (e.g., "booking" vs "reservation" - pick one)
- [ ] Active voice preferred ("We will build" vs "It will be built")

**Evidence Required**:
- Run spellcheck: 0 errors
- Jargon check: Technical terms defined in glossary
- Terminology consistency: Search for "reservation" if using "booking" → replace all

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ Typos, grammar errors (looks unprofessional)
- ❌ Overly complex sentences (hard to understand)
- ❌ Undefined acronyms (RLS, WCAG, etc. without explanation)

---

### Criterion 17: References Complete

**Description**: All prior phase documents referenced correctly.

**How to Verify**:
- [ ] Phase 1 research summary referenced
- [ ] Phase 2 competitor analysis referenced
- [ ] Phase 3 feature list referenced
- [ ] Phase 4 architecture docs referenced
- [ ] Phase 4.5 UI/UX design docs referenced
- [ ] Phase 5 component catalog referenced
- [ ] Phase 6 domain operations referenced
- [ ] Phase 7 database schema referenced
- [ ] Phase 8 build plan referenced

**Evidence Required**:
```
## Appendix B: References

### Planning Phase Documents
- Industry Research: docs/01-research/research-summary.md
- Competitor Analysis: docs/02-competitor-analysis/feature-matrix.md
- Features: docs/03-features/features.md
- Architecture: docs/05-technical/architecture.md
- UI/UX Design: docs/04.5-ui-design/user-flows.md, wireframes.md, design-system.md
- Components: docs/05-technical/component-catalog.md
- Domain Operations: docs/05-technical/domain-operations.md
- Database Schema: docs/05-technical/schema-spec.md
- Build Plan: docs/08-build-plan/master-checklist.md

### External Sources
- Statista Indonesia Report 2024
- McKinsey SEA Consumer Survey 2024
[... all research sources ...]
```

**Pass Criteria**: 9/9 phases referenced

**Common Failures**:
- ❌ No references (can't verify claims)
- ❌ Missing phase references (PDR should consolidate all phases)

---

### Criterion 18: Stakeholder-Ready

**Description**: PDR can be shared with stakeholders, investors, customers without modification.

**How to Verify**:
- [ ] No internal-only information (no "secret" roadmap items, no employee names unless appropriate)
- [ ] Professional tone (no casual language like "pretty cool feature")
- [ ] Visually appealing (use of tables, diagrams, formatting)
- [ ] Confident but honest (acknowledge risks, don't oversell)
- [ ] Approvals documented (decision maker signed off)

**Evidence Required**:
- Read-through test: Would you send this to an investor? (Yes → Pass)
- Tone check: No "lol", "btw", "kinda", etc.
- Visual check: Diagrams, tables break up text
- Honesty check: Risks acknowledged, not hidden

Document includes approval section:
```
## Document Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [Name] | 2025-04-15 | ✅ Approved |
| Tech Lead | [Name] | 2025-04-15 | ✅ Approved |
| Stakeholder | [Name] | 2025-04-16 | ✅ Approved |
```

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ Too casual ("This app is gonna be sick!")
- ❌ Internal jargon (employee names, project codenames)
- ❌ Overpromising (no risk acknowledgment)

---

## COMPLETENESS CHECK

### Criterion 19: Buildable by Developers

**Description**: Developers can start implementing based on this PDR alone.

**How to Verify**:
- [ ] All features defined with acceptance criteria
- [ ] Architecture clear (developers know which tech to use)
- [ ] Database schema referenced (developers know data model)
- [ ] Component catalog referenced (developers know UI components)
- [ ] Build plan referenced (developers know order of implementation)
- [ ] No critical decisions left unmade (e.g., "TBD: Choose payment gateway")

**Evidence Required**:
Test: Give PDR to a developer unfamiliar with the project
- Can they answer: "What am I building?" ✅
- Can they answer: "What tech stack?" ✅
- Can they answer: "What features in MVP?" ✅
- Can they answer: "What does success look like?" ✅
- Can they start coding without asking 10 questions? ✅

**Pass Criteria**: All 6 checkboxes ✅

**Common Failures**:
- ❌ Too high-level (developers need to guess implementation)
- ❌ Missing technical details (no tech stack, no schema)
- ❌ Undefined features (vague requirements)

---

### Criterion 20: Testable & Measurable

**Description**: QA can create test plans, stakeholders can measure success.

**How to Verify**:
- [ ] Each feature has success criteria (measurable)
- [ ] Acceptance criteria defined (how to know if feature works)
- [ ] Performance targets stated (page load < 2s, API < 500ms)
- [ ] Success metrics defined (50 customers, 5% churn, NPS > 50)
- [ ] Non-functional requirements clear (accessibility, security, scalability)

**Evidence Required**:
```
## Success Criteria Examples

Feature: Restaurant Search
- Success Criteria: Results return in < 500ms, 95% relevance

Feature: Booking Confirmation
- Success Criteria: Email sent within 30s of booking, 98% deliverability

Performance Targets:
- Page load time: < 2s (Lighthouse score > 90)
- API response time: < 500ms (p95)
- Database queries: < 100ms (p95)

Business Metrics (12 months):
- 500 paying tenants
- $20K MRR
- NPS > 50
- Churn < 5%/month
```

**Pass Criteria**: All 5 checkboxes ✅

**Common Failures**:
- ❌ Vague success ("Feature works well")
- ❌ No performance targets (how fast is fast enough?)
- ❌ No business metrics (how do we know if we succeeded?)

---

## Scoring

### Calculation
```
Score = (Criteria Passed / 20) × 100%
```

### Pass/Fail Thresholds

| Score | Decision | Action |
|-------|----------|--------|
| 95-100% (19-20/20) | EXCELLENT | Proceed immediately, celebrate! |
| 90-94% (18/20) | PASS | Proceed to implementation |
| 80-89% (16-17/20) | RETRY | Fix gaps, PDR is foundation for all work |
| < 80% (< 16/20) | FAIL | Major rework, PDR not ready |

**Highest threshold (90%) because PDR is the final deliverable that consolidates all 8 previous phases.**

### Critical Criteria (Must Pass)

Even if overall score is 90%, failing these means RETRY:

- ✅ Criterion 1: Press Release complete
- ✅ Criterion 7: Features comprehensively documented
- ✅ Criterion 11: All 13 sections present
- ✅ Criterion 12: No [TBD] placeholders
- ✅ Criterion 19: Buildable by developers

**Rationale**: Without these, PDR is incomplete and cannot serve as foundation for implementation.

---

## Integration with LangFuse

```javascript
const verification = trace.span({
  name: 'Verification: Phase 9 - PDR',
  input: { phase: 9, criteria: 20, finalDeliverable: true }
});

const results = {
  passed: 19,
  failed: 1,
  score: 19/20,
  criticalPassed: true,
  ready_for_implementation: true,
  checks: [
    { criterion: 'Press Release complete', result: 'PASS', evidence: 'Customer quote, FAQ included' },
    { criterion: 'Assumptions documented', result: 'PASS', evidence: '32 assumptions (10+10+7+5)' },
    // ... all 20 criteria ...
  ]
};

verification.end({
  output: results,
  level: results.score >= 0.9 ? 'DEFAULT' : 'WARNING'
});

// If PDR passes, mark entire planning phase complete
if (results.ready_for_implementation) {
  trace.update({
    output: { phase: 'PLANNING_COMPLETE', ready_to_build: true },
    tags: ['pdr-approved', 'ready-for-dev']
  });
}
```

---

*Last updated: 2025-10-21*
*Version: 1.0*
*Note: PDR is the final planning deliverable - highest quality threshold applied.*
