import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Memória Visual – Jogo de Grade Online | SkillDrills",
  description: "Teste de memória visual online grátis: Memorize matrizes em grades de 4x4 a 5x5 em 1,5s e avalie sua retenção visoespacial e chunking direto no navegador.",
  keywords: ['teste de memoria visual', 'jogos de memoria visual', 'teste de memoria espacial', 'memoria de trabalho visual', 'jogo de memoria em grade', 'matriz de memoria visual', 'teste de padroes visuais', 'capacidade de memoria visual', 'treino de memoria visoespacial', 'teste de chunking espacial', 'empan visoespacial online', 'teste de memoria de curto prazo'],
  openGraph: {
    title: "Teste de Memória Visual Online (Jogo de Grade) - Grátis | SkillDrills",
    description: "Teste de memória visual online gratuito (treino de padrões em grade). Memorize matrizes em tabuleiros de 4x4 a 5x5 em 1,5 segundo e avalie sua retenção visoespacial e capacidade de chunking. Sem cadastro, direto no navegador.",
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Memória Visual Online (Jogo de Grade) - Grátis | SkillDrills",
    description: "Teste de memória visual online gratuito (treino de padrões em grade). Memorize matrizes em tabuleiros de 4x4 a 5x5 em 1,5 segundo e avalie sua retenção visoespacial e capacidade de chunking. Sem cadastro, direto no navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memória Espacial", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory" },
    { "@type": "ListItem", "position": 4, "name": "Teste de Memória Visual", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Memória Visual Online (Jogo de Grade)",
  "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Teste de Memória Visual Online (Jogo de Grade)",
  "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization",
  "description": "Avaliação neurocognitiva interativa que mede a memória operacional visoespacial, a retenção de padrões matriciais e a capacidade de chunking geométrico.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Memória Visual Online (Treino de Memória em Grade)",
  "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como treinar a memória visual em grades matriciais",
  "description": "Protocolo sistemático de quatro etapas para codificar, agrupar e reconstruir com exatidão padrões espaciais sob pressão de tempo.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization#step-1",
      
      "name": "Fixar o olhar central",
      "text": "Mantenha os olhos ancorados no centro da grade antes do acendimento para usar a visão periférica em todo o tabuleiro."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization#step-2",
      
      "name": "Executar chunking de formas Gestalt",
      "text": "Agrupe as células acesas em formas geométricas reconhecíveis (linhas, cantos, blocos) em vez de tentar gravar posições isoladas."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization#step-3",
      
      "name": "Rastreamento motor visoespacial",
      "text": "Trace mentalmente uma linha contínua pelas células iluminadas durante os 1,5 segundos de exibição para reforçar o padrão motor."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/grid-memorization#step-4",
      
      "name": "Reconstrução sistemática da matriz",
      "text": "Clique primeiro nos blocos geométricos memorizados e depois preencha as células isoladas antes que a lembrança visual se apague."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é um teste de memória visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um teste de memória visual avalia a memória de trabalho visoespacial: sua habilidade de perceber, codificar e manter ativas na mente configurações visuais e coordenadas espaciais sem depender de repetição verbal."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o treino de memória em grade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em uma grade de 4x4 ou 5x5, diversas células acendem em branco por 1,5 segundo. Quando a grade apaga, você clica nas posições exatas que estavam acesas. Cada acerto aumenta a complexidade do padrão."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Visual Patterns Test (VPT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Criado em 1997 por Sergio Della Sala, Robert H. Logie e equipe, o Visual Patterns Test (VPT) é o padrão ouro na neuropsicologia para medir a capacidade pura de memória de curto prazo para padrões visuais estáticos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença para o Teste dos Blocos de Corsi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste de blocos de Corsi (Corsi, 1972) avalia a memória espacial sequencial (tocar blocos em ordem temporal) usando o 'escriba interno'. Já o teste de grade apresenta todas as células simultaneamente, medindo o 'cache visual' estático."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a média normal de memória visual em matrizes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dados normativos em adultos saudáveis (Della Sala et al., 1997, 1999) mostram capacidade média de 6 a 8 células em matrizes de 4x4 a 5x5. Resultados acima de 10 a 14 células indicam domínio avançado de chunking espacial."
      }
    },
    {
      "@type": "Question",
      "name": "Como o agrupamento (chunking) melhora a memória visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A memória de trabalho visual tem um gargalo natural de 3 a 4 itens independentes (Luck & Vogel, 1997; Cowan, 2001). O chunking contorna esse limite ao reunir células vizinhas em figuras geométricas (quadrados, linhas, triângulos), guardando várias posições como um único objeto mental."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre cache visual e escriba interno?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No modelo de Logie (1995), o 'cache visual' é um depósito passivo para formas, cores e padrões estáticos, enquanto o 'escriba interno' é o processo ativo de ensaio mental e planejamento de trajetórias motoras."
      }
    },
    {
      "@type": "Question",
      "name": "Por que os padrões de grade desaparecem tão rápido após 1,5 segundo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A memória sensorial icônica se esvai em 250 a 500 milissegundos. Sem a rápida consolidação na memória operacional por meio de chunking ou traçado mental, a impressão visual é rapidamente apagada por novos estímulos."
      }
    },
    {
      "@type": "Question",
      "name": "Existe penalidade de pontuação ao errar uma célula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Clicar em uma célula errada não deduz pontos nem consome o tempo restante. A rodada simplesmente recomeça no mesmo nível para você treinar com segurança na sua zona de desenvolvimento."
      }
    },
    {
      "@type": "Question",
      "name": "Como a memória visual ajuda no dia a dia e nos jogos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Favorece a leitura rápida do minimapa em jogos de tiro tático (CS2, Valorant), acelera a interpretação de gráficos e plantas de engenharia e fortalece o raciocínio espacial e rotação mental 3D em ciências exatas."
      }
    }
  ]
};

const gridGuide = {
  intro: [
  "O Teste de Memória Visual (Grid Memorization / Memory Matrix) é um exercício neurocognitivo interativo desenvolvido para mensurar a memória de trabalho visoespacial, a velocidade de codificação de padrões e a retenção matricial de curto prazo. Diferente de avaliações verbais baseadas em repetição fonológica, esta tarefa isola a arquitetura visual não-verbal do cérebro.",
  "A investigação clínica do span visoespacial começou com Pietro Corsi (1972) por meio do Teste dos Blocos de Corsi, que comprovou que a memória espacial opera em redes neurais distintas do span de dígitos verbal (Milner, 1971). Em 1997, Sergio Della Sala, Robert H. Logie e colaboradores criaram o Visual Patterns Test (VPT) especificamente para dissociar a retenção de matrizes estáticas de sequências motoras ativas.",
  "Na neurociência cognitiva moderna, Robert H. Logie (1995) e Alan Baddeley (2000) dividiram o esboço visoespacial em 'Cache Visual' (armazenamento passivo de formas, cores e imagens estáticas) e 'Escriba Interno' (mecanismo ativo de repetição espacial e planejamento motor). Pesquisas de Steven J. Luck & Edward K. Vogel (1997) e Nelson Cowan (2001) confirmaram que a capacidade visual bruta sem agrupamento é limitada a 3 ou 4 itens. Expandir essa marca exige chunking espacial: combinar células acesas em formas Gestalt reconhecíveis.",
  "Calibrado com precisão cronométrica digital (Woods et al., 2015), o teste conta com janela padronizada de 1,5 segundo para memorização e progressão adaptativa para mensurar o limite real da sua capacidade de retenção visoespacial.",
  "Metodologia de medição: todos os eventos são computados pelo relógio de alta resolução performance.now() do navegador no seu próprio dispositivo, sem envio de pontuações para servidores. Por segurança, os cronômetros de navegadores têm resolução ajustada a ~1 ms e sincronizam com a taxa de atualização da tela (~16,7 ms a 60 Hz; Woods et al., 2015). Diferenças abaixo de 5 ms constituem ruído de medição; compare seus desempenhos sempre no mesmo equipamento.",
  "Transparência de dados: o SkillDrills não coleta dados agregados. Seus resultados e configurações ficam salvos apenas no localStorage do seu navegador. Todas as métricas apresentadas fundamentam-se em estudos acadêmicos revisados por pares.",
  "Este exercício é um jogo gratuito voltado ao treino e autoconhecimento cognitivo. Não é dispositivo médico nem instrumento de diagnóstico clínico. Em caso de dúvidas sobre sua saúde cognitiva, procure um profissional habilitado."
],
  benchmarks: {
    title: "Baremos normativos de span de memória visoespacial",
    headers: ["Nível de Desempenho", "Span de Padrão (Células)", "Pontuação", "Perfil Cognitivo e Chunking"],
    rows: [
  [
    "Tier 1 (Superior / Topo 1%)",
    "10 – 14+ Células",
    "1.150+ Pontos",
    "Desempenho visoespacial de elite; divide padrões complexos em 2-3 primitivas geométricas Gestalt; retenção impecável no cache visual; cadência de clique abaixo de 450 ms."
  ],
  [
    "Tier 2 (Acima da Média / Topo 15%)",
    "8 – 9 Células",
    "850 – 1.149 Pontos",
    "Supera a média adulta normal; realiza chunking rápido de formas ('L', linhas, trincas); resistente à interferência visual; cadência de 450 a 650 ms."
  ],
  [
    "Tier 3 (Média Adulta / 50%)",
    "6 – 7 Células",
    "550 – 849 Pontos",
    "Padrão normal da população adulta (Della Sala et al., 1997); processa blocos simples pareados; perde células periféricas em grades 5x5; cadência de 650 a 900 ms."
  ],
  [
    "Tier 4 (Abaixo da Média / Gargalo)",
    "5 Células",
    "350 – 549 Pontos",
    "Opera próximo ao limite bruto sem agrupamento (Cowan, 2001); tenta memorizar células uma a uma; cadência de 900 a 1.200 ms."
  ],
  [
    "Tier 5 (Necessita Treino / Baixo)",
    "< 5 Células",
    "< 350 Pontos",
    "Rápido esvanecimento do traço visual; vulnerabilidade ao ruído sensorial; dificuldade em reter mais de 4 células após 1,5s; cadência acima de 1.200 ms."
  ]
],
    note: "O span de células reflete a maior configuração de matriz completada com sucesso durante a sessão de 45 segundos (Della Sala et al., 1997; Woods et al., 2015)."
  },
  techniques: {
    title: "Técnicas comprovadas para expandir a memória visual matricial",
    items: [
  {
    "name": "Chunking de formas espaciais (Gestalt)",
    "desc": "Agrupe mentalmente as células iluminadas em formas geométricas básicas como triângulos, retas, quadrados ou letras (Wertheimer, 1923; Della Sala et al., 1999). Comprimir 7 coordenadas em 2 figuras reduz a carga cognitiva em mais de 60 %.",
    "tips": "Foque de imediato em linhas contínuas e cantos em vez de olhar pontos soltos."
  },
  {
    "name": "Codificação de espaço negativo (vazios)",
    "desc": "Quando uma região estiver muito cheia de células acesas, memorize os espaços vazios (apagados). Gravar 2 buracos escuros em um bloco de 6 posições é muito mais eficiente do que tentar gravar 4 luzes.",
    "tips": "Se uma área estiver quase toda preenchida, foque exclusivamente nos 'buracos' pretos."
  },
  {
    "name": "Rastreamento cinestésico do escriba interno",
    "desc": "Acione o 'escriba interno' (Logie, 1995) desenhando mentalmente uma linha contínua unindo todas as células acesas durante os 1,5 segundos. O planejamento motor reforça a retenção visual passiva.",
    "tips": "Mantenha um sentido de varredura consistente (ex.: superior esquerdo para inferior direito) para dar rumo ao padrão."
  },
  {
    "name": "Fixação central e captura parafoveal",
    "desc": "Mantenha os olhos firmes no centro da matriz ao iniciar a rodada. Evite movimentos sacádicos frenéticos entre células; a visão periférica captura a estrutura global simultaneamente.",
    "tips": "Relaxe ligeiramente o foco para absorver a matriz inteira como uma única fotografia."
  }
]
  },
  steps: [
  "Fixe o olhar no centro da grade e aguarde o padrão acender.",
  "Durante o flash de 1,5 segundo, agrupe as células em 2 ou 3 formas geométricas.",
  "Em regiões muito cheias, memorize os espaços apagados (espaço negativo) para economizar esforço.",
  "Ao apagar da grade, clique rapidamente nas formas memorizadas sobre o tabuleiro.",
  "Avance de grades 4x4 para 5x5 a fim de elevar continuamente seu limite de memória operacional."
],
  audience: "Jogadores de FPS que buscam melhor percepção de minimapa, estudantes de exatas e arquitetura, enxadristas, médicos radiologistas e qualquer pessoa focada em elevar sua memória não-verbal.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "Teste N-Back (Memória Operacional)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Tabela de Schulte (Grade de Concentração)"
  },
  {
    "href": "/drills/memory/short-term-memory/digit-span",
    "label": "Teste de Dígitos (Span de Memória)"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "Teste de Reflexo (Tempo de Reação)"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "Jogo de Reflexo e Treino de Reflexos"
  }
]
};

export default function LocalizedGridMemorizationPage() {
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
      <GridMemorizationClient copy={{
        "h1Keyword": "Teste de Memória Visual",
        "h1Suffix": " – Jogo de Memória em Grade Online",
        "caption": "A memória de trabalho visual armazena cerca de quatro objetos distintos simultaneamente; o limite é o número de itens e não o detalhe individual de cada um (Luck & Vogel, 1997). As grades matriciais avaliam o 'cache visual', o depósito passivo de formas e disposição espacial (Logie, 1995).",
        "statScore": "Pontos",
        "statTime": "Tempo",
        "statGridSize": "Grade",
        "statBest": "Recorde",
        "hudScore": "Pontos",
        "hudTime": "Tempo",
        "startTitle": "Memória Visual Pro",
        "startSubtitle": "Memória de Curto Prazo Espacial • Retenção de Padrões",
        "countdownSubtitle": "PREPARE-SE",
        "newBest": "NOVO RECORDE",
        "pointsLabel": "Pontos",
        "statAccuracy": "Precisão",
        "cellsUnit": "Células",
        "statPeakPattern": "Padrão Máximo",
        "statPerfects": "Perfeitos",
        "btnPlayAgain": "Jogar novamente",
        "rulesTitle": "Instruções do Treino e Pontuação",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Retenção de Padrão",
                        "highlight": "+150 PTS",
                        "result": "Memorize as células iluminadas e clique para recriar o padrão"
                },
                {
                        "num": "2",
                        "text": "Progressão de Nível",
                        "highlight": "4x4 → 5x5",
                        "result": "A grade e a quantidade de alvos aumentam conforme você acerta"
                },
                {
                        "num": "3",
                        "text": "Erro / Tempo Esgotado",
                        "highlight": "Sem Penalidades",
                        "result": "Nenhum ponto ou tempo é subtraído por cliques incorretos"
                },
                {
                        "num": "4",
                        "text": "Nível Mantido",
                        "highlight": "Mesmo Nível",
                        "result": "Em caso de falha, a rodada reinicia no mesmo patamar"
                }
        ]
}} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="pt"
        />
      </div>
    </>
  );
}
