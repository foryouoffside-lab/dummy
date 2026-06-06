import ReactiveSphereTrackingClient from './ReactiveSphereTrackingClient';

export const metadata = {
  title: 'Reactive Sphere Tracking - FPS Aim Drill | SkillDrills',
  description: 'Train reactive tracking under abrupt velocity spikes. Sensitivity matched for Valorant, CS2, Overwatch, Apex, and Fortnite. Free browser-based aim trainer.',
  keywords: [
    'reactive sphere tracking aim trainer', 'reactive tracking aim drill', 'Valorant tracking trainer',
    'Apex Legends tracking aim practice', 'Overwatch tracking practice tool', 'free aim trainer',
    'abrupt direction changes aim practice', 'muscle memory tracking sweeps', 'esports reactive tracking trainer'
  ],
  openGraph: {
    title: 'Reactive Sphere Tracking - FPS Aim Drill | SkillDrills',
    description: 'Train reactive tracking under abrupt velocity spikes. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/reactive-sphere-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reactive Sphere Tracking Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reactive Sphere Tracking - FPS Aim Drill | SkillDrills',
    description: 'Train reactive tracking under abrupt velocity spikes. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/reactive-sphere-tracking',
  },
};

export default function ReactiveSphereTrackingPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Reactive Sphere Tracking" }
            ]
          })
        }}
      />
      <ReactiveSphereTrackingClient />
    </>
  );
}
