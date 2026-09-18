import StaircaseStepClient from '@/app/drills/visual-tracking/staircase-step/StaircaseStepClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento Ocular Vertical – SkillDrills",
  description: "Condicione o seguimento ocular vertical e sacadas de elevacao ao longo de degraus angulares. Treino oculomotor no mesencefalo gratuito online.",
  keywords: [
    "treino de rastreamento ocular vertical",
    "exercicio ocular em degraus escada",
    "movimento ocular vertical sacadico",
    "controle de mira vertical reflexos",
    "ganho de velocidade ocular vertical",
    "estimulacao do mesencefalo rimlf",
    "estabilidade visual de elevacao",
    "treino de mira vertical fps",
    "exercicio de seguimento em ziguezague",
    "foco ocular em trajetorias angulares",
    "agilidade ocular para esportes aereos",
    "treino visual para controle de recuo"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/staircase-step",
    languages: getAlternateLanguages('/drills/visual-tracking/staircase-step'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rastreamento Ocular Vertical – SkillDrills",
    description: "Condicione o seguimento ocular vertical e sacadas de elevacao ao longo de degraus angulares. Treino oculomotor no mesencefalo gratuito online.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/staircase-step",
    siteName: 'SkillDrills',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rastreamento Ocular Vertical – SkillDrills",
    description: "Condicione o seguimento ocular vertical e sacadas de elevacao ao longo de degraus angulares. Treino oculomotor no mesencefalo gratuito online.",
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
      "name": "Exercícios",
      "item": "https://skilldrills.online/pt/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Rastreamento Visual",
      "item": "https://skilldrills.online/pt/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Rastreamento em Degraus",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/staircase-step"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rastreamento Ocular Vertical em Degraus",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Treino oculomotor vertical que estimula as vias do mesencefalo (riMLF) para otimizar o ganho de seguimento vertical e a precisao de sacadas angulares."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercício de Rastreamento em Degraus",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/staircase-step",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Staircase Step",
  "description": "Exercicio de agilidade ocular vertical onde o praticante foveia alvos que percorrem rampas e degraus ortogonais.",
  "genre": ["Treino Visual", "Seguimento Ocular Vertical", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar o Rastreamento Vertical em Degraus",
  "description": "Guia metódico para aprimorar o seguimento ocular vertical e as sacadas de elevação sem desvios cervicais.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Mantenha a Cabeça Imóvel",
      "text": "Sente-se a 50-70 cm do ecra e apoie o queixo firmemente para isolar os musculos oculares verticais de compensacoes cervicais."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Acompanhe as Rampas Inclinadas",
      "text": "Siga o alvo com velocidade continua ao longo das secoes diagonais mantendo a nitidez foveal constante."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Antecipe as Arestas dos Degraus",
      "text": "Reduza suavemente a inercia ocular antes da viragem em angulo reto para prevenir desvios alem do vertice."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Dispare Sacadas Rápidas de Elevação",
      "text": "Execute um salto sacadico vertical instantaneo para fixar imediatamente o inicio do patamar seguinte."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que e o exercicio Staircase Step?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Staircase Step exercita o seguimento ocular vertical e sacadas de elevacao conduzindo o olhar ao longo de trajetorias em degraus ortogonais, fortalecendo circuitos do mesencefalo (Büttner-Ennever & Horn, 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o rastreamento vertical e mais dificil que o horizontal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O controle vertical depende de nucleos especificos do tronco cerebral (riMLF e Cajal) que apresentam naturalmente menor ganho de velocidade, maior atraso de fase e assimetrias ascendentes (Rottach et al., 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a funcao do nucleo riMLF no movimento ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O nucleo intersticial rostral do fasciculo longitudinal medial (riMLF) contem neuronios que disparam comandos motores de alta velocidade para os musculos retos superior e inferior."
      }
    },
    {
      "@type": "Question",
      "name": "Como este treino auxilia em jogos de tiro (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos como Apex Legends e Overwatch, os adversarios executam saltos, subidas e deslizes verticais frequentes. O treino elimina oscilacoes da mira em transicoes de altura."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o beneficio para modalidades como voleibol e tenis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em cortes altos no voleibol ou smashes no tenis, a bola descreve arcos verticais rapidos. O ganho ocular vertical aprimora a nocao espacial aerea e o tempo de contacto."
      }
    },
    {
      "@type": "Question",
      "name": "Por que e crucial nao mexer a cabeca durante o treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inclinar o pescoco substitui o trabalho dos musculos oculares por movimentos cervicais, anulando o estimulo direto nas vias neuronais verticais do tronco encefalico (Leigh & Zee, 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o efeito de ocultar a linha guia (Hide Line)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sem o desenho dos degraus, o cerebro e forçado a prever a localizacao do proximo vertice exclusivamente atraves de memoria de trabalho cinetica."
      }
    },
    {
      "@type": "Question",
      "name": "A frequencia de atualizacao do ecra tem impacto no treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ecrãs de 144Hz ou superiores desenham as mudancas de angulo reto com nitidez impecavel, permitindo disparar sacadas de correcao sem artefactos de arrasto (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Este treino e gratuito e de livre acesso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills disponibiliza esta ferramenta inteiramente gratis no navegador web, sem necessidade de registos ou descargas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a frequencia de treino recomendada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessoes curtas de 2 a 3 series de 45 a 60 segundos por dia (cerca de 3 a 5 minutos). Os musculos oculares verticais cansam-se mais rapidamente, pelo que sessoes breves sao ideais."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Científicos do Rastreamento Vertical e Controlo Oculomotor",
  intro: [
    "O aparelho oculomotor humano apoia-se em circuitos neuroanatomicos estritamente diferenciados para movimentos horizontais e verticais. Enquanto os deslocamentos laterais sao mediados pela formacao reticular pontina paramediana (PPRF), a motricidade vertical encontra-se sob tutela exclusiva de nucleos especializados do mesencefalo – destacando-se o nucleo intersticial rostral do fasciculo longitudinal medial (riMLF) e o nucleo de Cajal (Büttner-Ennever & Horn, 1997).",
    "Ensaios psicofisicos (Rottach et al., 1996; Ke et al., 2013) demonstram que o seguimento ocular vertical exibe intrinsecamente um ganho de velocidade menor, latencias de resposta mais longas e atrasos de fase mais acentuados do que o seguimento horizontal. Adicionalmente, verifica-se uma assimetria funcional marcante: o movimento de elevacao ocular degrada-se com maior rapidez a velocidades elevadas, desencadeando sacadas de compensacao prematuras.",
    "Os habitos digitais cotidianos estimulam predominantemente o eixo visual horizontal, deixando as conexoes neurais verticais em relativo subtreino. O exercicio Staircase Step desafia essa assimetria guiando o olhar ao longo de percursos em degraus ziguezagueantes, combinando seguimento continuo em planos inclinados com sacadas de correcao imediata nas quinas de transicao (Collewijn & Tamminga, 1984; Lisberger, 2010)."
  ],
  benchmarks: {
    title: "Tabela de Classificação em Seguimento Vertical e Sacadas em Degraus",
    headers: ["Nível de Desempenho", "Velocidade do Alvo", "Precisão nas Quinas dos Degraus", "Ganho Vertical Estimado", "Percentil Populacional"],
    rows: [
      ["Élite (Esports / Pilotos)", "3.5x – 5.0x+", "Fixação angular sem desvio nos degraus", "0.92 – 0.98 (sincronização instantânea)", "Top 1.5%"],
      ["Avançado (Competitivo)", "2.5x – 3.5x", "Foveação rápida por micro-sacada única", "0.85 – 0.92 (foco altamente estável)", "Top 8%"],
      ["Competente (Adulto Saudável)", "1.8x – 2.5x", "Seguimento consistente nas rampas; ligeira hesitação nos vértices", "0.75 – 0.85 (controlo sólido)", "Top 25%"],
      ["Em Desenvolvimento (Latência)", "1.2x – 1.8x", "Atraso nas subidas; compensação por inclinação do pescoço", "0.60 – 0.75 (sacadas corretivas frequentes)", "45% Intermédios"],
      ["Iniciante (Ajuste Motor)", "0.5x – 1.2x", "Perda do alvo nos cantos; a cabeça acompanha o movimento", "< 0.60 (saltos sacádicos desordenados)", "Nível Inicial"]
    ],
    note: "※ Com base nas metricas de latencia vertical de Rottach et al. (1996) e dinamica neural do riMLF (Büttner-Ennever & Horn, 1997) em ecrãs 1080p a 50–70 cm."
  },
  techniques: {
    title: "Quatro Técnicas Fundamentais para o Rastreamento em Degraus",
    items: [
      {
        name: "Imobilização Cefálica Rigorosa",
        desc: "Bloqueie por completo qualquer oscilacao do pescoco ou queixo durante as subidas e descidas, forçando os musculos retos do olho a suportar toda a carga motora.",
        tips: "Mantenha a sensacao de queixo apoiado para evitar que a cabeca acompanhe a inclinacao."
      },
      {
        name: "Travagem Antecipatória nos Cantos",
        desc: "Ao aproximar-se da mudanca de plano em angulo reto, reduza proativamente o impulso ocular para evitar ultrapassar o vertice.",
        tips: "Trate a quina do degrau como um rebordo onde a velocidade abranda antes da curva."
      },
      {
        name: "Impulso de Elevação Vertical",
        desc: "Uma vez que o ganho fisiologico vertical e naturalmente inferior, aplique conscientemente uma forca motora acrescida ao subir os degraus.",
        tips: "Dê um impulso muscular ascendente intencional para vencer a latencia natural da elevacao."
      },
      {
        name: "Recuperação Sacádica Pós-Degrau",
        desc: "Nao hesite sobre o vertice do degrau. Reengaje o foco foveal instantaneamente no novo percurso para manter a velocidade de seguimento uniforme.",
        tips: "Pense no olhar como um alpinista agil saltando de forma limpa entre degraus."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('buttner1997', 'rottach1996', 'ke2013', 'collewijn1984', 'lisberger2010', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Exercício de Seguimento Ocular Lento (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento em Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimento com Evasão Dinâmica (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supressão de Imagem Fantasma (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Exercício Ocular em Oito (Infinity Pursuit)" },
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Rastreamento em Onda Senoidal (Sine Wave)" }
  ]
};

export default function StaircaseStepPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <StaircaseStepClient copy={{ title: "Trajetória em Degraus", subtitle: "Exercício Ocular Vertical e Sacádico" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/staircase-step" />
      </div>
    </>
  );
}
