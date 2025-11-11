'use client';

import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { FoodFormData, FoodItem } from "./types/food";
import { FoodCard } from "./components/FoodCard";
import { foodApi } from "./utils/api";
import { Button } from "./components/ui/Button";
import { FoodForm } from "./components/FoodForm";
import { Modal } from "./components/Modal";

export default function Home() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [deletingFood, setDeletingFood] = useState<FoodItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

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
    setVisibleCount(prev => prev + 8);
  };

  const handleDeleteFromCard = (food: FoodItem) => {
    setDeletingFood(food);
  };

  const handleAddMealClick = () => {
    setShowAddModal(true);
  };

  const visibleFoods = foods.slice(0, visibleCount);
  const hasMore = visibleCount < foods.length;

  return (
    <div className="food-home-container min-h-screen bg-gray-50">
      <Header onAddMealClick={handleAddMealClick} />

      <main className="food-main-container container mx-auto px-4 py-8">
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
                  Menu is Empty
                </h3>
                <p 
                  className="food-empty-description text-gray-600 text-lg mb-8 leading-relaxed"
                  data-test-id="food-empty-description"
                >
                  Your food menu is waiting for some amazing dishes. Start by adding your first meal to showcase your culinary creations.
                </p>
                <Button
                  onClick={handleAddMealClick}
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
            <div className="food-grid-wrapper mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="food-menu-title-wrapper mb-6 flex w-full items-center justify-center text-center">
                <h6 className="food-menu-title text-3xl font-bold text-gray-900 mx-auto">
                  Featured Meals
                </h6>
              </div>

              <div className="food-cards-grid grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {visibleFoods.map((food, index) => (
                  <FoodCard
                    key={`${food.id}-${index}`}
                    food={food}
                    onEdit={setEditingFood}
                    onDelete={handleDeleteFromCard}
                    index={index}
                  />
                ))}
              </div>
              
              {hasMore && (
                <div className="food-load-more-section text-center mt-16 pt-12 border-t border-gray-100">
                  <div className="food-load-more-content">
                    <Button
                      onClick={handleLoadMore}
                      variant="primary"
                      size="lg"
                      className="food-load-more-btn bg-gradient from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
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
>
  <div className="food-delete-modal-content">
    <p className="text-gray-600 mb-6 text-center">
      Are you sure you want to delete "{deletingFood?.name}"? This action cannot be undone.
    </p>
    <div className="flex space-x-3">
      <Button
        variant="outline"
        onClick={() => setDeletingFood(null)}
        data-test-id="food-cancel-delete-btn"
        className="w-1/2"
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={handleDeleteFood}
        data-test-id="food-confirm-delete-btn"
        className="w-1/2"
      >
        Delete
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
}