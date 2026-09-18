import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (reaction-speed / reflex-training-drill)
// PRIMARY DOMESTIC: "teste de reflexo"   — 225 exact searches/mo (Domestic #1 winner)
//                    "jogos de reflexo"   — 94 exact searches/mo (Domestic #2 winner)
// SECONDARY / LSI:
//                    "jogo de reflexo"    — Gaming intent
//                    "treinar reflexos"   — Action query
//                    "teste de reação"    — 174 searches/mo
// WINNER TITLE:      Jogo de Reflexo e Treino de Reflexos – Multi-Alvos Online | SkillDrills
// ============================================================

export const metadata = {
  title: 'Teste de Reflexo & Treino de Reflexos Online | SkillDrills',
  description:
    'Treino de reflexos e jogo de reflexo online grátis. Acerte alvos simultâneos na tela, desenvolva atenção dividida e acelere sua tomada de decisão rápida.',
  keywords: [
    'jogo de reflexo',
    'jogos de reflexo',
    'treino de reflexo',
    'teste de reflexo',
    'reflexos rápidos',
    'agilidade visual',
    'atenção dividida',
    'tempo de reação',
    'jogos de reflexos online',
    'treinar reflexos',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: 'Jogo de Reflexo e Treino de Reflexos – Multi-Alvos Online | SkillDrills',
    description:
      'Jogo de reflexo e treino de reflexos online grátis. Reaja com rapidez a múltiplos alvos e treine sua atenção dividida.',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo de Reflexo e Treino de Reflexos – Multi-Alvos Online | SkillDrills',
    description:
      'Jogo de reflexos gratuito no navegador. Elimine alvos em sequência e bata recordes.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Jogo de Reflexo', item: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jogo de Reflexo e Treino de Reflexos – Multi-Alvos Online',
  alternateName: ['Jogo de Reflexo', 'Jogos de Reflexo', 'Treino de Reflexos', 'Multi-Target Reflex Drill'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta interativa online para condicionar a velocidade de reação e a atenção dividida diante de alvos múltiplos.',
  browserRequirements: 'Navegador moderno com suporte a JavaScript (Chrome, Edge, Firefox, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jogo de Reflexo e Treino de Reflexos — Multi-Alvos Online | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill',
  description:
    'Jogo gratuito para treinar reflexos e agilidade motora contra alvos múltiplos.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Reflexos, Atenção Dividida, Coordenação Olho-Mão, Tomada de Decisão Visual',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Treino de Reflexos - Jogo de Velocidade de Reação Multi-Alvo',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill',
  description: 'Treino de Reflexos - Jogo de Velocidade de Reação Multi-Alvo',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como jogar o Jogo de Reflexo e Treino de Reflexos',
  description: 'Passo a passo para treinar seus reflexos com múltiplos alvos.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar o Jogo',
      text: 'Clique em «Iniciar Treino» para carregar a arena em tela cheia.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Escanear Alvos na Tela',
      text: 'Observe todos os alvos que surgem simultaneamente e atente-se aos anéis de tempo.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Priorizar e Clicar',
      text: 'Clique com precisão no alvo mais próximo de expirar antes que o anel se feche.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Manter Combo e Bônus',
      text: 'Acertos consecutivos concedem tempo extra e aumentam o multiplicador de pontuação.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reflex-training-drill#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é este jogo de reflexo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É um exercício prático e interativo no qual múltiplos alvos aparecem ao mesmo tempo na tela e você precisa eliminá-los em sequência antes que desapareçam.',
      },
    },
    {
      '@type': 'Question',
      name: 'É possível melhorar os reflexos com jogos online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Embora a velocidade de condução nervosa periférica seja fixa, o tempo de processamento cognitivo central e a escolha da resposta motora diminuem significativamente com o treino (Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é a Lei de Hick e como ela se aplica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Lei de Hick (Hick, 1952) determina que o tempo de reação aumenta logaritmicamente à medida que o número de opções cresce. Treinar com múltiplos alvos ensina o cérebro a agrupar a informação visual em blocos e reduzir a hesitação.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a atenção dividida ajuda em jogos como Valorant e CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evita a «visão de túnel» quando mais de um inimigo aparece simultaneamente, permitindo identificar a ameaça iminente e efetuar trocas de mira com rapidez.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a melhor estratégia para pontuar alto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Priorize os alvos prestes a expirar e desenhe mentalmente uma linha geométrica contínua conectando os nós para não cruzar o mouse à toa.',
      },
    },
    {
      '@type': 'Question',
      name: 'O monitor de alta frequência (Hz) melhora o desempenho?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Telas de 144 Hz ou 240 Hz exibem novos quadros a cada 6,9 ms e 4,2 ms (contra 16,7 ms em 60 Hz), exibindo os alvos mais rápido (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'O jogo funciona no celular e tablet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, o jogo suporta telas sensíveis ao toque. Girar o celular para o modo paisagem oferece maior amplitude de visão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto tempo de treino por dia é recomendado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 a 15 minutos diários de treino focado são suficientes para otimizar os reflexos sem sobrecarregar o sistema nervoso ou o pulso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre tempo de reação simples e de escolha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reação simples responde a um único estímulo previsível (~200–250 ms), enquanto a reação de escolha envolve identificar o alvo correto entre múltiplos estímulos (Donders, 1868; Hick, 1952).',
      },
    },
    {
      '@type': 'Question',
      name: 'A taxa de atualização do mouse influencia a precisão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, um mouse com taxa de polling de 1000Hz reduz a latência de entrada para apenas 1 ms, permitindo cliques mais consistentes.',
      },
    },
  ],
};
const reflexDrillGuide = {
  heading: 'Guia do Jogo de Reflexo: Aquisição Multi-Alvos & Atenção Dividida',
  intro: [
    'Este jogo de reflexo conecta o tempo de reação simples (reagir a um único sinal previsível) ao tempo de reação de escolha em situações de alta pressão competitiva.',
    'Em jogos eletrônicos como CS2, Valorant e Apex Legends, adversários raramente surgem sozinhos em situações tranquilas. Aprender a triar múltiplos alvos e eliminá-los de forma sequencial é o que define duelos de alto nível.',
    'Fundamentos Científicos: Segundo Donders (1868), reações com escolha exigem discriminação de estímulo e planejamento motor. A Lei de Hick-Hyman (Hick, 1952) demonstra que a latência de escolha sobe com o número de alternativas.',
    'Precisão Técnica: O jogo é renderizado diretamente no navegador via HTML5 Canvas e performance.now() com precisão de sub-milissegundos (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabela de Desempenho em Aquisição Multi-Alvos',
    headers: ['Média de Tempo por Alvo', 'Patente / Nível', 'Perfil de Latência', 'Características Cognitivas', 'Foco Recomendado'],
    rows: [
      ['< 250 ms / alvo', 'Apex / Pro', 'Atraso de escolha mínimo', 'Agrupamento espacial imediato e movimentos sacádicos fluidos', 'Manter densidade no nível mais alto'],
      ['250 – 320 ms / alvo', 'Elite', 'Decisão comprimida', 'Triagem ágil e transições precisas sem hesitar', 'Reduzir pausas entre cliques consecutivos'],
      ['321 – 400 ms / alvo', 'Competidor Avançado', 'Reação de escolha normal', 'Boa aquisição inicial com leve atraso nos nós extremos', 'Ampliar visão periférica para notar bordas'],
      ['401 – 500 ms / alvo', 'Intermediário', 'Carga mental perceptível', 'Reflexo único sólido, mas pausa breve em ráfagas densas', 'Focar nos anéis de expiração primeiro'],
      ['> 500 ms / alvo', 'Em Desenvolvimento', 'Atraso de decisão elevado', 'Susceptível a travamentos e hesitação de busca', 'Priorizar trajetórias geométricas limpas'],
    ],
    note: 'Classificação editorial fundamentada em cronometria humana de tempo de reação de escolha (Donders, 1868; Hick, 1952).',
  },
  techniques: {
    title: 'Técnicas para Melhorar Reflexos em Múltiplos Alvos',
    items: [
      {
        name: 'Triagem e Trajetória mais Curta',
        desc: 'Ao ver o grupo de alvos, trace mentalmente a rota geométrica mais curta em vez de pular o mouse desordenadamente.',
        tips: 'Enxergue o cluster de alvos como uma forma única em vez de pontinhos separados.',
      },
      {
        name: 'Visão Periférica para Próximos Alvos',
        desc: 'O centro do olho confirma o clique atual, mas a visão periférica já registra o próximo alvo em chamas.',
        tips: 'Mantenha o foco visual perto do centro do grupo de alvos e não preso ao cursor.',
      },
      {
        name: 'Poder de Parada (Stopping Power)',
        desc: 'Passar do alvo e ter que voltar perde 50 a 100 ms preciosos. Foque em paradas nítidas e secas no centro.',
        tips: 'Um mousepad voltado para controle oferece a fricção necessária para parar no alvo.',
      },
      {
        name: 'Aquecimento Neuromuscular',
        desc: 'Dedicar 5 a 10 minutos antes de partidas competitivas coloca o cérebro no estado ideal de prontidão.',
        tips: 'Mãos aquecidas conduzem impulsos nervosos de forma mais rápida.',
      },
    ],
  },
  steps: [
    'Clique em «Iniciar Treino» para expandir o modo de tela cheia.',
    'Mantenha a visão relaxada no meio do quadro.',
    'Assim que os alvos surgirem, escaneie a disposição e escolha a sequência de clique.',
    'Acerte cada alvo antes que o anel de tempo acabe.',
  ],
  audience: 'Competidores de FPS, MOBA, simracing e atletas buscando treinar reflexos e atenção dividida.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'dye2009', 'shelton2010', 'jain2015'),
  related: [
    { href: '/pt/drills/reaction-speed', label: 'Hub de Velocidade de Reação' },
    { href: '/pt/drills/reaction-speed/reaction-time-test', label: 'Teste de Reflexo e Tempo de Reação' },
    { href: '/pt/drills/motor/movement-speed/rapid-tapping', label: 'Teste de CPS e Cliques por Segundo' },
    { href: '/pt/drills/reaction-speed/fps-tracking-trainer', label: 'Treinador de Rastreamento FPS' },
  ],
};

export default function PortugueseReflexTrainingDrillPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReflexTrainingDrillWrapper copy={{ title: 'Jogo de Reflexo e Treino de Reflexos' }} />
      <DrillGuide guide={reflexDrillGuide} />
    </>
  );
}
