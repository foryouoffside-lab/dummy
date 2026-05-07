import SoundPatternClient from './SoundPatternClient';

export const metadata = {
  title: 'Sound Pattern Drill - Auditory Memory & Rhythm Recall Training',
  description: 'Train auditory memory by listening to and reproducing rhythmic beat patterns. 30 unique patterns across 3 difficulty levels (8, 10, 12 beats). Adaptive length increases with perfect recall. 60-second timed challenge.',
  keywords: [
    'sound pattern memory', 'auditory memory training', 'rhythm recall',
    'beat pattern drill', 'sound sequence memory', 'auditory processing',
    'rhythm memory game', 'sound pattern recognition', 'auditory recall',
    'musical memory training', 'beat sequence drill', 'pattern reproduction',
    'free auditory memory test', 'rhythm training', 'sound memory drill'
  ],
  openGraph: {
    title: 'Sound Pattern Drill - Auditory Memory & Rhythm Recall',
    description: '30 unique rhythmic patterns with adaptive difficulty. Listen to beat sequences then reproduce them. Pattern length increases from 8 to 12 beats with perfect scores. 60-second timed challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/sound-pattern',
  },
};

export default function SoundPatternPage() {
  return <SoundPatternClient />;
}