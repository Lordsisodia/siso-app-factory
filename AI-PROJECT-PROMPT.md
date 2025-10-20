# 🏭 SISO App Factory - AI Project Prompt

**Copy and paste this into any AI coding session to use the SISO App Factory**

---

## 📋 PROMPT FOR AI

```
I'm working on a new project and need to use the SISO App Factory - our centralized code library.

Repository: https://github.com/Lordsisodia/siso-app-factory

Please help me:

1. Clone or reference the SISO App Factory repository
2. Understand what components/features are available
3. Search for the components I need
4. Integrate them into my project

---

SISO App Factory Contents:

**650+ UI Components:**
- 633 Primitives (buttons, cards, modals, forms, tables, inputs, etc.)
- 146 Patterns (layouts, sections, animations, backgrounds, etc.)
- Organized in 52 categories for easy discovery

**19 Complete Features:**
- 12 Tour Guide features (booking, admin, payments, notifications, media, QR, weather, analytics, reviews, blog, users, availability)
- 7 Bike Rental features (booking, catalog, reviews, dashboard, admin, filters, auth)
- All production-ready from real apps (Mallorca Activities, Five Star Car Hire)

**30+ Utilities:**
- Hooks (use-toast, use-mobile, use-currency-conversion, etc.)
- Utils (booking, date, image, product, review, animations, etc.)
- Contexts (AuthContext, providers)
- Configs (Drizzle, Tailwind, middleware)
- Integrations (Stripe, Cloudinary, Supabase, Email, SMS, WhatsApp)

**Multi-Tenant Architecture Framework:**
- One codebase serving multiple clients
- One Supabase database with client_id isolation
- Config-driven theming (colors, fonts, branding)
- Fork and deploy process (new client in 10 minutes)
- Complete documentation and guides

---

How to use:

**Step 1: Load the Catalog**

The factory has an AI-searchable catalog at `docs/ai-catalog.json`.

Read this file to see ALL available components and features with metadata:
- Visual styles, use cases, complexity
- What each feature includes
- Industry fit scores
- Usage examples

**Step 2: Search for What I Need**

Use natural language to search:
- "I need a premium button for a hero section"
- "I need a carousel for product displays"
- "I need a complete booking system with deposits"
- "I need authentication with protected routes"

The AI search tool can help you find the best matches from 650+ options.

**Step 3: Import and Use**

Components can be imported as:
```tsx
import { Button } from '@siso/ui/primitives/buttons/magic-ui-rainbow-button'
import { BookingSystem } from '@siso/tour-guides/features/booking-system'
import { dateUtils } from '@siso/bike-rental/shared/utils'
```

Or copy the component files directly into my project.

**Step 4: Apply Multi-Tenant Framework (if needed)**

If building a multi-client system, follow:
`frameworks/multi-tenant-architecture/guides/NEW-CLIENT-SETUP.md`

---

Please help me search the catalog and find the best components/features for my needs.

What I'm building: [DESCRIBE YOUR PROJECT]

What I need help with: [DESCRIBE WHAT YOU NEED]
```

---

## 💡 EXAMPLE USAGE

### **Example 1: Building a Restaurant Site**

```
I'm working on a new restaurant website and need to use the SISO App Factory.

Repository: https://github.com/Lordsisodia/siso-app-factory

Please help me find:
1. A premium hero section for the homepage
2. A menu display component
3. A reservation/booking system
4. A review system
5. Layout components (navbar, footer)

I want a luxury, elegant aesthetic.

Can you search the catalog and recommend the best options?
```

### **Example 2: Building a Tour Platform**

```
I'm building a tour booking platform and want to use the SISO App Factory.

Repository: https://github.com/Lordsisodia/siso-app-factory

I need:
1. Complete tour booking system with deposits
2. Admin panel for managing tours
3. Payment processing (Stripe integration)
4. Review system
5. Analytics dashboard

Can you show me what's available in the tour-guides package?
```

### **Example 3: Multi-Tenant Setup**

```
I'm building a restaurant chain platform (one codebase, multiple locations).

Repository: https://github.com/Lordsisodia/siso-app-factory

Please help me:
1. Understand the multi-tenant architecture framework
2. Set up one Supabase database for all locations
3. Configure per-location branding (colors, logos)
4. Deploy separate sites for each location

Read: frameworks/multi-tenant-architecture/guides/NEW-CLIENT-SETUP.md

Walk me through the setup process.
```

---

## 🔍 AI SEARCH COMMANDS

**If the AI has access to the repository locally:**

```bash
# Search for components
npm run search "premium button for hero"
npm run search "pricing card for restaurant"
npm run search "booking system with deposits"

# View catalog
cat docs/ai-catalog.json | jq '.ui_components.buttons'
cat docs/ai-catalog.json | jq '.features["tour-guides"]'

# View framework docs
cat frameworks/multi-tenant-architecture/README.md
```

---

## 📖 KEY DOCUMENTATION TO READ

**For Components:**
1. `AI-USAGE-GUIDE.md` - How AI should search and use the catalog
2. `docs/ai-catalog.json` - Master catalog with all metadata
3. `README.md` - Project overview

**For Features:**
1. `packages/tour-guides/src/features/` - Tour guide features
2. `packages/bike-rental/src/features/` - Bike rental features
3. Each feature has a `metadata.json` describing what it includes

**For Multi-Tenant:**
1. `frameworks/multi-tenant-architecture/README.md` - Framework overview
2. `frameworks/multi-tenant-architecture/guides/NEW-CLIENT-SETUP.md` - Quick start
3. `frameworks/multi-tenant-architecture/database/MULTI-TENANT-SCHEMA.md` - Database design

---

## ✅ WHAT AI SHOULD DO

1. **Clone/Access Repository:**
   ```bash
   git clone https://github.com/Lordsisodia/siso-app-factory.git
   cd siso-app-factory
   ```

2. **Read AI-USAGE-GUIDE.md:**
   - Understand how to search the catalog
   - Learn the metadata structure
   - See example queries

3. **Load Catalog:**
   ```javascript
   const catalog = require('./docs/ai-catalog.json')
   ```

4. **Search Based on User Need:**
   - Use search indices (by_type, by_visual_style, by_use_case, by_tag, by_industry)
   - Rank matches by relevance
   - Return top 3-5 options with explanations

5. **Provide Usage Instructions:**
   - Show import statements
   - Show usage examples
   - Explain configuration if needed

6. **For Features:**
   - Explain what the feature includes
   - Show setup time and requirements
   - Provide installation guide
   - Link to feature documentation

---

## 🎯 QUICK REFERENCE

**Repository:** https://github.com/Lordsisodia/siso-app-factory

**What's Available:**
- 650+ Components
- 19 Features
- 30+ Utilities
- Multi-Tenant Framework

**How AI Searches:**
- Loads `docs/ai-catalog.json` (single file)
- Searches with context (type, style, use case, industry)
- Ranks by relevance (0-100% match score)
- Explains recommendations

**Installation:**
```bash
# Clone repository
git clone https://github.com/Lordsisodia/siso-app-factory.git

# Or install packages (if published to npm)
npm install @siso/ui @siso/tour-guides @siso/bike-rental
```

---

## 📝 TEMPLATE PROMPT

**Copy and customize this:**

```
I'm using the SISO App Factory for my project.

Repository: https://github.com/Lordsisodia/siso-app-factory

Project Type: [Restaurant / Tour Platform / Bike Rental / SaaS / Other]

What I need:
1. [Component/Feature 1]
2. [Component/Feature 2]
3. [Component/Feature 3]

Visual Style: [Luxury / Modern / Casual / Minimal / Bold]

Please search the catalog and recommend:
- Best UI components for my needs
- Relevant features I can use
- Utilities that would help
- Framework guidance (if multi-tenant)

Then help me integrate them into my project.
```

---

**This prompt gives AI everything it needs to help you use the SISO App Factory effectively!**
