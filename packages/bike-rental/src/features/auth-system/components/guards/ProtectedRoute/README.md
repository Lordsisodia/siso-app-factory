# ProtectedRoute

Route guard component for protecting pages that require authentication.

## Features
✅ Authentication check
✅ Loading state display
✅ Automatic redirect to login
✅ Preserves intended destination
✅ Customizable redirect path
✅ Customizable loading message

## Usage

```tsx
import { ProtectedRoute } from '@siso/ui-library/bike-rental/guards/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

<ProtectedRoute
  isAuthenticated={!!user}
  isLoading={authLoading}
>
  <UserDashboard />
</ProtectedRoute>
```

## Bike Rental Example

```tsx
// In your router
<Route
  path="/my-bookings"
  element={
    <ProtectedRoute
      isAuthenticated={!!user}
      isLoading={authLoading}
      redirectTo="/login"
    >
      <MyBookingsPage />
    </ProtectedRoute>
  }
/>
```

## With Auth Context

```tsx
function App() {
  const { user, loading } = useAuth();

  return (
    <ProtectedRoute
      isAuthenticated={!!user}
      isLoading={loading}
      loadingMessage="Loading your profile..."
    >
      <ProfilePage />
    </ProtectedRoute>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Protected content to render |
| isAuthenticated | boolean | required | Authentication status |
| isLoading | boolean | false | Auth check in progress |
| redirectTo | string | '/auth' | Redirect path when not authenticated |
| loadingMessage | string | 'Verifying your authentication...' | Loading state message |

## Behavior

1. **Loading**: Shows spinner + message while `isLoading === true`
2. **Not Authenticated**: Redirects to `redirectTo` with return URL in state
3. **Authenticated**: Renders children

## Return URL

The component preserves the intended destination:
```typescript
// After login, redirect back to original page
const location = useLocation();
const returnTo = location.state?.from || '/';
navigate(returnTo);
```

## Dependencies
- `react-router-dom` - Navigate, useLocation
- `lucide-react` - Loader2 icon
