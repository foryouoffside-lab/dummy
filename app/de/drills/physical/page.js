import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Physische Reflexe & Koordination | SkillDrills',
  description: 'Hand-Auge-Reaktionszeit und dynamisches Ausweichen.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/physical',
    languages: getAlternateLanguages('/de/drills/physical'),
  },
  openGraph: {
    title: 'Physische Reflexe & Koordination | SkillDrills',
    description: 'Hand-Auge-Reaktionszeit und dynamisches Ausweichen.',
    url: 'https://skilldrills.online/de/drills/physical',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedPhysicalDrillsClientPage() {
  return <PhysicalDrillsClient />;
}
