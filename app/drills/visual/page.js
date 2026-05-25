import VisualDrillsClient from './VisualDrillsClient';

export const metadata = {
  title: 'Visual Training - 14 Drills for Vision | SkillDrills',
  description: '14 free visual training drills across 5 categories. Improve reaction speed, tracking accuracy, peripheral vision, and recognition.',
  keywords: [
    'visual drills', 'reaction speed training', 'tracking accuracy', 'peripheral vision',
    'visual recognition', 'depth perception', 'go no-go test', 'light reaction',
    'sound reaction', 'moving target tracking', 'pursuit tracker', 'multiple targets',
    'peripheral flash', 'wide field awareness', 'difference spotter', 'visual search',
    'rapid object identification', 'distance judgment', 'free visual training',
    'entropic grid', 'rhythm anomaly', 'strobe latency', 'chroma sync',
    'kinetic intercept', 'ghost link tracking', 'auto pursuit',
    'skilldrills visual', 'skilldrills vision training',
  ],
  openGraph: {
    title: 'Visual Training - 14 Drills for Vision | SkillDrills',
    description: '14 free visual training drills across 5 categories. Improve reaction speed, tracking accuracy, peripheral vision, and recognition.',
    type: 'website',
    url: 'https://skilldrills.online/drills/visual',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Visual Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Training - 14 Drills for Vision | SkillDrills',
    description: '14 free visual training drills across 5 categories. Improve reaction speed, tracking accuracy, peripheral vision, and recognition.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual',
  },
};

export default function VisualDrillsPage() {
  return (
    <>
      <noscript>
        <h1>Visual Training Drills - 14 Free Exercises for Reaction Speed, Tracking & Vision</h1>
        <p>14 free visual training drills across Reaction Speed, Tracking Accuracy, Peripheral Vision, Visual Recognition, and Depth Perception. No sign-up required.</p>
      </noscript>
      <VisualDrillsClient />
    </>
  );
}