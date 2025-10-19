# ReviewStars

## Description
A flexible star rating display component with support for full, half, and empty stars. Perfect for displaying product ratings, reviews, or any rating system.

## Features
✅ Full star support
✅ Half star support
✅ Configurable size (sm/md/lg)
✅ Configurable max rating
✅ Show/hide empty stars
✅ Clean, responsive design
✅ TypeScript support

## Usage

### Basic Example
```tsx
import { ReviewStars } from '@siso/ui-library/bike-rental/reviews/ReviewStars';

<ReviewStars rating={4.5} />
```

### Bike Rental Example
```tsx
// Display average bike rating
<ReviewStars
  rating={4.7}
  size="lg"
  className="mb-2"
/>

// Small rating in product card
<ReviewStars
  rating={bike.averageRating}
  size="sm"
  showEmpty={false}
/>
```

### Car Rental Example
```tsx
// Display average car rating
<ReviewStars
  rating={carRating}
  maxRating={5}
  size="md"
/>
```

### Restaurant Example
```tsx
// Food rating
<ReviewStars
  rating={dishRating}
  size="lg"
  className="text-yellow-500"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| rating | number | Yes | - | Rating value (supports decimals for half stars) |
| maxRating | number | No | 5 | Maximum number of stars |
| size | 'sm' \| 'md' \| 'lg' | No | 'md' | Size of the stars |
| className | string | No | '' | Additional CSS classes |
| showEmpty | boolean | No | true | Whether to show empty/unfilled stars |

## Examples

### Different Sizes
```tsx
<ReviewStars rating={4.5} size="sm" />  // Small
<ReviewStars rating={4.5} size="md" />  // Medium
<ReviewStars rating={4.5} size="lg" />  // Large
```

### Half Stars
```tsx
<ReviewStars rating={4.5} />  // Shows 4.5 stars (4 full + 1 half)
<ReviewStars rating={3.7} />  // Shows 3.5 stars (3 full + 1 half)
```

### Hide Empty Stars
```tsx
<ReviewStars rating={3} showEmpty={false} />  // Only shows 3 filled stars
<ReviewStars rating={3} showEmpty={true} />   // Shows 3 filled + 2 empty
```

### Custom Max Rating
```tsx
<ReviewStars rating={8} maxRating={10} />  // 8 out of 10 stars
```

## Dependencies
- `lucide-react` - Star icon component
- Tailwind CSS - Styling

## Notes
- Works with any rating system
- Fully responsive
- Lightweight and performant
- No external dependencies beyond icon library
