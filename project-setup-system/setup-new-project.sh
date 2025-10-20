#!/bin/bash

# SISO App Factory - New Project Setup Script
# Automates initial project structure and BMAD method download

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check arguments
if [ $# -lt 2 ]; then
    print_error "Usage: $0 <project-name> <industry-type> [target-directory]"
    echo ""
    echo "Examples:"
    echo "  $0 bike-hire-bali 'bike rental' ~/projects/bike-hire"
    echo "  $0 yoga-studio-app 'wellness/yoga' ~/projects/yoga"
    echo "  $0 tour-booking 'tourism' ."
    exit 1
fi

PROJECT_NAME=$1
INDUSTRY_TYPE=$2
TARGET_DIR=${3:-.}  # Default to current directory

print_step "SISO App Factory - Project Setup"
echo ""
echo "  Project Name: ${PROJECT_NAME}"
echo "  Industry: ${INDUSTRY_TYPE}"
echo "  Target Directory: ${TARGET_DIR}"
echo ""

# Create project directory structure
print_step "Creating project directory structure..."

PROJECT_ROOT="${TARGET_DIR}/${PROJECT_NAME}"
mkdir -p "${PROJECT_ROOT}"

# Create docs structure
mkdir -p "${PROJECT_ROOT}/docs"/{00-methods/bmad,01-research,02-design,03-features,04-business,05-technical,06-pdr,07-free-limits,08-build-plan/{domains,data,ops,qa}}
mkdir -p "${PROJECT_ROOT}/features"
mkdir -p "${PROJECT_ROOT}/src"/{app,domains,shared}
mkdir -p "${PROJECT_ROOT}/scripts"
mkdir -p "${PROJECT_ROOT}/supabase/migrations"

print_success "Directory structure created"

# Download BMAD METHOD
print_step "Downloading BMAD-METHOD..."

BMAD_DIR="${PROJECT_ROOT}/docs/00-methods/bmad/vendor"
mkdir -p "${BMAD_DIR}"

cd "${BMAD_DIR}"

if [ -d "BMAD-METHOD" ]; then
    print_warning "BMAD-METHOD already exists, pulling latest..."
    cd BMAD-METHOD
    git pull origin main
else
    print_step "Cloning BMAD-METHOD from GitHub..."
    git clone https://github.com/bmad-code-org/BMAD-METHOD.git
    print_success "BMAD-METHOD downloaded successfully"
fi

cd - > /dev/null

# Create initial BMAD integration files
print_step "Setting up BMAD integration..."

cat > "${PROJECT_ROOT}/docs/00-methods/bmad/README.md" << 'EOF'
# BMAD Method Integration

This directory contains BMAD (Breakthrough Method of Agile AI-Driven Development) integration for structured domain planning and operation mapping.

## Structure

- `vendor/BMAD-METHOD/` - BMAD framework (auto-downloaded)
- `domain-flows/` - Domain-specific operation flows
- `templates/` - BMAD templates customized for this project
- `overview.md` - How BMAD is used in this project
- `db-plan-bmad.md` - Database planning with BMAD
- `mapping-page-ops.md` - Page-to-operation mapping

## Usage

1. Define domains in `src/domains/`
2. Map operations using BMAD workflows
3. Document flows in `domain-flows/`
4. Reference BMAD checklists for quality

## Resources

- [BMAD-METHOD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- [BMAD Documentation](vendor/BMAD-METHOD/docs/)
- [BMAD Discord Community](https://discord.gg/gk8jAdXWmj)
EOF

print_success "BMAD integration configured"

# Create project config
print_step "Creating project configuration..."

cat > "${PROJECT_ROOT}/docs/project-config.yaml" << EOF
# SISO App Factory - Project Configuration

project:
  name: ${PROJECT_NAME}
  industry: ${INDUSTRY_TYPE}
  created: $(date +%Y-%m-%d)
  status: planning

planning:
  research_completed: false
  features_defined: false
  architecture_designed: false
  domains_planned: false
  database_designed: false
  components_mapped: false
  build_plan_created: false

industry:
  type: ${INDUSTRY_TYPE}
  geography: "TBD"
  target_customers: []
  competitors: []

tech_stack:
  frontend: "Next.js + TypeScript + TailwindCSS"
  backend: "Next.js Server Actions"
  database: "Supabase (PostgreSQL)"
  auth: "Clerk"
  storage: "TBD (Cloudinary/R2)"
  email: "Resend"
  analytics: "GA4 + Mixpanel"

architecture:
  pattern: "Domain-Driven Design"
  multi_tenancy: "TBD"
  deployment: "Vercel"

bmad:
  enabled: true
  version: "latest"
  location: "docs/00-methods/bmad/vendor/BMAD-METHOD"
EOF

print_success "Project configuration created"

# Create planning checklist
print_step "Creating master planning checklist..."

cat > "${PROJECT_ROOT}/docs/PLANNING-CHECKLIST.md" << 'EOF'
# Master Planning Checklist

> Follow this checklist to complete all planning phases before implementation

## Phase 1: Industry Research ⏱️ Days 1-2
- [ ] Market size and trends analysis
- [ ] Consumer behavior patterns
- [ ] Payment and technology landscape
- [ ] Regional regulations and compliance
- [ ] Identify 10-15 competitor benchmarks
- [ ] Document findings in `docs/01-research/research-summary.md`

## Phase 2: Competitor Analysis ⏱️ Days 2-3
- [ ] Audit competitor websites/apps (features, UX, tech)
- [ ] Extract unique features and patterns
- [ ] Create feature comparison matrix
- [ ] Identify gaps and opportunities
- [ ] Document in `docs/03-features/feature-matrix.md`

## Phase 3: Feature Planning ⏱️ Days 3-4
- [ ] List all potential features (core + optional)
- [ ] Evidence-based prioritization (must-have, nice-to-have, future)
- [ ] Define MVP scope
- [ ] Map features to user journeys
- [ ] Document in `docs/03-features/features.md`

## Phase 4: Architecture Design ⏱️ Days 4-5
- [ ] Define domain boundaries (10-20 domains)
- [ ] Plan multi-tenancy strategy
- [ ] Select tech stack components
- [ ] Define security and compliance requirements
- [ ] Plan caching and performance strategy
- [ ] Document in `docs/05-technical/architecture.md`

## Phase 5: Page & Component Planning ⏱️ Days 5-6
- [ ] List all pages/routes
- [ ] Map pages to domains
- [ ] List components needed per page
- [ ] Identify shared components
- [ ] Plan component sourcing (21st.dev, shadcn, custom)
- [ ] Document in `docs/05-technical/component-catalog.md`

## Phase 6: Domain Operations (BMAD) ⏱️ Days 6-7
- [ ] Define operations per domain (CRUD + business logic)
- [ ] Map user workflows to operations
- [ ] Document operation sequences
- [ ] Create domain flow diagrams
- [ ] Document in `docs/00-methods/bmad/domain-flows/`

## Phase 7: Database Schema ⏱️ Days 7-8
- [ ] Design entity models (20-50 tables)
- [ ] Define relationships and constraints
- [ ] Plan multi-tenant data isolation
- [ ] Design indexes for performance
- [ ] Create ERD diagram
- [ ] Document in `docs/05-technical/schema-spec.md` and `erd.md`

## Phase 8: Build Planning ⏱️ Days 8-9
- [ ] Break implementation into phases (typically 7 phases)
- [ ] Decompose phases into tasks (100+ tasks)
- [ ] Define dependencies and ordering
- [ ] Estimate timeline (typically 12 weeks for MVP)
- [ ] Create domain-specific checklists
- [ ] Document in `docs/08-build-plan/master-checklist.md`

## Phase 9: PDR Creation ⏱️ Days 9-10
- [ ] Write Product Definition & Requirements
- [ ] Define business scope and KPIs
- [ ] Document tenancy and cost strategy
- [ ] List non-goals and future enhancements
- [ ] Create operational playbook
- [ ] Document in `docs/06-pdr/PDR.md`

## ✅ Planning Complete

When all phases are checked:
- [ ] Review all documentation for completeness
- [ ] Get stakeholder sign-off
- [ ] Archive planning artifacts
- [ ] Begin implementation using build plan

---

**Estimated Total**: 10 planning days + 12 weeks implementation = ~14 weeks to MVP
EOF

print_success "Planning checklist created"

# Create starter files
print_step "Creating starter documentation files..."

touch "${PROJECT_ROOT}/docs/01-research/research-plan.md"
touch "${PROJECT_ROOT}/docs/01-research/research-summary.md"
touch "${PROJECT_ROOT}/docs/03-features/features.md"
touch "${PROJECT_ROOT}/docs/03-features/feature-matrix.md"
touch "${PROJECT_ROOT}/docs/05-technical/architecture.md"
touch "${PROJECT_ROOT}/docs/05-technical/schema-spec.md"
touch "${PROJECT_ROOT}/docs/06-pdr/PDR.md"
touch "${PROJECT_ROOT}/docs/08-build-plan/master-checklist.md"

print_success "Starter files created"

# Create README
print_step "Creating project README..."

cat > "${PROJECT_ROOT}/README.md" << EOF
# ${PROJECT_NAME}

${INDUSTRY_TYPE} application built with SISO App Factory

## 📋 Project Status

**Phase**: Planning
**Created**: $(date +%Y-%m-%d)

## 🎯 Quick Start

### Planning Phase (Current)

Follow the master planning checklist:

\`\`\`bash
cat docs/PLANNING-CHECKLIST.md
\`\`\`

### AI Agent Instructions

To guide AI through planning:

\`\`\`
Read the MASTER-SETUP-PROMPT.md from SISO App Factory and follow all planning phases for a ${INDUSTRY_TYPE} application.
\`\`\`

## 📁 Documentation

- **Planning Checklist**: \`docs/PLANNING-CHECKLIST.md\`
- **Research**: \`docs/01-research/\`
- **Features**: \`docs/03-features/\`
- **Architecture**: \`docs/05-technical/\`
- **Build Plan**: \`docs/08-build-plan/\`
- **PDR**: \`docs/06-pdr/\`
- **BMAD Integration**: \`docs/00-methods/bmad/\`

## 🧠 BMAD Method

This project uses [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) for:
- Domain operation mapping
- Workflow orchestration
- Quality checklists
- AI agent specialization

Location: \`docs/00-methods/bmad/vendor/BMAD-METHOD/\`

## 🏗️ Tech Stack (Planned)

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **Deployment**: Vercel
- **Analytics**: GA4 + Mixpanel

## 📊 Progress

See \`docs/project-config.yaml\` for current phase completion status.

---

Built with ❤️ using SISO App Factory
EOF

print_success "Project README created"

# Final summary
echo ""
print_success "✨ Project setup complete!"
echo ""
echo "📂 Project created at: ${PROJECT_ROOT}"
echo ""
echo "🎯 Next Steps:"
echo "   1. cd ${PROJECT_ROOT}"
echo "   2. Review docs/PLANNING-CHECKLIST.md"
echo "   3. Tell your AI to read MASTER-SETUP-PROMPT.md from SISO App Factory"
echo "   4. Follow the planning phases systematically"
echo ""
echo "🧠 BMAD-METHOD downloaded to:"
echo "   ${PROJECT_ROOT}/docs/00-methods/bmad/vendor/BMAD-METHOD/"
echo ""
print_success "Happy building! 🚀"
