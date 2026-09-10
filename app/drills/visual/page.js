import VisualDrillsClient from './VisualDrillsClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const visualDrillCount = DRILLS.filter((d) => d.category === 'visual').length;

export const metadata = {
  title: `Free Visual Training Online - Vision & Tracking Drills`,
  description: `Free visual training online. ${visualDrillCount} drills for reaction speed, tracking accuracy, depth perception and visual recognition. No sign-up needed.`,
  keywords: [
    'visual training online', 'free visual training', 'visual training drills',
    'reaction time test', 'reaction time training', 'reaction speed test',
    'visual perception training', 'depth perception test', 'visual perception game',
    'tracking accuracy game', 'eye tracking training', 'visual tracking game',
    'visual search test', 'visual recognition game',
    'go no go test', 'impulse control training', 'inhibition control game',
    'light reaction test',
    'multiple object tracking', 'smooth pursuit tracking', 'moving target game',
    'visual pattern recognition', 'rhythm anomaly game',
    'visual processing speed', 'brain vision training', 'eye training online',
    'vision training exercises', 'visual skill training', 'cognitive visual training',
    'fps visual training', 'gaming vision training', 'esports vision drill',
    'skilldrills visual', 'free vision drills', 'online vision training',
    'no download visual game', 'browser visual training', 'instant vision drill',
    'comprehensive visual training', 'vision improvement game',
    'depth perception exercises', 'go no go test online',
    'multiple object tracking test', 'visual search training',
    'sports vision training drills', 'how to improve visual reaction speed',
  ],
  openGraph: {
    title: `Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills`,
    description: `Free visual training online. ${visualDrillCount} drills for reaction speed, tracking accuracy, depth perception, and visual recognition. No sign-up.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/visual',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Visual Training Online - Reaction & Tracking Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free Visual Training Online - Reaction Speed, Tracking & Perception Drills | SkillDrills`,
    description: `Free visual training online. ${visualDrillCount} drills — reaction speed, tracking accuracy, depth perception, visual recognition. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual',
    languages: getAlternateLanguages('/drills/visual'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do depth perception drills improve spatial judgment and athletic vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depth perception drills train binocular stereopsis and oculomotor convergence—the simultaneous inward turning of both eyes to triangulate distance. Conditioning the visual cortex to interpret subtle size, shadow, and disparity cues sharpens distance judgment, crucial for catching balls, driving, and estimating enemy distances in tactical 3D environments."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Go/No-Go test, and how does it measure cognitive impulse control?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Go/No-Go test measures response inhibition and selective attention by requiring a rapid action on target stimuli (Go) while suppressing motor responses to distractors (No-Go). This engages the right inferior frontal cortex and basal ganglia, training your motor system to suppress misclicks and impulsive mistakes under high visual stress."
      }
    },
    {
      "@type": "Question",
      "name": "What is Multiple Object Tracking (MOT), and why is it used by pro athletes and pilots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiple Object Tracking (MOT) challenges you to maintain spatial attention across 3 to 5 moving targets while ignoring identical moving distractors. Proven by cognitive neuroscience research, MOT expands the parietal visual attention buffer, enhancing situational awareness, split-second tactical decisions, and multi-opponent tracking in football, basketball, and esports."
      }
    },
    {
      "@type": "Question",
      "name": "How does visual search training (entropic grids) accelerate target acquisition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based on Anne Treisman's Feature Integration Theory, visual search drills train the brain to transition from slow serial scanning to rapid parallel feature extraction. Practicing on high-entropy visual grids conditions contrast sensitivity and visual noise filtering, helping you spot camouflaged enemies or sudden environmental changes instantaneously."
      }
    },
    {
      "@type": "Question",
      "name": "Why is light-based visual reaction time slower than auditory reaction time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual reaction time averages approximately 190 to 250 milliseconds, which is roughly 40ms slower than auditory reaction time (150 to 170ms). This physiological difference exists because retinal photoreceptors require 20 to 40ms for chemical phototransduction, whereas auditory hair cells transmit mechanical vibrations to the auditory nerve almost instantaneously."
      }
    },
    {
      "@type": "Question",
      "name": "What is visual rhythm anomaly detection, and how does it refine timing accuracy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visual rhythm anomaly drills test your brain's internal cerebellar clock by presenting continuous periodic visual pulses with subtle phase or interval irregularities. Training temporal sensitivity sharpens beat anticipation, rhythm synchronization, and rapid anomaly spotting in high-speed kinetic environments."
      }
    },
    {
      "@type": "Question",
      "name": "How can you prevent digital eye strain and ciliary muscle fatigue during visual drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To prevent asthenopia (eye strain), adhere to the clinical 20-20-20 rule: every 20 minutes of screen training, look at an object at least 20 feet away for 20 seconds. This fully relaxes the eye's ciliary muscles, resets focal accommodation, and prompts natural blink rates to restore the corneal tear film."
      }
    },
    {
      "@type": "Question",
      "name": "Can online visual training games produce measurable improvements in real-world vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. While drills do not alter the physical optical shape of the eyeball (like refractive error), they significantly improve perceptual learning and cortical neuroplasticity in visual areas V1 through V5. Athletes and gamers demonstrate measurable gains in visual processing speed, contrast sensitivity, and saccadic fixation efficiency with consistent daily practice."
      }
    }
  ]
};

export default function VisualDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Visual Training Online - Reaction Speed, Tracking & Perception Drills",
        "url": "https://skilldrills.online/drills/visual",
        "description": `${visualDrillCount} free visual training drills online. Reaction speed tests, tracking accuracy games, depth perception tests, and visual recognition exercises. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": [
          { "@type": "WebApplication", "name": "Depth Perception Test - Distance Judgment", "url": "https://skilldrills.online/drills/visual/depth-perception/distance-judgment" },
          { "@type": "WebApplication", "name": "Go No Go Test - Impulse Control Drill", "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go" },
          { "@type": "WebApplication", "name": "Reaction Time Test - Light Reaction", "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction" },
          { "@type": "WebApplication", "name": "Moving Target Tracking Game", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target" },
          { "@type": "WebApplication", "name": "Multiple Object Tracking - Ghost-Link", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets" },
          { "@type": "WebApplication", "name": "Smooth Pursuit Tracking - Auto-Pursuit", "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker" },
          { "@type": "WebApplication", "name": "Visual Search Game - Entropic Grid", "url": "https://skilldrills.online/drills/visual/visual-recognition/entropic-grid" },
          { "@type": "WebApplication", "name": "Visual Pattern Recognition - Rhythm Anomaly", "url": "https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly" },
          { "@type": "WebApplication", "name": "Visual Search Test - Conjunctive Scanning", "url": "https://skilldrills.online/drills/visual/visual-recognition/visual-search" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}