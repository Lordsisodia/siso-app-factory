# Product Definition & Requirements (PDR)

## Document Control

| Field | Value |
|-------|-------|
| **Project Name** | [Product Name] |
| **Document Version** | 1.0 |
| **Last Updated** | [Date] |
| **Document Owner** | [Name/Team] |
| **Status** | Draft / Review / Approved |
| **Reviewers** | [Names] |

---

## Press Release (Amazon PRFAQ Style)

> **Purpose**: Start with the customer experience. Write the press release FIRST, before building anything. This forces customer-centric thinking and clarifies the "why" behind every feature.

**FOR IMMEDIATE RELEASE**

### [Product Name] Launches: [One-Sentence Customer Benefit]

**[City, Date]** - [Company Name] today announced [Product Name], a [category-defining description] that [solves what problem for whom].

"[Quote from a real or representative customer explaining their pain point and how this product solves it. Make it emotional and specific.]" said [Customer Name], [Customer Title] at [Customer Company].

The product enables customers to [key benefit #1], [key benefit #2], and [key benefit #3], all without [the old painful way of doing things].

Key features include:
- **[Feature 1]**: [One-sentence customer benefit]
- **[Feature 2]**: [One-sentence customer benefit]
- **[Feature 3]**: [One-sentence customer benefit]

"[Quote from an executive or product leader about WHY we built this and what problem it solves in the market]," said [Executive Name], [Title] at [Company].

[Product Name] is available starting [Date] at [URL/pricing]. Customers can [call-to-action].

For more information, visit [URL] or contact [email].

### Press Release FAQ (Internal Context)

**Q: Why did we build this?**
A: [The root problem we observed in the market]

**Q: Who is this for?**
A: [Primary target customer segments and their characteristics]

**Q: What alternatives exist today?**
A: [Current solutions and why they fall short]

**Q: Why will customers choose us?**
A: [Our unique differentiation - be honest and specific]

**Q: What does success look like in 12 months?**
A: [Measurable customer outcomes and business metrics]

---

## 1. Executive Summary & Vision

### Vision Statement
[2-3 sentences describing the long-term vision. Where will this product be in 3-5 years? What transformation does it enable?]

### Problem Statement
**Current Situation:**
[What problem exists today? Be specific with data/examples.]

**Pain Points:**
- **[Segment 1]**: [Specific pain point with impact - e.g., "Restaurant owners lose 30% of potential bookings due to missed calls"]
- **[Segment 2]**: [Specific pain point]
- **[Segment 3]**: [Specific pain point]

**Quantified Impact:**
- [Metric 1]: e.g., "$2.3B lost annually in Indonesian restaurant industry due to inefficient booking"
- [Metric 2]: e.g., "Average 15 minutes per customer wasted on phone calls"

### Solution Overview
[High-level description of how this product solves the problem. 2-3 sentences.]

## Stakeholder Brief & Communication Plan

> Copy/adapt this section into `docs/06-pdr/stakeholder-brief.md` in the project workspace.

| Stakeholder | Role | Success Criteria | Cadence | Channel |
|-------------|------|------------------|---------|---------|
| [Name] | [Sponsor / Exec / PM] | [Metric/KPI they own] | [Weekly / Bi-weekly] | [Slack / Email / Video] |

- **Escalation Path**: [Scope → Timeline → Budget approvals]
- **Decision Log**: `docs/client-ops/comms-log.md`
- **Risk Register**: `docs/client-ops/risk-register.md`

## KPI Dashboard Summary

> Generate via `pnpm po:report` (writes to `docs/06-pdr/po-dashboard.md`). Paste highlights here and attach the full dashboard in the appendix.

| Metric | Target | Current | Δ | Owner | Notes |
|--------|--------|---------|---|-------|-------|
| Activation | 35% |  |  |  |  |
| Retention (30d) | 45% |  |  |  |  |
| NPS | +50 |  |  |  |  |
| Time-to-Value | < 10 min |  |  |  |  |
| Support Tickets / 1k users | < 5 |  |  |  |  |

**Narrative**:
- Highlights: 
- Risks/Blockers: 
- Upcoming decisions: 

## Revenue Plan

> Detail tiers + monetization strategy. Mirror `docs/03-features/revenue-strategy.md` and attach `docs/06-pdr/revenue-plan.md`.

| Tier | Price | Audience | Value Prop | KPIs |
|------|-------|----------|------------|------|
| Starter | $199/mo | Solo operators | Core automation | Activation, ARPU |
| Growth | $499/mo | Multi-location | Automation + analytics | Expansion MRR |
| Enterprise | Custom | Chains | SLAs, integrations | Pipeline value |

**ROI Narrative**: [Describe cost savings / revenue uplift]

### Target Users

| User Segment | Characteristics | Primary Goals |
|--------------|-----------------|---------------|
| [Segment 1] | [Demographics, behaviors] | [What they want to achieve] |
| [Segment 2] | [Demographics, behaviors] | [What they want to achieve] |
| [Segment 3] | [Demographics, behaviors] | [What they want to achieve] |

### Success Metrics (12 Months)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Active Users | [Number] | [How tracked] |
| Revenue | [Amount] | [How tracked] |
| Customer Satisfaction | [Score] | [Survey/NPS] |
| Core Feature Adoption | [%] | [Analytics] |
| [Custom Metric] | [Target] | [Method] |

---

## 2. Assumptions

> **Purpose**: Document what we're assuming to be true. If these assumptions are wrong, the plan may fail. This section protects against surprises and makes risks explicit.

### Technical Assumptions

**Infrastructure & Scalability:**
- [ ] Supabase can handle [X] concurrent users per tenant without performance degradation
- [ ] Clerk authentication webhook latency remains < 200ms at scale
- [ ] Database queries with RLS remain < 100ms for 95th percentile
- [ ] [Add other technical assumptions]

**Integration Assumptions:**
- [ ] Stripe supports all required Indonesian payment methods (GoPay, Dana, OVO, LinkAja)
- [ ] Third-party APIs have 99.9% uptime SLAs
- [ ] [Payment provider] provides webhook reliability of 99.5%+
- [ ] [Add other integration assumptions]

**Technology Stack:**
- [ ] Next.js 15 app router is stable for production use
- [ ] Supabase Edge Functions can handle [X] requests/second
- [ ] Component library covers 85%+ of UI needs
- [ ] [Add other stack assumptions]

### Business Assumptions

**Market & Demand:**
- [ ] [Target market] will grow by [X]% annually
- [ ] [X]% of target users prefer digital booking over phone/email
- [ ] Customers willing to pay [price point] per month
- [ ] No major competitors launch similar solution in next [X] months
- [ ] [Add other market assumptions]

**Customer Behavior:**
- [ ] Average booking frequency: [X] times per month
- [ ] [X]% of bookings completed without abandonment
- [ ] Users comfortable with [payment method/process]
- [ ] Acceptable onboarding time < [X] minutes
- [ ] [Add other behavior assumptions]

**Operational Assumptions:**
- [ ] Can acquire customers at $[X] CAC (Customer Acquisition Cost)
- [ ] Churn rate remains below [X]% monthly
- [ ] Support volume < [X] tickets per 100 users/month
- [ ] Can deploy updates without downtime using [method]
- [ ] [Add other operational assumptions]

### User Assumptions

**Access & Capabilities:**
- [ ] Users have smartphones with internet access (4G/WiFi)
- [ ] Users comfortable with online payments
- [ ] Users prefer [language 1] or [language 2] UI (no need for [language 3] initially)
- [ ] [Add other user capability assumptions]

**Preferences & Expectations:**
- [ ] Users expect response time < [X] seconds for booking confirmation
- [ ] Users will tolerate [X] seconds page load time
- [ ] Users prefer [notification method] for confirmations
- [ ] [Add other preference assumptions]

### Regulatory & Compliance Assumptions
- [ ] No major regulatory changes to [industry] in [region] in next 12 months
- [ ] Current GDPR/data privacy approach is sufficient
- [ ] PCI-DSS compliance via Stripe delegation is acceptable
- [ ] Accessibility (WCAG 2.1 AA) requirements remain stable
- [ ] [Add other regulatory assumptions]

## UI Non-Negotiables Reference

> The full checklist lives at `context/30-special-topics/UI-BEST-PRACTICES/UI-NON-NEGOTIABLES.md`. Link your project-specific tracking doc below and call out any intentional deviations.

- **Checklist URL**: [docs/??/ui-compliance.md]
- **Gating Criteria**:
  - Axe + Lighthouse reports attached in appendix
  - Localization/RTL screenshots included
  - Assistive-tech smoke test notes included
  - Privacy/security UX sign-off recorded
  - Design system changelog link

Failure to include this section blocks PRD approval.

---

## 3. Non-Goals (Out of Scope)

> **Purpose**: Explicitly state what we are NOT building. This prevents scope creep and keeps the team focused. When someone asks "Can we add X?", refer to this section.

### Explicitly NOT Building (MVP - 12 Weeks)

❌ **[Feature Category 1]**
- [Specific feature 1] - Reason: [Why not? e.g., "Not core to booking flow"]
- [Specific feature 2] - Reason: [Why not?]

❌ **[Feature Category 2]**
- [Specific feature] - Reason: [Why not? e.g., "Requires POS integration - out of scope"]

❌ **[Feature Category 3]**
- [Specific feature] - Reason: [Why not?]

**Examples for Restaurant Booking App:**
- ❌ Food delivery or takeout ordering (focus is reservations only)
- ❌ Restaurant POS system integration (MVP uses manual confirmation)
- ❌ Payment processing for meals (only reservation deposits)
- ❌ Waitlist management (only fixed-time reservations)
- ❌ Customer loyalty programs (post-MVP feature)
- ❌ Multi-language support beyond English/Indonesian (limited scope)
- ❌ Table layout/floor plan visualization (nice-to-have, not critical)
- ❌ Review/rating system (not competing with Google/TripAdvisor)

### Future Consideration (Post-MVP - Phase 2+)

🔮 **Phase 2 Features (Weeks 13-24)**
- [Feature 1] - e.g., "Table layout visualization"
- [Feature 2] - e.g., "WhatsApp booking bot integration"
- [Feature 3] - e.g., "Advanced analytics dashboard"

🔮 **Phase 3 Features (Months 7-12)**
- [Feature 1] - e.g., "Integration with Google Maps reviews"
- [Feature 2] - e.g., "Multi-location management"

### Never Building (Permanent Out-of-Scope)

🚫 **[Category 1]**
- [Feature] - Reason: [e.g., "Not our business model - conflicts with restaurant focus"]

🚫 **[Category 2]**
- [Feature] - Reason: [e.g., "Market too small, doesn't justify maintenance cost"]

**Examples:**
- 🚫 Become a restaurant review platform (not competing with Google/TripAdvisor)
- 🚫 Restaurant supply chain management (different business entirely)
- 🚫 Catering/event management software (separate product line)

---

## 4. Core Features Summary

### MVP Features (Must-Have - 12 Weeks)

**Priority Tier 1: Critical Path** (80%+ of competitors have this)

| Feature | User Story | Success Criteria |
|---------|-----------|------------------|
| [Feature 1] | As a [user], I want to [action] so that [benefit] | [Measurable outcome] |
| [Feature 2] | As a [user], I want to [action] so that [benefit] | [Measurable outcome] |
| [Feature 3] | As a [user], I want to [action] so that [benefit] | [Measurable outcome] |

**Priority Tier 2: Important** (40-79% of competitors have this)

| Feature | User Story | Success Criteria |
|---------|-----------|------------------|
| [Feature] | As a [user], I want to [action] so that [benefit] | [Measurable outcome] |

### Post-MVP Features (Should-Have - Phase 2)

| Feature | User Story | Rationale | Timeline |
|---------|-----------|-----------|----------|
| [Feature] | As a [user]... | [Why important] | Week 13-16 |

### Nice-to-Have Features (Phase 3+)

| Feature | User Story | Rationale | Timeline |
|---------|-----------|-----------|----------|
| [Feature] | As a [user]... | [Why nice] | Month 7+ |

### Unique Differentiators (<10% of competitors have this)

| Feature | Competitive Advantage | Risk/Complexity |
|---------|----------------------|-----------------|
| [Feature 1] | [Why this sets us apart] | [Implementation risk] |
| [Feature 2] | [Why this sets us apart] | [Implementation risk] |

---

## 5. Open Questions & Risks

> **Purpose**: Honest list of unknowns and risks. Shows deep thinking and prevents overconfidence. Each question should have a research plan and decision deadline.

### Open Product Questions

**Q1: [Question about product functionality?]**
- **Context**: [Why this matters]
- **Research Needed**: [What we need to learn - e.g., "Interview 10 restaurants"]
- **Decision Owner**: [Name]
- **Decision Deadline**: [Date/Week]
- **Impact if Wrong**: [What happens if we guess wrong]

**Q2: [Question about user behavior?]**
- **Context**: [Why this matters]
- **Research Needed**: [e.g., "A/B test with 100 users"]
- **Decision Owner**: [Name]
- **Decision Deadline**: [Date]
- **Impact if Wrong**: [Consequence]

**Q3: [Question about pricing/business model?]**
- **Context**: [Why this matters]
- **Research Needed**: [e.g., "Survey 20 potential customers"]
- **Decision Owner**: [Name]
- **Decision Deadline**: [Date]
- **Impact if Wrong**: [Consequence]

**Examples for Restaurant Booking:**
- **Q1**: Should we support group bookings (>10 people) differently than regular bookings?
  - Research: Analyze competitor flows, interview 5 restaurants with group booking features
  - Decision by: Week 2
  - Impact: May require separate UI and backend logic

### Open Technical Questions

**T1: [Question about technical feasibility?]**
- **Context**: [What we're uncertain about]
- **Action Required**: [e.g., "Build proof-of-concept in Week 1"]
- **Fallback Plan**: [If it doesn't work, we do X instead]
- **Decision Deadline**: [Date]

**T2: [Question about integration?]**
- **Context**: [Integration uncertainty]
- **Action Required**: [e.g., "Test API with sample data"]
- **Fallback Plan**: [Alternative approach]
- **Decision Deadline**: [Date]

**Examples:**
- **T1**: Can Supabase Edge Functions handle real-time seat availability checks at scale?
  - Action: Build POC with simulated 1000 concurrent requests
  - Fallback: Use polling instead of WebSocket real-time updates
  - Decision by: Week 1

### Known Risks

**High-Impact Risks**

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|-----------|--------|-------------------|-------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How we'll prevent/reduce] | [Name] |
| [Risk 2] | High/Med/Low | High/Med/Low | [How we'll prevent/reduce] | [Name] |

**Examples:**
| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|-----------|--------|-------------------|-------|
| Restaurants resist digital adoption | Medium | High | Offer free setup + 1-hour onboarding training | Sales |
| Stripe doesn't support Indonesian wallets fully | Low | High | Add Xendit as backup payment gateway | Tech Lead |
| Users abandon booking if deposit required | High | Medium | Make deposits optional, A/B test requirement | PM |
| Competitor launches similar product during development | Medium | Medium | Focus on superior UX and local Indonesian market knowledge | CEO |

**Technical Risks**

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|-----------|--------|-------------------|-------|
| Supabase RLS performance degrades with multi-tenancy | Low | High | Monitor query performance, add database indexes proactively | Backend Dev |
| Email deliverability issues in Indonesia | Medium | Medium | Use SendGrid + SMS fallback via Twilio | DevOps |
| Third-party API rate limits hit unexpectedly | Medium | Medium | Implement caching, queue non-urgent calls | Backend Dev |

**Business/Market Risks**

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|-----------|--------|-------------------|-------|
| Market size overestimated | Medium | High | Start with Jakarta only, validate before expanding | CEO |
| Customer acquisition cost too high | Medium | High | Plan for organic growth via restaurant referrals | Marketing |
| Pricing model doesn't match willingness-to-pay | Medium | Medium | Survey 20 restaurants, offer flexible pricing tiers | PM |

---

## 6. Alternatives Considered

> **Purpose**: Document WHY we chose this approach over others. Future team members (or yourself) will ask "Why didn't we use X?" This section answers it permanently.

### Tech Stack Alternatives

#### Alternative 1: [Technology Option 1] instead of [Chosen Technology]

**Option**: Use [Alternative Tech] instead of [Chosen Tech]

**Pros**:
- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

**Cons**:
- [Drawback 1]
- [Drawback 2]
- [Drawback 3]

**Decision**: ✅ Chose [Chosen Tech] because [primary reason]

**Examples:**

#### Alternative 1: Firebase instead of Supabase

**Pros**:
- More mature product, larger community
- Better real-time database performance
- Tight Google Cloud integration
- Better mobile SDK support

**Cons**:
- 10x more expensive at scale (100K users)
- Vendor lock-in (harder to migrate off Google)
- No native Postgres (we need relational joins for multi-tenant queries)
- Firestore data model doesn't match our relational needs

**Decision**: ✅ Chose Supabase for cost efficiency, Postgres compatibility, and open-source flexibility

---

#### Alternative 2: Build custom authentication instead of Clerk

**Pros**:
- Full control over auth logic
- No monthly recurring cost
- Can customize any feature we want

**Cons**:
- 3-4 weeks additional dev time
- Security risks (we're not auth experts)
- Ongoing maintenance burden (password resets, MFA, etc.)
- No proven track record at scale

**Decision**: ✅ Chose Clerk for speed-to-market, proven security, and lower long-term risk

---

### Architecture Alternatives

#### Alternative 1: Multi-Instance Architecture (Separate DB per Tenant)

**Approach**: Each restaurant gets their own database instance

**Pros**:
- True data isolation (no risk of cross-tenant data leaks)
- Easier to scale huge tenants independently
- Can customize schema per tenant if needed

**Cons**:
- Database provisioning complexity (100 tenants = 100 databases)
- Higher infrastructure costs ($50/month per DB × 100 = $5K/month)
- Harder to do cross-tenant analytics
- Migration complexity when schema changes

**Decision**: ✅ Chose shared database with RLS for simplicity and cost at MVP scale (< 100 tenants)

**Revisit Criteria**: If we reach 50+ tenants or see performance issues, reconsider multi-instance

---

#### Alternative 2: Monolithic Application instead of Domain-Driven Design

**Approach**: Single Next.js app with all features in one codebase, no domain separation

**Pros**:
- Simpler initially (fewer files, less abstraction)
- Faster to build first version
- Easier for solo developer to navigate

**Cons**:
- Harder to maintain beyond 50K LOC
- Can't split domains to separate teams later
- Difficult to test features in isolation
- Merge conflicts increase as team grows

**Decision**: ✅ Chose domain-driven design for long-term scalability and team growth

**Rationale**: We're planning to scale to 5+ developers within 12 months, DDD provides clear boundaries

---

### Feature Alternatives

#### Alternative 1: Email Confirmations vs SMS Confirmations

**Options Considered**:
- Option A: Email-only confirmations
- Option B: SMS-only confirmations
- Option C: Both email and SMS (user chooses)

**Decision**: ✅ Option C (both, user chooses preference)

**Rationale**:
- Indonesian users heavily use SMS (high open rate ~95%)
- Email preferred by business users for records
- Marginal cost difference ($0.01 SMS vs $0.001 email negligible)
- Better user experience with choice

---

## 7. Architecture Summary

### High-Level Architecture

```
[Include Mermaid C4 diagram or high-level architecture diagram showing:
- Frontend (Next.js)
- Backend (Supabase/APIs)
- External integrations (Clerk, Stripe, etc.)
- Data flow]
```

**Key Architectural Decisions**:
1. **Multi-Tenancy Model**: [Shared DB with RLS / Separate DB per tenant / Hybrid]
   - Rationale: [Why this approach]

2. **Authentication**: [Clerk / Auth0 / Custom]
   - Rationale: [Why chosen]

3. **Data Storage**: [Supabase Postgres / MongoDB / etc.]
   - Rationale: [Why chosen]

4. **Frontend Framework**: [Next.js 15 / React / etc.]
   - Rationale: [Why chosen]

### Domain Architecture

**Identified Domains** (10-20 typical):

| Domain | Responsibility | Key Entities | Dependencies |
|--------|---------------|--------------|--------------|
| [Domain 1] | [What it does] | [Entities] | [Other domains] |
| [Domain 2] | [What it does] | [Entities] | [Other domains] |

**Example for Restaurant Booking:**

| Domain | Responsibility | Key Entities | Dependencies |
|--------|---------------|--------------|--------------|
| User Management | User profiles, preferences | User, Profile, Settings | Auth |
| Restaurant Management | Restaurant data, settings | Restaurant, Location, Hours | Tenant |
| Booking | Reservation logic | Booking, TimeSlot, Party | User, Restaurant, Availability |
| Availability | Seat/table inventory | Availability, Capacity, BlockedDates | Restaurant |
| Notifications | Email/SMS confirmations | Notification, Template | Booking, User |
| Payments | Deposits, refunds | Payment, Transaction, Refund | Booking, User |

### Tech Stack Rationale

| Technology | Purpose | Why Chosen | Alternatives Considered |
|-----------|---------|-----------|------------------------|
| Next.js 15 | Frontend Framework | React-based, great SEO, app router stable | Remix, Astro |
| Supabase | Backend/Database | Postgres + Auth + Storage + Edge Functions | Firebase, Amplify |
| Clerk | Authentication | Proven at scale, webhook support | Auth0, custom auth |
| Stripe | Payments | Indonesian payment support, reliable webhooks | Xendit, Midtrans |
| Vercel | Hosting | Zero-config Next.js deployment, global CDN | Netlify, AWS |
| Tailwind CSS | Styling | Utility-first, fast development, great DX | CSS Modules, Styled Components |

### Data Architecture Summary

**Database Schema**:
- **Tables**: [Number] tables (see detailed schema in `docs/05-technical/schema-spec.md`)
- **Relationships**: [Brief description - e.g., "User → Bookings (1:many), Restaurant → Availability (1:many)"]
- **Multi-Tenancy**: Row-Level Security (RLS) with `tenant_id` column
- **Indexes**: Primary keys, foreign keys, query optimization indexes

**Key RLS Policies**:
```sql
-- Example: Users can only see their own bookings
CREATE POLICY "Users see own bookings"
ON bookings
FOR SELECT
USING (auth.uid() = user_id);

-- Example: Restaurant staff see only their restaurant's bookings
CREATE POLICY "Staff see restaurant bookings"
ON bookings
FOR SELECT
USING (restaurant_id IN (
  SELECT restaurant_id FROM staff WHERE user_id = auth.uid()
));
```

---

## 8. Security & Compliance

### Authentication & Authorization

**Authentication Provider**: [Clerk / Auth0 / Custom]
- **Methods Supported**: Email/password, OAuth (Google, Facebook), Magic links, SMS OTP
- **Session Management**: JWT tokens, refresh tokens, session timeout: [X] hours
- **MFA Support**: [Yes/No] - Optional for users, required for admin roles

**Authorization Model**: Role-Based Access Control (RBAC)

| Role | Permissions | Scope |
|------|-------------|-------|
| Super Admin | Full system access, tenant management | Global |
| Restaurant Admin | Manage restaurant, bookings, staff | Single tenant |
| Restaurant Staff | View bookings, update status | Single tenant |
| Customer | Create bookings, view own bookings | Own data only |
| Guest | Browse restaurants, limited booking | Public data only |

### Data Privacy & Protection

**GDPR Compliance**:
- [ ] Right to access (data export functionality)
- [ ] Right to erasure (account deletion, data purge)
- [ ] Right to rectification (user can edit data)
- [ ] Data portability (JSON export)
- [ ] Consent management (cookie banner, privacy policy)
- [ ] Data retention policy: [X days/months]

**Data Encryption**:
- **At Rest**: Database encryption (Supabase native)
- **In Transit**: HTTPS/TLS 1.3 for all API calls
- **Sensitive Fields**: PII (email, phone) encrypted at application layer using [method]

**PCI-DSS Compliance** (if handling payments):
- Payment processing delegated to Stripe (PCI-certified)
- No credit card data stored in our database
- Stripe customer IDs and payment method tokens only

### Security Best Practices

**API Security**:
- Rate limiting: [X] requests per minute per IP
- Authentication required for all non-public endpoints
- Input validation on all user inputs (SQL injection prevention)
- CORS policies: Whitelist approved domains only

**Vulnerability Management**:
- Dependency scanning: Automated via [Snyk / Dependabot]
- Security updates: Applied within [X] days of disclosure
- Penetration testing: Planned for [Date] (pre-launch)

**Incident Response**:
- Security incident response plan: [Link to runbook]
- Breach notification: Within 72 hours (GDPR requirement)
- Contact: [security@company.com]

### Accessibility

**WCAG 2.1 Compliance**: Level AA

- [ ] Keyboard navigation for all features
- [ ] Screen reader compatibility (ARIA labels)
- [ ] Color contrast ratios meet 4.5:1 minimum
- [ ] Alt text for all images
- [ ] Form labels and error messages clear
- [ ] Skip navigation links
- [ ] Responsive design (mobile, tablet, desktop)

**Testing**:
- Automated testing: [Tool - e.g., axe-core, Lighthouse]
- Manual testing: [Process - e.g., screen reader testing weekly]

---

## 9. Multi-Tenancy & Cost Strategy

### Multi-Tenancy Model

**Architecture**: [Shared Database with RLS / Separate DB per Tenant / Hybrid]

**Implementation**:
- **Tenant Isolation**: `tenant_id` column on all multi-tenant tables
- **RLS Policies**: Enforce tenant isolation at database level
- **Domain Model**: Each restaurant = 1 tenant
- **Admin Separation**: Super-admin panel operates above tenant boundary

**Tenant Onboarding**:
1. Restaurant signs up → Create tenant record
2. Provision database schemas (automatic via RLS)
3. Generate tenant-specific subdomain: `[restaurant-slug].tablemaster.id`
4. Configure theme/branding via `siso-site-config.yaml`
5. Import initial data (menu, hours, seating capacity)

**Tenant Limits** (to prevent abuse):

| Resource | Free Tier | Pro Tier | Enterprise |
|----------|-----------|----------|------------|
| Bookings/month | 100 | 1,000 | Unlimited |
| Staff users | 2 | 10 | Unlimited |
| API calls/day | 1,000 | 10,000 | Custom |
| Storage | 100 MB | 1 GB | Custom |

### Cost Structure

**Infrastructure Costs** (Estimated per 100 tenants):

| Service | Tier | Monthly Cost | Per Tenant |
|---------|------|--------------|------------|
| Supabase | Pro | $25 | $0.25 |
| Vercel | Pro | $20 | $0.20 |
| Clerk | Pro | $25 | $0.25 |
| Stripe | Pay-as-you-go | ~$50 | $0.50 |
| SendGrid | Essentials | $15 | $0.15 |
| **Total** | | **$135** | **$1.35/tenant** |

**Variable Costs**:
- SMS notifications: $0.01 per message (opt-in only)
- Transaction fees: Stripe 2.9% + $0.30 per booking deposit
- Overage bandwidth: $0.10/GB beyond included tier

**Revenue Model**:

| Tier | Price/Month | Features | Target Segment |
|------|------------|----------|----------------|
| Free | $0 | 100 bookings, 2 staff | Small cafes, testing |
| Starter | Rp 299K (~$20) | 500 bookings, 5 staff | Small restaurants |
| Pro | Rp 599K (~$40) | 2,000 bookings, 15 staff | Medium restaurants |
| Enterprise | Custom | Unlimited, white-label | Large chains |

**Unit Economics** (Pro Tier Example):
- Revenue: Rp 599K/month ($40)
- Infrastructure Cost: $1.35/tenant
- Support Cost (est): $2/tenant
- **Gross Margin**: ~90% ($36.65 profit per tenant)

**Break-Even Analysis**:
- Fixed costs (dev, marketing): ~$5K/month
- Break-even at: 140 paying tenants (achievable by Month 6)

---

## 10. Operational Playbook

### Provisioning & Onboarding

**New Tenant Signup Flow**:
1. **Sign Up** → Restaurant fills form (name, location, contact)
2. **Email Verification** → Clerk sends verification email
3. **Account Creation** → `tenants` table record created, `tenant_id` assigned
4. **Database Setup** → RLS policies auto-apply, no manual DB provisioning
5. **Subdomain Assignment** → `[slug].tablemaster.id` DNS record created
6. **Theming** → Restaurant uploads logo, selects colors (saved to `siso-site-config.yaml`)
7. **Initial Configuration** → Set hours, seating capacity, booking rules
8. **Go Live** → 1-hour onboarding call (optional), activate bookings

**Estimated Time**: 15 minutes self-service, or 1 hour with onboarding support

### Monitoring & Alerts

**Application Monitoring**:
- **Uptime**: Vercel built-in monitoring (99.9% SLA)
- **Error Tracking**: [Sentry / LogRocket] for client-side errors
- **Performance**: [New Relic / Vercel Analytics] for Web Vitals
- **Database**: Supabase dashboard for query performance, connection pool

**Alerts** (PagerDuty / Email):
- Error rate > 1% for 5 minutes → Alert on-call engineer
- Database CPU > 80% for 10 minutes → Scale database
- API response time p95 > 1s → Investigate slow endpoints
- Supabase storage > 80% → Clean up old data or upgrade tier

**Dashboards**:
- **Business Metrics**: Active tenants, bookings/day, revenue, churn
- **Technical Metrics**: Uptime, error rate, API latency, database performance

### Backup & Disaster Recovery

**Database Backups**:
- **Frequency**: Automated daily backups (Supabase)
- **Retention**: 7 days (Pro tier), 30 days (Enterprise)
- **Point-in-Time Recovery**: Available for last 7 days
- **Testing**: Restore test performed quarterly

**Disaster Recovery Plan**:
- **RTO** (Recovery Time Objective): 4 hours
- **RPO** (Recovery Point Objective): 24 hours (max 1 day data loss)
- **Backup Region**: [Secondary region - e.g., AWS us-west-2 if primary is us-east-1]

**Failover Process**:
1. Detect outage (monitoring alerts)
2. Switch DNS to backup environment (Vercel auto-failover)
3. Restore database from latest backup if needed
4. Verify system functionality
5. Communicate with customers (status page)

### Support & Maintenance

**Support Tiers**:

| Tier | Response Time | Channels | Availability |
|------|--------------|----------|--------------|
| Free | 48 hours | Email | Business hours |
| Starter | 24 hours | Email, chat | Business hours |
| Pro | 4 hours | Email, chat, phone | 9am-9pm daily |
| Enterprise | 1 hour | Dedicated Slack, phone | 24/7 |

**Maintenance Windows**:
- **Scheduled Maintenance**: Sundays 2am-4am (low traffic period)
- **Notification**: 48-hour advance notice via email
- **Emergency Patches**: Deployed immediately if security-critical

**Runbooks** (Operations documentation):
- Database migration procedure: [Link]
- Scaling up/down guide: [Link]
- Incident response checklist: [Link]
- Customer onboarding SOP: [Link]

---

## 11. Roadmap & Timeline

### MVP Timeline (12 Weeks)

**Phase 0: Provisioning** (Week 1)
- [ ] Set up Vercel project
- [ ] Set up Supabase project
- [ ] Configure Clerk auth
- [ ] Set up Stripe account
- [ ] Create GitHub repo

**Phase 1: Repository & Foundation** (Week 1-2)
- [ ] Initialize Next.js 15 project
- [ ] Set up Tailwind CSS + component library
- [ ] Configure ESLint, Prettier, TypeScript
- [ ] Set up CI/CD (Vercel auto-deploy)

**Phase 2: Database Layer** (Week 2-3)
- [ ] Create database schema (20+ tables)
- [ ] Implement RLS policies
- [ ] Write migration scripts
- [ ] Seed initial data

**Phase 3: Shared Infrastructure** (Week 3-4)
- [ ] Implement authentication (Clerk integration)
- [ ] Set up multi-tenancy middleware
- [ ] Create design system components
- [ ] Build error handling framework

**Phase 4: Domain Implementation** (Week 4-10)
- [ ] Week 4-5: User Management domain
- [ ] Week 5-6: Restaurant Management domain
- [ ] Week 6-7: Booking domain (core feature)
- [ ] Week 7-8: Availability domain
- [ ] Week 8-9: Notifications domain
- [ ] Week 9-10: Payments domain

**Phase 5: Data & Testing** (Week 10-11)
- [ ] Import sample restaurant data
- [ ] Write unit tests (80% coverage target)
- [ ] Write E2E tests (Playwright)
- [ ] Performance testing

**Phase 6: QA & Refinement** (Week 11-12)
- [ ] User acceptance testing
- [ ] Fix critical bugs
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Performance optimization

**Phase 7: Demo & Handoff** (Week 12)
- [ ] Final demo to stakeholders
- [ ] Documentation review
- [ ] Deploy to production
- [ ] Launch!

### Post-MVP Roadmap

**Phase 2** (Weeks 13-24, Months 4-6):
- Table layout visualization
- WhatsApp booking bot
- Advanced analytics dashboard
- Google Calendar integration
- Multi-location management for chains

**Phase 3** (Months 7-12):
- Loyalty program integration
- Review/rating system
- AI-powered demand forecasting
- Dynamic pricing for peak hours
- Integration with Google Maps reviews

**Long-Term Vision** (Year 2+):
- White-label solution for hotel booking
- Expand to other Southeast Asian markets (Thailand, Vietnam, Philippines)
- Marketplace for restaurant services (photographers, suppliers)

### Milestones & Success Criteria

| Milestone | Target Date | Success Criteria |
|-----------|------------|------------------|
| MVP Launch | Week 12 | 10 beta restaurants onboarded |
| First 50 Customers | Month 4 | 50 paying tenants, $2K MRR |
| Break-Even | Month 6 | 140 tenants, $5.6K MRR |
| Product-Market Fit | Month 9 | NPS > 50, Churn < 5%/month |
| Scale | Month 12 | 500 tenants, $20K MRR |

---

## 12. Open Questions & Next Steps

### Immediate Next Steps (Week 1)

- [ ] **Technical POC**: Build Supabase real-time availability check (answer T1 above)
- [ ] **Customer Research**: Interview 10 restaurants (answer Q1, Q5)
- [ ] **Design Kickoff**: Create wireframes for core flows (booking, admin dashboard)
- [ ] **Stakeholder Review**: Review this PDR with [Names], incorporate feedback
- [ ] **Final Approval**: Get sign-off from [Decision Maker] to proceed to build

### Decision Log

| Decision | Date | Owner | Rationale | Status |
|----------|------|-------|-----------|--------|
| [Decision 1] | [Date] | [Name] | [Why decided] | ✅ Approved / ⏳ Pending |
| [Decision 2] | [Date] | [Name] | [Why decided] | ✅ Approved / ⏳ Pending |

---

## 13. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| RLS | Row-Level Security - Postgres feature for multi-tenant data isolation |
| Tenant | A single restaurant using the platform |
| Multi-Tenancy | Single codebase serving multiple customers (tenants) |
| PDR | Product Definition & Requirements |
| MVP | Minimum Viable Product |

### Appendix B: References

- **Market Research**: [Link to research-summary.md]
- **Competitor Analysis**: [Link to feature-matrix.md]
- **Feature Specs**: [Link to features.md]
- **Architecture Diagrams**: [Link to architecture.md]
- **Database Schema**: [Link to schema-spec.md]
- **Build Plan**: [Link to master-checklist.md]

### Appendix C: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial PDR creation |
| 1.1 | [Date] | [Name] | Added Phase 4.5 UI/UX section |
| 1.2 | [Date] | [Name] | Updated timeline after stakeholder feedback |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | [Name] | | |
| Tech Lead | [Name] | | |
| Design Lead | [Name] | | |
| Stakeholder | [Name] | | |

---

**End of PDR**

*This document is a living artifact and will be updated as decisions are made and the product evolves.*

*Next Review Date: [Date]*
