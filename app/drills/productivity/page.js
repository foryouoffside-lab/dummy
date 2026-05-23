import ProductivityDrillsClient from './ProductivityDrillsClient';

export const metadata = {
  title: 'Productivity - 10 Free Drills for Focus & Efficiency | SkillDrills',
  description: '10 free productivity drills for task switching, time management, focus endurance, and work efficiency. Improve deep work, Pomodoro, batch processing. No sign-up.',
  keywords: [
    'productivity drills', 'task switching training', 'time management practice',
    'focus endurance', 'work efficiency training', 'pomodoro timer',
    'deep work training', 'batch processing', 'context switching',
    'priority sorting', 'time estimation', 'flow state training',
    'concentration stamina', 'multitasking practice', 'free productivity tools',
    'skilldrills productivity', 'skilldrills focus', 'free work efficiency',
  ],
  openGraph: {
    title: 'Productivity - 10 Free Focus & Efficiency Drills | SkillDrills',
    description: '10 free productivity drills. Task switching, time management, focus. No sign-up.',
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
    title: 'Productivity - 10 Free Drills | SkillDrills',
    description: '10 free productivity drills. No sign-up required.',
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
        <h1>Productivity Drills - Task Switching, Time Management & Focus Training</h1>
        <p>10 free productivity drills across 4 categories. No sign-up required.</p>
      </noscript>
      <ProductivityDrillsClient />
    </>
  );
}