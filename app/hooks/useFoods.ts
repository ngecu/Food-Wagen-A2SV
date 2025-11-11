import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchFoods, loadMore } from '../store/slices/foodSlice';
import { setSearchTerm, setSuggestions, setShowSuggestions } from '../store/slices/searchSlice';

export const useFoods = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, visibleCount } = useSelector((state: RootState) => state.food);
  const { term, suggestions, showSuggestions } = useSelector((state: RootState) => state.search);

  // Initial load - fetch foods without search term
  useEffect(() => {
    // Only fetch if we haven't loaded foods yet and we're not in the middle of a search
    if (items.length === 0 && !term && !loading) {
      dispatch(fetchFoods()); // Call without parameters for initial load
    }
  }, [dispatch, items.length, term, loading]);

  // Memoized search function
  const handleSearch = useCallback(
    (searchTerm: string) => {
      dispatch(setSearchTerm(searchTerm));
      dispatch(fetchFoods(searchTerm));
    },
    [dispatch]
  );

  // Generate search suggestions based on current foods
  const generateSuggestions = useCallback(
    (searchText: string) => {
      if (searchText.length < 2) {
        dispatch(setSuggestions([]));
        return;
      }

      const foodNames = items.map(item => item.name).filter(Boolean);
      const restaurantNames = items.map(item => item.restaurant?.name).filter(Boolean);
      
      const allSuggestions = [...new Set([...foodNames, ...restaurantNames])];
      
      const filtered = allSuggestions.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions

      dispatch(setSuggestions(filtered));
    },
    [items, dispatch]
  );

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      generateSuggestions(term);
    }, 300);

    return () => clearTimeout(timer);
  }, [term, generateSuggestions]);

  // Memoized visible foods for performance
  const visibleFoods = useMemo(() => 
    items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = useMemo(() => 
    visibleCount < items.length,
    [visibleCount, items.length]
  );

  const handleLoadMore = useCallback(() => {
    dispatch(loadMore());
  }, [dispatch]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    dispatch(setSearchTerm(suggestion));
    dispatch(setShowSuggestions(false));
    dispatch(fetchFoods(suggestion));
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(setSearchTerm(''));
    dispatch(setSuggestions([]));
    dispatch(setShowSuggestions(false));
    dispatch(fetchFoods()); // Fetch all foods without search term
  }, [dispatch]);

  return {
    foods: items,
    visibleFoods,
    loading,
    error,
    searchTerm: term,
    suggestions,
    showSuggestions,
    hasMore,
    handleSearch,
    handleLoadMore,
    handleSuggestionClick,
    setShowSuggestions: (show: boolean) => dispatch(setShowSuggestions(show)),
    clearSearch,
  };
};