import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// PESQUISA DE PALAVRAS-CHAVE NATIVAS (SERP BRASIL / PT-BR)
// Termos de busca de alta intenção atlética e impulsão:
// - "exercicios para aumentar o salto vertical" (Busca de alta intenção esportiva)
// - "treino de salto vertical e impulsao" (Condicionamento para basquete e vôlei)
// - "treino pliometrico para salto" (Exercícios pliométricos e ciclo de alongamento-encurtamento)
// - "como pular mais alto exercicios" (Volume massivo no YouTube / Google Brasil)
// - "treino de impulsao basquete e volei" (Contexto esportivo tradicional)
// - "mira aerea e predicao de trajetoria" (Mecânica de mira e rastreamento aéreo FPS)
// - "teste de salto vertical online" (Avaliação de impulsão e cadência de rebote)
// - "tempo de suspensao no ar treino" (Controle de hang time e interceptação)
// ============================================================

export const metadata = {
  title: 'Salto Vertical – Treino Pliométrico | SkillDrills',
  description: 'Treino de salto vertical online grátis. Intercepte alvos no ápice da parábola e desenvolva tempo de reação, ritmo pliométrico e controle no PC.',
  keywords: [
    "exercicios para aumentar o salto vertical",
    "treino de salto vertical e impulsao",
    "treino pliometrico para salto",
    "como pular mais alto exercicios",
    "treino de impulsao basquete e volei",
    "mira aerea e predicao de trajetoria",
    "teste de salto vertical online",
    "tempo de suspensao no ar treino",
    "interceptacao parabolica fps",
    "potencia de membros inferiores"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "Exercícios para Aumentar o Salto Vertical & Treino Pliométrico | SkillDrills",
    description: "Treino online gratuito de impulsão, salto vertical e cálculo de trajetória aérea. Domine o timing de propulsão, sustentação no ar e interceptação parabólica de alvos até 900 px/s com base no ciclo de alongamento-encurtamento.",
    url: 'https://skilldrills.online/pt/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Exercícios para Aumentar o Salto Vertical & Treino Pliométrico | SkillDrills",
    description: "Treino online gratuito de impulsão, salto vertical e cálculo de trajetória aérea. Domine o timing de propulsão, sustentação no ar e interceptação parabólica de alvos até 900 px/s com base no ciclo de alongamento-encurtamento.",
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
      "name": "Condicionamento e Agilidade",
      "item": "https://skilldrills.online/pt/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Salto Vertical & Treino Pliométrico",
      "item": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treinador de Salto Vertical e Trajetória Parabólica",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Simulador de timing de impulsão vertical, controle de trajetória em suspensão e interceptação balística sob aceleração dinâmica.",
  "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence",
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
  "name": "Treinador de Impulsão e Timing Aéreo",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno compatível com HTML5 Canvas e Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Salto e Interceptação Aérea (Jump Sequence)",
  "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence",
  "description": "Treinamento de cálculo de impulso e interceptação aérea em arco parabólico para esportes dinâmicos e mira em jogos de tiro.",
  "genre": [
    "Fitness Drill",
    "Aerial Timing",
    "Trajectory Interception",
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
      "name": "O que este teste avalia em relação ao salto vertical e à coordenação motora aérea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O exercício simula a mecânica neurocognitiva do salto vertical: o cálculo exato do impulso de partida, o ajuste de voo em suspensão e o ponto de contato ideal. Ele quantifica a precisão preditiva do cérebro para cruzar uma trajetória ascendente-descendente com alvos voando em alta velocidade transversal."
      }
    },
    {
      "@type": "Question",
      "name": "Como o Ciclo de Alongamento-Encurtamento (SSC) de Komi se reflete no carregamento do salto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo Paavo Komi (2000), a potência explosiva muscular depende da rápida transição entre a fase excêntrica de compressão e a concêntrica de impulsão. A mecânica de manter o clique pressionado para carregar e soltar calibra a propriocepção de força elástica proporcional necessária para atingir a altitude de cada alvo."
      }
    },
    {
      "@type": "Question",
      "name": "O que são os modelos internos cerebelares de Kawato e como atuam no controle aéreo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mitsuo Kawato (1999) demonstrou que, ao perder o contato com o chão, o cerebelo assume uma simulação interna da gravidade e da inércia. Como o feedback visual sofre atraso (100 a 150ms), a pilotagem do salto precisa antecipar onde o alvo estará através de um modelo preditivo contínuo."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o papel da teoria óptica Tau (τ) de Lee no momento exato da colisão?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "David Lee (1976) estabeleceu que o cérebro afere o tempo restante até a colisão (TTC) calculando a taxa de expansão da imagem na retina, sem necessidade de calcular velocidade ou distância conscientemente. No drill, isso orienta o microajuste milimétrico nos 100ms finais de interceptação."
      }
    },
    {
      "@type": "Question",
      "name": "Como a velocidade dos alvos e o raio da esfera variam entre os níveis 1 e 15?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cada 250 pontos o nível se eleva. A velocidade transversal dos alvos voadores sobe de 120 px/s no nível inicial até 900 px/s nos níveis 12 a 15, enquanto o raio da esfera de colisão é reduzido de 35 pixels para escassos 12 pixels."
      }
    },
    {
      "@type": "Question",
      "name": "Errar um salto ou cair no chão sem tocar a esfera acarreta perda de pontos acumulados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não há perda de pontos e o cronômetro de 45 segundos segue inalterado. Todavia, aterrissar sem interceptar a esfera de alvo reinicia imediatamente o multiplicador de combo para 1.0x, premiando a regularidade sob alta pressão."
      }
    },
    {
      "@type": "Question",
      "name": "Como aplicar este treinamento para melhorar a mira em situações aéreas no Apex Legends e Overwatch 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos com mobilidade vertical intensa (jump pads, rocket jumps, knockbacks), os alvos descrevem arcos parabólicos velozes. O treino desenvolve o cálculo mental da curvatura gravitacional, erradicando a tendência de mirar onde o adversário está em vez de onde ele aterrissará."
      }
    },
    {
      "@type": "Question",
      "name": "Por que carregar o salto até 100% em todos os lançamentos é um erro técnico comum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Carregar ao máximo projeta o cursor alto demais, exigindo que ele perca tempo descendo enquanto o alvo já cruzou a tela. A habilidade mestre consiste em dosar a barra na altura exata do projétil, atingindo o ápice do arco na mesma cota do alvo."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o segredo para ultrapassar os 17.000 pontos e garantir o título Apex Trajectory Master?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É fundamental engatar a impulsão seguinte no milissegundo exato do toque no solo (rebound cadenciado), mantendo o multiplicador de 3.0x sem qualquer falha ao longo dos 45 segundos e registrando mais de 92% de precisão nos níveis mais velozes."
      }
    },
    {
      "@type": "Question",
      "name": "O teste exige instalação de aplicativo ou os dados são confidenciais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O treino opera 100% no navegador web sobre Canvas acelerado por hardware e performance.now(). Nenhum dado pessoal ou telemetria de máquina é gravada externamente; seus recordes residem exclusivamente no LocalStorage do seu dispositivo."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Treinamento em Sequência de Salto e Interceptação Parabólica",
  "description": "Instruções passo a passo para dosar o impulso vertical, manobrar em suspensão e colidir com alvos em movimento.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Alinhamento na Base de Lançamento",
      "text": "Posicione o cursor na base inferior central alinhando-se com a cota inicial de impulsão vertical.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence#passo-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Dosagem de Impulso Elástico Proporcional",
      "text": "Pressione e segure o clique para carregar a barra na altura compatível com o alvo em aproximação e solte para saltar.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence#passo-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Manobra em Suspensão e Interceptação Óptica",
      "text": "Ajuste o cursor lateralmente no ar para interceptar a esfera voadora no ápice da parábola antes do declínio gravitacional.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence#passo-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Rebote Imediato ao Tocar o Chão e Combo 3.0x",
      "text": "Inicie o carregamento do próximo salto no instante exato do pouso para encadear a sequência com multiplicador máximo.",
      "url": "https://skilldrills.online/pt/drills/physical/fitness/jump-sequence#passo-4"
    }
  ]
};

const jumpGuide = {
  heading: "Fundamentação Biomecânica: Potência de Salto e Interceptação em Suspensão",
  subtitle: "Ciclo de alongamento-encurtamento de Komi, modelo antecipatório de Kawato e teoria óptica Tau de Lee",
  intro: [
    "O teste de sequência de salto (Jump Sequence Training) transpõe os princípios cinemáticos da impulsão vertical e da interceptação aérea para a precisão psicomotora digital. Em modalidades como vôlei, basquete e handebol, a eficácia de um bloqueio ou remate reside na convergência milimétrica entre a impulsão corporal e a trajetória dinâmica da bola; este treino isola e condiciona exatamente essa faculdade de cálculo preditivo gravitacional.",
    "O eminente fisiologista Paavo V. Komi (2000), pioneiro nos estudos do Ciclo de Alongamento-Encurtamento (Stretch-Shortening Cycle, SSC), estabeleceu que o aproveitamento da energia elástica muscular minimiza o gasto metabólico e amplifica a aceleração vertical. A interface de carregamento por pressão proporcional simula esse acúmulo elástico neuromuscular, exigindo que o praticante module a amplitude de lançamento em função da altura e velocidade do projétil alvo.",
    "No instante do descolamento da base de apoio, o controle do movimento passa a ser coordenado pelos modelos internos cerebelares teorizados por Mitsuo Kawato (1999). Incapaz de alterar drasticamente a inércia parabólica por atrito terrestre, o cérebro precisa calcular previamente a rota de convergência. Esse mecanismo é sincronizado em tempo real pelo princípio óptico Tau (τ) de David N. Lee (1976), que extrai a iminência temporal de contato a partir da expansão contínua da imagem retiniana, refinando os 100ms finais de toque sob velocidades de até 900 px/s.",
    "Rigor de mensuração e amostragem: Este simulador opera com a API de hardware performance.now() em resolução sub-milissegundo. A fluidez percebida depende da taxa de atualização do monitor (60Hz = 16,6ms; 144Hz = 6,9ms; 240Hz = 4,1ms) e da frequência de resposta do mouse. Flutuações inferiores a 5ms constituem tolerâncias físicas padrão."
  ],
  benchmarks: {
    title: "Tabela de Classificação e Padrões de Salto Vertical e Interceptação (5 Níveis)",
    headers: ["Nível / Rank", "Título de Mestria", "Pontuação Alvo", "Velocidade do Alvo / Precisão", "Grau Geral", "Perfil Neurofuncional em Suspensão"],
    rows: [
      ["Tier 1: Mestre da Trajetória Apex", "Apex Trajectory Master", "17.000+ pontos", "800 – 900 px/s / ≥ 92%", "Grade S", "Predição gravitacional de elite (top 0,1%); convergência perfeita com alvos ultrarrápidos e cálculo SSC impecável (Komi 2000; Kawato 1999)"],
      ["Tier 2: Atacante Aéreo de Precisão", "Precision Aerial Striker", "12.000 – 16.999 pts", "650 – 799 px/s / 84 – 91%", "Grade A", "Excelente pilotagem em suspensão por modelo cerebelar; interceptação estável em esferas reduzidas de 15-18px"],
      ["Tier 3: Interceptor de Salto Habilidoso", "Skilled Jump Interceptor", "7.500 – 11.999 pts", "500 – 649 px/s / 75 – 83%", "Grade B", "Nível competitivo consistente; boa modulação da barra de impulsão e recuperação ágil de contato no solo"],
      ["Tier 4: Navegador Parabólico em Treino", "Developing Parabola Navigator", "4.000 – 7.499 pts", "350 – 499 px/s / 65 – 74%", "Grade C", "Média funcional padrão; quebras periódicas de racha provocadas por saltos com excesso de força em alvos baixos"],
      ["Tier 5: Aluno Inicial de Impulsão", "Novice Liftoff Trainee", "< 4.000 pontos", "< 350 px/s / < 65%", "Grade D", "Dificuldade na dosagem proporcional de energia; tendência a carregar a barra em 100% e perder o timing de descida"]
    ],
    note: "Benchmarks estruturados com base no ciclo de alongamento-encurtamento (Komi 2000), modelos antecipatórios cerebelares (Kawato 1999) e ótica Tau (Lee 1976)."
  },
  techniques: {
    title: "Protocolos Táticos para Aperfeiçoamento da Impulsão e Interceptação Aérea",
    items: [
      {
        name: "Modulação de Impulso Elástico de Komi (Proportional Impulse Charging)",
        desc: "Nunca carregue a barra no máximo por padrão. Observe a altura do alvo e solte o clique assim que o indicador atingir a cota necessária para que o ápice da parábola coincida com o voo da esfera.",
        tips: "Trate o carregamento como a flexão elástica dos joelhos antes de um salto: rápido, concentrado e na medida exata."
      },
      {
        name: "Pilotagem Parabólica pelo Modelo Cerebelar de Kawato (Feedforward Air Steering)",
        desc: "Uma vez no ar, não persiga o alvo por trás. Projete suavemente o cursor em direção ao ponto futuro onde a curva gravitacional do salto irá colidir frontalmente com a trajetória do projétil.",
        tips: "Antecipe o ponto de cruzamento em vez de seguir a posição momentânea do objeto."
      },
      {
        name: "Ajuste Fino Terminal por Óptica Tau de Lee (Final 100ms Optical Tau Lock)",
        desc: "Nos últimos milissegundos antes do contato, concentre o foco na taxa de expansão visual da esfera para aplicar um microajuste terminal com os dedos.",
        tips: "Mire no centro geométrico da esfera para evitar toques raspando a borda."
      },
      {
        name: "Cadência de Rebote Rápido ao Tocar o Solo (Rebound Cadence)",
        desc: "Não fique parado após aterrissar. No mesmo instante em que o cursor atingir o solo, inicie o carregamento do salto seguinte em direção ao novo alvo.",
        tips: "O ritmo sem pausas é o pilar indispensável para sustentar o combo de 3.0x até o fim da rodada."
      }
    ]
  },
  steps: [
    "Adote uma postura equilibrada com o cursor posicionado na base central inferior.",
    "Avalie a trajetória do alvo que entra em cena e carregue a impulsão na medida exata.",
    "Conduza a parábola suavemente durante o voo para colidir com o centro da esfera no ar.",
    "Conecte o pouso imediatamente com o salto seguinte para manter 3.0x de combo por 45 segundos."
  ]
};

export default function JumpSequencePagePt() {
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
      <JumpSequenceClient
        copy={{
          title: "Salto Vertical & Treino Pliométrico",
          subtitle: "Cálculo de Impulsão & Interceptação em Suspensão • 15 Níveis",
          hudLabels: {
            score: "Pontuação",
            timeLeft: "Tempo Restante",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo"
          },
          rulesTitle: "Regras do Teste de Salto e Sistema de Pontuação",
          rules: [
            { title: "Carregamento Proporcional de Impulso", text: "Pressione e segure o mouse para dosar a força elástica do salto e solte para decolar em arco parabólico." },
            { title: "Interceptação no Ápice da Trajetória", text: "Manobre lateralmente no ar para colidir com a esfera voadora antes de retornar ao chão." },
            { title: "Progressão de Velocidade", text: "A cada 250 pontos o nível sobe, acelerando os alvos de 120 para 900 px/s e reduzindo o raio da esfera." },
            { title: "Pouso sem Contato e Reset de Combo", text: "Aterrissar sem atingir o alvo reinicia o multiplicador de combo para 1.0x sem perda de pontos acumulados." }
          ],
          aboutTitle: "Sobre o Treino de Salto e Trajetória Aérea",
          aboutHeading: "Biomecânica da Impulsão e Interceptação em Arco Parabólico",
          aboutText: "Fundamentado nos estudos do Ciclo de Alongamento-Encurtamento de Paavo Komi (2000), nos modelos cerebelares preditivos de Mitsuo Kawato (1999) e na teoria óptica Tau de David Lee (1976), este simulador desenvolve o cálculo intuitivo de trajetórias gravitacionais indispensável para modalidades de impulsão (vôlei, basquete) e mira de alta velocidade em jogos com mobilidade aérea intensa.",
          aboutCards: [
            {
              title: "Público-Alvo",
              desc: "Atletas buscando aprimorar o timing de salto e interceptação aérea, e gamers competitivos treinando mira contra alvos voadores rápidos."
            },
            {
              title: "Habilidades Desenvolvidas",
              desc: "Dosagem proporcional de impulso motor, manobra em suspensão gravitacional, cálculo de tempo até contato (TTC) e rebote ágil."
            },
            {
              title: "Aceleração Dinâmica",
              desc: "Alvos aceleram de 120 para 900 px/s em altitudes e curvaturas aleatórias, exigindo adaptação instantânea a cada lançamento."
            }
          ]
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="pt"
        />
      </div>
    </>
  );
}
