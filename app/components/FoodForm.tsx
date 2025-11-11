'use client';

import { useState, useEffect } from 'react';
import { FoodItem, FoodFormData } from '../types/food';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface FoodFormProps {
  food?: FoodItem;
  onSubmit: (data: FoodFormData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const FoodForm: React.FC<FoodFormProps> = ({
  food,
  onSubmit,
  onClose,
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name || '',
        price: typeof food.price === 'string' ? parseFloat(food.price) || 0 : food.price || 0,
        rating: food.rating as number || 0,
        image: food.image || '',
        restaurant: {
          name: food.restaurant_name || '',
          logo: food.restaurant_image || '',
          status: food.restaurant_status === 'Closed' ? 'Closed' : 'Open Now',
        },
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
    setIsSubmitted(false);
  }, [food]);

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
    setIsSubmitted(true);
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

  // Only show errors after form submission
  const getError = (fieldName: string): string => {
    return isSubmitted ? errors[fieldName] || '' : '';
  };

  return (
    <form onSubmit={handleSubmit} className="food-form">
      {/* Food Information */}
      <div className="food-form-section mb-6">
        <Input
          name="food_name"
          type="text"
          placeholder="Enter food name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={getError('food_name')}
          data-test-id="food-name-input"
          required
        />

        <Input
          name="food_rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          placeholder="Enter food rating"
          value={formData.rating || ''}
          onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
          error={getError('food_rating')}
          data-test-id="food-rating-input"
          required
          className="mt-4"
        />

        <Input
          name="food_price"
          type="number"
          step="0.01"
          placeholder="Enter food price"
          value={formData.price || ''}
          onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
          error={getError('food_price')}
          data-test-id="food-price-input"
          required
          className="mt-4"
        />

        <Input
          name="food_image"
          type="url"
          placeholder="Enter food image URL"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          error={getError('food_image')}
          data-test-id="food-image-input"
          required
          className="mt-4"
        />

        <Input
          name="restaurant_name"
          type="text"
          placeholder="Enter restaurant name"
          value={formData.restaurant.name}
          onChange={(e) => handleChange('restaurant.name', e.target.value)}
          error={getError('restaurant_name')}
          data-test-id="restaurant-name-input"
          required
          className="mt-4"
        />

        <Input
          name="restaurant_logo"
          type="url"
          placeholder="Enter restaurant logo URL"
          value={formData.restaurant.logo}
          onChange={(e) => handleChange('restaurant.logo', e.target.value)}
          error={getError('restaurant_logo')}
          data-test-id="restaurant-logo-input"
          required
          className="mt-4"
        />

        <div className="food-input-group mt-4">
          <label htmlFor="restaurant_status" className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Status
            <span className="text-red-500 ml-1">*</span>
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
          {isSubmitted && errors.restaurant_status && (
            <div 
              id="restaurant_status-error" 
              className="food-error text-red-500 text-sm mt-1 flex items-center gap-1"
              data-test-id="restaurant-status-error"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {errors.restaurant_status}
            </div>
          )}
        </div>
      </div>

      {/* Form Actions with 50% width buttons */}
      <div className="food-form-actions flex space-x-3 pt-4 border-t border-gray-200">
         <Button
          type="submit"
          isLoading={isLoading}
          data-test-id="food-submit-btn"
          className="w-1/2"
        >
          {isLoading 
            ? (food ? 'Updating Food...' : 'Adding Food...') 
            : (food ? 'Update Food' : 'Add Food')
          }
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-test-id="food-cancel-btn"
          className="w-1/2"
        >
          Cancel
        </Button>
       
      </div>
    </form>
  );
};