# Configuration-Driven Theming

**Purpose:** One codebase, infinite visual variations through configuration

---

## 🎯 The Concept

**Same components, different styling:**
- Client A: Red theme, serif fonts, luxury aesthetic
- Client B: Blue theme, sans-serif, modern aesthetic
- Client C: Green theme, playful fonts, casual vibe

**All from:**
- Same Button component
- Same Card component
- Same Layout component
- Different configuration

---

## 🎨 Theme System

### **Theme Tokens (Stored in Database):**

```typescript
// clients table - theme_tokens column (JSONB)
{
  "colors": {
    "primary": "#FF5733",        // Main brand color
    "secondary": "#33FF57",      // Secondary actions
    "accent": "#FFC107",         // Highlights, badges
    "background": "#FFFFFF",     // Page background
    "surface": "#F5F5F5",        // Card backgrounds
    "text": {
      "primary": "#1F2933",      // Main text
      "secondary": "#52606D",    // Secondary text
      "muted": "#9AA5B1"         // Disabled/muted text
    },
    "border": "#E4E7EB",         // Borders, dividers
    "success": "#10B981",        // Success states
    "warning": "#F59E0B",        // Warnings
    "error": "#EF4444",          // Errors
    "info": "#3B82F6"            // Info messages
  },

  "typography": {
    "fonts": {
      "heading": "Playfair Display, serif",
      "body": "Inter, sans-serif",
      "mono": "JetBrains Mono, monospace"
    },
    "sizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    },
    "weights": {
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },

  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "section": "6rem"          // Between major sections
  },

  "radius": {
    "none": "0",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "full": "9999px"
  },

  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px rgba(0,0,0,0.1)",
    "xl": "0 20px 25px rgba(0,0,0,0.1)"
  },

  "animation": {
    "duration": {
      "fast": "150ms",
      "normal": "300ms",
      "slow": "500ms"
    },
    "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
  },

  "layout": {
    "maxWidth": "1200px",        // Content max width
    "navHeight": "64px",         // Navigation bar height
    "sidebarWidth": "256px",     // Sidebar width
    "mobileBreakpoint": "768px"  // Mobile/desktop breakpoint
  }
}
```

---

## 🔧 Implementation

### **Step 1: Load Theme at Runtime**

```typescript
// app/layout.tsx
export default async function RootLayout({ children }) {
  // Get client_id from middleware/subdomain
  const clientId = headers().get('x-client-id')

  // Load client config
  const { data: client } = await supabase
    .from('clients')
    .select('theme_tokens, name, logo_url')
    .eq('id', clientId)
    .single()

  // Generate CSS variables
  const themeCSS = generateThemeCSS(client.theme_tokens)

  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### **Step 2: Generate CSS Variables**

```typescript
// lib/theme-generator.ts
export function generateThemeCSS(tokens: ThemeTokens): string {
  return `
    :root {
      /* Colors */
      --color-primary: ${tokens.colors.primary};
      --color-secondary: ${tokens.colors.secondary};
      --color-accent: ${tokens.colors.accent};
      --color-background: ${tokens.colors.background};
      --color-surface: ${tokens.colors.surface};
      --color-text-primary: ${tokens.colors.text.primary};
      --color-text-secondary: ${tokens.colors.text.secondary};

      /* Typography */
      --font-heading: ${tokens.typography.fonts.heading};
      --font-body: ${tokens.typography.fonts.body};

      /* Spacing */
      --spacing-sm: ${tokens.spacing.sm};
      --spacing-md: ${tokens.spacing.md};
      --spacing-lg: ${tokens.spacing.lg};
      --spacing-section: ${tokens.spacing.section};

      /* Radius */
      --radius-sm: ${tokens.radius.sm};
      --radius-md: ${tokens.radius.md};
      --radius-lg: ${tokens.radius.lg};

      /* Shadows */
      --shadow-sm: ${tokens.shadows.sm};
      --shadow-md: ${tokens.shadows.md};
      --shadow-lg: ${tokens.shadows.lg};

      /* Animation */
      --duration-normal: ${tokens.animation.duration.normal};
      --easing: ${tokens.animation.easing};
    }
  `
}
```

### **Step 3: Use in Components**

```tsx
// Components automatically use theme variables

// Button.tsx
export function Button({ children }) {
  return (
    <button className="
      bg-[var(--color-primary)]
      text-white
      px-[var(--spacing-md)]
      py-[var(--spacing-sm)]
      rounded-[var(--radius-md)]
      shadow-[var(--shadow-md)]
      font-[var(--font-body)]
      transition-all duration-[var(--duration-normal)]
      hover:opacity-90
    ">
      {children}
    </button>
  )
}

// Or with Tailwind config:
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      },
      spacing: {
        section: 'var(--spacing-section)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius-md)',
      }
    }
  }
}

// Then use Tailwind classes:
<button className="bg-primary text-white px-md py-sm rounded shadow-md">
  Click Me
</button>
```

---

## 🔄 Update Process

### **Change Client Theme:**

```typescript
// Update theme for client
await supabase
  .from('clients')
  .update({
    theme_tokens: {
      colors: {
        primary: '#NEW_COLOR',  // Change primary color
        // ... rest of tokens
      }
    }
  })
  .eq('id', clientId)

// Clear cache (if using)
await redis.del(`client:${clientId}:config`)

// Refresh page → new colors applied immediately!
```

---

## 🎯 Pre-built Theme Presets

### **Luxury Restaurant:**
```json
{
  "colors": {
    "primary": "#1A1A1A",
    "secondary": "#D4AF37",
    "accent": "#8B4513"
  },
  "typography": {
    "fonts": {
      "heading": "Playfair Display, serif",
      "body": "Montserrat, sans-serif"
    }
  },
  "spacing": {
    "section": "6rem"
  },
  "radius": {
    "card": "2px"
  }
}
```

### **Modern Cafe:**
```json
{
  "colors": {
    "primary": "#00B4D8",
    "secondary": "#90E0EF",
    "accent": "#F4D35E"
  },
  "typography": {
    "fonts": {
      "heading": "Poppins, sans-serif",
      "body": "Inter, sans-serif"
    }
  },
  "spacing": {
    "section": "4rem"
  },
  "radius": {
    "card": "16px"
  }
}
```

### **Casual Bistro:**
```json
{
  "colors": {
    "primary": "#D4511E",
    "secondary": "#F4A261",
    "accent": "#2A9D8F"
  },
  "typography": {
    "fonts": {
      "heading": "Merriweather, serif",
      "body": "Open Sans, sans-serif"
    }
  },
  "spacing": {
    "section": "3rem"
  },
  "radius": {
    "card": "12px"
  }
}
```

---

## ✅ Benefits

**One Button Component:**
```tsx
<Button>Reserve Table</Button>
```

**Works for ALL clients:**
- Client A: Red button, serif font, sharp corners
- Client B: Blue button, sans font, rounded corners
- Client C: Green button, playful font, very rounded

**Zero code changes. Just configuration.**

---

**Next:** Read `COLOR-SYSTEM.md` for complete color configuration guide
