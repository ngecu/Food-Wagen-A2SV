import { FoodItem, FoodFormData } from '../types/food';
import { normalizeFoodData } from './normailze';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

export const foodApi = {
  getFoods: async (search?: string): Promise<FoodItem[]> => {
    try {
      // Only add search parameter if it's provided and not empty
      const url = search && search.trim() ? 
        `${API_BASE_URL}/Food?name=${encodeURIComponent(search.trim())}` : 
        `${API_BASE_URL}/Food`;
      
      console.log('Fetching foods from:', url); // Debug log
      
      const response = await fetch(url, {
        next: { revalidate: 60 } // Cache for 60 seconds
      });
      
      if (!response.ok) {
        // If 404 or other error, return empty array instead of throwing
        if (response.status === 404) {
          console.log('No foods found, returning empty array');
          return [];
        }
        throw new Error(`Failed to fetch foods: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data); // Debug log
      const normalizedData = normalizeFoodData(data);
      console.log('Normalized data:', normalizedData); // Debug log
      return normalizedData;
    } catch (error) {
      console.error('API Error:', error);
      // Return empty array instead of throwing to prevent crashes
      return [];
    }
  },

  // ... rest of your API functions remain the same
  createFood: async (food: FoodFormData): Promise<FoodItem> => {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: food.name,
        price: food.price.toString(),
        rating: food.rating,
        image: food.image,
        restaurant_name: food.restaurant.name,
        restaurant_image: food.restaurant.logo,
        restaurant_status: food.restaurant.status,
        open: food.restaurant.status === 'Open Now',
        createdAt: new Date().toISOString()
      }),
    });
    if (!response.ok) throw new Error('Failed to create food');
    const data = await response.json();
    return normalizeFoodData([data])[0];
  },

  updateFood: async (id: string, food: FoodFormData): Promise<FoodItem> => {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: food.name,
        price: food.price.toString(),
        rating: food.rating,
        image: food.image,
        restaurant_name: food.restaurant.name,
        restaurant_image: food.restaurant.logo,
        restaurant_status: food.restaurant.status,
        open: food.restaurant.status === 'Open Now'
      }),
    });
    if (!response.ok) throw new Error('Failed to update food');
    const data = await response.json();
    return normalizeFoodData([data])[0];
  },

  deleteFood: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/Food/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete food');
  },
};