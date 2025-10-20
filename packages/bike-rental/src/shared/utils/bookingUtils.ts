/**
 * Booking/Reservation utility functions
 * Database operations for creating, fetching, and managing bookings
 */

export interface BookingData {
  productId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  userInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Booking {
  id: string;
  productId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  product?: any;
}

/**
 * Create a new booking/reservation
 * @param bookingData Booking details
 * @param createFunction Custom database insert function
 * @returns Created booking
 */
export const createBooking = async (
  bookingData: BookingData,
  createFunction: (data: BookingData) => Promise<any>
): Promise<any> => {
  try {
    const result = await createFunction(bookingData);
    return result;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Fetch user's bookings
 * @param userId User ID
 * @param fetchFunction Custom database query function
 * @returns Array of bookings
 */
export const fetchUserBookings = async (
  userId: string,
  fetchFunction: (userId: string) => Promise<Booking[]>
): Promise<Booking[]> => {
  try {
    const bookings = await fetchFunction(userId);
    return bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};

/**
 * Cancel a booking
 * @param bookingId Booking ID
 * @param userId User ID (for verification)
 * @param cancelFunction Custom cancel function
 * @returns Updated booking
 */
export const cancelBooking = async (
  bookingId: string,
  userId: string,
  cancelFunction: (bookingId: string, userId: string) => Promise<any>
): Promise<any> => {
  try {
    const result = await cancelFunction(bookingId, userId);
    return result;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

/**
 * Calculate booking total price
 * @param startDate Start date
 * @param endDate End date
 * @param dailyRate Daily rate
 * @param additionalFees Optional additional fees
 * @returns Total price
 */
export const calculateBookingTotal = (
  startDate: Date,
  endDate: Date,
  dailyRate: number,
  additionalFees: number = 0
): number => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysCount = days > 0 ? days : 1;
  return (dailyRate * daysCount) + additionalFees;
};

/**
 * Get booking status color
 * @param status Booking status
 * @returns Tailwind color classes
 */
export const getBookingStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-600';
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'completed':
      return 'bg-blue-100 text-blue-600';
    case 'cancelled':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
