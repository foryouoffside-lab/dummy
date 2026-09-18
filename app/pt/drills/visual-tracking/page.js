import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: 'Rastreamento Visual & Acuidade Dinâmica | SkillDrills',
  description: 'Exercícios de rastreamento visual e acuidade dinâmica online grátis. 14 treinos científicos de perseguição ocular suave, sacadas e visão periférica.',
  keywords: [
    'exercicios de rastreamento visual', 'acuidade visual dinamica teste', 'treino de motilidade ocular',
    'movimentos sacadicos exercicios', 'rastreamento ocular suave smooth pursuit', 'exercicios de visao para gamers',
    'treino de mira tracking fps', 'estabilidade do olhar reflexo vestibulo ocular', 'visao periferica exercicios online',
    'ginastica ocular cansaco visual', 'predicao de trajetoria visual', 'exercicios ortopticos em casa',
    'treino de foco e reflexo visual', 'teste de visao dinamica gratis', 'jogos de rastreamento ocular online'
  ],
  openGraph: {
    title: 'Rastreamento Visual & Acuidade Dinâmica | SkillDrills',
    description: 'Exercícios de rastreamento visual e acuidade dinâmica online grátis. 14 treinos científicos de perseguição ocular suave, sacadas e visão periférica.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Exercícios de Rastreamento Visual e Acuidade Dinâmica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rastreamento Visual & Acuidade Dinâmica | SkillDrills',
    description: 'De perseguição suave a previsões balísticas: 14 exercícios científicos de motilidade ocular grátis.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/visual-tracking',
    languages: getAlternateLanguages('/pt/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Diretório de Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Rastreamento Visual e Ocular", "item": "https://skilldrills.online/pt/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Exercícios de Rastreamento Visual e Acuidade Dinâmica Grátis (14 Drills)",
  "url": "https://skilldrills.online/pt/drills/visual-tracking",
  "description": "14 treinos científicos de perseguição ocular contínua (Smooth Pursuit), ondas senoidais, antecipação balística e visão periférica.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'pt', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/pt${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual é a diferença fisiológica entre a perseguição ocular suave (Smooth Pursuit) e os movimentos sacádicos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A perseguição ocular suave (Smooth Pursuit Eye Movement) é um movimento contínuo e orgânico dos olhos para manter um objeto móvel estabilizado sobre a fóvea central da retina, onde a resolução óptica é máxima. Já as sacadas são disparos balísticos extremamente velozes (atingindo até 900 graus por segundo) entre dois pontos de fixação. Em esportes dinâmicos e tiroteios virtuais (FPS), o Smooth Pursuit garante a leitura nítida das trajetórias e desacelerações do alvo sem que a visão fique borrada."
      }
    },
    {
      "@type": "Question",
      "name": "Como o treinamento da acuidade visual dinâmica melhora a performance em esportes e jogos FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Possuir nitidez visual em repouso não assegura clareza durante movimentações em alta velocidade. O treino da acuidade visual dinâmica (DVA) calibra a coordenação dos seis músculos extraoculares, reduzindo o borrão de movimento retiniano e encurtando o atraso de processamento cortical em 50 a 80 milissegundos. No tênis ou futebol, isso amplia o tempo hábil para ler trajetórias de bola; em jogos de tiro, possibilita um tracking contínuo (mira colada) imbatível."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a perseguição visual preditiva (Predictive Pursuit) quando o alvo sofre oclusão temporária?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A perseguição preditiva é uma operação cerebral do cerebelo: quando o alvo se oculta temporariamente atrás de um obstáculo (oclusão estroboscópica), o cérebro extrapola a velocidade e a aceleração anteriores para estimar onde e quando ele reaparecerá. Ao condicionar esse reflexo, a linha de visão do jogador avança antes do próprio alvo, possibilitando disparos pré-alinhados certeiros no instante milimétrico da reemergência."
      }
    },
    {
      "@type": "Question",
      "name": "Por que ocorrem sacadas de recuperação (Catch-up Saccades) durante o tracking e como eliminá-las?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sacadas de recuperação ocorrem quando a velocidade ocular é inferior à velocidade do alvo (ganho de perseguição < 1,0). O olhar se atrasa e os olhos são forçados a realizar um sobressalto corretivo brusco, provocando oscilação no campo visual. A correção é alcançada iniciando por treinos de velocidade lenta constante (Constant Slow Pursuit) e arcos senoidais previsíveis, aumentando a velocidade progressivamente enquanto se relaxa a musculatura craniofacial."
      }
    },
    {
      "@type": "Question",
      "name": "Em que medida os exercícios de motilidade ocular auxiliam na terapia visual e pós-concussão cerebral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em ortóptica e neurotraumatologia esportiva, exercícios de perseguição lenta e fixação do olhar são indispensáveis na reabilitação da síndrome pós-concussional (PCS). O estímulo metódico ativa a neuroplasticidade no tronco encefálico e no cerebelo, reequilibrando a visão binocular e atenuando cefaleias, tonturas dinâmicas e desconfortos visuais induzidos por telas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o papel do reflexo vestíbulo-ocular (RVO) na estabilidade da mira durante movimentação corporal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O reflexo vestíbulo-ocular (RVO ou VOR) é o circuito neurológico que conecta o labirinto do ouvido interno aos músculos dos olhos. Diante de rotações cefálicas ou corporais, o RVO comanda os olhos na direção diametralmente oposta na exata velocidade do movimento, fixando o horizonte visual. Esse condicionamento assegura que mesmo durante manobras evasivas em alta intensidade, a retícula permaneça firme e estável sobre o alvo."
      }
    },
    {
      "@type": "Question",
      "name": "Quantos minutos por dia é recomendado treinar rastreamento visual para evitar fadiga dos olhos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A musculatura extraocular é altamente especializada e sujeita à fadiga por esforço repetitivo. A dosagem diária ideal é de 10 a 15 minutos por sessão, 3 a 5 vezes na semana. Para prevenir espasmos de acomodação e tensão ciliar, recomenda-se a regra '20-20-20': a cada 20 minutos de tela, relaxe a visão focando um ponto distante a mais de 6 metros (20 pés) por 20 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "Por que monitores com alta taxa de atualização (144Hz a 360Hz) são essenciais no treino de motilidade ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de 60Hz atualizam a cada 16,7 ms, fragmentando o movimento do alvo em saltos discretos com efeito fantasma (ghosting), o que força o cérebro a adotar sacadas compensatórias inadequadas. Telas de 144Hz a 360Hz comprimem o tempo de quadro para 2,8 ms, espelhando a continuidade física do mundo real e permitindo um aprendizado motor orgânico e genuíno das fibras oculares."
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
