// Single source of truth for the 8 training categories.
//
// This list used to be copy-pasted three times (home page, /drills directory,
// site footer) and had already drifted — the home page called them "disciplines"
// with invented codes like DISC-01 while the directory called the same thing
// "FPS Gaming". One list, one vocabulary, everywhere.
import { Gamepad2, Brain, Database, Dumbbell, Compass, Eye, Activity, Zap } from 'lucide-react';
import { DRILLS } from './drillsRegistry';

export const SITE_CATEGORIES = [
  {
    cat: 'fps',
    name: 'FPS Aim',
    tagline: 'Flicks, tracking and recoil control',
    // What you actually do, in plain words. No paradigm names, no benchmarks
    // we have never measured.
    blurb: 'Click moving targets under time pressure with raw mouse input.',
    href: '/drills/fps',
    icon: Gamepad2,
    color: 'from-red-500 to-orange-600',
    accent: 'text-red-400',
    ring: 'group-hover:shadow-red-500/20',
    glow: 'rgba(239,68,68,0.28)',
    hoverBorder: 'hover:border-red-500/40',
    goals: ['aim', '5min'],
  },
  {
    cat: 'cognitive',
    name: 'Cognitive',
    tagline: 'Focus, attention and processing speed',
    blurb: 'Switch rules mid-task and hold attention while the screen fights you.',
    href: '/drills/cognitive',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    accent: 'text-purple-400',
    ring: 'group-hover:shadow-purple-500/20',
    glow: 'rgba(168,85,247,0.28)',
    hoverBorder: 'hover:border-purple-500/40',
    goals: ['new', 'remember', '5min'],
  },
  {
    cat: 'memory',
    name: 'Memory',
    tagline: 'Digit span, sequences and spatial recall',
    blurb: 'Hold a sequence in your head, then play it back as it gets longer.',
    href: '/drills/memory',
    icon: Database,
    color: 'from-indigo-500 to-purple-600',
    accent: 'text-indigo-400',
    ring: 'group-hover:shadow-indigo-500/20',
    glow: 'rgba(99,102,241,0.28)',
    hoverBorder: 'hover:border-indigo-500/40',
    goals: ['remember', 'new'],
  },
  {
    cat: 'motor',
    name: 'Motor Skills',
    tagline: 'Mouse precision and click speed',
    blurb: 'Micro-target snaps, click-speed tests and timing accuracy.',
    href: '/drills/motor',
    icon: Dumbbell,
    color: 'from-emerald-500 to-teal-600',
    accent: 'text-emerald-400',
    ring: 'group-hover:shadow-emerald-500/20',
    glow: 'rgba(16,185,129,0.28)',
    hoverBorder: 'hover:border-emerald-500/40',
    goals: ['aim', '5min'],
  },
  {
    cat: 'physical',
    name: 'Physical',
    tagline: 'Reflex, balance and coordination',
    blurb: 'WASD directional reflexes, evasion and whole-body coordination.',
    href: '/drills/physical',
    icon: Compass,
    color: 'from-rose-500 to-red-600',
    accent: 'text-rose-400',
    ring: 'group-hover:shadow-rose-500/20',
    glow: 'rgba(251,113,133,0.28)',
    hoverBorder: 'hover:border-rose-500/40',
    goals: ['react', 'new'],
  },
  {
    cat: 'visual',
    name: 'Visual',
    tagline: 'Peripheral vision and depth perception',
    blurb: 'Spot flashes at the edge of vision and judge distance at speed.',
    href: '/drills/visual',
    icon: Eye,
    color: 'from-fuchsia-500 to-pink-600',
    accent: 'text-fuchsia-400',
    ring: 'group-hover:shadow-fuchsia-500/20',
    glow: 'rgba(232,121,249,0.28)',
    hoverBorder: 'hover:border-fuchsia-500/40',
    goals: ['react', '5min'],
  },
  {
    cat: 'visual-tracking',
    name: 'Visual Tracking',
    tagline: 'Smooth pursuit and gaze stability',
    blurb: 'Keep the cursor glued to a target that never stops moving.',
    href: '/drills/visual-tracking',
    icon: Activity,
    color: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-400',
    ring: 'group-hover:shadow-cyan-500/20',
    glow: 'rgba(34,211,238,0.28)',
    hoverBorder: 'hover:border-cyan-500/40',
    goals: ['aim', 'react'],
  },
  {
    cat: 'reaction-speed',
    name: 'Reaction Speed',
    tagline: 'Reaction time tests and reflex drills',
    blurb: 'React to a sudden trigger and see your response time in milliseconds.',
    href: '/drills/reaction-speed',
    icon: Zap,
    color: 'from-amber-500 to-yellow-600',
    accent: 'text-amber-400',
    ring: 'group-hover:shadow-amber-500/20',
    glow: 'rgba(245,158,11,0.28)',
    hoverBorder: 'hover:border-amber-500/40',
    goals: ['react', '5min', 'new'],
  },
];

export const CATEGORY_ACCENTS = Object.fromEntries(
  SITE_CATEGORIES.map((c) => [c.cat, c.accent])
);

export function getCategoryDrills(cat) {
  return DRILLS.filter((d) => d.category === cat);
}

export function getCategoryCount(cat) {
  return getCategoryDrills(cat).length;
}

// The first few real drill names in a category. Category cards show these so a
// visitor can see what is actually inside before committing to a click.
export function getCategorySampleNames(cat, limit = 3) {
  return getCategoryDrills(cat).slice(0, limit).map((d) => d.name);
}
