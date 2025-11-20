# Payments Experience Pack

Drop-in payments/checkout analytics, transaction history, refunds, and export helpers. Plug in your own provider (Stripe, Lemon Squeezy, Supabase, etc.) or use the included sample provider for demos.

```ts
import { createPaymentsExperience } from '@siso/experiences-payments'
import { stripeClient } from '@/lib/stripe'

const payments = createPaymentsExperience({
  provider: {
    async getTransactions() {
      const { data } = await stripeClient.paymentIntents.list()
      return data.map(toPaymentTransaction)
    },
    async processRefund(refundId, action) {
      await stripeClient.refunds.update(refundId, { metadata: { action } })
      return { /* ... */ }
    }
  }
})

export const {
  getPaymentStatsAction,
  getPaymentTransactionsAction,
  getRevenueBreakdownAction,
  getRefundRequestsAction,
  processRefundAction,
  exportPaymentDataAction
} = payments
```
