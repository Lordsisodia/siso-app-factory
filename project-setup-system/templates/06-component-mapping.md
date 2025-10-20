# Component Mapping Template

**Project**: [PROJECT_NAME]
**Date**: [DATE]

---

## Page Component Breakdown

### Page: [PAGE_NAME]

**Route**: [/path]
**Layout**: [Marketing | Dashboard | Admin]

#### Components
1. **Header/Navigation**
   - Source: shared/ui/Header
   - Props: { user?, menuItems }

2. **Hero Section**
   - Source: custom
   - Components: HeroImage, HeroTitle, HeroCTA

3. **Content Section**
   - Source: domain/menu/ItemGrid
   - Props: { items, filters }

4. **Footer**
   - Source: shared/ui/Footer

---

## Shared Component Library

### UI Primitives
- Button (shadcn)
- Input (shadcn)
- Card (shadcn)
- Dialog (shadcn)
- Select (shadcn)

### Layout
- Container (custom)
- Grid (custom)
- Stack (custom)

### Forms
- FormField (react-hook-form + shadcn)
- SearchBar (custom)

---

**Completed**: [DATE]
