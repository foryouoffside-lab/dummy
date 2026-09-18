import AntiStrafeJitterClient from '@/app/drills/fps/anti-strafe-jitter-duel/AntiStrafeJitterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Treino de Anti-Strafe – Tracking Reativo FPS | SkillDrills",
  description: "Treine tracking reativo contra strafes rápidos ADAD no navegador. Domine trocas de tiro a curta distância e microajustes no Apex Legends e Overwatch 2.",
  keywords: [
    "treino de tracking reativo",
    "anti strafe treino fps",
    "como acompanhar strafe no apex",
    "treino de adad strafe mira",
    "tracking de curta distancia fps",
    "jitter aim treino mouse",
    "como acertar alvos em movimento rapido",
    "treino de microajuste mira tracking",
    "mira contra strafe rapido",
    "treino de tracking gratis navegador",
    "troca de tiro corpo a corpo fps",
    "como melhorar tracking no overwatch"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel",
    languages: getAlternateLanguages('/drills/fps/anti-strafe-jitter-duel'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Anti-Strafe – Tracking Reativo FPS | SkillDrills",
    description: "Treine tracking reativo contra strafes rápidos ADAD no navegador. Domine trocas de tiro a curta distância e microajustes no Apex Legends e Overwatch 2.",
    url: "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Anti-Strafe – Tracking Reativo FPS | SkillDrills",
    description: "Treine tracking reativo contra strafes rápidos ADAD no navegador. Domine trocas de tiro a curta distância e microajustes no Apex Legends e Overwatch 2.",
  },
};

export default function AntiStrafeJitterPtPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos de FPS", "item": "https://skilldrills.online/pt/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Treino Anti-Strafe", "item": "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "url": "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas com Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Treinador online de tracking reativo contra strafes rápidos ADAD. Aperfeiçoe sua mira contra alvos imprevisíveis no Apex Legends e Overwatch 2."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Anti-Strafe Jitter Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-16",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Aprimore o tracking reativo, a mira anti-strafe e o controle de trocas de tiro a curta distância com entrada bruta de mouse.",
    "genre": "Treino de FPS / Anti-Strafe",
    "url": "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Anti-Strafe Jitter Trainer",
    "gamePlatform": "Web Browser",
    "genre": ["Treino de FPS", "Treinador de Mira"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/pt/drills/fps/anti-strafe-jitter-duel",
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
        "name": "O que é tracking reativo em jogos de tiro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É a capacidade neuromuscular de reajustar a mira instantaneamente quando um alvo muda de direção de forma imprevista, sem depender de trajetórias retilíneas previsíveis."
        }
      },
      {
        "@type": "Question",
        "name": "Como combater jogadores que fazem strafe rápido ADAD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evitando travar a mão no mouse (death gripping) e mantendo foco no centro de massa do rival. O antebraço faz microdesacelerações suaves em vez de microflicks violentos que erram o alvo."
        }
      },
      {
        "@type": "Question",
        "name": "Por que é tão difícil acertar alvos que mudam de direção rapidamente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Devido ao atraso de processamento visual (deslizamento retiniano), o cérebro leva cerca de 160 a 200 ms apenas para detectar que o inimigo inverteu o sentido do movimento."
        }
      },
      {
        "@type": "Question",
        "name": "O que é 'death grip' e como ele prejudica o tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o hábito de apertar o mouse com força excessiva em momentos de tensão. Isso tensiona músculos antagonistas do antebraço e trava o pulso, gerando movimentos duros e imprecisos."
        }
      },
      {
        "@type": "Question",
        "name": "Este treino ajuda em Apex Legends, Overwatch 2 e Warzone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Em jogos com alto tempo para matar (TTK), as trocas de tiro a curta distância são vencidas por quem mantém o retículo mais tempo colado no alvo durante o strafe."
        }
      },
      {
        "@type": "Question",
        "name": "Devo olhar para a minha mira ou diretamente para o inimigo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fixe o olhar sempre no modelo do inimigo. O sistema visual calcula a velocidade pelas bordas do alvo e guia a mão de forma reflexa pela via visual dorsal."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a sensibilidade ideal para tracking de curta distância?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sensibilidades médias entre 28 cm e 38 cm por 360 graus oferecem agilidade no pulso para acompanhar giros rápidos sem perder a estabilidade do antebraço."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo praticar tracking reativo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Treinos diários de 10 a 15 minutos consolidam a resposta reflexa dos flexores do punho sem causar sobrecarga ou dores articulares."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre tracking suave (smooth) e reativo (reactive)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O tracking suave acompanha alvos em velocidade constante e previsível. O tracking reativo lida com acelerações instantâneas, fintas e paradas abruptas."
        }
      },
      {
        "@type": "Question",
        "name": "O simulador suporta entrada bruta de mouse sem aceleração?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. O sistema utiliza a API HTML5 Pointer Lock com carimbos de tempo via performance.now(), garantindo resposta 1:1 rigorosa."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar Mira Anti-Strafe e Tracking Reativo",
    "description": "Instruções passo a passo para desenvolver tracking de alta frequência contra strafes rápidos.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibre a sensibilidade do seu jogo",
        "text": "Ajuste sua sensibilidade para espelhar exatamente a proporção física 1:1 do seu jogo competitivo."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Ative o Pointer Lock no navegador",
        "text": "Clique em Iniciar Treino para travar o cursor e remover qualquer curva de aceleração de software."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Mantenha o foco foveal na esfera do alvo",
        "text": "Concentre a atenção visual na massa central do alvo para perceber as inversões de sentido imediatamente."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Execute microinversões suaves e sem tensão",
        "text": "Mantenha a pegada solta e acompanhe as oscilações com o pulso e os dedos, sem dar flicks bruscos."
      }
    ]
  };

  const antiStrafeGuidePt = {
    heading: "Guia de Tracking Reativo e Benchmarks Psicomotores de Anti-Strafe",
    intro: [
      "Em confrontos armados a curta distância, os duelos são decididos em frações de segundo onde adversários utilizam strafes imprevisíveis em ADAD, agachamentos repetidos e inversões bruscas de vetor. Ao contrário do tracking de perseguição suave, no qual o olhar acompanha um objeto em trajetória contínua (Krauzlis, 2004), o tracking reativo requer constante detecção de erro retiniano em malha fechada e rápidas correções motoras (Rashbass, 1961). Praticantes de jogos de ação exibem maior acuidade atencional e largura de banda temporal (Green & Bavelier, 2003), mas enfrentam limites neurofisiológicos inevitáveis a cada mudança de rumo do inimigo.",
      "Quando o alvo inverte o sentido abruptamente, a imagem escapa da fóvea e desliza pela retina. O cérebro não tem como antecipar a troca: ele precisa detectar a desaceleração, emitir o comando de reversão no córtex motor, frear a mão em movimento e iniciar nova aceleração. Em jogos com tempo para matar (TTK) elevado — como Apex Legends, Overwatch 2 e Call of Duty: Warzone — o sucesso depende do tempo total em que a mira permanece colada no hitbox do adversário.",
      "O Anti-Strafe Jitter Trainer funciona sobre a API HTML5 Pointer Lock com mapeamento direto de hardware 1:1 e cronometria de alta precisão via performance.now(). Ao eliminar o ruído de interpolação do navegador (Woods et al., 2015), o simulador fornece medições laboratoriais para aprimorar o controle dos músculos antagonistas e eliminar os trancos na mira.",
      "Como medir seu progresso: cada fração de segundo de contato é computada localmente sem upload de dados. Mantenha os mesmos parâmetros de sensibilidade e pegada para consolidar padrões motores consistentes."
    ],
    benchmarks: {
      title: "Benchmarks de Latência em Mudança de Direção e Tracking",
      headers: ["Fase de Processamento / Faixa", "Latência Típica (ms)", "Via Neural e Função Biomecânica", "Impacto em Combate"],
      rows: [
        ["Detecção Visual da Mudança de Sentido", "160 – 210 ms", "Sinais de deslizamento retiniano processados em V1 e área MT/V5", "Atraso inicial antes de perceber que o alvo iniciou a volta"],
        ["Latência de Reversão Motora do Braço", "80 – 130 ms", "Transmissão corticoespinal para flexores/extensores e frenagem antagonista", "Tempo mecânico para frear o cursor e inverter o vetor do mouse"],
        ["Microalinhamento Foveal Terminal", "60 – 100 ms", "Centralização foveal fina e ajuste corretivo subcortical", "Eliminação de sobrecurso e fixação estável da retícula no alvo"],
        ["Janela Total de Reaquisição sem Previsão", "300 – 440 ms", "Soma de detecção visual, frenagem motora e recentralização", "Penalidade humana padrão em mudanças de direção imprevistas"],
        ["Tracking Reativo de Elite Preparado", "210 – 290 ms", "Amortecimento antecipatório e supressão antagonista relaxada", "Domínio demonstrado por profissionais de Apex Legends e Overwatch"]
      ],
      note: "Métricas sintetizadas a partir de pesquisas oculomotoras (Rashbass, 1961; Krauzlis, 2004), neurociência de jogos de ação (Green & Bavelier, 2003) e cronometria digital (Woods et al., 2015). A precisão real varia com a taxa de atualização do monitor e o nível de tensão muscular."
    },
    techniques: {
      title: "Técnicas Baseadas em Evidências para Tracking e Anti-Strafe",
      items: [
        {
          name: "Relaxamento dos Músculos Antagonistas (Sem Death Grip)",
          desc: "O erro mais frequente em strafes rápidos é apertar o mouse com força excessiva. A contração simultânea dos músculos trava o pulso, causando movimentos truncados e grande perda de controle nas inversões.",
          tips: "Mantenha uma pegada leve. Deixe os dedos e o pulso absorverem as oscilações curtas enquanto o braço guia os deslocamentos maiores."
        },
        {
          name: "Foco Visual Centrado no Alvo",
          desc: "Não olhe para a sua própria retícula. Mantenha os olhos focados na massa central do alvo. O córtex visual calcula a velocidade pelo contraste das bordas de forma automática.",
          tips: "Se notar que sua mira está atrasada, transfira 100% da sua atenção para o quadril e o peito do adversário."
        },
        {
          name: "Inversões Suaves de Sentido (Evite Flicks Excessivos)",
          desc: "Quando o alvo muda da esquerda para a direita, jogadores inexperientes tentam dar um flick rápido e acabam ultrapassando. Rastreadores de elite desaceleram com suavidade e deslizam de volta.",
          tips: "Pense na mudança de sentido como um ciclo controlado de frenagem e aceleração, e não como dois disparos isolados."
        },
        {
          name: "Leitura dos Quadris e Animação de Desaceleração",
          desc: "Em jogos com física de inércia (como Apex Legends), o personagem desacelera antes de virar. Observar a inclinação do quadril fornece de 30 a 50 ms de vantagem visual.",
          tips: "Fique atento à inclinação do tronco para preparar os músculos para a mudança iminente."
        }
      ]
    },
    steps: [
      "Defina sua sensibilidade para garantir a mesma proporção muscular 1:1 utilizada em jogo.",
      "Clique em Iniciar Treino para ativar a tela cheia e travar o cursor com resposta bruta de hardware.",
      "Fixe a visão na esfera que realiza strafes laterais de alta frequência em ADAD.",
      "Mantenha o retículo sobre o alvo, absorvendo as mudanças com pequenos ajustes de pulso.",
      "Acumule tempo de contato para subir de nível e confira seu relatório de precisão ao término."
    ],
    audience: "Jogadores de Apex Legends, Overwatch 2, Warzone, The Finals e outros jogos com alto TTK que desejam aprimorar tracking reativo a curta distância e eliminar tremores no mouse.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961'),
    related: [
      { href: "/drills/fps/fps-tracking-trainer", label: "Treinador de Tracking FPS" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "Treino de Perseguição Suave" },
      { href: "/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/drills/fps/180-degree-awareness", label: "Treino de Giro 180°" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "Teste de Tempo de Reação" }
    ]
  };

  const copyPt = {
    h1Keyword: "Treino de Anti-Strafe",
    h1Suffix: " — Tracking Reativo FPS",
    statScore: "Pontos",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBestScore: "Recorde",
    startTitle: "Duelo Anti-Strafe Jitter",
    startSubtitle: "Tracking Reativo • Níveis Progressivos Infinitos",
    getReady: "PREPARE-SE",
    pausedTitle: "PAUSADO",
    pausedSubtitle: "Clique para retomar — o cursor do mouse será travado novamente.",
    stageCaption: "Mantenha o retículo sobre o alvo em strafes rápidos e imprevisíveis. Relaxe a mão para inversões suaves!",
    rulesTitle: "Regras de Treino e Pontuação",
    rulesItems: [
      { num: "1", text: "Contato com Alvo", highlight: "+10 PTS por tick", result: "Manutenção contínua da mira" },
      { num: "2", text: "Inversão de Sentido", highlight: "Tracking Reativo", result: "Correção sensorial rápida" },
      { num: "3", text: "Progressão de Nível", highlight: "+1 Nível a cada 1.400 PTS", result: "Maior frequência e velocidade" },
      { num: "4", text: "Estabilidade de Mira", highlight: "Sem Death Grip", result: "Deslizamento fluido e constante" }
    ],
    aboutTitle: "Sobre o Tracking Reativo Anti-Strafe"
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
      <AntiStrafeJitterClient copy={copyPt} />
      <DrillGuide guide={antiStrafeGuidePt} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-strafe-jitter-duel"
          locale="pt"
        />
      </div>
    </>
  );
}
