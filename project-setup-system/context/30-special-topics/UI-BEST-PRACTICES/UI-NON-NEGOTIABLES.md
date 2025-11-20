# UI Non-Negotiables & Best Practices (2025/2026)

This file is the mandatory checklist for every build plan, PRD, and UI review. If a flow violates any requirement, it fails QA and must be corrected before launch. Reference it from Phase 6 (Component Mapping), Phase 8 (Build Plan), and the PRD acceptance criteria.

## 1. Accessibility & WCAG 2.2 Compliance

- **Target Size (SC 2.5.8 AA)** – All pointer targets ≥24×24 CSS px (goal: 44×44).
- **Dragging Alternatives (SC 2.5.7 AA)** – Every drag action has a tap/keyboard alternative.
- **Focus Indicators (SC 2.4.11/12/13)** – Focus may never be hidden; ≥3:1 contrast; obvious size.
- **Redundant Entry (SC 3.3.7 A)** – Auto-fill/reuse info already provided in the flow.
- **Consistent Help (SC 3.2.6 A)** – Help options stay in the same relative spot across screens.
- **Motion Control (SC 2.3.3 AAA)** – Let users disable non-essential motion.
- **Contrast (SC 1.4.3/1.4.11 AA)** – Text 4.5:1, essential icons/forms 3:1; color never the only cue.

## 2. Architecture, Performance & Responsiveness

- **Design System = SSOT** – Tokens-first system with components, accessibility notes, changelog.
- **Speed Budget** – Views load <2s on 4G. Optimize assets (WebP, compression, lazy loading) + bundle size.
- **Perceived Speed** – Skeletons or progressive loading during data fetches.
- **Mobile-First & Reflow** – Start at 320px; support portrait/landscape and foldables without losing state.
- **Adaptive Typography & Layout Tokens** – Use CSS `clamp()` + fluid spacing tokens instead of dozens of breakpoints to keep typography legible from phones to 8K displays.

## 3. Interaction, Feedback & States

- **Micro-Interactions** – Animations <300 ms, natural easing; haptics 10–20 ms when used.
- **UI States** – Design Blank, Loading, Partial, Imperfect, Error, and Success states with guidance.
- **Undo/Error Recovery** – Immediate undo/cancel for destructive actions.
- **Thumb Ergonomics** – Primary actions/nav inside thumb zone; limit nav to 3–5 labeled items.
- **Correct Keyboards** – Invoke numeric/email/etc. keyboards automatically.

## 4. Drag & Drop UX

- **Visual Drop Hierarchy** – Clear dotted/dashed zones; translucent “ghost” mirrors dragged item.
- **State Feedback** – Empty (available), Ready (highlight on hover), Error (invalid drop) visuals.
- **Group Selection** – Support multi-select drags with count badge + grouped ghost preview.
- **Performance** – Optimize hit detection (memoization/lookup tables) to keep drag responsive.

## 5. Data Visualization Integrity

- **Audience + Purpose** – Document persona + single objective before designing any chart.
- **Five-Second Rule** – Insight obvious within five seconds or redo hierarchy.
- **Ethical Scaling** – Don’t truncate axes or exaggerate differences; avoid misleading 3D effects.
- **Insightful Titles** – Titles state conclusions (“Q3 Revenue ↑15%”) not chart types.
- **Declutter** – Remove non-essential lines/text; reserve vivid color for highlights.
- **Progressive Disclosure** – KPIs first, details via drill-down/tooltips/filters.

## 6. Onboarding & Activation

- **Action-Based Walkthroughs** – Require user actions; no passive tours.
- **Onboarding Checklist** – 3–5 key tasks with progress indicator.
- **Resource Center** – Persistent in-app help hub; re-trigger onboarding anytime.
- **Skip & Personalize** – Allow skipping; capture goals to tailor experience.
- **Empty State Coaching** – First-time screens tell users what to do next (CTA, sample content).

## 7. AI / Generative UX Governance

- **Calibrated Trust** – Communicate capabilities/limits honestly.
- **Explainable AI (XAI)** – “Why am I seeing this?” with human-readable rationale + data source.
- **Confidence Indicators** – Show confidence labels/percentages.
- **Counterfactuals** – For high-stakes flows, show how changing inputs affects outcomes.
- **Fallback Paths** – Always have manual/human alternative when AI fails or is unsure.
- **User Control & Privacy** – Consent toggles, data visibility, delete/opt-out options.

## 8. Generative UI Readiness

- **Modular Components** – Tokens + primitives that AI can compose into new views.
- **Feedback Loop** – Capture user corrections and regenerate outputs accordingly.

## 9. Foldables, Wearables & Multi-Modal Inputs

- **Posture Awareness & Context Preservation** – Detect folded/half-open states (e.g., Jetpack WindowManager/window size classes) and keep scroll position, form data, and media playback intact whenever the hinge angle changes. Treat the hinge as its own layout divider so no controls sit across it.
- **Dynamic Viewport Units** – Use `dvh/svh/lvh` and container queries so layouts don’t jump when foldables expand or browser UI collapses; avoid fixed 100vh hacks.
- **Flexponsive Layouts** – Create “aspect-aware” breakpoints for ultra-wide, dual-screen, and kiosk displays, limiting line length and letting panes operate independently.
- **Wearables = Glanceable** – Keep watch/AR interactions under five seconds, with single-purpose cards, voice shortcuts, and tactile confirmations (10–20 ms haptics).
- **Voice/Gesture Parity** – Support voice commands, edge swipes, tap-and-hold, and sensor gestures as first-class alternatives so users can complete flows hands-free or on the go.

## 10. Automation & QA Enforcement

- **CI Gates** – Every PR must run automated axe/Lighthouse audits and fail if WCAG errors or defined performance budgets are exceeded.
- **Visual & Device Regression** – Maintain visual diff baselines (Percy/Backstop) plus a BrowserStack/Sauce Labs device matrix; merges require passing screenshots.
- **Assistive-Tech Test Runs** – Schedule Screen Reader + Keyboard + Switch Control smoke tests for each major release and record findings in the PRD/build plan.
- **Telemetry Hooks** – Instrument Core Web Vitals + custom UX KPIs (conversion, task success) and set alert thresholds.

## 11. Localization & Globalization

- **RTL & Layout Mirroring** – All layouts/components must support RTL mirroring; navigation icons, progress indicators, and animations flip accordingly.
- **Text Expansion Budget** – Reserve ≥30% extra width/height for copy; wrap buttons and cards gracefully for long translations.
- **Locale-Aware Inputs** – Auto-format numbers, currency, date/time, and measurement units per locale; avoid embedding locale-specific strings in images.
- **Cultural Neutrality** – Audit iconography, gestures, and color meanings for international audiences.

## 12. Privacy & Security UX

- **Consent & Transparency** – Provide progressive consent flows (just-in-time permissions, cookie banners) with plain-language explanations.
- **Data Control Patterns** – Standardize data export, deletion, and retention disclosures inside account settings.
- **Incident UX** – Predefine breach/incident banners and notification templates with clear next steps.
- **Secure Defaults** – Promote passwordless/biometric auth, session timeout messaging, and multi-factor prompts as part of the UI spec.

## 13. Visual Trends & Aesthetic Guardrails

- **Contrast-First Styling** – Trendy treatments (glassmorphism, gradients, 3D) are only allowed if contrast ≥7:1 in primary content areas and performance budgets stay intact.
- **Motion Discipline** – Limit decorative motion to <150 ms and 60 fps; disable when “Reduce Motion” is on.
- **Brand Tokens** – All experimental visuals must map back to approved design tokens so themes remain consistent.

## 14. Assistive Inputs & Alternative Controls

- **Switch & Eye-Control Support** – Ensure focus order, target spacing, and action mappings work with Switch Control, eye tracking, and dwell gestures.
- **Reader & Magnification Modes** – Verify compatibility with browser reader modes and large zoom (200%+) without loss of content.
- **Voice Guidance** – Provide descriptive labels/hints so voice assistants (e.g., Voice Control, TalkBack) can trigger every action.

## 15. Pricing & Commerce

- **Transparent Pricing** – Show total cost/fees/taxes before checkout; surface trust badges.
- **Plan Comparison** – Provide calculators, highlights, and “what-if” examples for upgrades.

## 16. FAQ & Knowledge Base Patterns

- **Predictable Placement** – FAQ/help accessible from consistent in-app drawers/resource centers.
- **Search & Filters** – Provide search, categories, and related-question suggestions.
- **Maintenance Hooks** – Track “last updated” and keep entries editable via CMS/DS.

## 17. Training & Governance

- **Reference Guides** – Maintain short how-tos inside the design system (e.g., “Implementing Explainable AI Tooltips”).
- **Changelog & Contribution Flow** – Publish updates + intake form so teams know how to propose changes.
- **Quarterly Enablement** – Run refresher sessions or office hours; document attendance in project retros.

## 18. Pre-Launch UI QA Checklist

1. ✅ Automated axe/Lighthouse run (attached report) + BrowserStack visual diff pass.
2. ✅ WCAG 2.2 AA manual spot-check with screenshots/evidence.
3. ✅ Assistive-tech smoke test (Screen Reader + Keyboard + Switch) logged.
4. ✅ Localization & RTL review (sample screenshots, text expansion approved).
5. ✅ Performance budget report (per page type) + mitigation plan if over limits.
6. ✅ Data viz integrity review (scales, titles, KPI placement).
7. ✅ AI flows: XAI links, confidence indicators, fallback path documented.
8. ✅ Privacy/security UX flows (consent, deletion, incident messaging) signed off by legal/compliance.
9. ✅ Onboarding/resource center verified for first-time users.
10. ✅ Design System updated (tokens, component variants, accessibility notes, changelog entry).

Keep this document under `context/30-special-topics/UI-BEST-PRACTICES/` and reference it in every planning artifact.
