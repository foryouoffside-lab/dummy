import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – pt-BR (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "treino de varredura de cantos" / "limpeza de ângulos fps"
// SECONDARY / LSI:
//   "fatiar a torta fps" / "abertura de pixel mira"
//   "checagem de portas fps" / "reflexo de mira tática"
// ============================================================

export const metadata = {
  title: 'Varredura de Cantos – Limpeza de Ângulos | SkillDrills',
  description: 'Treino de varredura de cantos e limpeza de ângulos online grátis. Pratique fatiar a torta e reflexos de portas para mira tática em FPS no navegador.',
  keywords: [
    'treino de varredura de cantos',
    'limpeza de angulos fps',
    'fatiar a torta fps',
    'abertura de pixel mira',
    'checagem de portas fps',
    'reflexo de mira tatica',
    'busca visual portas',
    'tempo de reacao portas',
    'pre aim treino',
    'mira tatica valorant',
    'exercicios sacadicos cantos',
    'treino de reflexo fps online',
  ],
  openGraph: {
    title: 'Varredura de Cantos – Limpeza de Ângulos | SkillDrills',
    description: 'Treino de varredura de cantos e limpeza de ângulos online grátis. Pratique fatiar a torta e reflexos de portas para mira tática em FPS no navegador.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varredura de Cantos – Limpeza de Ângulos | SkillDrills',
    description: 'Treino de varredura de cantos e limpeza de ângulos online grátis. Pratique fatiar a torta e reflexos de portas para mira tática em FPS no navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Varredura de Cantos', item: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Treino de Varredura de Cantos e Limpeza de Ângulos',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Treino online de varredura de cantos, fatiamento de ângulos e reflexo de mira em portas e passagens para jogos de tiro.',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'pt-BR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Treino de Varredura de Cantos',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navegador moderno com suporte a Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'pt-BR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – Limpeza Tática de Portas e Jogo de Reação',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit',
  description: 'Jogo de reação e varredura tática em portas para aprimorar movimentos sacádicos e tempo de resposta em FPS.',
  genre: ['Ação', 'Treino Tático', 'Visão Esports'],
  gamePlatform: ['Navegador Web', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é a varredura de cantos (corner checking) em jogos táticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A varredura de cantos é o processo metódico de checar ângulos potenciais de emboscada um por um, evitando a exposição simultânea a múltiplas linhas de tiro inimigas.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que significa a técnica de fatiar a torta (slicing the pie)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É mover-se em arco ao redor de um canto ou porta, revelando fatias geométricas finas do ambiente de forma gradual para isolar confrontos 1 contra 1 favoráveis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como os movimentos sacádicos auxiliam na checagem de portas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cada nova fatia revelada, os olhos executam uma sacada rápida (20 a 40 ms; Rayner, 1998) seguida de fixação foveal instantânea para confirmar a presença de inimigos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que os jogadores costumam ser eliminados ao abrir cantos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os erros mais comuns são abrir ângulos rápido demais (over-peeking), expondo o corpo a várias linhas de tiro, ou fixar a visão apenas na mira sem varrer a profundidade do cenário.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o papel do pré-aim (posicionamento de mira) nos cantos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O pré-aim consiste em alinhar a retícula na altura exata da cabeça do adversário através da parede antes de abrir o ângulo, eliminando a necessidade de flick ao avistar o alvo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o exercício de abertura dinâmica de portas melhora os reflexos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ele gera alvos que surgem de portais consecutivos de forma imprevisível, exigindo rápida identificação de ângulo e capacidade de frear a mira com precisão imediata.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é a relação entre a cronometria mental de Donders (1868) e a limpeza de ângulos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Diferente de uma reação simples (~200 ms), múltiplos acessos exigem tempo de reação de escolha (Donders, 1868), onde o cérebro precisa discriminar a origem da ameaça antes de disparar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como telas de 144Hz ou 240Hz beneficiam a abertura de cantos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitores com alta taxa de atualização reduzem o atraso de exibição para menos de 4 a 7 ms (Woods et al., 2015), permitindo avistar o primeiro pixel do inimigo mais cedo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quantos minutos por dia são recomendados para treinar varredura de cantos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 10 a 15 minutos antes de partidas competitivas são ideais para calibrar os circuitos neuromotores de busca visual e evitar entradas precipitadas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Esta ferramenta de treino é gratuita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, o SkillDrills oferece este treino 100% gratuito e direto no navegador, sem necessidade de baixar arquivos, instalar programas ou criar contas.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Treinar Varredura de Cantos e Limpeza de Ângulos',
  description: 'Guia em 4 passos para dominar fatiamento de ângulos, sacadas oculares e tiros de reação em passagens.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Analisar geometria da passagem e preparar sacadas',
      text: 'Identifique o alinhamento da porta ou quina e estabeleça a prioridade sequencial dos ângulos de busca.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fatiar o ângulo progressivamente (Slicing the Pie)',
      text: 'Aproxime-se descrevendo um arco controlado, abrindo apenas uma faixa estreita do campo de visão por vez.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Fixar fovealmente no alvo em fuga',
      text: 'Assim que o alvo emergir da fresta da porta, trave o eixo visual imediatamente no seu centro sem oscilar a cabeça.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Executar disparo central e travar a mira',
      text: 'Registre o clique certeiro no ponto focal do alvo antes que ele transpasse seu limiar de disparo.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: 'Guia de Varredura de Cantos e Limpeza Tática de Ângulos',
    paragraphs: [
      'Em jogos de tiro tático competitivos como Valorant e CS2, a habilidade mais determinante para vencer confrontos é o domínio da varredura de cantos. Entrar em passagens sem isolar linhas de visão expõe o jogador a múltiplos adversários simultâneos.',
      'A técnica de fatiar a torta (Slicing the Pie) decompõe o ambiente em seções geométricas seguras. A cada fração revelada, o sistema visual executa sacadas rápidas (Rayner, 1998) seguidas de fixação foveal instantânea para identificar alvos camuflados.',
      'Neurologicamente, trata-se de tempo de reação de escolha (Choice RT; Donders, 1868), no qual o cérebro precisa discernir entre espaço vazio e ameaça real. Em monitores de alta taxa de atualização (Woods et al., 2015), o treino consistente automatiza o pré-posicionamento da mira e reduz a latência de disparo ao mínimo.',
    ],
  },
  benchmarks: {
    title: 'Tabela de Desempenho em Varredura de Ângulos e Portas',
    headers: ['Nível (Tier)', 'Classificação', 'Tempo de Identificação', 'Precisão de Tiro', 'Percentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 160 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '160 – 210 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '211 – 270 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermediário / Gold', '271 – 350 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Iniciante / Silver', '> 350 ms', '< 78 %', 'Base'],
    ],
    note: 'Critérios fundamentados na literatura de oculomotricidade e tempo de reação de escolha (Rayner, 1998; Donders, 1868) combinados a hardware de exibição moderno (Woods et al., 2015).',
  },
  protocols: {
    title: 'Protocolos de Treinamento em 4 Fases',
    description: 'Rotinas estruturadas para transformar a busca visual em reflexo neuromuscular automático.',
    items: [
      {
        title: 'Analisar geometria da passagem e preparar sacadas',
        description: 'Identifique o alinhamento da porta ou quina e estabeleça a prioridade sequencial dos ângulos de busca.',
      },
      {
        title: 'Fatiar o ângulo progressivamente (Slicing the Pie)',
        description: 'Aproxime-se descrevendo um arco controlado, abrindo apenas uma faixa estreita do campo de visão por vez.',
      },
      {
        title: 'Fixar fovealmente no alvo em fuga',
        description: 'Assim que o alvo emergir da fresta da porta, trave o eixo visual imediatamente no seu centro sem oscilar a cabeça.',
      },
      {
        title: 'Executar disparo central e travar a mira',
        description: 'Registre o clique certeiro no ponto focal do alvo antes que ele transpasse seu limiar de disparo.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function PortugueseMarketDoorsPursuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <MarketDoorsPursuitClient copy={{ title: 'Varredura de Cantos' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/pt/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
    </>
  );
}
