# Config-Driven Theming & Templating System

**Purpose**: Build sites where everything (colors, components, layouts) is controlled by configuration
**Version**: 2.0
**Last Updated**: 2025-10-20

---

## 🎯 Vision: Zero-Code Customization

**Goal**: Change entire site appearance and components without touching code

**Method**: YAML config file → Database → CSS variables + component variants

---

## 📁 System Architecture

### Three-Layer System

```
1. YAML Config File (siso-site-config.yaml)
   ↓
2. Supabase site_config Table
   ↓
3. Runtime Theme Provider
   ↓
4. Components (read config, apply variants)
```

---

## 📋 1. Site Config Schema

**`siso-site-config.yaml`** (lives in project root AND in database):

```yaml
# SISO Site Configuration v2.0

meta:
  config_version: "2.0"
  tenant_id: "restaurant-xyz"
  last_updated: "2025-10-20"

# Basic site info
site:
  name: "Ayam Bakar Sunset"
  tagline: "Authentic Balinese Grilled Chicken"
  description: "Experience the best grilled chicken in Seminyak"
  logo: "/images/logo.svg"
  favicon: "/images/favicon.ico"
  og_image: "/images/og-default.jpg"

# Complete theme tokens
theme:
  # Brand colors (CSS custom properties)
  colors:
    primary:
      50: "#FFF5F5"
      100: "#FED7D7"
      500: "#E63946"     # Main brand color
      600: "#C53030"
      900: "#742A2A"

    secondary:
      50: "#EDF7FF"
      500: "#457B9D"     # Secondary brand
      900: "#1E3A5F"

    accent:
      500: "#F1FAEE"     # Accent highlights

    neutral:
      50: "#FAFAFA"
      100: "#F4F4F5"
      500: "#71717A"
      900: "#1D3557"     # Dark text

    semantic:
      success: "#06D6A0"
      warning: "#FFB703"
      error: "#EF233C"
      info: "#457B9D"

  # Typography
  typography:
    fonts:
      heading: "'Playfair Display', serif"
      body: "'Inter', sans-serif"
      mono: "'JetBrains Mono', monospace"

    sizes:
      xs: "0.75rem"      # 12px
      sm: "0.875rem"     # 14px
      base: "1rem"       # 16px
      lg: "1.125rem"     # 18px
      xl: "1.25rem"      # 20px
      "2xl": "1.5rem"    # 24px
      "3xl": "1.875rem"  # 30px
      "4xl": "2.25rem"   # 36px
      "5xl": "3rem"      # 48px

    weights:
      light: 300
      normal: 400
      medium: 500
      semibold: 600
      bold: 700

    line_heights:
      tight: 1.25
      normal: 1.5
      relaxed: 1.75

  # Spacing (Tailwind scale)
  spacing:
    xs: "0.5rem"       # 8px
    sm: "1rem"         # 16px
    md: "1.5rem"       # 24px
    lg: "2rem"         # 32px
    xl: "3rem"         # 48px
    "2xl": "4rem"      # 64px

  # Border radius
  radius:
    none: "0"
    sm: "0.25rem"      # 4px
    md: "0.5rem"       # 8px
    lg: "1rem"         # 16px
    xl: "1.5rem"       # 24px
    full: "9999px"     # Fully rounded

  # Shadows
  shadows:
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"

# Layout configuration
layout:
  # Global layout
  container:
    max_width: "1280px"         # max-w-7xl
    padding: "1rem"             # px-4

  # Header
  header:
    variant: "sticky"           # sticky | fixed | static
    component: "Header.v1"
    height: "4rem"              # 64px
    background: "primary"       # uses theme.colors.primary
    transparency: false
    blur: true
    show:
      logo: true
      search: true
      cart: false
      user_menu: true
      language_switcher: true

  # Footer
  footer:
    variant: "detailed"         # minimal | simple | detailed
    component: "Footer.v2"
    columns: 4
    background: "neutral-900"
    show:
      logo: true
      social: true
      newsletter: true
      sitemap: true

  # Sidebar (for admin/dashboard)
  sidebar:
    variant: "collapsible"      # fixed | collapsible | overlay
    width: "16rem"              # 256px
    collapsed_width: "4rem"     # 64px

# Page-specific layouts
pages:
  homepage:
    sections:
      - type: "hero"
        component: "Hero.fullscreen"
        background_image: "/images/hero-bg.jpg"
        overlay: true
        overlay_opacity: 0.4

      - type: "features"
        component: "Features.grid"
        columns: 3
        style: "cards"          # cards | icons | minimal

      - type: "cta"
        component: "CTA.centered"
        background: "primary"

      - type: "testimonials"
        component: "Testimonials.carousel"
        autoplay: true
        interval: 5000

  menu_page:
    layout: "grid"              # grid | list | masonry
    columns: 3                  # Desktop
    columns_mobile: 1
    card_variant: "MenuCard.v2"
    filter_position: "sidebar"  # sidebar | top | hidden
    sort_options: ["name", "price", "popular"]

  booking_page:
    calendar_variant: "inline"  # inline | modal
    time_slot_style: "buttons"  # buttons | dropdown

# Component variant selections
components:
  # Buttons
  buttons:
    primary:
      variant: "solid"          # solid | outline | ghost | link
      size: "md"                # sm | md | lg
      rounded: "md"             # sm | md | lg | full

    secondary:
      variant: "outline"
      size: "md"
      rounded: "md"

  # Cards
  cards:
    default:
      variant: "elevated"       # elevated | flat | bordered
      padding: "md"
      rounded: "lg"
      hover_effect: "lift"      # lift | glow | border | none

    menu_item:
      variant: "MenuCard.v2"    # Custom component variant
      show_image: true
      show_price: true
      show_description: true
      show_allergens: true

  # Forms
  forms:
    input_style: "floating"     # floating | outlined | filled
    label_position: "top"       # top | inline | floating
    validation: "inline"        # inline | onSubmit | none
    rounded: "md"

  # Modals
  modals:
    animation: "slide-up"       # slide-up | fade | scale | none
    overlay: "blur"             # blur | dark | light | none
    close_on_outside: true

  # Navigation
  navigation:
    style: "centered"           # centered | justified | inline
    mobile_menu: "drawer"       # drawer | dropdown | fullscreen

# Animation settings
animations:
  enabled: true
  reduced_motion: false         # Respect prefers-reduced-motion
  duration:
    fast: "150ms"
    normal: "300ms"
    slow: "500ms"

  page_transitions:
    enabled: true
    type: "fade"                # fade | slide | scale

  scroll_animations:
    enabled: true
    library: "aos"              # aos | framer-motion | gsap
    offset: 120

  hover_effects:
    enabled: true
    buttons: "lift"             # lift | glow | scale
    cards: "lift-shadow"

# Feature flags
features:
  dark_mode:
    enabled: true
    default: "light"            # light | dark | system
    switcher_position: "header" # header | footer | hidden

  multi_language:
    enabled: true
    default: "en"
    supported: ["en", "id"]
    switcher: "dropdown"        # dropdown | flags | hidden

  rtl_support:
    enabled: false

  accessibility_mode:
    enabled: true
    high_contrast: true
    focus_indicators: true

  # Domain-specific features
  menu:
    show_allergens: true
    show_dietary_tags: true
    show_nutritional_info: false
    enable_search: true
    enable_filters: true

  booking:
    require_login: false        # Guest booking allowed
    require_payment: true       # Deposit required
    show_availability: true

  loyalty:
    enabled: true
    points_per_dollar: 1
    tiers: ["silver", "gold", "platinum"]

# Integrations
integrations:
  analytics:
    google_analytics:
      enabled: true
      tracking_id: "G-XXXXXXXXXX"
    mixpanel:
      enabled: true
      token: "xxxxx"

  payments:
    stripe:
      enabled: true
      mode: "test"              # test | live
      currency: "IDR"

  maps:
    google_maps:
      enabled: true
      api_key: "env:GOOGLE_MAPS_API_KEY"
      default_zoom: 15

  social:
    instagram: "https://instagram.com/restaurant"
    facebook: "https://facebook.com/restaurant"
    tiktok: "https://tiktok.com/@restaurant"

# SEO & Meta
seo:
  default_og_image: "/images/og-default.jpg"
  twitter_card: "summary_large_image"
  twitter_handle: "@restaurant"
  keywords: ["restaurant", "bali", "indonesian food"]

# Performance
performance:
  image_optimization:
    enabled: true
    quality: 85
    formats: ["webp", "jpg"]
    sizes: [640, 768, 1024, 1280, 1536]

  lazy_loading:
    images: true
    components: true
    below_fold: true

  prefetch:
    critical_pages: ["/menu", "/booking"]

# Localization
localization:
  default_locale: "en"
  locales:
    - code: "en"
      name: "English"
      currency: "USD"
      date_format: "MM/DD/YYYY"

    - code: "id"
      name: "Bahasa Indonesia"
      currency: "IDR"
      date_format: "DD/MM/YYYY"
```

---

## 💾 2. Database Schema

### Site Config Table

```sql
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  config JSONB NOT NULL,              -- Full config as JSON
  version VARCHAR(10) DEFAULT '2.0',
  active BOOLEAN DEFAULT true,        -- For A/B testing multiple configs
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT one_active_config_per_tenant UNIQUE (tenant_id, active) WHERE active = true
);

CREATE INDEX idx_site_config_tenant ON site_config(tenant_id);

-- RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_config ON site_config
  FOR ALL
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### Theme Variants Table (Optional - for A/B testing)

```sql
CREATE TABLE theme_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name VARCHAR(100) NOT NULL,         -- "Summer Theme", "Dark Mode", etc.
  config_diff JSONB NOT NULL,         -- Only changed values
  active_percentage INT DEFAULT 0,    -- For A/B testing
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ⚙️ 3. Theme Provider Implementation

### React Context Provider

**`src/shared/providers/ThemeProvider.tsx`**:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/shared/lib/supabase/client'
import yaml from 'js-yaml'

interface SiteConfig {
  meta: { config_version: string; tenant_id: string }
  site: { name: string; tagline: string; logo: string }
  theme: {
    colors: Record<string, any>
    typography: { fonts: {...}, sizes: {...}, ... }
    spacing: Record<string, string>
    radius: Record<string, string>
    shadows: Record<string, string>
  }
  layout: { header: {...}, footer: {...}, ... }
  pages: Record<string, any>
  components: Record<string, any>
  animations: { enabled: boolean, ... }
  features: Record<string, any>
  integrations: Record<string, any>
}

const ThemeContext = createContext<SiteConfig | null>(null)

export function ThemeProvider({
  children,
  initialConfig,
}: {
  children: React.ReactNode
  initialConfig: SiteConfig
}) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig)

  useEffect(() => {
    // Inject CSS variables from config
    injectThemeVariables(config.theme)

    // Set up realtime subscription for config changes
    const supabase = createClient()
    const channel = supabase
      .channel('site-config-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_config',
        },
        (payload) => {
          const newConfig = payload.new.config as SiteConfig
          setConfig(newConfig)
          injectThemeVariables(newConfig.theme)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [config])

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

// Inject CSS variables into :root
function injectThemeVariables(theme: SiteConfig['theme']) {
  const root = document.documentElement

  // Colors
  Object.entries(theme.colors).forEach(([colorName, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorName}-${shade}`, value as string)
      })
    } else {
      root.style.setProperty(`--color-${colorName}`, shades)
    }
  })

  // Typography
  root.style.setProperty('--font-heading', theme.typography.fonts.heading)
  root.style.setProperty('--font-body', theme.typography.fonts.body)
  root.style.setProperty('--font-mono', theme.typography.fonts.mono)

  Object.entries(theme.typography.sizes).forEach(([name, value]) => {
    root.style.setProperty(`--font-size-${name}`, value)
  })

  // Spacing
  Object.entries(theme.spacing).forEach(([name, value]) => {
    root.style.setProperty(`--spacing-${name}`, value)
  })

  // Border radius
  Object.entries(theme.radius).forEach(([name, value]) => {
    root.style.setProperty(`--radius-${name}`, value)
  })

  // Shadows
  Object.entries(theme.shadows).forEach(([name, value]) => {
    root.style.setProperty(`--shadow-${name}`, value)
  })
}
```

### Load Config Server-Side

**`src/shared/lib/config/load-site-config.ts`**:

```typescript
import { createClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getSiteConfig = cache(async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_config')
    .select('config')
    .eq('active', true)
    .single()

  if (error || !data) {
    // Fallback to default config
    return getDefaultConfig()
  }

  return data.config as SiteConfig
})

function getDefaultConfig(): SiteConfig {
  // Load from siso-site-config.yaml or hardcoded defaults
  return { ... }
}
```

---

## 🎨 4. Tailwind Integration

### Extend Tailwind Config

**`tailwind.config.ts`**:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Colors from CSS variables
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          500: 'var(--color-secondary-500)',
          900: 'var(--color-secondary-900)',
        },
        // ... repeat for all colors
      },

      // Fonts from CSS variables
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },

      // Spacing from CSS variables
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },

      // Border radius
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },

      // Shadows
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
    },
  },
  plugins: [],
}

export default config
```

### Global CSS

**`src/app/globals.css`**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* These will be injected by ThemeProvider */
    /* But provide defaults for SSR/initial load */

    /* Colors */
    --color-primary-500: #E63946;
    --color-secondary-500: #457B9D;
    --color-neutral-900: #1D3557;

    /* Typography */
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Inter', sans-serif;

    /* Spacing */
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;

    /* Border radius */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;

    /* Shadows */
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  /* Dark mode (if enabled) */
  .dark {
    --color-primary-500: #DC2F40;
    /* ... adjust colors for dark mode */
  }
}
```

---

## 🧩 5. Component Variant System

### Component with Variant Support

**Example: `src/shared/ui/Button.tsx`**:

```typescript
'use client'

import { useSiteConfig } from '@/shared/providers/ThemeProvider'
import { cn } from '@/shared/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant: propVariant,
  size: propSize,
  className,
  children,
  ...props
}: ButtonProps) {
  const config = useSiteConfig()

  // Use config defaults if no prop provided
  const variant = propVariant || config.components.buttons.primary.variant
  const size = propSize || config.components.buttons.primary.size

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'border border-secondary-500 text-secondary-500 hover:bg-secondary-50',
    ghost: 'hover:bg-neutral-100',
    link: 'underline hover:no-underline',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Menu Card with Config

**`src/domains/menu/components/MenuItemCard.tsx`**:

```typescript
'use client'

import { useSiteConfig } from '@/shared/providers/ThemeProvider'
import { Card } from '@/shared/ui/Card'
import Image from 'next/image'

export function MenuItemCard({ item }) {
  const config = useSiteConfig()
  const cardConfig = config.components.cards.menu_item

  return (
    <Card variant={config.components.cards.default.variant}>
      {cardConfig.show_image && (
        <Image
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-md">
        <h3 className="font-heading text-xl">{item.name}</h3>

        {cardConfig.show_description && (
          <p className="text-sm text-neutral-500 mt-2">{item.description}</p>
        )}

        {cardConfig.show_price && (
          <p className="text-lg font-semibold text-primary-500 mt-2">
            {item.price}
          </p>
        )}

        {cardConfig.show_allergens && item.allergens?.length > 0 && (
          <div className="flex gap-2 mt-2">
            {item.allergens.map(allergen => (
              <Badge key={allergen}>{allergen}</Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
```

---

## 🔄 6. Config Management

### Admin UI for Config Editing

```typescript
// src/app/admin/config/page.tsx
'use client'

import { useState } from 'react'
import { useSiteConfig } from '@/shared/providers/ThemeProvider'
import { updateSiteConfig } from '@/app/actions/config-actions'

export default function ConfigEditor() {
  const config = useSiteConfig()
  const [editedConfig, setEditedConfig] = useState(config)

  async function handleSave() {
    await updateSiteConfig(editedConfig)
    // Config updates via realtime subscription
  }

  return (
    <div>
      <h1>Site Configuration</h1>

      {/* Color picker for each theme color */}
      <section>
        <h2>Theme Colors</h2>
        <ColorPicker
          label="Primary Color"
          value={editedConfig.theme.colors.primary[500]}
          onChange={(color) => {
            setEditedConfig({
              ...editedConfig,
              theme: {
                ...editedConfig.theme,
                colors: {
                  ...editedConfig.theme.colors,
                  primary: { ...editedConfig.theme.colors.primary, 500: color }
                }
              }
            })
          }}
        />
      </section>

      {/* Component variant selectors */}
      <section>
        <h2>Component Variants</h2>
        <Select
          label="Button Style"
          value={editedConfig.components.buttons.primary.variant}
          options={['solid', 'outline', 'ghost', 'link']}
          onChange={(value) => {
            // Update config...
          }}
        />
      </section>

      <Button onClick={handleSave}>Save Configuration</Button>
    </div>
  )
}
```

---

## 🎯 7. Integration with Planning Phase

### Updated Component Planning Prompt

```markdown
## Phase 5: Component Mapping (REVISED)

**Step 1: Load SISO-UI-Library Catalog**
```
Read: /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/COMPLETE-EXTRACTION-INVENTORY.md
```

**Step 2: Map Components to Library**

For each component needed:
1. Search SISO-UI-Library for matches
2. List available options (with location)
3. Evaluate (effort, fit, customization)
4. Select optimal source
5. Document decision

**Step 3: Create Site Config**

Generate `siso-site-config.yaml` with:
- Theme tokens (colors from brand guidelines)
- Component variant selections
- Layout preferences
- Feature flags
- Animation settings

**Step 4: Document Theme System**

In `docs/05-technical/theming-system.md`:
- How to update config without code changes
- Admin UI for config management
- CSS variable injection
- Component variant system
```

---

## 📊 Benefits of Config-Driven System

### For Multi-Tenancy
- ✅ **Different theme per tenant** (same codebase)
- ✅ **Brand customization** without forking code
- ✅ **A/B test layouts** with config variants
- ✅ **Seasonal themes** (Christmas, Summer, etc.)

### For Development
- ✅ **Fast prototyping** (change config, see results)
- ✅ **Designer-friendly** (edit YAML, no code)
- ✅ **Consistent theming** (tokens everywhere)
- ✅ **Easy maintenance** (update one place)

### For Clients
- ✅ **Self-service customization** (admin UI)
- ✅ **Brand compliance** (locked token ranges)
- ✅ **No developer needed** for theme changes
- ✅ **Real-time preview** (config updates live)

---

## ✅ Planning Checklist Integration

### Add to Phase 5 (Component Mapping)

- [ ] Load SISO-UI-Library catalog
- [ ] Map all page components to library sources
- [ ] Document component selections in table format
- [ ] Identify gaps (components not in library)
- [ ] Create `siso-site-config.yaml` template
- [ ] Plan theme provider implementation
- [ ] Define component variants needed
- [ ] Calculate effort (library vs. custom components)
- [ ] Create component installation checklist

### Add to Phase 4 (Architecture)

- [ ] Define config-driven theming as core pattern
- [ ] Plan `site_config` database table
- [ ] Design theme provider architecture
- [ ] Define CSS variable naming convention

---

## 📚 Additional Resources

- **SISO-UI-Library**: `/Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-UI-Library/`
- **Component Inventory**: `COMPLETE-EXTRACTION-INVENTORY.md` (167+ assets)
- **Tailwind Docs**: [Customizing Colors](https://tailwindcss.com/docs/customizing-colors)
- **CSS Variables**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

**This system enables true zero-code customization for every project!** 🎨
