import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (reaction-speed / reaction-time-test)
// PRIMARY DOMESTIC: "teste de reflexo"   — 225 exact searches/mo (Domestic #1 winner)
//                    "reaction time test" — 222 exact searches/mo (Domestic #2 query)
//                    "tempo de reação"    — 144 exact searches/mo
// SECONDARY / LSI:
//                    "teste de reação"    — 90+ searches/mo
//                    "teste de reflexos online" — Utility intent
//                    "medir reflexo"      — Action intent
//                    "teste de mira e reflexo" — FPS intent
// NATIVE TITLE:      Teste de Reflexo e Tempo de Reação – Medidor em Milissegundos (ms) | SkillDrills
// ============================================================

export const metadata = {
  title: 'Teste de Reflexo & Tempo de Reação Online | SkillDrills',
  description:
    'Teste de reflexo online grátis. Meça seu tempo de reação visual em milissegundos (ms) e compare sua média com benchmarks científicos no navegador.',
  keywords: [
    'teste de reflexo',
    'teste de reação',
    'tempo de reação',
    'teste de tempo de reação',
    'teste de reflexos online',
    'medir reflexo',
    'teste reflexo milissegundos',
    'teste de mira e reflexo',
    'velocidade de reação',
    'treino de reflexo fps',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: 'Teste de Reflexo & Tempo de Reação Online | SkillDrills',
    description:
      'Teste de reflexo online grátis. Meça sua velocidade de reação visual em milissegundos (ms) e compare com benchmarks científicos no navegador.',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Reflexo & Tempo de Reação Online | SkillDrills',
    description:
      'Meça seus reflexos e tempo de reação visual em milissegundos (ms) online grátis. Teste com precisão e confira sua classificação no navegador.',
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
    { '@type': 'ListItem', position: 4, name: 'Teste de Reflexo', item: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Reflexo e Tempo de Reação – Medidor Online Grátis',
  alternateName: ['Teste de Reflexo', 'Tempo de Reação', 'Teste de Reação Online', 'Teste de Reação FPS'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta online no navegador para medir a velocidade de reação visual em milissegundos (ms). Inclui comparativos científicos, patamares para esports e treino de cronometria mental.',
  browserRequirements: 'Navegador moderno com suporte a JavaScript (Chrome, Edge, Firefox, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Teste de Reflexo — Medidor de Tempo de Reação Visual | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test',
  description:
    'Ferramenta gratuita para testar reflexos e medir o tempo de reação visual em milissegundos.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Tempo de Reação, Reflexos Visuais, Processamento Neural, Latência Neuromuscular',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Teste de Tempo de Reação - Jogo Grátis de Reflexos',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test',
  description: 'Teste de Tempo de Reação - Jogo Grátis de Reflexos',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como fazer o Teste de Reflexo e Tempo de Reação',
  description: 'Instruções para medir seu tempo de reação visual no navegador.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Iniciar o Treino',
      text: 'Clique em «Iniciar Treino» para abrir a arena de reação em tela cheia.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Memorizar o Intervalo',
      text: 'Observe o intervalo alvo em milissegundos exibido na tela antes do início da contagem.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Clicar no Momento Exato',
      text: 'Clique com o mouse ou toque na tela o mais rápido possível no momento em que o sinal for acionado.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Verificar os Resultados',
      text: 'Analise sua média de erro em milissegundos, taxa de precisão e classificação equivalente em esports.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/reaction-time-test#step-4'
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
      name: 'Qual é um bom tempo de reação humana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O tempo médio de reação visual de um adulto saudável varia entre 200 e 250 milissegundos (ms) (Kosinski, 2008). Resultados abaixo de 200 ms são muito rápidos, e marcas inferiores a 180 ms representam a elite de jogadores profissionais de esports e pilotos de automobilismo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o tempo de reação é medido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A latência é calculada do estímulo visual até a entrada do clique usando a API performance.now() do navegador, garantindo precisão inferior a um milissegundo localmente (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'É possível melhorar os reflexos com treino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Treinos regulares de reação aumentam a eficiência das vias neurais e da preparação motora, reduzindo o tempo de resposta em 15 a 30 ms sem comprometer a precisão (Dye, Green, & Bavelier, 2009).',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o tempo de reação varia no dia a dia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fatores biológicos como horas de sono, ciclo circadiano, fadiga mental e cafeína influenciam o tempo, assim como fatores de hardware (taxa de atualização do monitor e latência do mouse).',
      },
    },
    {
      '@type': 'Question',
      name: 'A taxa de atualização do monitor (Hz) influencia no resultado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Um monitor de 60 Hz exibe um novo quadro a cada 16,67 ms, enquanto monitores de 144 Hz (6,94 ms) e 240 Hz (4,17 ms) exibem o estímulo antes, reduzindo o atraso em cerca de 10 a 12 ms (Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre reflexo e tempo de reação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um reflexo é uma resposta involuntária e espinhal (como o reflexo patelar) que ocorre em 20–50 ms sem passar pelo cérebro. O tempo de reação envolve percepção no córtex visual, avaliação e envio de comando voluntário aos músculos (150–250+ ms).',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que a reação ao som é mais rápida que à visão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Os sinais sonoros alcançam o córtex auditivo em 8–10 ms, enquanto a fototransdução na retina leva de 20 a 40 ms. Por isso, a resposta auditiva (140–160 ms) é 30 a 50 ms mais rápida que a visual (Shelton & Kumar, 2010).',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a idade afeta a velocidade de reação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O tempo de reação atinge seu pico entre os 18 e 24 anos, aumentando cerca de 2 a 6 ms por década após esse período (Der & Deary, 2006). Atividades físicas e exercícios de reflexo ajudam a preservar a velocidade.',
      },
    },
    {
      '@type': 'Question',
      name: 'A cafeína acelera o tempo de reação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Doses moderadas de cafeína bloqueiam os receptores de adenosina, elevando o estado de alerta cerebral e reduzindo temporariamente os tempos de reação em 10 a 20 ms (Smith, 2002).',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual o diferencial deste teste em relação ao Human Benchmark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enquanto o Human Benchmark testa apenas cliques simples de mudança de cor, o SkillDrills treina a cronometria mental (estimativa de tempo), previne cliques afobados e aplica multiplicadores de combo para simular a pressão competitiva real.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais jogos competitivos se beneficiam de reflexos rápidos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jogos de tiro tático (CS2, Valorant), jogos de luta, simuladores de corrida e MOBAs (League of Legends) dependem diretamente de respostas de milissegundos para vencer duelos.',
      },
    },
    {
      '@type': 'Question',
      name: 'O teste funciona em celulares e tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! A ferramenta é 100% responsiva para telas touch em smartphones e tablets, operando em modo retrato ou paisagem sem downloads.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este teste de tempo de reação é totalmente gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, todos os testes e ferramentas de treino cognitivo no SkillDrills são 100% gratuitos, sem necessidade de cadastro, sem download de aplicativos e sem anúncios intrusivos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Atletas de esportes tradicionais podem utilizar este teste?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Pilotos de automobilismo (como Fórmula 1), boxeadores, velocistas e atletas de esportes de raquete (tênis e tênis de mesa) utilizam testes de reação visual para aprimorar o recrutamento neuromuscular de fibras de contração rápida.',
      },
    },
    {
      '@type': 'Question',
      name: 'Devo focar a visão no centro ou utilizar a visão periférica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomenda-se manter o olhar relaxado ("foco suave"). Isso permite que os bastonetes da retina periférica detectem o clarão ou a mudança visual instantaneamente, enviando o estímulo ao córtex motor com menor esforço de acomodação ocular.',
      },
    },
    {
      '@type': 'Question',
      name: 'Com que frequência devo testar e treinar minha velocidade de reação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uma sessão diária de 5 a 10 minutos é ideal. Ela funciona como um ótimo termômetro do seu nível de alerta e disposição do dia, além de servir de aquecimento antes de partidas ranqueadas.',
      },
    },
  ],
};

const reactionGuide = {
  heading: 'Guia do Teste de Reflexo & Padrões Científicos',
  intro: [
    'O tempo de reação é o intervalo decorrido entre a apresentação de um estímulo sensorial e a execução da resposta motora correspondente.',
    'Nos esportes eletrônicos competitivos (Valorant, CS2, League of Legends) e no automobilismo, pequenas frações de segundo decidem duelos de mira e desvios de emergência.',
    'Metodologia de Medição: Utilizamos a API performance.now() de alta precisão do navegador para capturar medições em nível de sub-milissegundos localmente, sem interferência de ping ou conexões externas.',
    'Latência de Hardware: Monitores convencionais de 60 Hz adicionam cerca de 16,7 ms de atraso de exibição por quadro. O uso de telas de 144 Hz ou 240 Hz e mouses gamers com taxa de atualização de 1000 Hz garante a medição mais fiel da sua biologia (Woods et al., 2015).',
  ],
  benchmarks: {
    title: 'Tabela de Referência de Reflexos Visuais & Patamares Gamer',
    headers: ['Latência / Erro (ms)', 'Classificação', 'Percentil', 'Equivalência Gamer', 'Perfil Neurológico'],
    rows: [
      ['< 150 ms', 'Sobre-humano / Godlike', 'Top 1%', 'Piloto de F1 / Pro Radiant', 'Antecipação apurada e resposta sináptica no limite fisiológico humano'],
      ['150 – 190 ms', 'Elite Competitiva', 'Top 5%', 'Imortal / Faceit Level 10', 'Processamento visual de nível profissional e ativação motora instantânea'],
      ['190 – 240 ms', 'Gamer Avançado', 'Top 25%', 'Diamante / Ascendente', 'Discriminação rápida de estímulos e liberação consistente do gatilho'],
      ['240 – 280 ms', 'Média Humana Padrão', 'Mediana 50%', 'Ouro / Platina', 'Resposta visual padrão de um adulto saudável em monitor 60Hz'],
      ['> 300 ms', 'Iniciante / Casual', 'Inferior 20%', 'Prata / Bronze', 'Hesitação motora, cansaço acumulado ou atraso de periféricos'],
    ],
    note: 'Valores baseados na literatura médica de cronometria humana (Kosinski, 2008; Woods et al., 2015). Telas de 60Hz somam ~16,7ms de atraso.',
  },
  techniques: {
    title: 'Latência Sensorial & Limites Fisiológicos',
    items: [
      {
        name: 'Latência do Estímulo Visual (~200–250 ms)',
        desc: 'Os fótons atingem os fotorreceptores da retina, convertem-se em pulsos elétricos no nervo óptico, viajam ao córtex visual primário (V1) e ordenam o clique ao córtex motor (Kosinski, 2008).',
        tips: 'Mantenha um foco visual suave em vez de tensionar os olhos para permitir que os bastonetes periféricos detectem o flash mais depressa.',
      },
      {
        name: 'Vantagem do Estímulo Auditivo (~140–170 ms)',
        desc: 'Os sinais de áudio atingem o tronco encefálico e córtex auditivo mais rapidamente, resultando em respostas 30 a 50 ms mais rápidas que a visão (Shelton & Kumar, 2010; Jain et al., 2015).',
        tips: 'Em jogos FPS, reagir ao som de passos garante uma vantagem substancial em relação a esperar o contato visual.',
      },
      {
        name: 'Processamento Tátil (~130–160 ms)',
        desc: 'Estímulos físicos e táteis contornam rotas visuais complexas e acionam arcos reflexos motores velozes.',
        tips: 'Switches mecânicos de mouse com resposta tátil nítida otimizam o momento do clique.',
      },
      {
        name: 'Otimização de Hardware e Display',
        desc: 'Um monitor de 60 Hz acrescenta 16,7 ms de espera por quadro contra apenas 4,1 ms em 240 Hz (Woods et al., 2015).',
        tips: 'Use taxa de 1000 Hz no mouse gamer e desative o V-Sync para obter a menor latência de entrada.',
      },
    ],
  },
  steps: [
    'Clique em «Iniciar Treino» para acessar a área de medição em tela cheia.',
    'Memorize o intervalo alvo exibido antes do início da contagem.',
    'Clique ou toque na tela imediatamente ao detectar o disparo do alvo.',
    'Complete várias tentativas para registrar sua média, estabilidade e patente.',
  ],
  audience: 'Jogadores de FPS/MOBA, pilotos de automobilismo e simuladores, atletas e qualquer pessoa que deseje avaliar e aprimorar a velocidade de reação e reflexos.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: '/pt/drills/reaction-speed', label: 'Hub de Velocidade de Reação' },
    { href: '/pt/drills/motor/movement-speed/rapid-tapping', label: 'Teste de CPS e Cliques por Segundo' },
    { href: '/pt/drills/reaction-speed/fps-tracking-trainer', label: 'Treinador de Rastreamento FPS' },
    { href: '/pt/drills/fps/flick-shot-training', label: 'Treino de Flick Shot' },
  ],
};

export default function PortugueseReactionTimeTestPage() {
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
      <ReactionTimeTestWrapper copy={{ title: 'Teste de Reflexo' }} />
      <DrillGuide guide={reactionGuide} />
      <DrillFooter />
    </>
  );
}
