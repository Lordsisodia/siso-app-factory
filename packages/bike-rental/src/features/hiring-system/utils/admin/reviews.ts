// TODO: Replace with actual Supabase client integration
declare const supabase: any;

// Get all reviews with car and user information
export const fetchAllReviews = async () => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        cars (brand, name),
        profiles:user_id (first_name, last_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all reviews:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching reviews:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId: string) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      console.error('Error deleting review:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting review:', error);
    throw error;
  }
};
