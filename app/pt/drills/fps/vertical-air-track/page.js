import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Treino de Mira Vertical – Rastreamento Aéreo | SkillDrills',
  description: 'Treine mira vertical e rastreamento aéreo no navegador. Domine o controle no eixo Y e trajetórias parabólicas no Apex Legends e Overwatch 2 de graça.',
  keywords: [
    'treino de mira vertical',
    'mira vertical fps',
    'rastreamento aereo fps',
    'tracking vertical valorant',
    'treino de tracking apex legends',
    'mira eixo y',
    'controle de mouse vertical',
    'treino de pontaria aerea',
    'smooth pursuit vertical',
    'exercicio de mira fps',
    'sensibilidade vertical mouse',
    'treinador de mira gratis'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/fps/vertical-air-track',
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Treino de Mira Vertical – Rastreamento Aéreo | SkillDrills',
    description: 'Treine mira vertical e rastreamento aéreo no navegador. Domine o controle no eixo Y e trajetórias parabólicas no Apex Legends e Overwatch 2 de graça.',
    url: 'https://skilldrills.online/pt/drills/fps/vertical-air-track',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Mira Vertical – Rastreamento Aéreo | SkillDrills',
    description: 'Treine mira vertical e rastreamento aéreo no navegador. Domine o controle no eixo Y e trajetórias parabólicas no Apex Legends e Overwatch 2 de graça.',
  },
};

export default function VerticalAirTrackPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Air-Track", "item": "https://skilldrills.online/pt/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treinador de Mira Vertical FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Treinador online de controle de mira no eixo Y e perseguição suave de alvos aéreos com física gravitacional para Apex Legends e Overwatch 2."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vertical Air-Track – Rastreamento Vertical de Mira",
    "url": "https://skilldrills.online/pt/drills/fps/vertical-air-track",
    "browserRequirements": "Requires Pointer Lock API and WebGL support",
    "applicationCategory": "ShooterTraining",
    "creator": {
      "@type": "Organization",
      "name": "SkillDrills"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Vertical Air-Track",
    "description": "Simulador de rastreamento de alvos em arco parabólico no ar para aprimorar precisão motora vertical e velocidade de resposta anti-aérea.",
    "genre": ["First-Person Shooter", "Aim Trainer", "Reaction Training"],
    "playMode": "SinglePlayer",
    "gamePlatform": ["PC", "Web Browser"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o treino de mira vertical em jogos FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O treino de mira vertical isola o movimento do mouse no eixo Y (para cima e para baixo), um plano motor subtreinado em comparação ao eixo horizontal. É essencial para rastrear alvos voando, pulando ou caindo em jogos como Apex Legends e Overwatch 2."
        }
      },
      {
        "@type": "Question",
        "name": "O que é popcorn tracking e como este exercício o desenvolve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popcorn tracking é a habilidade de seguir alvos que saltam repetidamente em trajetórias parabólicas no ar. Este exercício condiciona a perseguição suave contínua e a predição da aceleração gravitacional no ápice do salto."
        }
      },
      {
        "@type": "Question",
        "name": "Como o treino vertical auxilia jogadores de Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends apresenta intensa mobilidade vertical: jump pads do Octane, elevadores gravitacionais da Horizon, tirolesas e ganchos do Pathfinder. Treinar o eixo Y permite disparar rajadas completas sem perder o alinhamento da retícula."
        }
      },
      {
        "@type": "Question",
        "name": "O que é um 'elevator peek' e como puni-lo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O elevator peek ocorre quando o adversário aproveita cordas, tirolesas ou desníveis de terreno para surgir de repente acima da sua mira. Este exercício treina a puxada rápida para cima e a sustentação do rastreamento na cabeça do inimigo."
        }
      },
      {
        "@type": "Question",
        "name": "Por que o rastreamento vertical é biomecanicamente mais difícil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O movimento horizontal usa a rotação natural do antebraço e flexão do pulso. Já o movimento vertical depende da extensão forçada do punho, contração dos dedos ou deslizamento do braço contra o atrito estático do mousepad."
        }
      },
      {
        "@type": "Question",
        "name": "Como jogadores de Overwatch 2 treinam contra heróis aéreos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Praticam perseguição vertical contra heróis como Pharah, Echo e Mercy, além de mergulhos rápidos de Winston ou Doomfist, desenvolvendo igualação de velocidade contínua no eixo Y."
        }
      },
      {
        "@type": "Question",
        "name": "O treino vertical tem impacto em Halo Infinite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, Halo Infinite utiliza man cannons, ganchos (grappleshot) e saltos com propulsores. O treino vertical garante o acerto de rajadas completas de Battle Rifle em Spartans no ar."
        }
      },
      {
        "@type": "Question",
        "name": "Como os erros são penalizados no Vertical Air-Track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perder o contato de rastreamento zera o multiplicador de combo ativo. Se a penalidade de tempo opcional estiver ativada, deixar um alvo atingir o chão sem destruí-lo desconta 0,6s do cronômetro."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a frequência semanal recomendada para treinos verticais?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões de 10 a 15 minutos, 3 a 4 vezes por semana, aumentam a resistência dos extensores do pulso e eliminam tremuras durante combates com desníveis acentuados."
        }
      },
      {
        "@type": "Question",
        "name": "Este treinador de mira vertical é gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, é 100% gratuito e open-source, rodando diretamente no navegador com tecnologia Pointer Lock e suporte nativo a sensibilidade de jogos competitivos sem instalações."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar Rastreamento de Mira Vertical no Navegador",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Ajustar Sensibilidade e Travar o Cursor",
        "text": "Defina o DPI e a sensibilidade idênticos aos do seu jogo principal e trave o ponteiro do mouse."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Interceptar o Lançamento do Alvo",
        "text": "Posicione o retículo na trajetória ascendente do alvo aéreo assim que ele for ejetado."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Acompanhar a Curvatura no Ápice Parabólico",
        "text": "Desacelere o movimento no topo da trajetória onde o alvo perde velocidade antes de iniciar a queda."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Acelerar na Fase de Descida Gravitacional",
        "text": "Aumente a velocidade vertical de puxada do mouse para acompanhar a aceleração de queda (g = 9.81 m/s²)."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Sustentar o Combo e Destruir Alvos",
        "text": "Mantenha o rastreamento ininterrupto para somar bônus de altura (+75) e atingir níveis com alvos mais velozes."
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "Guia de Mira Vertical FPS & Rastreamento Parabólico Aéreo",
    intro: [
      "O Vertical Aim Trainer (Vertical Air-Track) é um exercício avançado de controle motor projetado para isolar e aperfeiçoar a precisão no eixo Y, a antecipação de arcos gravitacionais e a interceptação de alvos no ar. Em jogos dinâmicos como Apex Legends, Overwatch 2, Halo Infinite e Destiny 2, adversários utilizam constantemente a verticalidade com jump pads, tirolesas, elevadores e quedas de desníveis para quebrar o posicionamento horizontal da retícula.",
      "A neurobiologia do rastreamento de perseguição vertical difere frontalmente do plano horizontal. Richard J. Krauzlis (2004) demonstrou que a perseguição suave vertical ativa circuitos específicos do vermis cerebelar e do tronco encefálico, apresentando maior propensão a tremuras mecânicas devido à assimetria musculoesquelética do braço. Cyril Rashbass (1961) provou que o smooth pursuit é impulsionado pelo erro de velocidade retiniana (retinal slip) e não por erro de posição estática, exigindo igualação contínua de velocidade.",
      "Rastrear entidades no ar exige internalizar a física gravitacional (g = 9,81 m/s²). Conforme documentado por Peter R. Cavanagh et al. (1984) e Michael F. Land & Peter McLeod (2000), o sistema motor visual antecipa a desaceleração no ápice do salto e a aceleração brusca durante a descida. Jogadores que não antecipam essa curvatura perdem o alvo repetidamente na queda.",
      "Como medimos o desempenho: cada quadro é mensurado pelo relógio de alta precisão performance.now() do navegador, inteiramente local no seu computador. Considerações técnicas: temporizadores de navegadores sofrem atenuação deliberada contra falhas Spectre (~1 ms) e telas quantizam os quadros (16,7 ms a 60 Hz, 6,9 ms a 144 Hz, 4,1 ms a 240 Hz; Woods et al., 2015). Diferenças menores que 5 ms refletem ruído comum de hardware."
    ],
    benchmarks: {
      title: "Padrões de Referência: Rastreamento Vertical e Tempo de Contato no Ar",
      headers: ["Nível Competitivo", "Tempo de Contato Útil", "Latência de Inversão", "Impacto em Partida Real"],
      rows: [
        ["Tier 1 (Predator / Grão-Mestre / Pro)", "> 82% Uptime", "Abaixo de 180 ms", "Rastreamento laser em alvos em tirolesas e voo; transição perfeita no ápice da parábola"],
        ["Tier 2 (Mestre Competitivo / Tier 2)", "70% – 82% Uptime", "180 – 230 ms", "Rastreamento constante; pequenas correções atrasadas quando o alvo inverte de direção"],
        ["Tier 3 (Diamante / Avançado)", "58% – 70% Uptime", "230 – 290 ms", "Bom controle na subida; perde o alvo com frequência na aceleração da queda livre"],
        ["Tier 4 (Platina / Ouro / Intermediário)", "45% – 58% Uptime", "290 – 360 ms", "Recorre a micro-flicks espasmódicos em vez de movimento suave contínuo no eixo Y"],
        ["Tier 5 (Prata / Bronze / Iniciante)", "< 45% Uptime", "Acima de 360 ms", "Bloqueio do pulso; retícula fica para trás de qualquer alvo em queda livre acelerada"]
      ],
      note: "O tempo de contato útil afere a porcentagem de permanência da mira dentro do raio do alvo durante o voo; a latência de inversão afere a resposta na mudança do ápice (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Clínicos para Dominar a Mira Vertical",
      items: [
        {
          name: "Equalização de Velocidade Retiniana no Eixo Y",
          desc: "Foque em igualar a velocidade angular da mão à do alvo em vez de fazer sucessivos micro-flicks (Rashbass, 1961; Krauzlis, 2004).",
          tips: "Mantenha o olhar fixo no centro da esfera aérea e deixe a mão deslizar em velocidade contínua sem trancos."
        },
        {
          name: "Desaceleração no Ápice e Aceleração na Queda",
          desc: "Preveja a perda de energia cinética no topo do arco e prepare a puxada descendente acelerada (Land & McLeod, 2000).",
          tips: "Suavize o movimento no ápice do pulo para garantir o bônus de altura (+75 PTS) antes da descida veloz."
        },
        {
          name: "Articulação Vertical: Dedos e Antebraço",
          desc: "Em pegadas claw ou fingertip, dobre ou estique os dedos para microajustes verticais rápidos sem mover a base da mão.",
          tips: "Para movimentos verticais amplos, deslize suavemente o antebraço pelo mousepad sem cravar o cotovelo na mesa."
        },
        {
          name: "Eliminação do Atrito Estático Vertical",
          desc: "Evite pressionar o mouse excessivamente contra a base, mantendo um deslizamento leve e constante no mousepad.",
          tips: "Se o mouse agarrar na subida, reduza o peso aplicado pela palma e limpe a superfície do mousepad."
        }
      ]
    },
    steps: [
      "Sincronize o DPI e a sensibilidade idênticos aos do seu jogo favorito e bloqueie o cursor com um clique.",
      "Acompanhe o lançamento do alvo aéreo na tela e posicione o retículo no centro do círculo.",
      "Mantenha a mira alinhada durante a fase ascendente para acumular multiplicadores de combo.",
      "Equalize a desaceleração no topo da parábola para capitalizar no bônus de pontuação no ápice.",
      "Acelere a puxada para baixo durante a descida livre até que o alvo seja completamente neutralizado."
    ],
    audience: "Jogadores competitivos de Apex Legends, Overwatch 2, Halo e Destiny 2 que buscam dominar alvos aéreos, ganchos, saltos parabólicos e eliminar a assimetria no eixo Y.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'rashbass1961', 'land2000'),
    related: [
      { href: "/pt/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit" },
      { href: "/pt/drills/fps/strafe-tracking", label: "Rastreamento de Strafe" },
      { href: "/pt/drills/fps/target-switching-swarm", label: "Target Switching Swarm" },
      { href: "/pt/drills/fps/target-acquisition", label: "Aquisição de Alvos FPS" },
      { href: "/pt/drills/fps/flow-state", label: "Flow State" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <VerticalAirTrackClient
        copy={{
          h1Keyword: "Treino de Mira Vertical FPS",
          h1Suffix: " – Rastreamento Aéreo e Controle no Eixo Y",
          statScore: "Pontos",
          statTime: "Tempo",
          statAccuracy: "Precisão",
          statBestScore: "Recorde",
          statTargetsDestroyed: "Alvos Destruídos",
          statMaxCombo: "Combo Máximo",
          statPeakLevel: "Nível Máximo",
          startTitle: "Vertical Air-Track",
          startSubtitle: "Entrada Raw de Hardware • Progressão Dinâmica de Níveis",
          pausedTitle: "Pausado",
          pausedSubtitle: "Clique para continuar – o bloqueio do cursor será reativado",
          stageCaption: "Rastreie alvos em trajetórias parabólicas no eixo Y sob efeito gravitacional para máxima precisão vertical.",
          rulesTitle: "Instruções do Exercício e Sistema de Pontos",
          aboutTitle: "Sobre o Treinador Vertical Air-Track",
          rulesItems: [
            {
              num: "1",
              text: "Rastrear Alvo Aéreo",
              highlight: "+100 PTS / +0,4s ao destruir",
              result: "Acompanhe a curva parabólica de forma contínua"
            },
            {
              num: "2",
              text: "Bônus de Altura",
              highlight: "Até +75 PTS de bônus",
              result: "Elimine alvos próximos ao ápice do lançamento"
            },
            {
              num: "3",
              text: "Regra de Penalidade",
              highlight: "Reset de combo ao perder contato",
              result: "Tocar o chão zera o combo (-0,6s se penalidade ativa)"
            },
            {
              num: "4",
              text: "Progressão de Nível",
              highlight: "+1 Nível a cada 1.500 PTS",
              result: "Velocidade vertical e gravidade aumentam gradualmente"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="pt"
        />
      </div>
    </>
  );
}
