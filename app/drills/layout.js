import { DRILLS } from '@/lib/drillsRegistry';

export const metadata = {
  title: {
    default: 'Training Drills - SkillDrills',
    // '%s' passthrough, not '%s | SkillDrills' — every child page's own title
    // already includes the "| SkillDrills" suffix, so a template that appends
    // it again produces "... | SkillDrills | SkillDrills" in the tab/SERP title.
    template: '%s',
  },
  description: `Free interactive training drills for FPS gaming, cognitive skills, memory, hand-eye coordination, visual tracking, and reaction speed. ${DRILLS.length}+ drills across 8 categories.`,
  keywords: [
    'training drills', 'brain training', 'FPS aim trainer', 'cognitive drills',
    'free online drills', 'skill training', 'interactive exercises',
    'reaction time test', 'memory games', 'typing speed test'
  ],
  openGraph: {
    title: 'Training Drills | SkillDrills',
    description: '135+ free interactive drills for gaming, cognitive, and motor skills training.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DrillsLayout({ children }) {
  return (
    <>
      <section className="sr-only" aria-label="Drills section description">
        <h2>SkillDrills Training Platform</h2>
        <p>
          Browse {DRILLS.length}+ free interactive training drills organized into 8 categories: FPS Gaming,
          Cognitive Training, Memory Training, Motor Skills, Physical Training, Visual Training,
          Visual Tracking, and Reaction Speed. All drills are free with no registration required.
        </p>
      </section>

      <main id="drills-main-content" role="main">
        {children}
      </main>
    </>
  );
}