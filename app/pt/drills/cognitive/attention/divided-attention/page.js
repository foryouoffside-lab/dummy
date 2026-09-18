import DividedAttentionClient from '@/app/drills/cognitive/attention/divided-attention/DividedAttentionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Atenção Dividida – Foco Duplo | SkillDrills",
  description: "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
  keywords: [
    "teste de atencao dividida",
    "atencao dividida exercicios",
    "teste de dupla tarefa online",
    "treino de atencao dividida",
    "periodo refratario psicologico",
    "gargalo cognitivo teste",
    "teste de atencao compartilhada",
    "multitarefa cognitiva teste",
    "rastreamento visual e numeros",
    "teste neuropsicologico atencao dividida",
    "exercicio de foco duplo",
    "treino mental de dupla tarefa"
  ],
  openGraph: {
    title: "Teste de Atenção Dividida – Foco Duplo | SkillDrills",
    description: "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Atenção Dividida – Foco Duplo | SkillDrills",
    description: "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive/attention/divided-attention',
    languages: getAlternateLanguages('/drills/cognitive/attention/divided-attention'),
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
      "name": "Atenção Dividida e Dupla Tarefa",
      "item": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Atenção Dividida – Dupla Tarefa",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention",
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
  "name": "Teste de Atenção Dividida Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requer navegador moderno com suporte a JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Foco Dividido e Multitarefa Cognitiva",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention",
  "description": "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
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
      "name": "O que é atenção dividida e o que este teste avalia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atenção dividida é a capacidade de processar simultaneamente duas ou mais fontes de informação e responder a múltiplos fluxos de tarefas com sobrecarga mínima de latência."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Período Refratário Psicológico (PRP, Pashler 1994)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O PRP é o atraso no tempo de resposta que ocorre quando um segundo estímulo surge rapidamente após o primeiro, provocado por um gargalo central na seleção de respostas do cérebro."
      }
    },
    {
      "@type": "Question",
      "name": "O que postula a Teoria dos Múltiplos Recursos de Wickens (2002)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Christopher Wickens demonstrou que a atenção pode ser dividida de modo mais eficiente quando as tarefas concorrentes utilizam modalidades sensoriais e códigos cognitivos distintos."
      }
    },
    {
      "@type": "Question",
      "name": "É possível treinar e melhorar a capacidade de dupla tarefa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A prática sistemática automatiza os processos perceptivo-motores da tarefa primária, liberando largura de banda executiva para processar a tarefa secundária com fluidez."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o teste combina rastreamento visual e classificação numérica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porque essa combinação desafia simultaneamente a via visual dorsal (rastreamento espacial) e a via ventral/frontal (decodificação simbólica e regras lógicas)."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício se aplica ao desempenho em esportes e videogames?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilotos, atletas e jogadores competitivos precisam monitorar o ambiente espacial enquanto acompanham cronômetros, minimapas e comunicação de equipe em tempo real."
      }
    },
    {
      "@type": "Question",
      "name": "O que são os custos de dupla tarefa (dual-task costs)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É a perda mensurável em velocidade ou precisão quando uma pessoa realiza duas tarefas simultâneas em comparação com cada tarefa isolada."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o tempo de treino diário recomendado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De 10 a 15 minutos ao dia são ideais para expandir a capacidade de multiplexação cognitiva sem causar sobrecarga ou fadiga pré-frontal excessiva."
      }
    },
    {
      "@type": "Question",
      "name": "Como o envelhecimento afeta a atenção dividida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O custo de dupla tarefa tende a aumentar com a idade devido à redução na velocidade de processamento neural, mas o treino contínuo ajuda a amortecer esse impacto."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste online de atenção dividida é gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills oferece este treino de atenção dividida 100% gratuito e direto no navegador, sem taxas ou formulários de cadastro."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Atenção Dividida",
  "description": "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Monitore o Alvo Visual Primário",
      "text": "Mantenha a visão focada na trajetória do nó móvel para intervir instantaneamente quando necessário.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Processe o Fluxo Secundário de Números",
      "text": "Sem desviar o olhar do alvo principal, identifique se os dígitos apresentados satisfazem a regra ativa.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Divida as Respostas Motoras",
      "text": "Execute toques rápidos com o mouse ou teclado para ambas as tarefas sem paralisar o rastreamento.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Equilibre a Precisão em Ambos os Canais",
      "text": "Evite focar em apenas uma das tarefas: a pontuação máxima exige alto rendimento simultâneo.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/divided-attention#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('pashler1994', 'wickens2002', 'strayer2001', 'spelke1976', 'woods2015'),
  intro: {
    title: "Neurociência da Atenção Dividida & Teoria do Gargalo Central de Pashler",
    paragraphs: [
      "A atenção dividida quantifica a eficiência com que o sistema cognitivo aloca recursos executivos finitos entre duas demandas paralelas de processamento perceptual e tomada de decisão.",
      "Conforme demonstrado por Harold Pashler (1994) através do paradigma do Período Refratário Psicológico (PRP), as etapas de seleção de resposta motora não operam em verdadeiro paralelismo, mas através de um gargalo serial central no córtex pré-frontal.",
      "A Teoria dos Múltiplos Recursos de Christopher Wickens (2002) evidencia que a sobrecarga pode ser amenizada combinando canais visuomotores espaciais com decodificação numérica abstrata, treinando o cérebro a alternar entre tarefas em milissegundos sem perder precisão.",
    ],
  },
  benchmarks: {
    title: 'Padrões de Desempenho Cognitivo & Escala de Dupla Tarefa (Dual-Task)',
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
    title: 'Protocolos de Treinamento em Dupla Tarefa',
    description: 'Diretrizes científicas para maximizar o processamento multicanal e atenuar custos de comutação.',
    items: [
      { title: "Monitore o Alvo Visual Primário", description: "Mantenha a visão focada na trajetória do nó móvel para intervir instantaneamente quando necessário." },
      { title: "Processe o Fluxo Secundário de Números", description: "Sem desviar o olhar do alvo principal, identifique se os dígitos apresentados satisfazem a regra ativa." },
      { title: "Divida as Respostas Motoras", description: "Execute toques rápidos com o mouse ou teclado para ambas as tarefas sem paralisar o rastreamento." },
      { title: "Equilibre a Precisão em Ambos os Canais", description: "Evite focar em apenas uma das tarefas: a pontuação máxima exige alto rendimento simultâneo." },
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
      <DividedAttentionClient copy={{ title: "Teste de Atenção Dividida – Foco Duplo" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/pt/drills/cognitive/attention/divided-attention" />
      </div>
    </>
  );
}
