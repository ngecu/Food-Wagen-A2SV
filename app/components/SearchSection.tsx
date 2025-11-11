'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';


interface SearchSectionProps {
  deliveryType: 'delivery' | 'pickup';
  onSearch: (term: string) => void;
  searchTerm: string;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onShowSuggestionsChange: (show: boolean) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  deliveryType,
  onSearch,
  searchTerm,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  onShowSuggestionsChange,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onShowSuggestionsChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onShowSuggestionsChange]);

  const handleInputChange = (value: string) => {
    setLocalSearchTerm(value);
    onShowSuggestionsChange(true);
  };

  const handleSearchSubmit = () => {
    onSearch(localSearchTerm);
    onShowSuggestionsChange(false);
    
    // Scroll to results section
    setTimeout(() => {
      const resultsSection = document.getElementById('food-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setLocalSearchTerm(suggestion);
    onSuggestionClick(suggestion);
    
    // Scroll to results section
    setTimeout(() => {
      const resultsSection = document.getElementById('food-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="food-search-section w-full" ref={searchRef}>
      <div className="food-search-container w-full max-w-2xl mx-auto">
        <div className="relative">
          <div className="flex gap-3 items-center">
            {/* Input with grey background */}
            <div className="flex-1 relative">
              <Input
                type="text"
                name="food_search"
                placeholder={
                  deliveryType === 'delivery' 
                    ? "Search for food items..." 
                    : "Enter your location for pickup..."
                }
                value={localSearchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => onShowSuggestionsChange(true)}
                className="food-search-input w-full px-6 py-4 rounded-2xl border-0 text-sm"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="#F17228" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                iconPosition="left"
                data-test-id="food-search-input"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      onClick={() => handleSuggestionSelect(suggestion)}
                      data-test-id={`search-suggestion-${index}`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Separate Find Food button */}
            <Button 
              onClick={handleSearchSubmit}
              className="food-search-btn bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap"
              data-test-id="food-search-btn"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{deliveryType === 'delivery' ? 'Find Food' : 'Find Pickup'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};