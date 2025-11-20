# Style & Conventions
- Components/features live in dedicated folders with `component.tsx` (React), `index.ts`, and `metadata.json` describing use cases; imports are organized per package path (e.g., `@siso/ui/primitives/buttons/...`).
- TypeScript is strict (root `tsconfig.json`), modules target ESNext, and packages expose ESM/CJS via `exports` definitions; peer deps assume React 18.
- Metadata-driven approach: every primitive/feature requires descriptive fields (visual_style, use_cases, tags, industry_fit) so AI search can rank items; catalog updates should follow script regeneration.
- Planning artifacts follow numbered phase templates under `project-setup-system/` (9 planning phases + Phase 4.5 UI/UX) and rely on prompts/checklists; observability expects LangFuse logging after every phase.
- Framework docs adopt numbered directories (`00-overview`, `10-architecture`, etc.) to keep relative links intact when copied.
