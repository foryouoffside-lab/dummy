import RhythmTapClient from './RhythmTapClient';

export const metadata = {
  title: 'Rhythm Tap Elite - Timing Accuracy & Beat Synchronization Training',
  description: 'Master rhythmic timing by tapping in sync with a dynamic BPM pulse. Perfect hits within 40ms, Good hits within 80ms. BPM changes every 8 beats (50-140 range). 60-second challenge with 3 lives and streak tracking.',
  keywords: [
    'rhythm tap', 'timing accuracy', 'beat synchronization', 'rhythm training',
    'BPM training', 'musical timing', 'click timing drill', 'rhythm game',
    'tempo training', 'beat matching', 'timing precision', 'rhythmic accuracy',
    'free rhythm drill', 'timing practice', 'metronome training'
  ],
  openGraph: {
    title: 'Rhythm Tap Elite - Timing Accuracy & Beat Synchronization',
    description: 'Tap in sync with a dynamic BPM pulse. Perfect hits (<40ms) and Good hits (<80ms). BPM changes every 8 beats from 50-140. 60-second challenge with lives and streak bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/timing-accuracy/rhythm-tap',
  },
};

export default function RhythmTapPage() {
  return <RhythmTapClient />;
}