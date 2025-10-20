# New Client Setup Guide

**Goal:** Launch a new client site in 10 minutes

---

## 🚀 Quick Start

### **Prerequisites:**
- Supabase database already set up with multi-tenant schema
- Template repository exists
- Vercel account ready

---

## 📋 Step-by-Step

### **1. Create Client in Database (2 min)**

```bash
# Use the helper script
npm run create-client

# Interactive prompts:
# Client name? Restaurant ABC
# Client slug? restaurant-abc
# Custom domain? restaurant-abc.com
# Primary color? #FF5733
# Theme preset? luxury | modern | casual

# Or manual SQL:
INSERT INTO clients (slug, name, domain, theme_tokens, enabled_features)
VALUES (
  'restaurant-abc',
  'Restaurant ABC',
  'restaurant-abc.com',
  '{"colors":{"primary":"#FF5733"}}'::jsonb,
  '{"reservations":true,"reviews":true}'::jsonb
);

# Copy the generated CLIENT_ID (UUID)
```

### **2. Fork Template (1 min)**

```bash
# Fork from GitHub
gh repo fork your-org/siso-restaurant-template \
  --clone=true \
  --fork-name=client-restaurant-abc

cd client-restaurant-abc
```

### **3. Configure Environment (2 min)**

```bash
# Create .env.local
cat > .env.local << EOF
CLIENT_ID=<paste-client-id-from-step-1>
CLIENT_SLUG=restaurant-abc
CLIENT_DOMAIN=restaurant-abc.com

THEME_PRIMARY_COLOR=#FF5733
LOGO_URL=https://cdn.com/logo.png

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EOF

# Test locally
npm install
npm run dev

# Open http://localhost:3000
# Should see site with new branding
```

### **4. Deploy to Vercel (3 min)**

```bash
# Deploy
vercel --prod

# Set environment variables in Vercel:
vercel env add CLIENT_ID
# Paste CLIENT_ID

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste Supabase URL

# ... (or use Vercel dashboard to set all vars)

# Redeploy with env vars
vercel --prod

# Site live at: https://client-restaurant-abc.vercel.app
```

### **5. Configure Custom Domain (2 min)**

```bash
# Add domain in Vercel
vercel domains add restaurant-abc.com

# Vercel provides DNS records:
# A record: @ → 76.76.21.21
# CNAME: www → cname.vercel-dns.com

# Add these to your DNS provider
# Wait 1-5 minutes for propagation

# Site live at: https://restaurant-abc.com ✅
```

---

## ✅ Verification

### **Test the site:**

```bash
# 1. Visit site
open https://restaurant-abc.com

# 2. Check branding
# - Logo should match your logo
# - Colors should match your theme
# - Name should be "Restaurant ABC"

# 3. Test database isolation
# - Menu items should be empty (no other client's data visible)
# - Add a test menu item
# - Verify it doesn't appear on other client sites

# 4. Test features
# - Reservations (if enabled)
# - Reviews (if enabled)
# - Blog (if enabled)

# All working? ✅ Client is live!
```

---

## 🎨 Customize After Launch

### **Update Theme:**

```bash
# Via database:
UPDATE clients
SET theme_tokens = jsonb_set(
  theme_tokens,
  '{colors,primary}',
  '"#NEW_COLOR"'
)
WHERE slug = 'restaurant-abc';

# Changes apply immediately!
# No redeploy needed
```

### **Add Menu Items:**

```bash
# Via admin panel:
# Go to admin.yourapp.com
# Login with admin account
# Select client: Restaurant ABC
# Add menu items

# Or via script:
npm run import-menu -- \
  --client=restaurant-abc \
  --file=menu-data.json
```

### **Enable Features:**

```bash
# Enable loyalty program:
UPDATE clients
SET enabled_features = jsonb_set(
  enabled_features,
  '{loyalty}',
  'true'
)
WHERE slug = 'restaurant-abc';

# Loyalty now available for this client!
```

---

## 🔧 Troubleshooting

### **Issue: Site shows wrong client data**

**Solution:**
```bash
# Check CLIENT_ID in .env
echo $CLIENT_ID

# Verify it matches database:
SELECT id, slug, name FROM clients WHERE slug = 'restaurant-abc';

# Make sure they match!
```

### **Issue: Theme colors not applied**

**Solution:**
```bash
# Check theme_tokens in database:
SELECT theme_tokens FROM clients WHERE slug = 'restaurant-abc';

# Verify colors are valid hex codes
# Clear cache:
# - Browser: Ctrl+Shift+R
# - Vercel: Redeploy
```

### **Issue: Features not working**

**Solution:**
```bash
# Check enabled_features:
SELECT enabled_features FROM clients WHERE slug = 'restaurant-abc';

# Enable missing features:
UPDATE clients
SET enabled_features = enabled_features || '{"reviews": true}'::jsonb
WHERE slug = 'restaurant-abc';
```

---

## 📊 Client Management

### **List All Clients:**

```sql
SELECT
  slug,
  name,
  domain,
  status,
  plan,
  created_at
FROM clients
ORDER BY created_at DESC;
```

### **Disable Client:**

```sql
UPDATE clients
SET status = 'suspended'
WHERE slug = 'restaurant-abc';

-- Site will show "Account suspended" message
```

### **Delete Client:**

```sql
-- This deletes ALL client data (CASCADE)
DELETE FROM clients WHERE slug = 'restaurant-abc';

-- All menu_items, reservations, reviews with this client_id are deleted
```

---

## ⚡ Bulk Operations

### **Deploy 10 Clients at Once:**

```bash
# Create clients in database (batch insert)
INSERT INTO clients (slug, name, domain, theme_tokens) VALUES
  ('restaurant-1', 'Restaurant 1', 'r1.com', '...'::jsonb),
  ('restaurant-2', 'Restaurant 2', 'r2.com', '...'::jsonb),
  ('restaurant-3', 'Restaurant 3', 'r3.com', '...'::jsonb),
  -- ... 10 total
;

# Fork template 10 times
for i in {1..10}; do
  gh repo fork template --fork-name=client-restaurant-$i
done

# Configure and deploy script
./scripts/deploy-bulk.sh client-list.csv

# All 10 sites live in 30 minutes
```

---

## 🎯 Best Practices

### **Environment Variables:**
- ✅ Use .env.local for local development
- ✅ Set in Vercel dashboard for production
- ✅ Never commit .env files
- ✅ Use .env.example as template

### **Client IDs:**
- ✅ Generate UUID for each client
- ✅ Store in database first
- ✅ Then use in environment variables
- ✅ Never reuse client IDs

### **Theming:**
- ✅ Start with preset (luxury, modern, casual)
- ✅ Customize from there
- ✅ Test on multiple devices
- ✅ Ensure accessibility (contrast ratios)

### **Data:**
- ✅ Import menu/content AFTER client created
- ✅ Always include client_id in imports
- ✅ Verify data isolation (test with multiple clients)
- ✅ Back up before bulk imports

---

## ✅ Success Checklist

Client setup is complete when:

- [ ] Client record in database
- [ ] Repository forked and configured
- [ ] Environment variables set
- [ ] Deployed to Vercel
- [ ] Custom domain configured
- [ ] Site loads with correct branding
- [ ] Data isolated (can't see other clients' data)
- [ ] Features working as configured
- [ ] Client approved and launched

---

## 🎊 Result

**In 10 minutes:**
- ✅ New client site live
- ✅ Custom domain configured
- ✅ Branded with their colors/logo
- ✅ Connected to shared database
- ✅ Data completely isolated
- ✅ All features configured
- ✅ Ready for production

**From template to production in 10 minutes!**

---

**Next Steps:**
1. Import client's menu/content data
2. Train client on admin panel
3. Go live and start taking bookings!
