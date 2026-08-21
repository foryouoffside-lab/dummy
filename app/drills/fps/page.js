import FPSHubClient from './FPSHubClient';
import { DRILLS } from '../../../lib/drillsRegistry';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');
const fpsDrillCount = fpsDrills.length;

export const metadata = {
  // GSC (180d) for this URL: fps training 48 impr (pos 28.8), fps practice 28,
  // fps trainer 16, practice fps aim 12. The old title carried "aim trainer"
  // and "aim training" but never the phrase "FPS Training" those queries use.
  title: 'Free FPS Aim Trainer - FPS Training & Aim Practice',
  description: `Free FPS aim trainer online. ${fpsDrillCount} aim training drills - flick shots, tracking, recoil control and reaction time. For Valorant, CS2 and Apex.`,
  keywords: [
    'free fps aim trainer', 'fps aim trainer online', 'best aim trainer',
    'aim trainer online', 'free aim trainer', 'aim training online',
    'fps training online', 'free fps training', 'fps aim training',
    'Valorant aim trainer', 'CS2 aim training', 'Apex Legends aim trainer',
    'Overwatch aim training', 'Rainbow Six aim trainer', 'Fortnite aim practice',
    'flick shot training', 'tracking aim trainer', 'recoil control training',
    'reaction time test fps', 'strafe tracking aim', 'crosshair placement training',
    'target switching aim', 'target acquisition training', 'vertical tracking aim',
    '180 degree awareness', 'mouse accuracy test', 'aim training game',
    'esports aim training', 'competitive fps training', 'pro aim training',
    'raw mouse input aim', 'pointer lock aim trainer', 'fps sensitivity training',
    'gaming aim practice', 'mouse precision fps', 'aim improvement game',
    'skilldrills fps', 'skilldrills aim trainer', 'free online aim practice',
    'no download aim trainer', 'browser aim trainer', 'instant aim training',
    'professional aim training', 'comprehensive aim trainer',
  ],
  openGraph: {
    title: 'Free FPS Aim Trainer - Best Online Aim Training Hub | SkillDrills',
    description: `Free FPS aim trainer hub. ${fpsDrillCount} professional aim training drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.`,
    type: 'website',
    url: 'https://skilldrills.online/drills/fps',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Free FPS Aim Trainer - Online Aim Training Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free FPS Aim Trainer - Best Online Aim Training Hub | SkillDrills',
    description: `Free FPS aim trainer. ${fpsDrillCount} professional drills — flick shots, tracking, recoil control, reaction time. Valorant, CS2, Apex. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/fps' },
};

export default function FPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free FPS Aim Trainer - Best Online Aim Training Hub",
        "url": "https://skilldrills.online/drills/fps",
        "description": `Free FPS aim trainer hub with ${fpsDrillCount} professional aim training drills. Flick shots, tracking aim, recoil control, reaction time tests, strafe tracking, crosshair placement, target acquisition, and more. Valorant, CS2, Apex Legends compatible. No sign-up required.`,
        "author": { "@type": "Organization", "name": "SkillDrills" },
        "hasPart": fpsDrills.map((drill) => ({
          "@type": "WebApplication",
          "name": drill.name,
          "url": `https://skilldrills.online${drill.href}`
        }))
      })}} />
      <FPSHubClient />
    </>
  );
}