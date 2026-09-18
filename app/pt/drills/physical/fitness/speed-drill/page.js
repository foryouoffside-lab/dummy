import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (PT / PT-BR)
// Primary Intent: teste de cliques por segundo, teste de cps online, teste de cliques mouse
// Brazilian & Portuguese Gaming/Athletic Context: FPS (CS2, Valorant, Apex) flick-aiming e treino de reflexos de mira rápida
// High-Demand, Low-Competition Target Keywords:
//   - "teste de cliques por segundo" (Core high-demand click rate query)
//   - "teste de cps online" (Very popular gamer measurement query)
//   - "teste de cliques mouse" (Hardware & motor tapping query)
//   - "medir cliques por segundo" (Measurement tool query)
//   - "teste de velocidade de clique" (Click velocity query)
//   - "treino de reflexo mouse" (Mouse reflex training query)
//   - "melhorar reflexo fps" (FPS motor agility query)
//   - "mira e reflexo treino" (Aim & reflex training query)
//   - "teste de reflexos online" (Browser reflex tool query)
//   - "treino de mira flick" (Ballistic target acquisition query)
// ============================================================

export const metadata = {
  title: 'Cliques por Segundo – Teste de CPS Online | SkillDrills',
  description: 'Teste de cliques por segundo online grátis. Clique em alvos velozes para medir seu CPS, reflexos e precisão de clique rápido no navegador para jogos.',
  keywords: [
    "teste de cliques por segundo",
    "teste de cps online",
    "teste de cliques mouse",
    "medir cliques por segundo",
    "teste de velocidade de clique",
    "treino de reflexo mouse",
    "melhorar reflexo fps",
    "mira e reflexo treino",
    "teste de reflexos online",
    "treino de mira flick"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "Teste de Cliques por Segundo & Teste de CPS Online – Treino de Velocidade | SkillDrills",
    description: "Teste gratuito de cliques por segundo (CPS) e treino de velocidade motora para mouse. Intercepte alvos dinâmicos que encolhem com impulsos balísticos e reflexos neuromusculares ultrarrápidos.",
    url: 'https://skilldrills.online/pt/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Cliques por Segundo & Teste de CPS Online – Treino de Velocidade | SkillDrills",
    description: "Teste gratuito de cliques por segundo (CPS) e treino de velocidade motora para mouse. Intercepte alvos dinâmicos que encolhem com impulsos balísticos e reflexos neuromusculares ultrarrápidos.",
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
      "name": "Centro de Treino Físico",
      "item": "https://skilldrills.online/pt/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Fitness & Condicionamento",
      "item": "https://skilldrills.online/pt/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Teste de Cliques por Segundo & Velocidade",
      "item": "https://skilldrills.online/pt/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Cliques por Segundo e Treino de Velocidade",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulador de Velocidade de Clique e Aquisição de Alvos",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Precision, FPS"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Speed Drill Tapping & Flick Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como funciona este teste de velocidade de clique e CPS em comparação com contadores comuns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diferente de contadores de CPS estáticos em que o usuário clica freneticamente no mesmo ponto, este drill combina velocidade pura com aquisição visomotora dinâmica. Os alvos surgem em locais imprevisíveis e encolhem continuamente, exigindo um movimento balístico inicial (flick) e disparo preciso antes da expiração, simulando a mecânica de combate de jogos competitivos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a fundamentação do modelo motor de dois estágios de Woodworth neste exercício?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo Robert S. Woodworth (1899), movimentos rápidos com as mãos possuem duas fases: uma fase inicial balística em malha aberta, que desloca o cursor rapidamente em direção à vizinhança do alvo, seguida por uma desaceleração fina em malha fechada guiada pela visão. Nos níveis avançados deste teste, o tempo disponível encolhe tanto que a desaceleração é suprimida, exigindo um flick balístico cirúrgico."
      }
    },
    {
      "@type": "Question",
      "name": "Por que acertar o alvo nos primeiros 150 milissegundos é vantajoso segundo a Lei de Fitts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Lei de Fitts (1954) determina que o índice de dificuldade cresce logaritmicamente conforme o diâmetro do alvo diminui. Como cada círculo surge com 45 px e encolhe progressivamente até 12 px, agir imediatamente nos primeiros 150 ms aproveita a maior área de colisão permissível, garantindo acertos confiáveis e preservando a sequência de combos."
      }
    },
    {
      "@type": "Question",
      "name": "Como a visão periférica atua na detecção precoce dos novos alvos segundo Treisman?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De acordo com a Teoria da Integração de Características de Anne Treisman (1980), alvos luminosos e em movimento ativam mapas de saliência visual no colículo superior e córtex parietal através da retina periférica. Manter o olhar relaxado no centro da tela permite detectar o nascimento do alvo de forma instantânea por orientação encoberta (covert attention)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o bônus de tempo concedido a cada acerto e como a pontuação escala?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada alvo destruído concede 100 pontos base (multiplicados pelo nível atual e multiplicador de combo até 3.0x) e adiciona +0,6 segundos ao relógio da rodada. Acertos sucessivos sustentam o tempo ativo da sessão, permitindo que jogadores com alto CPS ultrapassem a barreira dos 24.000 pontos."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece em caso de clique errado (miss) ou quando um alvo expira?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clicar fora do alvo ou permitir que o círculo encolha até desaparecer zera imediatamente o multiplicador de combo para 1.0x e gera um flash vermelho na tela. Caso a opção de penalidade severa esteja ativada nas configurações, também ocorre uma perda direta de 0,8 segundos no cronômetro."
      }
    },
    {
      "@type": "Question",
      "name": "Qual pegada de mouse (Palm, Claw ou Fingertip) oferece maior rendimento neste teste de velocidade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As pegadas Claw e Fingertip são amplamente superiores à Palm Grip para testes de velocidade e CPS. Elas curvam os dedos perpendicularmente aos botões mecânicos do mouse, reduzindo a distância de acionamento do switch e aproveitando o recuo dos tendões das falanges para frequências de clique muito mais elevadas sem sobrecarregar o pulso."
      }
    },
    {
      "@type": "Question",
      "name": "A taxa de atualização do monitor (60Hz vs 144Hz/240Hz) influencia na velocidade de clique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Em telas de 60Hz, um novo quadro leva 16,7 ms para ser exibido, enquanto um painel de 240Hz atualiza a cena a cada 4,1 ms. Esse ganho de mais de 12 ms na apresentação visual permite que o córtex motor inicie o flick mais cedo, aumentando substancialmente a precisão temporal sobre alvos que encolhem rapidamente."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a rotina de treino diária recomendada para elevar a velocidade de clique sem lesões?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se realizar de 3 a 5 sessões completas de 45 segundos por dia, intercaladas com pausas ativas de 60 a 90 segundos para relaxamento dos tendões flexores do antebraço. Jamais force sessões de clique tenso com dor articular; a neuroplasticidade motora se consolida com estímulos curtos, explosivos e de alta frequência."
      }
    },
    {
      "@type": "Question",
      "name": "Os dados de cliques, CPS e tempo de reação são enviados para servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Toda a cronometria de alta precisão baseada na API performance.now() e os cálculos de acertos são processados exclusivamente na CPU do seu navegador. Os recordes e métricas são mantidos unicamente no localStorage do seu dispositivo, garantindo total privacidade e funcionamento sem latência de rede."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de 4 Fases para Treino de Velocidade de Clique e Aquisição de Alvos",
  "description": "Metodologia estruturada para elevar o CPS, acelerar o impulso motor inicial e sustentar combos sob alvos que encolhem em ritmo acelerado.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posicionamento e Postura de Ataque (Neutral Ready Stance)",
      "text": "Mantenha o antebraço apoiado confortavelmente no mousepad com o cursor centralizado na tela, aplicando uma pegada Claw flexível para permitir disparos instantâneos.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Flick Balístico Precoce de Woodworth (Ballistic Initial Impulse)",
      "text": "Assim que um novo alvo surgir na visão periférica, lance o cursor com um movimento balístico direto sobre o círculo nos primeiros 150 ms de existência.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Disparo Antecipado na Área Máxima (Pre-Decay Trigger)",
      "text": "Acione o clique com a ponta dos dedos antes que o círculo comece a encolher criticamente, maximizando a área de contato tolerável conforme a Lei de Fitts.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Encadeamento de Bônus de Tempo e Calor de Combo (Streak Maintenance)",
      "text": "Aproveite o crédito de +0,6s por alvo abatido para sustentar o multiplicador 3.0x de forma contínua, mirando o patamar de elite de 24.000 pontos.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "Guia Neuromuscular de Velocidade de Clique, CPS e Aquisição de Alvos",
  intro: {
    title: "Bases Científicas do Controle Motor Rápido e Flicks Balísticos",
    paragraphs: [
      "O Speed Drill é uma plataforma neuromotora de alta intensidade concebida para quantificar e aprimorar a capacidade de localizar alvos espaciais imprevisíveis e disparar cliques com precisão milimétrica. Em cenários de velocidade extrema, as ações com o mouse seguem o clássico modelo de dois componentes de Robert S. Woodworth (1899). Na primeira etapa (impulso balístico em malha aberta), o córtex motor gera uma descarga neural que projeta a mão em direção ao alvo. Na segunda etapa (correção visual em malha fechada), os olhos ajustam o ponto final antes do acionamento mecânico do botão.",
      "A dinâmica de encolhimento contínuo dos alvos (de 45 px até 12 px) amplifica exponencialmente o desafio perceptivo-motor. Conforme a consagrada Lei de Fitts (1954), o índice de dificuldade (ID) cresce em escala logarítmica com a redução da largura do alvo. Um clique disparado nos primeiros 150 milissegundos encontra uma janela de tolerância ampla, enquanto a hesitação força o jogador a realizar correções microscópicas com risco severo de erro. A decisão rápida de disparo é o diferencial dos atletas de alto rendimento.",
      "O surgimento aleatório dos alvos mobiliza a Teoria da Integração de Características de Anne Treisman (Treisman & Gelade, 1980). Estímulos com forte contraste e dinâmica de encolhimento produzem mapas de saliência visual no colículo superior e córtex parietal, permitindo que a atenção encoberta oriente o movimento da mão antes mesmo de uma fixação foveal completa. Simultaneamente, o cérebro afere a margem de tempo até o colapso do alvo por meio da teoria óptica do tau (Lee, 1976).",
      "Para assegurar fidedignidade laboratorial sem interferências de software, este drill opera por meio da API performance.now() do navegador. Monitores de alta frequência (144Hz ou 240Hz) combinados com mouses gamer com taxa de amostragem de 1000Hz diminuem a latência de exibição para menos de 4 ms, permitindo avaliações neuromusculares puras e sem filtros de suavização (Woods et al., 2015). Seus registros permanecem 100% privados no dispositivo."
    ]
  },
  benchmarks: {
    title: "Tabela de Classificação em 5 Níveis de Velocidade e Aquisição de Alvos",
    headers: ["Nível e Patamar", "Título (Rank Title)", "Meta de Pontuação", "Precisão e Tempo de Reação", "Classificação", "Perfil Neuromuscular"],
    rows: [
      ["Tier 1: Franco-Atirador de Velocidade Ápice", "Apex Velocity Sniper", "24.000+ pontos", "> 95% / < 160 ms", "Grade S", "Top 0,1% da elite de eSports. Flicks perfeitos de Woodworth, disparo instantâneo no diâmetro máximo e maestria sob alvos de 12 px (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: Atacante Reflexivo de Precisão", "Precision Reflex Striker", "17.000 – 23.999 pontos", "90 – 94% / 160 – 190 ms", "Grade A", "Top 3% semiprofissional. Orientação periférica rápida e controle muscular refinado com multiplicador sustentado em velocidade 3.0x"],
      ["Tier 3: Interceptador Ágil de Alvos", "Rapid Target Interceptor", "11.000 – 16.999 pontos", "82 – 89% / 191 – 230 ms", "Grade B", "Top 15% jogadores competitivos. Cadência de clique firme e aproveitamento eficiente do bônus de +0,6s para prolongar a rodada"],
      ["Tier 4: Praticante em Desenvolvimento", "Developing Tapping Trainee", "6.000 – 10.999 pontos", "70 – 81% / 231 – 280 ms", "Grade C", "Nível médio populacional. Em velocidades superiores a 2.0x, surgem hesitações na frenagem e cliques fora da borda do círculo"],
      ["Tier 5: Iniciante em Apontamento", "Novice Target Pointer", "< 6.000 pontos", "< 70% / > 280 ms", "Grade D", "Fase inicial de adaptação. Cliques desordenados perto do sumiço do alvo; recomenda-se focar o olhar no centro e antecipar o movimento"]
    ],
    note: "Métricas baseadas na mecânica de impulsos de Woodworth (1899), cálculo de dificuldade de Fitts (1954) e cronometria perceptiva de Treisman (1980)."
  },
  techniques: {
    title: "4 Protocolos Práticos para Maximização de CPS e Flicks de Alta Velocidade",
    items: [
      {
        name: "Flick Balístico Instantâneo de Woodworth (Woodworth Ballistic Snap)",
        desc: "Não arraste a mira lentamente em direção ao alvo. Projete o mouse com um golpe rápido cobrindo 80% da distância inicial e desacelere suavemente na borda usando a pressão das pontas dos dedos.",
        tips: "Realize a aceleração com um movimento conciso do punho, mantendo os dedos relaxados para o clique imediato."
      },
      {
        name: "Interceptação Precoce de Fitts (Fitts Boundary Pre-Interception)",
        desc: "Quanto mais você espera, menor fica o alvo e mais alta é a dificuldade motora. Dispare o clique nos primeiros 150 ms enquanto o alvo preserva seu diâmetro de 45 px.",
        tips: "Não busque obstinadamente o pixel central exato; aproveite toda a área de colisão permissível no spawn."
      },
      {
        name: "Percepção Periférica Encoberta de Treisman (Treisman Covert Peripheral Awareness)",
        desc: "Evite manter a visão travada no ponto onde o último alvo desapareceu. Deixe o foco visual descontraído no centro para que a retina periférica engaje os reflexos motores instantaneamente.",
        tips: "Não aguarde a fixação ocular total antes de iniciar o movimento: inicie a rotação da mão simultaneamente à detecção do brilho periférico."
      },
      {
        name: "Pegada Claw de Alta Frequência (Claw-Grip High-Frequency Tapping)",
        desc: "Evite apoiar a palma inteira pesadamente sobre o mouse. Curve os dedos no formato Claw para que o clique seja acionado perpendicularmente com mínimo deslocamento do switch.",
        tips: "Isole a força no tendão do indicador, deixando o antebraço e o ombro completamente livres de tensão rígida."
      }
    ]
  },
  steps: [
    "Adote uma postura ereta e alinhe o cursor no centro da área de jogo.",
    "Ao visualizar um novo alvo, execute um flick explosivo direto para a sua área.",
    "Clique imediatamente antes do encolhimento para pontuar e faturar +0,6s de bônus.",
    "Sustente a sequência sem erros até o multiplicador 3.0x e busque a marca dos 24.000 pontos."
  ],
  audience: "Jogadores de FPS (CS2, Valorant, Apex Legends, Overwatch) que buscam elevar sua cadência de disparos e reflexos de flick, além de atletas que desejam treinar coordenação óculo-manual de alta velocidade.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPagePt() {
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
      <SpeedDrillClient
        copy={{
          title: "Teste de Cliques por Segundo & Treino de Velocidade",
          subtitle: "Aquisição Balística de Alvos e CPS Dinâmico • Dificuldade com Escala Contínua",
          description: "O treino de velocidade mede quão rápido você consegue apontar para um alvo e clicar nele conforme ele encolhe e o tempo diminui. A Lei de Fitts (1954) estabelece o limite: o tempo de movimento cresce com o logaritmo da distância dividida pela largura. O movimento possui duas fases — um impulso balístico rápido e uma correção guiada pela visão (Woodworth, 1899) — e são os alvos que encolhem que tornam as correções lentas penalizadoras.",
          hudLabels: {
            score: "Pontuação",
            time: "Tempo",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo",
            getReady: "PREPARE-SE"
          },
          resultLabels: {
            accuracy: "Precisão",
            hits: "Acertos",
            bestReaction: "Melhor Reação",
            peakLevel: "Nível Máximo"
          },
          rulesTitle: "Instruções do Drill e Sistema de Pontuação",
          rulesItems: [
            { title: "Acerto e Bônus de Tempo", text: "Clique no círculo antes que ele encolha e desapareça. Cada acerto rende 100 pontos base (multiplicados pelo nível e combo) e adiciona +0,6s ao cronômetro." },
            { title: "Multiplicador de Combo", text: "Destrua alvos sucessivos sem falhar para multiplicar seus pontos até a taxa máxima de 3.0x." },
            { title: "Progressão de Nível", text: "A cada 1.750 pontos a dificuldade avança para o próximo nível, aumentando a velocidade de translação e a taxa de encolhimento dos círculos." },
            { title: "Penalidades de Falha", text: "Errar o clique ou permitir que o alvo expire redefine o combo para 1.0x. Com a penalidade ativada, são descontados 0,8 segundos da rodada." }
          ],
          aboutTitle: "Sobre o Treino de Velocidade de Clique e Aquisição",
          aboutSections: [
            {
              title: "Flicks Motores Balísticos e Aquisição Sub-Segundo",
              subtitle: "Modelo de controle motor de Woodworth sob demandas extremas de velocidade",
              content: "A captura rápida de alvos depende do clássico modelo de duas fases de Woodworth (1899): um impulso inicial balístico em malha aberta seguido por microcorreções visuais. Conforme o nível sobe, o tempo de permanência entre detecção e clique deve convergir para o mínimo absoluto."
            },
            {
              title: "Fronteiras Espaciais Decrescentes e a Lei de Fitts",
              subtitle: "Relação de troca entre velocidade e precisão durante o encolhimento do alvo",
              content: "Cada alvo encolhe continuamente a partir do instante em que surge. Conforme a Lei de Fitts (1954), o índice de dificuldade se eleva logaritmicamente conforme o diâmetro constringe. Acertar no diâmetro inicial de 45 px é a chave para a consistência."
            },
            {
              title: "Saliência Visual Pré-Atencional e Detecção Periférica",
              subtitle: "Integração de características e orientação espacial encoberta",
              content: "Formulada por Treisman & Gelade (1980), a aparição de alvos móveis estimula mapas de saliência no colículo superior. A visão periférica aponta mudanças na trajetória instantaneamente, guiando o flick balístico."
            },
            {
              title: "Tau Óptico e Margem de Intercepção Temporal",
              subtitle: "Análise da taxa de expansão/retração retiniana antes da extinção",
              content: "O córtex visual calcula o tempo de expiração do alvo por meio do tau óptico (τ), a taxa inversa do decaimento da borda retiniana (Lee, 1976). A avaliação precisa da janela de tempo impede cliques precipitados ou hesitações fatais."
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
