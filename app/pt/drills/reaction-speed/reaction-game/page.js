import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "jogos de reflexo" — Top reflex query in Brazil
//                   "jogo de reflexo" — High-intent Portuguese gaming query
// SECONDARY / LSI:  "teste de reflexo" — Reflex test query
//                   "treino de reação" — Reaction training query
//                   "jogo de reação" — Reaction game query
// WINNER TITLE:     Jogo de Reflexo Online – Treino de Reação | SkillDrills
// ============================================================

export const metadata = {
  title: 'Jogo de Reflexo Online – Treino de Reação | SkillDrills',
  description:
    'Jogo de reflexo e reação online grátis. Intercepte alvos em queda, treine o rastreamento visual vertical e aprimore a coordenação olho-mão no navegador.',
  keywords: [
    'jogos de reflexo',
    'jogo de reflexo',
    'teste de reflexo',
    'jogo de reação',
    'treino de reação',
    'coordenação olho mão',
    'reflexos fps',
    'alvos em queda',
    'simulador de reflexos online',
    'velocidade de reação',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: 'Jogo de Reflexo Online – Treino de Reação | SkillDrills',
    description:
      'Jogo de reflexo e reação online grátis. Intercepte alvos em queda acelerada e teste sua agilidade mental e motora.',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo de Reflexo Online – Treino de Reação | SkillDrills',
    description:
      'Treine reflexos rápidos e rastreamento vertical no jogo de reação online da SkillDrills sem download.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Central de Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Jogo de Reflexo', item: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jogo de Reflexo Online – Simulador de Reação e Alvos em Queda',
  alternateName: ['Jogos de Reflexo', 'Jogo de Reflexo', 'Jogo de Reação Online', 'Treino de Reflexo FPS'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Simulador online no navegador para interceptação de alvos em queda e treino de coordenação olho-mão e reflexos visuais.',
  browserRequirements: 'Navegador moderno com JavaScript (Chrome, Edge, Safari, Firefox)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jogo de Reflexo Online — Treino de Reação | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game',
  description:
    'Jogo gratuito no navegador para medir e aprimorar a velocidade de reação e coordenação visuomotora.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Velocidade de Reação, Reflexos Visuais, Rastreamento Vertical, Coordenação Olho-Mão',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jogo de Reflexo e Interceptação Cinética',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game',
  description: 'Intercepte alvos em aceleração vertical para testar reflexos e agilidade motora.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Jogar o Jogo de Reflexo Online',
  description: 'Instruções em 4 etapas para interceptar alvos em queda e treinar reflexos visuais.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar o Jogo',
      text: 'Clique em «Iniciar Treino» para abrir a arena de reflexos em tela cheia.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Rastrear Alvos em Queda',
      text: 'Mantenha o foco na área superior da tela para detectar esferas no instante em que surgirem.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Interceptar no Alto',
      text: 'Clique nos alvos o mais rápido possível no terço superior para obter bônus máximos de tempo.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Manter Combos e Subir de Nível',
      text: 'Acerte sequências perfeitas para ativar o multiplicador 3.0x e veja sua pontuação final.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-game#step-4'
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
      name: 'O que é um jogo de reflexo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um jogo de reflexo é uma ferramenta interativa criada para testar e condicionar a velocidade de resposta neuromuscular, o rastreamento ocular e a coordenação olho-mão através de estímulos rápidos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o tempo médio de reação humana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O tempo médio de reação visual simples fica entre 200 e 250 ms (Kosinski, 2008). Quando há necessidade de escolha entre várias faixas (tempo de reação de escolha), o tempo varia entre 250 e 350 ms de acordo com a Lei de Hick (Hick, 1952).',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o rastreamento vertical é importante em jogos de tiro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em jogos como Apex Legends e Overwatch, os adversários pulam, caem de plataformas e usam tirolesas. O rastreamento vertical treina o controle suave do eixo Y sem perder a mira de vista.',
      },
    },
    {
      '@type': 'Question',
      name: 'É possível melhorar os reflexos através de jogos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O treino sistemático de interceptação acelera a condução neural e a prontidão motora, proporcionando reduções consistentes de 15 a 30 ms no tempo de resposta (Dye et al., 2009).',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre reação simples e reação de escolha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A reação simples mede a resposta a um único sinal pré-definido. A reação de escolha exige identificar em qual faixa o alvo apareceu antes de acionar o clique muscular.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como atingir a pontuação máxima no jogo de reflexo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O segredo é interceptar os alvos logo no terço superior da tela, garantindo bônus máximos de tempo e sustentando a sequência de combos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o tempo de reação dos jogadores profissionais de esports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pro players de CS2 e Valorant costumam registrar marcas entre 150 e 190 ms, garantindo vantagem crítica em duelos diretos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que meus reflexos oscilam em dias diferentes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fadiga mental, noites mal dormidas, ritmo circadiano e atrasos do monitor (como telas de 60Hz) afetam diretamente o processamento neural.',
      },
    },
    {
      '@type': 'Question',
      name: 'Um monitor de 144Hz ou 240Hz faz diferença no jogo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Telas de 144Hz (6,9 ms) ou 240Hz (4,1 ms) exibem os novos quadros muito antes de um monitor de 60Hz (16,7 ms), reduzindo a latência de hardware em mais de 10 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'O jogo funciona em celulares e tablets com tela de toque?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O ambiente foi desenvolvido para responder a toques na tela sem atrasos, funcionando direto no navegador do celular sem instalar nada.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona a dificuldade progressiva no jogo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À medida que sua pontuação sobe, as esferas caem com maior aceleração, os intervalos de surgimento encurtam e as áreas de clique diminuem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Com que frequência devo treinar meus reflexos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessões diárias de 5 a 10 minutos antes de jogar são ideais para aquecer a coordenação motora sem sobrecarregar tendões ou visão.',
      },
    },
  ],
};

const reactionGameGuidePt = {
  heading: 'Guia do Jogo de Reflexo: Rastreamento Vertical & Interceptação Cinética',
  intro: [
    'Um jogo de reflexo é uma ferramenta interativa criada para testar e condicionar a velocidade de resposta neuromuscular, o rastreamento ocular e a coordenação olho-mão através de estímulos rápidos.',
    'Diferente dos testes simples de clique com luz vermelha e verde, este jogo multi-faixas exige tempo de reação de escolha regido pela Lei de Hick (Hick, 1952): o cérebro precisa localizar esferas em queda livre, calcular sua aceleração e executar o clique antes que alcancem o limite inferior.',
    'Metodologia de Medição & Latência: A telemetria de resposta é registrada localmente pelo navegador via API performance.now(), eliminando atrasos de rede. Monitores padrão de 60Hz impõem até 16,7 ms de atraso de buffer, enquanto painéis de 144Hz (6,9 ms) e 240Hz (4,1 ms) proporcionam maior fidelidade (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabela de Desempenho e Níveis de Pontuação no Jogo de Reflexo (45 segundos)',
    headers: ['Faixa de Pontos', 'Classificação', 'Perfil Neuromuscular', 'Foco Recomendado'],
    rows: [
      ['15.000+ pontos', 'Grão-Mestre / Pro', 'Captura foveal imediata e liberação motora ultra-rápida', 'Manter compostura durante quedas simultâneas em múltiplas faixas'],
      ['10.000 – 14.999 pontos', 'Elite Competitiva', 'Antecipação avançada de trajetória com penalidades mínimas', 'Interceptar os alvos no terço superior da tela'],
      ['6.000 – 9.999 pontos', 'Avançado', 'Reflexos consistentes com adaptação sólida à aceleração', 'Utilizar detecção periférica em vez de focar num único alvo'],
      ['2.500 – 5.999 pontos', 'Intermediário', 'Confortável com alvos isolados, pressionado por ondas densas', 'Minimizar o deslocamento do mouse mantendo o cursor centralizado'],
      ['< 2.500 pontos', 'Iniciante', 'Cliques puramente reativos com hesitação perceptível', 'Priorizar precisão sobre velocidade para estabelecer ritmo'],
    ],
    note: 'Esses patamares são baseados na literatura de cronometria mental e interceptação cinética (Hick, 1952; Carpenter, 1988; Woods et al., 2015). Monitores padrão de 60Hz introduzem cerca de 16,7 ms de latência.',
  },
  techniques: {
    title: 'Mecânicas de Interceptação Cinética e Otimização',
    items: [
      {
        name: 'Interceptação no Terço Superior',
        desc: 'Clicar nas esferas logo no topo da tela garante maior margem de erro e premia o jogador com bônus expressivos de velocidade.',
        tips: 'Mantenha o cursor ligeiramente acima do centro da tela para reagir ao surgimento dos alvos com deslocamento mínimo.',
      },
      {
        name: 'Projeção de Trajetória e Antecipação',
        desc: 'Em vez de perseguir o alvo que já caiu, projete visualmente onde ele estará em 100–150 ms e deixe-o cruzar seu cursor (Carpenter, 1988).',
        tips: 'A ativação prévia do córtex motor reduz movimentos bruscos e correções exageradas de mira.',
      },
      {
        name: 'Visão Periférica para Detecção Imediata',
        desc: 'Fixar o olhar em uma única faixa causa cegueira temporária para as faixas vizinhas. Mantenha o olhar suave no centro superior da tela.',
        tips: 'As células bastonetes da retina periférica possuem maior sensibilidade a movimentos repentinos.',
      },
      {
        name: 'Otimização de Hardware e Taxa de Polling',
        desc: 'Monitores de 60Hz adicionam até 16,7 ms por quadro, enquanto telas de 240Hz reduzem essa defasagem para 4,1 ms (Woods et al., 2015).',
        tips: 'Use mouse gamer a 1000Hz de taxa de polling e desative o V-Sync para obter registro imediato dos cliques.',
      },
    ],
  },
  steps: [
    'Clique em «Iniciar Treino» para acessar a arena em tela cheia.',
    'Posicione o cursor no terço superior central com empunhadura relaxada.',
    'Acompanhe a linha de entrada com visão ampla para notar alvos instantaneamente.',
    'Clique nos alvos enquanto estiverem no alto, antes que atinjam velocidade crítica.',
    'Sustente a sequência de acertos para maximizar o multiplicador e analise sua classificação.',
  ],
  audience: 'Jogadores de FPS verticais (Apex Legends, Overwatch 2, Fortnite), atletas que buscam reflexos rápidos e qualquer pessoa que queira aprimorar a coordenação olho-mão.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/pt/drills/reaction-speed/reaction-time-test', label: 'Teste de Tempo de Reação' },
    { href: '/pt/drills/reaction-speed/reflex-training-drill', label: 'Treino de Reflexos Rápidos' },
    { href: '/pt/drills/reaction-speed/fps-tracking-trainer', label: 'Treinador de Mira e Tracking FPS' },
    { href: '/pt/drills/motor/movement-speed/rapid-tapping', label: 'Teste CPS e Velocidade de Clique' },
  ],
};

export default function PortugueseReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: 'Jogo de Reflexo Online' }} />
      <DrillGuide guide={reactionGameGuidePt} />
    </>
  );
}
