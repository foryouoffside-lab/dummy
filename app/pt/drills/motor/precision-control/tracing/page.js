import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — tracing (Portuguese: Jogo de Traçado do Mouse)
// PRIMARY:  "jogo de rastreamento do mouse"   — Rastreamento e coordenação
//           "teste de rastreamento do mouse"  — Diagnostic query
// SECONDARY / LSI:
//           "teste de precisão de traçado mouse" — Path accuracy
//           "treino de mira contínua mouse"      — Aim tracking
//           "controle motor fino traçado"        — Fine motor control
//           "smooth pursuit rastreamento visual" — Psychophysics query
//           "lei de direção de accot-zhai"       — Steering Law
// ============================================================

export const metadata = {
  title: 'Jogo de Traçado do Mouse – Teste de Precisão e Rastreamento',
  description: 'Jogo de traçado do mouse online grátis. Acompanhe a onda sinuosa com o cursor para treinar rastreamento contínuo (smooth pursuit) e controle motor fino.',
  keywords: [
    'jogo de rastreamento do mouse',
    'teste de rastreamento do mouse',
    'teste de precisão de traçado mouse',
    'treino de mira contínua mouse',
    'controle motor fino traçado',
    'smooth pursuit rastreamento visual',
    'lei de direção de accot-zhai',
    'estabilidade de traçado do cursor',
    'exercício de mira suave fps',
    'teste de fluidez motora mouse',
    'jogo de seguir a linha com mouse',
    'coordenação visomotora traçado',
  ],
  openGraph: {
    title: 'Jogo de Traçado do Mouse – Teste de Precisão e Rastreamento | SkillDrills',
    description: 'Jogo de traçado do mouse online grátis. Acompanhe a onda sinuosa com o cursor para treinar rastreamento contínuo (smooth pursuit) e controle motor fino.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo de Traçado do Mouse – Teste de Precisão e Rastreamento | SkillDrills',
    description: 'Jogo de traçado do mouse online grátis. Acompanhe a onda sinuosa com o cursor para treinar rastreamento contínuo (smooth pursuit) e controle motor fino.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinamento Motor', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Controle de Precisão', item: 'https://skilldrills.online/pt/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: 'Jogo de Traçado', item: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Jogo de Traçado do Mouse – Teste de Precisão Motora',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Ferramenta interativa de avaliação motora para manter o cursor sobre uma onda em movimento contínuo sem desvios.',
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/pt' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Jogo de Rastreamento Contínuo Online',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno com suporte a HTML5 Canvas e Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Treino de Traçado e Fluidez de Cursor',
  url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing',
  description: 'Jogo de precisão cinética para desenvolver rastreamento contínuo suave e eliminar microtremores involuntários.',
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
      name: 'O que é o Jogo de Traçado do Mouse e o que ele avalia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É uma avaliação neuromotora interativa onde o usuário deve manter o cursor sobre uma onda senoidal em rolagem contínua dentro de uma margem de 22 pixels. Mede a fluidez motora, a velocidade de rastreamento (smooth pursuit) e o tempo de reação corretivo ao longo de 45 segundos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que a onda se move continuamente em vez de esperar pelo usuário?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O movimento contínuo exige engajamento cinemático ininterrupto. Em tarefas estáticas, o usuário pode parar para reorganizar a pegada; aqui, a onda exige antecipação constante e microcorreções imediatas sem interrupções.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é a Integridade do Fluxo (Flow Integrity) e como é pontuada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Integridade do Fluxo representa a consistência de rastreamento em tempo real (0 a 100%). Ela aumenta continuamente enquanto o cursor permanece centrado na margem de 22 px e cai gradativamente ao sair da linha.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a velocidade e a amplitude aumentam durante os 45 segundos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O teste começa a 2,2 px/frame com amplitude de 90 px e escala até 4,5+ px/frame com oscilações secundárias de até 125 px, exigindo maior sincronização neuromuscular à medida que o tempo avança.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais modelos científicos fundamentam o rastreamento contínuo de trajetórias?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O exercício se baseia na Lei de Direção de Accot-Zhai (1997) e no modelo motor de dois componentes de Robert Woodworth (1899), exigindo controle ininterrupto em circuito fechado onde a visão ajusta o trajeto a cada 150–200 ms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como os movimentos de perseguição suave diferem dos movimentos sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Como demonstrado por Krauzlis (2004) e Rashbass (1961), a perseguição ocular suave acompanha a velocidade do alvo continuamente, enquanto as sacadas são saltos rápidos. Ao desviar da linha, o cérebro realiza uma sacada corretiva seguida de desaceleração suave para retomar o trajeto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como esse treino ajuda em jogos de tiro competitivo (FPS)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jogos com alto tempo para matar (TTK) exigem mira estável sobre alvos que se movem de forma imprevisível. O treino de traçado elimina solavancos bruscos, melhora o deslize do antebraço e suaviza a transição nas mudanças de direção.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual sensibilidade e DPI são ideais para o jogo de traçado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sensibilidades médias a baixas (800 DPI com 25 a 45 cm/360°) oferecem maior controle físico e ativam o antebraço, reduzindo microtremores involuntários. Mantenha a taxa de varredura do mouse em 1000 Hz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como evitar tensão muscular e fadiga durante o treino contínuo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evite apertar o mouse com força excessiva contra o mousepad. Use uma pegada claw ou fingertip relaxada, mova o antebraço a partir do cotovelo para curvas amplas e reserve os dedos para microajustes.',
      },
    },
    {
      '@type': 'Question',
      name: 'É possível treinar usando mesa digitalizadora ou trackball?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O sistema utiliza a API de Pointer Events, permitindo que ilustradores treinem a pressão e a continuidade do traço com caneta digital, além de suportar testes ergonômicos com trackball.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar traçado e rastreamento contínuo no mouse',
  description: 'Guia passo a passo para aprimorar perseguição suave e eliminar solavancos no cursor.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posicionar o cursor na origem da onda',
      text: 'Passe o ponteiro sobre o ponto inicial iluminado antes do início da contagem regressiva.',
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Acompanhar a velocidade e trajetória da curva',
      text: 'Deslize o mouse suavemente sobre o filamento enquanto ele percorre a tela, igualando sua velocidade.',
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Suprimir microtremores e correções bruscas',
      text: 'Relaxe a mão e mantenha o olhar 20 pixels à frente para antecipar os picos da onda sem sair do canal.',
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analisar pontuação e consistência de fluxo',
      text: 'Verifique a pontuação de integridade de fluxo, tempo de contato e estabilidade ao final dos 45 segundos.',
      url: 'https://skilldrills.online/pt/drills/motor/precision-control/tracing#step-4'
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: 'Como o rastreamento contínuo é mensurado',
    paragraphs: [
      'Precisão da medição e limites do sistema: A cronometragem utiliza a API performance.now() do navegador (resolução de ~1 ms por segurança). A exibição visual é quantizada pela frequência do monitor — ~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz e ~4,1 ms a 240 Hz (Woods et al., 2015). A taxa de varredura do mouse adiciona ~8 ms a 125 Hz contra ~1 ms a 1000 Hz. Diferenças abaixo de 5 ms constituem ruído de medição. O SkillDrills não coleta dados externos.',
    ],
  },
  benchmark: {
    title: 'Baremos de Desempenho em Traçado e Rastreamento Suave',
    description: 'Tabela editorial para interpretar seus resultados com base nos estudos de Krauzlis (2004) e Rashbass (1961). Avalia pontuação total, integridade máxima de fluxo e maior sequência de quadros sem desvio em 45 segundos.',
    columns: ['Nível', 'Classificação', 'Pontuação', 'Pico de Fluxo', 'Maior Sequência', 'Faixa Editorial'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Grão-Mestre Apex',
        stat: '1400+ pts',
        level: '95–100%',
        accuracy: '600+ frames',
        percentile: 'Excepcional (Top 1%)',
      },
      {
        tier: 'Tier 2',
        rank: 'Rastreador Mestre',
        stat: '1100–1399 pts',
        level: '85–94%',
        accuracy: '400–599 frames',
        percentile: 'Avançado (Top 5%)',
      },
      {
        tier: 'Tier 3',
        rank: 'Seguidor Habilidoso',
        stat: '800–1099 pts',
        level: '70–84%',
        accuracy: '250–399 frames',
        percentile: 'Sólido (Top 25%)',
      },
      {
        tier: 'Tier 4',
        rank: 'Cursor Intermediário',
        stat: '500–799 pts',
        level: '50–69%',
        accuracy: '120–249 frames',
        percentile: 'Típico',
      },
      {
        tier: 'Tier 5',
        rank: 'Iniciante no Traçado',
        stat: 'Abaixo de 500 pts',
        level: 'Abaixo de 50%',
        accuracy: 'Abaixo de 120 frames',
        percentile: 'Em desenvolvimento',
      },
    ],
  },
  protocols: {
    title: 'Protocolos de Treino para Rastreamento Contínuo',
    description: 'Recomendações técnicas para aprimorar perseguição suave ocular, suprimir sacadas involuntárias e estabilizar a mão.',
    items: [
      {
        title: 'Protocolo 1: Fixação Antecipada e Rastreamento Feedforward (Krauzlis 2004)',
        description: 'Mantenha a foveação visual cerca de 15 a 25 pixels à frente da onda e não exatamente sobre a mira. Essa antecipação permite ao córtex pré-motor calcular curvas de aceleração antes que as mudanças de inflexão ocorram.',
      },
      {
        title: 'Protocolo 2: Rastreamento em Modo Duplo de Rashbass (1961)',
        description: 'Ao sair da margem de 22 px, execute uma sacada rápida e relaxe a tensão muscular de volta ao modo de perseguição contínua para evitar solavancos que causam saída repetida.',
      },
      {
        title: 'Protocolo 3: Modulação de Curvatura de Accot-Zhai (Picos e Vales)',
        description: 'Conforme a Lei de Accot-Zhai (1997), cristas e vales exigem velocidades tangenciais menores do que trechos retos. Diminua ligeiramente o ritmo ao passar pelas curvas para evitar derrapagens.',
      },
      {
        title: 'Protocolo 4: Deslize de Antebraço e Controle de Fricção',
        description: 'Apoie o antebraço levemente sobre a superfície sem cravar o punho na mesa. Faça o pivô a partir do cotovelo para absorver as ondas verticais, deixando os dedos apenas para pequenos ajustes de 1–2 px.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes sobre Traçado de Mouse e Rastreamento de Ondas',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const ptCopy = {
  title: "Jogo de Traçado do Mouse",
  subtitle: "Rastreamento Contínuo Bruto • Cronômetro 45s",
  startButtonText: "Iniciar Treino",
  trainAgain: "Treinar Novamente",
  shareTitle: "Compartilhar Pontuação",
  exitTitle: "Sair",
  statFlowScore: "Pontos de Fluxo",
  statTimeLeft: "Tempo Restante",
  statFlowIntegrity: "Integridade do Fluxo",
  statBestScore: "Melhor Pontuação",
  maxStreakLabel: "Sequência Máxima de Frames",
  peakFlowLabel: "Pico de Estado de Fluxo",
  bestScoreLabel: "Recorde Pessoal",
  rulesTitle: "Instruções do Treino e Sistema de Pontuação",
  rulesItems: [
    { num: "1", text: "Traçar a Trajetória", highlight: "Onda Esmeralda", result: "+1 PT / frame dentro da linha" },
    { num: "2", text: "Velocidade Progressiva", highlight: "Onda Dinâmica", result: "2.2 → 3.8 px/f em 45s" },
    { num: "3", text: "Integridade de Fluxo", highlight: "Super Fluxo", result: "4s seguidos garantem +5 Bônus" },
    { num: "4", text: "Rastreamento Estrito", highlight: "Exclusivo Desktop", result: "Entrada bruta 1:1 do mouse" }
  ],
};

export default function PortugueseTracingPage() {
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
      <FineMotorClient copy={ptCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/tracing" locale="pt" />
      </div>
      <DrillFooter />
    </>
  );
}
