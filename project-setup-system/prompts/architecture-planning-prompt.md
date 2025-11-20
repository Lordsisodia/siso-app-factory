# Architecture Planning AI Prompt

Design domain-driven architecture for **[INDUSTRY_TYPE]** application.

## Your Task

### 1. Domain Identification (1 hour)
Map features to 10-20 business domains:

**Example domains**:
- `auth` - Authentication & authorization
- `menu` - Product/service catalog
- `booking` - Reservations/appointments
- `payments` - Transaction processing
- `loyalty` - Customer rewards
- `cms` - Content management
- `admin` - Administration
- `shared` - Cross-cutting concerns

**For each domain**:
- Define boundary (what's included/excluded)
- List responsibilities
- Identify key entities
- Map features to domain

### 2. Tech Stack Selection (2 hours)
Choose and justify each component:

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS (recommended)
- **Backend**: Next.js Server Actions or API routes
- **Database**: Supabase PostgreSQL (recommended for free tier)
- **Auth**: Clerk (recommended) or Supabase Auth
- **Storage**: Cloudinary or R2
- **Email**: Resend (recommended)
- **Payments**: Stripe, Xendit, Midtrans (based on geography)
- **Analytics**: GA4 + Mixpanel
- **Deployment**: Vercel

**Justification required for each choice**

### 3. Multi-Tenancy Strategy (if applicable, 1 hour)
- Single database with `tenant_id` column (recommended)
- OR database per tenant
- OR separate deployment per tenant

Define tenant isolation, RLS policies, cost management

### 4. Security Architecture (1 hour)
- RBAC roles and permissions
- Data encryption strategy
- PII handling
- Rate limiting
- CORS policies

### 5. Performance Requirements (30 min)
- Page load targets (< 2s FCP)
- Caching strategy (edge, database, browser)
- CDN usage
- Database indexing

## Deliverable

Create `docs/05-technical/architecture.md` using template

**Requirements**:
- ✅ 10-20 domains defined
- ✅ All features mapped to domains
- ✅ Complete tech stack with justifications
- ✅ Security strategy documented
- ✅ Performance targets set

## Time Estimate
~5.5 hours

## Next Phase
**Phase 5: Page & Component Planning**
