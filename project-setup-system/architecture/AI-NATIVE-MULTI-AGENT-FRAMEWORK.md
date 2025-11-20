# AI-Native Multi-Agent Architecture Template

This reference framework shows how to combine AI-native principles, Domain-Driven Design, and multi-agent orchestration to build an autonomous coding system similar to Blueprint2Code, ALMAS, and MetaGPT.

## 1. Architectural Principles

1. **AI-Native Core** – Intelligence is foundational: every service exposes profile, memory, planning, and action surfaces that LLM agents can query/update. Design for continual learning + reflexive feedback instead of static CRUD.
2. **Agentic Paradigm** – Autonomous agents plan, execute, and self-refine using tool stacks (compilers, debuggers, CI). Separate co-pilots (assistive) from agents (goal owners).
3. **Domain-Driven Design (DDD)** – Use bounded contexts to align each agent with one business capability, reducing context sprawl and enabling specialization.
4. **Event-Driven Architecture (EDA)** – Events are the lingua franca. Agents publish immutable facts to a bus (Kafka/NATS/LangGraph state) and subscribe only to BC-relevant streams. This unlocks concurrent planning/coding/testing.
5. **Spec-Driven Development (SDD)** – PRDs, buildplan.yaml, and ADRs become canonical APIs that agents read/write. Specs are versioned artefacts that gate every downstream action.

## 2. Bounded Contexts & Agent Roles

| Bounded Context | Primary Agent | Responsibilities | Tooling |
| --- | --- | --- | --- |
| **Discovery BC** | Research Agent | Market/competitor research, knowledge ingestion | WebSearch/WebFetch, RAG, Notebook LM exports |
| **Product BC** | Blueprint/PM Agent | PRD, feature stack, acceptance criteria, SDD schemas | Templates, meta.yaml, buildplan generator |
| **Architecture BC** | Architect Agent | Domain map, ERDs, integration plan, ADRs | DDD tooling, C4 diagrams, ADR templates |
| **Implementation BC** | Coding Agent | Code generation, refactors, unit tests per buildplan | Codex/Claude Code, AutoGen sandboxes |
| **Quality BC** | Debugging/QA Agent | DeepEval runs, static analysis, Playwright, Langfuse scoring | DeepEval, CI pipelines, Langfuse traces |
| **Operations BC** | Ops Agent | Deployments, observability, feature flags, rollback | Supabase/Vercel CLI, GitHub Actions, Sentry |

Each BC exposes explicit APIs/events (e.g., `Product.PRDSnapshotCreated`, `Architecture.SchemaValidated`, `Implementation.BuildTaskCompleted`).

## 3. Event Bus & State Graph

- **Event Bus:** Use LangGraph, Temporal, or Kafka to capture agent transitions. Every agent subscribes to events relevant to its BC. Example flow:
  1. `Discovery.ResearchCompleted` → triggers Blueprint Agent.
  2. `Product.BlueprintApproved` → triggers Architect Agent.
  3. `Architecture.DesignCommitted` → triggers Coding Agent.
  4. `Implementation.TaskFinished` → emits per-task events consumed by QA Agent.
- **State Graph:** Represented as a directed acyclic graph (DAG) managed by Microsoft Agent Framework (MAF) or LangGraph for deterministic orchestration (supports sequential, concurrent, or magnetic flows).

## 4. Example Workflow (Blueprint2Code-inspired)

1. **Previewing Stage:** Research Agent ingests requirements and emits `Discovery.ScopeEstablished` with context embeddings stored in memory service.
2. **Blueprint Stage:** Blueprint Agent reads memory + templates, updates `docs/03-features` and `buildplan.yaml`, emits `Product.BlueprintReady`.
3. **Coding Stage:** Coding Agent consumes atomic tasks from `buildplan.yaml`, generates code via Codex/Claude Code, commits to repo, emits `Implementation.TaskCompleted` events.
4. **Debugging Stage:** QA Agent listens to `Implementation.TaskCompleted`, runs tests/DeepEval, files issues back onto bus (`Quality.DefectFound`). Coding Agent re-runs tasks until QA emits `Quality.TaskPassed`.
5. **Ops Stage:** Once QA approves, Ops Agent deploys using Vercel/Supabase CLIs and logs telemetry to Langfuse + monitoring stack.

## 5. Memory & Knowledge Strategy

- **Short-Term Memory:** Conversation/state buffers per agent (LangChain, AutoGen). Include page/component level docs so retrieval stays precise.
- **Long-Term Memory:** Vector DB storing research findings, code summaries, and lessons learned; retrieved via RAG pipelines.
- **Spec Store:** Versioned SDD artifacts (meta.yaml, buildplan.yaml, PRD) kept in Git + exposed via APIs for other agents.
- **Notebook LM / External Research:** Import curated notebooks (UI best practices) into RAG index per domain.

## 6. Tooling Stack Recommendations

| Layer | Recommended Tools |
| --- | --- |
| Orchestration | Microsoft Agent Framework (successor to Semantic Kernel/AutoGen), LangGraph, Temporal |
| Agent Runtime | AutoGen (actor conversations), CrewAI (role orchestration), MetaGPT SOP modules |
| Communication | Kafka/NATS/LangGraph events, Supabase/Postgres for durable state |
| Knowledge | RAG index (Pinecone/Weaviate/pgvector) + Notebook LM exports + domain docs |
| Evaluation | DeepEval, Langfuse, CI pipelines (Playwright/Vitest) |
| Deployment | Supabase (DB/Auth/Storage), Vercel (frontend), GitHub Actions (CI/CD) |

## 7. Spec-Driven Development Hooks

1. **Input:** PRD/Blueprint authored in `docs/` and `buildplan.yaml`.
2. **Validation:** QA Agent checks every spec section using checklists + DeepEval.
3. **Code Generation:** Coding Agent uses buildplan tasks as prompts, referencing component catalog + schemas.
4. **Governance:** Ops Agent ensures deployments only occur when specs, code, and tests match (traceability matrix).

## 8. Extending the Template

- Add domain-specific overlays (e.g., FinTech requires compliance agent, Healthcare adds HIPAA guard).  
- Introduce additional BCs for Data Science, Growth, Support as maturity increases.  
- Plug in future frameworks (e.g., MAF magnetic workflows) without changing BC boundaries.

## 9. Emerging Patterns & Research Map

- **Blueprint2Code** – Closed-loop Preview → Blueprint → Coding → Debugging pipeline; informs our discovery/product/implementation loop.
- **ALMAS** – Agile-aligned multi-agent team; reinforces the mapping between BCs and scrum roles.
- **MetaGPT / SOP pipelines** – Demonstrate how SOPs keep multi-agent outputs deterministic; reuse for PRD + architecture generations.
- **Spec-Driven Development (SDD)** – Treat specs as APIs so every agent has a contract; our buildplan.yaml + PRD mirror this.
- **Microsoft Agent Framework (MAF)** – Successor to Semantic Kernel + AutoGen with magnetic orchestration modes for mixing sequential and concurrent flows.
- **MASAI / AgentVerse / AutoGenesis** – Research on agent swarms for large-scale coding; highlights the need for shared memory graphs + tool sandboxes.
- **Retrieval-Augmented Generation (RAG) stacks** – Keep Notebook LM exports, UI research, and code intelligence in vector stores so agents stay grounded.
- **Reliability Tooling** – Use Langfuse/DeepEval, sandboxed code runners (Docker/AutoGen), and guard agents (Reflexion, CoVe) to keep concurrent agents from regressing quality.

Use this blueprint as the base architecture when creating new multi-agent AI coding examples inside SISO App Factory.
