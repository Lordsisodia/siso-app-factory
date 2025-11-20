"use server"

import { createReviewActions } from '@siso/experiences-reviews'
import { sendTelegramBadReviewAlertAction } from '@/actions/notifications/telegram-notifications'
import { supabaseServerClient } from '@/lib/supabase-server'

const reviewActions = createReviewActions({
  supabase: supabaseServerClient,
  badReviewNotifier: sendTelegramBadReviewAlertAction
})

export const {
  getActivityReviewsAction,
  getActivityReviewStatsAction,
  createReviewAction,
  updateReviewHelpfulVotesAction,
  getUserActivityReviewAction,
  getUserActivityBookingsAction
} = reviewActions
