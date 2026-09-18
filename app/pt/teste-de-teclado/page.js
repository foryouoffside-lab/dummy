import { pickSources } from '@/lib/drillSources';
import KeyboardTesterClient from '@/app/drills/motor/keyboard-tester/KeyboardTesterClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: 'Teste de Teclado Online – Testar Teclas | SkillDrills',
  description:
    'Teste cada tecla do seu teclado online no navegador. Identifique teclas presas ou com defeito, meça ghosting e key rollover grátis sem instalar nada.',
  keywords: [
    'teste de teclado',
    'teste teclado',
    'teste de teclado online',
    'testar teclado online',
    'testador de teclado',
    'testar teclado',
    'teste ghosting teclado',
    'teste teclas teclado',
    'teste key rollover',
    'verificar teclado online',
    'teclado virtual teste',
    'teste de teclado abnt2',
  ],
  openGraph: {
    title: 'Teste de Teclado Online – Verifique Teclas e Ghosting | SkillDrills',
    description:
      'Pressione cada tecla e veja quais funcionam em tempo real. Identifique teclas presas, meça ghosting e key rollover no navegador sem instalar nada.',
    type: 'article',
    url: 'https://skilldrills.online/pt/teste-de-teclado',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Teclado Online – Verifique Teclas e Ghosting | SkillDrills',
    description:
      'Pressione cada tecla e veja quais funcionam em tempo real. Identifique teclas presas, meça ghosting e key rollover no navegador sem instalar nada.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/teste-de-teclado',
    languages: getAlternateLanguages('/drills/motor/keyboard-tester'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/pt' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Treino Motor',
      item: 'https://skilldrills.online/pt/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Teste de Teclado',
      item: 'https://skilldrills.online/pt/teste-de-teclado',
    },
    {
      '@type': 'Question',
      name: 'O que é chattering (duplo clique de tecla) no teclado mecânico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chattering é o defeito em que uma única pressão física no switch mecânico resulta em dois ou mais registros consecutivos idênticos, causado por sujeira, desgaste dos contatos metálicos ou folga no mecanismo do switch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este teste de teclado é compatível com teclados mecânicos e de membrana no padrão ABNT2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O testador oferece suporte nativo ao layout brasileiro ABNT2 (com tecla Ç e Alt Gr), além de teclados mecânicos, magnéticos, ópticos, de membrana e de notebooks de qualquer fabricante.',
      },
    },
    {
      '@type': 'Question',
      name: 'O uso deste testador de teclado online é gratuito e seguro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim, é 100% gratuito e privado. Nenhum caractere digitado é enviado para servidores ou armazenado; todo o processamento de teclas ocorre de forma estritamente local no seu navegador.',
      },
    },
  ],
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Teste de Teclado Online',
  alternateName: ['Teste de Teclado', 'Teste Teclado', 'Teste de Teclado Online Grátis', 'Testador de Teclado'],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer um navegador moderno e um teclado físico',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Teste de teclado online gratuito no navegador. Pressione cada tecla para confirmar o registro, encontrar teclas presas ou inoperantes, medir ghosting e key rollover.',
  url: 'https://skilldrills.online/pt/teste-de-teclado',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'pt-BR',
  dateModified: '2026-09-11',
};


const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Teste de Teclado Online — Verificador de Teclas e Ghosting',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Testador de teclado online gratuito para layout ABNT2 e internacional. Verifique teclas com defeito, ghosting e tempo de resposta.',
  url: 'https://skilldrills.online/pt/teste-de-teclado',
  dateModified: '2026-09-11',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' }
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Teste de Teclado Online & Anti-Ghosting Game',
  url: 'https://skilldrills.online/pt/teste-de-teclado',
  description: 'Ferramenta interativa de diagnóstico de teclado no navegador. Teste cada tecla e combinações simultâneas.',
  dateModified: '2026-09-11',
  gamePlatform: 'Web Browser',
  genre: ['Teste de Teclado', 'Utilitários', 'Diagnóstico de Hardware'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como Testar Teclas do Teclado Online',
  description: 'Guia passo a passo para testar teclas funcionando, detectar teclas presas e medir anti-ghosting.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/pt/teste-de-teclado#step-1',
      name: 'Pressione cada tecla individualmente',
      text: 'Pressione cada tecla do seu teclado uma a uma. As teclas acionadas ficarão azuis durante o toque e verdes após o registro.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/pt/teste-de-teclado#step-2',
      name: 'Teste o Anti-Ghosting e Rollover',
      text: 'Pressione várias teclas ao mesmo tempo (como WASD + Barra de Espaço + Shift) para verificar o suporte a N-Key Rollover.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/pt/teste-de-teclado#step-3',
      name: 'Examine os dados brutos de evento',
      text: 'Inspecione a telemetria em tempo real com event.code e event.key para identificar teclas mal mapeadas ou falhas de driver.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/pt/teste-de-teclado#step-4',
      name: 'Conclua o diagnóstico do teclado',
      text: 'Verifique se alguma tecla restou sem acionamento para diagnosticar switches defeituosos antes de reiniciar o teste.'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como testar se as teclas do meu teclado estão funcionando?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Abra este teste de teclado online e pressione cada tecla individualmente. Cada tecla acende em ciano enquanto mantida pressionada e permanece verde após ser confirmada pelo navegador. Se alguma tecla não responder após um toque firme, o sinal físico não está chegando ao sistema. A lista de teclas não confirmadas indica com precisão quais ainda precisam ser testadas.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que significa quando uma tecla não acende no teste de teclado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Significa que o sinal elétrico ou digital da tecla não alcançou o navegador. A interrupção pode ocorrer em qualquer ponto da cadeia: no switch mecânico ou membrana de contato, na placa controladora do teclado, no cabo USB ou receptor sem fio, no driver do sistema operacional ou em conflitos de software. Uma única tecla inativa geralmente indica sujeira sob o teclado ou switch danificado; um bloco de teclas inativo sugere falha na trilha de circuito impresso.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é key rollover e ghosting no teclado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key rollover é a quantidade máxima de teclas que um teclado consegue registrar e transmitir simultaneamente. Pressione várias teclas ao mesmo tempo para ler a métrica de Rollover. Teclados de membrana comuns costumam registrar entre 2 e 6 comandos simultâneos antes de ignorar os demais — efeito denominado ghosting ou bloqueio de teclas. Teclados mecânicos para jogos com tecnologia NKRO (N-Key Rollover) conseguem registrar todas as teclas pressionadas simultaneamente sem perda de entrada.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que certas teclas ou atalhos não registram no navegador?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O sistema operacional intercepta atalhos de nível de sistema (como Alt+Tab, Ctrl+Alt+Del e combinações da tecla Windows) antes de repassá-los para qualquer aplicativo ou navegador. Além disso, as teclas F5 (recarregar página), F11 (tela cheia) e F12 (ferramentas de desenvolvedor) são preservadas para navegação contínua. A ausência de registro desses comandos específicos é um comportamento normal de segurança e não uma falha de hardware.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como identificar uma tecla presa ou com acionamento contínuo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Solte todas as teclas e analise o layout exibido na tela. Se alguma tecla permanecer destacada em azul ciano como se estivesse pressionada sem que você encoste nela, ela está presa mecanicamente ou com contato elétrico em curto. Isso ocorre comumente por acúmulo de poeira, haste desalinhada ou resíduos, sendo a causa de letras digitadas repetidamente sozinhas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este teste de teclado grava ou armazena o que eu digito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não. Todos os dados de pressionamento de tecla são processados exclusivamente na memória local do seu navegador e descartados assim que a página é fechada ou reiniciada. Nada é gravado em banco de dados, nenhum registro é enviado para a nuvem e nenhuma informação de texto digitado é retida.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é a diferença entre event.code e event.key no diagnóstico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A propriedade event.code identifica a posição física do switch no teclado de forma imutável, independente do layout ou idioma do sistema (por exemplo, a tecla ao lado do 1 é sempre Backquote). Já event.key reflete o caractere impresso resultante, alterando-se com Shift, Caps Lock ou layouts como ABNT2 e ANSI. Para diagnóstico de integridade de hardware, o event.code é o dado técnico confiável.',
      },
    },
  ],
};

const guideProps = {
  intro: {
    title: "O que este testador de teclado realmente verifica",
    sources: pickSources('woods2015'),
    paragraphs: [
      "Um testador de teclado confirma se cada tecla física produz um evento que o computador recebe em tempo real. Se você pressiona uma tecla com firmeza e ela não acende, o sinal não está alcançando o navegador.",
      "A ferramenta permite isolar defeitos físicos (sujeira, switch queimado ou membrana rompida) de problemas de configuração no sistema operacional, sem necessidade de instalar programas.",
    ],
  },
  benchmarks: {
    title: 'Níveis de Rollover e Desempenho do Teclado',
    caption: 'Classificação técnica baseada em varredura de matriz, tempo de debounce e taxa de amostragem USB. Os dados são processados exclusivamente no seu navegador.',
    headers: ['Nível (Tier)', 'Arquitetura de Hardware', 'Capacidade de Rollover', 'Matriz Anti-Ghosting', 'Latência Típica de Acionamento', 'Perfil de Diagnóstico e Jogos'],
    rows: [
      [
        'Tier 1',
        'Full NKRO (Magnético Hall-Effect / Óptico)',
        'N-Key Real (> 50 teclas)',
        'Diodo individual por tecla; zero bloqueio na matriz',
        'Abaixo de 1,0 ms (Polling de 8000 Hz / 1000 Hz)',
        'Nível competitivo de elite: Registro de acordes instantâneo, suporte a rapid trigger, zero chattering.',
      ],
      [
        'Tier 2',
        '6KRO / 10KRO Mecânico (Switches Mecânicos)',
        '6 a 10 teclas simultâneas',
        'Diodos dedicados nos alfas e modificadores principais',
        '2,0–5,0 ms (Polling 1000 Hz, debounce mecânico)',
        'Padrão gamer: Reconhecimento perfeito de combinações para movimentação e macros complexos.',
      ],
      [
        'Tier 3',
        'Matriz Gamer Otimizada (Membrana Híbrida)',
        '4 a 6 teclas (Cluster WASD)',
        'Anti-ghosting por zona para teclas de jogos comuns',
        '8,0–15,0 ms (Polling de 125–500 Hz)',
        'Uso recreativo: Confiável em jogos de tiro, com bloqueios ocasionais em atalhos periféricos.',
      ],
      [
        'Tier 4',
        'Matriz de Escritório Padrão (Membrana Básica)',
        '2 a 3 teclas (2KRO)',
        'Matriz de linhas/colunas compartilhadas; ghosting comum',
        '15,0–30,0 ms (Polling USB de 125 Hz)',
        'Uso corporativo básico: Sujeito a travamentos ao digitar combinações rápidas de 3 ou mais teclas.',
      ],
      [
        'Tier 5',
        'Hardware com Falha / Chattering (Switch Danificado)',
        'Falhas intermitentes / Tecla inoperante',
        'Oxidação de contato, mola desgastada ou trilha rompida',
        'Instável / Duplo clique de tecla (> 35 ms jitter)',
        'Defeito de hardware: Digitação dupla indesejada (chattering), teclas presas ou sem acionamento.',
      ],
    ],
  },
  faqs: {
    title: 'Perguntas frequentes sobre o teste de teclado',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const ptCopy = {
  title: 'Teste de Teclado',
  subtitle: 'Teste de Teclado Online Grátis — Verifique Cada Tecla',
  intro:
    'Pressione todas as teclas do seu teclado. Cada tecla acende ao ser pressionada e permanece verde após confirmar o registro. Teclas que não acendem não estão enviando sinal ao navegador — sintoma de switch com defeito, tecla presa ou problema de driver. Nada é enviado para servidores e nada é salvo.',
  keysConfirmed: 'Teclas confirmadas',
  rollover: 'Rollover',
  capturing: 'Capturando',
  paused: 'Pausado',
  reset: 'Reiniciar',
  captureNotice:
    'A captura de teclas está ativa; atalhos comuns ficam retidos durante o teste. Pressione Shift + Esc ou clique em Capturando para liberar o teclado.',
  lastKeyEvent: 'Último evento de tecla',
  eventCode: 'event.code',
  eventKey: 'event.key',
  keyCode: 'keyCode',
  location: 'localização',
  autoRepeat: 'repetição automática',
  yes: 'sim',
  no: 'não',
  space: '(espaço)',
  pressAnyKey: 'Pressione qualquer tecla para visualizar o sinal recebido pelo navegador.',
  keysNotOnLayout: 'Teclas fora do layout padrão exibido acima',
  notYetConfirmed: 'Ainda não confirmadas',
  allConfirmed: 'Todas as teclas do layout foram confirmadas. Seu teclado está funcionando corretamente.',
  untestedSingular:
    'tecla restante para pressionar. Uma tecla que não responde após toques firmes deve ser examinada.',
  untestedPlural:
    'teclas restantes para pressionar. Teclas que não respondem após toques firmes devem ser examinadas.',
  mobileWarning:
    'Esta ferramenta requer um teclado físico. Acesse pelo computador ou notebook, ou conecte um teclado externo para realizar o teste.',
  howTitle: 'Como testar o teclado online',
  howStep1: 'Pressione cada tecla individualmente, percorrendo linha por linha da esquerda para a direita.',
  howStep2: 'Cada tecla fica azul ciano enquanto pressionada e verde permanente após o primeiro registro.',
  howStep3:
    'Acompanhe a lista de teclas não confirmadas diminuir. Qualquer tecla restante após toques firmes indica falha no acionamento.',
  howStep4:
    'Pressione e segure várias teclas juntas para medir o rollover — a capacidade do teclado de registrar toques simultâneos.',
  rolloverTitle: 'Key rollover e ghosting em teclados',
  rolloverP1:
    'Key rollover é o número máximo de teclas que o teclado consegue reportar simultaneamente. Teclados de membrana convencionais registram entre 2 e 6 teclas antes de ignorar novas pressões, fenômeno chamado de ghosting. Teclados mecânicos para jogos com NKRO reportam todas as teclas sem bloqueios.',
  rolloverP2:
    'Pressione várias teclas em conjunto e confira o valor de Rollover indicado acima. Se o contador parar em 3 ou 4, esse é o limite físico do hardware e não necessariamente um defeito. Lembre-se também de que atalhos reservados pelo sistema operacional nunca chegam ao navegador.',
  limitsTitle: 'O que este teste de teclado pode e não pode diagnosticar',
  limitsP1:
    'Esta página avalia os dados recebidos pelo navegador, que é o estágio final de uma cadeia composta por: switch, placa controladora, cabo ou receptor sem fio, driver e sistema operacional. Se uma tecla falhar, o teste confirma que o sinal não chegou, mas a causa exata (sujeira, circuito rompido ou driver) precisa de inspeção física.',
  limitsP2:
    'Certas combinações de teclas são retidas pelo sistema operacional antes de chegarem a qualquer site (como Alt+Tab e Ctrl+Alt+Del). Além disso, as teclas F5, F11 e F12 são deliberadamente preservadas no navegador para você manter funções de recarga, tela cheia e inspeção. A não exibição desses comandos específicos é esperada.',
};

export default function PortugueseKeyboardTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <KeyboardTesterClient copy={ptCopy} defaultLayout="abnt2" />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/keyboard-tester" />
      </div>
    </>
  );
}
