import AimTrainerClient from '@/app/drills/motor/hand-eye-coordination/aim-trainer/AimTrainerClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (motor / hand-eye-coordination / aim-trainer)
// PRIMARY DOMESTIC: "에임연습" — 1,014 exact / 1,465 broad Bing searches/mo (Domestic #1 winner)
//                   "에임 연습" — 229 exact / 1,891 broad searches/mo
//                   "에임 연습 사이트" — 775 exact searches/mo (Web tool intent)
// SECONDARY / LSI:
//                   "발로란트 에임 연습 사이트" — 512 exact searches/mo
//                   "에임연습 사이트" — 238 exact searches/mo
//                   "aim trainer" — 183 exact / 337 broad searches/mo
//                   "발로란트 에임 연습" — 165 exact searches/mo
//                   "발로 에임 연습 사이트" — 190 exact searches/mo
// WINNER TITLE:     에임 연습 사이트 – 무료 온라인 FPS 에임 트레이너・마우스 정확도 측정 | SkillDrills
// ============================================================

export const metadata = {
  title: '에임 연습 사이트 – 무료 온라인 FPS 에임 트레이너・마우스 정확도 측정 | SkillDrills',
  description:
    '설치 없이 브라우저에서 바로 실행하는 무료 에임 연습 사이트. 화면에 나타나는 동적 타겟을 빠르게 격파하며 마우스 플릭 정확도와 초탄 포착 속도를 피츠의 법칙 기반으로 단련하세요. 발로란트, 오버워치, CS2 랭크전 전 워밍업에 최적화.',
  keywords: ['에임 연습', '에임 연습 사이트', 'fps 에임 트레이너', '마우스 정확도 테스트', '플릭샷 연습', '초탄 정확도 훈련', '피츠의 법칙 에임', '발로란트 에임 연습', '에임 트레이너 온라인', '반응속도 에임 측정', '마우스 감도 적응 훈련', '오버워치 에임 연습'],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/aim-trainer'),
  },
  openGraph: {
    title: '에임 연습 사이트 – 무료 온라인 FPS 에임 트레이너・마우스 정확도 측정 | SkillDrills',
    description:
      '무료 온라인 에임 연습 사이트. 동적 타겟을 정확히 조준하고 클릭하여 마우스 정확도와 플릭 반응 속도를 극대화하세요. 설치 불필요.',
    url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '에임 연습 사이트 – 무료 온라인 FPS 에임 트레이너・마우스 정확도 측정 | SkillDrills',
    description:
      '설치 없는 무료 브라우저 에임 트레이너. 마우스 정확도와 마이크로 플릭 속도를 단련하세요.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '운동 제어・마우스 조작', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 4, name: '시각-운동 협응', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 5, name: '에임 연습', item: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '에임 연습 사이트 – 무료 온라인 FPS 에임 트레이너',
  alternateName: ['에임연습', '에임 연습', '에임 연습 사이트', 'FPS 에임 트레이너', 'Aim Trainer Online'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹브라우저에서 설치 없이 실행되는 무료 에임 연습 사이트. 동적 타겟을 정확하게 타격하여 마우스 정확도와 반응 속도를 단련합니다.',
  browserRequirements: '자바스크립트 및 Pointer Lock을 지원하는 최신 브라우저',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '에임 연습 사이트 — 무료 온라인 FPS 에임 트레이너 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer',
  description:
    '무료 온라인 에임 연습 사이트. 점진적으로 축소되고 빨라지는 타겟을 클릭하여 마우스 정확도를 정밀하게 강화합니다.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트 및 마우스 포인터 락 API 지원 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '에임 정확도, 마우스 플릭, 초탄 반응 속도, 시각-운동 협응, 피츠의 법칙 탄도 제어',
};


const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "에임 연습 (Aim Trainer)",
  "url": "https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer",
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
  name: '에임 연습 사이트 이용 방법 및 조준 훈련 단계',
  description: 'SkillDrills 에임 연습 훈련을 통해 마우스 조준 능력을 향상시키는 체계적인 4단계 방법.',
  step: [
    {
      '@type': 'HowToStep',
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer#step-1",
      
      name: '훈련 시작 및 커서 잠금',
      text: '「훈련 시작」 버튼을 클릭하여 화면 중앙에 마우스 포인터를 고정하고 전체 화면 훈련에 돌입합니다.',
    },
    {
      '@type': 'HowToStep',
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer#step-2",
      
      name: '타겟 위치 시각적 인식',
      text: '화면에 랜덤으로 생성되어 이동하는 타겟을 시선으로 즉시 포착합니다.',
    },
    {
      '@type': 'HowToStep',
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer#step-3",
      
      name: '탄도 플릭 및 정밀 격발',
      text: '마우스를 신속하게 가속하여 타겟 근처로 이동시킨 후, 미세 감속 제어로 타겟 중심을 클릭합니다.',
    },
    {
      '@type': 'HowToStep',
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/motor/hand-eye-coordination/aim-trainer#step-4",
      
      name: '콤보 유지 및 고난도 돌입',
      text: '실수 없이 연속 타격하여 3.0배 최대 콤보를 누적하고 더 높은 레벨의 축소 타겟을 제어합니다.',
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
      name: '에임 연습(Aim Trainer)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '에임 연습은 마우스 커서를 목표물로 얼마나 빠르고 정확하게 이동시켜 격발하는지 측정하고 단련하는 웹 기반 훈련 도구입니다. 발로란트나 오버워치 등 실전 FPS 교전 시 마이크로 플릭 능력을 향상시킵니다.',
      },
    },
    {
      '@type': 'Question',
      name: '피츠의 법칙(Fitts\'s Law)이 에임 훈련에 어떻게 적용되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피츠의 법칙은 타겟까지의 거리와 타겟 크기의 비율에 따라 운동 시간이 결정된다는 인체공학 법칙입니다. 타겟이 작아질수록 난이도 지수(ID)가 기하급수적으로 상승하여 고도의 정밀 제어가 요구됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '2요소 조준 모델(탄도 가속과 종말 감속)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '목표 지향적 조준은 이동 거리의 80~90%를 단숨에 도약하는 오픈루프 탄도 가속과, 착탄 직전 시각 피드백을 통해 오차를 보정하는 클로즈드루프 종말 감속의 두 단계로 이루어집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 배틀그라운드 실력 향상에 직접적인 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 매우 직접적인 도움이 됩니다. 전술 슈팅 게임에서 승패를 가르는 5~15도 각도의 헤드샷 마이크로 플릭과 초탄 착탄 타이밍을 집중적으로 단련할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '에임 연습 점수 기준표는 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '입문자는 8,000점 미만, 일반적인 중급 게이머는 18,000~31,999점(레벨 6~8), 상위 랭커는 32,000점 이상, 프로 수준의 최상위권은 48,000점 이상(레벨 12 이상, 명중률 95% 초과)을 기록합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '난이도는 어떤 방식으로 점진적 상승하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1,750점마다 레벨이 오릅니다. 레벨이 오를 때마다 타겟 반경이 26px에서 8px로 축소되고, 이동 속도는 80px/s에서 370px/s로 가속되며 생존 시간은 2.8초에서 0.40초까지 짧아집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '빗맞히거나 타겟을 놓치면 어떤 불이익이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '타겟을 빗맞히거나 시간 내에 클릭하지 못하면 콤보 배율이 1.0배로 초기화됩니다. 이를 통해 무분별한 난사를 방지하고 정확한 초탄 조준을 유도합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '게임 내 마우스 감도(eDPI/cm당 회전각)를 맞출 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, Pointer Lock API를 통한 순수 마우스 로우 인풋을 지원하며 허브의 글로벌 마우스 감도 슬라이더와 연동되어 실제 인게임과 동일한 마우스 물리 이동 거리를 유지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율이나 마우스 폴링레이트가 점수에 영향을 미치나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 144Hz 이상의 고주사율 모니터와 1000Hz 폴링레이트 마우스는 렌더링 지연을 10ms 이상 단축시켜 최종 종말 감속 단계에서 망막 피드백 오차를 크게 줄여줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '랭크전 전 최적의 일일 워밍업 시간은 얼마인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '본 게임 시작 전 10~15분 동안 속도보다는 90% 이상의 높은 명중률을 유지하며 손목과 손가락 근육을 활성화하는 루틴이 가장 뛰어난 효과를 보입니다.',
      },
    },
  ],
};

export default function AimTrainerKoreanPage() {
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
          title: '에임 연습 (Aim Trainer)',
          subtitle: '동적 타겟 에임・정밀 클릭 타이밍・무제한 레벨 스케일링',
          caption: '화면에 나타나 축소되는 타겟을 소멸하기 전 신속하고 정확하게 클릭하세요. 피츠의 법칙 기반 동적 정밀도 훈련.',
          startButtonText: '훈련 시작',
          playAgainText: '다시 도전',
          shareText: '결과 공유',
          exitText: '나가기',
          rulesTitle: '드릴 조작법 & 점수 획득 규칙',
          aboutTitle: '에임 연습(Aim Trainer Elite)에 대하여',
          rulesItems: [
            {
              num: "1",
              text: "타겟 명중",
              highlight: "+100점 / +0.6초",
              result: "동적 이동 타겟 신속 포착 및 격발"
            },
            {
              num: "2",
              text: "연속 콤보",
              highlight: "최대 3.0배 배율",
              result: "연속 클린 히트로 점수 배율 극대화"
            },
            {
              num: "3",
              text: "레벨 상승",
              highlight: "1750점마다 레벨업",
              result: "타겟 축소 및 이동 속도 가속화"
            },
            {
              num: "4",
              text: "미스 및 타임아웃",
              highlight: "콤보 리셋",
              result: "페널티 활성화 시 -0.8초 차감"
            }
          ]
        }}
      />

      <DrillGuide
        eyebrow="운동 제어 정신물리학 & 인간-컴퓨터 상호작용 (HCI)"
        title="에임 연습의 과학: 피츠의 법칙과 2요소 운동 모델을 통한 마우스 정밀도 극대화"
        sources={sources}
      >
        <p>
          컴퓨터 마우스를 사용한 타겟 포착(Target Acquisition)은 인간-컴퓨터 상호작용(HCI)과 스포츠 정신물리학 분야에서 가장 정밀한 미세 운동 협응 과제 중 하나입니다. 택티컬 FPS 교전 상황에서 모퉁이를 클리어하거나 로봇 수술을 수행할 때, 인간 신경근 시스템은 2차원 시각 좌표를 손, 손목, 전완근의 마이크로 단위 급속 근수축으로 즉각 변환해야 합니다 (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>피츠의 법칙(Fitts&apos;s Law)과 난이도 지수(ID)</h3>
        <p>
          1954년 폴 M. 피츠는 목표 영역으로 빠르게 이동하는 데 소요되는 운동 시간(\(MT\))이 목표물까지의 거리(\(D\))와 목표물의 폭이나 직경(\(W\))의 비율에 의해 대수적으로 결정됨을 증명했습니다:
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 my-3 text-center font-mono text-sm text-cyan-300">
          MT = a + b · log₂(2D / W) = a + b · ID
        </div>
        <p>
          이 대수적 요소를 <strong>난이도 지수(ID: Index of Difficulty)</strong>라고 부르며 비트 단위로 측정됩니다. SkillDrills의 <em>에임 연습</em>에서는 점수가 올라갈수록 타겟 직경(\(W\))이 26픽셀에서 8픽셀로 축소되고 이동 거리(\(D\))가 넓어집니다. 이는 난이도 지수를 급상승시켜 플레이어의 신경계 정보 처리 용량을 극한으로 시험합니다 (Fitts, 1954; MacKenzie, 1992).
        </p>

        <h3>목표 지향적 조준의 2요소 모델 (Woodworth 1899; Elliott et al. 2010)</h3>
        <p>
          고속 마우스 에이밍은 단일 연속 동작이 아닙니다. 우드워스(1899)와 현대 신경근 통합 이론을 정립한 엘리엇 등(2010)의 연구에 따르면, 조준 동작은 생리학적으로 서로 다른 두 단계로 구성됩니다:
        </p>
        <ol className="list-decimal pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>초기 탄도 임펄스 (오픈루프 단계):</strong> 중추신경계가 사전에 계획된 신경근 폭발을 방출하여 이동 거리의 80~90%를 단번에 도약합니다. 이 탄도 단계는 약 120~180밀리초 내에 이루어지므로 시각적 피드백으로 경로를 수정할 수 없습니다.
          </li>
          <li>
            <strong>종말 감속 제어 (클로즈드루프 단계):</strong> 크로스헤어가 타겟 경계에 접근함에 따라 시각 시스템이 망막 오차를 감지하고 소뇌와 운동피질을 거쳐 서브밀리미터 단위의 미세 수정을 거친 후 클릭을 발동합니다.
          </li>
        </ol>
        <p>
          초보자들은 흔히 <em>오버 플릭</em>(과도한 힘으로 지나친 후 되돌림)이나 <em>언더 플릭</em>(너무 일찍 멈추어 느리게 접근함)을 겪습니다. 엘리트 슈터는 탄도 임펄스를 타겟의 테두리에 정확히 도달하도록 최적화하여 종말 수정 오차를 최소화합니다 (Elliott et al., 2010; Woods et al., 2015).
        </p>

        <h3>입력 폴링율, 디스플레이 주사율 및 지연 시간</h3>
        <p>
          정밀한 클릭 타이밍은 시스템 레이턴시를 최소화할 때 완성됩니다. 우즈 등(2015)이 밝혀냈듯 인간의 신경 반응 지연은 망막 전달(~30–50ms), 시각피질 인지(~60–80ms), 척수운동 신경전달(~40–60ms)을 거칩니다. 60Hz 모니터에서는 16.7ms마다 프레임이 갱신되지만, 144Hz(6.9ms)나 240Hz(4.1ms)에서는 망막 피드백이 훨씬 일찍 전달되어 종말 감속 단계의 오차 보정이 극대화됩니다.
        </p>

        <h3>에임 연습 실력 평가 기준표 (45초 세션 기준)</h3>
        <p>
          아래 표는 SkillDrills의 45초 세션 기준 점수, 명중률 및 최대 콤보를 기반으로 한 게이머 실력 지표입니다.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">티어</th>
                <th className="p-2.5 border border-white/10 font-bold">세션 점수</th>
                <th className="p-2.5 border border-white/10 font-bold">최고 레벨</th>
                <th className="p-2.5 border border-white/10 font-bold">명중률</th>
                <th className="p-2.5 border border-white/10 font-bold">실력 분류</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-emerald-400">Tier 1 (프로급)</td>
                <td className="p-2.5 border border-white/10">&gt; 48,000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 12+</td>
                <td className="p-2.5 border border-white/10">&gt; 95% (콤보 25+)</td>
                <td className="p-2.5 border border-white/10">최상위 FPS 랭커 / 프로급 명사수</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-cyan-400">Tier 2 (고수)</td>
                <td className="p-2.5 border border-white/10">32,000 – 47,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 9–11</td>
                <td className="p-2.5 border border-white/10">88% – 94% (콤보 18–24)</td>
                <td className="p-2.5 border border-white/10">경쟁전 상위권 / 정밀 플래거</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3 (중급)</td>
                <td className="p-2.5 border border-white/10">18,000 – 31,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 6–8</td>
                <td className="p-2.5 border border-white/10">78% – 87% (콤보 12–17)</td>
                <td className="p-2.5 border border-white/10">안정적인 에임 / 일반 경쟁전 유저</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 4 (초급)</td>
                <td className="p-2.5 border border-white/10">8,000 – 17,999 PTS</td>
                <td className="p-2.5 border border-white/10">Level 3–5</td>
                <td className="p-2.5 border border-white/10">65% – 77% (콤보 6–11)</td>
                <td className="p-2.5 border border-white/10">에임 개발 단계 / 미스샷 다수 발생</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-400">Tier 5 (입문)</td>
                <td className="p-2.5 border border-white/10">&lt; 8,000 PTS</td>
                <td className="p-2.5 border border-white/10">Level 1–2</td>
                <td className="p-2.5 border border-white/10">&lt; 65% (콤보 &lt; 6)</td>
                <td className="p-2.5 border border-white/10">에임 흔들림 심함 / 조급한 클릭 성향</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>에임 능력을 비약적으로 끌어올리는 4가지 실천법</h3>
        <p>
          표적 획득 잠복기를 체계적으로 단축하고 미세 플릭 정확도를 최고조로 끌어올리기 위해, 훈련 중 다음 네 가지 근거 중심의 신경운동 프로토콜을 적용하십시오:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>초기 탄도 임펄스 과감화 (Woodworth, 1899):</strong> 타겟까지의 거리 대부분을 주저함 없이 단숨에 도약하세요. 플릭 도중 멈칫거리지 않고 한 번의 호흡으로 목표점 부근까지 손을 밀어야 합니다.
          </li>
          <li>
            <strong>종말 감속과 미세 보정의 조화 (Fitts, 1954):</strong> 타겟 경계 부근에서 부드럽게 감속하여 손목과 손가락 끝으로 목표 중심을 안정적으로 맞추세요.
          </li>
          <li>
            <strong>감도 일치화 및 근육 기억 보존 (MacKenzie, 1992):</strong> 플레이하는 주 게임과 일치하는 감도를 설정하여 신경근 간섭을 방지하세요.
          </li>
          <li>
            <strong>클릭 시 그립 완화와 손가락 분리 (Woods et al., 2015):</strong> 마우스를 클릭할 때 손목 전체에 힘이 들어가 에임이 아래나 옆으로 틀어지지 않도록, 편안한 그립에서 검지만 가볍게 클릭하는 습관을 들이세요.
          </li>
        </ul>

        <h3>자주 묻는 질문 (FAQ)</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">에임 연습(Aim Trainer)이란 무엇인가요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              에임 연습은 마우스 커서를 목표물로 얼마나 빠르고 정확하게 이동시켜 격발하는지 측정하고 단련하는 웹 기반 훈련 도구입니다. 발로란트나 오버워치 등 실전 FPS 교전 시 마이크로 플릭 능력을 향상시킵니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">피츠의 법칙(Fitts&apos;s Law)이 에임 훈련에 어떻게 적용되나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              피츠의 법칙은 타겟까지의 거리와 타겟 크기의 비율에 따라 운동 시간이 결정된다는 인체공학 법칙입니다. 타겟이 작아질수록 난이도 지수(ID)가 기하급수적으로 상승하여 고도의 정밀 제어가 요구됩니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">2요소 조준 모델(탄도 가속과 종말 감속)이란 무엇인가요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              목표 지향적 조준은 이동 거리의 80~90%를 단숨에 도약하는 오픈루프 탄도 가속과, 착탄 직전 시각 피드백을 통해 오차를 보정하는 클로즈드루프 종말 감속의 두 단계로 이루어집니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">발로란트나 배틀그라운드 실력 향상에 직접적인 도움이 되나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              네, 매우 직접적인 도움이 됩니다. 전술 슈팅 게임에서 승패를 가르는 5~15도 각도의 헤드샷 마이크로 플릭과 초탄 착탄 타이밍을 집중적으로 단련할 수 있습니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">에임 연습 점수 기준표는 어떻게 되나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              입문자는 8,000점 미만, 일반적인 중급 게이머는 18,000~31,999점(레벨 6~8), 상위 랭커는 32,000점 이상, 프로 수준의 최상위권은 48,000점 이상(레벨 12 이상, 명중률 95% 초과)을 기록합니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">난이도는 어떤 방식으로 점진적 상승하나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              1,750점마다 레벨이 오릅니다. 레벨이 오를 때마다 타겟 반경이 26px에서 8px로 축소되고, 이동 속도는 80px/s에서 370px/s로 가속되며 생존 시간은 2.8초에서 0.40초까지 짧아집니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">빗맞히거나 타겟을 놓치면 어떤 불이익이 있나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              타겟을 빗맞히거나 시간 내에 클릭하지 못하면 콤보 배율이 1.0배로 초기화됩니다. 이를 통해 무분별한 난사를 방지하고 정확한 초탄 조준을 유도합니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">게임 내 마우스 감도(eDPI/cm당 회전각)를 맞출 수 있나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              네, Pointer Lock API를 통한 순수 마우스 로우 인풋을 지원하며 허브의 글로벌 마우스 감도 슬라이더와 연동되어 실제 인게임과 동일한 마우스 물리 이동 거리를 유지할 수 있습니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">모니터 주사율이나 마우스 폴링레이트가 점수에 영향을 미치나요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              네, 144Hz 이상의 고주사율 모니터와 1000Hz 폴링레이트 마우스는 렌더링 지연을 10ms 이상 단축시켜 최종 종말 감속 단계에서 망막 피드백 오차를 크게 줄여줍니다.
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">랭크전 전 최적의 일일 워밍업 시간은 얼마인가요?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              본 게임 시작 전 10~15분 동안 속도보다는 90% 이상의 높은 명중률을 유지하며 손목과 손가락 근육을 활성화하는 루틴이 가장 뛰어난 효과를 보입니다.
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/aim-trainer"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
