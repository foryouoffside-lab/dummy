import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Treino de Movimento Ocular – Perseguição Suave | SkillDrills',
  description: 'Treine movimentos oculares de perseguição suave (smooth pursuit) na curva de Lissajous. Melhore a estabilidade do olhar e o tracking visual de graça.',
  keywords: [
    'treino de movimento ocular',
    'exercicio de smooth pursuit',
    'rastreamento visual constante',
    'estabilidade do olhar',
    'treino de fixacao ocular',
    'perseguicao suave dos olhos',
    'treino de tracking visual',
    'exercicio ocular lissajous',
    'supressao de sacadas',
    'visao dinamica treino',
    'motilidade ocular online',
    'treinador visual gratuito'
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual-tracking/constant-slow-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Treino de Movimento Ocular – Perseguição Suave | SkillDrills',
    description: 'Treine movimentos oculares de perseguição suave (smooth pursuit) na curva de Lissajous. Melhore a estabilidade do olhar e o tracking visual de graça.',
    url: 'https://skilldrills.online/pt/drills/visual-tracking/constant-slow-pursuit',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Movimento Ocular – Perseguição Suave | SkillDrills',
    description: 'Treine movimentos oculares de perseguição suave (smooth pursuit) na curva de Lissajous. Melhore a estabilidade do olhar e o tracking visual de graça.',
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Rastreamento Visual", "item": "https://skilldrills.online/pt/drills/visual-tracking" },
    { "@type": "ListItem", "position": 3, "name": "Constant Slow Pursuit", "item": "https://skilldrills.online/pt/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treinador de Perseguição Suave Ocular SkillDrills",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any (Web Browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Treinador visual online para fortalecimento da musculatura ocular extrínseca e estabilização de perseguição foveal contínua em curvas de Lissajous."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Constant Slow Pursuit – Treino de Motilidade Ocular",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/constant-slow-pursuit",
  "browserRequirements": "Requires Canvas and High-Resolution Performance Timer API",
  "applicationCategory": "EyeTrainingApplication",
  "creator": {
    "@type": "Organization",
    "name": "SkillDrills"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Constant Slow Pursuit",
  "description": "Simulador de rastreamento visual contínuo projetado para suprimir sacadas corretivas indesejadas e potencializar a precisão foveal em esportes e games.",
  "genre": ["Visual Training", "Eye Exercise", "Reaction Training"],
  "playMode": "SinglePlayer",
  "gamePlatform": ["PC", "Web Browser", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é perseguição ocular suave (smooth pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É a capacidade dos olhos de acompanhar um objeto em movimento de forma contínua e sem solavancos, mantendo a imagem nítida na fóvea central da retina sem que a cabeça precise se mover."
      }
    },
    {
      "@type": "Question",
      "name": "Por que treinar em uma curva de Lissajous em vez de uma linha reta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A curva de Lissajous elimina cantos retos e paradas bruscas, combinando frequências verticais e horizontais harmônicas. Isso exige ajuste contínuo da velocidade angular dos olhos, impedindo que o cérebro antecipe o trajeto por inércia linear simples."
      }
    },
    {
      "@type": "Question",
      "name": "O que são sacadas corretivas (catch-up saccades) e por que suprimi-las?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sacadas corretivas são saltos involuntários que o olho realiza quando perde a velocidade do alvo. Suprimi-las fortalece os circuitos cerebelares de ganho motor, garantindo visão nítida ininterrupta em movimentos rápidos."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício ajuda jogadores de FPS (Apex, Overwatch, Valorant)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos jogos de tiro, o tracking suave dos olhos permite ler a silhueta de adversários em movimento sem desfoque de movimento retiniano, sincronizando a mira do mouse perfeitamente com a trajetória do inimigo."
      }
    },
    {
      "@type": "Question",
      "name": "Por que devo manter a cabeça absolutamente parada durante o exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover a cabeça ativa o Reflexo Vestíbulo-Ocular (RVO) do ouvido interno, que assume o controle e anula o estímulo neuromuscular nos músculos oculares que desejamos fortalecer."
      }
    },
    {
      "@type": "Question",
      "name": "Atletas de esportes tradicionais (tênis, beisebol) se beneficiam deste treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Manter a bola na fóvea ocular até o ponto de contato reduz o tempo de reação e aumenta a precisão motora ao rebater ou arremessar em esportes com trajetórias parabólicas e velozes."
      }
    },
    {
      "@type": "Question",
      "name": "Este exercício auxilia no alívio do cansaço visual digital?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Horas olhando para telas estáticas enrijecem os músculos oculares. Movimentos de perseguição fluida restauram a flexibilidade dos músculos retos e oblíquos e estimulam a lubrificação natural dos olhos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a velocidade recomendada para iniciar o treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se iniciar na velocidade 1.0x. Se notar pequenos saltos da visão, reduza para 0.7x até que o olhar deslize de forma perfeitamente suave, progredindo então para 1.5x e 2.0x."
      }
    },
    {
      "@type": "Question",
      "name": "Com que frequência devo praticar o Constant Slow Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões de 3 a 5 minutos, de 1 a 2 vezes por dia, são suficientes para construir plasticidade neuromuscular sem causar fadiga nos músculos oculomotores."
      }
    },
    {
      "@type": "Question",
      "name": "Este treinador visual é gratuito e funciona no celular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, é 100% gratuito, sem anúncios invasivos e roda diretamente no navegador de computadores, tablets e smartphones sem necessidade de download."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Praticar o Treino de Perseguição Suave Ocular no Navegador",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posicionar a Cabeça e Fixar a Postura",
      "text": "Sente-se confortavelmente a 50–70 cm da tela e mantenha a cabeça imóvel, apoiando o queixo se necessário."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Selecionar a Velocidade Inicial",
      "text": "Escolha o multiplicador de velocidade (1.0x para iniciantes) e inicie a sessão de 60 segundos."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Fixar o Núcleo do Alvo na Fóvea",
      "text": "Trave o olhar no centro exato do ponto luminoso à medida que ele percorre a curva de Lissajous."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Deslizar o Olhar Suavemente sem Sacadas",
      "text": "Acompanhe a velocidade do alvo sem antecipar e sem deixar a visão dar solavancos ou pular para frente."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Progressão de Ritmo e Supressão de Linha",
      "text": "Quando mantiver o deslizamento perfeito, aumente a velocidade para 1.5x ou oculte a linha guia."
    }
  ]
};

const guideProps = {
  heading: "Guia de Perseguição Ocular Suave & Estabilidade de Fixação Foveal",
  intro: [
    "A perseguição ocular suave (smooth pursuit) é a rotação contínua e voluntária dos olhos para manter a imagem de um alvo em movimento focalizada na fóvea central da retina. Quando um objeto se desloca, o sistema oculomotor calcula o deslizamento retiniano (retinal slip) — a discrepância de velocidade entre a imagem do alvo e a retina — ativando circuitos no cerebelo e no córtex visual (área temporal média e campo ocular frontal) para gerar comandos motores contínuos (Krauzlis, 2004). Em velocidades baixas, a manutenção desse fluxo requer alto ganho neural; se a velocidade ocular decai, ocorrem sacadas corretivas bruscas (Robinson, 1965).",
    "O Constant Slow Pursuit gera uma trajetória fechada e contínua de Lissajous, especificamente calibrada para exercitar a perseguição em baixa e média velocidade sem depender de momentos lineares previsíveis. Ao eliminar mudanças abruptas de direção e possibilitar o ocultamento da linha de trajetória, o exercício condiciona a estabilidade foveal necessária para esportes de alta velocidade, rastreamento de mira em eSports e saúde visual diária.",
    "Padronização e ergonomia: O ganho neuromotor depende do isolamento em relação ao Reflexo Vestíbulo-Ocular (RVO). Se a cabeça girar junto com o alvo, o labirinto vestibular estabiliza a visão e cancela o estímulo de adaptação dos músculos oculares (Leigh & Zee, 2015). Mantenha a cabeça perfeitamente firme. Monitores de alta taxa de atualização (144 Hz+) evitam artefatos visuais de amostragem temporal (Woods et al., 2015). Nenhum dado do usuário é transmitido para servidores."
  ],
  benchmarks: {
    title: "Padrões de Desempenho em Perseguição Suave & Fixação Foveal",
    headers: ["Nível de Habilidade", "Velocidade de Teste (Multiplier)", "Estabilidade do Olhar & Supressão de Sacadas", "Perfil Neuromotor Ocular"],
    rows: [
      ["Tier 1: Apex Gaze Lock", "2.0x ou superior", "Zero sacadas corretivas; fóvea colada magneticamente no centro do alvo mesmo nas curvas mais fechadas.", "Modelos cerebelares de predição de trajetória perfeitamente sincronizados (Barnes, 2008); padrão de atletas de elite e jogadores profissionais."],
      ["Tier 2: Perseguição Superior", "1.4x – 1.9x", "Deslizamento fluido contínuo; micro-oscilações insignificantes nas inflexões com reacomodação imediata.", "Excelente coordenação dos músculos retos e oblíquos; contornos de alvos em alta velocidade permanecem nítidos."],
      ["Tier 3: Padrão Saudável Regular", "1.0x – 1.3x", "Rastreamento estável na velocidade padrão; ocasionais sacadas nos pontos de inversão da curva.", "Nível fisiológico saudável em adultos; plenamente suficiente para atividades cotidianas e jogos casuais."],
      ["Tier 4: Perseguição em Desenvolvimento", "0.7x – 0.9x", "Visão perde velocidade periodicamente, gerando pequenos saltos escalonados de correção.", "Ganho neuromuscular insuficiente em baixas velocidades; requer treino consciente com a cabeça estabilizada."],
      ["Tier 5: Instabilidade Inicial", "Abaixo de 0.7x", "Perda frequente do alvo; movimentação involuntária da cabeça ou fadiga ocular rápida.", "Estágio inicial de adaptação; recomenda-se iniciar na menor velocidade focando no relaxamento da musculatura facial."]
    ],
    note: "Padrões baseados na literatura em oculomotricidade e neurociência visual (Robinson, 1965; Rashbass, 1961; Krauzlis, 2004; Leigh & Zee, 2015) para avaliação qualitativa da continuidade foveal."
  },
  techniques: {
    title: "Quatro Métodos Científicos para Aperfeiçoar o Smooth Pursuit",
    items: [
      {
        name: "Imobilização Cefálica para Isolamento do RVO",
        desc: "Como demonstrado por Leigh & Zee (2015), mover a cabeça ativa o ouvido interno, anulando o estímulo de adaptação dos circuitos corticais de perseguição suave.",
        tips: "Apoie o queixo suavemente e garanta que apenas os globos oculares se movam dentro das órbitas."
      },
      {
        name: "Ancoragem Foveal no Núcleo do Alvo",
        desc: "Krauzlis (2004) provou que o deslizamento retiniano impulsiona o movimento ocular. Fixar o núcleo reduz a dispersão visual periférica.",
        tips: "Não olhe para a esfera como um todo; mire os olhos exatamente no centro microscópico do elemento luminoso."
      },
      {
        name: "Projeção de Trajetória Cerebelar (Modelo Interno)",
        desc: "Barnes (2008) revelou que o cerebelo sintetiza padrões harmônicos e compensa o atraso neural de 100 ms antecipando a curva.",
        tips: "Visualize mentalmente a continuidade suave da curva para que o olhar deslize sem hesitações nos pontos de virada."
      },
      {
        name: "Higiene de Piscamento e Frequência de Tela",
        desc: "Telas de 144 Hz ou 240 Hz oferecem sinal contínuo sem travamentos (Woods et al., 2015), facilitando o cálculo da velocidade ocular.",
        tips: "Pisque conscientemente entre os ciclos para manter a lágrima uniforme e evitar o ressecamento da córnea."
      }
    ]
  },
  steps: [
    "Defina a velocidade inicial (0.7x a 1.2x) e inicie o ciclo de 60 segundos.",
    "Mantenha a cabeça ereta e perfeitamente imóvel a cerca de 60 cm do monitor.",
    "Fixe a fóvea ocular no núcleo do alvo luminoso assim que ele começar a deslizar.",
    "Acompanhe o movimento com velocidade constante sem dar solavancos sacádicos.",
    "Ao atingir fluidez sem sobressaltos, aumente a velocidade ou ative o modo sem linha guia."
  ],
  audience: "Atletas de eSports e FPS (Apex Legends, Valorant, CS2), jogadores de esportes com bola (tênis, beisebol, futebol), estudantes e profissionais que buscam reduzir a fadiga de tela e melhorar a acuidade dinâmica.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Perseguição em Onda Senoidal" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Perseguição em Loop Infinito" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Perseguição em Caos Direcional" },
    { href: "/pt/drills/visual-tracking/predictive-pursuit", label: "Perseguição Preditiva" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição de Evasão Dinâmica" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidade e Supressão de Ghosting" }
  ]
};

export default function ConstantSlowPursuitPtPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConstantSlowPursuitClient
        copy={{
          title: "Treino de Movimento Ocular – Perseguição Suave",
          subtitle: "Exercício de Smooth Pursuit e Estabilidade Foveal na Curva de Lissajous"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="/drills/visual-tracking/constant-slow-pursuit" locale="pt" />
      </div>
    </>
  );
}
