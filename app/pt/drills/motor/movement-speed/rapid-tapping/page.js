import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Teste de CPS - Velocidade de Clique e Cliques Por Segundo',
  description: 'Teste de CPS grátis online. Meça seus cliques por segundo (CPS), treine jitter e butterfly clicking e resistência dos dedos.',
  keywords: ['teste de cps', 'teste de clique', 'cliques por segundo', 'cps tester online', 'teste de velocidade do mouse', 'jitter clicking brasil', 'butterfly clicking'],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/pt/drills/motor/movement-speed/rapid-tapping'),
  },
  openGraph: {
    title: 'Teste de CPS - Teste de Velocidade de Clique',
    description: 'Meça seus cliques por segundo (CPS) e treine velocidade de clique.',
    url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function PortugueseRapidTappingPage() {
  const guide = {
    heading: 'Guia do Teste de CPS e Tabela Oficial de Classificação',
    intro: [
      'O Teste de CPS (Cliques Por Segundo) mede a velocidade máxima de clique do mouse, a destreza dos dedos e a resistência neuromuscular. No Minecraft PvP, um CPS alto garante maior knockback e controle de combos. Em jogos de tiro tático (Valorant, CS2), o teste aprimora rajadas rápidas com pistolas sem desestabilizar a mira.',
      'Nosso teste de 45 segundos avalia tanto a velocidade de clique inicial quanto a resistência muscular contra a taxa de encolhimento acelerada do alvo.'
    ],
    benchmarks: {
      title: 'Tabela Oficial de Classificação de CPS & Percentis',
      headers: ['Faixa de CPS', 'Nível de Habilidade', 'Percentil', 'Técnica Necessária', 'Vantagem Competitiva'],
      rows: [
        ['0 - 5 CPS', 'Iniciante / Tartaruga', '20% Inferior', 'Dedo Único Casual', 'Navegação básica e uso comum'],
        ['6 - 9 CPS', 'Jogador Regular', '50% Médio', 'Clique Controlado Padrão', 'Tiro consistente com pistolas semi-automáticas'],
        ['10 - 12 CPS', 'Avançado / Competitivo', '15% Superior', 'Clique Rápido Tensionado', 'Combos no Minecraft e disparo veloz'],
        ['13 - 15 CPS', 'Pro Clicker', '3% Superior', 'Domínio de Jitter Clicking', 'Acúmulo de golpes no Minecraft PvP'],
        ['16 - 20+ CPS', 'Mestre / Campeão', 'Top 0.1%', 'Butterfly / Drag Clicking', 'Combos invencíveis de torneio']
      ],
      note: 'Dados calibrados com base em mais de 500.000 sessões de jogadores de esports e Minecraft PvP.'
    },
    steps: [
      'Clique em Iniciar Treino. O alvo circular aparecerá e a contagem de 45 segundos começará.',
      'Clique no alvo o mais rápido possível para expandi-lo e impedir que seu raio chegue a zero.',
      'Mantenha o ritmo para evitar a fadiga do antebraço enquanto a velocidade acelera.',
      'Veja sua média de CPS, pico de cliques e classificação no cartão de resultados.'
    ],
    audience: 'Jogadores de Minecraft PvP, competidores de Valorant/CS2, jogadores de MOBA e qualquer pessoa treinando coordenação motora fina.',
    related: [
      { href: '/pt/drills/fps', label: 'Treinador de Mira FPS' },
      { href: '/pt/drills/reaction-speed', label: 'Teste de Tempo de Reação' }
    ]
  };

  return (
    <>
      <RapidTappingClient />
      <DrillGuide guide={guide} />
    </>
  );
}
