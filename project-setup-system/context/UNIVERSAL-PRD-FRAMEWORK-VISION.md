# Universal PRD Framework Vision

You’re not building a *document template*. You’re building an **AI-driven PRD Operating System** — a *universal planning framework* that lets autonomous AI agents take any idea and turn it into a complete, validated, build-ready plan.

Think of it as a **machine-readable, self-validating PRD** that lives at the center of the *SISO App Factory* — it’s what allows the system to go:

> **Idea → Product Plan (PRD) → Architecture → Code → QA → Deploy**
> *…with minimal or no human input.*

---

## 🧩 What You’re Actually Building

The PRD is not a doc humans read — it’s a *knowledge object* that defines everything an AI agent needs to know to build and manage a project autonomously:

- What we’re building (features, scope, priorities)
- Why we’re building it (user goals, business outcomes)
- How it should behave (functional + non-functional requirements)
- How to verify success (tests, metrics, acceptance criteria)
- What constraints apply (tech stack, compliance, cost, timeline)

In other words: the PRD is the **blueprint, validator, and contract** between all agents in the system.

---

## 🚀 The Purpose of the Universal PRD Framework

The **Universal PRD Framework** provides structure, logic, and validation to make sure every AI project plan is *complete, consistent, and buildable* — regardless of domain (fintech, ecommerce, SaaS, ML app, etc.).

Here’s how it works conceptually:

### 1. Structured Data, Not Prose

Every PRD is stored as structured data — YAML/JSON/Markdown with semantic tags (like `requirements[]`, `nfr[]`, `architecture[]`, etc.). That means:

- AI agents can read and write to it easily.
- You can validate it programmatically.
- You can trace features → architecture → code automatically.

So instead of a 20-page doc, it’s a **living data graph** that describes the product.

### 2. AI Agents Collaborate Through It

Different specialized agents contribute to or consume the PRD:

| Agent               | Role                                      | What it Writes/Reads                 |
| ------------------- | ----------------------------------------- | ------------------------------------ |
| Research Agent      | Gathers market, user, and competitor data | Writes background, user needs        |
| PM Agent            | Defines problem, goals, requirements      | Writes functional PRD sections       |
| Architect Agent     | Designs systems, makes tech decisions     | Writes architecture, NFRs, ADRs      |
| Dev Agent           | Reads PRD → generates code scaffolds      | Consumes architecture & requirements |
| QA Agent            | Generates and validates tests             | Reads acceptance criteria & NFRs     |
| Ops Agent           | Builds runbooks, SLOs, monitoring         | Reads ops + reliability sections     |
| Reviewer Agent      | Validates quality gates                   | Checks completeness & consistency    |

They don’t email each other — they *read and write* to the PRD data model.

### 3. Validation & Quality Gates

Each PRD version goes through automated checks before “graduating” to the next phase:

| Phase                         | Gate              | Validation Examples                   |
| ----------------------------- | ----------------- | ------------------------------------- |
| Discovery → Definition       | Completeness Gate | Does it have all required sections?   |
| Definition → Architecture    | Consistency Gate  | Do requirements map to components?    |
| Architecture → Delivery      | Feasibility Gate  | Are NFRs achievable within cost/time? |
| Delivery → Launch            | Verification Gate | Do test plans cover all REQs?         |

If any gate fails, the responsible agent (or a self-critique routine) fixes it before continuing.

### 4. Conditionally Adaptive

It’s *universal* because it adapts automatically.

The PRD’s `meta.yaml` declares project facets:

```yaml
facets:
  domain: ecommerce
  regulated: ["PCI"]
  multi_tenant: true
  locales: ["en", "es"]
  ai_features: false
```

Those flags dynamically trigger which PRD sections and rules are required:

- If `regulated: ["PCI"]` → adds Compliance + Security checklist.
- If `ai_features: true` → adds Model Cards + Bias Testing section.
- If `multi_tenant: true` → adds RBAC + tenant isolation NFRs.

So one framework can handle a banking app, a marketplace, or an AI agent platform — just by flipping config values.

### 5. Traceable & Executable

Because everything has IDs (`REQ-001`, `API-003`, `TEST-010`), you can map requirements all the way to generated code and tests:

> **REQ-007 → ADR-002 → API `/users/login` → Test T-032**

That traceability means:

- You can validate coverage automatically.
- You can update specs safely (know what changes impact).
- You can score quality quantitatively.

Ultimately, the PRD becomes the **single executable specification** that powers downstream automation — architecture diagrams, code scaffolding, test generation, even CI/CD setup.

---

## ⚙️ How It Looks in Practice

Imagine a single project folder:

```
/project
  meta.yaml
  prd.yaml
  architecture.yaml
  adr/
  tests/
  code/
  validation_report.json
```

- `meta.yaml` = project config + facets (used to conditionally assemble PRD)
- `prd.yaml` = functional requirements + NFRs + risks + metrics
- `architecture.yaml` = C4 container + data model + integrations
- `adr/` = atomic decisions (why we chose X)
- `validation_report.json` = quality scores + gate status

Agents update these files, not freeform text. The framework validates them, runs checks, and only promotes a project if all gates pass.

---

## 💡 Why This Matters

1. **Scalability** – You can spin up 1,000 projects with consistent planning quality.
2. **Automation** – Each artifact feeds the next: PRD → architecture → code → tests.
3. **Universality** – Domain-agnostic via meta facets + reusable catalogs.
4. **Auditability** – Every decision, risk, and change is logged + explainable.
5. **Human-AI Hybrid Control** – Humans can jump in anywhere and the AI understands the full context.

---

## 🔁 Lifecycle in the SISO App Factory

1. User inputs idea / problem statement  
2. Research Agent enriches with data → PRD Draft v0.1  
3. PM Agent expands into detailed PRD v1.0 (requirements, scope, NFRs)  
4. Validator Agent checks completeness → passes to Architect  
5. Architect Agent adds architecture & ADRs → v2.0  
6. QA Agent generates tests → validation gates  
7. Dev Agents read architecture → generate code  
8. Ops Agent builds runbook, metrics  
9. System auto-verifies coverage + quality → v3.0 = “Build-ready PRD”  
10. Delivery pipeline uses this PRD to scaffold repositories, CI, infra, etc.

At the end, every part of the app can be traced back to a single PRD node.

---

## 🧱 In Summary

| Element              | What It Really Is                                                |
| -------------------- | ---------------------------------------------------------------- |
| PRD Framework        | A structured schema + validation engine for autonomous planning  |
| meta.yaml            | The configuration brain that tailors rules per project           |
| PRD Document         | The live data graph of requirements, constraints, risks, metrics |
| Agents               | Specialized contributors that fill, check, and use the PRD       |
| Validation Rules     | Automated gates ensuring completeness, feasibility, testability  |
| Outputs              | Build-ready architecture, code, and test plans                   |

---

## 🪄 The Vision

The Universal PRD Framework is **how AI systems think about projects**.

It replaces messy human docs with a **structured, self-updating, machine-verifiable plan** — the “Rosetta Stone” that lets autonomous agents and humans collaborate on building any digital product, safely and at scale.

---

Would you like a diagram of the workflow (Idea → PRD → Architecture → Code loop) for investor/dev presentations? If so, describe the preferred format (Mermaid, SVG, PPT outline) and any key emphasis areas.
