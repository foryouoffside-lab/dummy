import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Estabilidade de Fixação Ocular – Ghosting | SkillDrills",
  description: "Treino gratuito de fixação foveal e supressão de rastros visuais: aprimore a nitidez dinâmica e estabilidade do olhar contra desfoque de movimento.",
  keywords: [
    "supressão de imagens residuais",
    "estabilidade de fixação ocular",
    "treino de foco foveal dinâmico",
    "exercício contra motion blur ocular",
    "motilidade ocular e desfoque visual",
    "rastreamento visual de alta estabilidade",
    "treinamento de microssacadas visuais",
    "teste de estabilização do olhar online",
    "ginástica ocular para gamers",
    "acuidade visual dinâmica esportiva",
    "supressão de rastros visuais",
    "exercício de visão nítida gratuito"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/ghosting-suppress-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Estabilidade de Fixação Ocular – Ghosting | SkillDrills",
    description: "Treino gratuito de fixação foveal e supressão de rastros visuais: aprimore a nitidez dinâmica e estabilidade do olhar contra desfoque de movimento.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estabilidade de Fixação Ocular – Ghosting | SkillDrills",
    description: "Treino gratuito de fixação foveal e supressão de rastros visuais: aprimore a nitidez dinâmica e estabilidade do olhar contra desfoque de movimento.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills",
      "item": "https://skilldrills.online/pt"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Rastreamento Visual",
      "item": "https://skilldrills.online/pt/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Supressão de Rastros e Fixação",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Supressão de Rastros Visuais – Fixação Ocular",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Estabilidade de Fixação Ocular e Supressão de Fantasmas Visuais",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Ghosting Suppress Pursuit – Treinador de Fixação Foveal",
  "description": "Treinador visual reflexivo no navegador para condicionar a ancoragem foveal firme e a supressão ativa de rastros dinâmicos e artefatos de movimento.",
  "genre": ["Aparato de Treinamento Ocular", "Treinador de Visão Esportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Estabilidade de Fixação sob Rastros Visuais",
  "description": "Protocolo para condicionar o desfoque cortical ativo e a ancoragem foveal precisa em alvos com fantasmas visuais.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Isole a Cabeça e Mantenha a Postura",
      "text": "Sente-se ereto a 50-60 cm da tela, mantendo a cabeça e o queixo imóveis para forçar o trabalho autônomo dos músculos extraoculares.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fixe o Olhar no Núcleo do Alvo",
      "text": "Concentre a visão estritamente no ponto central do alvo, ignorando conscientemente os anéis e anomalias de arrasto que o seguem.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Suprima o Arrastamento Retiniano",
      "text": "Evite que o olhar escorregue para trás em direção aos rastros visuais. Mantenha microssacadas estáveis acopladas à dianteira do vetor.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Realize Blocos de Alta Concentração",
      "text": "Pratique de 5 a 8 blocos de 60 segundos com intervalos de descanso para evitar fadiga dos fotorreceptores e do córtex visual.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o treino de Supressão de Rastros e Fixação (Ghosting Suppress Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício neuro-ocular projetado para treinar a estabilidade da fóvea e a supressão ativa de rastros dinâmicos (motion blur/ghosting) deixados por alvos em alta velocidade, reforçando a nitidez percebida."
      }
    },
    {
      "@type": "Question",
      "name": "Como o cérebro elimina naturalmente o desfoque de movimento (motion deblurring)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O córtex visual primário (V1) e a área temporal média (MT) aplicam inibição temporal pós-sináptica, suprimindo ativamente sinais residuais dos fotorreceptores da retina para manter a nitidez de objetos em movimento (Burr, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a função das microssacadas na manutenção da fixação estável?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mesmo durante a fixação imóvel, os olhos executam microssacadas e oscilações de alta frequência que renovam a estimulação foveal e evitam a fading visual (desvanecimento de Troxler) sem perder o alvo (Martinez-Conde et al., 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o olhar tende a desviar para os rastros traseiros (ghost rings)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O reflexo retinotópico periférico é atraído por variações de luminância e contraste. Se o controle inibitório cortical estiver destreinado, o cérebro confunde o rastro com um novo estímulo, puxando o olhar para trás."
      }
    },
    {
      "@type": "Question",
      "name": "De que maneira este exercício beneficia jogadores de FPS e esports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em tiroteios caóticos com explosões, flashes e partículas, a capacidade de fixar a retícula exatamente no centro do adversário sem se distrair com efeitos visuais periféricos resulta em maior precisão e menor tempo de reação."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a imobilização estrita da cabeça é obrigatória?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover a cabeça engaja o reflexo vestíbulo-ocular (RVO), o que mascara falhas no controle fino dos músculos retos e oblíquos. Manter o queixo fixo garante que todo o esforço de compensação seja puramente oculomotor."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a frequência e duração de prática recomendadas por dia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões diárias de 5 a 10 minutos (5 a 8 rodadas de 60 segundos). A inibição de ruído visual exige esforço atencional contínuo; limites controlados previnem astenopia (cansaço ocular) e facilitam a consolidação neural."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o papel do tempo de resposta do monitor (GtG) e taxa de Hz neste teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Painéis com transição rápida de pixels (1 ms GtG) e alta taxa (144 Hz+) eliminam o ghosting físico do hardware, permitindo isolar exclusivamente a inibição biológica e o processamento sensoriomotor (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Há transferência deste treino para esportes dinâmicos como beisebol ou tênis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Bolas em alta velocidade produzem arrastamento visual no campo de visão periférica. Atletas com controle de fixação superior conseguem distinguir a costura e o giro da bola sem perder a nitidez foveal."
      }
    },
    {
      "@type": "Question",
      "name": "O exercício de supressão de fantasmas visuais é gratuito e seguro para uso diário?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a ferramenta é totalmente gratuita, opera diretamente no navegador sem coleta de dados privados, e todos os seus resultados de estabilidade permanecem salvos exclusivamente no armazenamento local do seu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Bases Neurofisiológicas da Fixação Foveal e Supressão de Rastros Visuais",
  intro: [
    "O rastreamento de alvos em alta velocidade impõe um desafio biofísico severo à retina: a persistência química dos fotorreceptores tende a criar um arrastamento visual (motion smear) que obscurece as bordas dos objetos. Em indivíduos destreinados, o olhar é frequentemente capturado pelos rastros de luminância posteriores, deslocando a imagem para fora da fóvea central (Burr, 1980; Burr & Morgan, 1997).",
    "Mecanismo de Desfoque Cortical e Microssacadas de Fixação: o córtex visual primário (V1) e as áreas parietais executam um processo ativo de inibição temporal, suprimindo o ruído retiniano residual para que a fóvea perceba apenas o núcleo nítido do estímulo. Paralelamente, o sistema oculomotor mantém microssacadas de alta precisão (< 1° de amplitude) para compensar o desvio postural e manter o vetor foveal estritamente travado sobre o alvo móvel (Martinez-Conde, Macknik, & Hubel, 2004; Rolfs, 2009; Krauzlis, 2004).",
    "Interação com Hardware e Amostragem Temporal: telas comuns a 60 Hz acumulam borrões decorrentes do tempo de resposta dos cristais líquidos. Monitores gamer de 144 Hz a 240 Hz reduzem drasticamente o atraso visual (Woods et al., 2015), garantindo que o treinamento desafie exclusivamente o filtro biológico neural. Todo o processamento ocorre no navegador com privacidade absoluta e armazenamento local."
  ],
  benchmarks: {
    title: "Padrões de Desempenho em Fixação Foveal e Supressão de Rastros Visuais",
    headers: ["Nível de Desempenho", "Multiplicador de Velocidade", "Estabilidade de Fixação sob Rastros Visuais", "Perfil Neuromotor e Oculomotor"],
    rows: [
      ["Nível 1: Apex Fixação – Bloqueio Foveal Puro", "2.0x+ Ultra-Velocidade", "O olhar permanece inabalavelmente ancorado no núcleo do alvo mesmo diante de anéis de arrasto densos e quiques rápidos.", "Supressão cortical impecável do desfoque de movimento e precisão microssacádica absoluta (Burr, 1980; Martinez-Conde et al., 2004). Padrão de elite em esportes e esports."],
      ["Nível 2: Acuidade de Fixação Superior", "1.4x – 1.9x Alta Velocidade", "O contorno do alvo é perfeitamente isolado em alta velocidade; distração mínima causada pelos anéis residuais de cauda.", "Excelente filtragem sensoriomotora dos músculos extraoculares. Alto desempenho em cenários saturados de partículas e efeitos visuais."],
      ["Nível 3: Padrão Funcional Sólido", "1.0x – 1.3x Velocidade Padrão", "Perseguição estável na velocidade base; breve hesitação momentânea durante quiques ou aumento da densidade de rastros.", "Faixa normativa em adultos saudáveis. Plenamente satisfatória para direção diária, esportes recreativos e jogos casuais."],
      ["Nível 4: Desvio Ocular – Requer Treino", "0.7x – 0.9x Velocidade Moderada", "O olhar é recorrentemente atraído para trás em direção aos rastros visuais; o núcleo do alvo escapa frequentemente da fóvea.", "Filtragem cortical lenta de ruído visual. Recomenda-se prática consistente nos patamares iniciais de velocidade."],
      ["Nível 5: Perda de Fixação – Iniciante", "< 0.7x Baixa Velocidade", "Os olhos oscilam de forma desordenada entre o alvo principal e os anéis fantasmas; perda completa do foco.", "Coordenação neuromuscular básica requer desenvolvimento em velocidades lentas com imobilização rigorosa da cabeça."]
    ],
    note: "Baremos fundamentados em pesquisas neurofisiológicas sobre controle de fixação foveal, dinâmica de microssacadas e supressão cortical de desfoque retiniano (Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezconde2004', 'rolfs2009', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Lenta (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Perseguição Caótica Direcional (Chaos Pursuit)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Dinâmica (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Rastreamento em Infinito (Figure-8)" }
  ]
};

export default function GhostingSuppressPursuitPagePt() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GhostingSuppressPursuitClient
        copy={{
          title: "Supressão de Rastros Visuais – Fixação Ocular",
          subtitle: "Treino de Estabilidade Foveal e Supressão de Fantasmas Visuais",
          description: "Ao exibir rastros de arrasto e anéis fantasma estocásticos, este exercício condiciona o córtex visual a inibir ativamente a interferência de fundo, fixando a fóvea central exclusivamente no núcleo do alvo móvel (Burr, 1980; Martinez-Conde et al., 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
