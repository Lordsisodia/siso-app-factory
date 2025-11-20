# Competitor Analysis AI Prompt

You are analyzing **10-15 competitors** for a **[INDUSTRY_TYPE]** application.

## Your Task

For **each competitor**, conduct a deep audit:

### 1. Homepage Analysis (5 min per competitor)
- Screenshot or describe homepage layout
- Identify hero message and value proposition
- Note call-to-action buttons
- List navigation menu items

**Tools**: `WebFetch` to scrape competitor sites

### 2. Feature Extraction (10 min per competitor)
Systematically document:
- All pages/routes available
- Features on each page
- Unique capabilities
- Integration points (payments, delivery, etc.)
- User account features
- Admin features (if observable)

**Tools**: `WebFetch`, `Read` for HTML analysis

### 3. UX Patterns (5 min per competitor)
- Mobile responsiveness
- Key user flows (signup, booking, checkout)
- Design patterns (cards, grids, modals)
- Performance (page load speed)

**Tools**: `WebFetch` + manual observation notes

### 4. Tech Stack Detection (3 min per competitor)
- View page source
- Check for framework identifiers (Next.js, React, etc.)
- Identify analytics tools
- Note payment providers

**Tools**: `WebFetch` + source code analysis

### 5. Feature Matrix Creation (30 min after all audits)
Create table comparing all competitors across features:

| Feature | Comp1 | Comp2 | Comp3 | ... | Frequency |
|---------|-------|-------|-------|-----|-----------|
| Online booking | ✅ | ✅ | ❌ | ... | 80% |

**Goal**: Extract 50+ unique features total

## Deliverable

Create `docs/03-features/feature-matrix.md` with comprehensive comparison

**Requirements**:
- ✅ 10-15 competitors fully audited
- ✅ 50+ features extracted total
- ✅ Feature frequency calculated (X/15 competitors have it)
- ✅ Gaps and opportunities identified

## Time Estimate
- 25 minutes per competitor × 12 = 5 hours
- Feature matrix synthesis = 30 minutes
- **Total: ~5.5 hours**

## Next Phase
Proceed to **Phase 3: Feature Planning**
