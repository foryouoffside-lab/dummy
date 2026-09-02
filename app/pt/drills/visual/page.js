import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Percepção e Reconhecimento Visual Online | SkillDrills',
  description: 'Exercícios de discriminação de profundidade, busca visual e anomalias de ritmo.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual',
    languages: getAlternateLanguages('/pt/drills/visual'),
  },
  openGraph: {
    title: 'Percepção e Reconhecimento Visual Online | SkillDrills',
    description: 'Exercícios de discriminação de profundidade, busca visual e anomalias de ritmo.',
    url: 'https://skilldrills.online/pt/drills/visual',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedVisualDrillsClientPage() {
  return <VisualDrillsClient />;
}
