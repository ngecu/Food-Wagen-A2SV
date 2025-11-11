'use client';

import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { FoodFormData, FoodItem } from "./types/food";
import { FoodCard } from "./components/FoodCard";
import { foodApi } from "./utils/api";
import { Button } from "./components/ui/Button";
import { FoodForm } from "./components/FoodForm";

export default function Home() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [deletingFood, setDeletingFood] = useState<FoodItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 items initially

  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const data = await foodApi.getFoods(searchTerm);
      console.log('Fetched foods:', data);
      setFoods(data);
    } catch (error) {
      console.error('Error loading foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFood = async (formData: FoodFormData) => {
    try {
      await foodApi.createFood(formData);
      setShowAddModal(false);
      loadFoods();
    } catch (error) {
      console.error('Error creating food:', error);
    }
  };

  const handleUpdateFood = async (formData: FoodFormData) => {
    if (!editingFood) return;
    try {
      await foodApi.updateFood(editingFood.id, formData);
      setEditingFood(null);
      loadFoods();
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const handleDeleteFood = async () => {
    if (!deletingFood) return;
    try {
      await foodApi.deleteFood(deletingFood.id);
      setDeletingFood(null);
      loadFoods();
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };



  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8); // Load 8 more items
  };

  // Handle delete from card
  const handleDeleteFromCard = (food: FoodItem) => {
    setDeletingFood(food);
  };

  // Get visible foods based on visibleCount
  const visibleFoods = foods.slice(0, visibleCount);
  const hasMore = visibleCount < foods.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Add Food Button */}
        

        {/* Food List */}
        
        <section className="food-section-container w-full">

          

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
  ) : foods.length === 0 ? (
    <div className="food-empty-state-wrapper flex justify-center items-center min-h-96">
      <div className="food-empty-state-content bg-white rounded-3xl shadow-lg p-12 text-center max-w-2xl mx-6">
        <div className="food-empty-icon mb-8">
          <svg 
            className="w-24 h-24 text-orange-200 mx-auto" 
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
          Menu is Empty
        </h3>
        <p 
          className="food-empty-description text-gray-600 text-lg mb-8 leading-relaxed"
          data-test-id="food-empty-description"
        >
          Your food menu is waiting for some amazing dishes. Start by adding your first meal to showcase your culinary creations.
        </p>
        <Button
          onClick={() => setShowAddModal(true)}
          variant="primary"
          size="lg"
          className="food-empty-action-btn px-8 py-4 text-lg"
          data-test-id="food-add-first-btn"
        >
          🍽️ Add First Meal
        </Button>
      </div>
    </div>
  ) : (
    <div className="food-content-container">
      {/* Grid Container with Responsive Margins */}
      <div className="food-grid-wrapper mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">

        <div className="mb-6 flex w-full items-center">
          <h2 className="text-3xl font-bold text-gray-900">Food Menu</h2>
         
        </div>
        
        <div className="food-cards-grid grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {foods.map((food, index) => (
            <FoodCard
              key={`${food.id}-${index}`}
              food={food}
              onEdit={setEditingFood}
              onDelete={handleDeleteFromCard}
            />
          ))}
        </div>
        
        {/* Load More Section */}
        {visibleCount < foods.length && (
          <div className="food-load-more-section text-center mt-16 pt-12 border-t border-gray-100">
            <div className="food-load-more-content">
              <Button
                onClick={handleLoadMore}
                variant="primary"
                size="lg"
                className="food-load-more-btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                data-test-id="food-load-more-btn"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Load More Meals
                </span>
              </Button>
              <p 
                className="food-progress-text text-gray-500 mt-4 text-sm font-medium"
                data-test-id="food-progress-text"
              >
                Displaying {Math.min(visibleCount, foods.length)} of {foods.length} delicious meals
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )}
</section>

      </main>

      <Footer/>

      {/* Add/Edit Modal */}
      {(showAddModal || editingFood) && (
        <FoodForm
          food={editingFood || undefined}
          onSubmit={editingFood ? handleUpdateFood : handleCreateFood}
          onClose={() => {
            setShowAddModal(false);
            setEditingFood(null);
          }}
          isOpen={showAddModal || !!editingFood}
          isLoading={false}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingFood && (
        <div className="food-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="food-modal-content bg-white rounded-lg max-w-md w-full p-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-4">Delete Food Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deletingFood.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setDeletingFood(null)}
                data-test-id="food-cancel-delete-btn"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteFood}
                data-test-id="food-confirm-delete-btn"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}