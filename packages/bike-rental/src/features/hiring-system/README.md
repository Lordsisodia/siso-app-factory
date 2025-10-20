# Hiring System - Context & Hooks

This directory contains the migrated contexts and hooks from the 5-star-hire application.

## Directory Structure

```
hiring-system/
├── contexts/
│   ├── AuthContext.tsx
│   └── index.ts
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── index.ts
└── README.md
```

## Migration Notes

### AuthContext (`contexts/AuthContext.tsx`)

**Source**: `5-star-hire/src/contexts/AuthContext.tsx`

**Changes Made**:
- Added placeholder Supabase client (needs replacement with actual implementation)
- Added TODO comments for proper Supabase client import
- Exported `UserProfile` and `AuthContextProps` interfaces for reusability
- Kept all React Router imports and functionality as-is

**Action Required**:
Replace the placeholder Supabase client with your actual Supabase client implementation:
```typescript
// Replace this line:
// const supabase = { ... placeholder ... }

// With your actual import:
import { supabase } from '@/integrations/supabase/client';
// or wherever your Supabase client is configured
```

### Hooks

#### `use-mobile.tsx`

**Source**: `5-star-hire/src/hooks/use-mobile.tsx`

A simple hook for detecting mobile viewport width (< 768px). No changes required.

**Usage**:
```typescript
import { useIsMobile } from '@/hiring-system/hooks';

function MyComponent() {
  const isMobile = useIsMobile();
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

#### `use-toast.ts`

**Source**: `5-star-hire/src/hooks/use-toast.ts`

**Important Notes**:
- This hook has custom configuration (`TOAST_LIMIT = 1`, `TOAST_REMOVE_DELAY = 1000000`)
- Depends on local toast components: `../components/ui/toast`
- **BEFORE USING**: Check if `@siso/ui` already provides a toast system
- If `@siso/ui` has toast functionality, consider migrating to use that for consistency

**Dependencies**:
This hook requires the toast UI components to be present at:
```
hiring-system/components/ui/toast
```

If the toast components don't exist, you'll need to either:
1. Migrate the toast components as well
2. Use the toast system from `@siso/ui` (recommended)
3. Update the import path to match your component structure

**Usage**:
```typescript
import { useToast } from '@/hiring-system/hooks';

function MyComponent() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Success",
      description: "Operation completed",
    });
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## Usage Examples

### Using AuthContext

```typescript
import { AuthProvider, useAuth } from '@/hiring-system/contexts';

// In your app root:
function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

// In any component:
function MyComponent() {
  const { user, isAdmin, signIn, signOut } = useAuth();

  if (!user) {
    return <LoginForm onSubmit={signIn} />;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      {isAdmin && <p>You are an admin</p>}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Using All Hooks

```typescript
import { useIsMobile, useToast } from '@/hiring-system/hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleAction = () => {
    toast({
      title: isMobile ? "Mobile action" : "Desktop action",
      description: "Action completed successfully",
    });
  };

  return (
    <button onClick={handleAction}>
      {isMobile ? 'Tap' : 'Click'} me
    </button>
  );
}
```

## Next Steps

1. **Implement Supabase Client**: Replace the placeholder in `AuthContext.tsx`
2. **Check Toast System**: Verify if `@siso/ui` provides toast components
3. **Update Imports**: Update any existing imports in your codebase to use these new paths
4. **Test Authentication**: Ensure the AuthContext works with your Supabase setup
5. **Consider Consolidation**: If similar hooks exist elsewhere, consider consolidating them

## TypeScript Types

All interfaces and types are exported and can be imported:

```typescript
import type {
  UserProfile,
  AuthContextProps
} from '@/hiring-system/contexts';
```

## Dependencies

- `react`: For hooks and context
- `@supabase/supabase-js`: For Supabase types and client
- `react-router-dom`: Used by AuthContext (if applicable)

Ensure these are in your `package.json` dependencies.
