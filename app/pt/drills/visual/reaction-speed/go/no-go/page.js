import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste Go No-Go: Inibição & Controle de Impulso | SkillDrills",
  description: "Teste Go No-Go online grátis. Reaja a alvos verdes e iniba o clique nos alvos vermelhos. Avalie freio motor, controle de impulsos e disciplina de gatilho.",
  keywords: [
    "teste go no go online",
    "teste de inibição de resposta",
    "controle de impulsos teste",
    "tarefa go no-go neuropsicologia",
    "disciplina de gatilho fps",
    "funções executivas córtex pré-frontal",
    "teste stop signal task",
    "inibição motora comportamental",
    "erro de comissão teste atenção",
    "treino de tempo de reação e freio motor",
    "tarefa de atenção sustentada sart",
    "cronometria mental donders"
  ],
  openGraph: {
    title: "Teste Go No-Go: Inibição & Controle de Impulso | SkillDrills",
    description: "Reaja ao verde e freie no vermelho. Avalie inibição de resposta e freio motor pré-frontal gratuitamente online.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste Go No-Go: Inibição & Controle de Impulso | SkillDrills",
    description: "Treino neurocognitivo Go/No-Go gratuito para aprimorar disciplina de gatilho e controle de impulsos.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
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
    { "@type": "ListItem", "position": 5, "name": "Teste Go/No-Go de Controle de Impulso", "item": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste Go/No-Go de Inibição de Resposta",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Teste neurocognitivo interativo de Go/No-Go para mensurar inibição comportamental motora, taxa de erro de comissão e disciplina de disparo.",
  "featureList": [
    "Cronometria de precisão da reação via API performance.now()",
    "Compressão dinâmica da janela de estímulo conforme aumento de nível",
    "Monitoramento detalhado de erros de comissão (falso alarme) e omissão",
    "Armazenamento 100% local no navegador com zero telemetria"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste Go/No-Go de Inibição de Resposta | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "Treino online gratuito de Go/No-Go. Clique em alvos verdes e iniba a resposta motora diante de alvos vermelhos No-Go.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web moderno com suporte a HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Inibição de Resposta, Freio Motor, Controle de Impulsos, Disciplina de Gatilho, Funções Executivas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill Go/No-Go de Inibição Motora",
  "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go",
  "description": "Jogo neurocognitivo para aprimoramento do freio motor e disciplina de cliques.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste Go/No-Go de Inibição de Resposta",
  "dateModified": "2026-09-05",
  "description": "Guia de 4 etapas para testar e aprimorar a inibição motora e a supressão de impulsos pelo protocolo Go/No-Go.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixe o Olhar na Mira Central",
      "text": "Posicione os olhos na retícula central da tela onde os discos de estímulo surgem, mantendo postura visual relaxada e alerta.",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Dispare Rápido Diante de Alvos Verdes GO",
      "text": "Clique na tela ou pressione a Barra de Espaço o mais rápido possível quando o disco verde esmeralda piscar (+150 PTS × Combo).",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Freie o Dedo Diante de Alvos Vermelhos NO-GO",
      "text": "Imobilize o dedo e contenha qualquer clique quando o disco vermelho carmesim aparecer (+100 PTS por contenção bem-sucedida).",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mantenha a Disciplina de Gatilho em Velocidades Altas",
      "text": "Conforme sua sequência avança, o tempo de exibição diminui até 100 ms, exigindo freio motor hiperdireto de elite.",
      "url": "https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go#step-4"
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
      "name": "O que é o teste Go/No-Go e o que ele avalia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste Go/No-Go é um paradigma neurocognitivo experimental clássico que avalia a inibição de resposta motora, a atenção seletiva e o controle inibitório. Ele exige que o usuário responda a estímulos frequentes (Go) enquanto suspende ativamente a ação diante de estímulos raros (No-Go)."
      }
    },
    {
      "@type": "Question",
      "name": "O que diferencia um erro de comissão de um erro de omissão?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um erro de comissão (falso alarme) acontece quando você clica em um alvo vermelho No-Go, indicando falha no freio inibitório. Já o erro de omissão ocorre quando você deixa de clicar em um alvo verde Go a tempo, refletindo queda na atenção sustentada."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o modelo de corrida (Horse-Race Model) de Logan na inibição motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulado por Logan e colaboradores (1984), o modelo estabelece que a inibição é uma corrida entre dois processos cerebrais independentes: o processo Go (ativação motora) e o processo Stop (frenagem pré-frontal). Se o processo Stop cruzar o limiar antes, a ação é cancelada com sucesso."
      }
    },
    {
      "@type": "Question",
      "name": "Por que clicamos impulsivamente no alvo vermelho mesmo sabendo que é No-Go?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Isso ocorre devido ao 'priming motor prepotente'. A repetição de estímulos Go prepara o córtex motor para disparos automáticos. A luminância do estímulo ativa a via visual antes que a identidade da cor seja processada na área V4, liberando o clique antes do freio frontal atuar."
      }
    },
    {
      "@type": "Question",
      "name": "Como o treino de Go/No-Go melhora o desempenho em jogos de tiro tático (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos como Valorant, CS2 e Rainbow Six Siege, a disciplina de gatilho evita disparos precipitados em smokes ou contra aliados, preservando o posicionamento tático. O exercício desacopla a detecção visual de movimento da contração involuntária do dedo."
      }
    },
    {
      "@type": "Question",
      "name": "Quais estruturas neurais comandam o freio inibitório motor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A frenagem é mediada por uma via hiperdireta que conecta o córtex frontal inferior direito (rIFC), a área motora pré-suplementar (preSMA) e o núcleo subtalâmico (STN) nos gânglios da base (Aron et al., 2014)."
      }
    },
    {
      "@type": "Question",
      "name": "A capacidade de inibição de resposta pode ser aprimorada com treino regular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Evidências de neuroplasticidade comprovam que exercícios sistemáticos fortalecem as vias fronto-estriatais, encurtando o tempo de reação ao sinal de parada (SSRT) e aumentando o autocontrole comportamental."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a influência da taxa de atualização do monitor e do mouse no teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Telas de 60 Hz adicionam até 16,7 ms de latência de exibição, enquanto monitores de 144 Hz ou 240 Hz reduzem esse atraso para 6,9 ms e 4,1 ms. Com um mouse de 1.000 Hz, o cérebro recebe a confirmação de cor mais cedo, diminuindo erros de comissão."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o protocolo de treino diário ideal para controle de impulsos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se 2 a 3 sessões de 3 a 5 minutos por dia. Treinos prolongados esgotam neurotransmissores pré-frontais, elevando a impulsividade e a taxa de falsos alarmes."
      }
    },
    {
      "@type": "Question",
      "name": "Os dados de latência de reação e precisão são enviados para servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Todas as métricas de tempo de reação, erros e pontuações ficam salvas unicamente no armazenamento local do seu navegador, garantindo privacidade total e sem rastreamento externo."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "Padrões Científicos de Inibição de Resposta e Supressão Motora",
  intro: [
    "A inibição de resposta constitui a faculdade executiva essencial que capacita o ser humano a cancelar, conter ou adiar ações motoras inadequadas ou desvantajosas. Em esportes de combate, e-sports de alta precisão e direção automotiva, a capacidade de suspender uma resposta reflexa prepotente é frequentemente mais decisiva do que a mera rapidez de movimento.",
    "A gênese científica do paradigma Go/No-Go remonta a Franciscus Cornelis Donders (1868), pioneiro da cronometria mental que introduziu o método de subtração da 'Reação-C'. Donders demonstrou que discriminar entre dois estímulos e responder apenas a um deles exige processamento cognitivo adicional em relação ao tempo de reação simples.",
    "Em 1984, Gordon D. Logan e colaboradores formalizaram o 'Horse-Race Model', estabelecendo que o controle inibitório é uma disputa contínua entre um processo excitatório Go e um processo inibitório Stop. Mapeamentos por ressonância magnética funcional (Aron et al., 2014) revelam que o freio motor atua através da via hiperdireta entre o córtex frontal inferior direito (rIFC) e o núcleo subtalâmico (STN).",
    "Metodologia e Precisão Temporal: As exibições de estímulos e cliques são registradas pela API performance.now() com precisão de microssegundos. Variações causadas por taxas de atualização de display e taxas de polling USB são calibradas conforme a literatura experimental (Woods et al., 2015), mantendo todos os dados confinados localmente."
  ],
  benchmarks: {
    title: "Faixas de Desempenho em Inibição de Resposta (Referência Científica)",
    headers: ["Nível de Desempenho", "Taxa de Erro de Comissão (CER)", "Pontuação & Combo Limiar", "Perfil Neuromuscular e Executivo"],
    rows: [
      ["Tier 1: Frenagem Executiva Apex", "< 2.0% CER", "16.000+ PTS | Combo 30x+", "Supressão motora hiperdireta rIFC-STN impecável; desacoplamento total entre clarão visual e disparo motor."],
      ["Tier 2: Inibição de Resposta Superior", "2.0% – 4.9% CER", "11.000 – 15.999 PTS | Combo 20x+", "Excelente disciplina de gatilho; rápida recuperação em alternâncias cromáticas com mínimo erro de antecipação."],
      ["Tier 3: Padrão Adulto Consolidado", "5.0% – 9.9% CER", "6.500 – 10.999 PTS | Combo 12x+", "Execução confiável de alvos Go com ocasionais falsos alarmes sob cadência de alta frequência."],
      ["Tier 4: Impulsividade Moderada", "10.0% – 18.0% CER", "3.000 – 6.499 PTS | Combo 6x+", "Priming motor prepotente elevado; tendência a flexionar o dedo no surgimento do estímulo antes da confirmação cromática."],
      ["Tier 5: Priming Prepotente Alto (Base)", "> 18.0% CER", "< 3.000 PTS | Combo < 6x", "Impulsividade comportamental evidente; incapacidade de abortar disparos balísticos diante de sinais vermelhos No-Go."]
    ],
    note: "Estas faixas constituem parâmetros editoriais fundamentados na literatura clássica de cronometria mental e inibição motora (Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014). Flutuações ocorrem segundo o ciclo circadiano e a latência de hardware."
  },
  techniques: {
    title: "Métodos para Treinar a Inibição de Resposta",
    items: [
      {
        name: "Discriminação Cromática Pré-Disparo",
        desc: "Os sinais de luminância e movimento chegam ao córtex visual primário antes que a cor seja processada na área V4 (Donders, 1868).",
        tips: "Não inicie a flexão muscular no mero surgimento do brilho; condicione seu cérebro a esperar a confirmação do verde esmeralda."
      },
      {
        name: "O Reset de Frenagem do Modelo de Corrida",
        desc: "Se o processo inibitório Stop for disparado antes do potencial de ação motor atingir o limiar, o impulso é abortado na medula (Logan et al., 1984).",
        tips: "Mantenha o dedo levemente suspenso sobre o botão. Músculos do antebraço relaxados permitem que o freio neural atue sem resistência mecânica."
      },
      {
        name: "Ruptura de Cadências Automáticas",
        desc: "A repetição de alvos Go frequentes induz um ritmo automático, aumentando exponencialmente os erros de comissão nos sinais No-Go (Robertson et al., 1997).",
        tips: "Trate cada estímulo visual como um evento isolado e inédito, fixando a atenção estritamente na retícula central entre os disparos."
      },
      {
        name: "Calibração de Latência de Hardware",
        desc: "Em janelas de apresentação curtas de 160 ms, um monitor de 60 Hz consome até 16,7 ms de tempo útil de frenagem (Woods et al., 2015).",
        tips: "Utilize displays de 144 Hz ou 240 Hz e mouse com taxa de amostragem de 1.000 Hz para minimizar atrasos e debounce."
      }
    ]
  },
  steps: [
    "Clique em Iniciar Drill para iniciar a sessão de 45 segundos de Go/No-Go.",
    "Fixe os olhos na retícula central onde os discos de estímulo são gerados.",
    "Clique imediatamente quando o disco verde GO aparecer para somar pontos e combos.",
    "Contenha o clique e permaneça imóvel quando o disco vermelho NO-GO surgir para garantir pontos de contenção.",
    "Analise sua taxa de erro de comissão, tempo de reação médio e graduação final ao encerrar a sessão."
  ],
  audience: "Jogadores de FPS tático (Valorant, CS2, Rainbow Six) aprimorando disciplina de gatilho, pilotos, lutadores de artes marciais e pessoas em busca de autocontrole e fortalecimento das funções executivas.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/pt/drills/visual/reaction-speed/light-reaction", label: "Teste de Reação Luminosa" },
    { href: "/pt/drills/visual/depth-perception/distance-judgment", label: "Percepção de Profundidade e Distância" },
    { href: "/pt/drills/visual/tracking-accuracy/moving-target", label: "Interceptação de Alvo Móvel" },
    { href: "/pt/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/pt/drills/visual/tracking-accuracy/pursuit-tracker", label: "Rastreador de Perseguição Suave" },
    { href: "/pt/drills/visual/visual-recognition/entropic-grid", label: "Busca em Grade Entrópica" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Teste Go No-Go: Inibição & Controle de Impulso" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/pt/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
