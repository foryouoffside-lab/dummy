import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Kognitives Training & Konzentration | SkillDrills',
  description: 'Aufmerksamkeitsausdauer, Regelwechsel und Multitasking unter Zeitdruck trainieren.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/cognitive',
    languages: getAlternateLanguages('/de/drills/cognitive'),
  },
  openGraph: {
    title: 'Kognitives Training & Konzentration | SkillDrills',
    description: 'Aufmerksamkeitsausdauer, Regelwechsel und Multitasking unter Zeitdruck trainieren.',
    url: 'https://skilldrills.online/de/drills/cognitive',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedCognitiveHubClientPage() {
  return <CognitiveHubClient />;
}
