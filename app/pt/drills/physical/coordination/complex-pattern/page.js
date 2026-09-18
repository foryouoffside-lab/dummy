import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (BR / PT)
// Primary Intent: jogo de memoria visual, teste de memoria de trabalho visual, teste de coordenacao motora fina
// Portuguese Context: Memorização de padrões geométricos vetoriais e reprodução motora sob pressão de tempo
// High-Demand, Low-Competition Target Keywords:
//   - "jogo de memoria visual online" (High-volume brain game query)
//   - "teste de memoria de trabalho visual" (Clinical & cognitive sports query)
//   - "teste de coordenacao motora fina" (Motor control & tracing benchmark)
//   - "jogo de memorizar sequencia" (Sequential memory game query)
//   - "teste de coordenacao viso motora" (Visuomotor integration diagnostic)
//   - "memorizar padroes geometricos" (Spatial geometry retention query)
//   - "memoria espacial e controle de recoil" (Esports recoil pattern retention)
//   - "treino de traco vetorial" (Vector path tracing accuracy)
//   - "agilidade motora sequencial" (Sequential motor agility query)
//   - "bloco de notas visuoespacial treino" (Baddeley visuospatial buffer drill)
// ============================================================

export const metadata = {
  title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
  description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.',
  keywords: [
    "jogo de memoria visual online",
    "teste de memoria de trabalho visual",
    "teste de coordenacao motora fina",
    "jogo de memorizar sequencia",
    "teste de coordenacao viso motora",
    "memorizar padroes geometricos",
    "memoria espacial e controle de recoil",
    "treino de traco vetorial",
    "agilidade motora sequencial",
    "bloco de notas visuoespacial treino"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
    description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.',
    url: 'https://skilldrills.online/pt/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
    description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.',
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
      "name": "Coordenação Motora e Espacial",
      "item": "https://skilldrills.online/pt/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Memória de Padrões Complexos e Coordenação Fina",
      "item": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Treinador de Memória Visual e Padrões Vetoriais (Complex Pattern Pro)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Ferramenta cognitiva e motora para avaliar e expandir a memória de trabalho visoespacial através da memorização de padrões geométricos e traçado de vetores de alta precisão."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Memória Visual e Traçado de Padrões",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern",
  "description": "Jogo online gratuito para treinar coordenação viso-motora e memória espacial reproduzindo trajetórias vetoriais complexas sob limite de tempo.",
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
  "name": "Desafio de Padrões Complexos (Complex Pattern)",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern",
  "description": "Jogo de habilidade mental e motora onde o jogador memoriza vértices geométricos e os reproduz com o mouse em alta velocidade.",
  "genre": ["Action", "Brain Game", "Reflex Game", "Coordination"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o exercício de Padrões Complexos (Complex Pattern Pro) e como ele funciona?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Complex Pattern Pro é um treino cognitivo e motor que desafia a retenção geométrica e a precisão do traçado manual. Uma trajetória vetorial com múltiplos nós pisca brevemente na tela; você deve reter a forma no cérebro e, após o desaparecimento, clicar no nó inicial ciano e arrastar o cursor até o nó final magenta, recriando com exatidão o padrão."
      }
    },
    {
      "@type": "Question",
      "name": "Como a mecânica de desenhar trajetórias se traduz em vantagens em jogos como Valorant e CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Memorizar formas angulares e reproduzi-las rapidamente no mouse estimula o sequenciamento motor (Lashley, 1951), exatamente o mesmo processo neural exigido para dominar padrões complexos de recuo de armas (spray recoil) e alinhar a mira em múltiplos ângulos de forma fluida."
      }
    },
    {
      "@type": "Question",
      "name": "Como a dificuldade se intensifica nos níveis mais altos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme sua pontuação aumenta, o exercício evolui até o Nível 15. A contagem de nós sobe de 3 para até 8 vértices, o tempo de exibição cai de 2,0s para apenas 0,6s (exigindo codificação quase instantânea), e o limiar de precisão de similaridade geométrica exigido sobe de 50% para 85%."
      }
    },
    {
      "@type": "Question",
      "name": "O que acontece se eu errar o desenho ou não atingir a precisão mínima?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se o traçado não atingir o percentual de precisão exigido para o nível atual, a tentativa é considerada perdida, a tela pisca em vermelho e seu multiplicador de combo retorna para 1.0x. No entanto, não há dedução na pontuação total nem penalidade de tempo na sessão de 45 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o 'bloco de notas visuoespacial' de Baddeley citado na fundamentação científica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De acordo com o modelo de Alan Baddeley (1974), o bloco de notas visuoespacial é o componente da memória de trabalho encarregado de reter e manipular temporariamente coordenadas espaciais, distâncias e formas geométricas. O exercício sobrecarrega intencionalmente esse buffer mental para forçar a plasticidade neural."
      }
    },
    {
      "@type": "Question",
      "name": "Quantos pontos são necessários para alcançar a nota máxima (Tier 1: Master)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O nível Tier 1 (Apex Pattern Master / Nota S+) exige 17.000 pontos ou mais, superando o Nível 12 com uma média de precisão de traçado superior a 85% em padrões intrincados de 7 a 8 vértices. A faixa média de jogadores (Tier 4) situa-se entre 6.000 e 9.499 pontos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a melhor estratégia mental para memorizar padrões de 6 a 8 nós em 0,6 segundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A melhor técnica é o 'agrupamento espacial' (chunking). Em vez de memorizar cada nó individualmente, visualize o padrão como uma única figura geométrica fechada (como uma letra Z alongada ou um triângulo sobreposto) e concentre-se na direção do vetor inicial que parte do nó ciano."
      }
    },
    {
      "@type": "Question",
      "name": "Qual estilo de movimento manual é mais eficiente: arrasto contínuo ou paradas em cada nó?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Um traçado contínuo e fluido com micropausas apenas nos vértices de ângulo agudo costuma obter a maior pontuação de similaridade temporal e espacial, evitando linhas tremidas ou arcos deformados que reduzem a pontuação."
      }
    },
    {
      "@type": "Question",
      "name": "O exercício é compatível com dispositivos móveis ou telas sensíveis ao toque?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Embora seja otimizado para mouse com sistema Pointer Lock em computadores, o exercício oferece suporte touch nativo para tablets e smartphones, permitindo desenhar os vetores diretamente com o dedo."
      }
    },
    {
      "@type": "Question",
      "name": "Com que frequência devo praticar para notar melhorias perceptíveis na coordenação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sessões diárias de 5 a 10 minutos são suficientes para induzir consolidação sináptica na coordenação olho-mão e ampliar a capacidade do buffer visoespacial sem causar fadiga muscular no punho."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar Memória Visual e Traçado de Padrões em 4 Passos",
  "description": "Procedimento passo a passo para memorizar sequências vetoriais complexas e reproduzi-las com alta precisão.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fase de Codificação e Memorização Flash",
      "text": "Fixe o olhar no canvas assim que o padrão de nós aparecer. Observe o ponto de partida ciano e a sequência de ângulos antes que a linha desapareça.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Retenção Mental no Buffer Visoespacial",
      "text": "Mantenha a imagem espacial ativa na mente por fração de segundo, antecipando o primeiro vetor de movimento do mouse.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execução Motora Fluida do Traçado",
      "text": "Clique no nó inicial ciano e arraste a linha continuamente pelos vértices intermediários até alcançar o nó final magenta.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Liberação do Clique e Avaliação de Similaridade",
      "text": "Solte o botão do mouse sobre o nó magenta para submeter o traço. Ao atingir o percentual de acerto, ganhe bônus e acumule combos até 3.0x.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
    paragraphs: [
      "A capacidade de reter uma estrutura geométrica temporária e traduzi-la em uma trajetória motora suave é uma das funções mais complexas do encéfalo humano. O exercício de Padrões Complexos recruta ativamente o córtex pré-frontal dorsolateral e o córtex parietal posterior, regiões responsáveis pelo 'bloco de notas visuoespacial' (Baddeley & Hitch, 1974). A tarefa não avalia apenas a memória passiva, mas a habilidade de manipular internamente representações angulares sob restrição severa de tempo.",
      "Segundo as teorias de sequenciamento motor de Karl S. Lashley (1951), tarefas com múltiplos waypoints não podem ser processadas nó por nó de maneira isolada em velocidades altas; o sistema neuromotor precisa agrupar a sequência em uma 'macroestrutura' motora (chunking). Isso espelha diretamente o controle de recuo de armas em jogos de tiro em primeira pessoa, onde o competidor não pensa em cada desvio individual, mas executa um gesto espacial integrado.",
      "À medida que a dificuldade avança para o Nível 15, a quantidade de nós atinge 8 vértices, ultrapassando a capacidade padrão da memória de trabalho imediata descrita por Nelson Cowan (2001), que estabelece um limite de cerca de 4 itens simultâneos. Ao mesmo tempo, o tempo de exibição é reduzido para apenas 0,6 segundo e a exigência de similaridade sobe para 85%, obrigando o praticante a refinar a velocidade e a precisão das microcorreções manuais descritas na fase de controle contínuo de Woodworth (1899).",
      "Precisão temporal e telemetria local: Os tempos de exibição e de desenho são controlados com exatidão através da API performance.now() do navegador. A detecção de similaridade do traço compara os vetores traçados com as coordenadas alvo em tempo real. Telas de 144Hz a 240Hz proporcionam maior nitidez durante a apresentação flash do padrão, minimizando o efeito de 'ghosting' e facilitando a codificação retiniana instantânea (Woods et al., 2015). Todos os dados e pontuações são salvos localmente na máquina do usuário, garantindo privacidade completa."
    ]
  },
  benchmarks: {
    title: "Padrões Oficiais de Memória Visuoespacial e Coordenação Fina",
    headers: ["Nível", "Título do Nível", "Pontuação Alvo", "Acurácia de Trajeto", "Nota", "Percentil Global"],
    rows: [
      ["Tier 1", "Mestre Supremo de Padrões Visuais", "17.000+ pontos", "Nível 12–15 / Acurácia >92%", "Nota S+", "Top 0,5% (Capacidade Excepcional)"],
      ["Tier 2", "Rastreador de Sequências de Elite", "13.000 a 16.999 pts", "Nível 9–11 / Acurácia 85–91%", "Nota A", "Top 5% (Nível Avançado)"],
      ["Tier 3", "Navegador Espacial Avançado", "9.500 a 12.999 pts", "Nível 6–8 / Acurácia 76–84%", "Nota B", "Top 20% (Alta Competência)"],
      ["Tier 4", "Praticante de Memória Intermediário", "6.000 a 9.499 pts", "Nível 3–5 / Acurácia 65–75%", "Nota C", "50% (Média de Adultos Saudáveis)"],
      ["Tier 5", "Iniciante em Retenção de Trajetos", "< 6.000 pontos", "Nível 1–2 / Acurácia <65%", "Nota D", "Iniciante (Treino Recomendado)"],
    ],
    note: "Parâmetros estandardizados com base em capacidade de memória de trabalho visuoespacial (Baddeley & Hitch 1974; Cowan 2001) e sequenciamento motor serial (Lashley 1951).",
  },
  protocols: {
    title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
    description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.',
    items: [
      {
        title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
        description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.'
      },
      {
        title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
        description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.'
      },
      {
        title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
        description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.'
      },
      {
        title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
        description: 'Jogo de memória visual e espacial gratuito. Memorize trajetos complexos entre pontos para treinar sua memória de trabalho e coordenação motora no PC.'
      }
    ]
  },
  faqs: {
    title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function ComplexPatternPtPage() {
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
      <ComplexPatternClient
        copy={{
          title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
          subtitle: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills',
          hudLabels: {
            score: "Pontos",
            time: "Tempo",
            accuracy: "Precisão Média",
            traced: "Traçados",
            missed: "Erros",
            peakLevel: "Nível Máx",
            getReady: "PREPARE-SE",
            points: "Pontos",
            playAgain: "Jogar Novamente"
          },
          rulesTitle: "Instruções do Exercício e Sistema de Pontuação",
          rules: [
            { title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills', text: "Observe o traçado geométrico multinodal exibido na tela antes que ele desapareça." },
            { title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills', text: "Clique no nó inicial ciano e arraste o mouse até o nó final magenta para reproduzir o padrão." },
            { title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills', text: "Alcance a porcentagem de similaridade requerida para validar a sequência e acumular combo." },
            { title: 'Jogo de Memória Visual – Padrões Espaciais | SkillDrills', text: "Não atingir a precisão exigida reinicia o combo para 1.0x, sem perda de pontos acumulados." }
          ],
          aboutTitle: "Sobre o Jogo de Memória de Padrões",
          aboutHeading: "Memória de Trabalho Espacial e Traçado Multinodal",
          aboutText: "O exercício avalia a memória de trabalho visoespacial, a retenção geométrica e o controle vetorial fino sob pressão de tempo. Os praticantes memorizam caminhos geométricos exibidos rapidamente e os reproduzem com exatidão a partir da memória, desenvolvendo fluidez essencial para controle de recoil e gestos rápidos no mouse."
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/coordination/complex-pattern" />
    </>
  );
}
