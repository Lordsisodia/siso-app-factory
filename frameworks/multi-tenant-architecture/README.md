# Multi-Tenant Architecture Framework

**Purpose:** Build ONE codebase that serves multiple clients from ONE Supabase database with configuration-driven customization

**For:** Restaurants, Tours, Bike Rentals, and ANY client-facing business

---

## 🎯 The Concept

### **One Codebase + One Database = Infinite Clients**

```
Single Next.js App
    ↓
ONE Supabase Database (multi-tenant)
    ↓
Multiple Clients (each with their own config, branding, domain)

Client 1: restaurant-a.com (red theme, Italian menu)
Client 2: restaurant-b.com (blue theme, Japanese menu)
Client 3: restaurant-c.com (green theme, Mexican menu)

All using:
- Same codebase
- Same database
- Same features
- Different configs
```

---

## 🏗️ Architecture Overview

### **How It Works:**

1. **One Codebase** (siso-app-template)
   - Generic restaurant/tour/rental app
   - No hardcoded client data
   - Config-driven everything

2. **One Supabase Database** (multi-tenant)
   - All clients' data in one database
   - `client_id` column on every table
   - Row Level Security (RLS) for isolation
   - Subdomain/domain identifies client

3. **Per-Client Configuration**
   - `client_config` table with branding, theme, features
   - Environment variables for client-specific settings
   - Build-time config injection

4. **Fork & Deploy**
   - Clone template repo
   - Set environment variables (CLIENT_ID, colors, domain)
   - Deploy to Vercel
   - Done - new client site live in 10 minutes

---

## 📁 Framework Contents

This folder contains:

1. **database/** - Multi-tenant Supabase schema
   - Schema with client_id on all tables
   - RLS policies for data isolation
   - Client configuration table
   - Migration scripts

2. **theming/** - Configuration-driven theming
   - Theme token system
   - Color/font/spacing configuration
   - CSS variable generation
   - Brand customization guide

3. **deployment/** - Fork and deploy process
   - Environment variable templates
   - Vercel deployment config
   - Domain setup guide
   - Build scripts

4. **templates/** - Starter templates
   - Restaurant template
   - Tour guide template
   - Bike rental template
   - Generic business template

5. **guides/** - Step-by-step guides
   - New client setup (10-minute process)
   - Database migrations
   - Configuration management
   - Troubleshooting

---

## 🔑 Key Benefits

### **Centralized Management:**
- ✅ One codebase to maintain
- ✅ One database to manage
- ✅ One deployment pipeline
- ✅ Fix bugs once, all clients benefit
- ✅ Add features once, available to all

### **Cost Efficiency:**
- ✅ One Supabase database (not 10 separate databases)
- ✅ Shared infrastructure costs
- ✅ Economies of scale
- ✅ Free tier goes further

### **Fast Client Onboarding:**
- ✅ New client in 10 minutes
- ✅ Fork template
- ✅ Set config (colors, logo, domain)
- ✅ Deploy
- ✅ Live site

### **Consistent Quality:**
- ✅ Same proven codebase
- ✅ Same battle-tested features
- ✅ Same performance optimizations
- ✅ Guaranteed consistency

---

## 🚀 Quick Start

### **Add a New Client (10 Minutes):**

```bash
# 1. Clone template
git clone https://github.com/your-org/siso-restaurant-template.git client-new-restaurant
cd client-new-restaurant

# 2. Set environment variables
cp .env.example .env.local

# Edit .env.local:
CLIENT_ID=restaurant_xyz_123
CLIENT_DOMAIN=restaurant-xyz.com
THEME_PRIMARY_COLOR=#FF5733
THEME_SECONDARY_COLOR=#33FF57
LOGO_URL=https://cdn.com/logo.png

# 3. Deploy to Vercel
vercel --prod

# Done! Site live at restaurant-xyz.vercel.app
```

### **Database Automatically Handles:**
- Data isolation (RLS by CLIENT_ID)
- Configuration loading (from client_config table)
- Multi-tenant queries (automatic client_id filtering)

---

## 📖 Documentation Index

**Read these in order:**

1. **database/MULTI-TENANT-SCHEMA.md** - Database design with client_id
2. **database/RLS-POLICIES.md** - Row Level Security setup
3. **theming/CONFIG-DRIVEN-THEMING.md** - How theming works
4. **theming/COLOR-SYSTEM.md** - Color configuration guide
5. **deployment/FORK-AND-DEPLOY.md** - Deploy new client guide
6. **deployment/ENVIRONMENT-VARS.md** - All config variables
7. **templates/RESTAURANT-TEMPLATE.md** - Restaurant-specific setup
8. **guides/NEW-CLIENT-SETUP.md** - Step-by-step onboarding

---

## 🎯 Use Cases

### **Restaurant Chain:**
- Central kitchen, multiple locations
- Same menu across locations
- Different branding per location
- Centralized analytics

### **Tour Operator:**
- Multiple tour brands under one company
- Different tour catalogs per brand
- Shared booking system
- Unified customer database

### **Rental Company:**
- Bikes, cars, equipment
- Different rental catalogs per region
- Shared inventory management
- Centralized pricing engine

---

## ✅ What's Included

**Complete working system:**
- ✅ Multi-tenant database schema
- ✅ RLS policies for data isolation
- ✅ Configuration-driven theming
- ✅ Environment variable system
- ✅ Fork and deploy process
- ✅ Template repositories
- ✅ Migration scripts
- ✅ Setup guides

**Everything you need to:**
- Spin up new clients instantly
- Manage multiple clients from one codebase
- Customize branding per client
- Keep costs low with shared infrastructure

---

**Start with:** `guides/NEW-CLIENT-SETUP.md`
