import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Kostenloser FPS Aim Trainer - Reflexe Online Trainieren',
  description: 'Verbessere dein Aiming in Valorant, CS2 und Apex Legends. Flick-Shots, dynamisches Tracking und 180°-Wahrnehmung im Browser.',
  keywords: ['Aim Trainer Kostenlos', 'Aiming Übung Valorant', 'CS2 Aim Training', 'Flick Shot Übung', 'Zielgenauigkeit Trainieren'],
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/fps',
    languages: getAlternateLanguages('/de/drills/fps'),
  },
  openGraph: {
    title: 'Kostenloser FPS Aim Trainer - Aiming & Reflexe Online Trainieren',
    description: 'Verbessere dein Aiming in Valorant, CS2 und Apex Legends. Flick-Shots, dynamisches Tracking und 180°-Wahrnehmung im Browser.',
    url: 'https://skilldrills.online/de/drills/fps',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedFPSHubPage() {
  return <FPSHubClient />;
}
