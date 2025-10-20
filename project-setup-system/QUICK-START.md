# SISO App Factory - Quick Start Guide

## 🚀 For Humans: Starting a New Project

### 1. Run Setup Script

```bash
cd siso-app-factory/project-setup-system
./setup-new-project.sh "my-app-name" "industry-type" ~/projects/
```

**Example:**
```bash
./setup-new-project.sh "yoga-studio-bali" "wellness/yoga" ~/projects/
```

This creates:
- ✅ Complete folder structure
- ✅ Downloads BMAD-METHOD automatically
- ✅ Creates planning checklists
- ✅ Sets up starter documentation
- ✅ Configures project settings

### 2. Tell Your AI

```
I want to plan a new [INDUSTRY] application.

Please read:
/path/to/siso-app-factory/project-setup-system/MASTER-SETUP-PROMPT.md

Then follow all 9 planning phases systematically for my [INDUSTRY] project.
```

### 3. Watch the Magic

Your AI will:
1. ✅ Research the industry (Days 1-2)
2. ✅ Analyze 10-15 competitors (Days 2-3)
3. ✅ Plan 50+ features (Days 3-4)
4. ✅ Design architecture (Days 4-5)
5. ✅ Map pages & components (Days 5-6)
6. ✅ Define BMAD operations (Days 6-7)
7. ✅ Design database schema (Days 7-8)
8. ✅ Create build plan (Days 8-9)
9. ✅ Write PDR (Days 9-10)

**Total**: ~10 planning days → Ready to implement!

---

## 🤖 For AI Agents: Planning Workflow

### Step 1: Verify Setup

```bash
# Check if project was created
ls -la /path/to/project/

# Verify BMAD downloaded
ls -la docs/00-methods/bmad/vendor/BMAD-METHOD/
```

### Step 2: Load Master Prompt

```
Read: /path/to/siso-app-factory/project-setup-system/MASTER-SETUP-PROMPT.md
```

### Step 3: Execute Phases Sequentially

**PHASE 1: Industry Research** (Days 1-2)
- Use `WebSearch` for market data
- Use `WebFetch` for regulations
- Use `mcp__exa__deep_researcher_start` for deep dives
- Output: `docs/01-research/research-summary.md`

**PHASE 2: Competitor Analysis** (Days 2-3)
- Use `WebFetch` to scrape 10-15 competitors
- Create feature matrix
- Output: `docs/03-features/feature-matrix.md`

**PHASE 3: Feature Planning** (Days 3-4)
- Consolidate features
- Prioritize with evidence
- Output: `docs/03-features/features.md`

**PHASE 4: Architecture** (Days 4-5)
- Define 10-20 domains
- Select tech stack
- Output: `docs/05-technical/architecture.md`

**PHASE 5: Pages & Components** (Days 5-6)
- List all pages
- Map components
- Output: `docs/05-technical/component-catalog.md`

**PHASE 6: BMAD Operations** (Days 6-7)
- Use BMAD templates
- Define operations per domain
- Output: `docs/00-methods/bmad/domain-flows/*.md`

**PHASE 7: Database** (Days 7-8)
- Design 20-50 tables
- Create ERD
- Output: `docs/05-technical/schema-spec.md`

**PHASE 8: Build Plan** (Days 8-9)
- 7 phases, 100+ tasks
- Output: `docs/08-build-plan/master-checklist.md`

**PHASE 9: PDR** (Days 9-10)
- Consolidate everything
- Output: `docs/06-pdr/PDR.md`

### Step 4: Final Validation

Check all deliverables:
- [ ] research-summary.md (with 10+ sources)
- [ ] feature-matrix.md (10-15 competitors)
- [ ] features.md (50+ features)
- [ ] architecture.md (10-20 domains)
- [ ] component-catalog.md (50+ components)
- [ ] domain-flows/*.md (BMAD operations)
- [ ] schema-spec.md (20-50 tables)
- [ ] master-checklist.md (100+ tasks)
- [ ] PDR.md (comprehensive)

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `README.md` | System overview |
| `MASTER-SETUP-PROMPT.md` | **Main AI orchestration prompt** |
| `QUICK-START.md` | This file - quick reference |
| `setup-new-project.sh` | Automated project bootstrap |
| `PLANNING-CHECKLIST.md` | Phase completion tracker (in project) |

---

## 🎓 Learn from Examples

### Restaurant Project (Reference Implementation)

Location: `/client-projects/Restraunt/docs/`

Key files to study:
- `06-pdr/PDR.md` - See a complete PDR
- `08-build-plan/master-checklist.md` - See 7-phase plan
- `01-research/research-summary.md` - See market research
- `03-features/features.md` - See feature planning
- `00-methods/bmad/domain-flows/` - See BMAD usage

---

## 💡 Pro Tips

### For Humans

1. **Trust the process** - 10 days of planning saves months of rework
2. **Let AI do the heavy lifting** - Research and documentation are AI strengths
3. **Review critically** - AI generates content, you validate quality
4. **Iterate** - Planning phases can loop back if needed

### For AI Agents

1. **Be thorough** - More detail now = easier implementation later
2. **Use tools effectively** - WebSearch, WebFetch, MCP tools
3. **Document sources** - Cite every fact and statistic
4. **Ask questions** - Clarify ambiguities with the user
5. **Reference examples** - Look at restaurant project when stuck
6. **Update checklists** - Mark tasks complete as you go

---

## 🆘 Troubleshooting

### "BMAD didn't download"
```bash
cd docs/00-methods/bmad/vendor
git clone https://github.com/bmad-code-org/BMAD-METHOD.git
```

### "Script won't run"
```bash
chmod +x setup-new-project.sh
```

### "AI isn't following phases"
Point AI to: `MASTER-SETUP-PROMPT.md` and say "Follow this exactly"

### "Need to restart planning"
Just tell AI which phase to restart from. All phases are modular.

---

## ✅ Success Criteria

Planning is complete when:
- ✅ All 9 phases finished
- ✅ All deliverables created (9 key files minimum)
- ✅ 50+ pages of documentation
- ✅ PDR stakeholder-approved
- ✅ Build plan has 100+ tasks
- ✅ Team is confident in scope and approach

**Then**: Start implementation following `docs/08-build-plan/master-checklist.md`

---

## 🎯 Expected Output

After 10 planning days:

```
my-project/
├── docs/
│   ├── 01-research/
│   │   └── research-summary.md           (10-20 pages)
│   ├── 03-features/
│   │   ├── features.md                   (20-30 pages)
│   │   └── feature-matrix.md             (5-10 pages)
│   ├── 05-technical/
│   │   ├── architecture.md               (10-15 pages)
│   │   ├── schema-spec.md                (10-20 pages)
│   │   ├── erd.md                        (diagram)
│   │   └── component-catalog.md          (15-20 pages)
│   ├── 06-pdr/
│   │   └── PDR.md                        (10-15 pages)
│   ├── 08-build-plan/
│   │   ├── master-checklist.md           (20-30 pages)
│   │   └── domains/*.md                  (10-20 files)
│   └── 00-methods/bmad/
│       ├── domain-flows/*.md             (10-20 files)
│       └── vendor/BMAD-METHOD/           (auto-downloaded)
├── README.md
└── PLANNING-CHECKLIST.md
```

**Total**: 50-100+ pages of planning documentation 🎉

---

**Ready? Let's build something amazing!** 🚀
