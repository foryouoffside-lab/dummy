import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Treino de Priorização de Alvos – Mira FPS | SkillDrills",
  description: "Treine priorização de alvos, avaliação de ameaças e disciplina de gatilho no navegador. Domine a mira decisiva para Valorant e CS2 gratuitamente.",
  keywords: [
    "treino de priorizacao de alvos",
    "priorizacao de alvos fps",
    "avaliacao de ameacas fps",
    "controle de impulso tiro",
    "como escolher alvo no tiroteio",
    "treino de tomada de decisao fps",
    "disciplina de gatilho fps",
    "selecao de alvos valorant",
    "treinador de mira cognitiva",
    "identificacao de alvos shooter",
    "treino de reflexo go no go",
    "exercicio de priorizacao de alvos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Priorização de Alvos – Mira FPS | SkillDrills",
    description: "Treine priorização de alvos, avaliação de ameaças e disciplina de gatilho no navegador. Domine a mira decisiva para Valorant e CS2 gratuitamente.",
    url: "https://skilldrills.online/pt/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Priorização de Alvos – Mira FPS | SkillDrills",
    description: "Treine priorização de alvos, avaliação de ameaças e disciplina de gatilho no navegador. Domine a mira decisiva para Valorant e CS2 gratuitamente.",
  },
};

export default function TargetPrioritizationPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Priorização de Alvos", "item": "https://skilldrills.online/pt/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treino de Priorização de Alvos FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Treinador cognitivo de priorização de alvos, tomada de decisão sob pressão e inibição motora de disparo (Go/No-Go) para jogos de tiro competitivo.",
    "genre": "Treinamento FPS / Mira Cognitiva e Decisão",
    "url": "https://skilldrills.online/pt/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treino de Priorização de Alvos FPS",
    "url": "https://skilldrills.online/pt/drills/fps/target-prioritization",
    "description": "Treinador cognitivo de priorização de alvos, tomada de decisão sob pressão e inibição motora de disparo (Go/No-Go) para jogos de tiro competitivo.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requer suporte a HTML5 Canvas e Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Treino de Priorização de Alvos FPS",
    "url": "https://skilldrills.online/pt/drills/fps/target-prioritization",
    "description": "Treinador cognitivo de priorização de alvos, tomada de decisão sob pressão e inibição motora de disparo (Go/No-Go) para jogos de tiro competitivo.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Treinamento FPS", "Aim Trainer", "Priorização de Alvos"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é priorização de alvos em jogos de tiro FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Priorização de alvos é o processo cognitivo executivo de avaliar instantaneamente múltiplos adversários em tela, determinar qual representa maior perigo imediato e abatê-lo primeiro, enquanto retém o disparo contra alvos secundários e aliados."
        }
      },
      {
        "@type": "Question",
        "name": "Por que os jogadores atiram em pânico no alvo errado durante tiroteios?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Com a descarga de adrenalina, o sistema visual recorre a reflexos orientados por estímulos primários, atirando no objeto mais próximo em vez da ameaça mais letal. O treino de inibição executiva estabiliza o córtex pré-frontal sob estresse."
        }
      },
      {
        "@type": "Question",
        "name": "Como o paradigma cognitivo Go/No-Go se aplica ao tiro tático?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formulado por Franciscus Donders (1868), o teste Go/No-Go avalia a capacidade de disparar rapidamente diante de estímulos válidos e suprimir o clique diante de estímulos neutros ou aliados, impedindo o fogo amigo e o desperdício de munição."
        }
      },
      {
        "@type": "Question",
        "name": "O que é o Tempo de Reação com Sinal de Parada (SSRT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O SSRT (Logan & Cowan, 1984) mede o tempo necessário para cancelar uma ordem motora já iniciada. Em shooters, jogadores de elite conseguem abortar o clique em cerca de 200–240 ms ao perceberem que a mira estava indo para um aliado ou chamariz."
        }
      },
      {
        "@type": "Question",
        "name": "Como jogadores profissionais ordenam ameaças em invasões de área?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profissionais ranqueiam alvos pela linha de visão direta, letalidade da arma do inimigo e tempo para disparar. Inimigos que já estão mirando e atirando são eliminados com prioridade máxima sobre inimigos correndo ou de costas."
        }
      },
      {
        "@type": "Question",
        "name": "O que é supressão de distratores na neurociência da visão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o mecanismo de atenção seletiva pelo qual o córtex visual inibe intencionalmente respostas a estímulos irrelevantes (Treisman, 1980), permitindo fixar a fóvea no alvo crítico sem ser enganado por movimentos periféricos."
        }
      },
      {
        "@type": "Question",
        "name": "Qual o custo de disparar em aliados ou chamarizes no Valorant e CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atirar em chamarizes (como clones do Yoru ou bonecos de distração) revela sua posição acústica, consome balas essenciais e desvia a mira da ameaça real, resultando frequentemente em morte imediata."
        }
      },
      {
        "@type": "Question",
        "name": "Qual sensibilidade de mouse favorece a seleção precisa de ameaças?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uma sensibilidade média a moderadamente baixa (30 a 42 cm por 360°) fornece poder de frenagem superior, evitando que o cursor deslize acidentalmente para o alvo errado em formações densas."
        }
      },
      {
        "@type": "Question",
        "name": "Por que a adrenalina elevada prejudica a tomada de decisão tática?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A ativação simpática intensa gera visão em túnel e prejudica a memória de trabalho, reduzindo a capacidade de processar simultaneamente múltiplos alvos sem treino cognitivo específico."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo treinar a priorização cognitiva de alvos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Praticar 10 minutos de priorização e controle de impulso antes das partidas competitivas calibra o tempo de decisão e a disciplina de gatilho sem fadigar a musculatura da mão."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Dominar a Priorização de Alvos e Disciplina de Gatilho",
    "description": "Procedimento passo a passo para calibrar a sensibilidade, avaliar ameaças e eliminar alvos na hierarquia correta.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrar Hardware e Sensibilidade 1:1",
        "text": "Configure seu DPI e sensibilidade idênticos ao jogo principal nas opções da sessão para manter memória muscular precisa.",
        "url": "https://skilldrills.online/pt/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Identificar Hierarquia de Cores das Ameaças",
        "text": "Mapeie mentalmente os alvos vermelhos como prioridade máxima (+100 PTS), amarelos como secundários (+50 PTS) e verdes como aliados proibidos.",
        "url": "https://skilldrills.online/pt/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Eliminar Ameaças Vermelhas Imediatas",
        "text": "Execute flicks precisos diretamente nos alvos vermelhos antes que seus cronômetros expirem e causem penalidade.",
        "url": "https://skilldrills.online/pt/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Exercer Inibição de Disparo em Aliados Verdes",
        "text": "Reprema ativamente qualquer impulso de clique ao passar a mira sobre alvos verdes para preservar seu combo.",
        "url": "https://skilldrills.online/pt/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "Guia de Priorização de Alvos FPS e Biomecânica da Decisão sob Pressão",
    intro: [
      "O Treino de Priorização de Alvos é um simulador de tomada de decisão perceptual-cognitiva desenvolvido para condicionar a avaliação instantânea de ameaças, filtragem de atenção e inibição motora de disparo. Em jogos táticos de tiro contemporâneos — sobretudo Valorant, Counter-Strike 2, Rainbow Six Siege e Apex Legends — os confrontos com múltiplos adversários são resolvidos pela ordem de engajamento: o jogador que neutraliza a ameaça mais perigosa primeiro sobrevive.",
      "A base neuropsicológica da inibição da resposta motora foi elucidada por Gordon D. Logan & William B. Cowan (1984) no clássico modelo horse-race: quando um sinal de parada surge, o processo de inibição compete contra o processo motor em andamento. Cancelar um tiro já planejado exige circuitos neurais específicos no córtex pré-frontal e gânglios da base, explicando por que atirar em pânico é tão comum entre amadores.",
      "Expandindo os fundamentos da cronometria mental de Franciscus Cornelis Donders (1868/1969) sobre tempos de reação de escolha e a teoria de integração de características de Anne Treisman & Garry Gelade (1980), este exercício força o cérebro a classificar alvos visualmente por nível de perigo antes de liberar a ordem motora para o dedo disparar.",
      "Ao incorporar o modelo de atenção de Michael I. Posner (1990), os paradigmas de rastreamento espacial de C. Shawn Green & Daphne Bavelier (2003) e cronometria digital de baixa latência (Woods et al., 2015), o treino extingue o disparo por impulso e desenvolve mira tática de alto nível.",
      "Como isto é medido: cada disparo é cronometrado com precisão milissegunda via performance.now() no seu navegador de forma puramente local. Fatores de hardware: temporizadores web possuem granularidade típica de 1 ms, e telas atualizam em intervalos de 16,7 ms (60 Hz), 6,9 ms (144 Hz) e 4,1 ms (240 Hz). O polling rate do mouse soma cerca de 8 ms a 125 Hz contra 1 ms a 1000 Hz (Woods et al., 2015). Avalie seu progresso na mesma máquina."
    ],
    benchmarks: {
      title: "Padrões Científicos de Avaliação de Ameaças e Latência de Decisão",
      headers: ["Nível de Desempenho", "Latência de Resolução", "Precisão de Prioridade", "Impacto Competitivo no Jogo"],
      rows: [
        ["Tier 1 (Apex Commander / Radiant)", "<280 ms", "96% – 99%+", "Avaliação perfeita de ameaças; eliminação imediata do perigo principal com 0% de fogo amigo em avanços caóticos"],
        ["Tier 2 (Mestre Competitivo / Pro Tier-2)", "280 – 340 ms", "90% – 96%", "Velocidade de decisão excepcional; rápida recuperação após escalada de alvos; menos de 1% de disparos errôneos"],
        ["Tier 3 (Diamante / Ascendente)", "340 – 420 ms", "82% – 90%", "Engajamento sólido de prioridades; hesitação leve de 60 a 90 ms quando alvos vermelhos e amarelos surgem próximos"],
        ["Tier 4 (Intermediário / Ouro / Platina)", "420 – 520 ms", "72% – 82%", "Vulnerável a disparos em pânico; por vezes atinge alvos verdes aliados ou atira em amarelos antes de limpar vermelhos"],
        ["Tier 5 (Iniciante / Disparo por Impulso)", ">520 ms", "<72%", "Erros frequentes de impulso; alto índice de fogo amigo; dificuldade em filtrar poluição visual durante retakes"]
      ],
      note: "A latência de resolução mede o tempo transcorrido entre o surgimento do estímulo de alto perigo e o clique validado; a precisão de prioridade reflete eliminações válidas divididas pelo total de disparos (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Aperfeiçoar a Priorização",
      items: [
        {
          name: "Inibição Executiva de Resposta (Disciplina Go/No-Go)",
          desc: "Treine a supressão voluntária do clique imediato ao avistar um alvo. Condicione o dedo indicador a aguardar a confirmação da cor pelo córtex visual antes de pressionar o interruptor do mouse.",
          tips: "Mantenha o dedo levemente relaxado sobre o botão esquerdo, sem exercer pressão prévia involuntária."
        },
        {
          name: "Varredura Dinâmica da Hierarquia de Ameaças",
          desc: "Varra o cenário buscando primeiro a assinatura visual de maior perigo (vermelho). Neutralize a ameaça urgente antes de direcionar a atenção aos alvos em contagem regressiva (amarelo).",
          tips: "Elimine alvos vermelhos antes de considerar qualquer outra ação; trate os amarelos como perigo em incubação."
        },
        {
          name: "Supressão Periférica de Distratores",
          desc: "Aprenda a ignorar estímulos neutros ou aliados verdes que surgem na periferia do seu campo visual, mantendo a fóvea focada no corredor de alvos hostis.",
          tips: "Não desvie a mira para alvos verdes mesmo que surjam perto da sua retícula."
        },
        {
          name: "Mira Balística Cadenciada com Parada Firme",
          desc: "Execute cada flick como um movimento deliberado e cadenciado. Acelere velozmente até o centro do alvo prioritário e freie com firmeza no mousepad.",
          tips: "Prefira um flick firme e controlado a movimentos frenéticos sem confirmação visual de cor."
        }
      ]
    },
    steps: [
      "Configure seu jogo de preferência, DPI e sensibilidade exata nas opções de sessão para manter a paridade física 1:1.",
      "Fixe a atenção no centro da tela e aguarde a aparição simultânea de alvos vermelhos, amarelos e verdes.",
      "Localize e elimine os alvos vermelhos de alta prioridade com disparos rápidos (+100 PTS / +0,4s de bônus).",
      "Neutralize os alvos amarelos intermediários (+50 PTS / +0,4s) antes que escalem para a cor vermelha.",
      "Preserve o gatilho intacto diante de alvos verdes aliados; disparar contra verdes ou errar zera seu multiplicador de combo."
    ],
    audience: "Jogadores competitivos de Valorant, Counter-Strike 2, Rainbow Six Siege e Apex Legends que buscam eliminar disparos por impulso, aprimorar a disciplina de tiro e dominar confrontos caóticos com múltiplos inimigos.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/pt/drills/fps/target-acquisition", label: "Treino de Aquisição de Alvos" },
      { href: "/pt/drills/fps/target-switching-swarm", label: "Treino de Target Switching Swarm" },
      { href: "/pt/drills/fps/vertical-air-track", label: "Treino de Rastreamento Aéreo Vertical" },
      { href: "/pt/drills/fps/strafe-tracking", label: "Treino de Strafe Tracking" },
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Priorização de Alvos",
    h1Suffix: " – Tomada de Decisão FPS",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    statThreatsCleared: "Ameaças Eliminadas",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nível Máximo",
    startTitle: "Priorização de Alvos Pro",
    startSubtitle: "Avaliação de Ameaças · Filtragem Cognitiva · Dificuldade Dinâmica",
    getReady: "PREPARE-SE",
    toggleFlash: "Alternar Flash de Erro",
    toggleSound: "Alternar Áudio",
    pausedTitle: "Jogo Pausado",
    pausedSubtitle: "Clique para retomar — o bloqueio do cursor será reativado.",
    stageCaption: "Elimine primeiro os alvos vermelhos de maior ameaça e depois os amarelos. Segure o disparo contra aliados verdes!",
    rulesTitle: "Instruções do Treino e Sistema de Pontos",
    rulesItems: [
      { num: "1", text: "Ameaça Primária", highlight: "Vermelho (+100 PTS / +0,4s)", result: "Deve ser eliminada com prioridade absoluta" },
      { num: "2", text: "Ameaça Secundária", highlight: "Amarelo (+50 PTS / +0,4s)", result: "Escala para vermelho se não for neutralizada" },
      { num: "3", text: "Aliado Verde", highlight: "Verde (NÃO ATIRAR)", result: "Disparo amigo, alvo errado ou erro zera o combo" },
      { num: "4", text: "Evolução de Nível", highlight: "A cada 1.400 PTS +1 Nível", result: "Aumento contínuo de densidade e ritmo de alvos" }
    ],
    aboutTitle: "Sobre a Priorização de Alvos no FPS",
    aboutHeading: "O que é Priorização de Alvos?",
    aboutText: "Priorização de alvos é a capacidade executiva de escolher em frações de segundo qual ameaça abater primeiro enquanto retém o tiro contra todo o resto. Interromper uma ação motora já iniciada é um processo biológico próprio que compete com a ordem de disparo (Logan & Cowan, 1984) — razão pela qual segurar o tiro é mais difícil do que disparar."
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
      <TargetPrioritizationClient copy={copyPt} />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="pt"
        />
      </div>
    </>
  );
}
