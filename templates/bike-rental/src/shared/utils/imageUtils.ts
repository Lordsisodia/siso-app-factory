/**
 * Utility functions for handling images, including fallbacks
 */

// Default fallback image - can be customized per project
export const DEFAULT_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800";

/**
 * Checks if a URL is valid
 * @param url The URL to check
 * @returns True if the URL is valid, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  return url && (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:'));
};

/**
 * Handles image loading errors by setting the source to a fallback image
 * @param event The error event from the image
 * @param fallback Optional custom fallback image
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallback: string = DEFAULT_PRODUCT_IMAGE
): void => {
  event.currentTarget.src = fallback;
  event.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
};

/**
 * Get optimized image URL with quality and size parameters
 * @param url Original image URL
 * @param width Desired width
 * @param quality Desired quality (1-100)
 * @returns Optimized URL (works with Unsplash)
 */
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  quality: number = 85
): string => {
  if (!url.includes('unsplash.com')) return url;

  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());

  return url.includes('?')
    ? `${url}&${params.toString()}`
    : `${url}?${params.toString()}`;
};

/**
 * Preload images for better UX
 * @param urls Array of image URLs to preload
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });
    })
  );
};
