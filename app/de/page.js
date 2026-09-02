import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Kostenloser Aim Trainer & Gehirntraining Online',
  description: 'Verbessere dein Aiming in Valorant, CS2, Reaktionszeit, CPS und Gedächtnis mit 81+ kostenlosen Übungen direkt im Browser.',
  keywords: ['Aim Trainer Kostenlos', 'Aiming Übung Valorant', 'Reaktionstest Online', 'CPS Test', 'Gedächtnistraining', 'Maus Präzision'],
  alternates: {
    canonical: 'https://skilldrills.online/de',
    languages: getAlternateLanguages('/de'),
  },
  openGraph: {
    title: 'Kostenloser Aim Trainer & Gehirntraining Online | SkillDrills',
    description: 'Verbessere dein Aiming in Valorant, CS2, Reaktionszeit, CPS und Gedächtnis mit 81+ kostenlosen Übungen direkt im Browser.',
    url: 'https://skilldrills.online/de',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedHomePage() {
  return <HomePageClient />;
}
