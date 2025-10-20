import { supabase } from '@/integrations/supabase/client';
import { Car } from '../types/car';

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const { data: cars, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }

    // Transform the database car object to match the Car interface
    return (cars || []).map(car => ({
      id: car.id,
      name: car.name,
      brand: car.brand,
      image: car.image,
      dailyRate: car.daily_rate,
      specs: {
        seats: car.seats,
        doors: car.doors,
        transmission: car.transmission,
        engine: car.engine,
        speed: car.speed
      },
      category: car.category
    }));
  } catch (error) {
    console.error('Unexpected error fetching cars:', error);
    throw error;
  }
};

export const checkCarAvailability = async (carId: string, startDate: Date, endDate: Date): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('is_car_available', {
      _car_id: carId,
      _start_date: startDate.toISOString(),
      _end_date: endDate.toISOString()
    });

    if (error) {
      console.error('Error checking car availability:', error);
      return { success: false, error: error.message };
    }

    return { success: data };
  } catch (error) {
    console.error('Unexpected error checking car availability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

// Get car availability calendar - returns periods when a car is unavailable
export const getCarAvailabilityCalendar = async (carId: string, startDate: Date = new Date(), monthsAhead: number = 3): Promise<Array<{ startDate: string; endDate: string; reason: string }>> => {
  try {
    // Calculate the end date for the calendar view (default: 3 months ahead)
    const endCalendarDate = new Date(startDate);
    endCalendarDate.setMonth(endCalendarDate.getMonth() + monthsAhead);

    // Fetch unavailable periods from bookings
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('start_date, end_date')
      .eq('car_id', carId)
      .gte('end_date', startDate.toISOString())
      .lte('start_date', endCalendarDate.toISOString())
      .in('status', ['confirmed', 'pending'])
      .order('start_date', { ascending: true });

    if (bookingsError) {
      console.error('Error fetching bookings for availability calendar:', bookingsError);
      throw bookingsError;
    }

    // Fetch unavailable periods from car_availability table
    const { data: manualBlocks, error: blocksError } = await supabase
      .from('car_availability')
      .select('start_date, end_date, reason')
      .eq('car_id', carId)
      .gte('end_date', startDate.toISOString())
      .lte('start_date', endCalendarDate.toISOString())
      .order('start_date', { ascending: true });

    if (blocksError) {
      console.error('Error fetching manual blocks for availability calendar:', blocksError);
      throw blocksError;
    }

    // Combine both results
    const unavailablePeriods = [
      ...(bookings || []).map(booking => ({
        startDate: booking.start_date,
        endDate: booking.end_date,
        reason: 'booking'
      })),
      ...(manualBlocks || []).map(block => ({
        startDate: block.start_date,
        endDate: block.end_date,
        reason: block.reason
      }))
    ];

    return unavailablePeriods;
  } catch (error) {
    console.error('Error getting car availability calendar:', error);
    throw error;
  }
};

// Mark a car as unavailable for a specific period
export const markCarUnavailable = async (carId: string, startDate: Date, endDate: Date, reason: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // First check if the car is available for this period
    const isAvailable = await checkCarAvailability(carId, startDate, endDate);

    if (!isAvailable.success) {
      return {
        success: false,
        error: 'Selected dates overlap with existing unavailable periods'
      };
    }

    // Insert new unavailable period
    const { error } = await supabase
      .from('car_availability')
      .insert({
        car_id: carId,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        reason
      });

    if (error) {
      console.error('Error marking car as unavailable:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error marking car as unavailable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

// Get popular cars based on booking frequency
export const getPopularCars = (cars: Car[], limit: number = 5): Car[] => {
  // In a real app, this would query a database for the most booked cars
  // For now, we'll just return the first few cars or randomize them

  // Simple random shuffle
  const shuffled = [...cars].sort(() => 0.5 - Math.random());

  // Return the first n cars (or fewer if not enough cars)
  return shuffled.slice(0, Math.min(limit, cars.length));
};
