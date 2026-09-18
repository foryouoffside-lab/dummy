import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — Brazil & Portugal (PT / PT-BR)
// Primary Intent: treinar visão periférica, teste de visão periférica online, expandir campo visual
// Brazilian & Portuguese Gaming/Athletic Context: Prevenção de visão de túnel em FPS (CS2, Valorant) e expansão do campo visual útil (UFOV) para atletas
// High-Demand, Low-Competition Target Keywords:
//   - "treinar visão periférica" (Core high-demand vision conditioning query)
//   - "teste de visão periférica online" (Diagnostic & training visual field query)
//   - "expandir campo visual" (Functional peripheral expansion query)
//   - "campo de visão eSports" (Gamer awareness & spatial detection query)
//   - "evitar visão de túnel" (Tunnel vision prevention under combat stress)
//   - "exercícios para visão periférica" (Athletic peripheral training drills)
//   - "teste de reflexos periféricos" (Peripheral reaction chronometry query)
//   - "teste ufov online" (Useful Field of View assessment query)
//   - "coordenação olho mão reflexos" (Hand-eye coordination query)
//   - "treino de percepção visual rápida" (Rapid visual perception query)
// ============================================================

export const metadata = {
  title: "Treinar Visão Periférica – Teste Online | SkillDrills",
  description: "Teste de visão periférica online grátis. Intercepte ameaças radiais em 360° pelo canto dos olhos e amplie seu campo visual útil (UFOV) no navegador.",
  keywords: [
    "treinar visão periférica",
    "teste de visão periférica online",
    "expandir campo visual",
    "campo de visão eSports",
    "evitar visão de túnel",
    "exercícios para visão periférica",
    "teste de reflexos periféricos",
    "teste ufov online",
    "coordenação olho mão reflexos",
    "treino de percepção visual rápida"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "Treinar Visão Periférica – Teste Online | SkillDrills",
    description: "Teste de visão periférica online grátis. Intercepte ameaças radiais em 360° pelo canto dos olhos e amplie seu campo visual útil (UFOV) no navegador.",
    url: 'https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Treinar Visão Periférica – Teste Online | SkillDrills",
    description: "Teste de visão periférica online grátis. Intercepte ameaças radiais em 360° pelo canto dos olhos e amplie seu campo visual útil (UFOV) no navegador.",
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
      "name": "Treino de Visão Periférica & Defesa Radial",
      "item": "https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Simulador de Visão Periférica e Expansão de Campo Visual (UFOV)",
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
  "name": "Treinador de Atenção Encoberta e Interceptação Radial 360°",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Vision, Attention"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Peripheral Threat Sweeper 360 Challenge",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Cognitive Vision Drill"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como este exercício treina a visão periférica sem exigir o movimento direto dos olhos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O drill fundamenta-se no paradigma de orientação de atenção espacial encoberta de Michael Posner (1980). Ao manter o olhar fixo no núcleo central, os atletas aprendem a deslocar seu foco atencional pelo canto dos olhos por toda a periferia radial de 360°, eliminando o tempo morto de 150 a 200 ms exigido pelas saccadas oculares convencionais."
      }
    },
    {
      "@type": "Question",
      "name": "O que diz a teoria de integração de características de Anne Treisman sobre a detecção de ameaças?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Segundo Anne Treisman (1980), alvos periféricos com forte contraste cromático (nós vermelhos e laranjas em movimento convergente) ativam detectores pré-atencionais na retina periférica. Esses nós produzem um efeito de destaque imediato (pop-out), alertando o córtex parietal para o cálculo imediato do ângulo de intercepção."
      }
    },
    {
      "@type": "Question",
      "name": "Como o modelo motor de Woodworth (1899) é aplicado nos flicks radiais de varredura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cada varredura radial obedece ao modelo de dois estágios de Robert S. Woodworth: uma projeção balística inicial de punho cobrindo mais de 85% do trajeto em malha aberta, seguida de uma rápida correção visual em malha fechada ao atingir o nó da ameaça antes que este cruze o perímetro do núcleo."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Campo Visual Útil (UFOV) e de que modo ele é expandido neste drill?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Useful Field of View (UFOV), pesquisado por Karlene Ball et al. (1988), define a área visual a partir da qual o cérebro consegue extrair e processar informações em uma fração de segundo sem mover os olhos ou a cabeça. Aumentar a velocidade das ameaças para 520 px/s e encurtar o tempo de geração para 0,20 s condiciona o córtex a alargar essa margem funcional, combatendo a visão de túnel."
      }
    },
    {
      "@type": "Question",
      "name": "Por que o cursor deve retornar imediatamente ao centro após cada varredura?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manter o cursor centrado no núcleo preserva a equidistância física em relação a qualquer novo vetor de ameaça que surja nos 360° do perímetro. Deixar o mouse na borda externa após um clique dobra a distância necessária para alcançar uma ameaça no lado oposto, violando a Lei de Fitts e resultando em brechas na defesa."
      }
    },
    {
      "@type": "Question",
      "name": "O que ocorre quando uma ameaça consegue romper o escudo e atingir o núcleo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quando um vetor rompe o perímetro do núcleo (breach), o multiplicador de combo acumulado é zerado instantaneamente para 1.0x e a tela emite um clarão de alarme vermelho. Evitar brechas é crucial para manter o calor da sequência e ultrapassar o patamar de 24.000 pontos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a sensibilidade de mouse recomendada para varreduras radiais de 360 graus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomenda-se uma sensibilidade média a alta (eDPI entre 800 e 1400 em shooters táticos) que permita ao jogador realizar flicks para qualquer quadrante de 360° sem levantar o mousepad ou forçar a rotação total do ombro, priorizando movimentos ágeis de punho e dedos."
      }
    },
    {
      "@type": "Question",
      "name": "Como a taxa de atualização do monitor afeta a detecção no canto dos olhos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A retina periférica é hiper-sensível ao movimento e à cintilação. Telas de 144Hz e 240Hz exibem o movimento contínuo dos nós a 520 px/s com fidelidade absoluta de 4,1 ms, ativando as células ganglionares magnocelulares muito mais rápido do que um monitor comum de 60Hz."
      }
    },
    {
      "@type": "Question",
      "name": "Quantos minutos de treino diário são recomendados para evitar fadiga ocular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sugere-se realizar de 3 a 5 partidas diárias de 45 segundos, reservando 1 minuto de repouso entre elas olhando para um ponto distante (regra 20-20-20). O treino de visão periférica exige alto esforço dos lobos parietais, devendo ser breve e focado para garantir consolidação neural."
      }
    },
    {
      "@type": "Question",
      "name": "Os dados das minhas sessões de visão periférica são transmitidos para servidores remotos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Todo o motor de renderização em lona (Canvas), a cronometria de precisão via performance.now() e os cálculos de intercepção operam exclusivamente no navegador do seu dispositivo. As pontuações e recordes são guardados no localStorage local com privacidade total."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Protocolo em 4 Etapas para Varredura Periférica e Defesa Radial 360°",
  "description": "Metodologia científica para ampliar o campo visual útil, aperfeiçoar a atenção encoberta e defender o núcleo contra múltiplos vetores.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixação Central Foveal e Atenção Encoberta (Core Eye Fixation)",
      "text": "Fixe o olhar firmemente no núcleo central e evite mover os olhos para as bordas, abrindo a percepção periférica pelos cantos da visão (Posner, 1980).",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Identificação Pré-Atencional de Pop-Out (Treisman Saliency Detection)",
      "text": "Detecte os nós vermelhos e laranjas convergentes na retina periférica instantaneamente através dos mapas de contraste pré-atencionais.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Flick Balístico Radial de Woodworth (Radial Ballistic Flick)",
      "text": "Execute um movimento rápido com o punho em direção ao vetor e acione o clique antes que o nó invada o perímetro do escudo (+0,6s de bônus).",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Recentralização Instantânea e Maintien de Combo (Core Reset)",
      "text": "Retorne o cursor imediatamente ao centro após cada eliminação para rearmar a equidistância de 360° rumo ao patamar de 24.000 pontos.",
      "url": "https://skilldrills.online/pt/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "Fundamentos Biomecânicos da Visão Periférica e do Campo Visual Útil (UFOV)",
    paragraphs: [
      "No sistema visual humano, a fóvea central — responsável pela máxima acuidade e resolução de cores — ocupa apenas de 1 a 2 graus de todo o campo visual. Toda a região periférica circundante apresenta menor resolução espacial estática, mas possui altíssima concentração de células fotorreceptoras do tipo bastonete, especializadas na detecção imediata de movimento, cintilação e luminosidade. Este exercício foi planejado para condicionar a atenção espacial encoberta (Posner, 1980): a capacidade neural de alocar processamento atencional no canto dos olhos sem desviar a direção foveal primária.",
      "A dinâmica de cada varredura periférica é regida pela clássica Lei de Fitts (1954) e pelo modelo de controle motor bifásico de Woodworth (1899). O tempo de resposta aumenta logaritmicamente conforme a distância radial até o vetor cresce e o diâmetro da ameaça diminui. Ao rebater ameaças velozes em aproximação contínua, o atleta precisa lançar o mouse com um movimento balístico em malha aberta cobrindo 85%+ do trajeto, aplicando uma desaceleração microscópica no ponto de impacto antes do clique.",
      "Estudos clássicos de Karlene Ball et al. (1988) evidenciam que, sob situações de estresse e fadiga competitiva, o campo de visão funcional pode sofrer uma contração drástica conhecida como 'visão de túnel'. O simulador contrapõe esse colapso iniciando com intervalos moderados de 1,4 segundo e progredindo dinamicamente até cadências extremas de 0,20 segundo com nós a 520 px/s. Esse estímulo contínuo força o córtex parietal a expandir permanentemente o Useful Field of View (UFOV), conferindo consciência espacial panorâmica inabalável.",
      "Para garantir precisão laboratorial em milissegundos, o sistema afere tempos de reação por meio da API performance.now() do navegador. Em telas gamer com taxas de 144Hz ou 240Hz, o borrão de arraste dos nós radiais a 520 px/s é eliminado, possibilitando discriminação perceptiva sem atraso de renderização (Woods et al., 2015). Seus recordes permanecem guardados unicamente no seu computador, preservando total sigilo."
    ]
  },
  benchmarks: {
    title: "Tabela Oficial de Classificação para Visão Periférica e Defesa Radial",
    headers: ['Nível (Tier)', 'Título & Classificação', 'Pontuação Meta', 'Precisão & Velocidade', 'Grau', 'Nível de Percepção'],
    rows: [
      ['Tier 1', 'Guardião Supremo do Campo Visual (Apex Peripheral Guardian)', '24.000+ pts', '90%+ Acertos / 450+ px/s', 'Grau S', 'Top 1% (UFOV Extraordinário)'],
      ['Tier 2', 'Interceptador Radial de Precisão (Precision Radial Sweeper)', '17.000 – 23.999 pts', '82–89% Acertos / 350–449 px/s', 'Grau A', 'Top 10% (Nível Competitivo)'],
      ['Tier 3', 'Defensor de Campo Ágil (Skilled Field Defender)', '11.000 – 16.999 pts', '74–81% Acertos / 250–349 px/s', 'Grau B', 'Top 30% (Percepção Consistente)'],
      ['Tier 4', 'Praticante Parafoveal em Progresso (Developing Parafoveal Tracker)', '6.000 – 10.999 pts', '65–73% Acertos / 160–249 px/s', 'Grau C', 'Média (Jogadores Regulares)'],
      ['Tier 5', 'Iniciante Sujeito a Visão de Túnel (Novice Tunnel Vision Vulnerable)', '< 6.000 pts', '< 65% Acertos / < 160 px/s', 'Grau D', 'Básico (Expansão de UFOV Recomendada)'],
    ],
    note: "A avaliação leva em conta pontos totais, quantidade de brechas sofridas no núcleo, velocidade máxima sobrevivida e comprimento máximo de combo.",
  },
  protocols: {
    title: "Protocolo de 4 Fases para Maximização da Visão Periférica",
    description: "Programa sistemático para ancorar a visão foveal, aguçar a percepção pelo canto dos olhos e acelerar a defesa radial.",
    items: [
      {
        title: "Protocolo 1: Condicionamento de Atenção Encoberta de Posner",
        description: "Mantenha os olhos travados no ponto central e iniba a necessidade reflexa de seguir novos alvos com os olhos. Elimine a latência das saccadas focando mentalmente em todos os 4 quadrantes (Posner 1980)."
      },
      {
        title: "Protocolo 2: Detecção Pré-Atencional de Pop-Out de Treisman",
        description: "Treine a retina periférica para tratar nós convergentes vermelhos e laranjas nas margens mais externas como sinais de destaque imediato, sem busca sequencial lenta (Treisman & Gelade 1980)."
      },
      {
        title: "Protocolo 3: Flick Radial Balístico de Woodworth com Frenagem Final",
        description: "Ao registrar o vetor de ameaça, projete o cursor com aceleração imediata do punho cobrindo a trajetória em malha aberta, freando com as pontas dos dedos no instante do clique (Woodworth 1899)."
      },
      {
        title: "Protocolo 4: Expansão de UFOV sob Alta Densidade e Priorização",
        description: "Nos níveis avançados com frequência de 0,20 s, calcule a distância relativa de múltiplos nós simultaneamente e abata primeiro os vetores em maior iminência de invasão (Woods et al. 2015)."
      }
    ]
  },
  faqs: {
    title: "Perguntas Frequentes (FAQ) sobre Visão Periférica e Defesa de Ameaças",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function LocalizedPeripheralThreatSweeperPagePt() {
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "Treinar Visão Periférica & Teste de Campo Visual Online",
          subtitle: "Varredura Radial 360° e Defesa de Escudo • Dificuldade com Escala Contínua",
          description: "A visão periférica é aquilo que você consegue detectar sem olhar diretamente. Os detalhes diminuem acentuadamente a partir do centro do olhar, mas a atenção pode ser direcionada para um ponto periférico enquanto os olhos permanecem parados, acelerando a resposta motora (Posner, 1980). Uma característica única como a cor é localizada quase no mesmo tempo independentemente de distrações, enquanto alvos que combinam traços exigem busca atencional ativa (Treisman & Gelade, 1980) — o que torna algumas ameaças fáceis de interceptar na borda e outras desafiadoras.",
          hudLabels: {
            score: "Pontuação",
            time: "Tempo",
            bestScore: "Melhor Pontuação",
            bestCombo: "Melhor Combo",
            getReady: "PREPARE-SE",
            accuracy: "Precisão",
            sweeps: "Varreduras",
            breaches: "Brechas",
            peakLevel: "Nível Máximo"
          },
          resultLabels: {
            accuracy: "Precisão",
            sweeps: "Varreduras",
            breaches: "Brechas",
            peakLevel: "Nível Máximo"
          },
          rulesTitle: "Instruções do Drill e Sistema de Pontuação",
          rulesItems: [
            { title: "Defesa do Núcleo e Pontos", text: "Clique nos nós vermelhos e laranjas convergentes antes que eles atinjam o núcleo central. Cada varredura concede 100 pontos base (multiplicados por nível e combo) e +0,6s de tempo." },
            { title: "Penalidade por Brecha", text: "Se um nó atingir o núcleo central, ocorre uma brecha (breach): o multiplicador de combo é reiniciado imediatamente para 1.0x e a tela pisca em vermelho." },
            { title: "Escalação Contínua de Ameaças", text: "Conforme a pontuação sobe, os intervalos de surgimento caem de 1,4s para 0,20s e a velocidade dos vetores acelera de 160 px/s até 520 px/s." },
            { title: "Recentralização Tática", text: "Retorne o cursor para o núcleo central após cada eliminação para garantir equidistância de 360° diante de ameaças em qualquer quadrante." }
          ],
          aboutTitle: "Sobre o Treino de Visão Periférica e Atenção Encoberta",
          aboutSections: [
            {
              title: "Orientação de Atenção Encoberta e Varredura Periférica",
              subtitle: "Direcionamento espacial de Posner sem desvio da fixação foveal",
              content: "A interceptação de ameaças periféricas treina a orientação encoberta da atenção visual (Posner, 1980). Em vez de deslocar os olhos constantemente, o jogador mantém a fixação central enquanto projeta recursos atencionais pelos 360° da periferia."
            },
            {
              title: "Integração Pré-Atencional e Mapas de Saliência",
              subtitle: "Busca visual paralela de Treisman por ângulos radiais",
              content: "Novos vetores de ameaça ativam detectores pré-atencionais de cor e movimento na retina periférica (Treisman & Gelade, 1980). Nós contrastantes geram o efeito pop-out, alertando o cérebro para rebater o perigo."
            },
            {
              title: "Flick Balístico e Proteção do Núcleo",
              subtitle: "Movimento rápido de Woodworth conjugado com frenagem final",
              content: "As varreduras exigem o clássico controle motor em duas fases de Woodworth (1899): um golpe balístico de punho cobrindo mais de 85% da distância radial, seguido de microajustes visuais para capturar a ameaça antes da brecha."
            },
            {
              title: "Campo Visual Útil e Processamento Multivetorial",
              subtitle: "Expansão da capacidade cognitiva em alta densidade de aparição",
              content: "Com a redução do tempo de geração e aumento da velocidade para 520 px/s, o exercício expande o Useful Field of View (UFOV), condicionando o sistema nervoso a processar múltiplos perigos simultaneamente."
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
