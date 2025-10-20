// Types for admin data
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

// Helper function to generate placeholder emails based on profile data
export const generatePlaceholderEmail = (profile: { first_name?: string | null, last_name?: string | null, id?: string }): string => {
  return `${profile.first_name || 'user'}.${profile.last_name || profile.id?.substring(0, 4)}@example.com`;
};
