import StrafeTrackingClient from './StrafeTrackingClient';

export const metadata = {
  title: 'Esports Unpredictable Strafe Tracking - FPS Aim Drill | SkillDrills',
  description: 'Train reactive tracking aim against targets doing randomized counter-strafes and jumps. Matched sensitivity for Apex Legends, Overwatch 2, and Valorant. No sign-up.',
  keywords: [
    'strafe tracking trainer', 'reactive tracking aim', 'unpredictable movement aim trainer',
    'Apex Legends tracking drill', 'Overwatch 2 tracking practice', 'smooth target tracking',
    'raw mouse input aim trainer', 'fast strafe aim trainer', 'esports tracking coach'
  ],
  openGraph: {
    title: 'Esports Unpredictable Strafe Tracking - FPS Aim Drill | SkillDrills',
    description: 'Track reactive targets executing high-frequency dodging maneuvers with real-time lock-on analysis.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/strafe-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Unpredictable Strafe Tracking',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esports Unpredictable Strafe Tracking - FPS Aim Drill | SkillDrills',
    description: 'Track reactive targets executing high-frequency dodging maneuvers with real-time lock-on analysis.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/strafe-tracking',
  },
};

export default function StrafeTrackingPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Unpredictable Strafe Tracking" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Esports Unpredictable Strafe Tracking",
            "url": "https://skilldrills.online/drills/fps/strafe-tracking",
            "description": "Improve reactive tracking on high-velocity targets executing randomized counter-strafes and gravity-based jumps.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <StrafeTrackingClient />
    </>
  );
}
