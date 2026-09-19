import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — pt-BR (motor / hand-eye-coordination / aim-trainer)
// PRIMARY DOMESTIC: "aim trainer" — 370 exact / 1,044 broad Bing searches/mo (Top search in Brazil)
//                   "treino de mira" — 273 exact / 393 broad searches/mo (Native Portuguese winner)
//                   "teste de mira" — 151 exact / 151 broad searches/mo
// SECONDARY / LSI:
//                   "treinar mira" — 68 exact / 68 broad searches/mo
//                   "treino de mira valorant" — High-intent gaming query
//                   "precisão do mouse" — Motor assessment query
// WINNER TITLE:     Treino de Mira Online – Aim Trainer Grátis & Teste de Precisão FPS | SkillDrills
// ============================================================

export const metadata = {
  title: "Treino de Mira Online – Aim Trainer Grátis | SkillDrills",
  description: "Treino de mira online grátis no navegador: Melhore a precisão do mouse, reflexos e micro-flicks com alvos dinâmicos baseados na Lei de Fitts.",
  keywords: ['treino de mira online', 'aim trainer gratis', 'treino de mira fps', 'teste de precisao do mouse', 'treino de flick shot', 'lei de fitts treino de mira', 'aim trainer no navegador', 'aquecimento valorant mira', 'mira precisa mouse fps', 'teste de mira e reflexo', 'exercicio de mira no mouse', 'melhorar mira no cs2'],
  alternates: {
    canonical: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  openGraph: {
    title: 'Treino de Mira Online – Aim Trainer Grátis & Teste de Precisão FPS | SkillDrills',
    description:
      'Treino de mira online e teste de reflexos FPS grátis. Acerte alvos móveis dinâmicos e refine sua precisão de mouse no navegador.',
    url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treino de Mira Online – Aim Trainer Grátis & Teste de Precisão FPS | SkillDrills',
    description:
      'Treino de mira para jogos FPS no navegador. Aprimore micro-flicks e mira rápida com alvos em movimento.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills Início', item: 'https://skilldrills.online/pt' },
    { '@type': 'ListItem', position: 2, name: 'Central de Treinos', item: 'https://skilldrills.online/pt/drills' },
    { '@type': 'ListItem', position: 3, name: 'Controle Motor & Precisão', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'Coordenação Olho-Mão', item: 'https://skilldrills.online/pt/drills/motor' },
    { '@type': 'ListItem', position: 5, name: 'Treino de Mira', item: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Treino de Mira Online – Aim Trainer Grátis FPS',
  alternateName: ['Treino de Mira', 'Aim Trainer', 'Teste de Mira', 'Aim Trainer Online'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  description:
    'Ferramenta gratuita de treino de mira e precisão de mouse direto no navegador, projetada para jogadores competitivos de FPS.',
  browserRequirements: 'Navegador web moderno com suporte a JavaScript e Pointer Lock (Chrome, Edge, Safari, Firefox)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Treino de Mira Online — Aim Trainer Grátis FPS | SkillDrills',
  url: 'https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer',
  description:
    'Simulador dinâmico de treino de mira para jogos de tiro. Elimine alvos móveis com progressão contínua de dificuldade.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requer navegador moderno com suporte a JavaScript e Pointer Lock.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'Precisão de mira, micro-flicks, controle do mouse, reflexos rápidos, coordenação visuomotora',
};


const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Treino de Mira Online (Aim Trainer)",
  "url": "https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer",
  "description": "Free online browser-based 2D aim trainer for FPS gamers. Practice target acquisition, mouse accuracy, and click timing.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Aim Trainer", "FPS Training", "Hand-Eye Coordination", "Reaction Speed"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Como treinar mira e reflexos no navegador',
  description: 'Passo a passo para melhorar a mira e a velocidade de reação com o simulador da SkillDrills.',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      
      name: 'Iniciar o Treino',
      text: 'Clique em "Iniciar Treino" para ativar a tela cheia e travar o cursor do mouse no centro da tela.',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      
      name: 'Identificar o Alvo',
      text: 'Localize visualmente o alvo móvel recém-gerado no menor tempo possível.',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      
      name: 'Flick Rápido e Clique Central',
      text: 'Desloque o mouse em direção ao alvo e desacelere sobre o centro antes que ele expire.',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/pt/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      
      name: 'Acumular Combos e Subir de Nível',
      text: 'Acerte alvos sucessivos para alcançar o multiplicador máximo de 3.0x e avançar de fase.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é um Aim Trainer e como funciona o treino de mira?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um Aim Trainer é um simulador que mede e treina a rapidez e precisão com que você desloca a mira até um alvo e atira. Conforme seu desempenho melhora, os alvos diminuem e aceleram.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como a Lei de Fitts se aplica ao treino de mira?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Lei de Fitts determina que o tempo de movimento depende do equilíbrio entre a distância e a largura do alvo. Alvos menores impõem maior dificuldade e exigem refinamento motor fino.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que é o modelo bifásico do movimento de mira?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todo movimento de mira veloz é composto por uma fase inicial balística rápida (80–90% da distância) e uma fase terminal de desaceleração guiada por feedback visual para o clique exato.',
      },
    },
    {
      '@type': 'Question',
      name: 'Este treino melhora a mira no Valorant e CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Tiros na cabeça e trocas de tiro competitivas dependem fortemente de micro-ajustes rápidos de 5 a 15 graus, habilidade motora isolada e calibrada neste exercício.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual é uma boa pontuação no Treino de Mira?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Iniciantes costumam marcar até 8.000 pontos. Jogadores intermediários alcançam entre 18.000 e 31.999 pontos, e atletas competitivos de alto nível superam 48.000 pontos com precisão acima de 95%.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona a progressão contínua de dificuldade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cada 1.750 pontos você sobe de nível. O raio dos alvos cai de 26px para 8px, a velocidade sobe de 80px/s para 370px/s e o tempo de vida do alvo diminui de 2,8s para 0,40s.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tiros errados causam penalidade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Erros e alvos perdidos resetam a sequência de combo para 1.0x, incentivando disparos calculados em vez de cliques desenfreados.',
      },
    },
    {
      '@type': 'Question',
      name: 'Posso usar a mesma sensibilidade do meu jogo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. O treino utiliza entrada raw com Pointer Lock e se integra ao controle global de sensibilidade, permitindo treinar com o mesmo cm/360 do seu jogo favorito.',
      },
    },
    {
      '@type': 'Question',
      name: 'Monitores com alta taxa de atualização fazem diferença?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Monitores de 144Hz ou 240Hz reduzem a defasagem entre o movimento físico e a imagem em tela em cerca de 10–12 ms, facilitando correções visuais precisas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual rotina de aquecimento traz melhores resultados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Um aquecimento de 10 a 15 minutos diários mantendo precisão acima de 90% antes das partidas ranqueadas estimula o córtex motor e proporciona consistência de mira.',
      },
    },
  ],
};

export default function AimTrainerPortuguesePage() {
  const sources = pickSources('fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <AimTrainerClient
        copy={{
          title: 'Treino de Mira Online (Aim Trainer)',
          subtitle: 'Alvos Móveis Dinâmicos & Precisão de Clique • Progressão Contínua de Nível',
          caption: 'Mire e acerte os alvos em movimento o mais rápido e preciso possível antes que desapareçam. Baseado na Lei de Fitts.',
          startButtonText: 'INICIAR TREINO',
          playAgainText: 'Jogar Novamente',
          shareText: 'Compartilhar Pontuação',
          exitText: 'Sair',
          rulesTitle: 'Instruções & Sistema de Pontuação',
          aboutTitle: 'Sobre o Aim Trainer Elite',
          rulesItems: [
            {
              num: "1",
              text: "Acerto no Alvo",
              highlight: "+100 PTS / +0,6s",
              result: "Detecte e clique nos alvos móveis"
            },
            {
              num: "2",
              text: "Combo Contínuo",
              highlight: "Até 3,0× Multiplicador",
              result: "Encadeie acertos limpos sem errar"
            },
            {
              num: "3",
              text: "Progressão de Nível",
              highlight: "+1 Nível / 1750 PTS",
              result: "Alvos encolhem e aceleram"
            },
            {
              num: "4",
              text: "Erro e Expiração",
              highlight: "Reset de Combo",
              result: "Penalidade deduz -0,8s"
            }
          ]
        }}
      />

      <DrillGuide
        eyebrow="Psicofísica do Controle Motor & Interação Humano-Computador (IHC)"
        title="A Ciência do Treino de Mira: Lei de Fitts e Precisão Motora Visuomotora"
        sources={sources}
      >
        <p>
          A aquisição de alvos com mouse é uma das tarefas de coordenação motora fina mais exigentes estudadas na interação humano-computador (IHC) e na psicofísica esportiva. Seja para dominar ângulos em jogos de tiro tático ou em cirurgias guiadas por vídeo, o sistema neuromuscular humano precisa converter estímulos visuais bidimensionais em contrações físicas rápidas e submilimétricas do punho e antebraço (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>A Lei de Fitts e o Índice de Dificuldade (ID)</h3>
        <p>
          Em 1954, Paul M. Fitts provou que o tempo de movimento (\(MT\)) até um alvo é proporcional à distância (\(D\)) dividida pela largura do alvo (\(W\)):
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          O componente logarítmico é denominado <strong>Índice de Dificuldade (ID)</strong>. No <em>Treino de Mira</em> da SkillDrills, conforme você progride, o tamanho dos alvos diminui de 26 para 8 pixels enquanto as distâncias e velocidades aumentam, exigindo respostas motoras de altíssima fidelidade (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>O Modelo de Dois Componentes do Movimento de Mira (Woodworth 1899; Elliott et al. 2010)</h3>
        <p>
          O ato de mirar não é um movimento isolado e uniforme. Estudos comprovam que ele se divide em duas etapas neurofisiológicas:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Impulso Balístico Inicial (Fase de Malha Aberta):</strong> Uma explosão neuromuscular disparada pelo córtex motor que cobre 80% a 90% da distância em 120 a 180 ms, sem correção visual intermediária.
          </li>
          <li>
            <strong>Desaceleração Terminal e Ajuste Fino (Fase de Malha Fechada):</strong> Ao se aproximar do alvo, o cérebro processa o erro visual e realiza microcorreções para estabilizar o cursor sobre o alvo antes do clique.
          </li>
        </ol>
        <p>
          Jogadores iniciantes sofrem com <em>over-flicking</em> (passar do alvo e precisar recuar) ou <em>under-flicking</em> (parar antes e rastejar até o alvo). Atletas de elite calibram o impulso inicial para frear exatamente em cima da área de impacto (Elliott et al., 2010; Woods et al., 2015).
        </p>

        <h3>Latenência de Entrada e Frequência de Atualização</h3>
        <p>
          Para o clique perfeito, a latência do sistema deve ser mínima. Conforme documentado por Woods et al. (2015), os atrasos neurosensoriais somam entre 130 e 190 ms. Monitores de 144Hz ou 240Hz reduzem o tempo de exibição para 6,9 ms ou 4,1 ms, proporcionando retornos visuais muito mais rápidos na fase crítica de finalização da mira.
        </p>

        <h3>Tabela de Desempenho e Classificação no Treino de Mira</h3>
        <p>
          Confira sua faixa de desempenho para uma sessão de 45 segundos:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">Faixa</th>
                <th className="p-2.5 border border-white/10 font-bold">Pontuação</th>
                <th className="p-2.5 border border-white/10 font-bold">Nível</th>
                <th className="p-2.5 border border-white/10 font-bold">Precisão</th>
                <th className="p-2.5 border border-white/10 font-bold">Classificação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 1 (Elite)</td>
                <td className="p-2.5 border border-white/10">&gt; 48.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95% (Combo 25+)</td>
                <td className="p-2.5 border border-white/10">Nível Profissional / Mira Cirúrgica</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 2 (Avançado)</td>
                <td className="p-2.5 border border-white/10">32.000 – 47.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 9–11</td>
                <td className="p-2.5 border border-white/10">88% – 94% (Combo 18–24)</td>
                <td className="p-2.5 border border-white/10">Competitivo de Alto Nível / Fragger</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3 (Intermediário)</td>
                <td className="p-2.5 border border-white/10">18.000 – 31.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 6–8</td>
                <td className="p-2.5 border border-white/10">78% – 87% (Combo 12–17)</td>
                <td className="p-2.5 border border-white/10">Jogador Regular / Mira Estável</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4 (Básico)</td>
                <td className="p-2.5 border border-white/10">8.000 – 17.999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 3–5</td>
                <td className="p-2.5 border border-white/10">65% – 77% (Combo 6–11)</td>
                <td className="p-2.5 border border-white/10">Em Desenvolvimento / Oscilações</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5 (Iniciante)</td>
                <td className="p-2.5 border border-white/10">&lt; 8.000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65% (Combo &lt; 6)</td>
                <td className="p-2.5 border border-white/10">Cliques Ansiosos / Imprecisão</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>4 Princípios Práticos para Desenvolver Mira Precisa</h3>
        <p>
          Para comprimir sistematicamente a latência de aquisição de alvos e maximizar a precisão em micro-flicks, aplique estes quatro protocolos neuromotores baseados em evidências durante seu treino:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>Flick Inicial Firme (Woodworth, 1899):</strong> Cubra a maior parte da distância até o alvo com um movimento contínuo e rápido, sem pausas ou hesitações no trajeto.
          </li>
          <li>
            <strong>Desaceleração Suave (Fitts, 1954):</strong> Reduza a velocidade próximo ao centro do alvo com controle suave dos dedos e pulso para absorver o momentum.
          </li>
          <li>
            <strong>Constância na Sensibilidade (MacKenzie, 1992):</strong> Mantenha a mesma rotação (cm/360) em todos os seus jogos para consolidar a memória muscular.
          </li>
          <li>
            <strong>Empunhadura Relaxada (Woods et al., 2015):</strong> Evite apertar o mouse com força excessiva para que o ato de clicar não desvie a mira da rota.
          </li>
        </ul>

        <h3>Perguntas Frequentes (FAQ)</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">O que é um Aim Trainer e como funciona o treino de mira?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Um Aim Trainer é um simulador que mede e treina a rapidez e precisão com que você desloca a mira até um alvo e atira. Conforme seu desempenho melhora, os alvos diminuem e aceleram.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Como a Lei de Fitts se aplica ao treino de mira?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              A Lei de Fitts determina que o tempo de movimento depende do equilíbrio entre a distância e a largura do alvo. Alvos menores impõem maior dificuldade e exigem refinamento motor fino.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">O que é o modelo bifásico do movimento de mira?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Todo movimento de mira veloz é composto por uma fase inicial balística rápida (80–90% da distância) e uma fase terminal de desaceleração guiada por feedback visual para o clique exato.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Este treino melhora a mira no Valorant e CS2?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sim. Tiros na cabeça e trocas de tiro competitivas dependem fortemente de micro-ajustes rápidos de 5 a 15 graus, habilidade motora isolada e calibrada neste exercício.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Qual é uma boa pontuação no Treino de Mira?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Iniciantes costumam marcar até 8.000 pontos. Jogadores intermediários alcançam entre 18.000 e 31.999 pontos, e atletas competitivos de alto nível superam 48.000 pontos com precisão acima de 95%.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Como funciona a progressão contínua de dificuldade?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              A cada 1.750 pontos você sobe de nível. O raio dos alvos cai de 26px para 8px, a velocidade sobe de 80px/s para 370px/s e o tempo de vida do alvo diminui de 2,8s para 0,40s.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Tiros errados causam penalidade?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Erros e alvos perdidos resetam a sequência de combo para 1.0x, incentivando disparos calculados em vez de cliques desenfreados.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Posso usar a mesma sensibilidade do meu jogo?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sim. O treino utiliza entrada raw com Pointer Lock e se integra ao controle global de sensibilidade, permitindo treinar com o mesmo cm/360 do seu jogo favorito.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Monitores com alta taxa de atualização fazem diferença?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Sim. Monitores de 144Hz ou 240Hz reduzem a defasagem entre o movimento físico e a imagem em tela em cerca de 10–12 ms, facilitando correções visuais precisas.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">Qual rotina de aquecimento traz melhores resultados?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Um aquecimento de 10 a 15 minutos diários mantendo precisão acima de 90% antes das partidas ranqueadas estimula o córtex motor e proporciona consistência de mira.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/aim-trainer"
          locale="pt"
        />
      </div>
      <DrillFooter />
    </>
  );
}
