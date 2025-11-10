import { FoodItem } from "../types/food";


export const normalizeFoodData = (apiData: any[]): FoodItem[] => {
  return apiData.map(item => {
    // Handle the inconsistent data structure
    const normalized: FoodItem = {
      id: item.id,
      name: item.name || item.food_name || 'Unknown Food',
      price: item.price || item.Price || '0',
      rating: typeof item.rating === 'string' ? parseFloat(item.rating) : item.rating || item.food_rating || 0,
      image: item.image || item.food_image || item.avatar || '/placeholder-food.jpg',
      open: item.open,
      logo: item.logo,
      food_name: item.food_name,
      food_rating: item.food_rating,
      food_image: item.food_image,
      restaurant_name: item.restaurant_name,
      restaurant_image: item.restaurant_image,
      restaurant_status: item.restaurant_status,
      Price: item.Price,
      createdAt: item.createdAt
    };

    // Ensure rating is a number and within bounds
    if (typeof normalized.rating === 'string') {
      normalized.rating = parseFloat(normalized.rating);
    }
    if (normalized.rating > 5) normalized.rating = 5;
    if (normalized.rating < 0) normalized.rating = 0;

    // Ensure price is properly formatted
    if (typeof normalized.price === 'string') {
      normalized.price = parseFloat(normalized.price) || 0;
    }

    return normalized;
  });
};