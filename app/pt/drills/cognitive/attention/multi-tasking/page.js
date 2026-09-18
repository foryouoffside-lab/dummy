import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Multitarefa – Foco em Fluxo Duplo | SkillDrills",
  description: "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao.",
  keywords: [
    "teste de multitarefa",
    "teste de flexibilidade cognitiva",
    "teste de alternancia de tarefas",
    "teste de atencao dividida online",
    "jogo de multitarefa cerebral",
    "treino de processamento paralelo",
    "teste de sobrecarga cognitiva",
    "treino neurocognitivo de foco duplo",
    "teste de capacidade multitarefa",
    "exercicio para agilidade mental",
    "coordenacao inter-hemisferica teste",
    "teste de velocidade de alternancia"
  ],
  openGraph: {
    title: "Teste de Multitarefa – Foco em Fluxo Duplo | SkillDrills",
    description: "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Multitarefa – Foco em Fluxo Duplo | SkillDrills",
    description: "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
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
      "name": "Treino Cognitivo",
      "item": "https://skilldrills.online/pt/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Teste de Multitarefa",
      "item": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Multitarefa — Treino de Atencao em Fluxo Duplo",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao.",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking",
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
  "name": "Teste de Multitarefa",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requer navegador moderno com suporte a JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Multitarefa – Treino de Foco em Fluxo Duplo",
  "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking",
  "description": "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao.",
  "genre": [
    "Acao",
    "Jogo Cerebral",
    "Treino Cognitivo"
  ],
  "gamePlatform": [
    "Navegador Web",
    "Desktop",
    "Dispositivos Moveis"
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
      "name": "O que e o Teste de Multitarefa (Dual-Target Flow)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Este exercicio desafia o cerebro a monitorar dois fluxos geometricos independentes movendo-se em direcoes opostas, testando a coordenacao inter-hemisferica e a capacidade de processamento concorrente."
      }
    },
    {
      "@type": "Question",
      "name": "O que e o custo de alternancia (switch cost) segundo Rogers e Monsell (1995)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O custo de alternancia e a perda mensuravel em tempo de reacao e precisao que ocorre quando o cerebro precisa alternar entre diferentes regras de tarefas em vez de repetir a mesma acao continuamente."
      }
    },
    {
      "@type": "Question",
      "name": "O cerebro humano e capaz de realizar multitarefa paralela real?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A neurociencia cognitiva comprova que para tarefas complexas nao automatizadas, o cerebro opera por compartilhamento rapido de tempo serial e nao por computacao paralela simultanea (Pashler, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "O que Ophir, Nass e Wagner (2009) descobriram sobre multitarefas cronicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eles constataram que pessoas com habitos intensos de multitarefa de midia sao mais vulneraveis a interferencias irrelevantes e apresentam menor eficiencia no controle da atencao seletiva."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o rastreamento em ambos os hemisferios cerebrais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apresentar formas em ambos os campos visuais simultaneamente ativa as vias occipitais e parietais de ambos os lados, exigindo comunicacao agil pelo corpo caloso sob pressao temporal."
      }
    },
    {
      "@type": "Question",
      "name": "Quais tecnicas aumentam a pontuacao no fluxo duplo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mantenha o olhar relaxado no ponto medio entre os dois fluxos e utilize a visao periferica para identificar figuras validas antes de desferir o clique motor."
      }
    },
    {
      "@type": "Question",
      "name": "Como a progressao de nivel sobrecarrega o controle executivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A velocidade das formas aumenta, os modelos-alvo divergem com maior frequencia e a janela de tolerancia temporal diminui, exigindo maximo rendimento sensorial."
      }
    },
    {
      "@type": "Question",
      "name": "A latencia dos perifericos afeta os resultados do teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, telas com taxas de atualizacao de 144Hz ou superiores e mouses de baixa latencia reduzem o desfoque de movimento (Woods et al., 2015), facilitando a identificacao de formas rapidas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual e a frequencia ideal de treino de multitarefa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessoes curtas de 10 a 15 minutos promovem estimulo neuroplastico eficaz sem induzir estafa mental ou saturacao executiva."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste de multitarefa e totalmente gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta gratuitamente no navegador, sem cobrancas, instalacoes ou necessidade de cadastro."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Multitarefa",
  "description": "Guia pratico para rastrear fluxos visuais duplos e otimizar a alternancia de tarefas sob pressao temporal.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Amplie o Foco nos Canais de Fluxo",
      "text": "Posicione sua visao no centro da tela para monitorar simultaneamente os dois fluxos em direcoes opostas.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifique as Figuras-Alvo Ativas",
      "text": "Memorize os simbolos-alvo indicados no painel superior para cada canal visual.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Toques de Alta Precisao",
      "text": "Clique ou toque imediatamente nas figuras que coincidem com os modelos-alvo antes que cruzem o limite da area util.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sustente a Cadencia com Aceleracao",
      "text": "Mantenha o ritmo a medida que a velocidade aumenta para expandir seu multiplicador de combo e pontuacao final.",
      "url": "https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "Teste de Multitarefa e Alternancia Cognitiva",
    paragraphs: [
      "O teste de multitarefa em fluxo duplo avalia a capacidade do sistema executivo central em gerenciar canais perceptivos concorrentes sem sofrer colapso atencional sob pressao de tempo.",
      "O custo de alternancia (switch cost) representa a reducao mensuravel na velocidade de resposta e acuracia quando ha necessidade de transitar entre diferentes requisitos de tarefas (Rogers & Monsell, 1995).",
      "Investigacoes em neurociencia cognitiva mostram que tarefas concorrentes nao automatizadas dependem de comutacao temporal de alta frequencia pelo cortex pre-frontal (Pashler, 1994; Wickens, 2002).",
    ],
  },
  benchmarks: {
    title: 'Padroes e Tiers de Desempenho em Multitarefa',
    headers: ['Nivel', 'Rank', 'Classificacao', 'Acuracia', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Grao-Mestre / Elite', stat: 'Top 1%', level: 'Mestria', accuracy: '98%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Foco Avancado', stat: 'Top 5%', level: 'Diamante', accuracy: '94-97%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Operador Eficiente', stat: 'Top 15%', level: 'Platina', accuracy: '88-93%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Media Adulta', stat: 'Top 50%', level: 'Ouro', accuracy: '78-87%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Iniciante / Base', stat: 'Base', level: 'Prata', accuracy: '<78%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Otimizacao Neurocognitiva',
    description: 'Estrategias fundamentadas para fortalecimento do controle executivo e agilidade perceptual.',
    items: [
      { title: "Amplie o Foco nos Canais de Fluxo", description: "Posicione sua visao no centro da tela para monitorar simultaneamente os dois fluxos em direcoes opostas." },
      { title: "Identifique as Figuras-Alvo Ativas", description: "Memorize os simbolos-alvo indicados no painel superior para cada canal visual." },
      { title: "Execute Toques de Alta Precisao", description: "Clique ou toque imediatamente nas figuras que coincidem com os modelos-alvo antes que cruzem o limite da area util." },
      { title: "Sustente a Cadencia com Aceleracao", description: "Mantenha o ritmo a medida que a velocidade aumenta para expandir seu multiplicador de combo e pontuacao final." },
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

export default function EnhancedPage() {
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
      <DualTargetFlowClient copy={{ title: "Teste de Multitarefa – Foco em Fluxo Duplo" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/pt/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
