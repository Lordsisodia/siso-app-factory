# Component Mapping Template

**Project**: [PROJECT_NAME]
**Date**: [DATE]

---

## 🎯 CRITICAL: Load SISO Component Ecosystem First!

**Before planning ANY components:**

```
SISO Component Ecosystem:
- 1,132 components in SISO-UI-Library (139 library sources)
- 851 components in siso-app-factory (custom, production-tested)
- TOTAL: 1,983+ components
- Size: 2.7GB
- Variants: 2,000-3,000 estimated

Location: /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/
Reference: integrations/COMPONENT-INVENTORY-ACCURATE.md
```

**MANDATORY: Map to siso-app-factory first, then fallback to SISO-UI-Library!**

**Component Selection Priority**:
1. ✅ siso-app-factory/packages/ (PRIMARY - 851 components)
2. ✅ siso-app-factory/packages/[domain]/ (if industry match)
3. ⚠️ SISO-UI-Library (FALLBACK - legacy library)
4. ❌ Build custom (LAST RESORT)

---

## 📋 Page Component Breakdown

### Page: [PAGE_NAME]

**Route**: [/path]
**Layout**: [Marketing | Dashboard | Admin]

#### Components Needed → siso-app-factory Mapping

| Component Need | siso-app-factory Source | Fallback (SISO-UI-Library) | Customization | Effort |
|----------------|-------------------------|---------------------------|---------------|--------|
| Header/Nav | packages/ui/src/primitives/headers/Header.v3 | 21st-dev navbar | Logo, menu | 0.5hr |
| Hero Section | packages/ui/src/primitives/heroes/HeroFullscreen.v2 | 21st-dev hero | Images, copy | 1hr |
| Product Grid | packages/ui/src/patterns/sections/ProductGrid.tsx | 21st-dev | Fields | 2hr |
| Search Bar | packages/ui/src/primitives/inputs/SearchBar.tsx | cmdk-library | Styling | 0.5hr |
| Footer | packages/ui/src/primitives/footers/Footer.v5 | 21st-dev | Links, social | 0.5hr |

**Total Effort**: 4.5 hours (from siso-app-factory) vs. 40+ hours from scratch

**Reuse Rate**: 100% from siso-app-factory (0% custom needed)

---

## siso-app-factory Component Library (PRIMARY)

### UI Primitives
Location: `siso-app-factory/packages/ui/src/primitives/`

- [ ] Buttons - `primitives/buttons/*`
- [ ] Cards - `primitives/cards/*`
- [ ] Headers - `primitives/headers/*`
- [ ] Footers - `primitives/footers/*`
- [ ] Heroes - `primitives/heroes/*`
- [ ] Forms - `primitives/forms/*`
- [ ] Inputs - `primitives/inputs/*`
- [ ] Modals - `primitives/modals/*`
- [ ] [40+ more categories...]

### Pattern Components
Location: `siso-app-factory/packages/ui/src/patterns/`

- [ ] Sections - `patterns/sections/*` (features, pricing, CTAs, testimonials)
- [ ] Lists - `patterns/lists/*` (reviews, items, leaderboards)
- [ ] Layouts - `patterns/layouts/*`

### Domain Packages (Industry-Specific)

#### For Restaurant Apps
Location: `siso-app-factory/packages/restaurants/`
- [ ] Menu displays
- [ ] Booking systems
- [ ] Loyalty UI
- [ ] Table management
- [ ] Order systems

#### For Bike Rental Apps
Location: `siso-app-factory/packages/bike-rental/`
- [ ] Product catalog - `features/product-catalog/components/`
- [ ] Booking UI - `features/rental-booking/components/`
- [ ] User dashboard - `features/user-dashboard/components/`
- [ ] Filters - `features/product-filters/components/`
- [ ] Admin - `features/admin-system/components/`
- [ ] Reviews - `features/review-system/components/`

#### For Tour/Activity Apps
Location: `siso-app-factory/packages/tour-guides/`
- [ ] Booking system - `features/booking-system/components/`
- [ ] Availability - `features/availability-system/components/`
- [ ] Payment - `features/payment-processing/components/`
- [ ] Admin - `features/admin-panel/components/`

---

## SISO-UI-Library (FALLBACK - Legacy)

**Use only if not found in siso-app-factory**

Location: `/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/`

Useful for specialized libraries:
- Charts: `apexcharts-library`, `recharts-library`
- Animations: `framer-motion-library`, `gsap-library`
- Advanced forms: `react-hook-form-library`
- Carousels: `swiper-library`, `keen-slider-library`
- Icons: `lucide-icons`, `heroicons-library`

---

## 🎨 Site Configuration

**Create**: `siso-site-config.yaml`

```yaml
theme:
  colors:
    primary: "#E63946"
    secondary: "#457B9D"
    accent: "#F1FAEE"

  fonts:
    heading: "'Playfair Display', serif"
    body: "'Inter', sans-serif"

layout:
  header:
    component: "Header.v1"      # From 21st-dev or custom
    variant: "sticky"

  homepage:
    hero: "Hero.fullscreen"     # From 21st-dev-ui-components
    sections:
      - "Features.grid"
      - "Testimonials.carousel"
      - "CTA.centered"

components:
  buttons:
    primary:
      variant: "solid"
      size: "md"

  cards:
    default:
      variant: "elevated"
      hover_effect: "lift"
```

**See**: `integrations/CONFIG-DRIVEN-THEMING-GUIDE.md` for complete schema

---

## 📊 Component Gap Analysis

### Components We HAVE (from SISO-UI-Library)
- [List all matched components]

### Components We DON'T HAVE (need to build)
- [List gaps]
- [Estimate custom build effort]

**Total Effort**:
- Library components: X hours
- Custom components: Y hours
- **Total**: Z hours

---

## ✅ Installation Checklist

```bash
# PRIMARY: Copy from siso-app-factory
cp -r siso-app-factory/packages/ui/src/primitives/* ./src/components/ui/
cp -r siso-app-factory/packages/ui/src/patterns/* ./src/components/patterns/

# If domain match exists
cp -r siso-app-factory/packages/restaurants/* ./src/domains/menu/  # For restaurant apps
cp -r siso-app-factory/packages/bike-rental/* ./src/domains/rental/  # For bike apps
cp -r siso-app-factory/packages/tour-guides/* ./src/domains/tours/  # For tour apps

# Install required dependencies
npm install framer-motion react-hook-form @hookform/resolvers zod clsx tailwind-merge

# FALLBACK: Only if needed from SISO-UI-Library
cp -r /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/[specific-library]/* ./src/components/
```

---

**Completed**: [DATE]
**Components Mapped**: [X from library, Y custom]
**Estimated Effort**: [Z hours total]
