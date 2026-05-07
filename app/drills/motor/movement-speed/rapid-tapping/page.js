import RapidTappingClient from './RapidTappingClient';

export const metadata = {
  title: 'Perpetual Singularity - Rapid Tapping Speed & Endurance Training',
  description: 'Endless rapid tapping drill where you click a shrinking ball to keep it alive. 10 clicks = 1 point. Difficulty increases 12% every 3 seconds. Max ball size 140px. Survival-based with local best score tracking.',
  keywords: [
    'rapid tapping', 'click speed test', 'tapping endurance', 'mouse clicking speed',
    'click per second', 'tapping drill', 'endurance clicking', 'rapid click training',
    'mouse spam test', 'click speed drill', 'tapping stamina', 'perpetual clicking',
    'free tapping test', 'click endurance', 'mouse speed endurance'
  ],
  openGraph: {
    title: 'Perpetual Singularity - Rapid Tapping Endurance Drill',
    description: 'Endless survival tapping drill. 10 clicks = 1 point. Difficulty +12% every 3 seconds. Click the shrinking ball to keep it alive. Beat your best survival time.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/rapid-tapping',
  },
};

export default function RapidTappingPage() {
  return <RapidTappingClient />;
}