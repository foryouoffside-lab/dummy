import VagalBrakeClient from './VagalBrakeClient';

export const metadata = {
  title: '4-7-8 Vagal Brake - Breathing Exercise for Relaxation & Stress Relief',
  description: 'Practice the 4-7-8 breathing technique to activate your vagus nerve. Inhale 4s, hold 7s, exhale 8s with visual pacer and audio cues. Free relaxation drill with cycle tracking. No time limit.',
  keywords: [
    '4-7-8 breathing', 'vagal brake', 'breathing exercise', 'relaxation technique',
    'vagus nerve stimulation', 'stress relief breathing', 'anxiety breathing',
    'deep breathing exercise', 'guided breathing', 'breathing pacer',
    'calm breathing', 'meditation breathing', 'free breathing app',
    'relaxation drill', 'parasympathetic activation'
  ],
  openGraph: {
    title: '4-7-8 Vagal Brake - Breathing Exercise for Relaxation',
    description: 'Master the 4-7-8 breathing technique with visual pacer and audio cues. Activate your vagus nerve for deep relaxation. Track cycles and calm score. No time limit.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/4-7-8',
  },
};

export default function VagalBrakePage() {
  return <VagalBrakeClient />;
}