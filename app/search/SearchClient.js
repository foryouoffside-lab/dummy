'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight, Zap, Target, Filter } from 'lucide-react';
import { searchDrills } from '@/lib/searchDrills';
import { DRILLS } from '@/lib/drillsRegistry';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';
import DrillLoading from '@/components/DrillLoading';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const matched = query.trim() ? searchDrills(query) : DRILLS;
    if (categoryFilter === 'all') {
      setResults(matched);
    } else {
      setResults(matched.filter(d => d.category === categoryFilter));
    }
  }, [query, categoryFilter]);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'fps', label: 'FPS Training' },
    { id: 'cognitive', label: 'Cognitive' },
    { id: 'memory', label: 'Memory' },
    { id: 'motor', label: 'Motor Skills' },
    { id: 'physical', label: 'Physical' },
    { id: 'visual', label: 'Visual' },
    { id: 'visual-tracking', label: 'Visual Tracking' },
    { id: 'reaction-speed', label: 'Reaction Speed' },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 font-sans flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Search <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Drills</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Search through {DRILLS.length}+ browser-native drills by name, category, or target skill.
          </p>

          {/* Search Input Box */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search drills by keyword (e.g. flick, memory, reaction)..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-base transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-gray-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-xs text-gray-400">
          <span>
            Showing <strong className="text-white">{results.length}</strong> {results.length === 1 ? 'drill' : 'drills'}
            {query.trim() ? <> for &ldquo;<span className="text-blue-400">{query}</span>&rdquo;</> : ''}
          </span>
          <span className="font-mono text-gray-500">113 Total Registry Items</span>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {results.map((drill, index) => (
              <Reveal key={drill.id} delay={Math.min(index * 40, 400)}>
                <Link
                  href={drill.href}
                  className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                        {drill.categoryLabel}
                      </span>
                      <span className="text-xs font-mono text-gray-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                        {drill.difficulty}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {drill.name}
                    </h2>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {drill.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-400 font-mono">
                    <span>{drill.duration}</span>
                    <span className="text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                      Start Drill <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 mb-16">
            <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No Drills Found</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              We couldn&apos;t find any drills matching &ldquo;{query}&rdquo;. Try searching for &ldquo;flick&rdquo;, &ldquo;memory&rdquo;, &ldquo;reaction&rdquo;, or browse categories above.
            </p>
            <button
              onClick={() => { setQuery(''); setCategoryFilter('all'); }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 transition-colors"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<DrillLoading />}>
      <SearchResultsContent />
    </Suspense>
  );
}
