import StopwatchClickClient from './StopwatchClickClient';

export const metadata = {
  title: 'Sustained Intercept - Stopwatch Timing Accuracy & Mental Chronometry',
  description: 'Master precise timing by clicking at an exact target time (1-8 seconds). Perfect hits within 25ms, Good within 75ms, OK within 150ms. +1 point per hit, -1 penalty per miss. 60-second challenge with streak tracking.',
  keywords: [
    'stopwatch click', 'timing accuracy', 'mental chronometry', 'time estimation',
    'click timing drill', 'precision timing', 'reaction prediction', 'time perception',
    'stopwatch training', 'timing precision test', 'internal clock training',
    'free timing drill', 'temporal accuracy', 'click at exact time'
  ],
  openGraph: {
    title: 'Sustained Intercept - Stopwatch Timing Accuracy Training',
    description: 'Memorize a target time (1-8s) and click at the exact moment. Perfect <25ms, Good <75ms, OK <150ms. +1 per hit, -1 per miss. 60-second challenge with streak bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/stopwatch-click',
  },
};

export default function StopwatchClickPage() {
  return <StopwatchClickClient />;
}