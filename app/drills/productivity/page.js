import ProductivityDrillsClient from './ProductivityDrillsClient';

export const metadata = {
  title: 'Productivity - 10 Drills for Efficiency | SkillDrills',
  description: '10 free productivity drills for task switching, time management, focus endurance, and work efficiency. Improve deep work and Pomodoro. No sign-up.',
  keywords: [
    'productivity drills', 'task switching training', 'time management practice',
    'focus endurance', 'work efficiency training', 'pomodoro timer',
    'deep work training', 'batch processing', 'context switching',
    'priority sorting', 'time estimation', 'flow state training',
    'concentration stamina', 'multitasking practice', 'free productivity tools',
    'skilldrills productivity', 'skilldrills focus', 'free work efficiency',
  ],
  openGraph: {
    title: 'Productivity - 10 Drills for Efficiency | SkillDrills',
    description: '10 free productivity drills for task switching, time management, focus endurance, and work efficiency. Improve deep work and Pomodoro. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/productivity',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Productivity Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productivity - 10 Drills for Efficiency | SkillDrills',
    description: '10 free productivity drills for task switching, time management, focus endurance, and work efficiency. Improve deep work and Pomodoro. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity',
  },
};

export default function ProductivityDrillsPage() {
  return (
    <>
      <noscript>
        <h1>Productivity Drills - 10 Free Exercises for Focus, Efficiency & Time Management</h1>
        <p>10 free productivity drills across Task Switching, Time Management, Focus Endurance, and Work Efficiency. No sign-up required.</p>
      </noscript>
      <ProductivityDrillsClient />
    </>
  );
}