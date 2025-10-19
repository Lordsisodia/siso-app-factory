# AI Usage Guide for SISO App Factory

**Purpose:** Instructions for ANY AI (Claude Code, Codex, Cursor, etc.) to use this system as a code dictionary
**Last Updated:** October 20, 2025

---

## 🎯 What This System Is

SISO App Factory is a **searchable code grocery store** containing:
- **780+ UI Components** - Buttons, cards, inputs, modals, forms, tables, etc.
- **12 Complete Features** - Booking systems, admin panels, payment processing, etc.
- **AI-Powered Catalog** - Single file (`docs/ai-catalog.json`) with everything indexed

---

## 🤖 How to Use This as an AI

### Step 1: Load the Catalog

```javascript
// Read the master catalog (one file, ~8MB)
const catalog = require('./docs/ai-catalog.json')

// You now have access to:
// - catalog.ui_components (all UI components by type)
// - catalog.features (all features by domain)
// - catalog.search_index (search indices for fast lookup)
```

### Step 2: Search for Components

**When user asks:** "I need a button for my restaurant hero section"

**You do this:**

```javascript
// Option A: Use the search tool
const { searchComponents } = require('./tools/ai-search.js')

const results = searchComponents({
  type: 'buttons',
  visual_style: 'bold',
  use_case: 'hero',
  industry: 'restaurants'
})

// Returns ranked results with scores
```

**Option B: Manual catalog query**

```javascript
// Get all buttons
const buttons = catalog.ui_components.buttons.variations

// Filter by criteria
const matches = buttons.filter(btn => {
  const styleMatch = btn.visual_style?.includes('bold') || btn.visual_style?.includes('premium')
  const useCaseMatch = btn.use_cases?.some(uc => uc.toLowerCase().includes('hero'))
  const industryFit = btn.industry_fit?.restaurants > 0.7

  return styleMatch && useCaseMatch && industryFit
})

// Sort by score
matches.sort((a, b) => {
  // Your scoring logic
})

// Return top match
const recommendation = matches[0]
```

### Step 3: Return Usage Information

**Provide the user with:**

1. **Component recommendation**
   - Name and description
   - Why it's the best match
   - Visual style and characteristics

2. **Import statement**
   ```tsx
   import { SolidButton } from '@siso/ui/primitives/buttons/solid-button'
   ```

3. **Usage example**
   ```tsx
   <SolidButton variant="primary" size="lg">
     Reserve Your Table
   </SolidButton>
   ```

4. **Props/API reference** (from metadata)
   - variants: primary, secondary, danger, success
   - sizes: sm, md, lg
   - All standard button props

5. **File location** (if they want to customize)
   - `packages/ui/src/primitives/buttons/solid-button/component.tsx`

---

## 🔍 Search Strategies

### Strategy 1: Direct Type Search

When you know the exact component type:

```javascript
// User: "I need an accordion"
const accordions = catalog.ui_components.accordions.variations

// Show all accordion options with descriptions
```

### Strategy 2: Use Case Search

When user describes what they're building:

```javascript
// User: "I need something for FAQs"
const useCase = "FAQ"

// Search by use case index
const componentIds = catalog.search_index.by_use_case[useCase] || []

// Look up components
const results = componentIds.map(id => findComponentById(id))
```

### Strategy 3: Visual Style Search

When user describes aesthetic:

```javascript
// User: "I need something minimal and clean"
const style = "minimal"

// Search by visual style index
const componentIds = catalog.search_index.by_visual_style[style] || []

// Return matching components
```

### Strategy 4: Tag-Based Search

Most flexible:

```javascript
// User: "I need a CTA button for booking"
const tags = ["cta", "booking", "button"]

// Find components matching all tags
const matches = tags.map(tag => catalog.search_index.by_tag[tag] || [])
const intersection = matches.reduce((a, b) => a.filter(c => b.includes(c)))

// Return components that match ALL tags
```

### Strategy 5: Industry-Specific Search

When building for specific industry:

```javascript
// User: "Show me restaurant-appropriate cards"
const industry = "restaurants"

const restaurantCards = catalog.ui_components.cards.variations.filter(card =>
  card.industry_fit?.restaurants >= 0.8
)

// Return cards with high restaurant fit
```

---

## 🚀 Feature Search

### When user needs complete functionality:

**User:** "I need a booking system for my tour company"

**You do:**

```javascript
const { searchFeatures } = require('./tools/ai-search.js')

const results = searchFeatures({
  domain: 'tour-guides',
  problem: 'booking',
  tags: ['booking', 'tours']
})

// Returns tour-booking-system feature
```

**You tell user:**

```
I recommend the **Tour Booking System** from @siso/tour-guides:

What it includes:
- Booking form UI
- Real-time availability checking
- Deposit collection (Stripe)
- Email/SMS confirmations
- Capacity management
- Multi-day tour support

Installation:
npm install @siso/tour-guides

Usage:
import { BookingSystem } from '@siso/tour-guides/features/booking-system'

Setup time: 45 minutes
Saves: 4-6 weeks of development
```

---

## 📊 Understanding the Metadata

### UI Component Metadata Fields:

```json
{
  "id": "unique-id",                    // ← Use for lookups
  "name": "Display Name",               // ← Show to user
  "description": "What it does",        // ← Explain to user
  "type": "button|card|etc",            // ← Component category
  "visual_style": "bold|minimal",       // ← Aesthetic matching
  "best_for": ["scenarios"],            // ← When to recommend
  "use_cases": ["examples"],            // ← Specific use cases
  "avoid_for": ["scenarios"],           // ← When NOT to recommend
  "complexity": "simple|medium|complex",// ← Implementation difficulty
  "source": "library-name",             // ← Attribution
  "tags": ["searchable", "keywords"],   // ← For tag-based search
  "industry_fit": {                     // ← Industry matching
    "restaurants": 0.9,                 // ← 0-1 score
    "general": 1.0
  },
  "examples": [                         // ← Show usage examples
    {
      "title": "Example name",
      "code": "<Component>...</Component>"
    }
  ]
}
```

### Feature Metadata Fields:

```json
{
  "id": "feature-id",
  "name": "Feature Name",
  "domain": "tour-guides|restaurants|bike-rental",
  "description": "What this feature does",
  "solves": ["problems it solves"],     // ← Match user's problem
  "includes": {                         // ← Show what they get
    "components": "List of components",
    "hooks": "List of hooks",
    "actions": "List of actions",
    "api_routes": 5,
    "db_tables": "Table names"
  },
  "requires": {                         // ← Prerequisites
    "database": "Postgres",
    "payment": "Stripe",
    "email": "Resend"
  },
  "setup_time": "45 minutes",           // ← Time estimate
  "business_value": "Saves X weeks",    // ← Value proposition
  "tags": ["searchable", "keywords"]    // ← For search
}
```

---

## 🎯 Recommendation Algorithm

### How to Score Matches:

```javascript
function scoreComponent(component, query) {
  let score = 0

  // Visual style match (40 points)
  if (query.visual_style && component.visual_style?.includes(query.visual_style)) {
    score += 40
  }

  // Use case match (40 points)
  if (query.use_case) {
    const match = component.use_cases?.some(uc => uc.includes(query.use_case)) ||
                  component.best_for?.some(bf => bf.includes(query.use_case))
    if (match) score += 40
  }

  // Industry fit (20 points)
  if (query.industry && component.industry_fit) {
    score += component.industry_fit[query.industry] * 20
  }

  // Simplicity bonus (10 points)
  if (component.complexity === 'simple') {
    score += 10
  }

  // Tag matches (5 points each)
  if (query.tags) {
    query.tags.forEach(tag => {
      if (component.tags?.includes(tag)) score += 5
    })
  }

  return Math.min(score, 100) // Cap at 100
}
```

**Scoring interpretation:**
- **90-100:** Perfect match - highly recommend
- **70-89:** Good match - solid option
- **50-69:** Acceptable match - will work
- **30-49:** Weak match - consider alternatives
- **<30:** Poor match - avoid

---

## 💡 Response Templates

### For UI Component Recommendations:

```
I recommend **{component.name}** ({score}% match):

**Why:**
- {component.description}
- Visual style: {component.visual_style}
- Perfect for: {component.best_for}

**Usage:**
```tsx
import { ComponentName } from '@siso/ui/primitives/{type}/{component.id}'

<ComponentName {props}>Content</ComponentName>
```

**Alternatives:**
- {second_match.name} ({score}% match)
- {third_match.name} ({score}% match)
```

### For Feature Recommendations:

```
I recommend **{feature.name}** from @siso/{feature.domain}:

**What it solves:**
{feature.solves.map(s => '- ' + s).join('\n')}

**What you get:**
{feature.includes details}

**Requirements:**
{feature.requires details}

**Installation:**
```bash
npm install @siso/{feature.domain}
```

**Setup time:** {feature.setup_time}
**Business value:** {feature.business_value}
```

---

## 🔄 Keeping Context Minimal

### IMPORTANT: Don't load all components

**DON'T do this:**
```javascript
// ❌ BAD - Loads all component code
const allButtons = catalog.ui_components.buttons.variations.map(btn => {
  return fs.readFileSync(btn.path + '/component.tsx')
})
```

**DO this instead:**
```javascript
// ✅ GOOD - Only load metadata, then load specific component when needed
const allButtons = catalog.ui_components.buttons.variations // Just metadata

// User picks one
const chosen = allButtons[0]

// NOW load the component code
const componentCode = fs.readFileSync(chosen.path + '/component.tsx')
```

**Why:** Catalog is ~8MB, but actual component code is ~500MB+. Only load what you need.

---

## 📋 Common Queries & Solutions

### Query: "I need a button for {purpose}"

```javascript
const results = searchComponents({
  type: 'buttons',
  use_case: extractUseCase(purpose), // Extract from natural language
  visual_style: extractStyle(purpose)
})

return formatComponentResponse(results[0])
```

### Query: "Show me all {type} components"

```javascript
const all = catalog.ui_components[type].variations

return `Found ${all.length} ${type}:\n` +
  all.map((c, i) => `${i+1}. ${c.name} - ${c.description}`).join('\n')
```

### Query: "What's the most {adjective} {type}?"

```javascript
// adjective = "minimal", "bold", "modern", etc.
const filtered = catalog.ui_components[type].variations.filter(c =>
  c.visual_style?.includes(adjective) ||
  c.aesthetic?.includes(adjective)
)

return filtered[0] // Top match
```

### Query: "I'm building a {industry} site, what should I use for {purpose}?"

```javascript
const results = catalog.ui_components[detectType(purpose)].variations.filter(c =>
  c.industry_fit?.[industry] >= 0.8
).sort((a, b) => b.industry_fit[industry] - a.industry_fit[industry])

return results.slice(0, 3) // Top 3
```

### Query: "I need to implement {feature_name}"

```javascript
const domain = detectDomain(context) // From project context
const feature = searchFeatures({
  domain,
  problem: feature_name,
  tags: extractTags(feature_name)
})

return formatFeatureResponse(feature[0])
```

---

## ⚡ Quick Reference Commands

```bash
# Generate/update catalog
npm run generate:metadata

# Search for component
npm run search "query here"

# Build packages
npm run build

# Check stats
cat docs/ai-catalog.json | jq '.component_count, .feature_count'

# List all component types
cat docs/ai-catalog.json | jq '.ui_components | keys'

# List all features
cat docs/ai-catalog.json | jq '.features'

# Search by tag
cat docs/ai-catalog.json | jq '.search_index.by_tag.cta'

# Get component by ID
cat docs/ai-catalog.json | jq '.ui_components.buttons.variations[] | select(.id == "solid-button")'
```

---

## 🎯 Decision Tree for AI

```
User asks for code
    ↓
Is it a complete feature?
    ↓
YES → Search features (catalog.features)
    ↓
    Return feature with setup instructions

NO → Is it a UI component?
    ↓
YES → Determine component type
    ↓
    Search by type + context
    ↓
    Score matches
    ↓
    Return top 3 with explanations

UNKNOWN → Ask clarifying questions
```

---

## 📦 File Locations

### For UI Components:

```
packages/ui/src/primitives/{type}/{component-id}/
├── component.tsx        ← The actual component code
├── metadata.json        ← AI-readable info (ALWAYS READ THIS FIRST)
└── index.ts             ← Export file
```

**AI workflow:**
1. Search catalog metadata (fast)
2. Find best match
3. Load ONLY that component's code (efficient)
4. Provide to user

### For Features:

```
packages/{domain}/src/features/{feature-id}/
├── components/          ← UI components for this feature
├── hooks/               ← React hooks
├── actions/             ← Server actions
├── api/                 ← API routes
├── db/                  ← Database schemas
├── types/               ← TypeScript types
├── utils/               ← Business logic utilities
├── metadata.json        ← Feature info (READ THIS FIRST)
└── index.ts             ← Main export
```

**AI workflow:**
1. Search features in catalog
2. Find best match
3. Read metadata to understand what's included
4. Guide user through setup
5. Load specific files as needed

---

## 🚀 Example AI Interactions

### Example 1: Finding a UI Component

**User:** "I need a premium card for showcasing restaurant menu items"

**AI Process:**
```javascript
// 1. Parse query
type = "cards"
visual_style = "premium"
use_case = "menu display"
industry = "restaurants"

// 2. Search catalog
const results = searchComponents({ type, visual_style, use_case, industry })

// 3. Top result:
{
  id: "magic-ui-neon-gradient-card",
  score: 85,
  visual_style: "premium, modern, vibrant",
  best_for: ["Feature showcases", "Premium content display"]
}

// 4. Response
```

**AI Response:**

```
I recommend **Neon Gradient Card** from magic-ui (85% match):

Perfect for premium restaurant menu displays with modern aesthetic.

Usage:
```tsx
import { NeonGradientCard } from '@siso/ui/primitives/cards/magic-ui-neon-gradient-card'

<NeonGradientCard>
  <h3>Filet Mignon</h3>
  <p>Tender beef with truffle butter</p>
  <span>$45</span>
</NeonGradientCard>
```

This card includes neon gradient effects and premium styling perfect for upscale restaurants.
```

### Example 2: Finding a Feature

**User:** "I need a complete booking system for my tour company with deposit payments"

**AI Process:**
```javascript
// 1. Parse query
domain = "tour-guides"
problem = "booking"
tags = ["booking", "deposits", "tours"]

// 2. Search features
const results = searchFeatures({ domain, problem, tags })

// 3. Top result:
{
  id: "tour-booking-system",
  score: 95,
  solves: ["Tour bookings", "Deposit collection"],
  includes: {
    components: "Full booking UI",
    actions: "Booking CRUD, availability checking",
    api: "14 API routes",
    db: "4 tables"
  }
}
```

**AI Response:**

```
I recommend the **Tour Booking System** from @siso/tour-guides:

This is a complete, production-ready booking solution extracted from Mallorca Activities.

What you get:
- Complete booking form with tour selection
- Real-time availability checking
- Stripe deposit collection (configurable %)
- Email + SMS confirmations
- Capacity management
- Multi-day tour support
- Weather integration (suggest alternatives if bad weather)
- QR code ticket generation

Installation:
```bash
npm install @siso/tour-guides
```

Usage:
```tsx
import { TourBookingSystem } from '@siso/tour-guides/features/booking-system'

<TourBookingSystem
  config={{
    depositPercentage: 25,
    enableWeatherAlerts: true,
    maxCapacity: 20
  }}
/>
```

Requirements:
- Postgres database
- Stripe account
- Email service (Resend recommended)

Setup time: 45-60 minutes
Saves you: 4-6 weeks of development

Want help setting this up?
```

---

## 🛠️ Advanced Usage

### Comparing Multiple Options:

**User:** "Show me all button options for CTAs"

```javascript
const ctaButtons = catalog.ui_components.buttons.variations.filter(btn =>
  btn.best_for?.some(bf => bf.toLowerCase().includes('cta')) ||
  btn.use_cases?.some(uc => uc.toLowerCase().includes('cta'))
)

// Return formatted list
```

### Finding Similar Components:

**User:** "What's similar to {component_id}?"

```javascript
const original = findComponentById(component_id)

// Find components with similar:
// - Visual style
// - Use cases
// - Tags

const similar = catalog.ui_components[original.type].variations.filter(c =>
  c.id !== original.id && (
    c.visual_style === original.visual_style ||
    c.tags.some(tag => original.tags.includes(tag))
  )
)

return similar.slice(0, 5)
```

### Cross-Domain Feature Lookup:

**User:** "Do you have something like the tour booking system but for restaurants?"

```javascript
const tourBooking = catalog.features['tour-guides'].find(f => f.id === 'tour-booking-system')

// Look for features with similar tags in other domains
const similarTags = tourBooking.tags

const restaurantFeatures = catalog.features['restaurants']?.filter(f =>
  f.tags.some(tag => similarTags.includes(tag))
)

// If none exist, suggest building one based on tour booking
```

---

## ✅ Best Practices for AI

1. **Always read metadata first** - Don't load component code until you know it's the right one
2. **Use search indices** - Faster than filtering all components
3. **Score matches** - Return top 3-5, not just one
4. **Explain recommendations** - Tell user WHY this component is best
5. **Provide usage examples** - Show how to import and use
6. **Mention alternatives** - Give user options
7. **Consider context** - Industry, aesthetic, use case all matter
8. **Update catalog** - Run `npm run generate:metadata` after adding components

---

## 🚨 Error Handling

### If component not found:

```
No exact match found for "{query}".

Similar options:
1. {closest_match_1}
2. {closest_match_2}

Or I can help you build a custom component using primitives from the library.
```

### If feature not found:

```
No pre-built feature for "{need}" in the {domain} domain.

However, you can build this using:
- {relevant_ui_components}
- {similar_features_from_other_domains}

Would you like help assembling a custom solution?
```

---

## 📈 Catalog Statistics

**Current state:**
- Component count: 780+
- Feature count: 12
- Component types: 21
- Domains: 1 (tour-guides)
- Search tags: 579

**Expandable to:**
- Component count: 3000+ (87 more libraries to process)
- Feature count: 25+ (restaurant & bike features to add)
- Domains: 3+ (unlimited)

---

## 🔄 Updating the Catalog

When new components/features are added:

```bash
# Automatically rescan and rebuild catalog
npm run generate:metadata

# Catalog is regenerated with updated counts and indices
```

**Catalog auto-updates with:**
- New component counts
- Updated search indices
- New tags discovered
- New component types

---

## 🎯 Success Criteria

AI is using this system correctly when:

✅ Searches catalog before loading code (efficient)
✅ Returns multiple options ranked by relevance (not just one)
✅ Explains WHY each option is recommended (context-aware)
✅ Provides usage examples (helpful)
✅ Considers industry fit (domain-aware)
✅ Mentions alternatives (gives user choice)
✅ Handles "not found" gracefully (suggests alternatives)

---

**This system is designed to be an AI code dictionary - use it wisely and efficiently!**
