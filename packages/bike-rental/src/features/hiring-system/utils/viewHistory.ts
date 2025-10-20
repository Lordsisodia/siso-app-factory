import type { Car } from '../types/car';

const MAX_RECENT_CARS = 6;

// Add a car to the recently viewed list
export const addToRecentlyViewed = (car: Car): void => {
  try {
    const recentCars: Car[] = JSON.parse(localStorage.getItem('recentlyViewedCars') || '[]');

    // Remove the car if it already exists in the list
    const filteredCars = recentCars.filter((recentCar) => recentCar.id !== car.id);

    // Add the car to the beginning of the list
    const updatedRecentCars = [car, ...filteredCars].slice(0, MAX_RECENT_CARS);

    // Save the updated list to localStorage
    localStorage.setItem('recentlyViewedCars', JSON.stringify(updatedRecentCars));

    // Dispatch a storage event to notify other tabs/windows
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error updating recently viewed cars:', error);
  }
};

// Get the list of recently viewed cars
export const getRecentlyViewedCars = (): Car[] => {
  try {
    return JSON.parse(localStorage.getItem('recentlyViewedCars') || '[]');
  } catch (error) {
    console.error('Error getting recently viewed cars:', error);
    return [];
  }
};

// Clear the recently viewed cars list
export const clearRecentlyViewedCars = (): void => {
  localStorage.removeItem('recentlyViewedCars');
  window.dispatchEvent(new Event('storage'));
};

// Functions for favorites
export const addToFavorites = (car: Car): void => {
  try {
    const favorites: Car[] = JSON.parse(localStorage.getItem('favoritesCars') || '[]');

    // Check if car is already in favorites
    if (favorites.some((favCar) => favCar.id === car.id)) {
      return; // Car is already in favorites
    }

    // Add car to favorites
    const updatedFavorites = [...favorites, car];
    localStorage.setItem('favoritesCars', JSON.stringify(updatedFavorites));

    // Notify other tabs/windows
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error adding car to favorites:', error);
  }
};

export const removeFromFavorites = (carId: string): void => {
  try {
    const favorites: Car[] = JSON.parse(localStorage.getItem('favoritesCars') || '[]');

    // Remove car from favorites
    const updatedFavorites = favorites.filter((car) => car.id !== carId);
    localStorage.setItem('favoritesCars', JSON.stringify(updatedFavorites));

    // Notify other tabs/windows
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error removing car from favorites:', error);
  }
};

export const isFavorite = (carId: string): boolean => {
  try {
    const favorites: Car[] = JSON.parse(localStorage.getItem('favoritesCars') || '[]');
    return favorites.some((car) => car.id === carId);
  } catch (error) {
    console.error('Error checking if car is favorite:', error);
    return false;
  }
};
