# Theme Tokens Schema

Purpose: Define SiteConfig theme tokens so styling is consistent across clients and easy for AI to reason about.

Tokens (stored in `site_config.theme_tokens` JSON)

```
{
  "color": {
    "primary": "#2E7D32",
    "secondary": "#FF7043",
    "accent": "#FFC107",
    "background": "#FFFFFF",
    "surface": "#F5F5F5",
    "text.primary": "#1F2933",
    "text.secondary": "#52606D"
  },
  "font": {
    "family.heading": "'Plus Jakarta Sans', sans-serif",
    "family.body": "'Inter', sans-serif",
    "size.scale": [12, 14, 16, 18, 20, 24, 32, 40],
    "weight.heading": 600,
    "weight.body": 400
  },
  "spacing": {
    "scale": [4, 8, 12, 16, 20, 24, 32],
    "section.gap": 48
  },
  "radius": {
    "sm": 6,
    "md": 12,
    "lg": 24
  },
  "shadow": {
    "card": "0 8px 24px rgba(15,23,42,0.08)"
  },
  "layout": {
    "content.maxWidth": 1200,
    "nav.sticky": true
  }
}
```

Implementation Notes
- Expose tokens as CSS variables under `:root` (e.g., `--color-primary`) during layout
- Tailwind: extend theme via `theme.extend.colors`, `fontFamily`, `spacing`, `borderRadius`
- Provide defaults in code for new deployments; tokens override via SiteConfig
- Keep tokens minimal; add references in BMAD if new tokens introduced
