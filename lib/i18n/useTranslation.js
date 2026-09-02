'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, localizedPath } from '@/lib/i18n/locales';
import { DICTIONARIES } from '@/lib/i18n/dictionaries';

export function useTranslation() {
  const pathname = usePathname() || '';

  // Determine current locale from URL path
  let locale = DEFAULT_LOCALE;
  for (const loc of LOCALES) {
    if (loc !== DEFAULT_LOCALE && (pathname === '/' + loc || pathname.startsWith('/' + loc + '/'))) {
      locale = loc;
      break;
    }
  }

  const dict = DICTIONARIES[locale] || DICTIONARIES.en;
  const enDict = DICTIONARIES.en;

  /**
   * Helper to get localized route href
   */
  const localizeHref = (href = '/') => {
    if (locale === DEFAULT_LOCALE) return href;
    if (href.startsWith('http://') || href.startsWith('https://')) return href;
    // Route-aware: only 11 routes exist per locale, so this degrades to the
    // nearest localized ancestor rather than emitting a 404.
    return localizedPath(locale, href.startsWith('/') ? href : '/' + href);
  };

  /**
   * Translate helper with dot-notation and fallback
   */
  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let cur = dict;
    for (const k of keys) {
      if (cur && cur[k] !== undefined) {
        cur = cur[k];
      } else {
        cur = undefined;
        break;
      }
    }
    if (cur !== undefined) return cur;

    // Fallback to English dictionary
    let enCur = enDict;
    for (const k of keys) {
      if (enCur && enCur[k] !== undefined) {
        enCur = enCur[k];
      } else {
        enCur = undefined;
        break;
      }
    }
    return enCur !== undefined ? enCur : fallback;
  };

  return {
    locale,
    dict,
    t,
    localizeHref,
    isRTL: false,
  };
}
