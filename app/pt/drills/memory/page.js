import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: 'Jogos de Memória & Memória de Trabalho | SkillDrills',
  description: 'Jogos de memória grátis online. 7 exercícios científicos para memória de trabalho (N-Back), span de dígitos e retenção espacial no navegador.',
  keywords: [
    'jogos de memória online grátis', 'treinar memória de trabalho', 'teste de memória de curto prazo',
    'teste de span de dígitos online', 'treino n-back online grátis', 'exercícios de memória espacial',
    'exercícios para melhorar a memória', 'teste de memória visual grátis', 'teste dos blocos de corsi online',
    'método de chunking memória', 'estimulação cognitiva memória adultos', 'exercícios para perda de memória',
    'jogos de memória para idosos grátis', 'memória e concentração para estudos', 'esports mapa tático memória visoespacial'
  ],
  openGraph: {
    title: 'Jogos de Memória & Memória de Trabalho | SkillDrills',
    description: 'Jogos de memória grátis online. 7 exercícios científicos para memória de trabalho (N-Back), span de dígitos e retenção espacial no navegador.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/memory',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Jogos de Memória e Testes Cognitivos no SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogos de Memória & Memória de Trabalho | SkillDrills',
    description: 'Memória de trabalho (N-Back), span de dígitos, evocação verbal e retenção espacial: 7 exercícios científicos no navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/memory',
    languages: getAlternateLanguages('/pt/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Exercícios de Performance", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Memória & Memória de Trabalho", "item": "https://skilldrills.online/pt/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Jogos de Memória & Testes Cognitivos (7 Exercícios)",
  "url": "https://skilldrills.online/pt/drills/memory",
  "description": "7 exercícios neurocientíficos interativos para treinar memória de trabalho (N-Back), span de dígitos e retenção visoespacial.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'pt', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/pt${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual é a diferença fundamental entre memória de curto prazo e memória de trabalho (operacional)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A memória de curto prazo refere-se à capacidade passiva de reter uma quantidade limitada de informações durante um breve período (como lembrar um código de 6 dígitos por alguns segundos). Em contraste, a memória de trabalho (modelo de Baddeley & Hitch) é um sistema executivo ativo que não apenas retém, mas manipula, atualiza e reorganiza essas informações em tempo real enquanto você resolve problemas, toma decisões ou executa tarefas motoras complexas."
      }
    },
    {
      "@type": "Question",
      "name": "Como a tarefa N-Back (Dual N-Back) consegue expandir o desempenho cognitivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A tarefa N-Back exige que você monitore continuamente uma sequência de estímulos (visuais ou auditivos) e aponte quando o estímulo atual coincide com o apresentado N passos atrás. Isso recruta fortemente o córtex pré-frontal dorsolateral, treinando a atualização rápida da memória de trabalho, a inibição de dados obsoletos e o foco seletivo. Estudos de neuroplasticidade demonstram que o treino progressivo com N-Back melhora a inteligência fluida e a sustentação atencional."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a capacidade normal de retenção no teste de span de dígitos (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo a clássica Lei de Miller e revisões neuropsicológicas modernas (Cowan), a média populacional de retenção para dígitos diretos é de 7 ± 2 itens (entre 5 e 9 dígitos). Na ordem inversa (Backward Digit Span), que exige manipulação ativa da memória de trabalho, a média fica entre 4 e 6 dígitos. Com treino de chunking (agrupamento fonológico e numérico), atletas cognitivos conseguem reter mais de 12 dígitos com facilidade."
      }
    },
    {
      "@type": "Question",
      "name": "Como os exercícios de memória espacial e blocos de Corsi influenciam o desempenho em jogos e esportes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste dos blocos de Corsi e as matrizes espaciais avaliam o esboço visoespacial. Em esportes eletrônicos (como CS2, Valorant e MOBAs) e modalidades físicas dinâmicas, essa função é crucial para o 'map awareness': manter na mente a posição relativa de adversários fora do campo de visão imediato, prever trajetórias e calcular rotas táticas em frações de segundo."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a técnica de \"Chunking\" e como ela pode ser aplicada nestes treinos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chunking é a estratégia cognitiva de agrupar fragmentos individuais de dados em unidades maiores de significado. Por exemplo, em vez de memorizar a sequência '1, 9, 8, 4, 2, 0, 2, 6' como 8 itens isolados, você pode agrupá-los como '1984' e '2026' (apenas 2 blocos conceituais). Essa técnica reduz drasticamente a sobrecarga do buffer fonológico e permite reter sequências muito mais extensas nos testes de memória."
      }
    },
    {
      "@type": "Question",
      "name": "Com que frequência e por quanto tempo devo treinar para notar ganhos cognitivos mensuráveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Protocolos de intervenção cognitiva recomendam sessões de 15 a 20 minutos diários, 4 a 5 vezes por semana. Praticar por períodos prolongados sob fadiga mental extrema gera rendimentos decrescentes. A consistência diária ativa a potenciação de longa duração (LTP) nas sinapses do hipocampo e das redes frontoparietais, consolidando melhorias na velocidade de processamento e retenção após 3 a 4 semanas."
      }
    },
    {
      "@type": "Question",
      "name": "É possível prevenir o declínio cognitivo associado à idade através destes exercícios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O treinamento sistemático da memória e de tarefas de raciocínio fortalece a chamada reserva cognitiva — a resiliência estrutural e funcional das redes neurais contra o envelhecimento biológico. O engajamento contínuo em desafios cognitivos estimula a plasticidade sináptica e mantém ativas as vias corticais, reduzindo lapsos cotidianos e preservando a autonomia funcional."
      }
    },
    {
      "@type": "Question",
      "name": "Os testes de memória online executados no navegador possuem validade científica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Os exercícios do SkillDrills são baseados diretamente nos paradigmas clássicos da neurociência experimental e avaliação neuropsicológica (como a escala Wechsler e o bloco de Corsi). Nossa arquitetura executa a renderização e o registro de cliques diretamente na camada de hardware do navegador, garantindo precisão cronométrica de nível laboratorial sem a necessidade de downloads ou instalações."
      }
    }
  ]
};

export default function PortugueseMemoryHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

