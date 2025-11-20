# ReviewForm

Interactive review submission form with star rating and optional comment.

## Features
✅ Interactive star rating (hover preview + click to select)
✅ Rating labels (Poor, Fair, Good, Very good, Excellent)
✅ Optional comment textarea
✅ Form validation
✅ Submit/cancel buttons
✅ Loading states
✅ Keyboard accessible

## Usage

```tsx
import { ReviewForm } from '@siso/ui-library/bike-rental/reviews/ReviewForm';

<ReviewForm
  productName="Mountain Bike Pro"
  onSubmit={async (rating, comment) => {
    await submitReview({ rating, comment });
  }}
  onCancel={() => setShowForm(false)}
/>
```

## Bike Rental Example

```tsx
<ReviewForm
  productName={`${bike.brand} ${bike.model}`}
  onSubmit={async (rating, comment) => {
    try {
      await api.createReview({
        bikeId: bike.id,
        rating,
        comment
      });
      toast.success('Review submitted!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to submit review');
    }
  }}
  onCancel={() => setShowReviewForm(false)}
  submitButtonText="Submit Bike Review"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSubmit | (rating: number, comment?: string) => Promise<void> | required | Async function called on form submit |
| productName | string | undefined | Name of product being reviewed |
| onCancel | () => void | undefined | Cancel button callback (hides button if not provided) |
| submitButtonText | string | 'Submit Review' | Custom submit button text |
| cancelButtonText | string | 'Cancel' | Custom cancel button text |
| title | string | auto-generated | Custom card title |
| isSubmitting | boolean | undefined | External loading state control |

## Rating Labels

- 0 stars: "Click to rate"
- 1 star: "Poor"
- 2 stars: "Fair"
- 3 stars: "Good"
- 4 stars: "Very good"
- 5 stars: "Excellent"

## Validation

- Rating is required (submit button disabled if rating = 0)
- Comment is optional
- Shows error message if rating not selected

## Dependencies
- `lucide-react` - Star icon
- shadcn/ui - Card, Button, Textarea components
