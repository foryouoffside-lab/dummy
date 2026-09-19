import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Teste de Busca Visual: Varredura Conjuntiva | SkillDrills",
  description: "Teste de busca visual e varredura conjuntiva grátis online. Localize alvos em matriz de 96 caracteres sob pressão de tempo e treine sua atenção seletiva.",
  keywords: [
    "teste de busca visual",
    "busca conjuntiva visual",
    "varredura visual teste",
    "teoria da integração de características",
    "atenção seletiva visual",
    "discriminação de alvos",
    "inspeção visual online",
    "teste de escaneamento visual",
    "velocidade de processamento visual",
    "treinamento de foco periférico",
    "teste de símbolos visuais",
    "aquisição de alvos visuais"
],
  openGraph: {
    title: "Teste de Busca Visual: Varredura Conjuntiva | SkillDrills",
    description: "Teste de busca visual e varredura conjuntiva grátis online. Localize alvos em matriz de 96 caracteres sob pressão de tempo e treine sua atenção seletiva.",
    type: "website",
    url: "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste de Busca Visual: Varredura Conjuntiva | SkillDrills",
    description: "Teste de busca visual e varredura conjuntiva grátis online. Localize alvos em matriz de 96 caracteres sob pressão de tempo e treine sua atenção seletiva.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'pt'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/pt/" },
    { "@type": "ListItem", "position": 2, "name": "Treinamento Visual", "item": "https://skilldrills.online/pt/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "Reconhecimento Visual", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "Teste de Busca Visual – Varredura Conjuntiva", "item": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Teste de Busca Visual – Varredura Conjuntiva",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Avaliação gratuita de busca visual conjuntiva. Examine matrizes densas de 96 letras com distratores rotacionados para medir a latência e atenção seletiva.",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Teste de Busca Visual Conjuntiva",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Jogo de Busca Visual e Varredura Conjuntiva",
  "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search",
  "description": "Exercício cognitivo de busca visual. Identifique alvos entre 96 letras densamente rotacionadas em uma sessão de 45 segundos.",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como treinar a velocidade de busca visual e varredura conjuntiva",
  "description": "Otimize sua taxa de aquisição de alvos, integração de características e atenção seletiva com base nas teorias de Treisman e Wolfe.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Memorize o caractere-alvo especificado",
      "text": "Fixe na memória de trabalho o formato exato e a orientação do símbolo-alvo exibido no topo da tela.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Aplique filtragem pré-atencional periférica",
      "text": "Mantenha o foco suave e utilize a visão periférica para descartar blocos de caracteres com geometria totalmente divergente.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Execute varredura sacádica em padrão ziguezague",
      "text": "Mova os olhos de maneira coordenada em linhas ou colunas pela grade de 96 células, evitando checagens repetitivas.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Clique imediatamente ao confirmar o alvo",
      "text": "Acione o clique assim que reconhecer o caractere correto para registrar a latência em milissegundos.",
      "url": "https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search#step-4"
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
      "name": "O que mede o teste de busca visual e como ele é aplicado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ele avalia a velocidade de varredura visual, a eficácia do processamento de características conjuntas e a atenção seletiva. O participante deve encontrar um caractere-alvo em meio a 96 letras rotacionadas em uma grade 12x8 durante 45 segundos."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é a diferença entre busca de característica simples e busca conjuntiva?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A busca simples depende de uma única propriedade saliente e produz pop-out imediato. A busca conjuntiva requer a combinação de múltiplos elementos, exigindo exame serial atencioso de cada candidato (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "Por que os caracteres estão rotacionados aleatoriamente neste teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porque distratores uniformes são agrupados pelo cérebro como textura de fundo, facilitando a identificação. A rotação desfaz essa organização do fundo e exige verdadeira discriminação foveal (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "O que estabelece o modelo de Busca Guiada de Wolfe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ele propõe que o córtex gera um mapa de prioridades baseado em filtros pré-atencionais paralelos, direcionando as sacadas oculares prioritariamente aos locais com maior probabilidade de conter o alvo (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "Qual é uma pontuação considerada boa no teste de 45 segundos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Iniciantes fazem de 300 a 550 pontos (2–3 alvos). A média sem treino varia de 600 a 1.000 pontos (4–6 alvos), enquanto atletas de esports e analistas de imagens superam 1.500 pontos (mais de 10 alvos com latência < 450 ms)."
      }
    },
    {
      "@type": "Question",
      "name": "O que diz a Teoria da Carga Perceptiva de Nilli Lavie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ela afirma que ambientes com alta densidade de estímulos consomem toda a capacidade perceptual disponível, eliminando distrações e forçando foco absoluto na tarefa em andamento (Lavie, 1995)."
      }
    },
    {
      "@type": "Question",
      "name": "Como os olhos de um especialista se movem em comparação com um iniciante?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Especialistas realizam varreduras metódicas em ziguezague com fixações breves de 200–250 ms, enquanto novatos saltam os olhos aleatoriamente e demoram muito tempo sobre cada distrator."
      }
    },
    {
      "@type": "Question",
      "name": "Há penalidades por cliques errados durante o teste?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não há desconto de pontos nem subtração de tempo. Erros apenas exibem um alerta visual, garantindo que o usuário mantenha ritmo ágil e atitude decisiva."
      }
    },
    {
      "@type": "Question",
      "name": "Em quais profissões e esportes a busca visual é indispensável?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Radiologia, controle aéreo, inspeção de segurança, forças táticas e esportes dinâmicos como futebol, tênis e jogos de tiro competitivos, onde alvos camuflados precisam ser vistos em frações de segundo."
      }
    },
    {
      "@type": "Question",
      "name": "Como reduzir sistematicamente o tempo de busca visual?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Praticando varredura ziguezague contínua, utilizando a visão periférica para descartar caracteres irrelevantes e evitando permanecer fixado em um mesmo ponto por mais de 250 ms."
      }
    }
  ]
};

export default function VisualSearchLocalePage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "Jogo de Busca Visual e Varredura Conjuntiva" }} />
      <DrillGuide
        eyebrow="Psicofísica Cognitiva & Atenção Visual"
        title="A Ciência da Busca Visual, Integração de Recursos & Atenção Seletiva"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `Em ambientes visuais naturais, os alvos raramente se apresentam de forma isolada. Seja inspecionando uma tela de radar em controle aéreo, revisando documentos densos ou identificando a silhueta de um oponente protegido por cobertura em jogos táticos, o sistema visual humano precisa discriminar velozmente sinais críticos imersos em ruído visual complexo. Na psicofísica visual, essa capacidade é avaliada por meio de <strong>paradigmas de busca visual</strong>, que mensuram a interação da atenção espacial com mapas corticais de características ao longo do tempo (Treisman &amp; Gelade, 1980; Wolfe, 1994).` }} />

        <h3>Teoria da Integração de Recursos: Pop-Out Paralelo vs. Busca Conjuntiva</h3>
        <p dangerouslySetInnerHTML={{ __html: `A psicofísica visual clássica divide os regimes de busca em duas categorias fundamentais, dependendo da saliência e da composição de recursos do alvo:` }} />
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Busca de Característica (Pop-Out Paralelo):</strong> Quando o alvo difere dos distratores por uma única dimensão contínua (como um círculo vermelho entre quadrados azuis), neurônios da área visual primária (V1) registram a discrepância simultaneamente em todo o campo visual. O tempo de reação permanece plano, independentemente da quantidade de itens na tela (Treisman &amp; Gelade, 1980; Wolfe, 1994).
          </li>
          <li>
            <strong>Busca Conjuntiva (Vinculação Serial &amp; Guiada):</strong> Quando o alvo é definido por uma conjunção de atributos que se sobrepõem parcialmente aos distratores vizinhos (como localizar uma letra 'C' entre caracteres rotacionados 'O', 'Q' e 'G'), mecanismos pré-atencionais paralelos não conseguem resolver o alvo isoladamente. O córtex visual precisa alocar a atenção focal sequencialmente de célula em célula, elevando a latência de resposta de forma diretamente proporcional ao tamanho do conjunto (Treisman &amp; Gelade, 1980; Duncan &amp; Humphreys, 1989).
          </li>
        </ul>
        <p dangerouslySetInnerHTML={{ __html: `Esse fenômeno ilustra o que neurocientistas cognitivos definem como o <em>problema da vinculação visual (binding problem)</em>: enquanto áreas visuais primárias processam orientação, curvatura e fechamento em mapas de características modulares e separados, sintetizar essas dimensões em um percepto unificado exige a alocação ativa de atenção espacial mediada pelo córtex parietal posterior e pelos campos oculares frontais (Treisman &amp; Gelade, 1980; Wolfe, 1994).` }} />

        <h3>Homogeneidade de Distratores &amp; Eficiência de Varredura (Duncan &amp; Humphreys, 1989)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Em investigações fundamentais sobre eficiência de busca visual, Duncan e Humphreys (1989) demonstraram que o desempenho perceptual depende de duas relações cruciais:` }} />
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Similaridade Alvo-Distrator:</strong> Conforme a semelhança visual entre o alvo e os distratores aumenta, os limiares de discriminação se elevam, exigindo maior tempo de fixação foveal sobre cada célula.
          </li>
          <li>
            <strong>Homogeneidade entre Distratores:</strong> Quando os distratores compartilham forma e orientação uniformes, o sistema visual os agrupa em uma textura de fundo contínua pelas leis da Gestalt. No entanto, quando os distratores estão rotacionados aleatoriamente — como nesta grade de 96 células —, esse agrupamento colapsa, exigindo inspeção serial detalhada.
          </li>
        </ol>

        <h3>Lente de Zoom Atencional &amp; Carga Perceptiva (Lavie, 1995; Eriksen &amp; St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `Conforme o modelo de lente de zoom espacial (Eriksen &amp; St. James, 1986), a atenção visual opera como um foco de abertura variável. Ao expandir o foco sobre a matriz de 96 células, a resolução de processamento diminui; ao restringi-lo a uma única célula, a acuidade atinge seu ápice em detrimento da cobertura periférica.` }} />
        <p dangerouslySetInnerHTML={{ __html: `Adicionalmente, a Teoria da Carga Perceptiva de Nilli Lavie (1995) comprova que a vulnerabilidade à distração decorre do consumo de largura de banda sensorial. Em tarefas de baixa carga, a capacidade excedente extravasa involuntariamente para estímulos irrelevantes. Já em condições de alta carga perceptiva — como nossa matriz 12x8 sob pressão de 45 segundos —, a capacidade é plenamente saturada, impondo foco seletivo rigoroso e inibindo distrações cognitivas (Lavie, 1995; Bacon &amp; Egeth, 1994).` }} />

        <h3>Parâmetros de Desempenho em Busca Visual (Grade de 96 Células)</h3>
        <p dangerouslySetInnerHTML={{ __html: `As faixas a seguir fornecem uma referência editorial para contextualizar o seu desempenho individual nesta matriz de 96 células (12x8) sob o protocolo padronizado de 45 segundos:` }} />
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">Nível</th>
                <th className="py-2.5 px-3 font-semibold">Latência de Aquisição</th>
                <th className="py-2.5 px-3 font-semibold">Pontuação 45s</th>
                <th className="py-2.5 px-3 font-semibold">Faixa Editorial</th>
                <th className="py-2.5 px-3 font-semibold">Classificação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1.500 PTS (10+ acertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Excepcional</td>
                <td className="py-2.5 px-3">Esports de Elite / Interceptação Radar</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1.050 – 1.450 PTS (7–9 acertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Avançado</td>
                <td className="py-2.5 px-3">Atleta Visual Competitivo</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1.100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1.000 PTS (4–6 acertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Típico</td>
                <td className="py-2.5 px-3">Média Típica Não Treinada</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1.101 – 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 PTS (2–3 acertos)</td>
                <td className="py-2.5 px-3 tabular-nums">Abaixo da Média</td>
                <td className="py-2.5 px-3">Varredura Lenta / Fadiga Visual</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1.600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 PTS (0–1 acerto)</td>
                <td className="py-2.5 px-3 tabular-nums">Iniciante</td>
                <td className="py-2.5 px-3">Visão em Túnel / Sobrecarga de Estímulos</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Protocolos Práticos para Otimizar o Escaneamento Visual</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>Filtragem Periférica Prévia (Wolfe, 1994):</strong> Evite fixar os olhos em cada caractere isolado. Mantenha o olhar ligeiramente suspenso e use a visão periférica para descartar agrupamentos inteiros com formatos discrepantes.
          </li>
          <li>
            <strong>Trajetória Sacádica Sistemática:</strong> Abandone movimentos oculares erráticos. Adote um padrão contínuo de varredura em ziguezague para cobrir a grade sem redundâncias.
          </li>
          <li>
            <strong>Controle de Tempo de Fixação (200–250 ms):</strong> Restrinja cada parada ocular ao limite fisiológico de 200 a 250 milissegundos. Se o alvo não for identificado de imediato, avance a fixação sacádica.
          </li>
          <li>
            <strong>Manutenção do Molde Mental do Alvo:</strong> Mantenha ativa na memória de trabalho a imagem exata da forma procurada para que o córtex ventral iniba distratores automaticamente (Duncan & Humphreys, 1989).
          </li>
        </ol>

        <h3>Perguntas Frequentes (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">O que mede o teste de busca visual e como ele é aplicado?</h4>
            <p className="text-slate-300 mt-1">
              Ele avalia a velocidade de varredura visual, a eficácia do processamento de características conjuntas e a atenção seletiva. O participante deve encontrar um caractere-alvo em meio a 96 letras rotacionadas em uma grade 12x8 durante 45 segundos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qual é a diferença entre busca de característica simples e busca conjuntiva?</h4>
            <p className="text-slate-300 mt-1">
              A busca simples depende de uma única propriedade saliente e produz pop-out imediato. A busca conjuntiva requer a combinação de múltiplos elementos, exigindo exame serial atencioso de cada candidato (Treisman & Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Por que os caracteres estão rotacionados aleatoriamente neste teste?</h4>
            <p className="text-slate-300 mt-1">
              Porque distratores uniformes são agrupados pelo cérebro como textura de fundo, facilitando a identificação. A rotação desfaz essa organização do fundo e exige verdadeira discriminação foveal (Duncan & Humphreys, 1989).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">O que estabelece o modelo de Busca Guiada de Wolfe?</h4>
            <p className="text-slate-300 mt-1">
              Ele propõe que o córtex gera um mapa de prioridades baseado em filtros pré-atencionais paralelos, direcionando as sacadas oculares prioritariamente aos locais com maior probabilidade de conter o alvo (Wolfe, 1994).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Qual é uma pontuação considerada boa no teste de 45 segundos?</h4>
            <p className="text-slate-300 mt-1">
              Iniciantes fazem de 300 a 550 pontos (2–3 alvos). A média sem treino varia de 600 a 1.000 pontos (4–6 alvos), enquanto atletas de esports e analistas de imagens superam 1.500 pontos (mais de 10 alvos com latência &lt; 450 ms).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">O que diz a Teoria da Carga Perceptiva de Nilli Lavie?</h4>
            <p className="text-slate-300 mt-1">
              Ela afirma que ambientes com alta densidade de estímulos consomem toda a capacidade perceptual disponível, eliminando distrações e forçando foco absoluto na tarefa em andamento (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Como os olhos de um especialista se movem em comparação com um iniciante?</h4>
            <p className="text-slate-300 mt-1">
              Especialistas realizam varreduras metódicas em ziguezague com fixações breves de 200–250 ms, enquanto novatos saltam os olhos aleatoriamente e demoram muito tempo sobre cada distrator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Há penalidades por cliques errados durante o teste?</h4>
            <p className="text-slate-300 mt-1">
              Não há desconto de pontos nem subtração de tempo. Erros apenas exibem um alerta visual, garantindo que o usuário mantenha ritmo ágil e atitude decisiva.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Em quais profissões e esportes a busca visual é indispensável?</h4>
            <p className="text-slate-300 mt-1">
              Radiologia, controle aéreo, inspeção de segurança, forças táticas e esportes dinâmicos como futebol, tênis e jogos de tiro competitivos, onde alvos camuflados precisam ser vistos em frações de segundo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Como reduzir sistematicamente o tempo de busca visual?</h4>
            <p className="text-slate-300 mt-1">
              Praticando varredura ziguezague contínua, utilizando a visão periférica para descartar caracteres irrelevantes e evitando permanecer fixado em um mesmo ponto por mais de 250 ms.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/pt/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
