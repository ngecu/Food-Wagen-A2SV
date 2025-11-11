'use client';

import { useEffect, memo, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { FoodFormData } from "./types/food";
import { LazyFoodCard } from "./components/LazyFoodCard";
import { Button } from "./components/ui/Button";
import { FoodForm } from "./components/FoodForm";
import { Modal } from "./components/Modal";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { createFood, updateFood, deleteFood } from "./store/slices/foodSlice";
import { useFoods } from "./hooks/useFoods";

// Memoized components for better performance
const MemoizedFoodCard = memo(LazyFoodCard);
const MemoizedFooter = memo(Footer);
const MemoizedHeader = memo(Header);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    foods,
    visibleFoods,
    loading,
    error,
    searchTerm,
    suggestions,
    showSuggestions,
    hasMore,
    handleSearch,
    handleLoadMore,
    handleSuggestionClick,
    setShowSuggestions,
  } = useFoods();
 

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFood, setEditingFood] = useState<any>(null);
  const [deletingFood, setDeletingFood] = useState<any>(null);

  const handleCreateFood = async (formData: FoodFormData) => {
    try {
      await dispatch(createFood(formData)).unwrap();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  const handleUpdateFood = async (formData: FoodFormData) => {
    if (!editingFood) return;
    try {
      await dispatch(updateFood({ id: editingFood.id, foodData: formData })).unwrap();
      setEditingFood(null);
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const handleDeleteFood = async () => {
    if (!deletingFood) return;
    try {
      await dispatch(deleteFood(deletingFood.id)).unwrap();
      setDeletingFood(null);
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const handleDeleteFromCard = (food: any) => {
    setDeletingFood(food);
  };

  const handleAddMealClick = () => {
    setShowAddModal(true);
  };

  return (
    <div className="food-home-container min-h-screen bg-gray-50">
      <MemoizedHeader 
        onAddMealClick={handleAddMealClick}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onShowSuggestionsChange={setShowSuggestions}
      />

      <main className="food-main-container container mx-auto px-4 py-8">
        <section id="food-results-section" className="food-section-container w-full">
          {loading ? (
            <div className="food-loading-wrapper flex justify-center items-center py-20">
              <div className="food-loading-content text-center">
                <div 
                  className="food-loading-spinner animate-spin rounded-full h-20 w-20 border-4 border-orange-200 border-t-orange-600 mx-auto mb-6"
                  data-test-id="food-loading-spinner"
                ></div>
                <p 
                  className="food-loading-text text-xl text-gray-700 font-medium"
                  data-test-id="food-loading-text"
                >
                  Preparing your delicious meals...
                </p>
              </div>
            </div>
          ) : (foods.length === 0 || (searchTerm && foods.length === 0)) ? (
            <div className="food-empty-state-wrapper flex justify-center items-center min-h-96">
              <div className="food-empty-state-content bg-white rounded-3xl shadow-lg p-12 text-center max-w-2xl mx-6">
                <div className="food-empty-icon-wrapper mb-8">
                  {/* Cool Food Illustration SVG */}
                  <svg 
                    className="food-empty-icon w-48 h-48 text-orange-200 mx-auto" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    data-test-id="food-empty-icon"
                  >
                    {/* Plate */}
                    <circle cx="100" cy="100" r="45" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
                    <circle cx="100" cy="100" r="40" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
                    
                    {/* Food Items */}
                    {/* Burger */}
                    <ellipse cx="85" cy="85" rx="12" ry="8" fill="#F59E0B" className="animate-bounce" style={{animationDelay: '0.1s'}}/>
                    <ellipse cx="85" cy="90" rx="14" ry="6" fill="#78350F" className="animate-bounce" style={{animationDelay: '0.2s'}}/>
                    <ellipse cx="85" cy="95" rx="12" ry="4" fill="#F59E0B" className="animate-bounce" style={{animationDelay: '0.3s'}}/>
                    
                    {/* Pizza Slice */}
                    <path d="M120 70 L140 90 L120 110 Z" fill="#F87171" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
                    <circle cx="125" cy="85" r="2" fill="#FBBF24"/>
                    <circle cx="135" cy="90" r="2" fill="#FBBF24"/>
                    <circle cx="130" cy="95" r="2" fill="#FBBF24"/>
                    
                    {/* Drink */}
                    <rect x="65" y="115" width="8" height="20" rx="2" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                    <ellipse cx="69" cy="115" rx="4" ry="2" fill="#93C5FD"/>
                    
                    {/* Floating Utensils */}
                    <g className="animate-float" style={{animationDelay: '0.6s'}}>
                      <rect x="130" y="120" width="2" height="15" rx="1" fill="#9CA3AF" transform="rotate(45 130 120)"/>
                      <rect x="135" y="125" width="2" height="12" rx="1" fill="#9CA3AF" transform="rotate(-45 135 125)"/>
                    </g>
                    
                    {/* Thought Bubble */}
                    <path d="M150 60 C160 55 165 65 160 70 C165 75 155 80 150 75 C145 80 135 75 140 70 C135 65 140 55 150 60 Z" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1"/>
                    <text x="150" y="70" textAnchor="middle" fill="#6B7280" fontSize="8" fontFamily="Arial">?</text>
                  </svg>
                </div>
                <h3 
                  className="food-empty-title text-3xl font-bold text-gray-900 mb-4"
                  data-test-id="food-empty-title"
                >
                  {searchTerm ? 'No Results Found' : 'Menu is Empty'}
                </h3>
                <p 
                  className="food-empty-description text-gray-600 text-lg mb-8 leading-relaxed"
                  data-test-id="food-empty-description"
                >
                  {searchTerm 
                    ? `No meals found for "${searchTerm}". Try a different search term.`
                    : 'Your food menu is waiting for some amazing dishes. Start by adding your first meal to showcase your culinary creations.'
                  }
                </p>
                {!searchTerm && (
                  <Button
                    onClick={handleAddMealClick}
                    variant="primary"
                    size="lg"
                    className="food-empty-action-btn px-8 py-4 text-lg hover:scale-105 transition-transform duration-200"
                    data-test-id="food-add-first-btn"
                  >
                    🍽️ Add First Meal
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="food-content-container">
              <div className="food-grid-wrapper mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="food-menu-title-wrapper mb-6 flex w-full items-center justify-center text-center">
                  <h6 className="food-menu-title text-3xl font-bold text-gray-900 mx-auto">
                    {searchTerm ? `Search Results for "${searchTerm}"` : 'Featured Meals'}
                  </h6>
                </div>

                <div className="food-cards-grid grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {visibleFoods.map((food, index) => (
                    <MemoizedFoodCard
                      key={`${food.id}-${index}`}
                      food={food}
                      onEdit={setEditingFood}
                      onDelete={handleDeleteFromCard}
                      index={index}
                    />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="food-load-more-section w-full text-center">
                    <div className="food-load-more-content mx-auto max-w-md flex flex-col items-center justify-center">    
                      <Button
                        onClick={handleLoadMore}
                        variant="primary"
                        size="lg"
                        className="food-load-more-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        data-test-id="food-load-more-btn"
                      >
                        <span className="food-load-more-span flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Load More 

                          
                        </span>
                      </Button>
                    
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <MemoizedFooter/>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal || !!editingFood}
        onClose={() => {
          setShowAddModal(false);
          setEditingFood(null);
        }}
        title={editingFood ? "Edit Food Item" : "Add Meal"}
        size="lg"
      >
        <FoodForm
          food={editingFood || undefined}
          onSubmit={editingFood ? handleUpdateFood : handleCreateFood}
          onClose={() => {
            setShowAddModal(false);
            setEditingFood(null);
          }}
          isLoading={false}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingFood}
        onClose={() => setDeletingFood(null)}
        title="Delete Food Item"
        size="sm"
        data-test-id="food-modal-content"
      >
        <div className="food-delete-modal-content">
          <p className="mb-6 text-center">
            Are you sure you want to delete "{deletingFood?.name}"? This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={handleDeleteFood}
              data-test-id="food-confirm-delete-btn"
              className="w-1/2"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeletingFood(null)}
              data-test-id="food-cancel-delete-btn"
              className="w-1/2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}