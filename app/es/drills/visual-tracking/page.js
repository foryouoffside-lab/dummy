import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Entrenador de Seguimiento Visual Suave para FPS',
  description: 'Entrena el rastreo ocular suave y fijación dinámica de blancos móviles.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/visual-tracking',
    languages: getAlternateLanguages('/es/drills/visual-tracking'),
  },
  openGraph: {
    title: 'Entrenador de Seguimiento Visual Suave para FPS | SkillDrills',
    description: 'Entrena el rastreo ocular suave y fijación dinámica de blancos móviles.',
    url: 'https://skilldrills.online/es/drills/visual-tracking',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return <VisualTrackingDrillsClient />;
}
