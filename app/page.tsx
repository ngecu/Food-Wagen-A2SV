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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
     

        {/* Food List */}
        <section>
          {loading ? (
            <div className="text-center py-8">
              <div className="food-loading animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="food-loading-text mt-4 text-gray-600">Loading foods...</p>
            </div>
          ) : foods.length === 0 ? (
            <div className="empty-state-message text-center py-8">
              <p className="text-gray-500 text-lg">No food items available</p>
              <p className="text-gray-400 mt-2">Add some food items to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food, index) => (
                <FoodCard
                  key={`${food.id}-${index}`}
                  food={food}
                  onEdit={setEditingFood} 
                  onDelete={function (id: string): void {
                    throw new Error("Function not implemented.");
                  } }             
                />
              ))}
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