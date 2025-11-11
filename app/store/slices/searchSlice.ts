import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  term: string;
  suggestions: string[];
  showSuggestions: boolean;
}

const initialState: SearchState = {
  term: '',
  suggestions: [],
  showSuggestions: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setShowSuggestions: (state, action: PayloadAction<boolean>) => {
      state.showSuggestions = action.payload;
    },
    clearSearch: (state) => {
      state.term = '';
      state.suggestions = [];
      state.showSuggestions = false;
    },
  },
});

export const { setSearchTerm, setSuggestions, setShowSuggestions, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;