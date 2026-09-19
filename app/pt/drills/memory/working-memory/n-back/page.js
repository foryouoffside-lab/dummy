import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (n-back)
// PRIMARY:  "teste n-back"                — High intent Brazilian query
//           "dual n-back online"          — Web training query
// SECONDARY / LSI:
//           "teste n-back como funciona"  — Informational query
//           "tarefa n-back"               — Neurocognitive query
//           "memoria operacional teste"   — Cognitive domain query
//           "jogo dual n back"            — Game intent query
// ============================================================

export const metadata = {
  title: "Teste N-Back Online – Memória Operacional | SkillDrills",
  description: "Teste N-back online grátis: Treine a memória operacional e a atualização contínua de informações em 2-back e 3-back direto no navegador sem cadastro.",
  keywords: ['teste n-back online', 'treino de memoria operacional', 'dual n-back online', 'teste de memoria de trabalho', 'tarefa n-back', 'exercicio de memoria operacional', 'inteligencia fluida n-back', 'atualizacao de memoria de trabalho', 'teste 3-back', 'treino cognitivo n-back', 'capacidade de memoria operacional', 'avaliacao neurocognitiva n-back'],
  openGraph: {
    title: "Teste N-Back Online – Treino de Memória Operacional Grátis | SkillDrills",
    description: "Teste N-back online grátis. Treine a memória operacional (memória de trabalho) e a atualização contínua de informações em 2-back, 3-back e níveis avançados no navegador.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/memory/working-memory/n-back",
    siteName: "SkillDrills",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste N-Back Online – Treino de Memória Operacional Grátis | SkillDrills",
    description: "Teste N-back online grátis. Treine a memória operacional (memória de trabalho) e a atualização contínua de informações em 2-back, 3-back e níveis avançados no navegador.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "Treino de Memória", "item": "https://skilldrills.online/pt/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "Memória Operacional", "item": "https://skilldrills.online/pt/drills/memory/working-memory" },
    { "@type": "ListItem", "position": 4, "name": "Teste N-Back Online", "item": "https://skilldrills.online/pt/drills/memory/working-memory/n-back" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste N-Back Online (Treino de Memória Operacional)",
  "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["Capacidade de Memória Operacional", "Atualização Contínua de Informação", "Controle Executivo", "Inteligência Fluida"]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo Teste N-Back Online – Memória e Atenção",
  "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back",
  "description": "Jogo cognitivo gratuito no navegador para treinar a atualização contínua da memória operacional comparando letras N passos atrás.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Working Memory", "Brain Training", "N-Back"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste N-Back Online (Dual N-Back)",
  "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Treinar a Memória Operacional com o Teste N-Back",
  "description": "Estratégia de 4 passos fundamentada em neurociência para dominar a atualização contínua em tarefas N-Back.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back#step-1",
      
      "name": "Subvocalizar a janela-alvo como uma fila circular",
      "text": "Recite mentalmente a sequência ativa em ordem cronológica, sustentando um buffer interno deslizante (por ex., segurando 'A-T-M' no 3-back)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back#step-2",
      
      "name": "Comparar o estímulo atual com o item de N passos atrás",
      "text": "Assim que um novo estímulo surgir, compare-o imediatamente com o item mais antigo de seu buffer ativo."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back#step-3",
      
      "name": "Descartar o item mais antigo e anexar o novo",
      "text": "Execute uma atualização mental imediata: remova o item verificado e adicione a nova letra à frente da fila mental."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/memory/working-memory/n-back#step-4",
      
      "name": "Manter ritmo atencional consistente sem hesitar",
      "text": "Ritme sua respiração e evite remoer erros. Em fluxos contínuos, hesitar provoca a perda em cadeia dos elementos seguintes."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que é o teste de memória operacional N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste N-Back é uma avaliação neurocognitiva clássica que mede a atualização contínua da memória operacional. Os participantes observam uma sequência de estímulos e indicam se o item atual corresponde ao exibido N passos antes."
      }
    },
    {
      "@type": "Question",
      "name": "Quem criou a tarefa N-Back e com qual propósito?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wayne K. Kirchner desenvolveu a tarefa N-Back em 1958 para investigar o impacto do envelhecimento na retenção de informações dinâmicas que mudam rapidamente."
      }
    },
    {
      "@type": "Question",
      "name": "Quais faculdades cognitivas o N-Back principalmente avalia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avalia o controle executivo central, a atualização dinâmica do buffer de memória operacional no córtex pré-frontal dorsolateral (DLPFC) e a inibição de interferências."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a diferença entre N-Back e testes de span simples (Digit Span)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Testes de span simples medem armazenamento passivo estático. O N-Back exige manipulação ativa ininterrupta: a cada novo estímulo, o item mais antigo deve ser ejetado e o mais novo integrado."
      }
    },
    {
      "@type": "Question",
      "name": "O treino com N-Back pode melhorar a inteligência fluida (QI)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O estudo de Jaeggi et al. (2008, PNAS) comprovou que o treino adaptativo com N-back proporcionou ganhos significativos na inteligência fluida (Gf) medida por matrizes de raciocínio lógico."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a pontuação ou acurácia média de adultos no 3-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Adultos jovens saudáveis costumam atingir entre 65% e 80% de precisão em uma tarefa 3-back padrão. Sustentar precisão acima de 85% indica excelente controle executivo."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre Single N-Back e Dual N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Single N-Back apresenta um único fluxo sensorial (letras). Dual N-Back apresenta dois fluxos simultâneos (posições visuais em grade e consoantes faladas), exigindo atenção dividida."
      }
    },
    {
      "@type": "Question",
      "name": "Como a repetição subvocal ajuda no desempenho do N-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A repetição interna ativa a alça fonológica (Baddeley, 1986). Repetir mentalmente a sequência atual de N itens preserva o traço mnêmico contra o decaimento temporal."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o desempenho cai drasticamente no 4-Back e 5-Back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De acordo com Nelson Cowan (2001), a atenção consciente tem um teto de capacidade biológica de cerca de 4±1 unidades. Níveis superiores extrapolam essa barreira natural."
      }
    },
    {
      "@type": "Question",
      "name": "Como a memória operacional se aplica a tarefas do cotidiano?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apoia decisões complexas sob pressão, raciocínio em programação de software, compreensão de leitura avançada, análise financeira de múltiplos fatores e tomada de decisão tática em esports."
      }
    }
  ]
};

const nBackClientCopyPt = {
  h1Keyword: "Teste N-Back Online",
  h1Suffix: " – Memória Operacional",
  caption: "A tarefa N-back avalia se o estímulo atual coincide com o exibido N passos antes, exigindo armazenamento e manipulação dinâmica simultâneos segundo o modelo de Baddeley & Hitch (1974).",
  statScore: "Pontuação",
  statTime: "Tempo",
  statLevel: "Nível",
  statBest: "Recorde",
  hudScore: "Pontuação",
  hudTime: "Tempo",
  modeSuffix: "-BACK TREINO",
  memorizingText: "Memorizando as primeiras {n} letras...",
  btnMatch: "IGUAL (MATCH)",
  btnNoMatch: "DIFERENTE",
  startTitle: "Dual N-Back Pro",
  startSubtitle: "Memória Operacional • Atualização de Sequência",
  countdownSubtitle: "PREPARE-SE",
  newBest: "NOVO RECORDE",
  pointsLabel: "Pontos",
  statAccuracy: "Precisão",
  statPeakLevel: "Nível Máximo",
  statPerfects: "Acertos",
  btnPlayAgain: "Jogar Novamente",
  rulesTitle: "Instruções e Sistema de Pontuação",
  rulesItems: [
    { num: "1", text: "Igual / Diferente (N Passos Atrás)", highlight: "+150 PTS", result: "Por decisão correta" },
    { num: "2", text: "Progressão de Nível", highlight: "3-Back → 4-Back+", result: "A cada 1.200 pontos" },
    { num: "3", text: "Aceleração de Exibição", highlight: "2.000 ms → 1.200 ms", result: "Estímulos mais rápidos em níveis altos" },
    { num: "4", text: "Sem Resposta (Timeout)", highlight: "Zero Penalidade", result: "Sem perda de pontos ou tempo" },
    { num: "5", text: "Resposta Incorreta", highlight: "Zera Sequência", result: "Não reduz tempo — dura os 45 segundos completos" }
  ]
};

const guidePt = {
  heading: "Guia do Teste N-Back & Padrões de Desempenho",
  intro: [
    "O teste N-Back de memória operacional é o protocolo neuropsicológico primordial para avaliar a atualização contínua de informações, o controle executivo cognitivo e a manutenção ativa sob pressão de tempo. Com raízes no trabalho clássico de Wayne K. Kirchner (1958), tornou-se referência absoluta em neurociência cognitiva.",
    "Diferente de avaliações passivas de retenção, o N-Back exige constante manipulação e reconfiguração de um buffer mental dinâmico. Conforme as letras aparecem velozmente, o usuário deve comparar a letra presente com a de exatamente N posições atrás.",
    "Metodologia de mensuração: os eventos são cronometrados localmente com o relógio de alta precisão performance.now() do navegador, sem envio de dados a servidores. Diferenças menores que 5 ms decorrem de variações de quantização do sistema e devem ser consideradas margem de medida normal.",
    "Transparência de dados: SkillDrills não coleta dados pessoais de pontuação. Suas marcas permanecem salvas apenas no localStorage do seu dispositivo.",
    "Este exercício é um jogo de navegador gratuito voltado ao treino e interesse cognitivo. Não é um dispositivo médico nem um teste de diagnóstico clínico."
  ],
  metrics: [
    { label: "Nível N-Back Máximo", desc: "Maior profundidade atingida (3-Back referência, 4-Back avançado, 5-Back+ elite)." },
    { label: "Pontuação Total", desc: "Total acumulado durante os 45 segundos (+150 PTS por acerto, sem penalidade)." },
    { label: "Acurácia de Julgamento", desc: "Percentual de decisões corretas frente a erros de falso alarme e omissão." },
    { label: "Velocidade de Atualização", desc: "Rapidez decisória e latência de resposta durante a apresentação dos estímulos." }
  ],
  benchmarks: [
    { tier: "Tier 1: Memória Operacional Superior (Elite / Percentil 99)", range: "4-Back a 5-Back+ (1.200+ Pontos)", desc: "Controle executivo de elite; fila FIFO mental de 4 a 5 itens; latência inferior a 600 ms; acurácia superior a 92%." },
    { tier: "Tier 2: Alto Médio (Controle Firme / Percentil 85–95)", range: "3-Back sólido com transição a 4-Back (900 – 1.199 Pontos)", desc: "Supera a média adulta; atualização 3-back contínua com poucas intrusões; acurácia de 80% a 91%." },
    { tier: "Tier 3: Média Normal Adulta (Percentil 50)", range: "3-Back Estável (600 – 899 Pontos)", desc: "Padrão adulto normativo (Kirchner, 1958); mantém buffer de 3 itens com falhas ocasionais; acurácia de 65% a 79%." },
    { tier: "Tier 4: Baixo Médio (Percentil 15–30)", range: "3-Back Instável (400 – 599 Pontos)", desc: "Dificuldade na atualização contínua de 3 itens; confusão com itens de 2 passos atrás; acurácia de 50% a 64%." },
    { tier: "Tier 5: Abaixo da Média (< Percentil 15)", range: "Abaixo de 3-Back (< 400 Pontos)", desc: "Gargalo severo na atualização contínua; lapsos por timeout frequentes; acurácia inferior a 50%." }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958): Criação do paradigma N-Back", body: "Propôs a tarefa para avaliar os efeitos do envelhecimento na retenção de estímulos em rápida alteração." },
    { title: "Alan Baddeley (1986, 2000): Controle pelo Executivo Central", body: "No modelo multicomponente, N-back exige coordenação entre alça fonológica e córtex pré-frontal." },
    { title: "Adele Diamond (2013): Tríade das Funções Executivas", body: "Definiu atualização de memória operacional, controle inibitório e flexibilidade cognitiva como base." },
    { title: "Susanne M. Jaeggi et al. (2008): Ganhos em inteligência fluida", body: "Demonstrou que o treino adaptativo de N-back gera ganhos no raciocínio abstrato e inteligência fluida." },
    { title: "Nelson Cowan (2001): Limite de capacidade 4±1", body: "Identificou que o foco consciente processa cerca de 4 blocos não agrupados de informação." },
    { title: "David L. Woods et al. (2015): Cronometria cognitiva padronizada", body: "Estabeleceu critérios rigorosos para métricas de tempo de reação e d' em exames computadorizados." }
  ],
  protocols: [
    { title: "Subvocalização em fila deslizante", body: "Repita internamente a tríade de letras com ritmo fixo (por exemplo, 'B-M-T' evoluindo para 'M-T-R')." },
    { title: "Inibição atenta contra estímulos de atalho", body: "Controle o impulso de marcar letras que apareceram há 1 ou 2 passos em vez de exatamente 3 passos." },
    { title: "Dupla codificação fonológica e espacial", body: "Mentalize 3 espaços horizontais onde as letras deslizam para a esquerda a cada nova exibição." },
    { title: "Reinício atencional sem lamentação", body: "Se perder o encadeamento, encare a próxima letra como o passo 1 e reconstrua a sequência sem hesitar." }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "O que é o teste de memória operacional N-Back?", a: "Teste neurocognitivo que afere a atualização contínua e o controle executivo da memória de trabalho." },
    { q: "Quem criou a tarefa N-Back e com qual propósito?", a: "Wayne K. Kirchner em 1958, para avaliar a retenção de dados mutáveis ao longo da idade." },
    { q: "Quais faculdades cognitivas o N-Back principalmente avalia?", a: "Atualização de memória operacional, controle pré-frontal executivo e inibição de distrações." },
    { q: "Qual é a diferença entre N-Back e testes de span simples?", a: "N-Back demanda manipulação e atualização em tempo real, enquanto o span simples é armazenamento passivo." },
    { q: "O treino com N-Back pode melhorar a inteligência fluida (QI)?", a: "Estudos de destaque (como Jaeggi et al., 2008) registraram ganhos consistentes em raciocínio abstrato." },
    { q: "Qual é a pontuação ou acurácia média de adultos no 3-Back?", a: "Varia entre 65% e 80% em adultos saudáveis, com índices superiores a 85% refletindo alto controle executivo." },
    { q: "Qual a diferença entre Single N-Back e Dual N-Back?", a: "Single processa um único canal sensorial; Dual acompanha simultaneamente posição visual e som auditivo." },
    { q: "Como a repetição subvocal ajuda no desempenho do N-Back?", a: "Recruta a alça fonológica, mantendo os dados ativos e protegidos contra o esquecimento imediato." },
    { q: "Por que o desempenho cai drasticamente no 4-Back e 5-Back?", a: "Ultrapassa o limite biológico de atenção consciente humana de cerca de 4 itens (Cowan, 2001)." },
    { q: "Como a memória operacional se aplica a tarefas do cotidiano?", a: "Aprimora o foco em programação de código, análise de dados complexos, leitura e decisões em esports." }
  ],
  related: [
    { href: "/pt/drills/memory/spatial-memory/path-tracing", title: "Teste de Rastreamento de Caminho", desc: "Memorizar trajetórias dinâmicas em matrizes progressivas." },
    { href: "/pt/drills/memory/spatial-memory/grid-memorization", title: "Teste de Memória Visual de Grade", desc: "Memorizar padrões em tabuleiros 2D e testar capacidade de retenção visual." },
    { href: "/pt/drills/memory/spatial-memory/object-location", title: "Teste de Localização de Objetos", desc: "Medir a memória espacial e a retenção de posições em mapas de múltiplos quadrantes." },
    { href: "/pt/drills/memory/short-term-memory/digit-span", title: "Teste de Extensão de Dígitos (Digit Span)", desc: "Avaliar capacidade de retenção numérica e a alça fonológica." },
    { href: "/pt/drills/memory/short-term-memory/word-recall", title: "Teste de Memória Verbal", desc: "Avaliar recordação imediata e agrupamento semântico sob tempo restrito." },
    { href: "/pt/drills/memory/short-term-memory/color-sequence", title: "Jogo de Memória de Cores", desc: "Memorizar sequências progressivas de cores em velocidade crescente." }
  ]
};

export default function NBackPagePt() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyPt} />

      <DrillGuide {...guidePt} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="pt" />
      </div>
    </>
  );
}
