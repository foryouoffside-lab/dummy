import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (PT / PT-BR)
// Primary Intent: jogo de desviar o mouse, jogo de desviar com o mouse, teste de reflexo desviar
// Brazilian Gaming & Athletic Context: Clássico jogo do mouse de desviar de bolinhas & treino de micro-movimentação para LoL e FPS
// High-Demand, Low-Competition Target Keywords:
//   - "jogo de desviar o mouse" (Core viral browser reflex game query)
//   - "jogo de desviar com o mouse" (High-intent gameplay query)
//   - "teste de reflexo desviar" (Reflex evasion assessment query)
//   - "jogo de esquiva mouse" (Evasion mechanics query)
//   - "treino de reflexo mouse" (Mouse reflex training query)
//   - "teste de reflexos online" (Browser reflex testing query)
//   - "jogo de desviar de projeteis" (Projectile dodging challenge query)
//   - "treino de micro movimentacao mouse" (Competitive esports micro-stepping drill)
//   - "coordenação motora fina mouse" (Fine motor control query)
//   - "teste de agilidade e reflexo" (Agility & motor chronometry test)
// ============================================================

export const metadata = {
  title: "Jogo de Desviar o Mouse – Teste de Reflexos | SkillDrills",
  description: "Jogo de desviar o mouse online grátis. Esquive-se de projéteis velozes com o cursor para medir reflexos motores e tempo de reação no navegador.",
  keywords: [
    "jogo de desviar o mouse",
    "jogo de desviar com o mouse",
    "teste de reflexo desviar",
    "jogo de esquiva mouse",
    "treino de reflexo mouse",
    "teste de reflexos online",
    "jogo de desviar de projeteis",
    "treino de micro movimentacao mouse",
    "coordenação motora fina mouse",
    "teste de agilidade e reflexo"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "Jogo de Desviar o Mouse – Teste de Reflexos | SkillDrills",
    description: "Jogo de desviar o mouse online grátis. Esquive-se de projéteis velozes com o cursor para medir reflexos motores e tempo de reação no navegador.",
    url: 'https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jogo de Desviar o Mouse – Teste de Reflexos | SkillDrills",
    description: "Jogo de desviar o mouse online grátis. Esquive-se de projéteis velozes com o cursor para medir reflexos motores e tempo de reação no navegador.",
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
      "name": "Treino de Reflexos",
      "item": "https://skilldrills.online/pt/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Jogo de Desviar o Mouse & Quick Dodge",
      "item": "https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jogo de Desviar o Mouse e Treinador de Esquiva Kinetica",
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
  "name": "Simulador de Esquiva de Projéteis e Modelos Preditivos Cerebelares",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Evasion, Esports"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Quick Dodge Cursor Evasion Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Por que desviar de projéteis velozes é um problema de predição e não apenas de reação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando um projétil viaja a 400–600 px/s, o atraso neurológico do feedback visual (100 a 150 ms) faz com que qualquer reação puramente reativa chegue tarde demais. Conforme demonstrado por Mitsuo Kawato (1999), o cerebelo utiliza modelos internos de avanço (Forward Models) para simular a trajetória futura em malha aberta, antecipando o movimento para uma zona segura antes do impacto."
      }
    },
    {
      "@type": "Question",
      "name": "Por que fugir para os cantos da tela é a pior estratégia em níveis avançados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ao levar o cursor para as bordas ou cantos, o leque de escape físico é reduzido para menos de 90 graus, facilitando o encurralamento por projéteis cruzados. A estratégia dos mestres consiste em manter a base nos 30% centrais da tela, permitindo saídas em 360 graus com micro-ajustes milimétricos."
      }
    },
    {
      "@type": "Question",
      "name": "Como a pontuação e os multiplicadores de combo se acumulam durante a partida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cada segundo de sobrevivência pontos contínuos são somados. Quando você realiza uma 'raspagem rente' (Close Shave) passando a poucos pixels de uma esfera, o combo salta rapidamente até o teto de 3.0x. Completar os 45 segundos sem colisões é o único meio de ultrapassar a barreira de elite de 24.000 pontos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a precisão do ponto de colisão (hitbox) do cursor do mouse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O cursor possui um ponto vital central calibrado com raio estrito de 4 px. A distância euclidiana até as esferas em movimento (raio de 10 a 25 px) é calculada a nível de subpixel a cada quadro por meio da API performance.now(), eliminando imprecisões de contato."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a penalidade aplicada caso o cursor seja atingido por uma esfera?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qualquer contato físico com um projétil dispara um clarão de alerta vermelho na tela, reduz a vida útil da rodada e zera instantaneamente todo o multiplicador de combo para 1.0x, destruindo a velocidade de pontuação."
      }
    },
    {
      "@type": "Question",
      "name": "Este treino de esquiva ajuda no desvio de skillshots em jogos como LoL e Valorant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, diretamente. O exercício condiciona os mesmos circuitos neurais de 'leitura visual de vetor e micro-frenagem de punho' necessários para desviar de habilidades lineares no League of Legends ou realizar strafes e contra-movimentações evasivas em jogos de tiro como Valorant e CS2."
      }
    },
    {
      "@type": "Question",
      "name": "Qual estilo de pegada do mouse (Grip) oferece melhor rendimento na esquiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As pegadas Fingertip e Claw são muito superiores à Palm Grip. Elas permitem que o jogador execute guinadas e correções de 5 a 15 px movimentando apenas a articulação das falanges, sem a inércia pesada de arrastar todo o antebraço pelo mousepad."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a vantagem de utilizar monitores de 144Hz ou 240Hz em jogos de esquiva rápida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em 60Hz, um projétil rápido salta cerca de 8,3 px por quadro, gerando borrões cinéticos. Em 240Hz (4,1 ms por quadro), o salto cai para apenas 2,1 px, fornecendo uma leitura fluida da trajetória que torna a previsão dos espaços vazios muito mais confiável."
      }
    },
    {
      "@type": "Question",
      "name": "Como evitar fadiga muscular ou lesões no punho durante sessões de micro-movimentação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segure o mouse com suavidade, sem apertar os botões com força excessiva. Apoie o antebraço confortavelmente e faça pausas ativas de 60 segundos a cada 3 rodadas para alongar e soltar os tendões flexores dos dedos."
      }
    },
    {
      "@type": "Question",
      "name": "Meus registros de pontuação e estatísticas são salvos em servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Toda a mecânica de renderização e cronometria é processada localmente na CPU do seu navegador. Seus recordes permanecem salvos exclusivamente no localStorage do seu aparelho com total privacidade."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo em 4 Etapas para Esquiva de Projéteis e Micro-Movimentação Preditiva",
  "description": "Metodologia prática para prever vetores de colisão, preservar espaço no centro e sustentar combos de 3.0x sob densidade máxima.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Calibração Neutra no Centro (Center Calibration)",
      "text": "Alinhe o cursor no centro do tabuleiro e posicione os dedos na pegada Fingertip para permitir impulsos imediatos em 360 graus.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Predição Trajetorial de Kawato (Kawato Trajectory Prediction)",
      "text": "Observe os projéteis emergindo nas bordas e antecipe os vazios deixados pelo cruzamento das esferas em vez de reagir tardiamente.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Esquiva Milimétrica por Micro-Ajuste (Micro-Evasion Snapping)",
      "text": "Evite movimentos circulares amplos. Desvie passando a 5–10 px das esferas com toques curtos dos dedos para conservar a área útil.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Manutenção do Calor de Combo (Streak Heat Maintenance)",
      "text": "Sobreviva aos 45 segundos sem nenhuma colisão para manter o multiplicador no teto de 3.0x e alcançar mais de 24.000 pontos.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/quick-dodge#step-4"
    }
  ]
};

const dodgeGuide = {
  heading: "Guia de Biomecânica da Esquiva com Mouse, Dinâmica de Projéteis e Modelos Cerebelares",
  intro: {
    title: "Bases Científicas dos Modelos Internos de Kawato e Flicks Evasivos de Woodworth",
    paragraphs: [
      "O Quick Dodge é uma plataforma avançada de treinamento perceptivo-motor concebida para lapidar a capacidade de navegar através de densas tempestades de projéteis com manobras microscópicas de mouse. Mais do que um mero teste de reação visual passiva, o exercício demanda a resolução proativa de problemas de intercepção espacial inversa: calcular vazios transitórios em um ambiente dinâmico sob constante aceleração.",
      "Segundo a teoria dos modelos internos cerebelares de Mitsuo Kawato (1999), a velocidade dos projéteis (superando 500 px/s) inviabiliza a correção contínua por feedback visual direto devido ao atraso de latência aferente (100 a 150 ms). O cérebro humano sobrevive antecipando a cinemática dos corpos: ao captar o ângulo de nascimento de uma esfera, o cerebelo dispara um programa motor balístico em malha aberta pré-calculado para posicionar a mão na rota de menor risco.",
      "Conforme o modelo de controle motor bifásico de Robert S. Woodworth (1899), cada ação rápida inicia-se com um impulso de aceleração aberto e finaliza-se com uma frenagem de precisão. Em velocidades críticas, a Lei de Fitts (1954) dita que a redução da área livre (W) eleva dramaticamente o índice de dificuldade. Realizar movimentos excessivamente longos desperdiça espaço e sela a derrota; o domínio pertence à micro-movimentação contida em raios inferiores a 15 px.",
      "Para garantir fidelidade temporal sem desvios, o simulador opera por meio da API performance.now() do navegador. Em telas de 144Hz ou 240Hz acopladas a mouses gamer de 1000Hz de polling rate, o atraso de exibição é reduzido para menos de 4 ms, eliminando borrões em velocidades extremas e assegurando precisão pura (Woods et al., 2015). Seus dados ficam salvos unicamente no seu dispositivo."
    ]
  },
  benchmarks: {
    title: "Tabela Oficial de Classificação em 5 Níveis para Esquiva com Mouse",
    headers: ["Nível e Categoria", "Título (Rank Title)", "Meta de Pontuação", "Taxa de Sobrevivência e Velocidade", "Classificação", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Mestre Supremo de Esquiva Cinética", "Apex Kinetic Evader", "24.000+ pontos", "> 95% / 500+ px/s", "Grade S", "Top 0,1% da elite de eSports. Predição cerebelar perfeita de Kawato e micro-movimentação impecável entre mais de 50 projéteis (Kawato 1999; Woodworth 1899)"],
      ["Tier 2: Estrategista de Trajetória Precisa", "Precision Trajectory Striker", "17.000 – 23.999 pontos", "90 – 94% / 400 – 499 px/s", "Grade A", "Top 3% semiprofissional. Excelente controle de espaço e posicionamento central estável sob fogo intenso"],
      ["Tier 3: Piloto Ágil de Evasão", "Skilled Evasion Pilot", "11.000 – 16.999 pontos", "82 – 89% / 300 – 399 px/s", "Grade B", "Top 15% jogadores competitivos. Controle consistente de punho e boa capacidade de leitura precoce das ameaças"],
      ["Tier 4: Praticante em Desenvolvimento", "Developing Dodger", "6.000 – 10.999 pontos", "70 – 81% / 200 – 299 px/s", "Grade C", "Média da população adulta. Tendência a fugir para os cantos em velocidades elevadas; recomenda-se treino de recentralização"],
      ["Tier 5: Iniciante em Esquiva Motora", "Novice Evasion Trainee", "< 6.000 pontos", "< 70% / < 200 px/s", "Grade D", "Fase inicial. Colisões frequentes por atraso visual; recomenda-se relaxar a mão e ampliar o foco para a tela inteira"]
    ],
    note: "Critérios objetivos baseados nos modelos de Kawato (1999), análise bifásica de Woodworth (1899) e escala de dificuldade de Fitts (1954)."
  },
  techniques: {
    title: "4 Protocolos Práticos para Esquiva de Projéteis e Maestria de Mouse",
    items: [
      {
        name: "Anticipação Cerebelar de Kawato (Kawato Cerebellar Anticipation)",
        desc: "Não espere o projétil se aproximar para reagir. Identifique a trajetória no instante em que ele surge na borda e posicione o cursor na brecha vazia que surgirá no cruzamento.",
        tips: "Foque o olhar nos espaços vazios entre as esferas, e não nas esferas em si."
      },
      {
        name: "Micro-Frenagem com as Pontas dos Dedos (Woodworth Micro-Snap)",
        desc: "Evite varreduras circulares amplas. Restrinja seus deslocamentos a raios de 10 a 20 px e utilize a pressão das falanges para estancar o mouse com firmeza.",
        tips: "Use a base do mousepad como apoio estável para impedir deslizamentos involuntários."
      },
      {
        name: "Disciplina de Ancoragem Central (Central Anchoring Discipline)",
        desc: "Fugir para a parede ou canto fecha as saídas em 90 graus e causa morte rápida. Imediatamente após desviar de uma onda, retorne o cursor para a zona central de 30%.",
        tips: "Crie o reflexo automático de 'desviar e recentralizar' em um único ciclo fluído."
      },
      {
        name: "Varredura Periférica Panorâmica (Peripheral Cluster Scanning)",
        desc: "Não fixe os olhos fixamente na ponta da seta. Mantenha o olhar aberto sobre toda a área de jogo e controle a posição do cursor através da propriocepção.",
        tips: "Manter o foco difuso no centro revela o padrão e o fluxo de todas as ameaças de forma integrada."
      }
    ]
  },
  steps: [
    "Adote uma postura equilibrada e alinhe o cursor no centro do tabuleiro.",
    "Antecipe a trajetória das esferas emergentes e desloque o mouse minimamente para os espaços seguros.",
    "Retorne imediatamente para a área central após cada desvio para não ser encurralado nas bordas.",
    "Sobreviva durante 45 segundos sem colisões para consolidar o multiplicador 3.0x e buscar 24.000 pontos."
  ],
  audience: "Jogadores de LoL, Valorant, CS2 e Apex que desejam aprimorar desvio de skillshots e micro-movimentação de mouse, bem como qualquer pessoa interessada em elevar agilidade e reflexos motores.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePagePt() {
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
      <QuickDodgeClient
        copy={{
          title: "Jogo de Desviar o Mouse & Teste de Reflexos",
          subtitle: "Esquiva Cinética de Projéteis e Modelos Preditivos • 15 Níveis de Dificuldade",
          description: "Desviar de um perseguidor é um problema de previsão, não de mera reação: no momento em que você enxerga onde ele está, ele já se moveu. Movimentos rápidos são planejados antecipadamente por modelos internos do cerebelo (Kawato, 1999) em vez de corrigidos continuamente em voo, pois a visão necessita de 100 a 150 ms para intervir (Woodworth, 1899). Conforme a velocidade sobe, a margem de correção desaparece e apenas a predição assegura a sobrevivência.",
          badge: "Teste de Esquiva e Reflexos",
          hudLabels: {
            score: "Pontuação",
            time: "Tempo",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo",
            getReady: "PREPARE-SE"
          },
          resultLabels: {
            newBest: "NOVO RECORDE",
            points: "Pontos",
            accuracy: "Precisão",
            dodges: "Desvios",
            peakSpeed: "Vel. Máxima",
            peakLevel: "Nível Máximo",
            playAgain: "Jogar Novamente"
          },
          rulesTitle: "Regras do Drill e Sistema de Pontuação",
          rulesItems: [
            { title: "Esquiva de Projéteis e Pontuação", text: "Evite o contato com as esferas vermelhas. A cada segundo de sobrevivência pontos contínuos são adicionados." },
            { title: "Raspagem Rente (Close Shave)", text: "Passe raspando pelas esferas para receber pontos adicionais de bonificação e acelerar seu combo." },
            { title: "Aceleração Progressiva", text: "Ao avançar na pontuação, os projéteis aceleram até 500 px/s e o intervalo entre ondas se reduz drasticamente." },
            { title: "Penalidade de Colisão", text: "Tocar em qualquer projétil zera o multiplicador de combo para 1.0x e dispara um sinal visual de alerta." }
          ],
          aboutTitle: "Sobre o Jogo de Desviar o Mouse e Biomecânica da Esquiva",
          aboutSections: [
            {
              title: "Evasão de Colisão Cinética e Modelos Preditivos de Kawato",
              subtitle: "Simulação cerebelar de trajetórias antes da latência visual aferente",
              content: "Desviar de objetos em alta velocidade exige a antecipação cerebelar teorizada por Kawato (1999). A leitura imediata do ângulo inicial projeta o cursor na rota de escape antes que o atraso óptico comprometa a ação."
            },
            {
              title: "Controle Bifásico de Woodworth e Micro-Frenagem",
              subtitle: "Harmonia entre impulso balístico inicial e travamento milimétrico",
              content: "Cada manobra rápida é composta por um impulso inicial e uma desaceleração controlada (Woodworth, 1899). O travamento preciso com as falanges impede deslizamentos que levariam a impactos subsequentes."
            },
            {
              title: "Lei de Fitts e Contração do Espaço Seguro",
              subtitle: "Aumento logarítmico da dificuldade sob alta densidade de projéteis",
              content: "Conforme o tabuleiro se povoa de esferas, a largura utilizável dos corredores de fuga (W) diminui drasticamente, exigindo controle motor de alta precisão (Fitts, 1954)."
            },
            {
              title: "Taxas de Atualização Elevadas e Resolução de Movimento",
              subtitle: "Monitores de 144Hz/240Hz e latência sub-4ms para leitura límpida",
              content: "Painéis de alta frequência eliminam o salto visual em projéteis velozes, garantindo que o cérebro processe a cinemática sem borrões ou distorções de quadros (Woods et al., 2015)."
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
