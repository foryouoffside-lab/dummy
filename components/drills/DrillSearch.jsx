'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp, Star, Loader2 } from 'lucide-react';

export default function DrillSearch({ 
  onSearch, 
  onSelect,
  placeholder = "Search drills...",
  suggestions = [],
  recentSearches = [],
  isLoading = false,
  debounceDelay = 300
}) {
  
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const [localRecentSearches, setLocalRecentSearches] = useState(recentSearches);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceTimerRef = useRef(null);
  
  // Debounced search
  const debouncedSearch = useCallback((searchQuery) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        onSearch?.(searchQuery);
      }
    }, debounceDelay);
  }, [onSearch, debounceDelay]);
  
  useEffect(() => {
    if (query.trim().length > 0) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);
  
  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = suggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setLocalSuggestions(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setLocalSuggestions([]);
      setIsOpen(localRecentSearches.length > 0 && isFocused);
    }
  }, [query, suggestions, localRecentSearches, isFocused]);
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Keyboard navigation
  const handleKeyDown = (e) => {
    const items = query.trim().length > 0 ? localSuggestions : localRecentSearches;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          handleSelect(items[selectedIndex]);
        } else if (query.trim()) {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setIsFocused(false);
        break;
    }
  };
  
  const handleSearchSubmit = () => {
    if (query.trim()) {
      addToRecentSearches(query);
      onSearch?.(query);
      setIsOpen(false);
    }
  };
  
  const handleSelect = (item) => {
    setQuery(item.name);
    addToRecentSearches(item.name);
    onSelect?.(item);
    onSearch?.(item.name);
    setIsOpen(false);
    setIsFocused(false);
  };
  
  const addToRecentSearches = (searchTerm) => {
    const updated = [searchTerm, ...localRecentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setLocalRecentSearches(updated);
    // Save to localStorage
    localStorage.setItem('drillRecentSearches', JSON.stringify(updated));
  };
  
  const clearRecentSearches = () => {
    setLocalRecentSearches([]);
    localStorage.removeItem('drillRecentSearches');
  };
  
  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
    setIsOpen(false);
    inputRef.current?.focus();
  };
  
  const getCategoryIcon = (category) => {
    const icons = {
      cognitive: '🧠',
      memory: '🧠',
      visual: '👁️',
      motor: '✋',
      academic: '📚',
      productivity: '⚡',
      'mental-fitness': '🧘',
      mental: '🧘',
      physical: '💪'
    };
    return icons[category] || '🎯';
  };
  
  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'text-green-600',
      easy: 'text-green-600',
      intermediate: 'text-yellow-600',
      medium: 'text-yellow-600',
      advanced: 'text-orange-600',
      hard: 'text-orange-600',
      expert: 'text-red-600'
    };
    return colors[difficulty?.toLowerCase()] || 'text-gray-500';
  };
  
  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          </div>
        )}
      </div>
      
      {/* Dropdown Results */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
        >
          {query.trim().length === 0 && localRecentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-gray-500">Recent Searches</span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Clear
                </button>
              </div>
              {localRecentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    onSearch?.(search);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition ${
                    selectedIndex === index ? 'bg-gray-50' : ''
                  }`}
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}
          
          {query.trim().length > 0 && localSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2">
                <span className="text-xs font-medium text-gray-500">Suggestions</span>
              </div>
              {localSuggestions.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-gray-50 transition rounded-lg ${
                    selectedIndex === index ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      {item.isPopular && (
                        <span className="flex items-center gap-1 text-xs text-orange-500">
                          <TrendingUp className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                      <span className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-600">{item.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {query.trim().length > 0 && localSuggestions.length === 0 && !isLoading && (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No drills found for "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
            </div>
          )}
          
          {query.trim().length > 0 && isLoading && (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          )}
        </div>
      )}
      
      {/* Search Tips */}
      {!isOpen && !query && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
          <p className="text-xs font-medium text-gray-500 mb-2">Search tips:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search by drill name (e.g., "Memory Sequence")</li>
            <li>• Search by category (e.g., "cognitive", "visual")</li>
            <li>• Search by difficulty (e.g., "beginner", "expert")</li>
          </ul>
        </div>
      )}
    </div>
  );
}