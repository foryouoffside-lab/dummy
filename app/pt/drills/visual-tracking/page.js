import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Rastreamento Visual Suave e Previsão de Trajetória',
  description: 'Treine perseguição contínua de alvos, antecipação de trajetórias e estabilidade visual para FPS.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual-tracking',
    languages: getAlternateLanguages('/pt/drills/visual-tracking'),
  },
  openGraph: {
    title: 'Treinador de Rastreamento Visual Suave e Trajetórias | SkillDrills',
    description: 'Treine perseguição contínua de alvos, antecipação de trajetórias e estabilidade visual para FPS.',
    url: 'https://skilldrills.online/pt/drills/visual-tracking',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return <VisualTrackingDrillsClient />;
}
