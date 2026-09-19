import AngleHoldClient from '@/app/drills/fps/angle-hold-trainer/AngleHoldClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Posicionamento de Mira – Treino de Ângulos | SkillDrills",
  description: "Treine posicionamento de mira e marcação de ângulos no navegador. Calibre o espaçamento da parede e neutralize o peeker advantage no CS2 e Valorant.",
  keywords: [
    "posicionamento de mira treino",
    "como segurar angulo fps",
    "treino de marcar pixel valorant",
    "pre aim treino cs2",
    "peeker advantage como marcar",
    "distancia da mira na parede",
    "mira na altura da cabeca",
    "tempo de reacao abrir pixel",
    "como punir peeker fps",
    "marcar pixel cs2 treino",
    "treino de reflexo para esquinas",
    "treinador de mira de retencao"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/angle-hold-trainer",
    languages: getAlternateLanguages('/drills/fps/angle-hold-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Posicionamento de Mira – Treino de Ângulos | SkillDrills",
    description: "Treine posicionamento de mira e marcação de ângulos no navegador. Calibre o espaçamento da parede e neutralize o peeker advantage no CS2 e Valorant.",
    url: "https://skilldrills.online/pt/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Posicionamento de Mira – Treino de Ângulos | SkillDrills",
    description: "Treine posicionamento de mira e marcação de ângulos no navegador. Calibre o espaçamento da parede e neutralize o peeker advantage no CS2 e Valorant.",
  },
};

export default function PortugueseAngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos de FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Posicionamento de Mira", "item": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Treinador online de posicionamento de mira, marcação defensiva de cantos e pré-mira para jogadores de FPS tático.",
    "genre": "Treino de FPS / Posicionamento de Mira",
    "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Angle Hold Pro",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulador interativo de retenção de ângulos e disciplina de mira para neutralizar a vantagem do peeker em CS2 e Valorant.",
    "genre": "Treino de FPS / Posicionamento de Mira",
    "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Angle Hold Pro",
    "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer",
    "description": "Treinador interativo de mira e reação a cantos para jogos de tiro tático.",
    "gamePlatform": "Web Browser",
    "genre": ["Treino de FPS", "Treinador de Mira"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é posicionamento de mira (crosshair placement)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a mecânica fundamental de manter a retícula exatamente na altura da cabeça e no ponto onde o inimigo irá surgir, eliminando a necessidade de fazer flicks reativos ao avistar o oponente."
        }
      },
      {
        "@type": "Question",
        "name": "O que é peeker's advantage em jogos de tiro tático?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o atraso de latência de rede cliente-servidor. Quem abre o pixel envia seus dados antes de o defensor parado receber a informação, concedendo ao atacante uma janela de 40 a 90 ms onde ele vê primeiro."
        }
      },
      {
        "@type": "Question",
        "name": "Como jogadores de CS2 e Valorant seguram ângulos e cravam pixels?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Posicionando a mira ligeiramente afastada da quina. Esse espaço acomoda o tempo de reação humano e a velocidade de corrida do rival, permitindo clicar no momento exato em que ele passa pela retícula."
        }
      },
      {
        "@type": "Question",
        "name": "A que distância da parede minha mira deve ficar ao marcar um ângulo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende da velocidade esperada do oponente: contra swings abertos e correndo, segure mais aberto. Contra jiggle peeks curtos ou aberturas cautelosas no shift, segure mais rente à quina."
        }
      },
      {
        "@type": "Question",
        "name": "O que faz os jogadores atirarem antes da hora (pre-fire acidental)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ansiedade motora e falha na discriminação visual Go/No-Go diante de feintes ou utilitários. Treinar disciplina de gatilho ensina o cérebro a disparar apenas quando o alvo se compromete com a abertura."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre segurar pixel e fazer jiggle peek?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Segurar pixel é uma postura defensiva passiva focada em tempo de reação puro. Fazer jiggle peek é uma movimentação ativa com strafes A-D para obter informação e iscar tiros sem se expor."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a fórmula matemática de latência do peeker's advantage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fórmula é: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. O atraso resulta dos pings dos dois jogadores somados ao buffer de interpolação do servidor."
        }
      },
      {
        "@type": "Question",
        "name": "A taxa de atualização do monitor afeta a reação ao segurar ângulos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Telas de 240 Hz exibem quadros a cada 4,17 ms contra 16,67 ms em 60 Hz, revelando os primeiros pixels do corpo do adversário muito mais cedo e reduzindo a latência do sistema."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo treinar posicionamento de mira e marcação de pixel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões diárias de 10 a 15 minutos combinadas com treinos de deathmatch no jogo são suficientes para fixar a resposta reflexa nos dedos sem fadiga tendínea."
        }
      },
      {
        "@type": "Question",
        "name": "O simulador oferece suporte a entrada bruta de mouse (raw input)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Funciona com a API Pointer Lock do HTML5 com cronometria de alta resolução via performance.now(), eliminando qualquer aceleração ou suavização artificial do sistema."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Praticar Posicionamento de Mira e Retenção de Ângulos",
    "description": "Instruções passo a passo para calibrar a altura do retículo, distância da parede e neutralizar o peeker advantage.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibre o espaçamento da mira em relação à parede",
        "text": "Posicione o retículo levemente afastado da quina, deixando um vão correspondente à sua velocidade de reação visual.",
        "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Trave a mira exatamente na altura da cabeça",
        "text": "Alinhe a retícula com referências visuais do cenário na altura exata da cabeça para acertar o tiro sem microajustes.",
        "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Antecipe a velocidade de corrida do adversário",
        "text": "Amplie o espaçamento contra inimigos em corrida aberta e estreite-o contra adversários em passadas cautelosas.",
        "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Dispare imediatamente na entrada do alvo na retícula",
        "text": "Confie no posicionamento e dê um único clique assim que o alvo cruzar a retícula, sem tentar flicks reativos de última hora.",
        "url": "https://skilldrills.online/pt/drills/fps/angle-hold-trainer#step-4"
      }
    ]
  };

  const angleHoldGuidePt = {
    heading: "Guia de Posicionamento de Mira e Retenção de Ângulos — Latência e Geometria",
    intro: [
      "A retenção defensiva de ângulos é uma disciplina de tiro tático governada pelo tempo de reação simples de Donders (Donders, 1868) e pela discriminação cognitiva Go/No-Go. Ao contrário do tiro por flick que exige impulsos motores de aceleração e desaceleração (Woodworth, 1899; Meyer et al., 1988), segurar um ângulo pré-alinha o retículo no plano horizontal da cabeça, convertendo uma busca espacial 2D em um problema temporal de timing de clique 1D.",
      "Em arquiteturas de rede multijogador (como o sub-tick do CS2 e os servidores de 128 ticks do Valorant), a latência gera a assimetria conhecida como peeker's advantage: T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp. Para neutralizar esse déficit, o defensor deve afastar a mira da quina em D_offset = v_peeker × T_reação, permitindo que o atacante cruze o retículo exatamente no instante em que o clique mecânico ocorre.",
      "A precisão motora segue os princípios da Lei de Fitts (Fitts, 1954): microcorreções introduzidas durante a espera geram ruído neuromuscular. O Angle Hold Pro emprega marcas de tempo de performance.now() e sincronização com a taxa de quadros da tela para oferecer uma avaliação rigorosa de disciplina de gatilho e discriminação de fake peeks (Hick, 1952; Woods et al., 2015).",
      "Como medir seu desempenho: cada tiro é registrado localmente com o relógio de alta precisão do navegador. Diferenças menores que 5 ms são ruídos esperados de temporização. Mantenha as mesmas configurações de sensibilidade física e espaço no mousepad para consolidar respostas confiáveis."
    ],
    benchmarks: {
      title: "Benchmarks de Retenção Defensiva e Reação ao Peek",
      headers: ["Fase do Combate / Métrica", "Latência Típica (ms)", "Fator Sensoriomotor e de Rede", "Classificação de Desempenho"],
      rows: [
        ["Latência de Disparo Visual Simples", "150 – 190 ms", "Ativação retiniana foveal e clique no córtex motor", "Gatilho motor inconsciente em estímulo antecipado (Donders, 1868)"],
        ["Latência de Discriminação (Fake/Jiggle Peek)", "210 – 280 ms", "Identificação cognitiva Go/No-Go do avanço real", "Disciplina de gatilho sob pressão de isca (Hick, 1952)"],
        ["Déficit de Latência do Peeker's Advantage", "40 – 90 ms", "Trânsito de pacotes RTT cliente-servidor + buffer de interpolação", "Vantagem de transmissão do atacante em movimento"],
        ["Janela Efetiva de Resposta Defensiva Líquida", "250 – 340 ms", "Latência visual combinada + compensação de déficit de rede", "Linha de base padrão para defensores em FPS táticos"],
        ["Precisão de Elite na Marcação com Pré-Mira", "170 – 220 ms", "Espaçamento ótimo alinhado à velocidade do swing", "Maestria defensiva de alto nível (Valorant Radiante / CS2 Faceit 10)"]
      ],
      note: "Métricas sintetizadas a partir de estudos de cronometria cognitiva (Donders, 1868; Hick, 1952; Woods et al., 2015) e pesquisas de engenharia de rede em FPS táticos. Os tempos variam com a taxa de quadros da tela, taxa de amostragem do mouse e estado de alerta."
    },
    techniques: {
      title: "Geometria de Posicionamento e Diretrizes de Marcação",
      items: [
        {
          name: "Calibração de Espaçamento da Quina",
          desc: "Não cole a mira diretamente na borda da parede. Deixe uma margem horizontal proporcional ao seu reflexo: segure mais aberto contra corridas amplas e mais fechado contra aproximações lentas.",
          tips: "Se os adversários costumam ultrapassar sua mira antes do tiro, amplie o afastamento em 15-20%."
        },
        {
          name: "Disciplina Horizontal na Altura da Cabeça",
          desc: "Alinhe a elevação da mira com elementos do cenário como caixas, batentes de portas ou faixas na parede correspondentes à altura da cabeça nas distâncias comuns.",
          tips: "Evite o relaxamento da mão que faz a mira cair em direção ao chão ao patrulhar ângulos passivos."
        },
        {
          name: "A Regra 'Clique, Não Ajuste'",
          desc: "Ao segurar um ângulo calibrado com pré-mira, comprometa-se a clicar no instante em que o inimigo entrar na retícula, em vez de tentar microflicks que acrescentam de 80 a 120 ms de atraso.",
          tips: "Confie na sua colocação de mira e fixe o foco visual ligeiramente à frente do retículo."
        },
        {
          name: "Posicionamento em Off-Angles",
          desc: "Ângulos óbvios atraem tiros prévios (prefires). Dê meio passo para posições incomuns para quebrar a pré-mira do adversário enquanto mantém sua própria linha de visão limpa.",
          tips: "Tenha sempre uma rota de fuga planejada antes de assumir um off-angle agressivo."
        }
      ]
    },
    steps: [
      "Clique em Iniciar para entrar em tela cheia e travar o cursor do mouse.",
      "Posicione a mira na altura da cabeça em relação à quina, ajustando o vão da parede.",
      "Mantenha a mão firme com tensão suave para evitar tremores antecipatórios.",
      "No milissegundo em que o alvo cruzar o plano da retícula, execute um único clique rápido.",
      "Acompanhe sua latência média de reação (ms) e disciplina ao longo das rodadas."
    ],
    audience: "Jogadores competitivos de CS2, Valorant e Rainbow Six Siege que desejam aprimorar posicionamento de mira, disciplina de disparo e reflexos de defesa em esquinas.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Treino de Giro 180°" },
      { href: "/drills/fps/micro-correction-precision", label: "Treino de Microcorreção" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Teste de Tempo de Reação" }
    ]
  };

  const copyPt = {
    h1Prefix: null,
    h1Keyword: "Posicionamento de Mira",
    h1Suffix: " — Treino de Ângulos",
    subtitle: "Treino de Marcação de Pixel e Defesa contra Peeker's Advantage",
    rulesItems: [
      { num: "1", text: "Acerto no Peek", highlight: "+100 PTS (+0,6s)", result: "×Multiplicador" },
      { num: "2", text: "Surgimento em Cantos", highlight: "Aparicão Rápida", result: "Menor Janela" },
      { num: "3", text: "Progressão de Nível", highlight: "+1 Nível / 1400 PTS", result: "Escala Adaptativa" },
      { num: "4", text: "Erro / Pre-Fire", highlight: "Penalidade", result: "Reset Combo (-0,8s)" }
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "Recomendado para", text: "Defensores de bombsite em Valorant, âncoras de CS2, operadores de R6 Siege e quem deseja cravar mira com disciplina." },
      { iconBg: "bg-orange-600", title: "Habilidades Treinadas", text: "Calibração de distância da quina, disciplina de gatilho contra jiggle peeks, tempo de reação e consistência na altura da cabeça." },
      { iconBg: "bg-purple-600", title: "Detecção de Fake Peek", text: "Níveis altos simulam jiggle e bait peeks. Treine o discernimento Go/No-Go para atirar apenas quando o alvo se comprometer." }
    ],
    aboutSections: [
      {
        title: "Espaçamento Ideal da Parede (Geometria de Offset)",
        paragraphs: [
          "O erro mais frequente ao marcar um ângulo é colar a mira diretamente na quina da parede. Como o processamento visual e a resposta muscular levam de 180 a 220 ms, um inimigo correndo passa direto pela mira colada antes que o dedo consiga disparar.",
          "Ao deixar um espaço horizontal entre a parede e o retículo (D_offset = v_peeker × T_reação), o adversário corre exatamente para o ponto onde seu tiro é acionado, eliminando a necessidade de microajustes desesperados."
        ]
      },
      {
        title: "Neutralização Matemática do Peeker's Advantage",
        paragraphs: [
          "Devido à latência de rede entre cliente e servidor (RTT), o atacante em movimento enxerga o defensor parado de 40 a 90 ms mais cedo. Essa desvantagem só é neutralizada posicionando a mira mais afastada da quina para compensar a aceleração transversal do inimigo."
        ]
      },
      {
        title: "Metodologia de Medição e Precisão do Sensor",
        paragraphs: [
          "Angle Hold Pro utiliza a API HTML5 Pointer Lock e marcas de tempo de performance.now() para registrar latências de clique no nível de submilissegundo, sem aceleração de ponteiro do sistema operacional."
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <AngleHoldClient copy={copyPt} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/angle-hold-trainer" locale="pt" />
      </div>

      <DrillGuide guide={angleHoldGuidePt} />
      <DrillFooter />
    </>
  );
}
