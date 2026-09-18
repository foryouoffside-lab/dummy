import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Teste de Velocidade de Teclado – Reflexos | SkillDrills',
  description: 'Teste de velocidade de teclado gratuito. Meça seu tempo de reação de teclas, reflexos em keybinds e memória muscular direto no navegador sem instalar nada.',
  keywords: [
    'teste de velocidade de teclado',
    'treino de reflexo no teclado',
    'teste de reflexo de teclas',
    'treino de keybinds fps',
    'memoria muscular teclado gamer',
    'tempo de reacao do teclado',
    'teste de digitacao e reflexo',
    'treino de teclas de atalho',
    'velocidade de resposta no teclado',
    'praticar teclas de movimento wasd',
    'teste de teclado reacao online',
    'agilidade motora no teclado',
  ],
  openGraph: {
    title: 'Teste de Velocidade de Teclado – Reflexos | SkillDrills',
    description: 'Teste de velocidade de teclado gratuito. Meça seu tempo de reação de teclas, reflexos em keybinds e memória muscular direto no navegador.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Velocidade de Teclado – Reflexos | SkillDrills',
    description: 'Teste de velocidade de teclado gratuito. Meça seu tempo de reação de teclas e reflexos em keybinds.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinamento Motor', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Movimento', item: 'https://skilldrills.online/pt/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: 'Teste de Velocidade de Teclado', item: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Velocidade de Teclado – Treinador de Keybinds',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Treinador de velocidade de teclado e reflexos de teclas gratuito no navegador. Avalie tempo de reação de escolha, memória muscular e inibição de resposta.',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Teste de Velocidade de Teclado',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer suporte a Canvas HTML5 e JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Teste de Velocidade de Teclado – Reflexos',
  url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition',
  description: 'Meça a rapidez com que você pressiona a tecla correta em resposta a estímulos, com base na Lei de Hick para tempo de reação de escolha.',
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um teste de velocidade de teclado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É um teste que avalia o intervalo de tempo entre o aparecimento de uma tecla na tela e o seu acionamento físico no teclado. Mede o tempo de reação de escolha, a familiaridade espacial com o layout do teclado e a capacidade de inibição motora.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o treino de keybinds melhora o desempenho em jogos FPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em jogos táticos como Valorant ou CS2, usar habilidades, granadas ou trocar de arma sob fogo inimigo exige zero hesitação. O treino de teclas automatiza o circuito motor no cérebro, evitando que você olhe para o teclado ou erre a tecla em situações decisivas.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é tempo de reação de escolha e o que diz a Lei de Hick?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Lei de Hick (Hick 1952) estabelece que o tempo de reação aumenta logaritmicamente conforme o número de opções disponíveis. A prática constante automatiza as respostas musculares, reduzindo a sobrecarga cognitiva e aproximando a velocidade de um reflexo simples.',
      },
    },
    {
      '@type': 'Question',
      name: 'Para que serve a função de comandos falsos (Fake Prompts)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Testa a inibição de resposta (paradigma de sinal de parada de Logan 1984). Quando surge um comando armadilha, o córtex pré-frontal precisa cancelar o movimento preparado antes que a tecla seja acionada, prevenindo erros involuntários em partidas competitivas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o tempo de reação médio para teclas de jogos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usuários comuns registram entre 380 e 480 ms. Jogadores competitivos atingem médias entre 240 e 300 ms, enquanto atletas profissionais de esports operam abaixo de 240 ms com alta taxa de acerto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o modo de digitação sequencial desafia a coordenação motora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ao exigir sequências de 3 a 5 teclas seguidas, ele exercita a memória de trabalho e o agrupamento motor (Sternberg 1966). O jogador aprende a disparar combinações inteiras como um único bloco coordenado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual tipo de teclado oferece a menor latência de entrada para os testes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Teclados mecânicos lineares, ópticos ou com sensores magnéticos Hall-Effect (com Rapid Trigger) e polling rate de 1000 Hz ou mais garantem debounce instantâneo e leituras fiéis ao seu sistema nervoso.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quantos minutos por dia devo praticar reações no teclado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 10 a 15 minutos diários em 3 ou 4 blocos curtos. O cérebro assimila o mapeamento espacial rapidamente, mas a fadiga mental reduz a precisão e a capacidade de frear impulsos errados.',
      },
    },
    {
      '@type': 'Question',
      name: 'O treino ajuda em jogos MOBA como League of Legends e Dota 2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Lançar combos rápidos de habilidades (Q-W-E-R) e ativar itens no momento exato exige independência dos dedos e confiança cega na posição das teclas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como o KPM (teclas por minuto) e a precisão são calculados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPM representa o total de teclas corretas dividido pelo tempo do teste em minutos. A precisão é a razão entre acertos e o total de tentativas, penalizando toques errados e falhas em armadilhas.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Treinar Velocidade de Teclado e Memória Muscular de Keybinds',
  description: 'Instruções para aprimorar tempo de reação, reflexo nos atalhos e controle motor inibitório.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Posicionar a Mão na Posição Base',
      text: 'Coloque a mão esquerda sobre a sua configuração padrão de jogo (como o cluster WASD) com os dedos relaxados sobre as teclas.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identificar o Estímulo sem Olhar para as Mãos',
      text: 'Mantenha o olhar fixo no centro da tela. Ao surgir o caractere do alvo, processe a tecla necessária sem desviar a visão.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pressionar com Firmeza ou Inibir o Toque',
      text: 'Pressione a tecla com precisão. Caso apareça uma armadilha (Fake Prompt), recrute a inibição pré-frontal para não tocar na tecla.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Avaliar a Latência e o Ritmo de Digitação',
      text: 'Verifique no relatório final seu tempo de reação individual, o ritmo de KPM e o índice de controle de armadilhas.',
      url: 'https://skilldrills.online/pt/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: 'Fundamentos Científicos da Velocidade de Teclado',
    paragraphs: [
      'A velocidade de acionamento de teclas é fundamentada no tempo de reação de escolha (Donders, 1868; Hick, 1952). A transdução do estímulo visual consome cerca de 200–250 ms, e cada alternativa adicional aumenta a complexidade de processamento. O treino constante automatiza o mapeamento estímulo-resposta, encurtando a fase deliberativa.',
      'Condições de medição no navegador: O relógio performance.now() e a taxa de atualização da tela (16,7 ms a 60 Hz; 4,1 ms a 240 Hz) determinam a resolução temporal. Pequenas variações abaixo de 5 ms são normais e fazem parte do ambiente técnico.',
    ],
  },
  benchmark: {
    title: 'Tabela de Desempenho em Velocidade e Reflexo de Teclas',
    description: 'Baremos editoriais para avaliação de progresso individual. Abrange tempo de reação em tecla única, ritmo de sequências (KPM) e precisão inibitória.',
    columns: ['Tier', 'Classificação', 'Latência de Tecla Única', 'Velocidade KPM', 'Precisão Inibitória', 'Faixa de Nível'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: 'Abaixo de 240 ms',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: 'Top 1% (Elite)',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: 'Top 5% (Avançado)',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: 'Top 20% (Competente)',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: 'Padrão Médio',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: 'Acima de 480 ms',
        level: 'Abaixo de 140 KPM',
        accuracy: 'Abaixo de 80%',
        percentile: 'Iniciante',
      },
    ],
  },
  protocols: {
    title: 'Protocolos Estruturados de Treinamento',
    description: 'Metodologias focadas na aceleração da transmissão corticoespinhal e fortalecimento da inibição motora.',
    items: [
      {
        title: 'Protocolo 1: Compressão de Latência de Escolha (Donders 1868)',
        description: 'Mantenha o foco absoluto na tela sem olhar para o teclado. Force o cérebro a localizar as teclas apenas pela memória proprioceptiva das mãos.',
      },
      {
        title: 'Protocolo 2: Organização por Zonas Funcionais (Hick 1952)',
        description: 'Subdivida mentalmente o teclado em blocos funcionais (movimento WASD, utilitários QECX, numerais 1-4) para reduzir a entropia decisória.',
      },
      {
        title: 'Protocolo 3: Treino de Inibição por Sinal de Parada (Logan 1984)',
        description: 'Pratique a contenção ativa do impulso motor diante de comandos decoy, impedindo o acionamento mecânico do switch.',
      },
      {
        title: 'Protocolo 4: Agrupamento Sequencial em Bloco (Sternberg 1966)',
        description: 'Encare sequências de teclas como uma palavra fluida em vez de caracteres isolados, disparando toques em ondas motoras contínuas.',
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

export default function PortugueseKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
