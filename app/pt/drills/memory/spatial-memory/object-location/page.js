import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Memória Espacial – Localização | SkillDrills",
  description: "Teste de memória espacial online grátis: Memorize a posição de objetos em grades de 3x3 a 7x7 em 1,5s e localize coordenadas alvo sem cadastro.",
  keywords: ['teste de memoria espacial', 'memoria espacial exercicios', 'memoria de localizacao de objetos', 'teste de memoria visoespacial', 'object location memory test', 'teste de retencao espacial', 'memoria de trabalho visoespacial', 'exercicio de memoria de posicao', 'teste silverman eals', 'jogo de memoria espacial online', 'avaliacao neurocognitiva espacial', 'mapeamento cognitivo treino'],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location', 'pt'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Teste de Memória Espacial (Localização de Objetos) - Jogo Grátis | SkillDrills",
    description: "Teste de memória espacial online grátis (memória de localização de objetos / Object Location Memory). Memorize a posição de objetos em grades de 3x3 a 7x7 em 1,5 segundo e localize as coordenadas do alvo com precisão. Sem cadastro.",
    url: "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Memória Espacial (Localização de Objetos) - Jogo Grátis | SkillDrills",
    description: "Teste de memória espacial online grátis (memória de localização de objetos / Object Location Memory). Memorize a posição de objetos em grades de 3x3 a 7x7 em 1,5 segundo e localize as coordenadas do alvo com precisão. Sem cadastro.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memória Espacial", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "Teste de Memória Espacial", "item": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Teste de Memória Espacial (Localização de Objetos)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Avaliação neuropsicológica interativa de ligação de características visuais e espaciais (Feature Binding), mapas cognitivos e retenção de coordenadas em grades progressivas.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Teste de Memória Espacial (Localização de Objetos)",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location",
    "description": "Avaliação neuropsicológica interativa de ligação de características visuais e espaciais (Feature Binding), mapas cognitivos e retenção de coordenadas em grades progressivas.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Teste de Memória Espacial (Localização de Objetos)",
    "description": "Avaliação neuropsicológica interativa de ligação de características visuais e espaciais (Feature Binding), mapas cognitivos e retenção de coordenadas em grades progressivas.",
    "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
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
            "name": "O que é um teste de memória espacial de localização de objetos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "É uma avaliação neuropsicológica que mede a habilidade do cérebro em integrar o que um objeto é (identidade visual) com onde ele está (coordenada espacial), processo denominado ligação de características (Feature Binding)."
            }
      },
      {
            "@type": "Question",
            "name": "Como funciona este exercício prático?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O treino exibe múltiplos objetos em grades de 3x3 a 7x7 durante 1,5 segundo. Em seguida, a grade é esvaziada e um único objeto-alvo é indicado no topo; seu objetivo é clicar na célula onde ele estava posicionado."
            }
      },
      {
            "@type": "Question",
            "name": "O que foi a pesquisa de Silverman e Eals (1994)?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Foi um estudo clássico conduzido por Marion Eals e Irwin Silverman que demonstrou que a memória de localização de objetos funciona como um módulo cognitivo evolutivo independente da rotação mental euclidiana."
            }
      },
      {
            "@type": "Question",
            "name": "O que significa 'Feature Binding' em neurociência cognitiva?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "É o mecanismo neurológico pelo qual a via visual ventral (que identifica o objeto) e a via dorsal (que computa a posição no espaço) convergem no hipocampo e no córtex para-hipocampal gerando uma memória integrada."
            }
      },
      {
            "@type": "Question",
            "name": "Qual é a média de acertos de um adulto típico?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Em testes laboratoriais como o CANTAB PAL, adultos saudáveis localizam entre 4 e 6 objetos em grades intermediárias. Este jogo de navegador serve para treino e autoavaliação contínua, não consistindo em laudo médico."
            }
      },
      {
            "@type": "Question",
            "name": "Qual a diferença deste teste para o de memória em grade comum?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O teste de grade comum avalia somente a posição de blocos iluminados idênticos (padrão puramente geométrico). Já a localização de objetos exige associar cada figura específica ao seu ponto exato, elevando a carga de processamento."
            }
      },
      {
            "@type": "Question",
            "name": "Por que é mais complexo guardar a posição de objetos do que padrões simples?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Porque a conjunção de dois atributos diferentes (identidade visual e coordenada espacial) satura rapidamente o foco atencional da memória operacional (Luck & Vogel, 1997)."
            }
      },
      {
            "@type": "Question",
            "name": "Quais regiões cerebrais são recrutadas neste exercício?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Principalmente o hipocampo bilateral, o giro para-hipocampal, o córtex parietal posterior e o córtex pré-frontal dorsolateral (DLPFC) para sustentação ativa das coordenadas espaciais."
            }
      },
      {
            "@type": "Question",
            "name": "Ocorrem penalidades de pontos ou tempo por cliques incorretos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Clicar na célula errada não deduz pontos nem reduz os segundos restantes. A rodada é reiniciada no nível atual para você aprimorar sua estratégia de memorização."
            }
      },
      {
            "@type": "Question",
            "name": "De que forma essa memória ajuda no cotidiano e em jogos?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Facilita o hábito de recordar onde guardou chaves, documentos ou onde estacionou, além de conceder vantagem em jogos competitivos (FPS, MOBA) na vigilância rápida de minimapas e recursos."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como treinar a memória espacial e a localização de objetos",
    "description": "Protocolo metódico de 4 etapas para memorizar posições, ancorar marcos e identificar alvos em matrizes visuais.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location#step-1",
            
            "name": "Varredura por quadrantes",
            "text": "Nos primeiros 500 ms divida visualmente a grade em 4 partes (superior esquerda, superior direita, inferior esquerda e inferior direita) para mensurar a dispersão."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location#step-2",
            
            "name": "Ancoragem em marcos espaciais",
            "text": "Vincule cada objeto a referências fixas e evidentes, como os cantos, as bordas laterais ou o centro da grade."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location#step-3",
            
            "name": "Pareamento semântico-espacial",
            "text": "Crie laços imediatos entre o sentido do objeto e a sua posição (por exemplo: 'estrela no topo, chave embaixo')."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/spatial-memory/object-location#step-4",
            
            "name": "Localização precisa do alvo",
            "text": "Quando a grade se apagar e o alvo for exibido, consulte seu mapa mental e clique na coordenada memorizada sem hesitar."
      }
]
  };

  const objectLocationGuide = {
    intro: [
      "O Teste de Memória Espacial (Object Location Memory Test) é uma ferramenta neurocognitiva projetada para analisar a memória de posição, a vinculação de características objeto-localização (Object-Location Binding) e a reconstrução de disposições espaciais. Diferente de testes com grades anônimas, ele exige conectar figuras visuais singulares a coordenadas exatas.",
      "A base científica dessa avaliação remonta ao trabalho pioneiro de Marion Eals e Irwin Silverman (1994), que comprovaram que a memória para localização de objetos constitui uma adaptação evolutiva distinta da rotação espacial geométrica. Antes disso, Edward C. Tolman (1948) concebeu a noção de mapa cognitivo (Cognitive Map), demonstrando como os organismos erguem maquetes espaciais internas do meio exterior.",
      "Na arquitetura da memória operacional, Robert H. Logie (1995) e Alan Baddeley (2000) comprovaram que o pareamento objeto-posição é orquestrado pelo buffer episódico (Episodic Buffer), que junta os sinais do cache visual (as identidades dos itens) com o escriba interno (o mapa das coordenadas). Steven J. Luck e Edward K. Vogel (1997) evidenciaram o alto custo atencional da fusão de atributos, e Nelson Cowan (2001) comprovou o limite natural de 3 a 4 conjuntos mantidos no foco atencional simultâneo.",
      "Seguindo as diretrizes cronométricas de Woods et al. (2015), esta aplicação adota um intervalo de exposição de 1,5 segundo e uma progressão de dificuldade adaptativa (de grades 3x3 até 7x7) para mapear o limite real da sua retenção visoespacial.",
      "Precisão das medições: cada resposta é cronometrada no próprio navegador com a biblioteca de alta precisão performance.now(), sem envio de dados a servidores remotos. Em virtude de proteções como a Spectre, o timer é arredondado a cerca de 1 ms, e as atualizações de tela acompanham a taxa de atualização do monitor (cerca de 16,7 ms por quadro a 60 Hz; Woods et al., 2015). Variações abaixo de 5 ms constituem flutuações normais de hardware.",
      "Transparência de dados: a SkillDrills não armazena estatísticas centrais. Suas pontuações e configurações residem apenas no localStorage do seu próprio dispositivo, de modo que não divulgamos rankings globais de jogadores. Todas as estimativas de referência citadas advêm de artigos revisados por pares indicados no rodapé.",
      "Este aplicativo é um jogo web gratuito voltado a treino e curiosidade pessoal. Não substitui exames médicos nem tem valor de diagnóstico clínico. Se você tiver apreensões quanto à sua retenção de memória, procure avaliação médica profissional especializada."
],
    benchmarks: {
      title: "Parâmetros normativos de capacidade de ligação de posições espaciais",
      headers: ["Nível de Desempenho", "Objetos e Grade", "Pontuação", "Perfil de Vinculação e Mapa Cognitivo"],
      rows: [
        [
                "Nível 1 (Excepcional / Percentil 99)",
                "Nível 8 – 10+ (8–10+ objetos, grade 6x6–7x7)",
                "1.000+ Pontos",
                "Desempenho visoespacial de elite; domina varredura por quadrantes e ancoragem em marcos; retém 8+ pares objeto-posição com facilidade; resposta em < 500 ms"
        ],
        [
                "Nível 2 (Alto / Percentil 85–95)",
                "Nível 6 – 7 (6–7 objetos, grade 5x5–6x6)",
                "750 – 999 Pontos",
                "Bem acima da média da população; estruturação semântico-espacial consistente; alta imunidade à interferência em grades amplas; resposta em 500–700 ms"
        ],
        [
                "Nível 3 (Média Adulta / Percentil 50)",
                "Nivel 4 – 5 (4–5 objetos, grade 4x4–5x5)",
                "450 – 749 Pontos",
                "Padrão médio da população (Eals & Silverman, 1994); consolida 4 conjunções (limite de Cowan); começa a perder itens centrais em matrizes 5x5; resposta em 700–950 ms"
        ],
        [
                "Nível 4 (Abaixo da Média / Sobrecarga de Vinculação)",
                "Nível 3 (3 objetos, grade 3x3–4x4)",
                "250 – 449 Pontos",
                "Guarda apenas 2–3 itens isolados; confunde posições próximas; vulnerável com a inclusão de novos distratores; resposta em 950–1.300 ms"
        ],
        [
                "Nível 5 (Treino Recomendado / Retenção Frágil)",
                "Nível 1 – 2 (2 objetos, grade 3x3)",
                "< 250 Pontos",
                "Declínio acelerado do vestígio visual; incapacidade de unir a figura à coordenada; tempo de localização acima de 1.300 ms"
        ]
],
      note: "A contagem de objetos e as dimensões da grade retratam o patamar máximo completado em 45 segundos, equiparado aos parâmetros do Silverman-Eals OLM e do CANTAB PAL."
    },
    techniques: {
      title: "Estratégias cientificamente respaldadas para expandir a memória espacial",
      items: [
        {
                "name": "Ancoragem em marcos (Landmark Anchoring)",
                "desc": "Associe os itens a marcos fixos evidentes, como os 4 cantos, as bordas ou o centro (Tolman, 1948). Guardar que 'o diamante está no canto superior esquerdo' poupa o esforço de calcular coordenadas abstratas.",
                "tips": "Nos primeiros 500 ms foque prioritariamente nos símbolos situados em cantos e extremidades."
        },
        {
                "name": "Pareamento semântico-espacial",
                "desc": "Faça conexões lógicas instantâneas entre o significado da figura e sua localização (Baddeley, 2000). Relacione uma estrela alta ao céu e uma chave baixa a uma gaveta no piso.",
                "tips": "Utilize fórmulas verbais breves mentalmente (ex.: 'fogo no topo, gema no canto')."
        },
        {
                "name": "Divisão por quadrantes",
                "desc": "Segmente grades extensas de 5x5 ou 7x7 em quatro zonas imaginárias. Contabilizar previamente quantos objetos ocupam cada setor limita enormemente a área de busca.",
                "tips": "Conte os itens por quadrante antes de registrar a célula precisa de cada um."
        },
        {
                "name": "Olhar centralizado e varredura parafoveal",
                "desc": "Fixe os olhos no meio da matriz para captar a visão de conjunto por meio do campo parafoveal, recorrendo a apenas 1 ou 2 microssacadas para tirar dúvidas.",
                "tips": "Evite saltos oculares desordenados; conserve a cabeça firme e escaneie com estabilidade."
        }
]
    },
    steps: [
      "Concentre o foco no ponto central da matriz e observe a formação geral dos objetos.",
      "Nos 1,5 s de visualização, prenda mentalmente cada figura a um marco de referência.",
      "Crie associações semântico-espaciais instantâneas ligando o ícone à coordenada.",
      "Assim que a tela for limpa e o alvo for indicado, consulte seu mapa mental e clique na posição certa.",
      "Evolua por matrizes graduais de 3x3 a 7x7 desafiando o teto da sua retenção espacial."
],
    audience: "Jogadores focados em vigilância de minimapa e recarga de habilidades, radiologistas, estudantes das áreas de exatas e qualquer pessoa interessada em aprimorar a memória de trabalho visoespacial.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "Teste de Memória Visual (Memory Matrix)"
      },
      {
            "href": "/drills/memory/spatial-memory/path-tracing",
            "label": "Teste de Memória de Trajetória (Path Tracing)"
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
      <ObjectLocationClient
        copy={{
        "h1Keyword": "Teste de Memória Espacial",
        "h1Suffix": " (Localização de Objetos)",
        "subtitle": "A memória de localização de objetos guarda o que estava em cada lugar. Eals e Silverman (1994) avaliaram essa capacidade com matrizes de objetos muito semelhantes a esta, encontrando o mesmo limite biológico de cerca de quatro itens da memória operacional visual (Luck & Vogel, 1997).",
        "statScore": "Pontuação",
        "statTime": "Tempo",
        "statLevel": "Nível",
        "statBestScore": "Melhor Récord",
        "levelPrefix": "Nv.",
        "memorizePrompt": "MEMORIZE AS POSIÇÕES DOS OBJETOS",
        "targetPrompt": "ALVO:",
        "startTitle": "Localização de Objetos Pro",
        "startSubtitle": "Memória Espacial • Evocação de Posições",
        "countdownSubtitle": "PREPARE-SE",
        "newBest": "NOVO RECORDE",
        "pointsLabel": "Pontos",
        "statAccuracy": "Precisão",
        "statPeakLevel": "Nível Máximo",
        "statPerfects": "Perfeitos",
        "btnPlayAgain": "Jogar Novamente",
        "rulesTitle": "Instruções & Sistema de Pontuação",
        "aboutTitle": "Sobre o Treino de Memória Espacial",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Memorize posições & ache o alvo",
                        "highlight": "+150 PTS",
                        "result": "Memorize a grade por 1,5 s e clique na célula exata do ícone indicado"
                },
                {
                        "num": "2",
                        "text": "Progressão em grade",
                        "highlight": "3x3 → 7x7",
                        "result": "Conforme você sobe de nível, o tabuleiro e o número de itens aumentam"
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
                        "result": "O nível não cai, permitindo refinar sua estratégia de ancoragem"
                }
        ]
}}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="pt"
        />
      </div>
    </>
  );
}
