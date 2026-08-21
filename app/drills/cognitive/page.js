import CognitiveHubClient from './CognitiveHubClient';
import { DRILLS } from '../../../lib/drillsRegistry';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');
const cognitiveDrillCount = cognitiveDrills.length;

export const metadata = {
  title: 'Free Brain Training - Focus & Attention | SkillDrills',
  description: `Free cognitive training online. ${cognitiveDrillCount} science-based drills for attention, focus, and processing speed. No sign-up. Play instantly in your browser.`,
  keywords: [
    'cognitive training online', 'free cognitive training', 'cognitive training drills',
    'brain training games', 'free brain training', 'brain training online',
    'attention training', 'attention span test', 'divided attention game',
    'selective attention test', 'concentration training',
    'focus training', 'focus concentration game', 'distraction fighter game',
    'symbol matching game', 'rsvp speed reading', 'processing speed test',
    'cognitive speed training', 'reaction time cognitive',
    'cognitive flexibility game', 'executive function training', 'attention games',
    'brain cognitive exercises', 'mental agility training', 'cognitive performance',
    'cognitive skills improvement', 'cognitive ability test online',
    'esports cognitive training', 'gamer brain training', 'fps cognitive drills',
    'skilldrills cognitive', 'free online cognitive drills', 'no download brain games',
    'attention focus reaction speed game', 'brain performance training',
  ],
  openGraph: {
    title: 'Free Cognitive Training Online - Attention, Focus & Reaction Speed Drills | SkillDrills',
    description: `Free cognitive training online. ${cognitiveDrillCount} science-based drills for attention, focus, and processing speed.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free Cognitive Training Online - Brain Training Drills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cognitive Training Online - Attention, Focus & Reaction Speed Drills | SkillDrills',
    description: `Free cognitive training online. ${cognitiveDrillCount} drills — attention, focus, processing speed. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/cognitive' },
};

export default function CognitiveDrillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Cognitive Training Online - Attention, Focus & Reaction Speed Drills",
        "url": "https://skilldrills.online/drills/cognitive",
        "description": `${cognitiveDrillCount} free cognitive training drills online. Attention, focus, and processing speed exercises. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": cognitiveDrills.map((drill) => ({
          "@type": "WebApplication",
          "name": drill.name,
          "url": `https://skilldrills.online${drill.href}`
        }))
      })}} />
      <CognitiveHubClient />
    </>
  );
}