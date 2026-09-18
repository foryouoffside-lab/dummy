import RSVPReaderClient from '@/app/drills/cognitive/processing-speed/rsvp-reader/RSVPReaderClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Leitor RSVP – Teste de Leitura Dinâmica WPM | SkillDrills",
  description: "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
  keywords: [
    "leitor rsvp",
    "leitura dinamica online",
    "teste de velocidade de leitura",
    "apresentacao visual serial rapida",
    "teste wpm leitura",
    "palavras por minuto teste",
    "ponto de reconhecimento otimo",
    "treino de leitura dinamica gratis",
    "processamento lexico rapido",
    "leitor rsvp online gratis",
    "teste de compreensao de leitura",
    "software leitura dinamica gratis"
  ],
  openGraph: {
    title: "Leitor RSVP – Teste de Leitura Dinâmica WPM | SkillDrills",
    description: "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leitor RSVP – Teste de Leitura Dinâmica WPM | SkillDrills",
    description: "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/rsvp-reader'),
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
      "name": "Leitor RSVP",
      "item": "https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Leitor RSVP – Teste de Leitura Dinâmica WPM",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader",
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
  "name": "Leitor RSVP Online",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requer navegador moderno com suporte a JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-16"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treino de Leitura Rápida RSVP",
  "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader",
  "description": "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
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
      "name": "O que é o método RSVP (Apresentação Visual Serial Rápida)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O RSVP é uma técnica que exibe palavras sequencialmente em um ponto focal fixo na tela, eliminando a necessidade de movimentos oculares sacádicos e regressões visuais."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Ponto de Reconhecimento Ótimo (ORP)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O ORP (Optimal Recognition Point) é o ponto de fixação específico dentro de uma palavra (ligeiramente à esquerda do centro) onde o cérebro decodifica o termo com menor latência foveal (Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a leitura convencional em papel ou tela é mais lenta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Na leitura tradicional, até 80% do tempo é gasto em saltos sacádicos (20-40ms cada) e regressões corretivas inconscientes, limitando a velocidade média a 200-250 WPM (Rayner, 2016)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a velocidade média de leitura e o patamar de leitura dinâmica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A média adulta é de 200 a 250 palavras por minuto (WPM). Leitores dinâmicos treinados com auxílio de RSVP atingem de 500 a 850 WPM mantendo boa retenção."
      }
    },
    {
      "@type": "Question",
      "name": "A técnica de RSVP prejudica a compreensão do texto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em textos narrativos e lineares, a compreensão se mantém estável até 500-600 WPM. Em velocidades extremas acima de 800 WPM, a retenção pode diminuir para passagens complexas."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a subvocalização e como o RSVP ajuda a superá-la?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A subvocalização é a pronúncia mental interna das palavras. O RSVP força a apresentação visual acima da velocidade da fala (350+ WPM), ensinando o cérebro a decodificar o significado diretamente."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a duração recomendada de uma sessão de treino com RSVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se treinar entre 10 e 15 minutos diários com aumentos progressivos de 50 WPM para evitar fadiga ocular foveal."
      }
    },
    {
      "@type": "Question",
      "name": "O leitor RSVP funciona bem em smartphones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o leitor RSVP é ideal para telas pequenas, pois centraliza o texto em uma única linha focal sem necessidade de rolagem ou zoom."
      }
    },
    {
      "@type": "Question",
      "name": "Como os marcadores visuais do ORP aceleram a leitura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao destacar em vermelho a letra correspondente ao ORP, o olhar fixa-se instantaneamente no centro de gravidade visual da palavra, otimizando o campo parafoveal."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste e ferramenta de RSVP são gratuitos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills oferece o leitor RSVP e teste de velocidade totalmente grátis no navegador, sem cadastros ou limitações."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar com o Leitor RSVP",
  "description": "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixe o Olhar no Ponto Focal Central",
      "text": "Mantenha seus olhos relaxados e focalizados exatamente na linha guia central sem mover as pupilas.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/reaction-time#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Selecione a Velocidade Inicial (WPM)",
      "text": "Comece em uma cadência confortável (ex: 300 WPM) para calibrar a taxa de assimilação léxica.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/reaction-time#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Iniba a Subvocalização Interna",
      "text": "Absorva os conceitos de cada palavra visualmente sem pronunciá-las mentalmente na voz interna.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/reaction-time#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Avance Progressivamente a Dificuldade",
      "text": "A cada bloco lido com clareza, aumente a taxa de palavras por minuto até alcançar patamares acima de 600 WPM.",
      "url": "https://skilldrills.online/pt/drills/cognitive/processing-speed/reaction-time#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'rayner2016', 'woods2015'),
  intro: {
    title: "Neurociência da Leitura RSVP & Ponto de Reconhecimento Ótimo (ORP)",
    paragraphs: [
      "A Apresentação Visual Serial Rápida (RSVP - Rapid Serial Visual Presentation) é um paradigma neurocognitivo que neutraliza os principais gargalos mecânicos da leitura tradicional.",
      "Na leitura convencional em linha, o leitor despende cerca de 80% do tempo executando movimentos sacádicos oculares (20 a 40ms cada) e fixações foveais intermitentes (200 a 250ms), além de regressões visuais causadas por distrações (Rayner, 1998, 2016).",
      "Ao ancorar cada palavra no Ponto de Reconhecimento Ótimo (ORP — geralmente situado ligeiramente à esquerda do centro do termo), o RSVP projeta o fluxo textual diretamente na fóvea central, permitindo que a velocidade de processamento léxico se expanda até 850 WPM.",
    ],
  },
  benchmarks: {
    title: 'Padrões de Velocidade de Leitura & Baremos Cognitivos (WPM)',
    headers: ['Nível', 'Classificação', 'Velocidade de Leitura', 'Taxa de Retenção', 'Percentil'],
    rows: [
      { tier: 'Tier 1', rank: 'Leitor Dinâmico de Elite', stat: '650 – 850+ WPM', level: 'Mestrado', accuracy: '95%+', percentile: 'Top 1%' },
      { tier: 'Tier 2', rank: 'Leitor Avançado / Rápido', stat: '450 – 649 WPM', level: 'Diamante', accuracy: '90-94%', percentile: 'Top 5%' },
      { tier: 'Tier 3', rank: 'Proficiente Acima da Média', stat: '300 – 449 WPM', level: 'Platina', accuracy: '85-89%', percentile: 'Top 15%' },
      { tier: 'Tier 4', rank: 'Leitor Padrão Adulto', stat: '200 – 299 WPM', level: 'Ouro', accuracy: '75-84%', percentile: 'Top 50%' },
      { tier: 'Tier 5', rank: 'Iniciante / Leitura Lenta', stat: '< 200 WPM', level: 'Prata', accuracy: '< 75%', percentile: 'Base' },
    ],
  },
  protocols: {
    title: 'Protocolos de Otimização da Velocidade de Leitura',
    description: 'Etapas comprovadas para acelerar a decodificação lexical e eliminar a voz mental.',
    items: [
      { title: "Fixe o Olhar no Ponto Focal Central", description: "Mantenha seus olhos relaxados e focalizados exatamente na linha guia central sem mover as pupilas." },
      { title: "Selecione a Velocidade Inicial (WPM)", description: "Comece em uma cadência confortável (ex: 300 WPM) para calibrar a taxa de assimilação léxica." },
      { title: "Iniba a Subvocalização Interna", description: "Absorva os conceitos de cada palavra visualmente sem pronunciá-las mentalmente na voz interna." },
      { title: "Avance Progressivamente a Dificuldade", description: "A cada bloco lido com clareza, aumente a taxa de palavras por minuto até alcançar patamares acima de 600 WPM." },
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
      <RSVPReaderClient copy={{ title: "Leitor RSVP – Teste de Leitura Dinâmica" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/pt/drills/cognitive/processing-speed/rsvp-reader" />
      </div>
    </>
  );
}
