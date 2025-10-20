/**
 * Review Type Definitions
 *
 * Type definitions for review-related data structures
 */

/**
 * Review representation with user and booking details
 */
export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  car_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  user_name?: string;
}

/**
 * Input data for creating a new review
 */
export interface CreateReviewInput {
  booking_id: string;
  car_id: string;
  rating: number;
  comment?: string;
}

/**
 * Result of car rating aggregation
 */
export interface CarRatingStats {
  average: number;
  count: number;
}
