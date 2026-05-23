import MotorDrillsClient from './MotorDrillsClient';

export const metadata = {
  title: 'Motor Skills - 12 Drills for Precision | SkillDrills',
  description: '12 free motor skills drills across Hand-Eye Coordination, Timing Accuracy, Precision Control, and Movement Speed. Improve mouse aim, timing, and reaction. No sign-up.',
  keywords: [
    'motor skills drills', 'hand-eye coordination training', 'timing accuracy practice',
    'precision control drills', 'movement speed training', 'aim trainer', 'click accuracy',
    'rhythm tap', 'stopwatch timing', 'synchronization drill', 'steady hand',
    'fine motor control', 'wave tracing', 'rapid tapping', 'finger sequencing',
    'gesture speed', 'free motor training', 'mouse skills', 'reaction training',
    'drag and drop precision', 'vector recoil', 'fractal link',
    'skilldrills motor', 'skilldrills coordination', 'free precision training',
  ],
  openGraph: {
    title: 'Motor Skills - 12 Drills for Precision | SkillDrills',
    description: '12 free motor skills drills. Hand-eye coordination, timing, precision. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Motor Skills Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motor Skills - 12 Drills for Precision | SkillDrills',
    description: '12 free motor skills drills. No sign-up required.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor',
  },
};

export default function MotorDrillsPage() {
  return (
    <>
      
      <MotorDrillsClient />
    </>
  );
}