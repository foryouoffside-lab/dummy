import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// PORTUGUESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "rastreamento de alvo teleportado" / "treino de mira alvos teleportados"
// Secondary:    "reaquisição sacádica treino", "rastreamento visual com inércia", "exercício ocular de sacadas rápidas"
// LSI / Domain:  "movimento sacádico ocular", "perseguição visual suave", "recuperação foveal rápida",
//               "mira reflexa para fps", "visão dinâmica mira rápida", "estabilidade ocular em saltos", "antecipação motora ocular"
// Authentic Domain Terms: Alvo Teleportado（Teleported Target）, Inércia Cinética（Momentum Preservation）, Reaquisição Sacádica（Saccadic Re-acquisition）, Supressão Sacádica（Saccadic Suppression）, Perseguição Suave Pós-Sacádica（Post-saccadic Smooth Pursuit）, Salto Balístico Ocular（Ballistic Saccade）
// ============================================================

export const metadata = {
  title: "Rastreamento de Alvo Teleportado – Momentum | SkillDrills",
  description: "Treine rastreamento visual de alvos teleportados com inercia: desenvolva sacadas rapidas de reaquisição e reconexao de busca suave gratis no navegador.",
  keywords: [
    "rastreamento de alvo teleportado",
    "treino de mira alvos teleportados",
    "reaquisição sacádica treino",
    "rastreamento visual com inércia",
    "exercício ocular de sacadas rápidas",
    "movimento sacádico ocular",
    "perseguição visual suave",
    "recuperação foveal rápida",
    "mira reflexa para fps",
    "visão dinâmica mira rápida",
    "estabilidade ocular em saltos",
    "antecipação motora ocular"
  ],
  openGraph: {
    title: "Rastreamento de Alvo Teleportado – Momentum | SkillDrills",
    description: "Treine rastreamento visual de alvos teleportados com inercia: desenvolva sacadas rapidas de reaquisição e reconexao de busca suave gratis no navegador.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastreamento de Alvo Teleportado – Momentum | SkillDrills",
    description: "Treine rastreamento visual de alvos teleportados com inercia: desenvolva sacadas rapidas de reaquisição e reconexao de busca suave gratis no navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Rastreamento Visual", "item": "https://skilldrills.online/pt/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Rastreamento de Alvo Teleportado – Momentum", "item": "https://skilldrills.online/pt/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treino de Rastreamento de Alvo Teleportado com Inércia",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Exercício oculomotor interativo para treinar a reaquisição foveal rápida por sacadas e perseguição suave em alvos com inércia e teletransporte."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicativo de Rastreamento de Alvos Teleportados",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/momentum-teleport-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Rastreamento de Alvo Teleportado com Inércia",
  "description": "Exercício de precisão visual onde alvos móveis saltam subitamente pelo espaço preservando seus vetores de aceleração e direção.",
  "genre": ["Treino de Mira", "Avaliação Oculomotora", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Reaquisição Sacádica com Alvos Teleportados",
  "description": "Protocolo neurofisiológico passo a passo para recapturar alvos com saltos espaciais preservando velocidade e continuidade visual.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixação Foveal Inicial",
      "text": "Sente-se a uma distância de 50 a 70 cm da tela com a cabeça estabilizada. Acompanhe o ponto luminoso mantendo perseguição contínua."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detecção Periférica do Salto",
      "text": "Quando o alvo teleportar subitamente, detecte a nova coordenada pela retina periférica sem girar o pescoço."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Disparo da Sacada Balística",
      "text": "Lance uma sacada ocular retilínea de alta velocidade diretamente para a nova coordenada para reenquadrar a fóvea no alvo."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Reconexão de Velocidade Imediata",
      "text": "Como o vetor de inércia é preservado, conecte imediatamente a perseguição suave na aterrissagem sem oscilações de busca."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o treino de rastreamento de alvo teleportado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício oculomotor avançado que condiciona a transição imediata entre uma sacada rápida de recuperação e a perseguição suave sobre um alvo que salta preservando sua inércia (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença biológica entre sacada e perseguição suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A sacada é um salto balístico ocular explosivo (até 700 graus/s) para reposicionar o olhar, enquanto a perseguição suave é um ajuste contínuo (até 40 graus/s) para manter a imagem estável na fóvea."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício melhora o desempenho em jogos de tiro (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos como Valorant, Overwatch e Apex Legends, oponentes utilizam dashes e teletransportes. Treinar a reaquisição instantânea elimina o tempo de hesitação visual ao reenquadrar a mira."
      }
    },
    {
      "@type": "Question",
      "name": "Como a inércia do alvo ajuda no treino de antecipação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao manter a mesma velocidade e ângulo após o salto, o cérebro é obrigado a utilizar modelos internos cerebelares para prever o deslocamento contínuo durante a supressão sacádica (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece com a visão durante o salto sacádico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O cérebro ativa a supressão sacádica, reduzindo temporariamente a sensibilidade neural para evitar borrões visuais. A nitidez reaparece no instante da aterrissagem foveal (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a estabilidade da cabeça é indispensável neste exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Girar a cabeça dispara o reflexo vestíbulo-ocular (RVO), que gera contra-rotações oculares e atrasa a ancoragem no alvo. Mantenha o queixo firme e utilize apenas os músculos extraoculares (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é erro de aterrissagem sacádica (dysmetria)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É quando a sacada primária atinge um ponto antes ou além do alvo, exigindo uma micro-sacada corretiva. O treino repetitivo afina a calibração cerebelar e reduz essa margem de erro a zero."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a influência da taxa de atualização do monitor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Telas de alta frequência (144Hz a 360Hz) fornecem atualizações a cada 2,7ms a 6,9ms, reduzindo a incerteza temporal e permitindo reaquisições mais precisas (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste de rastreamento é gratuito e sem anúncios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills oferece este treino de forma 100% gratuita, sem registros, downloads ou assinaturas, diretamente no navegador."
      }
    },
    {
      "@type": "Question",
      "name": "Como o treino frequente estimula a neuroplasticidade ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A combinação frequente de sacadas e perseguição estimula o flóculo cerebelar e os circuitos fronto-estriatais, aprimorando a acuidade visual dinâmica e a velocidade de reação (Bahill et al., 1980)."
      }
    }
  ]
};

const guideProps = {
  heading: "Diretrizes Neurofisiológicas de Rastreamento com Inércia e Teletransporte",
  intro: [
    "Em ambientes dinâmicos e competitivos, alvos visuais frequentemente sofrem deslocamentos repentinos, desvios e oclusões espaciais. Essas descontinuidades exigem que o sistema visual humano coordene com perfeição dois subsistemas motores distintos: as sacadas balísticas para reencontrar a posição espacial do alvo e a perseguição suave contínua para acompanhar seu vetor de velocidade (Rashbass, 1961; Findlay & Walker, 1999).",
    "O exercício de Rastreamento de Alvo Teleportado isola especificamente esse mecanismo neuromuscular. O alvo salta instantaneamente para uma nova coordenada da tela preservando sua velocidade e ângulo direcional. Para obter excelência, os circuitos oculomotores devem disparar uma sacada de correção milimétrica e restabelecer imediatamente a velocidade de perseguição no ponto de aterrissagem sem atraso (Bahill et al., 1980; Barnes, 2008).",
    "Fatores de latência de exibição e amostragem de entrada (1000Hz vs 125Hz) influenciam a precisão percebida, conforme demonstrado por Woods et al. (2015). Todo o processamento métrico ocorre localmente em seu navegador com privacidade total."
  ],
  benchmarks: {
    title: "Métricas de Reaquisição de Alvo e Sincronização de Inércia",
    headers: ["Nível de Desempenho", "Latência de Reaquisição (Foveação)", "Erro de Aterrissagem (Overshoot)", "Sincronização de Inércia (Ganho)", "Perfil Neurofisiológico"],
    rows: [
      ["Elite (Pro-Aiming & E-Sports)", "< 140 ms", "< 3% (bloqueio milimétrico)", "97%+", "Precisão balística impecável. Conexão imediata à perseguição suave sem hesitações ou busca oscilatória."],
      ["Avançado (Nível Competitivo)", "140 – 180 ms", "3% – 6%", "91% – 96%", "Reaquisição espacial veloz. Micro-sacada corretiva mínima com alta fidelidade de vetor de velocidade."],
      ["Competente (Adulto Saudável)", "181 – 240 ms", "7% – 14%", "80% – 90%", "Padrão de referência saudável. Pequeno intervalo refratário após a sacada seguido de condução estável."],
      ["Em Desenvolvimento", "241 – 320 ms", "15% – 24%", "68% – 79%", "Atraso perceptível na deflagração do salto ocular. Erros de overshoot frequentes exigindo múltiplas correções."],
      ["Iniciante / Necessita Treino", "> 320 ms", "> 24%", "< 68%", "Dificuldade severa em saltos de grande amplitude. Presença de compensação cervical indesejada."]
    ],
    note: "※ Valores de referência obtidos em testes a 50–70 cm de distância com velocidades de 1,0x a 2,0x ao longo de 60 segundos. A latência de reaquisição afere o intervalo entre o teletransporte e o reenquadramento estável da fóvea."
  },
  techniques: {
    title: "Quatro Princípios Essenciais para Reaquisição Visual Instantânea",
    items: [
      {
        name: "Trajetória Balística Retilínea Direta",
        desc: "Execute o salto sacádico pela menor distância retilínea entre o ponto de fuga e as novas coordenadas. Qualquer curva ou desvio atrasa drasticamente a reaquisição foveal (Findlay & Walker, 1999).",
        tips: "Confie na percepção da retina periférica e lance o foco com firmeza diretamente no ponto visual."
      },
      {
        name: "Retenção Mental do Vetor de Inércia",
        desc: "Embora a posição se altere de forma instantânea, o vetor de velocidade e direção permanece inalterado. Mantenha o modelo preditivo cerebelar ativo durante a supressão sacádica (Barnes, 2008).",
        tips: "Não espere um alvo estático no ponto de aterrissagem; prepare os olhos para deslizar assim que tocar as coordenadas."
      },
      {
        name: "Avanço Preditivo de Aterrissagem",
        desc: "Como a sacada consome entre 20 e 40 ms de deslocamento, o alvo continua se movendo durante o voo ocular. Posicione seu olhar ligeiramente à frente das coordenadas de chegada.",
        tips: "Um leve avanço de poucos pixels impede que o olhar aterrissar atrás da posição real do alvo móvel."
      },
      {
        name: "Isolamento Cervical Completo",
        desc: "Grandes saltos estimulam a movimentação involuntária do pescoço. O reflexo vestíbulo-ocular gera instabilidade na focalização rápida (Leigh & Zee, 2015).",
        tips: "Mantenha o queixo apoiado ou perfeitamente estático, exercitando exclusivamente a musculatura dos olhos."
      }
    ]
  },
  steps: [
    "Posicione-se confortavelmente a 50–70 cm da tela, mantendo o queixo estável e a cabeça ereta.",
    "Ajuste a duração da sessão (30 a 120 segundos) e o multiplicador de velocidade (0,5x a 9,0x).",
    "Mantenha a fóvea centrada no alvo em movimento acompanhando sua trajetória inicial.",
    "Ao ocorrer o teletransporte súbito, lance uma sacada direta para a nova localização.",
    "Ao pousar, engate imediatamente a perseguição suave acompanhando a inércia contínua do alvo."
  ],
  audience: "Jogadores de FPS (Valorant, CS2, Apex Legends, Overwatch), atletas de esportes com bola sujeitos a desvios rápidos e praticantes que buscam otimizar a velocidade dos movimentos sacádicos.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Suave Contínua (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento com Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Reativa (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidade de Fixação Ocular (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Treino Ocular em Oito Infinito (Infinity)" },
    { href: "/pt/drills/visual-tracking/predictive-pursuit", label: "Rastreamento Ocular Preditivo (Predictive)" }
  ]
};

export default function PortugueseMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "Treino de Rastreamento de Alvos Teleportados com Inércia",
          subtitle: "Avaliação Oculomotora de Sacadas Balísticas e Reconexão de Perseguição Suave",
          description: "Treino visual avançado para alvos que mantêm vetores de velocidade e se teleportam abruptamente na tela. Desenvolva a rápida alternância entre sacadas de alta velocidade e perseguição contínua sem desvios oscilatórios. Grátis no navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
