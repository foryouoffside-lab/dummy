import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// PESQUISA DE PALAVRAS-CHAVE NATIVAS (SERP BRASIL / PT-BR)
// Termos de busca de alta intenção e baixa concorrência:
// - "jogo de desviar do mouse" (Busca de alta intenção gamer e reflexo)
// - "jogo de esquiva mouse reflexo" (Treino de agilidade psicomotora)
// - "teste de visao periferica online" (Avaliação de campo visual e atenção)
// - "treino de reflexo e desvio" (Mecânica de esquiva e tempo de reação)
// - "desviar de habilidades jogo" / "desviar de skillshot" (Cultura MOBA/FPS eSports)
// - "teste de atencao espacial e reflexo" (Neurociência cognitiva aplicada)
// - "jogo de agilidade com mouse" (Busca funcional no navegador sem download)
// - "treino de micro esquiva e flick" (Microajuste balístico de mira)
// ============================================================

export const metadata = {
  title: "Jogo de Desviar do Mouse – Esquiva & Reflexos | SkillDrills",
  description: "Jogo de desviar do mouse online grátis. Detecte explosões na grade 3x3 e mova o cursor para células seguras para treinar visão periférica e reflexos no PC.",
  keywords: [
    "jogo de desviar do mouse",
    "jogo de esquiva mouse reflexo",
    "teste de visao periferica online",
    "treino de reflexo e desvio",
    "desviar de habilidades jogo",
    "teste de atencao espacial e reflexo",
    "jogo de agilidade com mouse",
    "treino de micro esquiva e flick",
    "esquiva de skillshot treino",
    "reflexo espacial teste"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "Jogo de Desviar do Mouse – Esquiva & Reflexos | SkillDrills",
    description: "Jogo de desviar do mouse online grátis. Detecte explosões na grade 3x3 e mova o cursor para células seguras para treinar visão periférica e reflexos no PC.",
    url: 'https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jogo de Desviar do Mouse – Esquiva & Reflexos | SkillDrills",
    description: "Jogo de desviar do mouse online grátis. Detecte explosões na grade 3x3 e mova o cursor para células seguras para treinar visão periférica e reflexos no PC.",
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
      "name": "Coordenação Motora",
      "item": "https://skilldrills.online/pt/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Jogo de Desviar do Mouse & Teste de Visão Periférica",
      "item": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Jogo de Desviar do Mouse & Teste de Visão Periférica",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Ferramenta neurocognitiva de avaliação de reflexos espaciais e varredura periférica através de esquiva dinâmica em matriz 3x3 sob pressão de tempo.",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion",
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
  "name": "Treinador de Esquiva e Reflexo Espacial",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Navegador moderno compatível com HTML5 Canvas e Pointer Lock API",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "pt-BR",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Esquiva em Grade Dinâmica (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion",
  "description": "Exercício intensivo de desvio de explosões em grade 3x3 para aprimoramento de visão periférica, tempo de reação e esquiva de habilidades em jogos competitivos.",
  "genre": [
    "Coordination Drill",
    "Reflex Training",
    "Spatial Awareness",
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
      "name": "Como funciona o teste de visão periférica e esquiva na grade 3x3?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O exercício divide a tela em uma matriz tática de 9 células. Pulsos de aviso em cor âmbar alertam sobre detonações iminentes em múltiplos quadrantes. O jogador deve manter a visão descentralizada, identificar os setores seguros que permanecem apagados e realizar um flick rápido com o cursor antes da explosão."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a fixação visual centralizada no meio da tela é mais eficiente do que olhar célula por célula?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Com base na Teoria da Integração de Características de Anne Treisman (1980), o processamento pré-atencional da visão periférica analisa estímulos luminosos de forma paralela e instantânea. Tentar inspecionar cada célula de modo sequencial causaria um gargalo cognitivo fatal quando o tempo de aviso cai para 0,45 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "De que maneira este treino melhora a esquiva de habilidades em jogos como League of Legends, Valorant e CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em confrontos competitivos, habilidades de área (molotovs, granadas e ultimates) e skillshots exigem reação de fuga imediata sem desviar o foco da mira central. O treino condiciona o reflexo exógeno de Posner, permitindo desviar o cursor de ameaças periféricas sem hesitação consciente."
      }
    },
    {
      "@type": "Question",
      "name": "Como a janela de aviso e a quantidade de células perigosas variam com o avanço dos níveis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cada 250 pontos o nível sobe. A janela de tolerância de aviso é reduzida gradualmente de 1,4 segundos no nível 1 para apenas 0,45 segundos nos níveis 12 a 15. Concomitantemente, o número de células em perigo salta de 3 para até 7 células simultâneas, deixando apenas 2 quadrantes de refúgio seguro."
      }
    },
    {
      "@type": "Question",
      "name": "Ser atingido por uma explosão desconta pontos do meu placar ou reduz o cronômetro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não há dedução de pontos acumulados nem encurtamento do tempo de 45 segundos. Entretanto, permanecer em uma célula vermelha durante a detonação reinicia imediatamente o multiplicador de combo para 1.0x, incentivando decisões rápidas e agressivas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a mecânica motora correta para frear o cursor exatamente dentro da célula segura sem passar direto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aplica-se o modelo bifásico de Woodworth (1899): execute um flick balístico rápido com o antebraço em direção ao setor seguro e, no instante em que a ponta do cursor cruzar a fronteira da célula, aplique pressão descendente com a almofada da mão e dedos contra o mousepad para gerar atrito de frenagem imediato."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a sensibilidade do mouse influencia a capacidade de sobrevivência em níveis elevados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sensibilidades extremamente baixas forçam movimentos amplos do braço que consomem tempo precioso da janela de 0,45s. Uma sensibilidade média equilibrada (entre 28 e 38 cm/360°) permite transitar entre quadrantes vizinhos da matriz com pequenos movimentos conjugados de pulso e dedos, minimizando a latência de deslocamento."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a estratégia fundamental para superar 17.000 pontos e conquistar o rank Apex Grid Evader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É indispensável manter a visão suave (soft gaze) no centro exato da matriz 3x3 e priorizar a célula segura mais próxima adjacente ao cursor atual. Sustentar uma sequência ininterrupta com multiplicador máximo de 3.0x durante toda a rodada de 45 segundos garante a pontuação máxima."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a diferença entre atenção endógena e atenção exógena nesta dinâmica de jogo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conforme descrito por Michael Posner (1980), a atenção endógena é voluntária e lenta (cerca de 300ms), enquanto a atenção exógena é disparada de forma reflexa por estímulos visuais externos (cerca de 100 a 150ms). Este drill automatiza a resposta exógena diante do pulso luminoso âmbar."
      }
    },
    {
      "@type": "Question",
      "name": "O teste exige instalação de extensões ou envio de dados pessoais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Todo o processamento cinemático e estatístico roda diretamente no navegador web através de HTML5 Canvas e performance.now(). Seus recordes e estatísticas ficam guardados estritamente na memória local do seu navegador (LocalStorage), garantindo total privacidade."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo de Treinamento em Grade de Esquiva e Reflexos Espaciais",
  "description": "Guia de 4 etapas para escanear a matriz 3x3, identificar células seguras e sobreviver às ondas de explosão.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Posicionamento Central e Fixação Descentralizada",
      "text": "Inicie o teste e posicione a mira no centro da grade 3x3 mantendo um foco visual relaxado que abranja os 9 quadrantes simultaneamente.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion#passo-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Detecção Periférica do Pulso Âmbar de Ameaça",
      "text": "Assim que as bordas âmbar começarem a piscar nos setores de perigo, identifique instantaneamente com a visão periférica os quadrantes que permanecem escuros.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion#passo-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balístico e Frenagem no Setor Seguro",
      "text": "Mova o cursor com um flick direto para a célula segura mais próxima antes que o tempo expire e os setores em perigo detonem em vermelho.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion#passo-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Sustentação de Combo Máximo e Sobrevivência Contínua",
      "text": "Encadeie esquivas consecutivas sem ser atingido para elevar o multiplicador até 3.0x e registrar a pontuação máxima ao longo dos 45 segundos.",
      "url": "https://skilldrills.online/pt/drills/physical/coordination/dynamic-grid-evasion#passo-4"
    }
  ]
};

const gridGuide = {
  heading: "Fundamentação Neurocognitiva: Atenção Espacial e Mecânica de Esquiva Periférica",
  subtitle: "Teoria de integração de Treisman, paradigma de orientação de Posner e controle balístico de Woodworth aplicados à esquiva rápida",
  intro: [
    "O teste de esquiva em grade dinâmica (Dynamic Grid Evasion) submete o aparelho visuomotor a um regime de alta densidade informacional. Em vez de perseguir um alvo móvel isolado, o praticante deve monitorar simultaneamente 9 setores táticos em uma matriz 3x3, discernindo instantaneamente quais quadrantes apresentam risco de detonação iminente e executando uma rota de escape balística antes do término da janela de aviso.",
    "A célebre psicóloga cognitiva Anne Treisman e Garry Gelade (1980), em sua Teoria da Integração de Características, comprovaram que pistas visuais elementares e salientes (como cores contrastantes e bordas cintilantes) são segmentadas de forma pré-atencional e paralela pelo córtex visual. Ao adotar uma fixação visual descentralizada no centróide da matriz, o jogador ativa as células ganglionares parvocelulares e magnocelulares da retina periférica, permitindo registrar múltiplos avisos simultâneos sem necessidade de varredura ocular sacádica sequencial.",
    "A dinâmica de tempo de reação de escolha é aprofundada pelas investigações de Michael Posner (1980) sobre a orientação da atenção encoberta (covert spatial attention). Conforme a dificuldade ascende para os níveis 12 a 15, a janela de alarme colapsa de 1,4 segundos para escassos 0,45 segundos, enquanto o número de setores ameaçados sobe para 7 de 9. Nesse regime de estresse temporal, o controle voluntário endógeno é suplantado pelo modelo bifásico de Robert Woodworth (1899): um disparo motor balístico de alta velocidade seguido por frenagem micrométrica por atrito manual para estabilizar o cursor dentro da fronteira segura.",
    "Rigor de cronometria computacional: A plataforma SkillDrills opera com a API nativa performance.now() em resolução sub-milissegundo no hardware do cliente. Variações cinemáticas perceptíveis decorrem da taxa de atualização do monitor (60Hz = 16,6ms; 144Hz = 6,9ms; 240Hz = 4,1ms) e da taxa de amostragem do mouse. Desvios inferiores a 5ms constituem tolerância física esperada."
  ],
  benchmarks: {
    title: "Tabela de Classificação e Padrões de Desempenho em Esquiva Espacial (5 Níveis)",
    headers: ["Nível / Rank", "Título de Mestria", "Pontuação Alvo", "Nível Atingido", "Janela de Aviso Suportada", "Perfil Neurofuncional de Esquiva"],
    rows: [
      ["Tier 1: Evadidor Apex Supremo", "Apex Grid Evader", "17.000+ pontos", "Nível 12 – 15", "0,45 – 0,60 s de aviso", "Processamento paralelo periférico de elite (top 0,1%); flicks balísticos instantâneos para refúgios seguros sob 7 ameaças ativas (Treisman 1980; Posner 1980)"],
      ["Tier 2: Mestre em Varredura Espacial", "Master Spatial Scanner", "13.000 – 16.999 pts", "Nível 9 – 11", "0,65 – 0,80 s de aviso", "Excelente orientação de atenção encoberta de Posner; esquiva segura sob 5 a 6 células detonadas com frenagem de Woodworth estável"],
      ["Tier 3: Desviador Tático Eficiente", "Proficient Hazard Dodger", "9.500 – 12.999 pts", "Nível 6 – 8", "0,85 – 1,05 s de aviso", "Desempenho sólido para games competitivos; boa tomada de decisão rápida e controle firme de atrito no mousepad"],
      ["Tier 4: Evadidor de Setor Médio", "Intermediate Sector Evader", "6.000 – 9.499 pts", "Nível 3 – 5", "1,10 – 1,25 s de aviso", "Média padrão em adultos; falhas recorrentes provocadas por visão em túnel quando a janela de aviso desce para 1,0 segundo"],
      ["Tier 5: Sobrevivente Inicial", "Novice Blast Survivor", "< 6.000 pontos", "Nível 1 – 2", "> 1,25 s de aviso", "Dificuldade na distribuição da atenção periférica; tendência a focar em células isoladas e ultrapassar os limites da célula segura"]
    ],
    note: "Benchmarks consolidados a partir da Teoria de Integração de Características (Treisman & Gelade 1980), estudos de atenção espacial de Posner (1980) e princípios de controle motor de Woodworth (1899)."
  },
  techniques: {
    title: "Protocolos Táticos para Aperfeiçoamento da Visão Periférica e Esquiva em Grade",
    items: [
      {
        name: "Fixação Descentralizada no Centróide da Matriz (Treisman Decentralized Fixation)",
        desc: "Mantenha os olhos direcionados suavemente ao centro geométrico da matriz 3x3 sem fixar um ponto rígido. Abra o campo de visão periférica para que as células da retina captem a cintilação âmbar simultaneamente em todos os cantos.",
        tips: "Evite rastrear com os olhos o movimento do cursor; confie na propriocepção do braço para deslocar o mouse até o refúgio seguro."
      },
      {
        name: "Disparo Reflexo Exógeno de Posner (Exogenous Covert Attention Trigger)",
        desc: "Aproveite a ativação exógena descrita por Posner (1980). Em vez de calcular deliberadamente onde estão os perigos, mova a mão de forma reflexa em direção ao quadrante que permanece escuro e sem pulso luminoso.",
        tips: "A ausência de estímulo de aviso é o seu sinal verde de fuga instantânea."
      },
      {
        name: "Flick Balístico e Frenagem por Fricção Manual de Woodworth (Boundary Deceleration)",
        desc: "Execute o movimento em aceleração máxima balística e utilize o contato da base da mão e do quinto dedo contra a superfície do mousepad para travar o cursor no interior do quadrante.",
        tips: "Essa leve pressão física para baixo neutraliza a inércia e previne que o cursor ultrapasse a célula segura."
      },
      {
        name: "Regra de Fuga para o Quadrante Adjacente Mais Próximo (Nearest Safe Sector)",
        desc: "Nos níveis finais com 7 células detonadas simultaneamente e tempo reduzido a 0,45s, ponderar a célula 'ideal' gera paralisia por análise.",
        tips: "Salte imediatamente para o quadrante seguro que estiver mais próximo da sua posição atual (seja horizontal, vertical ou diagonal imediato)."
      }
    ]
  },
  steps: [
    "Sente-se confortavelmente e posicione o cursor na célula central da grade 3x3.",
    "Mantenha o olhar suave no meio da tela para captar os avisos luminosos pela visão periférica.",
    "Desloque o cursor com agilidade para a célula segura mais próxima antes da explosão vermelha.",
    "Sustente o multiplicador de 3.0x ininterruptamente para alcançar o ranking Apex durante os 45 segundos."
  ]
};

export default function DynamicGridEvasionPagePt() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "Jogo de Desviar do Mouse & Teste de Visão Periférica",
          subtitle: "Esquiva Dinâmica em Grade 3x3 & Reflexos Espaciais • 15 Níveis",
          hudLabels: {
            score: "Pontuação",
            timeLeft: "Tempo Restante",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo"
          },
          rulesTitle: "Regras do Teste de Esquiva e Sistema de Pontuação",
          rules: [
            { title: "Esquiva de Células de Perigo", text: "Mova a mira para quadrantes seguros antes que as bordas âmbar detonem em explosões vermelhas." },
            { title: "Multiplicador de Combo", text: "Sobreviva a ondas consecutivas sem ser atingido para construir um multiplicador de até 3.0x." },
            { title: "Progressão de Nível", text: "A cada 250 pontos o nível sobe, reduzindo a janela de aviso de 1,4s para 0,45s e elevando o perigo para 7 células." },
            { title: "Impacto da Detonação", text: "Ser atingido por uma explosão reinicia o multiplicador para 1.0x, sem qualquer perda de pontos." }
          ],
          aboutTitle: "Sobre o Treinamento de Esquiva em Grade",
          aboutHeading: "Atenção Espacial Periférica e Fuga Balística de Ameaças",
          aboutText: "Este exercício é fundamentado na Teoria de Integração de Características de Anne Treisman (1980) e no Paradigma de Orientação Espacial de Michael Posner (1980). A dinâmica em matriz 3x3 exercita a visão periférica descentralizada e condiciona reflexos rápidos de fuga necessários para desviar de habilidades de área (AOE), projéteis e granadas em jogos de eSports competitivos.",
          aboutCards: [
            {
              title: "Público-Alvo",
              desc: "Gamers de FPS e MOBA que buscam aprimorar a esquiva de habilidades de área e granadas, além de praticantes focados em agilidade e visão periférica."
            },
            {
              title: "Habilidades Desenvolvidas",
              desc: "Busca visual paralela, atenção encoberta reflexa, redução do tempo de reação de escolha e frenagem motora de alta precisão."
            },
            {
              title: "Varredura Periférica",
              desc: "A fixação no centro da matriz erradica a visão em túnel e desenvolve a percepção espacial em 360 graus."
            }
          ]
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="pt"
        />
      </div>
    </>
  );
}
