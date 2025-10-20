// TODO: Replace with actual Supabase client integration
declare const supabase: any;

import type { AdminBooking } from './types';

// Function to fetch all bookings with user and car details
export const fetchAllBookings = async (): Promise<AdminBooking[]> => {
  const { data: bookingsData, error: bookingsError } = await supabase
    .from('bookings')
    .select(`
      *,
      cars (brand, name, image)
    `)
    .order('created_at', { ascending: false });

  if (bookingsError) {
    console.error('Error fetching bookings:', bookingsError);
    throw bookingsError;
  }

  // Get all unique user IDs from bookings
  const userIds = [...new Set(bookingsData.map(booking => booking.user_id).filter(Boolean))];

  // Fetch all profiles in a single query
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', userIds);

  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    throw profilesError;
  }

  // Create a map of user_id to profile data
  const profilesMap = new Map();
  profilesData.forEach(profile => {
    profilesMap.set(profile.id, {
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      email: `${profile.first_name || 'user'}.${profile.last_name || profile.id.substring(0, 4)}@example.com` // Generate placeholder email
    });
  });

  // Combine booking data with profile data
  const bookings: AdminBooking[] = bookingsData.map(booking => {
    const profileData = booking.user_id ? profilesMap.get(booking.user_id) : null;

    return {
      ...booking,
      profiles: profileData || {
        first_name: null,
        last_name: null,
        phone: null,
        email: null
      }
    };
  });

  return bookings;
};

// Function to update booking status
export const updateBookingStatus = async (bookingId: string, status: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};
