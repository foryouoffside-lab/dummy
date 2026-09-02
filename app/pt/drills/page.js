import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Todos os 81+ Treinos de Mira FPS e Treino Cerebral',
  description: 'Explore 81+ treinos interativos grátis em 8 setores. Treinador de mira FPS, tempo de reação, jogos de memória e CPS no navegador.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills',
    languages: getAlternateLanguages('/pt/drills'),
  },
  openGraph: {
    title: 'Todos os 81+ Treinos de Mira FPS e Treino Cerebral | SkillDrills',
    description: 'Explore 81+ treinos interativos grátis em 8 setores. Treinador de mira FPS, tempo de reação, jogos de memória e CPS no navegador.',
    url: 'https://skilldrills.online/pt/drills',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedDrillsDirectoryPage() {
  return <DrillsDirectoryClient />;
}
