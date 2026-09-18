import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// PESQUISA DE PALAVRAS-CHAVE NATIVAS (SERP BRASIL / PT-BR)
// Termos de busca de alta intenção e baixa concorrência:
// - "teste de coordenacao motora mao e olho" (Busca de alta intenção neurofuncional)
// - "exercicios de coordenacao motora fina" (Treinamento neuromotor e destreza)
// - "cruzamento da linha media corporal" (Conceito de integração sensorial e controle bilateral)
// - "treino de coordenacao bilateral" (Capacidade neuromuscular inter-hemisférica)
// - "teste de reflexo e coordenacao motora" (Avaliação online e benchmarking)
// - "flick diagonal mouse aim" (Mecânica de mira diagonal em eSports / FPS)
// - "coordenacao visomotora teste online" (Teste funcional visomotor sem download)
// - "jogo de coordenacao motora gratis" (Busca lúdica para desktop e navegador)
// ============================================================

export const metadata = {
  title: "Coordenação Mão e Olho – Linha Média | SkillDrills",
  description: 'Teste de coordenação mão e olho online grátis. Conecte nós diagonais na tela para treinar coordenação bilateral e cruzamento de linha média no PC.',
  keywords: [
    "teste de coordenacao motora mao e olho",
    "exercicios de coordenacao motora fina",
    "cruzamento da linha media corporal",
    "treino de coordenacao bilateral",
    "teste de reflexo e coordenacao motora",
    "flick diagonal mouse aim",
    "coordenacao visomotora teste online",
    "jogo de coordenacao motora gratis",
    "controle motor contralateral",
    "mira diagonal fps"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "Coordenação Mão e Olho – Linha Média | SkillDrills",
    description: 'Teste de coordenação mão e olho online grátis. Conecte nós diagonais na tela para treinar coordenação bilateral e cruzamento de linha média no PC.',
    url: 'https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Coordenação Mão e Olho – Linha Média | SkillDrills",
    description: 'Teste de coordenação mão e olho online grátis. Conecte nós diagonais na tela para treinar coordenação bilateral e cruzamento de linha média no PC.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills Início",
      "item": "https://skilldrills.online/pt"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Treinamento Físico",
      "item": "https://skilldrills.online/pt/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Coordenação Motora",
      "item": "https://skilldrills.online/pt/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Teste de Coordenação Motora Mão e Olho",
      "item": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Coordenação Motora Mão e Olho & Treino Bilateral",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Ferramenta neurofuncional para avaliação e treinamento de controle motor contralateral e coordenação visomotora cruzando a linha média da tela.",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/pt"
  },
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Treinador de Coordenação Mão e Olho",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno compatível com HTML5 Canvas e Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Coordenação Motora Visomotora (Cross-Body Movement)",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement",
  "description": "Treinamento dinâmico de varredura diagonal e cruzamento da linha média para aprimoramento de reflexos, transferência inter-hemisférica e mira em FPS.",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Hand-Eye Training",
    "Action"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que avalia exatamente o teste de coordenação motora mão e olho com cruzamento de linha média?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste mensura a integração neural entre a percepção espacial no córtex parietal, a resposta visual do córtex occipital e a execução motora fina no córtex motor primário. Ao forçar varreduras diagonais através da linha média corporal, o exercício quantifica a eficiência da transferência inter-hemisférica via corpo caloso."
      }
    },
    {
      "@type": "Question",
      "name": "Por que cruzar a linha média da tela é neurologicamente mais complexo do que movimentos no mesmo lado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme comprovado por David Carey e colaboradores (1996), alcances direcionados ao espaço contralateral (lado oposto ao membro que executa a ação) sofrem um atraso de latência neural e maior dispersão de erro cinemático quando comparados a trajetórias ipsilaterais, exigindo maior sincronização entre ambos os hemisférios cerebrais."
      }
    },
    {
      "@type": "Question",
      "name": "De que maneira este exercício melhora o desempenho da mira em jogos de tiro como Valorant e CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A maioria dos jogadores treina apenas microajustes horizontais. No entanto, confrontos com desníveis verticais ou redefinições rápidas de mira em 180 graus exigem flicks diagonais amplos. O treino fortalece a alavanca do antebraço e do cotovelo, garantindo que a mira não trace arcos indesejados ao atravessar o mousepad."
      }
    },
    {
      "@type": "Question",
      "name": "Como a tolerância do corredor e o tamanho dos nós evoluem ao longo dos 15 níveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A dificuldade escala a cada 250 pontos conquistados. A largura de tolerância da trajetória do corredor diminui progressivamente de 10 pixels no nível inicial para apenas 4 pixels nos níveis finais, enquanto o raio dos nós de clique encolhe de 16 pixels para 8 pixels, exigindo precisão micrométrica sob alta velocidade."
      }
    },
    {
      "@type": "Question",
      "name": "Sair dos limites do corredor acarreta perda de pontos ou redução do tempo de prova?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não há penalidade em pontos negativos nem redução no cronômetro fixo de 45 segundos. Entretanto, flutuar para fora da faixa de tolerância reinicia imediatamente o multiplicador de sequência (combo) para 1.0x, incentivando varreduras firmes e contínuas sem hesitação."
      }
    },
    {
      "@type": "Question",
      "name": "Qual configuração de sensibilidade e área de mousepad é recomendada para movimentos diagonais amplos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se sensibilidade média a baixa (entre 30 a 45 cm por volta de 360 graus) combinada a um mousepad amplo (mínimo de 450 mm de largura). Isso possibilita executar varreduras diagonais completas pelo antebraço sem a necessidade de levantar o mouse repetidamente."
      }
    },
    {
      "@type": "Question",
      "name": "Por que devo pivotar pelo cotovelo e antebraço em vez de utilizar somente o pulso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A articulação do punho é anatomicamente limitada a rotações angulares que geram naturalmente trajetórias em arco curvo. Para produzir vetores diagonais perfeitamente retilíneos dentro de tolerâncias de 4 pixels, o antebraço deve atuar como alavanca contínua apoiada no cotovelo."
      }
    },
    {
      "@type": "Question",
      "name": "Como aplicar o modelo de controle em duas fases de Woodworth para cravar no nó alvo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo a teoria de Robert Woodworth (1899), deve-se executar 75% da distância em velocidade balística máxima impulsionada pelo antebraço e utilizar os últimos 25% para aplicar leve fricção com as pontas dos dedos e a base da mão contra o mousepad, realizando uma desaceleração terminal controlada por feedback visual."
      }
    },
    {
      "@type": "Question",
      "name": "Qual estratégia é indispensável para alcançar a pontuação mestre de 17.000 pontos (Apex Bilateral)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É imperativo antecipar a fixação ocular (gaze feedforward): no instante exato em que o cursor toca o nó A, os olhos já devem estar cravados nas coordenadas do nó B. Manter o multiplicador máximo de 3.0x durante toda a sessão e sustentar mais de 92% de precisão nos níveis 12 a 15 são condições essenciais."
      }
    },
    {
      "@type": "Question",
      "name": "Os dados de desempenho e pontuações do teste são armazenados de forma privada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Todos os registros de pontuação, combos e métricas cinemáticas são processados e armazenados localmente no navegador por meio de LocalStorage e performance.now(). Nenhuma informação individual ou telemetria pessoal é transferida para servidores externos."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Execução do Teste de Coordenação Motora e Varredura Diagonal",
  "description": "Instruções passo a passo para conectar nós diagonais cruzando a linha média da tela e maximizar a pontuação.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ativação do Nó Inicial A",
      "text": "Posicione a mira sobre o nó ciano pulsante localizado na borda da tela para disparar o vetor de conexão bilateral.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement#passo-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Varredura Diagonal Através da Linha Média",
      "text": "Deslize o cursor suavemente em linha reta através do centro da tela mantendo-se dentro dos limites luminosos do corredor de tolerância.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement#passo-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Impacto no Nó Terminal B",
      "text": "Atinja o nó magenta no canto oposto para fechar o circuito vetorial, detonando a animação de partículas e somando os pontos do nível.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement#passo-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Construção e Sustentação de Combo",
      "text": "Encadeie conexões sem desviar do corredor para elevar o multiplicador até 3.0x e sustentar pontuação máxima durante os 45 segundos.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/cross-body-movement#passo-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "Fundamentação Neurocientífica: Cruzamento da Linha Média e Controle Motor Bilateral",
  subtitle: "Integração sensorial de Ayres, assimetria contralateral de Carey e o modelo bifásico de Woodworth aplicados à motricidade fina",
  intro: [
    "O exercício de coordenação motora com cruzamento da linha média (Cross-Body Movement) desafia os sistemas visuomotores a traçarem trajetórias diagonais contínuas que transpassam o eixo sagital do corpo. Ao contrário de movimentos lineares em quadrantes isolados, a transposição da linha média espacial demanda uma intensa atividade sináptica através do corpo caloso para unificar o controle muscular do membro ativo em espaço contralateral.",
    "A pioneira da integração sensorial, Dra. A. Jean Ayres (1972), estabeleceu que a capacidade de cruzar a linha média corporal reflete a maturidade da comunicação inter-hemisférica e da organização postural neuromuscular. Em investigações contemporâneas de cinemática motora, David Carey, Hargreaves e Goodale (1996) demonstraram que movimentos de alcance direcionados ao hemicampo contralateral apresentam sistematicamente maior tempo de desaceleração e aumento no desvio de trajetória em relação a alvos no mesmo lado. Este treino foi concebido para mitigar essa defasagem proprioceptiva.",
    "A dinâmica do exercício é regida pelos princípios da Lei de Fitts (1954): à medida que os níveis avançam, a razão entre a distância percorrida e a tolerância espacial do trajeto eleva exponencialmente o Índice de Dificuldade (ID). A faixa permissiva do corredor estreita-se de 10 para 4 pixels e os nós encolhem para 8 pixels. Para triunfar sob tais restrições, o praticante deve dominar o modelo de duas fases de Robert Woodworth (1899): aceleração balística na porção primária do vetor (75%) combinada a frenagem micrométrica por controle contínuo terminal (25%).",
    "Garantia de exatidão instrumental: Este teste processa suas coordenadas em tempo real via performance.now() com precisão sub-milissegundo. A resposta cinemática pode apresentar variações sutis conforme a taxa de atualização do monitor (60Hz equivalendo a 16.6ms, 144Hz a 6.9ms e 240Hz a 4.1ms) e a frequência de amostragem do mouse. Flutuações inferiores a 5ms estão dentro da margem de tolerância física."
  ],
  benchmarks: {
    title: "Tabela de Classificação e Benchmarks de Coordenação Visomotora (5 Níveis)",
    headers: ["Nível / Rank", "Título de Mestria", "Pontuação Alvo", "Nível de Pico", "Precisão Vetorial", "Perfil Neurofisiológico"],
    rows: [
      ["Tier 1: Mestre Bilateral Absoluto", "Apex Bilateral Master", "17.000+ pontos", "Nível 12 – 15", "≥ 92% de acerto", "Comunicação inter-hemisférica de elite (top 0,1%); varreduras perfeitas em canal estreito de 4px com pivô de cotovelo estável (Ayres 1972; Fitts 1954)"],
      ["Tier 2: Varredor de Linha Média Elite", "Elite Midline Sweeper", "13.000 – 16.999 pts", "Nível 9 – 11", "85 – 91% de acerto", "Excelente aceleração em espaço contralateral com transição suave para desaceleração terminal de Woodworth (Carey et al. 1996)"],
      ["Tier 3: Rastreador Vetorial Avançado", "Advanced Vector Tracer", "9.500 – 12.999 pts", "Nível 6 – 8", "76 – 84% de acerto", "Coordenação olho-mão sólida para jogos competitivos; leve dispersão cinemática quando o canal atinge 6px"],
      ["Tier 4: Conector Intermediário", "Intermediate Node Connector", "6.000 – 9.499 pts", "Nível 3 – 5", "65 – 75% de acerto", "Média funcional padrão; quebras frequentes de combo provocadas por rigidez no punho ao efetuar trajetórias diagonais"],
      ["Tier 5: Aprendiz Diagonal Inicial", "Novice Diagonal Learner", "< 6.000 pontos", "Nível 1 – 2", "< 65% de acerto", "Dificuldade na transposição do eixo corporal central; tendência a realizar trajetórias curvilíneas em arco com perda de trajetória"]
    ],
    note: "Benchmarks calculados com base na teoria de integração sensorial (Ayres 1972), assimetria motora contralateral (Carey et al. 1996) e constantes cinemáticas de Fitts (1954)."
  },
  techniques: {
    title: "Diretrizes Práticas para Aperfeiçoamento da Mira Diagonal e Coordenação Bilateral",
    items: [
      {
        name: "Alinhamento Corporal Central e Eixo Sagital (Ayres Midline Alignment)",
        desc: "Posicione a cadeira e o tórax em alinhamento rigoroso com o ponto central do monitor. Evite girar o tronco durante as varreduras para que o movimento recaia genuinamente sobre a musculatura do braço cruzando o plano medial.",
        tips: "Mantenha os ombros relaxados e utilize o cotovelo como ponto de apoio deslizante sobre a mesa."
      },
      {
        name: "Antecipação Ocular Feedforward (Contralateral Target Fixation)",
        desc: "Conforme comprovado nos estudos de Carey (1996), perseguir visualmente o cursor do mouse eleva a latência. Assim que o nó A for tocado, transfira imediatamente o foco ocular para as coordenadas do nó B no extremo oposto.",
        tips: "Deixe que o sistema motor periférico guie a mão até o alvo enquanto seus olhos permanecem firmes no destino."
      },
      {
        name: "Frenagem Terminal Micrométrica de Woodworth (Current-Control Braking)",
        desc: "Aplique aceleração vigorosa no primeiro trecho do vetor e pressione suavemente as pontas dos dedos e a almofada da mão contra o mousepad nos últimos 20% do trajeto.",
        tips: "Essa leve fricção física absorve a energia cinética do braço e impede que o cursor ultrapasse o nó alvo de 8 pixels."
      },
      {
        name: "Pivô Mecânico no Cotovelo vs. Vício de Rotação do Punho (Elbow Pivot)",
        desc: "Articulações de punho geram arcos parabólicos que rompem instantaneamente corredores estreitos de 4px. Trave o punho em posição neutra e realize o traçado utilizando a alavanca conjugada de antebraço e cotovelo.",
        tips: "Assegure-se de que o cabo do mouse possua folga suficiente ou utilize um mouse bungee para eliminar atritos assimétricos."
      }
    ]
  },
  steps: [
    "Sente-se com a coluna ereta e alinhe o centro do peito com o ponto médio da tela.",
    "Ao soar o cronômetro, posicione a mira sobre o nó ciano que desponta na borda do display.",
    "Deslize o cursor diagonalmente pelo centro da tela respeitando a margem luminosa do corredor.",
    "Conecte o nó magenta no canto oposto e preserve o multiplicador de 3.0x durante toda a rodada de 45 segundos."
  ]
};

export default function CrossBodyMovementPagePt() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CrossBodyMovementClient
        copy={{
          title: "Teste de Coordenação Motora Mão e Olho",
          subtitle: "Cruzamento da Linha Média & Controle Motor Bilateral • 15 Níveis",
          hudLabels: {
            score: "Pontuação",
            timeLeft: "Tempo Restante",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo"
          },
          rulesTitle: "Regras do Teste de Coordenação e Pontuação",
          rules: [
            { title: "Ativação do Nó Inicial", text: "Toque o nó ciano na margem da tela com o cursor para iniciar o traçado vetorial." },
            { title: "Varredura Diagonal na Linha Média", text: "Percorra o trajeto diagonal sem ultrapassar os limites laterais do corredor estreito." },
            { title: "Conexão e Acúmulo de Combo", text: "Atinja o nó alvo magenta para concluir o vetor, somar pontos e expandir o multiplicador." },
            { title: "Margem de Tolerância e Reset", text: "Desviar do corredor reinicia o multiplicador para 1.0x, sem deduzir pontos ou tempo." }
          ],
          aboutTitle: "Sobre o Treinamento de Coordenação Motora",
          aboutHeading: "Neurofisiologia do Cruzamento da Linha Média e Integração Bilateral",
          aboutText: "Este exercício fundamenta-se nos preceitos de Integração Sensorial de Jean Ayres (1972) e nas investigações cinemáticas de David Carey (1996). Varreduras diagonais que cruzam o eixo central do corpo exigem intensa comunicação inter-hemisférica através do corpo caloso, treinando o sistema neuromuscular para executar transições visomotoras e flicks amplos de 180 graus com extrema estabilidade e sem distorções em arco.",
          aboutCards: [
            {
              title: "Público-Alvo",
              desc: "Gamers competitivos aprimorando flicks diagonais e resets amplos de mira, atletas em desenvolvimento visomotor e indivíduos buscando refinar a coordenação motora fina."
            },
            {
              title: "Benefícios Neurológicos",
              desc: "Ativação sináptica inter-hemisférica, controle de desaceleração agonista-antagonista e erradicação de atrasos neuromotores em espaço contralateral."
            },
            {
              title: "Progressão Dinâmica",
              desc: "O corredor estreita progressivamente de 10px para 4px, os nós diminuem de 16px para 8px e as distâncias diagonais expandem-se até os cantos extremos."
            }
          ]
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="pt"
        />
      </div>
    </>
  );
}
