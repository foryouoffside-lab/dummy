import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento de Alvo Evasivo – Evasion Pursuit | SkillDrills",
  description: "Treino gratuito de rastreamento reativo e alvos evasivos: aprimore a refixação foveal imediata e sacadas corretivas em mudanças bruscas de trajetória.",
  keywords: [
    "rastreamento de alvo evasivo",
    "perseguição evasiva dinâmica",
    "treino de mira tracking reativo",
    "recuperação de foco visual rápido",
    "exercício de refixação ocular foveal",
    "motilidade ocular para esports",
    "treino de resposta visual dinâmica",
    "agilidade ocular contra alvos móveis",
    "treinamento de sacadas corretivas",
    "coordenação olho-mão tracking",
    "teste de visão dinâmica online",
    "exercício de motilidade ocular grátis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/dynamic-evasion-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rastreamento de Alvo Evasivo – Evasion Pursuit | SkillDrills",
    description: "Treino gratuito de rastreamento reativo e alvos evasivos: aprimore a refixação foveal imediata e sacadas corretivas em mudanças bruscas de trajetória.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastreamento de Alvo Evasivo – Evasion Pursuit | SkillDrills",
    description: "Treino gratuito de rastreamento reativo e alvos evasivos: aprimore a refixação foveal imediata e sacadas corretivas em mudanças bruscas de trajetória.",
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
      "name": "Perseguição Evasiva Dinâmica",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Perseguição Evasiva Dinâmica – Rastreamento Ocular",
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
  "name": "Teste de Rastreamento de Alvo Evasivo e Refixação Foveal",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit",
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
  "name": "Dynamic Evasion Pursuit – Treinador Visual Reativo",
  "description": "Treinador visual reflexivo no navegador para rastrear alvos que executam quiebres evasivos bruscos simulando oponentes em alta velocidade.",
  "genre": ["Aparato de Treinamento Ocular", "Treinador de Visão Esportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Refixação Sacádica contra Alvos Evasivos",
  "description": "Protocolo para condicionar respostas visuais rápidas e supressão de latência frente a manobras evasivas abruptas.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Mantenha a Postura Estável",
      "text": "Posicione-se a 50-60 cm da tela com a cabeça e mandíbula imóveis para isolar os músculos retos e oblíquos externos.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Acompanhe os Segmentos Lineares",
      "text": "Sustente a perseguição contínua suave enquanto o alvo se desloca em velocidade uniforme ao longo do vetor atual.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute Sacadas Imediatas na Evasão",
      "text": "No exato instante em que o alvo guinar em ângulo agudo, reaja ao deslizamento retiniano com uma microssacada rápida para recentralizar a fóvea.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Complete Séries de Alta Atenção",
      "text": "Execute de 5 a 8 sessões de 60 segundos com intervalos de descanso ocular para manter as conexões neuromusculares no ápice.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o treino de Perseguição Evasiva Dinâmica (Dynamic Evasion Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício de motilidade ocular avançada que combina segmentos de perseguição lenta contínua com quebras direcionais evasivas abruptas, treinando o cérebro a recentralizar o foco em menos de 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício se diferencia da Perseguição Caótica (Chaos Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A perseguição caótica aplica perturbações contínuas a cada quadro; já a perseguição evasiva apresenta trechos lineares estáveis interrompidos por guinadas angulares discretas e repentinas, reproduzindo manobras intencionais de fuga de adversários."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece na retina durante uma quebra brusca de direção?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando o alvo guina, o vetor de velocidade diverge instantaneamente, produzindo deslizamento retiniano (retinal slip). Como o ganho da perseguição lenta cai a zero, o colículo superior dispara uma sacada balística de correção para restabelecer o alinhamento foveal (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "De que forma este exercício aprimora a mira tracking em jogos competitivos (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos de tiro rápido, oponentes alternam strafes laterais longos com mudanças rápidas de sentido (ADAD). Este treino condiciona o reflexo de re-aquisição da mira, diminuindo o tempo de reação e eliminando a hesitação visual."
      }
    },
    {
      "@type": "Question",
      "name": "Por que é indispensável imobilizar a cabeça durante a execução?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Girar a cabeça ativa o reflexo vestíbulo-ocular (RVO), compensando mecanicamente o atraso e mascarando a lentidão dos músculos oculares. Isolar a cabeça força o desenvolvimento exclusivo dos seis músculos extraoculares."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a duração e a frequência diária recomendadas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões diárias de 5 a 10 minutos (5 a 8 blocos de 60 segundos). Como as rupturas angulares exigem esforço máximo de foco e contração muscular rápida, séries curtas evitam o cansaço visual e potencializam a neuroplasticidade."
      }
    },
    {
      "@type": "Question",
      "name": "O que fazer se o alvo se afastar excessivamente após a manobra evasiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evite varreduras desordenadas. Fixe a atenção na área de visão periférica próxima, localize o novo trajeto e dispare uma sacada firme e direta. Se a taxa de perda for alta, diminua o multiplicador de velocidade para 0.8x."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a relevância da taxa de atualização do monitor (Hz) para o rastreamento evasivo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de 144 Hz ou superiores reduzem a latência entre quadros para menos de 6,9 ms (Woods et al., 2015), exibindo a quebra angular no exato instante em que ela ocorre, permitindo respostas sacádicas muito mais velozes."
      }
    },
    {
      "@type": "Question",
      "name": "Este exercício traz benefícios para modalidades esportivas convencionais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. No futebol, basquete, tênis e artes marciais, adversários e bolas realizam fintas e mudanças imprevisíveis de trajeto. A capacidade de reajustar o olhar rapidamente é determinante para antecipação espacial e tempo de reação esportivo."
      }
    },
    {
      "@type": "Question",
      "name": "O teste de perseguição evasiva é gratuito e seguro para uso contínuo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a ferramenta é totalmente gratuita, roda nativamente no navegador web sem rastreadores ou cadastro, e todos os seus índices de precisão permanecem salvos unicamente no armazenamento local do seu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Neurofisiológicos da Perseguição Evasiva e Refixação Sacádica",
  intro: [
    "A perseguição visual convencional frequentemente se apoia em trajetórias contínuas, nas quais o córtex cerebelar antecipa o movimento e reduz o atraso de condução sensorial através de modelos motores preditivos (Bahill, Iandolo, & Troost, 1980). A Perseguição Evasiva Dinâmica (Dynamic Evasion Pursuit) rompe essa previsibilidade: o alvo se desloca em segmentos lineares e subitamente executa quebras evasivas em ângulos agudos, simulando o comportamento de esquiva de um oponente em esportes de alta velocidade e jogos competitivos.",
    "Cinemática do Retinal Slip e Sacadas Corretivas: no momento da quebra angular, a velocidade da imagem sobre a retina ultrapassa a capacidade máxima de acompanhamento suave (~30°/s). Isso desencadeia um erro de posição imediato (retinal slip). O córtex visual primário e o colículo superior processam o vetor de divergência e disparam uma sacada corretiva rápida (Catch-up Saccade) em menos de 150 a 180 ms (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008), restabelecendo o alinhamento da fóvea sobre o novo vetor de fuga.",
    "Amostragem Temporal e Resposta Biológica: painéis convencionais a 60 Hz impõem uma latência de quantização de até 16,7 ms, enquanto telas gamer a 144 Hz ou 240 Hz comprimem essa defasagem para menos de 4,2 ms (Woods et al., 2015). Esta plataforma opera totalmente no navegador, garantindo segurança estrita e retenção local dos seus índices de desempenho."
  ],
  benchmarks: {
    title: "Padrões de Desempenho em Perseguição Evasiva e Refixação Sacádica",
    headers: ["Nível de Desempenho", "Multiplicador de Velocidade", "Refixação Sacádica nas Quebras Evasivas", "Perfil Neuromotor e Oculomotor"],
    rows: [
      ["Nível 1: Apex Reativo – Reflexos de Elite", "2.0x+ Ultra-Velocidade", "Sacada corretiva dispara com latência inferior a 150 ms; fixação foveal instantânea sem oscilação pós-sacádica.", "Velocidade máxima de transmissão sináptica entre fóvea e centros oculomotores. Padrão de elite para competidores de esports e atletas de alta reação."],
      ["Nível 2: Agilidade Visual Superior", "1.4x – 1.9x Alta Velocidade", "Recentralização rápida e consistente em 1 a 2 quadros de vídeo; retomada fluida da velocidade de perseguição.", "Músculos extraoculares altamente treinados. Domínio expressivo sobre manobras de esquiva e strafe evasivo."],
      ["Nível 3: Padrão Funcional Sólido", "1.0x – 1.3x Velocidade Padrão", "Acompanhamento confiável nos trechos lineares; ligeiro atraso latente diante de quebras angulares agudas.", "Faixa normativa para adultos saudáveis. Totalmente suficiente para direção diária, esportes recreativos e jogos casuais."],
      ["Nível 4: Refixação Tardia – Requer Prática", "0.7x – 0.9x Velocidade Moderada", "O alvo escapa da fóvea na maioria das manobras evasivas; múltiplas sacadas corretivas necessárias para reengajar.", "Latência sensoriomotora elevada em rupturas de rumo. Recomenda-se consolidação prévia em velocidades moderadas."],
      ["Nível 5: Instabilidade Inicial – Iniciante", "< 0.7x Baixa Velocidade", "O olhar permanece preso na trajetória antiga do alvo, sofrendo atraso substancial antes da reação.", "Coordenação motora ocular elementar necessita de desenvolvimento em trajetórias contínuas com imobilização estrita da cabeça."]
    ],
    note: "Baremos fundamentados em investigações neurofisiológicas sobre latência sacádica, compensação de deslizamento retiniano e retomada de perseguição sob quebras angulares abruptas (Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Lenta (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/directional-chaos-pursuit", label: "Perseguição Caótica Direcional (Chaos Pursuit)" },
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Rastreamento em Onda Senoidal (Sine Wave)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Rastreamento em Infinito (Figure-8)" }
  ]
};

export default function DynamicEvasionPursuitPagePt() {
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "Perseguição Evasiva Dinâmica – Rastreamento Ocular",
          subtitle: "Treino de Refixação Foveal e Reação a Alvos Evasivos",
          description: "Ao alternar deslocamentos lineares regulares com quebras direcionais imprevisíveis, este exercício impede a compensação preditiva do cerebelo. O sistema oculomotor é forçado a reacionar em malha fechada, disparando microssacadas de alta velocidade para recentralizar o alvo na fóvea central (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
