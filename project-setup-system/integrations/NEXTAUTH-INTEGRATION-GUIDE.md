# NextAuth.js Integration Guide for SISO App Factory

**Version**: 2.0
**Last Updated**: 2025-10-21
**Migration from**: Clerk

---

## 🎯 Overview

This guide provides **standardized patterns** for integrating NextAuth.js (Auth.js v5) into SISO App Factory multi-tenant projects with Supabase backend.

### Why NextAuth over Clerk for Multi-Tenant SaaS?

**Cost Comparison for 100 Restaurants:**
```
100 clients × 200 active users = 20,000 MAU

Clerk: ~$400/month (after free tier)
NextAuth: $0/month (open source)
Supabase: $25/month (Pro tier handles 100k MAU)

Annual Savings: ~$4,500+
```

**Key Benefits:**
- ✅ Unlimited users (FREE forever)
- ✅ 100% data ownership
- ✅ No vendor lock-in
- ✅ Full customization
- ✅ Sessions stored in YOUR Supabase database
- ✅ Perfect for multi-tenant architecture

---

## 📚 Table of Contents

1. [Project Setup](#1-project-setup)
2. [Database Schema](#2-database-schema)
3. [NextAuth Configuration](#3-nextauth-configuration)
4. [Google OAuth Setup](#4-google-oauth-setup)
5. [Multi-Tenant User Management](#5-multi-tenant-user-management)
6. [Role-Based Access Control (RBAC)](#6-role-based-access-control)
7. [Session Management](#7-session-management)
8. [Custom Login UI](#8-custom-login-ui)
9. [Middleware & Route Protection](#9-middleware--route-protection)
10. [Server Actions](#10-server-actions)
11. [Migration from Clerk](#11-migration-from-clerk)
12. [Testing Strategies](#12-testing-strategies)

---

## 1. Project Setup

### Install NextAuth & Dependencies

```bash
npm install next-auth@beta @auth/core @auth/supabase-adapter
```

> **Note**: Using `next-auth@beta` for NextAuth v5 (Auth.js) support

### Environment Variables

**`.env.local`**:
```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-generate-with-openssl

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

---

## 2. Database Schema

NextAuth will auto-create these tables in Supabase via the adapter:

### Core Auth Tables

```sql
-- NextAuth creates these automatically via SupabaseAdapter
-- But here's the schema for reference:

-- Users table (extends your existing users table)
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  email_verified timestamp with time zone,
  name text,
  image text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Accounts table (OAuth providers)
create table if not exists accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  unique(provider, provider_account_id)
);

-- Sessions table (database sessions)
create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  session_token text unique not null,
  user_id uuid not null references users(id) on delete cascade,
  expires timestamp with time zone not null
);

-- Verification tokens (email verification)
create table if not exists verification_tokens (
  identifier text not null,
  token text unique not null,
  expires timestamp with time zone not null,
  primary key (identifier, token)
);
```

### Multi-Tenant Extensions

```sql
-- Add tenant context to users table
alter table users add column if not exists tenant_id uuid references tenants(id);
alter table users add column if not exists role text default 'customer';
alter table users add column if not exists onboarding_completed boolean default false;

-- User roles per tenant (for multi-org users)
create table if not exists user_tenant_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  role text not null check (role in ('owner', 'manager', 'staff', 'customer')),
  created_at timestamp with time zone default now(),
  unique(user_id, tenant_id)
);

-- Row Level Security (RLS)
alter table users enable row level security;
alter table user_tenant_roles enable row level security;

-- RLS Policies
create policy "Users can view own profile"
  on users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on users for update
  using (auth.uid() = id);

create policy "Users can view own tenant roles"
  on user_tenant_roles for select
  using (auth.uid() = user_id);
```

---

## 3. NextAuth Configuration

### Auth Configuration

**`src/auth.config.ts`**:
```typescript
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin || isOnDashboard) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
```

### Main Auth Setup with Supabase Adapter

**`src/auth.ts`**:
```typescript
import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { authConfig } from './auth.config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, user }) {
      // Add user metadata to session
      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id, role, onboarding_completed')
        .eq('id', user.id)
        .single();

      if (userData) {
        session.user.tenantId = userData.tenant_id;
        session.user.role = userData.role;
        session.user.onboardingCompleted = userData.onboarding_completed;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      // Auto-assign to default tenant on first sign-in
      if (account?.provider === 'google' && user.email) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('tenant_id')
          .eq('email', user.email)
          .single();

        if (!existingUser?.tenant_id) {
          // Assign to default tenant or create new tenant
          const defaultTenantId = process.env.DEFAULT_TENANT_ID;

          await supabase
            .from('users')
            .update({
              tenant_id: defaultTenantId,
              role: 'customer'
            })
            .eq('email', user.email);
        }
      }

      return true;
    },
  },
});
```

### API Route Handler

**`src/app/api/auth/[...nextauth]/route.ts`**:
```typescript
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
```

### TypeScript Definitions

**`src/types/next-auth.d.ts`**:
```typescript
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      tenantId?: string | null;
      role?: string;
      onboardingCompleted?: boolean;
    };
  }

  interface User {
    tenantId?: string | null;
    role?: string;
    onboardingCompleted?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    tenantId?: string | null;
    role?: string;
  }
}
```

---

## 4. Google OAuth Setup

### Google Cloud Console Setup

1. **Create Project**: https://console.cloud.google.com
2. **Enable Google+ API**: APIs & Services → Library → Google+ API
3. **Create OAuth Credentials**:
   - OAuth 2.0 Client ID
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-domain.com/api/auth/callback/google
     ```
4. **Copy Credentials** → Add to `.env.local`

### One-Tap Google Sign-In (Optional)

**`src/components/GoogleOneTap.tsx`**:
```typescript
'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';

export function GoogleOneTap() {
  useEffect(() => {
    const { google } = window as any;

    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          await signIn('google', {
            credential: response.credential,
            redirect: true,
            callbackUrl: '/dashboard',
          });
        },
      });

      google.accounts.id.prompt();
    }
  }, []);

  return null;
}
```

Add to layout:
```tsx
import Script from 'next/script';

<Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
<GoogleOneTap />
```

---

## 5. Multi-Tenant User Management

### Get Current User with Tenant Context

**`src/lib/auth/get-current-user.ts`**:
```typescript
import { auth } from '@/auth';
import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const supabase = await createClient();

  const { data: user } = await supabase
    .from('users')
    .select(`
      *,
      tenant:tenants(*)
    `)
    .eq('id', session.user.id)
    .single();

  return user;
}
```

### Switch Tenant (For Multi-Org Users)

**`src/app/actions/switch-tenant.ts`**:
```typescript
'use server';

import { auth } from '@/auth';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function switchTenant(tenantId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();

  // Verify user has access to this tenant
  const { data: membership } = await supabase
    .from('user_tenant_roles')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('tenant_id', tenantId)
    .single();

  if (!membership) {
    throw new Error('Not authorized for this tenant');
  }

  // Update user's current tenant
  await supabase
    .from('users')
    .update({ tenant_id: tenantId })
    .eq('id', session.user.id);

  revalidatePath('/dashboard');
}
```

### Tenant Switcher Component

**`src/components/TenantSwitcher.tsx`**:
```typescript
'use client';

import { useState } from 'react';
import { switchTenant } from '@/app/actions/switch-tenant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@siso/ui/primitives/selects/shadcn-ui-select';

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  currentTenantId: string;
  availableTenants: Tenant[];
}

export function TenantSwitcher({ currentTenantId, availableTenants }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitch = async (tenantId: string) => {
    setIsLoading(true);
    await switchTenant(tenantId);
    setIsLoading(false);
  };

  return (
    <Select
      value={currentTenantId}
      onValueChange={handleSwitch}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {availableTenants.map((tenant) => (
          <SelectItem key={tenant.id} value={tenant.id}>
            {tenant.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

---

## 6. Role-Based Access Control (RBAC)

### Role Definitions

**`src/lib/auth/roles.ts`**:
```typescript
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
    'reservations.manage',
  ],
  [Role.STAFF]: [
    'menu.read',
    'orders.read',
    'orders.update',
    'reservations.read',
  ],
  [Role.CUSTOMER]: [
    'menu.read',
    'orders.create',
    'orders.read_own',
    'reservations.create',
  ],
} as const;

export function hasPermission(role: Role, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes('*') || permissions.includes(permission);
}
```

### Permission Hook

**`src/hooks/usePermission.ts`**:
```typescript
'use client';

import { useSession } from 'next-auth/react';
import { hasPermission, type Role } from '@/lib/auth/roles';

export function usePermission(permission: string): boolean {
  const { data: session } = useSession();

  if (!session?.user?.role) return false;

  return hasPermission(session.user.role as Role, permission);
}

// Usage example:
function MenuItemActions() {
  const canEdit = usePermission('menu.update');

  if (!canEdit) return null;

  return <button>Edit Item</button>;
}
```

### Server-Side Permission Check

**`src/lib/auth/check-permission.ts`**:
```typescript
import { auth } from '@/auth';
import { hasPermission, type Role } from './roles';

export async function checkPermission(permission: string): Promise<boolean> {
  const session = await auth();

  if (!session?.user?.role) return false;

  return hasPermission(session.user.role as Role, permission);
}

export async function requirePermission(permission: string): Promise<void> {
  const hasAccess = await checkPermission(permission);

  if (!hasAccess) {
    throw new Error(`Missing permission: ${permission}`);
  }
}
```

---

## 7. Session Management

### Session Provider Setup

**`src/app/layout.tsx`**:
```typescript
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

### Client-Side Session Hook

```typescript
'use client';

import { useSession } from 'next-auth/react';

function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome, {session?.user?.name}</p>
      <p>Tenant: {session?.user?.tenantId}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
}
```

### Server-Side Session

```typescript
import { auth } from '@/auth';

async function ServerComponent() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello {session.user.name}</div>;
}
```

---

## 8. Custom Login UI

### Custom Sign-In Page

**`src/app/auth/signin/page.tsx`**:
```typescript
import { signIn } from '@/auth';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <Button type="submit" className="w-full" size="lg">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              {/* Google icon SVG */}
            </svg>
            Continue with Google
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="/auth/signup" className="underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
```

### Sign-In Button Component

**`src/components/SignInButton.tsx`**:
```typescript
'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      variant="default"
    >
      Sign in with Google
    </Button>
  );
}
```

### Sign-Out Button Component

**`src/components/SignOutButton.tsx`**:
```typescript
'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@siso/ui/primitives/buttons/shadcn-ui-button';

export function SignOutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: '/' })} variant="ghost">
      Sign Out
    </Button>
  );
}
```

### User Menu with Avatar

**`src/components/UserMenu.tsx`**:
```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@siso/ui/primitives/dropdowns/shadcn-ui-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@siso/ui/primitives/avatars/shadcn-ui-avatar';

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const initials = session.user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session.user.image || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{session.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 9. Middleware & Route Protection

**`src/middleware.ts`**:
```typescript
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes
  const publicRoutes = ['/', '/menu', '/about', '/contact'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Auth routes
  const isAuthRoute = pathname.startsWith('/auth/');

  // Protected routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isProtectedRoute = isAdminRoute || isDashboardRoute;

  // Redirect logic
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Role-based access for admin
  if (isAdminRoute && isLoggedIn) {
    const role = req.auth?.user?.role;

    if (role !== 'owner' && role !== 'manager') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 10. Server Actions

### Authenticated Server Action

**`src/app/actions/menu.ts`**:
```typescript
'use server';

import { auth } from '@/auth';
import { createClient } from '@/lib/supabase/server';
import { requirePermission } from '@/lib/auth/check-permission';
import { revalidatePath } from 'next/cache';

export async function createMenuItem(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await requirePermission('menu.create');

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      tenant_id: session.user.tenantId,
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/admin/menu');
  return data;
}
```

---

## 11. Migration from Clerk

### Migration Checklist

- [ ] **Install NextAuth**: `npm install next-auth@beta @auth/supabase-adapter`
- [ ] **Setup Google OAuth** in Google Cloud Console
- [ ] **Create auth config** (`src/auth.config.ts`, `src/auth.ts`)
- [ ] **Update database schema** (add NextAuth tables)
- [ ] **Replace Clerk imports**:
  ```diff
  - import { auth } from '@clerk/nextjs/server';
  + import { auth } from '@/auth';

  - import { useUser } from '@clerk/nextjs';
  + import { useSession } from 'next-auth/react';
  ```
- [ ] **Update session access**:
  ```diff
  - const { userId } = auth();
  + const session = await auth();
  + const userId = session?.user?.id;

  - const { user } = useUser();
  + const { data: session } = useSession();
  + const user = session?.user;
  ```
- [ ] **Replace ClerkProvider** with SessionProvider
- [ ] **Update middleware** from `clerkMiddleware` to NextAuth middleware
- [ ] **Remove Clerk webhooks**
- [ ] **Test auth flow** thoroughly

### Data Migration Script

If you have existing Clerk users to migrate:

**`scripts/migrate-clerk-to-nextauth.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateUsers() {
  // 1. Export users from Clerk (use Clerk dashboard or API)
  const clerkUsers = []; // Load from Clerk export

  // 2. Insert into NextAuth schema
  for (const clerkUser of clerkUsers) {
    await supabase.from('users').insert({
      email: clerkUser.email_addresses[0].email_address,
      name: `${clerkUser.first_name} ${clerkUser.last_name}`,
      email_verified: new Date(),
      tenant_id: clerkUser.public_metadata.tenant_id,
      role: clerkUser.public_metadata.role,
    });
  }

  console.log(`Migrated ${clerkUsers.length} users`);
}

migrateUsers();
```

---

## 12. Testing Strategies

### Mock NextAuth in Tests

**`jest.setup.ts`**:
```typescript
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        tenantId: 'test-tenant-id',
        role: 'manager',
      },
    },
    status: 'authenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(() =>
    Promise.resolve({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        tenantId: 'test-tenant-id',
        role: 'manager',
      },
    })
  ),
}));
```

### Integration Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import UserProfile from '@/components/UserProfile';

jest.mock('next-auth/react');

describe('UserProfile', () => {
  it('shows user info when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'owner',
        },
      },
      status: 'authenticated',
    });

    render(<UserProfile />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('owner')).toBeInTheDocument();
  });
});
```

---

## 📚 Additional Resources

- [NextAuth.js v5 Docs](https://authjs.dev/)
- [Supabase Adapter](https://authjs.dev/getting-started/adapters/supabase)
- [Google OAuth Setup](https://authjs.dev/getting-started/providers/google)
- [Session Strategies](https://authjs.dev/concepts/session-strategies)

---

## 🎯 Quick Start Checklist

1. ✅ Install: `npm install next-auth@beta @auth/supabase-adapter`
2. ✅ Setup Google OAuth credentials
3. ✅ Add environment variables
4. ✅ Create `src/auth.config.ts` and `src/auth.ts`
5. ✅ Create API route: `src/app/api/auth/[...nextauth]/route.ts`
6. ✅ Run database migrations (Supabase adapter auto-creates tables)
7. ✅ Replace `<ClerkProvider>` with `<SessionProvider>`
8. ✅ Update middleware
9. ✅ Create custom sign-in page
10. ✅ Test authentication flow

---

**Migration Complete!** 🎉

You now have:
- ✅ Unlimited free users
- ✅ Full control over auth
- ✅ Multi-tenant support
- ✅ Google One-Tap login
- ✅ No vendor lock-in
- ✅ $0/month forever

**Next**: Implement [Email/Password Authentication](./NEXTAUTH-EMAIL-PROVIDER.md) or [MFA Setup](./NEXTAUTH-MFA-GUIDE.md)
