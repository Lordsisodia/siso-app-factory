# Phase 6: Domain Operations (BMAD) - Verification Checklist

## Overview
**Objective**: Define all domain operations (CRUD + business logic) and workflows.
**Deliverables**: `docs/00-methods/bmad/overview.md`, `domain-flows/*.md`, `mapping-page-ops.md`
**Pass Threshold**: ≥ 80% (12/15)

## Criteria
1. [ ] BMAD framework loaded and understood
2. [ ] Each domain has CRUD operations defined (Create, Read, Update, Delete)
3. [ ] Each domain has business operations (domain-specific logic beyond CRUD)
4. [ ] Validation operations defined (input validation, business rule checks)
5. [ ] Authorization operations defined (who can do what)
6. [ ] Domain operations mapped to pages (which page uses which operation)
7. [ ] User-triggered workflows documented (e.g., "Guest creates booking" flow)
8. [ ] System-triggered workflows (e.g., "Send reminder 24h before booking")
9. [ ] Cross-domain workflows (operations spanning multiple domains)
10. [ ] Integration workflows (operations calling external APIs)
11. [ ] Domain flow diagrams created (Mermaid: process flows)
12. [ ] Error handling defined (what happens when operation fails)
13. [ ] Transaction boundaries identified (which operations must be atomic)
14. [ ] Performance considerations (caching, batch operations)
15. [ ] Security considerations (authorization checks at operation level)

**Critical**: 2, 3, 6, 7, 11 (CRUD, business ops, mapping, workflows, diagrams)

---
*Version 1.0 | 2025-10-21*
