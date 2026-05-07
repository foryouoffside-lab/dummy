import PeripheralAwarenessClient from './PeripheralAwarenessClient';

export const metadata = {
  title: 'Peripheral Awareness Drill - Edge Target Detection & FPS Vision Training',
  description: 'Train peripheral vision by detecting edge-spawning white targets while fixating on a green center crosshair. 5 lives system with penalty scoring after lives depleted. Directional arrows guide your peripheral tracking. 60-second challenge.',
  keywords: [
    'peripheral awareness', 'edge target detection', 'peripheral vision FPS',
    'visual field training', 'peripheral target drill', 'FPS awareness training',
    'edge spawning targets', 'peripheral vision drill', 'vision training FPS',
    'center fixation drill', 'directional arrow guide', 'free FPS trainer',
    'peripheral detection test', 'gaming vision practice'
  ],
  openGraph: {
    title: 'Peripheral Awareness Drill - Edge Target Detection Training',
    description: 'White targets spawn at screen edges. Keep eyes on green center crosshair and use peripheral vision to detect and click targets. Directional arrows guide you. 5 lives with penalty scoring.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/peripheral-awareness',
  },
};

export default function PeripheralAwarenessPage() {
  return <PeripheralAwarenessClient />;
}