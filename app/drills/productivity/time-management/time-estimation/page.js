import TemporalPrecisionClient from './TemporalPrecisionClient';

export const metadata = {
  title: 'Temporal Precision - Time Estimation & Internal Clock Training',
  description: 'Train your internal clock by holding and releasing to match target times from 0.5-2.5 seconds. Pure time estimation with no visual timer. 60-second challenge with 120ms accuracy window and combo streaks.',
  keywords: [
    'time estimation', 'temporal precision', 'internal clock training',
    'time perception drill', 'interval timing', 'temporal accuracy',
    'time sense training', 'chronoception', 'time estimation game',
    'reaction time precision', 'temporal processing', 'motor timing',
    'subjective time', 'free time estimation test', 'timing accuracy'
  ],
  openGraph: {
    title: 'Temporal Precision - Time Estimation & Internal Clock Training',
    description: 'Pure time estimation drill. Hold and release to match target times without visual feedback. 120ms accuracy window. 60-second challenge with streak bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/time-estimation',
  },
};

export default function TemporalPrecisionPage() {
  return <TemporalPrecisionClient />;
}