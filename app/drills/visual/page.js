import VisualDrillsClient from './VisualDrillsClient';

export const metadata = {
  title: 'Visual Training - 13 Free Drills for Vision & Reaction | SkillDrills',
  description: '13 free visual training drills across 5 categories. Improve reaction speed, tracking accuracy, peripheral vision, recognition, and depth perception. No sign-up.',
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
    title: 'Visual Training - 13 Free Vision Drills | SkillDrills',
    description: '13 free visual training drills. Reaction, tracking, peripheral vision. No sign-up.',
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
    title: 'Visual Training - 13 Free Drills | SkillDrills',
    description: '13 free visual training drills. No sign-up required.',
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
        <h1>Visual Training Drills - Reaction Speed, Tracking, Peripheral Vision & Recognition</h1>
        <p>13 free visual training drills across 5 categories. No sign-up required.</p>
      </noscript>
      <VisualDrillsClient />
    </>
  );
}