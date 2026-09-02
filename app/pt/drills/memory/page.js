import MemoryClient from '@/app/drills/memory/MemoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Jogos de Treino de Memória e Retenção Espacial',
  description: 'Treine sua memória de trabalho, digit span e retenção espacial com jogos interativos sem cadastro.',
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/memory',
    languages: getAlternateLanguages('/pt/drills/memory'),
  },
  openGraph: {
    title: 'Jogos de Treino de Memória de Trabalho e Retenção Espacial | SkillDrills',
    description: 'Treine sua memória de trabalho, digit span e retenção espacial com jogos interativos sem cadastro.',
    url: 'https://skilldrills.online/pt/drills/memory',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function LocalizedMemoryClientPage() {
  return <MemoryClient />;
}
