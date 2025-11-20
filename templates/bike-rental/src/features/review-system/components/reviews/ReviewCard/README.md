# ReviewCard

Display a single user review with avatar, rating, comment, and timestamp.

## Features
✅ User avatar (or fallback icon)
✅ Star rating display
✅ Comment text
✅ Relative timestamp ("2 days ago")
✅ Formatted date
✅ Clean card layout

## Usage

```tsx
import { ReviewCard } from '@siso/ui-library/bike-rental/reviews/ReviewCard';

<ReviewCard
  review={{
    id: '1',
    user_name: 'John Doe',
    rating: 5,
    comment: 'Great bike! Smooth ride and well-maintained.',
    created_at: '2025-01-15T10:30:00Z'
  }}
/>
```

## Bike Rental Example

```tsx
<ReviewCard
  review={{
    id: '123',
    user_name: 'Sarah Johnson',
    rating: 4.5,
    comment: 'Mountain bike was perfect for the trails. Gear system worked flawlessly!',
    created_at: '2025-01-18T14:20:00Z'
  }}
  showAvatar={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| review | Review | required | Review object with user_name, rating, comment, created_at |
| className | string | '' | Additional CSS classes |
| showAvatar | boolean | true | Show/hide user avatar |
| avatarUrl | string | undefined | Custom avatar image URL |

## Dependencies
- `date-fns` - Date formatting
- `lucide-react` - User icon
- shadcn/ui Card components
- ReviewStars component
