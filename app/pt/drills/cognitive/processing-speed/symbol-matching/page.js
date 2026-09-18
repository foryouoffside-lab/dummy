import SymbolMatchingClient from '@/app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste SDMT – Símbolos e Dígitos Online | SkillDrills",
  description: "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
  keywords: [
    "teste de simbolos e digitos",
    "teste sdmt online",
    "teste de velocidade de processamento",
    "substituicao de simbolos e digitos",
    "teste dsst online",
    "rastreamento visual cognitivo",
    "memoria associativa teste",
    "agilidade mental teste online",
    "teste neuropsicologico gratis",
    "teste de atencao e velocidade",
    "exercicio de processamento visual",
    "teste cognitivo de simbolos"
  ],
  openGraph: {
    title: "Teste SDMT – Símbolos e Dígitos Online | SkillDrills",
    description: "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste SDMT – Símbolos e Dígitos Online | SkillDrills",
    description: "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/symbol-matching'),
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
      "name": "Treinos",
      "item": "https://skilldrills.online/pt/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Cognitivo",
      "item": "https://skilldrills.online/pt/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Teste SDMT de Símbolos",
      "item": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste SDMT – Símbolos e Dígitos",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste SDMT Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requer navegador moderno com suporte a JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Correspondência de Símbolos e Dígitos",
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching",
  "description": "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o teste SDMT (Symbol Digit Modalities Test)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O SDMT é um teste neuropsicológico padrão ouro desenvolvido por Aaron Smith (1973) para avaliar velocidade de processamento da informação, rastreamento visual e atenção sustentada."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre os testes SDMT e DSST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No DSST (Wechsler), escrevem-se símbolos para cada dígito. No SDMT, associam-se números a símbolos geométricos, isolando a rapidez cognitiva com menor interferência de destreza motora fina."
      }
    },
    {
      "@type": "Question",
      "name": "Quais domínios cognitivos são avaliados neste exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avalia-se a velocidade de processamento perceptivo, a exploração visual rápida, a memória operacional associativa e a flexibilidade de transição executiva."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o teste SDMT é tão utilizado na neuropsicologia clínica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Por sua sensibilidade extrema a pequenas alterações na integridade da substância branca cerebral, fadiga mental e velocidade de transmissão axonal."
      }
    },
    {
      "@type": "Question",
      "name": "Como a memória de trabalho acelera as pontuações?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao memorizar os pares símbolo-número, o participante deixa de consultar a chave superior a cada rodada, reduzindo a latência a meros tempos de disparo motor."
      }
    },
    {
      "@type": "Question",
      "name": "É normal sentir cansaço mental após a sessão de teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A demanda contínua por atenção visual focada e decodificação rápida mobiliza intensamente os circuitos do lobo parietal e pré-frontal."
      }
    },
    {
      "@type": "Question",
      "name": "Como o desempenho no SDMT se correlaciona com jogos e esports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jogadores de elite processam sinais visuais periféricos e ícones de interface com maior rapidez, conferindo vantagem crítica em tomadas de decisão sob pressão."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a frequência de treinamento diário recomendada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uma a duas sessões diárias de 5 a 10 minutos são ideais para consolidar a agilidade de emparelhamento sem saturar a memória operacional."
      }
    },
    {
      "@type": "Question",
      "name": "A velocidade de processamento no SDMT declina com a idade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, há um declínio gradual a partir dos 30 anos (Der & Deary, 2006). Práticas cognitivas deliberadas preservam a eficiência sináptica por longos períodos."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste online de símbolos e dígitos é gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta sem custos, de forma direta no navegador, sem necessidade de registro ou instalação."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste SDMT de Correspondência de Símbolos",
  "description": "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Consulte a Chave Superior de Mapeamento",
      "text": "Examine a tabela de referência que associa cada símbolo geométrico a um dígito numérico específico.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifique o Símbolo Central Ativo",
      "text": "Observe o símbolo apresentado na área central de foco e determine imediatamente seu número correspondente.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Pressione o Dígito Correto",
      "text": "Digite no teclado numérico ou clique no botão correspondente o mais rápido possível sem cometer erros.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Memorize os Pares para Ganhar Ritmo",
      "text": "Conforme internaliza o mapeamento, responda diretamente pela memória associativa para maximizar o escore.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  intro: {
    title: "Neurociência do Teste SDMT & Velocidade de Processamento da Informação",
    paragraphs: [
      "O Teste de Modalidades de Dígitos e Símbolos (SDMT - Symbol Digit Modalities Test) é uma avaliação neurocognitiva consagrada na literatura clínica para medir a velocidade de processamento mental (Smith, 1973).",
      "Enquanto o DSST tradicional da escala Wechsler exige transcrição manual com caneta, o formato digital de correspondência rápida isola a velocidade perceptiva cortical pura, reduzindo a interferência de limitações motoras periféricas.",
      "O teste recruta simultaneamente a velocidade de decodificação no córtex visual primário, a memória de trabalho no córtex pré-frontal e a atenção seletiva orientada pelo lobo parietal (Der & Deary, 2006; Woods et al., 2015).",
    ],
  },
  benchmarks: {
    title: 'Padrões de Desempenho Cognitivo & Escala do Teste SDMT',
    headers: ['Nível', 'Classificação', 'Faixa de Rendimento', 'Precisão', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Grande Mestre / Elite', stat: 'Top 1%', level: 'Mestrado', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avançado', stat: 'Top 5%', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operador Proficiente', stat: 'Top 15%', level: 'Platina', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Padrão Adulto Médio', stat: 'Top 50%', level: 'Ouro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Linha de Base Inicial', stat: 'Base', level: 'Prata', accuracy: '< 78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Treinamento e Otimização Perceptiva',
    description: 'Orientações práticas para maximizar a velocidade de varredura visual e associação rápida.',
    items: [
      { title: "Consulte a Chave Superior de Mapeamento", description: "Examine a tabela de referência que associa cada símbolo geométrico a um dígito numérico específico." },
      { title: "Identifique o Símbolo Central Ativo", description: "Observe o símbolo apresentado na área central de foco e determine imediatamente seu número correspondente." },
      { title: "Pressione o Dígito Correto", description: "Digite no teclado numérico ou clique no botão correspondente o mais rápido possível sem cometer erros." },
      { title: "Memorize os Pares para Ganhar Ritmo", description: "Conforme internaliza o mapeamento, responda diretamente pela memória associativa para maximizar o escore." },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function EnhancedPagePt() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <SymbolMatchingClient copy={{ title: "Teste SDMT de Símbolos e Dígitos" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/pt/drills/cognitive/processing-speed/symbol-matching" />
      </div>
    </>
  );
}
