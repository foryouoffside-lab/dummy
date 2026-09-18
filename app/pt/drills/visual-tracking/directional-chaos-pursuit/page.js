import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Rastreamento Ocular Caótico – Chaos Pursuit | SkillDrills",
  description: "Treino gratuito de rastreamento ocular caótico: aprimore a recuperação sacádica e a refixação foveal imediata diante de trajetórias imprevisíveis.",
  keywords: [
    "rastreamento ocular caótico",
    "perseguição caótica direcional",
    "recuperação sacádica visual",
    "exercício de movimento ocular errático",
    "rastreamento visual reflexivo",
    "treino de mira tracking errático",
    "estabilidade do olhar dinâmico",
    "teste de agilidade ocular online",
    "refixação foveal reflexiva",
    "treino de coordenação ocular esportiva",
    "treinamento de motilidade ocular",
    "exercício de visão dinâmica grátis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages("/drills/visual-tracking/directional-chaos-pursuit"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Rastreamento Ocular Caótico – Chaos Pursuit | SkillDrills",
    description: "Treino gratuito de rastreamento ocular caótico: aprimore a recuperação sacádica e a refixação foveal imediata diante de trajetórias imprevisíveis.",
    url: "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rastreamento Ocular Caótico – Chaos Pursuit | SkillDrills",
    description: "Treino gratuito de rastreamento ocular caótico: aprimore a recuperação sacádica e a refixação foveal imediata diante de trajetórias imprevisíveis.",
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
      "name": "Perseguição Caótica Direcional",
      "item": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Perseguição Caótica Direcional – Rastreamento Ocular",
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
  "name": "Teste de Rastreamento Ocular Caótico e Recuperação Sacádica",
  "url": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit",
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
  "name": "Directional Chaos Pursuit – Treinador de Motilidade Visual",
  "description": "Treinador visual reflexivo no navegador para rastrear alvos com guinadas caóticas e acelerações súbitas sem predição motora.",
  "genre": ["Aparato de Treinamento Ocular", "Treinador de Visão Esportiva", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Recuperação Sacádica com Perseguição Caótica",
  "description": "Protocolo para condicionar respostas visomotoras reativas imediatas diante de trajetórias erráticas.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixe a Postura e Isole os Olhos",
      "text": "Sente-se ereto a 50-60 cm da tela. Mantenha cabeça e mandíbula imóveis para desativar o reflexo vestíbulo-ocular (RVO) e forçar o trabalho puro dos músculos extraoculares.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Selecione a Velocidade Base",
      "text": "Comece em 1.0x para habituar a retina periférica aos quiques de parede e impulsos estocásticos de velocidade.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Dispare Sacadas de Correção Imediatas",
      "text": "Quando o alvo guinar abruptamente, evite tentar adivinhar a rota. Permita que a retina detecte o deslizamento e execute uma microssacada rápida para recolocar a fóvea no alvo.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sustente Séries Curtas com Foco Total",
      "text": "Complete de 5 a 8 rodadas de 60 segundos com pausas de descanso ocular para manter a velocidade de disparo neuronal no ápice.",
      "url": "https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o exercício de Perseguição Caótica Direcional (Directional Chaos Pursuit)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É um exercício de motilidade ocular avançada em que o alvo sofre perturbações contínuas de aceleração e colisões de borda pseudo-aleatórias. Isso neutraliza a predição motora interna e força o sistema visual a treinar reflexos foveais puros de malha fechada."
      }
    },
    {
      "@type": "Question",
      "name": "O que é uma sacada de recuperação (Catch-up Saccade)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando o alvo muda de rota bruscamente, a velocidade da imagem excede o limite da perseguição lenta contínua (~30°/s), gerando deslizamento retinal. O colículo superior e o córtex frontal disparam um salto ocular balístico de 150 a 200 ms (sacada corretiva) para recentralizar o alvo na fóvea."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre este treino caótico e o rastreamento em curvas previsíveis (Lissajous, círculos)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em trajetórias previsíveis, o cerebelo assume o comando motor com antecipação de latência zero (Bahill et al., 1980). No movimento caótico, nenhum segundo se repete; a antecipação falha obrigatoriamente, exigindo resposta biológica reativa em tempo real."
      }
    },
    {
      "@type": "Question",
      "name": "De que forma o treino caótico melhora a mira e o tracking em jogos de tiro (FPS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos como Apex Legends, Overwatch 2 e CS2, oponentes usam strafe errático e mudanças rápidas de direção. Treinar recuperação sacádica encurta a perda de foco e acelera a re-aquisição da mira sobre adversários evasivos."
      }
    },
    {
      "@type": "Question",
      "name": "Por que é fundamental manter a cabeça fixa durante o teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mover a cabeça ativa o reflexo vestíbulo-ocular (RVO) através dos canais semicirculares do ouvido interno, mascarando o déficit dos músculos oculares. Isolar a cabeça garante que apenas os seis músculos extraoculares façam o trabalho neuromuscular."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a recomendação ideal de tempo e frequência diária de treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões diárias de 5 a 10 minutos (5 a 8 séries de 60 segundos). Como o rastreamento caótico demanda altíssima atenção visual e dezenas de sacadas corretivas por minuto, volumes curtos preservam a integridade sináptica e evitam fadiga ocular."
      }
    },
    {
      "@type": "Question",
      "name": "O que fazer quando a velocidade aumenta e o alvo é completamente perdido de vista?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se o alvo for perdido, resista ao impulso de varrer a tela a esmo. Foque na área central imediata, detecte o movimento periférico e lance uma única sacada resoluta em direção ao novo vetor. Reduza para 0.8x se as perdas forem frequentes."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o impacto da taxa de atualização do monitor (Hz) na acurácia do rastreamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de alta taxa (144 Hz, 240 Hz ou mais) diminuem o atraso de exibição para menos de 4 ms (Woods et al., 2015). Isso permite que os olhos percebam a curvatura da rota dezenas de milissegundos antes, viabilizando sacadas de recuperação mais limpas."
      }
    },
    {
      "@type": "Question",
      "name": "O exercício traz transferência real para esportes convencionais como tênis e futebol?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Bolas com efeito, desvios no ar e rebotes inesperados desafiam a estabilidade foveal exatamente da mesma forma. Atletas com recuperação sacádica rápida conseguem manter o contato visual com a bola mesmo após deflexões acentuadas."
      }
    },
    {
      "@type": "Question",
      "name": "O teste de perseguição caótica direcional é gratuito e seguro para praticar diariamente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, a ferramenta é totalmente gratuita, roda nativamente no navegador sem instalação ou cadastro, e todos os seus tempos e dados de desempenho permanecem guardados exclusivamente na memória local do seu dispositivo."
      }
    }
  ]
};

const guideProps = {
  heading: "Fundamentos Neurocientíficos do Rastreamento Caótico e Recuperação Sacádica",
  intro: [
    "A perseguição visual convencional frequentemente apoia-se em trajetórias periódicas ou geométricas previsíveis, permitindo que os núcleos cerebelares substituam o feedback sensorial em tempo real por um modelo motor antecipatório (Bahill, Iandolo, & Troost, 1980). A Perseguição Caótica Direcional (Directional Chaos Pursuit) extingue essa simplificação: perturbações vetoriais contínuas e colisões de borda eliminam qualquer possibilidade de previsão motora, obrigando o córtex visual a operar sob estrito controle reflexivo de malha fechada (Closed-Loop Tracking).",
    "Dinâmica da Recuperação Sacádica e Retinal Slip: quando o alvo inverte seu vetor ou acelera de modo estocástico, a velocidade angular ultrapassa o limiar da perseguição lenta (~30°/s), projetando a imagem fora da fóvea central. O córtex visual e o colículo superior calculam o vetor de erro e disparam uma sacada corretiva (Catch-up Saccade) em 150 a 200 ms (Rashbass, 1961; Krauzlis, 2004; Barnes, 2008). A rapidez com que o sistema recupera o foco e restabelece a perseguição contínua dita a superioridade do controle oculomotor em cenários dinâmicos de alta pressão.",
    "Hardware e Amostragem Temporal: monitores convencionais a 60 Hz introduzem até 16,7 ms de latência de exibição visual, ao passo que telas de 144 Hz ou 240 Hz comprimem essa latência para menos de 4,2 ms (Woods et al., 2015). A prática diária nesta ferramenta opera 100% no navegador, preservando a privacidade integral e o armazenamento local de métricas."
  ],
  benchmarks: {
    title: "Padrões de Desempenho em Rastreamento Caótico e Recuperação Sacádica",
    headers: ["Nível de Desempenho", "Multiplicador de Velocidade", "Tempo de Refixação e Estabilidade Ocular", "Perfil Neuromotor e Oculomotor"],
    rows: [
      ["Nível 1: Apex Reativo – Reflexos de Elite", "2.0x+ Ultra-Velocidade", "Sacada corretiva dispara imediatamente após a inflexão; refixação contínua sem oscilação sobre o novo vetor.", "Velocidade sináptica máxima entre a retina periférica e os centros motores oculares. Padrão de elite em esportes de alta velocidade e esports."],
      ["Nível 2: Recuperação Sacádica Superior", "1.4x – 1.9x Alta Velocidade", "Recentralização ágil com oscilação residual mínima; retoma perseguição lenta em menos de 180 ms.", "Excelente coordenação dos músculos retos e oblíquos externos. Rápida adaptação a mudanças bruscas de trajetória."],
      ["Nível 3: Padrão Funcional Sólido", "1.0x – 1.3x Velocidade Padrão", "Acompanhamento consistente da trajetória média; breve retardo latente diante de quiques em ângulos agudos.", "Faixa típica de adultos saudáveis. Plenamente adequada para direção defensiva, esportes recreativos e jogos."],
      ["Nível 4: Refixação Tardia – Requer Treino", "0.7x – 0.9x Velocidade Moderada", "O alvo escapa com frequência da fóvea; são necessárias múltiplas sacadas corretivas sucessivas para reencontrar o vetor.", "Latência sensoriomotora elevada em inversões direcionais; recomenda-se praticar inicialmente em velocidades reduzidas."],
      ["Nível 5: Instabilidade Inicial – Iniciante", "< 0.7x Baixa Velocidade", "Perda frequente do campo visual; o olhar dispersa pela tela em busca do alvo em vez de acompanhá-lo fluidamente.", "Controle básico de motilidade ocular deve ser desenvolvido em trajetórias lineares ou sinusoidais previsíveis antes deste teste."]
    ],
    note: "Valores de referência baseados na cinemática de respostas oculomotoras e correção sacádica sob movimento caótico (Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965)."
  },
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/pt/drills/visual-tracking/constant-slow-pursuit", label: "Perseguição Ocular Lenta (Constant Slow)" },
    { href: "/pt/drills/visual-tracking/sine-wave-pursuit", label: "Rastreamento em Onda Senoidal (Sine Wave)" },
    { href: "/pt/drills/visual-tracking/infinity-pursuit", label: "Rastreamento em Infinito (Figure-8)" },
    { href: "/pt/drills/visual-tracking/dynamic-evasion-pursuit", label: "Perseguição Evasiva Dinâmica (Dynamic Evasion)" }
  ]
};

export default function DirectionalChaosPursuitPagePt() {
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
      <DirectionalChaosPursuitClient
        copy={{
          title: "Perseguição Caótica Direcional – Rastreamento Ocular",
          subtitle: "Treino de Recuperação Sacádica e Refixação Foveal Imediata",
          description: "Ao contrário de trajetórias geométricas previsíveis, este exercício impõe perturbações contínuas de velocidade e colisões elásticas estocásticas. O sistema oculomotor é forçado a abandonar predições cerebelares e operar em controle reflexivo de malha fechada, acionando microssacadas corretivas de alta velocidade para restaurar o ganho de perseguição lenta sobre a fóvea central (Bahill et al., 1980; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/pt/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
