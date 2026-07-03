import VelocityMatcherClient from './VelocityMatcherClient';

export const metadata = {
  title: 'Motion Prediction Game - Free Visual Speed Judgment Test | SkillDrills',
  description: 'Play the free motion prediction game online. Track orbiting elements at changing velocities and click when they align. Train visual speed judgment, motion prediction, and timing accuracy — no download needed.',
  keywords: [
    'motion prediction game', 'visual speed judgment test', 'motion prediction game online',
    'moving object speed game', 'visual motion speed game online',
    'motion speed estimation game', 'orbital timing game',
    'visual speed perception test online free', 'moving object speed judgment test',
    'timing accuracy game', 'velocity matching game', 'orbital synchronization game',
    'prediction training game', 'hand eye coordination game', 'browser timing game',
    'athlete speed perception training', 'visual motion speed training',
    'sports vision speed game', 'baseball pitch speed estimation game',
    'trigger discipline training', 'FPS timing practice', 'Valorant aim trainer',
    'CS2 trigger timing game', 'esports reaction training',
    'visual processing speed test', 'perceptual speed game',
    'Human Benchmark alternative', 'cognitive timing game browser'
  ],
  openGraph: {
    title: 'Motion Prediction Game - Free Visual Speed Judgment Test',
    description: 'Track orbiting elements at changing velocities and click when they align. Free browser motion prediction game training visual speed judgment and timing accuracy. No download.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor/timing-accuracy/velocity-matcher',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Motion Prediction Game — Visual Speed Judgment Trainer | SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Prediction Game - Free Visual Speed Judgment Test',
    description: 'Train visual speed judgment and motion prediction. Orbital timing game — click when elements align at changing velocities. Free, no download.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/velocity-matcher' },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
    { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
    { "@type": "ListItem", "position": 3, "name": "Timing Accuracy", "item": "https://skilldrills.online/drills/motor/timing-accuracy" },
    { "@type": "ListItem", "position": 4, "name": "Motion Prediction Game", "item": "https://skilldrills.online/drills/motor/timing-accuracy/velocity-matcher" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org", "@type": "WebApplication",
  "name": "Motion Prediction Game — Visual Speed Judgment Trainer | SkillDrills",
  "url": "https://skilldrills.online/drills/motor/timing-accuracy/velocity-matcher",
  "description": "Free orbital timing and motion prediction game. Orbiting elements move at dynamically changing velocities — click the instant they align to score. Trains visual speed judgment, velocity estimation, and trigger discipline with adaptive difficulty scaling.",
  "applicationCategory": "EducationalApplication", "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true, "learningResourceType": "Educational Game",
  "teaches": "Motion Prediction, Visual Speed Judgment, Velocity Estimation, Timing Accuracy, Trigger Discipline, Visual Motor Skills"
};

const howToSchema = {
  "@context": "https://schema.org", "@type": "HowTo",
  "name": "How to Play the Motion Prediction Game",
  "description": "Train visual speed judgment and motion prediction using the SkillDrills orbital velocity timing game.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Watch the orbital motion", "text": "Two orbital elements move around a center point at varying speeds. Watch carefully — the velocity changes dynamically to prevent pattern memorization. Your visual cortex must continuously re-evaluate their trajectory." },
    { "@type": "HowToStep", "position": 2, "name": "Predict the alignment point", "text": "Use motion prediction: observe the current speed and angular momentum of each orbit, then calculate when they will overlap. This is visual speed judgment — the same skill baseball batters use to estimate pitch speed." },
    { "@type": "HowToStep", "position": 3, "name": "Click at the moment of overlap", "text": "Click (or tap/spacebar) the instant the two orbitals overlap. Perfect = within 10px of deviation. Accurate hits add survival time and build your combo multiplier. Misses drain the clock — avoid spam-clicking." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is velocity matching?", "acceptedAnswer": { "@type": "Answer", "text": "Velocity matching is the cognitive and motor skill of assessing the speed and trajectory of a moving object, predicting its future location, and synchronizing a physical action (like clicking) with that predicted state." } },
    { "@type": "Question", "name": "How do humans estimate the speed of moving objects?", "acceptedAnswer": { "@type": "Answer", "text": "The brain uses the MT (middle temporal) cortex — also called V5 — to process visual motion. Neurons in this area fire in proportion to the object's speed and direction, allowing rapid velocity estimation through optical flow signals. This drill directly trains this visual speed judgment neural pathway." } },
    { "@type": "Question", "name": "What is timing prediction?", "acceptedAnswer": { "@type": "Answer", "text": "Timing prediction goes beyond simple reaction time. Instead of reacting to an unexpected event, you must anticipate when two moving elements will overlap based on their current acceleration and velocity." } },
    { "@type": "Question", "name": "Can you train yourself to better estimate velocity?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Research in sports psychology shows athletes — particularly baseball batters, cricket players, and tennis returners — develop significantly better velocity estimation through repetitive exposure to fast-moving objects. This orbital timing game replicates the same neural training loop in a browser-based format." } },
    { "@type": "Question", "name": "How does this improve FPS gaming?", "acceptedAnswer": { "@type": "Answer", "text": "In games like Valorant, CS2, and Apex Legends, enemies rarely stand still. This drill trains your brain to track target speed and click precisely when the target enters your crosshair — building trigger discipline." } },
    { "@type": "Question", "name": "Do athletes have better speed perception than non-athletes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — multiple studies confirm that trained athletes show faster and more accurate visual speed judgment than non-athletes. This advantage appears to be learned, not innate, meaning it can be improved with targeted training." } },
    { "@type": "Question", "name": "Does this improve hand-eye coordination?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, deeply. It connects visual processing of dynamic motion to exact muscular timing, which is the foundational pillar of advanced hand-eye coordination." } },
    { "@type": "Question", "name": "Is this useful for esports?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Professional esports athletes use motion prediction and timing accuracy games to isolate their trigger timing, reducing their margin of error during high-stress matches." } },
    { "@type": "Question", "name": "Can traditional athletes use it?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, athletes in sports like baseball, tennis, or motorsports use visual timing and object tracking exercises to improve their ability to intercept fast-moving objects." } },
    { "@type": "Question", "name": "How often should I practice?", "acceptedAnswer": { "@type": "Answer", "text": "For the best neuroplastic adaptation, play this timing accuracy game for 10 minutes a day before your main gaming or training sessions." } },
    { "@type": "Question", "name": "Does this improve trigger discipline?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. By heavily penalizing spam-clicking and rewarding exact synchronization, it teaches you to wait for the perfect, high-percentage shot rather than panicking." } },
    { "@type": "Question", "name": "What skills does it train?", "acceptedAnswer": { "@type": "Answer", "text": "It trains motion prediction, velocity tracking, visual speed judgment, timing accuracy, internal rhythm, and sustained focus under pressure." } },
    { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the drill is fully responsive. Tap the screen on mobile to trigger the synchronization, making it a great portable brain training game." } },
    { "@type": "Question", "name": "Why does the target change speed?", "acceptedAnswer": { "@type": "Answer", "text": "To prevent simple rhythmic memorization. The dynamic acceleration forces your brain to constantly re-evaluate the target's trajectory in real-time." } },
    { "@type": "Question", "name": "What is Adrenaline Mode?", "acceptedAnswer": { "@type": "Answer", "text": "When your survival clock drops below 15 seconds, the game increases visual and audio pressure (heartbeat, screen pulsing) to simulate clutch esports scenarios." } },
    { "@type": "Question", "name": "How is this different from a reaction time test?", "acceptedAnswer": { "@type": "Answer", "text": "Reaction tests measure how fast you respond after an event occurs. This game measures how accurately you can predict when an event will occur — the same neural process that allows a baseball batter to start their swing before the ball crosses the plate." } },
    { "@type": "Question", "name": "Is this a free timing game?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the Velocity Matcher is 100% free to play in your browser, with no downloads or subscriptions required." } },
    { "@type": "Question", "name": "How do I level up?", "acceptedAnswer": { "@type": "Answer", "text": "You level up automatically every time you earn 100 points. Higher levels feature faster orbits, tighter hit windows, and more frequent direction reversals." } },
    { "@type": "Question", "name": "What is a Perfect hit?", "acceptedAnswer": { "@type": "Answer", "text": "A Perfect hit occurs when you trigger the click while the two orbitals are overlapping with less than 10 pixels of deviation." } },
    { "@type": "Question", "name": "Does my score ever decrease?", "acceptedAnswer": { "@type": "Answer", "text": "No. Mistakes deduct from your time, not your score. Your score only goes up, representing how well you performed during your survival window." } },
    { "@type": "Question", "name": "Is this related to Human Benchmark?", "acceptedAnswer": { "@type": "Answer", "text": "This is a more advanced, gaming-focused alternative to standard human benchmark tests, offering endless scaling, visual speed judgment training, and deep performance analytics that Human Benchmark does not cover." } }
  ]
};

export default function VelocityMatcherPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VelocityMatcherClient />
    </>
  );
}
