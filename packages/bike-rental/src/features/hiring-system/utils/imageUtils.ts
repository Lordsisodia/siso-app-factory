/**
 * Utility functions for handling images, including fallbacks
 */

// Default fallback image from Unsplash that will be used if an image fails to load
export const DEFAULT_CAR_IMAGE = "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200";

/**
 * Checks if a URL is valid
 * @param url The URL to check
 * @returns True if the URL is valid, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  return url && url.startsWith('http');
};

/**
 * Handles image loading errors by setting the source to a fallback image
 * @param event The error event from the image
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
  event.currentTarget.src = DEFAULT_CAR_IMAGE;
  event.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
};
