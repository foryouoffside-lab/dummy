import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – pt-BR (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "treino de jiggle peek" / "segurar angulos fps"
// SECONDARY / LSI:
//   "vantagem do peeker" / "mira de espera fps"
//   "abertura rapida de ombro" / "contra strafe treino"
// ============================================================

export const metadata = {
  title: 'Treino de Jiggle Peek – Segurar Ângulos | SkillDrills',
  description: 'Treino de jiggle peek e mira de espera online grátis. Domine como segurar ângulos defensivos e superar a vantagem do peeker em FPS no navegador.',
  keywords: [
    'treino de jiggle peek',
    'segurar angulos fps',
    'vantagem do peeker',
    'mira de espera fps',
    'abertura rapida de ombro',
    'contra strafe treino',
    'posicionamento de reticula',
    'tempo de reacao cobertura',
    'offset de mira cs2',
    'treino de mira valorant',
    'exercicios de reflexo cantos',
    'peeking defensivo online',
  ],
  openGraph: {
    title: 'Treino de Jiggle Peek – Segurar Ângulos | SkillDrills',
    description: 'Treino de jiggle peek e mira de espera online grátis. Domine como segurar ângulos defensivos e superar a vantagem do peeker em FPS no navegador.',
    type: 'article',
    url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Jiggle Peek – Segurar Ângulos | SkillDrills',
    description: 'Treino de jiggle peek e mira de espera online grátis. Domine como segurar ângulos defensivos e superar a vantagem do peeker em FPS no navegador.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Velocidade de Reação', item: 'https://skilldrills.online/pt/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: 'Treino de Jiggle Peek', item: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Treino de Jiggle Peek – Mira de Espera e Reflexo em Cobertura',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description: 'Treino online para segurar ângulos defensivos, rebater a vantagem do peeker e calibrar o offset da mira.',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'pt-BR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Treinador de Jiggle Peek',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, navegador moderno compatível com Pointer Lock',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'pt-BR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – Jogo de Mira de Espera e Retenção de Ângulos',
  url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit',
  description: 'Jogo de reflexo para aprimorar tempo de reação em quinas e dominar o contra-strafe em jogos de tiro.',
  genre: ['Ação', 'Treinador de Mira', 'FPS Tático'],
  gamePlatform: ['Navegador Web', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um jiggle peek trainer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É uma ferramenta de treino de reflexo em esports focada em simular aberturas rápidas de ombro atrás de coberturas e a retenção defensiva de ângulos contra agressores em FPS.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é a vantagem do peeker (peeker’s advantage)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É a discrepância de latência causada por ping de rede e interpolação (deWet & Straily, 2020), que faz com que o jogador que abre o ângulo veja o defensor estático milissegundos antes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como segurar um ângulo para anular a vantagem do peeker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nunca cole a mira rente à borda da parede. Afaste a mira cerca de 100 a 150 ms de distância de reação humana para que o adversário corra diretamente para o seu tiro.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que a cronometria mental de Donders (1868) explica sobre peeks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Donders provou que a percepção do estímulo e o envio do comando motor geram um atraso biológico mínimo de 200 ms. O offset da retícula compensa exatamente essa latência fisiológica.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o shoulder peek (abertura de ombro) é tão eficaz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ele expõe apenas o ombro ou braço por 50 a 100 ms para induzir disparos de snipers sem colocar a cabeça em perigo.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é o contra-strafe em jogos táticos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É cancelar a inércia do movimento pressionando instantaneamente a tecla direcional oposta, zerando a dispersão da arma e restaurando 100% de precisão de imediato.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que o pré-posicionamento da mira economiza tempo de reação?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ele elimina a necessidade de fazer um flick com a mão. Em vez de ajustar a mira em 2D, o tiro se torna um simples evento de temporização de 1 clique.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a taxa de atualização da tela afeta a retenção de ângulos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Telas de 240Hz exibem novos quadros a cada 4,1 ms contra 16,7 ms em 60Hz (Woods et al., 2015), oferecendo uma margem muito maior para reagir a inimigos velozes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é o treino diário ideal para jiggle peeking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '10 minutos diários alternando entre segurar ângulos fechados e praticar peeks rápidos consolidam a memória muscular do offset correto.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este treino de mira de espera é gratuito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, o SkillDrills disponibiliza este treino de forma 100% gratuita diretamente no navegador, sem cadastros ou instalações.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Praticar Jiggle Peek e Retenção de Ângulos',
  description: 'Passo a passo para dominar posicionamento de mira, compensação de reação e tiros defensivos em coberturas.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Definir geometria da cobertura e largura do ângulo',
      text: 'Ajuste a posição da quina de acordo com os pontos de afunilamento típicos do seu jogo de tiro tático.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Aplicar offset de mira considerando a reação humana',
      text: 'Posicione a retícula levemente afastada da parede para compensar o atraso de processamento visual.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Focar a atenção nas pistas visuais de emergência',
      text: 'Mantenha o foco fixo na linha limite da quina para detectar o primeiro pixel do alvo surgindo da cobertura.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Disparar no exato momento da passagem',
      text: 'Acione o clique certeiro no milissegundo em que o alvo cruza o plano da sua mira, sem tentar corrigir com a mão.',
      url: 'https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: 'Guia de Treino de Jiggle Peek e Retenção de Ângulos',
    paragraphs: [
      'Em jogos competitivos como Valorant e Counter-Strike, segurar um ângulo defensivo exige muito mais do que apenas ficar parado. O erro mais comum dos jogadores é colar a retícula exatamente na quina da parede, sendo inevitavelmente surpreendidos pela vantagem do peeker (deWet & Straily, 2020).',
      'A cronometria mental de Donders (1868) comprova que o cérebro humano necessita de aproximadamente 200 ms para processar um estímulo visual e acionar o dedo no botão do mouse. Profissionais de alto nível compensam isso afastando a retícula exatamente na distância que o inimigo percorrerá durante esses 200 ms.',
      'Este exercício calibra seu tempo de disparo em monitores de alta frequência (Woods et al., 2015), transformando a defesa de quinas em um tiro certeiro e automático.',
    ],
  },
  benchmarks: {
    title: 'Tabela de Desempenho em Retenção de Ângulos e Cobertura',
    headers: ['Nível (Tier)', 'Classificação', 'Tempo de Espera', 'Precisão do Clique', 'Percentil'],
    rows: [
      ['Tier 1', 'Grandmaster / Pro', '< 150 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', 'Elite / Master', '150 – 190 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', 'Pro / Diamond', '191 – 240 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', 'Intermediário / Gold', '241 – 310 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', 'Iniciante / Silver', '> 310 ms', '< 78 %', 'Base'],
    ],
    note: 'Classificação estabelecida a partir de métricas de tempo de reação (Donders, 1868; Kosinski, 2008) e dinâmicas de interpolação de rede em FPS (deWet & Straily, 2020).',
  },
  protocols: {
    title: 'Protocolos de Treinamento em 4 Fases',
    description: 'Etapas essenciais para consolidar a retenção defensiva no reflexo neuromuscular.',
    items: [
      {
        title: 'Definir geometria da cobertura e largura do ângulo',
        description: 'Ajuste a posição da quina de acordo com os pontos de afunilamento típicos do seu jogo de tiro tático.',
      },
      {
        title: 'Aplicar offset de mira considerando a reação humana',
        description: 'Posicione a retícula levemente afastada da parede para compensar o atraso de processamento visual.',
      },
      {
        title: 'Focar a atenção nas pistas visuais de emergência',
        description: 'Mantenha o foco fixo na linha limite da quina para detectar o primeiro pixel do alvo surgindo da cobertura.',
      },
      {
        title: 'Disparar no exato momento da passagem',
        description: 'Acione o clique certeiro no milissegundo em que o alvo cruza o plano da sua mira, sem tentar corrigir com a mão.',
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

export default function PortugueseBarrierSequencePursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BarrierSequencePursuitClient copy={{ title: 'Treino de Jiggle Peek' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/pt/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
    </>
  );
}
