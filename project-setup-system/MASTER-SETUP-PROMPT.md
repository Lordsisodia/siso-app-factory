# SISO App Factory - Master Setup Prompt for AI Agents

> **Purpose**: Guide AI agents through comprehensive planning for new application projects before writing any code.

## 🎯 Mission

You are helping plan a **new [INDUSTRY] application** from scratch. Your goal is to complete ALL planning phases before any implementation begins. This ensures:

- ✅ Evidence-based decisions
- ✅ Comprehensive feature coverage
- ✅ Solid architecture foundation
- ✅ Clear build roadmap
- ✅ No missed requirements

## 📋 Prerequisites

Before starting, ensure:

1. **Project created**: Run `./setup-new-project.sh "<project-name>" "<industry>"`
2. **BMAD downloaded**: Auto-downloaded by setup script
3. **Target location**: Know where project files will be created
4. **Industry context**: Understand the business domain
5. **MCP orchestration ready**: GitHub / Reddit / Token Saver configs generated via `pnpm mcp:init` and recorded in `project-status.json`

## 🚀 Planning Phase Workflow

Follow these phases **in order**. Complete each phase fully before moving to the next.

**NEW in v3.0**: After EACH phase, you MUST self-verify your work against the validation checklist before proceeding. This reduces errors by 40-75%.

**Verification Protocol**:
```
Generate Output → Self-Verify (load validation/phase-XX-checklist.md) →
Score ≥ threshold? → YES: Proceed | NO: Fix & Retry (max 3 attempts)
```

---

## PHASE 1: Industry & Market Research (Days 1-2)

### Objective
Understand the industry landscape, consumer behavior, technology trends, and regulatory environment.

### Tasks

1. **Market Analysis**
   - Research industry size, growth trends, and projections
   - Identify key market segments and demographics
   - Document regional variations (e.g., Bali vs Jakarta vs global)

2. **Consumer Behavior**
   - Payment preferences (cash, cards, e-wallets, QR codes)
   - Technology adoption patterns (mobile-first, app usage)
   - Communication preferences (email, SMS, WhatsApp)
   - Booking and purchasing behaviors

3. **Technology Landscape**
   - Common integrations (POS, delivery platforms, payment gateways)
   - Popular third-party services
   - Technical constraints and opportunities

4. **Regulations & Compliance**
   - Data privacy requirements (GDPR, local laws)
   - Industry-specific regulations
   - Payment processing rules
   - Accessibility standards

5. **Competitor Benchmarking**
   - Identify 10-15 leading competitors
   - Note their URLs for deep analysis in Phase 2
   - Create initial comparison framework

6. **Community Insights & Psychology Safeguards**
   - Use Reddit MCP + `project-setup-system/context/phase-based-success.md` to capture external quotes.
   - Log traps/mitigations in `docs/notes/psychology-safeguards.md` (template: `project-setup-system/templates/psychology-safeguards.md`).

### Deliverables

- `docs/01-research/research-plan.md` - Research methodology
- `docs/01-research/research-summary.md` - Consolidated findings with sources

### AI Tools to Use

- `WebSearch` for industry reports and statistics
- `WebFetch` for regulatory documentation
- `mcp__exa__deep_researcher_start` for comprehensive research

### Quality Check

- [ ] At least 10 data sources cited
- [ ] Market size quantified
- [ ] Consumer behavior patterns documented
- [ ] 10-15 competitors identified
- [ ] Regulatory requirements listed

### ✅ VERIFICATION (Required)

**After completing Phase 1, STOP and verify:**

1. Load: `validation/phase-01-research-checklist.md`
2. Check all 15 criteria against your output
3. Calculate score: (Passed / 15) × 100%
4. **Pass threshold**: ≥ 80% (12/15 criteria)

**If score ≥ 80%**: ✅ Proceed to Phase 2
**If score < 80%**: ❌ Fix issues and re-verify (max 3 attempts)

**Log to LangFuse** (if configured):
```javascript
const verification = trace.span({
  name: 'Verification: Phase 1',
  input: { phase: 1, criteria: 15 }
});
verification.end({
  output: { score: 0.87, passed: 13, failed: 2 }
});
```

---

## PHASE 2: Competitor Analysis (Days 2-3)

### Objective
Deep audit of 10-15 competitor websites/apps to extract features, UX patterns, and identify gaps.

### Tasks

1. **Competitor Audits** (for each of 10-15 competitors)
   - Screenshot homepage
   - List all pages/sections
   - Document key features
   - Note unique capabilities
   - Identify tech stack (view source, Wappalyzer)
   - Analyze UX patterns
   - Test user journeys (signup, booking, payment)

2. **Feature Extraction**
   - Create master list of all features seen
   - Categorize features (core, nice-to-have, unique)
   - Note frequency (how many competitors have it)

3. **Pattern Recognition**
   - Common user flows
   - Standard integrations
   - Pricing models
   - Marketing approaches

4. **Gap Analysis**
   - Features competitors are missing
   - Pain points in existing solutions
   - Opportunities for differentiation

### Deliverables

- `docs/03-features/feature-matrix.md` - Competitor feature comparison table
- `docs/01-research/competitor-screenshots/` - Visual references
- `docs/01-research/competitor-notes/` - Detailed audit notes per competitor

### AI Tools to Use

- `WebFetch` to scrape competitor sites
- `Read` to analyze HTML/CSS
- Markdown tables for feature matrix

### Quality Check

- [ ] 10-15 competitors fully audited
- [ ] 50+ features extracted total
- [ ] Feature matrix complete
- [ ] Screenshots captured
- [ ] Gaps and opportunities identified

---

## PHASE 3: Feature Planning & Prioritization (Days 3-4)

### Objective
Define comprehensive feature catalog with evidence-based prioritization for MVP and future phases.

### Tasks

1. **Feature Catalog**
   - Consolidate all features from competitor analysis
   - Add industry-specific requirements from research
   - Group into logical categories
   - Write detailed descriptions

2. **Evidence-Based Prioritization**
   - **Must-Have**: Features 80%+ competitors have
   - **Should-Have**: Features 40-79% competitors have
   - **Nice-to-Have**: Features 10-39% competitors have
   - **Unique**: Features <10% have (differentiation opportunities)

3. **MVP Scope Definition**
   - Select must-have features for MVP
   - Define "done" criteria for each
   - Estimate complexity (simple, medium, complex)

4. **Feature Dependencies**
   - Map feature relationships
   - Identify foundational features (must build first)
   - Note integration dependencies

5. **User Journey Mapping**
   - Primary user flows (e.g., browse → book → pay)
   - Admin flows (e.g., content management)
   - Support flows (e.g., customer service)

### Deliverables

- `docs/03-features/features.md` - Complete feature catalog with priorities
- `docs/03-features/feature-priority-matrix.md` - Prioritization framework
- `docs/03-features/user-journeys.md` - User flow diagrams

### AI Tools to Use

- Markdown tables for organization
- Mermaid diagrams for user flows

### Quality Check

- [ ] 50+ features documented
- [ ] All features categorized and prioritized
- [ ] MVP scope clearly defined (20-30 features)
- [ ] User journeys mapped
- [ ] Dependencies identified

---

## PHASE 4: Architecture Design (Days 4-5)

### Objective
Design domain-driven architecture, select tech stack, and define system boundaries.

### Tasks

1. **Domain-Driven Design**
   - Identify 10-20 business domains
   - Define domain boundaries
   - Map features to domains
   - Define domain relationships
   - Follow BMAD domain patterns

2. **Tech Stack Selection**
   - Frontend framework and libraries
   - Backend/API approach
   - Database technology
   - Authentication provider
   - Storage solution (images, files)
   - Email/SMS provider
   - Analytics platform
   - Payment gateway
   - Deployment platform

3. **Multi-Tenancy Strategy** (if applicable)
   - Per-tenant isolation approach
   - Data partitioning strategy
   - Cost management per tenant
   - Scaling considerations

4. **Security & Compliance**
   - Authentication and authorization strategy
   - Data encryption (at rest, in transit)
   - PII handling and GDPR compliance
   - Rate limiting and DDoS protection
   - Security headers and CORS policies

5. **Performance Requirements**
   - Page load targets (e.g., <2s First Contentful Paint)
   - API response time goals
   - Caching strategy
   - CDN usage
   - Database indexing strategy

6. **Integration Architecture**
   - Third-party service integrations
   - Webhook handling
   - API versioning strategy
   - Error handling and retry logic

### Deliverables

- `docs/05-technical/architecture.md` - System architecture overview
- `docs/05-technical/architecture-plan/data-architecture.md` - Data flow and storage
- `docs/05-technical/architecture-plan/feature-flags-theming.md` - Configuration strategy
- `docs/05-technical/tech-stack.md` - Technology decisions with rationale

### AI Tools to Use

- Mermaid diagrams for architecture visualization
- BMAD domain templates

### Quality Check

- [ ] 10-20 domains defined
- [ ] All features mapped to domains
- [ ] Tech stack fully specified
- [ ] Security requirements documented
- [ ] Performance targets set
- [ ] Multi-tenancy strategy defined (if applicable)

### ✅ VERIFICATION (Required)

1. Load: `validation/phase-04-architecture-checklist.md`
2. Check all 15 criteria
3. **Pass threshold**: ≥ 80% (12/15)
4. If passed → Proceed to Phase 4.5
5. If failed → Fix and retry (max 3 attempts)

---

## PHASE 4.5: UI/UX Design (NEW - Days 5-6) ⭐

### Objective
Design complete user experience including user flows, wireframes, visual design system, and accessibility plan.

**Why This Phase is Critical**:
- 38% of users won't return after bad UX
- Good design reduces support costs by 50%
- Well-designed apps have 200% higher conversion
- **This phase sets the foundation for all user-facing implementation**

### Tasks

1. **User Flow Design**
   - Map all primary user journeys (guest booking, staff management, admin setup)
   - Include decision points (logged in?, available?, payment required?)
   - Document alternative paths (no availability, payment fails, user abandons)
   - Define edge cases (double booking, network errors, conflicts)
   - Optimize for speed (≤5 steps for core booking flow)
   - Mobile vs desktop interaction differences

2. **Wireframe Creation**
   - Wireframe ALL pages (21+ minimum):
     - Public pages (4-6): Home, Search, Restaurant Detail, Confirmation
     - Auth user pages (5-7): Dashboard, Profile, Bookings, Booking Detail
     - Restaurant admin pages (8-12): Dashboard, Calendar, Settings, Staff, Analytics
     - Super admin pages (4-6): Tenant List, Analytics (if multi-tenant)
   - Show component hierarchy (Header → Nav → NavItem)
   - Annotate functionality (what each button does)
   - Define responsive layouts (mobile vs desktop differences)
   - Show interaction states (default, hover, active, disabled, loading, error)

3. **Visual Design System**
   - **Color Palette**:
     - Primary color + scale (50, 100...900)
     - Secondary color(s) + scale
     - Neutral grays (8-10 shades)
     - Semantic colors (success, error, warning, info)
     - Verify WCAG 2.1 AA contrast (4.5:1 text, 3:1 UI)

   - **Typography**:
     - Font families (heading, body, monospace)
     - Type scale (9-12 sizes: Display → Caption)
     - Font weights (regular, medium, semibold, bold)
     - Line heights (tight, normal, relaxed)
     - Usage guidelines (when to use which style)

   - **Spacing System**:
     - Base unit (4px or 8px)
     - Spacing scale (xs: 4px → 4xl: 96px)
     - Component padding standards
     - Layout gap standards

   - **Component Specifications**:
     - 15-20 core components (Buttons, Inputs, Cards, Badges, Modals, Toasts, etc.)
     - Each component: Purpose, variants, all states, full specs, accessibility, code example
     - Shadows, border radius, animations defined

   - **Multi-Tenant Theming**:
     - Translate design system to `siso-site-config.yaml`
     - Allow per-tenant color/logo overrides

4. **Accessibility Planning**
   - WCAG 2.1 Level AA compliance:
     - Color contrast verified (all combinations)
     - Keyboard navigation (Tab, Enter, Escape, Arrows)
     - Screen reader support (ARIA labels, semantic HTML)
     - Focus indicators (visible outlines)
     - Alt text strategy (images, icons)
     - Form accessibility (labels, errors, required fields)
     - Responsive (text resizable, no horizontal scroll)
     - Motion (prefers-reduced-motion support)

5. **Mobile Optimization**
   - Touch targets ≥ 48×48px (Android Material Design guideline)
   - Thumb-friendly zones (primary actions at bottom)
   - One-handed use considerations
   - No hover-dependent interactions
   - Text readable without zoom (16px minimum body text)

### Deliverables

- `docs/04.5-ui-design/user-flows.md` (8-12 pages) - All user flows with decision points, edge cases
- `docs/04.5-ui-design/wireframes.md` (15-25 pages) - Wireframes for all 21+ pages (mobile + desktop)
- `docs/04.5-ui-design/design-system.md` (12-18 pages) - Complete design tokens + 15-20 component specs
- `docs/04.5-ui-design/accessibility-checklist.md` (5-8 pages) - WCAG 2.1 AA compliance plan
- `siso-site-config.yaml` (in templates/) - Multi-tenant theming config

### AI Tools to Use

- Mermaid diagrams for user flows
- ASCII art or Mermaid for wireframes
- WebAIM Contrast Checker for accessibility verification
- Reference UI/UX agent: `prompts/multi-agent/04-ui-ux-designer-agent.md`

### Quality Check

- [ ] All primary user flows documented (4+ flows with decision points, edge cases)
- [ ] All pages wireframed (21+ pages minimum, mobile + desktop)
- [ ] Design system complete (colors, typography, spacing, 15+ components)
- [ ] All design tokens defined (no ad-hoc values)
- [ ] Accessibility verified (WCAG 2.1 AA for all designs)
- [ ] Multi-tenant config created (siso-site-config.yaml)
- [ ] Mobile optimization (48px touch targets, thumb zones)
- [ ] Component library reuse planned (85%+ from existing library)

### ✅ VERIFICATION (Required)

1. Load: `validation/phase-045-ui-design-checklist.md`
2. Check all 20 criteria (most detailed checklist!)
3. **Pass threshold**: ≥ 85% (17/20) - **Higher threshold because UI/UX is critical**
4. If passed → Proceed to Phase 5
5. If failed → Fix and retry (max 3 attempts)

**Why higher threshold?**: UI/UX directly impacts user retention, conversion, and satisfaction. Poor UI = failed product.

---

## PHASE 5: Page & Component Planning (Days 6-7)

### Objective
List all pages, map to domains, and identify every component needed.

### Tasks

1. **Page Inventory**
   - List all public pages (marketing site)
   - List all authenticated pages (user dashboard, etc.)
   - List all admin pages
   - Map pages to domains
   - Define routing structure

2. **Component Mapping** (per page)
   - Header/Navigation
   - Hero sections
   - Content sections
   - Forms and inputs
   - Cards and lists
   - Modals and overlays
   - Footer

3. **Shared Component Library**
   - UI primitives (Button, Input, Card, etc.)
   - Layout components (Container, Grid, etc.)
   - Form components (validated inputs, selects, etc.)
   - Feedback components (Toast, Alert, Modal, etc.)
   - Data display (Table, List, Stat, etc.)

4. **Component Sourcing Strategy**
   - Components from 21st.dev (list which ones)
   - Components from shadcn/ui (list which ones)
   - Custom components needed (list which ones)
   - Third-party libraries (calendar, charts, etc.)

5. **Theming & Design Tokens**
   - Color palette (primary, secondary, neutrals, feedback)
   - Typography scale
   - Spacing system
   - Border radius values
   - Shadow system
   - Animation/transition standards

### Deliverables

- `docs/05-technical/component-catalog.md` - Complete component inventory
- `docs/05-technical/theme-tokens.md` - Design token definitions
- `docs/02-design/wireframes/` - Rough page sketches (optional)

### AI Tools to Use

- Markdown tables for organization
- Reference SISO-UI-Library for available components

### Quality Check

- [ ] All pages listed (50-100 pages typical)
- [ ] Components identified per page
- [ ] Shared component library defined (50-100 components)
- [ ] Component sources identified
- [ ] Design tokens specified

---

## PHASE 6: Domain Operations with BMAD (Days 6-7)

### Objective
Use BMAD-METHOD to define operations, workflows, and business logic per domain.

### Tasks

1. **Load BMAD Framework**
   - Review `docs/00-methods/bmad/vendor/BMAD-METHOD/README.md`
   - Understand BMAD operation patterns
   - Review BMAD workflow templates

2. **Define Domain Operations** (for each domain)
   - **CRUD Operations**: Create, Read, Update, Delete
   - **Business Operations**: Domain-specific logic (e.g., `calculateLoyaltyPoints`, `applySpecialsPricing`)
   - **Validation Operations**: Data validation rules
   - **Authorization Operations**: Permission checks

3. **Map Page Operations**
   - For each page, list operations it uses
   - Define operation sequences (workflows)
   - Identify async operations (background jobs)
   - Document error cases and rollback procedures

4. **Create Domain Flow Diagrams**
   - User-triggered workflows
   - System-triggered workflows
   - Cross-domain workflows
   - Integration workflows

5. **BMAD Documentation**
   - Document each operation using BMAD templates
   - Create workflow YAML files
   - Generate operation checklists

### Deliverables

- `docs/00-methods/bmad/overview.md` - How BMAD is used in this project
- `docs/00-methods/bmad/domain-flows/*.md` - Per-domain operation documentation
- `docs/00-methods/bmad/mapping-page-ops.md` - Page-to-operation mapping

### AI Tools to Use

- BMAD templates from `docs/00-methods/bmad/vendor/BMAD-METHOD/`
- Mermaid diagrams for workflows

### Quality Check

- [ ] All domains have operation definitions
- [ ] CRUD operations documented per domain
- [ ] Business logic operations documented
- [ ] Workflows mapped and visualized
- [ ] Page operations mapped

---

## PHASE 7: Database Schema Design (Days 7-8)

### Objective
Design complete database schema with tables, relationships, indexes, and migration strategy.

### Tasks

1. **Entity Modeling**
   - List all entities (20-50 tables typical)
   - Define table fields and types
   - Define constraints (NOT NULL, UNIQUE, CHECK)
   - Add metadata fields (created_at, updated_at, deleted_at)

2. **Relationships**
   - One-to-Many relationships
   - Many-to-Many relationships (junction tables)
   - Foreign key constraints
   - Cascade rules (DELETE, UPDATE)

3. **Multi-Tenant Data Design** (if applicable)
   - Add `tenant_id` or `restaurant_id` to relevant tables
   - Define RLS (Row Level Security) policies
   - Plan data partitioning strategy

4. **Indexing Strategy**
   - Primary keys
   - Foreign key indexes
   - Query optimization indexes
   - Full-text search indexes (if needed)

5. **Migration Planning**
   - Order migrations by dependencies
   - Define rollback procedures
   - Plan seed data strategy

6. **ERD Creation**
   - Visual diagram of all tables and relationships
   - Use Mermaid or dbdiagram.io

### Deliverables

- `docs/05-technical/schema-spec.md` - SQL schema definitions
- `docs/05-technical/erd.md` - Entity Relationship Diagram
- `docs/05-technical/migrations-plan.md` - Migration strategy

### AI Tools to Use

- Mermaid ER diagrams
- SQL formatting

### Quality Check

- [ ] 20-50 tables defined
- [ ] All relationships documented
- [ ] Indexes planned
- [ ] Multi-tenant strategy implemented (if applicable)
- [ ] ERD diagram created
- [ ] Migration order planned

---

## PHASE 8: Build Plan & Task Decomposition (Days 8-9)

### Objective
Break implementation into phases and tasks with clear dependencies and timeline.

### Tasks

1. **Phase Breakdown**
   - **Phase 0**: Provisioning (accounts, environment setup)
   - **Phase 1**: Repository Setup (Next.js, linting, structure)
   - **Phase 2**: Database Layer (migrations, seeds)
   - **Phase 3**: Shared Infrastructure (auth, theme, providers)
   - **Phase 4**: Domain Implementation (per domain)
   - **Phase 5**: Data Imports & Seeds
   - **Phase 6**: Testing & QA
   - **Phase 7**: Demo & Handoff

2. **Task Decomposition** (100+ tasks)
   - Break each phase into specific tasks
   - Define "done" criteria per task
   - Estimate effort (hours or story points)

3. **Dependency Mapping**
   - Identify task dependencies
   - Define critical path
   - Identify parallel work opportunities

4. **Domain-Specific Checklists**
   - Create per-domain implementation checklist
   - Reference BMAD operations
   - Include testing requirements

5. **Timeline Estimation**
   - Allocate weeks per phase
   - Total timeline (typically 12-16 weeks for MVP)
   - Buffer for unknowns (20-30%)

### Deliverables

- `docs/08-build-plan/README.md` - Build plan overview
- `docs/08-build-plan/master-checklist.md` - Phase-by-phase task checklist
- `docs/08-build-plan/scaffolding-checklist.md` - Repository setup tasks
- `docs/08-build-plan/domains/*.md` - Per-domain implementation checklists
- `docs/08-build-plan/fast-track.md` - Condensed execution order

### AI Tools to Use

- Markdown checklists
- Gantt chart (optional, Mermaid)

### Quality Check

- [ ] 7 phases defined
- [ ] 100+ tasks documented
- [ ] Dependencies mapped
- [ ] Domain checklists created (10-20 files)
- [ ] Timeline estimated (12-16 weeks typical)

---

## PHASE 9: PDR Creation (Days 9-10)

### Objective
Write comprehensive Product Definition & Requirements document consolidating all planning.

### Tasks

1. **Vision & Scope**
   - Product vision statement
   - Business scope and boundaries
   - Target geography and customers
   - Success metrics and KPIs

2. **Core Features Summary**
   - MVP feature list
   - Non-MVP features (future roadmap)
   - Non-goals (explicit exclusions)

3. **Architecture Summary**
   - High-level architecture
   - Tech stack rationale
   - Domain map
   - Data model summary

4. **Multi-Tenancy & Cost Strategy** (if applicable)
   - Per-client isolation approach
   - Free tier usage strategy
   - Cost tracking and alerts

5. **Security & Compliance**
   - Role-based access control
   - Data privacy policy
   - Compliance requirements
   - Accessibility standards

6. **Operational Playbook**
   - Provisioning checklist per client/tenant
   - Monitoring and alerting
   - Backup and disaster recovery
   - Support procedures

7. **Roadmap & Timeline**
   - 12-week MVP roadmap
   - Phase 2 enhancements (post-MVP)
   - Open questions and risks

### Deliverables

- `docs/06-pdr/PDR.md` - Complete Product Definition & Requirements
- `docs/06-pdr/acceptance-criteria.md` - Success criteria
- `docs/06-pdr/demo-qa-checklist.md` - Pre-demo validation

### AI Tools to Use

- Structured markdown with sections

### Quality Check

- [ ] Vision and scope clearly defined
- [ ] All features documented
- [ ] Architecture summarized
- [ ] Security and compliance covered
- [ ] Operational procedures documented
- [ ] Roadmap and timeline defined

---

## ✅ Planning Phase Complete

### Final Validation Checklist

Before declaring planning complete, verify:

- [ ] **Research**: Market analysis, consumer behavior, competitors (10-15 audited)
- [ ] **Features**: 50+ features documented, prioritized, and categorized
- [ ] **Architecture**: 10-20 domains defined, tech stack selected
- [ ] **Pages**: All pages listed (50-100), components mapped
- [ ] **Operations**: BMAD operations defined per domain
- [ ] **Database**: 20-50 tables designed, ERD created
- [ ] **Build Plan**: 7 phases, 100+ tasks, timeline estimated
- [ ] **PDR**: Comprehensive requirements document written

### Documentation Review

All files exist and are complete:
- `docs/01-research/research-summary.md`
- `docs/03-features/features.md`
- `docs/03-features/feature-matrix.md`
- `docs/05-technical/architecture.md`
- `docs/05-technical/schema-spec.md`
- `docs/05-technical/erd.md`
- `docs/05-technical/component-catalog.md`
- `docs/06-pdr/PDR.md`
- `docs/08-build-plan/master-checklist.md`
- `docs/00-methods/bmad/domain-flows/*.md`

### Next Steps

1. **Review with stakeholders**
   - Present PDR and key planning artifacts
   - Get sign-off on scope and approach
   - Adjust based on feedback

2. **Archive planning**
   - Create Git tag: `planning-complete`
   - Export planning docs for reference
   - Update `project-config.yaml` with completion status

3. **Begin implementation**
   - Follow `docs/08-build-plan/master-checklist.md`
   - Start with Phase 0 (Provisioning)
   - Work systematically through each phase

---

## 🎓 Reference Implementation

See the **Restaurant project** for a complete example:
- `/docs/06-pdr/PDR.md` - 137-line comprehensive PDR
- `/docs/08-build-plan/master-checklist.md` - 7-phase, 100+ task plan
- `/docs/01-research/research-summary.md` - Market research example
- `/docs/03-features/features.md` - 100+ features documented

## 🧠 BMAD Resources

- `docs/00-methods/bmad/vendor/BMAD-METHOD/README.md` - BMAD overview
- `docs/00-methods/bmad/vendor/BMAD-METHOD/docs/` - Full documentation
- [BMAD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [BMAD Discord](https://discord.gg/gk8jAdXWmj)

## 💡 AI Agent Tips

1. **Be systematic**: Complete each phase fully before moving on
2. **VERIFY ALWAYS**: Self-verify after EACH phase (reduces errors by 75%)
3. **Use tools**: Leverage WebSearch, WebFetch, and MCP tools
4. **Document thoroughly**: More detail now = less confusion later
5. **Ask questions**: Clarify ambiguities early
6. **Reference examples**: Look at restaurant project when stuck
7. **Track costs**: Use LangFuse to monitor token usage and optimize
8. **Specialize**: Consider using specialist agents for better quality

---

## 📊 Complete Verification Summary

### After Each Phase, Verify:

| Phase | Verification File | Threshold | Critical Criteria |
|-------|------------------|-----------|-------------------|
| Phase 1 | `validation/phase-01-research-checklist.md` | ≥80% (12/15) | Market size, 10+ sources, competitors |
| Phase 2 | `validation/phase-02-competitor-checklist.md` | ≥80% (12/15) | 10-15 competitors, 50+ features |
| Phase 3 | `validation/phase-03-features-checklist.md` | ≥80% (12/15) | 50+ features, MVP defined, user stories |
| Phase 4 | `validation/phase-04-architecture-checklist.md` | ≥80% (12/15) | 10-20 domains, tech stack, security |
| **Phase 4.5** | `validation/phase-045-ui-design-checklist.md` | **≥85% (17/20)** | User flows, wireframes, design system |
| Phase 5 | `validation/phase-05-components-checklist.md` | ≥80% (12/15) | 85%+ library reuse, theme config |
| Phase 6 | `validation/phase-06-domain-ops-checklist.md` | ≥80% (12/15) | CRUD ops, workflows, BMAD |
| Phase 7 | `validation/phase-07-database-checklist.md` | ≥85% (13/15) | 20-50 tables, RLS, ERD |
| Phase 8 | `validation/phase-08-buildplan-checklist.md` | ≥80% (12/15) | 100+ tasks, timeline |
| **Phase 9** | `validation/phase-09-pdr-checklist.md` | **≥90% (18/20)** | All 13 sections, no [TBD] |

**Higher thresholds** for Phase 4.5 (UI/UX critical) and Phase 9 (final deliverable).

### Verification Protocol

For each phase:
```
1. Complete phase work
2. Load validation/phase-XX-checklist.md
3. Check each criterion (✅ Pass or ❌ Fail)
4. Calculate: Score = (Passed / Total) × 100%
5. If score ≥ threshold → ✅ Proceed to next phase
6. If score < threshold → ❌ Fix issues, re-verify (max 3 attempts)
7. If 3 failures → Escalate to human review
8. Log results to LangFuse (if configured)
```

**Read**: `validation/chain-of-verification-protocol.md` for detailed methodology.

---

## 🤖 Multi-Agent Option (Advanced)

For higher quality planning, use **6 specialist agents** instead of a single agent:

### Agent Assignment

| Agent | File | Phases | Specialization |
|-------|------|--------|----------------|
| Researcher | `prompts/multi-agent/01-researcher-agent.md` | 1-2 | Market research, competitive analysis |
| Product Manager | `prompts/multi-agent/02-product-manager-agent.md` | 3 | Feature prioritization, user stories |
| Architect | `prompts/multi-agent/03-architect-agent.md` | 4 | System design, tech stack |
| **UI/UX Designer** | `prompts/multi-agent/04-ui-ux-designer-agent.md` | 4.5 | User flows, wireframes, design system |
| Domain Engineer | `prompts/multi-agent/05-domain-engineer-agent.md` | 5-7 | Components, operations, database |
| QA Engineer | `prompts/multi-agent/06-qa-engineer-agent.md` | 8-9 | Build plan, PDR, final QA |

### How to Use

**Tell Claude Code CLI**:
```
"Use multi-agent orchestration for this planning session.
Start with Agent 1 (Researcher).
Read: .siso/project-setup-system/prompts/multi-agent/README.md"
```

Claude will:
1. Execute Researcher agent (Phases 1-2)
2. Verify Researcher's work
3. Handoff to Product Manager agent
4. Execute PM agent (Phase 3)
5. Verify PM's work
6. Handoff to Architect → UI/UX Designer → Domain Engineer → QA Engineer
7. Each agent self-verifies before handing off
8. Final output: Complete PDR ready for implementation

**Benefits**:
- +40-60% quality improvement (specialists > generalist)
- Better verification (each agent expert in their domain)
- Clear responsibility (each agent owns their phases)

**Read**: `prompts/multi-agent/README.md` for detailed orchestration guide.

---

## 📈 Observability with LangFuse

### Track Every Decision & Optimize Costs

**LangFuse** gives you complete visibility:
- Cost per phase (which phases are expensive?)
- Token usage per tool call
- Time per phase
- Verification success rates
- Error/retry patterns

### Quick Setup

1. **Install**: `npm install langfuse`
2. **Configure**: Add keys to `.env.local`
3. **Use**: Wrap planning session in trace

**Read**: `integrations/LANGFUSE-INTEGRATION-GUIDE.md` for detailed setup.

### Example Dashboard View

After planning a restaurant app:
```
Planning Session: Restaurant Booking App
Duration: 6.5 hours
Cost: $5.12
Quality: 94/100

Phase Breakdown:
├─ Phase 1: Research       12 min  $0.47  ✅
├─ Phase 2: Competitors    18 min  $0.68  ✅
├─ Phase 3: Features       15 min  $0.52  ✅
├─ Phase 4: Architecture   45 min  $1.23  ✅
├─ Phase 4.5: UI/UX        38 min  $0.76  ✅ (1 retry)
├─ Phase 5: Components     25 min  $0.58  ✅
├─ Phase 6: Domain Ops     42 min  $0.98  ✅
├─ Phase 7: Database       32 min  $0.52  ✅
├─ Phase 8: Build Plan     28 min  $0.38  ✅
└─ Phase 9: PDR            22 min  $0.34  ✅

Verification:
├─ First-Try Pass: 8/9 (89%)
├─ Retries: 1 (Phase 4.5)
└─ Final Quality: 94/100 ✅
```

Optimize expensive phases, reduce retries, track improvements over time.

---

## 🚀 Ready to Start?

Tell your AI:

> "I want to plan a new [INDUSTRY] application. Start PHASE 1: Industry & Market Research following the MASTER-SETUP-PROMPT.md. Create comprehensive research documentation in docs/01-research/."

Good luck! 🎉
