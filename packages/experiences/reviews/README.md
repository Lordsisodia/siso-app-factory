# Reviews Experience Pack

Reusable review actions for Supabase-backed marketplaces. Pass in your Supabase client + optional notification handler and get a consistent set of review actions you can export from any template.

## Usage

```ts
import { createReviewActions } from '@siso/experiences-reviews'
import { supabaseServerClient } from '@/lib/supabase-server'
import { sendTelegramBadReviewAlertAction } from '@/actions/notifications/telegram-notifications'

const {
  getActivityReviews,
  getActivityReviewStats,
  createReview,
  updateReviewHelpfulVotes,
  getUserActivityReview,
  getUserActivityBookings
} = createReviewActions({
  supabase: supabaseServerClient,
  badReviewNotifier: sendTelegramBadReviewAlertAction
})
```

Each helper returns an `ActionResult<T>`:

```ts
interface ActionResult<T> {
  isSuccess: boolean
  message: string
  data?: T
}
```

Consumers can re-export these functions (optionally renaming with `...Action` suffix) so existing pages and API routes keep the same signatures.
