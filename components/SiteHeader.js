'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, Menu, ChevronRight } from 'lucide-react';
import { searchDrills } from '@/lib/searchDrills';
import { DRILLS, DESKTOP_ONLY_CATEGORIES } from '@/lib/drillsRegistry';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/lib/i18n/useTranslation';

const DRILL_HREFS = new Set(DRILLS.map((drill) => drill.href));

const navCategories = [
  { id: 'fps', name: 'FPS', href: '/drills/fps', color: 'text-red-400', activeBg: 'bg-red-500/10 border-red-500/30 text-red-400' },
  { id: 'cognitive', name: 'Cognitive', href: '/drills/cognitive', color: 'text-purple-400', activeBg: 'bg-purple-500/10 border-purple-500/30 text-purple-400' },
  { id: 'memory', name: 'Memory', href: '/drills/memory', color: 'text-indigo-400', activeBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' },
  { id: 'motor', name: 'Motor', href: '/drills/motor', color: 'text-emerald-400', activeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
  { id: 'physical', name: 'Physical', href: '/drills/physical', color: 'text-rose-400', activeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400' },
  { id: 'visual', name: 'Visual', href: '/drills/visual', color: 'text-fuchsia-400', activeBg: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400' },
  { id: 'tracking', name: 'Tracking', href: '/drills/visual-tracking', color: 'text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' },
  { id: 'reaction', name: 'Reaction', href: '/drills/reaction-speed', color: 'text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
];

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, localizeHref } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const totalDrillsCount = DRILLS.length;

  // Header is limited to hub/category landing pages — hide it on individual drill pages
  const isDrillPage = DRILL_HREFS.has(pathname);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const matched = searchDrills(query);
      setResults(matched);
      setIsOpen(true);
      setSelectedIndex(-1);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle outside click & escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setMobileSearchExpanded(false);
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDownInput = (e) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        e.preventDefault();
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < Math.min(results.length, 8) - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : Math.min(results.length, 8) - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setIsOpen(false);
      if (selectedIndex >= 0 && selectedIndex < Math.min(results.length, 8)) {
        router.push(results[selectedIndex].href);
      } else if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleSelectResult = (href) => {
    setIsOpen(false);
    setQuery('');
    setMobileSearchExpanded(false);
    router.push(href);
  };

  if (isDrillPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#06070B]/90 backdrop-blur-xl border-b border-hairline shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Logo Mark */}
          <Link
            href={localizeHref('/')}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg group shrink-0"
            aria-label="SkillDrills Home"
          >
            <img
              src="/logo.svg"
              alt="SkillDrills"
              width={30}
              height={30}
              className="w-[30px] h-[30px] shrink-0"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Skill<span className="text-blue-400">Drills</span>
            </span>
          </Link>

          {/* Search Bar - Responsive */}
          <div ref={searchRef} className={`relative flex-1 max-w-md ${mobileSearchExpanded ? 'block' : 'hidden sm:block'}`}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-ink-3 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setIsOpen(true)}
                onKeyDown={handleKeyDownInput}
                placeholder={t('header.searchPlaceholder', `Search ${totalDrillsCount} drills... (Ctrl+K)`)}
                className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-surface-1 border border-hairline rounded-xl text-ink-1 placeholder:text-ink-3 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); setIsOpen(false); }}
                  className="absolute right-2.5 text-ink-3 hover:text-white p-0.5"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface-2 border border-hairline-2 rounded-xl shadow-2xl overflow-hidden z-50">
                {results.length > 0 ? (
                  <>
                    <div className="max-h-80 overflow-y-auto divide-y divide-hairline">
                      {results.slice(0, 8).map((drill, idx) => (
                        <div
                          key={drill.id}
                          onClick={() => handleSelectResult(localizeHref(drill.href))}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0 p-3 cursor-pointer transition-colors ${
                            idx === selectedIndex ? 'bg-blue-600/20 text-white' : 'hover:bg-white/5 text-ink-2'
                          }`}
                        >
                          <div className="flex flex-col min-w-0 sm:pr-2">
                            <span className="text-xs sm:text-sm font-semibold truncate">{drill.name}</span>
                            <span className="text-2xs text-ink-3 truncate">{drill.subcategory || drill.categoryLabel}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {drill.category}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-ink-3 border border-hairline">
                              {drill.difficulty}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {results.length > 8 && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                        }}
                        className="w-full p-2.5 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-surface-1 border-t border-hairline flex items-center justify-center gap-1"
                      >
                        See all {results.length} results <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="p-4 text-center text-xs sm:text-sm text-ink-3">
                    No drills matching &ldquo;<span className="text-white">{query}</span>&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navCategories.map((cat) => {
              const targetHref = localizeHref(cat.href);
              const isActive = pathname === cat.href || pathname === targetHref || pathname?.startsWith(`${targetHref}/`);
              const label = t('header.' + cat.id, cat.name);
              return (
                <Link
                  key={cat.id}
                  href={targetHref}
                  className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                    isActive 
                      ? `${cat.activeBg} font-semibold` 
                      : 'border-transparent text-ink-2 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href={localizeHref('/drills')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ml-1.5 ${
                pathname === '/drills' || pathname === localizeHref('/drills')
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-hairline'
              }`}
            >
              {t('header.allHubs', 'All Hubs')}
            </Link>
            <div className="ml-2 border-l border-white/10 pl-2">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1 sm:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileSearchExpanded(!mobileSearchExpanded)}
              className="p-2 text-ink-3 hover:text-white rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle search input"
            >
              {mobileSearchExpanded ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink-3 hover:text-white rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-hairline grid grid-cols-2 gap-2">
            {navCategories.map((cat) => {
              const targetHref = localizeHref(cat.href);
              const isActive = pathname === cat.href || pathname === targetHref || pathname?.startsWith(`${targetHref}/`);
              const isDesktopOnly = DESKTOP_ONLY_CATEGORIES.some((d) => cat.href.endsWith(`/${d}`));
              const label = t('header.' + cat.id, cat.name);
              return (
                <Link
                  key={cat.id}
                  href={targetHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between gap-1.5 ${
                    isActive ? cat.activeBg : 'text-ink-2 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span className="truncate">{label}</span>
                    {isDesktopOnly && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                        Desktop
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-ink-3 shrink-0" />
                </Link>
              );
            })}
            <Link
              href={localizeHref('/drills')}
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 mt-2 px-3 py-2.5 text-center text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg"
            >
              {t('header.allHubs', 'All Hubs Directory')} ({totalDrillsCount} Drills)
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
