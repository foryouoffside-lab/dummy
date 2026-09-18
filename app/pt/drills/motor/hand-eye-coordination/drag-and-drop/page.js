import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Teste Drag and Drop – Precisão de Mouse | SkillDrills',
  description: 'Teste de drag and drop online gratis no navegador: Treine a precisao ao arrastar o mouse, desaceleracao do cursor e liberacao espacial com a Lei de Accot-Zhai.',
  keywords: [
    'drag and drop test',
    'teste de drag and drop',
    'treino de mouse drag',
    'arrastar e soltar teste',
    'precisao do mouse arrastar',
    'controle de cursor teste',
    'treino de mouse rts',
    'teste de coordenacao motora mouse',
    'desaceleracao de mouse fps',
    'treino de inventario fps',
    'teste de mouse online',
    'agilidade motora mouse',
  ],
  openGraph: {
    title: 'Teste Drag and Drop – Precisão de Mouse | SkillDrills',
    description: 'Teste de drag and drop online gratis no navegador: Treine a precisao ao arrastar o mouse, desaceleracao do cursor e liberacao espacial com a Lei de Accot-Zhai.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste Drag and Drop – Precisão de Mouse | SkillDrills',
    description: 'Teste de drag and drop online gratis no navegador: Treine a precisao ao arrastar o mouse, desaceleracao do cursor e liberacao espacial com a Lei de Accot-Zhai.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills Início',
      item: 'https://skilldrills.online/pt',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Treinamento Motor',
      item: 'https://skilldrills.online/pt/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Coordenação Mão-Olho',
      item: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Treinador de Drag and Drop',
      item: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Drag and Drop e Precisão de Mouse',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Ferramenta online gratuita para aprimorar precisão de arrasto do cursor, desaceleração motora e tempo de liberação.',
  url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Treinador de Mouse Drag and Drop',
  browserRequirements: 'Requer HTML5 Canvas e JavaScript ativado',
  url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jogo de Treino Drag and Drop',
  url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop',
  description: 'Treine velocidade e precisão ao segurar e arrastar alvos para recipientes em movimento sob pressão de tempo.',
  genre: ['Precisão', 'Coordenação Motora', 'Treino Esports'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que avalia o teste de Drag and Drop no mouse?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O teste avalia a coordenação sensório-motora contínua: capacidade de capturar o objeto, transportá-lo em linha reta sob pressão isométrica e desacelerar no timing exato para soltá-lo no recipiente receptor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que arrastar e soltar é mais difícil do que apenas clicar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porque segurar o botão pressionado exige contração isométrica constante dos músculos flexores dos dedos, o que aumenta o atrito contra o mousepad e reduz a largura de banda motora em 15% a 25% (MacKenzie et al., 1991).',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é a Lei de Pilotagem de Accot-Zhai (Steering Law)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Formulada por Johnny Accot e Shumin Zhai em 1997, ela estende a Lei de Fitts para trajetórias restritas, demonstrando que o tempo de transporte é proporcional à distância dividida pela largura do corredor alvo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como evitar passar direto (overshoot) do alvo ao arrastar rápido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inicie a frenagem motora com os músculos extensores do antebraço cerca de 40 a 50 milissegundos antes de alcançar o recipiente, garantindo estabilidade antes de soltar o clique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual pegada de mouse é mais recomendada para arrasto contínuo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pegada palm grip oferece maior superfície de contato e estabilidade de antebraço para trajetórias retas, enquanto a claw grip proporciona microajustes rápidos com as pontas dos dedos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como esse treino beneficia jogadores de FPS e MOBA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em FPS táticos como Valorant e Apex Legends, acelera a troca de escudo e looting em caixas. Em MOBAs e RTS, otimiza a seleção em caixa (box drag) e navegação precisa pelo minimapa.',
      },
    },
    {
      '@type': 'Question',
      name: 'Profissionais de design e edição de vídeo se beneficiam deste exercício?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Designers, editores de vídeo e modeladores 3D realizam milhares de movimentos de arrasto diários em linhas do tempo e curvas bezier; treinar desaceleração reduz fadiga por esforço repetitivo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funcionam os multiplicadores de combo e a pontuação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Acertos consecutivos dentro dos limites do recipiente concedem multiplicadores de combo de até 3.0x. Soltar o objeto fora da borda ou deixar o tempo do recipiente expirar zera a sequência.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais configurações de hardware melhoram o desempenho de arrasto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Desative a aceleração de ponteiro no sistema operacional, utilize DPI entre 800 e 1600, mousepad de tecido com atrito dinâmico consistente e taxa de polling de 1000 Hz ou superior.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o tempo de treino diário recomendado para fixar a memória muscular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sessões curtas de 10 a 15 minutos diários com 4 a 6 repetições de 45 segundos são ideais para estabilização neural sem sobrecarregar tendões do punho.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar precisão de drag and drop com mouse',
  description: 'Guia prático para aprimorar desaceleração de cursor, sustentação de clique e soltura precisa.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Alinhe a mira sobre o nó de captura',
      text: 'Posicione o ponteiro do mouse diretamente sobre o orbe de origem destacado na tela.',
      url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Segure o botão principal com pressão constante',
      text: 'Mantenha o botão esquerdo pressionado com força leve e estável para agarrar o objeto.',
      url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Percorra o corredor até a zona de destino',
      text: 'Transporte o objeto em linha reta sem oscilações laterais em direção ao recipiente móvel.',
      url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Solte de forma limpa dentro dos limites',
      text: 'Libere o botão do mouse exatamente quando o objeto estiver centralizado no recipiente.',
      url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: 'Biomecânica do Arrasto, Pilotagem e Desaceleração Sensório-Motora',
    paragraphs: [
      'Na interação humano-computador, a ação contínua de arrastar e soltar (drag and drop) impõe demandas neuromusculares nitidamente superiores ao simples apontar e clicar. Enquanto o clique pontual obedece à Lei de Fitts (Fitts, 1954), o ato de arrastar exige co-contração isométrica sustentada dos músculos flexores dos dedos para manter o switch acionado durante a translação dinâmica do membro superior.',
      'Na célebre avaliação de MacKenzie, Sellen e Buxton (1991), constatou-se que tarefas de arrasto sofrem uma redução de throughput de 15% a 25% em relação ao apontamento simples. A força descendente altera o atrito das sapatilhas do mouse sobre o mousepad, restringe a flexibilidade dos dedos e amplifica ruídos motores neuromusculares.',
      'Além disso, Johnny Accot e Shumin Zhai (1997) desenvolveram a Lei de Pilotagem (Steering Law) para modelar trajetórias espacialmente confinadas. Ao arrastar sob tempo restrito, o indivíduo deve equilibrar a aceleração de transporte com a desaceleração terminal (Elliott et al., 2010), recrutando músculos antagonistas para evitar o overshoot na borda do recipiente.',
      'Limites de amostragem no navegador: A medição temporal utiliza performance.now() com precisão de milissegundos. A taxa de atualização da tela (16,7 ms em 60 Hz, 6,9 ms em 144 Hz) e a taxa de varredura do mouse introduzem pequenas quantizações (Woods et al., 2015). O SkillDrills processa e guarda suas estatísticas estritamente no seu navegador.',
    ],
  },
  benchmarks: {
    title: 'Níveis de Desempenho e Precisão em Drag and Drop',
    caption: 'Classificação orientativa baseada no modelo de pilotagem de Accot & Zhai (1997) e nos parâmetros de arrasto de MacKenzie et al. (1991). O SkillDrills não coleta dados populacionais.',
    headers: ['Nível (Tier)', 'Classificação', 'Fase / Combo', 'Tempo Médio de Transporte', 'Precisão de Acerto', 'Perfil Neuromotor'],
    rows: [
      [
        'Tier 1',
        'Elite / Pro Gamer',
        'Nv. 12–15 (Combo > 18x)',
        '< 420 ms',
        '≥ 98,0%',
        'Perfil de velocidade em sino perfeito, frenagem precisa e ausência total de solturas precoces.',
      ],
      [
        'Tier 2',
        'Avançado / Competitivo',
        'Nv. 9–11 (Combo 12–17x)',
        '420–510 ms',
        '94,0%–97,9%',
        'Desaceleração controlada, condução firme de trajetória e microajustes terminais abaixo de 35 ms.',
      ],
      [
        'Tier 3',
        'Intermediário / Habilidoso',
        'Nv. 6–8 (Combo 7–11x)',
        '511–640 ms',
        '87,0%–93,9%',
        'Pequenas oscilações laterais durante a aceleração e ligeira perda de velocidade antes da borda.',
      ],
      [
        'Tier 4',
        'Básico / Em Desenvolvimento',
        'Nv. 3–5 (Combo 3–6x)',
        '641–800 ms',
        '78,0%–86,9%',
        'Múltiplos impulsos de correção, tensão excessiva nos dedos provocando atrito elevado e erros de soltura.',
      ],
      [
        'Tier 5',
        'Iniciante / Entrada',
        'Nv. 1–2 (Combo < 3x)',
        '> 800 ms',
        '< 78,0%',
        'Velocidade lenta de condução, liberação frequente fora do recipiente e fadiga muscular no punho.',
      ],
    ],
  },
  protocols: {
    title: 'Protocolos de Treinamento para Precisão com o Mouse',
    items: [
      {
        title: 'Protocolo 1: Estabilização de Força Isométrica (Níveis 1–4)',
        description: 'Concentre-se em manter apenas a pressão mínima necessária para não desarmar o clique durante a movimentação. Apertar forte causa rigidez e tremores de alta frequência.',
      },
      {
        title: 'Protocolo 2: Calibração de Trajetória Reta de Accot-Zhai (Níveis 5–8)',
        description: 'Minimize desvios laterais entre a origem e o recipiente. Visualize um túnel reto imaginário conectando os pontos e elimine trajetórias curvas desnecessárias.',
      },
      {
        title: 'Protocolo 3: Desaceleração com Músculos Antagonistas (Níveis 9–12)',
        description: 'Ative os músculos extensores do antebraço 50 ms antes de entrar no recipiente móvel para estancar o movimento antes de abrir os dedos no centro exato.',
      },
      {
        title: 'Protocolo 4: Interceptação Dinâmica por Ângulo de Lead (Níveis 13–15)',
        description: 'Em velocidades elevadas, mire no ponto futuro de interceptação do recipiente móvel em vez da posição atual, soltando suavemente na sua trajetória futura.',
      },
    ],
  },
  faqs: {
    title: 'Perguntas Frequentes (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={{ title: "Treinador de Drag and Drop" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/pt/drills/motor/hand-eye-coordination/drag-and-drop" />
      </div>
    </>
  );
}
