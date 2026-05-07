import ClinicalGrayGridClient from './ClinicalGrayGridClient';

export const metadata = {
  title: 'Clinical Gray Grid - 4x4 Grid Reaction & Precision Aim Training',
  description: 'Train precision aim on a 4x4 grid with red flash targets lasting 450ms. 5 lives system with penalty scoring after lives depleted. Random 400-1200ms delays between targets. 60-second FPS challenge.',
  keywords: [
    'clinical gray grid', '4x4 grid aim', 'precision aim training', 'grid reaction drill',
    'FPS grid aim', 'target acquisition drill', 'red target grid', 'aim precision FPS',
    'grid click training', 'reaction time grid', 'clinical aim drill', 'free aim trainer',
    'FPS precision drill', 'grid target practice'
  ],
  openGraph: {
    title: 'Clinical Gray Grid - 4x4 Precision Aim & Reaction Training',
    description: '16-node grid with red flash targets (450ms window). Random delays between targets. 5 lives system with penalty scoring. Track reaction time and accuracy.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/clinical-gray-grid',
  },
};

export default function ClinicalGrayGridPage() {
  return <ClinicalGrayGridClient />;
}