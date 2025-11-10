// src/components/FoodCard.tsx
'use client';

import Image from 'next/image';
import { FoodItem } from '../types/food';
import { useState, useEffect } from 'react';

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (id: string) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [restaurantImageError, setRestaurantImageError] = useState(false);

  // Fix hydration by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Normalize data to prevent hydration mismatches
  const displayName = food.name || food.food_name || 'Unknown Food';
  const displayPrice = typeof food.price === 'string' ? parseFloat(food.price) : food.price;
  const displayRating = typeof food.rating === 'string' ? parseFloat(food.rating) : food.rating;
  const displayImage = food.image || food.food_image || food.avatar || '/placeholder-food.jpg';
  const restaurantName = food.restaurant_name || 'Unknown Restaurant';
  const restaurantImage = food.restaurant_image || food.logo || '/placeholder-restaurant.jpg';
  const isOpen = food.open || food.restaurant_status === 'Open Now';
  
  const statusColor = isOpen ? 'text-green-600' : 'text-red-600';
  const statusText = isOpen ? 'Open Now' : 'Closed';

  // Prevent hydration by not rendering until mounted
  if (!isMounted) {
    return (
      <article className="food-card bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="food-card-image relative h-48 w-full bg-gray-300"></div>
        <div className="food-card-content p-4">
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      className="food-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-150 ease-out"
      data-test-id="food-card"
    >
      <div className="food-card-image relative h-48 w-full">
        <img
          src={imageError ? '/placeholder-food.jpg' : displayImage}
          alt={displayName}
          
          className="object-cover"
          data-test-id="food-image"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        
        />
      </div>
      
      <div className="food-card-content p-4">
        <div className="food-card-header mb-3">
          <h3 className="food-name text-lg font-semibold text-gray-900 mb-1" data-test-id="food-name">
            {displayName}
          </h3>
          <div className="food-price-rating flex justify-between items-center">
            <span className="food-price text-xl font-bold text-blue-600" data-test-id="food-price">
              ${typeof displayPrice === 'number' ? displayPrice.toFixed(2) : '0.00'}
            </span>
            <span className="food-rating flex items-center text-yellow-600" data-test-id="food-rating">
              ⭐ {typeof displayRating === 'number' ? displayRating.toFixed(1) : '0.0'}
            </span>
          </div>
        </div>

        <div className="food-card-restaurant border-t pt-3">
          <div className="restaurant-info flex items-center justify-between">
            <div className="restaurant-details flex items-center space-x-2">
              <div className="restaurant-logo relative w-8 h-8">
                <img
                  src={restaurantImageError ? '/placeholder-restaurant.jpg' : restaurantImage}
                  alt={restaurantName}
             
                  className="object-cover rounded-full"
                  data-test-id="restaurant-logo"
                  onError={() => setRestaurantImageError(true)}
                  sizes="32px"
                />
              </div>
              <span className="restaurant-name text-sm text-gray-700" data-test-id="restaurant-name">
                {restaurantName}
              </span>
            </div>
            <span 
              className={`restaurant-status text-sm font-medium ${statusColor}`}
              data-test-id="restaurant-status"
            >
              {statusText}
            </span>
          </div>
        </div>

        <div className="food-card-actions flex space-x-2 mt-4">
          <button
            onClick={() => onEdit(food)}
            className="food-edit-btn flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-150"
            data-test-id="food-edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="food-delete-btn flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-150"
            data-test-id="food-delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};