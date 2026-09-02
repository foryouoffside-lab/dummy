import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Percepción y Reconocimiento Visual Online | SkillDrills',
  description: 'Pruebas de percepción de profundidad, detección de anomalías y búsqueda visual.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual',
    languages: getAlternateLanguages('/es/drills/visual'),
  },
  openGraph: {
    title: 'Percepción y Reconocimiento Visual Online | SkillDrills',
    description: 'Pruebas de percepción de profundidad, detección de anomalías y búsqueda visual.',
    url: 'https://skilldrills.online/es/drills/visual',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedVisualDrillsClientPage() {
  return <VisualDrillsClient />;
}
