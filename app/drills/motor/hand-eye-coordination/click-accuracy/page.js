import ClickAccuracyClient from './ClickAccuracyClient';

export const metadata = {
  title: 'Click Accuracy Elite - Precision Mouse Training & Teleport Tracking',
  description: 'Sharpen your mouse precision with a single target that teleports every 1.5 seconds. Targets shrink with streak. 60-second challenge with reaction time tracking and 3-life system. Free, no login required.',
  keywords: [
    'click accuracy', 'mouse precision', 'precision clicking', 'teleport target',
    'click trainer', 'mouse accuracy drill', 'reaction time test', 'precision aim',
    'single target tracking', 'mouse control practice', 'click speed test',
    'accuracy training', 'FPS aim drill', 'free aim trainer', 'mouse coordination'
  ],
  openGraph: {
    title: 'Click Accuracy Elite - Precision Mouse Training',
    description: 'Single teleporting target drill for precision mouse training. Target shrinks with streak. 60-second challenge with reaction time tracking and lives system.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/click-accuracy',
  },
};

export default function ClickAccuracyPage() {
  return <ClickAccuracyClient />;
}