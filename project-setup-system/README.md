# SISO App Factory - Project Setup System

**Purpose**: Systematic AI-guided planning framework for spinning up new application projects with comprehensive research, planning, and architecture definition.

## 🎯 What This System Does

When starting a **new type of application** (e.g., restaurant, bike hire, tour booking, SaaS platform), this system guides your AI through a complete planning and architecture phase **before writing any code**.

## 📁 Structure

```
project-setup-system/
├── README.md                           # This file
├── MASTER-SETUP-PROMPT.md             # Main AI orchestration prompt
├── setup-new-project.sh               # Automated bootstrap script
├── templates/                          # Reusable planning templates
│   ├── 01-research-phase.md
│   ├── 02-feature-planning.md
│   ├── 03-architecture-design.md
│   ├── 04-domain-planning.md
│   ├── 05-database-schema.md
│   ├── 06-component-mapping.md
│   ├── 07-build-plan.md
│   └── project-config.yaml
├── prompts/                            # Phase-specific AI prompts
│   ├── industry-research-prompt.md
│   ├── competitor-analysis-prompt.md
│   ├── feature-discovery-prompt.md
│   ├── architecture-planning-prompt.md
│   ├── domain-design-prompt.md
│   └── build-planning-prompt.md
└── examples/                           # Reference implementations
    └── restaurant-example/             # Copy of restaurant planning docs
```

## 🚀 Quick Start

### For AI Agents

1. **Import the master prompt**:
   ```
   Read: /path/to/siso-app-factory/project-setup-system/MASTER-SETUP-PROMPT.md
   ```

2. **Run automated setup** (AI executes):
   ```bash
   cd siso-app-factory/project-setup-system
   ./setup-new-project.sh "project-name" "industry-type"
   ```

3. **Follow the checklist** in MASTER-SETUP-PROMPT.md

### For Humans

1. Tell your AI:
   > "I want to plan a new [industry] application using the SISO App Factory setup system. Start by reading the MASTER-SETUP-PROMPT.md"

2. The AI will guide you through:
   - Industry research
   - Competitor analysis
   - Feature planning
   - Architecture design
   - Domain modeling
   - Database design
   - Component planning
   - Build roadmap

## 📋 Planning Phases

### Phase 1: Industry Research (Days 1-2)
- Market analysis
- Consumer behavior patterns
- Payment & technology trends
- Regional regulations
- Benchmark competitors (10-15)

**Output**: `docs/01-research/research-summary.md`

### Phase 2: Feature Discovery (Days 2-3)
- Extract features from competitors
- Evidence-based prioritization
- Feature matrix comparison
- MVP scope definition

**Output**: `docs/03-features/features.md`, `feature-matrix.md`

### Phase 3: Architecture Design (Days 3-4)
- Domain-driven design
- Tech stack selection
- Multi-tenancy strategy
- Performance requirements
- Security standards

**Output**: `docs/05-technical/architecture.md`

### Phase 4: Domain Planning (Days 4-5)
- Map pages to domains
- Define domain boundaries
- List components per page
- Plan shared components
- Define domain operations (BMAD)

**Output**: `docs/08-build-plan/domains/*.md`

### Phase 5: Database Schema (Days 5-6)
- Entity modeling
- Relationships mapping
- Migration planning
- Seed data strategy

**Output**: `docs/05-technical/schema-spec.md`, `erd.md`

### Phase 6: Component Mapping (Days 6-7)
- UI component inventory
- Component sourcing strategy
- Theming & design tokens
- Component variants catalog

**Output**: `docs/05-technical/component-catalog.md`

### Phase 7: Build Planning (Days 7-8)
- Phase breakdown
- Task decomposition
- Dependency ordering
- Timeline estimation

**Output**: `docs/08-build-plan/master-checklist.md`

## 🧠 BMAD Method Integration

The system **automatically downloads and integrates BMAD-METHOD** for:

- **Domain Operations**: Define CRUD + business operations per domain
- **Workflow Orchestration**: Multi-step user journeys
- **Agent Specialization**: AI agents for specific domains
- **Quality Checklists**: Validation and testing frameworks

BMAD is cloned into: `docs/00-methods/bmad/vendor/BMAD-METHOD/`

## 🎓 Learning from Restaurant Project

The restaurant project serves as the **reference implementation**. Key artifacts:

- **PDR** (Product Definition & Requirements)
- **Master Build Checklist** (7 phases, 100+ tasks)
- **Domain Planning** (18 domains)
- **Research Summary** (market data + benchmarks)
- **Feature Matrix** (competitive analysis)
- **Architecture Plan** (domain-driven, multi-tenant)

## 🔄 Workflow Integration

### First-Time Setup (per new industry)
1. Run `setup-new-project.sh`
2. Follow MASTER-SETUP-PROMPT phases
3. Generate all planning artifacts
4. Review and refine
5. Begin implementation using build plan

### Repeat Projects (same industry)
1. Copy planning artifacts from previous project
2. Customize for new client
3. Update research with latest market data
4. Adjust scope and features
5. Re-use architecture and domain structure

## 🛠️ Customization

Edit `templates/project-config.yaml` to define:
- Industry-specific questions
- Required integrations
- Regulatory considerations
- Tech stack preferences
- Multi-tenancy approach

## 📊 Success Metrics

A **complete planning phase** produces:

- ✅ 50+ pages of research and planning docs
- ✅ 10-15 competitor benchmarks analyzed
- ✅ Complete feature catalog (50+ features)
- ✅ Domain architecture (10-20 domains)
- ✅ Full database schema (20-50 tables)
- ✅ Component inventory (100+ components)
- ✅ 100+ task build checklist
- ✅ 12-week implementation roadmap

## 🎯 Next Steps

1. Read `MASTER-SETUP-PROMPT.md` to understand the full workflow
2. Review `examples/restaurant-example/` to see outputs
3. Run `setup-new-project.sh` when ready to plan a new project
4. Follow the checklist methodically

---

**Built by**: SISO (Shaan Sisodia)
**Last Updated**: 2025-10-20
**Version**: 1.0.0
