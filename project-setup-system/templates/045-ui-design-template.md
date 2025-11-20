# Phase 4.5: UI/UX Design - Output Template

## Overview

This template shows the expected structure and content for Phase 4.5 deliverables.

**Agent**: UI/UX Designer
**Duration**: 3-4 hours
**Output Folder**: `docs/04.5-ui-design/`
**Verification**: `validation/phase-045-ui-design-checklist.md` (≥85%)

---

## File 1: user-flows.md

```markdown
# User Flows - [Project Name]

## Overview
This document maps all primary user journeys through the application, including happy paths, alternative paths, edge cases, and error handling.

## Flow 1: [Guest/Customer] Makes Booking

### User Goal
[What user wants to achieve - e.g., "Book a table at desired restaurant for dinner"]

### Entry Points
- Homepage search bar
- Restaurant detail page (from browse/search)
- Deep link from Google Maps / social media
- [Other entry points]

### Flow Diagram

[Insert Mermaid flowchart showing complete flow with decision points]

```mermaid
graph TD
    A[Start: User on homepage] --> B{Knows restaurant?}
    B -->|Yes| C[Search by name]
    B -->|No| D[Browse by cuisine/location]
    C --> E[Restaurant detail page]
    D --> F[Search results] --> E
    E --> G[Select: Date, Time, Party Size]
    G --> H{Available?}
    H -->|Yes| I{Logged in?}
    H -->|No| J[Show alternatives + suggest] --> G
    I -->|Yes| K[Review & confirm]
    I -->|No| L[Login/Signup modal] --> K
    K --> M{Deposit required?}
    M -->|Yes| N[Payment screen]
    M -->|No| O[Confirm booking]
    N --> P{Payment success?}
    P -->|Yes| O
    P -->|No| Q[Payment error + retry] --> N
    O --> R[Confirmation screen]
    R --> S[Send email + SMS]
    S --> T[END: Booking created ✅]
\`\`\`

### Decision Points

**D1: Knows restaurant name?**
- YES → Direct search (faster, skip browsing)
- NO → Browse/discovery mode

**D2: Available at selected time?**
- YES → Continue booking flow
- NO → Show "No availability" + alternatives:
  - Different times same day (± 30 min, ± 1 hour)
  - Same time different day
  - Similar restaurants nearby

**D3: User logged in?**
- YES → Skip auth, proceed
- NO → Show login/signup modal (don't redirect, preserve context)

**D4: Deposit required?**
- YES → Stripe payment screen
- NO → Confirm directly (no payment)

**D5: Payment successful?**
- YES → Booking confirmed
- NO → Show error ("Card declined, try different method"), allow 3 retries

### Alternative Paths

**Alt Path 1: No Availability**
1. User selects 7:00 PM Saturday
2. System checks → No tables available
3. Show message: "Sorry, no tables at 7:00 PM"
4. Suggest alternatives:
   - 6:30 PM Saturday (available)
   - 8:00 PM Saturday (available)
   - 7:00 PM Sunday (available)
   - Similar restaurants with availability
5. User taps suggestion → Returns to step G with new selection

**Alt Path 2: Payment Fails**
1. User enters card details
2. Stripe returns error ("Card declined")
3. Show error message with specific issue
4. Allow retry (same card) or different payment method
5. Max 3 attempts, then:
   - Allow booking without deposit (status: pending_payment)
   - Or cancel booking flow

**Alt Path 3: User Abandons Mid-Flow**
1. User reaches payment screen
2. User closes browser/app
3. System saves draft booking (if logged in)
4. Send abandoned cart email after 1 hour (optional)
5. Email includes "Complete your booking" link

### Edge Cases

**Edge 1: Double Booking**
- Two users book same slot simultaneously
- System uses transaction lock on availability row
- First user succeeds, second sees "Just booked, choose another time"

**Edge 2: Restaurant Closes While User Booking**
- User starts booking at 10:50 PM
- Restaurant closes at 11:00 PM
- System checks if selected time is within hours
- Show error: "Restaurant closed at that time, select earlier"

**Edge 3: Network Error**
- User confirms booking
- Network drops before server responds
- Show error: "Connection lost, please check your bookings to confirm"
- Retry button available

### Success Metrics
- **Completion Rate**: 70%+ users who start booking complete it
- **Time to Book**: <3 min (guest), <1 min (returning user)
- **Error Rate**: <5% encounter errors
- **Abandonment**: Track drop-off points (biggest: payment screen 25%)

### Mobile vs Desktop Differences

**Mobile**:
- Date/time picker: Native iOS/Android pickers (better UX)
- Form: One field per screen (stepped form: Step 1/4, Step 2/4...)
- "Book Now" button: Sticky bottom (always visible)
- Payment: Stripe mobile-optimized checkout

**Desktop**:
- Date/time: Custom calendar widget (mouse-optimized)
- Form: All fields visible (single-screen form)
- "Book Now": Sticky sidebar (stays visible while scrolling)
- Payment: Stripe desktop checkout

---

## Flow 2: [Restaurant Staff] Manages Bookings

[Repeat structure: Goal, Entry Points, Diagram, Decision Points, Alternatives, Edge Cases, Metrics, Mobile vs Desktop]

---

## Flow 3: [Restaurant Admin] Sets Up Account

[Repeat structure...]

---

## Flow 4: [Super Admin] Manages Tenants (if multi-tenant)

[Repeat structure...]

---

[Document 4-6 complete flows minimum]
```

---

## File 2: wireframes.md

```markdown
# Wireframes - [Project Name]

## Overview
Low-to-medium fidelity wireframes for all pages showing layout, components, and interactions.

## Public Pages

### Page 1: Homepage

**Purpose**: First impression, drive users to search/book

**User Context**: First-time visitor or returning user

**Key Actions**:
- Primary: Search restaurant (name, cuisine, location)
- Secondary: Browse featured restaurants
- Tertiary: Learn how it works, sign up

**Layout (Desktop - 1440px wide)**

[ASCII wireframe or Mermaid diagram]

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│ [Logo: TableMaster]  Home  Restaurants  How It Works  About   [Search Icon] [Login] │ ← Header (sticky)
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     HERO SECTION (600px tall)                   │
│                  [Background: Restaurant interior photo]        │
│                                                                 │
│              Find Your Perfect Table in Seconds                 │
│                        (H1, white text)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐     │
│  │ [🔍] Search restaurants, cuisines, or locations...    │     │
│  │        [Location: Jakarta ▼]  [Date: Tomorrow ▼]      │     │
│  │                    [Search Button]                     │     │
│  └───────────────────────────────────────────────────────┘     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    FEATURED RESTAURANTS                          │
│                    (Section, 48px margin-top)                   │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ [Photo] │  │ [Photo] │  │ [Photo] │  │ [Photo] │           │
│  │         │  │         │  │         │  │         │           │
│  │ Name    │  │ Name    │  │ Name    │  │ Name    │           │
│  │ ⭐4.8   │  │ ⭐4.5   │  │ ⭐4.9   │  │ ⭐4.3   │           │
│  │ $$ · IT │  │ $$$ · JP│  │ $$ · FR │  │ $ · Cafe│           │
│  │ [Book]  │  │ [Book]  │  │ [Book]  │  │ [Book]  │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│     ↑           (24px gap between cards)                        │
│  Card width: 280px, gap: 24px, 4 columns                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                    HOW IT WORKS (48px margin)                   │
│                                                                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐                │
│  │ [Icon:🔍]│     │ [Icon:📅]│     │ [Icon:✅]│                │
│  │          │     │          │     │          │                │
│  │  Search  │     │   Book   │     │ Confirm  │                │
│  │          │     │          │     │          │                │
│  │[Subtitle]│     │[Subtitle]│     │[Subtitle]│                │
│  └──────────┘     └──────────┘     └──────────┘                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                   TESTIMONIALS (48px margin)                    │
│  [Customer quotes carousel]                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ FOOTER                                                          │
│ [Links: About, Contact, Privacy] [Social Icons] [Copyright]    │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

**Components Used**:
- Header (Logo, Navigation, SearchIcon, LoginButton)
- HeroSection (Heading, SearchBar with LocationSelect + DatePicker + SearchButton)
- SectionHeading ("Featured Restaurants")
- RestaurantCard (Image, Title, Rating, Cuisine, PriceRange, BookButton) × 4
- HowItWorksSection (StepCard × 3)
- TestimonialCarousel
- Footer (LinkColumns, SocialLinks, Copyright)

**Mobile Layout (375px wide)**:

[Show mobile wireframe with differences: Hamburger menu, vertical layout, bottom nav]

---

### Page 2: Restaurant Detail Page

[Repeat: Purpose, Context, Actions, Desktop wireframe, Mobile wireframe, Components]

---

### Page 3: Booking Confirmation Page

[Repeat...]

---

[Document 21+ pages minimum: Public (4-6), Auth User (5-7), Restaurant Admin (8-12), Super Admin (4-6)]

```

---

## File 3: design-system.md

```markdown
# Design System - [Project Name]

## Overview
Complete design system with all visual styles, components, and patterns. Single source of truth for designers and developers.

## 1. Color Palette

[Include all: Brand colors, neutral palette, semantic colors, accessibility verification]

## 2. Typography

[Include all: Font families, type scale, weights, line heights, usage guidelines]

## 3. Spacing

[Include all: Base unit, spacing scale, usage per component type]

## 4. Component Library

### Button Component

**Variants**: Primary, Secondary, Ghost, Danger

**Primary Button Specs**:
- Height: 48px
- Padding: 12px × 24px
- Font: Inter, 16px, SemiBold
- Colors: primary-600 bg, white text
- Border Radius: 8px
- States: Default, Hover, Active, Focus, Disabled, Loading

[Full specification for each variant]

**Code Example**:
```jsx
<button className="...">Book Now</button>
```

---

### Input Component

[Repeat for all 15-20 components]

---

## 5. Shadows & Elevation

[Shadow scale definitions]

## 6. Border Radius

[Radius scale definitions]

## 7. Animations & Motion

[Duration scale, easing functions, animated interactions]

## 8. Icons

[Icon system: Library (Lucide, Hero Icons), sizing, usage]

## 9. Imagery

[Photo guidelines: Aspect ratios, quality, placeholders]

## 10. Responsive Breakpoints

[Mobile, Tablet, Desktop breakpoints and behavior]

## 11. Multi-Tenant Theming

### siso-site-config.yaml

[Full YAML config with all tokens - can be customized per tenant]

```

---

## File 4: accessibility-checklist.md

```markdown
# Accessibility Plan - [Project Name]

## WCAG 2.1 Level AA Compliance

### Principle 1: Perceivable

**1.1 Text Alternatives**
- [ ] All images have alt text
- [ ] Decorative images: alt=""
- [ ] Functional images: alt describes function
- Status: ✅ Compliant

**1.4.3 Contrast (Minimum)**
- [ ] Text contrast ≥ 4.5:1
- [ ] Large text ≥ 3:1
- [ ] UI components ≥ 3:1
- Verification: WebAIM Contrast Checker
- Status: ✅ All combinations verified

[... all WCAG success criteria ...]

### Testing Plan
- Automated: axe-core, Lighthouse
- Manual: Screen reader (NVDA/JAWS), keyboard-only navigation
- Frequency: Every sprint

### Remediation
[Any issues found and how they'll be fixed]
```

---

*Use this template structure when creating Phase 4.5 deliverables.*
*Ensure all sections are complete before verification.*

---

*Last updated: 2025-10-21*
*Version: 1.0*
