import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment (Portuguese: Percepção de Profundidade)
// PRIMARY:  "teste de percepção de profundidade" — Core query
//           "teste de estereopsia online"        — Clinical search
// SECONDARY / LSI:
//           "noção de distância teste"           — Practical driving test
//           "julgamento de distância visual"     — Visual judgment
//           "percepção espacial dos olhos"       — Spatial vision
//           "expansão óptica visual"             — Optical looming
//           "teste de howard-dolman"             — Classical test
// ============================================================

export const metadata = {
  title: 'Teste de Percepção de Profundidade – Noção de Distância',
  description: 'Teste de percepção de profundidade online grátis. Avalie seu julgamento de distância e interceptação visual por expansão óptica e tempo até o contato (TTC).',
  keywords: [
    'teste de percepção de profundidade',
    'teste de estereopsia online',
    'noção de distância teste',
    'julgamento de distância visual',
    'percepção espacial dos olhos',
    'teste de visão 3d online',
    'treino de tempo de colisão ttc',
    'expansão óptica visual',
    'teste de howard-dolman',
    'noção de profundidade motorista',
    'coordenação visomotora espacial',
    'exercício de foco de distância',
  ],
  openGraph: {
    title: 'Teste de Percepção de Profundidade – Noção de Distância | SkillDrills',
    description: 'Teste de percepção de profundidade online grátis. Avalie seu julgamento de distância e interceptação visual por expansão óptica e tempo até o contato (TTC).',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Percepção de Profundidade – Noção de Distância | SkillDrills',
    description: 'Teste de percepção de profundidade online grátis. Avalie seu julgamento de distância e interceptação visual por expansão óptica e tempo até o contato (TTC).',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment',
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinamento Visual', item: 'https://skilldrills.online/pt/drills/visual' },
    { '@type': 'ListItem', position: 3, name: 'Percepção de Profundidade', item: 'https://skilldrills.online/pt/drills/visual/depth-perception' },
    { '@type': 'ListItem', position: 4, name: 'Julgamento de Distância', item: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Percepção de Profundidade e Noção de Distância',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Teste visual interativo que afere o julgamento de distância e o cálculo de tempo até a colisão por expansão óptica.',
  url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/pt' },
  dateModified: '2026-09-05',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simulador de Julgamento de Distância 3D',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Navegador moderno com suporte a HTML5 Canvas e Pointer Events',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Treino de Interceptação Visual em Profundidade',
  url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment',
  description: 'Exercício de timing visomotor que calcula a precisão temporal na interceptação de alvos tridimensionais.',
  genre: ['Precision Game', 'Visual Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar a percepção de profundidade e o cálculo de distâncias',
  description: 'Passo a passo para sincronizar a expansão óptica da imagem com o momento de interceptação.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Fixar o anel de referência no túnel',
      text: 'Mantenha o foco visual no anel de profundidade estacionário no centro do túnel.',
      url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Acompanhar a expansão do alvo',
      text: 'Observe a esfera enquanto ela se aproxima e sua imagem cresce na retina.',
      url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Clicar na coincidência exata',
      text: 'Pressione a barra de espaço ou clique exatamente quando a esfera preencher o anel alvo.',
      url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Conferir o erro percentual de profundidade',
      text: 'Examine o desvio percentual obtido e refine a antecipação para as velocidades maiores.',
      url: 'https://skilldrills.online/pt/drills/visual/depth-perception/distance-judgment#step-4'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é o teste de percepção de profundidade e o que ele avalia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O teste avalia a capacidade do cérebro de interpretar distâncias tridimensionais e estimar o tempo restante até o impacto (Time-to-Contact) a partir da taxa de crescimento da imagem na retina (expansão óptica).',
      },
    },
    {
      '@type': 'Question',
      name: 'Como ele se compara ao teste de varetas de Howard-Dolman?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O teste de Howard-Dolman (1919) usa varetas físicas para medir a estereopsia binocular pura. Como monitores planos não produzem disparidade binocular real, este teste avalia o componente dinâmico da expansão óptica (Lee, 1976), crucial na condução e nos esportes.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é a variável Tau e o tempo até o contato (TTC)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'David Lee (1976) demonstrou que o sistema visual calcula o tempo até a colisão dividindo o tamanho aparente do objeto por sua taxa de expansão, dispensando o conhecimento prévio de seu tamanho real.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que a noção de distância é exigida em exames de habilitação e trânsito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Condutores de ônibus, caminhões e veículos pesados dependem da noção de espaço para calcular ultrapassagens e freadas com segurança, evitando colisões traseiras.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pessoas com boa acuidade visual podem falhar no teste de profundidade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. É comum ter visão 20/20 e ainda assim apresentar falhas no cálculo de profundidade por anisometropia (diferença de grau entre os olhos), astigmatismo ou fadiga visual decorrente de telas.',
      },
    },
    {
      '@type': 'Question',
      name: 'A noção de distância pode ser aprimorada com treino?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Embora limitações anatômicas graves requeiram auxílio médico, a agilidade do córtex visual em computar taxas de expansão óptica melhora expressivamente com treinos repetidos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como é calculada a margem de erro na pontuação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Calcula-se o erro percentual relativo entre o diâmetro da esfera no momento do clique e o diâmetro exato do anel alvo. Erros abaixo de 5% garantem pontuação máxima.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é a importância da percepção de profundidade em esportes como tênis e futebol?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Atletas dispõem de frações de segundo para calcular o ponto de queda e a velocidade de aproximação da bola antes de desferir o golpe ou passe.',
      },
    },
    {
      '@type': 'Question',
      name: 'A taxa de atualização do monitor afeta a precisão?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monitores de 144 Hz ou 240 Hz renovam as imagens a cada 4 a 7 ms, permitindo identificar com muito mais nitidez o instante exato em que as bordas coincidem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Os resultados são salvos de forma privada?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Todas as pontuações e históricos ficam armazenados exclusivamente no seu navegador (LocalStorage), sem envio de dados a servidores remotos.',
      },
    },
  ],
};

const distanceGuidePt = {
  heading: 'Padrões de Percepção de Profundidade e Noção Espacial',
  intro: [
    'A percepção de profundidade (visão estereoscópica e cálculo espacial) é a faculdade visual e neurológica que capacita o organismo a interpretar o ambiente em três dimensões e julgar com exatidão milimétrica a distância, o volume e a trajetória de alvos dinâmicos. Em esportes de alta velocidade (tênis, beisebol, automobilismo), na aviação, em exames psicotécnicos de direção (CNH profissional) e nos eSports táticos, estimar distâncias em frações de segundo define a linha divisória entre uma interceptação perfeita e uma colisão catastrófica.',
    'Este exercício recria digitalmente os fundamentos geométricos do clássico aparelho estereoscópico de Howard-Dolman (Howard, 1919) e as pesquisas seminais de óptica ecológica formuladas por David N. Lee (1976) e David Regan & Kenneth I. Beverley (1978). Projetando uma esfera 3D ao longo de um túnel virtual em direção a um plano de referência estático, o treino condiciona o córtex visual a processar a taxa de expansão retiniana (looming) e calcular o tempo até o contato (Time-to-Contact, τ) sob velocidades de aproximação crescentes.',
    'Metrologia & Precisão de Amostragem: Todos os desvios de interceptação são capturados localmente por meio da API de hardware performance.now() em resolução sub-milissegundo. O erro é computado como o desvio percentual relativo (|Diâmetro Real - Diámetro Alvo| / Diâmetro Alvo). Fatores de latência de exibição (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz, ~4,1 ms a 240 Hz) e taxas de polling do mouse (125 Hz vs 1000 Hz) introduzem dispersões físicas padrão (Woods et al., 2015). Variações abaixo de 5 ms constituem ruído instrumental normal; realize comparações no mesmo hardware.',
    'Transparência e Privacidade de Dados: O SkillDrills não coleta informações pessoais, relatórios diagnósticos de visão nem telemetria centralizada em servidores remotos. Todas as pontuações alcançadas, níveis superados e taxas de precisão permanecem gravadas estritamente no armazenamento local (LocalStorage) do seu navegador.'
  ],
  benchmarks: {
    title: 'Tabela de Desempenho em Julgamento de Profundidade',
    headers: ['Faixa de Desempenho', 'Erro Médio de Profundidade', 'Pontos e Nível', 'Perfil Visual'],
    rows: [
      ['Tier 1: Mestre Estereoscópico Apex', 'Abaixo de 5,0% de erro', '1500+ pts | Nível 7+', 'Sensibilidade excepcional a expansão óptica; timing perfeito.'],
      ['Tier 2: Alta Acuidade de Profundidade', '5,0% – 9,9% de erro', '1100 – 1499 pts | Nível 5–6', 'Forte antecipação espacial; boa adaptação a altas velocidades.'],
      ['Tier 3: Noção de Distância Padrão', '10,0% – 15,9% de erro', '750 – 1099 pts | Nível 3–4', 'Média saudável; pequenos atrasos sob velocidades extremas.'],
      ['Tier 4: Sensibilidade Moderada', '16,0% – 25,0% de erro', '450 – 749 pts | Nivel 2', 'Tendência a disparar precocemente antes do encaixe plano.'],
      ['Tier 5: Em Desenvolvimento', 'Acima de 25,0% de erro', 'Abaixo de 450 pts | Nível 1', 'Erro temporal expressivo; necessidade de treino regular.'],
    ],
  },
  protocols: {
    title: 'Protocolos para Aperfeiçoar a Noção de Distância',
    items: [
      {
        title: 'Protocolo 1: Foco na Taxa de Expansão Óptica (Lee 1976)',
        description: 'Observe a aceleração das bordas externas da esfera em relação ao anel em vez de focar apenas no centro.',
      },
      {
        title: 'Protocolo 2: Supressão do Gatilho Precoce',
        description: 'Evite a ansiedade de clicar antes da hora quando a velocidade subir; aguarde o encaixe geométrico total.',
      },
      {
        title: 'Protocolo 3: Fixação Visual no Plano Alvo',
        description: 'Mantenha a visão ancorada no anel alvo e deixe a esfera entrar no campo focal.',
      },
      {
        title: 'Protocolo 4: Controle de Respiração e Relaxamento Ocular',
        description: 'Pisque entre as tentativas para lubrificar os olhos e evitar distorções no foco.',
      },
    ],
  },
  steps: [
    'Clique em "Iniciar Teste" para dar início à sessão de 45 segundos de cálculo de profundidade.',
    'Mantenha o olhar fixado estavelmente sobre o anel ciano de referência localizado no plano médio.',
    'Acompanhe a aproximação da esfera 3D que surge no fundo do túnel e acelera em sua direção.',
    'Clique com o mouse, toque na tela ou aperte a barra de espaço no milissegundo exato em que a esfera preencher a circunferência do anel alvo.',
    'Analise o feedback de precisão (<5% de erro: Perfeito / +150 PTS) e adapte seu reflexo às velocidades crescentes ao longo de 45 segundos.'
  ],
  audience: 'Motoristas e candidatos a habilitação profissional (CNH C, D, E e exames de frotistas), operadores de máquinas e empilhadeiras, atletas de esportes com bola e raquete (tênis, vôlei, beisebol), pilotos e jogadores de eSports que buscam calibrar noção espacial e timing de interceptação.',
  faqs: {
    title: 'Perguntas Frequentes sobre Percepção de Profundidade e Distância',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
  sources: pickSources('howard1919', 'lee1976', 'regan1978', 'julesz1971', 'woods2015'),
  related: [
    { href: "/drills/visual/tracking-accuracy/moving-target", label: "Interceptação de Alvo Móvel" },
    { href: "/drills/visual/reaction-speed/light-reaction", label: "Teste de Reação à Luz" },
    { href: "/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/drills/visual/tracking-accuracy/pursuit-tracker", label: "Rastreador de Perseguição Ocular" },
    { href: "/drills/visual/reaction-speed/go/no-go", label: "Controle de Impulso Go / No-Go" },
    { href: "/drills/visual/visual-recognition/entropic-grid", label: "Varredura em Grade Entrópica" }
  ]
};

const copyPt = {
  title: 'Teste de Percepção de Profundidade',
  subtitle: 'Julgamento de Distância e Laboratório de Interceptação 3D',
  caption: 'A percepção de profundidade permite estimar distâncias e posições espaciais. Em telas planas, a taxa de expansão óptica (Lee, 1976; Regan & Beverley, 1978) mede com exatidão o tempo até o contato (TTC) sem depender do conhecimento prévio do tamanho real do objeto.',
  statScore: 'Pontos',
  statTime: 'Tempo',
  statLevel: 'Nível',
  statBestScore: 'Recorde',
  startTitle: 'Julgamento de Distância Pro',
  startSubtitle: 'Noção de Distância 3D • Interceptação Visual',
  startBtn: 'Iniciar Teste',
  getReady: 'PREPARE-SE',
  newBest: 'NOVO RECORDE',
  statPoints: 'Pontos',
  statAccuracy: 'Precisão',
  statPeakLevel: 'Nível Máximo',
  statIntercepts: 'Volltreffer',
  playAgain: 'Jogar Novamente',
  shareScore: 'Compartilhar Pontuação',
  returnOptions: 'Voltar',
  rulesTitle: 'Regras e Critérios de Pontuação',
  rule1Text: 'Interceptação Perfeita',
  rule1Highlight: '+150 PTS',
  rule1Result: 'Erro abaixo de 5%',
  rule2Text: 'Interceptação Próxima',
  rule2Highlight: '+100 PTS',
  rule2Result: 'Erro abaixo de 12%',
  rule3Text: 'Velocidade Progressiva',
  rule3Highlight: 'Mais Rápido',
  rule3Result: 'Alvo se aproxima mais depressa',
  rule4Text: 'Erro / Tempo Esgotado',
  rule4Highlight: 'Sem Penalidade',
  rule4Result: 'Novo alvo surge sem perda de pontos',
  aboutTitle: 'Sobre o Teste de Percepção de Profundidade',
  overviewTitle: 'O que este teste avalia?',
  overviewLead: 'Mede a precisão com que o cérebro processa o deslocamento tridimensional e estima distâncias.',
  overviewBody: 'Ao calcular o momento de contato por expansão de bordas, o teste refina o sincronismo olho-mão essencial para condutores, pilotos e atletas.',
  aboutCards: [
    { iconBg: 'bg-blue-600', title: 'Público Indicado', text: 'Motoristas, pilotos, praticantes de esportes de raquete e bola, gamers e quem busca aprimorar a visão espacial.' },
    { iconBg: 'bg-cyan-600', title: 'Habilidades Treinadas', text: 'Expansão óptica, cálculo de Time-to-Contact, antecipação visomotora e acuidade espacial.' },
    { iconBg: 'bg-purple-600', title: 'Dica de Mestre', text: 'Fixe os olhos na borda do anel e dispare apenas quando o contorno da esfera coincidir por completo.' }
  ]
};

export default function PortugueseDistanceJudgmentPage() {
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
      <DistanceJudgmentClient copy={copyPt} />
      <DrillGuide guide={distanceGuidePt} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="pt" />
    </>
  );
}
