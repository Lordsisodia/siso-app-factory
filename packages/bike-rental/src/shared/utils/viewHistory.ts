/**
 * View history and favorites management utilities
 * Handles localStorage tracking for recently viewed and favorite products
 */

const MAX_RECENT_ITEMS = 6;

// ============================================================================
// RECENTLY VIEWED
// ============================================================================

/**
 * Add product to recently viewed list
 * @param product Product to add
 * @param storageKey Custom localStorage key
 */
export const addToRecentlyViewed = <T extends { id: string }>(
  product: T,
  storageKey: string = 'recentlyViewedProducts'
): void => {
  try {
    const recent: T[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Remove if already exists
    const filtered = recent.filter((item) => item.id !== product.id);

    // Add to beginning
    const updated = [product, ...filtered].slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Notify other tabs
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error updating recently viewed:', error);
  }
};

/**
 * Get recently viewed products
 * @param storageKey Custom localStorage key
 * @returns Array of recently viewed products
 */
export const getRecentlyViewed = <T,>(
  storageKey: string = 'recentlyViewedProducts'
): T[] => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (error) {
    console.error('Error getting recently viewed:', error);
    return [];
  }
};

/**
 * Clear recently viewed list
 * @param storageKey Custom localStorage key
 */
export const clearRecentlyViewed = (
  storageKey: string = 'recentlyViewedProducts'
): void => {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event('storage'));
};

// ============================================================================
// FAVORITES
// ============================================================================

/**
 * Add product to favorites
 * @param product Product to favorite
 * @param storageKey Custom localStorage key
 */
export const addToFavorites = <T extends { id: string }>(
  product: T,
  storageKey: string = 'favoriteProducts'
): void => {
  try {
    const favorites: T[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Check if already favorited
    if (favorites.some((item) => item.id === product.id)) {
      return;
    }

    // Add to favorites
    const updated = [...favorites, product];
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Notify other tabs
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

/**
 * Remove product from favorites
 * @param productId Product ID to remove
 * @param storageKey Custom localStorage key
 */
export const removeFromFavorites = <T extends { id: string }>(
  productId: string,
  storageKey: string = 'favoriteProducts'
): void => {
  try {
    const favorites: T[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Remove from favorites
    const updated = favorites.filter((item) => item.id !== productId);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Notify other tabs
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

/**
 * Check if product is favorited
 * @param productId Product ID to check
 * @param storageKey Custom localStorage key
 * @returns True if favorited
 */
export const isFavorite = (
  productId: string,
  storageKey: string = 'favoriteProducts'
): boolean => {
  try {
    const favorites: any[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return favorites.some((item) => item.id === productId);
  } catch (error) {
    console.error('Error checking if favorite:', error);
    return false;
  }
};

/**
 * Get all favorite products
 * @param storageKey Custom localStorage key
 * @returns Array of favorite products
 */
export const getFavorites = <T,>(
  storageKey: string = 'favoriteProducts'
): T[] => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

/**
 * Clear all favorites
 * @param storageKey Custom localStorage key
 */
export const clearFavorites = (
  storageKey: string = 'favoriteProducts'
): void => {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event('storage'));
};
