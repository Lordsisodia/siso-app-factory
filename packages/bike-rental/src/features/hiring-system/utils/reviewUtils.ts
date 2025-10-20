// TODO: Replace with actual Supabase client integration
declare const supabase: any;

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
 * Fetches reviews for a specific car
 * @param carId The ID of the car to fetch reviews for
 * @returns Promise with array of reviews
 */
export const fetchCarReviews = async (carId: string): Promise<Review[]> => {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (
          first_name,
          last_name
        )
      `)
      .eq('car_id', carId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching car reviews:', error);
      throw error;
    }

    return (reviews || []).map(review => {
      // Type assertion to handle the profiles relation
      const profiles = review.profiles as { first_name?: string; last_name?: string } | null;

      return {
        ...review,
        user_name: profiles ?
          `${profiles.first_name || ''} ${profiles.last_name || ''}`.trim() || 'Anonymous'
          : 'Anonymous'
      };
    });
  } catch (error) {
    console.error('Unexpected error fetching car reviews:', error);
    throw error;
  }
};

/**
 * Fetches eligible bookings that a user can review
 * @returns Promise with array of eligible bookings
 */
export const fetchEligibleBookingsForReview = async () => {
  try {
    // Get completed bookings that don't have reviews yet
    const { data: eligibleBookings, error } = await supabase
      .from('bookings')
      .select(`
        id,
        car_id,
        start_date,
        end_date,
        cars (
          id,
          name,
          brand,
          image
        )
      `)
      .eq('status', 'completed')
      .not('id', 'in', (supabase.from('reviews').select('booking_id')))
      .order('end_date', { ascending: false });

    if (error) {
      console.error('Error fetching eligible bookings for review:', error);
      throw error;
    }

    return eligibleBookings || [];
  } catch (error) {
    console.error('Unexpected error fetching eligible bookings:', error);
    throw error;
  }
};

/**
 * Creates a new review
 * @param review The review data to submit
 * @returns Promise with the created review
 */
export const createReview = async (reviewData: {
  booking_id: string;
  car_id: string;
  rating: number;
  comment?: string;
}): Promise<Review> => {
  try {
    // Get the current user
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('User must be logged in to create a review');
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        booking_id: reviewData.booking_id,
        car_id: reviewData.car_id,
        user_id: session.user.id,
        rating: reviewData.rating,
        comment: reviewData.comment || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating review:', error);
    throw error;
  }
};

/**
 * Gets the average rating for a car
 * @param carId ID of the car
 * @returns Promise with the average rating and count
 */
export const getCarAverageRating = async (carId: string): Promise<{ average: number; count: number }> => {
  try {
    // Use RPC call for the custom function we created
    // Converting carId to string to ensure type compatibility
    const { data, error } = await supabase
      .rpc('get_car_average_rating', { car_id: carId });

    if (error) {
      console.error('Error getting car average rating:', error);
      return { average: 0, count: 0 };
    }

    // If there's no data or the data is empty, return default values
    if (!data || data.length === 0) {
      return { average: 0, count: 0 };
    }

    // Return the average and count from the first row
    return {
      average: parseFloat(data[0].average.toString()) || 0,
      count: parseInt(data[0].count.toString()) || 0
    };
  } catch (error) {
    console.error('Unexpected error getting car average rating:', error);
    return { average: 0, count: 0 };
  }
};
