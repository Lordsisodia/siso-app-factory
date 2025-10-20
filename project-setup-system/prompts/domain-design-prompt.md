# Domain Design AI Prompt

Design detailed operations and workflows for **[DOMAIN_NAME]** domain.

## Your Task

### 1. Define Domain Operations (2 hours per domain)
Using BMAD methodology, define:

**CRUD Operations**:
- Create, Read, Update, Delete for each entity
- Input/output schemas (TypeScript types)
- Validation rules
- Authorization checks

**Business Operations**:
- Domain-specific logic (e.g., `applyDiscount`, `calculatePoints`)
- Multi-step workflows
- Cross-domain coordination

**Example**:
```typescript
// Operation: createMenuItem
Input: { name, price, categoryId, ... }
Validation: name required, price > 0, categoryId exists
Authorization: Manager or Owner only
Output: MenuItem entity
Side effects: Invalidate menu cache
```

### 2. Map Pages to Operations (1 hour)
For each page in this domain:
- List components needed
- Map operations used
- Define data requirements
- Document workflows

### 3. Create Domain Data Model (1 hour)
- Define entities (TypeScript interfaces)
- Define relationships (Mermaid ERD)
- Plan indexes and constraints

## Deliverable

Create `docs/08-build-plan/domains/[domain-name].md` using template

**Requirements**:
- ✅ All CRUD operations defined
- ✅ Business operations documented
- ✅ Pages mapped to operations
- ✅ Data model complete with relationships

## Time Estimate
~4 hours per domain × 10-15 domains = 40-60 hours total

## Optimization
Can be done in parallel across domains

## Next Phase
**Phase 7: Database Schema Design**
