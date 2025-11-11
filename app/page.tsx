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
                  <svg 
                    className="food-empty-icon w-24 h-24 text-orange-200 mx-auto" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    data-test-id="food-empty-icon"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
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
                    className="food-empty-action-btn px-8 py-4 text-lg"
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
                      <p 
                        className="food-progress-text text-gray-500 mt-4 text-sm font-medium"
                        data-test-id="food-progress-text"
                      >
                        Displaying {Math.min(visibleFoods.length, foods.length)} of {foods.length} delicious meals
                      </p>
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
  data-test-id="food-modal-content" // Add this line
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