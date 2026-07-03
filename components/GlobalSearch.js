'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * Global Search component - searches across all drills
 */
export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search all drill pages on the client
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Get all drill links from the page or use a predefined index
    // This gives results from all categories
    const drillIndex = window.__DRILL_INDEX__ || [];

    const searchTerms = searchQuery.toLowerCase().split(' ');
    const filtered = drillIndex
      .filter(drill => {
        const searchText = `${drill.name} ${drill.category} ${drill.description || ''}`.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      })
      .slice(0, 10);

    setResults(filtered);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      performSearch(value);
    }, 200);
  };

  return (
    <>
      {/* Search Trigger Button - Dark */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white text-xs sm:text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Search drills (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
        <span className="flex-1 text-left">Search 135+ drills...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-gray-700 rounded text-gray-400">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search Modal - Dark Theme */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            className="bg-gray-900 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg overflow-hidden border border-gray-800"
            role="dialog"
            aria-modal="true"
            aria-label="Search drills"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search 135+ drills..."
                className="flex-1 text-lg outline-none bg-transparent text-white placeholder-gray-500"
                aria-label="Search drills"
              />
              {loading && <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-white" />
              </button>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-xs bg-gray-800 rounded text-gray-500">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((drill) => (
                    <Link
                      key={drill.path}
                      href={drill.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors group"
                    >
                      <span className="text-lg">{drill.icon || '🎯'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-200 group-hover:text-teal-400 truncate">
                          {drill.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {drill.category}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-teal-500" />
                    </Link>
                  ))}
                </div>
              ) : query && !loading ? (
                <div className="py-12 text-center text-gray-500">
                  <Search className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                  <p>No drills found for &quot;{query}&quot;</p>
                  <p className="text-sm text-gray-600">Try different keywords</p>
                </div>
              ) : !query ? (
                <div className="py-8 text-center text-gray-500">
                  <p className="text-sm">Type to search across all 135+ drills</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['FPS', 'Memory', 'Typing', 'Focus', 'Reaction', 'Math'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1 text-sm bg-gray-800 rounded-full hover:bg-teal-600 hover:text-white text-gray-400 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Initialize the drill search index (call this on each drill page)
 * @param {Array} drills - Array of drill objects
 */
export function initDrillIndex(drills) {
  if (typeof window !== 'undefined') {
    window.__DRILL_INDEX__ = drills;
  }
}