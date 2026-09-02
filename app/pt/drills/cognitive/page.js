import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Treinos de Controle Cognitivo e Foco Mental | SkillDrills',
  description: 'Melhore seu foco, controle inibitório e capacidade multitarefa com exercícios cognitivos interativos grátis.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive',
    languages: getAlternateLanguages('/pt/drills/cognitive'),
  },
  openGraph: {
    title: 'Treinos de Controle Cognitivo e Foco Mental | SkillDrills',
    description: 'Melhore seu foco, controle inibitório e capacidade multitarefa com exercícios cognitivos interativos grátis.',
    url: 'https://skilldrills.online/pt/drills/cognitive',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedCognitiveHubClientPage() {
  return <CognitiveHubClient />;
}
