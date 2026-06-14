import VisualTrackingDrillsClient from './VisualTrackingDrillsClient';

export const metadata = {
  title: 'Visual Tracking Training - 25 Free Eye Drills | SkillDrills',
  description: 'Improve smooth pursuit, velocity estimation, and gaze stability with 25 free visual eye tracking drills. No sign-up.',
  keywords: [
    'visual tracking training', 'eye tracking exercises', 'ocular pursuit drills',
    'gaze stability practice', 'saccade latency calibrator', 'free brain tracking',
    'aim tracking online', 'skilldrills visual tracking', 'visual cortex conditioning',
    'ballistic gaze shifts', 'sports vision diagnostics', 'no download eye training',
    'slow precision tracking', 'predictive pursuit aim'
  ],
  openGraph: {
    title: 'Visual Tracking Training - 25 Free Eye Drills | SkillDrills',
    description: 'Improve smooth pursuit, velocity estimation, and gaze stability with 25 free visual eye tracking drills. No sign-up.',
    type: 'website',
    url: 'https://skilldrills.online/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Visual Tracking Training Drills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Tracking Training - 25 Free Eye Drills | SkillDrills',
    description: 'Improve smooth pursuit, velocity estimation, and gaze stability with 25 free visual eye tracking drills. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual-tracking',
  },
};

export default function VisualTrackingDrillsPage() {
  return (
    <>
      <noscript>
        <h1>Visual Tracking Drills - 25 Free Exercises for Smooth Pursuit & Trajectory Prediction</h1>
        <p>Improve smooth pursuit, visual velocity estimation, and gaze stability. Train with 25 free interactive ocular diagnostics. No sign-up required.</p>
      </noscript>
      <VisualTrackingDrillsClient />
    </>
  );
}
