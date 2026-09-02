import MemoryClient from '@/app/drills/memory/MemoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Arbeitsgedächtnis & Räumliche Merkspanne | SkillDrills',
  description: 'Zahlenfolgen rückwärts, räumliches Gedächtnis und visuelle Mustererkennung.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/memory',
    languages: getAlternateLanguages('/de/drills/memory'),
  },
  openGraph: {
    title: 'Arbeitsgedächtnis & Räumliche Merkspanne | SkillDrills',
    description: 'Zahlenfolgen rückwärts, räumliches Gedächtnis und visuelle Mustererkennung.',
    url: 'https://skilldrills.online/de/drills/memory',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedMemoryClientPage() {
  return <MemoryClient />;
}
