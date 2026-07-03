export const metadata = {
  title: {
    default: 'Training Drills - SkillDrills',
    template: '%s | SkillDrills',
  },
  description: 'Free interactive training drills for FPS gaming, cognitive skills, memory, typing speed, visual tracking, motor skills, and mental fitness. 135+ drills across 10 categories.',
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
          Browse 135+ free interactive training drills organized into 10 categories: FPS Gaming, 
          Cognitive Training, Visual Training, Visual Tracking, Academic Drills, Productivity, Memory Training, 
          Motor Skills, Physical Training, and Mental Fitness. All drills are free with no 
          registration required.
        </p>
      </section>

      <main id="drills-main-content" role="main">
        {children}
      </main>
    </>
  );
}