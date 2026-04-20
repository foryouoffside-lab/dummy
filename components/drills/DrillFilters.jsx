'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

export default function DrillFilters({ 
  onFilterChange, 
  categories = [],
  difficulties = [],
  initialFilters = {},
  showSearch = true,
  showSort = true 
}) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: initialFilters.category || 'all',
    difficulty: initialFilters.difficulty || 'all',
    sortBy: initialFilters.sortBy || 'popular',
    ...initialFilters
  });
  
  const [tempFilters, setTempFilters] = useState(filters);
  
  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'points_high', name: 'Highest XP' },
    { id: 'points_low', name: 'Lowest XP' },
    { id: 'duration_short', name: 'Shortest Duration' },
    { id: 'duration_long', name: 'Longest Duration' },
    { id: 'name_asc', name: 'Name A-Z' },
    { id: 'name_desc', name: 'Name Z-A' }
  ];
  
  const defaultCategories = [
    { id: 'all', name: 'All Categories', icon: '🎯' },
    { id: 'memory', name: 'Memory', icon: '🧠' },
    { id: 'cognitive', name: 'Cognitive', icon: '🧠' },
    { id: 'visual', name: 'Visual', icon: '👁️' },
    { id: 'motor', name: 'Motor', icon: '✋' },
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'mental-fitness', name: 'Mental Fitness', icon: '🧘' },
    { id: 'physical', name: 'Physical', icon: '💪' }
  ];
  
  const defaultDifficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner', color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'easy', name: 'Easy', color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'advanced', name: 'Advanced', color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'hard', name: 'Hard', color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'expert', name: 'Expert', color: 'text-red-600', bg: 'bg-red-100' }
  ];
  
  const categoryList = categories.length > 0 ? categories : defaultCategories;
  const difficultyList = difficulties.length > 0 ? difficulties : defaultDifficulties;
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setTempFilters(newFilters);
    onFilterChange?.(newFilters);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilterChange('search', tempFilters.search);
  };
  
  const handleTempChange = (key, value) => {
    setTempFilters({ ...tempFilters, [key]: value });
  };
  
  const applyFilters = () => {
    setFilters(tempFilters);
    onFilterChange?.(tempFilters);
    setIsExpanded(false);
  };
  
  const resetFilters = () => {
    const resetFilters = {
      search: '',
      category: 'all',
      difficulty: 'all',
      sortBy: 'popular'
    };
    setFilters(resetFilters);
    setTempFilters(resetFilters);
    onFilterChange?.(resetFilters);
    setIsExpanded(false);
  };
  
  const hasActiveFilters = () => {
    return filters.category !== 'all' || 
           filters.difficulty !== 'all' || 
           filters.search !== '' ||
           filters.sortBy !== 'popular';
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.difficulty !== 'all') count++;
    if (filters.search !== '') count++;
    if (filters.sortBy !== 'popular') count++;
    return count;
  };
  
  const selectedCategory = categoryList.find(c => c.id === filters.category);
  const selectedDifficulty = difficultyList.find(d => d.id === filters.difficulty);
  const selectedSort = sortOptions.find(s => s.id === filters.sortBy);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Main Filter Bar */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drills by name or description..."
                value={tempFilters.search}
                onChange={(e) => handleTempChange('search', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          )}
          
          {/* Category Quick Select */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categoryList.slice(0, 5).map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange('category', category.id)}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition
                  ${filters.category === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category.icon && <span className="mr-1">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">Filters</span>
            {hasActiveFilters() && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categoryList.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleTempChange('category', category.id)}
                    className={`
                      px-3 py-2 rounded-lg text-sm text-left transition
                      ${tempFilters.category === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    {category.icon && <span className="mr-2">{category.icon}</span>}
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="space-y-2">
                {difficultyList.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => handleTempChange('difficulty', difficulty.id)}
                    className={`
                      w-full px-3 py-2 rounded-lg text-sm text-left transition
                      ${tempFilters.difficulty === difficulty.id
                        ? difficulty.bg + ' ' + difficulty.color + ' font-medium ring-2 ring-blue-500'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sort Options */}
            {showSort && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={tempFilters.sortBy}
                  onChange={(e) => handleTempChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          {/* Filter Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Reset All
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Active Filters Display */}
      {hasActiveFilters() && !isExpanded && (
        <div className="border-t border-gray-100 px-4 py-3 bg-gray-50 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {filters.category !== 'all' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              <span>{selectedCategory?.icon}</span>
              <span>{selectedCategory?.name}</span>
              <button
                onClick={() => handleFilterChange('category', 'all')}
                className="ml-1 hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {filters.difficulty !== 'all' && (
            <div className={`flex items-center gap-1 px-2 py-1 ${selectedDifficulty?.bg} ${selectedDifficulty?.color} rounded-full text-xs`}>
              <span>{selectedDifficulty?.name}</span>
              <button
                onClick={() => handleFilterChange('difficulty', 'all')}
                className="ml-1 hover:opacity-70"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {filters.search && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
              <Search className="w-3 h-3" />
              <span>{filters.search}</span>
              <button
                onClick={() => handleFilterChange('search', '')}
                className="ml-1 hover:text-gray-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {filters.sortBy !== 'popular' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
              <span>Sort: {selectedSort?.name}</span>
              <button
                onClick={() => handleFilterChange('sortBy', 'popular')}
                className="ml-1 hover:text-gray-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          <button
            onClick={resetFilters}
            className="text-xs text-red-600 hover:text-red-700 ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}