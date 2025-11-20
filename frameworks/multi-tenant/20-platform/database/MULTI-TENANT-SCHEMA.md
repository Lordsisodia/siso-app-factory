# Multi-Tenant Database Schema

**Purpose:** One Supabase database serving multiple clients with complete data isolation

---

## 🎯 Core Principle

**Every table has a `client_id` column** that identifies which client the data belongs to.

All queries automatically filter by `client_id` using:
1. Row Level Security (RLS) policies
2. Application-level filtering
3. Database views with client context

---

## 📊 Schema Design

### **Client Configuration Table:**

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,  -- restaurant-xyz, tour-abc
  domain TEXT UNIQUE,          -- restaurant-xyz.com
  name TEXT NOT NULL,          -- "Restaurant XYZ"

  -- Branding
  logo_url TEXT,
  favicon_url TEXT,

  -- Theme (JSON)
  theme_tokens JSONB DEFAULT '{}'::jsonb,
  /*
  {
    "colors": {
      "primary": "#FF5733",
      "secondary": "#33FF57",
      "accent": "#FFC107"
    },
    "fonts": {
      "heading": "Playfair Display",
      "body": "Inter"
    },
    "spacing": {
      "section": "4rem"
    }
  }
  */

  -- Features (JSON)
  enabled_features JSONB DEFAULT '{}'::jsonb,
  /*
  {
    "reservations": true,
    "loyalty": true,
    "blog": false,
    "reviews": true,
    "events": false
  }
  */

  -- Settings
  timezone TEXT DEFAULT 'UTC',
  currency TEXT DEFAULT 'USD',
  language TEXT DEFAULT 'en',

  -- Status
  status TEXT DEFAULT 'active', -- active, suspended, trial
  plan TEXT DEFAULT 'free',      -- free, pro, enterprise

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_slug ON clients(slug);
CREATE INDEX idx_clients_domain ON clients(domain);
CREATE INDEX idx_clients_status ON clients(status);
```

### **Example Data Table (Menu Items):**

```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Data fields
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Multi-tenant index (CRITICAL for performance)
  CONSTRAINT menu_items_client_fkey FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- CRITICAL: Index on client_id for fast filtering
CREATE INDEX idx_menu_items_client ON menu_items(client_id);
CREATE INDEX idx_menu_items_client_category ON menu_items(client_id, category);
CREATE INDEX idx_menu_items_client_available ON menu_items(client_id, available);
```

### **All Tables Follow This Pattern:**

```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  -- ... reservation fields
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  -- ... review fields
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  -- ... blog fields
);

-- Every table needs client_id!
```

---

## 🔒 Row Level Security (RLS)

### **Enable RLS on All Tables:**

```sql
-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their client's data
CREATE POLICY "Users see own client data"
ON menu_items
FOR SELECT
USING (
  client_id = current_setting('app.current_client_id')::UUID
);

-- Policy: Users can only insert for their client
CREATE POLICY "Users insert own client data"
ON menu_items
FOR INSERT
WITH CHECK (
  client_id = current_setting('app.current_client_id')::UUID
);

-- Policy: Users can only update their client's data
CREATE POLICY "Users update own client data"
ON menu_items
FOR UPDATE
USING (
  client_id = current_setting('app.current_client_id')::UUID
);

-- Policy: Users can only delete their client's data
CREATE POLICY "Users delete own client data"
ON menu_items
FOR DELETE
USING (
  client_id = current_setting('app.current_client_id')::UUID
);
```

### **Set Client Context in App:**

```typescript
// Set client_id for the session
export async function setClientContext(clientId: string) {
  await supabase.rpc('set_config', {
    parameter: 'app.current_client_id',
    value: clientId
  })
}

// Or use Supabase function:
CREATE OR REPLACE FUNCTION set_client_context(client_uuid UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_client_id', client_uuid::TEXT, false);
END;
$$ LANGUAGE plpgsql;
```

---

## 🔍 Client Identification

### **How We Know Which Client:**

**Option 1: Subdomain** (Recommended)
```
restaurant-a.yourapp.com → client_id = 'abc123'
restaurant-b.yourapp.com → client_id = 'def456'
```

**Option 2: Custom Domain**
```
restaurant-a.com → client_id = 'abc123'
restaurant-b.com → client_id = 'def456'
```

**Option 3: URL Parameter** (Development only)
```
yourapp.com?client=restaurant-a → client_id = 'abc123'
```

### **Middleware Implementation:**

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Extract client from subdomain
  const subdomain = hostname.split('.')[0]

  // Look up client in database
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', subdomain)
    .single()

  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  // Set client_id in header for app to use
  const response = NextResponse.next()
  response.headers.set('x-client-id', client.id)
  response.headers.set('x-client-slug', client.slug)

  return response
}
```

---

## 📊 Database Structure

### **All Tables Include:**

```sql
-- REQUIRED on every table
client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE

-- REQUIRED index for performance
CREATE INDEX idx_{table}_client ON {table}(client_id);

-- REQUIRED for common filters
CREATE INDEX idx_{table}_client_{field} ON {table}(client_id, {commonly_filtered_field});
```

### **Example Tables:**

```sql
-- Menu
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  name TEXT NOT NULL,
  sort_order INTEGER
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  category_id UUID REFERENCES menu_categories(id),
  name TEXT NOT NULL,
  price DECIMAL(10,2),
  -- ... more fields
);

-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  customer_name TEXT,
  party_size INTEGER,
  reservation_time TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  -- ... more fields
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  customer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  -- ... more fields
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  -- ... more fields
);

-- Loyalty
CREATE TABLE loyalty_customers (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id),
  email TEXT,
  points INTEGER DEFAULT 0,
  -- ... more fields
);
```

---

## 🔐 Security & Isolation

### **Data Isolation Methods:**

**1. Row Level Security (RLS) - Primary**
```sql
-- Automatic filtering at database level
-- Users can ONLY see their client's data
-- Cannot bypass even with direct SQL
```

**2. Application-Level Filtering - Backup**
```typescript
// Every query includes client_id
const items = await supabase
  .from('menu_items')
  .select('*')
  .eq('client_id', clientId)  // ALWAYS include this
```

**3. Database Views - Convenience**
```sql
-- Create view that auto-filters by current client
CREATE VIEW my_menu_items AS
SELECT *
FROM menu_items
WHERE client_id = current_setting('app.current_client_id')::UUID;

-- Query the view (no need to filter)
SELECT * FROM my_menu_items;
```

### **Access Control:**

```sql
-- Admins table (users who can manage clients)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin', -- super_admin, admin, viewer
  allowed_clients UUID[] DEFAULT '{}', -- Array of client IDs they can access
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to check admin access
CREATE OR REPLACE FUNCTION can_access_client(check_client_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_email TEXT;
  user_role TEXT;
  allowed UUID[];
BEGIN
  -- Get current user from JWT
  user_email := current_setting('request.jwt.claims', true)::JSON->>'email';

  -- Check if user is admin
  SELECT role, allowed_clients INTO user_role, allowed
  FROM admin_users
  WHERE email = user_email;

  -- Super admins can access everything
  IF user_role = 'super_admin' THEN
    RETURN TRUE;
  END IF;

  -- Regular admins check allowed_clients array
  RETURN check_client_id = ANY(allowed);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🎨 Theme Configuration

### **Stored in Database:**

```sql
-- Client theme configuration
UPDATE clients
SET theme_tokens = '{
  "colors": {
    "primary": "#2E7D32",
    "secondary": "#FF7043",
    "accent": "#FFC107"
  },
  "fonts": {
    "heading": "Playfair Display",
    "body": "Inter"
  },
  "spacing": {
    "section": "4rem"
  },
  "radius": {
    "card": "12px",
    "button": "8px"
  }
}'::jsonb
WHERE slug = 'restaurant-xyz';
```

### **Applied in App:**

```typescript
// Load client config
const client = await supabase
  .from('clients')
  .select('theme_tokens')
  .eq('id', clientId)
  .single()

// Generate CSS variables
const cssVars = `
  :root {
    --color-primary: ${client.theme_tokens.colors.primary};
    --color-secondary: ${client.theme_tokens.colors.secondary};
    --font-heading: ${client.theme_tokens.fonts.heading};
    --spacing-section: ${client.theme_tokens.spacing.section};
  }
`

// Inject into page
return (
  <html>
    <head>
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />
    </head>
    {/* Components use CSS variables */}
  </html>
)
```

---

## 🚀 Performance Considerations

### **Indexing Strategy:**

```sql
-- ALWAYS index client_id
CREATE INDEX idx_{table}_client ON {table}(client_id);

-- Composite indexes for common queries
CREATE INDEX idx_menu_items_client_active ON menu_items(client_id, available);
CREATE INDEX idx_reservations_client_date ON reservations(client_id, reservation_time);
CREATE INDEX idx_reviews_client_rating ON reviews(client_id, rating);
```

### **Query Optimization:**

```sql
-- BAD (full table scan)
SELECT * FROM menu_items WHERE available = true;

-- GOOD (uses client index first)
SELECT * FROM menu_items
WHERE client_id = 'abc123'
AND available = true;
```

### **Caching:**

```typescript
// Cache client config (rarely changes)
const clientConfig = await redis.get(`client:${clientId}:config`)
if (!clientConfig) {
  const config = await supabase.from('clients').select('*').eq('id', clientId).single()
  await redis.set(`client:${clientId}:config`, config, { ex: 3600 }) // 1 hour
}
```

---

## 📈 Scaling Considerations

### **When to Stay Multi-Tenant:**
- ✅ <100 clients
- ✅ <10M rows total
- ✅ Similar data volumes per client
- ✅ Shared infrastructure OK

### **When to Consider Separate Databases:**
- ❌ >100 clients
- ❌ >50M rows total
- ❌ One client has 10x more data than others
- ❌ Need true physical isolation

### **Migration Path:**

If you outgrow multi-tenant:
1. Export client data: `pg_dump --table="*" --where="client_id='abc123'"`
2. Create new database for that client
3. Import data to new database
4. Update client config to point to new database
5. Redirect traffic

---

## ✅ Checklist for New Tables

When creating a new table:

- [ ] Add `client_id UUID NOT NULL REFERENCES clients(id)` column
- [ ] Add `CREATE INDEX idx_{table}_client ON {table}(client_id)`
- [ ] Add composite indexes for common filters
- [ ] Enable RLS: `ALTER TABLE {table} ENABLE ROW LEVEL SECURITY`
- [ ] Create RLS policies (SELECT, INSERT, UPDATE, DELETE)
- [ ] Add `ON DELETE CASCADE` to client_id foreign key
- [ ] Test with multiple client_ids
- [ ] Verify data isolation works

---

**Next:** Read `RLS-POLICIES.md` for complete security setup
