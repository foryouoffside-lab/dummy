import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Concentração – Atenção Sustentada | SkillDrills",
  description: "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
  keywords: [
    "teste de concentracao",
    "teste de atencao sustentada",
    "teste cpt online",
    "teste de foco e atencao",
    "teste de fadiga mental",
    "teste de vigilância cognitiva",
    "resistencia a distracao teste",
    "treino de foco mental gratis",
    "teste de deficit de atencao online",
    "controle inibitorio e foco",
    "teste neuropsicologico de atencao",
    "exercicio de concentracao prolongada"
  ],
  openGraph: {
    title: "Teste de Concentração – Atenção Sustentada | SkillDrills",
    description: "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Concentração – Atenção Sustentada | SkillDrills",
    description: "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "Atenção Sustentada e Concentração",
      "item": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Concentração e Atenção Sustentada",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina",
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
  "name": "Teste de Concentração Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requer navegador moderno com suporte a JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Resistência de Foco e Atenção",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina",
  "description": "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
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
      "name": "O que é o Teste de Atenção Sustentada e Resistência de Concentração?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É uma avaliação contínua (CPT) que mede a capacidade do cérebro de manter foco estável, detectar alvos raros e resistir à perda de vigilância sob pressão de tempo."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o declínio de vigilância (Mackworth, 1948)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É a diminuição progressiva da sensibilidade de detecção de alvos ao longo de períodos contínuos de monitoramento, resultante do esgotamento de recursos atencionais corticais."
      }
    },
    {
      "@type": "Question",
      "name": "Como a alternância de regras desafia a resistência mental?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A troca periódica de regras (ex: vogais vs números primos) força o córtex pré-frontal a limpar buffers de memória de trabalho e superar a inércia do hábito anterior (Monsell, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "O que diferencia este exercício de um teste de reação comum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Testes de reação medem rajadas curtas de velocidade motora, enquanto o treino de resistência atencional examina a estabilidade do foco e a taxa de erros por omissão ou comissão ao longo do tempo."
      }
    },
    {
      "@type": "Question",
      "name": "Como identificar se minha concentração está falhando durante o teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aumento repentino no tempo de reação, toques por impulso em alvos inválidos (erros de comissão) ou perda de alvos válidos (erros de omissão) são sinais diretos de fadiga atencional."
      }
    },
    {
      "@type": "Question",
      "name": "Este treino ajuda pessoas com sintomas de déficit de atenção ou TDAH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, tarefas do tipo CPT auxiliam no fortalecimento do controle inibitório e da capacidade de sustentar esforço voluntário frente a estímulos repetitivos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a frequência diária recomendada para aprimorar o foco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Praticar de 10 a 15 minutos diariamente, preferencialmente no início do dia ou antes de sessões intensas de trabalho e estudo, desenvolve tolerância à fadiga mental."
      }
    },
    {
      "@type": "Question",
      "name": "Como o estresse e o sono impactam a pontuação neste teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A privação de sono afeta diretamente a neurotransmissão noradrenérgica e dopaminérgica, acelerando a perda de vigilância e triplicando os erros impulsivos."
      }
    },
    {
      "@type": "Question",
      "name": "O que representam as categorias de pontuação do teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elas correlacionam sua precisão e velocidade média com percentis normativos de vigilância humana em baterias neuropsicológicas consolidadas."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste de concentração e atenção sustentada é gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta gratuitamente direto no navegador, sem taxas ou formulários de cadastro."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Resistência de Concentração",
  "description": "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Verifique a Regra Alvo Inicial",
      "text": "Observe a diretriz no banner superior que define o critério de ativação válido (ex: Vogais ou Números Primos).",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Mantenha o Monitoramento Contínuo",
      "text": "Acompanhe atentamente os estímulos que piscam sequencialmente sem desviar a atenção visual da área central.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dispare o Toque Apenas em Alvos Válidos",
      "text": "Pressione a barra de espaço ou toque na tela imediatamente quando o estímulo preencher a condição ativa.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Responda à Inversão Periódica de Regras",
      "text": "A cada 10 segundos, reconfigure seu foco para o novo critério anunciado sem cometer disparos impulsivos.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "Neurociência da Atenção Sustentada & Declínio de Vigilância de Mackworth",
    paragraphs: [
      "A atenção sustentada (vigilância contínua) é a faculdade neurobiológica de manter o foco seletivo em estímulos relevantes ao longo de períodos operacionais estendidos.",
      "Desde os experimentos pioneiros de Norman Mackworth (1948) com operadores de radar, a literatura documenta que a eficiência de detecção decai sistematicamente após 20 a 30 minutos em virtude da habituação sináptica e exaustão dos reservatórios de atenção no córtex pré-frontal e lobo parietal (Parasuraman, 1979; Robertson et al., 1997).",
      "Para aumentar a complexidade ecológica, este drill introduz alternâncias dinâmicas de regras a cada 10 segundos, exigindo supressão da inércia de resposta e flexibilidade de reconfiguração cognitiva em tempo real (Monsell, 2003).",
    ],
  },
  benchmarks: {
    title: 'Padrões de Desempenho Cognitivo & Escala de Atenção Sustentada (CPT)',
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
    title: 'Protocolos de Fortalecimento da Concentração',
    description: 'Pautas de treinamento para aumentar a resistência à fadiga mental e aprimorar o foco contínuo.',
    items: [
      { title: "Verifique a Regra Alvo Inicial", description: "Observe a diretriz no banner superior que define o critério de ativação válido (ex: Vogais ou Números Primos)." },
      { title: "Mantenha o Monitoramento Contínuo", description: "Acompanhe atentamente os estímulos que piscam sequencialmente sem desviar a atenção visual da área central." },
      { title: "Dispare o Toque Apenas em Alvos Válidos", description: "Pressione a barra de espaço ou toque na tela imediatamente quando o estímulo preencher a condição ativa." },
      { title: "Responda à Inversão Periódica de Regras", description: "A cada 10 segundos, reconfigure seu foco para o novo critério anunciado sem cometer disparos impulsivos." },
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
      <ConcentrationStaminaClient copy={{ title: "Teste de Concentração e Atenção Sustentada" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/pt/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
