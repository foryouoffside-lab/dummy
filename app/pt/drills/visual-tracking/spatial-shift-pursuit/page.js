import SpatialShiftPursuitClient from '@/app/drills/visual-tracking/spatial-shift-pursuit/SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento com Mudança Espacial – SkillDrills",
  description: "Treine o controle oculomotor adaptativo sob mudancas bruscas no referencial espacial. Aprimore o remapeamento de coordenadas sem cadastro.",
  keywords: [
    "treino de rastreamento com mudanca espacial",
    "remapeamento de coordenadas oculares",
    "exercicio ocular mudanca de referencia",
    "estabilidade visual rotacao espacial",
    "recuperacao sacadica de alvo",
    "controle oculomotor adaptativo",
    "transformacao de referencia visual",
    "treino de foco sob tremor de tela",
    "agilidade visual de transicao",
    "exercicio de seguimento adaptativo",
    "precisao foveal em mudancas bruscas",
    "treino de mira em movimento rapido"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/spatial-shift-pursuit'),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rastreamento com Mudança Espacial – SkillDrills",
    description: "Treine o controle oculomotor adaptativo sob mudancas bruscas no referencial espacial. Aprimore o remapeamento de coordenadas sem cadastro.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/spatial-shift-pursuit",
    siteName: 'SkillDrills',
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rastreamento com Mudança Espacial – SkillDrills",
    description: "Treine o controle oculomotor adaptativo sob mudancas bruscas no referencial espacial. Aprimore o remapeamento de coordenadas sem cadastro.",
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
      "name": "Rastreamento com Mudança Espacial",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/spatial-shift-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rastreamento com Mudança Espacial",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Aplicacao de treino visual adaptativo que condiciona o cortex parietal posterior na transformacao de coordenadas espaciais sob deslocamentos dinamicos."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Exercício de Rastreamento com Mudança Espacial",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/spatial-shift-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Spatial Shift Pursuit",
  "description": "Desafio de agilidade visual onde o praticante sustenta o enquadramento ocular foveal perante rotacoes e translacoes repentinas do referencial.",
  "genre": ["Treino Visual", "Seguimento Ocular", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar o Rastreamento sob Mudança Espacial",
  "description": "Protocolo metódico para aprimorar o remapeamento de coordenadas e a rápida re-aquisição foveal após desvios espaciais bruscos.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Estabeleça a Fixação Inicial",
      "text": "Posicione-se a 50-70 cm do ecra. Inicie o seguimento continuo mantendo o alvo no centro visual."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identifique o Deslocamento Global",
      "text": "Quando o referencial girar ou transladar bruscamente, processe o vetor de deslocamento global em vez de procurar cegamente."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute a Sacada Balística de Recuperação",
      "text": "Dispare um salto ocular direto e preciso para as novas coordenadas calculadas sem correções intermédias."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Retome o Seguimento Suave sem Interrupção",
      "text": "Integre a desaceleração da sacada imediatamente na velocidade de seguimento da nova trajetória para manter ganho unitário."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que e o exercicio Spatial Shift Pursuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Spatial Shift Pursuit treina a adaptabilidade oculomotora forcando os olhos a compensar mudancas e rotacoes subitas no referencial espacial, aprimorando a velocidade de re-aquisicao do alvo (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Como mudancas bruscas de referencial afetam a visao?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando o espaco visual sofre uma translacao ou rotacao rapida, o mapa retinotopico desorganiza-se. O cerebro precisa recalcular um novo vetor motor para re-estabilizar o olhar (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o papel do cortex parietal posterior (PPC) neste exercicio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O PPC combina sinais da retina com a informacao motora de eferencia para converter coordenadas retinotopicas em referencias centradas na cabeca e no espaco real (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "O que e a sacada de recuperacao balistica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando o alvo salta para alem do campo foveal, os musculos oculares disparam uma sacada ultrarrapida de ate 500 graus por segundo para alcancar a nova posicao antes de retomar o seguimento suave (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Como este treino ajuda na mira de jogos FPS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em tiroteios intensos sob recuo de armas, explosões com tremor de tela ou giros bruscos de camara, o exercicio reduz o tempo necessario para reenquadrar inimigos em fuga."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o beneficio para modalidades desportivas dinamicas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em desportos como futebol, basquetebol ou automobilismo, o atleta muda de direcao rapidamente enquanto a bola ou adversarios se deslocam em trajetorias cruzadas."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona a transicao da sacada para o seguimento suave?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conhecida como handshake oculomotor, o sistema funde a travagem do salto sacadico diretamente com a velocidade angular do alvo para evitar interrupcoes visuais."
      }
    },
    {
      "@type": "Question",
      "name": "Quantas sessoes de treino sao recomendadas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se realizar de 4 a 6 series de 60 segundos por dia (cerca de 5 a 8 minutos). Sessoes breves de alta intensidade maximizam a plasticidade cerebelar sem fatiga excessiva."
      }
    },
    {
      "@type": "Question",
      "name": "Este exercicio e gratuito e acessivel sem registo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills oferece o treino totalmente gratuito no navegador, sem necessidade de transferencias ou criacao de contas."
      }
    },
    {
      "@type": "Question",
      "name": "A taxa de atualizacao do ecra tem impacto no treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores com taxas de 144Hz ou superiores diminuem a latencia de exibicao e a pixelizacao do movimento, proporcionando pistas visuais continuas para os centros visuais motores (Woods et al., 2015)."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Científicos do Rastreamento com Mudança Espacial e Adaptação Ocular",
  intro: [
    "No ambiente natural e desportivo, o rastreamento visual quase nunca ocorre sobre cenários estáticos e uniformes. Seja durante sprints em piso irregular, manobras automotivas em alta velocidade ou combates em jogos de tiro em primeira pessoa marcados por tremores de ecrã e viragens bruscas de câmara, o referencial espacial do observador pode transladar-se ou rodar instantaneamente (Krauzlis, 2004; Robinson, 1965). Manter um alvo crítico bloqueado na fóvea central nestas condições adversas exige extrema agilidade adaptativa.",
    "Investigações neurofisiológicas de Findlay & Gilchrist (1999) e Kahlon & Lisberger (1996) revelaram que os estímulos luminosos são codificados primeiramente em eixos oculocêntricos (retinotópicos). No momento em que todo o cenário sofre um desvio espacial, essa codificação colapsa. O córtex parietal posterior (PPC) intervém calculando a fusão de sinais visuais e cópias eferentes motoras para transladar a informação para coordenadas estáveis centradas na cabeça e no espaço.",
    "Com base nessa nova representação topográfica, o sistema nervoso central emite uma sequência motora sincronizada: primeiro, uma sacada balística de alta velocidade fecha a distância para a nova localização do alvo. No instante da aterragem, o sistema funde a desaceleração sacádica diretamente na velocidade do novo percurso linear, sustentando o ganho foveal sem hesitações (Rashbass, 1961)."
  ],
  benchmarks: {
    title: "Tabela de Classificação em Mudança Espacial e Recuperação de Coordenadas",
    headers: ["Nível de Desempenho", "Tempo de Re-Centragem (ms)", "Precisão de Rastreamento (%)", "Estabilidade Pós-Sacádica", "Perfil Adaptativo"],
    rows: [
      ["Élite (Esports / Pilotos)", "< 220 ms", "> 95%", "> 96% (Fixação Imediata)", "Remapeamento parietal perfeito e transição instantânea de sacada para seguimento contínuo."],
      ["Avançado (Competitivo)", "220 – 280 ms", "88% – 94%", "90% – 95%", "Elevada flexibilidade espacial com rápida recuperação do alvo e desvio mínimo."],
      ["Competente (Adulto Saudável)", "281 – 360 ms", "78% – 87%", "80% – 89%", "Recuperação consistente com ligeira hesitação em rotações simultâneas."],
      ["Em Desenvolvimento (Latência)", "361 – 450 ms", "65% – 77%", "68% – 79%", "Desorientação visível em mudanças bruscas exigindo múltiplas sacadas corretivas."],
      ["Iniciante (Ajuste Motor)", "> 450 ms", "< 65%", "< 68%", "Perda do enquadramento referencial e procura ocular reativa."]
    ],
    note: "※ Medições efetuadas em ecrãs 1080p a uma distância de 50–70 cm com velocidades de 1.0x a 1.5x e desvios aleatórios de referencial. Avaliado pelo tempo de re-centragem e bloqueio pós-sacádico."
  },
  techniques: {
    title: "Quatro Estratégias Fundamentais para o Rastreamento com Mudança Espacial",
    items: [
      {
        name: "Remapeamento Parietal de Coordenadas",
        desc: "No momento do salto espacial, não procure apenas o ponto isolado. Capte o vetor global de deslocamento de todo o enquadramento para que o córtex atualize a matriz espacial instantaneamente.",
        tips: "Concentre-se em perceber para onde todo o ambiente saltou."
      },
      {
        name: "Recentralização Sacádica Balística",
        desc: "Assim que as novas coordenadas forem identificadas, dispare um salto ocular firme num único tempo. A hesitação gera sacadas fracionadas que atrasam a fixação.",
        tips: "Direcione o centro do olhar com a rapidez e firmeza de um chicote."
      },
      {
        name: "Transição Fluida Pós-Sacádica",
        desc: "Não imobilize os músculos oculares ao tocar nas novas coordenadas. Entre imediatamente no sentido de deslocamento do alvo para prosseguir a perseguição.",
        tips: "Aterre na trajetória com a fluidez de um patinador a entrar na curva."
      },
      {
        name: "Ancoragem Rotacional Visual",
        desc: "Quando o salto incluir rotação angular, mantenha a orientação fixando mentalmente o centro do ecrã como eixo de gravidade visual estável.",
        tips: "Mantenha o centro do monitor como bússola neutra permanente."
      }
    ]
  },
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Exercício de Seguimento Ocular Lento (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento em Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Seguimento com Evasão Dinâmica (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Supressão de Imagem Fantasma (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Exercício Ocular em Oito (Infinity Pursuit)" },
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Rastreamento em Onda Senoidal (Sine Wave)" }
  ]
};

export default function SpatialShiftPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SpatialShiftPursuitClient copy={{ title: "Rastreamento com Mudança Espacial", subtitle: "Treino Oculomotor Adaptativo" }} />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/spatial-shift-pursuit" />
      </div>
    </>
  );
}
