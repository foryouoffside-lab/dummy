import CoherenceBreathingClient from './CoherenceBreathingClient';

export const metadata = {
  title: 'Coherence Breathing - 5:6 Ratio Heart Rate Variability Biofeedback Training',
  description: 'Optimize heart rate variability with 5:6 ratio coherence breathing. 5-second inhale, 6-second exhale with expanding/contracting visual pacer. 5-minute guided session to improve vagal tone and HRV. Free biofeedback drill.',
  keywords: [
    'coherence breathing', 'heart rate variability', 'HRV training', 'biofeedback breathing',
    '5:6 breathing ratio', 'vagal tone improvement', 'resonance frequency breathing',
    'cardiac coherence', 'heart brain coherence', 'stress reduction breathing',
    'HRV biofeedback', 'parasympathetic activation', 'free biofeedback app',
    'breathing pacer', 'mindfulness breathing', 'autonomic nervous system'
  ],
  openGraph: {
    title: 'Coherence Breathing - 5:6 HRV Biofeedback Training',
    description: '5:6 ratio breathing proven to optimize heart rate variability. 5s inhale, 6s exhale with visual pacer and audio tones. 5-minute guided session for vagal tone improvement.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback',
  },
};

export default function CoherenceBreathingPage() {
  return <CoherenceBreathingClient />;
}