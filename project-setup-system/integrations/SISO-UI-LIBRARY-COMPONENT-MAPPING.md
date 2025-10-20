# SISO-UI-Library Component Mapping Guide

**Purpose**: Systematic component selection from SISO-UI-Library for project planning
**Library Location**: `/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/`
**Version**: 2.0
**Last Updated**: 2025-10-20

---

## 🎯 Critical Intelligence for AI Planning

**IMPORTANT**: When planning ANY new project, the AI should:

1. ✅ **Reference SISO-UI-Library** instead of planning components from scratch
2. ✅ **Map requirements to available components** from our library
3. ✅ **Document component sources** (which library/collection)
4. ✅ **Identify gaps** (components we DON'T have yet)
5. ✅ **Reuse proven patterns** instead of reinventing

---

## 📚 SISO-UI-Library Catalog

### **MASSIVE Component Ecosystem**

**Location**: `/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/`

**Scale**:
- **1,132 component files** in SISO-UI-Library
- **851 component files** in siso-app-factory (custom)
- **TOTAL: 1,983+ components**
- **139 library folders**
- **2.7GB total size**
- **Estimated 2,000-3,000 unique variants**

### Library Collections (139 Sources)

#### **Core UI Libraries**
- **shadcn-ui** - Unstyled, accessible components (primary)
- **21st-dev-ui-components** - 83 pre-built components
- **aceternity-ui** - Modern animated components
- **magic-ui** - Magical effects and animations
- **cult-ui** - Minimalist design components

#### **Design Systems**
- **chakra-ui** - Modular component library
- **mantine-library** - Full-featured React components
- **mui-library** - Material Design
- **ant-design-library** - Enterprise-grade components
- **carbon-ui** - IBM Carbon Design System
- **fluent-ui** - Microsoft Fluent Design
- **polaris-ui** - Shopify Polaris
- **spectrum-ui** - Adobe Spectrum

#### **Headless/Unstyled**
- **headless-ui** - Tailwind-focused unstyled components
- **radix-ui** - Primitive accessible components
- **ariakit-ui** - Accessible component primitives
- **reakit-ui** - Accessible toolkit

#### **Tailwind UI Collections**
- **daisyui-library** - Tailwind component library
- **flowbite-ui** - Tailwind components
- **preline-ui** - Tailwind UI components
- **hyper-ui** - Free Tailwind components
- **kitwind-ui** - Tailwind component collection
- **tailgrids-ui** - Tailwind UI blocks
- **tailblocks-ui** - Ready-made Tailwind blocks
- **kutty-ui** - Tailwind components
- **mambaui** - Tailwind components
- **meraki-ui** - Tailwind components
- **sailboat-ui** - Tailwind components
- **windmill-ui** - Tailwind components
- **wicked-blocks** - Tailwind blocks
- **rippleui-library** - Tailwind components
- **flowrift-ui** - Tailwind components

#### **Animation & Motion**
- **framer-motion-library** - Production-ready motion
- **react-spring-library** - Spring physics animations
- **gsap-library** - Professional animations
- **animejs-library** - Lightweight animation
- **motion-one-library** - Web Animations API
- **aos-library** - Animate on scroll
- **auto-animate-library** - Zero-config animations
- **hover-css** - CSS hover effects
- **animate-css** - CSS animations

#### **Carousels & Sliders**
- **swiper-library** - Modern mobile slider
- **keen-slider-library** - Touch slider
- **embla-carousel** - Lightweight carousel
- **glidejs-library** - Dependency-free slider
- **react-slick-library** - React carousel

#### **Charts & Data Visualization**
- **apexcharts-library** - Modern charts
- **chartjs-library** - Simple yet flexible
- **recharts-library** - Composable charts
- **nivo-library** - Rich data viz
- **visx-library** - Low-level viz primitives
- **victory-library** - React chart components

#### **Forms & Inputs**
- **react-hook-form-library** - Performant forms
- **formik-library** - Form management
- **react-select** - Select component
- **react-datepicker-library** - Date picker
- **react-calendar-library** - Calendar component
- **fullcalendar-library** - Full-featured calendar
- **react-big-calendar-library** - Calendar component

#### **Drag & Drop**
- **react-dnd-library** - Drag and drop
- **react-beautiful-dnd-library** - Beautiful DnD
- **dndkit-library** - Modern DnD toolkit

#### **File Uploads**
- **react-dropzone-library** - Drag-drop file upload
- **uppy-library** - Modular file uploader

#### **Icons**
- **lucide-icons** - Beautiful consistent icons
- **heroicons-library** - Tailwind-designed icons
- **phosphor-icons** - Flexible icon family

#### **Notifications & Feedback**
- **react-toastify-library** - Toast notifications
- **react-hot-toast** - Lightweight toasts
- **sonner-library** - Opinionated toast
- **notistack-library** - Snackbar notifications
- **confetti-library** - Celebration effects

#### **Utility Libraries**
- **tanstack-library** - Table, query, router, virtual
- **cmdk-library** - Command menu
- **vaul-library** - Drawer component
- **tour-guide-ui-library** - Onboarding tours

#### **Specialized**
- **restaurant-ui-library** - Restaurant-specific components
- **bike-hire-ui-library** - Bike rental components
- **lottie-library** - Lottie animations
- **particles-library** - Particle effects
- **three-fiber-library** - 3D with React Three Fiber
- **locomotive-scroll-library** - Smooth scroll
- **react-email-library** - Email templates

#### **Email Templates**
- **react-email-library** - React email components

#### **Components Folder**
Located at: `SISO-UI-Library/components/`
- **5-user-feedback** - Feedback components
- **6-user-account** - Account components
- **9-marketing** - Marketing components
- **ui** - Core UI primitives

---

## 🎯 Component Mapping Intelligence

### Phase 5: Component Planning (UPDATED WORKFLOW)

**OLD Approach** (❌ What we were doing):
1. AI lists components needed
2. AI suggests sourcing (shadcn, 21st.dev)
3. No connection to actual library

**NEW Approach** (✅ What we should do):

1. **AI loads SISO-UI-Library catalog**
   ```bash
   Reference: /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/
   ```

2. **AI maps requirements to available components**
   ```
   Need: Image carousel
   Available in SISO-UI-Library:
   ✅ swiper-library (best for mobile)
   ✅ keen-slider-library (lightweight)
   ✅ embla-carousel (dependency-free)

   Recommendation: Use swiper-library (production-proven)
   ```

3. **AI identifies gaps**
   ```
   Need: Restaurant reservation calendar
   Available: ❌ Not in library
   Action: Build custom using fullcalendar-library as base
   ```

4. **AI documents component selection**
   ```markdown
   ## Component Mapping

   | Need | Source | Library | Notes |
   |------|--------|---------|-------|
   | Carousel | Swiper | swiper-library | Mobile-optimized |
   | Charts | ApexCharts | apexcharts-library | Modern, responsive |
   | Forms | React Hook Form | react-hook-form-library | Performant |
   ```

---

## 🗺️ Component Mapping Matrix

### Common Page Types → Component Sources

#### **Homepage**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Hero Section | 21st-dev-ui-components | tailblocks-ui | `21st-dev-ui-components/hero/*` |
| Image Carousel | swiper-library | keen-slider | `swiper-library/` |
| CTA Buttons | shadcn-ui | daisyui | `shadcn-ui/button` |
| Testimonials | 21st-dev-ui-components | tailblocks | `21st-dev-ui-components/testimonials/*` |
| Footer | 21st-dev-ui-components | flowbite | `21st-dev-ui-components/footer/*` |

#### **Menu/Product Catalog**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Product Card | shadcn-ui | 21st-dev | `shadcn-ui/card` |
| Category Filters | shadcn-ui | headless-ui | `shadcn-ui/tabs` |
| Search Bar | cmdk-library | shadcn-ui | `cmdk-library/` |
| Grid Layout | Custom + Tailwind | - | `tailwind grid` |
| Image Lightbox | shadcn-ui Dialog | Custom | `shadcn-ui/dialog` |

#### **Booking/Reservation**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Calendar | fullcalendar-library | react-big-calendar | `fullcalendar-library/` |
| Date Picker | react-datepicker-library | shadcn-ui | `react-datepicker-library/` |
| Time Slots | Custom | shadcn-ui | `shadcn-ui/button` group |
| Form | react-hook-form-library | formik | `react-hook-form-library/` |

#### **Dashboard/Admin**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Data Table | tanstack-library | shadcn-ui | `tanstack-library/table` |
| Charts | apexcharts-library | recharts | `apexcharts-library/` |
| Stats Cards | shadcn-ui | 21st-dev | `shadcn-ui/card` |
| Sidebar Nav | shadcn-ui | headless-ui | `shadcn-ui/sidebar` |

#### **User Account**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Profile Form | react-hook-form | shadcn-ui | Components: `6-user-account/` |
| Settings | shadcn-ui | headless-ui | `shadcn-ui/tabs` |
| Notifications | react-hot-toast | notistack | `react-hot-toast/` |

#### **Marketing Pages**
| Need | Primary Source | Alternative | Location |
|------|----------------|-------------|----------|
| Features Grid | 21st-dev | tailblocks | Components: `9-marketing/` |
| Pricing Tables | 21st-dev | shadcn-ui | `21st-dev-ui-components/pricing/*` |
| FAQ Accordion | shadcn-ui | headless-ui | `shadcn-ui/accordion` |
| Contact Form | react-hook-form | formik | Components: `5-user-feedback/` |

---

## 🎨 Config-Driven Theming System

### Site Configuration Schema

**`siso-site-config.yaml`** (should be in every project):

```yaml
# SISO Site Configuration
# Version: 2.0

site:
  name: "Restaurant Name"
  tagline: "Best food in Bali"
  logo: "/images/logo.svg"
  favicon: "/images/favicon.ico"

theme:
  # Primary colors
  colors:
    primary: "#E63946"      # Brand red
    secondary: "#457B9D"    # Brand blue
    accent: "#F1FAEE"       # Light accent
    neutral: "#1D3557"      # Dark text
    success: "#06D6A0"
    warning: "#FFB703"
    error: "#EF233C"

  # Background colors
  background:
    primary: "#FFFFFF"
    secondary: "#F8F9FA"
    tertiary: "#E9ECEF"

  # Text colors
  text:
    primary: "#1D3557"
    secondary: "#6C757D"
    muted: "#ADB5BD"

  # Typography
  fonts:
    heading: "Playfair Display, serif"
    body: "Inter, sans-serif"
    mono: "JetBrains Mono, monospace"

  # Spacing scale (Tailwind defaults or custom)
  spacing:
    xs: "0.5rem"    # 8px
    sm: "1rem"      # 16px
    md: "1.5rem"    # 24px
    lg: "2rem"      # 32px
    xl: "3rem"      # 48px

  # Border radius
  radius:
    sm: "0.25rem"   # 4px
    md: "0.5rem"    # 8px
    lg: "1rem"      # 16px
    full: "9999px"  # Fully rounded

  # Shadows
  shadows:
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"

layout:
  # Which components to use
  header:
    variant: "sticky"           # sticky | fixed | static
    component: "Header.v1"      # From SISO-UI-Library
    show_search: true
    show_cart: true

  footer:
    variant: "simple"           # simple | detailed | minimal
    component: "Footer.v2"
    show_social: true
    show_newsletter: true

  # Page layouts
  homepage:
    hero: "Hero.fullscreen"     # fullscreen | split | minimal
    sections:
      - "Features.grid"
      - "Testimonials.carousel"
      - "CTA.centered"

  menu_page:
    layout: "grid"              # grid | list | masonry
    card_variant: "MenuCard.v2" # Which card component
    filters: "sidebar"          # sidebar | top | hidden

components:
  # Component variant selections
  buttons:
    primary: "solid"            # solid | outline | ghost
    secondary: "outline"
    size_default: "md"          # sm | md | lg

  cards:
    default: "elevated"         # elevated | flat | bordered
    hover_effect: "lift"        # lift | glow | none

  forms:
    style: "floating"           # floating | outlined | filled
    validation: "inline"        # inline | onSubmit

  modals:
    animation: "slide-up"       # slide-up | fade | scale
    overlay: "blur"             # blur | dark | light

animations:
  enabled: true
  page_transitions: true
  scroll_animations: true
  hover_effects: true
  library: "framer-motion"      # framer-motion | gsap | anime

features:
  # Enable/disable major features
  dark_mode: true
  multi_language: true
  rtl_support: false
  accessibility_mode: true
```

---

## 🧠 Component Selection Intelligence

### Mapping Algorithm for AI

```markdown
## Step 1: Identify Need
Example: "Need a menu item display"

## Step 2: Search SISO-UI-Library
Check available options:
- shadcn-ui/card
- 21st-dev-ui-components/product-cards
- Custom menu cards in components/ui

## Step 3: Evaluate Options
| Option | Pros | Cons | Effort |
|--------|------|------|--------|
| shadcn Card | Unstyled, flexible | Needs customization | Medium |
| 21st.dev Product | Pre-styled | May need adjustment | Low |
| Custom | Perfect fit | Build from scratch | High |

## Step 4: Select Based on Context
- If tight timeline → Use 21st.dev (low effort)
- If unique design → Use shadcn (flexible)
- If nothing fits → Build custom

## Step 5: Document Selection
Record in `component-catalog.md`:
- Component: MenuItemCard
- Source: 21st-dev-ui-components/product-cards/card-v3
- Customizations: Add allergen tags, dietary icons
- Effort: 2 hours customization
```

---

## 📋 Standard Component Inventory

### Every Project Needs (Check These First)

#### **Core UI Primitives** (shadcn-ui recommended)
- [ ] Button
- [ ] Input
- [ ] Textarea
- [ ] Select
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Slider
- [ ] Label
- [ ] Form
- [ ] Card
- [ ] Badge
- [ ] Avatar
- [ ] Separator

**Source**: `shadcn-ui/` - Copy into project

#### **Layout Components**
- [ ] Container
- [ ] Grid
- [ ] Stack/Flex
- [ ] Section
- [ ] Sidebar
- [ ] Header
- [ ] Footer

**Source**: Custom (Tailwind utilities) or `21st-dev-ui-components/`

#### **Navigation**
- [ ] Navbar
- [ ] Sidebar
- [ ] Breadcrumbs
- [ ] Tabs
- [ ] Pagination

**Source**: `shadcn-ui/tabs`, `21st-dev-ui-components/navbar/`

#### **Feedback**
- [ ] Toast/Notification
- [ ] Alert
- [ ] Modal/Dialog
- [ ] Drawer/Sheet
- [ ] Popover
- [ ] Tooltip
- [ ] Loading Spinner
- [ ] Skeleton
- [ ] Progress Bar

**Source**: `shadcn-ui/`, `react-hot-toast/`, `sonner-library/`

#### **Data Display**
- [ ] Table
- [ ] List
- [ ] Card Grid
- [ ] Stats/Metrics
- [ ] Timeline
- [ ] Empty State

**Source**: `tanstack-library/table`, `shadcn-ui/card`

---

## 🎯 AI Prompt Enhancement

### Add to Component Planning Phase

```markdown
## Component Planning (Phase 5) - ENHANCED

**Before planning components**, AI must:

1. **Load SISO-UI-Library catalog**
   ```
   Reference: /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/
   Read: SISO-UI-Library/COMPLETE-EXTRACTION-INVENTORY.md
   ```

2. **Map each component need**
   - Identify requirement (e.g., "Product card with image, price, CTA")
   - Search SISO-UI-Library for matches
   - Evaluate options (effort, fit, customization needed)
   - Select optimal source
   - Document selection and rationale

3. **Create sourcing strategy**
   ```markdown
   ## Component Sourcing Strategy

   **Primary Sources**:
   - UI Primitives: shadcn-ui (unstyled, accessible)
   - Pre-built Blocks: 21st-dev-ui-components (speed)
   - Animations: framer-motion-library (production-ready)
   - Forms: react-hook-form-library (performance)
   - Charts: apexcharts-library (modern)
   - Icons: lucide-icons (consistent)
   - Toasts: react-hot-toast (lightweight)

   **Custom Components** (build from scratch):
   - [Component name] - Reason: [Unique requirement not met by library]
   ```

4. **Estimate effort accurately**
   - Using library component: 0.5-2 hours (customization)
   - Building custom: 4-8 hours (from scratch)
   - Total component effort: X hours

5. **Create installation checklist**
   ```bash
   # Install required libraries
   npm install @shadcn/ui
   npx shadcn-ui@latest add button card form input

   # Copy from SISO-UI-Library
   cp -r /path/to/SISO-UI-Library/21st-dev-ui-components/hero ./src/components/

   # Install animation libraries
   npm install framer-motion
   npm install swiper
   ```
```

---

## 🎨 Config-Driven Theming Implementation

### Architecture Pattern

**Every project should have**:

1. **Site Config** (`siso-site-config.yaml`)
   - Theme tokens (colors, fonts, spacing)
   - Component variant selections
   - Layout preferences
   - Feature flags

2. **Theme Provider** (`src/shared/providers/ThemeProvider.tsx`)
   - Loads config from Supabase `site_config` table
   - Provides theme context
   - Injects CSS variables

3. **Component Variants** (`src/shared/ui/*`)
   - Components accept `variant` prop
   - Variants defined in config
   - Example: `<Button variant={siteConfig.components.buttons.primary}>`

### Database Table for Site Config

```sql
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  config JSONB NOT NULL,  -- Full YAML config as JSON
  version VARCHAR(10) DEFAULT '2.0',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT one_config_per_tenant UNIQUE (tenant_id)
);

-- RLS
CREATE POLICY tenant_config ON site_config
  FOR ALL
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Theme Provider Implementation

```typescript
// src/shared/providers/ThemeProvider.tsx
'use client'

import { createContext, useContext, useEffect } from 'react'
import { useSupabaseClient } from '@/shared/hooks/useSupabaseClient'

interface SiteConfig {
  site: { name: string; tagline: string }
  theme: { colors: {...}, fonts: {...}, ... }
  layout: { header: {...}, footer: {...}, ... }
  components: { buttons: {...}, cards: {...}, ... }
  animations: { enabled: boolean, ... }
  features: { dark_mode: boolean, ... }
}

const ThemeContext = createContext<SiteConfig | null>(null)

export function ThemeProvider({ children, initialConfig }: {
  children: React.ReactNode
  initialConfig?: SiteConfig
}) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig || defaultConfig)

  useEffect(() => {
    // Load from Supabase
    loadSiteConfig().then(setConfig)

    // Inject CSS variables
    injectCSSVariables(config.theme)
  }, [])

  return (
    <ThemeContext.Provider value={config}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useSiteConfig() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useSiteConfig must be used within ThemeProvider')
  return context
}

function injectCSSVariables(theme: SiteConfig['theme']) {
  const root = document.documentElement

  // Colors
  root.style.setProperty('--color-primary', theme.colors.primary)
  root.style.setProperty('--color-secondary', theme.colors.secondary)
  // ... all other tokens

  // Fonts
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-body', theme.fonts.body)
}
```

### Using Config in Components

```typescript
// src/components/Button.tsx
import { useSiteConfig } from '@/shared/providers/ThemeProvider'

export function Button({ children, variant, ...props }) {
  const config = useSiteConfig()

  // Use config to determine variant
  const defaultVariant = variant || config.components.buttons.primary

  return (
    <button
      className={getVariantClasses(defaultVariant)}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## ✅ Integration Checklist for Planning Phase

### Phase 5: Component Mapping (REVISED)

**AI must now do**:

- [ ] Load SISO-UI-Library catalog
- [ ] Map each page component need to library
- [ ] Document component source for each need
- [ ] Calculate effort (library vs. custom)
- [ ] Create installation commands
- [ ] Identify missing components (gaps)
- [ ] Define config-driven theming structure
- [ ] Create `siso-site-config.yaml` template
- [ ] Plan theme provider implementation
- [ ] Document component variant selections

**Output**:
- `component-catalog.md` - WITH library mappings
- `siso-site-config.yaml` - Theme configuration
- `component-installation.md` - Setup commands

---

## 🚀 Benefits of This Approach

### **Time Savings**
- ❌ **Before**: Plan 50 components from scratch (20+ hours)
- ✅ **After**: Map 50 components to library (2-3 hours)
- **Savings**: ~17 hours per project

### **Quality**
- ✅ Use battle-tested components
- ✅ Consistent patterns across projects
- ✅ Reduced bugs (proven components)

### **Flexibility**
- ✅ Config-driven theming = easy customization
- ✅ Multi-tenant without code changes
- ✅ A/B test layouts via config

### **Maintenance**
- ✅ Update library once = all projects benefit
- ✅ Component upgrades centralized
- ✅ Shared improvements

---

## 📚 Reference Documents to Create

1. **SISO-UI-Library Catalog** - Complete component inventory
2. **Component Selection Decision Tree** - When to use which
3. **Config Schema Reference** - All config options documented
4. **Theme Migration Guide** - Updating themes without code changes

---

---

## 📊 Time Savings Analysis

### Component Planning Effort

**Before (No Library Reference)**:
- Plan 50 components from scratch
- Design each component
- Research component libraries per component
- **Total**: 40+ hours

**After (With 1,983+ Component Ecosystem)**:
- Search 1,983 components for matches
- Map requirements to existing components
- Customize 10-15% for unique needs
- **Total**: 2-4 hours

**Savings**: **35-40 hours per project** (90-95% time reduction!)

### Reuse Targets

| Project Size | Components Needed | From Library (85%) | Custom (15%) | Time |
|--------------|-------------------|-------------------|--------------|------|
| Small | 30 components | 25 | 5 | ~3 hrs |
| Medium | 50 components | 42 | 8 | ~5 hrs |
| Large | 100 components | 85 | 15 | ~10 hrs |

---

**This is a GAME-CHANGER for the framework. Component reuse + config-driven theming = 10x faster project setup!** 🚀

**With 1,983+ components, we have the LARGEST curated React component library for rapid application development!**
