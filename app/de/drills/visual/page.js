import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Visuelle Wahrnehmung & Tiefensehen | SkillDrills',
  description: 'Tiefenwahrnehmung, periphere Anomalien und schnelle visuelle Suche.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual',
    languages: getAlternateLanguages('/de/drills/visual'),
  },
  openGraph: {
    title: 'Visuelle Wahrnehmung & Tiefensehen | SkillDrills',
    description: 'Tiefenwahrnehmung, periphere Anomalien und schnelle visuelle Suche.',
    url: 'https://skilldrills.online/de/drills/visual',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedVisualDrillsClientPage() {
  return <VisualDrillsClient />;
}
