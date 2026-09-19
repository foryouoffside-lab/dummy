import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Treino de Mira Sequencial – Teste de Dedos | SkillDrills',
  description: 'Treino de mira sequencial gratuito. Pratique alternância rápida de alvos em ordem numérica, velocidade dos dedos e precisão motora direto no navegador.',
  keywords: [
    'treino de mira sequencial',
    'teste de mira em sequencia',
    'teste de velocidade dos dedos',
    'clicar em ordem teste',
    'troca de alvos aim trainer',
    'treino de precisao de clique',
    'target switching treino',
    'teste de reflexo e sequencia',
    'cliques por segundo ordenados',
    'treino de mira fps navegador',
    'agilidade motora dos dedos',
    'teste de coordenacao motora fina',
  ],
  openGraph: {
    title: 'Treino de Mira Sequencial – Teste de Dedos | SkillDrills',
    description: 'Treino de mira sequencial gratuito. Pratique alternância rápida de alvos em ordem numérica, velocidade dos dedos e precisão motora direto no navegador.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Mira Sequencial – Teste de Dedos | SkillDrills',
    description: 'Treino de mira sequencial gratuito. Pratique alternância rápida de alvos em ordem numérica.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinamento Motor', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Movimento', item: 'https://skilldrills.online/pt/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Treino de Mira Sequencial', item: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Treino de Mira Sequencial – Teste de Velocidade dos Dedos',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Treinador de mira sequencial gratuito no navegador. Teste a rapidez na alternância de alvos ordenados, eficiência de trajetória do cursor e agilidade dos dedos.',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Treinador de Mira Sequencial',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer suporte a Canvas HTML5 e JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Treino de Mira Sequencial – Teste de Velocidade dos Dedos',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing',
  description: 'Meça a velocidade de alternância entre alvos em ordem predeterminada baseando-se em programas motores seriais.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um treino de mira sequencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É um exercício interativo de controle motor e reflexo onde o jogador deve clicar em múltiplos alvos em ordem estrita de numeração ou tamanho antes que o tempo expire. Treina a aquisição balística de alvos, a varredura visual e a rapidez na troca de alvos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o sequenciamento motor ajuda em jogos FPS como Valorant e CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em tiroteios táticos contra múltiplos oponentes, é fundamental alternar a mira com rapidez e precisão entre alvos sucessivos. O treino sequencial exercita o córtex motor a pré-planejar trajetórias completas (Lashley 1951), eliminando a hesitação entre cliques.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre um teste de CPS comum e este treino sequencial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um teste de CPS comum mede apenas a quantidade de cliques em um ponto estático. O treino sequencial integra cliques rápidos com deslocamento espacial do cursor, exigindo desaceleração antagônica e controle refinado sob a Lei de Fitts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o raio dos alvos diminui ao longo da sequência?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O encolhimento simula situações táticas reais: um flick inicial rápido em uma área ampla (como o tronco do oponente), seguido por microajustes de precisão milimétrica em alvos reduzidos (como a cabeça/headshot).',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a sensibilidade de mouse recomendada para este teste?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomenda-se manter a mesma sensibilidade usada nos seus jogos competitivos habituais, geralmente entre 25 cm e 45 cm por giro de 360 graus. Isso garante transferência direta de memória muscular.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é "motor chunking" (agrupamento motor)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o processo neurológico em que o cérebro funde múltiplos movimentos discretos em um único programa motor unificado (Lashley 1951). Em vez de planejar cada alvo isoladamente, o jogador executa a cadeia inteira de forma fluida, reduzindo a latência em mais de 50%.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quantos minutos por dia devo dedicar a este exercício?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 10 a 15 minutos diários de prática focada, divididos em 3 a 4 blocos curtos com 60 segundos de intervalo. O cansaço muscular acumulado prejudica a coordenação fina e gera vícios posturais.',
      },
    },
    {
      '@type': 'Question',
      name: 'O treino ajuda também em jogos de ritmo como osu!?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A leitura rápida de padrões geométricos e a execução de cliques sequenciais precisos no tempo e no espaço transferem-se diretamente para o desempenho em beatmaps de ritmo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual configuração de hardware garante a maior precisão nos testes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um monitor de alta taxa de atualização (144 Hz ou superior), um mouse gamer com taxa de amostragem (polling rate) de 1000 Hz e a aceleração de ponteiro do Windows desativada para rastreamento 1:1 rigoroso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a porcentagem de precisão (Accuracy) é calculada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pela razão entre cliques corretos na sequência e o total de cliques efetuados (incluindo erros fora do alvo ou fora de ordem). Manter precisão acima de 95% em níveis altos indica domínio do equilíbrio velocidade-precisão.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Treinar Mira Sequencial e Velocidade dos Dedos',
  description: 'Guia prático para desenvolver rapidez em cliques ordenados e troca ágil de alvos.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Escanear a Disposição dos Alvos',
      text: 'Analise rapidamente os nós numéricos na tela para planejar a rota geométrica mais curta e rápida.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Acertar o Primeiro Alvo de Imediato',
      text: 'Faça um flick rápido até o primeiro nó e clique sem hesitar para acionar a contagem.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Seguir a Cadeia em Ordem Estrita',
      text: 'Avance de forma fluida de nó em nó (1 para 2 para 3), mantendo uma cadência uniforme e sem pausas desnecessárias.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Examinar Métricas e Latência Inter-Alvos',
      text: 'Analise no relatório final seu tempo de transição médio, taxa de precisão e velocidade de conclusão para refinar seu treino.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: 'Fundamentos Científicos da Mira Sequencial',
    paragraphs: [
      'A alternância de alvos em sequência ordenada exige controle motor avançado: cada transição entre dois nós obedece à Lei de Fitts (Fitts, 1954; MacKenzie, 1992), com o tempo de movimento determinado pela razão entre a distância e o diâmetro do alvo. A sequência em si é armazenada pelo cérebro como um programa motor pré-estruturado (Lashley, 1951; Keele, 1968).',
      'Medição no navegador: As medições utilizam a API performance.now(). A taxa de atualização da tela discretiza os eventos gráficos (16,7 ms a 60 Hz; 4,1 ms a 240 Hz). Variações inferiores a 5 ms devem ser interpretadas como margem técnica natural.',
    ],
  },
  benchmark: {
    title: 'Tabela de Desempenho e Classificação em Sequência',
    description: 'Parâmetros de referência baseados em latência de transição entre cliques (Inter-Tap Latency), nível atingido e precisão da cadeia.',
    columns: ['Tier', 'Classificação', 'Latência entre Cliques', 'Teto de Nível', 'Precisão da Cadeia', 'Faixa de Nível'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Sequenciador Apex (Apex Sequencer)',
        stat: 'Abaixo de 180 ms',
        level: 'Nível 12+',
        accuracy: '98–100%',
        percentile: 'Top 1% (Elite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Tático Mestre (Master Tactician)',
        stat: '180–230 ms',
        level: 'Nível 9–11',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avançado)',
      },
      {
        tier: 'Tier 3',
        rank: 'Operador Qualificado (Proficient Operator)',
        stat: '230–300 ms',
        level: 'Nível 6–8',
        accuracy: '90–94%',
        percentile: 'Top 20% (Sólido)',
      },
      {
        tier: 'Tier 4',
        rank: 'Clicador Intermediário (Intermediate Clicker)',
        stat: '300–400 ms',
        level: 'Nível 3–5',
        accuracy: '82–89%',
        percentile: 'Padrão Médio',
      },
      {
        tier: 'Tier 5',
        rank: 'Sequenciador Iniciante (Novice Sequencer)',
        stat: 'Acima de 400 ms',
        level: 'Nível 1–2',
        accuracy: 'Abaixo de 82%',
        percentile: 'Iniciante',
      },
    ],
  },
  protocols: {
    title: 'Metodologias Estruturadas de Treinamento',
    description: 'Técnicas consolidadas para acelerar a alternância de alvos e o ritmo motor.',
    items: [
      {
        title: 'Protocolo 1: Agrupamento Motor Hierárquico (Lashley 1951)',
        description: 'Faça uma leitura prévia dos alvos antes do primeiro clique. Agrupe toda a cadeia de movimentos em uma única representação mental para eliminar pausas intermediárias.',
      },
      {
        title: 'Protocolo 2: Ritmo Balístico em Malha Aberta (Keele 1968)',
        description: 'Percorra trajetórias longas com velocidade máxima e sem correções prematuras, aplicando desaceleração firme apenas ao alcançar a borda do alvo.',
      },
      {
        title: 'Protocolo 3: Desaceleração Gradual para Alvos Reduzidos',
        description: 'Ajuste a frenagem da mão conforme o tamanho dos nós diminui: impulsos amplos de braço para o início e microcorreções de dedos e punho para os alvos finais.',
      },
      {
        title: 'Protocolo 4: Sincronização e Cadência Constante',
        description: 'Desenvolva um ritmo metronômico nos cliques. Precipitar-se causa cliques incorretos e penalidades de tempo severas.',
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

const ptCopy = {
  title: "Treino de Mira Sequencial",
  desc: "A alternância sequencial de alvos treina o clique rápido e preciso em nós ordenados numericamente em vez de mirar no alvo mais acessível. Com base nos programas motores seriais de Lashley (1951) e Keele (1968), aperfeiçoa o planejamento de trajetórias balísticas e microcorreções de mira.",
  score: "Pontos",
  timeLeft: "Tempo Restante",
  accuracy: "Precisão",
  bestScore: "Melhor Pontuação",
  startButtonText: "Iniciar Treino",
  startSubtitle: "Precisão Motora e Trajetórias Sequenciais • Entrada Direta 1:1",
  getReady: "PREPARE-SE",
  rulesTitle: "Instruções do Treino e Sistema de Pontuação",
  rulesItems: [
    { num: "1", text: "Acerto Sequencial de Nós", highlight: "Sequência Esmeralda", result: "+150 PTS × Combo (+0.6s)" },
    { num: "2", text: "Multiplicador de Combo", highlight: "Até 3.0×", result: "Aumenta a pontuação exponencialmente" },
    { num: "3", text: "Progressão de Nível", highlight: "Escala Contínua", result: "Alvos encolhem dinamicamente" },
    { num: "4", text: "Erro / Expiração", highlight: "Reinício do Combo", result: "Penalidade de -0.8s" }
  ],
  chainsCleared: "Sequências Concluídas",
  peakLevel: "Nível Máximo",
  maxCombo: "Combo Máximo",
  playAgain: "Treinar Novamente",
  shareTitle: "Compartilhar Pontuação",
  exitTitle: "Sair"
};

export default function PortugueseFingerSequencingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <FingerSequencingClient copy={ptCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/pt/drills/motor/movement-speed/finger-sequencing" />
      </div>
      <DrillFooter />
    </>
  );
}
