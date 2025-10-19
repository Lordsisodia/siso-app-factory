# ProductFilters

Sticky filter bar with category pills, price sorting, and advanced filters.

## Features
✅ Category filter pills (first 5 visible)
✅ "More" dropdown for additional categories
✅ Price sorting (low-to-high, high-to-low)
✅ Advanced filters button
✅ Mobile filters button
✅ Sticky positioning
✅ Active state styling

## Usage

```tsx
import { ProductFilters } from '@siso/ui-library/bike-rental/filters/ProductFilters';

const [category, setCategory] = useState('all');
const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');

<ProductFilters
  selectedCategory={category}
  onCategoryChange={setCategory}
  categories={['all', 'mountain', 'road', 'electric', 'hybrid']}
  priceSort={priceSort}
  onPriceSortChange={setPriceSort}
  onMobileFiltersClick={() => setDrawerOpen(true)}
/>
```

## Bike Rental Example

```tsx
function BikesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [showFilters, setShowFilters] = useState(false);

  const bikeTypes = [
    'all',
    'mountain',
    'road',
    'electric',
    'hybrid',
    'cruiser',
    'kids',
    'folding'
  ];

  return (
    <>
      <ProductFilters
        selectedCategory={selectedType}
        onCategoryChange={setSelectedType}
        categories={bikeTypes}
        priceSort={priceSort}
        onPriceSortChange={setPriceSort}
        onMobileFiltersClick={() => setShowFilters(true)}
        onAdvancedFiltersClick={() => setShowFilters(true)}
        sticky={true}
      />

      <ProductGrid
        products={getFilteredBikes(selectedType, priceSort)}
        renderCard={(bike) => <ProductCard product={bike} />}
      />

      <FilterDrawer
        isOpen={showFilters}
        setIsOpen={setShowFilters}
        filters={advancedFilters}
      />
    </>
  );
}
```

## Price Sorting

```tsx
// Apply price sorting to your products
const sortedBikes = useMemo(() => {
  if (priceSort === 'asc') {
    return [...bikes].sort((a, b) => a.dailyRate - b.dailyRate);
  }
  if (priceSort === 'desc') {
    return [...bikes].sort((a, b) => b.dailyRate - a.dailyRate);
  }
  return bikes;
}, [bikes, priceSort]);
```

## Category Filtering

```tsx
// Filter products by category
const filteredBikes = bikes.filter(bike =>
  selectedCategory === 'all' || bike.type === selectedCategory
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| selectedCategory | string | required | Currently selected category |
| onCategoryChange | (category: string) => void | required | Category change handler |
| categories | string[] | required | Available categories |
| priceSort | 'none' \| 'asc' \| 'desc' | required | Current price sort |
| onPriceSortChange | (sort) => void | required | Price sort handler |
| onAdvancedFiltersClick | () => void | undefined | Advanced filters handler |
| onMobileFiltersClick | () => void | undefined | Mobile filters handler |
| sticky | boolean | true | Enable sticky positioning |
| className | string | undefined | Additional CSS classes |

## Behavior

### Category Pills
- First 5 categories show as pills
- Additional categories in "More" dropdown
- Active category highlighted in accent color

### Price Sorting
- Default: No sorting
- Ascending: Low to High
- Descending: High to Low

### Responsive
- Desktop: Shows advanced filters button
- Mobile: Shows mobile filters button
- Pills wrap on smaller screens

## Dependencies
- shadcn/ui - Button, Dropdown
- `lucide-react` - Icons
- Tailwind CSS - Styling
