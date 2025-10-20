/**
 * Admin Type Definitions
 *
 * Type definitions for admin-related data structures including
 * bookings, customers, and messages.
 */

/**
 * Admin booking representation with extended car and profile data
 */
export interface AdminBooking {
  id: string;
  car_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  cars: {
    brand: string;
    name: string;
    image: string;
  };
  profiles: {
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email: string | null;
  };
}

/**
 * Admin customer representation with booking statistics
 */
export interface AdminCustomer {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  created_at: string;
  bookings_count: number;
  total_spent: number;
}

/**
 * Admin message representation with sender/recipient details
 */
export interface AdminMessage {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_id: string;
  recipient_id: string;
  booking_id: string | null;
  sender: {
    email: string;
    profile: {
      first_name: string | null;
      last_name: string | null;
    };
  };
  recipient: {
    email: string;
    profile: {
      first_name: string | null;
      last_name: string | null;
    };
  };
  booking?: {
    id: string;
    car_id: string;
    cars: {
      brand: string;
      name: string;
    };
  };
}

/**
 * Helper function to generate placeholder emails based on profile data
 *
 * @param profile - Profile object containing first_name, last_name, and optional id
 * @returns Generated placeholder email address
 *
 * @example
 * generatePlaceholderEmail({ first_name: 'John', last_name: 'Doe' })
 * // Returns: 'john.doe@example.com'
 *
 * @example
 * generatePlaceholderEmail({ first_name: null, last_name: null, id: 'abc123' })
 * // Returns: 'user.abc1@example.com'
 */
export const generatePlaceholderEmail = (profile: {
  first_name?: string | null;
  last_name?: string | null;
  id?: string
}): string => {
  return `${profile.first_name || 'user'}.${profile.last_name || profile.id?.substring(0, 4)}@example.com`;
};
