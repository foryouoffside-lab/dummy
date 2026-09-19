import AwarenessDrillClient from '@/app/drills/fps/180-degree-awareness/AwarenessDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "Treino de Giro 180° – Mira e Reação FPS | SkillDrills",
  description: "Treine giros rápidos de 180 graus, reflexo contra flancos e visão periférica no navegador. Melhore sua agilidade de braço e mira no CS2 e Valorant.",
  keywords: [
    "treino de 180 graus mira",
    "treino de giro 180 fps",
    "virada de 180 graus fps",
    "treino de reflexo 180 mira",
    "virada rapida de mira valorant",
    "como treinar virada rapida fps",
    "treino de visao periferica fps",
    "desviar de flashbang treino cs2",
    "espaco do mousepad virada 180",
    "treino de mira 180 graus online",
    "mira para costas fps treino",
    "treino de reagir a flanco fps"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/180-degree-awareness",
    languages: getAlternateLanguages('/drills/fps/180-degree-awareness'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Giro 180° – Mira e Reação FPS | SkillDrills",
    description: "Treine giros rápidos de 180 graus, reflexo contra flancos e visão periférica no navegador. Melhore sua agilidade de braço e mira no CS2 e Valorant.",
    url: "https://skilldrills.online/pt/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Giro 180° – Mira e Reação FPS | SkillDrills",
    description: "Treine giros rápidos de 180 graus, reflexo contra flancos e visão periférica no navegador. Melhore sua agilidade de braço e mira no CS2 e Valorant.",
  },
};

export default function AwarenessDrillPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos de FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Treino de Giro 180°", "item": "https://skilldrills.online/pt/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treino de Giro 180°",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Navegador Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Simulador interativo de giro de 180 graus para FPS. Desenvolva agilidade de braço, tempo de reação contra flanqueamentos e percepção periférica.",
    "genre": "Treino de FPS / Percepção Espacial",
    "url": "https://skilldrills.online/pt/drills/fps/180-degree-awareness",
    "dateModified": "2026-09-16",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treino de Giro 180°",
    "url": "https://skilldrills.online/pt/drills/fps/180-degree-awareness",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas com Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Treinador de mira 180 graus gratuito no navegador. Pratique swipes balísticos, desvio de flashbangs e controle de parada para CS2 e Valorant."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Treino de Giro 180°",
    "gamePlatform": "Web Browser",
    "genre": ["Treino de FPS", "Treinador de Mira"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/pt/drills/fps/180-degree-awareness",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "dateModified": "2026-09-16"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o treino de percepção e giro de 180 graus em FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É uma rotina psicomotora para condicionar a detecção visual periférica e a reorientação mecânica do mouse quando alvos surgem totalmente fora do campo visual central."
        }
      },
      {
        "@type": "Question",
        "name": "Como jogadores profissionais aprimoram a percepção espacial de 360°?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atletas de e-sports treinam com cenários de wide flick, posicionamento de mira e escuta atenta de áudio tridimensional, construindo um mapa mental instantâneo do ambiente virtual."
        }
      },
      {
        "@type": "Question",
        "name": "Exercícios de 180° melhoram o tempo de reação motora?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. O estímulo periférico acelera a ativação dos bastonetes da retina e do colículo superior, reduzindo a hesitação antes de disparar o movimento balístico do braço."
        }
      },
      {
        "@type": "Question",
        "name": "De que forma a visão periférica ajuda em jogos de tiro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A visão central foveal cobre apenas cerca de 2 graus, enquanto a visão periférica detecta movimentos em quase 180 graus, permitindo identificar inimigos que flanqueiam sem perder a mira do ângulo principal."
        }
      },
      {
        "@type": "Question",
        "name": "Como parar de morrer de costas ou ser flanqueado em FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Combinando áudio espacial com giros rápidos e calibrados de 180 graus. Treinar a distância física exata no mousepad garante virar e acertar o inimigo antes de ser eliminado."
        }
      },
      {
        "@type": "Question",
        "name": "O que é consciência situacional (gamesense) em e-sports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a capacidade contínua de sintetizar minimapa, sons de passos, habilidades usadas e visão periférica para antecipar a posição e o timing dos adversários."
        }
      },
      {
        "@type": "Question",
        "name": "Este treino funciona para CS2, Valorant e outros jogos de tiro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Em jogos táticos como CS2 e Valorant, girar 180° é vital para desviar de flashbangs e checar ângulos fechados. Em Apex Legends e Overwatch, é essencial para combate corpo a corpo."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo treinar giros rápidos de 180 graus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De 10 a 15 minutos diários são ideais para consolidar a memória muscular de grandes rotações sem sobrecarregar tendões do punho ou ombro."
        }
      },
      {
        "@type": "Question",
        "name": "Devo movimentar o pulso ou o braço para fazer giros de 180°?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Giros amplos de 180 graus devem ser realizados prioritariamente com o antebraço, cotovelo e ombro, reservando o pulso e os dedos apenas para a microcorreção final sobre a cabeça."
        }
      },
      {
        "@type": "Question",
        "name": "O treino suporta entrada bruta de mouse (raw input) sem aceleração?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. O simulador utiliza a API HTML5 Pointer Lock, garantindo resposta direta de 1:1 sem aceleração de ponteiro do Windows ou do navegador."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar Giros de 180° e Percepção Espacial",
    "description": "Instruções passo a passo para treinar giros rápidos de 180 graus e detecção de ameaças periféricas no mouse.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Ative o Pointer Lock e centralize o mouse",
        "text": "Clique em Iniciar Treino para travar o cursor e posicione o mouse físico no centro exato do mousepad."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Detecte o estímulo visual na visão periférica",
        "text": "Mantenha o foco central relaxado e identifique alvos nas extremidades laterais com a visão periférica."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Execute o movimento balístico com o antebraço",
        "text": "Faça um swipe horizontal de alta velocidade impulsionado pelo cotovelo e ombro correspondente ao seu giro de 180°."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Aplique a frenagem muscular e confirme o clique",
        "text": "Acione os músculos antagonistas para frear a mira sobre o alvo, confirme o alinhamento e clique para eliminar."
      }
    ]
  };

  const awarenessGuidePt = {
    heading: "Guia de Treino de Percepção 180° e Benchmarks Psicomotores",
    intro: [
      "O tiro de giro de 180° é uma tarefa sensoriomotora complexa que exige coordenação refinada entre detecção visual periférica, sacadas oculares rápidas e aceleração balística dos membros. Na neurobiologia humana, os bastonetes da retina periférica detectam variações rápidas de luz e movimento em ângulos superiores a 90° em relação à linha de visão central, acionando sacadas reflexas via colículo superior (Rayner, 1998; Leigh & Zee, 2015).",
      "A conversão dessa detecção em uma reorientação virtual completa de 180° opera sob o modelo de impulso em dois componentes (Elliott et al., 2010). Um impulso balístico inicial de malha aberta cobre de 80% a 90% da rotação necessária, seguido imediatamente pela frenagem muscular antagonista para evitar que o retículo ultrapasse o alvo (Schmidt et al., 1979). Pela Lei de Fitts (Fitts, 1954), quanto maior a amplitude angular, maior a dificuldade da tarefa, tornando o controle de parada e a área do mousepad determinantes.",
      "A cronometria digital neste treinador é executada através de registros de alta resolução performance.now() sob a API Pointer Lock do HTML5. Timers de navegadores possuem leve suavização por mitigações de hardware (~1 ms), portanto diferenças menores que 5 ms devem ser interpretadas como ruído natural. A operação com taxa de amostragem de 1000 Hz no mouse e monitor com alta taxa de atualização elimina distorções e garante medições fiéis de sua velocidade e precisão (Woods et al., 2015).",
      "Como medir seu desempenho: cada disparo e deslocamento é registrado localmente no seu computador com clock de alta precisão. Mantenha as mesmas configurações de DPI, sensibilidade no jogo e espaço físico no mousepad entre as sessões para consolidar padrões motores confiáveis."
    ],
    benchmarks: {
      title: "Benchmarks de Giro de 180° e Reaquisição Espacial",
      headers: ["Fase do Giro / Métrica", "Latência Típica (ms)", "Mecanismo Biomecânico Motor", "Classificação Psicomotora"],
      rows: [
        ["Detecção Periférica e Gatilho Sacádico", "140 – 190 ms", "Bastonetes da retina e colículo superior", "Orientação visual pré-atentiva (Rayner 1998)"],
        ["Movimento Balístico do Braço (Giro 180°)", "180 – 260 ms", "Propulsão de antebraço, cotovelo e ombro", "Aceleração cinemática de malha aberta (Elliott 2010)"],
        ["Desaceleração e Frenagem da Mira", "60 – 110 ms", "Frenagem de músculos antagonistas (stopping power)", "Amortecimento de impulso de parada (Schmidt 1979)"],
        ["Microajuste Terminal e Clique", "70 – 130 ms", "Feedback visual foveal e disparo do gatilho", "Fase de aproximação pela Lei de Fitts (Fitts 1954)"],
        ["Tempo Total de Reaquisição de 180°", "450 – 690 ms", "Ciclo sensoriomotor completo de virada", "Linha de base competitiva padrão de operadores"],
        ["Execução Subconsciente de Elite 180°", "320 – 420 ms", "Sinergia de sensibilidade e memória muscular pura", "Domínio de e-sports em embreagens táticas de FPS"]
      ],
      note: "Métricas sintetizadas a partir de estudos clássicos de controle motor e neurociência visual (Rayner 1998; Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010) e padrões de cronometria digital (Woods et al. 2015). Latências reais variam com a sensibilidade física (cm/360°), atrito do mousepad e taxa de quadros."
    },
    techniques: {
      title: "Biomecânica e Dicas para Giros Ultrarrápidos de 180°",
      items: [
        {
          name: "Mecânica de Braço e Ponto de Apoio",
          desc: "Execute grandes viradas utilizando o cotovelo e o ombro como eixos centrais de rotação, em vez de forçar os tendões do pulso. Mantenha o antebraço plano e nivelado na mesa para permitir deslizamento suave.",
          tips: "Deixe espaço suficiente no mousepad para realizar uma virada completa de 180° em uma única passada sem erguer o mouse."
        },
        {
          name: "Calibração de cm/360° e Sensibilidade",
          desc: "Em shooters táticos como Valorant e CS2, jogadores de alto nível calibram entre 35 cm e 55 cm por giro 360° (cerca de 18 a 28 cm para 180°). Garanta que seu movimento do centro até a borda do mousepad cubra exatamente meia volta.",
          tips: "Evite alterar o DPI com frequência; a memória motora exige mapeamento angular consistente entre sessões de jogo."
        },
        {
          name: "Desvio Rápido de Flashbangs e Retorno",
          desc: "Em jogos competitivos, giros de 180° são fundamentais para não ser cegado por utilitários. Virar instantaneamente 180° para longe do flash e voltar em seguida exige controle rigoroso de desaceleração.",
          tips: "Treine reposicionar a mira na altura da cabeça imediatamente após concluir a manobra de fuga do flash."
        },
        {
          name: "Recentralização Rápida no Mousepad",
          desc: "Após realizar um giro longo de 180 graus e abater uma ameaça de costas, erga o mouse levemente e retorne-o ao centro do mousepad durante o tempo morto para nunca ficar sem espaço físico.",
          tips: "Pratique o reset do mouse com toques suaves no mousepad para evitar impactos que desgastem os pés de teflon."
        }
      ]
    },
    steps: [
      "Clique em Iniciar Treino para ativar o Pointer Lock e o modo imersivo de jogo.",
      "Mantenha a mira centralizada e a visão relaxada sobre a totalidade da tela.",
      "Assim que um alvo aparecer em uma das bordas, execute uma passada explosiva de antebraço na horizontal.",
      "Freie com firmeza perto do alvo, confirme o alinhamento com a visão central e clique.",
      "Acompanhe sua pontuação, precisão e velocidade média de reação no relatório final."
    ],
    audience: "Jogadores de CS2, Valorant, Apex Legends, Overwatch e shooters em geral que buscam reflexos rápidos contra flancos e maior velocidade de rotação no mouse.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979', 'leigh2015', 'rayner1998'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/drills/fps/angle-hold-trainer", label: "Treino de Mira e Ângulo (Crosshair Placement)" },
      { href: "/drills/fps/micro-correction-precision", label: "Treino de Microcorreção" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Teste de Tempo de Reação" }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Giro 180°",
    h1Suffix: " — Mira e Reação FPS",
    subtitle: "Treine detecção periférica de ameaças, flicks de grande amplitude e desaceleração terminal em giros de 180°.",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    startTitle: "Treino de Giro 180°",
    startSubtitle: "Entrada Bruta de Mouse • Progressão Infinita de Níveis",
    stageCaption: "Identifique alvos nas bordas com visão periférica e realize giros rápidos de 180° antes que o temporizador expire.",
    rulesTitle: "Regras de Treino e Sistema de Pontuação",
    rulesItems: [
      { num: "1", text: "Acerto de Alvo", highlight: "Grande Ângulo (+100 PTS / +0,6s)", result: "×Mult de Combo" },
      { num: "2", text: "Bordas de 180°", highlight: "Visão Periférica Extrema", result: "Mais Rápido e Menor" },
      { num: "3", text: "Progressão de Nível", highlight: "+1 Nível / 1.750 PTS", result: "Escala Adaptativa" },
      { num: "4", text: "Erro / Tempo Esgotado", highlight: "Penalidade", result: "Reset Combo (-0,8s)" }
    ],
    aboutTitle: "Sobre o Treino de Giro 180°",
    aboutHeading: "Por que treinar giros de 180 graus?",
    aboutText1: "Um giro de 180 graus é a maior rotação física realizada em um jogo de tiro. Segundo a Lei de Fitts (1954), o tempo de deslocamento cresce com a distância e o tamanho do alvo; portanto, o maior desafio é frear e cravar a mira na cabeça imediatamente após o giro.",
    aboutText2: "O simulador 180° Awareness Pro isola e desenvolve sua capacidade de processar estímulos visuais fora do ponto central. Diferente de treinos comuns de microajuste, este exercício exige amplitude espacial e rápida virada de mesa.",
    aboutText3: "Ao praticar giros amplos com regularidade, o cérebro conecta o espaço físico do mousepad ao espaço 3D do jogo, viabilizando reações instintivas contra inimigos nas costas em CS2 e Valorant."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <AwarenessDrillClient copy={copyPt} />

      <DrillGuide guide={awarenessGuidePt} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/180-degree-awareness"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
