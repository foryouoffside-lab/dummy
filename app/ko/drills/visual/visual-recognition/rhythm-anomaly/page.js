import RhythmAnomalyClient from '@/app/drills/visual/visual-recognition/rhythm-anomaly/RhythmAnomalyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "시각 리듬 검사: 시간 분해능 및 펄스 판별 훈련 | SkillDrills",
  description: "36셀 맥동 격자 속에서 위상과 주기가 다른 이상 펄스를 즉각 식별하는 무료 시각 리듬 검사. 인간 망막의 거대세포 시간 분해능을 측정하고 반응 속도를 높이세요.",
  keywords: [
    "시각 리듬 검사",
    "시간 분해능 테스트",
    "플리커 검사",
    "깜빡임 판별 검사",
    "임계 융합 빈도 CFF",
    "시각 타이밍 인지 훈련",
    "펄스 위상차 판별",
    "거대세포 경로 시각 훈련",
    "이상 펄스 탐지",
    "동적 시각 반응속도"
],
  openGraph: {
    title: "시각 리듬 검사: 시간 분해능 및 펄스 판별 훈련 | SkillDrills",
    description: "36셀 맥동 격자 기반 무료 시각 리듬 검사. 대세포 시각 경로의 깜빡임 변별력, 위상차 감지, 동적 시각 타이밍 능력을 온라인에서 측정하고 강화하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "시각 리듬 검사: 시간 분해능 및 펄스 판별 훈련 | SkillDrills",
    description: "36셀 맥동 격자 기반 무료 시각 리듬 검사. 대세포 시각 경로의 깜빡임 변별력, 위상차 감지, 동적 시각 타이밍 능력을 온라인에서 측정하고 강화하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/rhythm-anomaly', 'ko'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko/" },
    { "@type": "ListItem", "position": 2, "name": "시각 훈련", "item": "https://skilldrills.online/ko/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "시각 인지", "item": "https://skilldrills.online/ko/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "시각 리듬 아노말리 검사 – 시간 분해능 훈련", "item": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "시각 리듬 아노말리 검사 – 시간 분해능 훈련",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "무료 온라인 시각 리듬 및 시간 분해능 검사. 6x6 그리드의 36개 펄스 셀 중 위상이 어긋난 이상 셀을 타임어택 방식으로 신속하게 찾아내세요.",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "시각 리듬 & 시간 분해능 판별 검사",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "시각 리듬 아노말리 판별 게임",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly",
  "description": "무료 시각 타이밍 및 플리커 감지 훈련 게임. 맥동하는 광학 격자에서 위상과 주기가 어긋난 이상 펄스를 찾아내어 반응속도를 극대화하세요.",
  "genre": ["Action", "Brain Game", "Timing Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "시각 리듬 변별력과 이상 펄스 탐지 능력을 훈련하는 방법",
  "description": "과학적 시각 타이밍 검사를 통해 안구 망막의 대세포 신경망과 대뇌 시각 피질의 시간 분해능을 극대화하는 4단계 실전 프로토콜.",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "맥동하는 광학 격자에 중심 시선 고정",
      "text": "6x6 격자의 정중앙에 시선을 가볍게 두고, 36개 셀 전체가 동기화되어 맥동하는 기준 주기를 인지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "기준 펄스의 주기적 템포 내재화",
      "text": "시각 피질이 정현파 형태의 밝기 변화에 동조되도록 하여 뇌 내부의 타이밍 기준선을 설정합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "위상이 어긋난 이상 펄스 식별",
      "text": "동기화된 주변 셀보다 한발 앞서 최대 밝기에 도달하거나 진동 주기가 다른 단 하나의 이상 셀을 포착합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "즉각적인 클릭으로 반응 시간 기록",
      "text": "이상 펄스를 인지하는 즉시 클릭하여 밀리초 단위의 시간 분해능 및 정확도 점수를 기록합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly#step-4"
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
      "name": "시각 리듬 검사(Rhythm Anomaly Drill)는 무엇을 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 시간 주파수 변별력과 시간 분해능을 측정합니다. 36개의 맥동 셀 중 위상과 깜빡임 주기가 미세하게 어긋난 이상 셀을 얼마나 신속하고 정확하게 식별하는지 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "인간 시각계는 어떻게 비동기 펄스와 위상차를 감지하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막의 대세포(M) 경로를 통해 감지합니다. M 경로는 고속 휘도 변화에 민감하며, 이상 셀의 위상 선행 신호가 뇌의 일차 시각 피질에서 전주의적 팝아웃 신호를 유발합니다."
      }
    },
    {
      "@type": "Question",
      "name": "대세포 경로(M)와 소세포 경로(P)의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대세포 경로는 넓은 수용야와 빠른 전도 속도를 지녀 움직임, 플리커, 시간 변화 처리에 최적화되어 있습니다. 소세포 경로는 정밀한 색채와 공간 디테일 처리에 특화되어 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "임계 융합 빈도(CFF)란 무엇이며 반응속도와 어떤 관련이 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단속적인 빛의 깜빡임이 하나의 연속된 빛으로 보이는 한계 주파수(35~60Hz)입니다. CFF 수치가 높을수록 뇌의 시각 적분 시간이 짧고 동적 정보 처리 속도가 뛰어남을 의미합니다."
      }
    },
    {
      "@type": "Question",
      "name": "45초 테스트에서 우수한 점수는 몇 점인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "초보자는 50~99점(레벨 2~3), 숙련자는 100~149점을 기록합니다. e스포츠 프로게이머나 엘리트 선수는 150~200점 이상 및 10회 이상의 연속 성공 스트릭을 달성합니다."
      }
    },
    {
      "@type": "Question",
      "name": "연속 성공 시 격자 속도가 빨라지는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "정답을 연속으로 맞출수록 기준 맥동 속도가 가속되고 이상 셀과의 시간차(Delta-T)가 좁혀져, 시각 시스템이 생리학적 시간 분해능의 극한까지 훈련되도록 설계되었기 때문입니다."
      }
    },
    {
      "@type": "Question",
      "name": "무작위 엔트로피 섬광(Entropy Scramble)의 목적은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "순간적인 밝기 변화만으로 타겟을 찾는 편법을 차단하고, 뇌가 단발성 노이즈와 진짜 주기적인 정현파 진동을 능동적으로 구분하도록 강제하기 위한 시각 잡음 장치입니다."
      }
    },
    {
      "@type": "Question",
      "name": "오클릭이나 시간 초과 시 점수 감점 페널티가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "감점이나 남은 시간 차감은 없습니다. 오클릭 시 화면에 붉은 섬광이 표시되고 연속 스트릭만 초기화되므로 자신감 있게 빠른 결단을 내리는 것이 유리합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(60Hz vs 144Hz+)이 시각 시간 인지에 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 60Hz는 16.7ms마다 화면이 갱신되지만, 144Hz~240Hz는 6.9~4.2ms 간격으로 갱신되어 매끄러운 펄스 곡선을 렌더링하므로 미세한 위상차를 훨씬 선명하게 포착할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "e스포츠 게이머와 운동선수에게 시각 리듬 훈련이 왜 유용한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "투수의 투구 궤적, 격투 게임의 선행 프레임, FPS 게임의 피킹 움직임 등 결정적 찰나를 뇌가 남들보다 수십 밀리초 먼저 시간적으로 분리 인식하여 반응 속도를 극대화해 줍니다."
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
      <RhythmAnomalyClient copy={{ title: "시각 리듬 아노말리 판별 게임" }} />
      <DrillGuide
        eyebrow="시간 심리물리학 & 시각 크로노메트리"
        title="시각 리듬, 플리커 융합 빈도 및 시간 주파수 변별력의 신경과학"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `전통적인 시력 검사는 망막 공간에서 미세한 디테일을 분별하는 '공간 분해능'만을 측정하지만, 현실 세계의 반응 속도와 운동 수행 능력은 연속된 시각 자극을 시간적으로 분리해내는 <em>시간 분해능(Temporal Resolution)</em>에 의해 결정됩니다. 야구 타격, 테니스 서브 리턴, e스포츠의 반응 속도, 도로 주행 시 돌발 장애물 감지는 정적 시력이 아니라 대뇌 시각 피질이 시간에 따라 변하는 광학 신호를 얼마나 빠른 속도로 샘플링할 수 있는가에 달려 있습니다 (De Lange, 1958; Kelly, 1961; Holcombe, 2009).` }} />

        <h3>시간적 변조 전달과 대세포 시각 경로(M-Pathway)</h3>
        <p dangerouslySetInnerHTML={{ __html: `인간의 시각 신경로는 크게 소세포 경로(P-Pathway)와 대세포 경로(M-Pathway)로 나뉩니다. 소세포 경로는 정밀한 색상과 형태를 담당하는 반면, 대세포 경로는 굵고 유수화된 신경 섬유를 통해 자극을 뇌의 등쪽 시각 경로(Dorsal Stream)로 광속 전달합니다. 최소화된 전도 지연 덕분에 M 경로는 40~50Hz에 달하는 고주파 깜빡임과 위상 변화를 감지하는 데 최적화되어 있습니다 (De Lange, 1958; Holcombe, 2009). 36개 셀 격자에서 단 하나의 셀이 다른 주기로 점멸할 때 발생하는 미세한 위상차는 일차 시각 피질(V1)에서 자동적이고 전주의적인 '팝아웃(Pop-out)' 현상을 촉발합니다 (Kelly, 1961; Burr, 1980).` }} />

        <h3>시간 시각의 두 가지 한계: 빠른 하위 샘플링 vs 느린 대뇌 결합</h3>
        <p dangerouslySetInnerHTML={{ __html: `시각적 시간 정보 처리에 관한 기념비적인 메타 분석에서, Holcombe(2009)은 인간의 시간 지각이 두 가지 독립된 생리학적 한계에 의해 지배된다는 사실을 입증했습니다:` }} />
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>피질하 저수준 샘플링 한계(~40–50 Hz):</strong> 망막 대세포 신경절 세포와 초기 V1 뉴런은 40Hz를 초과하는 고속 명멸 및 국소 휘도 대비를 전주의적으로 해상할 수 있습니다 (De Lange, 1958; Kelly, 1961).
          </li>
          <li>
            <strong>대뇌 피질 고수준 결합 한계(~2–5 Hz):</strong> 자극의 정체를 의식적으로 식별하고 다중 특징을 하나의 통합된 객체로 인지하는 데는 초당 2~5주기로 작동하는 느린 피질 되먹임 루프가 필요합니다 (Holcombe, 2009).
          </li>
        </ul>
        <p dangerouslySetInnerHTML={{ __html: `리듬 아노말리(Rhythm Anomaly) 훈련은 이 두 시스템을 잇는 신경학적 교량을 정밀하게 단련합니다. 훈련자는 조기 대세포 명멸 감수성을 통해 이상 펄스 후보를 전주의적으로 포착한 후, 펄스 주기가 끝나기 전에 하향식 주의 검증을 전광석화처럼 완수해야 합니다.` }} />

        <h3>시간 적분 창(Temporal Integration Window)과 엔트로피 노이즈</h3>
        <p dangerouslySetInnerHTML={{ __html: `인간의 시각계는 약 30~100밀리초의 짧은 시간 창 동안 유입되는 빛을 하나로 통합합니다 (Burr, 1980; Woods et al., 2015). 이 적분 창 내에서 발생하는 자극들은 단일 시각 사건으로 융합됩니다. 본 훈련에서 무작위로 발생하는 '엔트로피 섬광'은 시각 적분 창에 일시적 잡음을 주입하여, 단순한 순간 광량 변화에 의존하는 것을 방지하고 뇌가 진정한 정현파 주기성을 판별하도록 훈련합니다 (Burr, 1980; Posner, 1980).` }} />

        <h3>시각 시간 분해능 등급 기준 (45초 맥동 격자)</h3>
        <p dangerouslySetInnerHTML={{ __html: `36개 맥동 셀 격자에서 45초 동안 진행되는 표준화된 테스트 데이터를 기반으로, 개인의 시간 주파수 판별력은 5단계의 인지 등급으로 분류됩니다:` }} />
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">등급</th>
                <th className="py-2.5 px-3 font-semibold">분류 명칭</th>
                <th className="py-2.5 px-3 font-semibold">45초 점수</th>
                <th className="py-2.5 px-3 font-semibold">스피드 레벨</th>
                <th className="py-2.5 px-3 font-semibold">델타-T 분별창</th>
                <th className="py-2.5 px-3 font-semibold">시간 인지 프로필</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">크로노 마스터</td>
                <td className="py-2.5 px-3 tabular-nums">200+ PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 8+</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 60 ms</td>
                <td className="py-2.5 px-3">순간적 위상차 감지; 완벽한 잡음 여과; CFF 한계 근접 민감도.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">페이즈 디텍터</td>
                <td className="py-2.5 px-3 tabular-nums">150–199 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 6–7</td>
                <td className="py-2.5 px-3 tabular-nums">60–90 ms</td>
                <td className="py-2.5 px-3">탁월한 시간 분해능; 1~2주기 이내에 이상 펄스 고속 판별.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">숙련 리드미스트</td>
                <td className="py-2.5 px-3 tabular-nums">100–149 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 4–5</td>
                <td className="py-2.5 px-3 tabular-nums">91–130 ms</td>
                <td className="py-2.5 px-3">안정적인 주기 변별; 격자 속도 상승 시 일시적 적응 지연.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">발달 인지자</td>
                <td className="py-2.5 px-3 tabular-nums">50–99 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 2–3</td>
                <td className="py-2.5 px-3 tabular-nums">131–180 ms</td>
                <td className="py-2.5 px-3">순차적 셀 탐색 의존; 엔트로피 무작위 섬광에 간헐적 교란.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">시간적 융합</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 50 PTS</td>
                <td className="py-2.5 px-3 tabular-nums">Level 1</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 180 ms</td>
                <td className="py-2.5 px-3">넓은 시간 적분 흐림; 미세한 펄스 주파수 차이 식별에 난항.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>시간 분해능 극대화를 위한 실전 훈련 수칙</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>대세포 탈력 포커스 유지:</strong> 개별 셀을 하나씩 훑는 순차적 응시는 피해야 합니다. 6x6 격자 중앙에 시선을 부드럽게 고정하고 주변 시야를 넓히면 대세포의 넓은 수용야가 시야 전체의 주기 변화를 훨씬 효율적으로 감지합니다 (Holcombe, 2009).
          </li>
          <li>
            <strong>위상 파면 비교법 활용:</strong> &apos;선행 피크&apos;를 노리세요. 이상 셀은 더 빠른 주파수로 진동하므로 주변 셀보다 수십 밀리초 먼저 최대 밝기에 도달하며 눈에 띄는 위상차 파면을 형성합니다 (Kelly, 1961).
          </li>
          <li>
            <strong>엔트로피 노이즈 필터링:</strong> 일회성 단발 섬광(잡음)과 지속적인 주기적 맥동(목표)을 구분하세요. 150~200ms 동안 깜빡임이 반복되는지 확인한 뒤 확신을 갖고 클릭합니다 (Burr, 1980).
          </li>
          <li>
            <strong>레벨 상승 시 템포 재조정:</strong> 연속 성공으로 속도 레벨이 오르면 0.2초간 새로운 기준 비트에 뇌의 내부 시계를 동기화하세요. 템포 불일치로 인한 오클릭을 완벽히 방지할 수 있습니다 (De Lange, 1958).
          </li>
        </ol>

        <h3>자주 묻는 질문 (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">시각 리듬 검사(Rhythm Anomaly Drill)는 무엇을 측정하나요?</h4>
            <p className="text-slate-300 mt-1">
              시각 시간 주파수 변별력과 시간 분해능을 측정합니다. 36개의 맥동 셀 중 위상과 깜빡임 주기가 미세하게 어긋난 이상 셀을 얼마나 신속하고 정확하게 식별하는지 평가합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">인간 시각계는 어떻게 비동기 펄스와 위상차를 감지하나요?</h4>
            <p className="text-slate-300 mt-1">
              망막의 대세포(M) 경로를 통해 감지합니다. M 경로는 고속 휘도 변화에 민감하며, 이상 셀의 위상 선행 신호가 뇌의 일차 시각 피질에서 전주의적 팝아웃 신호를 유발합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">대세포 경로(M)와 소세포 경로(P)의 차이는 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              대세포 경로는 넓은 수용야와 빠른 전도 속도를 지녀 움직임, 플리커, 시간 변화 처리에 최적화되어 있습니다. 소세포 경로는 정밀한 색채와 공간 디테일 처리에 특화되어 있습니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">임계 융합 빈도(CFF)란 무엇이며 반응속도와 어떤 관련이 있나요?</h4>
            <p className="text-slate-300 mt-1">
              단속적인 빛의 깜빡임이 하나의 연속된 빛으로 보이는 한계 주파수(35~60Hz)입니다. CFF 수치가 높을수록 뇌의 시각 적분 시간이 짧고 동적 정보 처리 속도가 뛰어남을 의미합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">45초 테스트에서 우수한 점수는 몇 점인가요?</h4>
            <p className="text-slate-300 mt-1">
              초보자는 50~99점(레벨 2~3), 숙련자는 100~149점을 기록합니다. e스포츠 프로게이머나 엘리트 선수는 150~200점 이상 및 10회 이상의 연속 성공 스트릭을 달성합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">연속 성공 시 격자 속도가 빨라지는 이유는 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              정답을 연속으로 맞출수록 기준 맥동 속도가 가속되고 이상 셀과의 시간차(Delta-T)가 좁혀져, 시각 시스템이 생리학적 시간 분해능의 극한까지 훈련되도록 설계되었기 때문입니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">무작위 엔트로피 섬광(Entropy Scramble)의 목적은 무엇인가요?</h4>
            <p className="text-slate-300 mt-1">
              순간적인 밝기 변화만으로 타겟을 찾는 편법을 차단하고, 뇌가 단발성 노이즈와 진짜 주기적인 정현파 진동을 능동적으로 구분하도록 강제하기 위한 시각 잡음 장치입니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">오클릭이나 시간 초과 시 점수 감점 페널티가 있나요?</h4>
            <p className="text-slate-300 mt-1">
              감점이나 남은 시간 차감은 없습니다. 오클릭 시 화면에 붉은 섬광이 표시되고 연속 스트릭만 초기화되므로 자신감 있게 빠른 결단을 내리는 것이 유리합니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">모니터 주사율(60Hz vs 144Hz+)이 시각 시간 인지에 영향을 주나요?</h4>
            <p className="text-slate-300 mt-1">
              네. 60Hz는 16.7ms마다 화면이 갱신되지만, 144Hz~240Hz는 6.9~4.2ms 간격으로 갱신되어 매끄러운 펄스 곡선을 렌더링하므로 미세한 위상차를 훨씬 선명하게 포착할 수 있습니다.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">e스포츠 게이머와 운동선수에게 시각 리듬 훈련이 왜 유용한가요?</h4>
            <p className="text-slate-300 mt-1">
              투수의 투구 궤적, 격투 게임의 선행 프레임, FPS 게임의 피킹 움직임 등 결정적 찰나를 뇌가 남들보다 수십 밀리초 먼저 시간적으로 분리 인식하여 반응 속도를 극대화해 줍니다.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/visual-recognition/rhythm-anomaly" />
      </div>
    </>
  );
}
