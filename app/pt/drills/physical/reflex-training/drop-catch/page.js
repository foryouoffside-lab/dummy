import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (PT / PT-BR)
// Primary Intent: teste da régua reflexo, teste da régua tempo de reação, teste de tempo de reação online
// Brazilian & Portuguese Athletic/Academic Context: Teste da régua de Nelson adaptado digitalmente com paradigma Go/No-Go e alvos cadentes
// High-Demand, Low-Competition Target Keywords:
//   - "teste da régua reflexo" (Classic school/athletic ruler drop test query)
//   - "teste da régua tempo de reação" (Measuring reaction time with ruler drop)
//   - "teste de tempo de reação online" (High-intent digital reaction tool query)
//   - "teste de reflexo e atenção" (Cognitive reflex and attention query)
//   - "treino de reflexo e mira" (Aim & reflex training query)
//   - "teste go no go online" (Inhibitory control & impulse restraint query)
//   - "tempo de reação de escolha" (Donders Type C choice reaction time query)
//   - "teste de reflexos visuais" (Visual motor reflex assessment query)
//   - "exercícios de reflexo motor" (Motor reflex conditioning query)
//   - "como melhorar tempo de reação" (Reflex improvement query)
// ============================================================

export const metadata = {
  title: "Teste da Régua – Tempo de Reação Online | SkillDrills",
  description: "Teste da régua online grátis. Intercepte alvos em queda livre para medir seu tempo de reação em milissegundos e treinar reflexos motores rápidos no PC.",
  keywords: [
    "teste da régua reflexo",
    "teste da régua tempo de reação",
    "teste de tempo de reação online",
    "teste de reflexo e atenção",
    "treino de reflexo e mira",
    "teste go no go online",
    "tempo de reação de escolha",
    "teste de reflexos visuais",
    "exercícios de reflexo motor",
    "como melhorar tempo de reação"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "Teste da Régua – Tempo de Reação Online | SkillDrills",
    description: "Teste da régua online grátis. Intercepte alvos em queda livre para medir seu tempo de reação em milissegundos e treinar reflexos motores rápidos no PC.",
    url: 'https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Teste da Régua – Tempo de Reação Online | SkillDrills",
    description: "Teste da régua online grátis. Intercepte alvos em queda livre para medir seu tempo de reação em milissegundos e treinar reflexos motores rápidos no PC.",
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
      "name": "Centro de Treino Físico",
      "item": "https://skilldrills.online/pt/drills/physical"
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
      "name": "Teste da Régua & Drop Catch",
      "item": "https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste da Régua Digital e Treino de Reflexo Drop Catch",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulador de Queda Livre, Tempo de Reação e Paradigma Go/No-Go",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Reaction Time, Sports Science"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Reflex Drop Catch & Impulse Discipline Drill",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Motor Chronometry Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como este simulador Drop Catch digitaliza o clássico teste da régua de educação física?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O teste tradicional mede o deslocamento de uma régua solta entre os dedos para deduzir o tempo de reação pela física da gravidade (d = 1/2gt²). O Drop Catch digitaliza essa aceleração vertical não linear (de 400 a 1250 px/s) e adiciona o componente cognitivo do paradigma Go/No-Go: capturar alvos verdes válidos e ignorar iscas vermelhas enganosas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a fundamentação da tarefa de discriminação Tipo C de Donders (1868)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Franciscus Donders (1868) classificou o tempo de reação Tipo C como aquele em que múltiplos estímulos são apresentados, mas apenas um requer resposta motora enquanto os outros devem ser ignorados. Esse processo exige categorização visual prévia antes do disparo motor, estendendo a latência em 80 a 120 ms em comparação com um reflexo simples."
      }
    },
    {
      "@type": "Question",
      "name": "O que é a teoria do Tau Óptico de David N. Lee e como ela calcula a interceptação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formulada por David N. Lee (1976), a teoria do tau óptico (τ) demonstra que o cérebro humano não calcula distância e velocidade separadamente; ele afere o tempo restante até o contato (Time-to-Contact) diretamente a partir da taxa de expansão da imagem retiniana. Isso permite prever com precisão de milissegundos o ponto ideal de clique."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o modelo de corrida de cavalos (Horse-Race Model) de Logan para inibição motora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo Gordon D. Logan (1984), quando um alvo aparece, deflagra-se uma corrida interna entre o processo motor de ação ('Go') e o sinal inibitório pré-frontal ('Stop'). Se o cérebro reconhecer a cor vermelha a tempo, o veto inibitório vence a corrida e suprime a flexão do dedo, impedindo um clique fatal na isca."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a penalidade imposta ao clicar em uma isca vermelha durante a partida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Acertar uma isca vermelha acarreta a perda imediata de todo o multiplicador de combo acumulado (retornando a 1.0x), além de descontar pontos e provocar um flash visual de erro. Em jogos competitivos, disparar em alvos proibidos ou aliados simula o fogo amigo com penalidade máxima."
      }
    },
    {
      "@type": "Question",
      "name": "Como o ganho de tempo de +0,6s por acerto recompensa a precisão contínua?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada captura correta de alvo verde bonifica o cronômetro com +0,6 segundo adicional. Isso permite que atletas com reflexos apurados e alto controle inibitório estendam a rodada de 45 segundos básicos para muito além, alcançando patamares superiores a 24.000 pontos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a área da tela mais estratégica para fixar o olhar durante a queda dos alvos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se fixar a visão no terço superior da área de jogo. Manter os olhos próximos ao ponto de geração permite discriminar a cor verde ou vermelha nos primeiros 50 ms de existência, posicionando o cursor na linha de trajetória antes que a aceleração gravitacional torne o alvo inalcançável."
      }
    },
    {
      "@type": "Question",
      "name": "Por que taxas de atualização de 144Hz ou 240Hz reduzem o borrão de movimento em alvos velozes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 1250 px/s, um monitor de 60Hz atualiza o alvo a cada 20,8 pixels de deslocamento, gerando rastros e borrões que dificultam o cálculo retiniano. A 240Hz (4,1 ms por quadro), o salto entre quadros cai para apenas 5,2 pixels, proporcionando uma leitura de trajetória límpida e reação motora precisa."
      }
    },
    {
      "@type": "Question",
      "name": "Qual estilo de pegada do mouse favorece o microajuste vertical necessário na captura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A pegada Fingertip (ponta dos dedos) é ideal para interceptações gravitacionais verticais. Ela permite avançar e retrair o mouse com pequenos movimentos de flexão das falanges sem necessidade de mover todo o antebraço ou o pulso, economizando preciosos milissegundos."
      }
    },
    {
      "@type": "Question",
      "name": "Meus registros de tempo de reação e taxa de acertos são armazenados com segurança?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Toda a física vetorial e a cronometria de precisão da API performance.now() operam localmente no seu navegador. Os dados estatísticos e recordes de pontos são guardados apenas no seu localStorage local, sem envio a nenhum servidor externo."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo em 4 Etapas para Interceptação Gravitacional e Controle Inibitório",
  "description": "Treinamento progressivo para aprimorar tempo de reação de escolha, cálculo de trajetória em queda livre e supressão de impulsos.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixação Visual no Terço Superior (Upper Third Visual Anchoring)",
      "text": "Posicione os olhos no terço superior da tela para discriminar a tonalidade do estímulo (verde ou vermelho) nos primeiros 50 ms após o surgimento.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Posicionamento Antecipado na Linha de Queda (Trajectory Interception)",
      "text": "Mova o cursor diretamente para o eixo vertical de descida antes que a gravidade acelere o alvo para além de 800 px/s.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Veto Inibitório de Logan para Iscas Vermelhas (Stop-Signal Veto)",
      "text": "Ao identificar um círculo vermelho, relaxe os músculos dos dedos imediatamente e deixe o objeto passar sem clicar para preservar o multiplicador.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Captura Firme no Terço Central e Bônus de Tempo (Clean Interception)",
      "text": "Dispare o clique com firmeza na zona intermediária, acumulando +0,6s de tempo por acerto para manter o multiplicador 3.0x rumo aos 24.000 pontos.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "Guia de Biomecânica da Queda Livre, Tempo de Reação e Discriminação Visual",
  intro: {
    title: "Fundamentos Científicos da Discriminação de Estímulos e Inibição de Resposta",
    paragraphs: [
      "O Drop Catch é um sistema avançado de cronometria motora e controle inibitório que transpõe o consagrado teste da régua para o ecossistema digital de alta performance. Em vez de simplesmente fechar os dedos sobre um objeto em queda livre, o atleta é submetido a uma tarefa de escolha Tipo C de Donders (1868): capturar com precisão alvos válidos em aceleração contínua enquanto suprime totalmente a resposta motora diante de iscas enganosas.",
      "Sob o efeito da aceleração gravitacional (s = 1/2gt²), a velocidade dos objetos salta de 400 px/s para até 1250 px/s. De acordo com a teoria do tau óptico (τ) de David N. Lee (1976), o córtex visual humano calcula a janela de contato (Time-to-Contact) a partir da taxa de dilatação retiniana do estímulo. Tentar calcular conscientemente a velocidade causa atraso perceptivo; a mestria reside em posicionar o cursor de forma antecipada sobre o vetor de descida.",
      "O desafio neurológico mais complexo reside nas iscas vermelhas imprevisíveis. Segundo o modelo de corrida de cavalos (Horse-Race Model) de Gordon D. Logan (1984), instauram-se no sistema nervoso central dois processos concorrentes: o comando de disparo prepotente ('Go') e o sinal de cancelamento inibitório ('Stop'). Apenas quando a inibição pré-frontal supera a urgência motora inicial evita-se o erro de disparo, habilidade crítica para atletas de elite e atiradores competitivos.",
      "Para assegurar rigor laboratorial e ausência de desvios, o simulador opera por meio da API performance.now() do navegador. Em telas gamer de 144Hz ou 240Hz, o arrasto visual de objetos a 1250 px/s é eliminado, garantindo uma discriminação óptica sem latência de quadro (Woods et al., 2015). Seus recordes permanecem salvos unicamente na memória local do seu computador."
    ]
  },
  benchmarks: {
    title: "Tabela de 5 Níveis de Desempenho para Tempo de Reação de Escolha e Captura",
    headers: ["Nível e Categoria", "Título (Rank Title)", "Meta de Pontuação", "Tempo de Reação e Precisão", "Classificação", "Perfil Neuromuscular"],
    rows: [
      ["Tier 1: Interceptador Gravitacional Ápice", "Apex Gravitational Interceptor", "24.000+ pontos", "< 190 ms / > 95%", "Grade S", "Top 0,1% da elite de eSports e pilotos de caça. Inibição perfeita de Logan e captura impecável a 1250 px/s (Lee 1976; Logan 1984)"],
      ["Tier 2: Atacante Reflexivo de Precisão", "Precision Reflex Striker", "17.000 – 23.999 pontos", "195 – 240 ms / 90 – 94%", "Grade A", "Top 10% nível semiprofissional. Excelente antecipação visual e racha de 3.0x consolidada com 45% de iscas em alta velocidade"],
      ["Tier 3: Praticante Ágil de Drop Catch", "Skilled Drop Catcher", "11.000 – 16.999 pontos", "245 – 310 ms / 82 – 89%", "Grade B", "Top 35% jogadores regulares. Boa coordenação óculo-manual e aproveitamento inteligente do bônus de +0,6s para sobrevida"],
      ["Tier 4: Aprendiz em Desenvolvimento", "Developing Reflex Trainee", "6.000 – 10.999 pontos", "311 – 370 ms / 70 – 81%", "Grade C", "Nível médio populacional. Acima de 800 px/s ocorrem cliques precipitados em iscas vermelhas e perda de sequência"],
      ["Tier 5: Iniciante em Controle Inibitório", "Novice Decoy Learner", "< 6.000 pontos", "> 370 ms / < 70%", "Grade D", "Fase inicial. Dificuldade de discriminação de cores em velocidade; recomenda-se fixar a visão no terço superior da tela"]
    ],
    note: "Critérios de avaliação fundamentados na cronometria de Donders (1868), teoria do tau de Lee (1976) e modelo inibitório de Logan (1984)."
  },
  techniques: {
    title: "4 Protocolos Práticos para Reflexos de Queda e Supressão de Erros",
    items: [
      {
        name: "Fixação Visual no Terço Superior (Upper Third Visual Anchoring)",
        desc: "Não acompanhe o objeto descendo desde o teto até o fundo. Fixe seu olhar no terço superior para classificar a cor nos primeiros 50 ms e já posicionar o mouse na linha de queda.",
        tips: "Não corra atrás do alvo: espere-o no ponto de interceptação planejado."
      },
      {
        name: "Veto Inibitório Stop-Signal de Logan (Logan Stop-Signal Veto)",
        desc: "Controle o reflexo involuntário do indicador de disparar em qualquer movimento. Ao captar o menor matiz vermelho, relaxe a musculatura do dedo instantaneamente.",
        tips: "Um clique no vermelho destrói todo o multiplicador de 3.0x acumulado; a abstenção é tão valiosa quanto o acerto."
      },
      {
        name: "Interceptação Gravitacional por Tau Óptico (Optical Tau Interception)",
        desc: "A velocidade aumenta exponencialmente quanto mais baixo o objeto cai. Dispare o clique com firmeza na zona intermediária da tela antes que o alvo escape pela borda inferior.",
        tips: "Não espere a margem crítica final; acione o clique na ampla janela do terço central."
      },
      {
        name: "Microajuste Vertical Fingertip (Fingertip Vertical Micro-Steering)",
        desc: "Não deite a mão pesada sobre o mouse. Segure o mouse apenas com as pontas dos dedos para realizar avanços e recuos verticais ultrarrápidos sem arrasto no mousepad.",
        tips: "Use a articulação das falanges para corrigir a altura, mantendo o pulso ancorado e estável."
      }
    ]
  },
  steps: [
    "Mantenha uma postura alinhada e fixe a atenção no terço superior do visor.",
    "Identifique em 50 ms se o alvo cadente é verde (interceptar) ou vermelho (ignorar).",
    "Abata os alvos verdes na zona intermediária e deixe as iscas passarem sem clicar.",
    "Acumule o bônus de +0,6s por acerto para manter o multiplicador 3.0x e buscar 24.000 pontos."
  ],
  audience: "Estudantes e atletas que buscam avaliar o teste da régua com precisão digital, bem como gamers competitivos que necessitam afiar reflexos e controle inibitório.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPagePt() {
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
      <DropCatchClient
        copy={{
          title: "Teste da Régua & Teste de Tempo de Reação Online",
          subtitle: "Discriminação Visual e Controle de Impulsos • Dificuldade com Escala Contínua",
          description: "O teste da régua e queda livre mede quão rápido você reage a um objeto caindo e quão bem você inibe cliques indesejados. Capturar não exige calcular distância e velocidade separadamente: a expansão retiniana fornece o tempo de contato por si só (Lee, 1976). Já conter o clique envolve outro mecanismo — a ação e a inibição disputam uma corrida interna, e vence quem processar primeiro (Logan & Cowan, 1984). A reação visual pura leva cerca de 200–250 ms antes que o gesto ocorra (Woods et al., 2015).",
          hudLabels: {
            score: "Pontuação",
            time: "Tempo",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo",
            getReady: "PREPARE-SE"
          },
          resultLabels: {
            accuracy: "Precisão",
            catches: "Capturas",
            fatalDecoys: "Iscas Fatais",
            peakLevel: "Nível Máximo"
          },
          rulesTitle: "Instruções do Drill e Sistema de Pontuação",
          rulesItems: [
            { title: "Captura de Alvos Válidos", text: "Clique nos círculos verdes antes que atinjam o solo. Cada captura rende 100 pontos base (multiplicados pelo nível e combo) e adiciona +0,6s ao cronômetro." },
            { title: "Iscas Proibidas (Decoys)", text: "Não clique em círculos vermelhos. Deixe-os cair livremente. Clicar em uma isca zera todo o seu multiplicador de combo e gera advertência visual." },
            { title: "Escalação Contínua", text: "Conforme você pontua, a velocidade de queda salta de 400 px/s para 1250 px/s, o diâmetro dos alvos diminui e a proporção de iscas sobe até 45%." },
            { title: "Multiplicador e Sobrevida", text: "Encadeie capturas bem-sucedidas para atingir o multiplicador 3.0x e use o ganho contínuo de +0,6s por acerto para manter a sessão ativa." }
          ],
          aboutTitle: "Sobre o Teste da Régua e Interceptação Gravitacional",
          aboutSections: [
            {
              title: "Aceleração Gravitacional e Tau Óptico de Interceptação",
              subtitle: "Cálculo de tempo de contato sob aceleração vertical contínua",
              content: "Objetos em queda livre aceleram sob a força da gravidade. O sistema visual humano estima a janela de interceptação pelo tau óptico (τ), a taxa relativa inversa da dilatação retiniana (Lee, 1976). Isso permite prever com exatidão o milissegundo de colisão."
            },
            {
              title: "Controle Inibitório e Sinais de Cancelamento de Logan",
              subtitle: "Paradigma de contra-ordem e inibição motora pré-frontal",
              content: "A exibição de iscas vermelhas dispara uma corrida interna entre o impulso motor automático 'Go' e o processo inibitório 'Stop' (Logan et al., 1984). Jogadores de alto nível suprimem o clique involuntário até a discriminação visual de cor."
            },
            {
              title: "Cronometria de Discriminação Tipo C de Donders",
              subtitle: "Latência de classificação de estímulo anterior ao movimento",
              content: "Diferente de testes de reflexo simples, o Drop Catch reproduz o teste Tipo C de Donders (1868): múltiplos estímulos surgem, mas o disparo motor deve ser restrito apenas aos alvos corretos, exigindo 80–120 ms a mais de processamento."
            },
            {
              title: "Flick Balístico e Desaceleração de Pouso em Dois Estágios",
              subtitle: "Impulso em malha aberta de Woodworth acoplado a correções finais",
              content: "O reposicionamento do cursor segue o modelo em duas fases de Woodworth (1899): um impulso inicial cobrindo 85%+ do trajeto seguido de microajustes ópticos finais sob a Lei de Fitts (1954)."
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
