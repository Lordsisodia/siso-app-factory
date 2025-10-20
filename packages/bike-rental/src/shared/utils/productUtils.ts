/**
 * Product utility functions for fetching, availability checking, and product management
 * Adapted from carUtils.ts to be generic for any product type
 */

export interface AvailabilityResult {
  success: boolean;
  error?: string;
}

export interface UnavailablePeriod {
  startDate: string;
  endDate: string;
  reason: string;
}

/**
 * Check product availability for given dates
 * @param productId Product ID
 * @param startDate Start date
 * @param endDate End date
 * @param checkFunction Optional custom check function (e.g., Supabase RPC)
 * @returns Availability result
 */
export const checkProductAvailability = async (
  productId: string,
  startDate: Date,
  endDate: Date,
  checkFunction?: (productId: string, start: string, end: string) => Promise<boolean>
): Promise<AvailabilityResult> => {
  try {
    if (checkFunction) {
      const isAvailable = await checkFunction(
        productId,
        startDate.toISOString(),
        endDate.toISOString()
      );
      return { success: isAvailable };
    }

    // Default: return true if no check function provided
    return { success: true };
  } catch (error) {
    console.error('Error checking product availability:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Get product availability calendar - returns periods when product is unavailable
 * @param productId Product ID
 * @param startDate Start date for calendar
 * @param monthsAhead Number of months to look ahead
 * @param fetchFunction Custom function to fetch unavailable periods
 * @returns Array of unavailable periods
 */
export const getProductAvailabilityCalendar = async (
  productId: string,
  startDate: Date = new Date(),
  monthsAhead: number = 3,
  fetchFunction?: (productId: string, start: Date, end: Date) => Promise<UnavailablePeriod[]>
): Promise<UnavailablePeriod[]> => {
  try {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + monthsAhead);

    if (fetchFunction) {
      return await fetchFunction(productId, startDate, endDate);
    }

    return [];
  } catch (error) {
    console.error('Error getting product availability calendar:', error);
    return [];
  }
};

/**
 * Mark product as unavailable for a specific period
 * @param productId Product ID
 * @param startDate Start date
 * @param endDate End date
 * @param reason Reason for unavailability
 * @param markFunction Custom function to mark unavailable
 * @returns Success result
 */
export const markProductUnavailable = async (
  productId: string,
  startDate: Date,
  endDate: Date,
  reason: string,
  markFunction?: (productId: string, start: string, end: string, reason: string) => Promise<void>
): Promise<AvailabilityResult> => {
  try {
    if (markFunction) {
      await markFunction(
        productId,
        startDate.toISOString(),
        endDate.toISOString(),
        reason
      );
      return { success: true };
    }

    return { success: false, error: 'No mark function provided' };
  } catch (error) {
    console.error('Error marking product as unavailable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Get popular products (randomized or based on custom logic)
 * @param products Array of products
 * @param limit Number of products to return
 * @returns Limited array of products
 */
export const getPopularProducts = <T,>(products: T[], limit: number = 5): T[] => {
  // Simple random shuffle for popular products
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(limit, products.length));
};
