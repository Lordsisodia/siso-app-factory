# SISO App Factory - Frameworks

**Purpose:** Reusable frameworks and architectures for building scalable applications

---

## 📚 Available Frameworks

### **1. Multi-Tenant Architecture** ⭐

**Purpose:** Build ONE codebase that serves multiple clients from ONE Supabase database

**What's Included:**
- Multi-tenant database schema with client_id isolation
- Row Level Security (RLS) policies
- Configuration-driven theming system
- Fork and deploy process (new client in 10 minutes)
- Environment variable templates
- Step-by-step setup guides

**Use Cases:**
- Restaurant chains (multiple locations, one system)
- Tour operators (multiple brands, one platform)
- Rental companies (bikes, cars, equipment across regions)
- SaaS products (multiple customers, one app)
- Any multi-client business

**Key Benefits:**
- ✅ One codebase, infinite clients
- ✅ One database (cost-effective)
- ✅ Config-driven branding (colors, fonts, logo)
- ✅ Fast client onboarding (10 minutes)
- ✅ Centralized management
- ✅ Bug fixes benefit all clients

**Documentation:**
- [README.md](./multi-tenant-architecture/README.md) - Overview
- [database/MULTI-TENANT-SCHEMA.md](./multi-tenant-architecture/database/MULTI-TENANT-SCHEMA.md) - Database design
- [theming/CONFIG-DRIVEN-THEMING.md](./multi-tenant-architecture/theming/CONFIG-DRIVEN-THEMING.md) - Theming system
- [deployment/FORK-AND-DEPLOY.md](./multi-tenant-architecture/deployment/FORK-AND-DEPLOY.md) - Deployment process
- [guides/NEW-CLIENT-SETUP.md](./multi-tenant-architecture/guides/NEW-CLIENT-SETUP.md) - Quick start

---

## 🎯 How to Use

### **Import into Your Project:**

```bash
# Clone SISO App Factory
git clone https://github.com/Lordsisodia/siso-app-factory.git

# Copy framework to your project
cp -r siso-app-factory/frameworks/multi-tenant-architecture your-project/

# Follow the guides in the framework folder
cd your-project/multi-tenant-architecture
cat guides/NEW-CLIENT-SETUP.md
```

### **Or Reference Directly:**

```bash
# In your project README:
"Architecture based on SISO App Factory Multi-Tenant Framework:
https://github.com/Lordsisodia/siso-app-factory/tree/main/frameworks/multi-tenant-architecture"
```

---

## 🚀 Quick Reference

### **Multi-Tenant Checklist:**

**Database:**
- [ ] Add `client_id UUID` to all tables
- [ ] Create indexes on `client_id`
- [ ] Enable Row Level Security (RLS)
- [ ] Create RLS policies
- [ ] Create `clients` configuration table

**Application:**
- [ ] Identify client from subdomain/domain
- [ ] Set client context in middleware
- [ ] Filter all queries by `client_id`
- [ ] Load theme from `clients` table
- [ ] Generate CSS variables from theme

**Deployment:**
- [ ] Fork template per client
- [ ] Set CLIENT_ID environment variable
- [ ] Set theme colors/logo
- [ ] Deploy to Vercel
- [ ] Configure custom domain

**Verification:**
- [ ] Data isolation working (RLS prevents cross-client access)
- [ ] Theme applied correctly
- [ ] Features enabled per client config
- [ ] Custom domain resolves
- [ ] Site performant and functional

---

## 📖 Framework Documentation Index

### **Database:**
1. MULTI-TENANT-SCHEMA.md - Complete schema design
2. RLS-POLICIES.md - Security policies (to be created)
3. data-architecture.md - Entity relationships
4. MIGRATIONS.md - Migration scripts (to be created)

### **Theming:**
1. CONFIG-DRIVEN-THEMING.md - How theming works
2. COLOR-SYSTEM.md - Color configuration (to be created)
3. theme-tokens.md - Token schema
4. feature-flags-theming.md - Feature flags system

### **Deployment:**
1. FORK-AND-DEPLOY.md - Deployment process
2. ENVIRONMENT-VARS.md - Variable reference (to be created)
3. VERCEL-SETUP.md - Vercel configuration (to be created)
4. DOMAIN-CONFIGURATION.md - DNS setup (to be created)

### **Guides:**
1. NEW-CLIENT-SETUP.md - 10-minute setup guide
2. TROUBLESHOOTING.md - Common issues (to be created)
3. MIGRATION-GUIDE.md - Migrating existing clients (to be created)
4. SCALING-GUIDE.md - Scaling to 100+ clients (to be created)

### **Reference:**
1. architecture.md - Overall architecture
2. API-INTEGRATIONS.md - Third-party APIs (to be created)
3. BEST-PRACTICES.md - Production recommendations (to be created)

---

## 🎯 Future Frameworks

**Planned:**
- SaaS Multi-Tenant Framework (B2B SaaS products)
- E-Commerce Framework (Online stores)
- Marketplace Framework (Multi-vendor platforms)
- Booking Platform Framework (Hotels, appointments, etc.)

---

## ✅ Status

**Multi-Tenant Architecture:** ✅ Complete
- Database schema documented
- Theming system documented
- Fork & deploy process documented
- Quick start guide created
- Referenced from original docs

**Next:**
- Add more frameworks as needed
- Expand documentation based on real-world usage
- Create video tutorials
- Build automation scripts

---

**Start here:** [multi-tenant-architecture/README.md](./multi-tenant-architecture/README.md)
