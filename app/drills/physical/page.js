import PhysicalDrillsClient from './PhysicalDrillsClient';

export const metadata = {
  title: 'Physical Training - 11 Drills for Fitness | SkillDrills',
  description: '11 free physical training drills across Balance, Reflex, Coordination, and Fitness. Improve stability, reaction speed, and agility. No sign-up.',
  keywords: [
    'physical training drills', 'balance exercises', 'reflex training', 'coordination drills',
    'fitness training', 'stability training', 'reaction speed practice', 'motor skills',
    'agility ladder', 'drop catch reflex', 'dodge training', 'kinetic arrest',
    'cross body movement', 'jump sequence', 'speed drill', 'free physical training',
    'online balance games', 'reflex games', 'coordination exercises',
    'skilldrills physical', 'skilldrills fitness', 'free body training',
  ],
  openGraph: {
    title: 'Physical Training - 11 Drills for Fitness | SkillDrills',
    description: '11 free physical training drills across Balance, Reflex, Coordination, and Fitness. Improve stability, reaction speed, and agility. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/physical',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Physical Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical Training - 11 Drills for Fitness | SkillDrills',
    description: '11 free physical training drills across Balance, Reflex, Coordination, and Fitness. Improve stability, reaction speed, and agility. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical',
  },
};

export default function PhysicalDrillsPage() {
  return (
    <>
      
      <PhysicalDrillsClient />
    </>
  );
}