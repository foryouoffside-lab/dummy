import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (Portuguese: Jogo da Mão Firme)
// PRIMARY:  "jogo da mão firme"              — Cultural identity query
//           "teste da mão firme"             — Diagnostic query
// SECONDARY / LSI:
//           "jogo do arame elétrico"         — Traditional wire game
//           "teste de precisão do mouse"     — Precision query
//           "teste de tremor nas mãos online" — Tremor test
//           "coordenação motora fina mouse"  — Fine motor query
//           "lei de direção de accot-zhai"   — Steering Law
// ============================================================

export const metadata = {
  title: 'Jogo da Mão Firme – Teste de Precisão do Mouse e Firmeza',
  description: 'Jogo da mão firme online grátis. Guie o cursor por corredores estreitos sem tocar nas bordas. Meça tremor motor e precisão com a Lei de Accot-Zhai.',
  keywords: [
    'jogo da mão firme',
    'teste da mão firme',
    'jogo do arame elétrico',
    'teste de precisão do mouse',
    'teste de tremor nas mãos online',
    'coordenação motora fina mouse',
    'controle de ponteiro do mouse',
    'lei de direção de accot-zhai',
    'treino de firmeza manual',
    'labirinto de arame online',
    'estabilidade de mira mouse',
    'exercício para diminuir tremor',
  ],
  openGraph: {
    title: 'Jogo da Mão Firme – Teste de Precisão do Mouse e Firmeza | SkillDrills',
    description: 'Jogo da mão firme online grátis. Guie o cursor por corredores estreitos sem tocar nas bordas. Meça tremor motor e precisão com a Lei de Accot-Zhai.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo da Mão Firme – Teste de Precisão do Mouse e Firmeza | SkillDrills',
    description: 'Jogo da mão firme online grátis. Guie o cursor por corredores estreitos sem tocar nas bordas. Meça tremor motor e precisão com a Lei de Accot-Zhai.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinamento Motor', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Controle de Precisão', item: 'https://skilldrills.online/pt/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Jogo da Mão Firme', item: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jogo da Mão Firme – Teste de Precisão e Tremor do Mouse',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Jogo da mão firme e teste de precisão motora fina gratuito para navegador. Guie o cursor por trajetórias que se estreitam e avalie seu controle de tremor fisiológico.',
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/pt' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jogo da Mão Firme Online',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno com suporte a HTML5 Canvas e Pointer Events de alta taxa',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jogo da Mão Firme e Precisão Motora',
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
  description: 'Desafio interativo de controle de cursor em corredores estreitos com base na Lei de Accot-Zhai.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é o Jogo da Mão Firme e o que ele mede no controle motor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O Jogo da Mão Firme é uma avaliação neuromotora interativa na qual o usuário guia o cursor por um corredor sinuoso sem colidir com as paredes. Mede a estabilidade de trajetória, a eficiência do feedback visual contínuo e a amplitude do tremor fisiológico sob estreitamento progressivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual lei científica rege o movimento do mouse em corredores estreitos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O movimento em túneis delimitados obedece à Lei de Direção de Accot-Zhai (1997), uma extensão da Lei de Fitts para trajetórias contínuas. A lei estabelece que o tempo de condução é proporcional à integral do comprimento do trajeto dividido pela largura da pista: corredores mais estreitos exigem velocidades menores para evitar colisões.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o cursor retorna ao início ao encostar na borda da pista?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O motor calcula em tempo real a distância euclidiana entre as coordenadas do ponteiro e a linha central do trajeto. Ao ultrapassar a tolerância da meia-largura, ocorre violação de fronteira, resetando o cursor para impor rigorosa disciplina de tolerância zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a largura da pista se estreita a cada volta concluída?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pista começa com uma margem ampla de 50 pixels na volta 1 e vai se estreitando a cada volta concluída até atingir 12 pixels no nível 12, exigindo coordenação motora de nível cirúrgico.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que causa o tremor nas mãos durante o manuseio fino do mouse?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O tremor fisiológico normal (8–12 Hz) resulta de disparos síncronos de unidades motoras e ressonância biomecânica dos membros. Tensão excessiva na pegada do mouse (co-contração de músculos agonistas e antagonistas), estresse e cafeína amplificam esse tremor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais são a pegada e o DPI ideais para o jogo da mão firme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomenda-se uma pegada fingertip ou claw relaxada, combinando o deslize suave do antebraço com microajustes nos dedos. Configurações de DPI mais baixas (400 a 800 DPI) filtram o jitter natural da mão muito melhor do que sensibilidades ultrarrápidas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o modelo de Woodworth (1899) se aplica ao seguimento de caminhos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Robert S. Woodworth demonstrou que movimentos direcionados combinam um impulso balístico inicial com uma fase de controle contínuo por feedback visual (Current Control). No jogo da mão firme, esse controle contínuo em circuito fechado atua corrigindo microdesvios antes do choque com a parede.',
      },
    },
    {
      '@type': 'Question',
      name: 'O treino de mão firme beneficia jogadores de FPS, desenhistas e cirurgiões?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Tanto na mira de rastreamento (tracking) em jogos de tiro quanto na precisão de traço na ilustração digital e na instrumentação laparoscópica na cirurgia, a capacidade de guiar pontas finas sem oscilações é essencial.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como evitar fadiga muscular e cãibras durante o exercício?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mantenha o cotovelo apoiado a cerca de 90 graus na mesa sem pressionar o mouse excessivamente para baixo. Solte o ar conscientemente antes de curvas fechadas para relaxar o ombro e faça pausas de 60 segundos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O teste funciona com trackball e mesa digitalizadora com caneta stylus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Graças à API de Pointer Events, o jogo responde perfeitamente a mouses ópticos, trackballs e canetas digitais, permitindo avaliar a firmeza em múltiplos dispositivos.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar firmeza manual e precisão no mouse',
  description: 'Guia passo a passo para conduzir o cursor por corredores estreitos com mínimo tremor.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand#step-1',
      name: 'Posicionar cursor na área de largada',
      text: 'Clique em „Iniciar Treino“ e posicione o ponteiro na área verde à esquerda para ligar o trajeto e o cronômetro de 45 segundos.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand#step-2',
      name: 'Manter velocidade constante e suave',
      text: 'Deslize com suavidade pela linha azul fluorescente, equilibrando avanço com controle para não estourar o tempo.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand#step-3',
      name: 'Antecipar curvas fechadas com desaceleração',
      text: 'Reduza a velocidade em cerca de 40% ao se aproximar de cotovelos e olhe de 20 a 30 pixels à frente do cursor para antecipar o feedback visual.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand#step-4',
      name: 'Atingir a meta para estreitamento dinâmico',
      text: 'Entre na zona verde final para fechar a volta. O tempo reseta e o trajeto fica mais estreito para o nível seguinte.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Como a firmeza da mão e a precisão são medidas',
    paragraphs: [
      'Precisão da medição e limites do sistema: A cronometragem utiliza a API performance.now() do navegador (arredondada para ~1 ms por segurança). A renderização gráfica é sincronizada com a taxa de atualização do monitor — ~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz e ~4,1 ms a 240 Hz (Woods et al., 2015). A taxa de varredura do mouse adiciona ~8 ms a 125 Hz e ~1 ms a 1000 Hz. Diferenças abaixo de 5 ms são ruído técnico. O SkillDrills armazena seus dados apenas localmente no navegador.',
    ],
  },
  benchmark: {
    title: 'Tabela de Desempenho no Jogo da Mão Firme',
    description: 'Parâmetros editoriais para interpretar seus resultados com base na Lei de Accot & Zhai (1997). As faixas avaliam nível alcançado, largura da trilha e desvio médio.',
    columns: ['Nível', 'Classificação', 'Nível Concluído', 'Largura da Pista', 'Desvio Médio', 'Faixa Editorial'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Cirurgião de Elite (Apex Surgeon)',
        stat: 'Nível 12+',
        level: '12–15 px',
        accuracy: 'Abaixo de 2,5 px',
        percentile: 'Excepcional (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Navegador Mestre',
        stat: 'Nível 9–11',
        level: '16–22 px',
        accuracy: 'Abaixo de 4,0 px',
        percentile: 'Avançado (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Piloto Preciso',
        stat: 'Nível 6–8',
        level: '23–32 px',
        accuracy: 'Abaixo de 6,5 px',
        percentile: 'Sólido (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Cursor Intermediário',
        stat: 'Nível 3–5',
        level: '33–42 px',
        accuracy: 'Abaixo de 9,0 px',
        percentile: 'Típico',
      },
      {
        tier: 'Tier 5',
        rank: 'Iniciante com Tremor',
        stat: 'Nível 1–2',
        level: '43–50 px',
        accuracy: 'Acima de 9,0 px',
        percentile: 'Em desenvolvimento',
      },
    ],
  },
  protocols: {
    title: 'Protocolos de Treino para Estabilidade e Firmeza',
    description: 'Instruções científicas para reduzir o tremor na mão e dominar trajetórias sinuosas no mouse.',
    items: [
      {
        title: 'Protocolo 1: Ritmo de Velocidade por Accot-Zhai (Controle em Túneis)',
        description: 'Conforme a Lei de Accot-Zhai (1997), a velocidade segura de travessia é inversamente proporcional ao estreitamento do túnel. Acelere em trechos retos para poupar tempo e reduza 40% da velocidade ao entrar em cotovelos apertados.',
      },
      {
        title: 'Protocolo 2: Antecipação Visual de Woodworth (Feedforward)',
        description: 'Fixe os olhos cerca de 20 a 30 pixels à frente do ponteiro e não sobre ele. Essa antecipação permite ao córtex motor compensar os ~150 ms de atraso do feedback visual e corrigir desvios antes da colisão.',
      },
      {
        title: 'Protocolo 3: Damping de Tremor Fisiológico (8–12 Hz) e Desacoplamento',
        description: 'Execute curvas amplas com o antebraço e use os dedos apenas para pequenos retoques. Aperto excessivo no mouse causa co-contração muscular e agrava o tremor natural.',
      },
      {
        title: 'Protocolo 4: Abordagem pelo Ápice da Curva',
        description: 'A partir do nível 6 (menos de 30 px), prefira precisão a velocidade. Fazer a tangência pelo lado de dentro da curva oferece margem máxima de segurança contra desvios centrífugos.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes sobre o Jogo da Mão Firme e Precisão no Mouse',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const ptCopy = {
  h1Keyword: 'Jogo da Mão Firme',
  h1Suffix: ' (Teste de Precisão do Mouse)',
  caption: 'O jogo da mão firme mede a estabilidade e a precisão motora fina ao guiar o cursor por um trajeto luminoso sem encostar nas bordas. Fundamentado na Lei de Accot-Zhai (1997) e no controle motor em circuito fechado de Woodworth (1899).',
  statLaps: 'Voltas',
  statTime: 'Tempo Restante',
  statStreak: 'Sequência',
  statBest: 'Recorde',
  pausedTitle: 'Pausado',
  pausedPrompt: 'Clique na tela para fixar o cursor e continuar.',
  startTitle: 'Circuito da Mão Firme',
  startSubtitle: 'Precisão Motora & Linhas Estreitas • Tempo de 45s',
  startBtn: 'Iniciar Treino',
  countdownSubtitle: 'PREPARE-SE',
  newBest: 'NOVO RECORDE',
  errorsLabel: 'Toques na Borda',
  maxStreakLabel: 'Maior Sequência',
  difficultyLabel: 'Nível Alcançado',
  trainAgain: 'Tentar Novamente',
  shareTitle: 'Compartilhar Pontuação',
  exitTitle: 'Sair e Voltar',
  rulesTitle: 'Instruções e Regras de Pontuação',
  rule1Text: 'Siga a linha azul',
  rule1Highlight: 'fluorescente com exatidão',
  rule1Result: 'Chegar ao fim reseta o tempo para 45s',
  rule2Text: 'Volta completa',
  rule2Highlight: 'Dificuldade progressiva',
  rule2Result: 'Pista mais estreita e curvas fechadas',
  rule3Text: 'Toque na borda',
  rule3Highlight: 'Retorno ao início',
  rule3Result: 'Penalidade de volta e erro somado',
  rule4Text: 'Controle de mouse',
  rule4Highlight: 'Recomendado para desktop',
  rule4Result: 'Entrada 1:1 sem aceleração',
  aboutTitle: 'Sobre o Jogo da Mão Firme',
  aboutHeading: 'Rastreamento de Trajetória e Redução do Tremor Manual',
  aboutP1: 'O Jogo da Mão Firme é uma ferramenta especializada para aperfeiçoar a coordenação olho-mão, o controle motor fino dos dedos e a estabilidade do cursor. Conduzir o ponteiro por passagens cada vez mais estreitas fortalece os músculos estabilizadores do punho e antebraço.',
  aboutP2: 'Segundo a Lei de Direção de Accot & Zhai (1997), a dificuldade cresce exponencialmente com a redução da largura. De 50 px a 12 px, o teste exige feedback visual contínuo (Woodworth, 1899) e firmeza muscular absoluta.',
  aboutCard1Title: 'Público-alvo',
  aboutCard1Text: 'Gamers de FPS/MOBA, ilustradores digitais, cirurgiões e quem deseja eliminar a instabilidade e tremor do ponteiro.',
  aboutCard2Title: 'Benefícios Motores',
  aboutCard2Text: 'Coordenação motora fina, firmeza de mão, controle de velocidade em curvas e prevenção de fadiga muscular.',
  aboutCard3Title: 'Estreitamento Dinâmico',
  aboutCard3Text: 'A pista encolhe a cada volta e os ângulos ficam mais agudos, demandando controle milimétrico do mouse.',
  gradeLabels: {
    'S+': 'Firmeza Cirúrgica (Grandmaster)',
    'S': 'Controle de Mestre (Master)',
    'A': 'Mira Precisa (Diamond)',
    'B': 'Boa Estabilidade (Platinum)',
    'C': 'Controle Básico (Gold)',
  },
  shareDrillName: 'Jogo da Mão Firme',
  shareUrl: 'https://skilldrills.online/pt/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ Completei {laps} voltas no {drillName} com precisão de {acc}! Meça sua firmeza e precisão no mouse de graça no skilldrills.online!',
  copiedAlert: 'Cartão de pontuação copiado!',
};

export default function PortugueseSteadyHandPage() {
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
      <SteadyHandClient copy={ptCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="pt" />
      </div>
    </>
  );
}
