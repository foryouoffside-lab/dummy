import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: "Jogo da Memória Online – Sequência de Cores | SkillDrills",
  description: "Jogue o jogo da memória online grátis. Memorize sequências de cores em expansão e teste o limite da sua memória de trabalho visual no navegador.",
  keywords: [
    "jogo da memoria online",
    "jogo da memoria",
    "jogo da memória",
    "jogo de memoria",
    "jogo de memória",
    "jogo de memoria gratis online",
    "jogo da memoria de cores",
    "treino de memoria visual",
    "memoria de curto prazo teste",
    "memoria operacional visual",
    "jogo genius online",
    "simon game online",
    "teste de amplitude de memoria"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jogo da Memória Online - Sequência de Cores e Memória Visual",
    description: "Desafie sua memória operacional visual e retenção de sequências com nosso jogo da memória online gratuito. Supere o gargalo de memória de curto prazo.",
    url: "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jogo da Memória Online - Sequência de Cores e Memória Visual",
    description: "Desafie sua memória operacional visual e retenção de sequências com nosso jogo da memória online gratuito. Supere o gargalo de memória de curto prazo.",
  },
};

export default function PortugueseColorSequencePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinos de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memória de Curto Prazo", "item": "https://skilldrills.online/pt/drills/memory" },
      { "@type": "ListItem", "position": 4, "name": "Jogo da Memória Online", "item": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Jogo da Memória Online",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": "Treino interativo gratuito de memória operacional visual que avalia a retenção de padrões cromáticos sequenciais, capacidade de agrupamento e foco atencional.",
    "genre": "Treinamento Cognitivo / Memória Visual de Trabalho",
    "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Jogo da Memória Online",
    "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence",
    "description": "Jogo de memória online gratuito para navegador com 6 blocos cromáticos e protocolo adaptativo em escada. Pratique retenção de sequências e agrupamento cognitivo.",
    "dateModified": "2026-09-11",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
  };

  
const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Sequência de Cores Online (Treino de Memória)",
  "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence",
  "description": "Jogo online de retenção e repetição de sequências cromáticas progressivas. Treine memória visual e atenção sequencial.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Treino de Memória", "Jogos Cognitivos", "Memória Visual", "Sequência de Cores"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o Jogo da Memória Online de sequências de cores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O Jogo da Memória Online de sequências de cores é um exercício cognitivo interativo projetado para testar e expandir a memória operacional visual. O jogador observa uma sequência luminosa expansiva entre seis botões coloridos, retém a ordem temporal exata no buffer de memória de curto prazo e reproduz a cadeia de cores com precisão."
        }
      },
      {
        "@type": "Question",
        "name": "Quantos itens a memória visual de curto prazo consegue reter simultaneamente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enquanto George A. Miller (1956) sugeriu o clássico limiar de 7 ± 2 itens para estímulos verbais, estudos contemporâneos sobre memória puramente visual de Nelson Cowan (2001) e Steven J. Luck & Edward K. Vogel (1997) demonstram que a capacidade não agrupada é estritamente limitada a cerca de 4 itens. Superar 4 estímulos exige técnicas ativas de agrupamento cognitivo (chunking)."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre memória de trabalho e memória de curto prazo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A memória de curto prazo refere-se ao armazenamento passivo e temporário de informações por breves instantes. Já a memória operacional (ou memória de trabalho), modelada por Alan Baddeley (2000), envolve retenção ativa, manipulação contínua, ordenação temporal e filtragem de estímulos no esboço visuoespacial durante a execução de uma tarefa."
        }
      },
      {
        "@type": "Question",
        "name": "Como a mecânica clássica do jogo Genius / Simon estimula o cérebro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A reprodução de sequências cromáticas popularizada pelo Genius/Simon ativa tanto o cache visual (armazenamento temporário de cores) quanto o escriba interno (mecanismo que repassa trajetórias espaciais e sequências temporais), fortalecendo o foco sustentado e a resistência à interferência perceptual sob pressão de tempo."
        }
      },
      {
        "@type": "Question",
        "name": "O que é agrupamento cognitivo (chunking) e como aplicá-lo neste jogo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agrupamento cognitivo (chunking) é o processo mental de combinar elementos individuais em unidades conceituais maiores. Por exemplo, transformar 'Vermelho, Azul, Verde, Amarelo' em dois pares ('Vermelho-Azul' e 'Verde-Amarelo') permite guardar 4 cores como apenas 2 unidades de memória, contornando o gargalo biológico de 4 itens de Cowan."
        }
      },
      {
        "@type": "Question",
        "name": "Por que é mais difícil lembrar das cores no meio de uma sequência longa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Isso decorre do Efeito de Posição Serial. O efeito de primazia protege os primeiros itens da sequência pelo ensaio mental inicial, enquanto o efeito de recência preserva o último item pelo eco sensorial imediato. Os elementos centrais sofrem interferência proativa (estímulos anteriores) e retroativa (estímulos posteriores), tornando-se os mais propensos ao esquecimento."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre este teste de cores e o teste de amplitude de dígitos (Digit Span)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O teste de dígitos utiliza símbolos numéricos que são naturalmente processados pela alça fonológica (voz interna). O jogo da memória de cores isola prioritariamente o esboço visuoespacial, exigindo codificação cromática e espacial que dificulta a subvocalização simples, recrutando redes neurais distintas de memória de trabalho."
        }
      },
      {
        "@type": "Question",
        "name": "Treinar a memória sequencial visual ajuda nos estudos e na produtividade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. Exercícios consistentes de memória operacional visual fortalecem a atenção sustentada, reduzem a vulnerabilidade a distrações cotidianas e condicionam o controle executivo pré-frontal, fundamental para raciocínio lógico, programação, leitura analítica e esportes eletrônicos."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona o sistema adaptativo de dificuldade da escada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O comprimento da sequência cresce dinamicamente conforme o nível atingido (comprimento = nível + 2). Rodadas perfeitas elevam o nível em 1 ponto, enquanto erros ou estouros de tempo reduzem 1 nível. Esse protocolo adaptativo mantém o desafio calibrado exatamente na fronteira da capacidade cognitiva individual."
        }
      },
      {
        "@type": "Question",
        "name": "O jogo da memória online é gratuito e funciona no celular e computador?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim. O Jogo da Memória Online da SkillDrills é 100% gratuito, roda direto no navegador em smartphones, tablets e computadores sem necessidade de download, instalação ou cadastro, medindo respostas localmente pelo relógio de alta resolução performance.now()."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Treinar a Memória Sequencial de Cores Online",
    "description": "Passo a passo fundamentado em neuropsicologia para codificar, agrupar e reproduzir sequências cromáticas com exatidão.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence#step-1",
        "name": "Observe a Apresentação da Sequência",
        "text": "Fixe o olhar no centro da grade de 6 botões e acompanhe cada flash luminoso sem tentar interagir antecipadamente."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence#step-2",
        "name": "Agrupe as Cores em Unidades Pareadas",
        "text": "Divida mentalmente os estímulos em pares de cores (ex.: Vermelho-Azul, Verde-Amarelo) em vez de reter cada cor isolada."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence#step-3",
        "name": "Reproduza a Sequência com Ritmo Constante",
        "text": "Toque nas cores correspondentes na ordem exata. Mantenha uma cadência rítmica fluida para evitar esquecimento prematuro."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/color-sequence#step-4",
        "name": "Expanda sua Capacidade de Memória de Curto Prazo",
        "text": "Pratique de 3 a 5 sessões diárias para consolidar os circuitos frontoparietais e expandir o seu span de memória."
      }
    ]
  };

  const ptCopy = {
    title: 'Jogo da Memória Online',
    subtitle: 'Treino de Memória Operacional Visual e Retenção de Sequências de Cores',
    caption: 'Observe e reproduza a sequência luminosa de cores na ordem exata conforme o padrão se expande.',
    statScore: 'Pontuação',
    statTime: 'Tempo',
    statLevel: 'Nível',
    statBestScore: 'Recorde',
    rulesTitle: 'Instruções do Jogo & Sistema de Pontuação',
    rule1Text: 'Retenção Sequencial',
    rule1Highlight: '+100 PTS',
    rule1Result: 'Reproduza o padrão luminoso na ordem exata de exibição',
    rule2Text: 'Bônus de Nível',
    rule2Highlight: '+10% PTS / Nível',
    rule2Result: 'Sequências mais longas acumulam multiplicadores maiores',
    rule3Text: 'Erro ou Tempo Esgotado',
    rule3Highlight: '-1 Nível',
    rule3Result: 'Sem perda de pontuação acumulada; ajusta a dificuldade',
    rule4Text: 'Dificuldade Adaptativa',
    rule4Highlight: 'Sobe e Desce',
    rule4Result: 'O tamanho da sequência acompanha sua capacidade atual',
    aboutTitle: 'Sobre o Jogo da Memória de Sequência de Cores',
    overviewTitle: 'O que é o Treino de Memória Operacional Visual?',
    overviewLead: 'A memória de trabalho visual armazena cerca de 4 itens simples por vez, limite determinado pela contagem de objetos e não pela complexidade de cada um (Luck & Vogel, 1997; Cowan, 2001). Uma sequência expansiva de cores desafia diretamente essa fronteira cognitiva.',
    aboutIntro: [
      'O treino de memória visual isola e exercita a capacidade cerebral de codificar, reter e recuperar padrões cromáticos em sucessão temporal estrita.',
      'Ao praticar a reprodução sequencial de cores, você aprimora estratégias de agrupamento cognitivo (chunking) e desenvolve resistência à distração sob pressão de tempo.',
    ],
    aboutCards: [
      {
        title: 'Para Quem É?',
        text: 'Estudantes que buscam melhorar a retenção de leitura, adultos que desejam manter a agilidade mental e gamers que precisam processar padrões visuais com rapidez.',
      },
      {
        title: 'Habilidades Desenvolvidas',
        text: 'Retenção visual de curto prazo, amplitude de memória operacional, codificação sequencial e foco sustentado.',
      },
      {
        title: 'Agrupamento (Chunking)',
        text: 'Agrupe cores em blocos pareados (ex.: par Vermelho-Azul) para contornar o gargalo de capacidade imediata e alcançar níveis elevados.',
      },
    ],
    tapPrompt: 'Toque na Sequência em Ordem',
    evaluating: 'Avaliando...',
    startCardTitle: 'Jogo da Memória Online',
    startCardSubtitle: 'Memória Visual de Curto Prazo • Sequência de Cores',
    getReady: 'PREPARE-SE',
    newBest: 'NOVO RECORDE',
    points: 'Pontos',
    statAccuracy: 'Precisão',
    statPeakLevel: 'Nível Máximo',
    statPerfects: 'Perfeitos',
    playAgain: 'Jogar Novamente',
    shareTitle: 'Compartilhar Pontuação',
    exitTitle: 'Sair e Voltar',
  };

  const ptColorSequenceGuide = {
    heading: "Guia do Jogo da Memória Online: Memória Operacional e Retenção Sequencial",
    intro: [
      "O Jogo da Memória Online de sequências de cores é uma ferramenta interativa desenvolvida para mensurar, desafiar e expandir a capacidade de memória operacional visual e a retenção temporal de padrões. Diferente dos jogos tradicionais de encontrar pares estáticos de cartas em tabuleiros, este teste dinâmico desafia a amplitude imediata (span) do cérebro para reter estímulos cromáticos que surgem em ordem temporal estrita.",
      "A arquitetura da memória humana foi amplamente documentada pela neuropsicologia cognitiva. Enquanto George A. Miller (1956) postulou o limite de $7 \pm 2$ itens para memória verbal, pesquisas contemporâneas em memória puramente visual conduzidas por Nelson Cowan (2001) e pela dupla Steven J. Luck & Edward K. Vogel (1997) comprovaram que a capacidade da memória operacional visual não agrupada é de aproximadamente 4 itens independentes. Sem estratégias ativas de recodificação, a capacidade de retenção imediata sofre colapso além do quarto elemento.",
      "Segundo o modelo de memória operacional de Alan Baddeley (Baddeley & Hitch, 1974; Baddeley, 2000), o processamento de sequências visuais recruta ativamente o esboço visuoespacial (visuospatial sketchpad). Robert H. Logie (1995) subdividiu este componente em cache visual (armazenamento estático temporário de cores e formas) e escriba interno (mecanismo ativo de ensaio de sequências espaciais e temporais). Praticantes experientes conectam esse esboço à alça fonológica, gerando uma codificação dual (visual e subvocal) que dobra a resiliência do buffer de memória.",
      "Utilizando cronometria de alta resolução pelo relógio performance.now() do navegador (Woods et al., 2015), o teste avalia tanto a extensão máxima da sequência retida quanto o tempo de reação motor por toque, fornecendo uma métrica confiável de velocidade de processamento cognitivo e resistência à fadiga mental sob pressão.",
      "Como esta medição funciona: cada evento recebe registro temporal pela API performance.now(), executando exclusivamente no seu dispositivo -- nenhum dado pessoal é transmitido para servidores. Os cronômetros dos navegadores modernos sofrem atenuação intencional de precisão (~1 ms) para mitigar vulnerabilidades como Spectre, e a tela do monitor quantiza as atualizações conforme a taxa de quadros (cerca de 16,7 ms por quadro a 60 Hz; Woods et al., 2015). Diferenças inferiores a 5 ms devem ser interpretadas como ruído técnico, devendo o usuário comparar apenas desempenhos obtidos no mesmo dispositivo.",
      "Transparência de dados: a SkillDrills não coleta métricas agregadas nem armazena resultados em servidores externos. Suas pontuações permanecem salvas apenas no localStorage do seu navegador, razão pela qual não divulgamos médias populacionais não verificadas. Todas as faixas de referência citadas baseiam-se em publicações científicas peer-reviewed listadas no painel de referências abaixo.",
      "Isenção de responsabilidade médica: este jogo de navegador é uma ferramenta de treino reflexivo e entretenimento cognitivo. Não constitui dispositivo médico, exame diagnóstico ou terapia neurológica, e sua pontuação não reflete diagnóstico clínico. Em caso de dúvidas sobre sua memória ou cognição, consulte um médico especialista ou neuropsicólogo."
    ],
    benchmarks: {
      title: "Benchmarks de Memória Operacional Visual e Retenção Sequencial",
      headers: ["Nível de Desempenho", "Extensão da Sequência (Cores)", "Nível da Escada Adaptativa", "Perfil de Armazenamento e Recuperação Cognitiva"],
      rows: [
        ["Nível 1 (Elite / Memória de Trabalho Superior)", "9 a 11+ Cores", "Nível 7 a 9+", "Supera com facilidade o gargalo de 4 itens de Cowan; executa agrupamento bimodal contínuo (trajetória espacial + apoio subvocal rápido); latência média por clique < 400 ms."],
        ["Nível 2 (Capacidade Cognitiva Elevada)", "7 a 8 Cores", "Nível 5 a 6", "Atinge o clássico limiar de 7 itens de Miller; constrói blocos associativos de 2 a 3 cores; retenção estável de ordem sequencial com cadência de 400 a 550 ms por estímulo."],
        ["Nível 3 (Média Adulta da População)", "5 a 6 Cores", "Nível 3 a 4", "Padrão médio saudável; opera com agrupamento elementar, mas apresenta sensibilidade ao decaimento nos elementos centrais da cadeia; cadência de 550 a 750 ms."],
        ["Nível 4 (Buffer Sequencial Básico)", "4 Cores", "Nível 2", "Opera no limite biológico bruto de Cowan (cerca de 4 itens isolados); apresenta falhas quando a sequência exige recodificação sem auxílio verbal; cadência de 750 a 1.000 ms."],
        ["Nível 5 (Iniciante / Sobrecarga Cognitiva)", "3 Cores", "Nível 1", "Dificuldade para reter 3 estímulos cromáticos consecutivos; alta vulnerabilidade à interferência perceptual e decaimento imediato; cadência superior a 1.000 ms por toque."]
      ],
      note: "A extensão corresponde ao número de itens na sequência (nível + 2); a cadência de entrada afere o tempo médio entre a percepção e o toque em cada cor na fase de reprodução (Woods et al., 2015)."
    },
    techniques: {
      title: "Técnicas Baseadas em Evidências para Ampliar a Memória Sequencial",
      items: [
        {
          name: "Agrupamento Pareado Relacional (Paired Chunking)",
          desc: "Divida o fluxo contínuo de cores em blocos binários ou ternários (Miller, 1956). Em vez de tentar memorizar 'Vermelho, Azul, Verde, Amarelo' de forma desconexa, agrupe em blocos conceituais ('Vermelho-Azul' e 'Verde-Amarelo'). Isso reduz a carga informacional pela metade, permitindo encaixar sequências longas dentro do limite de Cowan (2001).",
          tips: "Faça uma micro-pausa mental a cada dois estímulos para fixar conscientemente os limites de cada bloco."
        },
        {
          name: "Codificação Dual Cruzada (Alça Fonológica Integrada)",
          desc: "Integre a alça fonológica de Baddeley ao esboço visuoespacial (Baddeley, 2000). Repita mentalmente ou sussurre a inicial de cada cor ('V-A-V-A') em ritmo cadenciado enquanto observa a iluminação dos botões, gerando dois registros de memória complementares (visual e auditivo).",
          tips: "Use uma cadência rítmica de dois em dois tons para sincronizar a fala interna à exibição visual na tela."
        },
        {
          name: "Mapeamento Cinestésico de Trajetória Espacial",
          desc: "Converta as posições dos botões em trajetórias geométricas sobre a matriz de 6 blocos (Logie, 1995). Em vez de memorizar apenas a cor, retenha o movimento do olhar ou o desenho vetorial formado pelos botões (ex.: 'triângulo horário' ou 'ziguezague descendente').",
          tips: "Desenhe mentalmente uma linha poligonal conectando o centro de cada bloco no instante em que ele se ilumina."
        },
        {
          name: "Blindagem de Posição Serial (Serial Position Shielding)",
          desc: "Pelo efeito de posição serial, os itens centrais de uma sequência sofrem a maior taxa de esquecimento devido à interferência mútua. Fixe imediatamente o primeiro bloco na memória de trabalho ativa e confie no eco sensorial recente para o último elemento exibido.",
          tips: "Consolide o primeiro par logo no início da exibição e reproduza a resposta sem hesitar para aproveitar o rastro sensorial fresco."
        }
      ]
    },
    steps: [
      "Mantenha o olhar fixo no centro da grade de 6 botões para abranger todo o campo visual periférico sem desvios bruscos.",
      "Observe a sequência luminosa sem tentar clicar antecipadamente, mantendo a respiração estável e o foco absoluto.",
      "Agrupe as cores exibidas em pares mentais utilizando subvocalização rítmica ou trajetórias geométricas.",
      "Assim que o sinal de entrada for ativado, reproduza os toques na ordem exata com determinação e cadência fluida.",
      "Aproveite a escada adaptativa de dificuldade: a cada acerto a sequência cresce, desafiando a fronteira máxima da sua memória de trabalho."
    ],
    audience: "Estudantes em preparação para concursos e vestibulares, praticantes de e-sports que demandam rápida leitura de tela, profissionais e entusiastas de condicionamento cognitivo que buscam treinar a amplitude da memória operacional, técnicas de agrupamento (chunking) e atenção sob limite de tempo.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'luck1997', 'simon1974', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Teste de Dígitos (Digit Span)" },
      { href: "/drills/memory/short-term-memory/word-recall", label: "Teste de Memória Verbal" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Teste de Memória Visual em Grade" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Teste de Localização de Objetos" },
      { href: "/drills/memory/working-memory/n-back", label: "Teste Dual N-Back" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ColorSequenceClient copy={ptCopy} />
      <DrillGuide guide={ptColorSequenceGuide} />
      <RelatedDrills currentCategory="memory" currentHref="/drills/memory/short-term-memory/color-sequence" locale="pt" />
    </>
  );
}
