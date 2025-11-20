/**
 * Review utility functions - complete version
 * Handles review fetching, creation, and rating calculations
 */

export interface Review {
  id: string;
  user_id: string;
  user_name?: string;
  product_id: string;
  booking_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ReviewSubmission {
  productId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
}

export interface RatingData {
  average: number;
  count: number;
}

/**
 * Fetch reviews for a product
 * @param productId Product ID
 * @param fetchFunction Custom fetch function (e.g., Supabase query)
 * @returns Array of reviews
 */
export const fetchProductReviews = async (
  productId: string,
  fetchFunction: (productId: string) => Promise<Review[]>
): Promise<Review[]> => {
  try {
    return await fetchFunction(productId);
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    return [];
  }
};

/**
 * Create a new review
 * @param reviewData Review data
 * @param createFunction Custom create function
 * @returns Created review
 */
export const createReview = async (
  reviewData: ReviewSubmission,
  createFunction: (data: ReviewSubmission) => Promise<Review>
): Promise<Review> => {
  try {
    return await createFunction(reviewData);
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

/**
 * Get average rating for a product
 * @param productId Product ID
 * @param fetchFunction Custom fetch function
 * @returns Average rating and count
 */
export const getAverageRating = async (
  productId: string,
  fetchFunction?: (productId: string) => Promise<RatingData>
): Promise<RatingData> => {
  try {
    if (fetchFunction) {
      return await fetchFunction(productId);
    }

    return { average: 0, count: 0 };
  } catch (error) {
    console.error('Error getting average rating:', error);
    return { average: 0, count: 0 };
  }
};

/**
 * Calculate average rating from reviews array
 * @param reviews Array of reviews
 * @returns Average rating and count
 */
export const calculateAverageRating = (reviews: Review[]): RatingData => {
  if (!reviews || reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = total / reviews.length;

  return {
    average: Math.round(average * 10) / 10, // Round to 1 decimal
    count: reviews.length
  };
};

/**
 * Fetch eligible bookings for review
 * @param fetchFunction Custom fetch function
 * @returns Array of bookings eligible for review
 */
export const fetchEligibleBookingsForReview = async (
  fetchFunction: () => Promise<any[]>
): Promise<any[]> => {
  try {
    return await fetchFunction();
  } catch (error) {
    console.error('Error fetching eligible bookings:', error);
    return [];
  }
};
