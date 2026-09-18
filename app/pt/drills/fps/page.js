import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: 'Treino de Mira FPS – Aim Trainer Online | SkillDrills',
  description: 'Treino de mira grátis para Valorant, CS2 e Apex. 15 exercícios de flick shots, tracking, controle de recoil e reflexos diretamente no seu navegador.',
  keywords: [
    'treino de mira fps', 'como melhorar a mira no valorant', 'treino de mira cs2',
    'flick shot treino', 'tracking de mira fps', 'posicionamento de mira',
    'sensibilidade do mouse gamer', 'aim trainer online grátis', 'teste de reflexo gamer',
    'controle de recoil online', 'mirar com braço ou pulso', 'microajustes de mira',
    'teste de precisão do mouse', 'calculadora edpi valorant', 'aim trainer navegador sem download'
  ],
  openGraph: {
    title: 'Treino de Mira FPS – Aim Trainer Online | SkillDrills',
    description: 'Treino de mira grátis para Valorant, CS2 e Apex. 15 exercícios de flick shots, tracking, controle de recoil e reflexos diretamente no seu navegador.',
    type: 'website',
    url: 'https://skilldrills.online/pt/drills/fps',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Treino de Mira FPS Online Grátis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Mira FPS – Aim Trainer Online | SkillDrills',
    description: 'Treino de mira grátis para Valorant, CS2 e Apex. 15 exercícios profissionais no seu navegador.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/fps',
    languages: getAlternateLanguages('/pt/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Diretório de Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Mira FPS", "item": "https://skilldrills.online/pt/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Treino de Mira FPS Grátis – Centro de Treinamento Online",
  "url": "https://skilldrills.online/pt/drills/fps",
  "description": `15 exercícios profissionais de mira para Valorant, CS2 e Apex Legends. Flicks balísticos, tracking contínuo, controle de recoil, giros de 180° e reflexos. Sem download nem cadastro.`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
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
      "name": "Como o treino de mira no navegador se transfere para jogos táticos como Valorant e CS2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em jogos táticos de tiro como Valorant e CS2, o tempo para eliminar (TTK) é frequentemente inferior a 200 ms: a precisão da primeira bala e o microajuste de fração de segundo determinam o vencedor do confronto. Partidas normais de Deathmatch no jogo contêm longos períodos ociosos de renascimento e deslocamento passivo pelo mapa, enquanto um treinador de mira dedicado isola centenas de movimentos balísticos (flicks) e frenagens precisas em apenas 10 minutos. Essa repetição de alta densidade consolida os engramas motores no córtex motor do cérebro, liberando a capacidade cognitiva do jogador para o posicionamento de mira (crosshair placement) e a leitura tática durante as partidas competitivas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a diferença entre Click Timing (Flicks), Tracking e Target Switching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A mecânica de tiro em jogos FPS é sustentada por três pilares fundamentais: 1) Click Timing / Flicks: arremessar a mira velozmente até o alvo e clicar no instante exato da sobreposição, essencial para armas de tiro único e precisão como Vandal, AK-47 e snipers. 2) Tracking (rastreamento contínuo): manter a retícula colada em alvos que se movem em trajetórias dinâmicas e imprevisíveis, crucial no Apex Legends e Overwatch 2. 3) Target Switching: alternar a mira em alta velocidade entre múltiplos alvos sequenciais com estabilização imediata, vital para limpar duplas e lidar com emboscadas em desvantagem numérica."
      }
    },
    {
      "@type": "Question",
      "name": "É melhor mirar usando o braço, o pulso ou adotar uma pegada híbrida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No cenário profissional de alto rendimento, o padrão biomecânico consagrado é o estilo híbrido: o antebraço e o ombro executam os movimentos amplos, checagens de canto e giros rápidos de 180 graus; o pulso ajusta alvos em distâncias intermediárias; e os dedos (em pegadas Claw ou Fingertip) controlam os microajustes sub-pixel e a compensação fina do recuo vertical. Mirar exclusivamente com o pulso limita o campo de visão e eleva o risco de lesões por esforço repetitivo (LER) e síndrome do túnel do carpo, enquanto usar unicamente o braço carece da agilidade fina necessária para acertos milimétricos na cabeça a longa distância."
      }
    },
    {
      "@type": "Question",
      "name": "Como encontrar a sensibilidade e a distância de giro (cm/360) ideal para o mouse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A medida padrão universal para calibrar a sensibilidade é a distância física em centímetros que o mouse precisa percorrer para girar 360 graus no jogo (cm/360). Para jogos táticos como Valorant e CS2, uma sensibilidade baixa entre 35 e 55 cm/360 (eDPI entre 200 e 320) proporciona a máxima estabilidade nas microcorreções de cabeça. Para jogos rápidos com muito tracking (Apex Legends, Overwatch 2), uma sensibilidade média de 24 a 38 cm/360 equilibra agilidade de giro e suavidade no rastreamento. A sensibilidade perfeita é aquela com a qual você consegue andar de lado (strafe) mantendo a mira cravada em um ponto fixo sem tremer."
      }
    },
    {
      "@type": "Question",
      "name": "Por que minha mira treme ou passa do alvo (overshooting) e como corrigir isso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tremores (shakiness) e ultrapassagem do alvo (overshooting) geralmente derivam de tensão muscular excessiva no antebraço, segurar o mouse com força descomunal ou usar uma sensibilidade alta demais para sua capacidade neuromuscular de frenagem. Para solucionar: 1) aproveite a fricção mecânica do seu mousepad aplicando uma leve pressão para baixo com a base da palma da mão ao parar o movimento balístico; 2) pratique exercícios de rastreamento suave (smoothness drills) para relaxar a pegada e a musculatura; e 3) reduza sua sensibilidade entre 10% e 15% para ampliar a margem de tolerância a pequenas imprecisões motoras."
      }
    },
    {
      "@type": "Question",
      "name": "Um treinador de mira online no navegador tem a mesma precisão e resposta de um software instalado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. O SkillDrills utiliza a API nativa Pointer Lock do W3C combinada com aceleração de hardware via HTML5 Canvas. Essa arquitetura ignora totalmente as curvas de aceleração de ponteiro do sistema operacional e processa os deltas brutos do sensor óptico (movementX e movementY) com latência de entrada praticamente nula. Operando em uma física de passo de tempo fixo desacoplada da taxa de quadros, a plataforma garante resposta 1:1 ultrafluida e compatibilidade total com monitores gamer de 144 Hz, 240 Hz e 360 Hz, tudo sem exigir instalação ou ocupar espaço no seu SSD."
      }
    },
    {
      "@type": "Question",
      "name": "O que faz mais diferença em partida: posicionamento de mira (pre-aim) ou flick reativo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Em termos de taxa de vitória em shooters táticos, cerca de 70% dos confrontos são decididos por um bom posicionamento prévio de mira (pre-aim na altura da cabeça ao abrir cantos). No entanto, quando os adversários utilizam posições incomuns (off-angles), aberturas agressivas pulando ou quando surgem inimigos adicionais, o pre-aim isolado falha. É exatamente nesses 30% de situações dinâmicas e imprevisíveis que o flick rápido e a microcorreção precisa em menos de 200 ms garantem a sua sobrevivência e decidem o round."
      }
    },
    {
      "@type": "Question",
      "name": "Quantos minutos por dia devo treinar mira para evoluir sem fadiga mental e muscular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estudos de neurociência motora comprovam que, após 30 a 35 minutos de exercícios intensivos de coordenação motora fina, a fadiga do sistema nervoso central degrada a precisão e favorece o vício em vícios posturais incorretos. A metodologia ideal consiste em sessões concentradas de 15 a 25 minutos diários, realizadas de 4 a 6 dias por semana. Treinos curtos e consistentes seguidos de um bom descanso promovem a mielinização dos circuitos neurais e fixam a memória muscular com muito mais eficiência do que longas maratonas desgastantes de fim de semana."
      }
    }
  ]
};

export default function PortugueseFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

