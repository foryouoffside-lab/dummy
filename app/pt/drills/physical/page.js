import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const physicalDrills = DRILLS.filter((d) => d.category === 'physical');

export const metadata = {
  title: 'Treino de Agilidade & Teste de Reflexos | SkillDrills',
  description: 'Treino de agilidade e reflexos online: 11 exercícios científicos para tempo de reação, equilíbrio, coordenação motora, esquiva e velocidade de pés.',
  keywords: [
    'teste de reflexo online gratis', 'exercicios de coordenacao motora', 'escada de agilidade exercicios',
    'teste de equilibrio corporal online', 'jogo de esquiva desviar do mouse', 'treino de visao periferica',
    'teste go no go impulsividade', 'teste da regua tempo de reacao', 'como melhorar a velocidade de reacao',
    'exercicios de agilidade e reflexos', 'velocidade de pes no futebol', 'movimento bilateral cruzando a linha media',
    'controle postural e estabilidade motora', 'jogo de reflexo e agilidade mental', 'exercicios pliometricos tempo de contato'
  ],
  openGraph: {
    title: 'Treino de Agilidade & Teste de Reflexos | SkillDrills',
    description: 'Treino de agilidade e reflexos online: 11 exercícios científicos para tempo de reação, equilíbrio, coordenação motora, esquiva e velocidade de pés.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/physical',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Treino de Agilidade e Reflexos Físicos no SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Agilidade & Teste de Reflexos | SkillDrills',
    description: '11 exercícios científicos de agilidade, equilíbrio, coordenação motora e reflexos rápidos gratuitos no navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical',
    languages: getAlternateLanguages('/pt/drills/physical'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos de Performance", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Reflexos Físicos & Agilidade", "item": "https://skilldrills.online/pt/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Treino de Agilidade & Testes de Reflexos (11 Exercícios)",
  "url": "https://skilldrills.online/pt/drills/physical",
  "description": "11 exercícios interativos para tempo de reação, equilíbrio postural, coordenação olho-mão, escada de agilidade e esquiva ágil.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": physicalDrills.map((drill) => {
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
      "name": "Como o treino digital de escada de agilidade melhora os apoios dos pés e a agilidade esportiva real?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os exercícios de escada de agilidade na tela desenvolvem o reconhecimento veloz de estímulos visuais e o ritmo de cadência no córtex motor. Ao exigir respostas em frações de milissegundos a pistas visuais em constante mudança, o cérebro otimiza a velocidade de disparo neuronal, reduzindo o tempo de contato com o solo e acelerando as mudanças de direção (COD) no futebol, basquete e tênis."
      }
    },
    {
      "@type": "Question",
      "name": "O que é uma cadeia de reação com inibição de impulso e por que ela evita antecipações falsas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste de parada de impulso (Go/No-Go) afere a capacidade do sistema neuromotor de frear imediatamente uma ação já iniciada diante de um estímulo falso ou drible adversário. Fortalecer as vias inibitórias nos gânglios da base e no córtex pré-frontal permite conter a inércia em menos de 150 ms, neutralizando fintas sem perder o equilíbrio defensivo."
      }
    },
    {
      "@type": "Question",
      "name": "De que forma o desafio virtual de estabilidade contra forças dinâmicas fortalece o equilíbrio físico?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O equilíbrio postural dinâmico depende da integração sensorial contínua entre a fixação visual, o labirinto no ouvido interno (sistema vestibular) e os proprioceptores musculares. Resistir a vetores dinâmicos de arrasto e força na tela força o sistema nervoso central a recrutar microajustes dos músculos estabilizadores do tronco e ombros para preservar o centro de gravidade contra perturbações externas."
      }
    },
    {
      "@type": "Question",
      "name": "Por que cruzar a linha média do corpo (movimento bilateral) é essencial para a coordenação motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover-se cruzando a linha média visual e corporal ativa comunicações neurais de alta intensidade através do corpo caloso entre ambos os hemisférios cerebrais. Os exercícios de interceptação bilateral sincronizam as cadeias cinéticas cruzadas, desenvolvendo agilidade multidirecional, potência de rotação e percepção espacial tridimensional em campo."
      }
    },
    {
      "@type": "Question",
      "name": "Em quanto tempo os treinos de esquiva dinâmica em grade reduzem o tempo de reação de fuga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diferente de testes estáticos previsíveis, zonas dinâmicas de perigo exigem atualização constante do mapa espacial no lobo parietal. Essa prática reduz o tempo de reação de escolha (Choice Reaction Time) sob pressão de uma média inicial de 280 ms para menos de 190 ms, garantindo reações instintivas de evasão corporal."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o papel da visão periférica (campo visual útil UFOV) na prevenção de colisões e lesões?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O monitoramento ativo de ameaças periféricas expande o campo visual funcional. Estímulos na borda ativam a via magnocelular, que desencadeia reflexos motores de esquiva protetora antes mesmo do foco foveal consciente, diminuindo significativamente colisões e entradas inesperadas em esportes de contato e trânsito."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a frequência ideal de treino para agilidade neuromotora e velocidade de reflexos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O protocolo científico recomendado consiste em sessões de 15 a 25 minutos em alta intensidade, de 3 a 5 vezes por semana. Como a coordenação motora fina e os reflexos exigem alta demanda sináptica, treinos superiores a 30 minutos geram fadiga do sistema nervoso central (SNC), degradando a precisão mecânica."
      }
    },
    {
      "@type": "Question",
      "name": "Os testes e exercícios no navegador substituem o treinamento atlético no campo ou na academia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não, eles atuam de maneira complementar. Enquanto o treino físico fortalece músculos, tendões e pliometria, os treinos digitais aceleram o processamento perceptivo-cognitivo do movimento. Ao encurtar a fase de identificação visual do perigo e a tomada de decisão motora, todo o potencial atlético é transferido ao campo sem atrasos neuromusculares."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
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
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
