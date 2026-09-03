import HomePageClient from './HomePageClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { HOME_FAQ_ITEMS } from '@/lib/homeFaq';

export const metadata = {
  title: 'Free Aim Trainer & Brain Training Drills | SkillDrills',
  description: `Master your mind and mechanics with ${DRILLS.length}+ free interactive drills. Improve FPS aim, reaction time, memory, focus, typing speed, and mental fitness. No sign-up.`,
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
    description: `${DRILLS.length}+ free drills for FPS gaming, cognitive skills, memory, and mental fitness. No registration. Start now.`,
    url: 'https://skilldrills.online',
    siteName: 'SkillDrills',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'SkillDrills - Free Brain Training Platform' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillDrills - Free FPS & Cognitive Training Platform',
    description: `${DRILLS.length}+ free training drills. No sign-up required. Start training instantly.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online',
    languages: getAlternateLanguages('/'),
  },
};

// FAQPage schema built from the same array the page renders, so the structured
// data can never drift from the visible answers.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient />
    </>
  );
}