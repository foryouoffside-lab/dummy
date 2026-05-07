import DistractionFighterClient from './DistractionFighterClient';

export const metadata = {
  title: 'Distraction Fighter - Stroop Test & Cognitive Inhibition Training',
  description: 'Train cognitive inhibition with the classic Stroop effect. Identify ink colors while ignoring conflicting word meanings. 60-second challenge with 3 lives, combo streaks, and 8 colors. Improve focus and mental flexibility.',
  keywords: [
    'distraction fighter', 'stroop test', 'cognitive inhibition',
    'stroop effect training', 'focus training', 'interference control',
    'attention training', 'cognitive flexibility', 'color word test',
    'inhibition drill', 'mental focus', 'brain training stroop',
    'cognitive control', 'distraction resistance'
  ],
  openGraph: {
    title: 'Distraction Fighter - Stroop Test & Cognitive Inhibition Training',
    description: 'Classic Stroop effect drill: identify ink colors while ignoring conflicting word meanings. 8 colors, 1.5s per trial, 60-second challenge with lives system and combo streaks.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/distraction-fighter',
  },
};

export default function DistractionFighterPage() {
  return <DistractionFighterClient />;
}