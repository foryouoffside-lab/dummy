import MentalFitnessClient from './MentalFitnessClient';

export const metadata = {
  title: 'Mental Fitness - 6 Free Breathing & Stress Drills | SkillDrills',
  description: 'Free mental fitness training with 6 drills for breathing techniques and stress control. Practice 4-7-8, box breathing, Wim Hof, coherence, and stress inoculation. No sign-up.',
  keywords: [
    'mental fitness drills', 'breathing exercises', 'stress control training',
    '4-7-8 breathing', 'box breathing', 'wim hof method', 'coherence breathing',
    'stress inoculation', 'biofeedback training', 'relaxation techniques',
    'free breathing app', 'mental wellness drills', 'anxiety relief breathing',
    'vagal tone exercises', 'heart rate variability training', 'calm under pressure',
    'skilldrills mental fitness', 'skilldrills breathing', 'free relaxation tools',
  ],
  openGraph: {
    title: 'Mental Fitness - 6 Free Breathing & Stress Drills | SkillDrills',
    description: '6 free mental fitness drills. Breathing exercises and stress control. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/mental-fitness',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Mental Fitness Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Fitness - 6 Free Drills | SkillDrills',
    description: '6 free mental fitness drills. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness',
  },
};

export default function MentalFitnessPage() {
  return (
    <>
      <noscript>
        <h1>Mental Fitness Drills - Breathing Exercises & Stress Control Training</h1>
        <p>Free mental fitness training with 6 drills for breathing and stress control. No sign-up required.</p>
      </noscript>
      <MentalFitnessClient />
    </>
  );
}