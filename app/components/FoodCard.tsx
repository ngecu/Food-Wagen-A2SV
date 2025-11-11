'use client';

import { FoodItem } from '../types/food';
import { useState, useEffect, useRef } from 'react';

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
  index?: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, onEdit, onDelete, index = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [restaurantImageError, setRestaurantImageError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Create refs for the dropdown container and the more button
  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both dropdown and more button
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  // Normalize data
  const displayName = food.name || food.food_name || 'Unknown Food';
  const displayPrice = typeof food.price === 'string' ? parseFloat(food.price) : food.price;
  const displayRating = typeof food.rating === 'string' ? parseFloat(food.rating) : food.rating;
  const displayImage = food.image || food.food_image || food.avatar || '/placeholder-food.jpg';
  const restaurantName = food.restaurant_name || food.restaurant?.name || 'Unknown Restaurant';
  const restaurantImage = food.restaurant_image || food.restaurant?.logo || food.logo || '/placeholder-restaurant.jpg';
  const isOpen = food.open || food.restaurant_status === 'Open' || food.restaurant?.status === 'Open';

  const statusColor = isOpen ? 'bg-[rgba(121,185,60,0.2)] text-[#79B93C]' : 'bg-[rgba(241,114,40,0.2)] text-[#F17228]';
  const statusText = isOpen ? 'Open Now' : 'Closed';

  if (!isMounted) {
    return (
      <article className="food-card overflow-hidden animate-pulse">
        <div className="food-card-image relative h-48 w-full bg-gray-300"></div>
        <div className="food-card-content py-2">
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
      className="food-card rounded-2xl overflow-hidden relative  transition-all duration-150 ease-out transform hover:scale-[1.02]"
      data-test-id="food-card"
      style={{
        animation: `slideUp 0.3s ease-out ${index * 0.1}s both`,
        transform: 'translateY(0)', // Ensure no dimension changes
      }}
    >
      <div className="food-card-image relative h-48 w-full">
        <img
          src={imageError ? '/placeholder-food.jpg' : displayImage}
          alt={displayName}
          className="object-cover rounded-2xl w-full h-full cursor-pointer transition-transform duration-150 ease-out"
          data-test-id="food-image"
          onError={() => setImageError(true)}
          onClick={() => setShowDropdown(false)}
        />
        
        {/* Prominent Price Tag */}
        <div className="food-price-tag absolute top-4 left-4 bg-orange-500 text-white rounded-md shadow-lg px-3 py-2 flex items-center space-x-2 transition-all duration-150 ease-out">
          <svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8.89453V1.6875C0 0.773438 0.738281 0 1.6875 0H8.85938C9.31641 0 9.73828 0.210938 10.0547 0.527344L17.4727 7.94531C18.1406 8.61328 18.1406 9.70312 17.4727 10.3359L10.3008 17.5078C9.66797 18.1758 8.57812 18.1758 7.91016 17.5078L0.492188 10.0898C0.175781 9.77344 0 9.35156 0 8.89453ZM3.9375 2.25C2.98828 2.25 2.25 3.02344 2.25 3.9375C2.25 4.88672 2.98828 5.625 3.9375 5.625C4.85156 5.625 5.625 4.88672 5.625 3.9375C5.625 3.02344 4.85156 2.25 3.9375 2.25Z" fill="white"/>
          </svg>
          <span className="food-price text-base font-bold" data-test-id="food-price">
            ${typeof displayPrice === 'number' ? displayPrice.toFixed(2) : '0.00'}
          </span>
        </div>

        {/* Vertical More Dropdown */}
        <div className="food-more-dropdown absolute top-4 right-4" ref={dropdownRef}>
          <button
            ref={moreButtonRef}
            onClick={() => setShowDropdown(!showDropdown)}
            className="food-more-btn bg-white bg-opacity-90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg cursor-pointer hover:scale-110"
            data-test-id="food-more-btn"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="food-dropdown-menu absolute right-0 top-10 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 min-w-32 z-50 animate-slide-down">
              <button
                onClick={() => {
                  onEdit(food);
                  setShowDropdown(false);
                }}
                className="food-dropdown-edit w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 flex items-center space-x-2 cursor-pointer"
                data-test-id="food-dropdown-edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  onDelete(food);
                  setShowDropdown(false);
                }}
                className="food-dropdown-delete w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 flex items-center space-x-2 cursor-pointer"
                data-test-id="food-dropdown-delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="food-card-content py-5">
        <div className="food-card-restaurant">
          <div className="restaurant-info flex items-center justify-between">
            <div className="restaurant-details flex items-center space-x-3 w-full">
              <div className="restaurant-logo relative w-10 h-10 shrink-0">
                <img
                  src={restaurantImageError ? '/placeholder-restaurant.jpg' : restaurantImage}
                  alt={restaurantName}
                  className="object-cover w-10 h-10 rounded-lg border-2 border-gray-200 transition-all duration-150 ease-out hover:border-orange-300"
                  data-test-id="restaurant-logo"
                  onError={() => setRestaurantImageError(true)}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                {/* Food Name with proper truncation */}
                <span 
                  className="food-name text-sm text-gray-900 mb-1 truncate transition-colors duration-150 ease-out hover:text-orange-600"
                  data-test-id="food-name"
                  title={displayName}
                >
                  {displayName}
                </span>
               
                {/* Rating with proper spacing */}
                <div className="food-rating-container flex items-center space-x-1">
                  <svg width="20" height="20" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6562 1.03125C11.1719 0 12.6328 0.0429688 13.1055 1.03125L15.9414 6.74609L22.2148 7.64844C23.332 7.82031 23.7617 9.19531 22.9453 10.0117L18.4336 14.4375L19.5078 20.668C19.6797 21.7852 18.4766 22.6445 17.4883 22.1289L11.9023 19.1641L6.27344 22.1289C5.28516 22.6445 4.08203 21.7852 4.25391 20.668L5.32812 14.4375L0.816406 10.0117C0 9.19531 0.429688 7.82031 1.54688 7.64844L7.86328 6.74609L10.6562 1.03125Z" fill="#FFB30E"/>
                  </svg>
                  <span 
                    className="food-rating text-sm font-semibold text-[#FFB30E] transition-all duration-150 ease-out" 
                    data-test-id="food-rating"
                  >
                    {typeof displayRating === 'number' ? displayRating.toFixed(1) : '0.0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="food-status-container flex justify-start mt-4">
          <span 
            className={`restaurant-status px-4 py-2 rounded-full text-xs ${statusColor} transition-all duration-150 ease-out hover:scale-105`}
            data-test-id="restaurant-status"
          >
            {statusText}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Ensure card dimensions don't change on hover */
        .food-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </article>
  );
};