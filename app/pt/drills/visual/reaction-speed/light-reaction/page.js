import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Reação à Luz: Reflexo Visual Online | SkillDrills",
  description: "Teste de reação à luz online grátis. Meça seu tempo de reação visual simples em milissegundos contra a média de 200-250 ms. Sem cadastro.",
  keywords: [
    "teste de reação à luz",
    "teste de tempo de reação visual",
    "teste de reflexo visual online",
    "tempo de reação simples srt",
    "latência ótico-motora milissegundos",
    "teste do flash de luz reflexo",
    "treino de reflexos para jogos",
    "lei de pieron luminância reação",
    "cronometria mental velocidade visual",
    "fototransdução retiniana tempo de resposta",
    "teste de reflexo rápido grátis",
    "velocidade de reação simples"
  ],
  openGraph: {
    title: "Teste de Reação à Luz: Reflexo Visual Online | SkillDrills",
    description: "Meça seu tempo de reação visual simples e latência neuromuscular a flashes em milissegundos gratuitamente.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Reação à Luz: Reflexo Visual Online | SkillDrills",
    description: "Teste de reflexo óptico de alta precisão em milissegundos para atletas e gamers.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo de Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Treino Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Velocidade de Reação", "item": "https://skilldrills.online/pt/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Teste de Reação à Luz", "item": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Reação à Luz (Tempo de Reação Simples)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Teste neurocognitivo de alta precisão para aferir o tempo de reação visual simples (SRT) e a velocidade de transdução óptico-motora.",
  "featureList": [
    "Cronometria milissegundo a milissegundo via API performance.now()",
    "Intervalos aleatórios entre 300 ms e 2.500 ms para eliminar antecipação",
    "Heurística anti-spam para impedir cliques preditivos sem estímulo real",
    "Armazenamento puramente local no navegador sem telemetria externa"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Reação à Luz — Reflexo Visual | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "Teste online gratuito de reflexo visual. Clique o mais rápido possível quando o alvo piscar em branco intenso.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web moderno compatível com HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Tempo de Reação Visual Simples, Latência Óptico-Motora, Velocidade de Reflexo, Lei de Piéron, Foco Foveal"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill de Reflexo de Reação à Luz",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction",
  "description": "Jogo de reflexos rápidos para treinar a latência neuromotora a clarões luminosos.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Reação à Luz",
  "dateModified": "2026-09-05",
  "description": "Guia de 4 passos para testar e aprimorar o tempo de reação visual simples e a velocidade do reflexo óptico.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixe o Olhar no Círculo Central",
      "text": "Mantenha os olhos focados no alvo escuro central na tela, relaxando a musculatura da mão.",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Aguarde o Clarão Branco Imprevisível",
      "text": "Espere pacientemente pelos intervalos aleatórios de 300 ms a 2.500 ms sem antecipar o clique.",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Clique Imediatamente no Primeiro Fóton",
      "text": "Pressione o mouse ou a barra de espaço no instante exato em que o alvo piscar em branco puro (+150 PTS × Multiplicador).",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Evite Cliques Especulativos",
      "text": "Clicar antes da luz ativa uma pausa anti-spam de 1,2 segundo, garantindo que o tempo registrado seja reflexo real.",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o teste de reflexo de reação à luz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste de reação à luz é um protocolo de alta precisão para aferir o tempo de reação visual simples (SRT). Ele calcula o tempo exato decorrido em milissegundos desde o momento em que um estímulo luminoso pisca na tela até o início da resposta motora do usuário."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a média de tempo de reação visual simples em milissegundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em adultos jovens saudáveis, o tempo médio de reação visual simples situa-se entre 200 ms e 250 ms. Atletas de reflexo, velocistas olímpicos e jogadores profissionais de esportes eletrônicos costumam registrar marcas de 160 ms a 190 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Quais estágios fisiológicos ocorrem entre ver a luz e clicar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O processo abrange 4 fases fisiológicas: (1) fototransdução retiniana (~20–40 ms), (2) transmissão aferente pelo nervo óptico até o córtex visual primário V1 (~30–50 ms), (3) processamento cortical de decisão motora no córtex parietal e motor (~50–80 ms), e (4) condução eferente pela via corticoespinhal até os músculos flexores dos dedos (~30–50 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a Lei de Piéron e como a luminosidade afeta o tempo de reação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Lei de Piéron (1952) é um princípio psicofísico que determina que o tempo de reação diminui de forma hiperbólica conforme a luminância do estímulo aumenta sobre o contraste de fundo. Um clarão branco sobre fundo escuro gera o menor atraso fisiológico sensorial."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a reação auditiva é mais rápida do que a reação visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A reação a estímulos sonoros é 30 a 50 ms mais veloz do que a visual (140–160 ms vs 200–250 ms). A transdução mecânica nas células ciliadas da cóclea leva de 1 a 3 ms, enquanto a transdução fotoquímica na retina requer de 20 a 40 ms."
      }
    },
    {
      "@type": "Question",
      "name": "O tempo de reação visual simples pode ser aprimorado com treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Exercícios de neuroplasticidade elevam a excitabilidade das vias corticoespinhais e refinam a atenção espacial encoberta (Posner, 1980). Praticantes frequentes apresentam tempos de reação visual comprovadamente menores sem perda de precisão (Dye et al., 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "Como a taxa de atualização do monitor afeta a pontuação de reflexos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores comuns de 60 Hz adicionam até 16,7 ms de atraso de quadro antes do clarão ser exibido. Monitores de 144 Hz e 240 Hz baixam esse atraso para 6,9 ms e 4,1 ms. Um mouse com taxa de 1.000 Hz reduz ainda mais a oscilação para ~1 ms."
      }
    },
    {
      "@type": "Question",
      "name": "O que dispara o aviso de cliques repetidos (anti-spam) neste teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicar antes do flash branco ou realizar múltiplos cliques por segundo aciona o bloqueio de 1,2 segundo. Isso elimina suposições aleatórias e assegura que os resultados representem reflexos biológicos verdadeiros."
      }
    },
    {
      "@type": "Question",
      "name": "Como o sono, a cafeína e a fadiga afetam a latência em milissegundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A privação de sono e a fadiga mental podem piorar o tempo de reação em 30 ms a 80 ms. O consumo moderado de cafeína (100–200 mg) antagoniza os receptores de adenosina, encurtando o tempo de reação temporariamente em 10 a 20 ms."
      }
    },
    {
      "@type": "Question",
      "name": "O teste de reação à luz é gratuito e meus dados são privados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O teste de reação à luz do SkillDrills é 100% gratuito, sem anúncios invasivos ou necessidade de cadastro. Todos os dados permanecem estritamente no armazenamento local do seu navegador."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "Cronometria dos Reflexos Visuais e Padrões de Tempo de Reação Simples",
  intro: [
    "O tempo de reação simples (SRT) representa a latência psicomotora elementar entre a apresentação repentina de um único estímulo visual e a execução de uma liberação motora reflexa. Em provas de corrida, esportes de luta, automobilismo e e-sports de tiro tático, frações de milissegundo determinam esquivas defensivas, largadas e contragolpes.",
    "A cascata neuromuscular subjacente envolve quatro estágios fisiológicos sequenciais: (1) fototransdução retiniana (~20–40 ms pela isomerização da rodopsina), (2) condução aferente ao longo do trato óptico via núcleo geniculado lateral até o córtex visual primário V1 (~30–50 ms), (3) preparação perceptiva e motora no córtex parietal e motor suplementar (~50–80 ms), e (4) condução eferente pela via corticoespinhal para contrair a musculatura flexora dos dedos (~30–50 ms), consolidando a faixa média humana saudável de 200–250 ms (Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010).",
    "Segundo a Lei de Piéron (1952; Pins & Bonnet, 1996), a latência de reação decresce de forma hiperbólica com o contraste e a luminância do estímulo sobre o fundo. Este drill utiliza um clarão branco de altíssimo contraste contra um fundo escuro absorvente, produzindo máxima despolarização nas células ganglionares da retina. Pesquisas de atenção encoberta (Posner, 1980) e jogos de ação (Dye et al., 2009) comprovam que o foco intencional comprime a fase de planejamento cortical.",
    "Metodologia e Precisão Temporal: As exibições de luz e os cliques do usuário são capturados pela API de alta resolução performance.now(). Latências de quantização de tela e varredura USB (Woods et al., 2015) são calibradas para oferecer leitura confiável com retenção exclusivamente local."
  ],
  benchmarks: {
    title: "Faixas de Latência de Reação Visual (Balanço Científico SRT)",
    headers: ["Nível de Desempenho", "Latência Média (ms)", "Pontuação e Combo Limiar", "Perfil Neuromuscular e de Reflexo"],
    rows: [
      ["Tier 1: Reflexo Neural Apex", "< 180 ms", "15.000+ PTS | Combo 28x+", "Excitabilidade extrema do córtex motor; condução corticoespinhal otimizada típica de velocistas de elite e pró-players."],
      ["Tier 2: Reflexo Visual Superior", "180 – 219 ms", "10.500 – 14.999 PTS | Combo 18x+", "Excelente acoplamento óptico-motor; latências constantes abaixo de 220 ms com oscilação temporal mínima."],
      ["Tier 3: Padrão Adulto Consolidado", "220 – 259 ms", "6.000 – 10.499 PTS | Combo 10x+", "Faixa padrão para adultos saudáveis; resposta motora típica com pequenas variações causadas por cansaço natural."],
      ["Tier 4: Retardo Moderado de Resposta", "260 – 319 ms", "2.500 – 5.999 PTS | Combo 5x+", "Processamento central estendido; sensível a atrasos de monitor, fadiga ocular ou lapsos leves de vigília."],
      ["Tier 5: Latência Estendida / Em Evolução", "> 320 ms", "< 2.500 PTS | Combo < 5x", "Hesitação sensorial perceptível; sobrecarga de processamento sensorial ou atrasos causados por tela de 60 Hz."]
    ],
    note: "Estes parâmetros baseiam-se na literatura clássica de cronometria mental humana e psicofísica visual (Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015). Variações decorrem de fatores circadianos, cafeína e frequência do monitor."
  },
  techniques: {
    title: "Técnicas para Acelerar a Velocidade de Reação Visual",
    items: [
      {
        name: "Pré-Ativação Foveal e Fixação Central",
        desc: "Travar a fóvea visual estritamente no centro suprime a perda de 20 a 30 ms demandada por mudanças de foco (Posner, 1980).",
        tips: "Fixe os olhos no círculo escuro central; não desvie o olhar para o relógio ou para os pontos do placar enquanto espera."
      },
      {
        name: "Otimização de Contraste e Priming Fotorreceptor",
        desc: "O contraste elevado maximiza as frequências de disparo ganglionar retiniano, diminuindo o tempo de transdução (Pins & Bonnet, 1996).",
        tips: "Reduza a iluminação do ambiente para que suas pupilas se dilatem levemente, intensificando o impacto perceptual do flash branco."
      },
      {
        name: "Pré-Tensão Músculo-Digital Isométrica",
        desc: "A distância do curso do botão e o debounce adicionam atrasos mecânicos desnecessários se o dedo estiver flutuando (Woods et al., 2015).",
        tips: "Repouse a ponta do dedo diretamente sobre o switch do mouse com uma leve pré-tensão relaxada, sem folga mecânica."
      },
      {
        name: "Calibração e Monitores de Alta Frequência",
        desc: "Um display de 60 Hz adiciona até 16,7 ms de atraso de quadro, enquanto um monitor de 240 Hz reduz esse tempo para 4,1 ms (Woods et al., 2015).",
        tips: "Execute o drill em telas de 144 Hz ou 240 Hz com mouse de 1.000 Hz para registrar seus reflexos sem gargalos técnicos."
      }
    ]
  },
  steps: [
    "Clique em Iniciar Drill para iniciar a sessão de 45 segundos de reação à luz.",
    "Fixe a visão de forma firme no círculo escuro localizado no centro da tela.",
    "Aguarde pacientemente pelos intervalos aleatórios (300 ms a 2.500 ms) sem precipitação.",
    "Clique na tela ou na Barra de Espaço no momento exato em que o alvo brilhar em branco puro (+150 PTS × Multiplicador).",
    "Analise seu tempo médio de reação, melhor combo e graduação de precisão ao fim do teste."
  ],
  audience: "Jogadores de e-sports táticos, lutadores, corredores de velocidade, pilotos de corrida e todos que desejam desenvolver a velocidade do reflexo visual.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/pt/drills/visual/reaction-speed/go/no-go", label: "Teste Go / No-Go de Inibição" },
    { href: "/pt/drills/visual/depth-perception/distance-judgment", label: "Percepção de Profundidade e Distância" },
    { href: "/pt/drills/visual/tracking-accuracy/moving-target", label: "Interceptação de Alvo Móvel" },
    { href: "/pt/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/pt/drills/visual/tracking-accuracy/pursuit-tracker", label: "Rastreador de Perseguição Suave" },
    { href: "/pt/drills/visual/visual-recognition/entropic-grid", label: "Busca em Grade Entrópica" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "Teste de Reação à Luz: Reflexo Visual Online" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/pt/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
