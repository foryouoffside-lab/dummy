import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Smooth Pursuit Test: Perseguição Ocular | SkillDrills",
  description: "Teste de perseguição ocular suave (Smooth Pursuit) grátis online. Meça acurácia de rastreamento contínuo e reflexos oculomotores. Treine precisão visual.",
  keywords: [
    "teste de perseguição ocular suave",
    "teste smooth pursuit online",
    "treino de rastreamento ocular",
    "movimento ocular de perseguição",
    "acurácia de rastreamento visual",
    "treinamento oculomotor",
    "coordenação olho-mão tracking",
    "exercícios para visão esportiva",
    "avaliação da motilidade ocular",
    "supressão de sacadas visuais",
    "teste de mira contínua",
    "neuroftalmologia visão dinâmica"
  ],
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual/tracking-accuracy/pursuit-tracker",
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
  },
  openGraph: {
    title: "Smooth Pursuit Test: Perseguição Ocular | SkillDrills",
    description: "Teste de perseguição ocular suave (Smooth Pursuit) grátis online. Meça acurácia de rastreamento contínuo e reflexos oculomotores. Treine precisão visual.",
    url: "https://skilldrills.online/pt/drills/visual/tracking-accuracy/pursuit-tracker",
    type: "website",
    locale: "pt_PT",
    alternateLocale: ["en_US", "de_DE", "ko_KR", "ja_JP", "es_ES", "fr_FR"],
    images: [{ url: "https://skilldrills.online/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smooth Pursuit Test: Perseguição Ocular | SkillDrills",
    description: "Teste de perseguição ocular suave (Smooth Pursuit) grátis online. Meça acurácia de rastreamento contínuo e reflexos oculomotores. Treine precisão visual.",
    images: ["https://skilldrills.online/og-default.svg"],
  },
};

const guideData = {
  eyebrow: "Neuroftalmologia & Controle Oculomotor",
  heading: "Smooth Pursuit Eye-Tracking – Perseguição Ocular & Precisão Visuomotora",
  intro: [
    "O sistema de movimentos oculares de perseguição suave (Smooth Pursuit Eye Movements - SPEM) coordena a orientação contínua da fóvea central sobre alvos dinâmicos em movimento. Esse circuito neurológico opera em malha fechada via cerebelo e córtex visual temporal médio (MT/V5), minimizando o erro de velocidade da retina (retinal slip) sem depender de sobressaltos sacádicos (Rashbass, 1961; Lisberger, 2010).",
    "Em cenários de alto rendimento — como eSports de tiro tático (Apex Legends, Overwatch), automobilismo e esportes de raquete —, a capacidade de sustentar o ponto de mira sobre trajetórias caóticas sem microinterrupções sacádicas define a precisão do rastreamento e o sucesso motor global."
  ],
  benchmarks: {
    title: "Classificação Padronizada de Desempenho em Smooth Pursuit",
    headers: ["Nível / Categoria", "Tempo no Alvo (Time-on-Target)", "Acurácia Média de Rastreamento", "Supressão de Sacadas", "Marco Neurofisiológico"],
    rows: [
      ["Nível 1: Elite Mundial (Top 1%)", "≥ 88%", "≥ 92%", "≥ 95% Supressão", "Perseguição contínua sem esforço, deslizamento retiniano quase nulo. Modelo interno cerebelar perfeitamente ajustado (Lisberger, 2010)."],
      ["Nível 2: Atleta Avançado (Top 5%)", "76 – 87%", "84 – 91%", "88 – 94% Supressão", "Controle oculomotor apurado com rápida acomodação de fase em reversões angulares."],
      ["Nível 3: Padrão Competente (Top 25%)", "62 – 75%", "72 – 83%", "78 – 87% Supressão", "Rastreamento estável em trajetórias lineares, sacadas esporádicas de correção em acelerações."],
      ["Nível 4: Base Intermediária (Top 50%)", "48 – 61%", "60 – 71%", "65 – 77% Supressão", "Frequentes desvios do cursor com necessidade constante de correções sacádicas em degrau."],
      ["Nível 5: Iniciante (Baseline)", "< 48%", "< 60%", "< 65% Supressão", "Latência visual elevada, movimentos bruscos e oscilações contínuas de overshoot."]
    ],
    note: "Fundamentado em estudos neuroftalmológicos e de ciências do esporte (Rashbass 1961; Krauzlis 2004; Leigh & Zee 2015; Lisberger 2010)."
  },
  techniques: {
    title: "Princípios Motores para Aprimorar o Rastreamento Ocular",
    items: [
      {
        name: "Ancoragem Foveal na Borda Dianteira",
        desc: "Fixe seu olhar na margem frontal da esfera em movimento, nunca no centro do cursor do mouse. Deixe que os proprioceptores musculares do braço posicionem o cursor na periferia da visão enquanto a fóvea guia o vetor de velocidade.",
        tips: "Resista à tentação de verificar constantemente o cursor; a visão periférica motora é subconsciente e veloz."
      },
      {
        name: "Acionamento do Antebraço com Pivot no Cotovelo",
        desc: "Mantenha o pulso neutro e utilize o antebraço deslizando suavemente sobre a superfície para cobrir arcos amplos. Isso previne espasmos dos micromúsculos da mão que induzem solavancos sacádicos.",
        tips: "Regule a altura da cadeira para que o cotovelo repouse a 90–100 graus em relação à mesa."
      },
      {
        name: "Antecipação de Inércia e Amortecimento",
        desc: "Ao notar uma mudança de vetor da esfera, não dê trancos repentinos no periférico. Aplique uma leve desaceleração controlada para reorientar a trajetória com suavidade.",
        tips: "Mousepads com superfície de controle balanceada facilitam a transição suave de velocidade."
      },
      {
        name: "Respiração Diafragmática Rítmica",
        desc: "A retenção involuntária da respiração durante sessões intensas de mira aumenta o tônus muscular e a rigidez articular, degradando a fluidez motora.",
        tips: "Inspire pelo nariz e expire suavemente pela boca durante toda a duração da bateria de 45 segundos."
      }
    ]
  },
  steps: [
    "Posicione o cursor dentro do círculo central para iniciar a contagem regressiva de 3 segundos.",
    "Acompanhe a esfera verde em movimento mantendo o cursor centralizado sobre ela durante os 45 segundos.",
    "Mantenha contato contínuo para elevar o medidor de multiplicador e acumular pontos de bônus de streak.",
    "Ao final do tempo limite, analise sua porcentagem de Time on Target, acurácia média e taxa de supressão sacádica.",
    "Repita 3 a 5 séries diárias para consolidar os ganhos de neuroplasticidade oculomotora."
  ],
  audience: "Essencial para atletas de esports competitivos (FPS, Battle Royale, Arena Shooters), praticantes de tênis de mesa, beisebol, tênis e automobilismo, além de indivíduos em busca de aprimoramento da estabilidade de foco e atenção visual contínua.",
  faqs: [
    {
        "q": "O que é o movimento de perseguição ocular suave (Smooth Pursuit)?",
        "a": "O sistema de perseguição ocular suave (SPEM - Smooth Pursuit Eye Movements) é a capacidade motora voluntária de guiar suavemente a linha de visão para acompanhar objetos em movimento contínuo, mantendo a projeção da imagem fixada sobre a fóvea central. Diferencia-se neurologicamente dos movimentos sacádicos, que são saltos bruscos entre alvos estáticos (Rashbass, 1961)."
    },
    {
        "q": "Por que o rastreamento ocular trepida ou salta em degraus durante curvas rápidas?",
        "a": "Quando a velocidade ou aceleração angular do alvo excede a capacidade de ganho do sistema de perseguição do tronco encefálico e cerebelo, a imagem escorrega da fóvea (retinal slip). O cérebro compensa esse atraso disparando sacadas corretivas (catch-up saccades), que criam a sensação visual de degraus ou solavancos na mira."
    },
    {
        "q": "Qual é a relevância deste teste para jogos de tiro tático (FPS) como Apex Legends ou Overwatch?",
        "a": "Em jogos de tracking contínuo, manter a retícula colada em oponentes que realizam strafes imprevisíveis exige alta sincronia entre o córtex parietal, cerebelo e os músculos do membro superior. O treino de smooth pursuit reduz o tremor motor e estabiliza o time-to-kill (TTK) com armas automáticas."
    },
    {
        "q": "Quais configurações de mouse (DPI e sensibilidade) favorecem o tracking contínuo?",
        "a": "Sensibilidades moderadas a baixas (800 DPI com sensibilidade in-game de 1.0 a 1.5, equivalente a 28–45 cm/360°) são ideais para o rastreamento suave. Sensibilidades excessivamente altas ativam micromúsculos dos dedos propensos a tremores e espasmos sacádicos."
    },
    {
        "q": "O treino de perseguição ocular melhora a acuidade visual e concentração no dia a dia?",
        "a": "Sim. Exercitar a musculatura extraocular e a estabilização foveal reduz a fadiga visual digital (astenopia), amplia a resistência à leitura prolongada e aprimora a atenção sustentada em tarefas que exigem monitoramento dinâmico contínuo."
    },
    {
        "q": "Esportes tradicionais como tênis, beisebol e automobilismo se beneficiam desta prática?",
        "a": "Sem dúvida. Pilotos de corrida e atletas de esportes com raquete dependem criticamente do smooth pursuit para calcular vetores de interceptação espacial de bolas ou pontos de tangência de curvas a centenas de quilômetros por hora (Land & McLeod, 2000)."
    },
    {
        "q": "Ao controlar o mouse, devo focar no movimento do pulso ou do antebraço?",
        "a": "O rastreamento contínuo em arcos amplos deve ser executado primariamente com a articulação do cotovelo e antebraço. O pulso e os dedos devem atuar apenas na microcorreção final do centro da esfera para evitar sobrecarga no túnel do carpo."
    },
    {
        "q": "Como reagir da melhor forma a mudanças bruscas de direção do alvo?",
        "a": "Evite tentar 'adivinhar' a mudança antes que ela ocorra, pois antecipações falsas causam perda total do alvo (overshoot). Mantenha o olhar fixado na borda dianteira do alvo e utilize o amortecimento inercial do mousepad para frear suavemente antes de reacelerar."
    },
    {
        "q": "Qual é a rotina recomendada para treinar sem causar estresse ocular?",
        "a": "Recomenda-se realizar de 3 a 5 séries de 45 segundos por dia, com intervalos de descanso de 30 segundos entre as repetições. A cada série, pisque ativamente e olhe para um ponto distante a pelo menos 6 metros por 10 segundos para relaxar a acomodação ciliar."
    },
    {
        "q": "Meus dados de rastreamento ou movimentação do mouse são enviados para servidores externos?",
        "a": "Não. Todo o cálculo de coordenadas em tempo real, física de interpolação em canvas e computação de ganho e precisão ocorrem exclusivamente na memória local do navegador via JavaScript client-side. Nenhum dado é salvo externamente."
    }
],
  sources: pickSources([
    "rashbass1961smooth",
    "lisberger2010visual",
    "krauzlis2004recurrent",
    "leigh2015neurology",
    "land2000eye"
  ]),
  related: [
    { href: "/pt/drills/visual/tracking-accuracy/moving-target", label: "Rastreamento de Alvo Móvel" },
    { href: "/pt/drills/visual/tracking-accuracy/multiple-targets", label: "Rastreamento de Múltiplos Objetos" },
    { href: "/pt/drills/visual/reaction-speed/go/no-go", label: "Teste Go/No-Go" },
    { href: "/pt/drills/visual/reaction-speed/light-reaction", label: "Reação à Luz" },
    { href: "/pt/drills/fps/strafe-tracking", label: "Strafe Tracking FPS" },
    { href: "/pt/drills/fps/pro-smooth-pursuit", label: "Pro Smooth Pursuit FPS" }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://skilldrills.online/pt" },
    { "@type": "ListItem", "position": 2, "name": "Treinos", "item": "https://skilldrills.online/pt/drills" },
    { "@type": "ListItem", "position": 3, "name": "Percepção Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "Precisão de Rastreamento", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "Perseguição Ocular Suave", "item": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/pursuit-tracker" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Perseguição Ocular Suave (Smooth Pursuit)",
  "operatingSystem": "Web Browser",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": { "@type": "Organization", "name": "SkillDrills" }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Perseguição Ocular Suave (Smooth Pursuit)",
  "url": "https://skilldrills.online/pt/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "SportsApplication",
  "browserRequirements": "Requires JavaScript. Canvas support required.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treinamento de Rastreamento Contínuo Smooth Pursuit",
  "gamePlatform": "Web Browser",
  "genre": ["Visão Esportiva", "Treino Cognitivo", "Controle Oculomotor"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "value": 1 }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Realizar o Teste de Smooth Pursuit",
  "description": "Guia de execução para testar e aprimorar a perseguição ocular suave e estabilidade do rastreamento de alvos.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Etapa 1", "text": "Posicione o cursor dentro do círculo central para iniciar a contagem regressiva de 3 segundos." },
    { "@type": "HowToStep", "position": 2, "name": "Etapa 2", "text": "Acompanhe a esfera verde em movimento mantendo o cursor centralizado sobre ela durante os 45 segundos." },
    { "@type": "HowToStep", "position": 3, "name": "Etapa 3", "text": "Mantenha contato contínuo para elevar o medidor de multiplicador e acumular pontos de bônus de streak." },
    { "@type": "HowToStep", "position": 4, "name": "Etapa 4", "text": "Ao final do tempo limite, analise sua porcentagem de Time on Target, acurácia média e taxa de supressão sacádica." },
    { "@type": "HowToStep", "position": 5, "name": "Etapa 5", "text": "Repita 3 a 5 séries diárias para consolidar os ganhos de neuroplasticidade oculomotora." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
        "@type": "Question",
        "name": "O que é o movimento de perseguição ocular suave (Smooth Pursuit)?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O sistema de perseguição ocular suave (SPEM - Smooth Pursuit Eye Movements) é a capacidade motora voluntária de guiar suavemente a linha de visão para acompanhar objetos em movimento contínuo, mantendo a projeção da imagem fixada sobre a fóvea central. Diferencia-se neurologicamente dos movimentos sacádicos, que são saltos bruscos entre alvos estáticos (Rashbass, 1961)."
        }
    },
    {
        "@type": "Question",
        "name": "Por que o rastreamento ocular trepida ou salta em degraus durante curvas rápidas?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Quando a velocidade ou aceleração angular do alvo excede a capacidade de ganho do sistema de perseguição do tronco encefálico e cerebelo, a imagem escorrega da fóvea (retinal slip). O cérebro compensa esse atraso disparando sacadas corretivas (catch-up saccades), que criam a sensação visual de degraus ou solavancos na mira."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é a relevância deste teste para jogos de tiro tático (FPS) como Apex Legends ou Overwatch?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em jogos de tracking contínuo, manter a retícula colada em oponentes que realizam strafes imprevisíveis exige alta sincronia entre o córtex parietal, cerebelo e os músculos do membro superior. O treino de smooth pursuit reduz o tremor motor e estabiliza o time-to-kill (TTK) com armas automáticas."
        }
    },
    {
        "@type": "Question",
        "name": "Quais configurações de mouse (DPI e sensibilidade) favorecem o tracking contínuo?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sensibilidades moderadas a baixas (800 DPI com sensibilidade in-game de 1.0 a 1.5, equivalente a 28–45 cm/360°) são ideais para o rastreamento suave. Sensibilidades excessivamente altas ativam micromúsculos dos dedos propensos a tremores e espasmos sacádicos."
        }
    },
    {
        "@type": "Question",
        "name": "O treino de perseguição ocular melhora a acuidade visual e concentração no dia a dia?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Exercitar a musculatura extraocular e a estabilização foveal reduz a fadiga visual digital (astenopia), amplia a resistência à leitura prolongada e aprimora a atenção sustentada em tarefas que exigem monitoramento dinâmico contínuo."
        }
    },
    {
        "@type": "Question",
        "name": "Esportes tradicionais como tênis, beisebol e automobilismo se beneficiam desta prática?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sem dúvida. Pilotos de corrida e atletas de esportes com raquete dependem criticamente do smooth pursuit para calcular vetores de interceptação espacial de bolas ou pontos de tangência de curvas a centenas de quilômetros por hora (Land & McLeod, 2000)."
        }
    },
    {
        "@type": "Question",
        "name": "Ao controlar o mouse, devo focar no movimento do pulso ou do antebraço?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "O rastreamento contínuo em arcos amplos deve ser executado primariamente com a articulação do cotovelo e antebraço. O pulso e os dedos devem atuar apenas na microcorreção final do centro da esfera para evitar sobrecarga no túnel do carpo."
        }
    },
    {
        "@type": "Question",
        "name": "Como reagir da melhor forma a mudanças bruscas de direção do alvo?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evite tentar 'adivinhar' a mudança antes que ela ocorra, pois antecipações falsas causam perda total do alvo (overshoot). Mantenha o olhar fixado na borda dianteira do alvo e utilize o amortecimento inercial do mousepad para frear suavemente antes de reacelerar."
        }
    },
    {
        "@type": "Question",
        "name": "Qual é a rotina recomendada para treinar sem causar estresse ocular?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Recomenda-se realizar de 3 a 5 séries de 45 segundos por dia, com intervalos de descanso de 30 segundos entre as repetições. A cada série, pisque ativamente e olhe para um ponto distante a pelo menos 6 metros por 10 segundos para relaxar a acomodação ciliar."
        }
    },
    {
        "@type": "Question",
        "name": "Meus dados de rastreamento ou movimentação do mouse são enviados para servidores externos?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. Todo o cálculo de coordenadas em tempo real, física de interpolação em canvas e computação de ganho e precisão ocorrem exclusivamente na memória local do navegador via JavaScript client-side. Nenhum dado é salvo externamente."
        }
    }
]
};

export default function PursuitTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <AutoPursuitClient copy={{ title: "Smooth Pursuit Eye-Tracking Test", subtitle: "Perseguição Ocular Contínua & Coordenação Motora" }} />
        <DrillGuide guide={guideData} />
        <RelatedDrills related={guideData.related} />
      </main>
    </>
  );
}
