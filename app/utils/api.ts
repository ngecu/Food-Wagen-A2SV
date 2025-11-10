// src/utils/api.ts
import { FoodItem, FoodFormData } from '../types/food';
import { normalizeFoodData } from './normailze';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

export const foodApi = {
  getFoods: async (search?: string): Promise<FoodItem[]> => {
    const url = search ? `${API_BASE_URL}/Food?name=${search}` : `${API_BASE_URL}/Food`;
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!response.ok) throw new Error('Failed to fetch foods');
    const data = await response.json();
    return normalizeFoodData(data);
  },

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