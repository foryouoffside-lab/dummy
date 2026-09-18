import InfinityPursuitClient from '@/app/drills/visual-tracking/infinity-pursuit/InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Exercício Ocular do Oito Deitado – Infinity | SkillDrills",
  description: "Exercício gratuito de rastreamento ocular em oito deitado: aprimore o cruzamento da linha média, coordenação binocular e perseguição lenta no navegador.",
  keywords: [
    "exercício ocular do oito deitado",
    "treino de movimento ocular em 8",
    "coordenação ocular bilateral",
    "cruzamento da linha média visual",
    "perseguição contínua lemniscata",
    "exercício de motilidade ocular binocular",
    "ginástica para os olhos 8 infinito",
    "teste de rastreamento visual online",
    "treinamento de visão esportiva grátis",
    "estabilidade foveal em curvas",
    "treino de foco dinâmico para gamers",
    "acuidade visual dinâmica do olhar"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/infinity-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Exercício Ocular do Oito Deitado – Infinity | SkillDrills",
    description: "Exercício gratuito de rastreamento ocular em oito deitado: aprimore o cruzamento da linha média, coordenação binocular e perseguição lenta no navegador.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exercício Ocular do Oito Deitado – Infinity | SkillDrills",
    description: "Exercício gratuito de rastreamento ocular em oito deitado: aprimore o cruzamento da linha média, coordenação binocular e perseguição lenta no navegador.",
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
      "name": "Perseguição em Oito Infinito",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Perseguição em Oito Infinito – Rastreamento Ocular",
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
  "name": "Teste de Rastreamento Ocular em Oito Deitado e Cruzamento da Linha Média",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit",
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
  "name": "Infinity Pursuit – Treinador Ocular de Lemniscata",
  "description": "Treinador visual no navegador para sincronizar a motilidade ocular binocular em trajetórias harmônicas de oito deitado sem saltos sacádicos.",
  "genre": ["Aparato de Treinamento Ocular", "Treinador de Visão Esportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Exercício do Oito Deitado para os Olhos",
  "description": "Protocolo para treinar a perseguição ocular contínua e a coordenação binocular ao longo da lemniscata de Bernoulli.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Alinhe a Postura e Fixe a Cabeça",
      "text": "Sente-se ereto a 50-70 cm da tela. Mantenha o queixo imóvel para evitar que a rotação da cabeça substitua o trabalho dos músculos oculares.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Inicie na Velocidade Padrão",
      "text": "Selecione 1.0x para habituar os olhos à transição contínua entre os laços esquerdo e direito da curva.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flua sem Saltos pelo Centro",
      "text": "Ao cruzar a interseção central (linha média), evite piscadelas ou sacadas compensatórias. Mantenha um deslizamento suave e ininterrupto.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Complete Sessões Curtas e Focadas",
      "text": "Execute de 5 a 8 blocos de 60 segundos com descansos oculares para consolidar o ganho de perseguição no cerebelo.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o exercício de Perseguição em Oito Infinito (Infinity Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício de motilidade ocular avançada que guia os olhos continuamente pela lemniscata de Bernoulli (oito deitado), coordenando os seis pares de músculos extraoculares e treinando a passagem fluida pela linha média."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o cruzamento da linha média (midline crossing) é tão importante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A linha média vertical marca a transição neurológica entre os campos visuais esquerdo e direito, exigindo transferência de informação inter-hemisférica via corpo caloso. Pessoas destreinadas sofrem hesitações ou sacadas involuntárias nessa junção."
      }
    },
    {
      "@type": "Question",
      "name": "Quais músculos oculares são fortalecidos na trajetória em oito deitado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos os seis músculos extraoculares (reto medial, reto lateral, reto superior, reto inferior, oblíquo superior e oblíquo inferior) trabalham em perfeita alternância recíproca durante a rotação nos laços inclinados."
      }
    },
    {
      "@type": "Question",
      "name": "O que significa o ganho de perseguição (Pursuit Gain)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O ganho de perseguição é a razão entre a velocidade angular do olho e a velocidade angular do alvo. O valor ideal é 1,0 (sincronização perfeita). Valores abaixo de 0,80 indicam atraso e necessidade de sacadas corretivas (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "De que maneira este treino melhora o desempenho em jogos (FPS e esports)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos com movimentação complexa tridimensional, adversários realizam curvas diagonais e trocas de plano. O treino em oito elimina solavancos na mira durante transições diagonais e perseguições curvilíneas."
      }
    },
    {
      "@type": "Question",
      "name": "Por que é fundamental manter a cabeça fixa durante o exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Virar a cabeça ativa o reflexo vestíbulo-ocular (RVO), permitindo que o ouvido interno faça o trabalho de acompanhamento mecânico. Manter o queixo estático força o sistema ocular intrínseco a executar 100% da motilidade."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a recomendação ideal de tempo de prática diária?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sugerimos de 5 a 10 minutos diários (5 a 8 blocos de 60 segundos). Séries curtas e intensas previnem a fadiga muscular e promovem a neuroplasticidade sináptica no córtex frontal e cerebelar."
      }
    },
    {
      "@type": "Question",
      "name": "O exercício auxilia na redução do cansaço visual de telas de computador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A maior parte das atividades digitais mantém o foco ocular em pontos estáticos. A trajetória em oito deitado promove alongamento dinâmico dos músculos extraoculares, estimulando a circulação e aliviando a tensão foveal."
      }
    },
    {
      "@type": "Question",
      "name": "Existe benefício para esportes tradicionais de campo e quadra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. No tênis, beisebol, futebol e automobilismo, a trajetória de bolas e veículos envolve curvas contínuas com variação de profundidade e cruzamento do campo visual central. A agilidade binocular aprimora a leitura espacial."
      }
    },
    {
      "@type": "Question",
      "name": "O treino de perseguição em oito infinito é gratuito e seguro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a ferramenta é totalmente gratuita, funciona diretamente no navegador web sem rastreadores ou cadastro, e todos os seus índices de fluidez e tempo permanecem armazenados unicamente no seu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Neurofisiológicos da Lemniscata e Coordenação Binocular",
  intro: [
    "A trajetória em oito deitado (lemniscata de Bernoulli) representa um dos padrões mais completos para a avaliação e desenvolvimento do sistema oculomotor humano. Ao contrário de movimentos estritamente horizontais ou verticais, a lemniscata exige a combinação sinérgica e contínua de todos os seis músculos extraoculares em vetores diagonais e helicoidais harmônicos (Robinson, 1965; Barnes, 2008).",
    "Neurodinâmica do Cruzamento da Linha Média: no centro da curva, o alvo cruza o meridiano vertical de fixação binocular. Esse momento demanda rápida transferência de dados inter-hemisféricos entre os córtices visuais e motores de ambos os hemisférios cerebrais através do corpo caloso (Leigh & Zee, 2015). Em indivíduos não condicionados, o ganho de perseguição lenta costuma colapsar nesse ponto, gerando sacadas intrusivas ou micro-pausas que desestabilizam o foco foveal.",
    "Hardware e Fluidez Visual: taxas de atualização de 144 Hz ou superiores proporcionam trajetórias temporais hiper-suaves, reduzindo a quantização de movimento para menos de 6,9 ms (Woods et al., 2015). O exercício opera 100% no navegador, respeitando a privacidade absoluta com gravação estritamente local."
  ],
  benchmarks: {
    title: "Métricas de Desempenho em Oito Deitado (Lemniscate Pursuit Benchmarks)",
    headers: ["Nível de Desempenho", "Ganho de Perseguição (Pursuit Gain)", "Taxa de Sacadas na Linha Média", "Precisão de Trajetória", "Nível Neurofisiológico"],
    rows: [
      ["Elite (Atletas Profissionais & Esports)", "0,96 – 1,02", "< 2% (Deslizamento Contínuo)", "98%+", "Coordenação neuromuscular perfeita. Ausência de sacadas na linha média; modelo cerebelar preditivo perfeitamente calibrado (Barnes, 2008)."],
      ["Avançado (Nível Competitivo)", "0,90 – 0,95", "2% – 5%", "92% – 97%", "Excelente estabilidade da perseguição lenta. Mínimo retardo de fase apenas nos ápices extremos; travamento foveal sólido (Krauzlis, 2004)."],
      ["Competente (Adultos Saudáveis)", "0,80 – 0,89", "6% – 12%", "82% – 91%", "Padrão funcional sólido para o dia a dia. Sacadas ocasionais de correção ao cruzar o centro ou nas curvas de raio apertado."],
      ["Em Desenvolvimento (Fadiga / Latência)", "0,68 – 0,79", "13% – 22%", "70% – 81%", "Atraso perceptível de perseguição; quebras sacádicas recorrentes; indícios de fadiga muscular ocular ou compensação cervical."],
      ["Iniciante / Instabilidade", "< 0,68", "> 22%", "< 70%", "A perseguição contínua falha frequentemente; o olhar salta em busca do alvo; recomenda-se treino básico em velocidades lentas."]
    ],
    note: "※ Baremos de referência estabelecidos com distância de observação entre 50 e 70 cm. O ganho de perseguição é calculado pela razão entre a velocidade angular dos olhos e a velocidade angular do alvo (ideal = 1,0) segundo Barnes (2008) e Leigh & Zee (2015)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('barnes2008', 'krauzlis2004', 'robinson1965', 'leighzee2015', 'woods2015', 'salthouse1980'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Lenta (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Perseguição Caótica Direcional (Chaos Pursuit)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Dinâmica (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Rastreamento em Onda Senoidal (Sine Wave)" }
  ]
};

export default function InfinityPursuitPagePt() {
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
      <InfinityPursuitClient
        copy={{
          title: "Perseguição em Oito Infinito – Rastreamento Ocular",
          subtitle: "Treino de Coordenação Binocular e Cruzamento da Linha Média",
          description: "Exercício de perseguição suave contínua na curva de Bernoulli. Condiciona a alternância precisa dos seis músculos extraoculares e a estabilidade visual sem quebras sacádicas durante o cruzamento do meridiano central (Robinson, 1965; Barnes, 2008)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/infinity-pursuit" />
      </div>
    </>
  );
}
