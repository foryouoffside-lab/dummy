import RhythmAnomalyClient from './RhythmAnomalyClient';

export const metadata = {
  title: 'Rhythm Anomaly - Entropic Grid Pulse Detection & Visual Rhythm Training',
  description: 'Find the faster-pulsing entropic cell in a 6×6 grid. Steady cells pulse at 2s, entropic cell pulses at 1.4s. Stamina system with +5 for correct, -15 for wrong, -0.5/s decay. 90-second challenge.',
  keywords: [
    'rhythm anomaly', 'entropic grid', 'pulse detection training',
    'visual rhythm drill', 'entropic cell finder', 'pulse pattern recognition',
    'visual anomaly detection', 'rhythm perception training', 'stamina system',
    'pulsing grid game', 'visual discrimination', 'cognitive stamina',
    'free visual training', 'entropy detection drill'
  ],
  openGraph: {
    title: 'Rhythm Anomaly - Entropic Grid Pulse Detection Training',
    description: 'Find the faster-pulsing cell in a 6×6 grid. Steady pulse at 2s vs entropic at 1.4s. Stamina system: +5 correct, -15 wrong, -0.5/s natural decay. 90-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/rhythm-anomaly',
  },
};

export default function RhythmAnomalyPage() {
  return <RhythmAnomalyClient />;
}