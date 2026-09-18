import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "exercicios sacadicos online" / "movimentos sacadicos"
// SECONDARY / LSI:
//   "treino de sacadas" / "saltos oculares rapidos" / "varredura visual"
//   "agilidade visual ocular" / "tempo de reacao visual"
// ============================================================

export const metadata = {
  title: 'Exercícios Sacádicos Online – Treino Ocular | SkillDrills',
  description:
    'Exercícios sacádicos online grátis. Treine saltos oculares rápidos entre alvos fixos para acelerar a varredura visual e a aquisição de alvos no navegador.',
  keywords: [
    'exercicios sacadicos online',
    'movimentos sacadicos',
    'treino de sacadas',
    'saltos oculares rapidos',
    'varredura visual',
    'agilidade visual ocular',
    'tempo de reacao visual',
    'coordenacao ocular',
    'aquisicao de alvos',
    'treino de foco visual',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: 'Exercícios Sacádicos Online – Treino Ocular | SkillDrills',
    description:
      'Exercícios sacádicos online grátis. Treine saltos oculares rápidos entre alvos para melhorar sua agilidade visual.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exercícios Sacádicos Online – Treino Ocular | SkillDrills',
    description:
      'Exercícios sacádicos gratuitos no navegador. Aumente a velocidade dos seus saltos oculares e reflexos.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Hub de Exercícios', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Exercícios Sacádicos', item: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Exercícios Sacádicos Online – Treino de Saltos Oculares',
  alternateName: ['Treino Sacádico Online', 'Simulador de Movimentos Sacádicos', 'Teste de Agilidade Ocular'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta científica interativa para treino de movimentos sacádicos rápidos, fixação foveal e agilidade de varredura visual em tela.',
  browserRequirements: 'Navegador moderno com suporte a HTML5 Canvas e JavaScript',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Exercícios Sacádicos Online — Treino Ocular | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery',
  description:
    'Treino de movimentos sacádicos gratuito no navegador para aprimorar a velocidade de saltos oculares e aquisição periférica.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Movimentos sacádicos, Saltos oculares, Fixação foveal, Varredura visual, Tempo de reação',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Exercícios Sacádicos - Jogo de Reflexos Oculares',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery',
  description: 'Treino interativo de velocidade de salto ocular e pontaria visual no navegador.',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como realizar exercícios sacádicos e acelerar os saltos oculares',
  description: 'Passo a passo para aprimorar a transição do olhar entre alvos e reduzir a latência de fixação.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posicionamento e foco central',
      text: 'Sente-se a cerca de 50–70 cm da tela e fixe o olhar no marcador inicial central.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Detectar o flash periférico',
      text: 'Mantenha a cabeça firme e perceba a aparição do alvo na visão periférica sem virar o pescoço.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Disparar o salto sacádico',
      text: 'Mova os dois olhos rapidamente e em linha reta para as coordenadas do alvo.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Travar o foco foveal e clicar',
      text: 'Centralize a fóvea no alvo com nitidez e clique imediatamente para registrar a latência.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que são exercícios sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exercícios sacádicos são treinos visuais estruturados para desenvolver a velocidade, a precisão e o tempo de reação dos saltos oculares rápidos (sacadas) entre diferentes pontos do campo visual.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a velocidade de uma sacada no sistema visual humano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A velocidade angular de pico de uma sacada atinge entre 200 e 700 graus por segundo, tornando-a um dos movimentos biológicos mais rápidos do corpo humano (Rayner, 1998).',
      },
    },
    {
      '@type': 'Question',
      name: 'O que são sacadas expressas (Fischer & Boch, 1984)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sacadas expressas são movimentos oculares de latência extremamente reduzida (~100–120 ms) acionados via vias subcorticais do colículo superior quando as inibições de fixação são liberadas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o treino sacádico ajuda nos jogos competitivos e FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em jogos de tiro (Valorant, CS2), sacadas velozes permitem checar cantos, consultar o minimapa e mirar em adversários surpresa com o mínimo de tempo de supressão visual.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é supressão sacádica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o mecanismo neurológico pelo qual o cérebro suspende temporariamente a percepção visual durante o salto do olho (20–40 ms) para impedir borrões e tontura.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que significa dismetria sacádica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ocorre quando o olhar erra o alvo, caindo antes (hipometria) ou além dele (hipermetria), exigindo micro-sacadas secundárias de correção que atrasam o disparo.',
      },
    },
    {
      '@type': 'Question',
      name: 'A taxa de atualização do monitor afeta o treino de sacadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Telas de 144 Hz ou 240 Hz exibem os alvos com atraso de apenas 4 a 7 ms (Woods et al., 2015), permitindo que a retina registre a emergência do alvo mais rapidamente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Exercícios sacádicos podem ajudar na velocidade de leitura?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Um controle sacádico eficiente garante trocas de linha suaves e diminui regressões de leitura, acelerando a interpretação textual.',
      },
    },
    {
      '@type': 'Question',
      name: 'Com que frequência devo praticar exercícios sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uma sessão diária de 5 a 10 minutos é suficiente. Treinar em excesso pode causar astenopia (cansaço ocular), logo blocos curtos e intensos são os mais indicados.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este exercício sacádico é gratuito e sem instalação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O simulador da SkillDrills é 100% gratuito, funciona diretamente no navegador e calcula os tempos com precisão de sub-milissegundos usando a API performance.now().',
      },
    },
  ],
};

const saccadicGuide = {
  heading: 'Guia de Exercícios Sacádicos: Velocidade de Saltos Oculares e Fixação Foveal',
  intro: [
    'Os movimentos sacádicos são saltos balísticos de altíssima velocidade que transportam o centro da visão foveal de uma coordenada para outra (Rayner, 1998; Fischer & Boch, 1984).',
    'Com velocidades que superam 700°/s, as sacadas colocam o cérebro em modo de supressão sacádica para evitar borrões na retina. Se os olhos não atingirem o ponto com precisão cirúrgica (dismetria sacádica), micro-sacadas de ajuste serão necessárias, adicionando atrasos cruciais. Este exercício fortalece o freio ocular e aterrissagem em um único movimento decisivo.',
    'Metodologia de medição no navegador: todos os tempos são medidos localmente via High Resolution Time API (performance.now()). Considere as latências do monitor (~16,7 ms em 60 Hz, ~6,9 ms em 144 Hz e ~4,1 ms em 240 Hz; Woods et al., 2015) e a taxa de atualização do mouse. Variações inferiores a 5 ms representam ruído de medição.',
    'Treine sempre no mesmo computador e tela para acompanhar seu progresso fisiológico e reflexos oculares.',
  ],
  benchmarks: {
    title: 'Tabela de Desempenho em Latência Sacádica e Precisão',
    headers: ['Latência Sacádica (Reação)', 'Classificação', 'Dinâmica do Salto Ocular', 'Contexto Funcional', 'Foco Recomendado'],
    rows: [
      ['< 130 ms', 'Nível 1 (Sacadas Expressas / Pro)', 'Disparo subcortical via colículo superior; inibição mínima', 'Atletas de ponta e pilotos de caça (Fischer & Boch, 1984)', 'Treinar amplitude máxima de salto visual'],
      ['130 – 170 ms', 'Nível 2 (Elite)', 'Iniciação cortical extremamente rápida; sem hesitação', 'Competidores de alto nível em esportes de reação', 'Consolidar precisão de parada sem ultrapassar o alvo'],
      ['171 – 220 ms', 'Nível 3 (Avançado / Padrão)', 'Latência saudável de referência para adultos', 'Média esperada para adultos saudáveis (Rayner, 1998)', 'Expandir o raio de percepção periférica'],
      ['221 – 280 ms', 'Nível 4 (Intermediário)', 'Atraso na liberação da fixação; leve hesitação', 'Fadiga ocasional ou recuperação incompleta', 'Fazer pausas 20-20-20 para descanso dos olhos'],
      ['> 280 ms', 'Nível 5 (Base / Dismetria)', 'Dismetria sacádica evidente com múltiplas correções', 'Músculos oculares fatigados ou distrações na tela', 'Priorizar aterrissagem precisa antes de focar em velocidade'],
    ],
    note: 'Classificação baseada em estudos de oculomotricidade (Rayner, 1998; Fischer & Boch, 1984; Leigh & Zee, 2015) adaptada para telas digitais (Woods et al., 2015).',
  },
  techniques: {
    title: 'Técnicas para Maximizar a Velocidade dos Saltos Oculares',
    items: [
      {
        name: 'Isolamento dos Movimentos da Cabeça',
        desc: 'Mova apenas os globos oculares, mantendo cabeça e pescoço totalmente imóveis. Saltos oculares puros são duas vezes mais velozes que movimentos de cabeça.',
        tips: 'Apoie o queixo na mão se perceber que está girando o rosto sem querer.',
      },
      {
        name: 'Percepção Periférica Antecipada',
        desc: 'Use a retina periférica para detectar a coordenada do alvo antes de iniciar a transição rápida dos olhos.',
        tips: 'Mantenha um olhar suave no centro da tela para não criar visão de túnel.',
      },
      {
        name: 'Freio Ocular Preciso (Stopping Power)',
        desc: 'Evite passar do alvo ou frear antes: travar os olhos de primeira no centro do ponto elimina sacadas corretivas.',
        tips: 'A precisão de parada economiza mais tempo do que a pressa cega.',
      },
      {
        name: 'Hidratação e Descanso dos Olhos',
        desc: 'A fixação intensa na tela diminui o piscar em até 60 %, causando ressecamento e lentidão muscular.',
        tips: 'Pisque conscientemente entre as rodadas e olhe para o horizonte.',
      },
    ],
  },
  steps: [
    'Sente-se alinhado ao centro da tela a aproximadamente 60 cm de distância.',
    'Inicie o exercício e fixe o olhar no ponto de partida central.',
    'Assim que um alvo piscar no campo visual, lance os olhos rapidamente sobre ele.',
    'Centralize a fóvea no meio do alvo e clique para registrar a latência.',
    'Repita as rodadas e avalie sua média de latência sacádica.',
  ],
  audience: 'Jogadores de FPS (Valorant, CS2, Apex Legends), atletas de esportes rápidos e qualquer pessoa buscando treinar reflexos e coordenação olho-mão.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/pt/drills/reaction-speed', label: 'Hub Velocidade de Reação' },
    { href: '/pt/drills/reaction-speed/reaction-time-test', label: 'Teste de Tempo de Reação' },
    { href: '/pt/drills/reaction-speed/reflex-training-drill', label: 'Teste de Reflexo (Multi-Alvos)' },
    { href: '/pt/drills/reaction-speed/visual-tracking-speed-test', label: 'Teste de Rastreamento Visual' },
  ],
};

export default function PortugueseSaccadicGalleryPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SaccadicGalleryClient copy={{ title: 'Exercícios Sacádicos Online' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/pt/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
