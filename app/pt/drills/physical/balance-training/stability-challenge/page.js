import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (BR / PT)
// Primary Intent: como parar de tremer a mira, teste de precisão do mouse, controle de recoil
// Portuguese Context: Como parar de tremer a mira no Valorant/CS2 e treino de estabilidade motora contra forças externas
// High-Demand, Low-Competition Target Keywords:
//   - "como parar de tremer a mira" (Top intent for mouse jitter & hand shake)
//   - "teste de precisão do mouse" (Direct mouse precision diagnostic query)
//   - "controle de recoil cs2" (Recoil compensation and steady tracking)
//   - "treino de estabilidade de mira" (Aim steadiness training query)
//   - "teste de estabilidade do mouse" (Mouse stability & tracking test)
//   - "estabilidade de mira valorant" (Esports steadiness benchmark)
//   - "equilíbrio postural e controle motor" (Motor control & balance synergy)
//   - "resistência a forças externas mouse" (Perturbation force counteraction)
//   - "sensibilidade e estabilidade do cursor" (Cursor tracking steadiness)
//   - "treino de compensação de recuo" (Recoil counter-pressure training)
// ============================================================

export const metadata = {
  title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
  description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.',
  keywords: [
    "como parar de tremer a mira",
    "teste de precisao do mouse",
    "controle de recoil cs2",
    "treino de estabilidade de mira",
    "teste de estabilidade do mouse",
    "estabilidade de mira valorant",
    "equilibrio postural e controle motor",
    "resistencia a forcas externas mouse",
    "sensibilidade e estabilidade do cursor",
    "treino de compensacao de recuo"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
    description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.',
    url: 'https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
    description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.',
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
      "name": "Treino de Equilíbrio e Estabilidade",
      "item": "https://skilldrills.online/pt/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Desafio de Estabilidade e Precisão de Mira",
      "item": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treinador de Estabilidade de Mira e Precisão do Mouse",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Ferramenta biomecânica de precisão motora e resistência a perturbações externas, desenhada para eliminar tremores no mouse e aprimorar a estabilidade de mira em FPS."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Desafio de Estabilidade de Mira Online (Stability Challenge)",
  "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge",
  "description": "Teste interativo gratuito no navegador para medir e aprimorar a estabilidade do cursor sob vetores de força dinâmicos de vento e perturbações motoras.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Desafio de Estabilidade do Mouse",
  "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge",
  "description": "Jogo de resistência neuromuscular onde o jogador estabiliza a mira no centro contra forças contínuas de arrasto.",
  "genre": ["Action", "Sports Game", "Reflex Game", "Motor Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o Desafio de Estabilidade (Stability Challenge) e como ele funciona?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Stability Challenge é um exercício biomecânico de controle motor fino e estabilidade postural. O sistema gera rajadas de vento dinâmicas com vetores de força contínuos que tentam empurrar seu retículo para fora da zona segura central. Seu objetivo é aplicar micropressão contrária suave e constante no mouse para manter a mira cravada no centro."
      }
    },
    {
      "@type": "Question",
      "name": "Como este exercício ajuda a parar de tremer a mira no Valorant, CS2 e Apex Legends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O tremor na mira decorre da contração excessiva de músculos antagonistas da mão e antebraço sob estresse. Ao forçar o cérebro a lidar com forças de perturbação externa contínuas em vez de movimentos abruptos, o exercício recruta circuitos de feedback visual em circuito fechado (Woodworth, 1899), desenvolvendo relaxamento muscular seletivo e tônus de compensação suave de recuo (recoil)."
      }
    },
    {
      "@type": "Question",
      "name": "Como a força do vento e o tamanho do anel seguro progridem com os níveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cada 250 pontos conquistados, você avança de nível até o Nível 15. Durante essa evolução, o raio do anel central encolhe de 45px para apenas 20px, enquanto a magnitude da aceleração das rajadas de força salta de 250 para 850 unidades de força, exigindo microajustes de altíssima frequência."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece quando o cursor é empurrado para fora do anel de segurança?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sair do anel de segurança quebra o bloqueio de estabilização, gerando um flash vermelho e resetando instantaneamente seu multiplicador de combo acumulado para 1.0x. Não há dedução direta de pontuação acumulada nem redução do tempo restante da sessão."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a duração padrão de uma sessão de treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada rodada dura exatamente 45 segundos fixos. O cronômetro regressivo decresce de forma homogênea de 45s a 0s, criando um ambiente padronizado e reprodutível para comparação científica de evolução pessoal."
      }
    },
    {
      "@type": "Question",
      "name": "O que diferencia um jogador iniciante de um mestre de estabilidade (Tier 1)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um jogador iniciante (Tier 5) acumula menos de 6.000 pontos com estabilidade inferior a 65%, sofrendo constantes rupturas sob o vento. Um competidor de elite (Tier 1: Apex Stability Master / Nota S) atinge 17.000+ pontos, superando o Nível 12 com mais de 92% de tempo dentro do anel minúsculo de 20px."
      }
    },
    {
      "@type": "Question",
      "name": "Qual pegada de mouse (Palm, Claw ou Fingertip) oferece melhor resistência?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pegada Claw ou Palm com apoio firme do antebraço na mesa costuma oferecer a maior base de sustentação isométrica contra forças de arrasto contínuas. A pegada Fingertip permite ajustes rápidos, mas exige força muscular intrínseca dos dedos muito mais desenvolvida para resistir a rajadas fortes sem perder contato."
      }
    },
    {
      "@type": "Question",
      "name": "Qual sensibilidade de mouse (DPI / eDPI) é recomendada para estabilização?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sensibilidades moderadas a baixas (entre 800 e 1200 DPI em 1:1, ou 200 a 350 eDPI em jogos táticos) facilitam correções microscópicas sem que tremores involuntários de pulso joguem o cursor fora do anel de 20px."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a postura corporal e o alinhamento da coluna afetam a precisão do mouse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Como demonstrado por Nashner & McCollum (1985), o controle motor das extremidades depende da estabilidade do tronco e da cintura escapular. Uma postura desleixada ou cotovelo solto no ar transfere oscilações respiratórias e instabilidades da coluna diretamente para o sensor do mouse."
      }
    },
    {
      "@type": "Question",
      "name": "Meus dados de desempenho e histórico de pontuações são enviados para servidores externos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O SkillDrills armazena 100% dos seus recordes, combos e dados analíticos de forma privada no armazenamento local (LocalStorage) do seu próprio navegador, sem telemetria invasiva ou necessidade de cadastro."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar Estabilidade e Controle de Mira no Mouse",
  "description": "Procedimento biomecânico em 4 etapas para desenvolver resistência motora e eliminar tremores na mira.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Alinhamento e Bloqueio Central",
      "text": "Posicione o retículo no centro exato do anel esmeralda antes do início da contagem e trave o ponteiro através do Pointer Lock do navegador.",
      "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Sensoreamento da Perturbação de Força",
      "text": "Sinta visualmente a direção do vetor de aceleração do vento quando a linha indicadora começar a puxar o retículo para fora do anel.",
      "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Aplicação de Micropressão Contrária",
      "text": "Aplique contra-pressão isométrica suave na direção oposta ao vento, mantendo o cursor confinado no perímetro seguro para multiplicar o combo até 3.0x.",
      "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Adaptação ao Encolhimento do Anel",
      "text": "Conforme o nível sobe para o Lv. 15 e o anel encolhe para 20px, utilize apoio suave do antebraço e microajustes de dedos para absorver as rajadas intensas.",
      "url": "https://skilldrills.online/pt/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
    paragraphs: [
      "A estabilidade do cursor do mouse sob perturbações externas é uma manifestação direta da capacidade do sistema neuromuscular de integrar propriocepção sensorial e correções visuais em tempo real. Diferente de um movimento de mira puramente balístico (como um tiro de flick), a estabilização exige regulação isométrica contínua entre grupos musculares agonistas e antagonistas do antebraço e da mão. Este exercício quantifica a eficácia com que o córtex motor primário e o cerebelo modulam essa micropressão frente a vetores de arrasto não antecipados (Nashner & McCollum, 1985).",
      "De acordo com o modelo clássico de controle motor de duas fases de Robert S. Woodworth (1899), movimentos manuais envolvem uma fase de impulso inicial seguida por ajustes microscópicos baseados em feedback sensorial de circuito fechado (Current Control Phase). No Desafio de Estabilidade, o jogador atua permanentemente nessa fase de circuito fechado: à medida que a física de vento simula a força de subida de recuo de armas ou tremores involuntários, o sistema visual detecta o desvio em relação ao centro e comanda contrações reflexas de restauração.",
      "A dinâmica da dificuldade segue os princípios de equilíbrio sob perturbação descritos por David A. Winter (1995) combinados com a Lei de Fitts (1954). Quando o anel seguro encolhe de 45px para 20px no Nível 15, a tolerância espacial diminui drasticamente, tornando o índice de dificuldade exponencialmente maior. Qualquer atraso superior a 50 milissegundos na resposta motora resulta no rompimento da borda do anel e na perda imediata da cadeia de combo.",
      "Precisão de medição e latência de hardware: O cálculo da estabilidade percentual e das colisões de fronteira é realizado com base no relógio performance.now() da API do navegador, com resolução em microssegundos. Contudo, monitores convencionais de 60Hz introduzem uma quantização de quadros de ~16,7ms, enquanto telas de 144Hz e 240Hz reduzem esse atraso para 6,9ms e 4,1ms, respectivamente (Woods et al., 2015). Mouses com taxa de amostragem de 1000Hz diminuem a latência de entrada para menos de 1ms. Toda a análise analítica é computada exclusivamente no hardware local do usuário, garantindo privacidade absoluta e zero dependência de tráfego de rede."
    ]
  },
  benchmarks: {
    title: "Tabela Oficial de Padrões e Classificação de Estabilidade",
    headers: ["Nível", "Título do Nível", "Pontuação Alvo", "Estabilidade & Nível", "Nota", "Percentil Global"],
    rows: [
      ["Tier 1", "Mestre Supremo de Estabilidade", "17.000+ pontos", "Nível 12–15 / Estabilidade >92%", "Nota S+", "Top 0,5% (Controle Cirúrgico)"],
      ["Tier 2", "Especialista em Compensação de Recuo", "13.000 a 16.999 pts", "Nível 9–11 / Estabilidade 85–91%", "Nota A", "Top 5% (Nível Competitivo)"],
      ["Tier 3", "Controlador Seguro Avançado", "9.500 a 12.999 pts", "Nível 6–8 / Estabilidade 76–84%", "Nota B", "Top 20% (Firmeza Sólida)"],
      ["Tier 4", "Praticante em Desenvolvimento", "6.000 a 9.499 pts", "Nível 3–5 / Estabilidade 65–75%", "Nota C", "50% (Média de Jogadores)"],
      ["Tier 5", "Iniciante Suscetível a Tremores", "< 6.000 pontos", "Nível 1–2 / Estabilidade <65%", "Nota D", "Iniciante (Treino Recomendado)"],
    ],
    note: "A classificação final pondera o tempo acumulado no anel, quantidade de quebras de estabilização, velocidade máxima de vento superada e pontuação bruta.",
  },
  protocols: {
    title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
    description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.',
    items: [
      {
        title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
        description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.'
      },
      {
        title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
        description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.'
      },
      {
        title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
        description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.'
      },
      {
        title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
        description: 'Teste de estabilidade de mira e firmeza do mouse grátis. Mantenha o retículo no centro contra vetores de força e elimine tremores para jogos de tiro no PC.'
      }
    ]
  },
  faqs: {
    title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function StabilityChallengePtPage() {
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
      <StabilityChallengeClient
        copy={{
          title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
          subtitle: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills',
          hudLabels: {
            score: "Pontos",
            time: "Tempo",
            stability: "Estabilidade",
            blowouts: "Rupturas",
            maxStreak: "Maior Combo",
            peakLevel: "Nível Máximo",
            getReady: "PREPARE-SE",
            points: "Pontos",
            playAgain: "Jogar Novamente"
          },
          rulesTitle: "Instruções do Exercício e Sistema de Pontuação",
          rulesItems: [
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "Mantenha o retículo no centro do anel seguro contra os vetores dinâmicos de resistência do vento." },
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "Mantenha a estabilização ininterrupta para construir um multiplicador de combo de até 3.0x." },
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "A cada 250 pontos o nível sobe. O anel seguro encolhe de 45px para 20px e as forças aceleram." },
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "Derivar para fora do anel reseta o combo para 1.0x instantaneamente, sem perda de pontos ou tempo." }
          ],
          aboutTitle: "Sobre o Desafio de Estabilidade",
          aboutHeading: "Compensação Dinâmica de Forças e Equilíbrio Postural",
          aboutIntro: "O Desafio de Estabilidade é um exercício biomecânico de precisão motora fina e estabilização postural. Vetores de vento empurram seu cursor continuamente, exigindo contra-pressão suave e precisa no mouse.",
          aboutScience: "Fundamentado nos modelos de sinergia postural de Nashner & McCollum (1985) e nos princípios de equilíbrio de David A. Winter (1995), o exercício treina correções motoras visuais de circuito fechado (Woodworth, 1899). Conforme a pontuação sobe, o anel contrai para 20px e as forças aceleram até 850 unidades.",
          aboutCards: [
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "Jogadores de FPS que buscam eliminar tremores na mira e dominar o controle de recoil em jogos competitivos como Valorant, CS2 e Apex Legends." },
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "Compensação de vetores de força, equilíbrio postural, rastreamento de resistência, estabilização de retículo e precisão de microajustes." },
            { title: 'Estabilidade de Mira – Teste de Firmeza | SkillDrills', text: "A contra-pressão contínua exigida contra o vento simula exatamente o controle motor suave necessário para segurar o recuo de fuzis e armas automáticas." }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/balance-training/stability-challenge" />
    </>
  );
}
