# Supabase Integration Guide for SISO App Factory

**Version**: 2.0
**Last Updated**: 2025-10-20

---

## 🎯 Overview

This guide provides **standardized patterns** for integrating Supabase into SISO App Factory projects. Use these patterns to ensure consistency, security, and optimal performance across all projects.

## 📚 Table of Contents

1. [Project Setup](#project-setup)
2. [Multi-Tenant Architecture](#multi-tenant-architecture)
3. [Row Level Security (RLS) Patterns](#row-level-security-patterns)
4. [Edge Functions](#edge-functions)
5. [Storage Configuration](#storage-configuration)
6. [Migrations & Seeds](#migrations--seeds)
7. [Client Configuration](#client-configuration)
8. [Performance Optimization](#performance-optimization)
9. [Cost Management](#cost-management)
10. [Testing Strategies](#testing-strategies)

---

## 1. Project Setup

### Initial Supabase Project Creation

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to remote project
supabase link --project-ref <project-id>

# Pull remote schema (if exists)
supabase db pull
```

### Environment Variables

**`.env.local`**:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # Server-side only

# Database (for direct connections if needed)
DATABASE_URL=postgres://postgres:<password>@<host>:5432/postgres
```

### Next.js Client Setup

**`src/shared/lib/supabase/client.ts`**:
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`src/shared/lib/supabase/server.ts`**:
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle error (middleware edge runtime)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle error
          }
        },
      },
    }
  )
}
```

---

## 2. Multi-Tenant Architecture

### Approach: Single Database with `tenant_id` Column

**Recommended for SISO App Factory projects**

### Tenant Metadata Table

```sql
-- Create tenants table
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,  -- e.g., 'restaurant-a'
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE,         -- e.g., 'restaurant-a.example.com'
  settings JSONB DEFAULT '{}',
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast domain lookups
CREATE INDEX idx_tenants_domain ON tenants(domain);
CREATE INDEX idx_tenants_slug ON tenants(slug);
```

### Tenant Context Injection

**Middleware** (`src/middleware.ts`):
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Extract tenant from domain or path
  const hostname = request.headers.get('host') || ''
  const tenant = await resolveTenant(hostname)

  if (tenant) {
    // Inject tenant ID into headers for server components
    response.headers.set('x-tenant-id', tenant.id)
    response.headers.set('x-tenant-slug', tenant.slug)
  }

  return response
}

async function resolveTenant(hostname: string) {
  const supabase = createServerClient(...)
  const { data } = await supabase
    .from('tenants')
    .select('*')
    .eq('domain', hostname)
    .single()

  return data
}
```

### Tenant-Scoped Client

**`src/shared/lib/supabase/tenant-client.ts`**:
```typescript
import { createClient } from './server'
import { headers } from 'next/headers'

export async function createTenantClient() {
  const supabase = await createClient()
  const headersList = await headers()
  const tenantId = headersList.get('x-tenant-id')

  if (tenantId) {
    // Set tenant context for RLS
    await supabase.rpc('set_tenant_context', { tenant_id: tenantId })
  }

  return supabase
}
```

---

## 3. Row Level Security (RLS) Patterns

### Enable RLS on All Tables

```sql
-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
```

### Standard RLS Patterns

#### Pattern 1: Tenant Isolation (Most Common)

```sql
-- Public read access (tenant-scoped)
CREATE POLICY tenant_read_access ON menu_items
FOR SELECT
USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Admin full access (tenant-scoped)
CREATE POLICY tenant_admin_access ON menu_items
FOR ALL
USING (
  tenant_id = current_setting('app.tenant_id')::uuid
  AND auth.role() IN ('admin', 'manager')
);
```

#### Pattern 2: User Ownership

```sql
-- Users can only see their own data
CREATE POLICY user_own_data ON user_profiles
FOR ALL
USING (user_id = auth.uid());
```

#### Pattern 3: Role-Based Access

```sql
-- Managers can update items
CREATE POLICY manager_update ON menu_items
FOR UPDATE
USING (
  tenant_id = current_setting('app.tenant_id')::uuid
  AND (
    SELECT role FROM user_roles
    WHERE user_id = auth.uid()
    AND tenant_id = current_setting('app.tenant_id')::uuid
  ) IN ('manager', 'owner')
);
```

#### Pattern 4: Public + Private Data

```sql
-- Public can see active items
CREATE POLICY public_view ON menu_items
FOR SELECT
USING (
  tenant_id = current_setting('app.tenant_id')::uuid
  AND active = true
);

-- Admins see all items
CREATE POLICY admin_view ON menu_items
FOR SELECT
USING (
  tenant_id = current_setting('app.tenant_id')::uuid
  AND auth.role() IN ('admin', 'manager')
);
```

### Tenant Context Function

```sql
-- Create function to set tenant context
CREATE OR REPLACE FUNCTION set_tenant_context(tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.tenant_id', tenant_id::text, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 4. Edge Functions

### Standard Edge Function Template

**`supabase/functions/process-order/index.ts`**:
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get tenant context from headers
    const tenantId = req.headers.get('x-tenant-id')

    // Set tenant context
    await supabase.rpc('set_tenant_context', { tenant_id: tenantId })

    // Your logic here
    const { data } = await req.json()

    // Process order
    const result = await processOrder(supabase, data)

    return new Response(
      JSON.stringify(result),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-tenant-id',
}
```

### Deploy Edge Function

```bash
supabase functions deploy process-order --no-verify-jwt
```

---

## 5. Storage Configuration

### Bucket Setup

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true);

-- RLS for storage
CREATE POLICY tenant_upload ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'menu-images'
  AND (storage.foldername(name))[1] = current_setting('app.tenant_id')
);

CREATE POLICY public_download ON storage.objects
FOR SELECT
USING (bucket_id = 'menu-images');
```

### Upload Helper

```typescript
export async function uploadMenuImage(file: File, tenantId: string) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${tenantId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('menu-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('menu-images')
    .getPublicUrl(fileName)

  return publicUrl
}
```

---

## 6. Migrations & Seeds

### Migration Template

**`supabase/migrations/20250120000000_create_menu_items.sql`**:
```sql
-- Create menu_items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  active BOOLEAN DEFAULT true,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_menu_items_tenant ON menu_items(tenant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_active ON menu_items(active) WHERE active = true;

-- Enable RLS
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY tenant_isolation ON menu_items
FOR ALL
USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Updated at trigger
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON menu_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

### Seed Data Template

**`supabase/seed.sql`**:
```sql
-- Insert demo tenant
INSERT INTO tenants (id, slug, name, domain)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'demo-restaurant', 'Demo Restaurant', 'demo.localhost:3000');

-- Set tenant context
SELECT set_tenant_context('00000000-0000-0000-0000-000000000001');

-- Insert demo data
INSERT INTO menu_items (tenant_id, name, price)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Burger', 12.99),
  ('00000000-0000-0000-0000-000000000001', 'Pizza', 14.99);
```

---

## 7. Client Configuration

### React Query Integration

**`src/shared/providers/QueryProvider.tsx`**:
```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### Custom Hooks

**`src/shared/hooks/useMenuItems.ts`**:
```typescript
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/shared/lib/supabase/client'

export function useMenuItems(categoryId?: string) {
  return useQuery({
    queryKey: ['menu-items', categoryId],
    queryFn: async () => {
      const supabase = createClient()
      let query = supabase
        .from('menu_items')
        .select('*')
        .eq('active', true)

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    },
  })
}
```

---

## 8. Performance Optimization

### Connection Pooling

Use Supavisor (built-in connection pooler):

```bash
# Connection string format
postgres://postgres.xxxx:5432/postgres?pgbouncer=true
```

### Query Optimization

```typescript
// Bad: N+1 query
const items = await supabase.from('menu_items').select('*')
for (const item of items) {
  const category = await supabase
    .from('categories')
    .select('*')
    .eq('id', item.category_id)
    .single()
}

// Good: Single query with join
const { data } = await supabase
  .from('menu_items')
  .select(`
    *,
    category:categories(*)
  `)
```

### Caching Strategy

```typescript
// Cache menu data at edge
export const revalidate = 300 // 5 minutes

export async function getMenuItems() {
  const supabase = await createTenantClient()
  const { data } = await supabase.from('menu_items').select('*')
  return data
}
```

---

## 9. Cost Management

### Free Tier Limits (as of 2025)

- **Database**: 500MB
- **Storage**: 1GB
- **Bandwidth**: 5GB
- **Edge Functions**: 500K invocations
- **Auth MAU**: Unlimited

### Monitoring

```typescript
// Monitor database size
SELECT pg_database_size(current_database()) / 1024 / 1024 AS size_mb;

// Monitor storage usage
SELECT SUM(pg_total_relation_size(quote_ident(schemaname) || '.' || quote_ident(tablename))) / 1024 / 1024 AS size_mb
FROM pg_tables
WHERE schemaname = 'public';
```

---

## 10. Testing Strategies

### Local Development

```bash
# Start local Supabase
supabase start

# Run tests against local instance
npm test
```

### Test Utilities

**`src/__tests__/utils/supabase-test-client.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js'

export function createTestClient() {
  return createClient(
    'http://localhost:54321',
    'your-anon-key',
    {
      auth: {
        persistSession: false,
      },
    }
  )
}
```

---

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [RLS Patterns](https://supabase.com/docs/guides/auth/row-level-security)
- [Edge Functions](https://supabase.com/docs/guides/functions)
- [Storage](https://supabase.com/docs/guides/storage)

---

**Next**: See [Clerk Integration Guide](./CLERK-INTEGRATION-GUIDE.md) for auth setup.
