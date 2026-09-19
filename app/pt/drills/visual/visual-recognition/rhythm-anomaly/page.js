import RhythmAnomalyClient from '@/app/drills/visual/visual-recognition/rhythm-anomaly/RhythmAnomalyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Ritmo Visual: Discriminação Temporal | SkillDrills",
  description: "Teste de ritmo visual e discriminação temporal grátis. Identifique a célula fora de fase na grade de 36 células e treine sua resolução temporal online.",
  keywords: [
    "teste de ritmo visual",
    "discriminação temporal visual",
    "frequência crítica de fusão",
    "percepção de fase temporal",
    "teste de cintilação visual",
    "resolução temporal visual",
    "detecção de anomalia de pulso",
    "treinamento magnocelular visual",
    "acuidade visual temporal",
    "teste de timing visual",
    "percepção temporal do movimento",
    "teste de pulso visual"
],
  openGraph: {
    title: "Teste de Ritmo Visual: Discriminação Temporal | SkillDrills",
    description: "Treine discriminação temporal visual, detecção de descompasso de ritmo e percepção periférica de movimento com esta grade pulsante de 36 células.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste de Ritmo Visual: Discriminação Temporal | SkillDrills",
    description: "Treine discriminação temporal visual, detecção de descompasso de ritmo e percepção periférica de movimento com esta grade pulsante de 36 células.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/rhythm-anomaly', 'pt'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt/" },
    { "@type": "ListItem", "position": 2, "name": "Treinamento Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reconhecimento Visual", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Teste de Ritmo Visual e Discriminação Temporal", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Ritmo Visual e Discriminação Temporal",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Exercício gratuito de discriminação temporal visual. Grade 6x6 com 36 células pulsantes. Localize a célula fora de sincronia em modo time-attack de 45 segundos.",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Anomalia de Ritmo Visual",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Discriminação de Ritmo Visual",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly",
  "description": "Jogo gratuito de percepção temporal e detecção de cintilação. Identifique anomalias de fase em matrizes ópticas pulsantes.",
  "genre": ["Action", "Brain Game", "Timing Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como treinar a discriminação temporal e detecção de anomalias visuais",
  "description": "Domine o timing visual, detecção de cintilação e reconhecimento de desvio de fase com nosso protocolo científico de 4 etapas.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fixe o olhar no centro da matriz pulsante",
      "text": "Posicione sua visão suavemente no centro da grade 6x6, permitindo que a visão periférica registre a pulsação sincronizada das 36 células.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Internalize a cadência periódica de base",
      "text": "Deixe seu córtex visual sincronizar com a oscilação senoidal de luminosidade para estabelecer uma linha de base temporal precisa.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Detecte a anomalia de fase temporal",
      "text": "Identifique a única célula que atinge o pico de brilho antes das demais ou que pulsa em uma frequência acelerada fora do compasso.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Confirme com clique imediato",
      "text": "Clique instantaneamente na célula anômala para registrar sua latência de discriminação temporal e precisão perceptual em milissegundos.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que mede o teste de anomalia de ritmo visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ele avalia a discriminação de frequência temporal e a acuidade temporal da visão, medindo a velocidade e a precisão com que o cérebro identifica uma célula desfasada entre 35 células sincronizadas em uma grade 6x6."
      }
    },
    {
      "@type": "Question",
      "name": "Como o sistema visual detecta desvios de fase e ritmos fora de compasso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Através da via magnocelular (M). Seus neurônios possuem resposta ultraveloz a flutuações de luminância, disparando sinais que geram saliência atencional pré-atentiva no córtex visual primário (Kelly, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre as vias magnocelular e parvocelular?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A via magnocelular tem campos receptivos amplos e condução veloz, especializada em movimento, cintilação e tempo. A via parvocelular possui condução lenta e foca em cores, texturas e detalhes espaciais finos."
      }
    },
    {
      "@type": "Question",
      "name": "O que é Frequência Crítica de Fusão (CFF) e como se relaciona à reação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A CFF é o limiar de frequência no qual pulsos de luz intermitentes deixam de parecer cintilantes e fundem-se em um brilho contínuo (35–60 Hz). Valores altos indicam janelas neurais mais curtas e reações mais ágeis."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é uma boa pontuação no teste de 45 segundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Iniciantes registram entre 50 e 99 pontos (Nível 2–3). Praticantes experientes alcançam 100 a 149 pontos, e atletas ou jogadores de elite ultrapassam 150 a 200+ pontos com sequências superiores a 10 acertos seguidos."
      }
    },
    {
      "@type": "Question",
      "name": "Por que a grade pulsa mais rápido à medida que os pontos sobem?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sequências de acertos aumentam o ritmo de base e estreitam a diferença temporal (Delta-T) entre o alvo e o fundo, empurrando o sistema visual para operar próximo ao seu limite biológico de resolução temporal."
      }
    },
    {
      "@type": "Question",
      "name": "Para que servem os flashes aleatórios de entropia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eles introduzem ruído estocástico, impedindo que o usuário dependa apenas da luminosidade estática e exigindo uma comparação genuína de periodicidade temporal (Burr, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Existem penalidades de pontos para cliques incorretos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não há deduções de pontuação acumulada nem perda de tempo. Cliques errados apenas reiniciam a sequência de acertos e exibem um flash vermelho, incentivando decisões rápidas e assertivas."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a influência da taxa de atualização do monitor (60Hz vs 144Hz+)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Monitores de 60Hz atualizam a cada 16,7 ms, podendo truncar ondas de pulso contínuas. Telas de 144Hz ou 240Hz (intervalos de 6,9 ms a 4,2 ms) renderizam variações de fase com muito mais precisão perceptiva."
      }
    },
    {
      "@type": "Question",
      "name": "Como jogadores de esportes e esports se beneficiam desse treino?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atletas e gamers utilizam a discriminação temporal para antecipar trajetórias de projéteis, frames iniciais de animação adversária e micro-movimentos periféricos com milissegundos de vantagem crucial."
      }
    }
  ]
};

export default function RhythmAnomalyLocalePage() {
  const sources = pickSources('holcombe2009', 'kelly1961', 'delange1958', 'burr1980', 'posner1980', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <RhythmAnomalyClient copy={{ title: "Jogo de Discriminação de Ritmo Visual" }} />
      <DrillGuide
        eyebrow="Psicofísica Temporal & Cronometria Visual"
        title="A Ciência do Ritmo Visual, Fusão de Cintilação & Discriminação de Frequência Temporal"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `Enquanto testes convencionais avaliam a acuidade visual estática — a capacidade de resolver detalhes espaciais na retina —, o sistema visual dinâmico é igualmente delimitado pela <em>resolução temporal</em>: a capacidade de separar eventos visuais sucessivos no tempo. No trânsito, em esportes de alta velocidade e em jogos competitivos, a detecção de projéteis, movimentos adversários e perigos periféricos não depende de visão estática, mas da velocidade com que o córtex visual processa sinais ópticos modulados no tempo (De Lange, 1958; Kelly, 1961; Holcombe, 2009).` }} />

        <h3>Função de Transferência de Modulação Temporal & Via Magnocelular</h3>
        <p dangerouslySetInnerHTML={{ __html: `A via visual primária divide-se em dois fluxos anatômicos: a via parvocelular (P) e a via magnocelular (M). A via magnocelular é composta por neurônios de grande calibre com axônios densamente mielinizados e condução ultraveloz até o fluxo dorsal. Por sua latência mínima, os neurônios M são otimizados para altas frequências temporais, registrando oscilações de luminância e desvios de fase de até 40–50 Hz (De Lange, 1958; Holcombe, 2009). Quando uma única célula na grade pulsa mais rápido que as vizinhas, o delta de frequência temporal cria um avanço de fase que aciona o pop-out atencional automático em V1 (Kelly, 1961; Burr, 1980).` }} />

        <h3>Dois limites da visão temporal: Amostragem rápida vs. Vinculação cortical</h3>
        <p dangerouslySetInnerHTML={{ __html: `Em uma revisão seminal sobre cronometria perceptual, Holcombe (2009) demonstrou que a percepção temporal humana é governada por dois limites fisiológicos distintos:` }} />
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Limite subcortical de amostragem rápida (~40–50 Hz):</strong> Células ganglionares magnocelulares da retina e neurônios de V1 resolvem contraste temporal e cintilações luminosas em frequências superiores a 40 Hz (De Lange, 1958; Kelly, 1961).
          </li>
          <li>
            <strong>Limite de vinculação cortical consciente (~2–5 Hz):</strong> A identificação cognitiva consciente e a união de características visuais demandam circuitos recorrentes lentos operando a apenas 2 a 5 ciclos por segundo (Holcombe, 2009).
          </li>
        </ul>
        <p dangerouslySetInnerHTML={{ __html: `O teste Rhythm Anomaly treina justamente a ponte funcional entre esses dois sistemas: o observador deve utilizar a sensibilidade magnocelular precoce para isolar a célula anômala e ativar prontamente a verificação atencional descendente (top-down) antes da conclusão do ciclo de pulso.` }} />

        <h3>Janelas de Integração Temporal & Ruído de Entropia</h3>
        <p dangerouslySetInnerHTML={{ __html: `O cérebro integra informações de fótons em janelas temporais de aproximadamente 30 a 100 milissegundos (Burr, 1980; Woods et al., 2015). Estímulos que ocorrem dentro de uma mesma janela fundem-se em um único percepto contínuo. Os flashes intermitentes de 'entropia estocástica' no drill inserem ruídos transitórios nessa janela, forçando o cérebro a distinguir oscilações senoidais periódicas reais de picos isolados de luminância (Burr, 1980; Posner, 1980).` }} />

        <h3>Parâmetros de Desempenho Temporal (Grade Pulsante 45s)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Com base em dados cronométricos computados ao longo de ensaios de 45 segundos na matriz pulsante de 36 células, a capacidade de discriminação temporal é categorizada em cinco níveis empíricos de acuidade:` }} />
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Nível</th>
                <th className="py-2.5 px-3 font-semibold">Classificação</th>
                <th className="py-2.5 px-3 font-semibold">Pontuação 45s</th>
                <th className="py-2.5 px-3 font-semibold">Nível de Velocidade</th>
                <th className="py-2.5 px-3 font-semibold">Janela Delta-T</th>
                <th className="py-2.5 px-3 font-semibold">Perfil Temporal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">Crono-Mestre</td>
                <td className="py-2.5 px-3 tabular-nums">200+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Nível 8+</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 60 ms</td>
                <td className="py-2.5 px-3">Isolamento instantâneo de avanço de fase; supressão de ruído; sensibilidade limítrofe à CFF.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">Detector de Fase</td>
                <td className="py-2.5 px-3 tabular-nums">150–199 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Nível 6–7</td>
                <td className="py-2.5 px-3 tabular-nums">60–90 ms</td>
                <td className="py-2.5 px-3">Alta acuidade temporal; isolamento da anomalia em 1–2 períodos de pulso.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">Ritmista Eficiente</td>
                <td className="py-2.5 px-3 tabular-nums">100–149 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Nível 4–5</td>
                <td className="py-2.5 px-3 tabular-nums">91–130 ms</td>
                <td className="py-2.5 px-3">Discriminação consistente; breve hesitação quando o ritmo de fundo acelera.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">Perceptor em Treino</td>
                <td className="py-2.5 px-3 tabular-nums">50–99 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Nível 2–3</td>
                <td className="py-2.5 px-3 tabular-nums">131–180 ms</td>
                <td className="py-2.5 px-3">Inspeção serial de células; vulnerável a distrações causadas por ruído estocástico.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">Fusão de Fase</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 50 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Nível 1</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 180 ms</td>
                <td className="py-2.5 px-3">Amplo borrão de integração temporal; dificuldade para diferenciar deltas sutis.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Protocolos Práticos para Maximizar a Resolução Temporal</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Foco Suave Magnocelular:</strong> Nunca inspecione as células em sequência. Fixe o olhar no centro da matriz de 6x6 e suavize o foco, permitindo que os campos receptivos periféricos da via M monitorem as oscilações coletivas simultaneamente (Holcombe, 2009).
          </li>
          <li>
            <strong>Comparação de Frente de Onda de Fase:</strong> Procure pelo pico antecipado. Como a célula anômala pulsa em frequência mais alta, ela atinge a intensidade máxima frações de segundo antes do restante da grade (Kelly, 1961).
          </li>
          <li>
            <strong>Filtragem de Ruído de Entropia:</strong> Diferencie flashes isolados (ruído estocástico) de ciclos repetitivos contínuos (alvos). Permita que o cérebro observe 150–200 ms para certificar-se da periodicidade antes de clicar (Burr, 1980).
          </li>
          <li>
            <strong>Recalibração Rítmica de Transição:</strong> Ao avançar de nível, pause mentalmente por uma fração de segundo para sincronizar seu relógio interno ao novo andamento da grade, evitando alarmes falsos (De Lange, 1958).
          </li>
        </ol>

        <h3>Perguntas Frequentes (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">O que mede o teste de anomalia de ritmo visual?</h4>
            <p className="text-slate-300 mt-1">
              Ele avalia a discriminação de frequência temporal e a acuidade temporal da visão, medindo a velocidade e a precisão com que o cérebro identifica uma célula desfasada entre 35 células sincronizadas em uma grade 6x6.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Como o sistema visual detecta desvios de fase e ritmos fora de compasso?</h4>
            <p className="text-slate-300 mt-1">
              Através da via magnocelular (M). Seus neurônios possuem resposta ultraveloz a flutuações de luminância, disparando sinais que geram saliência atencional pré-atentiva no córtex visual primário (Kelly, 1961).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qual a diferença entre as vias magnocelular e parvocelular?</h4>
            <p className="text-slate-300 mt-1">
              A via magnocelular tem campos receptivos amplos e condução veloz, especializada em movimento, cintilação e tempo. A via parvocelular possui condução lenta e foca em cores, texturas e detalhes espaciais finos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">O que é Frequência Crítica de Fusão (CFF) e como se relaciona à reação?</h4>
            <p className="text-slate-300 mt-1">
              A CFF é o limiar de frequência no qual pulsos de luz intermitentes deixam de parecer cintilantes e fundem-se em um brilho contínuo (35–60 Hz). Valores altos indicam janelas neurais mais curtas e reações mais ágeis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qual é uma boa pontuação no teste de 45 segundos?</h4>
            <p className="text-slate-300 mt-1">
              Iniciantes registram entre 50 e 99 pontos (Nível 2–3). Praticantes experientes alcançam 100 a 149 pontos, e atletas ou jogadores de elite ultrapassam 150 a 200+ pontos com sequências superiores a 10 acertos seguidos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Por que a grade pulsa mais rápido à medida que os pontos sobem?</h4>
            <p className="text-slate-300 mt-1">
              Sequências de acertos aumentam o ritmo de base e estreitam a diferença temporal (Delta-T) entre o alvo e o fundo, empurrando o sistema visual para operar próximo ao seu limite biológico de resolução temporal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Para que servem os flashes aleatórios de entropia?</h4>
            <p className="text-slate-300 mt-1">
              Eles introduzem ruído estocástico, impedindo que o usuário dependa apenas da luminosidade estática e exigindo uma comparação genuína de periodicidade temporal (Burr, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Existem penalidades de pontos para cliques incorretos?</h4>
            <p className="text-slate-300 mt-1">
              Não há deduções de pontuação acumulada nem perda de tempo. Cliques errados apenas reiniciam a sequência de acertos e exibem um flash vermelho, incentivando decisões rápidas e assertivas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qual a influência da taxa de atualização do monitor (60Hz vs 144Hz+)?</h4>
            <p className="text-slate-300 mt-1">
              Monitores de 60Hz atualizam a cada 16,7 ms, podendo truncar ondas de pulso contínuas. Telas de 144Hz ou 240Hz (intervalos de 6,9 ms a 4,2 ms) renderizam variações de fase com muito mais precisão perceptiva.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Como jogadores de esportes e esports se beneficiam desse treino?</h4>
            <p className="text-slate-300 mt-1">
              Atletas e gamers utilizam a discriminação temporal para antecipar trajetórias de projéteis, frames iniciais de animação adversária e micro-movimentos periféricos com milissegundos de vantagem crucial.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/pt/drills/visual/visual-recognition/rhythm-anomaly" />
      </div>
    </>
  );
}
