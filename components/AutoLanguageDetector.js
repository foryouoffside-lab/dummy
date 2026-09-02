'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, X, ArrowRight } from 'lucide-react';
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, localizedPath } from '@/lib/i18n/locales';

const PROMPTS = {
  pt: {
    flag: '🇧🇷',
    msg: 'Detectamos que seu idioma é Português.',
    btn: 'Mudar para Português',
  },
  es: {
    flag: '🇪🇸',
    msg: 'Hemos detectado que tu idioma es Español.',
    btn: 'Cambiar a Español',
  },
  ja: {
    flag: '🇯🇵',
    msg: 'お使いの言語（日本語）が検出されました。',
    btn: '日本語版へ切り替え',
  },
  de: {
    flag: '🇩🇪',
    msg: 'Wir haben erkannt, dass Ihre Sprache Deutsch ist.',
    btn: 'Auf Deutsch wechseln',
  },
  ko: {
    flag: '🇰🇷',
    msg: '사용자 언어가 한국어로 감지되었습니다.',
    btn: '한국어로 전환',
  },
};

function localeFromPath(pathname) {
  for (const loc of LOCALES) {
    if (loc !== DEFAULT_LOCALE
        && (pathname === '/' + loc || pathname.startsWith('/' + loc + '/'))) {
      return loc;
    }
  }
  return DEFAULT_LOCALE;
}

export default function AutoLanguageDetector() {
  const [suggestion, setSuggestion] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Keep <html lang> in step with the URL's locale. The root layout hardcodes
  // lang="en" and is the only place <html> is emitted, so a per-route value is
  // not reachable from the server without moving all 150 routes under an
  // app/[locale] segment. This corrects it for readers, screen readers and
  // crawlers that execute JS; the prerendered HTML still ships lang="en".
  // Its own effect on purpose -- the suggestion effect below early-returns
  // once a visitor has chosen or dismissed, and the lang must be set anyway.
  useEffect(() => {
    const loc = localeFromPath(pathname || '');
    const tag = (LOCALE_META[loc] && LOCALE_META[loc].code) || loc;
    if (document.documentElement.lang !== tag) {
      document.documentElement.lang = tag;
    }
  }, [pathname]);

  useEffect(() => {
    try {
      // 1. Check if user already dismissed or explicitly picked a locale
      const saved = localStorage.getItem('skilldrills_locale');
      const dismissed = sessionStorage.getItem('skilldrills_dismissed_lang');
      if (saved || dismissed) return;

      // 2. Check current page locale
      const currentLocale = localeFromPath(pathname || '');

      // 3. Detect browser language
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      let matchedLocale = null;
      if (browserLang.startsWith('pt')) matchedLocale = 'pt';
      else if (browserLang.startsWith('es')) matchedLocale = 'es';
      else if (browserLang.startsWith('ja')) matchedLocale = 'ja';
      else if (browserLang.startsWith('de')) matchedLocale = 'de';
      else if (browserLang.startsWith('ko')) matchedLocale = 'ko';

      // 4. If browser language doesn't match current locale, offer switch
      if (matchedLocale && matchedLocale !== currentLocale && PROMPTS[matchedLocale]) {
        setSuggestion(matchedLocale);
      }
    } catch (e) {}
  }, [pathname]);

  if (!suggestion) return null;
  const prompt = PROMPTS[suggestion];

  const handleAccept = () => {
    try {
      localStorage.setItem('skilldrills_locale', suggestion);
    } catch (e) {}

    setSuggestion(null);
    router.push(localizedPath(suggestion, pathname || '/'));
  };

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('skilldrills_dismissed_lang', 'true');
    } catch (e) {}
    setSuggestion(null);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-neutral-900/95 border border-blue-500/30 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 font-sans">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xl">{prompt.flag}</span>
          <span className="text-xs font-bold text-slate-200">{prompt.msg}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
          aria-label="Dismiss language suggestion"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
        >
          {prompt.btn} <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleDismiss}
          className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition cursor-pointer"
        >
          Stay in English
        </button>
      </div>
    </div>
  );
}
