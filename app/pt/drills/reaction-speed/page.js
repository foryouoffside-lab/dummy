import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: 'Teste de Reflexo & Tempo de Reação | SkillDrills',
  description: 'Teste de tempo de reação e treino de reflexos online grátis. Meça seus reflexos em milissegundos com 8 exercícios científicos no seu navegador.',
  keywords: [
    'teste de tempo de reacao', 'teste de reflexo gamer', 'como melhorar o tempo de reacao',
    'treino de reflexo online', 'medidor de reflexos milissegundos', 'tempo de reacao simples e escolha',
    'exercicios de rastreamento ocular', 'acuidade visual dinamica', 'teste reflexo tela verde',
    'coordenacao olho mao exercicios', 'input lag monitor reflexos', 'jogos de reflexo gratis navegador',
    'visao periferica treino', 'media de tempo de reacao humano', 'esports treino de reflexos'
  ],
  openGraph: {
    title: 'Teste de Reflexo & Tempo de Reação | SkillDrills',
    description: 'Teste de tempo de reação e treino de reflexos online grátis. Meça seus reflexos em milissegundos com 8 exercícios científicos no seu navegador.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Teste de Reflexos e Tempo de Reação Online' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teste de Reflexo & Tempo de Reação | SkillDrills',
    description: 'Meça seus reflexos em milissegundos com 8 exercícios interativos de velocidade de reação no navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/reaction-speed',
    languages: getAlternateLanguages('/pt/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Diretório de Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Velocidade de Reação", "item": "https://skilldrills.online/pt/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Teste de Reflexos Grátis e Centro de Treinamento de Reação",
  "url": "https://skilldrills.online/pt/drills/reaction-speed",
  "description": "Coleção de 8 exercícios interativos para medir e treinar tempo de reação, acuidade visual dinâmica, movimentos sacádicos e reflexos de clique. Sem download.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'pt', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/pt${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual é a diferença fisiológica entre tempo de reação simples (Simple RT) e tempo de reação de escolha (Choice RT)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O tempo de reação simples (Simple RT) mede o intervalo entre um único estímulo sensorial previsível (como a tela mudando de vermelho para verde) e a execução de uma resposta motora pré-planejada (um clique de mouse), durando em média de 200 a 250 milissegundos em adultos saudáveis. Já o tempo de reação de escolha (Choice RT) exige um processamento cognitivo preliminar para discriminar múltiplos estímulos (identificar um aliado de um inimigo ou decidir a rota de esquiva sob a Lei de Hick), elevando a latência para 300 a mais de 450 ms. Em jogos competitivos de tiro e luta, a agilidade no tempo de reação de escolha é o divisor de águas entre jogadores casuais e profissionais."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a média humana do tempo de reação visual e é possível alcançar marcas profissionais?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A média do tempo de reação visual em adultos não treinados fica entre 240 e 270 ms. Esse tempo contempla a transdução fotoquímica nos fotorreceptores da retina (20 a 40 ms), o envio do sinal elétrico pelo nervo óptico até o córtex visual occipital (60 a 80 ms) e a transmissão motora eferente descendo pela medula espinhal até os músculos flexores dos dedos (50 a 70 ms). Com treinamento neurocognitivo diário e aprimoramento da plasticidade sináptica, atletas e pro players de esports conseguem reduzir esse tempo de forma consistente para a faixa de 150 a 180 ms."
      }
    },
    {
      "@type": "Question",
      "name": "Como o treino de acuidade visual dinâmica (DVA) e movimentos sacádicos afeta a agilidade dos reflexos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A velocidade de reação não é apenas rapidez manual, mas sim a velocidade com que os olhos conseguem travar o alvo na fóvea central da retina (área de nitidez máxima). Ao exercitar movimentos de perseguição ocular suave (smooth pursuit) e saltos visuais rápidos (sacadas oculares), fortalece-se a musculatura extraocular. Isso economiza dezenas de milissegundos cruciais no reconhecimento visual do alvo, permitindo ao cérebro disparar a ordem motora de reação com muito mais antecedência."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a importância da taxa de atualização do monitor (Hz) e do polling rate do mouse na medição dos reflexos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A latência do hardware pode distorcer consideravelmente os resultados de um teste de reflexo. Um monitor convencional de 60 Hz exibe novos quadros a cada 16,6 ms, enquanto telas gamer de 144 Hz (6,9 ms) ou 240 Hz (4,1 ms) entregam a informação visual quase instantaneamente. Ao aliar um monitor de alta taxa a um mouse gamer com polling rate de 1000 Hz ou superior e a API nativa Pointer Lock do W3C no navegador, anulam-se os filtros e atrasos de buffer do sistema operacional, registrando o tempo de resposta neural real com precisão de 1 milissegundo."
      }
    },
    {
      "@type": "Question",
      "name": "Como noites mal dormidas, cafeína e desidratação influenciam o tempo de resposta neural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pesquisas em neurociência comprovam que a perda de apenas 2 horas de sono reduz a velocidade de condução sináptica em 30 a 50 ms, gerando um atraso cognitivo comparável ao efeito de leve embriaguez alcoólica. Doses moderadas de cafeína (100 a 200 mg) bloqueiam os receptores de adenosina e podem encurtar a reação temporariamente em 10 a 15 ms, embora o excesso cause tremores musculares finos que prejudicam a precisão. Além disso, uma desidratação corporal de apenas 2% reduz sensivelmente a capacidade inibitória e a atenção seletiva no lobo frontal."
      }
    },
    {
      "@type": "Question",
      "name": "De que forma o ping de rede se relaciona com o tempo de reação biológico em jogos online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O atraso total até que o tiro seja validado no servidor é o somatório de: tempo de reação biológico + latência de entrada do computador + ping de conexão. Se um jogador tem 200 ms de reação física, 15 ms de atraso de hardware e 35 ms de ping, o registro chega ao servidor em 250 ms. Se um adversário tem 20 ms de vantagem por melhor internet, treinar seus reflexos para encurtar sua reação em 30 ms compensa totalmente a desvantagem de rede e garante que o seu tiro acerte primeiro."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a rotina e o tempo diário ideal de treinamento de reflexos para evoluir sem estafa neural?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O sistema nervoso central atinge a fadiga muito rapidamente em exercícios que exigem foco e reflexos no limite. Treinar exausto mentalmente faz com que o cérebro memorize padrões de resposta lentos e viciados. O protocolo ideal consiste em sessões concentradas e intensas de 15 a 20 minutos por dia, de 4 a 5 dias por semana. Fazer um aquecimento prévio dos punhos e dedos e pausas de 1 minuto para descanso ocular entre as séries maximiza a mielinização dos circuitos motores de forma sustentável."
      }
    },
    {
      "@type": "Question",
      "name": "Os testes de reação do SkillDrills funcionam com precisão em celulares e tablets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos os exercícios do SkillDrills são totalmente responsivos e otimizados tanto para toque em celulares quanto para cliques de mouse no computador. Contudo, as telas touchscreen capacitivas dos celulares adicionam fisicamente uma latência de hardware de toque de cerca de 20 a 40 ms em comparação a um clique mecânico. Portanto, para medições competitivas absolutas em milissegundos e calibração de microajustes, o PC com monitor 144Hz+ é o ambiente mais indicado, sendo o celular ideal para estímulo diário e aquecimento cognitivo."
      }
    }
  ]
};

export default function PortugueseReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

