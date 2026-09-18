import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Dígitos Online – Span de Memória | SkillDrills",
  description: "Teste de dígitos online grátis: Memorize sequências numéricas progressivas e avalie sua memória operacional e alça fonológica direto no navegador sem cadastro.",
  keywords: [
    "teste de digitos",
    "memoria de digitos",
    "teste de span de digitos",
    "alca fonologica teste",
    "memoria operacional teste",
    "jogo de memoria de numeros",
    "amplitude de memoria teste",
    "treino de memoria de trabalho",
    "teste de digitos wais",
    "tecnica de chunking numeros",
    "exercicio de retencao numerica",
    "teste neuropsicologico de memoria"
  ],
  openGraph: {
    title: "Teste de Dígitos Online – Span de Memória | SkillDrills",
    description: "Teste de dígitos online grátis: Memorize sequências numéricas progressivas e avalie sua memória operacional e alça fonológica direto no navegador sem cadastro.",
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste de Dígitos Online – Span de Memória | SkillDrills",
    description: "Teste de dígitos online grátis: Memorize sequências numéricas progressivas e avalie sua memória operacional e alça fonológica direto no navegador sem cadastro.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memória de Curto Prazo", "item": "https://skilldrills.online/pt/drills/memory/short-term-memory" },
    { "@type": "ListItem", "position": 4, "name": "Teste de Dígitos", "item": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Dígitos Online (Span de Dígitos)",
  "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Teste de Dígitos Online (Span de Dígitos)",
  "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span",
  "description": "Avaliação neuropsicológica interativa que mede a memória operacional numérica, a retenção na alça fonológica e a velocidade de repetição subvocal.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Dígitos Online (Span de Dígitos)",
  "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como treinar a memória de dígitos e o span de memória",
  "description": "Protocolo sistemático de quatro etapas para codificar e reproduzir sequências numéricas usando chunking rítmico.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span#step-1",
      
      "name": "Fixar a atenção no centro",
      "text": "Mantenha o foco no centro da tela durante os 3 segundos de exibição da sequência numérica."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span#step-2",
      
      "name": "Agrupamento rítmico (Chunking)",
      "text": "Agrupe os dígitos em blocos de 2 a 3 números (como um telefone: '739 - 281') para reduzir o esforço cognitivo."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span#step-3",
      
      "name": "Repetição subvocal (Alça Fonológica)",
      "text": "Repita os números mentalmente em ritmo rápido para evitar o esquecimento natural após 1,5 a 2 segundos."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/short-term-memory/digit-span#step-4",
      
      "name": "Digitação ágil no teclado",
      "text": "Insira os dígitos com cadência regular assim que o teclado for liberado antes do esvaecimento da lembrança."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o teste de dígitos (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É uma avaliação neuropsicológica fundamental utilizada para medir a memória de trabalho verbal, a memória de curto prazo e a atenção concentrada. O participante observa números e os reproduz na mesma sequência."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a média normal de dígitos que um adulto consegue memorizar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A média da população adulta em ordem direta fica entre 5 e 7 dígitos (desvio padrão 1–2). Acertar 7 dígitos reflete o marco clássico de Miller ($7 \\pm 2$). Resultados de 9 ou mais dígitos revelam uso avançado de chunking."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre dígitos na ordem direta e inversa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A ordem direta afere o armazenamento passivo na alça fonológica. A ordem inversa requer inverter mentalmente a sequência, demandando controle executivo central e refletindo a verdadeira memória operacional ativa."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o subteste de dígitos da escala WAIS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É uma prova central da Escala Wechsler de Inteligência para Adultos (WAIS-IV) que compõe o Índice de Memória Operacional (IMO), avaliando processamento sequencial e foco contra distrações."
      }
    },
    {
      "@type": "Question",
      "name": "Como a alça fonológica atua na retenção de números?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No modelo de Baddeley, os números ficam guardados no depósito fonológico e são renovados pela repetição subvocal ('voz interna'). Como o som esvanece em cerca de 2 segundos, a velocidade de repetição determina o limite da memória."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a Lei de Miller e o número mágico 7?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Publicada em 1956 por George A. Miller, estabelece que o limite de armazenamento imediato humano é de cerca de $7 \\pm 2$ itens. Estudos recentes (Cowan, 2001) comprovam que a capacidade bruta pura é de apenas 4 itens."
      }
    },
    {
      "@type": "Question",
      "name": "Como o agrupamento (chunking) expande a memória numérica?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reunir dígitos em pequenos blocos rítmicos ('839 - 241') converte 6 números avulsos em 2 pacotes de informação, superando facilmente a barreira biológica da memória de curto prazo."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a quantidade de dígitos diminui após um erro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O treino utiliza o protocolo adaptativo de escada 1-up / 1-down. Reduzir 1 dígito após falhas evita frustração e estabiliza a mensuração precisa da sua capacidade máxima real."
      }
    },
    {
      "@type": "Question",
      "name": "Treinar dígitos traz benefícios reais para o cérebro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, desenvolve o controle atencional, diminui devaneios mentais e aprimora a retenção de dados sequenciais para estudos, cálculos matemáticos e raciocínio lógico."
      }
    },
    {
      "@type": "Question",
      "name": "Este teste de dígitos online é gratuito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, o teste no SkillDrills é 100% gratuito, funciona direto no navegador sem login e calcula tempos de resposta com exatidão de milissegundos."
      }
    }
  ]
};

const digitSpanGuide = {
  intro: [
  "O Teste de Dígitos (Digit Span Memory Test) é o procedimento de referência na neuropsicologia clínica para aferir a memória verbal de curto prazo, o span da memória operacional e a alça fonológica.",
  "A fundamentação teórica teve início com o histórico artigo de George A. Miller (1956) sobre o 'número mágico 7 ± 2'. David Wechsler (1939, 1955, 2008) integrou os dígitos diretos e inversos na escala WAIS, estabelecendo o padrão ouro para o Índice de Memória Operacional (IMO).",
  "No modelo de Alan Baddeley (1974, 2000), os números são retidos na 'Alça Fonológica'. O eco sonoro decai em menos de dois segundos se não houver renovação pela repetição subvocal. Além disso, Nelson Cowan (2001) constatou que a capacidade pura sem agrupamento é restrita a 4 ± 1 unidades – elevar esse limite requer técnicas de chunking rítmico.",
  "Calibrado com cronometria digital precisa (Woods et al., 2015), o teste conta com apresentação visual de 3 segundos e algoritmo de progressão adaptativa para mensurar com fidelidade o seu span máximo.",
  "Metodologia de medição: cada resposta é registrada pelo relógio de alta resolução performance.now() no navegador, processando tudo localmente. Os cronômetros de navegadores têm precisão de ~1 ms e alinham-se à taxa de atualização do monitor (~16,7 ms a 60 Hz; Woods et al., 2015). Acompanhe seu progresso ao longo do tempo no mesmo aparelho.",
  "Transparência de dados: o SkillDrills não armazena dados de usuários em servidores externos. Seus recordes permanecem salvos apenas no localStorage do seu navegador. Todas as tabelas comparativas são respaldadas por periódicos científicos revisados por pares.",
  "Este treino é um jogo cognitivo gratuito voltado ao autoconhecimento e prática mental, não sendo um dispositivo médico ou diagnóstico clínico. Em caso de dúvidas médicas, consulte um especialista habilitado."
],
  benchmarks: {
    title: "Baremos normativos de span de dígitos e memória operacional",
    headers: ["Nível de Desempenho", "Span (Dígitos)", "Escore Ponderado WAIS", "Perfil Cognitivo e Chunking"],
    rows: [
  [
    "Tier 1 (Superior / Topo 1%)",
    "9 – 12+ Dígitos",
    "Escore 16 – 19",
    "Nível mnemônico de elite; organiza números em blocos de 3 a 4 algarismos; retenção perfeita na alça fonológica; cadência abaixo de 350 ms."
  ],
  [
    "Tier 2 (Acima da Média / Topo 15%)",
    "7 – 8 Dígitos",
    "Escore 12 – 15",
    "Atinge o padrão de Miller (7 dígitos); forma agrupamentos estáveis; resistente ao esvaecimento temporal; cadência de 350 a 500 ms."
  ],
  [
    "Tier 3 (Média Adulta / 50%)",
    "5 – 6 Dígitos",
    "Escore 8 – 11",
    "Padrão normal da população adulta; processa pares simples; acima de 6 dígitos surgem confusões acústicas; cadência de 500 a 700 ms."
  ],
  [
    "Tier 4 (Abaixo da Média / Gargalo)",
    "4 Dígitos",
    "Escore 5 – 7",
    "Opera no limite biológico básico de Cowan; falha ao ultrapassar 4 dígitos sem ensaio verbal; cadência de 700 a 950 ms."
  ],
  [
    "Tier 5 (Necessita Treino / Baixo)",
    "3 Dígitos",
    "Escore 1 – 4",
    "Dificuldade para reter 3 dígitos em sequência; vulnerável à distração e esquecimento rápido; cadência acima de 950 ms."
  ]
],
    note: "O span reflete o maior número de algarismos reproduzido sem erros. A equivalência com o WAIS fundamenta-se em normas clínicas internacionais (Wechsler, 2008; Woods et al., 2015)."
  },
  techniques: {
    title: "Estratégias eficazes para aumentar o span de dígitos",
    items: [
  {
    "name": "Ritmo fonético e chunking em tríadas",
    "desc": "Fracione sequências numéricas em grupos de 3 algarismos (ex.: '739 - 281 - 405') adotando a cadência de números telefônicos (Miller, 1956). Nove números soltos passam a ocupar apenas 3 gavetas mentais.",
    "tips": "Suba levemente a entonação mental no primeiro dígito de cada bloco para demarcar os limites."
  },
  {
    "name": "Sincronização da repetição subvocal",
    "desc": "Repita mentalmente a sequência em um ciclo veloz e contínuo (Baddeley, 1986). A repetição ágil mantém a informação viva no depósito fonológico antes que ela se apague em 2 segundos.",
    "tips": "Fale os números mentalmente como palavras completas e não como algarismos isolados."
  },
  {
    "name": "Rastreamento espacial no teclado numérico",
    "desc": "Associe os números ao caminho físico desenhado sobre o teclado numérico 3x3 (Logie, 1995). A memória motora do trajeto complementa e reforça a lembrança auditiva.",
    "tips": "Mentalize o zigue-zague dos dedos sobre o teclado enquanto os números piscam na tela."
  },
  {
    "name": "Efeito de primazia e recência",
    "desc": "Os primeiros números consolidam-se com a repetição inicial (primazia) e os dois últimos continuam frescos no eco auditivo (recência). Dedique seu esforço ativo para memorizar os números do meio.",
    "tips": "Grave de imediato os primeiros 3 dígitos e confie no eco auditivo para fechar os números finais."
  }
]
  },
  steps: [
  "Fixe o olhar no visor e aguarde a apresentação de 3 segundos.",
  "Divida imediatamente os algarismos em blocos de 2 ou 3 números.",
  "Repita a sequência mentalmente em loop contínuo para barrar o esquecimento.",
  "Com o teclado ativo, digite os números na ordem exata de modo ágil.",
  "Deixe o sistema adaptativo calibrar e ampliar continuamente seu span de memória."
],
  audience: "Estudantes, candidatos de concursos públicos e vestibulares, programadores e qualquer pessoa que queira aprimorar a retenção mental e agilidade de raciocínio.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "Teste N-Back (Memória Operacional)"
  },
  {
    "href": "/drills/memory/spatial-memory/grid-memorization",
    "label": "Teste de Memória Visual (Grade)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "Tabela de Schulte (Grade de Concentração)"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "Teste de Reflexo (Tempo de Reação)"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "Jogo de Reflexo e Treino de Reflexos"
  }
]
};

export default function LocalizedDigitSpanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DigitSpanClient copy={{
        "h1Keyword": "Teste de Dígitos",
        "h1Suffix": " – Jogo de Memória Numérica Digit Span Online",
        "caption": "Memorize a sequência numérica exibida na tela e digite os números na ordem exata.",
        "statScore": "Pontos",
        "statTime": "Tempo",
        "statSpan": "Span",
        "digitsUnit": "Dígitos",
        "statBest": "Recorde",
        "hudScore": "Pontos",
        "hudTime": "Tempo",
        "memorizeTitle": "MEMORIZE A SEQUÊNCIA",
        "evaluating": "Avaliando...",
        "startTitle": "Teste de Dígitos Pro",
        "startSubtitle": "Memória Numérica de Curto Prazo • Span de Dígitos",
        "countdownSubtitle": "PREPARE-SE",
        "newBest": "NOVO RECORDE",
        "pointsLabel": "Pontos",
        "statAccuracy": "Precisão",
        "statPeakSpan": "Span Máximo",
        "statPerfects": "Perfeitos",
        "btnPlayAgain": "Jogar novamente",
        "rulesTitle": "Instruções do Treino e Pontuação",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "Evocação de Dígitos",
                        "highlight": "+100 PTS",
                        "result": "Memorize a sequência numérica e digite no teclado virtual ou numérico"
                },
                {
                        "num": "2",
                        "text": "Bônus de Extensão",
                        "highlight": "Até +120% PTS",
                        "result": "Sequências maiores rendem mais pontos a cada rodada correta"
                },
                {
                        "num": "3",
                        "text": "Erro / Tempo Esgotado",
                        "highlight": "-1 Dígito",
                        "result": "Sem perda de pontos; o teste recua 1 dígito para estabilizar"
                },
                {
                        "num": "4",
                        "text": "Escada Adaptativa",
                        "highlight": "Ajuste dinâmico",
                        "result": "Converge com precisão para seu span real de memória"
                }
        ]
}} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="pt"
        />
      </div>
    </>
  );
}
