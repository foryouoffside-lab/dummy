// lib/i18n/drillNames.js
// Per-locale override layer for drill display names and taglines.
// Keyed strictly by canonical English href -> locale -> { name, tagline }.
//
// WHY THIS FILE EXISTS:
// lib/drillsRegistry.js and lib/drillCatalog.js are flat English.
// When rendering drill cards, H1s, and internal anchor text in localized views,
// this provides native terminology justified by empirical keyword research.
//
// CONSTRAINT (§5.1):
// Only populate locales Phase 1 demand research justified (ko and ja).
// Unjustified locales fall back to canonical English defaults.

export const DRILL_LOCALIZATIONS = {
  '/drills/reaction-speed/reaction-time-test': {
    ko: {
      name: '반응속도 테스트',
      tagline: '밀리초(ms) 단위 시각 반응속도 정밀 측정 및 등급 판정',
    },
    ja: {
      name: '反応速度テスト',
      tagline: 'ミリ秒単位で視覚反射スピードを正確に測定・診断',
    },
  },
  '/drills/reaction-speed/reflex-training-drill': {
    ja: {
      name: '反射神経ゲーム',
      tagline: '画面に出現する複数ターゲットを素早くタップして反射神経を強化',
    },
  },
};

/**
 * Returns localized name and tagline for a drill with English fallback.
 *
 * @param {string} href - Canonical English route (e.g. '/drills/reaction-speed/reaction-time-test')
 * @param {string} locale - Active locale code (e.g. 'ko', 'ja', 'en')
 * @param {string} fallbackName - Default English display name
 * @param {string} fallbackTagline - Default English tagline
 * @returns {{ name: string, tagline: string }}
 */
export function getLocalizedDrill(href, locale, fallbackName = '', fallbackTagline = '') {
  if (!href) return { name: fallbackName, tagline: fallbackTagline };
  const locEntry = DRILL_LOCALIZATIONS[href]?.[locale];
  return {
    name: locEntry?.name || fallbackName,
    tagline: locEntry?.tagline || fallbackTagline,
  };
}
