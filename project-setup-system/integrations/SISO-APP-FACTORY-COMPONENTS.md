# SISO App Factory Component Library - Primary Reference

**Location**: `siso-app-factory/packages/`
**Total Components**: **851 production-ready components**
**Status**: **PRIMARY component source for all projects**
**Last Updated**: 2025-10-20

---

## 🎯 Component Library Architecture

### Primary Source (Use First)
**siso-app-factory/packages/**
- ✅ Production-tested components
- ✅ Organized by domain and type
- ✅ Consistent patterns across all components
- ✅ Actively maintained
- ✅ Config-driven and themeable

### Secondary Source (Fallback)
**SISO-UI-Library** (legacy)
- Additional third-party library collections
- Use when siso-app-factory doesn't have what you need
- Located at: `/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/`

---

## 📁 SISO App Factory Structure

### **packages/ui/** - Core UI Library

**Organized into**:

#### **primitives/** (50+ categories)
Location: `packages/ui/src/primitives/`

Categories include:
- **buttons/** - Button variants for all use cases
- **cards/** - Card components (elevated, flat, bordered, etc.)
- **heroes/** - Hero section variants
- **footers/** - Footer variants
- **headers/** - Header/navigation variants
- **forms/** - Form components
- **inputs/** - Input variants
- **modals/** - Modal/dialog components
- **misc/** - Miscellaneous UI elements
- **[48+ more categories]**

#### **patterns/** (organized by type)
Location: `packages/ui/src/patterns/`

- **sections/** - Full page sections (features, pricing, testimonials, CTAs)
- **lists/** - List components (reviews, items, leaderboards)
- **layouts/** - Layout patterns
- **[more patterns]**

#### **utils/** - Utility functions
#### **hooks/** - React hooks
#### **themes/** - Theme configurations
#### **configs/** - Component configurations
#### **contexts/** - React contexts
#### **lib/** - Library functions

---

### **packages/bike-rental/** - Bike Rental Domain

**Domain-specific components for bike rental apps**:

- `src/features/product-catalog/components/` - Bike product displays
- `src/features/rental-booking/components/` - Booking UI
- `src/features/user-dashboard/components/` - User account UI
- `src/features/product-filters/components/` - Filter components
- `src/features/admin-system/components/` - Admin panels
- `src/features/review-system/components/` - Review displays
- `src/features/auth-system/components/` - Auth UI
- `src/ui/` - Shared bike rental UI

---

### **packages/restaurants/** - Restaurant Domain

**Domain-specific components for restaurant apps**:

- `src/ui/` - Restaurant-specific UI components
- Menu displays, booking systems, loyalty UI
- Table management, order systems
- POS integration UI

---

### **packages/tour-guides/** - Tour Guides Domain

**Domain-specific components for tour/activity booking**:

- `src/features/booking-system/components/` - Tour booking UI
- `src/features/availability-system/components/` - Calendar/availability
- `src/features/payment-processing/components/` - Payment UI
- `src/features/admin-panel/components/` - Tour management
- `src/ui/` - Shared tour guide UI

---

## 🎯 Component Selection Strategy

### Priority Order

**1. SISO App Factory packages/** (PRIMARY - use first)
   ```
   Check: siso-app-factory/packages/ui/src/primitives/
   Check: siso-app-factory/packages/ui/src/patterns/
   Check: siso-app-factory/packages/[domain]/src/
   ```

**2. Domain-Specific packages** (if applicable)
   ```
   Restaurant app? → Check packages/restaurants/
   Bike rental app? → Check packages/bike-rental/
   Tour booking app? → Check packages/tour-guides/
   ```

**3. SISO-UI-Library** (FALLBACK - if not found above)
   ```
   Check: /SISO-ECOSYSTEM/SISO-UI-Library/
   Only use for specialized libraries not in App Factory
   ```

**4. Build Custom** (LAST RESORT - only if truly unique)
   ```
   Build only if:
   - Not in any existing package
   - Truly unique to this project
   - Cannot adapt existing component
   ```

---

## 📋 Component Mapping Workflow

### Step 1: Identify Need
Example: "Need a pricing table for restaurant menu"

### Step 2: Search siso-app-factory First

```bash
# Check UI primitives
packages/ui/src/primitives/cards/
packages/ui/src/primitives/pricing/

# Check patterns
packages/ui/src/patterns/sections/*pricing*

# Check domain package
packages/restaurants/src/ui/
```

### Step 3: Evaluate Matches

| Source | Match Quality | Customization | Effort |
|--------|---------------|---------------|--------|
| ui/primitives/pricing/PricingCard.tsx | 90% fit | Add menu-specific fields | 1hr |
| restaurants/MenuPricingTable.tsx | 100% fit | None | 0.5hr |

**Selection**: Use `packages/restaurants/MenuPricingTable.tsx` (perfect fit)

### Step 4: Fallback to SISO-UI-Library (if needed)

Only if not found in siso-app-factory:
```bash
# Check legacy library
/SISO-ECOSYSTEM/SISO-UI-Library/21st-dev-ui-components/pricing/
```

### Step 5: Build Custom (last resort)

Only if truly unique:
```
Component: RestaurantSpecialsPricingTable
Reason: Time-based pricing display unique to restaurants
Effort: 4 hours
Base: Use packages/ui/primitives/cards/Card.tsx as foundation
```

---

## 🗺️ Domain Component Mapping

### For Restaurant Apps

**Use This Order**:
1. `packages/restaurants/` - Restaurant-specific components
2. `packages/ui/` - Core UI primitives
3. SISO-UI-Library (fallback for specialized needs)

### For Bike Rental Apps

**Use This Order**:
1. `packages/bike-rental/` - Bike rental-specific components
2. `packages/ui/` - Core UI primitives
3. SISO-UI-Library (fallback)

### For Tour/Activity Apps

**Use This Order**:
1. `packages/tour-guides/` - Tour-specific components
2. `packages/ui/` - Core UI primitives
3. SISO-UI-Library (fallback)

### For NEW Industry (not yet in packages)

**Use This Order**:
1. `packages/ui/` - Core UI primitives (adapt from here)
2. Similar domain package (e.g., tour-guides for wellness retreats)
3. SISO-UI-Library (for specialized libraries)
4. Build custom AND contribute back to siso-app-factory

---

## 📊 Expected Reuse Rates

### Target Component Reuse

| App Type | From siso-app-factory | From SISO-UI-Library | Custom | Total Reuse |
|----------|----------------------|---------------------|--------|-------------|
| **Restaurant** | 80% | 5% | 15% | 85% |
| **Bike Rental** | 80% | 5% | 15% | 85% |
| **Tour Guides** | 80% | 5% | 15% | 85% |
| **NEW Industry** | 60% | 20% | 20% | 80% |

### Time Savings

**Restaurant App** (50 components needed):
- 40 from packages/restaurants + packages/ui (0.5hr each = 20hr)
- 2 from SISO-UI-Library (1hr each = 2hr)
- 8 custom (4hr each = 32hr)
- **Total**: 54 hours
- **vs. All custom**: 200 hours
- **Savings**: 146 hours (73% reduction)

**NEW Industry App** (50 components needed):
- 30 from packages/ui (1hr each = 30hr)
- 10 from SISO-UI-Library (2hr each = 20hr)
- 10 custom (4hr each = 40hr)
- **Total**: 90 hours
- **vs. All custom**: 200 hours
- **Savings**: 110 hours (55% reduction)

---

## 🚀 AI Component Planning Instructions

### Updated Phase 5 Workflow

```markdown
## Phase 5: Component Mapping

**Step 1**: Load siso-app-factory structure
Read: siso-app-factory/packages/README.md
Explore: packages/ui/src/primitives/
Explore: packages/ui/src/patterns/

**Step 2**: Check domain packages (if applicable)
If restaurant → Read: packages/restaurants/
If bike rental → Read: packages/bike-rental/
If tour booking → Read: packages/tour-guides/

**Step 3**: For each page component need:
1. Search siso-app-factory/packages/ui first
2. Search domain package (restaurants, bike-rental, tour-guides)
3. Fallback to SISO-UI-Library only if not found
4. Build custom only if no match exists

**Step 4**: Document mapping
Create table with:
- Component need
- siso-app-factory source (if available)
- SISO-UI-Library source (if fallback)
- Customization required
- Effort estimate

**Step 5**: Calculate reuse percentage
Target: 85%+ from siso-app-factory + SISO-UI-Library
Maximum custom: 15%
```

---

## ✅ Quality Criteria

### Component Selection Must:
- [ ] Prioritize siso-app-factory over SISO-UI-Library
- [ ] Achieve 85%+ reuse rate
- [ ] Document all component sources
- [ ] Estimate effort accurately
- [ ] Justify custom builds (why existing won't work)
- [ ] Create installation/import checklist

---

## 📚 Additional References

- **Component Inventory**: `integrations/COMPONENT-INVENTORY-ACCURATE.md`
- **SISO-UI-Library Reference**: `integrations/SISO-UI-LIBRARY-COMPONENT-MAPPING.md` (fallback only)
- **Theming System**: `integrations/CONFIG-DRIVEN-THEMING-GUIDE.md`

---

**siso-app-factory is your PRIMARY component source. Use it first, always!** 🎯
