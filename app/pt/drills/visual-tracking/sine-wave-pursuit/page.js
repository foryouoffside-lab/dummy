import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Treino de Movimento Ocular Senoidal – SkillDrills",
  description: "Exercite o seguimento ocular ao longo de ondas senoidais. Aprimore o ganho de velocidade e elimine a latencia de fase sem cadastro.",
  keywords: [
    "treino de movimento ocular senoidal",
    "rastreamento visual senoidal",
    "exercicio ocular onda senoidal",
    "seguimento ocular harmonico",
    "ganho de velocidade ocular",
    "controle motor ocular ritmo",
    "sincronizacao cerebelar visual",
    "latencia de fase zero olhos",
    "suprimir sacadas de recuperacao",
    "exercicio de seguimento ocular",
    "rastreamento de alvo oscilante",
    "treino de mira de onda"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Treino de Movimento Ocular Senoidal – SkillDrills",
    description: "Exercite o seguimento ocular ao longo de ondas senoidais. Aprimore o ganho de velocidade e elimine a latencia de fase sem cadastro.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/sine-wave-pursuit",
    siteName: 'SkillDrills',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Movimento Ocular Senoidal – SkillDrills",
    description: "Exercite o seguimento ocular ao longo de ondas senoidais. Aprimore o ganho de velocidade e elimine a latencia de fase sem cadastro.",
  },
};

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
      "name": "Exercícios",
      "item": "https://skilldrills.online/pt/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Rastreamento Visual",
      "item": "https://skilldrills.online/pt/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Rastreamento em Onda Senoidal",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/sine-wave-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treino de Movimento Ocular Senoidal",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Aplicacao de rastreamento visual harmonico para condicionar o ganho de velocidade e a sincronizacao cerebelar ao longo de trajetorias senoidais."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercício de Rastreamento Senoidal",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/sine-wave-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Sine Wave Pursuit",
  "description": "Exercicio de fixacao visual continua onde os utilizadores acompanham alvos em oscilacao harmonica de velocidade.",
  "genre": ["Treino Visual", "Seguimento Ocular", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar o Rastreamento Harmonico com Onda Senoidal",
  "description": "Protocolo passo a passo para condicionar o bloqueio de fase cerebelar e eliminar o atraso sensorial em curvas oscilatorias.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Calibre a Frequencia de Oscilacao",
      "text": "Posicione-se a 50-70 cm do ecra. Observe os ciclos iniciais da onda para interiorizar o ritmo e a frequencia da oscilacao."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Acelere no Cruzamento Central",
      "text": "Aumente a velocidade ocular ao atravessar o eixo central, onde a velocidade tangencial do alvo atinge o valor maximo."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Amortece a Desaceleracao nos Vertices",
      "text": "Reduza suavemente a tensao muscular ocular quando o alvo se aproximar das cristas e vales da onda para evitar desvios."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Suprima Sacadas Corretivas",
      "text": "Mantenha uma velocidade continua de seguimento motor em vez de recorrer a saltos sacadicos de recuperacao."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que e o exercicio Sine Wave Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Sine Wave Pursuit treina o seguimento ocular suave ao longo de curvas de ondas senoidais, condicionando o cerebro a eliminar o atraso sensorial atraves da antecipacao cerebelar (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Como o rastreamento senoidal difere do seguimento a velocidade constante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em trajetorias senoidais, a velocidade e a aceleracao variam continuamente: o pico de velocidade ocorre no centro, enquanto nos extremos a velocidade cai a zero antes de inverter a direcao (Stark et al., 1962)."
      }
    },
    {
      "@type": "Question",
      "name": "O que e a latencia de fase zero?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ocorre quando o relogio interno cerebelar sincroniza com a frequencia do alvo, permitindo que os olhos acompanhem o movimento em tempo real sem o habitual atraso sensorial de 130 a 150 ms."
      }
    },
    {
      "@type": "Question",
      "name": "O que causa as sacadas de recuperacao durante o treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando o ganho de velocidade de seguimento cai abaixo de 1.0, o olhar fica atras do alvo. O cerebro dispara uma sacada rapida de recuperacao para focar novamente o centro foveal (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercicio beneficia a mira em jogos FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos competitivos como Apex Legends e Overwatch, os adversarios realizam saltos e deslocamentos ritmicos. O treino harmonico evita disparos atrasados ou avancados nos pontos de inflexao."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o beneficio para desportos de bola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No tenis, voleibol e futebol, as bolas descrevem arcos e curvas oscilantes. O seguimento suave permite manter a nitidez visual durante toda a trajetoria parabolica."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a cabeca deve permanecer imovel durante o treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Movimentos involuntarios do pescoco ativam o reflexo vestibulo-ocular (VOR), gerando contra-rotacoes que desestabilizam o foco suave e o ganho visual (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "A taxa de atualizacao do monitor influencia o exercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de alta frequencia (144Hz ou mais) desenham curvas perfeitamente fluidas sem saltos de fotogramas, proporcionando estimulos visuais ideais para o cortex motor (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Este treino senoidal e gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta gratuitamente no navegador, sem necessidade de registo ou instalacao de programas."
      }
    },
    {
      "@type": "Question",
      "name": "Com que frequencia devo praticar este exercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessoes curtas de 5 a 10 minutos praticadas 3 a 5 vezes por semana promovem ganhos substanciais na estabilidade do foco e reduzem sacadas involuntarias em poucas semanas (Barnes, 2008)."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Científicos do Rastreamento em Onda Senoidal e Coordenação Ocular",
  intro: [
    "A precisao do sistema de seguimento ocular continuo (Smooth Pursuit) e desafiada ao maximo quando os olhos acompanham trajetorias de oscilacao harmonica, em vez de percursos lineares previsiveis. Ao longo de uma curva senoidal, a velocidade e a aceleracao variam segundo leis trigonometricas: a velocidade atinge a magnitude maxima ao cruzar o eixo central de equilibrio, desacelerando gradualmente ate parar momentaneamente nos vertices antes de inverter o sentido (Stark et al., 1962; Robinson, 1965).",
    "Estudos neurofisiologicos seminais de David Robinson (1965) e Barnes (2008) demonstraram que percursos imprevisiveis geram um atraso fisiologico compulsorio de 130 a 150 milissegundos. Contudo, perante movimentos harmonicos periodicos, os circuitos cerebelares aprendem a frequencia da onda em poucos ciclos, emitindo comandos motores antecipatorios que eliminam completamente a latencia sensorial, atingindo a condicao de fase zero.",
    "Quando a velocidade angular ultrapassa os limites fisiologicos ou ocorre cansaco visual, o ganho de seguimento entra em deficit. Conforme documentado por Rashbass (1961) e Bahill et al. (1980), a quebra de velocidade obriga o cortex a introduzir sacadas de correcao bruscas, durante as quais ocorre supressao visual passageira. Este exercicio treina a musculatura extraocular para sustentar um ganho unitario constante sem sobressaltos."
  ],
  benchmarks: {
    title: "Tabela de Classificação do Rastreamento Senoidal e Ganho de Velocidade",
    headers: ["Nível de Desempenho", "Ganho de Velocidade", "Latência de Fase", "Sacadas por Ciclo", "Perfil Oculomotor"],
    rows: [
      ["Elite (Esports / Atletas Pro)", "0.96 – 1.02", "< 15 ms (Sincronização Total)", "0 – 1 (Fluxo Perfeito)", "Sincronização rítmica cerebelar perfeita sem atraso de fase e fixação foveal impecável."],
      ["Avançado (Competitivo)", "0.90 – 0.95", "15 – 30 ms", "2 – 3", "Elevada fidelidade de trajetória e mínimas micro-sacadas nos vértices de inversão."],
      ["Competente (Adulto Saudável)", "0.82 – 0.89", "31 – 50 ms", "4 – 5", "Bom rastreamento harmônico com ligeira dispersão em oscilações de alta frequência."],
      ["Em Desenvolvimento (Latência)", "0.70 – 0.81", "51 – 80 ms", "6 – 8", "Instabilidade nos vértices com frequentes sacadas corretivas para recuperar o alvo."],
      ["Iniciante (Ajuste Motor)", "< 0.70", "> 80 ms", "> 9", "Dificuldade em antecipar o ritmo harmônico com seguimento estritamente reativo."]
    ],
    note: "※ Medições efetuadas em ecrãs 1080p a uma distância de 50–70 cm com velocidades de 1.0x a 1.5x. Avaliado pelo rácio de ganho angular e ausência de sacadas corretivas."
  },
  techniques: {
    title: "Quatro Técnicas Fundamentais para o Rastreamento Senoidal Harmónico",
    items: [
      {
        name: "Bloqueio de Fase Harmónica",
        desc: "Utilize os primeiros ciclos da onda para absorver a cadência do movimento. Ative o relógio cerebelar interno para impulsionar os olhos no ritmo exato da oscilação (Robinson, 1965).",
        tips: "Mantenha uma contagem rítmica mental ('um-dois, um-dois') para eliminar o atraso visual."
      },
      {
        name: "Amortecimento no Ápice",
        desc: "Ao aproximar-se das cristas e vales da curva, reduza gradualmente a força ocular para impedir que o olhar ultrapasse o ponto de inversão.",
        tips: "Imagine o balanço suave de um pêndulo desacelerando até ao cume antes de retornar."
      },
      {
        name: "Aceleração no Cruzamento Central",
        desc: "A velocidade tangencial do alvo atinge o valor mais alto ao atravessar o centro. Aplique um impulso antecipado para não perder o enquadramento foveal.",
        tips: "Acelere a rotação ocular deliberadamente no centro para sustentar o ganho."
      },
      {
        name: "Supressão Disciplinada de Sacadas",
        desc: "Evite disparar pequenos saltos oculares reflexos quando houver pequenas defasagens. Corrija a posição acelerando a velocidade contínua (Bahill et al., 1980).",
        tips: "Conserve os músculos dos olhos relaxados e elásticos como um fluido contínuo."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Exercício de Seguimento Ocular Lento (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento em Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimento com Evasão Dinâmica (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supressão de Imagem Fantasma (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Exercício Ocular em Oito (Infinity Pursuit)" },
    { href: "/pt/drills/visual-tracking/momentum-teleport-pursuit", label: "Rastreamento com Teleporte e Inércia (Momentum)" }
  ]
};

export default function SineWavePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SineWavePursuitClient copy={{ title: "Rastreamento em Onda Senoidal", subtitle: "Treino de Movimento Ocular Harmónico" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
