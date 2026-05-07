import MentalFitnessClient from './MentalFitnessClient';

export const metadata = {
  title: 'Mental Fitness Drills - Breathing Exercises & Stress Control Training',
  description: 'Free mental fitness training with 7 drills for breathing techniques and stress control. Practice 4-7-8 breathing, box breathing, Wim Hof method, coherence biofeedback, and stress inoculation. No login required.',
  keywords: [
    'mental fitness drills', 'breathing exercises', 'stress control training',
    '4-7-8 breathing', 'box breathing', 'wim hof method', 'coherence breathing',
    'stress inoculation', 'biofeedback training', 'relaxation techniques',
    'free breathing app', 'mental wellness drills', 'anxiety relief breathing',
    'vagal tone exercises', 'heart rate variability training', 'calm under pressure'
  ],
  openGraph: {
    title: 'Mental Fitness Drills - Free Breathing & Stress Control Training',
    description: '7 free mental fitness drills covering breathing exercises (4-7-8, Box, Wim Hof) and stress control (Biofeedback, Stress Inoculation, Calm Under Pressure). No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/mental-fitness',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness',
  },
};

export default function MentalFitnessPage() {
  return <MentalFitnessClient />;
}