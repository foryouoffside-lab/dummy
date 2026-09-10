import VisualTrackingDrillsClient from './VisualTrackingDrillsClient';
import { DRILLS } from '../../../lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');
const trackingDrillCount = trackingDrills.length;

export const metadata = {
  title: `Free Eye Tracking Training - Smooth Pursuit Drills`,
  description: `Free eye tracking training online. ${trackingDrillCount} smooth pursuit eye movement drills. Train your gaze for sports, gaming, and vision therapy. No sign-up required.`,
  keywords: [
    'eye tracking training online', 'free eye tracking training', 'eye tracking exercises',
    'smooth pursuit eye movement', 'smooth pursuit training', 'pursuit eye training',
    'eye tracking game', 'gaze tracking training', 'eye movement training',
    'visual tracking exercises', 'eye coordination training', 'eye agility training',
    'infinity pursuit eye', 'sine wave pursuit',
    'peripheral ping pursuit', 'predictive pursuit drill', 'staircase step eye',
    'split screen tracking', 'strobe prediction pursuit', 'constant slow pursuit',
    'sports vision training', 'athlete eye training', 'esports eye training',
    'gaming eye tracking', 'fps eye movement training', 'baseball vision training',
    'vision therapy exercises online', 'convergence eye training', 'gaze stability',
    'eye tracking for sports', 'pro gamer vision', 'free online eye drills',
    'browser eye tracking game', 'no download eye training', 'skilldrills visual tracking',
    'smooth pursuit eye movement exercises', 'catch up saccades tracking',
    'dynamic visual acuity training', 'vision therapy eye tracking online',
    'gaze stability exercises', 'predictive visual pursuit drill',
  ],
  openGraph: {
    title: `Free Eye Tracking Training Online - ${trackingDrillCount} Smooth Pursuit Drills | SkillDrills`,
    description: `Free eye tracking training online. ${trackingDrillCount} smooth pursuit drills for sports, gaming, and vision therapy. No sign-up.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Eye Tracking Training Online - Smooth Pursuit Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free Eye Tracking Training Online - ${trackingDrillCount} Smooth Pursuit Drills | SkillDrills`,
    description: `Free eye tracking training online. ${trackingDrillCount} smooth pursuit drills. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking',
    languages: getAlternateLanguages('/drills/visual-tracking'),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between Smooth Pursuit and Saccadic eye movements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Smooth Pursuit Eye Movements (SPEM) involve voluntary, continuous tracking of a moving visual target to keep its image centered on the high-acuity fovea. In contrast, Saccades are rapid, ballistic jumps (up to 900 degrees/second) that shift gaze between stationary points. Athletes and gamers rely on smooth pursuit to track trajectories continuously and saccades to snap rapidly between targets."
      }
    },
    {
      "@type": "Question",
      "name": "How does dynamic visual tracking training improve sports performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In fast-pitch sports like baseball, cricket, tennis, and motorsports, visual tracking drills improve dynamic visual acuity (DVA). Conditioning the extraocular muscles allows athletes to maintain clear vision on high-velocity balls longer, reducing perceptual delay and giving batters 50 to 80 milliseconds of additional decision-making time."
      }
    },
    {
      "@type": "Question",
      "name": "What is predictive pursuit, and how does the brain track occluded targets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Predictive pursuit occurs when the brain uses an internal cerebellar forward model to project the future trajectory of an object even when it is temporarily hidden or strobed. Drills with intermittent target occlusion train your visual cortex to extrapolate velocity and acceleration, ensuring your gaze arrives ahead of the target."
      }
    },
    {
      "@type": "Question",
      "name": "What causes catch-up saccades during eye tracking, and how do you fix them?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Catch-up saccades occur when your smooth pursuit velocity falls behind target speed (pursuit gain < 1.0), forcing an involuntary eye jerk to catch up. Graduated speed drills—such as constant-slow pursuit and sinusoidal wave tracking—condition continuous ocular motor gain, smoothing eye movement and eliminating visual jitter."
      }
    },
    {
      "@type": "Question",
      "name": "Can smooth pursuit eye tracking drills assist in vision therapy and concussion rehab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Neuro-optometrists frequently prescribe smooth pursuit and gaze stabilization exercises for post-concussion syndrome and oculomotor dysfunction. Progressive tracking exercises stimulate the brainstem and cerebellum, helping restore binocular coordination, reduce dizziness, and improve reading endurance."
      }
    },
    {
      "@type": "Question",
      "name": "What is gaze stability, and how does it relate to the Vestibulo-Ocular Reflex (VOR)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gaze stability is the ability to keep your line of sight fixed on a target while your body, head, or environment is in motion. It relies on the Vestibulo-Ocular Reflex (VOR), which produces compensatory eye movements equal and opposite to head movement. Visual tracking drills isolate fine extraocular control, strengthening visual-vestibular coordination."
      }
    },
    {
      "@type": "Question",
      "name": "How long should you practice eye tracking drills each day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The recommended routine is 10 to 15 minutes per day, 3 to 5 days per week. The six extraocular muscles controlling eye movement are delicate and fatigue quickly; exceeding 20 minutes of continuous tracking can cause accommodative spasm, dry eyes, or ocular strain."
      }
    },
    {
      "@type": "Question",
      "name": "Why do high refresh rate monitors (144Hz to 360Hz) matter for visual tracking drills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard 60Hz displays present discrete frame jumps every 16.7ms, causing visual 'strobing' or phantom arrays during rapid eye tracking. Displays running at 144Hz, 240Hz, or 360Hz present new object coordinates every 2.7 to 6.9ms, matching real-world continuous physics and allowing the ocular motor system to track with true organic smoothness."
      }
    }
  ]
};

export default function VisualTrackingDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Free Eye Tracking Training Online - ${trackingDrillCount} Smooth Pursuit Drills`,
        "url": "https://skilldrills.online/drills/visual-tracking",
        "description": `${trackingDrillCount} free eye tracking training drills online. Smooth pursuit exercises (sine-wave, infinity, staircase, predictive, and more). No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": trackingDrills.map((drill) => ({
          "@type": "WebApplication",
          "name": drill.name,
          "url": `https://skilldrills.online${drill.href}`
        }))
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
