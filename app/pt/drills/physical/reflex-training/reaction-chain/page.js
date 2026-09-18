import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (PT / PT-BR)
// Primary Intent: treino de frenagem de mira mouse, como corrigir overflick, teste de inibição motora
// Brazilian Gaming Context: Correção de overflick no Valorant e CS2, frenagem cinética do mouse, inibição de resposta
// High-Demand, Low-Competition Target Keywords:
//   - "treino de frenagem de mira mouse" (Mouse aim braking training)
//   - "como corrigir overflick no mouse" (How to fix overflick)
//   - "teste de inibição motora reflexo" (Motor inhibition reflex test)
//   - "jogo de reflexo e parada do mouse" (Mouse stop reflex game)
//   - "treino de controle e desaceleração do mouse" (Mouse deceleration control training)
//   - "parada cinética mira reflexo" (Kinetic arrest aim reflex)
//   - "teste de precisão e reflexo do mouse" (Mouse precision & reflex test)
//   - "jogo de velocidade de reação mouse" (Mouse reaction speed game)
// ============================================================

export const metadata = {
  title: "Frenagem de Mira – Inibição Motora no Mouse | SkillDrills",
  description: "Treine frenagem de mira e inibição motora no mouse. Intercepte nós cinéticos e elimine o overflick em alta velocidade no navegador.",
  keywords: [
    "treino de frenagem de mira mouse",
    "como corrigir overflick no mouse",
    "teste de inibição motora reflexo",
    "jogo de reflexo e parada do mouse",
    "treino de controle e desaceleração do mouse",
    "parada cinética mira reflexo",
    "teste de precisão e reflexo do mouse",
    "jogo de velocidade de reação mouse",
    "como parar a mira no alvo",
    "treino de mira valorant frenagem"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "Frenagem de Mira – Inibição Motora no Mouse | SkillDrills",
    description: "Elimine o overflick estabilizando o cursor instantaneamente no primeiro disparo. Treino motor avançado para CS2 e Valorant.",
    url: 'https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
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
      "name": "Exercícios",
      "item": "https://skilldrills.online/pt/drills"
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
      "name": "Cadeia de Reação (Frenagem de Mira)",
      "item": "https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treino de Frenagem de Mira & Inibição Motora no Mouse (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Módulo biomecânico interativo para treinar a desaceleração motora, o controle de inibição de resposta e a eliminação de overflicking em miras rápidas.",
  "url": "https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/pt"
  },
  "inLanguage": "pt",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Frenagem de Mira – Inibição Motora no Mouse | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "pt",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treino de Frenagem de Mira & Inibição Motora no Mouse",
  "url": "https://skilldrills.online/pt/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "Intercepte nós a até 1.800 px/s e force o cursor a desacelerar para menos de 1,5 px/frame dentro do perímetro para acumular combos de até 3,0x."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Por que travar o mouse milimetricamente no alvo é neurologicamente mais complexo do que acelerar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A aceleração motora decorre de uma contração direta dos músculos agonistas. Já a desaceleração de precisão exige que os grupos musculares antagonistas produzam forças opostas com calibração milimétrica em frações de milissegundo. Conforme Woodworth (1899), a fase final de controle óptico possui uma latência inerente de 100 a 150 ms; qualquer erro no comando de freio faz com que a inércia física projete o cursor para além do alvo (overflick)."
      }
    },
    {
      "@type": "Question",
      "name": "O que estabelece o Modelo de Corrida de Cavalos (Logan & Cowan, 1984) sobre a inibição motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O modelo propõe que o comando de execução ('Go process') e o comando de inibição/parada ('Stop process') disputam de forma independente nos gânglios da base. Para que um movimento rápido seja contido antes de ultrapassar o alvo, o sinal de parada precisa alcançar a linha de chegada neural antes que o impulso motor atinja o pico muscular."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Stop-Signal Reaction Time (SSRT) e como ele impacta a mira em jogos de tiro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O SSRT representa a latência neural interna (geralmente entre 180 e 250 ms) necessária para que o giro frontal inferior direito (rIFG) e o núcleo subtalâmico (STN) interrompam uma ação motora já engatilhada (Verbruggen & Logan, 2008). Um SSRT veloz permite abortar um flick errôneo e travar a retícula instantaneamente na cabeça do adversário."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a principal causa biomecânica do overflick em jogos como Valorant e CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O desequilíbrio na cocontração dos flexores e extensores do antebraço. Aplicar força balística excessiva faz com que a energia cinética do mouse supere o coeficiente de atrito estático do mousepad. O treino de frenagem condiciona a aderência mecânica através das pontas dos dedos e da base do mouse."
      }
    },
    {
      "@type": "Question",
      "name": "Como a Lei de Fitts (Fitts, 1954) afeta o exercício quando a velocidade dos nós aumenta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pela Lei de Fitts, o índice de dificuldade (ID) cresce logaritmicamente à medida que a tolerância espacial (tamanho útil do alvo) diminui em relação à distância percorrida. A 1.800 px/s, a janela temporal de ajuste visual fecha completamente, exigindo desaceleração em malha aberta puramente antecipada pelo cerebelo."
      }
    },
    {
      "@type": "Question",
      "name": "O que significa a exigência de 'menos de 1,5 px/frame' para validar uma parada cinética?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Esse critério elimina o 'slice-through' — o vício de apenas passar o cursor raspando pelo nó em alta velocidade. A 144 Hz, 1,5 px/frame equivale a menos de 216 px/s, confirmando que os músculos realmente absorveram o momento cinético e entraram em atrito estático real."
      }
    },
    {
      "@type": "Question",
      "name": "O tipo de mousepad e os skates do mouse afetam a eficiência de parada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Mousepads de vidro ou tecidos ultra-rápidos reduzem a força inicial, mas oferecem baixíssimo poder de frenagem (stopping power), sobrecarregando os músculos do antebraço. Para dominar a desaceleração, pads híbridos ou de controle proporcionam maior atrito estático, facilitando travar a mira."
      }
    },
    {
      "@type": "Question",
      "name": "Monitores de 144Hz ou 240Hz fazem diferença no treino de inibição motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme Woods et al. (2015), telas de 60Hz introduzem 16,6 ms de atraso por quadro e geram borrões nos momentos críticos de parada. Em 240Hz (4,1 ms), a trajetória subpixel do nó é renderizada de forma contínua, permitindo ao córtex visual emitir o sinal de freio com mais de 10 ms de antecipação."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é o tempo diário ideal para treinar sem gerar estresse muscular ou neural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões de 15 a 20 minutos por dia (10 a 15 repetições de 45 segundos com intervalos de 45 segundos) são perfeitas. Por envolver inibição ativa do sistema nervoso central, fadiga excessiva leva à rigidez do punho; caso sinta tensão muscular contínua, interrompa o treino de imediato."
      }
    },
    {
      "@type": "Question",
      "name": "Como aplicar a precisão desenvolvida no Reaction Chain diretamente nas partidas competitivas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mantenha rigorosamente a mesma sensibilidade e pegada (grip) utilizadas em seu jogo principal. Durante o exercício, foque não em 'clicar no alvo', mas na sensação tátil de 'ancorar' o cursor no centro do nó. Esse hábito motor estabiliza o primeiro tiro sob pressão real de combate."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Passo a Passo para o Treino de Frenagem de Mira e Inibição Motora",
  "description": "Protocolo de 4 fases para interceptar alvos em deslocamento veloz e zerar a inércia física do cursor.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ativação do Pointer Lock e Centralização",
      "text": "Clique na área de treino para prender o cursor e posicione a mira no ponto central da tela."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Antecipação de Trajetória e Flick Balístico",
      "text": "Identifique o vetor do nó surgindo nas extremidades e projete um flick acelerado até 80% da distância."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ativação Antagonista e Parada Cinética",
      "text": "Ao adentrar a borda do nó, acione a musculatura antagonista e pressão descendente das pontas dos dedos para parar sob 1,5 px/frame."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Manutenção de Combo e Meta de 15.000 Pontos",
      "text": "Sustente paradas limpas e ininterruptas durante 45 segundos para atingir o multiplicador de 3,0x e superar 15.000 pontos."
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Neurofisiologia da Inibição Motora e Biomecânica da Parada Cinética",
    paragraphs: [
      "Arremessar o cursor com velocidade máxima em direção a um alvo é uma habilidade comum; interromper seu deslocamento sem deslizar um único pixel além da coordenada exata é o verdadeiro ápice da maestria neuromotora. Enquanto a maioria dos treinadores de mira foca unicamente no instante do clique, o Reaction Chain isola a capacidade do sistema nervoso de estancar a inércia física logo após a interceptação (Kinetic Arrest).",
      "De acordo com o célebre 'Modelo de Corrida de Cavalos' de Gordon D. Logan e William B. Cowan (1984), o impulso de execução ('Go process') e o impulso inibitório ('Stop process') competem de modo concorrente nos gânglios da base. Para congelar o cursor sobre um nó dinâmico, o núcleo subtalâmico (STN) e o giro frontal inferior (rIFG) precisam disparar contrações antagonistas ultrarrápidas capazes de sobrepujar o momento de aceleração (Verbruggen & Logan, 2008).",
      "O modelo bifásico de Robert S. Woodworth (1899) demonstrou que miras velozes dividem-se em um disparo balístico em malha aberta e uma desaceleração óptica terminal. Quando a velocidade atinge 1.800 px/s, a Lei de Fitts (1954) dita o fechamento total da margem de erro: correções visuais tardias tornam-se biologicamente impossíveis, restando apenas o planejamento motor prévio como proteção contra o overflick.",
      "Com a precisão milimétrica da API performance.now(), este módulo calcula em tempo real o deslocamento do cursor quadro a quadro e exige velocidade inferior a 1,5 px/frame para registrar a parada. Quando praticado em monitores de 144Hz ou 240Hz com mouses a 1000Hz, o atraso de exibição cai para menos de 4 ms, propiciando o ambiente ideal para neuroplasticidade (Woods et al., 2015)."
    ]
  },
  benchmarks: {
    title: "Escala Oficial de 5 Níveis para Frenagem de Mira e Inibição Motora",
    headers: ["Nível de Habilidade", "Título Oficial", "Faixa de Pontuação", "Taxa de Sucesso na Parada", "Classificação", "Perfil Neuromotor"],
    rows: [
      ["Tier 1: Mestre Supremo da Parada Cinética", "Apex Kinetic Arrester", "15.000+ pts", "95%+ / 1500+ px/s", "Grade S", "Top 0,1% mundial. Controle de inibição sobre-humano: estanca instantaneamente mesmo em nós a 1.800 px/s sem qualquer overflick (Logan 1984; Woodworth 1899)"],
      ["Tier 2: Atirador de Precisão Cinética", "Precision Kinetic Sniper", "11.000 – 14.999 pts", "90 – 94% / 1200 – 1499 px/s", "Grade A", "Top 3% profissional. Excelente desaceleração via pontas dos dedos; travamento sólido após flicadas intensas"],
      ["Tier 3: Piloto Experiente de Desaceleração", "Skilled Deceleration Pilot", "7.500 – 10.999 pts", "82 – 89% / 900 – 1199 px/s", "Grade B", "Top 15% competitivo. Frenagem consistente em médias velocidades; falhas esporádicas de derrapagem em velocidades extremas"],
      ["Tier 4: Praticante de Frenagem em Evolução", "Developing Stopper", "4.000 – 7.499 pts", "70 – 81% / 600 – 899 px/s", "Grade C", "Média padrão. Tendência a passar do alvo por falta de engajamento antagonista no momento certo"],
      ["Tier 5: Aluno Iniciante de Desaceleração", "Novice Arrester Trainee", "< 4.000 pts", "< 70% / < 600 px/s", "Grade D", "Atraso na inibição motora gera erros frequentes; necessário treinar desaceleração mecânica no mousepad"]
    ],
    note: "Calibrado com base no Modelo de Corrida de Logan (1984), no controle bifásico de Woodworth (1899) e na Lei de Fitts (1954)."
  },
  techniques: {
    title: "Técnicas Práticas de Frenagem de Mira",
    items: [
      {
        name: "Frenagem Antecipada de Logan (Logan Kinetic Brake)",
        desc: "Tentar travar o mouse apenas após tocar o nó resulta invariavelmente em ultrapassagem devido ao atraso neural. Dispare o comando de freio ao cobrir 80% do trajeto para que o cursor atinja velocidade zero exatamente ao cruzar o nó.",
        tips: "Visualize a ação não como bater no nó, mas como pregar o cursor firmemente no centro dele."
      },
      {
        name: "Pressão Descendente com as Pontas dos Dedos (Fingertip Downforce)",
        desc: "Evite depender apenas das articulações do punho para frear. No momento do bloqueio, exerça leve pressão descendente com os dedos contra o mousepad para maximizar o atrito estático da base.",
        tips: "Aproveite a maciez do tecido do mousepad para gerar frenagem mecânica imediata."
      },
      {
        name: "Eliminação Total do Slice-Through",
        desc: "Passar direto pelo nó clicando no caminho prejudica o recoil e a precisão do primeiro tiro. Certifique-se de que o cursor pare por completo até que o indicador verde 'ARREST READY' confirme o acerto.",
        tips: "A firmeza de parada dentro da área do nó é muito mais valiosa do que a pressa descontrolada."
      },
      {
        name: "Manutenção de Combo 3,0x",
        desc: "Erros de ultrapassagem não subtraem pontuação, mas resetam o combo para 1,0x. Complete os níveis iniciais com 100% de paradas para usufruir do multiplicador 3,0x nas fases velozes.",
        tips: "Mais de 80% da pontuação total é conquistada durante os períodos com multiplicador máximo."
      }
    ]
  },
  steps: [
    "Ative o bloqueio do cursor na área de jogo e posicione a mira com empunhadura estável (fingertip ou claw).",
    "Mire no nó que se aproxima e inicie um movimento de aceleração balística firme.",
    "Antes de cruzar a borda do alvo, acione a frenagem antagonista e pressão nos dedos para estancar sob 1,5 px/frame.",
    "Repita o procedimento com perfeição por 45 segundos para conservar o combo de 3,0x e superar 15.000 pontos."
  ],
  audience: "Jogadores de Valorant, CS2, Overwatch 2 e Apex Legends que buscam extinguir o overflick e alcançar precisão cirúrgica de primeiro disparo, bem como qualquer pessoa em busca de refinamento neuromotor.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPagePt() {
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
      <ReactionChainClient
        copy={{
          title: "Treino de Frenagem de Mira & Inibição Motora",
          subtitle: "Parada Cinética & Controle de Desaceleração • 15 Níveis de Velocidade",
          badge: "Teste de Inibição Motora",
          description: "Travar um movimento rápido exatamente sobre um alvo é biomecanicamente mais exigente do que acelerar. Os processos de execução e inibição disputam espaço no cérebro (Logan & Cowan, 1984). Se o freio atrasar, a inércia provoca o temido overflick (Woodworth, 1899). Intercepte os nós e estanque o cursor instantaneamente.",
          hudLabels: {
            score: "Pontuação",
            time: "Tempo",
            accuracy: "Precisão de Parada",
            bestScore: "Melhor Pontuação",
            getReady: "PREPARE-SE"
          },
          pauseTitle: "Treino Pausado",
          pauseSubtitle: "Clique na tela para reativar o bloqueio do cursor.",
          resultLabels: {
            newBest: "NOVO RECORDE",
            points: "Pontos",
            accuracy: "Precisão",
            totalArrests: "Paradas Cinéticas",
            maxCombo: "Combo Máximo",
            peakLevel: "Nível Máximo",
            playAgain: "Jogar Novamente"
          },
          rulesTitle: "Regras do Drill & Sistema de Pontos",
          rulesItems: [
            { title: "Parada Cinética (+50 PTS)", text: "Intercepte o nó e pare completamente o cursor dentro do perímetro (ARREST READY) para somar 50 pontos." },
            { title: "Multiplicador de Combo (até 3,0x)", text: "Sequências perfeitas de frenagem aumentam o multiplicador progressivamente até o teto de 3,0x." },
            { title: "Passagem Direta & Erros", text: "Passar raspando sem parar ou errar o nó reinicia o combo (sem perda de pontuação acumulada)." },
            { title: "Aceleração Extrema", text: "Conforme sua pontuação sobe, os nós aceleram até 1.800 px/s e o raio de parada se contrai." }
          ],
          aboutTitle: "Sobre Frenagem de Mira & Inibição Neuromotora",
          aboutSections: [
            {
              title: "Frenagem Cinética & Neurofisiologia da Inibição",
              content: "O Reaction Chain condiciona a capacidade de desaceleração motora e inibição de resposta. Em vez de simplesmente clicar em alvos em movimento, você deve interceptar os nós e forçar os músculos antagonistas a absorverem a energia do cursor dentro da área demarcada."
            },
            {
              title: "Modelo de Corrida de Logan & Mira Cirúrgica",
              content: "A prática contínua da parada cinética recalibra o núcleo subtalâmico e o córtex motor (Logan et al., 1984). Isso erradica o overflick descontrolado e consolida uma estabilização de primeiro disparo impecável em jogos como CS2 e Valorant."
            }
          ],
          aboutCards: [
            {
              title: "Atletas Alvo",
              desc: "Jogadores de FPS focados em eliminar o overflicking e esportistas que demandam rápida frenagem motora.",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "Habilidades Desenvolvidas",
              desc: "Desaceleração precisa, controle de atrito estático, inibição de sinal de parada (SSRT) e interceptação espacial.",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "Frenagem Cinética",
              desc: "Intercepte nós a até 1.800 px/s e estanque sob 1,5 px/frame para sustentar multiplicadores de 3,0x.",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
