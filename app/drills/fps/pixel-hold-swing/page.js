import PixelHoldSwingClient from './PixelHoldSwingClient';

export const metadata = {
  title: 'S+ Pixel Hold & Lean Swing - Elite FPS Aim Drill | SkillDrills',
  description: 'Train raw neural reaction triggers holding an ultra-thin 4px pixel angle hold. Features shoulder bait detection, lean peeking target simulation, and visual trigger speed logging.',
  keywords: [
    'S+ grade pixel hold trainer', 'Rainbow Six Siege angle hold practice', 'R6 crouch lean aim drill',
    'tactical shooting shoulder bait discipline', 'visual reaction speed aim challenge', 'free pointer lock angle hold',
    '4px pixel gap trigger sync', 'global esports aim practice'
  ],
  openGraph: {
    title: 'S+ Pixel Hold & Lean Swing - Elite FPS Aim Drill | SkillDrills',
    description: 'Pixel angle holding and bait discipline training for elite tactical shooter players. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/pixel-hold-swing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Pixel Hold & Lean Swing',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Pixel Hold & Lean Swing - Elite FPS Aim Drill | SkillDrills',
    description: 'Pixel angle holding and bait discipline training for elite tactical shooter players. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/pixel-hold-swing',
  },
};

export default function PixelHoldSwingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "FPS Sector", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "S+ Pixel Hold & Lean Swing" }
            ]
          })
        }}
      />
      <PixelHoldSwingClient />
    </>
  );
}
