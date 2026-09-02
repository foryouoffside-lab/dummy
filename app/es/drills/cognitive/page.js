import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Ejercicios de Control Cognitivo y Enfoque Mental',
  description: 'Mejora tu concentración, flexibilidad mental y multitarea con ejercicios interactivos gratis.',
  alternates: {
    canonical: 'https://skilldrills.online/es/drills/cognitive',
    languages: getAlternateLanguages('/es/drills/cognitive'),
  },
  openGraph: {
    title: 'Ejercicios de Control Cognitivo y Enfoque Mental | SkillDrills',
    description: 'Mejora tu concentración, flexibilidad mental y multitarea con ejercicios interactivos gratis.',
    url: 'https://skilldrills.online/es/drills/cognitive',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function LocalizedCognitiveHubClientPage() {
  return <CognitiveHubClient />;
}
