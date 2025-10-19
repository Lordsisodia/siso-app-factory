# SISO App Factory

**The Universal Code Grocery Store for Infinite Scalability**

Build restaurant sites, tour platforms, bike rentals, and ANY future project in days instead of months.

---

## 🏪 What Is This?

A monorepo containing:
- **150+ UI Components** - Buttons, cards, accordions, inputs, etc. (multiple variations of each)
- **30+ Complete Features** - Booking systems, payment processing, admin panels, etc.
- **AI-Powered Search** - Intelligent component/feature recommendation
- **Infinite Scalability** - Add unlimited components/features over time

---

## 📦 Packages

- `@siso/ui` - Universal UI components and patterns
- `@siso/restaurants` - Restaurant-specific features
- `@siso/tour-guides` - Tour guide platform features
- `@siso/bike-rental` - Bike rental platform features

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

## 💡 Usage in Projects

```bash
# Install packages
npm install @siso/ui @siso/restaurants

# Use in your app
import { Button, Card } from '@siso/ui/primitives'
import { ReservationSystem } from '@siso/restaurants/features/reservation-system'

function App() {
  return (
    <>
      <Button>Click Me</Button>
      <ReservationSystem />
    </>
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
