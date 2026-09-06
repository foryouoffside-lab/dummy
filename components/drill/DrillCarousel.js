'use client';

/**
 * DrillCarousel — the drill picker used on every hub page.
 *
 * WHY A CAROUSEL AND NOT A GRID
 * A hub used to open with 8-15 full-height cards, each carrying a paragraph of
 * description. On a phone that is a wall of text you scroll past rather than
 * choose from. This shows one drill at a time (two on tablet, three on desktop)
 * with previous/next arrows, ordered so the drill most people want is first,
 * and keeps the full grid behind a "View all" toggle.
 *
 * WHY EVERY CARD STAYS IN THE DOM
 * Rendering only the visible card would strip every other drill link out of the
 * server HTML. That is the exact failure that left 82 of 91 URLs uncrawled
 * before (see docs/SEO_PROGRESS.md — `{isOpen && children}` accordions). So the
 * track holds all cards and the browser scrolls between them; the arrows drive
 * `scrollTo`, never a render. Crawlers see every link, and swipe still works.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Play, LayoutGrid, Rows3 } from 'lucide-react';
import DrillPreview from '@/components/drill/DrillPreview';
import { getDrillPreview } from '@/lib/drillPreviews';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { hasLocalizedRoute } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

// Tailwind scans source for complete class strings, so each accent spells its
// classes out in full. Do not build these by interpolation.
const ACCENTS = {
  violet: {
    text: 'text-violet-400',
    chip: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    hoverText: 'group-hover:text-violet-400',
    focus: 'focus-visible:ring-violet-500/60',
    dot: 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.75)]',
  },
  red: {
    text: 'text-red-400',
    chip: 'bg-red-500/10 border-red-500/20 text-red-400',
    hoverBorder: 'hover:border-red-500/40',
    hoverText: 'group-hover:text-red-400',
    focus: 'focus-visible:ring-red-500/60',
    dot: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.75)]',
  },
  indigo: {
    text: 'text-indigo-400',
    chip: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverText: 'group-hover:text-indigo-400',
    focus: 'focus-visible:ring-indigo-500/60',
    dot: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.75)]',
  },
  emerald: {
    text: 'text-emerald-400',
    chip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverText: 'group-hover:text-emerald-400',
    focus: 'focus-visible:ring-emerald-500/60',
    dot: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.75)]',
  },
  rose: {
    text: 'text-rose-400',
    chip: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    hoverBorder: 'hover:border-rose-500/40',
    hoverText: 'group-hover:text-rose-400',
    focus: 'focus-visible:ring-rose-500/60',
    dot: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.75)]',
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    chip: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
    hoverBorder: 'hover:border-fuchsia-500/40',
    hoverText: 'group-hover:text-fuchsia-400',
    focus: 'focus-visible:ring-fuchsia-500/60',
    dot: 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.75)]',
  },
  cyan: {
    text: 'text-cyan-400',
    chip: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverText: 'group-hover:text-cyan-400',
    focus: 'focus-visible:ring-cyan-500/60',
    dot: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.75)]',
  },
  amber: {
    text: 'text-amber-400',
    chip: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    hoverText: 'group-hover:text-amber-400',
    focus: 'focus-visible:ring-amber-500/60',
    dot: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.75)]',
  },
};

const DIFFICULTY_CHIP = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Advanced: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Expert: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

function difficultyChip(difficulty) {
  return DIFFICULTY_CHIP[difficulty] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
}

/**
 * One drill card. Title and subtitle are each hard-clamped to a single line —
 * that is the whole point of the redesign, so it is enforced here rather than
 * left to whoever writes the copy.
 */
function DrillCard({ drill, accent, icon: Icon, className = '' }) {
  const a = ACCENTS[accent] || ACCENTS.violet;
  const hasPreview = Boolean(getDrillPreview(drill.href));
  // drill.href is the canonical English route and stays that way: it is the
  // lookup key for the preview registry and the React key. Only the link the
  // visitor follows is localized.
  //
  // hasLocalizedRoute, not localizeHref, decides that. localizeHref degrades to
  // the nearest localized ancestor, and since no drill page is translated yet
  // every card on /ko/drills/reaction-speed would resolve to that same hub --
  // a card that silently reloads the page it is on. Falling back to the English
  // href keeps the drill reachable and playable. Once a drill gains a locale
  // page and an entry in LOCALIZED_ROUTES, this starts pointing at it with no
  // further change here.
  const { locale, localizeHref, t } = useTranslation();
  const href = hasLocalizedRoute(locale, drill.href) ? localizeHref(drill.href) : drill.href;
  const localized = getLocalizedDrill(drill.href, locale, drill.name, drill.tagline);
  const displayName = localized.name;
  const displayTagline = localized.tagline;

  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between rounded-2xl border border-hairline bg-surface-1 p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 ${a.hoverBorder} ${a.focus} ${className}`}
    >
      <div>
        {hasPreview ? (
          <div className="relative mb-3.5">
            <DrillPreview href={drill.href} accent={accent} icon={Icon} className="w-full" />
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border backdrop-blur-md bg-surface-1/80 ${a.chip} shadow-sm`}>
                {Icon ? <Icon className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </span>
            </div>
            <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
              {drill.badge && (
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-wider backdrop-blur-md bg-surface-1/80 ${a.chip}`}>
                  {drill.badge}
                </span>
              )}
              <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-surface-1/80 ${difficultyChip(drill.difficulty)}`}>
                {drill.difficulty ? t(`ui.difficulty.${drill.difficulty.toLowerCase()}`, drill.difficulty) : drill.difficulty}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${a.chip}`}>
              {Icon ? <Icon className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              {drill.badge && (
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-wider ${a.chip}`}>
                  {drill.badge}
                </span>
              )}
              <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${difficultyChip(drill.difficulty)}`}>
                {drill.difficulty ? t(`ui.difficulty.${drill.difficulty.toLowerCase()}`, drill.difficulty) : drill.difficulty}
              </span>
            </span>
          </div>
        )}

        <h3 className={`text-[15px] font-bold text-ink-1 tracking-tight truncate transition-colors ${a.hoverText}`}>
          {displayName}
        </h3>
        <p className="mt-1 text-xs text-ink-3 truncate">{displayTagline}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-2xs font-mono text-ink-3">
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{drill.duration}</span>
        </span>
        <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider ${a.text}`}>
          {t('ui.play', 'Play')}
          <Play className="w-3 h-3 fill-current transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function DrillCarousel({
  drills,
  accent = 'violet',
  icon,
  heading = 'Pick a drill',
  headingId,
  allLabel = 'View all',
}) {
  const { t } = useTranslation();
  const trackRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const total = drills.length;

  // Step size is read from the live layout rather than assumed, so the arrows
  // stay correct across the 1 / 2 / 3-up breakpoints without duplicating them here.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return null;
    const cardWidth = track.firstElementChild.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    const step = cardWidth + gap;
    return { track, step: step > 0 ? step : 1 };
  }, []);

  const syncFromScroll = useCallback(() => {
    const m = measure();
    if (!m) return;
    setIndex(Math.round(m.track.scrollLeft / m.step));
    setPerView(Math.max(1, Math.round(m.track.clientWidth / m.step)));
  }, [measure]);

  useEffect(() => {
    if (showAll) return;
    syncFromScroll();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', syncFromScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll);
    return () => {
      track.removeEventListener('scroll', syncFromScroll);
      window.removeEventListener('resize', syncFromScroll);
    };
  }, [showAll, syncFromScroll]);

  const scrollToIndex = (target) => {
    const m = measure();
    if (!m) return;
    const next = Math.min(Math.max(target, 0), Math.max(total - perView, 0));
    m.track.scrollTo({ left: next * m.step, behavior: 'smooth' });
    setIndex(next);
  };

  const go = (direction) => scrollToIndex(index + direction);

  const lastIndex = Math.max(total - perView, 0);
  // One stop per scroll position, so three-up desktop shows fewer dots
  // than one-up mobile rather than dots that cannot be reached.
  const stops = lastIndex + 1;
  const atStart = index <= 0;
  const atEnd = index >= lastIndex;
  const arrowsUseful = total > perView;

  const arrowClass = (disabled) =>
    `inline-flex items-center justify-center w-10 h-10 rounded-xl border border-hairline bg-surface-1 transition-colors ${
      disabled ? 'text-ink-3/40 cursor-not-allowed' : 'text-ink-1 hover:bg-surface-2 hover:border-hairline-2'
    }`;

  const a = ACCENTS[accent] || ACCENTS.violet;

  return (
    <section aria-labelledby={headingId} className="mb-14">
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-hairline pb-3">
        <h2 id={headingId} className="text-sm sm:text-lg font-bold uppercase tracking-wider text-ink-1 font-mono leading-tight min-w-0">
          {heading}
        </h2>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 h-10 rounded-xl border border-hairline bg-surface-1 text-2xs font-mono font-bold uppercase tracking-wider text-ink-2 hover:text-ink-1 hover:bg-surface-2 transition-colors"
            aria-pressed={showAll}
          >
            {showAll ? <Rows3 className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{showAll ? t('ui.oneAtATime', 'One at a time') : allLabel}</span>
          </button>

          {!showAll && arrowsUseful && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                className={arrowClass(atStart)}
                aria-label={t('ui.prevDrill', 'Previous drill')}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                className={arrowClass(atEnd)}
                aria-label={t('ui.nextDrill', 'Next drill')}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {showAll ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drills.map((drill) => (
            <DrillCard key={drill.href} drill={drill} accent={accent} icon={drill.icon || icon} className="h-full" />
          ))}
        </div>
      ) : (
        <>
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 pb-2 sm:mx-0 sm:px-0"
          >
            {drills.map((drill) => (
              <DrillCard
                key={drill.href}
                drill={drill}
                accent={accent}
                icon={drill.icon || icon}
                className="snap-start shrink-0 w-[82%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
              />
            ))}
          </div>

          {arrowsUseful && (
            /*
             * Step dots, not a fill bar. A percentage bar answers "how far
             * through the list am I" -- a question nobody asks of eight drills.
             * One dot per stop answers the useful one ("how many are left, and
             * can I jump there"), and each dot is a real button, so the deck is
             * navigable by tap on a phone where the arrows are a small target.
             */
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {Array.from({ length: stops }).map((_, i) => {
                const isActive = i === Math.min(index, stops - 1);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={t('ui.goToDrill', 'Go to drill {n}').replace('{n}', String(i + 1))}
                    aria-current={isActive ? 'true' : undefined}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${a.focus} ${
                      isActive
                        ? `w-9 ${a.dot}`
                        : 'w-5 bg-ink-3/25 hover:bg-ink-3/50'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
