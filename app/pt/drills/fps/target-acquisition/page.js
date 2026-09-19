import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Treino de Aquisição de Alvos – Primeiro Tiro | SkillDrills",
  description: "Treine aquisição de alvos, velocidade de detecção visual e precisão do primeiro tiro no navegador. Domine o primeiro disparo para CS2 e Valorant grátis.",
  keywords: [
    "treino de aquisicao de alvos",
    "aquisicao de alvos fps",
    "treinar primeiro tiro fps",
    "precisao do primeiro tiro",
    "como acertar o primeiro tiro",
    "flick no primeiro tiro",
    "deteccao de alvos fps",
    "mira rapida primeiro tiro",
    "treinador de mira cs2 valorant",
    "reconhecimento visual fps",
    "treino de reflexo e mira",
    "exercicio de aquisicao de alvos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Aquisição de Alvos – Primeiro Tiro | SkillDrills",
    description: "Treine aquisição de alvos, velocidade de detecção visual e precisão do primeiro tiro no navegador. Domine o primeiro disparo para CS2 e Valorant grátis.",
    url: "https://skilldrills.online/pt/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Aquisição de Alvos – Primeiro Tiro | SkillDrills",
    description: "Treine aquisição de alvos, velocidade de detecção visual e precisão do primeiro tiro no navegador. Domine o primeiro disparo para CS2 e Valorant grátis.",
  },
};

export default function TargetAcquisitionPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Aquisição de Alvos", "item": "https://skilldrills.online/pt/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treino de Aquisição de Alvos FPS",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Treinador online de aquisição de alvos, detecção visual rápida e precisão do primeiro disparo para shooters táticos como CS2 e Valorant.",
    "genre": "Treinamento FPS / Precisão do Primeiro Tiro",
    "url": "https://skilldrills.online/pt/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treino de Aquisição de Alvos FPS",
    "url": "https://skilldrills.online/pt/drills/fps/target-acquisition",
    "description": "Treinador online de aquisição de alvos, detecção visual rápida e precisão do primeiro disparo para shooters táticos como CS2 e Valorant.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requer suporte a HTML5 Canvas e Pointer Lock API",
    "dateModified": "2026-09-16"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Treino de Aquisição de Alvos FPS",
    "url": "https://skilldrills.online/pt/drills/fps/target-acquisition",
    "description": "Treinador online de aquisição de alvos, detecção visual rápida e precisão do primeiro disparo para shooters táticos como CS2 e Valorant.",
    "dateModified": "2026-09-16",
    "gamePlatform": "Web Browser",
    "genre": ["Treinamento FPS", "Aim Trainer", "Aquisição de Alvos"],
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
        "name": "O que é aquisição de alvos em jogos FPS competitivos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A aquisição de alvos é a sequência cognitiva e motora que une detecção visual de um inimigo no campo de visão, distinção em relação a elementos do cenário, planejamento de trajetória motora e execução de um flick balístico para acertar o primeiro disparo."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre aquisição de alvos e tempo de reação puro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O teste de tempo de reação simples mede apenas a latência entre um estímulo isolado e um clique. A aquisição de alvos incorpora busca visual espacial, atenção seletiva, discriminação de contraste/luminância e precisão motora sob pressão de tempo."
        }
      },
      {
        "@type": "Question",
        "name": "Como a Teoria de Integração de Características explica a detecção de alvos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Formulada por Anne Treisman & Garry Gelade (1980), a teoria comprova que características visuais básicas (luminância, cor, orientação) são processadas em paralelo antes que a atenção espacial focada una esses traços em objetos distintos para seleção motora."
        }
      },
      {
        "@type": "Question",
        "name": "Por que jogadores profissionais detectam e disparam mais rápido que amadores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profissionais possuem filtragem de saliência visual superior (Wolfe, 2007) e programas motores otimizados de submovimentos (Meyer et al., 1988). O córtex visual deles ignora varreduras em série e dispara diretamente para o ponto de maior contraste sem hesitação."
        }
      },
      {
        "@type": "Question",
        "name": "Qual o impacto da precisão do primeiro tiro em jogos táticos como CS2 e Valorant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Em jogos de TTK ultracurto com headshots letais de um disparo (Vandal ou AK-47), o jogador que detecta a cabeça e clica primeiro vence o confronto. Errar o flick inicial significa perder a janela de precisão do primeiro disparo."
        }
      },
      {
        "@type": "Question",
        "name": "Devo usar a visão central ou visão periférica para localizar alvos inimigos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Localize alvos com a visão periférica e use a visão fóvea central em conjunto com a retícula para confirmar o disparo. Fixar os olhos exclusivamente na mira estreita seu campo de atenção e retarda a detecção periférica."
        }
      },
      {
        "@type": "Question",
        "name": "Como a poluição visual e múltiplos alvos afetam o tempo de aquisição?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quando múltiplos alvos ou elementos de fundo compartilham características com o inimigo, a busca visual passa de paralela para serial, aumentando o tempo de reação em 40 a 120 ms por elemento visual adicional."
        }
      },
      {
        "@type": "Question",
        "name": "Qual empunhadura de mouse é mais eficiente para aquisição rápida de múltiplos alvos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As pegadas Claw e Fingertip são as mais recomendadas por permitirem micro-ajustes rápidos com a ponta dos dedos e frenagem instantânea no mousepad, mantendo o antebraço livre para flicks angulares amplos."
        }
      },
      {
        "@type": "Question",
        "name": "Como o hardware raw input melhora a consistência na detecção de alvos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O hardware raw input mantém uma relação linear de 1:1 entre a mão e a tela, permitindo ao córtex motor calibrar impulsos balísticos com exatidão sem as distorções não lineares da aceleração do mouse."
        }
      },
      {
        "@type": "Question",
        "name": "Quantos minutos diários de treino de aquisição de alvos são indicados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De 10 a 15 minutos diários no início do seu aquecimento ativam a sensibilidade ao contraste visual e refinam a memória muscular do primeiro disparo sem provocar fadiga neuromuscular."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Dominar a Aquisição de Alvos e Primeiro Tiro",
    "description": "Instruções passo a passo para identificar ameaças prioritárias, eliminar hesitação visual e acertar o primeiro disparo.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibrar Sensibilidade com Entrada Bruta",
        "text": "Configure sua sensibilidade exata e DPI nas opções de sessão para manter proporção física de 1:1 e travar o cursor.",
        "url": "https://skilldrills.online/pt/drills/fps/target-acquisition#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Manter Olhar Suave e Atenção Periférica",
        "text": "Mantenha os olhos relaxados no centro da tela, usando a visão periférica para detectar o surgimento do cluster de alvos.",
        "url": "https://skilldrills.online/pt/drills/fps/target-acquisition#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Discriminar Contraste da Ameaça Principal",
        "text": "Identifique instantaneamente o alvo com maior brilho sem realizar varreduras em série pelos outros elementos.",
        "url": "https://skilldrills.online/pt/drills/fps/target-acquisition#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Executar Flick Balístico com Frenagem no Mousepad",
        "text": "Mova a mira em linha reta ao centro do alvo e atire, usando a fricção do mousepad para impedir o sobretiro.",
        "url": "https://skilldrills.online/pt/drills/fps/target-acquisition#step-4"
      }
    ]
  };

  const targetAcquisitionGuide = {
    heading: "Guia de Aquisição de Alvos FPS e Biomecânica da Discriminação Visual",
    intro: [
      "O Treino de Aquisição de Alvos é um exercício perceptivo-cognitivo concebido para cultivar velocidade de detecção visual, discriminação de contraste e extrema precisão no primeiro disparo. Em shooters táticos como Valorant, Counter-Strike 2 e Rainbow Six Siege, os confrontos são decididos nos primeiros 300 milissegundos de linha de visão: o combatente que localiza, identifica e acerta o disparo no adversário primeiro vence o confronto.",
      "A base teórica da busca visual e identificação de objetos foi formulada por Anne Treisman & Garry Gelade (1980) na Teoria de Integração de Características. Treisman provou que características visuais primárias — como contraste de luminância, cores salientes e orientação de bordas — são extraídas em paralelo por todo o campo visual. Apenas quando a atenção espacial focada é direcionada à coordenada, esses traços são fundidos em uma ameaça inimiga identificável.",
      "Expandindo o processamento visual paralelo, o modelo Guided Search de Jeremy M. Wolfe (1994, 2007) detalha como mapas sensoriais de saliência se combinam com expectativas cognitivas para priorizar a atenção. Quando os jogadores treinam discriminação de contraste, o córtex visual aprende a rejeitar distrações de fundo instantaneamente, encurtando o tempo entre o surgimento do alvo e a ação motora.",
      "Integrando as leis motoras de Paul M. Fitts (1954), a teoria de submovimentos otimizados de David E. Meyer et al. (1988) e a cronometria digital de alta resolução (Woods et al., 2015), este exercício condiciona os reflexos a eliminarem hesitações cognitivas e executarem disparos rápidos e certeiros.",
      "Como isto é medido: cada evento é registrado pelo relógio de alta precisão performance.now() do navegador no seu próprio dispositivo — nenhum dado é transmitido externamente. Fatores de hardware: os temporizadores web operam com resolução em torno de 1 ms, e o monitor exibe imagens na frequência de atualização — 16,7 ms a 60 Hz, 6,9 ms a 144 Hz e 4,1 ms a 240 Hz (Woods et al., 2015). O polling rate do mouse soma cerca de 8 ms a 125 Hz contra 1 ms a 1000 Hz. Avalie seu progresso no mesmo equipamento."
    ],
    benchmarks: {
      title: "Padrões Científicos de Aquisição de Alvos e Latência de Discriminação",
      headers: ["Nível de Desempenho", "Latência de Aquisição", "Precisão do Primeiro Tiro", "Impacto Competitivo no Jogo"],
      rows: [
        ["Tier 1 (Apex Sentinel / Radiant Pro)", "<260 ms", "95% – 99%+", "Detecção instantânea de ameaças; headshots perfeitos na primeira bala sem qualquer hesitação de discriminação"],
        ["Tier 2 (Mestre Competitivo / Tier-2 Esports)", "260 – 320 ms", "88% – 95%", "Excelente velocidade de localização visual; disparo prioritário assertivo com interferência mínima de distrações"],
        ["Tier 3 (Diamante / Ascendente)", "320 – 400 ms", "80% – 88%", "Precisão sólida no primeiro tiro; apresenta leve atraso de 50 a 80 ms ao lidar com múltiplos alvos densos"],
        ["Tier 4 (Intermediário / Ouro / Platina)", "400 – 500 ms", "70% – 80%", "Propenso a varreduras em série lentas; ocasionalmente clica em distrações secundárias ou ultrapassa o alvo"],
        ["Tier 5 (Iniciante / Básico)", ">500 ms", "<70%", "Confusão em cenários visuais poluídos; lentidão na aquisição resultando em derrotas frequentes em duelos de abertura"]
      ],
      note: "A latência de aquisição representa o tempo decorrido entre a exibição do cluster e o primeiro clique validado no alvo prioritário, registrado com cronometria digital (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Aperfeiçoar a Aquisição de Alvos",
      items: [
        {
          name: "Varredura Paralela em Vez de Busca em Série",
          desc: "Evite examinar zonas individuais da tela uma a uma. Conte com os filtros pré-atencionais (Treisman & Gelade, 1980) para detectar pontos de contraste na visão periférica enquanto mantém o olhar central suave.",
          tips: "Mantenha o olhar relaxado perto do centro; deixe o alvo mais brilhante orientar sua sacada inicial."
        },
        {
          name: "Acoplamento Sacádico-Motor no Flick",
          desc: "Desacople o movimento dos olhos e das mãos: execute sacadas fóveas primeiro para identificar o centro do alvo, permitindo que a propriocepção impulsione a mira na trajetória correta.",
          tips: "Seus olhos devem atingir o alvo de 30 a 50 ms antes do cursor chegar, confirmando a coordenada antes do tiro."
        },
        {
          name: "Discriminação Rápida de Limiar de Contraste",
          desc: "Em cenários poluídos, silhuetas tênues indicam alvos secundários, enquanto alta luminância indica ameaça iminente. Treine para filtrar o ruído visual sem pausar a sequência balística.",
          tips: "Condicione-se a ignorar alvos secundários mais escuros até eliminar o estímulo de maior contraste."
        },
        {
          name: "Frenagem com Fricção no Mousepad",
          desc: "Equilibre velocidade balística com capacidade de frenagem (Meyer et al., 1988). Utilize o atrito do mousepad e a ponta dos dedos para cessar o movimento da mira exatamente no alvo sem sobretiro.",
          tips: "Aplique uma leve pressão vertical com a mão no final do movimento para travar o mouse mecanicamente."
        }
      ]
    },
    steps: [
      "Configure o jogo de referência, DPI e sensibilidade exata nas opções de sessão para preservar proporção de 1:1 e travar o cursor.",
      "Fixe a visão em um olhar central suave, aguardando o aparecimento do conjunto de alvos pela tela.",
      "Identifique visualmente o alvo mais brilhante e prioritário através da filtragem de contraste em paralelo.",
      "Execute um flick balístico limpo até o centro do alvo e clique para somar +100 PTS (+0,4s de tempo bônus).",
      "Elimine os alvos restantes em ordem decrescente de brilho para ganhar o bônus de +400 PTS e avançar de nível."
    ],
    audience: "Jogadores competitivos de Valorant, Counter-Strike 2, Apex Legends e Overwatch 2 que buscam reconhecimento veloz de inimigos, headshots certeiros no primeiro tiro e eliminação de distrações visuais.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/pt/drills/fps/target-prioritization", label: "Treino de Priorização de Alvos" },
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/pt/drills/fps/micro-correction-precision", label: "Treino de Precisão e Micro-Correção" },
      { href: "/pt/drills/fps/strafe-tracking", label: "Treino de Strafe Tracking" },
      { href: "/pt/drills/fps/180-degree-awareness", label: "Treino de Percepção 180° Pro" }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Aquisição de Alvos",
    h1Suffix: " – Primeiro Tiro FPS",
    subtitle: "Treine detecção visual de alvos, discriminação de ameaças e precisão do primeiro disparo com métricas em tempo real.",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    statSetsCleared: "Conjuntos Limpos",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nível Máximo",
    startTitle: "Aquisição de Alvos Pro",
    startSubtitle: "Velocidade de Reconhecimento Visual · Dificuldade Dinâmica Infinita",
    getReady: "PREPARE-SE",
    toggleFlash: "Alternar Flash de Erro",
    toggleSound: "Alternar Efeitos Sonoros",
    pausedTitle: "Jogo Pausado",
    pausedSubtitle: "Clique para retomar — o travamento do ponteiro será reativado.",
    stageCaption: "Identifique e clique no alvo mais brilhante (maior opacidade) de cada conjunto o mais rápido e preciso possível.",
    rulesTitle: "Instruções do Treino e Pontuação",
    rulesItems: [
      { num: "1", text: "Alvo Atingido", highlight: "+100 PTS (+0,4s)", result: "×Multiplicador Combo" },
      { num: "2", text: "Conjunto Limpo", highlight: "+400 PTS × Nível", result: "Novo Agrupamento" },
      { num: "3", text: "Subir de Nível", highlight: "+1 / 1400 PTS", result: "Escalonamento Contínuo" },
      { num: "4", text: "Alvo Incorreto / Erro", highlight: "Penalidade", result: "Zera Combo (-0,6s)" }
    ],
    aboutTitle: "Sobre o Treino de Aquisição de Alvos",
    aboutHeading: "O que é Aquisição de Alvos?",
    aboutText: "A aquisição de alvos consiste em localizar a ameaça correta e direcionar a mira até ela. Recursos visuais básicos como cor, brilho e orientação são processados em paralelo pelo campo de visão antes que a atenção una esses elementos em um objeto (Treisman & Gelade, 1980) — razão pela qual um inimigo destacado é detectado muito mais rápido que um camuflado."
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
      <TargetAcquisitionClient copy={copyPt} />
      <DrillGuide guide={targetAcquisitionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
