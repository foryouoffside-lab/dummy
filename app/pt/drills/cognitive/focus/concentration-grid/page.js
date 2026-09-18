import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR / pt-PT (concentration-grid)
// PRIMARY:  "tabela de schulte"              — Top Brazilian query (6 Google suggestions)
//           "tabela de schulte online"       — High intent query
// SECONDARY / LSI:
//           "tabela schulte"                 — Common variant (6 suggestions)
//           "tabela schulte online"          — Web app query
//           "tabela de schulte avançada"     — Experienced user query
//           "grade de concentracao"          — Direct translation
//           "visao periferica leitura dinamica"— Speed reading target
// ============================================================

export const metadata = {
  title: "Tabela de Schulte Online – Treino de Foco | SkillDrills",
  description: "Tabela de Schulte online grátis: Treine visão periférica, leitura dinâmica e busca visual rápida tocando números em grades de 3x3 a 8x8 sem cadastro.",
  keywords: [
    "tabela de schulte",
    "tabela de schulte online",
    "tabela schulte",
    "tabela schulte online",
    "tabela de schulte avançada",
    "grade de concentracao",
    "treino de foco e concentracao",
    "leitura dinamica tabela schulte",
    "exercicios para visao periferica",
    "treinamento cognitivo gratis",
    "tabela de schulte 5x5 gratis",
    "teste de atencao e foco online"
  ],
  openGraph: {
    title: "Tabela de Schulte Online – Treino de Foco e Visão Periférica | SkillDrills",
    description: "Treine visão periférica, leitura dinâmica e velocidade de busca visual com a tabela de Schulte online grátis. Toque números sequenciais em grades de 3x3 a 8x8 sem cadastro.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabela de Schulte Online – Treino de Foco e Visão Periférica | SkillDrills",
    description: "Treine visão periférica, leitura dinâmica e velocidade de busca visual com a tabela de Schulte online grátis. Toque números sequenciais em grades de 3x3 a 8x8 sem cadastro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Treinos Cognitivos", "item": "https://skilldrills.online/pt/drills/cognitive" },
    { "@type": "ListItem", "position": 3, "name": "Tabela de Schulte", "item": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tabela de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid",
  "description": "Treinador cognitivo interativo online que mede a velocidade de varredura visual e a atenção sustentada tocando em números sequenciais em matrizes expansivas.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["Velocidade de Busca Visual", "Expansão de Visão Periférica", "Eficiência Sacádica", "Atenção Sustentada"]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tabela de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid",
  "description": "Treinador cognitivo interativo online que mede a velocidade de varredura visual e a atenção sustentada tocando em números sequenciais em matrizes expansivas.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Tabela de Schulte Online (Concentration Grid)",
  "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid",
  "description": "Jogo online de busca sequencial de números em tabelas de Schulte em expansão. Desenvolva foco, leitura dinâmica e visão periférica.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Treino Cognitivo", "Busca Visual", "Tabela de Schulte", "Concentration Grid"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar com a Tabela de Schulte e Grade de Concentração",
  "description": "Instruções passo a passo para treinar velocidade de busca visual, visão periférica e foco sustentado com tabelas de números em expansão.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid#step-1",
      "name": "Fixe o olhar no centro da tabela",
      "text": "Mantenha os olhos relaxados focados próximo ao centro da matriz, sem mover a visão desordenadamente de um quadrado para o outro."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid#step-2",
      "name": "Toque nos números em ordem crescente",
      "text": "Encontre e clique nos números em sequência numérica estrita a começar pelo número 1 (1, 2, 3...) o mais rápido possível."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid#step-3",
      "name": "Expanda sua visão periférica",
      "text": "Aproveite a visão periférica para identificar a localização dos dígitos seguintes enquanto confirma o toque no número atual."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/cognitive/focus/concentration-grid#step-4",
      "name": "Supere matrizes progressivamente maiores",
      "text": "Ao limpar cada matriz, novas grades maiores e com dígitos rotacionados (3x3 até 8x8) surgem para testar sua concentração em 45 segundos."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-11",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é a Tabela de Schulte e qual a sua utilidade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Tabela de Schulte é uma grade psicodiagnóstica criada pelo psiquiatra alemão Walter Schulte. Serve para avaliar e expandir a visão periférica, acelerar a varredura visual e aprimorar a atenção sustentada, sendo muito empregada em cursos de leitura dinâmica e psicologia do esporte."
      }
    },
    {
      "@type": "Question",
      "name": "Como a Tabela de Schulte ajuda na leitura dinâmica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao treinar o cérebro a reconhecer símbolos fora do ponto focal foveal direto, a tabela amplia a visão parafoveal. Isso possibilita absorver blocos inteiros de texto ou frases de relance, eliminando a subvocalização e pausas excessivas (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a postura ou técnica correta para resolver a tabela?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A postura ideal consiste em fixar a visão no ponto central da grade e capturar os números vizinhos com a visão periférica. Mover os olhos franticamente de um canto ao outro aumenta a latência e cansa os músculos oculares (Lu et al., 2022)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é considerado uma boa pontuação ou tempo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Numa tabela 5x5 tradicional (25 números), completar a sequência em menos de 25 segundos indica excelente proficiência. Neste simulador dinâmico de 45 segundos, ultrapassar 6.000 pontos e atingir grades de 6x6 ou 7x7 equivale ao padrão de atletas de alto nível."
      }
    },
    {
      "@type": "Question",
      "name": "Por que as grades aumentam de tamanho e os números giram?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme você avança, a matriz se expande para exigir uma visão periférica ainda mais ampla. Os números rotacionados introduzem ruído perceptual que desafia a via visual ventral a extrair formas invariantes sem perder o foco (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Esta ferramenta é utilizada por pilotos e atletas profissionais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Pilotos de caça, pilotos de corrida e atletas de esports competitivos treinam rotineiramente com grades de Schulte e concentração para acelerar reações sacádicas e monitorar múltiplos estímulos sob pressão."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo devo treinar por dia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basta praticar de 5 a 10 minutos diários (cerca de 3 a 5 partidas). Treinar por períodos muito longos gera fadiga ocular, ao passo que a prática diária curta produz ganhos neurais permanentes."
      }
    },
    {
      "@type": "Question",
      "name": "Cliques errados diminuem o tempo restante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não reduzem diretamente o tempo do relógio, mas geram um alerta visual e diminuem sua porcentagem final de precisão, estimulando a disciplina sobre o clique precipitado."
      }
    },
    {
      "@type": "Question",
      "name": "É compatível com celular e tablet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a ferramenta é totalmente responsiva e projetada para telas sensíveis ao toque com resposta imediata e sem atraso."
      }
    },
    {
      "@type": "Question",
      "name": "É necessário pagar ou criar conta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O acesso é 100% gratuito e ilimitado direto no navegador, sem cadastros, cobranças ou necessidade de baixar aplicativos."
      }
    }
  ]
};

const concentrationGridGuidePt = {
  heading: "Guia da Tabela de Schulte, Leitura Dinâmica e Foco Visual",
  intro: [
    "A Tabela de Schulte (Concentration Grid) é uma das metodologias clássicas de diagnóstico e treinamento cognitivo mais reconhecidas na neurociência da visão. Concebida pelo psiquiatra alemão Walter Schulte, seu objetivo primordial é ampliar o campo visual funcional e diminuir a latência de fixação ocular durante tarefas de rastreamento sequencial (Lu et al., 2022; Rayner, 1998).",
    "Ao contrário de folhas estáticas de papel, este sistema digital utiliza matrizes expansivas que evoluem de 3x3 até 8x8 dentro de uma janela ininterrupta de 45 segundos. A densidade de números aumenta a cada etapa, submetendo o córtex visual a um desafio controlado de apinhamento visual (Visual Crowding) que exige refinada integração de características atencionais (Treisman & Gelade, 1980; Wolfe, 2007).",
    "Aplicações em leitura dinâmica e esportes: Pesquisas evidenciam que leitores rápidos captam até 15 caracteres à direita da fixação foveal sem mover os olhos a cada palavra (Rayner, 2016). No cenário esportivo de alta velocidade, a capacidade de identificar alvos periféricos com movimentos sacádicos precisos diferencia competidores de elite (Woods et al., 2015)."
  ],
  benchmarks: {
    title: "Critérios de Desempenho e Níveis de Visão Periférica",
    headers: ["Nível", "Pontuação (45s)", "Grade Máxima", "Avaliação Cognitiva"],
    rows: [
      ["Elite (Esports Pro / Pilotos)", "7.500+ pts", "7x7 ou mais", "Ampla visão periférica. Latência sacádica mínima, localização de múltiplos dígitos futuros de relance sem olhar diretamente."],
      ["Avançado (Leitores Dinâmicos)", "5.500 – 7.499 pts", "6x6 – 7x7", "Alto controle atencional. Antecipação ágil dos próximos passos (Lookahead) sem hesitação."],
      ["Proficiente", "3.500 – 5.499 pts", "5x5 – 6x6", "Varredura organizada. Pequena redução de velocidade ao encontrar números virados ou nos extremos da tela."],
      ["Intermediário", "2.000 – 3.499 pts", "4x4 – 5x5", "Dependência de fixação foveal olho a olho. Dificuldade ocasional ao alternar entre linhas."],
      ["Iniciante", "< 2.000 pts", "3x3 – 4x4", "Busca dispersa com retornos visuais repetidos. Dificuldade em ignorar dígitos distratores próximos."]
    ],
    note: "Medido em sessões de 45 segundos. Precisão superior a 95% demonstra excelente estabilidade mental."
  },
  techniques: {
    title: "Estratégias Científicas de Aprimoramento",
    items: [
      {
        name: "Ancoragem no Centro da Grade",
        desc: "Mantenha o foco visual relaxado no centro da tela. Deixe a visão periférica fazer a leitura dos números ao redor sem deslocar a cabeça ou os olhos para cada dígito (Lu et al., 2022).",
        tips: "Evite correr os olhos freneticamente de um lado ao outro."
      },
      {
        name: "Busca Pareada e Antecipação (Lookahead)",
        desc: "Enquanto clica no número atual (ex: 3), sua visão já deve ter detectado e guardado na memória de trabalho espacial a posição do seguinte (o 4) (Rayner, 1998).",
        tips: "Nunca procure apenas um número isolado; trabalhe sempre mentalmente em pares."
      },
      {
        name: "Busca Guiada e Padrões Visuais (Wolfe, 2007)",
        desc: "A expectativa mental direcionada facilita a identificação de alvos. Ter em mente o formato do próximo numeral ativa os neurônios detectores de bordas mais rapidamente.",
        tips: "Imagine mentalmente o desenho do número antes de procurá-lo."
      },
      {
        name: "Invariância à Rotação",
        desc: "Dígitos inclinados exigem que o cérebro identifique características estruturais básicas (como a curva do 6 ou a barra do 4) em vez de depender de formatos perfeitos.",
        tips: "Reconheça a estrutura do algarismo em vez de tentar girá-lo na mente."
      }
    ]
  },
  steps: [
    "Repouse a visão suavemente no centro da grade.",
    "Localize o número 1 e toque para iniciar a contagem.",
    "Aplique a visão periférica: enquanto confirma o número atual, localize o próximo.",
    "Avance rapidamente para desbloquear matrizes maiores de 5x5, 6x6 e 7x7.",
    "Mantenha a tranquilidade diante de números girados durante os 45 segundos."
  ],
  audience: "Leitores dinâmicos, estudantes para concursos, pilotos, gamers de FPS tático e interessados em biohacking e desempenho mental.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
  related: [
    { href: "/drills/cognitive/attention/concentration-stamina", label: "Teste de Foco Contínuo" },
    { href: "/drills/cognitive/focus/distraction-fighter", label: "Teste de Stroop Online" },
    { href: "/drills/cognitive/attention/divided-attention", label: "Atenção Dividida" },
    { href: "/drills/cognitive/processing-speed/rsvp-reader", label: "Teste de Leitura Rápida" },
    { href: "/drills/cognitive/processing-speed/symbol-matching", label: "Substituição de Símbolos" },
    { href: "/drills/cognitive/processing-speed/reaction-time", label: "Velocidade de Reação" }
  ]
};

const copyPt = {
  h1Keyword: "Tabela de Schulte",
  h1Suffix: " Online – Grade de Concentração",
  caption: "Toque nos números em sequência numérica estrita em matrizes de Schulte que se expandem a cada acerto. Treine visão periférica, leitura dinâmica e foco sustentado.",
  statScore: "Pontos",
  statTime: "Tempo",
  statGridSize: "Grade",
  statBest: "Recorde",
  hudTarget: "Alvo:",
  startTitle: "Tabela de Schulte Trainer",
  startSubtitle: "Busca Sequencial de Números • Grades Schulte Expansivas",
  startButtonText: "Começar Treino",
  getReady: "PREPARE-SE",
  statPoints: "Pontos",
  statAccuracy: "Precisão",
  statGridsCleared: "Completadas",
  statPeakGrid: "Grade Máx.",
  playAgainText: "Jogar Novamente",
  shareText: "Compartilhar",
  exitText: "Sair",
  stageCaption: "Localize e toque nos números em ordem crescente em matrizes cada vez maiores antes que o tempo se esgote.",
  rulesTitle: "Regras e Pontuação",
  rulesItems: [
    { title: "Busca Sequencial", text: "Toque nos números rigorosamente em ordem crescente a partir do 1 até o maior número da grade." },
    { title: "Grades em Expansão", text: "Completar a grade atual avança para tamanhos maiores (3x3 → 4x4 → 5x5...), exigindo visão periférica mais ampla." },
    { title: "Sessão Fixa de 45s", text: "Você joga durante 45 segundos exatos. Limpar grades faz a matriz crescer sem adicionar tempo extra ao relógio." },
    { title: "Foco e Precisão", text: "Toques incorretos acionam um alerta visual e reduzem sua precisão final, premiando a cautela calculada." }
  ],
  aboutTitle: "Sobre a Tabela de Schulte e Grade de Concentração",
  aboutLead: "A Tabela de Schulte é uma grade psicodiagnóstica de busca visual criada para estender a amplitude da visão periférica e encurtar o tempo de fixação ocular em tarefas de rastreamento (Lu et al., 2022; Rayner, 1998).",
  aboutCards: [
    { title: "Quem deve treinar?", text: "Pilotos, atletas de ponta, concurseiros e gamers competitivos que dependem de reflexos visuais rápidos sob pressão.", color: "bg-blue-600" },
    { title: "Habilidades Desenvolvidas", text: "Velocidade de busca visual, saltos sacádicos eficientes, amplitude periférica e resistência atencional.", color: "bg-emerald-600" },
    { title: "Visão Periférica", text: "Cada nível concluído expande a área da grade, forçando os olhos a captar números nos extremos sem desviar o centro de visão.", color: "bg-purple-600" }
  ]
};

export default function ConcentrationGridPagePt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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

      <ConcentrationGridClient copy={copyPt} />
      <DrillGuide guide={concentrationGridGuidePt} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="/drills/cognitive/focus/concentration-grid" locale="pt" />
      </div>
    </>
  );
}
