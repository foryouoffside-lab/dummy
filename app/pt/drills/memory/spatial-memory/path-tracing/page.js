import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Memória Sequencial – Blocos de Corsi | SkillDrills",
  description: "Teste de memória sequencial online grátis: Memorize trajetórias em grades de 3x3 a 7x7 e reproduza na ordem exata sem cadastro no navegador.",
  keywords: ['teste de memoria sequencial', 'teste dos blocos de corsi', 'memoria sequencial de trajetorias', 'path tracing teste online', 'empan espacial corsi teste', 'memoria de trabalho visuoespacial', 'jogo de memoria sequencial', 'reproducao de trajetorias', 'teste psicologico blocos de corsi', 'treino de memoria de rota', 'memoria motora sequencial', 'avaliacao cognitiva visoespacial'],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing', 'pt'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Teste de Memória Sequencial (Blocos de Corsi) - Jogo Grátis | SkillDrills",
    description: "Teste de memória sequencial online grátis (teste dos blocos de corsi / Path Tracing). Memorize trajetórias em grade de 3x3 a 7x7 e reproduza na ordem exata. Avalie seu span de memória espacial. Sem cadastro.",
    url: "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Memória Sequencial (Blocos de Corsi) - Jogo Grátis | SkillDrills",
    description: "Teste de memória sequencial online grátis (teste dos blocos de corsi / Path Tracing). Memorize trajetórias em grade de 3x3 a 7x7 e reproduza na ordem exata. Avalie seu span de memória espacial. Sem cadastro.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedPathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memória Espacial", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Teste de Memória Sequencial", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Teste de Memória Sequencial (Blocos de Corsi)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Avaliação neuropsicológica interativa de memória operacional visoespacial sequencial, retenção de trajetórias e span de blocos de Corsi em matrizes graduais.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Teste de Memória Sequencial (Blocos de Corsi)",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing",
    "description": "Avaliação neuropsicológica interativa de memória operacional visoespacial sequencial, retenção de trajetórias e span de blocos de Corsi em matrizes graduais.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Teste de Memória Sequencial (Blocos de Corsi)",
    "description": "Avaliação neuropsicológica interativa de memória operacional visoespacial sequencial, retenção de trajetórias e span de blocos de Corsi em matrizes graduais.",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
            "@type": "Question",
            "name": "O que é o teste de memória sequencial de trajetórias (Path Tracing)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "É uma avaliação neurocognitiva da memória operacional visoespacial sequencial. O usuário observa uma série de células iluminadas em ordem e deve reproduzir exatamente o mesmo caminho cronológico."
            }
      },
      {
            "@type": "Question",
            "name": "O que é o teste dos blocos de Corsi?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Criado por Pietro Corsi em 1972, é o exame padrão da neuropsicologia para aferir o span de memória espacial não verbal. Avalia quantos blocos tocados em sequência uma pessoa consegue repetir."
            }
      },
      {
            "@type": "Question",
            "name": "O que representa o 'Escriba Interno' (Inner Scribe)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Conceito de Robert H. Logie (1995) que define o subsistema ativo da memória visoespacial focado em ensaiar, guardar e atualizar percursos motores e trajetórias dinâmicas."
            }
      },
      {
            "@type": "Question",
            "name": "Qual é a média de retenção de um adulto saudável?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Em estudos normativos (Kessels et al., 2000), a média de span de blocos de Corsi em adultos situa-se em 5,4 ± 0,9 passos. Pontuações de 8 passos ou mais representam capacidade superior."
            }
      },
      {
            "@type": "Question",
            "name": "Como funciona o agrupamento por vetores direcionais?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Consiste em codificar o caminho como setas unificadas ('direita, cima, diagonal') em vez de pontos isolados, superando o teto biológico de 4 itens mantidos na atenção imediata."
            }
      },
      {
            "@type": "Question",
            "name": "Qual a diferença deste teste para o teste de grade comum?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O teste de grade comum exibe todos os blocos acesos juntos (foto instantânea). O teste sequencial exige guardar a ordem temporal exata de cada etapa, demandando ensaio dinâmico ininterrupto."
            }
      },
      {
            "@type": "Question",
            "name": "Por que percursos longos se tornam tão desafiadores?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Porque, segundo Nelson Cowan (2001), o foco atencional sem agrupamento comporta apenas cerca de 4 elementos. Passando disso, o esquecimento atua rápido a menos que haja formação de padrões."
            }
      },
      {
            "@type": "Question",
            "name": "Como essa memória atua no cotidiano e em jogos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "É vital para lembrar itinerários curva a curva, aprender passos de dança, esportes e, nos jogos eletrônicos (FPS, MOBAs), executar rotações táticas de mapa e combos de habilidades."
            }
      },
      {
            "@type": "Question",
            "name": "Ocorrem penalidades de pontos ou tempo por cliques errados?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Errar não desconta pontuação nem reduz o tempo restante. A rodada se repete no nível atual para você consolidar sua estratégia de retenção."
            }
      },
      {
            "@type": "Question",
            "name": "É possível expandir a memória sequencial com treino contínuo?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. A prática deliberada aprimora a simulação motora do escriba interno, automatiza o agrupamento direcional e confere cadência motora uniforme."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como treinar a memória sequencial e o span de Corsi",
    "description": "Protocolo metódico de 4 etapas para agrupar vetores direcionais e reter trajetórias na memória visoespacial.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing#step-1",
            
            "name": "Fixar o início e observar a trajetória global",
            "text": "Fixe o olhar na célula inicial e contemple a grade de forma panorâmica para perceber o fluxo de movimento sem saltos bruscos dos olhos."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing#step-2",
            
            "name": "Agrupar passos em macrovetores de direção",
            "text": "Junte os pontos individuais em blocos com sentido (ex.: 'dois para a direita, um para cima' ou 'em L')."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing#step-3",
            
            "name": "Ensaio motor pelo escriba interno",
            "text": "Durante o breve intervalo antes de clicar, trace a linha contínua mentalmente com o córtex motor para blindar a memória."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/path-tracing#step-4",
            
            "name": "Reprodução com cadência rítmica fluida",
            "text": "Clique nas posições com ritmo constante sem pausas longas entre toques, concluindo a sequência num único impulso motor."
      }
]
  };

  const pathTracingGuide = {
    intro: [
      "O Teste de Memória Sequencial (Path Tracing Memory Test) é um instrumento neurocognitivo desenvolvido para avaliar a memória de trabalho visoespacial sequencial, a retenção de percursos dinâmicos e a reconstrução de trajetórias em matrizes de 3x3 a 7x7. Fundamentado no paradigma clássico dos Blocos de Corsi (Milner, 1971; Corsi, 1972) e no modelo do 'Escriba Interno' de Robert H. Logie (1995), separa o processamento de movimento espaciotemporal ativo da mera retenção estática de imagens.",
      "A cada rodada, uma sequência de células acende em intervalos regulares de 500 ms. O usuário precisa reter a posição no espaço e a ordem no tempo, repetindo a trajetória completa com exatidão num período de 45 segundos.",
      "No âmbito da memória de trabalho, Logie (1995) e Alan Baddeley (2000) comprovaram que percursos sequenciais são geridos pelo Escriba Interno, um laço de ensaio espacial dinâmico. George A. Miller (1956) e Herbert A. Simon (1974) demonstraram a relevância da fragmentação em blocos (Chunking), enquanto Nelson Cowan (2001) comprovou que a capacidade focal desprovida de agrupamento é de cerca de 4 itens.",
      "Estudos normativos computadorizados (Kessels et al., 2000) apontam o span espacial adulto em 5,4 ± 0,9 passos, evidenciando que essa competência é muito sensível ao cansaço mental, sono e funções executivas pré-frontais.",
      "Precisão das medições: cada resposta é cronometrada no próprio navegador com a biblioteca performance.now(), sem envio de dados a servidores remotos. Em virtude de proteções como a Spectre, o timer é arredondado a cerca de 1 ms, e as atualizações de tela acompanham a taxa de atualização do monitor (cerca de 16,7 ms por quadro a 60 Hz; Woods et al., 2015). Variações abaixo de 5 ms constituem flutuações normais de hardware.",
      "Transparência de dados: a SkillDrills não armazena estatísticas centrais. Suas pontuações e configurações residem apenas no localStorage do seu próprio dispositivo, de modo que não divulgamos rankings globais de jogadores. Todas as estimativas de referência citadas advêm de artigos revisados por pares indicados no rodapé.",
      "Este aplicativo é um jogo web gratuito voltado a treino e curiosidade pessoal. Não substitui exames médicos nem tem valor de diagnóstico clínico. Se você tiver apreensões quanto à sua retenção de memória, procure avaliação médica profissional especializada."
],
    benchmarks: {
      title: "Parâmetros normativos de span sequencial e blocos de Corsi",
      headers: ["Nível de Desempenho", "Span e Grade", "Pontuação", "Perfil Cognitivo e Retenção de Trajetória"],
      rows: [
        [
                "Nível 1 (Excepcional / Percentil 99)",
                "Span 10 – 14+ passos (grade 6x6–7x7)",
                "1.200+ Pontos",
                "Desempenho visoespacial de elite; decompõe percursos em 2–3 macrovetores; ensaio perfeito no escriba interno; resposta fluida em < 400 ms"
        ],
        [
                "Nível 2 (Alto / Percentil 85–95)",
                "Span 8 – 9 passos (grade 5x5–6x6)",
                "900 – 1.199 Pontos",
                "Bem acima da média populacional; agrupamento direcional robusto (curvas em L, zigue-zagues); resistente à interferência; resposta em 400–600 ms"
        ],
        [
                "Nível 3 (Média Adulta / Percentil 50)",
                "Span 5 – 7 passos (grade 4x4–5x5)",
                "600 – 899 Pontos",
                "Padrão médio da população (Corsi, 1972; Kessels et al., 2000, 5,4 ± 0,9 passos); executa 5–6 passos com facilidade; perde pontos intermediários em 5x5; 600–850 ms"
        ],
        [
                "Nível 4 (Abaixo da Média / Sobrecarga Sequencial)",
                "Span 4 passos (grade 3x3–4x4)",
                "400 – 599 Pontos",
                "Opera no limite da retenção crua (Cowan, 2001); tenta guardar pontos soltos sem formar vetores, gerando saturação precoce; 850–1.100 ms"
        ],
        [
                "Nível 5 (Treino Recomendado / Retenção Reduzida)",
                "Span < 4 passos (grade 3x3)",
                "< 400 Pontos",
                "Rápido declínio do vestígio temporal; frequentes trocas de ordem; lentidão de resposta acima de 1.100 ms"
        ]
],
      note: "O número de passos e a dimensão da grade representam o nível máximo atingido em 45 segundos, equiparado aos parâmetros de Corsi Block-Tapping."
    },
    techniques: {
      title: "Estratégias cientificamente respaldadas para expandir a memória sequencial",
      items: [
        {
                "name": "Agrupamento por vetores direcionais (Chunking)",
                "desc": "Agrupe passos sucessivos em vetores contínuos (ex.: 'dois para a direita, um para cima'). Tratar o percurso como traçados geométricos em vez de células avulsas poupa mais de 60 % de carga atencional.",
                "tips": "Busque formatos em L, triângulos ou escadas em vez de pontos individuais."
        },
        {
                "name": "Ensaio motor com o Escriba Interno (Logie 1995)",
                "desc": "Simule mentalmente o desenho contínuo com o córtex motor enquanto observa a tela. A pré-ativação motora consolida a imagem visual com pistas cinestésicas.",
                "tips": "Sinta o traçado na ponta dos dedos antes de encostar na tela."
        },
        {
                "name": "Olhar centralizado e visão parafoveal",
                "desc": "Fixe o foco no centro da grade para absorver o trajeto pela visão periférica, evitando saltos oculares desordenados que atrasam a percepção do todo.",
                "tips": "Mantenha a cabeça firme e visualize o percurso como um filme contínuo."
        },
        {
                "name": "Cadência e ritmo constante de toque",
                "desc": "Execute os toques num andamento uniforme. A indecisão entre cliques corrói a retenção dos passos finais; libere o bloco num único gesto seguro.",
                "tips": "Acompanhe um compasso contínuo sem parar para pensar passo a passo."
        }
]
    },
    steps: [
      "Concentre o foco no meio da matriz e acompanhe a sequência de células acesas.",
      "Agrupe mentalmente os pontos em vetores direcionais contínuos.",
      "No breve intervalo antes do clique, repasse mentalmente a linha com o escriba interno.",
      "Reproduza as posições na ordem exata num ritmo constante e fluido.",
      "Avance por matrizes de 3x3 a 7x7 ampliando ao máximo seu span espacial sequencial."
],
    audience: "Jogadores focados em rotas de mapa e execução de sequências de habilidades, dançarinos, atletas, estudantes das áreas exatas e qualquer pessoa disposta a expandir a memória visoespacial sequencial.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Teste de Memória Visual (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/object-location",
            "label": "Teste de Memória Espacial (Object Location)"
      },
      {
            "href": "/drills/memory/short-term-memory/digit-span",
            "label": "Teste de Dígitos (Digit Span)"
      },
      {
            "href": "/drills/memory/short-term-memory/word-recall",
            "label": "Teste de Memória Verbal (Word Recall)"
      },
      {
            "href": "/drills/memory/working-memory/n-back",
            "label": "Teste Dual N-Back"
      }
]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PathTracingClient
        copy={{
        "h1Keyword": "Teste de Memória Sequencial",
        "h1Suffix": " (Blocos de Corsi)",
        "subtitle": "O span espacial é a maior sequência de posições que você consegue repetir na ordem exata. O clássico teste dos blocos de Corsi situa a média de adultos entre cinco e sete passos (Milner, 1971; Corsi, 1972), recrutando sistemas cerebrais distintos do span verbal de dígitos (Logie, 1995).",
        "statScore": "Pontuação",
        "statTime": "Tempo",
        "statLevel": "Nível",
        "statBestScore": "Melhor Récord",
        "levelPrefix": "Nv.",
        "startTitle": "Traçado de Rotas Pro",
        "startSubtitle": "Memória Sequencial • Blocos de Corsi",
        "countdownSubtitle": "PREPARE-SE",
        "newBest": "NOVO RECORDE",
        "pointsLabel": "Pontos",
        "statAccuracy": "Precisão",
        "statPeakLevel": "Nível Máximo",
        "statPerfects": "Perfeitos",
        "btnPlayAgain": "Jogar Novamente",
        "rulesTitle": "Instruções & Sistema de Pontuação",
        "aboutTitle": "Sobre o Treino de Memória Sequencial e Corsi",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Memorize e reproduza o trajeto",
                        "highlight": "+150 PTS",
                        "result": "Observe a sequência luminosa e clique nas células na mesma ordem"
                },
                {
                        "num": "2",
                        "text": "Progressão de grade e passos",
                        "highlight": "3x3 → 7x7",
                        "result": "Conforme você sobe de nível, o tabuleiro e o percurso aumentam"
                },
                {
                        "num": "3",
                        "text": "Erro ou tempo esgotado",
                        "highlight": "Zero penalidade",
                        "result": "Nenhum ponto ou tempo é deduzido; a rodada se repete no nível atual"
                },
                {
                        "num": "4",
                        "text": "Dificuldade consolidada",
                        "highlight": "Sem rebaixamento",
                        "result": "O nível não cai, permitindo aprimorar sua estratégia de agrupamento espacial"
                }
        ]
}}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="pt"
        />
      </div>
    </>
  );
}
