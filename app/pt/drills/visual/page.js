import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: 'Treino Visual & Teste de Visão Online | SkillDrills',
  description: 'Treino visual online: 9 exercícios científicos de acuidade visual dinâmica, percepção de profundidade, rastreamento ocular e velocidade de reação.',
  keywords: [
    'teste de visao online gratis', 'exercicios de ginastica ocular', 'teste de acuidade visual dinamica',
    'percepcao de profundidade teste', 'teste de visao estereoscopica', 'tempo de reacao visual online',
    'teste de reflexo de luz', 'rastreamento ocular continuo', 'movimentos oculares sacadicos',
    'busca visual atencao seletiva', 'campo visual util treinamento', 'exercicios para fadiga ocular tela',
    'discriminacao temporal visual', 'rastreamento de multiplos objetos mot', 'treinamento de visao esportiva'
  ],
  openGraph: {
    title: 'Treino Visual & Teste de Visão Online | SkillDrills',
    description: 'Treino visual online: 9 exercícios científicos de acuidade visual dinâmica, percepção de profundidade, rastreamento ocular e velocidade de reação.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/visual',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Treinamento de Visão e Acuidade Visual no SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino Visual & Teste de Visão Online | SkillDrills',
    description: '9 exercícios científicos de acuidade visual dinâmica, percepção de profundidade, rastreamento ocular e velocidade de reação.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual',
    languages: getAlternateLanguages('/pt/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Exercícios de Desempenho", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepção Visual & Profundidade", "item": "https://skilldrills.online/pt/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Treinamento de Percepção Visual & Profundidade (9 Exercícios)",
  "url": "https://skilldrills.online/pt/drills/visual",
  "description": "9 exercícios interativos de acuidade visual dinâmica, visão estereoscópica, perseguição ocular suave, busca visual e reflexo luminoso.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
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
      "name": "Como o treinamento da acuidade visual dinâmica (AVD) melhora o desempenho esportivo e nos eSports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao contrário da acuidade estática na tabela de Snellen, a acuidade visual dinâmica avalia a capacidade da fóvea central de manter imagens retinianas nítidas de objetos em movimento rápido. Rastrear trajetórias imprevisíveis fortalece os seis músculos extraoculares e estimula o córtex visual primário, diminuindo a latência de decisão motora em esportes coletivos, artes marciais e jogos de tiro em primeira pessoa."
      }
    },
    {
      "@type": "Question",
      "name": "O que avalia o teste de percepção de profundidade baseado no princípio das três hastes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Este teste mensura a estereoacuidade por meio da disparidade binocular — a sutil discrepância geométrica projetada na retina de cada olho. Identificar o momento exato em que objetos móveis se alinham no mesmo plano espacial é essencial para o cálculo preciso de distância de frenagem no trânsito e para a precisão de interceptação no futebol, tênis e automobilismo."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o rastreamento de múltiplos objetos (MOT) expande a visão periférica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O protocolo MOT recruta a atenção visuoespacial dividida no córtex parietal posterior e a memória de trabalho visual. Fixar a visão central enquanto se rastreia simultaneamente alvos circundantes amplia o Campo Visual Útil (UFOV), permitindo ao cérebro processar perigos e oportunidades em áreas periféricas sob pressão temporal intensa."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a diferença funcional entre a perseguição ocular suave (Smooth Pursuit) e os movimentos sacádicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A perseguição contínua (Smooth Pursuit) permite que os olhos deslizem suavemente acompanhando a trajetória contínua de um objeto sem perda de nitidez fóvea. Já as sacadas são saltos balísticos rápidos durante os quais ocorre supressão sacádica momentânea. Treinar perseguição ocular reduz a dependência de sacadas corretivas e previne o desfoque visual em situações de alta velocidade."
      }
    },
    {
      "@type": "Question",
      "name": "Como o teste de reação à luz isola a velocidade reflexa pura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diferente de testes cognitivos que exigem escolha ou resolução mental, o teste de reação à luz foca na via reflexa visuomotora primária: quantifica estritamente o intervalo entre a fototransdução retiniana do clarão estroboscópico, a transmissão pelos colículos superiores e a deflagração da resposta motora digital em milissegundos."
      }
    },
    {
      "@type": "Question",
      "name": "Quais circuitos neurais são condicionados pelos exercícios de busca visual em matrizes densas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tarefas de busca visual em meio a distratores rotacionados ativam o córtex visual associativo (V4) e os mecanismos de controle inibitório no córtex pré-frontal dorsolateral. Essa prática ensina o cérebro a filtrar ruídos ambientais caóticos e a isolar padrões geométricos relevantes com rapidez máxima."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a frequência e duração ideal para sessões de condicionamento visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se realizar sessões curtas de 15 a 20 minutos de alta intensidade e concentração, de 3 a 5 vezes por semana. Os músculos ciliares e oculomotores fatigam rapidamente após 20 a 25 minutos de esforço ininterrupto em telas, o que compromete a plasticidade neural. Sessões breves e frequentes produzem adaptações celulares consistentes sem estresse ocular."
      }
    },
    {
      "@type": "Question",
      "name": "Os exercícios de treino visual online substituem consultas regulares com oftalmologista?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Nossos testes e exercícios interativos são ferramentas de aprimoramento sensoriomotor e agilidade visual para atletas, gamers e profissionais, não constituindo exames médicos de refração, diagnóstico clínico de patologias ou avaliação da saúde do fundo de olho, os quais exigem acompanhamento com médico oftalmologista credenciado."
      }
    }
  ]
};

export default function VisualDrillsPage() {
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
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
