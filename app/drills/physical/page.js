import PhysicalDrillsClient from './PhysicalDrillsClient';

export const metadata = {
  title: 'Physical Training Drills - Balance, Reflex, Coordination & Fitness',
  description: 'Free physical skill training with 11 drills across Balance Training, Reflex Training, Coordination, and Fitness. Improve stability, reaction speed, motor control, and agility. No login required.',
  keywords: [
    'physical training drills', 'balance exercises', 'reflex training', 'coordination drills',
    'fitness training', 'stability training', 'reaction speed practice', 'motor skills',
    'agility ladder', 'drop catch reflex', 'dodge training', 'kinetic arrest',
    'cross body movement', 'jump sequence', 'speed drill', 'free physical training',
    'online balance games', 'reflex games', 'coordination exercises'
  ],
  openGraph: {
    title: 'Physical Training Drills - Free Balance, Reflex & Fitness Training',
    description: '11 free physical training drills covering Balance, Reflexes, Coordination, and Fitness. Track progress, improve skills. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/physical',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical',
  },
};

export default function PhysicalDrillsPage() {
  return <PhysicalDrillsClient />;
}