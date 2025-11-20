# SISO App Factory

**The Universal Code Grocery Store for Infinite Scalability**

Build restaurant sites, tour platforms, bike rentals, and ANY future project in days instead of months.

---

## 🏪 What Is This?

A monorepo containing:
- **650+ UI Components** - Buttons, cards, accordions, inputs, etc. (multiple variations of each)
- **19 Complete Features** - Booking systems, payment processing, admin panels, etc.
- **AI-Powered Search** - Intelligent component/feature recommendation
- **Infinite Scalability** - Add unlimited components/features over time

---

## 🧱 Architecture Layers

1. **Platform Packages** (`packages/platform/*`)
   - `@siso/ui` – core primitives, patterns, and utilities for every project
   - `@siso/auth-system` – reusable Supabase auth flows, hooks, middleware, and SQL
   - (coming soon) shared data/analytics helpers consumed by every template
2. **Experience Packs** (`packages/experiences/*`)
   - Reusable flows such as Blog CMS, Reviews & Ratings, Payments Dashboard, FAQ, and Pricing tiers (Checkout UX still on the roadmap)
   - Ship with config schemas + metadata so AI search can compose them automatically
3. **Templates** (`templates/*`)
   - Opinionated vertical starters (Bike Rental, Tour Guides, Restaurants, …)
   - Compose the platform + experience packs, add copy, migrations, and demo data

> Legacy docs may still reference `packages/ui` or `packages/bike-rental`; those assets now
> live under `packages/platform/ui` and `templates/bike-rental` respectively.

> Compatibility note: a `packages/ui -> packages/platform/ui` symlink exists so older scripts keep working, but please update references when editing docs/code.

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Generate AI catalog
pnpm generate:metadata

# Search for components
pnpm search "I need a button for hero section"
```

---

## 📚 Documentation Map

- `AI-USAGE-GUIDE.md` – how any AI agent should load the catalog, query components, and talk back to humans.
- `docs/catalog/components-and-features.json` – the single source of truth for all component/feature metadata (rebuilt via `pnpm generate:metadata`).
- `docs/ai-ops/` – operational guides for AI sessions (project prompts, LangFuse walkthroughs, validation/test plans).
- `docs/history/` – archived build reports and milestone summaries (latest bundle under `docs/history/2025-10-20/`).
- `docs/logs/` – transient tooling output such as bulk-import summaries.

---

## 💡 Usage in Projects

```bash
# Install packages
npm install @siso/ui @siso/auth-system

# Optionally copy a template starter
cp -r siso-app-factory/templates/bike-rental ./apps/bike-rental
```

```tsx
// app/components/CallToAction.tsx
import { Button, Card } from '@siso/ui/primitives'
import { SignIn1 } from '@siso/auth-system/components/modern-stunning-sign-in'

export function CallToAction() {
  return (
    <Card className="p-8 space-y-4">
      <h2 className="text-2xl font-semibold">Get early access</h2>
      <p>Drop our auth component anywhere and hook it up to your Supabase keys.</p>
      <div className="flex gap-2">
        <Button size="lg">Book a demo</Button>
        <SignIn1 />
      </div>
    </Card>
  )
}
```

---

## 🤖 AI-Powered Search

AI can intelligently find components:

```
Query: "I need a premium button for restaurant hero"
AI: Searches catalog → Ranks matches → Returns best option with explanation
```

---

## 🛠️ Development

```bash
# Add new component
pnpm add:component

# Extract feature from app
pnpm extract:feature

# Generate metadata
pnpm generate:metadata

# Build everything
pnpm build
```

---

## 📊 Status

**Version:** 1.0.0
**Components:** Growing daily
**Features:** Growing daily
**Projects Supported:** Restaurants, Tours, Bike Rentals, [infinite more]

---

**Built with ❤️ for infinite scalability**
