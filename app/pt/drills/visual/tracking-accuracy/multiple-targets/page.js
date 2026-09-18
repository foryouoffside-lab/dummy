import GhostLinkClient from '@/app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste MOT Online: Rastreamento de Objetos | SkillDrills",
  description: "Teste de rastreamento de múltiplos objetos (MOT) grátis: Siga vários alvos entre distratores. Treine sua atenção dividida e visão periférica.",
  keywords: [
    "teste de rastreamento de múltiplos objetos",
    "teste MOT online",
    "rastreamento visual múltiplo",
    "treino de visão periférica",
    "atenção visual dividida",
    "memória de trabalho espacial",
    "coordenação visual esportiva",
    "exercícios para visão periférica",
    "psicofísica visual online",
    "neurociência cognitiva visão",
    "teste de foco esportivo",
    "rastreamento paralelo de alvos"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual/tracking-accuracy/multiple-targets",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
  },
  openGraph: {
    title: "Teste MOT Online: Rastreamento de Objetos | SkillDrills",
    description: "Teste de rastreamento de múltiplos objetos (MOT) grátis: Siga vários alvos entre distratores. Treine sua atenção dividida e visão periférica.",
    url: "https://skilldrills.online/pt/drills/visual/tracking-accuracy/multiple-targets",
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "es_ES", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste MOT Online: Rastreamento de Objetos | SkillDrills",
    description: "Teste de rastreamento de múltiplos objetos (MOT) grátis: Siga vários alvos entre distratores. Treine sua atenção dividida e visão periférica.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const multipleTargetsGuide = {
  heading: "Teste de Rastreamento de Múltiplos Objetos (MOT)",
  intro: "O paradigma de Rastreamento de Múltiplos Objetos (MOT - Multiple Object Tracking), originalmente concebido por Zenon Pylyshyn (1988), constitui o padrão-ouro na neuropsicologia experimental para avaliar a capacidade humana de atenção visual dividida e indexação espacial dinâmica. Diferente do rastreamento foveal de um único alvo (smooth pursuit), o MOT exige que o córtex parietal posterior mantenha múltiplos ponteiros espaciais independentes (FINSTs - Visual Indexes) sobre objetos em movimento contínuo enquanto ignora dezenas de distratores morfologicamente idênticos. Atletas de elite em esportes coletivos (como futebol e basquete), pilotos de aviação e jogadores de eSports táticos dependem dessa arquitetura atencional para manter percepção situacional (situational awareness) em ambientes de alta saturação informativa.",
  benchmarks: {
    title: "Faixas de Desempenho no Rastreamento de Múltiplos Objetos (Referencial Editorial)",
    headers: ["Faixa de Desempenho", "Capacidade Efetiva", "Pontuação & Limiar de Precisão", "Perfil de Atenção Visual e Cognição"],
    rows: [
      ["Nível 1: Rastreador Multifocal Apex", "5+ Alvos em Paralelo", "Score: 60 PTS (3/3) | Precisão 100% (Velocidade Máxima)", "Indexação visual paralela profissional; distribuição hemifield perfeita sem perda por colisão. Típico de gamers profissionais de elite, pilotos de caça e atletas de alta performance (Faubert, 2013; Green & Bavelier, 2006)."],
      ["Nível 2: Indexador Paralelo Avançado", "4 Alvos em Paralelo", "Score: 50 – 59 PTS | Precisão 85 – 99%", "Rastreamento multifocal robusto; mantém diferenciação alvo-distrator em trajetórias com alta densidade de colisão com desvio centroide mínimo."],
      ["Nível 3: Atenção Dividida Competente", "3 Alvos em Paralelo", "Score: 40 – 49 PTS | Precisão 70 – 84%", "Padrão de referência adulto saudável; rastreamento confiável de 3 alvos em velocidade moderada, suscetível a trocas em agrupamento espacial denso."],
      ["Nível 4: Memória Espacial em Desenvolvimento", "2 Alvos em Paralelo", "Score: 20 – 39 PTS | Precisão 50 – 69%", "Tendência a colapsar atenção multifocal em um único ponto foveal; dificuldade em suprimir distratores durante rebotes de alta aceleração."],
      ["Nível 5: Foco Inicial / Alvo Único", "1 Alvo Baseline", "Score: < 20 PTS | Precisão < 50%", "Perda frequente de alvos nas deflexões iniciais; necessita de menor número de esferas e velocidade reduzida para desenvolver ancoragem pré-atentiva."]
    ],
    note: "Estas faixas de desempenho representam um referencial editorial fundamentado na literatura psicofísica do rastreamento de múltiplos objetos e memória de trabalho visual (Pylyshyn & Storm, 1988; Cavanagh & Alvarez, 2005; Alvarez & Cavanagh, 2004; Green & Bavelier, 2006; Faubert, 2013). O desempenho individual varia conforme a velocidade dos alvos, densidade de distratores e duração do rastreamento."
  },
  techniques: {
    title: "Estratégias Neurocognitivas para Rastreamento Multifocal",
    items: [
      {
        name: "Estratégia do Centroide (Foco Global)",
        desc: "Em vez de movimentar os olhos rapidamente entre os alvos (sacadas foveais consecutivas), fixe o olhar suavemente no baricentro geométrico (ponto médio imaginário) formado pelos alvos. Deixe que a visão periférica processe o movimento simultâneo.",
        tips: "Evite fixar os olhos em uma única esfera por mais de 200 milissegundos; a visão periférica é otimizada para detecção de movimento dinâmico."
      },
      {
        name: "Independência dos Hemisférios Visuais",
        desc: "O córtex cerebral aloca recursos de rastreamento de forma semi-independente para o campo visual esquerdo (processado pelo hemisfério direito) e campo visual direito (processado pelo hemisfério esquerdo). Distribuir os alvos pelos dois lados dobra sua capacidade efetiva.",
        tips: "Ao posicionar a tela confortavelmente no centro do seu campo visual, os dois hemisférios dividem a carga atencional sem sobrecarga."
      },
      {
        name: "Ponteiros Pré-Atentivos (FINSTs de Pylyshyn)",
        desc: "Confie na capacidade inata do sistema visual pré-cortical de ancorar 'etiquetas invisíveis' aos objetos. Quando dois alvos se cruzam, não tente analisar formas, mantenha o vetor de movimento contínuo ativo no córtex parietal.",
        tips: "Durante colisões densas, preveja o ângulo de saída com base na conservação do momento em vez de rastrear o impacto exato."
      },
      {
        name: "Supressão Ativa de Distratores",
        desc: "A precisão no MOT depende tanto de iluminar mentalmente os alvos quanto de inibir proativamente as esferas não-alvo. O córtex pré-frontal inibe os sinais de distratores para prevenir trocas acidentais de identidade.",
        tips: "Mantenha a respiração ritmada e postura estável para evitar ativação adrenérgica excessiva que estreita o campo visual (visão de túnel)."
      }
    ]
  },
  steps: [
    "Configure a duração da sessão (15s a 60s), velocidade e número total de esferas nas opções de treino.",
    "Clique em Iniciar Treino e memorize com precisão as esferas destacadas em verde durante a prévia de 2 segundos.",
    "Assim que as esferas perderem o destaque e começarem a se movimentar, ancore seu olhar centralmente e rastreie os alvos em paralelo.",
    "Quando o movimento cessar completamente, clique ou toque em cada esfera que você identificou como alvo original (+20 PTS por acerto).",
    "Analise seu relatório final com pontuação total, percentual de precisão e nível de capacidade multifocal atingido."
  ],
  audience: "Essencial para atletas de esportes coletivos (futebol, basquete, handebol), jogadores competitivos de FPS (CS2, Valorant, Apex Legends) e MOBA (LoL, Dota 2), pilotos de aviação e qualquer profissional que precise manter visão panorâmica e controle simultâneo de múltiplos eventos dinâmicos.",
  faqs: [
    {
        "q": "O que exatamente o teste de Multiple Object Tracking (MOT) avalia?",
        "a": "O MOT avalia a capacidade de atenção visual dividida, indexação dinâmica de múltiplos objetos e memória de trabalho espacial. Ele mede quantos estímulos móveis idênticos seu cérebro consegue monitorar em tempo real em meio a distratores concorrentes sem sofrer cegueira por saturação."
    },
    {
        "q": "Quantos objetos em movimento um ser humano consegue rastrear simultaneamente?",
        "a": "Em média, adultos saudáveis conseguem rastrear com precisão entre 3 e 4 objetos simultaneamente em velocidades moderadas. Atletas profissionais de elite e pilotos treinados atingem 5 ou até 6 alvos em paralelo graças a uma arquitetura neural otimizada de alocação de recursos atencionais (Cavanagh & Alvarez, 2005)."
    },
    {
        "q": "Por que tentar olhar individualmente para cada esfera com movimentos sacádicos falha?",
        "a": "Cada sacada ocular leva de 20 a 40 ms para ser executada e impõe supressão sacádica (uma breve cegueira neural transitória). Alternar fovealmente entre 4 esferas gera atrasos de 150 a 300 ms, tempo suficiente para que alvos colidam, troquem trajetórias e se percam completamente. O rastreamento bem-sucedido opera via atenção multifocal distribuída."
    },
    {
        "q": "O que é a Estratégia do Centroide (Centroid Gaze) no rastreamento múltiplo?",
        "a": "É a técnica de manter o ponto de fixação ocular no centro geométrico médio do grupo de alvos. Ao fixar o olhar nesse baricentro invisível, todos os alvos permanecem na fóvea periférica ou parafóvea, permitindo que os detectores de movimento do córtex visual processem todos os vetores simultaneamente sem exigir micromovimentos oculares contínuos."
    },
    {
        "q": "O que significa independência dos hemisférios visuais (Hemifield Independence)?",
        "a": "Pesquisas de Alvarez e Cavanagh (2005) demonstraram que a atenção visual opera em dois processadores independentes: o hemisfério direito monitora o campo visual esquerdo e o hemisfério esquerdo monitora o campo visual direito. Assim, rastrear 2 alvos à esquerda e 2 à direita é significativamente mais fácil do que rastrear 4 alvos confinados a um único lado da tela."
    },
    {
        "q": "Como o treino MOT beneficia atletas de esportes coletivos como futebol e basquete?",
        "a": "Em esportes como futebol ou basquete, um jogador precisa monitorar simultaneamente a bola, a movimentação de três defensores e a corrida de desmarque de um companheiro. O treino MOT amplia o campo visual útil (UFOV) e acelera a leitura tática, permitindo passes antecipados e leitura de jogadas sob pressão (Faubert, 2013)."
    },
    {
        "q": "Quais são as vantagens práticas deste teste para jogadores de FPS e MOBAs táticos?",
        "a": "Em jogos como Valorant ou Apex Legends, o jogador precisa manter a mira no crosshair enquanto monitora o minimapa, projéteis inimigos na visão periférica e companheiros de equipe flanqueando. O MOT previne a 'visão de túnel' (hiperfoco na mira) e aprimora a consciência situacional espacial."
    },
    {
        "q": "Como evitar trocas de identidade (Identity Swaps) quando alvos colidem ou se cruzam?",
        "a": "Trocas de identidade ocorrem quando dois objetos se aproximam a menos da distância crítica de resolução espacial atencional. Para mitigar isso, concentre-se no vetor de inércia: antecipe a trajetória linear contínua do objeto antes e após a interseção, em vez de focar na proximidade do ponto de contato."
    },
    {
        "q": "Qual é a rotina ideal de treinamento de rastreamento de múltiplos objetos?",
        "a": "Recomenda-se realizar de 3 a 5 séries de 10 a 15 minutos por semana. Sessões curtas com foco intenso produzem neuroplasticidade superior sem sobrecarregar a musculatura ocular extrínseca ou causar fadiga visual cortical."
    },
    {
        "q": "Meus dados de rastreamento ou desempenho são enviados para servidores externos?",
        "a": "Não. Todas as simulações físicas vetoriais, renderização em canvas e cálculos de pontuação e precisão rodam 100% no navegador do seu dispositivo via JavaScript local. Nenhum dado de sessão ou desempenho é transmitido ou coletado externamente."
    }
],
  sources: pickSources([
    "pylyshyn1988tracking",
    "cavanagh2005tracking",
    "faubert2013professional",
    "green2006action",
    "alvarez2004capacity",
    "scialfa2002visual"
  ]),
  related: [
    { href: "/pt/drills/visual/tracking-accuracy/moving-target", label: "Rastreamento de Alvo Móvel" },
    { href: "/pt/drills/visual-tracking/split-screen-tracking", label: "Rastreamento em Tela Dividida" },
    { href: "/pt/drills/visual/reaction-speed/go/no-go", label: "Teste Go/No-Go" },
    { href: "/pt/drills/visual/reaction-speed/light-reaction", label: "Reação a Estímulos de Luz" },
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
    { "@type": "ListItem", "position": 4, "name": "Precisão de Rastreamento", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Rastreamento de Múltiplos Objetos", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/multiple-targets" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Rastreamento de Múltiplos Objetos (MOT)",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Rastreamento de Múltiplos Objetos (MOT)",
  "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/multiple-targets",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treino de Rastreamento de Múltiplos Alvos (MOT)",
  "gamePlatform": "Web Browser",
  "genre": ["Visão Esportiva", "Treino Cognitivo", "Percepção Visual"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Rastreamento de Múltiplos Objetos (MOT)",
  "description": "Protocolo passo a passo para testar e treinar a atenção visual dividida e visão periférica usando o teste MOT.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Etapa 1", "text": "Configure a duração da sessão (15s a 60s), velocidade e número total de esferas nas opções de treino." },
    { "@type": "HowToStep", "position": 2, "name": "Etapa 2", "text": "Clique em Iniciar Treino e memorize com precisão as esferas destacadas em verde durante a prévia de 2 segundos." },
    { "@type": "HowToStep", "position": 3, "name": "Etapa 3", "text": "Assim que as esferas perderem o destaque e começarem a se movimentar, ancore seu olhar centralmente e rastreie os alvos em paralelo." },
    { "@type": "HowToStep", "position": 4, "name": "Etapa 4", "text": "Quando o movimento cessar completamente, clique ou toque em cada esfera que você identificou como alvo original (+20 PTS por acerto)." },
    { "@type": "HowToStep", "position": 5, "name": "Etapa 5", "text": "Analise seu relatório final com pontuação total, percentual de precisão e nível de capacidade multifocal atingido." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "O que exatamente o teste de Multiple Object Tracking (MOT) avalia?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O MOT avalia a capacidade de atenção visual dividida, indexação dinâmica de múltiplos objetos e memória de trabalho espacial. Ele mede quantos estímulos móveis idênticos seu cérebro consegue monitorar em tempo real em meio a distratores concorrentes sem sofrer cegueira por saturação."
        }
    },
    {
        "@type": "Question",
        "name": "Quantos objetos em movimento um ser humano consegue rastrear simultaneamente?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em média, adultos saudáveis conseguem rastrear com precisão entre 3 e 4 objetos simultaneamente em velocidades moderadas. Atletas profissionais de elite e pilotos treinados atingem 5 ou até 6 alvos em paralelo graças a uma arquitetura neural otimizada de alocação de recursos atencionais (Cavanagh & Alvarez, 2005)."
        }
    },
    {
        "@type": "Question",
        "name": "Por que tentar olhar individualmente para cada esfera com movimentos sacádicos falha?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cada sacada ocular leva de 20 a 40 ms para ser executada e impõe supressão sacádica (uma breve cegueira neural transitória). Alternar fovealmente entre 4 esferas gera atrasos de 150 a 300 ms, tempo suficiente para que alvos colidam, troquem trajetórias e se percam completamente. O rastreamento bem-sucedido opera via atenção multifocal distribuída."
        }
    },
    {
        "@type": "Question",
        "name": "O que é a Estratégia do Centroide (Centroid Gaze) no rastreamento múltiplo?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "É a técnica de manter o ponto de fixação ocular no centro geométrico médio do grupo de alvos. Ao fixar o olhar nesse baricentro invisível, todos os alvos permanecem na fóvea periférica ou parafóvea, permitindo que os detectores de movimento do córtex visual processem todos os vetores simultaneamente sem exigir micromovimentos oculares contínuos."
        }
    },
    {
        "@type": "Question",
        "name": "O que significa independência dos hemisférios visuais (Hemifield Independence)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pesquisas de Alvarez e Cavanagh (2005) demonstraram que a atenção visual opera em dois processadores independentes: o hemisfério direito monitora o campo visual esquerdo e o hemisfério esquerdo monitora o campo visual direito. Assim, rastrear 2 alvos à esquerda e 2 à direita é significativamente mais fácil do que rastrear 4 alvos confinados a um único lado da tela."
        }
    },
    {
        "@type": "Question",
        "name": "Como o treino MOT beneficia atletas de esportes coletivos como futebol e basquete?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em esportes como futebol ou basquete, um jogador precisa monitorar simultaneamente a bola, a movimentação de três defensores e a corrida de desmarque de um companheiro. O treino MOT amplia o campo visual útil (UFOV) e acelera a leitura tática, permitindo passes antecipados e leitura de jogadas sob pressão (Faubert, 2013)."
        }
    },
    {
        "@type": "Question",
        "name": "Quais são as vantagens práticas deste teste para jogadores de FPS e MOBAs táticos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em jogos como Valorant ou Apex Legends, o jogador precisa manter a mira no crosshair enquanto monitora o minimapa, projéteis inimigos na visão periférica e companheiros de equipe flanqueando. O MOT previne a 'visão de túnel' (hiperfoco na mira) e aprimora a consciência situacional espacial."
        }
    },
    {
        "@type": "Question",
        "name": "Como evitar trocas de identidade (Identity Swaps) quando alvos colidem ou se cruzam?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Trocas de identidade ocorrem quando dois objetos se aproximam a menos da distância crítica de resolução espacial atencional. Para mitigar isso, concentre-se no vetor de inércia: antecipe a trajetória linear contínua do objeto antes e após a interseção, em vez de focar na proximidade do ponto de contato."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é a rotina ideal de treinamento de rastreamento de múltiplos objetos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Recomenda-se realizar de 3 a 5 séries de 10 a 15 minutos por semana. Sessões curtas com foco intenso produzem neuroplasticidade superior sem sobrecarregar a musculatura ocular extrínseca ou causar fadiga visual cortical."
        }
    },
    {
        "@type": "Question",
        "name": "Meus dados de rastreamento ou desempenho são enviados para servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. Todas as simulações físicas vetoriais, renderização em canvas e cálculos de pontuação e precisão rodam 100% no navegador do seu dispositivo via JavaScript local. Nenhum dado de sessão ou desempenho é transmitido ou coletado externamente."
        }
    }
]
};

export default function MultipleTargetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <GhostLinkClient copy={{ title: "Teste de Rastreamento de Múltiplos Objetos (MOT)" }} />
        <DrillGuide guide={multipleTargetsGuide} />
        <RelatedDrills related={multipleTargetsGuide.related} />
      </main>
    </>
  );
}
