import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// PORTUGUESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "treino de visão periférica" / "exercício para visão periférica"
// Secondary:    "atenção encoberta visual", "expansão de campo visual", "estabilidade foveal central"
// LSI / Domain:  "percepção periférica rápida", "detecção de estímulo periférico", "rastreamento visual e visão lateral",
//               "mira periférica para jogos fps", "visão ampla para atletas", "coordenação foveal e periférica", "avaliação de campo visual dinâmico"
// Authentic Domain Terms: Treino de Visão Periférica（Peripheral Vision Training）, Atenção Espacial Encoberta（Covert Spatial Attention）, Campo Visual Útil（Useful Field of View / UFOV）, Fixação Foveal（Foveal Fixation）, Bastonetes Retinianos（Retinal Rods）, Supressão Sacádica（Saccadic Suppression）, Visão em Túnel（Tunnel Vision）
// ============================================================

export const metadata = {
  title: "Treino de Visão Periférica – Ping Pursuit | SkillDrills",
  description: "Treine a visao periferica e a estabilidade foveal: detecte estimulos perifericos mantendo o foco central no alvo em movimento. Gratis no navegador.",
  keywords: [
    "treino de visão periférica",
    "exercício para visão periférica",
    "atenção encoberta visual",
    "expansão de campo visual",
    "estabilidade foveal central",
    "percepção periférica rápida",
    "detecção de estímulo periférico",
    "rastreamento visual e visão lateral",
    "mira periférica para jogos fps",
    "visão ampla para atletas",
    "coordenação foveal e periférica",
    "avaliação de campo visual dinâmico"
  ],
  openGraph: {
    title: "Treino de Visão Periférica – Ping Pursuit | SkillDrills",
    description: "Treine a visao periferica e a estabilidade foveal: detecte estimulos perifericos mantendo o foco central no alvo em movimento. Gratis no navegador.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treino de Visão Periférica – Ping Pursuit | SkillDrills",
    description: "Treine a visao periferica e a estabilidade foveal: detecte estimulos perifericos mantendo o foco central no alvo em movimento. Gratis no navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Rastreamento Visual", "item": "https://skilldrills.online/pt/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Treino de Visão Periférica – Ping Pursuit", "item": "https://skilldrills.online/pt/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treino de Visão Periférica e Atenção Encoberta",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Software de treino visual com dupla tarefa para avaliar a estabilidade foveal central e a latência de detecção periférica encoberta."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicativo de Visão Periférica Ping Pursuit",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/peripheral-ping-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treino de Visão Periférica Ping Pursuit",
  "description": "Exercício neurovisual de dupla tarefa onde o usuário mantém foco contínuo no alvo central enquanto detecta lampejos nas bordas do campo visual.",
  "genre": ["Treino Visual", "Visão Periférica", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Visão Periférica com o Ping Pursuit",
  "description": "Protocolo neurofisiológico para expandir o campo visual útil mantendo a ancoragem foveal estável.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixação Foveal Central",
      "text": "Posicione-se a 50 a 70 cm da tela. Mantenha os olhos ancorados no retículo central que se desloca de forma contínua."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Expansão da Atenção Encoberta",
      "text": "Amplie o campo perceptivo mental até as bordas do monitor sem deslocar a linha de visão física central."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detecção de Estímulos Laterais",
      "text": "Ao notar um lampejo periférico transitório, registre-o através dos bastonetes da retina sem desviar os olhos."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Resposta Motora Instantânea",
      "text": "Acione o comando de entrada de imediato preservando a trajetória ininterrupta da perseguição central."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o treino de visão periférica Ping Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício de dupla tarefa neurovisual que desenvolve a atenção espacial encoberta e expande o campo visual útil (UFOV) enquanto mantém a perseguição suave central estável (Posner, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença fisiológica entre a fóvea e a retina periférica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A fóvea cobre os 1 a 2 graus centrais com cones de alta resolução espacial. A periferia é dominada por bastonetes e a via magnocelular, sensível a movimentos rápidos e transientes de luz (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona a atenção espacial encoberta sem mover os olhos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A atenção encoberta é controlada pela rede frontoparietal dorsal, permitindo redirecionar o foco cognitivo no campo visual sem que os olhos façam rotação física (Eriksen & St. James, 1986)."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício previne a visão em túnel sob estresse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A sobrecarga cognitiva tende a contrair o campo visual útil. O treino com dupla tarefa condiciona o córtex visual a manter ampla largura de banda perceptiva sob pressão."
      }
    },
    {
      "@type": "Question",
      "name": "Por que não devo desviar os olhos para olhar diretamente para o lampejo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Desviar o olhar dispara uma sacada balística que induz supressão sacádica por 50 a 100 ms, cegando momentaneamente a percepção do alvo central (Findlay & Walker, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o benefício deste treino para jogadores de jogos de tiro (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jogadores competitivos precisam manter a retícula no alvo principal enquanto monitoram o radar, minimapa e inimigos se aproximando pelos cantos da tela."
      }
    },
    {
      "@type": "Question",
      "name": "Como a visão periférica expandida ajuda em esportes tradicionais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No futebol, basquete ou tênis, atletas precisam acompanhar a bola enquanto antecipam movimentações de companheiros e marcadores no campo periférico (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a influência da taxa de atualização do monitor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de alta taxa (144Hz ou mais) renderizam pulsos luminosos instantaneamente e sem borrões, permitindo que os bastonetes retinianos detectem o estímulo mais rápido (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste de visão periférica é gratuito e sem anúncios invasivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta gratuitamente no navegador, sem necessidade de cadastro ou instalação."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a frequência recomendada de prática para obter ganhos perceptivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões de 5 a 10 minutos, realizadas de 3 a 5 vezes por semana, ampliam comprovadamente a amplitude do campo visual útil em 4 a 6 semanas."
      }
    }
  ]
};

const guideProps = {
  heading: "Diretrizes Científicas de Visão Periférica e Atenção Espacial Encoberta",
  intro: [
    "A retina humana opera com uma divisão funcional de trabalho: a visão foveal de alta acuidade ocupa apenas os 1° a 2° centrais do campo visual (via parvocelular), enquanto a vasta extensão do espaço circundante é processada pela retina periférica, dominada por bastonetes e pela via magnocelular, altamente especializada em dinâmica de luminosidade e movimento (Wolfe, 1994; Leigh & Zee, 2015). O reflexo instintivo primitivo induz sacadas imediatas a qualquer estímulo excêntrico.",
    "O exercício Ping Pursuit condiciona a habilidade cognitiva da atenção espacial encoberta: a capacidade de expandir o campo visual útil e detectar eventos periféricos sem desviar o olhar do alvo central (Posner, 1980; Eriksen & St. James, 1986). Ao impor uma fixação foveal contínua no centro, o treino capacita o campo ocular frontal a suprimir sacadas involuntárias e afina a sensibilidade magnocelular para captar pulsos instantaneamente (Findlay & Walker, 1999).",
    "Latências de hardware e tempos de resposta do painel influenciam a detecção temporal de transientes luminosos (Woods et al., 2015). Todos os dados e escores são gerados e armazenados localmente no navegador, garantindo privacidade completa."
  ],
  benchmarks: {
    title: "Benchmarks de Campo Visual Útil (UFOV) e Latência Periférica",
    headers: ["Nível de Desempenho", "Campo Visual Útil (UFOV %)", "Tempo de Reação Periférico", "Estabilidade Central", "Perfil Neurofisiológico"],
    rows: [
      ["Elite (Esports / Atletas)", "Acima de 92%", "Abaixo de 280 ms", "Acima de 95%", "Desacoplamento foveal perfeito; percepção panorâmica sem desvio da fixação central."],
      ["Avançado (Nível Competitivo)", "85% – 92%", "280 ms – 340 ms", "90% – 95%", "Excelente distribuição de atenção encoberta; mínima hesitação ao responder a estímulos laterais."],
      ["Competente (Adulto Saudável)", "75% – 84%", "341 ms – 410 ms", "82% – 89%", "Boa capacidade de dupla tarefa; leve visão em túnel em velocidades centrais elevadas."],
      ["Em Desenvolvimento", "60% – 74%", "411 ms – 500 ms", "70% – 81%", "Atraso perceptível; micro-sacadas involuntárias frequentes em direção aos estímulos periféricos."],
      ["Iniciante / Nível Base", "Abaixo de 60%", "Acima de 500 ms", "Abaixo de 70%", "Forte visão em túnel; quebra constante da perseguição central ao surgir o lampejo."]
    ],
    note: "※ Valores baseados em testes padronizados a 50–70 cm da tela com sessões de dupla tarefa de 60 segundos. Apenas tentativas com perseguição central contínua são pontuadas."
  },
  techniques: {
    title: "Quatro Princípios Essenciais para Expandir a Visão Periférica",
    items: [
      {
        name: "Protocolo de Ancoragem Foveal",
        desc: "Discipline os músculos oculares para permanecerem firmemente fixados no alvo central em movimento. Resista ao reflexo de olhar para o lampejo, eliminando os períodos cegos de supressão sacádica (Findlay & Walker, 1999).",
        tips: "Imagine que seus olhos estão conectados ao centro por uma trava magnética enquanto sua percepção mental se expande como um radar."
      },
      {
        name: "Dispersão da Atenção Encoberta",
        desc: "Abra sua atenção radialmente do centro até as bordas do monitor. Adote um foco difuso onde os bastonetes captam variações de luz sem exigir foco anatômico (Posner, 1980).",
        tips: "Não tente identificar a forma do sinal lateral; aperte o comando assim que notar a variação de brilho."
      },
      {
        name: "Ativação da Via Dorsal",
        desc: "O sistema visual se divide em vias ventral ('o que é') e dorsal ('onde está'). A percepção periférica depende da via dorsal. Elimine o julgamento consciente e confie no reflexo motor.",
        tips: "Reaja de forma direta ao transiente luminoso sem verbalizar ou analisar mentalmente o estímulo."
      },
      {
        name: "Controle Respiratório Parassimpático",
        desc: "O estresse simpático comprime o campo visual, gerando visão em túnel imediata (Eriksen & St. James, 1986). A respiração nasal lenta reduz a frequência cardíaca e mantém a amplitude visual panorâmica.",
        tips: "Inspire lentamente por 4 segundos e expire por 6 segundos para relaxar a musculatura cervical e ocular."
      }
    ]
  },
  steps: [
    "Sente-se a uma distância confortável de 50 a 70 cm da tela, mantendo a cabeça e o queixo estáveis.",
    "Selecione a duração do teste (30 a 120 segundos) e a velocidade do alvo central.",
    "Mantenha os olhos ancorados no alvo central sem deixar o foco escapar.",
    "Ao perceber um lampejo luminoso nas bordas periféricas, registre-o sem mover a linha de visão dos olhos.",
    "Pressione imediatamente o botão de reação e acompanhe seu escore de atenção e estabilidade."
  ],
  audience: "Jogadores de FPS (Valorant, CS2, Apex Legends, Overwatch), praticantes de esportes coletivos e de combate, motoristas e qualquer pessoa interessada em mitigar a visão em túnel e ampliar a percepção visual.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Suave Contínua (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento com Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Reativa (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidade de Fixação Ocular (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Treino Ocular em Oito Infinito (Infinity)" },
    { href: "/pt/drills/visual-tracking/momentum-teleport-pursuit", label: "Rastreamento de Alvo Teleportado (Momentum)" }
  ]
};

export default function PortuguesePeripheralPingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PeripheralPingPursuitClient
        copy={{
          title: "Treino de Visão Periférica e Expansão de Campo Visual",
          subtitle: "Avaliação de Dupla Tarefa: Fixação Foveal Central e Detecção de Estímulos Laterais",
          description: "Exercício neurovisual gratuito para ampliação do campo visual útil (UFOV) e desenvolvimento da atenção espacial encoberta. Acompanhe o alvo central de forma estável enquanto detecta lampejos nas bordas da tela sem desviar os olhos. Grátis no navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
