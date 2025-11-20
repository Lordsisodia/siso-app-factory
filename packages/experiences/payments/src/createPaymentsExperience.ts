export interface ActionResult<T> {
  isSuccess: boolean
  message: string
  data?: T
}

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded'
export type PaymentMethod = 'card' | 'paypal' | 'bank_transfer'

export interface PaymentTransaction {
  id: string
  stripePaymentIntentId?: string
  bookingId: string
  userId: string
  activityId: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  cardLast4?: string
  cardBrand?: string
  customerName: string
  customerEmail: string
  activityTitle: string
  createdAt: string
  updatedAt: string
  refundedAt?: string
  refundAmount?: number
  fees: {
    stripeFee: number
    applicationFee: number
    netAmount: number
  }
}

export interface PaymentStats {
  totalRevenue: number
  totalTransactions: number
  successfulPayments: number
  failedPayments: number
  refundedPayments: number
  averageTransactionValue: number
  monthlyRevenue: number
  monthlyGrowth: number
  topPaymentMethod: string
  totalFees: number
  netRevenue: number
}

export interface RevenueBreakdown {
  daily: Array<{
    date: string
    revenue: number
    transactions: number
    fees: number
  }>
  monthly: Array<{
    month: string
    revenue: number
    transactions: number
    fees: number
    refunds: number
  }>
  byActivity: Array<{
    activityId: string
    activityTitle: string
    revenue: number
    transactions: number
    averageValue: number
  }>
  byPaymentMethod: Array<{
    method: string
    revenue: number
    transactions: number
    percentage: number
  }>
}

export interface RefundRequest {
  id: string
  transactionId: string
  bookingId: string
  requestedBy: string
  reason: string
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'processed'
  requestedAt: string
  processedAt?: string
  processedBy?: string
  notes?: string
}

export interface ExportResult {
  downloadUrl: string
  filename: string
}

export interface PaymentsProvider {
  getStats?: () => Promise<PaymentStats>
  getTransactions?: () => Promise<PaymentTransaction[]>
  getRevenueBreakdown?: (days: number) => Promise<RevenueBreakdown>
  getRefundRequests?: () => Promise<RefundRequest[]>
  processRefund?: (refundId: string, action: 'approve' | 'reject', notes?: string) => Promise<RefundRequest>
  exportPaymentData?: (startDate: string, endDate: string, format: 'csv' | 'xlsx') => Promise<ExportResult>
}

export interface PaymentsExperienceConfig {
  provider?: PaymentsProvider
}

export interface PaymentsExperienceActions {
  getPaymentStatsAction: () => Promise<ActionResult<PaymentStats>>
  getPaymentTransactionsAction: (
    status?: PaymentStatus,
    limit?: number
  ) => Promise<ActionResult<PaymentTransaction[]>>
  getRevenueBreakdownAction: (days?: number) => Promise<ActionResult<RevenueBreakdown>>
  getRefundRequestsAction: (
    status?: RefundRequest['status']
  ) => Promise<ActionResult<RefundRequest[]>>
  processRefundAction: (
    refundId: string,
    action: 'approve' | 'reject',
    notes?: string
  ) => Promise<ActionResult<RefundRequest>>
  exportPaymentDataAction: (
    startDate: string,
    endDate: string,
    format?: 'csv' | 'xlsx'
  ) => Promise<ActionResult<ExportResult>>
}

export function createPaymentsExperience(config: PaymentsExperienceConfig = {}): PaymentsExperienceActions {
  const sampleProvider = createSamplePaymentsProvider()
  const provider = {
    ...sampleProvider,
    ...config.provider
  } as Required<PaymentsProvider>

  async function getPaymentStatsAction(): Promise<ActionResult<PaymentStats>> {
    try {
      const stats = await provider.getStats()
      return success('Payment stats retrieved successfully', stats)
    } catch (error) {
      console.error('Error getting payment stats:', error)
      return failure('Failed to get payment stats')
    }
  }

  async function getPaymentTransactionsAction(
    status?: PaymentStatus,
    limit = 50
  ): Promise<ActionResult<PaymentTransaction[]>> {
    try {
      const transactions = await provider.getTransactions()
      const filtered = status ? transactions.filter(tx => tx.status === status) : transactions
      return success(
        `Retrieved ${Math.min(filtered.length, limit)} payment transactions`,
        filtered.slice(0, limit)
      )
    } catch (error) {
      console.error('Error getting payment transactions:', error)
      return failure('Failed to get payment transactions')
    }
  }

  async function getRevenueBreakdownAction(days = 30): Promise<ActionResult<RevenueBreakdown>> {
    try {
      const breakdown = await provider.getRevenueBreakdown(days)
      return success('Revenue breakdown retrieved successfully', breakdown)
    } catch (error) {
      console.error('Error getting revenue breakdown:', error)
      return failure('Failed to get revenue breakdown')
    }
  }

  async function getRefundRequestsAction(
    status?: RefundRequest['status']
  ): Promise<ActionResult<RefundRequest[]>> {
    try {
      const requests = await provider.getRefundRequests()
      const filtered = status ? requests.filter(req => req.status === status) : requests
      return success(`Retrieved ${filtered.length} refund requests`, filtered)
    } catch (error) {
      console.error('Error getting refund requests:', error)
      return failure('Failed to get refund requests')
    }
  }

  async function processRefundAction(
    refundId: string,
    action: 'approve' | 'reject',
    notes?: string
  ): Promise<ActionResult<RefundRequest>> {
    try {
      const updated = await provider.processRefund(refundId, action, notes)
      return success(`Refund request ${action}d successfully`, updated)
    } catch (error) {
      console.error('Error processing refund:', error)
      return failure('Failed to process refund request')
    }
  }

  async function exportPaymentDataAction(
    startDate: string,
    endDate: string,
    format: 'csv' | 'xlsx' = 'csv'
  ): Promise<ActionResult<ExportResult>> {
    try {
      const result = await provider.exportPaymentData(startDate, endDate, format)
      return success('Payment data export generated successfully', result)
    } catch (error) {
      console.error('Error exporting payment data:', error)
      return failure('Failed to export payment data')
    }
  }

  return {
    getPaymentStatsAction,
    getPaymentTransactionsAction,
    getRevenueBreakdownAction,
    getRefundRequestsAction,
    processRefundAction,
    exportPaymentDataAction
  }
}

function success<T>(message: string, data: T): ActionResult<T> {
  return { isSuccess: true, message, data }
}

function failure<T = never>(message: string): ActionResult<T> {
  return { isSuccess: false, message }
}

function createSamplePaymentsProvider(): Required<PaymentsProvider> {
  const transactions = sampleTransactions()
  const refundRequests = sampleRefundRequests()

  return {
    async getStats() {
      return sampleStats()
    },
    async getTransactions() {
      return transactions
    },
    async getRevenueBreakdown(days: number) {
      return sampleRevenueBreakdown(days)
    },
    async getRefundRequests() {
      return refundRequests
    },
    async processRefund(refundId, action, notes) {
      const index = refundRequests.findIndex(refund => refund.id === refundId)
      if (index === -1) {
        throw new Error('Refund request not found')
      }

      refundRequests[index] = {
        ...refundRequests[index],
        status: action === 'approve' ? 'approved' : 'rejected',
        processedAt: new Date().toISOString(),
        processedBy: 'admin-demo',
        notes: notes ?? refundRequests[index].notes
      }

      return refundRequests[index]
    },
    async exportPaymentData(startDate, endDate, format) {
      const filename = `payments_${startDate}_to_${endDate}.${format}`
      return {
        filename,
        downloadUrl: `https://exports.siso-demo.com/${filename}`
      }
    }
  }
}

function sampleStats(): PaymentStats {
  return {
    totalRevenue: 47892.5,
    totalTransactions: 234,
    successfulPayments: 218,
    failedPayments: 12,
    refundedPayments: 4,
    averageTransactionValue: 204.67,
    monthlyRevenue: 15847.5,
    monthlyGrowth: 18.3,
    topPaymentMethod: 'card',
    totalFees: 2394.63,
    netRevenue: 45497.87
  }
}

function sampleTransactions(): PaymentTransaction[] {
  const now = Date.now()
  return [
    {
      id: 'txn-1',
      stripePaymentIntentId: 'pi_1234567890abcdef',
      bookingId: 'booking-1',
      userId: 'user-1',
      activityId: 'activity-1',
      amount: 89,
      currency: 'EUR',
      status: 'succeeded',
      paymentMethod: 'card',
      cardLast4: '4242',
      cardBrand: 'visa',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      activityTitle: 'Coasteering Adventure in Mallorca',
      createdAt: new Date(now - 2 * 86400000).toISOString(),
      updatedAt: new Date(now - 2 * 86400000).toISOString(),
      fees: { stripeFee: 2.89, applicationFee: 0.89, netAmount: 85.22 }
    },
    {
      id: 'txn-2',
      stripePaymentIntentId: 'pi_2345678901bcdefg',
      bookingId: 'booking-2',
      userId: 'user-2',
      activityId: 'activity-2',
      amount: 125,
      currency: 'EUR',
      status: 'succeeded',
      paymentMethod: 'card',
      cardLast4: '1234',
      cardBrand: 'mastercard',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      activityTitle: "Sailing Experience in Port d'Andratx",
      createdAt: new Date(now - 3 * 86400000).toISOString(),
      updatedAt: new Date(now - 3 * 86400000).toISOString(),
      fees: { stripeFee: 3.88, applicationFee: 1.25, netAmount: 119.87 }
    },
    {
      id: 'txn-3',
      stripePaymentIntentId: 'pi_3456789012cdefgh',
      bookingId: 'booking-3',
      userId: 'user-3',
      activityId: 'activity-3',
      amount: 75,
      currency: 'EUR',
      status: 'failed',
      paymentMethod: 'card',
      cardLast4: '5678',
      cardBrand: 'visa',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.wilson@email.com',
      activityTitle: 'Hiking in Serra de Tramuntana',
      createdAt: new Date(now - 5 * 86400000).toISOString(),
      updatedAt: new Date(now - 5 * 86400000).toISOString(),
      fees: { stripeFee: 0, applicationFee: 0, netAmount: 0 }
    },
    {
      id: 'txn-4',
      stripePaymentIntentId: 'pi_4567890123defghi',
      bookingId: 'booking-4',
      userId: 'user-4',
      activityId: 'activity-4',
      amount: 95,
      currency: 'EUR',
      status: 'refunded',
      paymentMethod: 'card',
      cardLast4: '9876',
      cardBrand: 'amex',
      customerName: 'Emma Davis',
      customerEmail: 'emma.davis@email.com',
      activityTitle: 'Cultural Tour of Palma',
      createdAt: new Date(now - 7 * 86400000).toISOString(),
      updatedAt: new Date(now - 86400000).toISOString(),
      refundedAt: new Date(now - 86400000).toISOString(),
      refundAmount: 95,
      fees: { stripeFee: 3.13, applicationFee: 0.95, netAmount: 90.92 }
    },
    {
      id: 'txn-5',
      stripePaymentIntentId: 'pi_5678901234efghij',
      bookingId: 'booking-5',
      userId: 'user-5',
      activityId: 'activity-5',
      amount: 110,
      currency: 'EUR',
      status: 'succeeded',
      paymentMethod: 'paypal',
      customerName: 'David Brown',
      customerEmail: 'david.brown@email.com',
      activityTitle: 'Boat Trip to Cabrera Island',
      createdAt: new Date(now - 10 * 86400000).toISOString(),
      updatedAt: new Date(now - 10 * 86400000).toISOString(),
      fees: { stripeFee: 3.52, applicationFee: 1.1, netAmount: 105.38 }
    }
  ]
}

function sampleRevenueBreakdown(days: number): RevenueBreakdown {
  const daily: RevenueBreakdown['daily'] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseRevenue = isWeekend ? 800 : 500
    const variance = Math.random() * 400 - 200
    const revenue = Math.max(0, baseRevenue + variance)
    const transactions = Math.floor(revenue / 89) + Math.floor(Math.random() * 3)
    const fees = revenue * 0.05

    daily.push({
      date: date.toISOString().split('T')[0],
      revenue: round(revenue),
      transactions,
      fees: round(fees)
    })
  }

  return {
    daily,
    monthly: [
      { month: 'Jan', revenue: 12905, transactions: 145, fees: 645.25, refunds: 2 },
      { month: 'Feb', revenue: 14863, transactions: 167, fees: 743.15, refunds: 1 },
      { month: 'Mar', revenue: 16821, transactions: 189, fees: 841.05, refunds: 3 },
      { month: 'Apr', revenue: 18067, transactions: 203, fees: 903.35, refunds: 2 },
      { month: 'May', revenue: 15842, transactions: 178, fees: 792.1, refunds: 4 },
      { month: 'Jun', revenue: 13884, transactions: 156, fees: 694.2, refunds: 1 }
    ],
    byActivity: [
      {
        activityId: 'activity-1',
        activityTitle: 'Coasteering Adventure in Mallorca',
        revenue: 4005,
        transactions: 45,
        averageValue: 89
      },
      {
        activityId: 'activity-2',
        activityTitle: "Sailing Experience in Port d'Andratx",
        revenue: 4000,
        transactions: 32,
        averageValue: 125
      },
      {
        activityId: 'activity-3',
        activityTitle: 'Hiking in Serra de Tramuntana',
        revenue: 2100,
        transactions: 28,
        averageValue: 75
      },
      {
        activityId: 'activity-4',
        activityTitle: 'Cultural Tour of Palma',
        revenue: 3610,
        transactions: 38,
        averageValue: 95
      },
      {
        activityId: 'activity-5',
        activityTitle: 'Boat Trip to Cabrera Island',
        revenue: 2420,
        transactions: 22,
        averageValue: 110
      }
    ],
    byPaymentMethod: [
      { method: 'card', revenue: 38314, transactions: 187, percentage: 80 },
      { method: 'paypal', revenue: 7156.5, transactions: 32, percentage: 14.9 },
      { method: 'bank_transfer', revenue: 2422, transactions: 15, percentage: 5.1 }
    ]
  }
}

function sampleRefundRequests(): RefundRequest[] {
  const now = Date.now()
  return [
    {
      id: 'refund-1',
      transactionId: 'txn-4',
      bookingId: 'booking-4',
      requestedBy: 'user-4',
      reason: 'Activity cancelled due to weather conditions',
      amount: 95,
      status: 'processed',
      requestedAt: new Date(now - 2 * 86400000).toISOString(),
      processedAt: new Date(now - 86400000).toISOString(),
      processedBy: 'admin-1',
      notes: 'Full refund approved due to weather cancellation policy'
    },
    {
      id: 'refund-2',
      transactionId: 'txn-6',
      bookingId: 'booking-6',
      requestedBy: 'user-6',
      reason: 'Personal emergency - unable to attend',
      amount: 125,
      status: 'pending',
      requestedAt: new Date(now - 86400000).toISOString(),
      notes: 'Customer provided medical documentation'
    },
    {
      id: 'refund-3',
      transactionId: 'txn-7',
      bookingId: 'booking-7',
      requestedBy: 'user-7',
      reason: 'Dissatisfied with service quality',
      amount: 75,
      status: 'approved',
      requestedAt: new Date(now - 3 * 86400000).toISOString(),
      processedBy: 'admin-2',
      notes: 'Partial refund approved after investigation'
    }
  ]
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}
*** End Patch
PATCH
