// TODO: Replace with actual Supabase client integration
declare const supabase: any;

import type { Car } from '../types/car';
import { checkCarAvailability } from './carUtils';

/**
 * Fetches all cars from the database
 * @returns Promise with array of cars
 */
export const fetchCars = async (): Promise<Car[]> => {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('daily_rate', { ascending: false });

  if (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }

  return data?.map(car => ({
    id: car.id,
    name: car.name,
    brand: car.brand,
    image: car.image,
    dailyRate: car.daily_rate,
    category: car.category,
    specs: {
      seats: car.seats,
      doors: car.doors,
      transmission: car.transmission,
      engine: car.engine,
      speed: car.speed
    }
  })) || [];
};

/**
 * Creates a booking in the database
 * @param carId ID of the car being booked
 * @param userId ID of the user making the booking
 * @param startDate Start date of the booking
 * @param endDate End date of the booking
 * @param totalPrice Total price of the booking
 * @returns Promise with the created booking
 */
export const createBooking = async (
  carId: string,
  startDate: Date,
  endDate: Date,
  totalPrice: number,
  userData: { name: string, email: string, phone: string }
) => {
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('User must be logged in to create a booking');
  }

  // Check if car is available for the requested dates
  const isAvailable = await checkCarAvailability(carId, startDate, endDate);
  if (!isAvailable) {
    throw new Error('Car is not available for the selected dates');
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      car_id: carId,
      user_id: session.user.id,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      total_price: totalPrice,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  // Update user profile with their information
  await supabase
    .from('profiles')
    .update({
      first_name: userData.name.split(' ')[0],
      last_name: userData.name.split(' ').slice(1).join(' '),
      phone: userData.phone
    })
    .eq('id', session.user.id);

  return data;
};

/**
 * Fetches all bookings for the current user
 * @returns Promise with array of bookings
 */
export const fetchUserBookings = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return [];
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      cars (*)
    `)
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }

  return data || [];
};

/**
 * Cancels a booking by ID
 * @param bookingId ID of the booking to cancel
 * @returns Promise with the updated booking
 */
export const cancelBooking = async (bookingId: string) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('User must be logged in to cancel a booking');
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .eq('user_id', session.user.id) // Ensure the booking belongs to the current user
    .select()
    .single();

  if (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }

  return data;
};

/**
 * Seeds the cars table with sample data from assets/cars.ts
 * This is for development purposes
 */
export const seedCars = async () => {
  const { data: existingCars } = await supabase
    .from('cars')
    .select('id')
    .limit(1);

  // Only seed if no cars exist
  if (existingCars && existingCars.length > 0) {
    console.log('Cars already exist, skipping seed');
    return;
  }

  // TODO: Import cars from assets
  // const { cars } = await import('../assets/cars');

  // Map cars to the database schema
  const carsToInsert = [] as any[]; // cars.map(car => ({ ... }));

  const { error } = await supabase
    .from('cars')
    .insert(carsToInsert);

  if (error) {
    console.error('Error seeding cars:', error);
    throw error;
  }

  console.log('Successfully seeded cars');
};
