# Experience Packs

Reusable flows that sit between the platform layer (`packages/platform/*`) and domain templates (`templates/*`).

## Status

- Available: `reviews/`, `blog/`, `payments/`, `faq/`, `pricing/`
- In progress: Checkout UX, FAQ, Pricing, Marketing sections
- Each pack ships:
  - React/Next components + hooks
  - Config schema (`config.ts`)
  - Metadata (`metadata.json`) for AI-powered search
  - Integration notes describing required platform modules and external APIs

## Roadmap

1. Lift existing blog + review code from `templates/tour-guides`.
2. Generalize booking/checkout flows so they no longer depend on template-specific aliases.
3. Update `tools/core/generate-metadata.cjs` and AI prompts to treat experience packs as first-class assets (done).
