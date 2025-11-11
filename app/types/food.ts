// src/types/food.ts
export interface Restaurant {
  name: string;
  logo: string;
  status: 'Open Now' | 'Closed';
}

// src/types/food.ts
export interface FoodItem {
  restaurant: any;
  id: string;
  name: string;
  price: string | number;
  rating: number | string; // API returns string "9428" sometimes
  image: string;
  avatar?: string;
  open?: boolean;
  logo?: string;
  
  // Direct fields from API (not nested)
  food_name?: string;
  food_rating?: number;
  food_image?: string;
  restaurant_name?: string;
  restaurant_image?: string;
  restaurant_status?: string;
  Price?: string;
  createdAt?: string;
}

export interface FoodFormData {
  name: string;
  price: number;
  rating: number;
  image: string;
  restaurant: {
    name: string;
    logo: string;
    status: 'Open Now' | 'Closed';
  };
}