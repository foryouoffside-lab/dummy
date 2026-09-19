import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Memória Verbal – Evocação de Palavras | SkillDrills",
  description: "Teste de memória verbal online grátis: Memorize listas de palavras, domine o efeito de posição serial e treine sua memória operacional direto no navegador.",
  keywords: [
    "teste de memoria verbal",
    "memoria verbal de curto prazo",
    "teste de evocacao livre",
    "efeito de posicao serial teste",
    "treino de memoria verbal online",
    "jogo de memorizar palavras",
    "memoria operacional verbal",
    "agrupamento semantico memoria",
    "teste de retencao de palavras",
    "exercicio de memoria verbal",
    "teste neuropsicologico verbal",
    "jogo de evocacao de palavras"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall', 'pt'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Teste de Memória Verbal – Evocação de Palavras | SkillDrills",
    description: "Teste de memória verbal online grátis: Memorize listas de palavras, domine o efeito de posição serial e treine sua memória operacional direto no navegador.",
    url: "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Memória Verbal – Evocação de Palavras | SkillDrills",
    description: "Teste de memória verbal online grátis: Memorize listas de palavras, domine o efeito de posição serial e treine sua memória operacional direto no navegador.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedWordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Memória de Curto Prazo", "item": "https://skilldrills.online/pt/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "Teste de Memória Verbal", "item": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Teste de Memória Verbal (Evocação Livre de Palavras)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Avaliação neuropsicológica gratuita no navegador que mede a evocação livre imediata, a codificação semântica associativa e a capacidade da memória verbal operacional.",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Teste de Memória Verbal (Evocação Livre de Palavras)",
    "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall",
    "description": "Avaliação neuropsicológica gratuita no navegador que mede a evocação livre imediata, a codificação semântica associativa e a capacidade da memória verbal operacional.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Teste de Memória Verbal (Evocação Livre de Palavras)",
    "description": "Avaliação neuropsicológica gratuita no navegador que mede a evocação livre imediata, a codificação semântica associativa e a capacidade da memória verbal operacional.",
    "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
    {
        "@type": "Question",
        "name": "O que é o Teste de Memória Verbal (Word Recall)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "É uma avaliação neuropsicológica para mensurar a memória verbal de curto prazo, o span da memória de trabalho e a capacidade de evocação livre imediata. O participante estuda uma lista de substantivos e deve resgatá-los sem restrição de ordem."
        }
    },
    {
        "@type": "Question",
        "name": "Qual a diferença entre evocação livre e memória de reconhecimento?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O reconhecimento apenas pergunta se um item apresentado já foi visto. A evocação livre exige a busca ativa e espontânea de traços mnemônicos internos sem auxílio externo, demandando muito mais esforço cortical e refletindo a real capacidade de armazenamento."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é a pontuação média em um teste de evocação de palavras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em testes clínicos como o RAVLT, adultos saudáveis relembram de 4 a 6 palavras no primeiro ensaio de uma lista desconhecida. Técnicas mnemônicas de agrupamento podem elevar consideravelmente esse número."
        }
    },
    {
        "@type": "Question",
        "name": "O que é o Teste de Aprendizagem Auditivo-Verbal de Rey (RAVLT)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "É um protocolo clínico concebido por André Rey em 1958 para quantificar a taxa de aprendizagem verbal, amplitude de memória imediata, interferência proativa e retroativa, e retenção após intervalo."
        }
    },
    {
        "@type": "Question",
        "name": "O que é o efeito de posição serial em listas de palavras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Demonstrado por Bennet B. Murdock Jr. em 1962, indica que a precisão do resgate segue uma curva em U: os primeiros itens beneficiam-se da primazia (consolidação) e os últimos da recência (eco sensorial), deixando os intermediários mais vulneráveis ao esquecimento."
        }
    },
    {
        "@type": "Question",
        "name": "Por que nos esquecemos mais facilmente das palavras do meio?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "As palavras intermediárias sofrem simultaneamente interferência proativa (das palavras anteriores) e interferência retroativa (das palavras seguintes), gerando um gargalo no fluxo da memória operacional."
        }
    },
    {
        "@type": "Question",
        "name": "Como o encadeamento narrativo amplia a retenção de palavras?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "De acordo com os Níveis de Processamento (Craik & Lockhart, 1972), associar palavras isoladas em uma história coerente sintetiza múltiplos itens em um único esquema mental coeso, multiplicando o sucesso no momento do resgate."
        }
    },
    {
        "@type": "Question",
        "name": "A ordem das palavras importa na evocação livre?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. No paradigma de evocação livre, as palavras podem ser digitadas em qualquer ordem arbitrária. A ausência de regras de ordenação permite mensurar o volume de armazenamento independentemente do rastreamento de sequência."
        }
    },
    {
        "@type": "Question",
        "name": "Praticar evocação de palavras melhora a memória em geral?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Você aprimorará seu desempenho nesta tarefa e as mnemônicas aprendidas (agrupamento, historinhas mentais) são úteis em estudos e rotinas. Contudo, não representa intervenção médica ou exame de diagnóstico clínico."
        }
    },
    {
        "@type": "Question",
        "name": "Este teste online de memória verbal é gratuito?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, o Teste de Memória Verbal do SkillDrills é 100% gratuito, funciona diretamente no navegador sem cadastros ou downloads, e fornece métricas de precisão e amplitude em tempo real."
        }
    }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como treinar a evocação livre e a capacidade de memória verbal",
    "description": "Metodologia passo a passo para codificar, vincular narrativamente e recuperar listas progressivas de palavras.",
    "step": [
    {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall#step-1",
        "name": "Leitura e codificação semântica",
        "text": "Observe as palavras durante a fase de memorização, pronunciando cada uma internamente enquanto constrói uma imagem mental nítida."
    },
    {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall#step-2",
        "name": "Construção de elo narrativo associativo",
        "text": "Una as palavras em uma micro-história mental contínua (ex.: 'O cavaleiro subiu a montanha segurando uma lanterna dourada') para agrupar as informações."
    },
    {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall#step-3",
        "name": "Descarga imediata de palavras recentes (Recency)",
        "text": "Assim que a caixa de texto se abrir, digite de imediato as últimas 2 ou 3 palavras enquanto ainda vibram na memória sensorial ecoica."
    },
    {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/word-recall#step-4",
        "name": "Recuperação da narrativa inicial e envio",
        "text": "Desenrole sua história mental desde o início para evocar as primeiras palavras, separe-as por espaços e pressione Enter para finalizar."
    }
]
  };

  const wordRecallGuide = {
    heading: "Guia do Teste de Memória Verbal e Evocação Livre",
    intro: [
      "O Teste de Memória Verbal (Word Recall) é um exercício neurocognitivo de alta precisão projetado para avaliar e fortalecer a memória de trabalho verbal, a codificação associativa semântica e a capacidade de evocação livre imediata. O paradigma de evocação livre representa um dos desafios mais rigorosos para a arquitetura cognitiva humana, exigindo que o cérebro recupere vocábulos armazenados sem o auxílio de pistas contextuais, lembretes externos ou opções de múltipla escolha.",
      "A investigação científica da memória verbal teve início com Hermann Ebbinghaus (1885), que formulou matematicamente a curva do esquecimento e a dinâmica do aprendizado serial. Em 1958, o psicólogo suíço André Rey padronizou o Teste de Aprendizagem Auditivo-Verbal de Rey (RAVLT), estabelecendo o padrão global para quantificar o span de memória imediata, a vulnerabilidade a interferências proativas e retroativas, e a retenção tardia em populações clínicas e hígidas.",
      "Em 1962, Bennet B. Murdock Jr. formalizou matematicamente o efeito de posição serial na evocação livre, distinguindo a operação do efeito de primazia (consolidação na memória de longo prazo dos itens iniciais) e do efeito de recência (manutenção transitória dos últimos itens no buffer fonológico e sensorial). Posteriormente, Fergus I. M. Craik e Robert S. Lockhart (1972) desenvolveram o modelo dos 'Níveis de Processamento', demonstrando que a codificação semântica profunda — como a elaboração narrativa e o agrupamento temático — supera substancialmente a repetição mecânica superficial.",
      "Com cronometria digital de alta precisão executada no navegador (Woods et al., 2015), este exercício mensura tanto a sua amplitude de retenção de palavras quanto a sua vazão de resgate lexical por meio de um protocolo adaptativo em escada que converge para a sua verdadeira capacidade verbal.",
      "Metodologia de medição e latência de hardware: Cada evento de interação é registrado localmente por meio do relógio de alta resolução performance.now() do navegador. Os navegadores restringem deliberadamente a granularidade temporal (~1 ms) como salvaguarda contra ataques de temporização (Spectre), e seu monitor quantiza cada atualização visual de acordo com sua taxa de atualização nativa (~16,7 ms a 60 Hz, ~6,9 ms a 144 Hz, ~4,1 ms a 240 Hz, Woods et al., 2015). Variações inferiores a 5 ms constituem ruído instrumental natural; avalie seu progresso principalmente comparando desempenhos no mesmo equipamento.",
      "Transparência e privacidade de dados: O SkillDrills não coleta nem armazena quaisquer dados agregados de usuários ou telemetria. Todas as suas pontuações, tempos de reação e avanços de nível permanecem gravados exclusivamente no armazenamento local (localStorage) do seu navegador e jamais são transmitidos a servidores externos. Todos os parâmetros e percentis citados têm como base direta a literatura científica listada nas referências ao final.",
      "Aviso de saúde e isenção de responsabilidade médica: Este exercício é um jogo cognitivo gratuito executado no navegador voltado para treinamento mental e prática pessoal. Não se trata de um dispositivo médico, ferramenta diagnóstica ou instrumento de intervenção clínica para deficiências cognitivas ou patologias neurológicas. Em caso de dúvidas sobre sua memória ou funções cognitivas, procure orientação de um médico ou neuropsicólogo especializado."
    ],
    benchmarks: {
      title: "Parâmetros Normativos de Evocação Livre Verbal",
      headers: ["Nível de Desempenho", "Span de Palavras", "Pontuação de Evocação", "Perfil Cognitivo e de Recuperação"],
      rows: [
        [
                "Nível 1 (Superior / Percentil 99)",
                "8 – 11+ Palavras",
                "1.100+ Pontos",
                "Mestre em mnemônica; utiliza cadeias narrativas profundas (Craik & Lockhart, 1972); cadência de resgate inferior a 800 ms por palavra"
        ],
        [
                "Nivel 2 (Média Alta / Percentil 85–95)",
                "6 – 7 Palavras",
                "850 – 1.099 Pontos",
                "Supera a média adulta padrão; agrupa itens em pares ou trios; evocação consistente sob pressão temporal"
        ],
        [
                "Nível 3 (Média Adulta / Percentil 50)",
                "4 – 5 Palavras",
                "550 – 849 Pontos",
                "Média populacional em tentativas iniciais de evocação livre; queda clássica em U nas palavras do meio"
        ],
        [
                "Nível 4 (Média Baixa / Gargalo Verbal)",
                "3 Palavras",
                "350 – 549 Pontos",
                "Depende puramente do eco fonológico sem codificação semântica; dificuldade de ir além do buffer de recência"
        ],
        [
                "Nível 5 (Span Reduzido)",
                "< 3 Palavras",
                "< 350 Pontos",
                "Rápido decaimento do traço de memória; forte interferência proativa; dificuldade de resgate sem pistas"
        ]
],
      note: "O span de palavras reflete o maior comprimento sem erros alcançado na escada adaptativa; as normas refletem o ensaio 1 em adultos (Rey, 1964; Murdock, 1962)."
    },
    techniques: {
      title: "Protocolos Baseados em Evidências para Expandir a Memória Verbal",
      items: [
        {
                "name": "Encadeamento Narrativo Associativo",
                "desc": "Crie uma micro-história mental inusitada conectando as palavras (Craik & Lockhart, 1972). Ligar 'águia', 'castelo' e 'lanterna' em 'Uma águia segurando uma lanterna acesa pousou no castelo' agrupa 3 itens isolados em uma única cena episódica duradoura.",
                "tips": "Quanto mais incomum, colorida e fisicamente improvável for a imagem criada, mais marcante será a retenção."
        },
        {
                "name": "Codificação Dupla (Imagem Mental + Eco Auditivo)",
                "desc": "Utilize a teoria da dupla codificação de Allan Paivio visualizando a forma de cada substantivo enquanto pronuncia mentalmente suas sílabas. Criar traços visuais e auditivos simultâneos oferece dois caminhos independentes na recuperação.",
                "tips": "Visualize a cor e textura do item por meio segundo enquanto pronuncia silenciosamente seu nome."
        },
        {
                "name": "Agrupamento Categorial e Semântico",
                "desc": "Reorganize as palavras mentalmente em categorias lógicas (natureza, construções, metais nobres, ferramentas), independentemente da ordem exibida (Tulving, 1962).",
                "tips": "Associe palavras por características compartilhadas para gerar facilitação associativa."
        },
        {
                "name": "Estratégia de Despejo da Recência Primeiro",
                "desc": "No momento em que a digitação for liberada, escreva de imediato as 2 ou 3 últimas palavras (Murdock, 1962). Elas residem na frágil memória sensorial e decaem em 3 a 5 segundos; descarregá-las primeiro desocupa a mente para resgatar a narrativa inicial.",
                "tips": "Digite logo as palavras finais que você acabou de ver e depois relaxe para puxar o início da sua história."
        }
]
    },
    steps: [
      "Mantenha o foco visual no centro da área de exibição durante toda a fase de apresentação.",
      "Conforme as palavras surgirem, conecte-as imediatamente em uma história mental vívida.",
      "Gere imagens mentais com detalhes nítidos para fixar traços mnemônicos de dupla via.",
      "Assim que a digitação abrir, envie primeiro os itens finais e depois desdobre sua narrativa.",
      "Deixe o sistema adaptativo mapear e ampliar progressivamente os limites da sua memória verbal."
],
    audience: "Estudantes em preparação para concursos, profissionais e entusiastas do treino cognitivo que buscam expandir a memória de trabalho verbal.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
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
      <WordRecallClient copy={{
          "h1Keyword": "Teste de Memória Verbal",
          "h1Suffix": " – Jogo de Evocação de Palavras Grátis",
          "subtitle": "A evocação livre de uma lista de palavras nunca é plana: lembramos melhor as primeiras e as últimas palavras e pior as do meio, o clássico efeito de posição serial mapeado por Murdock (1962). O nível de processamento semântico (Craik & Lockhart, 1972) importa mais do que o tempo de observação passiva.",
          "statScore": "Pontos",
          "statTime": "Tempo",
          "statWords": "Palavras",
          "wordsUnit": "Palavras",
          "statBestScore": "Recorde",
          "memorizePhase": "MEMORIZE AS PALAVRAS",
          "btnSkip": "Pular",
          "inputPhase": "DIGITE AS PALAVRAS LEMBRADAS",
          "inputPlaceholder": "Digite as palavras lembradas separadas por espaço...",
          "btnSubmit": "ENVIAR RESPOSTAS",
          "inputHint": "Pressione Enter para enviar",
          "feedbackPhase": "AVALIAÇÃO DA EVOCAÇÃO",
          "extraWordsLabel": "Palavras incorretas ou extras digitadas:",
          "startTitle": "Evocação Verbal Pro",
          "startSubtitle": "Memória Verbal de Curto Prazo • Evocação Livre",
          "countdownSubtitle": "PREPARE-SE",
          "newBest": "NOVO RECORDE",
          "pointsLabel": "Pontos",
          "statAccuracy": "Precisão",
          "statPeakWords": "Palavras Máx.",
          "statPerfects": "Perfeitos",
          "btnPlayAgain": "Jogar Novamente",
          "rulesTitle": "Instruções do Exercício e Sistema de Pontos",
          "aboutTitle": "Sobre o Teste de Memória Verbal (Word Recall)",
          "rulesItems": [
                    {
                              "num": "1",
                              "text": "Evocação de Lista",
                              "highlight": "+150 PTS",
                              "result": "Memorize as palavras e digite-as na fase de evocação livre"
                    },
                    {
                              "num": "2",
                              "text": "Bônus de Nível",
                              "highlight": "Até +135%",
                              "result": "Listas maiores concedem significativamente mais pontos por rodada"
                    },
                    {
                              "num": "3",
                              "text": "Erro / Tempo Esgotado",
                              "highlight": "-1 Palavra",
                              "result": "Sem perda de pontos; o comprimento se ajusta reduzindo 1 palavra"
                    },
                    {
                              "num": "4",
                              "text": "Span Adaptativo",
                              "highlight": "Sobe e Desce",
                              "result": "Converge com precisão para seu verdadeiro limiar de memória verbal"
                    }
          ],
          "wordBank": [
                    "maçã",
                    "ponte",
                    "castelo",
                    "diamante",
                    "águia",
                    "floresta",
                    "jardim",
                    "martelo",
                    "ilha",
                    "selva",
                    "cavaleiro",
                    "lanterna",
                    "montanha",
                    "agulha",
                    "oceano",
                    "palácio",
                    "rainha",
                    "foguete",
                    "poente",
                    "templo",
                    "guarda-chuva",
                    "vale",
                    "janela",
                    "zebra",
                    "vela",
                    "dragão",
                    "pena",
                    "prata",
                    "ouro",
                    "mármore",
                    "veludo",
                    "cristal",
                    "bronze",
                    "cobre",
                    "sombra",
                    "espírito",
                    "sabedoria",
                    "honra",
                    "glória",
                    "sonho",
                    "tempestade",
                    "rio",
                    "nuvem",
                    "chama",
                    "pedra",
                    "trovão",
                    "arco-íris",
                    "fênix",
                    "relógio",
                    "espelho"
          ]
}} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="pt"
        />
      </div>
    </>
  );
}
