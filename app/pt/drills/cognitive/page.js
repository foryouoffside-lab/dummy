import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: 'Treino Cognitivo & Agilidade Mental Grátis | SkillDrills',
  description: 'Treino cognitivo e ginástica cerebral online grátis. 8 exercícios científicos para foco, velocidade mental, teste de Stroop e tabelas de Schulte.',
  keywords: [
    'treino cognitivo gratuito online', 'exercícios de estimulação cognitiva', 'jogos para exercitar o cérebro',
    'como melhorar a concentração exercícios', 'teste de velocidade de processamento', 'teste de stroop online gratis',
    'tabela de schulte online', 'exercícios de atenção dividida', 'treinar memoria de trabalho',
    'jogos de ginástica cerebral gratis', 'exercícios de funções executivas', 'flexibilidade cognitiva treino',
    'exercícios para tdah adultos foco', 'treinamento mental para esports', 'estimulação cognitiva idosos jogos'
  ],
  openGraph: {
    title: 'Treino Cognitivo & Agilidade Mental Grátis | SkillDrills',
    description: 'Treino cognitivo e ginástica cerebral online grátis. 8 exercícios científicos para foco, velocidade mental, teste de Stroop e tabelas de Schulte.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Treino Cognitivo e Exercícios Mentais no SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino Cognitivo & Agilidade Mental Grátis | SkillDrills',
    description: 'Aprimore sua concentração, controle inibitório, teste de Stroop e tabelas de Schulte com 8 exercícios científicos no navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/cognitive',
    languages: getAlternateLanguages('/pt/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Exercícios de Performance", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Treino Cognitivo & Mental", "item": "https://skilldrills.online/pt/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Treino Cognitivo & Ginástica Cerebral (8 Exercícios)",
  "url": "https://skilldrills.online/pt/drills/cognitive",
  "description": "8 exercícios neurocientíficos interativos para treinar atenção seletiva, controle inibitório, efeito Stroop, tabelas de Schulte e velocidade mental.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
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
      "name": "O que é treino cognitivo e como ele fortalece a mente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O treino cognitivo é composto por um conjunto estruturado de atividades neurocientíficas voltadas para exercitar e fortalecer redes neurais específicas, tais como a memória de trabalho, o controle inibitório e a velocidade de processamento da informação. A repetição sistemática desses estímulos promove a neuroplasticidade nas regiões pré-frontal e parietal, elevando a capacidade de foco sustentado, a tomada de decisões ágil e a resiliência à fadiga mental."
      }
    },
    {
      "@type": "Question",
      "name": "Quais capacidades mentais essenciais são trabalhadas nestes exercícios?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A plataforma SkillDrills foca nos cinco pilares primordiais das funções executivas: velocidade de processamento perceptivo (tempo para decodificar e classificar estímulos visuais), controle inibitório (supressão ativa de impulsos incorretos através do efeito Stroop), atenção dividida (gerenciamento concomitante de múltiplos canais visuais), rastreamento periférico amplo com tabelas de Schulte e flexibilidade cognitiva para adaptação imediata a regras dinâmicas."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o teste de Stroop e por que ele é crucial para o foco e autocontrole?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Descoberto em 1935 pelo psicólogo John Ridley Stroop, o teste avalia o grau de interferência cognitiva quando o significado semântico de uma palavra (como VERMELHO) entra em conflito com a cor real da sua fonte (por exemplo, verde). Resolver essa discrepância obriga o córtex pré-frontal dorsolateral e o córtex cingulado anterior a inibir a resposta automática de leitura, priorizando a identificação da cor e fortalecendo a atenção seletiva."
      }
    },
    {
      "@type": "Question",
      "name": "Como a tabela de Schulte ajuda na velocidade de leitura e visão periférica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A tabela de Schulte é uma matriz de números desordenados desenvolvida para aferir a atenção e expandir o campo de visão periférica. Ao fixar o olhar no centro da grade e localizar os números sequencialmente sem desviar os olhos para cada dígito, o cérebro aprende a explorar o campo visual lateral sem movimentos sacádicos desnecessários, habilidade vital para a leitura dinâmica, pilotos e identificação rápida de alvos em telas complexas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a frequência e duração ideal de prática recomendada pelos especialistas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estudos em neuropsicologia comprovam que treinos curtos e regulares são muito mais eficazes do que maratonas esporádicas. O protocolo sugerido é de 15 a 20 minutos por dia, de 3 a 5 dias por semana. Praticar alguns minutos antes do trabalho intelectual intenso ou de partidas ranqueadas em jogos competitivos aquece os circuitos neurais de vigilância sem esgotar as reservas de energia cognitiva."
      }
    },
    {
      "@type": "Question",
      "name": "O treinamento mental e cognitivo online melhora o desempenho em esports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, comprovadamente. Em esportes eletrônicos de alto nível, os jogadores precisam analisar o minimapa com visão periférica, predizer movimentos adversários e tomar decisões táticas em frações de segundo. Desenvolver o controle inibitório e a velocidade de processamento evita erros por impulso e visão em túnel, resultando em reações mais rápidas e consistentes sob grande pressão competitiva."
      }
    },
    {
      "@type": "Question",
      "name": "Os exercícios cognitivos são recomendados para crianças, adultos e idosos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a arquitetura da SkillDrills é universal e adaptativa para todas as idades com base em métricas objetivas de milissegundos e taxa de acerto. Em jovens e adultos, desenvolve agilidade mental e foco produtivo; em pessoas com déficit de atenção ou hiperatividade (TDAH), aprimora o foco seletivo; e em pessoas idosas, estimula a reserva cognitiva, auxiliando na preservação da autonomia cerebral."
      }
    },
    {
      "@type": "Question",
      "name": "É necessária alguma configuração técnica ou equipamento especial para treinar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Todos os testes da SkillDrills são 100% baseados na web, funcionando diretamente no navegador a 60-120 FPS sem nenhum download ou cadastro. Para garantir máxima acurácia nas medições de tempo de reação, recomenda-se desativar o aprimoramento de precisão do ponteiro no sistema operacional, utilizar um mouse ou tela de boa resposta e fechar abas pesadas em segundo plano."
      }
    }
  ]
};

export default function LocalizedCognitiveHubClientPage() {
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
      <CognitiveHubClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

