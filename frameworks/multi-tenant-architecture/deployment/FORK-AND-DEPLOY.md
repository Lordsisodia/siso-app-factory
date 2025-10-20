# Fork and Deploy - New Client Setup

**Purpose:** Deploy a new client site in 10 minutes from template

---

## 🎯 The Process

```
Template Repository (Generic)
    ↓ Fork
New Client Repository
    ↓ Configure (set colors, logo, CLIENT_ID)
Deploy to Vercel
    ↓
Live Client Site (custom domain)
    ↓ Connected to
Shared Supabase Database (with client_id isolation)
```

---

## ⚡ 10-Minute Setup

### **Step 1: Fork Template (1 minute)**

```bash
# Option A: GitHub UI
# Go to https://github.com/your-org/siso-restaurant-template
# Click "Fork"
# Name it: client-restaurant-xyz

# Option B: CLI
gh repo fork your-org/siso-restaurant-template --clone=true --fork-name=client-restaurant-xyz
cd client-restaurant-xyz
```

### **Step 2: Configure Environment (3 minutes)**

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with client-specific values
```

**Environment Variables:**

```env
# ============================================
# CLIENT CONFIGURATION
# ============================================

# Unique client identifier (UUID from database)
CLIENT_ID=550e8400-e29b-41d4-a716-446655440000

# Client slug (for subdomain/lookups)
CLIENT_SLUG=restaurant-xyz

# Client domain (custom domain)
CLIENT_DOMAIN=restaurant-xyz.com

# ============================================
# BRANDING
# ============================================

# Theme Colors (hex codes)
THEME_PRIMARY_COLOR=#FF5733
THEME_SECONDARY_COLOR=#33FF57
THEME_ACCENT_COLOR=#FFC107
THEME_BACKGROUND_COLOR=#FFFFFF
THEME_TEXT_COLOR=#1F2933

# Fonts
THEME_FONT_HEADING="Playfair Display, serif"
THEME_FONT_BODY="Inter, sans-serif"

# Logo & Favicon
LOGO_URL=https://cdn.com/restaurant-xyz-logo.png
FAVICON_URL=https://cdn.com/restaurant-xyz-favicon.ico

# ============================================
# SHARED SUPABASE (Multi-Tenant)
# ============================================

# Same for ALL clients
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# ============================================
# INTEGRATIONS (Optional per client)
# ============================================

# Stripe (if client uses payments)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Cloudinary (if client uses media)
CLOUDINARY_CLOUD_NAME=restaurant-xyz
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Email (if client uses email)
RESEND_API_KEY=re_...

# SMS (if client uses SMS)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# ============================================
# FEATURE FLAGS
# ============================================

ENABLE_RESERVATIONS=true
ENABLE_LOYALTY=true
ENABLE_BLOG=false
ENABLE_REVIEWS=true
ENABLE_EVENTS=false
```

### **Step 3: Create Client in Database (2 minutes)**

```sql
-- Insert new client record
INSERT INTO clients (
  id,
  slug,
  domain,
  name,
  logo_url,
  theme_tokens,
  enabled_features,
  status
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'restaurant-xyz',
  'restaurant-xyz.com',
  'Restaurant XYZ',
  'https://cdn.com/restaurant-xyz-logo.png',
  '{
    "colors": {
      "primary": "#FF5733",
      "secondary": "#33FF57",
      "accent": "#FFC107"
    },
    "typography": {
      "fonts": {
        "heading": "Playfair Display, serif",
        "body": "Inter, sans-serif"
      }
    }
  }'::jsonb,
  '{
    "reservations": true,
    "loyalty": true,
    "blog": false,
    "reviews": true
  }'::jsonb,
  'active'
);
```

Or use the helper script:

```bash
npm run create-client -- \
  --slug="restaurant-xyz" \
  --name="Restaurant XYZ" \
  --domain="restaurant-xyz.com" \
  --theme="luxury" \
  --primary-color="#FF5733"
```

### **Step 4: Deploy to Vercel (2 minutes)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Output: https://client-restaurant-xyz.vercel.app
```

### **Step 5: Configure Custom Domain (2 minutes)**

```bash
# Add custom domain in Vercel dashboard
# Or via CLI:
vercel domains add restaurant-xyz.com

# Add DNS records (provided by Vercel):
# A record: @ → 76.76.21.21
# CNAME: www → cname.vercel-dns.com

# Wait for DNS propagation (1-5 minutes)
# Site live at restaurant-xyz.com
```

---

## 🔄 Update Process

### **Update Client Theme:**

```bash
# Option 1: Update database directly
UPDATE clients
SET theme_tokens = jsonb_set(
  theme_tokens,
  '{colors,primary}',
  '"#NEW_COLOR"'
)
WHERE slug = 'restaurant-xyz';

# Option 2: Use admin panel
# Go to admin.yourapp.com
# Select client
# Update theme
# Save

# Option 3: Update via API
curl -X PATCH https://api.yourapp.com/clients/restaurant-xyz \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "theme_tokens": {
      "colors": {
        "primary": "#NEW_COLOR"
      }
    }
  }'

# Changes apply immediately (no redeploy needed!)
```

### **Update Client Features:**

```bash
# Enable/disable features
UPDATE clients
SET enabled_features = jsonb_set(
  enabled_features,
  '{loyalty}',
  'true'
)
WHERE slug = 'restaurant-xyz';

# Client now has loyalty program enabled
```

---

## 🎨 Visual Customization Options

### **What Can Be Customized:**

**Colors:**
- Primary, secondary, accent
- Background, surface
- Text colors (primary, secondary, muted)
- Border colors
- State colors (success, warning, error)

**Typography:**
- Font families (heading, body, mono)
- Font sizes (all scales)
- Font weights
- Line heights
- Letter spacing

**Spacing:**
- Component padding/margins
- Section gaps
- Layout spacing
- Grid gaps

**Borders:**
- Border radius (sharp to fully rounded)
- Border widths
- Border colors

**Shadows:**
- Card shadows
- Hover shadows
- Focus shadows

**Layout:**
- Max content width
- Navigation height
- Sidebar width
- Breakpoints

**Animations:**
- Transition durations
- Easing functions
- Hover effects

---

## 🏭 Production Workflow

### **Onboard New Client:**

**Day 1:**
1. ✅ Client signs contract
2. ✅ Create client record in database (INSERT INTO clients...)
3. ✅ Fork template repository
4. ✅ Configure .env with CLIENT_ID, colors, logo
5. ✅ Deploy to Vercel
6. ✅ Configure custom domain
7. ✅ Client site live

**Day 2-7:**
8. ✅ Client provides menu data
9. ✅ Import menu to database (with their client_id)
10. ✅ Client reviews site
11. ✅ Adjust theme/colors as needed (via database updates)
12. ✅ Client approves

**Day 8:**
13. ✅ Go live on custom domain
14. ✅ Client launches

**Total:** 1 week from contract to launch

---

## 📊 Scaling

### **10 Clients:**
- 10 forked repositories
- 10 Vercel deployments
- 1 Supabase database
- 1 codebase to maintain

**100 Clients:**
- 100 forked repositories
- 100 Vercel deployments
- 1 Supabase database (or 2-3 if needed)
- 1 codebase to maintain

**Benefits:**
- Bug fix in template → Deploy to all clients
- New feature → Available to all clients
- Centralized monitoring
- Economies of scale

---

## ⚡ Advanced: Monorepo Approach

For better management with many clients:

```
siso-clients/ (monorepo)
├── packages/
│   ├── shared-template/        # The base template
│   └── shared-components/      # Shared components
│
├── apps/
│   ├── client-restaurant-a/    # Client A deployment
│   ├── client-restaurant-b/    # Client B deployment
│   ├── client-restaurant-c/    # Client C deployment
│   └── [100 more clients]
│
└── turbo.json                  # Build all clients

# Deploy all:
turbo run build
turbo run deploy

# Update all clients at once
```

---

## ✅ Checklist for New Client

- [ ] Create client record in database
- [ ] Generate CLIENT_ID (UUID)
- [ ] Fork template repository
- [ ] Configure .env.local with client settings
- [ ] Set colors, fonts, logo
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Import client data (menu, etc.)
- [ ] Test site functionality
- [ ] Get client approval
- [ ] Go live

**Time:** 10 minutes setup + 1 week data/approval

---

**Next:** Read `ENVIRONMENT-VARS.md` for complete variable reference
