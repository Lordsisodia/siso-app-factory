# Deep Research Context Document

**Purpose**: Provide AI agents with comprehensive context for conducting deep industry research
**Version**: 2.0
**Last Updated**: 2025-10-20

---

## 🎯 How to Use This Document

This document provides **persistent research context** that AI agents should load **before starting any planning phase**. It contains:

1. **Research Methodologies** - How to conduct effective research
2. **Source Quality Guidelines** - What sources to trust
3. **Industry Research Frameworks** - Structured approaches per industry
4. **Data Collection Templates** - What data to gather
5. **Validation Checklists** - How to verify research quality

---

## 📊 Research Methodologies

### 1. Market Research Framework

**Objective**: Understand market size, growth, and dynamics

**Steps**:
1. **Top-Down Analysis**
   - Global market size → Regional → Local
   - Industry reports from Gartner, McKinsey, CB Insights
   - Government statistics and trade associations

2. **Bottom-Up Analysis**
   - Count competitors and estimate revenue
   - Survey potential customers
   - Analyze pricing and unit economics

3. **Trend Analysis**
   - Year-over-year growth rates
   - Emerging technologies
   - Consumer behavior shifts
   - Regulatory changes

**Data Points to Collect**:
- Total Addressable Market (TAM)
- Serviceable Addressable Market (SAM)
- Serviceable Obtainable Market (SOM)
- CAGR (Compound Annual Growth Rate)
- Market segmentation
- Key players and market share

**Recommended Tools**:
- `WebSearch` for industry reports
- `mcp__exa__deep_researcher_start` for comprehensive analysis
- `WebFetch` for specific data sources

---

### 2. Consumer Behavior Research

**Objective**: Understand how target users behave and make decisions

**Research Areas**:

1. **Demographics**
   - Age, income, education
   - Geographic distribution
   - Tech adoption level
   - Cultural preferences

2. **Psychographics**
   - Values and motivations
   - Pain points and frustrations
   - Decision-making triggers
   - Brand loyalty factors

3. **Technology Usage**
   - Device preferences (mobile, desktop, tablet)
   - App usage patterns
   - Payment methods
   - Communication channels
   - Social media platforms

4. **Purchase Behavior**
   - Research process
   - Decision timeline
   - Price sensitivity
   - Loyalty and repeat purchase
   - Referral likelihood

**Data Sources**:
- Pew Research Center
- Nielsen Consumer Reports
- Google Consumer Barometer
- Local consumer surveys
- Academic journals

**Key Metrics**:
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Conversion rates
- Average order value
- Repeat purchase rate
- Net Promoter Score (NPS)

---

### 3. Competitor Analysis Framework

**Objective**: Systematically analyze 10-15 competitors

**Tier Classification**:

**Tier 1: Market Leaders** (3-5 competitors)
- Dominant market share (>20%)
- Established brand recognition
- Comprehensive feature sets
- High funding/revenue

**Tier 2: Mid-Market** (5-7 competitors)
- Growing market share (5-20%)
- Strong in specific niches
- Competitive feature sets
- Moderate funding/revenue

**Tier 3: Emerging/Niche** (3-5 competitors)
- Small market share (<5%)
- Specialized offerings
- Innovative approaches
- Early-stage companies

**Analysis Framework** (per competitor):

1. **Business Model**
   - Revenue streams
   - Pricing strategy
   - Target customers
   - Value proposition

2. **Product/Service**
   - Core features
   - Unique capabilities
   - User experience
   - Technology stack

3. **Go-to-Market**
   - Marketing channels
   - Sales approach
   - Partnerships
   - Geographic focus

4. **Strengths & Weaknesses**
   - What they do well
   - Where they fall short
   - Opportunities for differentiation

**Tools**:
- `WebFetch` for website scraping
- SimilarWeb for traffic analysis
- Built With for tech stack detection
- Crunchbase for funding/company data

---

### 4. Technology Landscape Research

**Objective**: Understand technology trends and tools in the industry

**Areas to Research**:

1. **Common Tech Stacks**
   - Frontend frameworks
   - Backend platforms
   - Database technologies
   - Cloud providers
   - Third-party services

2. **Integration Ecosystem**
   - Payment gateways
   - Delivery/logistics platforms
   - Communication tools
   - Marketing automation
   - Analytics platforms

3. **Emerging Technologies**
   - AI/ML applications
   - Blockchain/Web3
   - IoT/Hardware
   - AR/VR

4. **Development Tools**
   - IDEs and editors
   - CI/CD platforms
   - Testing frameworks
   - Monitoring tools

**Data Sources**:
- Stack Overflow Developer Survey
- State of JS/CSS/etc. surveys
- GitHub trending repositories
- Hacker News discussions
- Tech blogs (Vercel, Netlify, AWS, etc.)

---

### 5. Regulatory & Compliance Research

**Objective**: Identify all regulatory requirements

**Categories**:

1. **Data Privacy**
   - GDPR (EU)
   - CCPA (California)
   - Local data protection laws
   - Cookie consent requirements

2. **Financial/Payment**
   - PCI DSS (payment cards)
   - AML (anti-money laundering)
   - KYC (know your customer)
   - Regional payment regulations

3. **Industry-Specific**
   - Health: HIPAA, FDA
   - Food: FDA, local health departments
   - Finance: SEC, FINRA
   - Real estate: Fair Housing Act

4. **Accessibility**
   - ADA (Americans with Disabilities Act)
   - WCAG 2.1 compliance
   - Local accessibility laws

5. **Content & Intellectual Property**
   - Copyright laws
   - Trademark regulations
   - User-generated content rules
   - DMCA

**Sources**:
- Government websites (.gov)
- Legal databases (FindLaw, Justia)
- Industry associations
- Compliance consultants

---

## 🔍 Source Quality Guidelines

### Tier 1: Highly Credible Sources (Always Cite)
- **Government Statistics**: Census, BLS, trade commissions
- **Industry Reports**: Gartner, Forrester, McKinsey, Deloitte
- **Academic Research**: Peer-reviewed journals, university studies
- **Official Company Data**: Annual reports, investor presentations

**Credibility Score**: 95-100%

### Tier 2: Reliable Sources (Cite with Verification)
- **Industry Publications**: TechCrunch, The Verge, Ars Technica
- **Trade Associations**: Industry-specific organizations
- **Market Research Firms**: Statista, eMarketer, Nielsen
- **Reputable News**: WSJ, NYT, Financial Times

**Credibility Score**: 75-94%

### Tier 3: Supplementary Sources (Use Sparingly)
- **Company Blogs**: Vercel, Stripe, AWS blogs
- **Individual Blogs**: Well-known industry experts
- **Community Surveys**: Stack Overflow, GitHub
- **Social Media**: Twitter threads, LinkedIn posts

**Credibility Score**: 50-74%

### ❌ Avoid
- Anonymous sources
- Unverified claims
- Outdated data (>3 years for tech)
- Biased vendor content
- Low-quality blog spam

---

## 📋 Data Collection Templates

### Market Size Template

```markdown
**Market**: [Industry Name]
**Geography**: [Global/Regional/Local]
**Year**: [2024/2025]

**Total Addressable Market (TAM)**:
- Size: $X billion
- CAGR: Y%
- Source: [Link]

**Serviceable Addressable Market (SAM)**:
- Size: $X billion
- Definition: [How calculated]
- Source: [Link]

**Serviceable Obtainable Market (SOM)**:
- Size: $X million
- Assumptions: [Market share assumptions]
- Timeline: [3-5 years]
```

### Consumer Behavior Template

```markdown
**Segment**: [Target User Type]
**Geography**: [Location]
**Year**: [2024/2025]

**Demographics**:
- Age: [Range]
- Income: [Range]
- Education: [Level]
- Tech Adoption: [High/Medium/Low]

**Payment Preferences**:
| Method | Adoption | Source |
|--------|----------|--------|
| Cash | X% | [Link] |
| Cards | X% | [Link] |
| E-wallets | X% | [Link] |

**Technology Usage**:
- Mobile Penetration: X%
- Smartphone Usage: X hours/day
- Preferred Platforms: [List]
- Sources: [Links]
```

### Competitor Profile Template

```markdown
**Competitor**: [Name]
**URL**: [Website]
**Tier**: [1/2/3]
**Location**: [HQ Location]

**Business Model**:
- Revenue: $X million (estimated)
- Funding: $X million (Series X)
- Employees: X
- Founded: [Year]

**Product Features**:
- [Feature 1] ✅
- [Feature 2] ✅
- [Feature 3] ❌
- [Unique Feature] ⭐

**Tech Stack** (detected):
- Frontend: [Framework]
- Backend: [Platform]
- Database: [Technology]
- Hosting: [Provider]

**Strengths**:
- [Strength 1]
- [Strength 2]

**Weaknesses**:
- [Weakness 1]
- [Weakness 2]

**Opportunities** (for us):
- [Gap 1]
- [Gap 2]
```

---

## ✅ Validation Checklists

### Research Quality Checklist

**Before finalizing research, verify**:

- [ ] At least 10 credible sources cited
- [ ] All statistics have sources with dates
- [ ] Market size quantified with currency and year
- [ ] Geographic focus clearly defined
- [ ] 10-15 competitors identified with URLs
- [ ] Consumer behavior backed by data (not assumptions)
- [ ] Technology trends supported by evidence
- [ ] Regulatory requirements verified from official sources
- [ ] Data is current (<1 year old for market data, <3 years for tech)
- [ ] Contradictory data investigated and reconciled

### Competitor Analysis Checklist

**For each competitor**:

- [ ] Website URL documented
- [ ] Tier classification assigned
- [ ] Business model understood
- [ ] Key features listed
- [ ] Tech stack detected (partially or fully)
- [ ] Strengths identified (at least 2)
- [ ] Weaknesses identified (at least 2)
- [ ] Differentiation opportunities noted

**Overall**:

- [ ] 10-15 competitors analyzed total
- [ ] At least 3 Tier 1 competitors
- [ ] At least 5 Tier 2 competitors
- [ ] Feature matrix created
- [ ] Feature frequency calculated (X/15 have it)

### Data Currency Checklist

**Verify data freshness**:

- [ ] Market size data: <12 months old
- [ ] Consumer behavior: <18 months old
- [ ] Technology trends: <6 months old
- [ ] Regulatory requirements: Current (re-check before launch)
- [ ] Competitor analysis: <3 months old

---

## 🌍 Geographic Research Considerations

### Regional Variations to Research

1. **Payment Methods**
   - North America: Cards, Apple Pay, Venmo
   - Europe: SEPA, bank transfers, local wallets
   - Asia: Alipay, WeChat Pay, GrabPay
   - Latin America: MercadoPago, PIX
   - Indonesia: GoPay, OVO, DANA

2. **Communication Channels**
   - Global: Email
   - US/Europe: SMS
   - Asia/LatAm: WhatsApp, Line, WeChat
   - Specific regions: Telegram, Signal

3. **E-Commerce Platforms**
   - Global: Shopify, WooCommerce
   - Indonesia: Tokopedia, Bukalapak
   - SEA: Lazada, Shopee
   - China: Tmall, JD.com

4. **Regulations**
   - EU: GDPR (strict)
   - US: State-by-state (CCPA in CA)
   - Asia: Varies widely by country
   - Always check local requirements

---

## 🎓 Industry-Specific Research Tips

### Restaurant/F&B
- Focus on delivery platforms (UberEats, DoorDash, GrabFood, GoFood)
- Health department regulations
- POS integration ecosystems
- Loyalty program benchmarks
- Peak hours and seasonal trends

### Wellness/Fitness
- Booking platforms (Mindbody, ClassPass)
- Health data privacy (HIPAA if applicable)
- Wearable integrations (Apple Health, Fitbit)
- Virtual class trends
- Subscription models

### Retail/E-Commerce
- Shopping cart abandonment rates
- Payment gateway options
- Inventory management systems
- Shipping/logistics providers
- Returns and refunds best practices

### SaaS/B2B
- Pricing models (per-seat, usage-based, tiered)
- Integration ecosystem (Zapier, API-first)
- Trial and onboarding flows
- Customer support expectations
- Security compliance (SOC 2, ISO 27001)

### Marketplace
- Two-sided marketplace dynamics
- Transaction fees and revenue share
- Trust and safety features
- Escrow and payment timing
- Dispute resolution

---

## 📚 Recommended Reading

### Research Methodologies
- "Lean Customer Development" by Cindy Alvarez
- "The Mom Test" by Rob Fitzpatrick
- "Continuous Discovery Habits" by Teresa Torres

### Market Analysis
- Gartner Hype Cycle reports
- CB Insights industry reports
- McKinsey insights

### Consumer Behavior
- Pew Research studies
- Nielsen Consumer reports
- Google Consumer Barometer

---

## 🚀 Next Steps After Research

1. **Consolidate Findings** → `research-summary.md`
2. **Extract Features** → `features.md`
3. **Build Feature Matrix** → `feature-matrix.md`
4. **Identify Gaps** → Opportunities for differentiation
5. **Validate Assumptions** → Stakeholder review

---

**This context document should be loaded by AI before starting any Phase 1 (Industry Research) work.**
