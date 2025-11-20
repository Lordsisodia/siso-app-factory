# ReservationSummary

Display booking/reservation price breakdown with dates, duration, and total cost.

## Features
✅ Automatic duration calculation
✅ Price breakdown
✅ Additional fees support
✅ Custom total calculation
✅ Currency customization
✅ Toggle duration display

## Usage

```tsx
import { ReservationSummary } from '@siso/ui-library/bike-rental/cards/ReservationSummary';

<ReservationSummary
  startDate={pickupDate}
  endDate={returnDate}
  pricePerDay={25}
  currency="$"
/>
```

## Bike Rental Example

```tsx
<ReservationSummary
  startDate={rentalStart}
  endDate={rentalEnd}
  pricePerDay={bike.dailyRate}
  currency="$"
  additionalFees={[
    { label: 'Helmet Rental', amount: 5 },
    { label: 'Insurance', amount: 10 },
    { label: 'Lock & Basket', amount: 3 }
  ]}
  showDuration={true}
/>
```

**Output**:
```
Duration          3 days
Daily Rate        $25
Subtotal (3 days) $75
Helmet Rental     $5
Insurance         $10
Lock & Basket     $3
────────────────────────
Total             $93
```

## Custom Calculation

```tsx
<ReservationSummary
  startDate={start}
  endDate={end}
  pricePerDay={30}
  calculateTotal={(days, rate) => {
    // Weekend discount
    if (days >= 7) {
      return days * rate * 0.85; // 15% off weekly
    }
    return days * rate;
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| startDate | Date | undefined | Rental start date |
| endDate | Date | undefined | Rental end date |
| pricePerDay | number | required | Daily rental rate |
| currency | string | '$' | Currency symbol |
| calculateTotal | (days, rate) => number | undefined | Custom total calculation |
| additionalFees | AdditionalFee[] | [] | Extra charges |
| showDuration | boolean | true | Show/hide duration |
| className | string | '' | Additional CSS classes |

### AdditionalFee Type
```typescript
{
  label: string;  // Fee description
  amount: number; // Fee amount
}
```

## Examples

### Simple Booking
```tsx
<ReservationSummary
  startDate={new Date('2025-01-20')}
  endDate={new Date('2025-01-22')}
  pricePerDay={35}
/>
```

### With Insurance
```tsx
<ReservationSummary
  startDate={pickupDate}
  endDate={returnDate}
  pricePerDay={bikeRate}
  additionalFees={[
    { label: 'Damage Insurance', amount: 15 },
    { label: 'Theft Protection', amount: 10 }
  ]}
/>
```

## Dependencies
None - Pure React component
