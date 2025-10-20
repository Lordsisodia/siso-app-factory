# Feature Flags & Theming

Config-as-data
- `SiteConfig` table stores:
  - `enabled_pages[]` (e.g., events, reviews)
  - `features{ reviews:boolean, referrals:boolean, events:boolean }`
  - `layout_variant` (switch component variants)
  - `theme_tokens{ color, radius, spacing, typography }`

Variant registry
- Map tokens/variants to imports, e.g., `menu/ItemCard.v1` vs `.v2`.
- Allow per-page overrides via `PageBlock` configs.

Versioning
- Add `config_version` to `SiteConfig` to evolve safely.
