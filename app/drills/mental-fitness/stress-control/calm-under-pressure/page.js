import CalmUnderPressureClient from './CalmUnderPressureClient';

export const metadata = {
  title: 'Calm Under Pressure - Stress Inoculation & Cognitive Resilience Training',
  description: 'Build cognitive resilience with dual-task stress inoculation training. Maintain 5:6 coherence breathing while random numbers flash as distraction. 3-minute challenge with 2x points during cognitive load phase. Free stress training.',
  keywords: [
    'stress inoculation', 'calm under pressure', 'cognitive resilience',
    'dual-task training', 'stress management drill', 'coherence breathing under load',
    'cognitive load training', 'resilience building', 'pressure performance',
    'stress tolerance', 'mental toughness training', 'focus under distraction',
    'free stress training', 'biofeedback stress drill', 'vagal tone under pressure'
  ],
  openGraph: {
    title: 'Calm Under Pressure - Stress Inoculation & Cognitive Resilience',
    description: 'Dual-task training: maintain 5:6 coherence breathing while random numbers create cognitive load. 2x points during pressure phase. Build real-world stress resilience.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/calm-under-pressure',
  },
};

export default function CalmUnderPressurePage() {
  return <CalmUnderPressureClient />;
}