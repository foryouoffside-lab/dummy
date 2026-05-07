import FocusTimerClient from './FocusTimerClient';

export const metadata = {
  title: 'Focus Ripples - 5-Minute Sustained Attention & Flow State Training',
  description: 'Train sustained focus with a 5-minute visual meditation. Fix your gaze on a center point while expanding ripples test peripheral awareness. Earn 1 point every 5 seconds. Build concentration stamina for deep work.',
  keywords: [
    'focus timer', 'concentration training', 'sustained attention',
    'flow state practice', 'focus endurance', 'attention span training',
    'visual meditation', 'deep work training', 'focus meditation',
    'concentration stamina', 'mindfulness focus', 'attention exercise',
    'focus ripple', '5 minute focus'
  ],
  openGraph: {
    title: 'Focus Ripples - 5-Minute Sustained Attention Training',
    description: 'Build concentration stamina with expanding ripple visual meditation. Fixate on center point, observe ripples peripherally. Earn points for sustained focus over 5 minutes. Max score: 60.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/focus-timer',
  },
};

export default function FocusTimerPage() {
  return <FocusTimerClient />;
}