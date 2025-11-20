# SISO App Factory · Frameworks Catalog

**Goal:** keep every reusable architecture packaged like a mini product, with shared assets, incubating ideas, and ready-to-copy templates all in one place.

---

## 📚 Live Frameworks

### Multi-Tenant Platform (✅ production ready)
- **Purpose:** serve many branded clients from one Next.js + Supabase stack with configuration-driven UX.
- **Entry point:** `multi-tenant/00-overview/README.md`
- **Folder map:**
  - `00-overview/` – positioning, value props, adoption checklist.
  - `10-architecture/` – system + data diagrams (`data-architecture.md`).
  - `20-platform/` – runtime contracts (`database/MULTI-TENANT-SCHEMA.md`, theming docs, feature flags).
  - `30-deployment/` – fork/config/deploy instructions (`FORK-AND-DEPLOY.md`).
  - `40-playbooks/` – operational runbooks (`NEW-CLIENT-SETUP.md`, troubleshooting backlog).
  - `90-assets/` – scripts/SQL drops that the framework ships with (reserved).

> Copy the entire folder or cherry-pick sections; every subdirectory is self-contained so it can be pulled into another repo without breaking links.

---

## 🧰 Shared Assets
- Location: `shared-assets/`
- Use this for ERDs, token presets, or CLI helpers that multiple frameworks consume so they live in exactly one spot.
- Current subfolders: `sql/`, `scripts/` (placeholders until content arrives).

---

## 🧪 Incubator
- Location: `incubator/`
- Purpose: park drafts/experiments without mixing them with shipped frameworks.
- Active items:
  - `tenant-per-deployment/architecture.md` – describes a per-client DB spin-up pattern (status: Draft v0.1).

> Move work out of the incubator only when the numbered layout above is in place and docs are peer-reviewed.

---

## 🧱 Templates Library
- Location: `templates/`
- Empty for now; intended for starter repos (e.g., restaurant UI kit, booking UI kit). Reference these from framework playbooks once populated.

---

## 🚀 How to Use This Catalog
1. **Clone** the repo and browse `frameworks/<name>/00-overview` to understand scope/value.
2. **Copy** the folders you need; numbered layout ensures relative links remain valid even after copying into a client repo.
3. **Share assets** between frameworks via `shared-assets/` to avoid drift.
4. **Propose new ideas** by adding them to `incubator/` with a `STATUS.md` before promising them in this README.

---

## 🧭 Roadmap
- Add status badges + owners for each framework.
- Populate `shared-assets/` with ERDs and helper scripts referenced by Multi-Tenant playbooks.
- Move incubator docs into their own frameworks once production-ready (e.g., SaaS B2B, Marketplace, Booking).
