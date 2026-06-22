import EliteNeuroSwitchClient from './EliteNeuroSwitchClient';

export const metadata = {
  title: 'Elite Neuro-Switch - Cognitive Processing Speed Drill | SkillDrills',
  description: 'Train cognitive processing speed and reaction time with the Elite Neuro-Switch drill. Adaptive stimuli, dual-mode training, millisecond precision. Free, no sign-up.',
  keywords: [
    'cognitive processing speed training', 'reaction time test', 'reaction time training',
    'cognitive reaction time', 'elite neuro switch', 'neuro switch drill',
    'processing speed game', 'cognitive speed test', 'brain speed training',
    'neural reaction time', 'stimulus response training', 'adaptive reaction training',
    'dual mode reaction game', 'cognitive performance test', 'mental processing game',
    'information processing speed', 'cognitive reaction game', 'cognitive reflex training',
    'millisecond reaction test', 'rapid cognitive response', 'brain processing speed',
    'reaction speed drill online', 'free cognitive drill', 'no download reaction game',
  ],
  openGraph: {
    title: 'Elite Neuro-Switch - Cognitive Processing Speed Drill | SkillDrills',
    description: 'Train cognitive processing speed and reaction time. Adaptive stimuli, dual-mode training, millisecond precision.',
    type: 'website',
    url: 'https://skilldrills.online/drills/cognitive/processing-speed/reaction-time',
    siteName: 'SkillDrills',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Elite Neuro-Switch Processing Speed Drill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Neuro-Switch - Cognitive Processing Speed Drill | SkillDrills',
    description: 'Train cognitive processing speed and reaction time. Free, adaptive, no sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/cognitive/processing-speed/reaction-time' },
};

export default function EliteNeuroSwitchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Elite Neuro-Switch - Cognitive Processing Speed Drill",
        "url": "https://skilldrills.online/drills/cognitive/processing-speed/reaction-time",
        "description": "Train cognitive processing speed and reaction time with the Elite Neuro-Switch drill. Adaptive stimuli, dual-mode training, millisecond precision.",
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "SkillDrills" }
      })}} />
      <EliteNeuroSwitchClient />
    </>
  );
}