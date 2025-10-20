# Component Mapping Template

**Project**: [PROJECT_NAME]
**Date**: [DATE]

---

## 🎯 CRITICAL: Load SISO-UI-Library First!

**Before planning ANY components:**

```
Read: /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/COMPLETE-EXTRACTION-INVENTORY.md

Available: 167+ components, actions, utilities across 140+ library sources
```

**DO NOT plan components from scratch. Map to existing library first!**

---

## 📋 Page Component Breakdown

### Page: [PAGE_NAME]

**Route**: [/path]
**Layout**: [Marketing | Dashboard | Admin]

#### Components Needed → Library Mapping

| Component Need | SISO-UI-Library Source | Alternative | Customization | Effort |
|----------------|------------------------|-------------|---------------|--------|
| Header/Nav | 21st-dev-ui-components/navbar/nav-v3 | shadcn-ui/navigation-menu | Logo, menu items | 1hr |
| Hero Section | 21st-dev-ui-components/hero/fullscreen-v2 | tailblocks-ui | Images, copy | 2hr |
| Product Grid | shadcn-ui/card + custom layout | 21st-dev product cards | Item-specific fields | 3hr |
| Search Bar | cmdk-library | shadcn-ui/command | Styling | 1hr |
| Footer | 21st-dev-ui-components/footer/footer-v5 | flowbite-ui | Links, social | 1hr |

**Total Effort**: 8 hours (vs. 20+ hours building from scratch)

---

## Shared Component Library

### UI Primitives (shadcn-ui)
Location: `/SISO-UI-Library/shadcn-ui/`

- [ ] Button - `shadcn-ui/button`
- [ ] Input - `shadcn-ui/input`
- [ ] Card - `shadcn-ui/card`
- [ ] Dialog - `shadcn-ui/dialog`
- [ ] Select - `shadcn-ui/select`
- [ ] Form - `shadcn-ui/form`
- [ ] Badge - `shadcn-ui/badge`
- [ ] Avatar - `shadcn-ui/avatar`
- [ ] Tabs - `shadcn-ui/tabs`
- [ ] Accordion - `shadcn-ui/accordion`

### Pre-Built Blocks (21st.dev)
Location: `/SISO-UI-Library/21st-dev-ui-components/`

- [ ] Hero sections (10+ variants)
- [ ] Features grids (8+ variants)
- [ ] Testimonials (6+ variants)
- [ ] Pricing tables (5+ variants)
- [ ] CTA sections (8+ variants)
- [ ] Footers (7+ variants)

### Animations
Location: `/SISO-UI-Library/framer-motion-library/`

- [ ] Page transitions - `framer-motion`
- [ ] Scroll animations - `aos-library`
- [ ] Hover effects - `hover-css`

### Forms
Location: `/SISO-UI-Library/react-hook-form-library/`

- [ ] Form management - `react-hook-form`
- [ ] Validation - Use with Zod

### Charts (if needed)
Location: `/SISO-UI-Library/apexcharts-library/`

- [ ] Line/Bar charts - `apexcharts`
- [ ] Alternative: `recharts-library`

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
# Install shadcn-ui components
npx shadcn-ui@latest add button card form input dialog

# Install animation libraries
npm install framer-motion aos

# Install form libraries
npm install react-hook-form @hookform/resolvers zod

# Install utility libraries
npm install clsx tailwind-merge

# Copy from SISO-UI-Library
cp -r /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/21st-dev-ui-components/hero ./src/components/
```

---

**Completed**: [DATE]
**Components Mapped**: [X from library, Y custom]
**Estimated Effort**: [Z hours total]
