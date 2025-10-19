# DatePickerField

Complete date picker field with label, calendar popover, and validation.

## Features
✅ Calendar popover interface
✅ Date formatting (e.g., "January 19, 2025")
✅ Min/max date constraints
✅ Custom disabled dates
✅ Required field indicator
✅ Error message display
✅ Accessible label
✅ Customizable placeholder

## Usage

```tsx
import { DatePickerField } from '@siso/ui-library/bike-rental/booking/DatePickerField';

const [startDate, setStartDate] = useState<Date>();

<DatePickerField
  id="pickup-date"
  label="Pickup Date"
  date={startDate}
  setDate={setStartDate}
  minDate={new Date()}
  required
/>
```

## Bike Rental Example

```tsx
function BikeBookingForm() {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  return (
    <>
      <DatePickerField
        id="pickup"
        label="Pickup Date"
        date={pickupDate}
        setDate={setPickupDate}
        minDate={new Date()}
        placeholder="When do you need the bike?"
        required
      />

      <DatePickerField
        id="return"
        label="Return Date"
        date={returnDate}
        setDate={setReturnDate}
        minDate={pickupDate || new Date()}
        placeholder="When will you return it?"
        required
      />
    </>
  );
}
```

## Disable Specific Dates

```tsx
<DatePickerField
  id="booking-date"
  label="Booking Date"
  date={selectedDate}
  setDate={setSelectedDate}
  disabledDates={(date) => {
    // Disable weekends
    const day = date.getDay();
    return day === 0 || day === 6;
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Input field ID |
| label | string | required | Field label text |
| date | Date \| undefined | required | Selected date |
| setDate | (date?: Date) => void | required | Date change handler |
| minDate | Date | undefined | Minimum selectable date |
| maxDate | Date | undefined | Maximum selectable date |
| className | string | undefined | Additional CSS classes |
| disabledDates | (date: Date) => boolean | undefined | Custom date disable function |
| placeholder | string | 'Select date' | Placeholder text |
| required | boolean | false | Show required indicator |
| error | string | undefined | Error message to display |

## Validation

```tsx
const [dateError, setDateError] = useState('');

<DatePickerField
  id="date"
  label="Rental Date"
  date={date}
  setDate={setDate}
  error={dateError}
  required
/>
```

## Dependencies
- `date-fns` - Date formatting
- `lucide-react` - Calendar icon
- shadcn/ui - Button, Calendar, Popover, Label
