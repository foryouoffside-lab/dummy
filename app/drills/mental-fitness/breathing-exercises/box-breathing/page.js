import BoxBreathingClient from './BoxBreathingClient';

export const metadata = {
  title: 'Box Breathing Drill - 4-4-4-4 Tactical Breathing for Focus & Calm',
  description: 'Master box breathing (4-4-4-4 technique) used by Navy SEALs and first responders. Square visual pacer guides inhale, hold, exhale, hold pattern. 5 points per breath with combo bonuses. Endless session.',
  keywords: [
    'box breathing', 'tactical breathing', '4-4-4-4 breathing', 'square breathing',
    'Navy SEAL breathing', 'stress relief breathing', 'focus breathing',
    'breathing exercise', 'calm breathing', 'meditation breathing',
    'breathing pacer', 'anxiety breathing technique', 'free breathing app',
    'relaxation drill', 'parasympathetic activation', 'mental clarity breathing'
  ],
  openGraph: {
    title: 'Box Breathing Drill - 4-4-4-4 Tactical Breathing for Focus',
    description: 'Square breathing technique used by elite military and first responders. Visual pacer guides 4s inhale, 4s hold, 4s exhale, 4s hold. Earn 5 points per breath with combo bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing',
  },
};

export default function BoxBreathingPage() {
  return <BoxBreathingClient />;
}