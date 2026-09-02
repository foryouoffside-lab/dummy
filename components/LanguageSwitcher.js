'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, localizedPath } from '@/lib/i18n/locales';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect current active locale from pathname
  let currentLocale = DEFAULT_LOCALE;
  if (pathname) {
    for (const loc of LOCALES) {
      if (loc !== DEFAULT_LOCALE && (pathname === '/' + loc || pathname.startsWith('/' + loc + '/'))) {
        currentLocale = loc;
        break;
      }
    }
  }

  const currentMeta = LOCALE_META[currentLocale] || LOCALE_META.en;

  // Handle outside click to close
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocale = (newLocale) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // Save choice
    try {
      localStorage.setItem('skilldrills_locale', newLocale);
      document.cookie = `skilldrills_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {}

    // Only 11 routes are localized, so this resolves to the nearest localized
    // ancestor -- switching language on a drill page used to land on a 404.
    router.push(localizedPath(newLocale, pathname || '/'));
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left font-sans">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
        aria-label="Select Language"
      >
        <span className="text-sm">{currentMeta.flag}</span>
        <span className="hidden sm:inline uppercase text-[11px] tracking-wider">{currentLocale}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden z-50 py-1 divide-y divide-white/5">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-blue-400" /> Select Language
          </div>
          <div className="py-1">
            {LOCALES.map((loc) => {
              const meta = LOCALE_META[loc];
              const isSelected = loc === currentLocale;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleSelectLocale(loc)}
                  className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{meta.flag}</span>
                    <span>{meta.native}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
