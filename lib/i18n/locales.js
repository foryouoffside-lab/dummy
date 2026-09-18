// Supported locales for SkillDrills Global SEO
export const LOCALES = ['en', 'pt', 'es', 'ja', 'de', 'ko', 'fr'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_META = {
  en: { name: 'English', native: 'English', flag: '🇺🇸', code: 'en-US', region: 'Global' },
  pt: { name: 'Portuguese', native: 'Português (Brasil)', flag: '🇧🇷', code: 'pt-BR', region: 'Brazil & Portugal' },
  es: { name: 'Spanish', native: 'Español', flag: '🇪🇸', code: 'es-ES', region: 'LATAM & Spain' },
  ja: { name: 'Japanese', native: '日本語', flag: '🇯🇵', code: 'ja-JP', region: 'Japan' },
  de: { name: 'German', native: 'Deutsch', flag: '🇩🇪', code: 'de-DE', region: 'Germany & DACH' },
  ko: { name: 'Korean', native: '한국어', flag: '🇰🇷', code: 'ko-KR', region: 'South Korea' },
  fr: { name: 'French', native: 'Français', flag: '🇫🇷', code: 'fr-FR', region: 'France & Western Europe' },
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
  '/drills/physical/balance-training/stability-challenge',
  '/drills/physical/coordination/complex-pattern',
  '/drills/physical/coordination/cross-body-movement',
  '/drills/physical/coordination/dynamic-grid-evasion',
  '/drills/physical/fitness/agility-ladder',
  '/drills/physical/fitness/jump-sequence',
  '/drills/physical/fitness/speed-drill',
  '/drills/physical/reflex-training/drop-catch',
  '/drills/physical/reflex-training/peripheral-threat-sweeper',
  '/drills/physical/reflex-training/quick-dodge',
  '/drills/physical/reflex-training/reaction-chain',
  '/drills/cognitive/processing-speed/symbol-matching',
  '/drills/cognitive/processing-speed/rsvp-reader',
  '/drills/cognitive/processing-speed/reaction-time',
  '/drills/cognitive/attention/multi-tasking',
  '/drills/cognitive/attention/concentration-stamina',
  '/drills/cognitive/attention/divided-attention',
  '/drills/reaction-speed/market-doors-pursuit',
  '/drills/reaction-speed/barrier-sequence-pursuit',
  '/drills/reaction-speed/saccadic-gallery',
  '/drills/reaction-speed/fps-tracking-trainer',
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
  '/drills/motor/precision-control/tracing',
  '/drills/motor/movement-speed/finger-sequencing',
  '/drills/motor/hand-eye-coordination/drag-and-drop',
  '/drills/motor/hand-eye-coordination/precision-flick-shot',
  '/drills/reaction-speed/reaction-time-test',
  '/drills/reaction-speed/reflex-training-drill',
  '/drills/cognitive/focus/distraction-fighter',
  '/drills/motor/keyboard-tester',
  '/drills/motor/hand-eye-coordination/aim-trainer',
  '/drills/reaction-speed/reaction-game',
  '/drills/reaction-speed/visual-tracking-speed-test',
  '/drills/motor/movement-speed/keyboard-recognition',
  '/drills/fps/angle-hold-trainer',
  '/drills/memory/short-term-memory/color-sequence',
  '/drills/visual/depth-perception/distance-judgment',
  '/drills/motor/precision-control/steady-hand',
  '/drills/fps/recoil-control',
  '/drills/fps/strafe-tracking',
  '/drills/cognitive/focus/concentration-grid',
  '/drills/memory/working-memory/n-back',
  '/drills/memory/spatial-memory/grid-memorization',
  '/drills/memory/short-term-memory/digit-span',
  '/drills/memory/short-term-memory/word-recall',
  '/drills/memory/spatial-memory/object-location',
  '/drills/memory/spatial-memory/path-tracing',
  '/drills/fps/vertical-air-track',
  '/drills/fps/target-switching-swarm',
  '/drills/fps/target-acquisition',
  '/drills/fps/target-prioritization',
  '/drills/fps/flick-shot-training',
  '/drills/fps/micro-correction-precision',
  '/drills/fps/180-degree-awareness',
  '/drills/fps/instant-response',
  '/drills/fps/anti-strafe-jitter-duel',
  '/drills/fps/anti-zigzag-movement-trainer',
  '/drills/fps/pro-smooth-pursuit',
  '/drills/fps/flow-state',
  '/drills/visual/reaction-speed/go/no-go',
  '/drills/visual/reaction-speed/light-reaction',
  '/drills/visual/tracking-accuracy/moving-target',
  '/drills/visual/tracking-accuracy/multiple-targets',
  '/drills/visual/tracking-accuracy/pursuit-tracker',
  '/drills/visual/visual-recognition/entropic-grid',
  '/drills/visual/visual-recognition/rhythm-anomaly',
  '/drills/visual/visual-recognition/visual-search',
  '/drills/visual-tracking/constant-slow-pursuit',
  '/drills/visual-tracking/directional-chaos-pursuit',
  '/drills/visual-tracking/dynamic-evasion-pursuit',
  '/drills/visual-tracking/ghosting-suppress-pursuit',
  '/drills/visual-tracking/infinity-pursuit',
  '/drills/visual-tracking/momentum-teleport-pursuit',
  '/drills/visual-tracking/peripheral-ping-pursuit',
  '/drills/visual-tracking/predictive-pursuit',
  '/drills/visual-tracking/sine-wave-pursuit',
  '/drills/visual-tracking/spatial-shift-pursuit',
  '/drills/visual-tracking/split-screen-tracking',
  '/drills/visual-tracking/staircase-step',
  '/drills/visual-tracking/strobe-prediction-pursuit',
  '/drills/visual-tracking/triangular-pursuit',
  '/drills/visual-tracking/zig-zag-path-pursuit',
];

/**
 * Route-to-locales mapping for routes that exist only in a subset of locales.
 * Routes not listed here exist across all non-default locales (pt, es, ja, de, ko).
 */
export const ROUTE_LOCALES = {
  '/drills/physical/balance-training/stability-challenge': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/coordination/complex-pattern': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/coordination/cross-body-movement': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/coordination/dynamic-grid-evasion': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/fitness/agility-ladder': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/fitness/jump-sequence': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/fitness/speed-drill': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/reflex-training/drop-catch': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/reflex-training/peripheral-threat-sweeper': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/reflex-training/quick-dodge': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/physical/reflex-training/reaction-chain': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/processing-speed/symbol-matching': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/processing-speed/rsvp-reader': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/processing-speed/reaction-time': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/attention/multi-tasking': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/attention/concentration-stamina': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/attention/divided-attention': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/market-doors-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/barrier-sequence-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/saccadic-gallery': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/fps-tracking-trainer': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/precision-control/tracing': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/movement-speed/finger-sequencing': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/hand-eye-coordination/drag-and-drop': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/hand-eye-coordination/precision-flick-shot': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/vertical-air-track': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/target-switching-swarm': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/target-acquisition': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/target-prioritization': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/flick-shot-training': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/micro-correction-precision': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/180-degree-awareness': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/angle-hold-trainer': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/instant-response': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/anti-strafe-jitter-duel': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/anti-zigzag-movement-trainer': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/pro-smooth-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/flow-state': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/reaction-time-test': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/reflex-training-drill': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/focus/distraction-fighter': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/movement-speed/rapid-tapping': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/movement-speed/keyboard-recognition': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/memory/short-term-memory/color-sequence': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/depth-perception/distance-judgment': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/motor/precision-control/steady-hand': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/recoil-control': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/fps/strafe-tracking': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/cognitive/focus/concentration-grid': ['es', 'pt', 'ja', 'ko', 'de', 'fr'],
  '/drills/memory/working-memory/n-back': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/memory/spatial-memory/grid-memorization': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/memory/short-term-memory/digit-span': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/memory/short-term-memory/word-recall': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/memory/spatial-memory/object-location': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/memory/spatial-memory/path-tracing': ['ja', 'ko', 'de', 'es', 'pt', 'fr'],
  '/drills/motor/keyboard-tester': ['pt', 'ko', 'ja', 'fr', 'de', 'es'],
  '/drills/motor/hand-eye-coordination/aim-trainer': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/reaction-game': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/reaction-speed/visual-tracking-speed-test': ['ko', 'ja', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/reaction-speed/go/no-go': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/reaction-speed/light-reaction': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/tracking-accuracy/moving-target': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/tracking-accuracy/multiple-targets': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/tracking-accuracy/pursuit-tracker': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/visual-recognition/entropic-grid': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/visual-recognition/rhythm-anomaly': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual/visual-recognition/visual-search': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/constant-slow-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/directional-chaos-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/dynamic-evasion-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/ghosting-suppress-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/infinity-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/momentum-teleport-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/peripheral-ping-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/predictive-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/sine-wave-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/spatial-shift-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/split-screen-tracking': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/staircase-step': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/strobe-prediction-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/triangular-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
  '/drills/visual-tracking/zig-zag-path-pursuit': ['ja', 'ko', 'de', 'pt', 'es', 'fr'],
};

/** Locales that only have specific verified drill routes and no full category trees. */
export const PARTIAL_LOCALES = [];

/**
 * Native slugs for routes whose locale URL should carry the market's own
 * keyword instead of the English path. Keyed by the ENGLISH route.
 * A route absent here keeps the English path under its locale prefix.
 */
export const LOCALIZED_SLUGS = {
  '/drills/motor/keyboard-tester': { pt: '/teste-de-teclado' },
};

/** The one place a locale URL is constructed. Every consumer calls this. */
export function localeUrl(locale, route) {
  if (!locale || locale === DEFAULT_LOCALE) return route;
  if (route === '/') return '/' + locale;
  return '/' + locale + (LOCALIZED_SLUGS[route]?.[locale] ?? route);
}

/** Native slug -> English route, derived from LOCALIZED_SLUGS. */
const SLUG_TO_ROUTE = Object.entries(LOCALIZED_SLUGS).reduce((acc, [route, byLoc]) => {
  for (const [loc, slug] of Object.entries(byLoc)) acc[loc + slug] = route;
  return acc;
}, {});

/** Strip a leading locale prefix, returning the underlying English route. */
export function stripLocale(pathname = '/') {
  const clean = pathname.startsWith('/') ? pathname : '/' + pathname;
  const noSlash = clean.slice(1);
  if (SLUG_TO_ROUTE[noSlash]) return SLUG_TO_ROUTE[noSlash];
  if (SLUG_TO_ROUTE[clean]) return SLUG_TO_ROUTE[clean];

  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    if (clean === '/' + loc || clean.startsWith('/' + loc + '/')) {
      const remainder = clean.slice(loc.length + 1) || '/';
      return SLUG_TO_ROUTE[loc + remainder] ?? remainder;
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
  if (hasLocalizedRoute(locale, route)) return localeUrl(locale, route);

  // Walk up until a localized ancestor is found.
  const parts = route.split('/').filter(Boolean);
  for (let i = parts.length - 1; i > 0; i--) {
    const ancestor = '/' + parts.slice(0, i).join('/');
    if (hasLocalizedRoute(locale, ancestor)) return localeUrl(locale, ancestor);
  }
  return localeUrl(locale, '/');
}

/**
 * True when `pathname` has a real page.js under `locale` -- i.e. an exact entry
 * in LOCALIZED_ROUTES matching the locale's route set, with no ancestor fallback.
 *
 * WHY THIS EXISTS ALONGSIDE localizedPath()
 * localizedPath() deliberately degrades to the nearest localized ancestor,
 * which is right for navigation chrome: a language switcher on an untranslated
 * drill page should land you on the translated hub rather than a 404.
 *
 * It is wrong for a link whose whole purpose is to reach one specific page. A
 * drill card on /ko/drills/reaction-speed degrades to /ko/drills/reaction-speed
 * -- the page the visitor is already on -- so the card would silently do
 * nothing. Callers that need "the localized page or the English one, never a
 * third thing" test with this first and fall back to the English href.
 */
export function hasLocalizedRoute(locale, pathname = '/') {
  if (!locale || locale === DEFAULT_LOCALE || !LOCALES.includes(locale)) return false;
  const route = stripLocale(pathname);
  if (!LOCALIZED_ROUTES.includes(route)) return false;
  if (ROUTE_LOCALES[route]) {
    return ROUTE_LOCALES[route].includes(locale);
  }
  if (PARTIAL_LOCALES.includes(locale)) return false;
  return true;
}

/**
 * Returns alternate language links for Next.js metadata alternates.
 * Strictly checks hasLocalizedRoute so alternates never emit 404 URLs.
 */
export function getAlternateLanguages(pathname = '') {
  const cleanPath = pathname.startsWith('/') ? pathname : '/' + pathname;
  const route = stripLocale(cleanPath);

  const languages = {};
  languages['en'] = 'https://skilldrills.online' + (route === '/' ? '' : route);
  languages['x-default'] = 'https://skilldrills.online' + (route === '/' ? '' : route);

  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    if (hasLocalizedRoute(loc, route)) {
      languages[loc] = 'https://skilldrills.online' + localeUrl(loc, route);
    }
  }
  return languages;
}
