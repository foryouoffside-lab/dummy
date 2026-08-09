import VisualTrackingDrillsClient from './VisualTrackingDrillsClient';
import { DRILLS } from '../../../lib/drillsRegistry';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');
const trackingDrillCount = trackingDrills.length;

export const metadata = {
  title: `Free Eye Tracking Training Online - ${trackingDrillCount} Smooth Pursuit Drills | SkillDrills`,
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
  alternates: { canonical: 'https://skilldrills.online/drills/visual-tracking' },
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
      <VisualTrackingDrillsClient />
    </>
  );
}
