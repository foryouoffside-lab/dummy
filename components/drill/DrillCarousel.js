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
 * before (see SEO_PROGRESS.md — `{isOpen && children}` accordions). So the
 * track holds all cards and the browser scrolls between them; the arrows drive
 * `scrollTo`, never a render. Crawlers see every link, and swipe still works.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Play, LayoutGrid, Rows3 } from 'lucide-react';

// Tailwind scans source for complete class strings, so each accent spells its
// classes out in full. Do not build these by interpolation.
const ACCENTS = {
  violet: {
    text: 'text-violet-400',
    chip: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    hoverText: 'group-hover:text-violet-400',
    focus: 'focus-visible:ring-violet-500/60',
    bar: 'bg-violet-500',
  },
  red: {
    text: 'text-red-400',
    chip: 'bg-red-500/10 border-red-500/20 text-red-400',
    hoverBorder: 'hover:border-red-500/40',
    hoverText: 'group-hover:text-red-400',
    focus: 'focus-visible:ring-red-500/60',
    bar: 'bg-red-500',
  },
  indigo: {
    text: 'text-indigo-400',
    chip: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverText: 'group-hover:text-indigo-400',
    focus: 'focus-visible:ring-indigo-500/60',
    bar: 'bg-indigo-500',
  },
  emerald: {
    text: 'text-emerald-400',
    chip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverText: 'group-hover:text-emerald-400',
    focus: 'focus-visible:ring-emerald-500/60',
    bar: 'bg-emerald-500',
  },
  rose: {
    text: 'text-rose-400',
    chip: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    hoverBorder: 'hover:border-rose-500/40',
    hoverText: 'group-hover:text-rose-400',
    focus: 'focus-visible:ring-rose-500/60',
    bar: 'bg-rose-500',
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    chip: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
    hoverBorder: 'hover:border-fuchsia-500/40',
    hoverText: 'group-hover:text-fuchsia-400',
    focus: 'focus-visible:ring-fuchsia-500/60',
    bar: 'bg-fuchsia-500',
  },
  cyan: {
    text: 'text-cyan-400',
    chip: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverText: 'group-hover:text-cyan-400',
    focus: 'focus-visible:ring-cyan-500/60',
    bar: 'bg-cyan-500',
  },
  amber: {
    text: 'text-amber-400',
    chip: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    hoverBorder: 'hover:border-amber-500/40',
    hoverText: 'group-hover:text-amber-400',
    focus: 'focus-visible:ring-amber-500/60',
    bar: 'bg-amber-500',
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
  return (
    <Link
      href={drill.href}
      className={`group flex flex-col justify-between rounded-2xl border border-hairline bg-surface-1 p-5 shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 ${a.hoverBorder} ${a.focus} ${className}`}
    >
      <div>
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
              {drill.difficulty}
            </span>
          </span>
        </div>

        <h3 className={`text-[15px] font-bold text-ink-1 tracking-tight truncate transition-colors ${a.hoverText}`}>
          {drill.name}
        </h3>
        <p className="mt-1 text-xs text-ink-3 truncate">{drill.tagline}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-2xs font-mono text-ink-3">
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{drill.duration}</span>
        </span>
        <span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider ${a.text}`}>
          Play
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

  const go = (direction) => {
    const m = measure();
    if (!m) return;
    const next = Math.min(Math.max(index + direction, 0), Math.max(total - perView, 0));
    m.track.scrollTo({ left: next * m.step, behavior: 'smooth' });
    setIndex(next);
  };

  const lastIndex = Math.max(total - perView, 0);
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
            <span className="hidden sm:inline">{showAll ? 'One at a time' : allLabel}</span>
          </button>

          {!showAll && arrowsUseful && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                className={arrowClass(atStart)}
                aria-label="Previous drill"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                className={arrowClass(atEnd)}
                aria-label="Next drill"
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
            <div className="flex items-center gap-3 mt-3">
              <div className="h-1 flex-1 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${a.bar}`}
                  style={{ width: `${Math.min(100, ((index + perView) / total) * 100)}%` }}
                />
              </div>
              <span className="text-2xs font-mono text-ink-3 tabular-nums shrink-0">
                {Math.min(index + perView, total)} / {total}
              </span>
            </div>
          )}
        </>
      )}
    </section>
  );
}
