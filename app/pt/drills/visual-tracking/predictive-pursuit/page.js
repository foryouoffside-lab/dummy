import PredictivePursuitClient from '@/app/drills/visual-tracking/predictive-pursuit/PredictivePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// PORTUGUESE SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "rastreamento visual preditivo" / "treino de antecipação visual"
// Secondary:    "perseguição suave preditiva", "predição de oclusão visual", "exercício de mira preditiva"
// LSI / Domain:  "memória de trabalho ocular", "controle motor feedforward", "antecipação de trajetória mira",
//               "rastreamento ocular com bloqueio", "visão preditiva para fps", "agilidade visual em oclusões", "avaliação de rastreamento preditivo"
// Authentic Domain Terms: Rastreamento Visual Preditivo（Predictive Visual Pursuit）, Antecipação de Trajetória（Trajectory Anticipation）, Oclusão Visual（Visual Occlusion）, Modelo Interno Cerebelar（Internal Cerebellar Forward Model）, Controle Motor Feedforward（Feedforward Motor Control）, Ganho de Oclusão（Occlusion Gain）
// ============================================================

export const metadata = {
  title: "Rastreamento Visual Preditivo – SkillDrills",
  description: "Treine rastreamento visual preditivo e antecipacao de trajetorias ocluidas: aprimore a memoria motora ocular e controle feedforward gratis no navegador.",
  keywords: [
    "rastreamento visual preditivo",
    "treino de antecipação visual",
    "perseguição suave preditiva",
    "predição de oclusão visual",
    "exercício de mira preditiva",
    "memória de trabalho ocular",
    "controle motor feedforward",
    "antecipação de trajetória mira",
    "rastreamento ocular com bloqueio",
    "visão preditiva para fps",
    "agilidade visual em oclusões",
    "avaliação de rastreamento preditivo"
  ],
  openGraph: {
    title: "Rastreamento Visual Preditivo – SkillDrills",
    description: "Treine rastreamento visual preditivo e antecipacao de trajetorias ocluidas: aprimore a memoria motora ocular e controle feedforward gratis no navegador.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/visual-tracking/predictive-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastreamento Visual Preditivo – SkillDrills",
    description: "Treine rastreamento visual preditivo e antecipacao de trajetorias ocluidas: aprimore a memoria motora ocular e controle feedforward gratis no navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/predictive-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/predictive-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Rastreamento Visual", "item": "https://skilldrills.online/pt/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "Rastreamento Visual Preditivo", "item": "https://skilldrills.online/pt/drills/visual-tracking/predictive-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treino de Rastreamento Visual Preditivo",
  "operatingSystem": "Navegador Web",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "description": "Treino oculomotor avançado para condicionamento de modelos preditivos cerebelares e perseguição suave durante oclusões visuais."
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Aplicativo de Rastreamento Preditivo",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/predictive-pursuit",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Todos os navegadores modernos",
  "browserRequirements": "Requer suporte a JavaScript e HTML5 Canvas"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Rastreamento Preditivo",
  "description": "Exercício de agilidade visual onde o usuário antecipa e projeta mentalmente trajetórias de alvos através de setores ocluídos.",
  "genre": ["Treino Visual", "Mira Preditiva", "Treino de Reflexos"],
  "playMode": "SinglePlayer",
  "gamePlatform": "Navegador Web"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Antecipação de Trajetória com o Rastreamento Preditivo",
  "description": "Protocolo neurofisiológico estruturado para condicionar modelos preditivos cerebelares durante interrupções visuais temporárias.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Codificação do Vetor Inicial",
      "text": "Fixe o alvo nos primeiros 100 a 200 ms para capturar com exatidão a velocidade e o ângulo do vetor cinético."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Ativação do Modelo Preditivo",
      "text": "Quando o alvo entrar em oclusão, continue movendo os olhos com velocidade constante pela trajetória estimada."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Inibição de Sacadas de Busca",
      "text": "Evite saltos oculares desordenados procurando o alvo na escuridão; preserve a suavidade contínua do olhar."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Recepção Foveal no Ponto de Saída",
      "text": "Posicione a fóvea com precisão milimétrica exatamente na coordenada de reaparecimento do alvo móvel."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o treino de rastreamento visual preditivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício neurofisiológico que treina o cérebro a projetar trajetórias de alvos móveis durante oclusões temporárias sem depender de feedback visual contínuo (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "Como o rastreamento preditivo supera a latência biológica humana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O atraso neuromuscular reflexivo é de aproximadamente 130 a 150 ms. Modelos preditivos cerebelares disparam comandos antecipados que neutralizam completamente esse atraso (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "Que áreas cerebrais mantêm o rastreamento durante o bloqueio visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Os campos oculares frontais (FEF) e a memória de trabalho visual retêm o vetor de velocidade, mantendo os olhos em movimento mesmo sem estímulo na retina (Bennett & Barnes, 2003)."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício aprimora a mira preditiva em jogos de tiro (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando inimigos passam por trás de paredes ou fumaça, jogadores treinados posicionam a mira exatamente no ponto de saída antes da reaparição, em vez de reagirem com atraso."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o benefício deste treino em esportes tradicionais de bola?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No beisebol, tênis e futebol, a velocidade da bola excede a velocidade de reação pura. Atletas usam modelos preditivos para estimar a rota antes do impacto (Kowler, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que se deve evitar sacadas de busca quando o alvo some?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sacadas de busca geram supressão sacádica e quebram a sincronia de velocidade. Manter a perseguição suave assegura reaquisição perfeita na saída (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é ganho de oclusão em testes de motricidade ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É a razão entre a velocidade ocular durante a oclusão e a velocidade real do alvo. Um ganho próximo a 1,0 indica ausência de desaceleração durante a invisibilidade."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a influência da taxa de atualização do monitor neste exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Telas de alta frequência geram amostragens cinéticas mais suaves antes da oclusão, facilitando o cálculo exato da aceleração pelo cerebelo (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "Esta ferramenta de treino preditivo é gratuita e sem anúncios invasivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o SkillDrills oferece este exercício de forma 100% gratuita, sem registros, downloads ou assinaturas, diretamente no navegador."
      }
    },
    {
      "@type": "Question",
      "name": "Adultos mais velhos conseguem melhorar a mira preditiva com treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Enquanto reflexos mecânicos diminuem ligeiramente com a idade, os modelos preditivos do cerebelo mantêm alta plasticidade e respondem muito bem ao treino estruturado (Kowler, 1989)."
      }
    }
  ]
};

const guideProps = {
  heading: "Princípios Neurofisiológicos de Rastreamento Preditivo e Extrapolação de Trajetória",
  intro: [
    "O sistema visual humano enfrenta um limite fisiológico insuperável: a latência sensomotora de 130 a 150 milissegundos necessária para que os fótons captados na retina sejam processados e convertidos em impulsos motores extraoculares. Se os olhos fossem conduzidos apenas por feedback reativo, o olhar sofreria deslizamento retiniano constante (retinal slip), ficando permanentemente atrasado em relação aos alvos velozes. A solução evolutiva para esse impasse é a perseguição suave preditiva.",
    "Estudos fundamentais de Robinson (1965) e Barnes (2008) comprovaram que o cerebelo, em estreita cooperação com os campos oculares frontais (FEF), extrai os vetores de aceleração e direção logo nos primeiros 100 a 200 ms de movimento. A partir desses dados, o cérebro projeta um modelo interno feedforward que guia os músculos oculares na exata velocidade futura do alvo, anulando o retardo biológico.",
    "No contexto competitivo de esportes e jogos eletrônicos, alvos frequentemente sofrem oclusão visual ao cruzar obstáculos, estruturas ou fumaça. Pesquisas de Bennett & Barnes (2003) revelaram que a memória de trabalho visual retém a velocidade e sustenta a perseguição ocular por até dois segundos em ausência total de sinal visual. O treino Predictive Pursuit desenvolve especificamente essa competência motora antecipatória."
  ],
  benchmarks: {
    title: "Métricas de Extrapolação de Trajetória e Precisão em Oclusão",
    headers: ["Nível de Desempenho", "Precisão de Extrapolação (%)", "Erro de Aterrissagem na Saída", "Ganho de Perseguição (Gain)", "Perfil Preditivo"],
    rows: [
      ["Elite (Esports / Atletas)", "Acima de 94%", "Abaixo de 15 px (Aterrissagem Perfeita)", "0.95 – 1.02", "Modelo cerebelar perfeito; antecipação milimétrica sem hesitação ou sacadas corretivas."],
      ["Avançado (Nível Competitivo)", "86% – 93%", "15 px – 28 px", "0.88 – 0.94", "Excelente extrapolação vetorial com mínima necessidade de correção após a saída."],
      ["Competente (Adulto Saudável)", "76% – 85%", "29 px – 45 px", "0.78 – 0.87", "Predição sólida com leve deriva do olhar em oclusões mais longas."],
      ["Em Desenvolvimento", "62% – 75%", "46 px – 65 px", "0.65 – 0.77", "Predomínio de controle reativo; desaceleração evidente durante o período ocluído."],
      ["Iniciante / Nível Base", "Abaixo de 62%", "Acima de 65 px", "Abaixo de 0.65", "Parada imediata do olhar na oclusão; grande atraso na recaptura do alvo."]
    ],
    note: "※ Testes realizados em 1080p a 50–70 cm da tela com velocidades de 1.0x a 1.5x. A pontuação avalia a precisão de chegada foveal na coordenada de saída sem sacadas corretivas posteriores."
  },
  techniques: {
    title: "Quatro Princípios Essenciais para Extrapolação Precisa de Trajetória",
    items: [
      {
        name: "Codificação Inicial de Velocidade",
        desc: "Foque intensamente o alvo nos primeiros 100 a 200 ms após o início do percurso. O cerebelo necessita de dados limpos de aceleração para erguer a simulação preditiva correta (Barnes, 2008).",
        tips: "Observe a rapidez com que o objeto cruza o plano de fundo em vez de reparar em detalhes gráficos."
      },
      {
        name: "Extrapolação Mental Contínua",
        desc: "Quando o alvo sumir atrás da oclusão, não interrompa o movimento dos olhos. Mantenha o deslocamento fluindo na mesma velocidade pela linha imaginária de travessia.",
        tips: "Não olhe para onde o alvo sumiu; guie os olhos para o espaço vazio à frente em direção à saída."
      },
      {
        name: "Supressão de Sacadas Desorganizadas",
        desc: "A ausência de estímulo instiga o cérebro a fazer buscas sacádicas ansiosas. Esses saltos destroem o vetor cinético e criam borrão visual. Conserve o deslizar uniforme do olhar (Krauzlis, 2004).",
        tips: "Imagine seus olhos deslizando sobre um trilho suave e magnético através da área escura."
      },
      {
        name: "Recepção Antecipada na Saída",
        desc: "Calcule a coordenada exata onde o alvo irá reaparecer. Conecte a chegada do olhar no mesmo instante da reaparição para travar a fóvea sem desvios.",
        tips: "Prefira chegar à coordenada de saída uma fração de segundo antes a ficar atrás do alvo."
      }
    ]
  },
  steps: [
    "Posicione-se confortavelmente a 50–70 cm da tela mantendo o pescoço e a cabeça estáveis.",
    "Escolha a velocidade da sessão e selecione a ocultação de linha para aumentar o desafio mental.",
    "Acompanhe o alvo em movimento na fase visível absorvendo seu vetor cinético.",
    "Durante o trecho ocluído, mantenha o deslizar dos olhos pela trajetória prevista com velocidade constante.",
    "Reenquadre a fóvea no instante em que o alvo reaparecer e confira sua precisão de extrapolação."
  ],
  audience: "Jogadores de shooters táticos (Valorant, CS2, Apex Legends, Overwatch), atletas de beisebol, tênis e esportes de alta velocidade, e praticantes de ginástica ocular funcional.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('robinson1965', 'kowler1989', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Suave Contínua (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Rastreamento com Caos Direcional (Directional Chaos)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Reativa (Dynamic Evasion)" },
    { href: "/pt/drills/visual-tracking/ghosting-suppress-pursuit", label: "Estabilidade de Fixação Ocular (Ghosting Suppress)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Treino Ocular em Oito Infinito (Infinity)" },
    { href: "/pt/drills/visual-tracking/momentum-teleport-pursuit", label: "Rastreamento de Alvo Teleportado (Momentum)" }
  ]
};

export default function PortuguesePredictivePursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PredictivePursuitClient
        copy={{
          title: "Rastreamento Visual Preditivo e Extrapolação de Trajetória",
          subtitle: "Treino Neurovisual de Modelos Internos Cerebelares e Perseguição em Oclusão",
          description: "Exercício neurofisiológico gratuito para antecipação de trajetórias ocluídas e mira feedforward. Acompanhe mentalmente o alvo que desaparece por trás de obstáculos e posicione o foco foveal exatamente na saída sem atraso. Grátis no navegador."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/predictive-pursuit" />
      </div>
    </>
  );
}
