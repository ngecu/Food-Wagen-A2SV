import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem, FoodFormData } from '../../types/food';
import { foodApi } from '../../utils/api';

interface FoodState {
  items: FoodItem[];
  loading: boolean;
  error: string | null;
  visibleCount: number;
}

const initialState: FoodState = {
  items: [],
  loading: false,
  error: null,
  visibleCount: 8,
};

// Async thunks - make searchTerm optional
export const fetchFoods = createAsyncThunk(
  'food/fetchFoods',
  async (searchTerm?: string) => {
    // Pass undefined if searchTerm is empty string
    const actualSearchTerm = searchTerm?.trim() || undefined;
    const response = await foodApi.getFoods(actualSearchTerm);
    return response;
  }
);

// ... rest of your foodSlice remains the same
export const createFood = createAsyncThunk(
  'food/createFood',
  async (foodData: FoodFormData) => {
    const response = await foodApi.createFood(foodData);
    return response;
  }
);

export const updateFood = createAsyncThunk(
  'food/updateFood',
  async ({ id, foodData }: { id: string; foodData: FoodFormData }) => {
    const response = await foodApi.updateFood(id, foodData);
    return response;
  }
);

export const deleteFood = createAsyncThunk(
  'food/deleteFood',
  async (id: string) => {
    await foodApi.deleteFood(id);
    return id;
  }
);

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    loadMore: (state) => {
      state.visibleCount += 8;
    },
    resetVisibleCount: (state) => {
      state.visibleCount = 8;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFoods: (state) => {
      state.items = [];
      state.visibleCount = 8;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch foods
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.visibleCount = 8; // Reset visible count when new data loads
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch foods';
        state.items = []; // Clear items on error
      })
      // Create food
      .addCase(createFood.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update food
      .addCase(updateFood.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete food
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { loadMore, resetVisibleCount, clearError, clearFoods } = foodSlice.actions;
export default foodSlice.reducer;