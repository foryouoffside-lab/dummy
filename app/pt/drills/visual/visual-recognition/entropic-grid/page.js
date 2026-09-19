import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Busca Visual: Entropic Grid | SkillDrills",
  description: "Teste de busca visual e atenção seletiva grátis online. Localize alvos em uma matriz de 100 células sob ruído dinâmico. Treine escaneamento visual rápido.",
  keywords: [
    "teste de busca visual online",
    "teste de atenção seletiva",
    "exercícios de escaneamento visual",
    "matriz de busca entropic grid",
    "filtro de ruído visual dinâmico",
    "teste de foco atencional",
    "percepção de pop-out visual",
    "velocidade de processamento visual",
    "visão periférica escaneamento",
    "neuropsicologia busca visual",
    "tempo de fixação ocular teste",
    "rastreamento visual de alta densidade"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual/visual-recognition/entropic-grid",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
  },
  openGraph: {
    title: "Teste de Busca Visual: Entropic Grid | SkillDrills",
    description: "Teste de busca visual e atenção seletiva grátis online. Localize alvos em uma matriz de 100 células sob ruído dinâmico. Treine escaneamento visual rápido.",
    url: "https://skilldrills.online/pt/drills/visual/visual-recognition/entropic-grid",
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "es_ES", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste de Busca Visual: Entropic Grid | SkillDrills",
    description: "Teste de busca visual e atenção seletiva grátis online. Localize alvos em uma matriz de 100 células sob ruído dinâmico. Treine escaneamento visual rápido.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Psicologia Cognitiva & Atenção Seletiva",
  heading: "Teste de Busca Visual Entropic Grid – Filtragem de Ruído & Discriminação",
  intro: [
    "A busca visual (Visual Search) representa o processo perceptivo primário de localizar um alvo específico imerso em um campo saturado de ruídos e distratores visuais. De um piloto militar escaneando um cockpit repleto de instrumentos a um atleta de esports identificando a silhueta de um oponente em terrenos complexos, a velocidade de busca visual determina a percepção situacional e a sobrevivência motora. Na psicofísica experimental, esse desempenho decorre do equilíbrio dinâmico entre a saliência visual ascendente (bottom-up) e o direcionamento atencional descendente (top-down) (Treisman & Gelade, 1980; Wolfe, 1994).",
    "Pela Teoria da Integração de Características (Feature Integration Theory: FIT) de Treisman e Gelade (1980), o sistema visual processa dimensões elementares — como cor e orientação espacial — de forma paralela e inconsciente durante um estágio pré-atencional. Quando um alvo difere por um atributo singular proeminente, ocorre um fenômeno instantâneo de 'pop-out'. Contudo, quando o alvo é definido por uma conjunção complexa de caracteres alfanuméricos, a atenção espacial focalizada precisa ser direcionada serialmente para conectar esses traços, orientada pelas prioridades do modelo Guided Search de Wolfe (1994; Wolfe, 2007).",
    "A regeneração periódica dos caracteres a cada 700 milissegundos no Entropic Grid simula as demandas cognitivas de distração do mundo real sob a ótica da Teoria da Carga Perceptiva (Perceptual Load Theory) de Nilli Lavie (1995). A atenção seletiva é condicionada por um limite estrutural de processamento: sob baixa carga perceptual, a capacidade atencional excedente transborda involuntariamente, processando distratores irrelevantes. Por outro lado, em regimes de alta carga perceptual — como a inspeção dinâmica de uma matriz de 100 células —, toda a largura de banda cognitiva é consumida pelo alvo, desencadeando a supressão neuroquímica automática do ruído visual de fundo (Lavie, 1995).",
    "A atenção espacial humana não opera como uma lanterna estática, mas comporta-se como uma lente de zoom elástica (Zoom Lens Model, Eriksen & St. James, 1986). Observadores de elite modulam constantemente a amplitude do seu foco, alternando entre uma visão global de baixa resolução sobre a grade 10x10 e agrupamentos locais de alta resolução em quadrantes de 2x2. Ao explorar o campo parafoveal contíguo aos 2 graus foveais centrais, descartam-se blocos inteiros de distratores sem a necessidade de sacadas oculares balísticas individuais (Posner, 1980; Woods et al., 2015).",
    "Este módulo web opera com temporizadores de alta fidelidade via performance.now() para mensurar a latência média de fixação, o total de confirmações válidas e a imunidade ao clutter visual ao longo de testes de 45 segundos. O treinamento metódico no Entropic Grid aprimora os circuitos frontoparietais de filtragem atencional, trazendo transferências diretas para a identificação de alvos em shooters táticos, navegação veicular sob tráfego denso e inspeção crítica de dados complexos."
  ],
  benchmarks: {
    title: "Critérios de Referência para Busca Visual e Atenção Seletiva",
    headers: ["Faixa de Desempenho", "Acertos Confirmados (45s)", "Latência Média de Fixação", "Precisão de Filtro de Ruído", "Perfil Neurocognitivo"],
    rows: [
      ["Nível 1: Elite Perceptiva (Top 1%)", "18+ Acertos", "< 180 ms", "> 96%", "Síntese impecável de pop-out pré-atentivo e escaneamento top-down focado (Wolfe, 2007)."],
      ["Nível 2: Busca Avançada (Top 5%)", "14 – 17 Acertos", "180 – 230 ms", "88 – 95%", "Filtro robusto de distratores dinâmicos e varredura eficiente por quadrantes."],
      ["Nível 3: Padrão Médio (Top 25%)", "10 – 13 Acertos", "230 – 300 ms", "76 – 87%", "Velocidade de processamento padrão; combina escaneamento serial e detecção periférica."],
      ["Nível 4: Nível Inicial (Top 50%)", "7 – 9 Acertos", "300 – 400 ms", "65 – 75%", "Vulnerável à captura de atenção pelo ruído visual e transições de tela (clutter latency)."],
      ["Nível 5: Em Desenvolvimento (Baseline)", "< 7 Acertos", "> 400 ms", "< 65%", "Vagância sacádica desordenada e perda do modelo de busca na memória de trabalho."]
    ],
    note: "Baseado na literatura científica de atenção visual e busca seletiva (Treisman & Gelade 1980; Wolfe 2007; Duncan & Humphreys 1989; Posner 1980)."
  },
  techniques: {
    title: "Estratégias para Aumentar a Velocidade de Varredura Visual",
    items: [
      {
        name: "Varredura em Bloco por Quadrantes",
        desc: "Em vez de ler a grade linha por linha como um texto, divida visualmente a matriz em 4 quadrantes de 5x5 e ancore o olhar no centro de cada bloco para permitir o reconhecimento parafoveal de múltiplos símbolos.",
        tips: "Reduza os movimentos sacádicos a 4 ou 5 pontos de apoio na grade por ciclo de busca."
      },
      {
        name: "Filtro Pré-Atentivo por Traços Relevantes",
        desc: "Mantenha em mente a morfologia exata do caractere (ex: ângulos agudos de um 'W' ou curvas de um '8') para rejeitar instantaneamente símbolos de categorias distintas.",
        tips: "Não leia mentalmente o som do caractere; ative apenas a representação geométrica visual."
      },
      {
        name: "Resistência à Captura por Luminância",
        desc: "O piscar periódico da matriz atrai reflexamente os olhos para as margens externas. Eduque a atenção para manter o foco na zona de inspeção atual.",
        tips: "Mantenha o foco atencional ancorado mesmo durante a fração de segundo da troca de símbolos."
      },
      {
        name: "Prontidão Motora do Cursor",
        desc: "Deixe o cursor do mouse flutuando no terço central da matriz para minimizar a distância motora de clique após a identificação visual foveal.",
        tips: "Use a mão relaxada no periférico para evitar microtremores por tensão."
      }
    ]
  },
  steps: [
    "Observe o código de dois caracteres indicado no cabeçalho do teste.",
    "Clique em Iniciar Teste para acionar a contagem regressiva e iniciar a matriz dinâmica de 100 células.",
    "Escaneie a grade rapidamente e clique sobre o código correto antes que a grade regenere ou os 45 segundos expirem.",
    "Cada clique correto concede pontos e apresenta imediatamente um novo código de busca.",
    "Ao final da sessão, analise sua média de acertos, latência de resposta e precisão de filtragem de ruído."
  ],
  audience: "Recomendado para jogadores competitivos de esports táticos (Valorant, CS2, Apex Legends, LoL), operadores de vigilância, analistas de dados, pilotos e profissionais que dependem de triagem rápida de informações visuais sob distração.",
  faqs: [
    {
        "q": "O que é o teste de busca visual Entropic Grid (Visual Search Task)?",
        "a": "O Entropic Grid é uma aplicação do paradigma clássico de busca visual (Treisman & Gelade, 1980; Wolfe, 2007). Ele avalia a capacidade do córtex visual e lobos frontoparietais de extrair códigos alfanuméricos específicos imersos em uma matriz de 100 células sob perturbação estocástica periódica (700 ms)."
    },
    {
        "q": "Qual a diferença entre a busca paralela (pop-out) e a busca serial?",
        "a": "A busca paralela ocorre quando o alvo difere dos distratores por uma característica visual primária (cor, brilho ou orientação), saltando aos olhos instantaneamente (efeito pop-out). Já a busca serial requer deslocamentos sacádicos voluntários célula a célula para comparar atributos combinados, consumindo mais tempo de processamento neural."
    },
    {
        "q": "Quais são os benefícios deste treino para jogos como Valorant, CS2 ou Apex Legends?",
        "a": "Em jogos de tiro em primeira pessoa, o jogador deve detectar modelos inimigos camuflados contra cenários visualmente complexos e dinâmicos (folhagens, partículas, sombras). O treino amplia a taxa de discriminação figura-fundo e diminui o tempo até o primeiro disparo (time-to-first-shot)."
    },
    {
        "q": "Qual é a técnica de escaneamento ocular mais veloz para a matriz de 100 células?",
        "a": "A estratégia mais eficiente é o escaneamento por quadrantes foveais. Divida mentalmente a grade 10x10 em 4 setores de 5x5 e ancore o olhar no centro de cada bloco, permitindo que a visão parafoveal filtre múltiplos caracteres sem exigir 100 micromovimentos oculares."
    },
    {
        "q": "Como evitar que a regeneração periódica a cada 700 ms cause distração atencional?",
        "a": "A regeneração cria uma onda de transitórios de luminância que excita involuntariamente o córtex visual precoce (V1). Para mitigar essa captura reflexa de atenção, foque ativamente no modelo mental do código-alvo no córtex pré-frontal, aplicando controle atencional top-down."
    },
    {
        "q": "Como o Entropic Grid se diferencia de uma Tabela de Schulte clássica?",
        "a": "Na Tabela de Schulte os números são fixos e procurados sequencialmente (1 a 25), dependendo de memória de curto prazo espacial. No Entropic Grid, os distratores mutam dinamicamente a cada 700 ms, exigindo contínua filtragem de ruído e adaptação a estímulos imprevisíveis."
    },
    {
        "q": "O treino de busca visual melhora a velocidade de leitura e o trabalho no computador?",
        "a": "Sim. Exercitar a discriminação rápida de símbolos sob ruído fortalece os movimentos sacádicos guiados e o span visual (campo de apreensão de leitura), reduzindo regressões involuntárias do olhar em textos densos e planilhas."
    },
    {
        "q": "Por que a velocidade de busca visual costuma diminuir com a idade e como compensar?",
        "a": "O envelhecimento reduz naturalmente a densidade sináptica frontoparietal e diminui o campo visual útil (UFOV). O treino contínuo em matrizes de busca estimula a neuroplasticidade compensatória, restabelecendo a velocidade de triagem perceptiva."
    },
    {
        "q": "Qual é o tempo de treino diário recomendado para máxima neuroplasticidade?",
        "a": "Sessões de 5 a 10 minutos (cerca de 4 a 6 testes de 45 segundos) são ideais. Intervalos de descanso de 30 segundos entre as rodadas evitam a sobrecarga do córtex pré-frontal e preservam o alto rendimento."
    },
    {
        "q": "Meus tempos de resposta ou coordenadas de clique são salvos em servidores externos?",
        "a": "Não. Todo o processamento algorítmico, regeneração pseudoaleatória da grade e cômputo de latência foveal ocorrem 100% no seu navegador via JavaScript client-side, sem coleta ou envio externo de telemetria."
    }
],
  sources: pickSources([
    "treisman1980feature",
    "wolfe2007guided",
    "duncan1989visual",
    "posner1980orienting",
    "scialfa2002visual"
  ]),
  related: [
    { href: "/pt/drills/visual/tracking-accuracy/moving-target", label: "Rastreamento de Alvo Móvel" },
    { href: "/pt/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/pt/drills/visual/tracking-accuracy/pursuit-tracker", label: "Perseguição Ocular Suave" },
    { href: "/pt/drills/visual/reaction-speed/go/no-go", label: "Teste Go/No-Go" },
    { href: "/pt/drills/fps/target-prioritization", label: "Priorização de Alvos FPS" },
    { href: "/pt/drills/visual-tracking/peripheral-ping-pursuit", label: "Perseguição Periférica" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepção Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Reconhecimento Visual", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 5, "name": "Entropic Grid", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition/entropic-grid" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Busca Visual Entropic Grid",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Busca Visual Entropic Grid",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treinamento de Busca Visual e Atenção Seletiva Entropic Grid",
  "gamePlatform": "Web Browser",
  "genre": ["Visão Esportiva", "Treino Cognitivo", "Atenção Seletiva"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste Entropic Grid",
  "description": "Protocolo para avaliar a atenção seletiva e a velocidade de escaneamento visual em matrizes de alta densidade.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Etapa 1", "text": "Observe o código de dois caracteres indicado no cabeçalho do teste." },
    { "@type": "HowToStep", "position": 2, "name": "Etapa 2", "text": "Clique em Iniciar Teste para acionar a contagem regressiva e iniciar a matriz dinâmica de 100 células." },
    { "@type": "HowToStep", "position": 3, "name": "Etapa 3", "text": "Escaneie a grade rapidamente e clique sobre o código correto antes que a grade regenere ou os 45 segundos expirem." },
    { "@type": "HowToStep", "position": 4, "name": "Etapa 4", "text": "Cada clique correto concede pontos e apresenta imediatamente um novo código de busca." },
    { "@type": "HowToStep", "position": 5, "name": "Etapa 5", "text": "Ao final da sessão, analise sua média de acertos, latência de resposta e precisão de filtragem de ruído." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "O que é o teste de busca visual Entropic Grid (Visual Search Task)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O Entropic Grid é uma aplicação do paradigma clássico de busca visual (Treisman & Gelade, 1980; Wolfe, 2007). Ele avalia a capacidade do córtex visual e lobos frontoparietais de extrair códigos alfanuméricos específicos imersos em uma matriz de 100 células sob perturbação estocástica periódica (700 ms)."
        }
    },
    {
        "@type": "Question",
        "name": "Qual a diferença entre a busca paralela (pop-out) e a busca serial?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "A busca paralela ocorre quando o alvo difere dos distratores por uma característica visual primária (cor, brilho ou orientação), saltando aos olhos instantaneamente (efeito pop-out). Já a busca serial requer deslocamentos sacádicos voluntários célula a célula para comparar atributos combinados, consumindo mais tempo de processamento neural."
        }
    },
    {
        "@type": "Question",
        "name": "Quais são os benefícios deste treino para jogos como Valorant, CS2 ou Apex Legends?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em jogos de tiro em primeira pessoa, o jogador deve detectar modelos inimigos camuflados contra cenários visualmente complexos e dinâmicos (folhagens, partículas, sombras). O treino amplia a taxa de discriminação figura-fundo e diminui o tempo até o primeiro disparo (time-to-first-shot)."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é a técnica de escaneamento ocular mais veloz para a matriz de 100 células?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "A estratégia mais eficiente é o escaneamento por quadrantes foveais. Divida mentalmente a grade 10x10 em 4 setores de 5x5 e ancore o olhar no centro de cada bloco, permitindo que a visão parafoveal filtre múltiplos caracteres sem exigir 100 micromovimentos oculares."
        }
    },
    {
        "@type": "Question",
        "name": "Como evitar que a regeneração periódica a cada 700 ms cause distração atencional?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "A regeneração cria uma onda de transitórios de luminância que excita involuntariamente o córtex visual precoce (V1). Para mitigar essa captura reflexa de atenção, foque ativamente no modelo mental do código-alvo no córtex pré-frontal, aplicando controle atencional top-down."
        }
    },
    {
        "@type": "Question",
        "name": "Como o Entropic Grid se diferencia de uma Tabela de Schulte clássica?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Na Tabela de Schulte os números são fixos e procurados sequencialmente (1 a 25), dependendo de memória de curto prazo espacial. No Entropic Grid, os distratores mutam dinamicamente a cada 700 ms, exigindo contínua filtragem de ruído e adaptação a estímulos imprevisíveis."
        }
    },
    {
        "@type": "Question",
        "name": "O treino de busca visual melhora a velocidade de leitura e o trabalho no computador?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Exercitar a discriminação rápida de símbolos sob ruído fortalece os movimentos sacádicos guiados e o span visual (campo de apreensão de leitura), reduzindo regressões involuntárias do olhar em textos densos e planilhas."
        }
    },
    {
        "@type": "Question",
        "name": "Por que a velocidade de busca visual costuma diminuir com a idade e como compensar?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O envelhecimento reduz naturalmente a densidade sináptica frontoparietal e diminui o campo visual útil (UFOV). O treino contínuo em matrizes de busca estimula a neuroplasticidade compensatória, restabelecendo a velocidade de triagem perceptiva."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é o tempo de treino diário recomendado para máxima neuroplasticidade?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sessões de 5 a 10 minutos (cerca de 4 a 6 testes de 45 segundos) são ideais. Intervalos de descanso de 30 segundos entre as rodadas evitam a sobrecarga do córtex pré-frontal e preservam o alto rendimento."
        }
    },
    {
        "@type": "Question",
        "name": "Meus tempos de resposta ou coordenadas de clique são salvos em servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. Todo o processamento algorítmico, regeneração pseudoaleatória da grade e cômputo de latência foveal ocorrem 100% no seu navegador via JavaScript client-side, sem coleta ou envio externo de telemetria."
        }
    }
]
};

export default function EntropicGridPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <EntropicGridClient copy={{ title: "Teste de Busca Visual: Entropic Grid", subtitle: "Filtragem de Ruído Dinâmico & Atenção Seletiva" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
