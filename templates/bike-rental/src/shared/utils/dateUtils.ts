/**
 * Date utility functions for booking and reservations
 */

/**
 * Calculate number of days between two dates
 * @param startDate Start date
 * @param endDate End date
 * @returns Number of days (minimum 1)
 */
export const calculateDays = (startDate: Date, endDate: Date): number => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 1;
};

/**
 * Calculate total price based on daily rate and date range
 * @param startDate Start date
 * @param endDate End date
 * @param dailyRate Daily rate
 * @returns Total price
 */
export const calculateTotalPrice = (
  startDate: Date,
  endDate: Date,
  dailyRate: number
): number => {
  const days = calculateDays(startDate, endDate);
  return dailyRate * days;
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns True if date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if date is today
 * @param date Date to check
 * @returns True if date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Format date range as string
 * @param startDate Start date
 * @param endDate End date
 * @returns Formatted string (e.g., "Jan 15 - Jan 20, 2025")
 */
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const start = startDate.toLocaleDateString('en-US', options);
  const end = endDate.toLocaleDateString('en-US', options);
  const year = endDate.getFullYear();

  return `${start} - ${end}, ${year}`;
};

/**
 * Get array of dates between start and end
 * @param startDate Start date
 * @param endDate End date
 * @returns Array of dates
 */
export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Check if two date ranges overlap
 * @param start1 First range start
 * @param end1 First range end
 * @param start2 Second range start
 * @param end2 Second range end
 * @returns True if ranges overlap
 */
export const datesOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean => {
  return start1 <= end2 && start2 <= end1;
};
