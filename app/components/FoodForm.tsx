// src/components/FoodForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { FoodItem, FoodFormData } from '../types/food';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface FoodFormProps {
  food?: FoodItem;
  onSubmit: (data: FoodFormData) => void;
  onClose: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

export const FoodForm: React.FC<FoodFormProps> = ({
  food,
  onSubmit,
  onClose,
  isOpen,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<FoodFormData>({
    name: '',
    price: 0,
    rating: 0,
    image: '',
    restaurant: {
      name: '',
      logo: '',
      status: 'Open Now',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        price: typeof food.price === 'string' ? parseFloat(food.price) || 0 : food.price,
        rating: food.rating as Number,
        image: food.image,
      
      });
    } else {
      // Reset form when opening for new food
      setFormData({
        name: '',
        price: 0,
        rating: 0,
        image: '',
        restaurant: {
          name: '',
          logo: '',
          status: 'Open Now',
        },
      });
    }
    setErrors({});
  }, [food, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Food Name validation
    if (!formData.name.trim()) {
      newErrors.food_name = 'Food Name is required';
    }

    // Food Rating validation
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.food_rating = 'Food Rating must be between 1 and 5';
    }

    // Food Image validation
    if (!formData.image.trim()) {
      newErrors.food_image = 'Food Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.food_image = 'Food Image URL is invalid';
    }

    // Restaurant Name validation
    if (!formData.restaurant.name.trim()) {
      newErrors.restaurant_name = 'Restaurant Name is required';
    }

    // Restaurant Logo validation
    if (!formData.restaurant.logo.trim()) {
      newErrors.restaurant_logo = 'Restaurant Logo URL is required';
    } else if (!isValidUrl(formData.restaurant.logo)) {
      newErrors.restaurant_logo = 'Restaurant Logo URL is invalid';
    }

    // Restaurant Status validation
    if (!['Open Now', 'Closed'].includes(formData.restaurant.status)) {
      newErrors.restaurant_status = 'Restaurant Status must be "Open Now" or "Closed"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    if (field.startsWith('restaurant.')) {
      const restaurantField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          [restaurantField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="food-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="food-modal-content bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="food-modal-header p-6 border-b">
          <h2 className="food-modal-title text-2xl font-bold text-gray-900">
            {food ? 'Edit Food Item' : 'Add New Food Item'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="food-form p-6">
          {/* Food Information */}
          <div className="food-form-section mb-6">
            <h3 className="food-form-section-title text-lg font-semibold mb-4 text-gray-900">
              Food Information
            </h3>
            
            <Input
              label="Food Name"
              name="food_name"
              type="text"
              placeholder="Enter food name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.food_name}
              data-test-id="food-name-input"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Food Price ($)"
                name="food_price"
                type="number"
                step="0.01"
                placeholder="Enter food price"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                data-test-id="food-price-input"
                required
              />

              <Input
                label="Food Rating (1-5)"
                name="food_rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Enter food rating"
                value={formData.rating || ''}
                onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
                error={errors.food_rating}
                data-test-id="food-rating-input"
                required
              />
            </div>

            <Input
              label="Food Image URL"
              name="food_image"
              type="url"
              placeholder="Enter food image URL"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              error={errors.food_image}
              data-test-id="food-image-input"
              required
            />
          </div>

          {/* Restaurant Information */}
          <div className="food-form-section mb-6">
            <h3 className="food-form-section-title text-lg font-semibold mb-4 text-gray-900">
              Restaurant Information
            </h3>

            <Input
              label="Restaurant Name"
              name="restaurant_name"
              type="text"
              placeholder="Enter restaurant name"
              value={formData.restaurant.name}
              onChange={(e) => handleChange('restaurant.name', e.target.value)}
              error={errors.restaurant_name}
              data-test-id="restaurant-name-input"
              required
            />

            <Input
              label="Restaurant Logo URL"
              name="restaurant_logo"
              type="url"
              placeholder="Enter restaurant logo URL"
              value={formData.restaurant.logo}
              onChange={(e) => handleChange('restaurant.logo', e.target.value)}
              error={errors.restaurant_logo}
              data-test-id="restaurant-logo-input"
              required
            />

            <div className="food-input-group mb-4">
              <label htmlFor="restaurant_status" className="food-label block text-sm font-medium text-gray-700 mb-1">
                Restaurant Status
              </label>
              <select
                id="restaurant_status"
                name="restaurant_status"
                value={formData.restaurant.status}
                onChange={(e) => handleChange('restaurant.status', e.target.value)}
                className="food-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
                data-test-id="restaurant-status-select"
                required
              >
                <option value="Open Now">Open Now</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.restaurant_status && (
                <div 
                  id="restaurant_status-error" 
                  className="food-error text-red-500 text-sm mt-1"
                  data-test-id="restaurant-status-error"
                >
                  {errors.restaurant_status}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="food-form-actions flex space-x-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              data-test-id="food-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              data-test-id="food-submit-btn"
            >
              {isLoading 
                ? (food ? 'Updating Food...' : 'Adding Food...') 
                : (food ? 'Update Food' : 'Add Food')
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};