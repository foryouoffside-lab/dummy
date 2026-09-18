import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "teste de rastreamento visual" / "teste de reflexo visual"
// SECONDARY / LSI:
//   "acuidade visual dinamica" / "perseguição ocular suave"
//   "tempo de reacao visual" / "coordenacao olho mao"
// ============================================================

export const metadata = {
  title: 'Teste de Rastreamento Visual – Acuidade | SkillDrills',
  description:
    'Teste de rastreamento visual online grátis. Acompanhe alvos em movimento com os olhos e meça sua acuidade visual dinâmica e tempo de reação no navegador.',
  keywords: [
    'teste de rastreamento visual',
    'teste de reflexo visual',
    'acuidade visual dinamica',
    'perseguição ocular suave',
    'tempo de reacao visual',
    'coordenacao olho mao',
    'movimento sacadico',
    'agilidade visual',
    'teste de visao reflexo',
    'treinar reflexos visuais',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: 'Teste de Rastreamento Visual – Reflexo & Acuidade | SkillDrills',
    description:
      'Teste de rastreamento visual e reflexo online grátis. Meça sua velocidade de perseguição ocular e tempo de reação.',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Rastreamento Visual – Reflexo & Acuidade | SkillDrills',
    description:
      'Teste gratuito de rastreamento visual e acuidade dinâmica no navegador.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Hub de Exercícios', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Teste de Rastreamento Visual', item: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Rastreamento Visual – Reflexo & Acuidade Dinâmica',
  alternateName: ['Teste de Rastreamento Ocular', 'Teste de Reflexo Visual', 'Simulador de Acuidade Dinâmica'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta científica online para mensuração da perseguição ocular contínua, sacadas corretivas e tempo de reação visual a alvos em movimento.',
  browserRequirements: 'Navegador moderno com suporte a JavaScript (Chrome, Edge, Safari, Firefox)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Teste de Rastreamento Visual — Reflexo & Acuidade | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test',
  description:
    'Teste de reflexo visual gratuito para treinar perseguição ocular, acuidade dinâmica e movimentos sacádicos diretamente no navegador.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Rastreamento visual, Perseguição ocular suave, Sacadas corretivas, Acuidade dinâmica, Coordenação olho-mão',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Teste de Rastreamento Visual - Treino de Olhos e Reflexos',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test',
  description: 'Jogo interativo para medir e treinar a velocidade de rastreamento visual e reflexos motores.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar o rastreamento visual e reflexos oculares',
  description: 'Instruções para melhorar a capacidade de seguir alvos dinâmicos e acelerar sacadas corretivas.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar o teste',
      text: 'Clique em «Iniciar Exercício» para ativar a arena de rastreamento em tela cheia.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Fixar o olhar no alvo',
      text: 'Fixe a fóvea ocular sobre a esfera móvel enquanto ela se desloca pela tela.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Interceptar mudanças bruscas',
      text: 'Quando o alvo mudar de trajetória ou acelerar, execute uma sacada corretiva imediata e posicione o cursor.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analisar latência e estabilidade',
      text: 'Consulte o tempo médio de reaquisição e sua pontuação de precisão ocular.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/visual-tracking-speed-test#step-4',
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
      name: 'O que mede este teste de rastreamento visual?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ele avalia a suavidade e a precisão com que os olhos acompanham objetos dinâmicos pelo espaço (perseguição ocular suave) e a rapidez com que realizam sacadas corretivas quando o alvo sofre acelerações ou desvios bruscos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre perseguição suave (Smooth Pursuit) e movimentos sacádicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A perseguição suave é um movimento ocular contínuo e voluntário que mantém um alvo móvel centralizado na fóvea (até cerca de 30°–60°/s; Krauzlis, 2004). Já as sacadas são saltos balísticos de altíssima velocidade (200°–700°/s) que redirecionam o olhar quando o alvo acelera repentinamente (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'Um exame de vista comum (tabela de Snellen) consegue detectar problemas de rastreamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. O exame oftalmológico tradicional mede a acuidade visual estática para letras paradas. Ele não avalia o controle oculomotor dinâmico, o ganho de velocidade de perseguição nem a reaquisição cinemática de alvos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que causa lentidão no rastreamento visual e reflexos oculares?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fadiga muscular ocular por longas horas diante de telas, noites mal dormidas, olho seco ou sobrecarga do sistema nervoso central atrasam significativamente as sacadas corretivas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o rastreamento visual afeta o desempenho em esportes e jogos FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em jogos competitivos (Valorant, CS2, Apex) e esportes como tênis e automobilismo, a velocidade de rastreamento determina quão rápido você processa desvios e alinha a mira com o adversário em movimento (Land & McLeod, 2000).',
      },
    },
    {
      '@type': 'Question',
      name: 'É possível melhorar a velocidade de rastreamento visual com treino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A estimulação diária fortalece os circuitos corticais entre a área visual MT/V5, os campos oculares frontais (FEF) e o cerebelo, encurtando o tempo de reação e aprimorando a precisão da interceptação.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é uma sacada de recuperação (Catch-up Saccade)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quando o alvo acelera além da capacidade máxima do sistema de perseguição suave, a imagem escapa da fóvea. O cérebro dispara uma sacada corretiva rápida para compensar o desvio e recentralizar o objeto (Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: 'A taxa de atualização do monitor (Hz) influencia no resultado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Telas de 60 Hz atualizam a cada 16,7 ms, enquanto 144 Hz leva 6,9 ms e 240 Hz apenas 4,1 ms (Woods et al., 2015). Frequências maiores eliminam rastros e facilitam o acompanhamento nítido da trajetória.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual o tempo diário de treino recomendado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessões curtas e concentradas de 3 a 5 minutos, uma ou duas vezes ao dia, promovem adaptações neuromusculares ideais sem fatigar os músculos ciliares dos olhos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este teste de rastreamento visual é gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O teste da SkillDrills é 100% gratuito, funciona direto no navegador sem downloads e registra todos os eventos com a API High Resolution Time (performance.now()).',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: 'Guia do Teste de Rastreamento Visual: Perseguição Ocular e Reaquisição de Alvos',
  intro: [
    'A velocidade de rastreamento visual é a taxa na qual o sistema oculomotor e motor acompanha movimentos dinâmicos, detecta anomalias de trajetória e realinha o foco foveal (Krauzlis, 2004; Land & McLeod, 2000).',
    'Nosso teste mede sua capacidade de reação contra mudanças inesperadas de percurso e velocidade. Enquanto o alvo se move suavemente, os olhos realizam perseguição contínua (Smooth Pursuit). No instante em que o alvo sofre um desvio brusco, essa perseguição colapsa e o sistema nervoso central dispara uma sacada corretiva (Rashbass, 1961). O software registra o intervalo de reaquisição usando o relógio de alta precisão performance.now().',
    'Precisão das medições e fatores de hardware: todos os cálculos ocorrem localmente no seu dispositivo. Os temporizadores de navegadores são quantizados em cerca de 1 ms por segurança contra exploits de canal lateral, e o monitor adiciona quantização de taxa de quadros (~16,7 ms em 60 Hz, ~6,9 ms em 144 Hz e ~4,1 ms em 240 Hz; Woods et al., 2015). A taxa de polling do mouse adiciona ~8 ms a 125 Hz contra ~1 ms a 1000 Hz. Diferenças menores que 5 ms devem ser tratadas como ruído de medição.',
    'Portanto, compare suas tentativas sempre no mesmo equipamento para acompanhar sua evolução neuromuscular real ao longo das semanas.',
  ],
  benchmarks: {
    title: 'Tabela de Desempenho em Rastreamento Visual e Reaquisição',
    headers: ['Latência de Reaquisição', 'Classificação Oculomotora', 'Mecânica de Perseguição e Sacadas', 'Contexto Funcional', 'Foco Recomendado'],
    rows: [
      ['< 180 ms', 'Reaquisição Preditiva Ultra-Rápida', 'Realinhamento foveal quase instantâneo; projeção de trajetória apurada', 'Pilotos profissionais / Caças / Pro players (Land & McLeod, 2000)', 'Manter relaxamento da musculatura ocular em séries longas'],
      ['180 – 230 ms', 'Perseguição Dinâmica de Alta Velocidade', 'Atraso mínimo de sacada e sincronização rápida de velocidade', 'Esportes de bola competitivos / Alto rendimento em jogos (Krauzlis, 2004)', 'Aprimorar visão periférica para evitar ultrapassar o alvo'],
      ['231 – 290 ms', 'Rastreamento Padrão Normal', 'Latência fisiológica esperada para reaquisição visual', 'Padrão saudável de referência para adultos', 'Condicionar músculos retos extraoculares para mudanças rápidas'],
      ['291 – 360 ms', 'Atrasado / Fadiga Visual', 'Atraso perceptível para engajar a sacada; cursor fica para trás', 'Uso prolongado de telas, olhos secos ou baixo contraste', 'Aplicar intervalo 20-20-20; verificar taxa de atualização do monitor'],
      ['> 360 ms', 'Perseguição Dismétrica / Em Desenvolvimento', 'Múltiplas micro-sacadas corretivas necessárias para recentralizar', 'Musculatura ocular não condicionada ou distrações visuais', 'Priorizar trajetórias suaves antes de tentar aumentar a velocidade'],
    ],
    note: 'Classificação baseada em literatura de oculomotricidade e perseguição suave (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000) adaptada para telas e navegadores (Woods et al., 2015).',
  },
  techniques: {
    title: 'Técnicas para Maximizar o Rastreamento Visual',
    items: [
      {
        name: 'Perseguição Suave vs. Sacadas Corretivas',
        desc: 'Quando o alvo se desloca em velocidade moderada, mantenha o olhar suave. Use sacadas rápidas apenas quando ocorrer um ricochete ou desvio repentino.',
        tips: 'Evite tentar adivinhar e pular o olhar antes da curva acontecer.',
      },
      {
        name: 'Olhar Antecipatório (Anticipatory Gaze)',
        desc: 'Em vez de fixar na borda traseira do alvo, posicione sua janela de foco ligeiramente à frente do vetor de movimento.',
        tips: 'Espere o vetor de rebote real antes de ajustar o cursor.',
      },
      {
        name: 'Relaxamento de Punho e Antebraço',
        desc: 'Segurar o mouse com tensão excessiva prejudica a musculatura fina dos dedos, dificultando micro-ajustes rápidos.',
        tips: 'Respire fundo e solte os pulsos entre as repetições do teste.',
      },
      {
        name: 'Otimização da Acuidade Dinâmica (DVA)',
        desc: 'A capacidade de resolver detalhes em alvos móveis depende de boa iluminação e contraste adequado da tela.',
        tips: 'Configure o monitor para a taxa máxima de hertz para reduzir borrões de movimento.',
      },
    ],
  },
  steps: [
    'Sente-se a uma distância confortável da tela (cerca de um braço de distância).',
    'Clique em «Iniciar Exercício» e fixe o olhar na esfera em movimento.',
    'Acompanhe o alvo suavemente ao longo de sua trajetória inicial.',
    'No momento em que o alvo desviar repentinamente, reaja rápido e centralize o cursor.',
    'Veja sua média de latência de reaquisição e índice de estabilidade no final.',
  ],
  audience: 'Atletas de esportes dinâmicos, jogadores de FPS (Valorant, CS2, Apex), pilotos e qualquer pessoa buscando treinar reflexos e coordenação olho-mão.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/pt/drills/reaction-speed', label: 'Hub Velocidade de Reação' },
    { href: '/pt/drills/reaction-speed/reaction-time-test', label: 'Teste de Tempo de Reação' },
    { href: '/pt/drills/reaction-speed/reflex-training-drill', label: 'Teste de Reflexo (Multi-Alvos)' },
    { href: '/pt/drills/reaction-speed/reaction-game', label: 'Jogo de Reflexo Online' },
  ],
};

export default function PortugueseVisualTrackingSpeedTestPage() {
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
      <VisualTrackingSpeedTestWrapper copy={{ title: 'Teste de Rastreamento Visual' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
