import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (rapid-tapping / motor)
// PRIMARY DOMESTIC: "cps test"            — 2,002 exact Bing searches/mo
//                    "teste de click"      — 318 exact Bing searches/mo
//                    "teste de cps"        — 249 exact Bing searches/mo
//                    "teste cps"           — 148 exact Bing searches/mo
//                    "cliques por segundo" — 75 exact searches/mo
// SECONDARY / LSI:
//                    "teste de velocidade do mouse" — Hardware/dexterity search
//                    "velocidade de clique" — Direct intent
//                    "jitter clicking brasil" / "butterfly clicking" — Competitive Minecraft queries
// NATIVE TITLE:      Teste de CPS – Teste de Velocidade de Clique e Cliques Por Segundo | SkillDrills
// ============================================================

export const metadata = {
  title: 'Teste de CPS – Velocidade de Cliques | SkillDrills',
  description: 'Teste de CPS grátis online no navegador. Meça cliques por segundo (CPS), jitter e butterfly clicking e resistência muscular em 45 segundos sem baixar nada.',
  keywords: [
    'teste de cps',
    'cps test',
    'teste de click',
    'teste de clique',
    'cliques por segundo',
    'contador de cliques',
    'velocidade de clique',
    'teste de clique mouse',
    'jitter clicking teste',
    'butterfly clicking teste',
    'resistencia de clique',
    'treino de cliques rapidos',
  ],
  openGraph: {
    title: 'Teste de CPS – Cliques Por Segundo e Velocidade | SkillDrills',
    description:
      'Teste de CPS grátis online no navegador. Meça seus cliques por segundo (CPS), velocidade de clique, técnicas de jitter e butterfly clicking e resistência muscular.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de CPS – Cliques Por Segundo e Velocidade | SkillDrills',
    description:
      'Teste de CPS grátis online no navegador. Meça seus cliques por segundo (CPS), velocidade de clique e resistência muscular.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Hub de Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Treino Motor', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'Teste de CPS', item: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de CPS – Treinador de Velocidade de Clique e Cliques Por Segundo',
  alternateName: ['Teste de CPS', 'CPS Test', 'Teste de Click', 'Teste de Velocidade de Clique'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta gratuita de teste de CPS e velocidade de clique online. Avalia o clique padrão com um dedo, jitter clicking e butterfly clicking contra uma taxa de encolhimento acelerada em 45 segundos.',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'pt-BR',
  dateModified: '2026-09-11',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Teste de CPS Online',
  alternateName: ['Teste de CPS', 'Teste de Click', 'Velocidade de Clique'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno com suporte a HTML5 Canvas e entrada de ponteiro de alta frequência',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
  inLanguage: 'pt-BR',
  dateModified: '2026-09-11',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Teste de CPS – Teste de Velocidade de Clique e Cliques por Segundo',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping',
  description: 'Teste de CPS – Teste de Velocidade de Clique e Cliques por Segundo',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
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
      name: 'O que é um teste de CPS (Cliques Por Segundo)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um teste de CPS é uma avaliação motora digital que mede a quantidade de cliques de mouse ou toques na tela executados em um segundo. Ele avalia a frequência de disparo neuromuscular, a velocidade de oscilação dos tendões dos dedos e a resistência do antebraço.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é uma pontuação média de CPS para jogadores comuns e competitivos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usuários comuns alcançam entre 5,0 e 6,5 CPS com toque padrão de dedo único. Jogadores habituados atingem entre 8,0 e 10,5 CPS com mecânica rápida, enquanto especialistas de Minecraft PvP e jogos de ritmo chegam a 12,0–16,0+ CPS com jitter clicking e 16,0–20,0+ CPS com butterfly clicking.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é jitter clicking e como ele funciona fisiologicamente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O jitter clicking envolve gerar co-contração isométrica contínua nos músculos flexores e extensores do antebraço. Esses micro-tremores de alta frequência são transmitidos pelo pulso rígido diretamente para o botão do mouse, atingindo 11 a 15 CPS sem exigir flexões voluntárias isoladas do dedo.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é butterfly clicking e qual a diferença para o jitter clicking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O butterfly clicking utiliza batidas alternadas entre o dedo indicador e o dedo médio sobre o botão esquerdo do mouse. Por alternar os dedos com o braço mais relaxado, causa menor estresse físico que o jitter clicking e alcança de 16 a 22+ CPS em mouses mecânicos com baixo tempo de debounce.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que um CPS alto é decisivo no Minecraft PvP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na mecânica de combate tradicional do Minecraft (1.8), uma taxa elevada de cliques prioriza o registro de acertos (hit registration) e maximiza o recuo (knockback) causado ao oponente, além de reduzir o recuo sofrido pelo jogador, facilitando a manutenção de combos aéreos contínuos.',
      },
    },
    {
      '@type': 'Question',
      name: 'A velocidade de clique faz diferença em jogos como Valorant e CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Embora o posicionamento de mira seja primordial em atiradores táticos, a capacidade de clicar rápido é crucial em rodadas de pistola (Classic, Ghost, USP-S) para desferir disparos rápidos em sucessão sem desestabilizar o alinhamento da mira.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais são os limites neuromusculares do toque com um único dedo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estudos neuropsicológicos (Halstead 1947, Todor & Kyprie 1980) demonstram que toques voluntários do indicador dominante chegam a cerca de 5,5 a 7,0 Hz (~55 toques em 10 segundos) devido ao período refratário do comando motor central. Ultrapassar 10 CPS exige técnicas como ressonância de vibração ou alternância de dedos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o teste de 45 segundos da SkillDrills desafia a resistência?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ao contrário de contadores estáticos de 5 segundos, este treino dura 45 segundos e avalia a resistência contínua: clicar expande o raio do alvo, mas o motor de encolhimento dinâmico contrai a esfera em até 600 pixels/segundo, exigindo cadência estável e controle de fadiga.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como aumentar o CPS e prevenir dores no antebraço e tendinite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pratique treinos intervalados (45 segundos de sprint seguidos por 60 segundos de relaxamento total). Foque no pivô da junta do nó dos dedos (articulação MCP) em vez de pressionar o mouse para baixo, e faça alongamentos nos tendões do antebraço para prevenir lesões por esforço repetitivo (LER).',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso fazer o teste de velocidade de clique em celulares e tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O treino utiliza eventos de ponteiro multitoque que detectam toques rápidos diretamente em telas capacitivas, permitindo que jogadores mobile testem cadência de dois ou mais dedos.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Teste de CPS – Teste de Velocidade de Clique e Cliques por Segundo',
  description: 'Teste de CPS – Teste de Velocidade de Clique e Cliques por Segundo',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ajuste de pegada e postura',
      text: 'Apoie o pulso confortavelmente no mousepad e posicione o dedo indicador sobre o botão principal do mouse.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Iniciar sprint de 45 segundos',
      text: 'Clique em "Iniciar Treino" e clique no círculo o mais rápido possível após a contagem regressiva.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Combater o encolhimento do alvo',
      text: 'Cada clique expande o círculo alvo. Mantenha uma cadência rápida à medida que a taxa de encolhimento acelera.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analisar média de CPS e pico',
      text: 'Analise seus cliques por segundo (CPS), pico em rajada e resistência muscular na pontuação final.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/rapid-tapping#step-4'
    }
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: 'Como a velocidade de clique é medida e fundamentada',
    paragraphs: [
      'Um teste de CPS conta os cliques de mouse executados em um segundo. O clique contínuo com um único dedo atinge cerca de 5 a 7 cliques por segundo, ancorado na linha de base científica de 50 a 55 toques por 10 segundos para o indicador dominante de um adulto saudável (Halstead, 1947; Todor & Kyprie, 1980). Surtos acima dessa faixa funcionam como sequências motoras pré-programadas em circuito aberto (Keele, 1968).',
      'Precisão da medição e sincronização do display: a temporização utiliza o relógio performance.now() do navegador, calibrado para cerca de 1 ms. Monitores atualizam imagens a cada 16,7 ms (60 Hz), 6,9 ms (144 Hz) e 4,1 ms (240 Hz, Woods et al., 2015), enquanto o polling rate do mouse adiciona de 1 a 8 ms. Pequenas variações abaixo de 5 ms são ruídos de amostragem. Compare suas próprias sessões no mesmo mouse e monitor para medir sua evolução real. A SkillDrills armazena seus dados localmente no navegador e não coleta informações agregadas.',
    ],
  },
  benchmark: {
    title: 'Classificação de CPS & Tabela Oficial de Percentis',
    description: 'Guia editorial para interpretar seu próprio desempenho. As linhas de dedo único baseiam-se em referências da neuropsicologia motora (Halstead 1947; Todor & Kyprie 1980), enquanto as linhas de jitter e butterfly refletem dados empíricos de jogadores de alto rendimento.',
    columns: ['Nível', 'Título de Rango', 'CPS Médio', 'Pico (5s)', 'Técnica de Clique', 'Classificação'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Clicador Lendário (Apex Tapper)',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: 'Butterfly / Drag Clicking',
        percentile: 'Top 0.1% Excepcional',
      },
      {
        tier: 'Tier 2',
        rank: 'Competidor Pro (Pro Competitor)',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: 'Jitter Clicking Dominado',
        percentile: 'Top 3% Avançado',
      },
      {
        tier: 'Tier 3',
        rank: 'Jogador Competitivo (Competitive Gamer)',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: 'Dedo Único Rápido / Tensão',
        percentile: 'Top 15% Sólido',
      },
      {
        tier: 'Tier 4',
        rank: 'Jogador Regular (Proficient Casual)',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: 'Dedo Único Padrão',
        percentile: 'Top 50% Médio',
      },
      {
        tier: 'Tier 5',
        rank: 'Iniciante (Novice Tapper)',
        stat: '< 6.0 CPS',
        level: '< 7.5 CPS',
        accuracy: 'Dedo Único Básico',
        percentile: 'Base 20% Em Treinamento',
      },
    ],
  },
  protocols: {
    title: '4 Protocolos Científicos para Aumentar o CPS',
    description: 'Rotinas estruturadas para aumentar a frequência de disparo dos neurônios motores, fortalecer tendões e atrasar a fadiga do antebraço.',
    items: [
      {
        title: 'Protocolo 1: Calibração de Ritmo Motor Halstead (Pivô MCP Relaxado)',
        description: 'No clique padrão de dedo único, ancore o pulso levemente no mousepad e faça o movimento apenas na articulação do nó do dedo (junta MCP). Manter o antebraço descontraído evita tensão muscular e garante controle simultâneo da mira.',
      },
      {
        title: 'Protocolo 2: Intervalos de Sprint Todor-Kyprie (Descanso Rápido)',
        description: 'Alterne 5 segundos de cliques na velocidade máxima com 3 segundos de cliques controlados e calmos. Esse treinamento em degraus ensina o sistema nervoso a sustentar descargas de alta frequência enquanto posterga o acúmulo de ácido lático.',
      },
      {
        title: 'Protocolo 3: Micro-Vibração Isométrica (Estabilização de Jitter Clicking)',
        description: 'Provoque uma leve co-contração simultânea nos músculos flexores e extensores do antebraço, deixando o tremor vibrar pelo dedo indicador. Alivie a pressão contra o mousepad para manter o mouse deslizando com suavidade.',
      },
      {
        title: 'Protocolo 4: Articulação Dupla Alternada (Batida de Butterfly Clicking)',
        description: 'Posicione indicador e dedo médio sobre o botão esquerdo. Alterne os toques como se estivesse tamborilando em uma mesa. Ajuste o debounce do mouse para o mínimo (0–4 ms) para registrar o retorno mecânico dos switches com rapidez.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes Sobre Teste de CPS e Velocidade de Clique (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const ptCopy = {
  title: "Teste de CPS",
  desc: "O teste de CPS mede quantos cliques por segundo você consegue realizar com o botão do mouse. O clique padrão com um único dedo atinge cerca de 5 a 7 cliques por segundo (norma de tapping de Halstead, 50–55 toques/10s). Pontuações mais altas vêm de técnicas como jitter clicking e butterfly clicking.",
  score: "Pontos",
  timeLeft: "Tempo Restante",
  cpsRate: "CPS Atual",
  bestScore: "Melhor Pontuação",
  startButtonText: "Iniciar Treino",
  startSubtitle: "Treinador de Velocidade de Clique • Entrada Bruta 1:1",
  getReady: "PREPARE-SE",
  playAgain: "Treinar Novamente",
  shareTitle: "Compartilhar Pontuação",
  exitTitle: "Sair",
  avgCps: "CPS Médio",
  totalClicks: "Total de Cliques",
  maxDifficulty: "Dificuldade Máx.",
  peakCps: "Pico de CPS",
  newBest: "NOVO RECORDE",
  rulesTitle: "Instruções do Treino e Sistema de Pontuação",
  rulesItems: [
    { num: "1", text: "Toque Rápido no Alvo", highlight: "Alvo Esmeralda", result: "Cada clique expande o raio e impede a redução" },
    { num: "2", text: "Limite de Pontuação", highlight: "+1 Ponto a cada 10 Cliques", result: "Acumula a pontuação final da sessão" },
    { num: "3", text: "Encolhimento Dinâmico", highlight: "Acelera com os Pontos", result: "Leva velocidade e resistência muscular ao limite" },
    { num: "4", text: "Técnicas de Clique", highlight: "Jitter / Butterfly / Raw", result: "Maximiza a cadência mecânica pura" }
  ],
};

export default function PortugueseRapidTappingPage() {
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
      <RapidTappingClient copy={ptCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/pt/drills/motor/movement-speed/rapid-tapping" />
      </div>
      <DrillFooter />
    </>
  );
}

