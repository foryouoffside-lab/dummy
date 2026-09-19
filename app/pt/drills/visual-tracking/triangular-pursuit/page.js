import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento Ocular Triangular – SkillDrills",
  description: "Treine o seguimento ocular ao longo de vetores triangulares e sacadas de precisão em vértices agudos. Exercício oculomotor gratuito para mira e esportes.",
  keywords: [
    "rastreamento ocular triangular",
    "treino de seguimento visual em triângulo",
    "exercício de sacadas em ângulos agudos",
    "precisão de mira em vértices",
    "treinamento oculomotor poligonal",
    "exercícios de fixação e perseguição visual",
    "controle de desaceleração ocular reflexos",
    "treino de estabilidade do olhar online",
    "sacadas de correção e rastreamento contínuo",
    "coordenação neuromuscular ocular esportes",
    "teste de agilidade visual e reflexo",
    "treinamento de pontaria e antecipação angular"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/triangular-pursuit",
    languages: getAlternateLanguages('drills/visual-tracking/triangular-pursuit')
  },
  openGraph: {
    title: "Rastreamento Ocular Triangular – SkillDrills",
    description: "Treine o seguimento ocular ao longo de vetores triangulares e sacadas de precisão em vértices agudos. Exercício oculomotor gratuito para mira e esportes.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/triangular-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastreamento Ocular Triangular – SkillDrills",
    description: "Treine o seguimento ocular ao longo de vetores triangulares e sacadas de precisão em vértices agudos. Exercício oculomotor gratuito para mira e esportes."
  }
};

export default function TriangularPursuitPagePT() {
  const sources = pickSources(
    'debrouwer2002',
    'heinen2005',
    'orbandexivry2007',
    'bennett2006',
    'barnes2008',
    'woods2015'
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinamento Visual", "item": "https://skilldrills.online/pt/drills/visual-tracking" },
      { "@type": "ListItem", "position": 3, "name": "Perseguição Triangular", "item": "https://skilldrills.online/pt/drills/visual-tracking/triangular-pursuit" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treinador de Rastreamento Ocular Triangular",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Treinamento neuromuscular de rastreamento ocular contínuo e sacadas de alta aceleração em trajetórias poligonais fechadas."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Exercício de Rastreamento Vetorial Triangular",
    "url": "https://skilldrills.online/pt/drills/visual-tracking/triangular-pursuit",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafio de Perseguição Triangular",
    "gamePlatform": "Web Browser",
    "genre": ["Visual Training", "Eye Tracking Drill", "Esports Reflex"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Praticar Rastreamento Ocular Triangular",
    "description": "Protocolo para controle de frenagem foveal e reaquisição em vértices de 60 graus.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Posicionamento e Fixação Inicial",
        "text": "Mantenha a cabeça ereta e estável a 50-60 cm do monitor, fixando os olhos na esfera quando ela iniciar o deslocamento ao longo de uma das arestas."
      },
      {
        "@type": "HowToStep",
        "name": "Seguimento Diagonal Suave",
        "text": "Acompanhe o trajeto retilíneo mantendo o olhar firme no centro do alvo, equilibrando os movimentos oculares horizontais e verticais."
      },
      {
        "@type": "HowToStep",
        "name": "Frenagem e Reaquisição no Vértice",
        "text": "Ao atingir o vértice de 60 graus, execute uma desaceleração controlada seguida de uma sacada corretiva imediata para a nova aresta."
      },
      {
        "@type": "HowToStep",
        "name": "Progressão de Velocidade",
        "text": "Inicie em velocidade 1.0x e avance para multiplicadores maiores assim que conseguir completar as curvas sem ultrapassar os limites do vértice."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que torna o rastreamento em trajetórias triangulares tão exigente para o cérebro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ao contrário de círculos ou elipses suaves, o triângulo combina segmentos lineares diagonais com vértices agudos de 60 graus, exigindo transições instantâneas entre o sistema de perseguição lenta e o circuito de sacadas de alta aceleração."
        }
      },
      {
        "@type": "Question",
        "name": "Quais centros neurais controlam essas mudanças angulares de trajetória?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A coordenação recruta o córtex visual frontal (FEF), o cerebelo (flóculo e verme dorsal) e os núcleos pontinos (PPRF para o plano horizontal e riMLF no mesencéfalo para o plano vertical)."
        }
      },
      {
        "@type": "Question",
        "name": "Por que ocorrem ultrapassagens (overshoot) ao virar nos vértices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ocorre devido à inércia do comando motor de seguimento contínuo. Sem adaptação feedforward prévia, os músculos extraoculares continuam na direção antiga por 80 a 120 milissegundos antes de frear."
        }
      },
      {
        "@type": "Question",
        "name": "Como atletas e gamers de FPS se beneficiam deste exercício?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ele ensina o sistema motor a frear bruscamente a mira e reorientar o foco visual sem oscilações, fundamental para rastrear alvos erráticos ou cantos de mapas."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a postura correta da cabeça durante o treino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cabeça deve permanecer completamente estática. Mover a cabeça anula o estímulo oculomotor puro e transfere a carga para o reflexo vestíbulo-ocular (RVO)."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo realizar este exercício?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões de 5 a 10 minutos diários, divididas em séries de 60 segundos com pausas curtas para descanso visual, são ideais para induzir neuroplasticidade."
        }
      },
      {
        "@type": "Question",
        "name": "O que é o deslizamento retiniano (retinal slip) nos vértices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o deslocamento rápido da imagem do alvo para fora da fóvea quando a direção muda bruscamente, servindo de gatilho neurofisiológico para a sacada de recuperação."
        }
      },
      {
        "@type": "Question",
        "name": "Como monitores com alta taxa de atualização influenciam os resultados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Telas de 144Hz ou 240Hz reduzem o atraso entre quadros no momento exato da virada no vértice, facilitando a percepção temporal da desaceleração."
        }
      },
      {
        "@type": "Question",
        "name": "O que é uma sacada de recuperação (catch-up saccade)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É um salto ocular balístico ultrarrápido de 30 a 50 milissegundos disparado para reposicionar a fóvea no alvo após uma defasagem de posição."
        }
      },
      {
        "@type": "Question",
        "name": "Posso ajustar a velocidade e a direção do movimento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, o aplicativo permite alterar o multiplicador de velocidade, a duração da sessão e a direção horária ou anti-horária para equilibrar ambos os hemisférios visuais."
        }
      }
    ]
  };

  const guide = {
    title: "Diretrizes Neurocientíficas de Perseguição Vetorial e Dinâmica de Vértices",
    intro: [
      "O rastreamento visual ao longo de polígonos geométricos fechados impõe uma demanda única sobre a coordenação contínua dos músculos extraoculares horizontais e verticais. Quando o alvo percorre os lados de um triângulo equilátero, o sistema oculomotor executa uma perseguição suave em vetores diagonais não cardinais, exigindo que o tronco encefálico equilibre os disparos pontinos horizontais (PPRF) com os comandos motores mesencefálicos verticais (riMLF; Orban de Xivry & Lefèvre, 2007).",
      "O principal desafio neurofisiológico ocorre nos três vértices agudos de 60 graus. Ao atingir cada quina e sofrer uma reversão angular abrupta, a velocidade do deslizamento retiniano cai instantaneamente enquanto o erro de posição foveal se eleva de forma vertiginosa. Estudos clássicos de de Brouwer et al. (2002) e Heinen et al. (2005) demonstraram que as sacadas de recuperação (catch-up saccades) são disparadas por um cálculo neural conjunto entre desvio de posição e deslizamento de velocidade, operado pelos campos oculares frontais (FEF) e suplementares (SEF).",
      "Sem treinamento oculomotor específico, o olhar tende a ultrapassar os vértices por inércia motora (overshoot) ou a cortar as esquinas antecipadamente, gerando microssacadas dispersas e quebrando a acuidade dinâmica. Por outro lado, a prática deliberada do rastreamento poligonal ativa os modelos internos cerebelares (Bennett & Barnes, 2006; Barnes, 2008), propiciando uma desaceleração preditiva da perseguição antes de cada vértice e acelerando a reaquisição foveal sobre o vetor seguinte.",
      "O exercício de Perseguição Triangular desenvolve essa agilidade visomotora diretamente no navegador web. Ao acompanhar a esfera ao longo da trajetória triangular contínua, o atleta treina simultaneamente a perseguição diagonal a velocidade uniforme e a reancoragem cirúrgica nos vértices. Recursos como ocultar a linha de trajetória ('Hide Line') removem guias visuais para exigir rastreamento sensoriomotor autônomo, enquanto a velocidade variável ('Random Speed') impede hábitos mecânicos de temporização.",
      "Metodologia de medição e latência de hardware: As estimativas temporais incorporam a quantização de atualização das telas (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz, ~4,1 ms a 240 Hz) e os intervalos de varredura dos dispositivos de entrada (~8 ms a 125 Hz contra ~1 ms a 1.000 Hz), conforme detalhado por Woods et al. (2015). Todas as suas pontuações e registros de precisão residem exclusivamente no armazenamento local (localStorage) do seu navegador, resguardando total privacidade sem transmissão externa."
    ],
    benchmarks: {
      title: "Padrões de Desempenho de Perseguição Triangular (Velocidade e Erro em Vértices)",
      headers: ["Nível de Habilidade", "Multiplicador de Velocidade", "Erro no Vértice", "Latência da Sacada de Virada", "Percentil Global"],
      rows: [
        ["Elite / Mestre da Dinâmica Vetorial", "3.5x – 5.0x+", "Erro < 12 px (fixação perfeita no vértice)", "Latência < 110 ms (frenagem preditiva)", "Top 1.5%"],
        ["Mestre / Alto Controle Vetorial", "2.5x – 3.5x", "Erro < 22 px (apenas microssacadas mínimas)", "Latência < 140 ms (curvas limpas)", "Top 8%"],
        ["Avançado / Atleta Competitivo", "1.8x – 2.5x", "Erro < 38 px (reaquisição veloz)", "Latência < 180 ms (viradas estáveis)", "Top 25%"],
        ["Intermediário / Praticante Regular", "1.2x – 1.8x", "Erro 38 – 70 px (corte de curvas / overshoot)", "Latência 180 – 240 ms (sacadas múltiplas)", "Médio 45%"],
        ["Iniciante / Não Treinado", "0.5x – 1.2x", "Erro > 70 px (perda total no vértice)", "Latência > 250 ms (ultrapassagem evidente)", "Base"]
      ],
      note: "Padrões fundamentados em de Brouwer et al. (2002) sobre dinâmica de sacadas corretivas e Heinen et al. (2005) sobre controle motor em reversões abruptas de trajetória."
    },
    instructions: [
      "Fixe a fóvea na esfera e acompanhe o trajeto retilíneo sem mover o pescoço.",
      "Antecipe a desaceleração quando o alvo se aproximar do vértice agudo.",
      "Execute uma sacada rápida e controlada para engajar imediatamente na nova aresta.",
      "Aumente o multiplicador de velocidade apenas quando seu erro de vértice for consistentemente inferior a 35 px."
    ],
    tips: [
      "Evite cortar caminho nos cantos: tente acompanhar o trajeto exatamente até a extremidade do vértice.",
      "Mantenha o braço e a mão relaxados no mouse para não transmitir tensão muscular desnecessária.",
      "Respire com cadência regular para manter o tônus motor estável durante as transições de velocidade."
    ],
    sources
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <TriangularPursuitClient
        copy={{
          title: "Perseguição Triangular",
          subtitle: "Treino Oculomotor em Trajetória Poligonal",
          description: "Acompanhe um alvo em trajetórias triangulares fechadas e condicione a transição imediata entre perseguição visual contínua e sacadas corretivas em vértices agudos de 60 graus."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
