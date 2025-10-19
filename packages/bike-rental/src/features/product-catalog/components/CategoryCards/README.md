# CategoryCards

Beautiful image-based category cards with hover effects and animated arrows.

## Features
✅ Hover zoom effect on image
✅ Gradient overlay animation
✅ Animated arrow on hover
✅ Optional item count
✅ Configurable card height
✅ Responsive grid
✅ Stagger animation

## Usage

```tsx
import { CategoryCards } from '@siso/ui-library/bike-rental/cards/CategoryCards';

<CategoryCards
  categories={[
    {
      name: 'Mountain Bikes',
      image: '/bikes/mountain.jpg',
      description: 'Conquer the trails',
      href: '/bikes?category=mountain',
      count: 12
    },
    {
      name: 'Road Bikes',
      image: '/bikes/road.jpg',
      description: 'Speed and endurance',
      href: '/bikes?category=road',
      count: 8
    }
  ]}
/>
```

## Bike Rental Example

```tsx
<CategoryCards
  categories={[
    {
      name: 'Mountain Bikes',
      image: 'https://images.unsplash.com/photo-mountain-bike.jpg',
      description: 'Perfect for off-road adventures and trail riding',
      href: '/bikes?type=mountain',
      count: 15
    },
    {
      name: 'Electric Bikes',
      image: 'https://images.unsplash.com/photo-ebike.jpg',
      description: 'Effortless city cruising with pedal assist',
      href: '/bikes?type=electric',
      count: 10
    },
    {
      name: 'Road Bikes',
      image: 'https://images.unsplash.com/photo-road-bike.jpg',
      description: 'Built for speed on paved roads',
      href: '/bikes?type=road',
      count: 8
    },
    {
      name: 'Hybrid Bikes',
      image: 'https://images.unsplash.com/photo-hybrid-bike.jpg',
      description: 'Versatile bikes for city and light trails',
      href: '/bikes?type=hybrid',
      count: 12
    },
    {
      name: 'Kids Bikes',
      image: 'https://images.unsplash.com/photo-kids-bike.jpg',
      description: 'Safe and fun bikes for children',
      href: '/bikes?type=kids',
      count: 6
    },
    {
      name: 'Cruiser Bikes',
      image: 'https://images.unsplash.com/photo-cruiser-bike.jpg',
      description: 'Comfortable rides for leisurely exploration',
      href: '/bikes?type=cruiser',
      count: 9
    }
  ]}
  columns={{ sm: 1, md: 2, lg: 3 }}
  cardHeight="h-72"
/>
```

## Custom Grid Layout

```tsx
// 4 columns on large screens
<CategoryCards
  categories={categories}
  columns={{ sm: 2, md: 3, lg: 4 }}
/>

// 2 columns always
<CategoryCards
  categories={categories}
  columns={{ sm: 1, md: 2, lg: 2 }}
/>
```

## Without CTA Button

```tsx
<CategoryCards
  categories={categories}
  showCTA={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| categories | Category[] | required | Array of category objects |
| columns | ColumnConfig | {sm:1, md:2, lg:3} | Responsive grid columns |
| cardHeight | string | 'h-64' | Tailwind height class |
| showCTA | boolean | true | Show CTA button |
| ctaText | string | 'Browse Category' | CTA button text |
| className | string | undefined | Additional CSS classes |

### Category Type
```typescript
{
  name: string;          // Category name
  image: string;         // Category image URL
  description?: string;  // Optional description
  href: string;          // Link destination
  count?: number;        // Optional item count
}
```

## Hover Effects

1. **Image**: Scales to 110% on hover
2. **Gradient**: Changes from subtle to primary color
3. **Arrow**: Slides in from right with width animation
4. **CTA Badge**: Background becomes more opaque

## Dependencies
- `framer-motion` - Animations
- `react-router-dom` - Link
- `lucide-react` - ArrowRight icon
- Tailwind CSS - Styling
