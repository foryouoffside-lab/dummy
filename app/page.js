import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training Platform',
  description: 'Master your mind and mechanics with 115+ free interactive drills. Improve FPS aim, reaction time, memory, focus, typing speed, and mental fitness. No sign-up.',

  keywords: [
    'free aim trainer', 'FPS aim trainer', 'flick shot training', 'tracking aim practice',
    'Valorant aim trainer', 'CS2 aim practice', 'free brain training', 'cognitive training',
    'memory games', 'typing speed test', 'reaction time test', 'speed reading',
    'mental math practice', 'focus training', 'brain games free', 'online drills',
    'hand eye coordination', 'visual tracking', 'free typing test', 'peripheral vision test',
    'esports training', 'gaming skills trainer', 'free cognitive assessment',
    'working memory exercises', 'attention training', 'problem solving games',
    'skilldrills', 'skill drills', 'free online brain games', 'mental fitness training'
  ],
  openGraph: {
    title: 'SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training',
    description: '115+ free drills for FPS gaming, cognitive skills, memory, and mental fitness. No registration. Start now.',
    url: 'https://skilldrills.online',
    siteName: 'SkillDrills',
    images: [{ url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'SkillDrills - Free Brain Training Platform' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillDrills - Free FPS & Cognitive Training Platform',
    description: '115+ free training drills. No sign-up required. Start training instantly.',
    images: ['/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online' },
};

export default function HomePage() {
  return <HomePageClient />;
}