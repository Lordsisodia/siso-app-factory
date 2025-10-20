// TODO: Replace with actual Supabase client integration
declare const supabase: any;

import type { AdminCustomer } from './types';
import { generatePlaceholderEmail } from './types';

// Function to fetch all customers
export const fetchAllCustomers = async (): Promise<AdminCustomer[]> => {
  // First get all profiles
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  if (profilesError) {
    console.error('Error fetching customers:', profilesError);
    throw profilesError;
  }

  // Then get booking counts and spending for each user
  const { data: bookingsData, error: bookingsError } = await supabase
    .from('bookings')
    .select('user_id, total_price');

  if (bookingsError) {
    console.error('Error fetching booking data:', bookingsError);
    throw bookingsError;
  }

  // Process and combine the data
  const bookingsByUser = bookingsData.reduce((acc: Record<string, { count: number, total: number }>, booking) => {
    const userId = booking.user_id;
    if (!userId) return acc;

    if (!acc[userId]) {
      acc[userId] = { count: 0, total: 0 };
    }

    acc[userId].count += 1;
    acc[userId].total += booking.total_price;

    return acc;
  }, {});

  return profilesData.map(profile => {
    // Generate a placeholder email based on profile data
    const email = generatePlaceholderEmail(profile);

    return {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: email,
      phone: profile.phone,
      created_at: profile.created_at,
      bookings_count: bookingsByUser[profile.id]?.count || 0,
      total_spent: bookingsByUser[profile.id]?.total || 0
    };
  });
};
