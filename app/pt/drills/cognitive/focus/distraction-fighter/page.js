import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Stroop Online – Foco e Inibição | SkillDrills",
  description: "Teste de Stroop online grátis: avalie sua inibição cognitiva e atenção seletiva nomeando a cor da fonte enquanto ignora o significado da palavra escrita.",
  keywords: [
    "teste de stroop",
    "teste de stroop online",
    "efeito stroop",
    "teste de atencao seletiva",
    "inibicao cognitiva teste",
    "teste de cores e palavras",
    "interferencia de stroop",
    "exercicios de foco e concentracao",
    "treino de controle inibitorio",
    "teste psicologico stroop gratis",
    "treinamento de agilidade mental",
    "teste de reflexo e foco online"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter')
  },
  openGraph: {
    title: "Teste de Stroop Online – Foco e Inibição | SkillDrills",
    description: "Teste de Stroop online grátis: avalie sua inibição cognitiva e atenção seletiva nomeando a cor da fonte enquanto ignora o significado da palavra escrita.",
    url: "https://skilldrills.online/pt/drills/cognitive/focus/distraction-fighter",
    siteName: "SkillDrills",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste de Stroop Online – Foco e Inibição | SkillDrills",
    description: "Teste de Stroop online grátis: avalie sua inibição cognitiva e atenção seletiva nomeando a cor da fonte enquanto ignora o significado da palavra escrita."
  }
};

export default function DistractionFighterPagePT() {
  const sources = pickSources(
    "Stroop (1935) - Studies of Interference in Serial Verbal Reactions",
    "MacLeod (1991) - Half a Century of Research on the Stroop Effect",
    "Logan & Cowan (1984) - On the Ability to Inhibit Thought and Action: A Theory of an Act of Control",
    "Posner & Petersen (1990) - The Attention System of the Human Brain"
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
      { "@type": "ListItem", "position": 2, "name": "Treinamento Cognitivo", "item": "https://skilldrills.online/pt/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "Teste de Stroop", "item": "https://skilldrills.online/pt/drills/cognitive/focus/distraction-fighter" }
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Teste de Stroop Trainer",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Treinamento neurocognitivo de inibição comportamental e controle atencional baseado no teste clássico de interferência cor-palavra de Stroop."
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Teste de Stroop Online Interativo",
    "url": "https://skilldrills.online/pt/drills/cognitive/focus/distraction-fighter",
    "applicationCategory": "TrainingTool",
    "browserRequirements": "Requires JavaScript. HTML5 Canvas compatible."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Desafio de Inibição Cognitiva de Stroop",
    "gamePlatform": "Web Browser",
    "genre": ["Brain Training", "Cognitive Drill", "Focus Training"]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Como Realizar o Teste de Stroop Online",
    "description": "Protocolo para isolar a cor da tinta e suprimir a leitura automática do texto.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Fixação no Estímulo Central",
        "text": "Observe o termo colorido que surge no centro da tela sem vocalizar mentalmente a palavra."
      },
      {
        "@type": "HowToStep",
        "name": "Supressão do Significado Semântico",
        "text": "Iniba o impulso automático de leitura do texto escrito e foque exclusivamente no comprimento de onda da cor da fonte."
      },
      {
        "@type": "HowToStep",
        "name": "Seleção Motora Rápida",
        "text": "Clique no botão correspondente à cor da tinta antes que a janela temporal expire."
      },
      {
        "@type": "HowToStep",
        "name": "Manutenção da Sequência de Acertos",
        "text": "Mantenha a regularidade para acumular multiplicadores de pontos ao longo dos 45 segundos da rodada."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o efeito Stroop e por que ele ocorre?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O efeito Stroop é o atraso no tempo de reação ao nomear a cor física de uma palavra quando ela denota uma cor incongruente. Ocorre porque a leitura é um processo altamente automatizado que compete com a identificação visual da cor."
        }
      },
      {
        "@type": "Question",
        "name": "Quais regiões do cérebro são ativadas durante este teste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A resolução do conflito cognitivo recruta principalmente o córtex cingulado anterior (ACC) e o córtex pré-frontal dorsolateral (DLPFC), núcleos essenciais para o controle executivo e a inibição de respostas."
        }
      },
      {
        "@type": "Question",
        "name": "Por que é mais difícil dizer a cor do que ler a palavra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A leitura é reforçada ao longo de anos e processada com velocidade superior no cérebro alfabetizado. A nomeação da cor exige um esforço consciente de controle atencional de cima para baixo (top-down)."
        }
      },
      {
        "@type": "Question",
        "name": "Como atletas e gamers de FPS se beneficiam do treino de Stroop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O teste desenvolve a blindagem contra distrações periféricas e a capacidade de frear reflexos equivocados, crucial para não atirar em aliados ou reagir a iscas visuais."
        }
      },
      {
        "@type": "Question",
        "name": "Qual é a duração recomendada para uma sessão de treino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sessões de 5 a 8 minutos diários divididas em rodadas curtas de 45 segundos são suficientes para promover plasticidade neural sem gerar exaustão mental."
        }
      },
      {
        "@type": "Question",
        "name": "O efeito Stroop desaparece com a prática frequente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ele diminui sensivelmente à medida que os circuitos de controle inibitório se fortalecem, mas nunca é totalmente eliminado devido à robustez intrínseca da rota de leitura automática."
        }
      },
      {
        "@type": "Question",
        "name": "O que fazer para diminuir os erros sob alta pressão de tempo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Foque visualmente nas extremidades ou serifa de uma única letra em vez de olhar para a palavra inteira, evitando acionar os centros de processamento lexical."
        }
      },
      {
        "@type": "Question",
        "name": "Como a pontuação de precisão é calculada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A pontuação combina a velocidade em milissegundos de cada resposta, o percentual de acertos consecutivos e a retenção do multiplicador de combo."
        }
      },
      {
        "@type": "Question",
        "name": "Pessoas com daltonismo podem realizar este teste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pessoas com discromatopsias graves podem apresentar dificuldades com pares específicos de cores, porém o teste inclui alto contraste para minimizar ambiguidades."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a relação entre o teste de Stroop e a produtividade no trabalho?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O treino de inibição fortalece a habilidade de suprimir notificações, ruídos de fundo e pensamentos intrusivos, aumentando a capacidade de imersão em trabalho focado."
        }
      }
    ]
  };

  const guide = {
    title: "Guia Científico do Teste de Stroop e Neurobiologia da Inibição",
    intro: [
      "O efeito Stroop, documentado originalmente por J. Ridley Stroop (1935), representa um dos fenômenos mais consolidados na psicologia cognitiva experimental. Quando confrontados com estímulos incongruentes (como a palavra 'VERDE' impressa em tinta vermelha), os tempos de reação sofrem uma desaceleração acentuada acompanhada por um aumento na taxa de erro.",
      "A base mecanicista decorre da velocidade assimétrica de processamento: a leitura semântica é uma rotina altamente automatizada no córtex cerebral adulto (MacLeod, 1991). Pelo modelo de corrida de cavalos de Logan & Cowan (1984), a rota de leitura vence a identificação da cor a menos que mecanismos inibitórios ativos do córtex pré-frontal atuem em tempo hábil para frear o impulso.",
      "Estudos de neuroimagem demonstram que esse controle executivo é coordenado pelo córtex cingulado anterior (ACC) e pelo córtex pré-frontal dorsolateral (DLPFC). Praticar regularmente o teste treina a capacidade de ignorar interferências visuais e sustentar foco estrito sob estresse temporal."
    ],
    benchmarks: {
      title: "Parâmetros de Desempenho no Teste de Stroop (Sessão de 45 Segundos)",
      headers: ["Nível de Habilidade", "Pontuação (45s)", "Taxa de Precisão", "Avaliação Neurocognitiva"],
      rows: [
        ["Tier 1 (Elite / Mestre da Inibição)", "18.000+ PTS", "96%+", "Controle de impulso impecável; supressão instantânea da leitura com reação ultrarrápida."],
        ["Tier 2 (Avançado / Nível Competitivo)", "12.000 – 17.999 PTS", "92% – 95%", "Interferência mínima de Stroop; cadência estável com excelente flexibilidade cognitiva."],
        ["Tier 3 (Médio / Praticante Regular)", "7.000 – 11.999 PTS", "85% – 91%", "Latência de interferência saudável típica; hesitações pontuais com cores contrastantes."],
        ["Tier 4 (Básico / Foco Intermitente)", "3.000 – 6.999 PTS", "75% – 84%", "Predomínio do impulso de leitura; redução acentuada da velocidade com a dificuldade."],
        ["Tier 5 (Iniciante / Alta Impulsividade)", "< 3.000 PTS", "< 75%", "Erros frequentes e esgotamento de tempo; suscetibilidade a fadiga cognitiva rápida."]
      ],
      note: "Pontuações registradas em sessões de 45 segundos com diversidade cromática dinâmica e janelas de resposta reduzidas (Stroop, 1935; Woods et al., 2015)."
    },
    instructions: [
      "Observe a palavra e selecione o botão correspondente à cor da tinta da fonte.",
      "Ignore ativamente a palavra escrita: leia apenas a cor visual.",
      "Mantenha um ritmo constante para preservar o multiplicador de pontos.",
      "Evite chutes rápidos que possam quebrar sua sequência de acertos."
    ],
    tips: [
      "Isole o traço de uma letra em vez de fitar o termo inteiro.",
      "Evite vocalizar os nomes das cores na sua mente para não saturar a alça fonológica.",
      "Mantenha a respiração estável durante as acelerações de nível."
    ],
    sources
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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

      <DistractionFighterClient
        copy={{
          title: "Teste de Stroop",
          subtitle: "Interferência Cor-Palavra & Inibição Cognitiva",
          caption: "Nomeie a cor da fonte e ignore o significado da palavra. A interferência entre leitura automática e reconhecimento de cores avalia seu controle inibitório executivo (Stroop, 1935).",
          stageCaption: "Clique no botão com a cor da fonte e ignore a palavra escrita contraditória.",
          rulesTitle: "Instruções do Drill e Pontuação",
          aboutTitle: "Sobre o Teste de Stroop e o Controle Inibitório",
          aboutText: "O efeito Stroop descreve a lentidão ao nomear a cor da fonte de uma palavra quando o texto e a cor entram em conflito (Stroop, 1935; MacLeod, 1991).\n\nLer é um processo profundamente automatizado. O córtex pré-frontal precisa suprimir ativamente a leitura para permitir a percepção cromática pura.\n\nO treino sistemático melhora a capacidade de inibir distrações sonoras e visuais no cotidiano.",
          aboutCards: [
            { title: "Para quem é indicado?", desc: "Profissionais que atuam em ambientes com distrações frequentes, estudantes e competidores de esports.", color: "bg-blue-600" },
            { title: "Habilidades Desenvolvidas", desc: "Resistência à interferência de Stroop, controle inibitório, foco seletivo e supressão de impulsos.", color: "bg-emerald-600" },
            { title: "Controle Inibitório", desc: "Suprima o impulso de leitura e isole a percepção cromática sob pressão de tempo crescente.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "Interferência de Stroop", text: "Uma palavra surge na tela (ex: 'AZUL') impressa com tinta de cor divergente (ex: vermelho)." },
            { title: "Regra de Seleção", text: "Clique no botão da COR DA FONTE (Vermelho) ignorando a palavra escrita (+100 Pts x Combo x Nível, +0,6s)." },
            { title: "Erros", text: "Um erro reinicia sua sequência de combo e consome tempo. A partida encerra ao expirar o relógio." },
            { title: "Séries e Bônus", text: "Sequências contínuas multiplicam seus pontos e níveis mais avançados exigem decisões imediatas." }
          ]
        }}
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/distraction-fighter"
          locale="pt"
        />
      </div>
    </>
  );
}
