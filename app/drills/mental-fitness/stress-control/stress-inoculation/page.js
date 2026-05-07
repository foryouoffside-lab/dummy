import StressInoculationClient from './StressInoculationClient';

export const metadata = {
  title: 'Stress Inoculation Drill - Controlled Stress Exposure & Resilience Training',
  description: 'Build stress resilience through controlled exposure. Maintain 5:6 coherence breathing while red visual strobe and audio stress induction challenge your focus. 5-minute session with 2x points during stress phase. Free stress training.',
  keywords: [
    'stress inoculation', 'stress resilience training', 'controlled stress exposure',
    'stress tolerance drill', 'mental toughness training', 'stress management',
    'coherence under stress', 'red strobe stress', 'audio stress induction',
    'resilience building', 'focus under pressure', 'stress adaptation',
    'free stress training', 'vagal tone stress', 'parasympathetic recovery'
  ],
  openGraph: {
    title: 'Stress Inoculation Drill - Controlled Stress Exposure Training',
    description: 'Build real stress resilience with 5:6 coherence breathing under red visual strobe and audio stress induction. 2x points during 90s stress phase. 5-minute progressive exposure session.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/stress-inoculation',
  },
};

export default function StressInoculationPage() {
  return <StressInoculationClient />;
}