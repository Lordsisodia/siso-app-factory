# Phase 7: Database Schema Design - Verification Checklist

## Overview
**Objective**: Design complete database schema with 20-50 tables, RLS policies, migrations.
**Deliverables**: `docs/05-technical/schema-spec.md` (SQL DDL), `erd.md`, `migrations-plan.md`
**Pass Threshold**: ≥ 85% (13/15) - Higher because DB is critical

## Criteria
1. [ ] 20-50 tables designed (typical for SaaS app)
2. [ ] Each table has: Fields, types, constraints (NOT NULL, UNIQUE, CHECK)
3. [ ] Metadata fields added (created_at, updated_at, deleted_at for soft deletes)
4. [ ] Relationships defined (one-to-many, many-to-many with junction tables)
5. [ ] Foreign key constraints with cascade rules (ON DELETE, ON UPDATE)
6. [ ] Multi-tenant design: tenant_id column added to all tenant-specific tables
7. [ ] RLS policies defined (users see only their data, staff see only their tenant)
8. [ ] SQL DDL format with semantic comments (+28% accuracy per research)
9. [ ] Indexing strategy: Primary keys, foreign keys, query optimization, full-text search
10. [ ] Migration plan by dependencies (which tables must be created first)
11. [ ] ERD created (Entity Relationship Diagram in Mermaid)
12. [ ] Data types optimized (VARCHAR vs TEXT, INT vs BIGINT, TIMESTAMP vs DATE)
13. [ ] Enum types or check constraints for limited values (status: pending/confirmed/cancelled)
14. [ ] Unique constraints on natural keys (e.g., email unique per tenant)
15. [ ] Performance estimated (table sizes, query complexity, index sizes)

**Critical**: 1, 4, 6, 7, 8, 9, 11 (tables, relationships, multi-tenant, RLS, SQL DDL, indexes, ERD)

---
*Version 1.0 | 2025-10-21*
