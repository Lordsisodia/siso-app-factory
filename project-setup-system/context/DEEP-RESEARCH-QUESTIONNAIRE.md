# Deep Research Questionnaire for SISO App Factory

**Purpose**: Gather comprehensive context to enhance AI planning capabilities
**Version**: 2.0
**Date**: 2025-10-20

---

## 🎯 How to Use This Document

1. **For Each Industry** you plan to support, answer these questions
2. **Provide Data Sources** for all factual claims
3. **Share Real Examples** from actual projects
4. **Document Lessons Learned** from implementation
5. **Return Answers** to be integrated into knowledge bases

---

## 📋 CATEGORY 1: Market Intelligence

### Industry Economics

1. **What are the typical profit margins in this industry?**
   - Gross margin: %
   - Net margin: %
   - Industry benchmarks vs. your observations

2. **What's the typical customer acquisition cost (CAC)?**
   - By channel (organic, paid, referral)
   - Payback period (months)
   - How does it vary by geography?

3. **What's the average customer lifetime value (LTV)?**
   - Average purchase frequency
   - Average order value
   - Retention rate over 12/24/36 months

4. **What's the revenue breakdown by channel?**
   - Online vs. offline
   - Direct vs. platform (e.g., delivery apps)
   - B2C vs. B2B (if applicable)

5. **What are the biggest cost drivers?**
   - Labor costs (%  of revenue)
   - Platform fees/commissions (%)
   - Technology costs (% of revenue)
   - Real estate/rent (if applicable)

6. **What's the typical business failure rate?**
   - % that fail in first year
   - % that fail in first 3 years
   - Common failure reasons

---

## 📋 CATEGORY 2: Consumer Deep-Dive

### Decision-Making Process

7. **How do customers discover businesses in this industry?**
   - Google Search (%)
   - Social Media - which platforms? (%)
   - Word-of-mouth/Referral (%)
   - Location/Walk-by (%)
   - Third-party platforms (Yelp, TripAdvisor, etc.) (%)

8. **What's the typical customer journey from discovery to purchase?**
   - Number of touchpoints
   - Time from discovery to first purchase
   - Research behaviors (what do they check?)
   - Decision triggers (what makes them buy?)

9. **What are the biggest pain points customers experience?**
   - During discovery phase
   - During booking/ordering phase
   - During service delivery
   - Post-purchase

10. **What drives repeat purchases?**
    - Quality of product/service (%)
    - Convenience (%)
    - Loyalty rewards (%)
    - Brand affinity (%)
    - Price (%)

### Demographics & Psychographics

11. **Who are the primary customer segments?**
    - Segment 1: [Age range, income, behaviors]
    - Segment 2: [Age range, income, behaviors]
    - Segment 3: [Age range, income, behaviors]
    - What % of revenue does each segment represent?

12. **What are their technology behaviors?**
    - Primary devices (mobile %, desktop %, tablet %)
    - Preferred payment methods by age group
    - Social media platforms used
    - App download vs. web usage
    - Communication channel preferences (email, SMS, WhatsApp, etc.)

13. **What are their values and motivations?**
    - What do they care about most? (price, quality, convenience, sustainability, status)
    - What fears/anxieties influence decisions?
    - What aspirations drive purchases?

---

## 📋 CATEGORY 3: Competitive Intelligence

### Market Leaders

14. **Who are the top 3 market leaders globally?**
    - Company name, market share, revenue (estimated)
    - What's their key differentiator?
    - What are they doing REALLY well?
    - What are their weaknesses?

15. **Who are the top 3 market leaders in YOUR target geography?**
    - Same questions as above
    - Why are they dominant locally?

16. **What features do 90%+ of competitors have?**
    - List the absolute must-haves
    - Why are they non-negotiable?

17. **What features are emerging trends (30-50% adoption)?**
    - List the "should-haves"
    - Why are they gaining traction?
    - How fast is adoption growing?

18. **What features are unique to market leaders (<10% adoption)?**
    - What are their "secret weapons"?
    - Could we replicate or improve upon them?
    - Are they defensible or easily copied?

### Business Models

19. **What are the dominant business/pricing models?**
    - Subscription (% of market, typical pricing)
    - Transaction fees (% of market, typical %)
    - Freemium (% conversion, typical upgrade pricing)
    - Advertising (% of market)
    - Hybrid (describe)

20. **What's the typical price sensitivity?**
    - Willingness to pay for premium features
    - Price elasticity (how much does demand drop per % price increase?)
    - Free tier expectations

---

## 📋 CATEGORY 4: Technology Landscape

### Real-World Tech Stacks

21. **What tech stacks do the top 5 competitors use?**
    - Competitor 1: Frontend, backend, database, hosting
    - Competitor 2: [same]
    - Competitor 3: [same]
    - Competitor 4: [same]
    - Competitor 5: [same]
    - **How did you detect these?** (Built With, Wappalyzer, job postings, etc.)

22. **What are the most common technology pain points?**
    - Performance bottlenecks
    - Scaling challenges
    - Integration difficulties
    - Cost explosions
    - Developer experience issues

23. **What third-party services are ESSENTIAL vs. NICE-to-HAVE?**
    - **Essential** (80%+ of competitors use):
    - **Common** (40-79% use):
    - **Rare** (10-39% use):

24. **What are the typical integration challenges?**
    - Payment gateway issues
    - Delivery platform APIs
    - POS system integrations
    - Authentication complexity
    - Data sync problems

### Supabase & Clerk Specific

25. **Have you seen Supabase used successfully in this industry?**
    - Examples/case studies
    - Limitations encountered
    - Performance at scale
    - Cost at scale

26. **Have you seen Clerk used successfully in this industry?**
    - Examples/case studies
    - Limitations encountered
    - RBAC patterns that work well
    - Organization vs. simple auth

27. **What database size do typical applications reach?**
    - After 1 month of usage
    - After 6 months
    - After 12 months
    - At 1,000 users, 10,000 users, 100,000 users

28. **What are the typical API request volumes?**
    - Requests per minute (average vs. peak)
    - Database queries per request
    - Caching hit rates
    - Edge function invocations

---

## 📋 CATEGORY 5: Regional & Cultural Variations

### Geography-Specific Insights

29. **What are the payment method preferences BY REGION?**
    - **US**: [List methods and % adoption]
    - **EU**: [List methods and % adoption]
    - **SEA**: [List methods and % adoption]
    - **Indonesia specifically**: [Detailed breakdown]
    - **Other regions you've worked in**: [Specify]

30. **What are the communication channel preferences BY REGION?**
    - Email open rates by region
    - SMS usage and costs by region
    - WhatsApp adoption by region
    - Other messaging platforms (WeChat, Line, Telegram)

31. **What are the regulatory differences BY REGION?**
    - **US**: State-by-state variations (CA, NY, TX, etc.)
    - **EU**: GDPR specifics + country variations
    - **SEA**: Country-specific regulations
    - **Indonesia**: Specific laws and enforcement

32. **What cultural factors impact UX/product decisions?**
    - Color meanings and preferences
    - Form field expectations (name formatting, address)
    - Payment timing (upfront vs. after service)
    - Communication formality
    - Trust signals needed

### Language & Localization

33. **What languages are ESSENTIAL vs. NICE-to-HAVE?**
    - Primary language(s) (must support)
    - Secondary languages (should support)
    - How much does multi-language support impact conversion?

34. **What localization goes beyond just translation?**
    - Date/time formats
    - Currency and number formatting
    - Address formats
    - Phone number formats
    - Cultural imagery and icons

---

## 📋 CATEGORY 6: Real-World Implementation

### From Your Restaurant Project

35. **What were the top 5 hardest technical challenges?**
    - Challenge 1: [Description + how you solved it]
    - Challenge 2: [Description + how you solved it]
    - Challenge 3: [Description + how you solved it]
    - Challenge 4: [Description + how you solved it]
    - Challenge 5: [Description + how you solved it]

36. **What features took longer than expected?**
    - Feature: [How long estimated vs. actual]
    - Why did it take longer?
    - What would you do differently?

37. **What features were easier than expected?**
    - Feature: [How long estimated vs. actual]
    - Why was it easier?
    - What made it smooth?

38. **What did you build that you WISH you hadn't?**
    - Feature/component
    - Why was it a waste?
    - What should you have done instead?

39. **What did you NOT build that you WISH you had?**
    - Feature/component
    - Why do you wish you'd built it?
    - When did the gap become apparent?

40. **What surprised you about user behavior?**
    - Expected: [Assumption]
    - Reality: [What actually happened]
    - Impact: [How you adapted]

---

## 📋 CATEGORY 7: Supabase Real-World Usage

### Performance & Scale

41. **What were your actual Supabase usage numbers?**
    - Database size after 1 month, 3 months, 6 months
    - Storage used (images, files)
    - Bandwidth consumed per month
    - Edge function invocations
    - Did you stay within free tier?

42. **What Supabase features did you use heavily?**
    - PostgreSQL features (specific functions, extensions)
    - Realtime subscriptions?
    - Storage transformations?
    - Edge Functions use cases
    - Auth features

43. **What RLS patterns worked best?**
    - Which of the 4 patterns did you use most?
    - Any custom patterns you developed?
    - Performance impact of RLS?
    - Debugging RLS issues - common problems?

44. **What Supabase limitations did you hit?**
    - Feature limitations
    - Performance limitations
    - Cost limitations
    - Workarounds you developed

### Migration & Operations

45. **How did you handle database migrations?**
    - Migration strategy (Supabase CLI, Prisma, custom)
    - Rollback procedures
    - Production migration process
    - Issues encountered

46. **How did you handle seed data and imports?**
    - Import scripts approach
    - Data validation
    - Performance (how long for X records?)
    - Issues with large datasets

---

## 📋 CATEGORY 8: Clerk Real-World Usage

### Authentication & Authorization

47. **What were your actual Clerk usage numbers?**
    - Monthly Active Users (MAU)
    - Organization count (if using)
    - Auth events per day
    - Did you stay within free tier?

48. **What Clerk features did you use?**
    - Social login providers
    - Phone/SMS auth
    - Organizations
    - Custom claims/metadata
    - Webhooks

49. **How did you implement RBAC?**
    - Role definitions
    - Permission granularity
    - Role assignment process
    - Permission checking (client vs. server)

50. **What Clerk + Supabase integration challenges did you face?**
    - JWT synchronization issues
    - User metadata sync
    - Webhook reliability
    - Performance implications
    - Workarounds developed

---

## 📋 CATEGORY 9: Multi-Tenancy Real-World

### Architecture Decisions

51. **Why did you choose single DB + RLS over separate DBs?**
    - Decision factors
    - Trade-offs considered
    - Would you make the same choice again?

52. **How did you handle tenant context injection?**
    - Middleware approach
    - Performance impact
    - Edge cases encountered
    - Debugging tenant isolation bugs

53. **What tenant-related bugs/issues did you encounter?**
    - Data leakage risks
    - Performance degradation
    - Complexity costs
    - How you prevented/fixed them

54. **How do you handle tenant onboarding?**
    - Automated vs. manual steps
    - Time per new tenant
    - Failure modes
    - Cost per tenant

### Cost Management

55. **What's the cost breakdown per tenant?**
    - Supabase costs
    - Vercel costs
    - Clerk costs
    - Other services
    - At what point do you need to upgrade from free tier?

56. **How do you track costs per tenant?**
    - Monitoring tools
    - Alert thresholds
    - Cost attribution methods

---

## 📋 CATEGORY 10: Performance & Optimization

### Real-World Performance

57. **What are your actual performance metrics?**
    - Lighthouse scores (mobile, desktop)
    - Core Web Vitals (FCP, LCP, CLS, INP)
    - Time to First Byte (TTFB)
    - Database query times (p50, p95, p99)

58. **What performance optimizations made the biggest impact?**
    - Optimization 1: [What you did + impact]
    - Optimization 2: [What you did + impact]
    - Optimization 3: [What you did + impact]

59. **What caching strategies worked best?**
    - Edge caching (what content, TTL)
    - Database query caching (strategy, hit rate)
    - Browser caching
    - React Query caching patterns

60. **What were your biggest performance bottlenecks?**
    - Database queries
    - Image loading
    - API calls
    - Client-side rendering
    - How did you fix them?

---

## 📋 CATEGORY 11: Feature Implementation

### Must-Have Features

61. **For MENUS (restaurant) / PRODUCTS (e-commerce) / SERVICES (booking):**
    - What fields are absolutely essential?
    - What fields did you add later and wish you'd had from start?
    - What fields did you add but never used?
    - How deep should categorization go? (1 level, 2 levels, 3+ levels?)

62. **For ORDERING / BOOKING / CHECKOUT:**
    - What's the minimum viable flow?
    - What friction points did users hit?
    - What optimizations improved conversion?
    - Guest checkout vs. required login - which performed better?

63. **For LOYALTY / REWARDS:**
    - What point-earning triggers drove engagement?
    - What redemption options were most popular?
    - What gamification elements worked?
    - What was the typical redemption rate?

64. **For ADMIN / CMS:**
    - What admin tasks happen daily vs. weekly vs. monthly?
    - What features did admins request most?
    - What admin workflows were clunky?
    - What analytics were actually used vs. ignored?

### Feature Surprises

65. **What features got used WAY MORE than expected?**
    - Feature:
    - Expected usage:
    - Actual usage:
    - Why the difference?

66. **What features got used WAY LESS than expected?**
    - Feature:
    - Expected usage:
    - Actual usage:
    - Why the difference?
    - Should you have skipped it?

---

## 📋 CATEGORY 12: Third-Party Integrations

### Integration Deep-Dive

67. **For PAYMENT GATEWAYS you've used:**
    - Which ones? (Stripe, Xendit, Midtrans, etc.)
    - Integration difficulty (1-10)
    - Time to integrate (hours)
    - Ongoing maintenance burden
    - Gotchas and surprises
    - Would you use again?

68. **For DELIVERY/LOGISTICS platforms:**
    - Which ones? (GoFood, GrabFood, UberEats, etc.)
    - API quality (1-10)
    - Integration challenges
    - Commission rates
    - Volume requirements
    - Would you recommend?

69. **For COMMUNICATION platforms:**
    - Email provider? (Resend, SendGrid, Postmark)
    - SMS provider? (Twilio, MessageBird)
    - WhatsApp? (Twilio, Meta Business API)
    - Integration complexity
    - Costs at scale
    - Deliverability rates

70. **What integrations were PAINFUL?**
    - Integration name
    - Why was it painful?
    - Time wasted
    - How you finally made it work
    - Would you avoid it next time?

71. **What integrations were DELIGHTFUL?**
    - Integration name
    - Why was it great?
    - Time saved
    - Would you always use it?

---

## 📋 CATEGORY 13: Domain Architecture

### Domain Boundaries

72. **How did you decide domain boundaries?**
    - Criteria used
    - Domains that were too big (should have split)
    - Domains that were too small (should have merged)
    - Domains that should have been combined

73. **What cross-domain dependencies caused issues?**
    - Domain A needed Domain B in unexpected ways
    - Circular dependencies
    - How you resolved them

74. **What domains could have been shared across projects?**
    - Which domains are industry-agnostic?
    - Which are industry-specific?
    - Could you create a "shared domains library"?

### BMAD Usage

75. **How did you use BMAD in practice?**
    - Which BMAD templates were most useful?
    - Which were ignored?
    - Did BMAD help or add overhead?
    - How would you improve BMAD integration?

76. **What operations did every domain need?**
    - Common CRUD patterns
    - Common validation patterns
    - Common authorization patterns
    - Could these be auto-generated?

---

## 📋 CATEGORY 14: Database Design

### Schema Decisions

77. **What database design decisions would you change?**
    - Table structure decisions you regret
    - Indexes you added too late
    - Relationships that were too complex
    - Denormalization that helped performance

78. **What's the optimal tenant_id placement strategy?**
    - Which tables need tenant_id?
    - Which tables are global/shared?
    - How do you handle cross-tenant relationships (if any)?

79. **What RLS policies caused performance issues?**
    - Which policies were slow?
    - How did you optimize them?
    - When should you bypass RLS (service role)?

80. **What's your migration strategy for production?**
    - Zero-downtime migrations
    - Rollback procedures
    - Data migration scripts
    - Testing strategy

### Data Modeling

81. **What entities exist in EVERY project?**
    - Users, Tenants, Settings...
    - Could we create a "base schema"?

82. **What's the typical table count per domain?**
    - Simple domain: X tables
    - Medium domain: Y tables
    - Complex domain: Z tables

83. **What JSON fields did you use in PostgreSQL?**
    - Which ones?
    - Why JSON vs. relational?
    - Performance implications
    - Querying challenges

---

## 📋 CATEGORY 15: Client Expectations

### Discovery Phase

84. **What do clients typically expect in a planning/discovery phase?**
    - Deliverables they want to see
    - Level of detail required
    - Timeline expectations
    - Cost expectations

85. **What questions do clients ALWAYS ask?**
    - About features
    - About timeline
    - About cost
    - About technology
    - About competitors

86. **What do clients care about MOST?**
    - Time to market (%)
    - Cost (%)
    - Features (%)
    - Quality (%)
    - Scalability (%)

### Stakeholder Management

87. **How many stakeholders are typically involved?**
    - Roles: Owner, Manager, Developer, Designer, etc.
    - Decision-making process
    - Approval gates
    - Common disagreements

88. **What causes scope creep most often?**
    - Feature additions
    - Design changes
    - Integration changes
    - Technical complexity discovered late

89. **What deliverables do stakeholders ACTUALLY read?**
    - PDR (yes/no, how thoroughly)
    - Feature docs (yes/no)
    - Technical architecture (yes/no)
    - Build plan (yes/no)
    - What do they skip?

---

## 📋 CATEGORY 16: Common Pitfalls

### What Goes Wrong

90. **What planning mistakes have you made?**
    - Underestimated effort for: [What]
    - Overestimated value of: [What]
    - Forgot to consider: [What]
    - Should have researched: [What]

91. **What architectural mistakes have you made?**
    - Wrong tech choice: [What + why + impact]
    - Over-engineered: [What + cost]
    - Under-engineered: [What + cost to fix]
    - Painted into a corner: [How]

92. **What feature mistakes have you made?**
    - Built features users didn't want
    - Skipped features users needed
    - Got priority wrong
    - Misunderstood requirements

93. **What implementation mistakes have you made?**
    - Started coding too early (before planning)
    - Planned too much (analysis paralysis)
    - Chose wrong libraries/tools
    - Didn't test enough

### Prevention Strategies

94. **What early warning signs indicate a project is going wrong?**
    - Planning phase red flags
    - Development phase red flags
    - Stakeholder communication red flags

95. **What "rules of thumb" have you learned?**
    - If X, then Y
    - Never do Z
    - Always do W
    - Industry-specific heuristics

---

## 📋 CATEGORY 17: Testing & Quality

### Testing Strategy

96. **What percentage of code should be tested?**
    - Unit test coverage target
    - Integration test coverage
    - E2E test coverage
    - What's realistic vs. ideal?

97. **What should DEFINITELY be tested?**
    - Payment flows (always)
    - Auth flows (always)
    - [What else is non-negotiable?]

98. **What's not worth testing?**
    - Static content
    - [What else can you skip?]

99. **What testing tools have worked best?**
    - Unit testing: Jest, Vitest, etc.
    - E2E testing: Playwright, Cypress, etc.
    - Visual testing:
    - Performance testing:

### Quality Assurance

100. **What QA process do you follow?**
     - Manual testing checklist
     - Automated testing
     - User acceptance testing
     - Performance testing
     - Accessibility testing
     - Security testing

101. **What bugs are MOST common?**
     - Category 1: [Auth/Payments/Data/UI/Performance]
     - How to prevent them?

---

## 📋 CATEGORY 18: Deployment & Operations

### Deployment

102. **What's your deployment workflow?**
     - Git branch strategy
     - Staging environment setup
     - Production deployment process
     - Rollback procedures
     - How long does deployment take?

103. **What environment variables are typically needed?**
     - List all env vars across projects
     - Which are sensitive vs. public?
     - How do you manage them?

104. **What post-deployment issues are common?**
     - CORS problems
     - Environment variable issues
     - Database connection problems
     - Migration failures
     - How do you prevent/fix?

### Monitoring & Maintenance

105. **What monitoring do you actually use?**
     - Error tracking (Sentry, etc.)
     - Performance monitoring
     - Uptime monitoring
     - Log aggregation
     - Analytics

106. **What maintenance tasks are needed?**
     - Daily: [List]
     - Weekly: [List]
     - Monthly: [List]
     - Quarterly: [List]

107. **What's your incident response process?**
     - How do you detect issues?
     - How do you respond?
     - Average time to resolution?
     - Post-mortem process?

---

## 📋 CATEGORY 19: Business & ROI

### Project Economics

108. **What's the typical project budget range?**
     - Small project: $X - $Y
     - Medium project: $X - $Y
     - Large project: $X - $Y
     - What drives cost up?

109. **What's the typical timeline?**
     - Planning: X days
     - Development: X weeks
     - Testing: X weeks
     - Total: X weeks
     - What causes delays?

110. **What's the ROI for clients?**
     - Revenue increase: %
     - Cost reduction: %
     - Efficiency gains: %
     - Payback period: X months

### Business Model

111. **How do you price your services?**
     - Fixed price vs. time & materials
     - Per-project vs. retainer
     - Typical pricing range
     - What's included vs. additional

112. **What ongoing revenue do you generate?**
     - Maintenance/support fees
     - Hosting management
     - Feature additions
     - Revenue share models

---

## 📋 CATEGORY 20: Future Trends & Opportunities

### Emerging Patterns

113. **What trends are you seeing in your industries?**
     - Technology trends (AI, Web3, etc.)
     - Consumer behavior trends
     - Business model innovations
     - Regulatory trends

114. **What technologies should we be watching?**
     - Emerging in next 6 months
     - Will be mainstream in 12 months
     - Long-term bets (2-3 years)

115. **What features will be "must-have" in 2-3 years?**
     - Currently nice-to-have
     - Adoption accelerating
     - Why the shift?

### AI & Automation

116. **Where can AI add value in these applications?**
     - Chatbots and customer service
     - Recommendations and personalization
     - Content generation
     - Analytics and insights
     - Operations automation

117. **What manual processes should be automated?**
     - In planning phase
     - In development phase
     - In operations phase
     - What's the ROI?

118. **What can AI NOT do well (yet)?**
     - Design decisions
     - Business logic
     - Edge cases
     - Creative work

---

## 📋 CATEGORY 21: Knowledge Gaps

### What We Don't Know

119. **What questions SHOULD I be asking that I'm NOT?**
     - Industry-specific questions I'm missing
     - Technical areas I haven't covered
     - Business aspects I'm ignoring
     - Regional considerations I'm unaware of

120. **What context would make AI planning 10x better?**
     - Documentation that doesn't exist
     - Data that's hard to find
     - Expertise that's tacit (in your head)
     - Patterns you've noticed but not documented

---

## 📝 Answer Template

For each question, please provide:

```markdown
### Q[Number]: [Question]

**Answer**:
[Your detailed answer]

**Sources** (if factual):
- [Source 1] - [URL] - [Date]
- [Source 2] - [URL] - [Date]

**Examples** (if applicable):
- [Real example from your experience]

**Additional Context**:
[Any extra notes, gotchas, or related insights]

---
```

---

## 🎯 Priority Questions (Answer These First)

If you have limited time, focus on these **20 critical questions**:

**Market Intelligence**: Q1, Q2, Q3
**Consumer Behavior**: Q7, Q8, Q9
**Competition**: Q14, Q16, Q17
**Technology**: Q21, Q22, Q23
**Real Implementation**: Q35, Q36, Q40
**Supabase**: Q41, Q43, Q44
**Clerk**: Q47, Q50
**Lessons Learned**: Q90, Q119, Q120

---

## 📊 Expected Output

**Format**: Markdown document with structured answers
**Length**: 50-100 pages (comprehensive) or 20-30 pages (priority questions only)
**Filename**: `DEEP-RESEARCH-ANSWERS-[INDUSTRY]-[DATE].md`

This will be integrated into:
- Knowledge bases (industry-specific)
- Context documents (research methodologies)
- Integration guides (real-world patterns)
- Templates (based on actual needs)

---

## 🚀 How This Improves SISO App Factory

Your answers will:

1. ✅ **Enhance Knowledge Bases** with real data
2. ✅ **Improve Templates** with actual requirements
3. ✅ **Refine Prompts** with better questions
4. ✅ **Add Case Studies** from real projects
5. ✅ **Document Gotchas** to prevent mistakes
6. ✅ **Build Pattern Library** from proven solutions
7. ✅ **Create Decision Trees** from your expertise
8. ✅ **Generate Checklists** from real issues

**Result**: AI agents will plan with 80-90% accuracy instead of 60-70%

---

**Ready to transform your tacit knowledge into systematic AI intelligence!** 🧠
