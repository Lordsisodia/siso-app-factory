# FilterDrawer

Mobile-friendly filter drawer with checkbox groups for advanced filtering.

## Features
✅ Mobile drawer/sheet UI
✅ Multiple filter groups
✅ Checkbox selections
✅ Apply/Reset/Cancel buttons
✅ Scrollable content
✅ Customizable titles

## Usage

```tsx
import { FilterDrawer } from '@siso/ui-library/bike-rental/filters/FilterDrawer';

const [showFilters, setShowFilters] = useState(false);
const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

<FilterDrawer
  isOpen={showFilters}
  setIsOpen={setShowFilters}
  filterGroups={[
    {
      id: 'brands',
      title: 'Brand',
      options: [
        { id: 'trek', label: 'Trek', value: 'trek', checked: selectedBrands.includes('trek') },
        { id: 'specialized', label: 'Specialized', value: 'specialized', checked: selectedBrands.includes('specialized') }
      ]
    },
    {
      id: 'types',
      title: 'Bike Type',
      options: [
        { id: 'mountain', label: 'Mountain', value: 'mountain', checked: selectedTypes.includes('mountain') },
        { id: 'road', label: 'Road', value: 'road', checked: selectedTypes.includes('road') }
      ]
    }
  ]}
  onFilterChange={(groupId, value, checked) => {
    if (groupId === 'brands') {
      setSelectedBrands(checked
        ? [...selectedBrands, value]
        : selectedBrands.filter(b => b !== value)
      );
    }
  }}
  onApply={() => applyFilters()}
  onReset={() => resetFilters()}
/>
```

## Bike Rental Example

```tsx
function BikesPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    types: [],
    sizes: [],
    features: []
  });

  const filterGroups = [
    {
      id: 'brands',
      title: 'Brand',
      options: [
        { id: 'trek', label: 'Trek', value: 'trek', checked: filters.brands.includes('trek') },
        { id: 'specialized', label: 'Specialized', value: 'specialized', checked: filters.brands.includes('specialized') },
        { id: 'cannondale', label: 'Cannondale', value: 'cannondale', checked: filters.brands.includes('cannondale') },
        { id: 'giant', label: 'Giant', value: 'giant', checked: filters.brands.includes('giant') }
      ]
    },
    {
      id: 'types',
      title: 'Bike Type',
      options: [
        { id: 'mountain', label: 'Mountain Bike', value: 'mountain', checked: filters.types.includes('mountain') },
        { id: 'road', label: 'Road Bike', value: 'road', checked: filters.types.includes('road') },
        { id: 'electric', label: 'E-Bike', value: 'electric', checked: filters.types.includes('electric') },
        { id: 'hybrid', label: 'Hybrid', value: 'hybrid', checked: filters.types.includes('hybrid') }
      ]
    },
    {
      id: 'sizes',
      title: 'Frame Size',
      options: [
        { id: 'small', label: 'Small (15"-17")', value: 'small', checked: filters.sizes.includes('small') },
        { id: 'medium', label: 'Medium (17"-19")', value: 'medium', checked: filters.sizes.includes('medium') },
        { id: 'large', label: 'Large (19"-21")', value: 'large', checked: filters.sizes.includes('large') }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      options: [
        { id: 'disc-brakes', label: 'Disc Brakes', value: 'disc-brakes', checked: filters.features.includes('disc-brakes') },
        { id: 'suspension', label: 'Full Suspension', value: 'suspension', checked: filters.features.includes('suspension') },
        { id: 'electric-assist', label: 'Electric Assist', value: 'electric-assist', checked: filters.features.includes('electric-assist') }
      ]
    }
  ];

  return (
    <>
      <ProductFilters
        onMobileFiltersClick={() => setFiltersOpen(true)}
        {...otherProps}
      />

      <FilterDrawer
        isOpen={filtersOpen}
        setIsOpen={setFiltersOpen}
        filterGroups={filterGroups}
        onFilterChange={(groupId, value, checked) => {
          setFilters(prev => ({
            ...prev,
            [groupId]: checked
              ? [...prev[groupId], value]
              : prev[groupId].filter(v => v !== value)
          }));
        }}
        onApply={() => {
          // Apply filters and close drawer
          applyFiltersToProducts();
        }}
        onReset={() => {
          setFilters({
            brands: [],
            types: [],
            sizes: [],
            features: []
          });
        }}
        title="Filter Bikes"
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Drawer open state |
| setIsOpen | (isOpen: boolean) => void | required | Open state setter |
| filterGroups | FilterGroup[] | required | Filter groups with options |
| onFilterChange | (groupId, value, checked) => void | required | Filter change handler |
| onApply | () => void | undefined | Apply button handler |
| onReset | () => void | undefined | Reset button handler |
| applyButtonText | string | 'Apply Filters' | Apply button text |
| resetButtonText | string | 'Reset' | Reset button text |
| title | string | 'Filter Options' | Drawer title |

### FilterGroup Type
```typescript
{
  id: string;              // Group identifier
  title: string;           // Group title
  options: FilterOption[]; // Filter options
  type?: 'checkbox' | 'radio';
}
```

### FilterOption Type
```typescript
{
  id: string;       // Option identifier
  label: string;    // Display label
  value: string;    // Option value
  checked?: boolean; // Checked state
}
```

## Dependencies
- shadcn/ui - Drawer, Checkbox, Button, Label
