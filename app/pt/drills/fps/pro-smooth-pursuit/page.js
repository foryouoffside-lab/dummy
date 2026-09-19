import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "Treino de Tracking Suave – Mira em Curva | SkillDrills",
  description: "Treine tracking suave e rastreamento em curva no navegador. Domine a mira contínua sem tremores para Apex Legends e Overwatch 2 gratuitamente.",
  keywords: [
    "treino de tracking suave fps",
    "smooth pursuit mira treino",
    "treinar tracking apex legends",
    "mira de rastreamento suave",
    "treino de mira em curva",
    "como melhorar tracking overwatch 2",
    "movimento sacadico mira fps",
    "rastreamento visual continuo",
    "treinador de mira tracking gratis",
    "controle de tremor mira mouse",
    "treino de estabilidade de antebraco",
    "exercicio de busca suave olhos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Tracking Suave – Mira em Curva | SkillDrills",
    description: "Treine tracking suave e rastreamento em curva no navegador. Domine a mira contínua sem tremores para Apex Legends e Overwatch 2 gratuitamente.",
    url: "https://skilldrills.online/pt/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Tracking Suave – Mira em Curva | SkillDrills",
    description: "Treine tracking suave e rastreamento em curva no navegador. Domine a mira contínua sem tremores para Apex Legends e Overwatch 2 gratuitamente.",
  },
};

export default function ProSmoothPursuitPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://skilldrills.online/pt"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Exercícios FPS",
        "item": "https://skilldrills.online/pt/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Tracking Suave Profissional",
        "item": "https://skilldrills.online/pt/drills/fps/pro-smooth-pursuit"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treinador de Tracking Suave SkillDrills",
    "url": "https://skilldrills.online/pt/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requer navegador moderno com API Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treino de Tracking Suave e Rastreamento em Curva",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Pro Smooth Pursuit Curve Tracking Trainer",
    "description": "Simulador de rastreamento contínuo em curvas harmônicas de Lissajous com ponteiro bruto.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o treino de Smooth Pursuit (rastreamento suave) em jogos FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Smooth Pursuit é a capacidade fisiológica do sistema oculomotor e dos músculos do braço de acompanhar um alvo em deslocamento contínuo combinando a velocidade do mouse com a velocidade da trajetória, mantendo a retícula ininterruptamente colada à hitbox do adversário."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença neurológica entre o rastreamento suave e os movimentos sacádicos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os movimentos sacádicos (flicks) são impulsos balísticos rápidos de ponto a ponto controlados pelo córtex frontal e colículo superior, enquanto o Smooth Pursuit envolve circuitos corticais do córtex temporal médio (área MT/V5) e do cerebelo para calcular velocidade e manter aceleração fluida contínua sem saltos visuais."
        }
      },
      {
        "@type": "Question",
        "name": "Por que minha mira treme ou oscila ao tentar acompanhar trajetórias curvas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O tremor ocorre quando o jogador tenta rastrear usando micro-flicks sucessivos em vez de um deslizamento contínuo. A contração excessiva do punho e antebraço gera atrito estático que impede a modulação fluida nas curvaturas da trajetória."
        }
      },
      {
        "@type": "Question",
        "name": "O que é antecipação visual foveal (Foveal Gaze Leading) no tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a técnica em que o olhar do jogador se posiciona ligeiramente à frente do centro da hitbox do alvo móvel. Esse pequeno avanço perceptivo fornece ao cérebro o vetor direcional necessário para antecipar inflexões de velocidade com latência reduzida."
        }
      },
      {
        "@type": "Question",
        "name": "Por que o Smooth Pursuit é fundamental em jogos de alto TTK como Apex Legends e Overwatch 2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Em jogos com longo Time-to-Kill, abater um oponente requer contato contínuo de disparos por vários segundos enquanto o inimigo pula, esquiva ou desliza. Um tracking fluido maximiza o dano por segundo (DPS) sem desperdiçar munição durante o combate dinâmico."
        }
      },
      {
        "@type": "Question",
        "name": "O que é uma curva de Lissajous e por que ela é utilizada neste exercício?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As curvas de Lissajous são trajetórias matemáticas harmônicas bidimensionais com variação senoidal contínua nos eixos X e Y. Elas forçam a musculatura da mão e do braço a calibrar aceleração e desaceleração simultâneas em ângulos diagonais, simulando movimentações avançadas de esquiva."
        }
      },
      {
        "@type": "Question",
        "name": "Como a taxa de atualização do monitor e o polling rate influenciam o tracking suave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monitores de alta taxa de quadros (144Hz a 360Hz) eliminam a descontinuidade visual entre posições sucessivas do alvo, reduzindo o esforço do córtex visual para interpolar o movimento. Polling rates de 1000Hz ou mais oferecem atualização de sinal a cada milissegundo, garantindo suavidade absoluta no cursor."
        }
      },
      {
        "@type": "Question",
        "name": "Qual empunhadura de mouse oferece maior estabilidade para rastreamento prolongado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Empunhaduras Claw ou Palm relaxadas apoiam melhor a mão na concha do mouse, permitindo que os grandes grupos musculares do antebraço e do ombro executem o deslizamento sem tensões pontuais nos dedos que geram tremores indesejados."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo praticar treinos de tracking suave?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recomenda-se realizar de 10 a 15 minutos de sessões focadas antes de partidas competitivas. Como o tracking exige concentração neuromotora contínua, pausas regulares evitam a fadiga dos músculos flexores do antebraço."
        }
      },
      {
        "@type": "Question",
        "name": "Por que sair do alvo zera o multiplicador de combo neste treinador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O multiplicador de combo premia o tempo de contato ininterrupto. Em tiroteios competitivos de alto TTK, perder o contato com a hitbox por frações de segundo interrompe o dano e permite a recuperação de escudos do adversário."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar Tracking Suave e Rastreamento em Curva",
    "description": "Guia estruturado para sincronizar velocidade e estabilizar a mira em trajetórias móveis contínuas.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibração e Ativação do Ponteiro",
        "text": "Defina seus parâmetros idênticos de sensibilidade e DPI e clique no centro da tela para ativar o bloqueio de ponteiro."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Acoplamento Inicial no Alvo",
        "text": "Quando a esfera de rastreamento surgir, posicione a retícula sobre ela com movimento suave sem aplicar força brusca."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Deslizamento Contínuo com o Antebraço",
        "text": "Use o antebraço e ombro para guiar o mouse pelas curvas de Lissajous, evitando micro-ajustes tensos no punho."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Manutenção da Zona de Combo",
        "text": "Mantenha a retícula colada à esfera durante acelerações e desacelerações nas curvas para acumular o multiplicador máximo."
      }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Tracking Suave FPS",
    h1Suffix: " – Rastreamento em Curva",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    pausedTitle: "Jogo Pausado",
    pausedSubtitle: "Clique na tela para reengajar a trava do cursor do mouse.",
    startTitle: "Tracking Suave Profissional",
    startSubtitle: "Rastreamento em Curva de Lissajous • Progressão Contínua",
    getReady: "PREPARE-SE",
    stageCaption: "Acompanhe continuamente o alvo em movimento oscilatório pelas curvas suaves da tela sem perder o contato visual.",
    rulesTitle: "Instruções do Treino e Sistema de Pontos",
    rulesItems: [
      { num: "1", text: "Rastreamento no Alvo", highlight: "+50 PTS (+0.4s/s)", result: "×Mult de Combo" },
      { num: "2", text: "Sequência Contínua", highlight: "Até 3.0×", result: "Multiplicador Máx" },
      { num: "3", text: "Progressão de Nível", highlight: "+1 Nível / 1400 PTS", result: "Curvas Adaptativas" },
      { num: "4", text: "Perda de Contato", highlight: "1.0s Fora do Alvo", result: "Reset de Combo (-0.6s)" }
    ],
    aboutTitle: "Sobre o Treinador de Tracking Suave",
    aboutHeading: "O que é o Rastreamento Suave (Smooth Pursuit)?",
    aboutText: "O rastreamento suave (Smooth Pursuit) é a capacidade neuro-ocular de manter o olhar fixo em um objeto em movimento contínuo através da modulação da velocidade dos músculos oculares e da coordenação motora do antebraço (Krauzlis, 2004; Barnes, 2008). Este exercício elimina os micro-flicks corretivos desnecessários e transforma sua mira em um feixe constante e fluido."
  };

  const smoothPursuitGuide = {
    heading: "Guia de Tracking Suave & Rastreamento em Curva de Lissajous",
    intro: [
      "O Treinador de Tracking Suave Profissional é um ambiente sensório-motor projetado para isolar e condicionar a sincronização contínua de velocidade ocular e manual. Em atiradores dinâmicos de alto TTK como Apex Legends, Overwatch 2 e The Finals, a vitória em duelos prolongados depende da capacidade de manter o retículo ininterruptamente sobre alvos velozes.",
      "Diferente dos flicks balísticos instantâneos regidos pela Lei de Fitts (1954), o rastreamento suave mobiliza redes neurais corticais especializadas na área temporal média (MT/V5) e no cerebelo (Krauzlis, 2004; Lisberger et al., 1987). Esses circuitos analisam vetores de fluxo óptico e ajustam continuamente o ganho de velocidade neuromuscular para coincidir com a aceleração do adversário.",
      "A trajetória utilizada neste exercício baseia-se em curvas harmônicas de Lissajous, combinando frequências senoidais interdependentes nos eixos X e Y. Essa dinâmica elimina trajetórias lineares previsíveis, estimulando o planejamento motor antecipatório (Barnes, 2008) sem recorrer a correções abruptas por sobressaltos sacádicos.",
      "Ao utilizar a API de Pointer Lock aliada à cronometria de alta resolução via performance.now() (Woods et al., 2015), o exercício mede com precisão o tempo real de permanência sobre a hitbox, permitindo erradicar tremores do mouse e construir uma mira estável e implacável.",
      "Como é medido: o tempo de contato na hitbox e a estabilidade angular são computados localmente a cada quadro. Pequenas variações de medição menores a 5 ms correspondem a latências de hardware normais de tela e taxa de polling de periféricos."
    ],
    benchmarks: {
      title: "Tiers de Desempenho de Tracking Contínuo e Sincronização de Velocidade",
      headers: ["Nível de Desempenho", "Tempo em Alvo (%)", "Estado Neuromuscular e Oculomotor", "Implicação Competitiva no Jogo"],
      rows: [
        ["Tier 1 (Feixe Perfeito)", "85% – 95%+", "Fixação foveal sem interrupções; correspondência de velocidade perfeita nas inflexões de curva sem micro-flicks", "Mira impecável em lobbies de Apex Predator, Top 500 Overwatch e torneios pro"],
        ["Tier 2 (Pro Competitivo)", "72% – 85%", "Modulação fluida pelo antebraço; compensação de velocidade imediata ao atingir o ápice das curvas", "Vence duelos 1v1 prolongados de alto TTK contra alvos em esquiva com alta eficiência"],
        ["Tier 3 (Alto Nível FPS)", "58% – 72%", "Tracking linear sólido; pequenas hesitações de 10 a 15% durante inversões rápidas de trajetória", "Alto rendimento geral; ligeira perda de contato contra adversários com mobilidade aérea extrema"],
        ["Tier 4 (Intermediário)", "42% – 58%", "Tendência de usar micro-flicks sucessivos em vez de deslizar; tensão no punho provocando tremor", "Dificuldade em acompanhar personagens ágeis; desperdício considerável de munição"],
        ["Tier 5 (Em Desenvolvimento)", "Abaixo de 42%", "Arrasto constante atrás do alvo; incapacidade de sincronizar velocidade em mudanças de direção", "Perda frequente de duelos diretos; retícula frequentemente desalinhada da hitbox"]
      ],
      note: "Os tiers avaliam a porcentagem de tempo em que a retícula permanece dentro do alvo em curvas de Lissajous contínuas medidas via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Aperfeiçoar o Tracking Suave",
      items: [
        {
          name: "Deslizamento Pelo Antebraço e Relaxamento do Punho",
          desc: "Execute a maior parte do deslocamento contínuo movimentando o antebraço a partir do cotovelo, mantendo o punho relaxado em posição neutra para evitar tremores causados por atrito estático.",
          tips: "Mantenha o antebraço confortavelmente apoiado na mesa para criar estabilidade mecânica natural durante curvas amplas."
        },
        {
          name: "Fixação Foveal com Antecipação (Gaze Leading)",
          desc: "Foque o olhar 1 a 2 milímetros à frente do centro do alvo na direção da curvatura. Essa pré-ativação visual instrui os circuitos motores com a aceleração futura necessária.",
          tips: "Evite fixar os olhos na retícula; seu foco primário deve estar na borda frontal da esfera móvel."
        },
        {
          name: "Transição Suave nas Inflexões de Direção",
          desc: "Nos vértices da curva onde o alvo desacelera e inverte o sentido, não pare a mão abruptamente. Reduza a velocidade de forma progressiva e inverta o fluxo com controle muscular contínuo.",
          tips: "Pense na curva como uma onda fluida e não como retas conectadas por cantos angulares."
        },
        {
          name: "Pressão Constante na Superfície do Mousepad",
          desc: "Mantenha uma pressão descendente leve e uniforme durante todo o trajeto para assegurar atrito cinético homogêneo sob os pés do mouse.",
          tips: "Mousepads com superfície suave e baixo atrito estático ajudam a eliminar micropausas ao iniciar curvas."
        }
      ]
    },
    steps: [
      "Ajuste sua sensibilidade real de jogo e DPI para garantir correspondência neuromuscular idêntica de cm/360 e trave o cursor.",
      "Quando o alvo em curva surgir, posicione a retícula no centro sem movimentos abruptos.",
      "Acompanhe o movimento da curva de Lissajous deslizando o antebraço com velocidade constante correspondente ao alvo.",
      "Mantenha contato contínuo na trajetória para acumular o multiplicador de combo e progredir para níveis com alvos menores."
    ],
    audience: "Jogadores de Apex Legends, Overwatch 2 e The Finals que buscam eliminar tremores de mira e aperfeiçoar o tracking de alta precisão em duelos contínuos.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'barnes2008', 'krauzlis2004', 'lisberger1987'),
    related: [
      { href: "/pt/drills/fps/anti-zigzag-movement-trainer", label: "Treinador de Movimento Anti-Zigue-Zague" },
      { href: "/pt/drills/fps/anti-strafe-jitter-duel", label: "Duelo Anti-Strafe Jitter" },
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/pt/drills/fps/micro-correction-precision", label: "Micro Correção de Mira" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <ProSmoothPursuitClient copy={copyPt} />

      <DrillGuide guide={smoothPursuitGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/pro-smooth-pursuit"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
