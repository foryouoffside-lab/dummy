// Supported locales for SkillDrills Global SEO
export const LOCALES = ['en', 'pt', 'es', 'ja', 'de', 'ko'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_META = {
  en: { name: 'English', native: 'English', flag: '🇺🇸', code: 'en-US', region: 'Global' },
  pt: { name: 'Portuguese', native: 'Português (Brasil)', flag: '🇧🇷', code: 'pt-BR', region: 'Brazil & Portugal' },
  es: { name: 'Spanish', native: 'Español', flag: '🇪🇸', code: 'es-ES', region: 'LATAM & Spain' },
  ja: { name: 'Japanese', native: '日本語', flag: '🇯🇵', code: 'ja-JP', region: 'Japan' },
  de: { name: 'German', native: 'Deutsch', flag: '🇩🇪', code: 'de-DE', region: 'Germany & DACH' },
  ko: { name: 'Korean', native: '한국어', flag: '🇰🇷', code: 'ko-KR', region: 'South Korea' },
};

/**
 * The routes that actually exist under every locale prefix, i.e. the ones with
 * a page.js in app/pt, app/es, app/ja, app/ko and app/de.
 *
 * This list is load-bearing. Only these 11 of the site's ~150 routes are
 * localized, so blindly prefixing an arbitrary path with a locale produces a
 * 404 -- which is what the language switcher, the language-suggestion banner
 * and the header's drill search all used to do on every drill page. Keep it in
 * step with the locale route trees; app/sitemap.js reads it too, so a route
 * added here without a page.js becomes a 404 in the sitemap.
 */
export const LOCALIZED_ROUTES = [
  '/',
  '/drills',
  '/drills/fps',
  '/drills/reaction-speed',
  '/drills/cognitive',
  '/drills/memory',
  '/drills/motor',
  '/drills/physical',
  '/drills/visual',
  '/drills/visual-tracking',
  '/drills/motor/movement-speed/rapid-tapping',
];

/** Strip a leading locale prefix, returning the underlying English route. */
export function stripLocale(pathname = '/') {
  const clean = pathname.startsWith('/') ? pathname : '/' + pathname;
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    if (clean === '/' + loc || clean.startsWith('/' + loc + '/')) {
      return clean.slice(loc.length + 1) || '/';
    }
  }
  return clean;
}

/**
 * Map an English route into `locale`, degrading to the nearest localized
 * ancestor instead of inventing a URL that does not exist. A Portuguese
 * visitor on /drills/fps/flick-shot-training lands on /pt/drills/fps -- the
 * localized hub that lists that drill -- rather than a 404.
 */
export function localizedPath(locale, pathname = '/') {
  const route = stripLocale(pathname);
  if (!locale || locale === DEFAULT_LOCALE || !LOCALES.includes(locale)) {
    return route;
  }
  const prefix = (r) => (r === '/' ? '/' + locale : '/' + locale + r);
  if (LOCALIZED_ROUTES.includes(route)) return prefix(route);

  // Walk up until a localized ancestor is found.
  const parts = route.split('/').filter(Boolean);
  for (let i = parts.length - 1; i > 0; i--) {
    const ancestor = '/' + parts.slice(0, i).join('/');
    if (LOCALIZED_ROUTES.includes(ancestor)) return prefix(ancestor);
  }
  return prefix('/');
}

/**
 * Returns alternate language links for Next.js metadata alternates
 */
export function getAlternateLanguages(pathname = '') {
  const cleanPath = pathname.startsWith('/') ? pathname : '/' + pathname;
  // Strip existing locale prefix if present
  let route = cleanPath;
  for (const loc of LOCALES) {
    if (loc !== DEFAULT_LOCALE && (route === '/' + loc || route.startsWith('/' + loc + '/'))) {
      route = route.slice(loc.length + 1) || '/';
      break;
    }
  }

  const languages = {};
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) {
      languages['en'] = 'https://skilldrills.online' + (route === '/' ? '' : route);
      languages['x-default'] = 'https://skilldrills.online' + (route === '/' ? '' : route);
    } else {
      const locPath = route === '/' ? '/' + loc : '/' + loc + route;
      languages[loc] = 'https://skilldrills.online' + locPath;
    }
  }
  return languages;
}
