# ProductGrid

Responsive, animated grid layout for displaying products with stagger animation.

## Features
✅ Responsive columns configuration
✅ Framer Motion stagger animation
✅ Customizable gap spacing
✅ Generic product type support
✅ Render prop pattern
✅ Optional animation toggle

## Usage

```tsx
import { ProductGrid } from '@siso/ui-library/bike-rental/grids/ProductGrid';
import { ProductCard } from '@siso/ui-library/bike-rental/cards/ProductCard';

<ProductGrid
  products={bikes}
  renderCard={(bike) => (
    <ProductCard
      product={bike}
      imageUrl={bike.image}
      title={bike.name}
      dailyRate={bike.rate}
      specs={bike.specs}
      onBookNow={handleBooking}
    />
  )}
/>
```

## Bike Rental Example

```tsx
function BikesPage() {
  const [bikes, setBikes] = useState([]);

  return (
    <ProductGrid
      products={bikes}
      renderCard={(bike, index) => (
        <ProductCard
          key={bike.id}
          product={bike}
          imageUrl={bike.imageUrl}
          title={`${bike.brand} ${bike.model}`}
          subtitle={bike.type}
          dailyRate={bike.dailyRate}
          specs={[
            { label: 'Type', value: bike.type },
            { label: 'Gears', value: `${bike.gears}-speed` },
            { label: 'Frame', value: bike.frameSize },
            { label: 'Weight', value: `${bike.weight}kg` }
          ]}
          rating={bike.averageRating}
          detailsLink={`/bikes/${bike.id}`}
          onBookNow={openBookingModal}
        />
      )}
      columns={{ sm: 1, md: 2, lg: 3 }}
      gap={6}
    />
  );
}
```

## Custom Columns

```tsx
// 4 columns on large screens
<ProductGrid
  products={items}
  renderCard={(item) => <ItemCard item={item} />}
  columns={{ sm: 1, md: 2, lg: 4 }}
/>

// 2 columns always
<ProductGrid
  products={items}
  renderCard={(item) => <ItemCard item={item} />}
  columns={{ sm: 2, md: 2, lg: 2 }}
/>
```

## Without Animation

```tsx
<ProductGrid
  products={bikes}
  renderCard={(bike) => <ProductCard product={bike} />}
  animated={false}
/>
```

## Custom Gap

```tsx
<ProductGrid
  products={bikes}
  renderCard={(bike) => <ProductCard product={bike} />}
  gap={4}  // Tailwind gap-4 instead of gap-6
/>
```

## With Custom Card

```tsx
<ProductGrid
  products={bikes}
  renderCard={(bike, index) => (
    <div className="custom-card">
      <h3>{bike.name}</h3>
      <p>${bike.price}/day</p>
    </div>
  )}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| products | T[] | required | Array of products |
| renderCard | (product: T, index: number) => ReactNode | required | Render function for each card |
| columns | ColumnConfig | {sm:1, md:2, lg:3} | Responsive column breakpoints |
| gap | number | 6 | Tailwind gap class number |
| animated | boolean | true | Enable stagger animation |
| className | string | undefined | Additional CSS classes |

### ColumnConfig Type
```typescript
{
  sm?: number;  // Small screens (mobile)
  md?: number;  // Medium screens (tablet)
  lg?: number;  // Large screens (desktop)
}
```

## Integration Examples

### With Filters
```tsx
function FilteredBikes() {
  const [filteredBikes, setFilteredBikes] = useState([]);

  return (
    <>
      <ProductFilters onFilterChange={handleFilter} />
      <ProductGrid
        products={filteredBikes}
        renderCard={(bike) => <ProductCard product={bike} />}
      />
    </>
  );
}
```

### With Loading State
```tsx
{isLoading ? (
  <SkeletonLoader variant="card" count={6} />
) : bikes.length > 0 ? (
  <ProductGrid
    products={bikes}
    renderCard={(bike) => <ProductCard product={bike} />}
  />
) : (
  <EmptyState heading="No bikes available" />
)}
```

## Dependencies
- `framer-motion` - Stagger animations
- Tailwind CSS - Grid and spacing
