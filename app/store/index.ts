import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slices/foodSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;