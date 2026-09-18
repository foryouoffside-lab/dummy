import MicroCorrectionClient from '@/app/drills/fps/micro-correction-precision/MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Treino de Micro Correção de Mira – Headshots | SkillDrills",
  description: "Treine micro correção de mira e desaceleração terminal no navegador. Domine micro-ajustes finos e precisão de headshots para Valorant e CS2 gratuitamente.",
  keywords: [
    "treino de micro correcao mira",
    "micro ajuste mira valorant",
    "micro flicks cs2",
    "ajuste fino de mira mouse",
    "treinar precisao de headshot",
    "desaceleracao de mouse fps",
    "ajuste de mira tatica",
    "treinador de mira micro ajuste",
    "como melhorar micro ajuste valorant",
    "parada de mira cs2",
    "controle de micro movimento mouse",
    "mira de pixel valorant"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Micro Correção de Mira – Headshots | SkillDrills",
    description: "Treine micro correção de mira e desaceleração terminal no navegador. Domine micro-ajustes finos e precisão de headshots para Valorant e CS2 gratuitamente.",
    url: "https://skilldrills.online/pt/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Micro Correção de Mira – Headshots | SkillDrills",
    description: "Treine micro correção de mira e desaceleração terminal no navegador. Domine micro-ajustes finos e precisão de headshots para Valorant e CS2 gratuitamente.",
  },
};

export default function MicroCorrectionPage() {
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
        "name": "Micro Correção de Mira",
        "item": "https://skilldrills.online/pt/drills/fps/micro-correction-precision"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treinador de Micro Correção de Mira SkillDrills",
    "url": "https://skilldrills.online/pt/drills/fps/micro-correction-precision",
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
    "name": "Treino de Micro Correção de Mira",
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
    "name": "Micro-Correction Precision FPS Trainer",
    "description": "Simulador de treino de tiro tático para calibrar desaceleração terminal e micro-ajustes com ponteiro bruto.",
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
        "name": "O que é a desaceleração de mouse (frenagem motora) no tiro tático FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A desaceleração de mouse é a capacidade biomecânica de frear o momentum da mão de forma rápida e estável no final de um deslocamento rápido (flick). O domínio dessa frenagem neutraliza a inércia cinética, impedindo que a retícula ultrapasse a hitbox inimiga (overshoot) e permitindo o alinhamento no pixel exato da cabeça."
        }
      },
      {
        "@type": "Question",
        "name": "Por que os jogadores passam do alvo (overflick) em jogos como Valorant e CS2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O overflick ocorre quando o impulso balístico inicial gera mais energia cinética do que a musculatura da mão e a fricção do mousepad conseguem absorver. Geralmente decorre de sensibilidade excessivamente alta, tensão muscular exagerada no antebraço ou falta de coordenação entre os músculos flexores dos dedos para estabilizar a parada."
        }
      },
      {
        "@type": "Question",
        "name": "Como o modelo de movimento em dois componentes (Woodworth e Meyer) explica o micro-ajuste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formalizado por Robert S. Woodworth (1899) e aprimorado por Meyer et al. (1988), o modelo divide mira rápida em duas fases: uma fase balística aberta cobrindo aproximadamente 85% a 90% da distância, seguida por uma submovimentação corretiva fechada orientada por feedback visual imediato. É nessa fase final que os micro-ajustes decidem o acerto."
        }
      },
      {
        "@type": "Question",
        "name": "Como jogadores profissionais de Valorant e CS2 treinam micro-correções de mira?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profissionais combinam posicionamento prévio de mira (crosshair placement) com rotinas de isolamento de micro-ajustes. Eles focam em disparar apenas após a confirmação visual no alvo, controlando o mouse com movimentos mínimos dos nós dos dedos em vez de oscilações amplas do punho."
        }
      },
      {
        "@type": "Question",
        "name": "O que significa confirmação de alvo (target confirmation) antes do disparo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Confirmação de alvo é a fração de segundo cognitiva em que o córtex visual valida que a retícula está sobreposta à hitbox do adversário antes do disparo. Atirar precipitadamente durante o deslocamento gera disparos falhos por desvio balístico."
        }
      },
      {
        "@type": "Question",
        "name": "O treino de micro-correção realmente melhora a taxa de headshots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Em atiradores táticos, as hitboxes de cabeça ocupam ângulos visuais minúsculos (sub-graus). A habilidade de realizar pequenas correções de 5 a 20 pixels instantaneamente após o flick primário converte tiros no peito ou errados em headshots fatais imediatos."
        }
      },
      {
        "@type": "Question",
        "name": "A taxa de atualização do monitor (Hz) e o polling rate do mouse influenciam os micro-ajustes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monitores de alta frequência (144Hz a 360Hz) fornecem maior densidade temporal de quadros, diminuindo o atraso de exibição e proporcionando trajetórias de retícula mais nítidas. Taxas de sondagem de 1000Hz ou mais reduzem a latência de entrada do sensor para 1 ms ou menos, garantindo precisão sub-pixel sem atraso perceptível."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo treinar exercícios de micro-correção para evitar fadiga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões diárias focadas de 10 a 15 minutos antes de partidas ranqueadas são ideais. Períodos mais curtos e com alta concentração constroem memória neuromuscular sem causar fadiga nos músculos intrínsecos da mão e tendões do punho."
        }
      },
      {
        "@type": "Question",
        "name": "Qual empunhadura de mouse (Fingertip, Claw, Palm) favorece ajustes finos com as pontas dos dedos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Empunhaduras Claw (garra) e Fingertip (pontas dos dedos) oferecem maior liberdade para micro-ajustes verticais e horizontais, pois a base da palma não bloqueia o deslizamento do mouse e os dedos mantêm amplitude total de flexão e extensão."
        }
      },
      {
        "@type": "Question",
        "name": "Por que erros de clique ou tempo esgotado zeram o combo neste treinador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O reset de combo impõe uma disciplina tática rígida: em atiradores competitivos, atirar no vazio denuncia sua posição e acarreta eliminação instantânea. A mecânica de penalidade condiciona o jogador a valorizar precisão absoluta sobre cliques aleatórios sem controle."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Praticar Micro Correção de Mira com Precisão",
    "description": "Protocolo metódico para isolar desaceleração terminal e executar ajustes finos de mira em atiradores táticos.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibração e Bloqueio de Ponteiro",
        "text": "Configure sua sensibilidade e DPI reais para manter correspondência muscular 1:1 e ative o Pointer Lock no navegador."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Disparo no Alvo Âncora",
        "text": "Clique no alvo primário central para ativar o micro-alvo periférico adjacente."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Frenagem e Micro-Ajuste com os Dedos",
        "text": "Mova a retícula cobrindo 90% do percurso, freie bruscamente e use a ponta dos dedos para centralizar o micro-alvo."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Confirmação Visual e Finalização",
        "text": "Confirme visualmente o alinhamento da mira no centro do micro-alvo antes de disparar, mantendo cadência constante."
      }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Micro Correção de Mira",
    h1Suffix: " – Precisão de Headshot FPS",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    statAvgCorrection: "Correção Média",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nível Máximo",
    startTitle: "Treino de Micro Correção de Mira",
    startSubtitle: "Entrada Bruta de Hardware • Progressão Contínua e Desaceleração",
    getReady: "PREPARE-SE",
    toggleFlash: "Alternar Flash de Erro",
    toggleSound: "Alternar Efeitos Sonoros",
    pausedTitle: "Jogo Pausado",
    pausedSubtitle: "Clique na tela para reengajar a trava de cursor do mouse.",
    stageCaption: "Clique no alvo âncora e ajuste instantaneamente a retícula com os dedos para acertar o micro-alvo.",
    rulesTitle: "Instruções do Treino e Sistema de Pontos",
    rulesItems: [
      { num: "1", text: "Acertar Âncora", highlight: "+10 pts (+0,2s)", result: "Libera o micro-alvo periférico" },
      { num: "2", text: "Acertar Micro-Alvo", highlight: "até +585 pts (+0,2s)", result: "Escala com precisão e multiplicador de combo" },
      { num: "3", text: "Subida de Nível", highlight: "a cada 1.400 pontos", result: "Alvos reduzem progressivamente de tamanho" },
      { num: "4", text: "Erro / Tempo Esgotado", highlight: "Penalidade", result: "Reseta o multiplicador de combo instantaneamente" }
    ],
    aboutTitle: "Sobre a Micro Correção de Mira",
    aboutHeading: "O que é a Micro Correção de Mira?",
    aboutText: "A maioria dos movimentos de mira não ocorre em um único impulso, mas em dois: um deslocamento balístico inicial e um micro-ajuste corretivo guiado visualmente (Woodworth, 1899; Meyer et al., 1988). Este treino isola e condiciona essa segunda fase, onde a precisão de headshots é realmente definida."
  };

  const microCorrectionGuide = {
    heading: "Guia de Micro Correção de Mira & Cronometria de Precisão",
    intro: [
      "O Treinador de Micro Correção de Mira é um exercício sensório-motor empírico desenvolvido para isolar, calibrar e aperfeiçoar a fase secundária de correção do apontamento visual. Em jogos de tiro tático de alto rendimento como Valorant, Counter-Strike 2 e Rainbow Six Siege, confrontos competitivos são frequentemente decididos por desvios milimétricos de apenas 5 a 25 pixels.",
      "A estrutura científica subjacente aos movimentos manuais direcionados foi formulada pioneiramente por Robert S. Woodworth (1899) em seu modelo clássico de dois componentes: um impulso balístico primário em circuito aberto que projeta o membro na direção aproximada do estímulo, seguido por uma fase de controle visual de circuito fechado governada por feedback contínuo. Esse compromisso entre velocidade e precisão foi matematizado pela Lei de Fitts (1954), em que o tempo de movimento escala com a distância e o tamanho do alvo.",
      "Mais tarde, David E. Meyer et al. (1988) apresentaram o Modelo de Submovimentos Otimizados Estocásticos, comprovando que o cérebro planeja os deslocamentos para pousar ligeiramente aquém do alvo ou em sua borda, dependendo de micro-movimentos refinados para resolver discrepâncias de coordenadas sem sofrer com oscilações inerciais descontroladas.",
      "Durante a fase de fixação foveal terminal, os olhos realizam microssacadas — pequenos movimentos oculares involuntários de alta frequência (Rolfs, 2009; Martinez-Conde et al., 2004) — para centralizar a retina e recalibrar o mapa espacial. Este treinador combina a API de Pointer Lock com cronometria de alta precisão via performance.now() (Woods et al., 2015) para eliminar oscilações no final do movimento e consolidar headshots cirúrgicos com consistência profissional.",
      "Como é medido: cada disparo e correção é registrado localmente no relógio de alta precisão do navegador em tempo real. Diferenças inferiores a 5 ms devem ser interpretadas como tolerância técnica de hardware (taxas de atualização e variação de polling de mouse)."
    ],
    benchmarks: {
      title: "Tiers de Latência de Micro Correção e Aquisição de Alvo",
      headers: ["Nível de Desempenho", "Janela de Latência de Correção", "Mecânica de Controle Motor", "Implicação Competitiva no Jogo"],
      rows: [
        ["Tier 1 (Precisão Ápice)", "Abaixo de 280 ms", "Frenagem quase instantânea; micro-ajustes com os dedos executados sem oscilações de overflick", "Conversão letal de primeiro tiro no Radiant, CS2 Faceit 10 e lobbies profissionais"],
        ["Tier 2 (Pro Competitivo)", "280 – 340 ms", "Frenagem muscular disciplinada; transição suave do flick primário para o micro-ajuste final", "Vence duelos contra peeks agressivos; extrema consistência em alvos minúsculos"],
        ["Tier 3 (Alto Nível FPS)", "340 – 420 ms", "Boa aquisição de alvos; ocasionais desvios de 10 a 15px demandando submovimento duplo", "Alto rendimento tático; leve hesitação ao corrigir alvos com desnível vertical"],
        ["Tier 4 (Intermediário)", "420 – 520 ms", "Desaceleração frouxa; tendência de arrastar o mouse além da borda antes de iniciar a correção", "Vulnerável a strafes rápidos; dificuldade em transferências de tiro imediatas"],
        ["Tier 5 (Em Desenvolvimento)", "520 ms+", "Momentum balístico excessivo com overshoot acentuado; atraso na confirmação visual", "Frequentemente ultrapassa alvos em confrontos diretos; necessidade de reajustes amplos"]
      ],
      note: "Latências representam o tempo combinado de desaceleração, confirmação visual, micro-ajuste e clique registrado via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Aperfeiçoar Frenagem e Micro-Mira",
      items: [
        {
          name: "Frenagem Muscular Terminal e Atrito do Mousepad",
          desc: "Em vez de deixar o mouse deslizar solto após o flick, pressione levemente o mouse contra o tecido do mousepad ou encoste as pontas dos dedos anelar e mínimo na superfície para criar atrito mecânico imediato no perímetro do alvo.",
          tips: "Mousepads híbridos com fricção de parada controlada ajudam na frenagem sem comprometer o deslizamento inicial."
        },
        {
          name: "Cadência de Mira em Duas Fases",
          desc: "Conscientize-se do ritmo duplo: um flick rápido e relaxado cobrindo 90% da distância, seguido por um toque sutil e preciso. Nunca force o clique antes de confirmar o alinhamento visual.",
          tips: "Evite clicar no desespero junto com o flick; desassocie o movimento da mão do clique do gatilho."
        },
        {
          name: "Articulação das Pontas dos Dedos para Micro-Desvios",
          desc: "Utilize o pulso e o antebraço apenas para o deslocamento amplo, reservando a flexão e extensão das pontas dos dedos para corrigir os últimos 5 a 20 pixels.",
          tips: "Adote uma pegada Claw ou Fingertip relaxada que preserve a mobilidade vertical e horizontal sob a palma da mão."
        },
        {
          name: "Fixação Visual com Microssacadas",
          desc: "Fixe os olhos no pixel central da cabeça do inimigo antes de o cursor chegar. Segundo a psicofísica visual (Rolfs, 2009), adiantar o olhar instrui o córtex pré-motor com as coordenadas exatas de correção.",
          tips: "Mantenha o foco visual estritamente no centro do alvo — não fique olhando para a sua própria retícula viajar na tela."
        }
      ]
    },
    steps: [
      "Ajuste seu jogo, DPI e sensibilidade exata nas configurações de sessão para assegurar correspondência muscular idêntica de cm/360, travando o ponteiro.",
      "Ao surgir o alvo âncora, execute um movimento inicial até a área aproximada do alvo cobrindo a maior parte do percurso.",
      "Aplique frenagem muscular imediata, realize o micro-ajuste com a ponta dos dedos no centro do micro-alvo, confirme visualmente e dispare.",
      "Mantenha o ritmo sem precipitar disparos imprecisos, preservando seu multiplicador de combo e avançando pelos níveis mais desafiadores."
    ],
    audience: "Jogadores de FPS tático em Valorant, CS2 e Rainbow Six Siege que buscam precisão mortal no primeiro tiro, eliminação de sobre-alcance e domínio motor sub-grau.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/pt/drills/fps/angle-hold-trainer", label: "Treinador de Marcação de Ângulo" },
      { href: "/pt/drills/fps/instant-response", label: "Resposta Instantânea" }
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

      <MicroCorrectionClient copy={copyPt} />

      <DrillGuide guide={microCorrectionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/micro-correction-precision"
          locale="pt"
        />
      </div>
    </>
  );
}
