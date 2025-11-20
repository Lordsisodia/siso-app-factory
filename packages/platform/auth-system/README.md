# 🔐 SISO Auth System - Reusable Supabase Authentication

**Version:** 1.0.0
**Last Updated:** October 21, 2025
**Tech Stack:** Supabase Auth + React + TypeScript + Tailwind CSS

---

## 🎯 Overview

Drop-in authentication system for all SISO SaaS projects. Features beautiful glassmorphic UI components and complete Supabase Auth integration.

### ✨ Features

- ✅ **Google OAuth** (one-click sign-in)
- ✅ **Email/Password** authentication
- ✅ **Beautiful UI** (glassmorphic design from HextaUI)
- ✅ **Multi-tenant ready** (tenant_id support)
- ✅ **TypeScript** (fully typed)
- ✅ **Zero configuration** (just copy & paste)
- ✅ **FREE forever** (Supabase Auth)

---

## 📦 What's Included

```
auth-system/
├── components/
│   ├── modern-stunning-sign-in.tsx    # Sign-in component
│   └── modern-stunning-sign-up.tsx    # Sign-up component
├── hooks/
│   └── useAuth.ts                     # Auth state hook
├── lib/
│   ├── client.ts                      # Client-side Supabase
│   ├── server.ts                      # Server-side Supabase
│   └── middleware.ts                  # Session management
├── migrations/
│   └── supabase-auth-schema.sql       # Database schema
└── README.md                          # This file
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Copy Files to Your Project

```bash
# Copy components
cp auth-system/components/* your-project/src/components/ui/

# Copy hooks
cp auth-system/hooks/* your-project/src/features/auth/hooks/

# Copy Supabase utilities
cp auth-system/lib/* your-project/src/lib/supabase/
```

### Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Step 3: Add Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 4: Run Database Migration

Run `supabase-auth-schema.sql` in your Supabase SQL editor.

### Step 5: Use Components

```tsx
// Sign-in page
import { SignIn1 } from "@/components/ui/modern-stunning-sign-in";

export default function SignInPage() {
  return <SignIn1 />;
}
```

---

## 🔧 Setup Guide (Complete)

### Prerequisites

Your project must have:
- ✅ Next.js 13+ (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Supabase project

### Google OAuth Setup (One Time)

**You only do this ONCE for ALL your SISO projects!**

1. **Google Cloud Console** → Create OAuth app
2. **Add ALL redirect URIs** for all your Supabase projects:
   ```
   https://project1.supabase.co/auth/v1/callback
   https://project2.supabase.co/auth/v1/callback
   https://project3.supabase.co/auth/v1/callback
   ```
3. **Copy Client ID + Secret**
4. **For each Supabase project:**
   - Dashboard → Authentication → Providers → Google
   - Toggle ON
   - Paste SAME credentials
   - Save

### Enable Email/Password Auth

In Supabase Dashboard:
1. **Authentication → Providers**
2. **Email** should be enabled by default
3. If not, toggle **Email** to ON
4. **Email confirmations:**
   - Development: Can disable for testing
   - Production: Enable for security

---

## 📁 File Structure

Your project should have this structure:

```
your-project/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── modern-stunning-sign-in.tsx
│   │       └── modern-stunning-sign-up.tsx
│   ├── features/
│   │   └── auth/
│   │       └── hooks/
│   │           └── useAuth.ts
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts
│   │       ├── server.ts
│   │       └── middleware.ts
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signin/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/route.ts
│   │   └── layout.tsx
│   └── middleware.ts
└── supabase/
    └── migrations/
        └── supabase-auth-schema.sql
```

---

## 💻 Code Examples

### Get Current User (Client Component)

```tsx
'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function MyComponent() {
  const { user, loading, isAuthenticated, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Get Current User (Server Component)

```tsx
import { createClient } from '@/lib/supabase/server';

export default async function MyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello {user.email}</div>;
}
```

### Sign In with Google (Custom Button)

```tsx
'use client';
import { createClient } from '@/lib/supabase/client';

export function CustomGoogleButton() {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
}
```

### Sign Out

```tsx
'use client';
import { createClient } from '@/lib/supabase/client';

export function SignOutButton() {
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
```

---

## 🛡️ Multi-Tenant Support

### Add tenant_id to User on Sign-Up

Update the callback handler:

```tsx
// src/app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Get the user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check if user has tenant_id
      const { data: userData } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

      // If no tenant, assign to default
      if (!userData?.tenant_id) {
        await supabase
          .from('users')
          .update({
            tenant_id: process.env.DEFAULT_RESTAURANT_ID,
            role: 'customer',
          })
          .eq('id', user.id);
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
```

---

## 🎨 Customization

### Change Logo

```tsx
// In modern-stunning-sign-in.tsx
<div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
  <img src="/your-logo.svg" alt="Logo" />  {/* ← Change this */}
</div>
```

### Change Brand Name

```tsx
<h2 className="text-2xl font-semibold text-white mb-6 text-center">
  Your Brand Name  {/* ← Change this */}
</h2>
```

### Change Colors

The component uses Tailwind classes. Customize:
- Background: `bg-[#121212]` → Your color
- Card: `from-[#ffffff10] to-[#121212]` → Your gradient
- Buttons: `bg-white/10` → Your style

---

## 📚 API Reference

### useAuth Hook

```typescript
const { user, loading, isAuthenticated, signOut } = useAuth();
```

**Returns:**
- `user` - Current user object (Supabase User type)
- `loading` - Boolean, true while checking auth state
- `isAuthenticated` - Boolean, true if user is signed in
- `signOut` - Function to sign out user

### createClient() - Client-side

```typescript
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
```

Use in `'use client'` components.

### createClient() - Server-side

```typescript
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();
```

Use in Server Components, Server Actions, Route Handlers.

---

## 🧪 Testing

### Test Sign-In Flow

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000/auth/signin
3. Click "Continue with Google"
4. Sign in with Google
5. Should redirect to /dashboard

### Test Email/Password

1. Visit: http://localhost:3000/auth/signup
2. Enter email + password
3. Click "Sign up"
4. Check email for confirmation link
5. Click link → redirected to /dashboard

---

## 🔒 Security Best Practices

### Row Level Security (RLS)

Enable RLS on all tables:

```sql
alter table your_table enable row level security;

create policy "Users see own tenant data"
  on your_table for select
  using (
    tenant_id = (
      select tenant_id from auth.users where id = auth.uid()
    )
  );
```

### Environment Variables

Never commit:
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ Google OAuth credentials

Always in `.gitignore`:
```
.env.local
.google-oauth-credentials.txt
```

---

## 📋 Checklist for New Project

- [ ] Copy auth-system files to new project
- [ ] Install dependencies: `@supabase/supabase-js @supabase/ssr`
- [ ] Add environment variables
- [ ] Run database migration
- [ ] Add Google OAuth redirect URI to Google Cloud Console
- [ ] Add same Google credentials to new Supabase project
- [ ] Enable email/password in Supabase Dashboard
- [ ] Create sign-in/sign-up pages
- [ ] Add auth callback route
- [ ] Update middleware
- [ ] Test sign-in flow
- [ ] Test sign-up flow
- [ ] Configure RLS policies

---

## 🎯 Next Projects

When setting up auth for:
- **Bike Rental SaaS**
- **Car Hire SaaS**
- **Tour Guides SaaS**

Just:
1. Copy this entire `auth-system` folder
2. Add redirect URI to Google OAuth
3. Paste same credentials in new Supabase
4. Done! 5 minutes setup.

---

## 📞 Support

Questions? Check:
- Main integration guide: `../project-setup-system/integrations/SUPABASE-AUTH-INTEGRATION-GUIDE.md`
- Supabase Auth docs: https://supabase.com/docs/guides/auth

---

**Built with ❤️ for SISO SaaS Platform**
