import SteadyHandClient from './SteadyHandClient';

export const metadata = {
  title: 'Sustained Circuit - Steady Hand Path Tracking & Endurance Training',
  description: 'Master steady hand precision by tracing a winding path corridor. Complete laps for 15 points each within 30-second time limits. Corridor shrinks with streak. 60-second endurance challenge with lap time tracking.',
  keywords: [
    'steady hand', 'path tracing', 'precision tracking', 'motor endurance',
    'steady cursor control', 'hand stability training', 'path following drill',
    'precision motor control', 'circuit training', 'mouse steadiness',
    'fine motor endurance', 'hand tremor control', 'smooth movement practice',
    'free steady hand drill', 'stability training'
  ],
  openGraph: {
    title: 'Sustained Circuit - Steady Hand Path Tracking Training',
    description: 'Trace a winding corridor path with steady cursor control. 15 points per completed lap. 30-second lap time limit. Corridor shrinks with streak. 60-second endurance challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/steady-hand',
  },
};

export default function SteadyHandPage() {
  return <SteadyHandClient />;
}