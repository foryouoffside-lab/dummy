import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Target Switching FPS – Troca Rápida de Alvos | SkillDrills',
  description: 'Treine target switching e troca rápida de alvos no navegador. Elimine o atraso de confirmação e domine spray transfers no Valorant e CS2 gratuitamente.',
  keywords: [
    'treino de target switching',
    'troca de alvos fps',
    'target switching aim trainer',
    'treino de mira valorant',
    'spray transfer cs2',
    'mira multi alvos',
    'flick continuo fps',
    'treino de pontaria online',
    'troca de alvos rapida',
    'exercicio de mira fps',
    'sensibilidade de mira',
    'treinador de mira gratis'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/fps/target-switching-swarm',
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Target Switching FPS – Troca Rápida de Alvos | SkillDrills',
    description: 'Treine target switching e troca rápida de alvos no navegador. Elimine o atraso de confirmação e domine spray transfers no Valorant e CS2 gratuitamente.',
    url: 'https://skilldrills.online/pt/drills/fps/target-switching-swarm',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Switching FPS – Troca Rápida de Alvos | SkillDrills',
    description: 'Treine target switching e troca rápida de alvos no navegador. Elimine o atraso de confirmação e domine spray transfers no Valorant e CS2 gratuitamente.',
  },
};

export default function TargetSwitchingSwarmPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm", "item": "https://skilldrills.online/pt/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treinador de Target Switching FPS SkillDrills",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any (Web Browser)",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Treinador online gratuito de target switching e troca rápida de alvos para jogos de tiro competitivo (CS2, Valorant, Apex Legends)."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Target Switching Swarm – Treino de Mira FPS",
    "url": "https://skilldrills.online/pt/drills/fps/target-switching-swarm",
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
    "name": "Target Switching Swarm",
    "description": "Simulador dinâmico de enxame de alvos para treinar velocidade de transição motora, mitigação de hesitação e spray transfers.",
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
        "name": "O que é target switching no treino de mira para FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Target switching (troca de alvos) é a habilidade mecânica de eliminar um alvo e transitar instantaneamente a mira para o próximo alvo hostil sem pausa perceptiva ou retorno ao ponto neutro. É essencial para vencer confrontos 1vX e situações de clutch."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença entre target switching e um flick shot convencional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O flick shot convencional foca em uma única transição balística a partir de uma postura neutra. O target switching exige encadear múltiplos flicks contínuos com desaceleração precisa nos limites do alvo, absorvendo a inércia do movimento sem pausas de confirmação."
        }
      },
      {
        "@type": "Question",
        "name": "Como o formato de enxame (swarm) melhora a taxa de multi-kills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No formato swarm, múltiplos alvos aparecem simultaneamente com tempos de vida limitados. Isso condiciona a visão periférica a pré-rotear a próxima trajetória antes do tiro atual terminar, desenvolvendo indexação visual e eliminação em cadeia."
        }
      },
      {
        "@type": "Question",
        "name": "Por que muitos jogadores hesitam após eliminar um inimigo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essa hesitação de 100 a 250 ms ocorre quando o cérebro aguarda o feedback visual ou sonoro de confirmação da eliminação antes de iniciar a busca visual do próximo alvo. O treino repetitivo desacopla a confirmação do início do próximo movimento sacádico."
        }
      },
      {
        "@type": "Question",
        "name": "O target switching auxilia no spray transfer de CS2 e Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, diretamente. O spray transfer exige transferir a rajada de tiros entre dois adversários em fração de segundo. O target switching automatiza a cinemática muscular necessária para redirecionar a mira no ângulo exato do segundo oponente sem interrupção."
        }
      },
      {
        "@type": "Question",
        "name": "Quais jogos competitivos mais exigem excelência em troca de alvos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Counter-Strike 2, Valorant, Apex Legends, Overwatch 2 e Call of Duty Warzone. Em jogos táticos, decide clutches com disparos únicos; em jogos com alto time-to-kill (TTK), permite alternar o fogo imediatamente após a quebra de escudo."
        }
      },
      {
        "@type": "Question",
        "name": "Qual pegada de mouse proporciona o melhor desempenho em target switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As pegadas Claw grip e Fingertip grip são ideais porque preservam a mobilidade dos dedos e do pulso para microcorreções rápidas de frenagem, enquanto o antebraço cuida de transições amplas de grande amplitude angular."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a relação entre target switching e a Lei de Fitts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Lei de Fitts (Fitts, 1954) dita que o tempo de movimento depende da distância e da largura do alvo. No target switching, os jogadores aprendem a escolher trajetórias com menor índice de dificuldade (alvos adjacentes), reduzindo o tempo total do ciclo de disparos."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo praticar o exercício de target switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões diárias de 10 a 15 minutos são ideais. Praticar antes das partidas competitivas ativa a coordenação neuromotora e a prontidão sacádica dos olhos, garantindo reflexos afiados sem gerar fadiga no antebraço."
        }
      },
      {
        "@type": "Question",
        "name": "Este treinador de target switching é gratuito e seguro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, é 100% gratuito, sem download e roda diretamente no navegador via Pointer Lock API com suporte total a sensibilidade de jogos competitivos. Nenhuma métrica privada ou dado pessoal é coletado."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar Target Switching e Troca Rápida de Alvos no Navegador",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Configurar Sensibilidade e Travar o Cursor",
        "text": "Ajuste o DPI e a sensibilidade idêntica à do seu jogo principal nas configurações e clique para bloquear o cursor do mouse."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Mapear Grupos de Alvos por Proximidade",
        "text": "Faça uma varredura visual rápida do enxame para identificar pares ou grupos de alvos com menor separação angular."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Eliminar o Primeiro Alvo e Ganhar Tempo Bônus",
        "text": "Dispare com precisão no primeiro alvo para somar +100 pontos e adicionar +0,35s ao temporizador de sobrevivência."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Transitar Imediatamente sem Pausa de Confirmação",
        "text": "Lance a mira em direção ao próximo alvo enquanto o tiro anterior ainda é registrado, eliminando a hesitação pós-abate."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Construir Multiplicadores de Combo e Avançar Níveis",
        "text": "Mantenha a sequência de eliminações ininterrupta para elevar os combos multiplicadores e desbloquear níveis com maior velocidade."
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "Guia de Target Switching & Cinemática de Múltiplos Alvos em FPS",
    intro: [
      "O Target Switching Swarm é um exercício avançado de controle motor e indexação visual projetado para condicionar transições ultravelozes e sem hesitação entre múltiplos alvos inimigos. Em jogos de tiro tático como Counter-Strike 2 e Valorant, e em battle royales dinâmicos como Apex Legends, confrontos de equipe raramente se limitam a duelos 1v1 isolados. Vencer rounds decisivos requer abater um primeiro adversário e instantaneamente transferir a mira para um segundo oponente sem qualquer atraso cognitivo pós-kill.",
      "A psicofísica da troca de alvos é regida pela Lei de Fitts (Fitts, 1954) e pelo modelo estocástico de submovimentos otimizados desenvolvido por David E. Meyer et al. (1988). Sob essa ótica biomecânica, um movimento de mira compõe-se de um submovimento balístico primário que cobre aproximadamente 90% da distância, seguido por microcorreções secundárias guiadas por feedback visual. Jogadores iniciantes desperdiçam entre 100 e 250 ms paralisados após cada abate esperando a animação de morte sumir. Jogadores de elite iniciam a sacada ocular para o próximo alvo antes mesmo que o clique do alvo anterior seja completamente processado pelo monitor.",
      "A indexação visual em enxames densos apoia-se em mecanismos de integração de características e busca visual pré-atencional (Anne M. Treisman & Garry Gelade, 1980; Jeremy M. Wolfe, 2007). O córtex visual humano consegue rastrear múltiplos pontos espaciais concorrentes por meio da indexação visual (teoria FINST), permitindo que você trace rotas cinemáticas otimizadas entre agrupamentos de alvos, minimizando o esforço muscular e a distância angular percorrida pela mão.",
      "Como medimos seu desempenho: cada evento é registrado com o relógio de alta resolução performance.now() do navegador, inteiramente local no seu dispositivo — nenhum dado pessoal é transmitido. Fatores de hardware: os temporizadores dos navegadores possuem arredondamento intencional de proteção contra o Spectre (~1 ms) e monitores quantizam os quadros (16,7 ms a 60 Hz, 6,9 ms a 144 Hz, 4,1 ms a 240 Hz; Woods et al., 2015). O polling rate do mouse adiciona cerca de 8 ms a 125 Hz contra 1 ms a 1000 Hz. Diferenças inferiores a 5 ms devem ser interpretadas como margem de hardware."
    ],
    benchmarks: {
      title: "Padrões de Referência: Target Switching e Latenência de Transição",
      headers: ["Nível de Habilidade", "Tempo de Transição", "Taxa de Eliminação (Alvos/Min)", "Impacto Prático Competitivo"],
      rows: [
        ["Tier 1 (Radiante / Faceit Nível 10 / Pro)", "Abaixo de 210 ms", "110+ Alvos/min", "Spray transfers impecáveis; zero atraso de confirmação; clutches 1v3 resolvidos com facilidade"],
        ["Tier 2 (Imortal / Faceit 8-9 / Mestre)", "210 – 260 ms", "92 – 110 Alvos/min", "Sequenciamento de alvos limpo; leve oscilação em ângulos extremos; excelente taxa de trade de abates"],
        ["Tier 3 (Ascendente / Diamante / Avançado)", "260 – 320 ms", "74 – 92 Alvos/min", "Bom chaveamento em grupos próximos; perde precisão ao transferir a mira de um lado ao outro da tela"],
        ["Tier 4 (Platina / Ouro / Intermediário)", "320 – 400 ms", "56 – 74 Alvos/min", "Hesitação perceptível pós-abate (100+ ms); tendência a ultrapassar o alvo por frenagem tardia"],
        ["Tier 5 (Prata / Bronze / Iniciante)", "Acima de 400 ms", "Abaixo de 56 Alvos/min", "Reinicia a postura do braço entre cada alvo; busca visual começa do zero a cada kill; tensão muscular excessiva"]
      ],
      note: "O tempo de transição afere o intervalo entre a destruição do alvo e a chegada do retículo ao próximo alvo; a taxa de eliminação reflete o rendimento sustentado ao longo da rodada (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Científicos para Dominar a Troca de Alvos",
      items: [
        {
          name: "Pré-Roteamento Sacádico e Indexação Visual",
          desc: "Desloque o foco visual para o alvo secundário enquanto a mão ainda conclui a microcorreção final do primeiro alvo (Treisman & Gelade, 1980; Wolfe, 2007). Os olhos antecipam a mão em 50 a 80 ms.",
          tips: "Nunca encare um alvo após atirar nele; confie na visão periférica para registrar a destruição enquanto a fóvea ocular já mira o próximo candidato."
        },
        {
          name: "Frenagem Terminal e Otimização Submovimental",
          desc: "Aplique controtensão muscular firme nos últimos 10% do flick para cessar o movimento bruscamente no centro do alvo sem oscilações (Meyer et al., 1988).",
          tips: "Pense no mouse como se tivesse freios hidráulicos: acelere velozmente saindo do alvo anterior e trave com firmeza sobre o próximo."
        },
        {
          name: "Roteamento Espacial pelo Vizinho Mais Próximo",
          desc: "Varra o enxame priorizando alvos com menor distância angular entre si em vez de cruzar a tela de ponta a ponta sem critério (Fitts, 1954).",
          tips: "Limpe pares e trios vizinhos antes de fazer flicadas longas pelas diagonais da tela."
        },
        {
          name: "Desacoplamento de Tensão Muscular e Microajuste",
          desc: "Mantenha uma pegada relaxada (nível 3 em uma escala de 10) para viabilizar microcorreções de dedos e pulso sem enrijecer o antebraço.",
          tips: "Se o pulso cansar ou a mira travar em transições longas, solte conscientemente a pressão do polegar e do dedo mínimo."
        }
      ]
    },
    steps: [
      "Configure o DPI e a sensibilidade idênticos aos do seu FPS competitivo e trave o cursor do mouse.",
      "Identifique visualmente os agrupamentos de alvos mais próximos para traçar sua rota de disparos.",
      "Destrua o primeiro alvo para somar +100 pontos e ganhar +0,35s no cronômetro da rodada.",
      "Redirecione o impulso do retículo imediatamente ao próximo alvo vizinho sem esperar confirmação visual.",
      "Encadeie múltiplos abates sem errar para sustentar multiplicadores de combo e atingir pontuações de elite."
    ],
    audience: "Jogadores competitivos de Valorant, CS2, Apex Legends e Overwatch que desejam acelerar a troca de alvos, dominar spray transfers e extinguir pausas hesitantes em tiroteios caóticos.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/pt/drills/fps/target-prioritization", label: "Priorização de Alvos FPS" },
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/pt/drills/fps/target-acquisition", label: "Aquisição de Alvos FPS" },
      { href: "/pt/drills/fps/180-degree-awareness", label: "Percepção 180° Pro" },
      { href: "/pt/drills/fps/recoil-control", label: "Controle de Recuo" }
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

      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "Treino de Target Switching FPS",
          h1Suffix: " – Troca Rápida de Alvos e Spray Transfer",
          subtitle: "Treine transições rápidas entre alvos, spray transfers e indexação visual sem pausa de ajuste.",
          statScore: "Pontos",
          statTime: "Tempo",
          statAccuracy: "Precisão",
          statBestScore: "Recorde",
          statTargetsDestroyed: "Alvos Destruídos",
          statMaxCombo: "Combo Máximo",
          statPeakLevel: "Nível Máximo",
          startTitle: "Target Switching Swarm",
          startSubtitle: "Entrada Raw de Hardware • Progressão Contínua",
          stageCaption: "Mude rapidamente de alvo e elimine os alvos em enxame antes que o temporizador expire. Evite tiros perdidos para maximizar combos!",
          rulesTitle: "Regras de Treino e Sistema de Pontuação",
          aboutTitle: "Sobre Target Switching em Jogos de Tiro (FPS)",
          rulesItems: [
            { num: "1", text: "Destruição de Alvo", highlight: "Alvos Ciano (+100 PTS / +0,35s)", result: "+100 PTS / +0,35s" },
            { num: "2", text: "Enxame Dinâmico", highlight: "Respawn Imediato", result: "Enxame Contínuo" },
            { num: "3", text: "Penalidade por Erro", highlight: "Tiro Errado / Tempo Esgotado", result: "Reset de Combo" },
            { num: "4", text: "Progressão de Nível", highlight: "+1 Nivel / 2.100 PTS", result: "Mais Rápido & Menor" }
          ]
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
