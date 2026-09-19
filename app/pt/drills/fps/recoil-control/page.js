import RecoilControlClient from '@/app/drills/fps/recoil-control/RecoilControlClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "Treino de Controle de Recoil – Spray FPS | SkillDrills",
  description: "Treine controle de recoil e padrões de spray no navegador. Domine a compensação vertical e transferências de tiro para CS2 e Valorant gratuitamente.",
  keywords: [
    "treino de controle de recoil",
    "controle de recoil cs2",
    "como controlar recoil valorant",
    "treinar spray de armas fps",
    "puxar o mouse recoil",
    "treinador de recoil online",
    "padrao de spray cs2",
    "ajuste de recoil mouse",
    "treino de spray transfer",
    "recoil compensacao fps",
    "como diminuir recuo de mira",
    "treinador de mira de recuo gratis"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/fps/recoil-control",
    languages: getAlternateLanguages('/drills/fps/recoil-control'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Treino de Controle de Recoil – Spray FPS | SkillDrills",
    description: "Treine controle de recoil e padrões de spray no navegador. Domine a compensação vertical e transferências de tiro para CS2 e Valorant gratuitamente.",
    url: "https://skilldrills.online/pt/drills/fps/recoil-control",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treino de Controle de Recoil – Spray FPS | SkillDrills",
    description: "Treine controle de recoil e padrões de spray no navegador. Domine a compensação vertical e transferências de tiro para CS2 e Valorant gratuitamente.",
  },
};

export default function RecoilControlPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://skilldrills.online/pt"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Exercícios FPS",
        "item": "https://skilldrills.online/pt/drills/fps"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Controle de Recoil",
        "item": "https://skilldrills.online/pt/drills/fps/recoil-control"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Treinador de Controle de Recoil SkillDrills",
    "url": "https://skilldrills.online/pt/drills/fps/recoil-control",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requer navegador moderno com API Pointer Lock",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Treino de Controle de Recoil e Spray",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Recoil Control Pattern Trainer",
    "description": "Simulador de compensação motora e padrões de recuo de armas com bloqueio de cursor.",
    "genre": ["Action", "Esports Trainer", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Browser Game"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-16",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o controle de recoil (recuo) em jogos FPS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O controle de recoil é a habilidade neuromuscular de neutralizar a elevação e as oscilações laterais da mira geradas pelo disparo contínuo de uma arma automática, puxando e modulando o mouse na direção oposta à dispersão dos projéteis."
        }
      },
      {
        "@type": "Question",
        "name": "Por que os primeiros 8 a 10 tiros são a fase mais crítica de um spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Na maioria dos atiradores táticos, os primeiros 8 a 10 disparos apresentam recuo quase puramente vertical e alta previsibilidade antes que a dispersão horizontal aleatória se intensifique. Dominar esse início garante abates rápidos no primeiro segundo do confronto."
        }
      },
      {
        "@type": "Question",
        "name": "Como o controle de recoil varia entre CS2, Valorant e Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No CS2, os padrões de spray seguem trajetórias determinísticas fixas para cada arma. No Valorant, o recuo vertical é constante, mas as oscilações horizontais finais possuem componentes semi-aleatórios. No Apex Legends, o recuo é contínuo com trajetórias específicas que exigem rastreamento dinâmico em alvos móveis."
        }
      },
      {
        "@type": "Question",
        "name": "Como a teoria do Programa Motor Generalizado (GMP) explica o controle de spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Segundo a teoria de Schmidt & Lee (2011), o cérebro armazena a curva inversa de recoil como um programa motor de circuito aberto na memória muscular. A velocidade do disparo supera a latência do feedback visual humano (cerca de 200 ms), exigindo execução motora antecipatória pré-programada."
        }
      },
      {
        "@type": "Question",
        "name": "O que é um spray transfer e como executá-lo com precisão?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O spray transfer é a técnica de redirecionar o fluxo contínuo de disparos de um inimigo para outro sem soltar o gatilho. Exige que o jogador compense simultaneamente a posição atual da dispersão no padrão da arma e o vetor espacial até o novo alvo."
        }
      },
      {
        "@type": "Question",
        "name": "Como a sensibilidade do mouse e o atrito do mousepad afetam o recoil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sensibilidades mais baixas exigem maior deslocamento vertical do antebraço, oferecendo maior margem para micro-ajustes. Mousepads com bom poder de frenagem (stopping power) evitam que o mouse desça em excesso durante puxadas verticais rápidas."
        }
      },
      {
        "@type": "Question",
        "name": "Deve-se puxar o mouse com o punho ou com o antebraço durante o spray?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Em rajadas curtas (bursts de 5 a 7 tiros), a flexão dos dedos e do punho é suficiente. Em sprays completos de 30 tiros, o antebraço deve guiar o movimento descendente amplo para evitar que o punho atinja o limite articular e perca precisão."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a diferença entre dispersão da arma (spread/bloom) e padrão de recoil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O recoil é o deslocamento consistente e compensável da mira ao longo do tempo. O spread (ou bloom) é a variação angular estocástica em torno do ponto de mira, que se amplia com disparos ininterruptos ou movimento do personagem e não pode ser perfeitamente compensada."
        }
      },
      {
        "@type": "Question",
        "name": "Este treinador de recoil funciona gratuitamente direto no navegador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, o treinador roda inteiramente no navegador web com captura de entrada bruta via Pointer Lock API, sem necessidade de downloads, contas ou taxas."
        }
      },
      {
        "@type": "Question",
        "name": "Com que frequência devo treinar exercícios de controle de recoil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rotinas diárias de 10 a 15 minutos focando em grupos de 10 tiros e sprays completos consolidam a memória muscular sem sobrecarregar os tendões flexores do antebraço e da mão."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar o Controle de Recoil em Jogos FPS",
    "description": "Passo a passo estruturado para memorizar padrões de dispersão e puxada vertical de mira.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Calibração e Bloqueio de Ponteiro",
        "text": "Ajuste sua sensibilidade real de jogo e trave o cursor com a Pointer Lock API para manter correspondência motora 1:1."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Puxada Vertical nos Primeiros Tiros",
        "text": "Inicie o disparo contínuo puxando suavemente o mouse para baixo na velocidade exata da elevação da arma."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Compensação das Oscilações Laterais",
        "text": "Ao atingir o décimo tiro, module o mouse no sentido oposto às oscilações horizontais do padrão da arma."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Manutenção da Zona de Dispersão",
        "text": "Mantenha o agrupamento dos tiros estritamente na silhueta central para acumular o multiplicador máximo de pontos."
      }
    ]
  };

  const copyPt = {
    h1Keyword: "Controle de Recoil",
    h1Suffix: " – Treinador de Spray FPS",
    caption: "Controle o recuo vertical e horizontal da arma arrastando o mouse no padrão inverso para manter a dispersão no alvo.",
    statScore: "Pontuação",
    statTime: "Tempo",
    statAccuracy: "Precisão",
    statBest: "Recorde",
    statAmmo: "Munição",
    statReloading: "RECARREGANDO...",
    pausedTitle: "Jogo Pausado",
    pausedPrompt: "Clique na tela para reengajar a trava do cursor do mouse.",
    startTitle: "Treinador Profissional de Recoil",
    startSubtitle: "Padrões de Spray e Compensação Motora • Progressão Contínua",
    startButtonText: "INICIAR TREINO DE RECOIL",
    getReady: "PREPARE-SE",
    statHeadshots: "Headshots",
    statMaxCombo: "Combo Máximo",
    statPeakLevel: "Nível Máximo",
    playAgainText: "JOGAR NOVAMENTE",
    shareText: "COMPARTILHAR RESULTADO",
    rulesTitle: "Instruções do Treino e Sistema de Pontos",
    rulesItems: [
      { num: "1", text: "Tiro na Cabeça Preciso", highlight: "+100 PTS / +0,25s", result: "Zona Alvo Prioritária" },
      { num: "2", text: "Acertos em Tronco e Membros", highlight: "+40 / +20 PTS", result: "Mantém Sequência de Combo" },
      { num: "3", text: "Progressão de Nível", highlight: "+1 Nível / 1400 PTS", result: "Escala Velocidade e Recoil" },
      { num: "4", text: "Disciplina de Carregador", highlight: "<40% Penalidade", result: "Zera Combo (-0,6s)" }
    ],
    aboutTitle: "Sobre o Treino de Controle de Recoil",
    aboutHeading: "O que é o Controle de Recoil (Recuo)?",
    aboutText: "O recuo em atiradores modernos é um deslocamento ascendente e lateral progressivo do cano a cada disparo consecutivo. O controle de recoil exige programas motores antecipatórios de circuito aberto (Schmidt & Lee, 2011), onde a mão compensa mecanicamente a trajetória inversa antes mesmo do retorno do feedback visual."
  };

  const recoilControlGuide = {
    heading: "Guia de Controle de Recoil & Padrões de Spray em Atiradores FPS",
    intro: [
      "O Treinador Profissional de Controle de Recoil é um ambiente de treino psicomotor desenhado para isolar, calibrar e condicionar a compensação mecânica de armas automáticas. Em atiradores táticos e dinâmicos como Counter-Strike 2, Valorant, Apex Legends e PUBG, o agrupamento exato dos disparos define a letalidade de qualquer confronto direto.",
      "Ao contrário de ajustes pontuais guiados por feedback visual contínuo, a cadência de fogo de fuzis automáticos (600 a 900 tiros por minuto) produz impactos a cada 66 a 100 milissegundos. Como a latência do reflexo visual humano é de aproximadamente 200 ms, compensar o recuo depende prioritariamente de Programas Motores Generalizados (GMP) de circuito aberto (Schmidt & Lee, 2011; Wolpert & Kawato, 1998) pré-programados na memória muscular.",
      "A dinâmica do exercício ensina a modular duas fases críticas: uma descida vertical uniforme na primeira metade do carregador e micro-ajustes horizontais com inversão direcional na segunda metade. Isso reproduz a cinemática autêntica dos padrões de spray mais emblemáticos dos eSports competitivos.",
      "Utilizando a API de Pointer Lock aliada à cronometria de alta resolução via performance.now() (Woods et al., 2015), o simulador calcula a precisão balística de cada projétil em relação ao centro de massa do alvo, permitindo refinar a suavidade do arrasto e erradicar sobrecompensações desnecessárias.",
      "Como é medido: a taxa de acerto por carregador e o agrupamento milimétrico são processados localmente em tempo real no relógio do seu navegador. Pequenas discrepâncias inferiores a 5 ms correspondem a latências normais de amostragem de hardware e exibição gráfica."
    ],
    benchmarks: {
      title: "Tiers de Desempenho de Precisão por Carregador e Controle de Recoil",
      headers: ["Nível de Habilidade", "Precisão no Carregador (%)", "Características de Controle Motor", "Implicação Competitiva no Jogo"],
      rows: [
        ["Tier 1 (Laser Apex)", "78% – 90%+", "Correspondência de velocidade quase perfeita; micro-compensações horizontais em todos os 30 tiros sem desperdício", "Spray transfers letais em múltiplos alvos em CS2 Faceit Nível 10, Valorant Radiant e Apex Predator"],
        ["Tier 2 (Pro Competitivo)", "62% – 78%", "Agrupamento cirúrgico nos primeiros 10 tiros; recentralização rápida nas inversões horizontais do spray", "Vence duelos de fuzil em média distância com facilidade; consistência em spray transfers duplos"],
        ["Tier 3 (Alto Nível FPS)", "48% – 62%", "Boa puxada vertical; pequenas oscilações de atraso entre os tiros 12 e 25 nas variações laterais", "Sprays confiáveis em curta e média distância; ligeira dificuldade em transferências de longo alcance"],
        ["Tier 4 (Intermediário)", "35% – 48%", "Velocidade de descida inconsistente; hesitação por volta do tiro 7 permitindo que o cano suba além da cabeça", "Vulnerável em tiroteios diretos de fuzil; forçado a depender de rajadas curtas para pontuar"],
        ["Tier 5 (Em Desenvolvimento)", "Abaixo de 35%", "Arrasto vertical atrasado ou excessivo; ausência de compensação lateral provocando dispersão descontrolada", "Perda consistente de duelos diretos; projéteis disparam aleatoriamente em torno do alvo"]
      ],
      note: "As faixas de habilidade avaliam a porcentagem de tiros conectados na silhueta em sprays completos de 30 tiros registrados via performance.now() (Woods et al., 2015)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Aperfeiçoar o Controle de Recoil",
      items: [
        {
          name: "Divisão do Spray em Duas Etapas Motoras",
          desc: "Trate o carregador como duas ações distintas: uma descida vertical firme e contínua nos primeiros 8 a 10 tiros, seguida de micro-ajustes horizontais com os dedos.",
          tips: "A maioria dos abates competitivos ocorre nos primeiros 8 tiros; priorize a perfeição da puxada vertical inicial."
        },
        {
          name: "Arrasto pelo Antebraço para Preservar o Punho",
          desc: "Utilize o antebraço deslizando suavemente pela mesa para guiar o movimento descendente, evitando dobrar excessivamente o punho para baixo.",
          tips: "Dobrar o punho em ângulo extremo bloqueia a mobilidade lateral necessária para corrigir as oscilações finais do spray."
        },
        {
          name: "Atrito Dinâmico Controlado do Mousepad",
          desc: "Exerça uma leve pressão para baixo para engajar o atrito dinâmico do mousepad, prevenindo acelerações verticais descontroladas durante a descida do mouse.",
          tips: "Mousepads com superfície texturizada oferecem maior previsibilidade de frenagem motora."
        },
        {
          name: "Fixação Visual no Alvo e Não na Retícula",
          desc: "Mantenha seus olhos fixos no ponto do inimigo onde os projéteis devem acertar. Deixe a compensação do mouse ocorrer por memória muscular automatizada.",
          tips: "Ficar olhando a retícula subir e descer induz correções visuais atrasadas de 200 ms que prejudicam o controle."
        }
      ]
    },
    steps: [
      "Ajuste sua sensibilidade real de jogo e DPI para garantir correspondência neuromuscular idêntica de cm/360 e trave o cursor.",
      "Ao iniciar o disparo, aplique imediatamente uma puxada suave para baixo compensando a subida vertical inicial.",
      "Após o décimo disparo, module o mouse lateralmente na direção oposta ao padrão de dispersão da arma.",
      "Mantenha o agrupamento estrito no centro da silhueta para elevar seu multiplicador de combo e progredir pelos níveis."
    ],
    audience: "Jogadores de CS2, Valorant, Apex Legends e PUBG que buscam dominar sprays completos de armas, erradicar recuo excessivo e executar transferências de alvo implacáveis.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'woodworth1899'),
    related: [
      { href: "/pt/drills/fps/flick-shot-training", label: "Treino de Flick Shot" },
      { href: "/pt/drills/fps/pro-smooth-pursuit", label: "Tracking Suave Profissional" },
      { href: "/pt/drills/fps/micro-correction-precision", label: "Micro Correção de Mira" },
      { href: "/pt/drills/fps/anti-strafe-jitter-duel", label: "Duelo Anti-Strafe Jitter" }
    ]
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <RecoilControlClient copy={copyPt} />

      <DrillGuide guide={recoilControlGuide} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/recoil-control"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
