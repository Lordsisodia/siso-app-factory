# Quick Start Guide - Hiring System

## 🚀 Get Started in 3 Steps

### Step 1: Fix Supabase Client (Required)

Open `/hiring-system/contexts/AuthContext.tsx` and replace lines 8-25:

```typescript
// ❌ REMOVE THIS:
const supabase = { ...placeholder... };

// ✅ ADD THIS:
import { supabase } from '@/integrations/supabase/client';
// Or wherever your Supabase client is configured
```

### Step 2: Check Toast System (Optional)

If you plan to use `useToast`:

```bash
# Check if @siso/ui has toast:
grep -r "toast" siso-app-factory/packages/ui/src/

# If @siso/ui has toast:
# - Use that instead for consistency
# - Remove hiring-system/hooks/use-toast.ts

# If @siso/ui doesn't have toast:
# - Keep use-toast.ts
# - Ensure toast UI components exist at: hiring-system/components/ui/toast
```

### Step 3: Use in Your App

```typescript
// In your app root (e.g., App.tsx or main.tsx):
import { AuthProvider } from '@/hiring-system/contexts';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

## 📦 What You Got

### AuthContext - Full Authentication System
```typescript
import { useAuth } from '@/hiring-system/contexts';

function MyComponent() {
  const {
    user,           // Current user object
    profile,        // User profile with role
    isAdmin,        // Boolean: is user admin?
    loading,        // Boolean: auth loading state
    error,          // String: auth error message
    signIn,         // Function: (email, password) => Promise<void>
    signUp,         // Function: (email, password) => Promise<void>
    signOut,        // Function: () => Promise<void>
    refreshProfile  // Function: () => Promise<void>
  } = useAuth();

  return <div>{user?.email}</div>;
}
```

### useIsMobile - Responsive Detection
```typescript
import { useIsMobile } from '@/hiring-system/hooks';

function MyComponent() {
  const isMobile = useIsMobile(); // true if width < 768px
  return <div>{isMobile ? '📱' : '💻'}</div>;
}
```

### useToast - Notification System
```typescript
import { useToast } from '@/hiring-system/hooks';

function MyComponent() {
  const { toast } = useToast();

  const notify = () => {
    toast({
      title: "Success!",
      description: "Your action completed",
      variant: "default", // or "destructive"
    });
  };

  return <button onClick={notify}>Notify</button>;
}
```

## 🎯 Common Patterns

### Protected Routes
```typescript
import { useAuth } from '@/hiring-system/contexts';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
```

### Admin-Only Components
```typescript
import { useAuth } from '@/hiring-system/contexts';

function AdminPanel() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return <div>Admin controls here</div>;
}
```

### Responsive Layout
```typescript
import { useIsMobile } from '@/hiring-system/hooks';

function ResponsiveNav() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileNav /> : <DesktopNav />;
}
```

### Login Form with Toast
```typescript
import { useAuth } from '@/hiring-system/contexts';
import { useToast } from '@/hiring-system/hooks';

function LoginForm() {
  const { signIn, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn(email, password);

    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    }
  };

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

## 🔧 Troubleshooting

### "supabase is not defined"
→ You forgot Step 1. Replace the placeholder Supabase client.

### "Cannot find module '@/hiring-system/contexts'"
→ Check your TypeScript path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### "useAuth must be used within an AuthProvider"
→ Wrap your app with `<AuthProvider>` (see Step 3).

### Toast not working
→ Either:
- Use `@siso/ui` toast instead, OR
- Ensure toast components exist at `hiring-system/components/ui/toast`

### Profile not loading
→ Check your Supabase:
- Does the `profiles` table exist?
- Does it have the correct columns? (id, role, first_name, last_name, etc.)
- Are RLS policies configured correctly?

## 📚 Full Documentation

See the complete documentation:
- [README.md](./README.md) - Detailed guide with all features
- [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md) - Migration details and checklist

## ✅ Quick Checklist

Before using in production:

- [ ] Replaced Supabase placeholder in AuthContext
- [ ] Wrapped app with `<AuthProvider>`
- [ ] Tested sign in/sign out flows
- [ ] Verified profile data loads correctly
- [ ] Tested admin role detection
- [ ] Checked responsive breakpoints
- [ ] Verified toast notifications work (if using)
- [ ] Updated all old import paths
- [ ] Added error boundaries
- [ ] Tested on mobile devices

---

**Need Help?** Check the full [README.md](./README.md) or [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md)
