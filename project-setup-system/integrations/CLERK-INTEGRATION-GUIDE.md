# Clerk Integration Guide for SISO App Factory

**Version**: 2.0
**Last Updated**: 2025-10-20

---

## 🎯 Overview

This guide provides **standardized patterns** for integrating Clerk authentication into SISO App Factory projects with Supabase backend. Covers JWT sync, RBAC, multi-tenancy, and webhooks.

## 📚 Table of Contents

1. [Project Setup](#project-setup)
2. [Clerk + Supabase JWT Sync](#clerk--supabase-jwt-sync)
3. [Role-Based Access Control (RBAC)](#role-based-access-control)
4. [Multi-Tenant User Management](#multi-tenant-user-management)
5. [Webhook Configuration](#webhook-configuration)
6. [User Metadata Schema](#user-metadata-schema)
7. [Middleware & Route Protection](#middleware--route-protection)
8. [Client Components](#client-components)
9. [Server Actions](#server-actions)
10. [Testing Strategies](#testing-strategies)

---

## 1. Project Setup

### Install Clerk SDK

```bash
npm install @clerk/nextjs
```

### Environment Variables

**`.env.local`**:
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Clerk URLs (Next.js App Router)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Webhook
CLERK_WEBHOOK_SECRET=whsec_xxx
```

### Root Layout Setup

**`src/app/layout.tsx`**:
```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

---

## 2. Clerk + Supabase JWT Sync

### Configure Clerk JWT Template

**Clerk Dashboard** → JWT Templates → New Template (Supabase):

```json
{
  "aud": "authenticated",
  "exp": {{user.exp}},
  "iat": {{user.iat}},
  "iss": "{{clerk.instance_url}}",
  "sub": "{{user.id}}",
  "email": "{{user.primary_email_address}}",
  "role": "{{user.public_metadata.role}}",
  "tenant_id": "{{user.public_metadata.tenant_id}}",
  "app_metadata": {
    "provider": "clerk"
  },
  "user_metadata": {
    "tenant_id": "{{user.public_metadata.tenant_id}}",
    "role": "{{user.public_metadata.role}}"
  }
}
```

### Supabase Client with Clerk JWT

**`src/shared/lib/supabase/client-with-auth.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/nextjs'

export function useSupabaseClient() {
  const { getToken } = useAuth()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({ template: 'supabase' })

          const headers = new Headers(options?.headers)
          headers.set('Authorization', `Bearer ${clerkToken}`)

          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    }
  )

  return supabase
}
```

### Server-Side JWT Verification

**`src/shared/lib/supabase/server-with-auth.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export async function createAuthenticatedClient() {
  const { getToken } = await auth()
  const token = await getToken({ template: 'supabase' })

  if (!token) {
    throw new Error('No authentication token')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  )
}
```

---

## 3. Role-Based Access Control (RBAC)

### Role Definitions

```typescript
// src/shared/types/roles.ts
export enum Role {
  OWNER = 'owner',
  MANAGER = 'manager',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export const ROLE_PERMISSIONS = {
  [Role.OWNER]: ['*'], // Full access
  [Role.MANAGER]: [
    'menu.create',
    'menu.update',
    'menu.delete',
    'menu.read',
    'orders.read',
    'orders.update',
    'users.read',
  ],
  [Role.STAFF]: [
    'menu.read',
    'orders.read',
    'orders.update',
  ],
  [Role.CUSTOMER]: [
    'menu.read',
    'orders.create',
    'orders.read_own',
  ],
} as const
```

### Role Assignment Helper

```typescript
// src/shared/lib/clerk/assign-role.ts
import { clerkClient } from '@clerk/nextjs/server'

export async function assignRole(
  userId: string,
  role: Role,
  tenantId: string
) {
  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
      tenant_id: tenantId,
    },
  })
}
```

### Permission Check Hook

```typescript
// src/shared/hooks/usePermission.ts
'use client'

import { useUser } from '@clerk/nextjs'
import { ROLE_PERMISSIONS, type Role } from '@/shared/types/roles'

export function usePermission(permission: string) {
  const { user } = useUser()

  if (!user) return false

  const role = user.publicMetadata.role as Role
  const permissions = ROLE_PERMISSIONS[role] || []

  return permissions.includes('*') || permissions.includes(permission)
}

// Usage
function MenuItemActions() {
  const canEdit = usePermission('menu.update')

  if (!canEdit) return null

  return <button>Edit Item</button>
}
```

---

## 4. Multi-Tenant User Management

### Organization-Based Multi-Tenancy

**Enable Organizations in Clerk Dashboard**

### Sync Organization to Tenant

**Webhook Handler** (see section 5 for full webhook setup):

```typescript
export async function handleOrganizationCreated(evt: WebhookEvent) {
  if (evt.type === 'organization.created') {
    const { id, name, slug } = evt.data

    // Create tenant in Supabase
    const supabase = createClient(...)
    await supabase.from('tenants').insert({
      clerk_org_id: id,
      slug: slug,
      name: name,
    })
  }
}
```

### Get User's Current Tenant

```typescript
// src/shared/lib/clerk/get-current-tenant.ts
import { auth } from '@clerk/nextjs/server'

export async function getCurrentTenant() {
  const { orgId, orgSlug } = await auth()

  if (!orgId) {
    throw new Error('No organization context')
  }

  // Fetch tenant from Supabase
  const supabase = createAuthenticatedClient()
  const { data } = await supabase
    .from('tenants')
    .select('*')
    .eq('clerk_org_id', orgId)
    .single()

  return data
}
```

### Organization Switcher Component

```typescript
// src/shared/components/OrganizationSwitcher.tsx
'use client'

import { OrganizationSwitcher as ClerkOrgSwitcher } from '@clerk/nextjs'

export function OrganizationSwitcher() {
  return (
    <ClerkOrgSwitcher
      hidePersonal
      afterSelectOrganizationUrl="/dashboard"
      appearance={{
        elements: {
          rootBox: 'flex items-center',
        },
      }}
    />
  )
}
```

---

## 5. Webhook Configuration

### Setup Webhook Endpoint

**`src/app/api/webhooks/clerk/route.ts`**:
```typescript
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing headers', { status: 400 })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Verification failed', { status: 400 })
  }

  // Handle events
  const supabase = await createClient()

  switch (evt.type) {
    case 'user.created':
      await handleUserCreated(evt, supabase)
      break
    case 'user.updated':
      await handleUserUpdated(evt, supabase)
      break
    case 'user.deleted':
      await handleUserDeleted(evt, supabase)
      break
    case 'organization.created':
      await handleOrganizationCreated(evt, supabase)
      break
    case 'organizationMembership.created':
      await handleMembershipCreated(evt, supabase)
      break
  }

  return new Response('Success', { status: 200 })
}

async function handleUserCreated(evt: WebhookEvent, supabase: any) {
  const { id, email_addresses, first_name, last_name, public_metadata } = evt.data

  await supabase.from('users').insert({
    clerk_user_id: id,
    email: email_addresses[0]?.email_address,
    first_name,
    last_name,
    role: public_metadata.role || 'customer',
    tenant_id: public_metadata.tenant_id,
  })
}

async function handleUserUpdated(evt: WebhookEvent, supabase: any) {
  const { id, email_addresses, first_name, last_name, public_metadata } = evt.data

  await supabase
    .from('users')
    .update({
      email: email_addresses[0]?.email_address,
      first_name,
      last_name,
      role: public_metadata.role,
      tenant_id: public_metadata.tenant_id,
    })
    .eq('clerk_user_id', id)
}

async function handleUserDeleted(evt: WebhookEvent, supabase: any) {
  const { id } = evt.data

  await supabase
    .from('users')
    .delete()
    .eq('clerk_user_id', id)
}

async function handleOrganizationCreated(evt: WebhookEvent, supabase: any) {
  const { id, name, slug } = evt.data

  await supabase.from('tenants').insert({
    clerk_org_id: id,
    slug,
    name,
  })
}

async function handleMembershipCreated(evt: WebhookEvent, supabase: any) {
  const { organization, public_user_data } = evt.data

  // Update user's tenant_id
  await supabase
    .from('users')
    .update({ tenant_id: organization.id })
    .eq('clerk_user_id', public_user_data.user_id)
}
```

### Configure Webhook in Clerk Dashboard

1. Go to **Webhooks** in Clerk Dashboard
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
   - `organization.created`
   - `organizationMembership.created`

---

## 6. User Metadata Schema

### Public Metadata (Visible to client)

```typescript
interface PublicMetadata {
  role: 'owner' | 'manager' | 'staff' | 'customer'
  tenant_id?: string
  tenant_slug?: string
  onboarding_completed?: boolean
}
```

### Private Metadata (Server-only)

```typescript
interface PrivateMetadata {
  subscription_tier?: 'free' | 'pro' | 'enterprise'
  stripe_customer_id?: string
  feature_flags?: string[]
}
```

### Update Metadata

```typescript
import { clerkClient } from '@clerk/nextjs/server'

export async function updateUserMetadata(
  userId: string,
  metadata: Partial<PublicMetadata>
) {
  const client = await clerkClient()

  await client.users.updateUserMetadata(userId, {
    publicMetadata: metadata,
  })
}
```

---

## 7. Middleware & Route Protection

### Middleware Setup

**`src/middleware.ts`**:
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/menu',
  '/about',
  '/contact',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Protect non-public routes
  if (!isPublicRoute(req) && !userId) {
    return auth().redirectToSignIn()
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    const role = sessionClaims?.metadata?.role

    if (role !== 'owner' && role !== 'manager') {
      return Response.redirect(new URL('/dashboard', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

### Server-Side Route Protection

```typescript
// src/app/admin/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const { sessionClaims } = await auth()
  const role = sessionClaims?.metadata?.role

  if (role !== 'owner' && role !== 'manager') {
    redirect('/dashboard')
  }

  return <div>Admin Dashboard</div>
}
```

---

## 8. Client Components

### User Button

```typescript
// src/shared/components/UserMenu.tsx
'use client'

import { UserButton } from '@clerk/nextjs'

export function UserMenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: 'w-10 h-10',
        },
      }}
      afterSignOutUrl="/"
    />
  )
}
```

### Sign In/Up Pages

**`src/app/sign-in/[[...sign-in]]/page.tsx`**:
```typescript
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn />
    </div>
  )
}
```

**`src/app/sign-up/[[...sign-up]]/page.tsx`**:
```typescript
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp />
    </div>
  )
}
```

---

## 9. Server Actions

### Authenticated Server Action

```typescript
// src/app/actions/menu.ts
'use server'

import { auth } from '@clerk/nextjs/server'
import { createAuthenticatedClient } from '@/shared/lib/supabase/server-with-auth'

export async function createMenuItem(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const supabase = await createAuthenticatedClient()

  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      name: formData.get('name'),
      price: formData.get('price'),
    })
    .select()
    .single()

  if (error) throw error

  return data
}
```

---

## 10. Testing Strategies

### Test User Creation

```typescript
// src/__tests__/utils/create-test-user.ts
import { clerkClient } from '@clerk/nextjs/server'

export async function createTestUser(options: {
  email: string
  role: string
  tenantId?: string
}) {
  const client = await clerkClient()

  const user = await client.users.createUser({
    emailAddress: [options.email],
    password: 'Test123!@#',
    publicMetadata: {
      role: options.role,
      tenant_id: options.tenantId,
    },
  })

  return user
}
```

### Mock Clerk in Tests

```typescript
// jest.setup.ts
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(() => ({
    userId: 'test-user-id',
    sessionClaims: {
      metadata: {
        role: 'manager',
        tenant_id: 'test-tenant-id',
      },
    },
  })),
}))
```

---

## 📚 Additional Resources

- [Clerk Docs](https://clerk.com/docs)
- [Clerk + Supabase Guide](https://clerk.com/docs/integrations/databases/supabase)
- [Webhooks](https://clerk.com/docs/integrations/webhooks/overview)
- [Organizations](https://clerk.com/docs/organizations/overview)

---

**Next**: See [Multi-Tenancy Patterns Guide](./MULTI-TENANCY-PATTERNS.md) for advanced setup.
