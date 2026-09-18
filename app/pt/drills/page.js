import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: 'Treino de Mira: 82 Exercícios Grátis | SkillDrills',
  description: '82 treinos online gratuitos em 8 categorias: mira FPS para shooters, teste de reflexo, memória, CPS e acuidade visual diretamente no navegador.',
  keywords: [
    'aim trainer gratis',
    'treino de mira online',
    'teste de reflexo online',
    'jogos de treino cerebral gratis',
    'teste de memoria online',
    'rastreamento visual exercicios',
    'teste de cps cliques por segundo',
    'treinar mira valorant',
    'flick aim treino',
    'tracking aim exercicios',
    'teste de stroop online gratis',
    'tabela de schulte online',
    'memoria de trabalho exercicios',
    'visao periferica treino',
    'coordenacao motora fina teste'
  ],
  openGraph: {
    title: 'Treino de Mira: 82 Exercícios Grátis | SkillDrills',
    description: '82 treinos online gratuitos em 8 categorias: mira FPS para shooters, teste de reflexo, memória, CPS e acuidade visual diretamente no navegador.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Catálogo Completo de 82 Exercícios SkillDrills',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Mira: 82 Exercícios Grátis | SkillDrills',
    description: '82 treinos online para mira FPS, velocidade de reação, cognição e acuidade visual.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills',
    languages: getAlternateLanguages('/pt/drills'),
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
      "name": "Todos os Exercícios",
      "item": "https://skilldrills.online/pt/drills"
    }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Catálogo Completo de 82 Exercícios de Desempenho SkillDrills",
  "description": "Coleção científica de 82 treinos interativos para mira FPS, velocidade de reação, rastreamento visual, cognição, memória, motricidade fina e percepção visual.",
  "url": "https://skilldrills.online/pt/drills",
  "inLanguage": "pt",
  "hasPart": DRILLS.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'pt', drill.name);
    const itemUrl = drill.href === '/drills/motor/keyboard-tester'
      ? 'https://skilldrills.online/pt/teste-de-teclado'
      : `https://skilldrills.online/pt${drill.href}`;
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": itemUrl,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requer JavaScript e suporte a HTML5 Canvas",
      "description": loc.tagline || drill.description,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      }
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quais são as bases neurobiológicas dos 82 exercícios do SkillDrills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O SkillDrills foi desenvolvido com base em modelos consolidados da neurociência motora e da psicologia cognitiva, como a Lei de Fitts (relação velocidade-precisão), a Lei de Hick (tempo de escolha sob múltiplos estímulos), a teoria de integração de características visuais e a plasticidade sináptica. Cada treino isola vias neurais e reflexos oculomotores específicos para promover adaptações consistentes."
      }
    },
    {
      "@type": "Question",
      "name": "Como o SkillDrills garante medição de latência sem atrasos no navegador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nossa arquitetura utiliza a API nativa performance.now(), permitindo registrar marcas temporais com resolução submilisegundo (precisão em microssegundos). Os ciclos de renderização gráfica em Canvas HTML5 operam via requestAnimationFrame com aceleração por hardware, combinados com a Pointer Lock API para captura de movimento bruto do mouse (raw input) livre de latência de fila."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o protocolo de treinamento diário recomendado para evolução consistente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se uma sessão estruturada de 15 a 20 minutos diários antes de partidas competitivas ou sessões de estudo: 5 minutos de aquecimento oculomotor (rastreamento contínuo de trajetórias), 10 minutos de precisão motora (flick shot ou controle micromotor) e 5 minutos de controle inibitório ou memória operacional. A consistência diária estimula a consolidação das sinapses motoras."
      }
    },
    {
      "@type": "Question",
      "name": "Como a mira treinada no SkillDrills é transferida para jogos como VALORANT, CS2 e Apex?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nossos módulos de tiro FPS condicionam os fundamentos biomotores centrais: frenagem balística do mouse (mouse braking), posicionamento de retículo (angle holding), rastreamento de alvos com strafes erráticos e microcorreções rápidas. Ao manter a sensibilidade e o DPI calibrados 1:1 com o mousepad, a memória muscular é transferida diretamente para as partidas."
      }
    },
    {
      "@type": "Question",
      "name": "Em que o SkillDrills se diferencia de jogos mentais casuais comuns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao contrário de passatempos casuais genéricos, o SkillDrills aplica tarefas laboratoriais padronizadas como N-Back dual, paradigma de Stroop, redes atencionais e matrizes de Schulte com métricas quantitativas precisas. Os usuários acessam percentis de rendimento e distribuições fisiológicas calibradas em relação a padrões globais de desempenho."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o impacto da taxa de atualização do monitor (Hz) nos testes de reflexo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Telas de 60 Hz atualizam a imagem a cada 16,6 ms, enquanto monitores de 144 Hz (6,9 ms) ou 240 Hz (4,1 ms) reduzem drasticamente o atraso de quadros e o desfoque de movimento. O SkillDrills sincroniza suas taxas de captura diretamente com a frequência nativa do display, permitindo extrair a precisão máxima de monitores gamer modernos."
      }
    },
    {
      "@type": "Question",
      "name": "É necessário fazer downloads ou cadastro para utilizar a plataforma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Todos os 82 treinos operam integralmente no navegador web, sem necessidade de baixar softwares, instalar extensões ou criar cadastros. O histórico de desempenho e os recordes são armazenados exclusivamente no armazenamento local privado do seu navegador, respeitando rigorosamente a sua privacidade."
      }
    },
    {
      "@type": "Question",
      "name": "Os exercícios podem ser realizados em celulares e tablets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Treinos de memória, raciocínio lógico, reação tátil e busca visual funcionam com excelente fluidez em telas sensíveis ao toque de celulares e tablets. No entanto, para exercícios de mira FPS competitiva e motricidade fina do cursor, é fundamental utilizar um computador desktop com mouse físico e espaço estável para garantir validade biomecânica."
      }
    }
  ]
};

export default function LocalizedDrillsDirectoryPage() {
  const faqs = faqSchema.mainEntity.map((item) => ({
    q: item.name,
    a: item.acceptedAnswer.text,
  }));

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
      <DrillsDirectoryClient faqs={faqs} />
    </>
  );
}

