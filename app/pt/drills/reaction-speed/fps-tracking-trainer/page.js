import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – pt-BR / pt-PT (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "Tracking FPS" / "Treino de Mira Rastreamento"
// SECONDARY / LSI:
//   "Treinar Tracking Mouse" / "Como Melhorar a Mira de Tracking"
//   "Mira Tremendo FPS Resolver" / "Smoothness Aim Trainer"
// ============================================================

export const metadata = {
  title: 'Tracking FPS – Treino de Mira Rastreamento | SkillDrills',
  description: 'Treino de tracking FPS online e gratuito. Aprimore o rastreamento suave da mira, controle de strafe e elimine tremores para CS2, Valorant e Apex.',
  keywords: [
    'tracking fps',
    'treino de mira rastreamento',
    'treinar tracking mouse',
    'como melhorar a mira de tracking',
    'mira tremendo fps resolver',
    'smoothness aim trainer',
    'treino de strafe tracking',
    'mira de perseguição shooter',
    'controle de mouse suave',
    'apex legends rotina tracking',
    'exercicio mira continua',
    'perseguição ocular suave',
  ],
  openGraph: {
    title: 'Tracking FPS – Treino de Mira Rastreamento | SkillDrills',
    description: 'Treino de tracking FPS online e gratuito. Aprimore o rastreamento suave da mira, controle de strafe e elimine tremores para CS2, Valorant e Apex.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracking FPS – Treino de Mira Rastreamento | SkillDrills',
    description: 'Treino de tracking FPS online e gratuito. Aprimore o rastreamento suave da mira, controle de strafe e elimine tremores para CS2, Valorant e Apex.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Drills Hub', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'FPS Tracking Trainer', item: 'https://skilldrills.online/pt/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FPS Tracking Trainer — Treino de Mira de Rastreamento',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Simulador online de mira contínua e rastreamento cinético para jogos de tiro tático e battle royale.',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FPS Tracking Trainer Online',
  applicationCategory: 'GameApplication',
  browserRequirements: 'Requires modern browser with Pointer Lock API support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer Drill',
  gameItem: ['Mira de Rastreamento', 'Smoothness Test', 'Strafe Reading'],
  numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é tracking no FPS e qual sua diferença para flick shot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tracking é a capacidade motora de manter a retícula continuamente sobre um alvo em deslocamento fluido, exigindo coordenação neuromotora contínua (smooth pursuit). Flick shots, por outro lado, são disparos balísticos balizados por movimentos sacádicos pontuais de reposicionamento rápido.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que minha mira de tracking treme ou perde a suavidade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A mira trêmula surge geralmente de tensão muscular excessiva no punho ou antebraço (co-contração de agonistas e antagonistas) ou sensibilidade de mouse excessivamente alta. O relaxamento isométrico e a transição para movimentos guiados pelo antebraço eliminam os micro-espasmos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual o papel da perseguição ocular suave (smooth pursuit) no rastreamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pesquisas de Rashbass (1961) e Krauzlis (2004) provam que o sistema oculomotor prevê trajetórias contínuas calculando a velocidade retiniana do alvo. Fixar o olhar no contorno do adversário em movimento, e não na própria mira, sincroniza o circuito visual e o comando motor do mouse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como reagir com firmeza quando o adversário muda de direção (strafe reversal)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evite tentar adivinhar a mudança antecipadamente. Ao perceber a inversão, execute uma desaceleração controlada seguida de aceleração suave na nova direção em vez de um movimento brusco de pânico, diminuindo o tempo de reaquisição do alvo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a sensibilidade de mouse recomendada para aperfeiçoar o tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uma sensibilidade intermediária a moderadamente baixa (geralmente entre 28 cm e 45 cm por 360°) oferece a melhor combinação de estabilidade motora e amplitude para acomodar alvos velozes sem exigir contrações bruscas dos dedos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o mousepad e os feets influenciam a consistência do tracking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pads com fricção dinâmica equilibrada e feets de PTFE 100% puro minimizam o atrito inicial e a resistência ao deslizamento contínuo, facilitando microajustes fluídos e prevenindo travamentos indesejados durante o movimento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quantos minutos diários de treino de tracking são recomendados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessões de 15 a 25 minutos diários com foco deliberado em suavidade e zero tensão são ideais. Períodos mais longos sem descanso podem levar a fadiga neuromotora, revertendo o aprendizado e gerando vícios de postura.',
      },
    },
    {
      '@type': 'Question',
      name: 'O treino de tracking no navegador é transferível para CS2, Valorant e Apex Legends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A coordenação neuromuscular refinada através de exercícios de suavidade e leitura de trajetórias é transferível diretamente para a mecânica do cursor e campo de visão em qualquer motor gráfico com proporção 1:1 sem aceleração.',
      },
    },
    {
      '@type': 'Question',
      name: 'Devo apoiar o antebraço ou apenas o punho na mesa para rastrear alvos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apoiar grande parte do antebraço na mesa distribui o peso muscular e diminui a sobrecarga no punho, permitindo grandes arcos de rastreamento com estabilidade corporal superior e reduzindo riscos de lesão por esforço repetitivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a pontuação de tempo no alvo considerada nível competitivo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Manter mais de 72% de tempo contínuo sobre o alvo dinâmico com desvio médio inferior a 14 pixels classifica o atleta no percentil superior (Top 5%), característico de elos avançados como Mestre e Radiante.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Treinar Tracking de Mira no FPS',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calibrar Sensibilidade e Ativar Modo Tela Cheia',
      text: 'Selecione a velocidade desejada e configure a tela cheia para evitar distrações periféricas e garantir captação 1:1 do ponteiro.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fixar o Olhar no Vetor de Movimento do Alvo',
      text: 'Concentre seus olhos diretamente no centro da esfera dinâmica em vez de focar estaticamente na retícula do mouse.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Executar Movimento Suave Sem Contrair os Músculos',
      text: 'Mantenha a mão e o punho relaxados, permitindo que o antebraço guie o mouse em uma velocidade linear contínua.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Absorver Mudanças de Direção com Calma',
      text: 'Quando o alvo inverter o rumo, espere a confirmação visual e ajuste a direção com suavidade, eliminando puxadas abruptas.',
    },
  ],
};

const guideProps = {
  title: 'Treinador de Tracking FPS — Precisão de Rastreamento e Mira Contínua',
  subtitle:
    'Aprimore a perseguição ocular suave, o controle de recuo contínuo e a firmeza muscular contra alvos em movimentação multidirecional.',
  scientificIntro: `O tracking em jogos de tiro em primeira pessoa (FPS) exige uma interação dinâmica entre dois subsistemas visomotores fundamentais: o sistema de perseguição ocular suave (smooth pursuit) e o controle proprioceptivo dos músculos motores do membro superior (Rashbass, 1961; Krauzlis, 2004). Enquanto o disparo balístico instantâneo depende de rajadas sacádicas, o rastreamento contínuo exige a anulação constante do erro de velocidade retiniana em tempo real.

Quando o alvo se desloca através do campo visual, o córtex visual transmite sinais contínuos para a área temporal medial superior (MST), que decodifica o vetor de velocidade e orienta o cerebelo na modulação do tônus muscular. Se o operador sofre de co-contração isométrica dos músculos agonistas e antagonistas do punho, o movimento torna-se trêmulo, forçando o cérebro a recorrer a micro-sacadas corretivas ineficientes.

O presente protocolo de treino isola as variáveis cinéticas da perseguição contínua, permitindo ao jogador descondicionar a tensão excessiva no periférico e desenvolver uma coordenação visomotora fluida. O resultado é uma mira estável, previsível e com tempo de permanência no alvo maximizado em confrontos dinâmicos de curta e média distância.`,
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  benchmarks: {
    title: 'Tabela de Desempenho em Precisão de Tracking e Tempo no Alvo',
    headers: ['Nível', 'Percentil', 'Tempo no Alvo (%)', 'Desvio Médio', 'Marco Neuromotor'],
    rows: [
      ['Elite / Radiante', 'Top 1%', '≥ 85%', '< 8 px', 'Perseguição ocular contínua sem micro-sacadas parásitas'],
      ['Mestre / Avançado', 'Top 5%', '72% – 84%', '8 – 14 px', 'Ajuste reativo fluido em mudanças de direção'],
      ['Competitivo / Intermediário', 'Top 20%', '58% – 71%', '15 – 22 px', 'Boa consistência em vetores previsíveis'],
      ['Praticante', 'Top 50%', '42% – 57%', '23 – 32 px', 'Presença de micro-sacadas corretivas frequentes'],
      ['Iniciante', 'Base', '< 42%', '≥ 33 px', 'Atraso reativo acentuado e tensão excessiva'],
    ],
    note: 'Métricas baseadas em testes padronizados de tempo contínuo de contato com alvos dinâmicos a velocidades angulares variáveis (Rashbass 1961; Krauzlis 2004).',
  },
  protocols: {
    title: 'Protocolos de Treino para Domínio de Tracking',
    description: 'Rotinas progressivas para eliminar o tremor e acelerar a reaquisição de alvos em movimento.',
    items: [
      {
        title: 'Aquecimento de Suavidade Linear (5 min)',
        description: 'Concentre-se em deslizar o mouse na mesma velocidade do alvo em trajetórias retas sem apertar o periférico.',
      },
      {
        title: 'Treino de Reatividade em Strafe (10 min)',
        description: 'Pratique a reaquisição imediata quando o alvo inverte de direção subitamente, mantendo aceleração controlada.',
      },
      {
        title: 'Desafio em Velocidade Máxima (5 min)',
        description: 'Aumente a velocidade do alvo para forçar adaptação neural e expansão da amplitude motora do antebraço.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes sobre Tracking e Mira Suave',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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
      <FPSTrackingTrainerClient copy={{ title: 'Tracking FPS' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/pt/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
    </>
  );
}
