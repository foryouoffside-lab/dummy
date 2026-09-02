import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Teste de Tempo de Reação - Medidor de Reflexos Online',
  description: 'Teste seu tempo de reação visual e reflexos em milissegundos. Compare seus resultados com benchmarks de jogadores de esports profissionais.',
  keywords: ['teste de tempo de reacao', 'teste de reflexo', 'medidor de reflexo online', 'reacao em milissegundos', 'tempo de resposta gamer'],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed',
    languages: getAlternateLanguages('/pt/drills/reaction-speed'),
  },
  openGraph: {
    title: 'Teste de Tempo de Reação - Medidor de Reflexos em Milissegundos',
    description: 'Teste seu tempo de reação visual e reflexos em milissegundos.',
    url: 'https://skilldrills.online/pt/drills/reaction-speed',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PortugueseReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
