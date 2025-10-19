# ProductCard

Versatile product display card for bikes, cars, equipment, or any rental/product item.

## Features
✅ Product image with lazy loading
✅ Price badge overlay
✅ Favorite/wishlist toggle
✅ Configurable specs grid
✅ Star rating display
✅ Details and Book Now buttons
✅ Hover shadow effect
✅ Fully responsive
✅ TypeScript generic support

## Usage

```tsx
import { ProductCard } from '@siso/ui-library/bike-rental/cards/ProductCard';

<ProductCard
  product={bike}
  imageUrl={bike.image}
  title={bike.name}
  subtitle={bike.brand}
  dailyRate={25}
  specs={[
    { label: 'Type', value: bike.type },
    { label: 'Gears', value: bike.gears }
  ]}
  onBookNow={(bike) => handleBooking(bike)}
/>
```

## Bike Rental Example

```tsx
<ProductCard
  product={bike}
  imageUrl={bike.imageUrl}
  title="Mountain Bike Pro"
  subtitle="Trek Brand"
  dailyRate={35}
  currency="$"
  priceLabel="day"
  specs={[
    { label: 'Type', value: 'Mountain' },
    { label: 'Gears', value: '21-speed' },
    { label: 'Frame Size', value: 'Medium' },
    { label: 'Weight', value: '12kg' },
    { label: 'Suspension', value: 'Full' },
    { label: 'Brakes', value: 'Disc' }
  ]}
  rating={4.7}
  detailsLink={`/bikes/${bike.id}`}
  onBookNow={(bike) => openBookingModal(bike)}
  onFavoriteToggle={(bike, favorited) => {
    if (favorited) {
      addToFavorites(bike);
    } else {
      removeFromFavorites(bike);
    }
  }}
  showFavorite={true}
/>
```

## Car Rental Example

```tsx
<ProductCard
  product={car}
  imageUrl={car.image}
  title={car.name}
  subtitle={car.brand}
  dailyRate={150}
  specs={[
    { label: 'Brand', value: car.brand },
    { label: 'Category', value: car.category },
    { label: 'Engine', value: car.specs.engine },
    { label: 'Transmission', value: car.specs.transmission },
    { label: 'Seats', value: car.specs.seats },
    { label: 'Speed', value: `${car.specs.speed} mph` }
  ]}
  rating={4.5}
  detailsLink={`/cars/${car.id}`}
  onBookNow={handleBooking}
/>
```

## Equipment Rental Example

```tsx
<ProductCard
  product={camera}
  imageUrl={camera.image}
  title="Canon EOS R5"
  subtitle="Professional Camera"
  dailyRate={75}
  priceLabel="day"
  specs={[
    { label: 'Megapixels', value: '45MP' },
    { label: 'Lens', value: '24-105mm' },
    { label: 'Video', value: '8K' },
    { label: 'Weight', value: '738g' }
  ]}
  onBookNow={handleBooking}
  showFavorite={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| product | T (generic) | required | Product data object |
| imageUrl | string | required | Product image URL |
| title | string | required | Product name/title |
| subtitle | string | undefined | Secondary text (brand, category) |
| dailyRate | number | required | Price per day |
| currency | string | '$' | Currency symbol |
| priceLabel | string | 'day' | Price unit label |
| specs | ProductSpec[] | required | Array of specs to display |
| rating | number | undefined | Star rating (0-5) |
| detailsLink | string | undefined | Link to detail page |
| onBookNow | (product: T) => void | required | Book now handler |
| onFavoriteToggle | (product: T, favorited: boolean) => void | undefined | Favorite toggle handler |
| isFavorited | boolean | false | Initial favorite state |
| showFavorite | boolean | true | Show/hide favorite button |
| className | string | '' | Additional CSS classes |

### ProductSpec Type
```typescript
{
  label: string;         // Spec label (e.g., "Type", "Gears")
  value: string | number; // Spec value (e.g., "Mountain", "21-speed")
}
```

## Dependencies
- shadcn/ui - Card, Button, Badge
- `lucide-react` - Heart icon
- `react-router-dom` - Link
- ReviewStars component
