import { DRILLS } from '@/lib/drillsRegistry';
import DrillBreadcrumb from '@/components/drill/DrillBreadcrumb';
import RelatedDrills from '@/components/drill/RelatedDrills';

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
    'reaction time test', 'memory games', 'eye tracking training'
  ],
  openGraph: {
    title: 'Training Drills | SkillDrills',
    description: `${DRILLS.length}+ free interactive drills for gaming, cognitive, and motor skills training.`,
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
        <DrillBreadcrumb />
        {children}
        {/* Renders only on leaf drill pages; self-gates on the pathname, so hub
            pages keep their own grids. Mounted here rather than in each of the
            81 drill clients so the cross-link mesh stays in one place. */}
        <RelatedDrills />
      </main>
    </>
  );
}