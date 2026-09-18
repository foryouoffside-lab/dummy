import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "시각 탐색 검사: 결합 특징 및 표적 탐지 훈련 | SkillDrills",
  description: "96개 고밀도 회전 방해 문자 속에서 표적을 초고속 식별하는 무료 온라인 시각 탐색 검사. 트레이스먼 특징 통합 모델로 시각 스캐닝 속도와 선택적 주의력을 극대화하세요.",
  keywords: [
    "시각 탐색 검사",
    "결합 특징 탐색",
    "특징 통합 이론",
    "선택적 시각 주의력",
    "표적 탐지 검사",
    "주변시 스캐닝 훈련",
    "시각 스캔 속도",
    "기호 탐색 검사",
    "시각 자극 인지",
    "인지 탐색 과제"
],
  openGraph: {
    title: "시각 탐색 검사: 결합 특징 및 표적 탐지 훈련 | SkillDrills",
    description: "96개 고밀도 회전 방해 문자 속에서 표적을 초고속 식별하는 무료 온라인 시각 탐색 검사. 트레이스먼 특징 통합 모델로 시각 스캐닝 속도와 선택적 주의력을 극대화하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "시각 탐색 검사: 결합 특징 및 표적 탐지 훈련 | SkillDrills",
    description: "96개 고밀도 회전 방해 문자 속에서 표적을 초고속 식별하는 무료 온라인 시각 탐색 검사. 트레이스먼 특징 통합 모델로 시각 스캐닝 속도와 선택적 주의력을 극대화하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'ko'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko/" },
    { "@type": "ListItem", "position": 2, "name": "시각 훈련", "item": "https://skilldrills.online/ko/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "시각 인지", "item": "https://skilldrills.online/ko/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "시각 탐색 검사 – 결합 특징 스캐닝", "item": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "시각 탐색 검사 – 결합 특징 스캐닝",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "무료 온라인 결합 시각 탐색 검사. 회전된 방해 문자가 가득한 고밀도 12x8 격자에서 표적을 탐색하여 시각 처리 속도와 주의력을 측정합니다.",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "결합 시각 탐색 및 표적 식별 검사",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "시각 탐색: 결합 스캐닝 훈련",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search",
  "description": "무료 과학적 시각 탐색 게임. 96개의 회전 방해 문자 속에서 목표 기호를 신속하게 찾아내어 시각 탐색 처리율을 극대화하세요.",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "시각 탐색 속도와 결합 특징 스캐닝 능력을 훈련하는 방법",
  "description": "앤 트레이스먼과 제레미 울프의 인지 심리학 모델에 기반한 4단계 과학적 시각 스캐닝 훈련 가이드.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "상단 표적 문자의 형태와 특성 각인",
      "text": "화면 상단에 제시되는 목표 문자의 기하학적 형태와 고유 윤곽을 작업 기억에 정확히 각인합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "주변시를 활용한 1차 조대 필터링",
      "text": "모든 문자를 일일이 응시하지 않고 시선을 살짝 띄워 완전히 다른 형태의 문자 군집을 주변시로 배제합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "체계적인 지그재그 도약 안구운동 전개",
      "text": "96셀 격자를 상하좌우 일정한 리듬의 지그재그 패턴으로 훑으며 불필요한 중복 응시를 제거합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "표적 확인 즉시 번개 같은 클릭",
      "text": "후보 문자가 표적과 일치하는 순간 지체 없이 클릭하여 밀리초 단위 탐색 지연 시간과 점수를 기록합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search#step-4"
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
      "name": "시각 탐색 검사(Visual Search Test)는 무엇을 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고밀도 자극 배열 속에서 표적을 찾아내는 시각 스캐닝 속도, 결합 특징 처리 효율성, 선택적 주의력을 종합적으로 평가합니다. 96개의 회전된 방해 문자 속에서 목표를 얼마나 빨리 식별하는지 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순 특징 탐색과 결합 탐색의 근본적인 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단순 특징 탐색은 하나의 고유 속성 덕분에 시야 전체에서 즉각적인 팝아웃이 일어납니다. 결합 탐색은 여러 특징을 조합해야 하므로 주의의 초점을 하나씩 옮기는 직렬 탐색이 필수적입니다 (Treisman & Gelade, 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "본 테스트에서 문자들을 무작위 각도로 회전시킨 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "방해 자극들이 동일한 각도로 배열되면 게슈탈트 법칙에 의해 배경으로 묶여버리기 때문입니다. 각도를 불규칙하게 섞어 배경화를 차단하고 순수한 중심와 식별력을 테스트합니다 (Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "울프의 안내 탐색(Guided Search) 이론은 실제 탐색에 어떻게 적용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뇌가 맹목적으로 찾는 대신, 초기 시각 피질의 특징 정보로 우선순위 지도를 만들어 가능성이 높은 위치로 안구 도약을 우선 유도합니다 (Wolfe, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "45초 테스트에서 우수한 성적으로 인정받는 기준은 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "초보자는 300~550점(2~3개 탐색)을 기록합니다. 일반 성인은 600~1,000점(4~6개) 수준이며, 프로게이머나 숙련자는 1,500점 이상(10개 이상, 지연시간 450ms 이하)을 달성합니다."
      }
    },
    {
      "@type": "Question",
      "name": "라비의 지각 부하 이론(Perceptual Load Theory)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "감각 정보 부하가 높을수록 뇌의 지각 대역폭이 꽉 차서 딴생각이나 무관한 외부 자극에 한눈을 팔지 못하고 과제에만 완벽히 몰입하게 된다는 인지 이론입니다 (Lavie, 1995)."
      }
    },
    {
      "@type": "Question",
      "name": "탐색 전문가와 초보자의 안구 움직임에는 어떤 차이가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전문가는 체계적인 지그재그 도약, 넓은 주변시 활용, 200ms 안팎의 짧은 고정 시간을 보이지만, 초보자는 시선이 불규칙하게 방황하며 한 글자에 오래 머뭅니다."
      }
    },
    {
      "@type": "Question",
      "name": "오클릭 시 감점이나 시간 차감 페널티가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "감점이나 남은 시간 차감은 전혀 없습니다. 결단을 주저하지 않고 신속하게 클릭할 수 있도록 설계되어 있으므로 빠른 판단이 유리합니다."
      }
    },
    {
      "@type": "Question",
      "name": "어떤 직업군과 스포츠 종목에서 시각 탐색 능력이 특히 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "의료 영상 판독의, 항공 관제사, 보안 검색 요원, 레이더 운용병뿐만 아니라 축구, 야구, 농구, FPS 게임 등 복잡한 시각 공간에서 즉각 표적을 식별해야 하는 모든 분야에서 결정적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 탐색 속도를 단축하기 위한 가장 효과적인 연습 방법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "무작위로 눈을 굴리지 않고 균일한 지그재그 패턴을 유지하며, 주변시로 대략적인 윤곽을 먼저 거르고 의심 구역만 빠르게 응시하는 습관을 들이는 것입니다."
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
      <VisualSearchClient copy={{ title: "시각 탐색: 결합 스캐닝 훈련" }} />
      <DrillGuide
        eyebrow="시각 인지 심리학 & 주의력 메커니즘"
        title="시각 탐색, 특징 통합 이론 및 선택적 주의 집중의 신경과학"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `복잡하고 어수선한 시각 환경 속에서 원하는 특정 대상을 신속하게 찾아내는 능력은 인간의 생존과 직결된 핵심 인지 기능입니다. 방사선 전문의의 X선 병변 판독, 공항 보안 검색 요원의 수하물 위험물 탐지, 고속 주행 중 돌발 표지판 인식, e스포츠의 적 식별에 이르기까지 모든 고성능 탐색 행동은 망막 수용체와 전두-두정엽 주의 네트워크의 유기적 상호작용을 필요로 합니다 (Treisman & Gelade, 1980; Wolfe, 1994).` }} />

        <h3>특징 통합 이론: 병렬적 팝아웃 vs 순차적 결합 탐색</h3>
        <p dangerouslySetInnerHTML={{ __html: `앤 트레이스먼(Anne Treisman)의 특징 통합 이론(FIT)에 따르면, 표적이 색상이나 선의 방향 등 단 하나의 기본 특징에서 방해 자극과 구별될 경우, 뇌는 시야 전체를 <strong>전주의적 병렬 처리</strong>로 스캔하여 방해 요소 개수와 무관하게 즉각적인 '팝아웃(Pop-out)'을 일으킵니다. 그러나 표적이 여러 특징의 조합으로 정의되거나, 본 검사처럼 방해 문자들이 무작위 각도로 회전되어 있을 때는 병렬 팝아웃이 붕괴됩니다. 시각계는 주의의 초점을 대상 하나하나에 순차적으로 이동시키는 <strong>직렬 탐색(Serial Search)</strong>을 수행해야 하므로, 방해 자극이 많을수록 탐색 시간이 정비례하여 증가합니다 (Treisman & Gelade, 1980; Duncan & Humphreys, 1989).` }} />

        <h3>안내 탐색 모델(Guided Search)과 자극 유사도 법칙</h3>
        <p dangerouslySetInnerHTML={{ __html: `제레미 울프(Jeremy Wolfe)는 트레이스먼의 모델을 발전시켜 '안내 탐색(Guided Search)' 이론을 정립했습니다. 뇌는 완전히 무작위로 탐색하는 것이 아니라, 하위 시각 피질에서 생성된 특징 지도들을 종합하여 대뇌 피질에 '우선순위 지도(Priority Map)'를 형성합니다. 던컨과 험프리스(Duncan & Humphreys, 1989)의 연구에 따르면, 탐색 효율은 <em>표적-방해자극 간 유사도</em>와 <em>방해자극 간 동질성</em>에 의해 좌우됩니다. 방해 문자가 불규칙하게 회전되어 있으면 게슈탈트 시각적 배경화가 불가능해져 개별적인 중심와 확인이 불가피해집니다.` }} />

        <h3>주의 줌렌즈 모델 & 지각 부하 이론 (Lavie, 1995; Eriksen & St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `에릭센의 줌렌즈 모델(Eriksen & St. James, 1986)에 따르면, 시각 주의는 조리개를 조절할 수 있는 조명 렌즈처럼 작동합니다. 탐색 범위를 넓히면 해상도가 떨어지고, 단일 셀로 좁히면 해상도가 극대화됩니다. 닐리 라비(Nilli Lavie)의 지각 부하 이론(Perceptual Load Theory, 1995)은 감각 정보 부하가 높을수록 인지적 딴생각이 억제된다고 증명했습니다. 96개 문자가 빽빽이 밀집된 고부하 환경에서 45초 타임어택을 수행하면 시각 지각 대역폭이 100% 포화되어 극한의 선택적 집중력이 발휘됩니다 (Lavie, 1995; Bacon & Egeth, 1994).` }} />

        <h3>시각 탐색 지연 시간 및 처리율 기준표 (96셀 격자)</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">등급</th>
                <th className="py-2.5 px-3 font-semibold">표적 포착 지연 시간</th>
                <th className="py-2.5 px-3 font-semibold">45초 획득 점수</th>
                <th className="py-2.5 px-3 font-semibold">성취 수준</th>
                <th className="py-2.5 px-3 font-semibold">분류 프로필</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1,500 PTS (10개+ 포착)</td>
                <td className="py-2.5 px-3 tabular-nums">최우수</td>
                <td className="py-2.5 px-3">엘리트 프로게이머 / 레이더 감시관</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1,050 – 1,450 PTS (7–9개)</td>
                <td className="py-2.5 px-3 tabular-nums">우수</td>
                <td className="py-2.5 px-3">숙련된 경쟁적 비주얼 운동선수</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1,100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1,000 PTS (4–6개)</td>
                <td className="py-2.5 px-3 tabular-nums">보통</td>
                <td className="py-2.5 px-3">일반적인 비훈련 성인 평균치</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1,101 – 1,600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 PTS (2–3개)</td>
                <td className="py-2.5 px-3 tabular-nums">미흡</td>
                <td className="py-2.5 px-3">스캐닝 지연 / 시각적 피로 누적</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1,600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 PTS (0–1개)</td>
                <td className="py-2.5 px-3 tabular-nums">기초</td>
                <td className="py-2.5 px-3">터널 시야 / 고밀도 과부하 상태</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>시각 탐색 처리율을 극대화하는 실전 스캐닝 수칙</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>주변시 조대 필터링(Wolfe, 1994):</strong> 개별 글자를 일일이 정밀 응시하지 마세요. 시선을 문자 군집 위에 살짝 띄워 명백히 다른 외곽선을 지닌 문자들을 주변시로 한꺼번에 걸러냅니다.
          </li>
          <li>
            <strong>규칙적인 지그재그 스캐닝:</strong> 시야를 이리저리 방황시키지 마세요. 좌우 또는 상하 방향의 균일한 지그재그 패턴으로 눈을 움직여 중복 확인을 방지합니다.
          </li>
          <li>
            <strong>최적 중심와 응시 시간(200~250ms):</strong> 한 위치에 시선이 머무는 시간을 생리학적 최소치인 200~250ms로 엄격히 제한하고 일치하지 않으면 즉시 다음 위치로 안구를 도약시킵니다.
          </li>
          <li>
            <strong>작업 기억 속 표적 템플릿 유지:</strong> 목표 문자의 3차원적 회전 윤곽을 뇌 속에서 명확히 유지하여 복측 시각 경로에서 불일치 방해 요소를 능동적으로 억제합니다 (Duncan & Humphreys, 1989).
          </li>
        </ol>

        <h3>자주 묻는 질문 (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">시각 탐색 검사(Visual Search Test)는 무엇을 측정하나요?</h4>
            <p className="text-slate-300 mt-1">
              고밀도 자극 배열 속에서 표적을 찾아내는 시각 스캐닝 속도, 결합 특징 처리 효율성, 선택적 주의력을 종합적으로 평가합니다. 96개의 회전된 방해 문자 속에서 목표를 얼마나 빨리 식별하는지 측정합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">단순 특징 탐색과 결합 탐색의 근본적인 차이는 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              단순 특징 탐색은 하나의 고유 속성 덕분에 시야 전체에서 즉각적인 팝아웃이 일어납니다. 결합 탐색은 여러 특징을 조합해야 하므로 주의의 초점을 하나씩 옮기는 직렬 탐색이 필수적입니다 (Treisman & Gelade, 1980).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">본 테스트에서 문자들을 무작위 각도로 회전시킨 이유는 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              방해 자극들이 동일한 각도로 배열되면 게슈탈트 법칙에 의해 배경으로 묶여버리기 때문입니다. 각도를 불규칙하게 섞어 배경화를 차단하고 순수한 중심와 식별력을 테스트합니다 (Duncan & Humphreys, 1989).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">울프의 안내 탐색(Guided Search) 이론은 실제 탐색에 어떻게 적용되나요?</h4>
            <p className="text-slate-300 mt-1">
              뇌가 맹목적으로 찾는 대신, 초기 시각 피질의 특징 정보로 우선순위 지도를 만들어 가능성이 높은 위치로 안구 도약을 우선 유도합니다 (Wolfe, 1994).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">45초 테스트에서 우수한 성적으로 인정받는 기준은 얼마인가요?</h4>
            <p className="text-slate-300 mt-1">
              초보자는 300~550점(2~3개 탐색)을 기록합니다. 일반 성인은 600~1,000점(4~6개) 수준이며, 프로게이머나 숙련자는 1,500점 이상(10개 이상, 지연시간 450ms 이하)을 달성합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">라비의 지각 부하 이론(Perceptual Load Theory)이란 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              감각 정보 부하가 높을수록 뇌의 지각 대역폭이 꽉 차서 딴생각이나 무관한 외부 자극에 한눈을 팔지 못하고 과제에만 완벽히 몰입하게 된다는 인지 이론입니다 (Lavie, 1995).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">탐색 전문가와 초보자의 안구 움직임에는 어떤 차이가 있나요?</h4>
            <p className="text-slate-300 mt-1">
              전문가는 체계적인 지그재그 도약, 넓은 주변시 활용, 200ms 안팎의 짧은 고정 시간을 보이지만, 초보자는 시선이 불규칙하게 방황하며 한 글자에 오래 머뭅니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">오클릭 시 감점이나 시간 차감 페널티가 있나요?</h4>
            <p className="text-slate-300 mt-1">
              감점이나 남은 시간 차감은 전혀 없습니다. 결단을 주저하지 않고 신속하게 클릭할 수 있도록 설계되어 있으므로 빠른 판단이 유리합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">어떤 직업군과 스포츠 종목에서 시각 탐색 능력이 특히 중요한가요?</h4>
            <p className="text-slate-300 mt-1">
              의료 영상 판독의, 항공 관제사, 보안 검색 요원, 레이더 운용병뿐만 아니라 축구, 야구, 농구, FPS 게임 등 복잡한 시각 공간에서 즉각 표적을 식별해야 하는 모든 분야에서 결정적입니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">시각 탐색 속도를 단축하기 위한 가장 효과적인 연습 방법은 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              무작위로 눈을 굴리지 않고 균일한 지그재그 패턴을 유지하며, 주변시로 대략적인 윤곽을 먼저 거르고 의심 구역만 빠르게 응시하는 습관을 들이는 것입니다.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
