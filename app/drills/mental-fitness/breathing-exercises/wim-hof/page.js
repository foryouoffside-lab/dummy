import WimHofClient from './WimHofClient';

export const metadata = {
  title: 'Wim Hof Power Breathing - 30 Breaths Oxygenation Drill',
  description: 'Practice the Wim Hof Method power breathing technique. 30 rapid inhale-exhale cycles with expanding visual pacer. 1 point per breath with combo streak tracking. Increases oxygen saturation and energy levels.',
  keywords: [
    'wim hof breathing', 'wim hof method', 'power breathing', 'whm breathing',
    'oxygenation exercise', 'breathwork drill', 'holotropic breathing',
    'energy breathing', 'wim hof technique', 'deep breathing exercise',
    'breathing meditation', 'free breathing app', 'breath training',
    'oxygen saturation', 'vitality breathing', 'stress relief breathing'
  ],
  openGraph: {
    title: 'Wim Hof Power Breathing - 30 Breaths Oxygenation Drill',
    description: '30 rapid inhale-exhale cycles following the Wim Hof Method. Visual pacer expands/contracts with each breath. Track combo streaks and oxygen boost level. Free breathwork training.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof',
  },
};

export default function WimHofPage() {
  return <WimHofClient />;
}