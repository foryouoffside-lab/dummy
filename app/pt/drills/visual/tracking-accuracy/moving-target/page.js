import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento de Alvo Móvel: Visão Dinâmica | SkillDrills",
  description: "Teste de rastreamento de alvo em movimento grátis. Intercepte esferas dinâmicas em trajetórias aceleradas para medir perseguição ocular suave.",
  keywords: [
    "teste de rastreamento de alvo em movimento",
    "teste de acuidade visual dinâmica",
    "treino de mira em alvo móvel",
    "perseguição ocular suave teste",
    "interceptação de alvo dinâmico",
    "coordenação olho-mão alvos em movimento",
    "teste de visão dinâmica online",
    "antecipação de trajetória reflexo",
    "treino de tracking fps",
    "movimento sacádico e perseguição visual",
    "teste de velocidade de rastreamento visual",
    "visão periférica e interceptação motora"
  ],
  openGraph: {
    title: "Rastreamento de Alvo Móvel: Visão Dinâmica | SkillDrills",
    description: "Intercepte alvos móveis acelerados e meça a perseguição ocular suave e a acuidade visual dinâmica gratuitamente.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rastreamento de Alvo Móvel: Visão Dinâmica | SkillDrills",
    description: "Treino de rastreamento cinético e interceptação de alvos móveis em tempo real.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo de Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Treino Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Precisão de Rastreamento", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Interceptação de Alvo Móvel", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Interceptação de Alvo Móvel",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Teste psicofísico interativo para avaliar movimentos de perseguição ocular suave, predição espacial de trajetória e precisão de interceptação motora.",
  "featureList": [
    "Física de trajetória 2D com vetores de colisão e repique nas bordas",
    "Cronometria milissegundo a milissegundo de acertos e multiplicadores de combo",
    "Velocidade progressiva com retração das caixas de colisão dos alvos",
    "Armazenamento puramente local no navegador com zero telemetria externa"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Interceptação de Alvo Móvel — Visão Dinâmica | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "Treino online gratuito de rastreamento cinético de alvos. Intercepte esferas aceleradas que ricocheteiam na tela com precisão motora.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador web moderno compatível com HTML5 Canvas.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "Perseguição Ocular Suave, Acuidade Visual Dinâmica, Extrapolação de Velocidade, Interceptação Balística, Correção Motora em Malha Fechada"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Drill de Interceptação de Alvos Móveis",
  "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target",
  "description": "Jogo de rastreamento de alvos dinâmicos para aprimorar a mira e os reflexos em movimento.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar com o Teste de Alvo Móvel",
  "dateModified": "2026-09-05",
  "description": "Guia de 4 passos para desenvolver a perseguição ocular suave, a predição de trajetórias e a precisão de interceptação.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Localize e Fixe o Olhar no Alvo",
      "text": "Identifique a esfera em movimento assim que ela surgir e trave a fóvea no seu centroide para iniciar a perseguição suave.",
      "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Antecipe a Trajetória e os Ricochetes",
      "text": "Calcule a velocidade e o ângulo de reflexão nas bordas, posicionando o cursor levemente à frente da esfera.",
      "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute o Clique Balístico de Interceptação",
      "text": "Clique na esfera antes que o tempo de transição se esgote (+150 PTS × Combo × Nível e +0,6 s de bônus no cronômetro).",
      "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Preserve a Sequência de Combos em Alta Velocidade",
      "text": "Mantenha a precisão à medida que a velocidade acelera e o tamanho diminui, evitando cliques no vazio.",
      "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o teste de interceptação de alvos móveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício de psicofísica visual formulado para avaliar a perseguição ocular suave (smooth pursuit), a predição espacial de trajetórias e a coordenação olho-mão. O usuário intercepta esferas dinâmicas que ricocheteiam na tela com velocidades variáveis."
      }
    },
    {
      "@type": "Question",
      "name": "Como o cérebro rastreia e intercepta um alvo visual em movimento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sinais de movimento captados pela retina trafegam até a área temporal média (MT/V5), onde velocidade e direção são calculadas. Os campos oculares frontais (FEF) e o cerebelo sincronizam os músculos oculares para igualar a velocidade do olhar, enquanto o córtex parietal comanda a mira motora."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença fisiológica entre perseguição suave e movimentos sacádicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Como demonstrado por Rashbass (1961), a perseguição suave é um ajuste contínuo (até 30–40°/s) guiado pela velocidade do estímulo para manter o alvo focado na fóvea. As sacadas são saltos balísticos rápidos (até 900°/s) para reposicionar o olhar em alvos distantes."
      }
    },
    {
      "@type": "Question",
      "name": "Por que é fundamental antecipar (mirar à frente) em alvos dinâmicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A latência sensoriomotora humana impõe um atraso biológico de 150 a 220 ms entre a percepção e o clique físico. Um alvo a 500 px/s se desloca mais de 100 pixels nesse intervalo. Clicar nas coordenadas atuais resulta em erro; é preciso disparar no ponto futuro (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "Quais os limites de velocidade da perseguição ocular humana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O rastreamento suave opera perfeitamente até cerca de 30°/s de velocidade angular (Bahill et al., 1980; Krauzlis, 2004). Quando o alvo excede esse patamar, o ganho cai e o cérebro é obrigado a intercalar sacadas corretivas para recuperar o foco."
      }
    },
    {
      "@type": "Question",
      "name": "A acuidade visual dinâmica e a mira em movimento podem ser aprimoradas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Treinos deliberados de perseguição refinam o processamento na área MT/V5, calibram a precisão do cerebelo e encurtam o tempo de ajuste motor em esportes dinâmicos e games de tiro."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o impacto da taxa de atualização do monitor (60 Hz vs 144 Hz vs 240 Hz)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Telas de 60 Hz atualizam a cada 16,7 ms, gerando saltos visuais perceptíveis. Displays de 144 Hz (6,9 ms) e 240 Hz (4,1 ms) oferecem movimentação fluida e contínua, reduzindo o erro de deslizamento retiniano e aumentando a precisão de tiro (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Como a aceleração repentina e os ricochetes afetam a precisão de clique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trajetórias constantes são previstas facilmente pelo cérebro. No entanto, uma colisão com a borda quebra o modelo preditivo, exigindo de 150 a 200 ms para calcular o novo vetor e disparar uma sacada de correção."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre controle visual-motor de malha aberta e malha fechada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os primeiros ~100 ms do movimento de mira ocorrem em malha aberta (disparo balístico sem possibilidade de correção). Após esse período, entra em ação a malha fechada, na qual o feedback visual em tempo real orienta microajustes no cursor até o impacto."
      }
    },
    {
      "@type": "Question",
      "name": "O teste de alvos móveis é gratuito e meus resultados são privados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O teste de alvo móvel do SkillDrills é 100% gratuito e dispensa cadastros ou pagamentos. Todos os dados e recordes ficam restritos unicamente à memória local do seu navegador."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "Ciência do Rastreamento Cinético e da Interceptação de Trajetórias",
  intro: [
    "A interceptação dinâmica de alvos representa uma faculdade sensoriomotora fundamental no esporte de alto rendimento, automobilismo, aviação e e-sports competitivos. Atingir com precisão um objeto acelerado em trajetória não-linear exige coordenação entre movimentos de perseguição ocular suave, extrapolação preditiva e controle motor de malha fechada.",
    "A neurobiologia do rastreamento cinético reside nos neurônios com seletividade direcional da área visual temporal média (MT/V5) e temporal superior medial (MST). Essas estruturas computam vetores de velocidade e enviam comandos para os campos oculares frontais (FEF) e os núcleos pontinos, que por sua vez acionam o cerebelo para manter o ganho de rastreamento ocular (Krauzlis, 2004).",
    "No clássico estudo de psicofísica de Rashbass (1961), demonstrou-se que a perseguição suave e os movimentos sacádicos operam por subsistemas independentes: a perseguição responde à velocidade do estímulo na retina, enquanto as sacadas corrigem erros de posição espacial. Quando os alvos aceleram além de 30–40°/s ou colidem com as bordas, sacadas corretivas são convocadas de imediato (Bahill et al., 1980).",
    "Ademais, as pesquisas de Land & McLeod (2000) em atletas de esportes com bola comprovam que rebatedores de elite não rastreiam o projétil de forma contínua em todo o trajeto; eles realizam sacadas antecipatórias para os locais prováveis de quique e janelas de rebatida. Este drill exercita exatamente essa capacidade de previsão milimétrica."
  ],
  benchmarks: {
    title: "Faixas de Desempenho em Interceptação de Alvo Móvel (Referência Científica)",
    headers: ["Nível de Desempenho", "Janela de Pacing", "Pontuação & Combo Limiar", "Perfil de Rastreamento e Interceptação"],
    rows: [
      ["Tier 1: Interceptor Cinético Apex", "< 0.25s Janela", "16.000+ PTS | Combo 25x+", "Perseguição suave de elite; extrapolação vetorial perfeita sem atraso de sacada corretiva. Nível de pilotos e pró-players."],
      ["Tier 2: Rastreador Dinâmico Superior", "0.25 – 0.45s Janela", "10.500 – 15.999 PTS | Combo 16x+", "Excelente fluidez ocular; rápidas correções em malha fechada com mínimo overshoot em alvos com aceleração contínua."],
      ["Tier 3: Padrão Adulto Consolidado", "0.46 – 0.70s Janela", "6.000 – 10.499 PTS | Combo 9x+", "Tracking seguro em linhas retas; ligeiro retardo de adaptação temporal quando ocorrem ricochetes repentinos nas paredes."],
      ["Tier 4: Rastreador em Desenvolvimento", "0.71 – 1.00s Janela", "2.500 – 5.999 PTS | Combo 4x+", "Dependência acentuada de sacadas reativas em vez de perseguição suave; hesitação perceptível em velocidades elevadas."],
      ["Tier 5: Jitter de Rastreamento (Base)", "> 1.00s Janela", "< 2.500 PTS | Combo < 4x", "Oscilação motora constante; dificuldade em manter a fóvea no alvo móvel; demanda estabilização básica da fixação."]
    ],
    note: "Estes parâmetros baseiam-se na psicofísica da perseguição suave e cronometria de interceptação (Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015). Desempenho varia com a taxa de atualização do monitor e polling do mouse."
  },
  techniques: {
    title: "Técnicas Práticas para Otimizar a Interceptação de Alvos",
    items: [
      {
        name: "Mira com Antecipação Vetorial (Ajuste de Rashbass)",
        desc: "Com o atraso sensoriomotor de 150 a 220 ms, clicar onde o alvo está no momento resulta em tiro atrasado (Rashbass, 1961).",
        tips: "Extrapole o vetor de direção e mire 5 a 15 pixels à frente da esfera móvel ao longo de sua trajetória."
      },
      {
        name: "Antecipação de Ricochete (Ancoragem de Land & McLeod)",
        desc: "Atletas de elite direcionam a visão para o local de reflexão antes que o projétil atinja a borda (Land & McLeod, 2000).",
        tips: "Quando a esfera se aproximar da borda, mova o cursor para o ângulo de saída previsto, sem persegui-la contra a parede."
      },
      {
        name: "Estabilização Retiniana Contínua (Loop de Krauzlis)",
        desc: "A perseguição suave eficiente exige manter o alvo no centro da fóvea para anular o desfoque retiniano (Krauzlis, 2004).",
        tips: "Deslize o olhar de maneira fluida e contínua acompanhando o objeto, em vez de fixar em um ponto e aguardar a passagem."
      },
      {
        name: "Desacoplamento Rítmico e Disciplina de Clique",
        desc: "Mudanças imprevisíveis de trajeto induzem sacadas de correção (Bahill et al., 1980); cliques afobados derrubam o combo.",
        tips: "Evite clicar em ritmo mecânico. Confirme visualmente o alinhamento da retícula antes de acionar o botão."
      }
    ]
  },
  steps: [
    "Clique em Iniciar Drill para iniciar a rodada de 45 segundos de interceptação cinética.",
    "Identifique a esfera móvel com os olhos e estabeleça um rastreamento contínuo e suave.",
    "Antecipe a trajetória e direcione a mira ligeiramente à frente do trajeto do alvo.",
    "Clique com precisão na esfera antes do fim do tempo de exibição (+150 PTS × Multiplicador e +0,6 s de bônus).",
    "Analise seu número de interceptações, maior sequência de combos e graduação ao término."
  ],
  audience: "Jogadores de FPS e MOBA competitivos, atletas de esportes de combate e raquete, pilotos de automobilismo e todos que buscam desenvolver o rastreamento visual cinético.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/pt/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/pt/drills/visual/tracking-accuracy/pursuit-tracker", label: "Rastreador de Perseguição Suave" },
    { href: "/pt/drills/visual/reaction-speed/light-reaction", label: "Teste de Reação Luminosa" },
    { href: "/pt/drills/visual/reaction-speed/go/no-go", label: "Teste Go / No-Go de Inibição" },
    { href: "/pt/drills/visual/depth-perception/distance-judgment", label: "Percepção de Profundidade e Distância" },
    { href: "/pt/drills/visual/visual-recognition/entropic-grid", label: "Busca em Grade Entrópica" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "Rastreamento de Alvo Móvel: Visão Dinâmica" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/pt/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
