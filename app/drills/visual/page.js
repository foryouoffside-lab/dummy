import VisualDrillsClient from './VisualDrillsClient';

export const metadata = {
  title: 'Visual Drills - Reaction Speed, Tracking, Peripheral Vision & Recognition Training',
  description: '12 free visual training drills covering Reaction Speed, Tracking Accuracy, Peripheral Vision, Visual Recognition, and Depth Perception. Improve reaction time, smooth pursuit, and change detection. No login required.',
  keywords: [
    'visual drills', 'reaction speed training', 'tracking accuracy', 'peripheral vision',
    'visual recognition', 'depth perception', 'go no-go test', 'light reaction',
    'sound reaction', 'moving target tracking', 'pursuit tracker', 'multiple targets',
    'peripheral flash', 'wide field awareness', 'difference spotter', 'visual search',
    'rapid object identification', 'distance judgment', 'free visual training'
  ],
  openGraph: {
    title: 'Visual Drills - Free Reaction Speed, Tracking & Vision Training',
    description: '12 free visual training drills across 5 categories. Improve reaction time, smooth pursuit tracking, peripheral vision, visual recognition, and depth perception. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/visual',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual',
  },
};

export default function VisualDrillsPage() {
  return <VisualDrillsClient />;
}