import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (cognitive/focus/distraction-fighter)
// PRIMARY:  "스트룹 검사"                    — Top Korean psychological/clinical test query
//           "스트룹 효과"                    — High volume educational & cognitive query
// SECONDARY / LSI:
//           "스트룹 테스트 온라인"           — Direct web tool search intent
//           "인지 억제 검사"                 — Cognitive inhibition mechanism
//           "선택적 주의력 검사"             — Selective attention search term
//           "집중력 테스트 게임"             — Focus game casual intent
//           "충동 억제 훈련"                 — Impulse control training phrase
//           "뇌 인지 훈련 무료"              — Free brain training category term
// WINNER TITLE: 스트룹 검사 – 무료 온라인 인지 억제 집중력 테스트 | SkillDrills
// ============================================================

export const metadata = {
  title: "스트룹 검사 – 무료 온라인 인지 억제 집중력 테스트 | SkillDrills",
  description: "무료 온라인 스트룹 검사(Stroop Test) 사이트. 글자의 의미를 무시하고 글자 색상을 빠르게 판단하여 인지 억제 조절 능력과 선택적 주의 집중력을 단련하세요.",
  keywords: [
    "스트룹 검사",
    "스트룹 효과",
    "스트룹 테스트 온라인",
    "인지 억제 검사",
    "선택적 주의력 검사",
    "집중력 테스트 게임",
    "충동 억제 훈련",
    "뇌 인지 훈련 무료",
    "전두엽 기능 검사",
    "정보 처리 속도 테스트"
  ],
  openGraph: {
    title: "스트룹 검사 – 무료 온라인 인지 억제 집중력 테스트 | SkillDrills",
    description: "무료 온라인 스트룹 검사(Stroop Test) 사이트. 글자의 의미를 무시하고 글자 색상을 빠르게 판단하여 인지 억제 조절 능력과 선택적 주의 집중력을 단련하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "스트룹 검사 – 무료 온라인 인지 억제 집중력 테스트 | SkillDrills",
    description: "무료 온라인 스트룹 검사(Stroop Test) 사이트. 글자의 의미를 무시하고 글자 색상을 빠르게 판단하여 인지 억제 조절 능력과 선택적 주의 집중력을 단련하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter",
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter'),
  },
};

export default function DistractionFighterPageKo() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "인지 드릴", "item": "https://skilldrills.online/ko/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "스트룹 검사", "item": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "스트룹 검사 온라인 (Stroop Test)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 온라인 스트룹 검사(Stroop Test). 인지 억제 조절 능력과 선택적 주의력을 측정하고 단련합니다.",
    "genre": "인지 훈련 / 스트룹 효과 / 억제 조절",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "스트룹 검사 온라인 (Stroop Test)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "HTML5, JavaScript 지원 웹 브라우저",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 온라인 스트룹 검사(Stroop Test). 인지 억제 조절 능력과 선택적 주의력을 측정하고 단련합니다.",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "스트룹 검사 온라인 (Stroop Test)",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter",
    "description": "글자의 물리적 색상과 의미가 일치하지 않는 자극을 통해 전두엽 인지 억제 조절력을 훈련하는 뇌 인지 게임.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["인지 훈련", "두뇌 게임", "스트룹 검사", "집중력"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "스트룹 검사(Stroop Test)란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "스트룹 검사는 1935년 미국의 심리학자 J. 리들리 스트룹(J. Ridley Stroop)이 발표한 고전적인 인지 심리학 실험 과제입니다. '빨강'이라는 단어가 파란색 잉크로 인쇄되어 있을 때, 단어의 의미를 무시하고 잉크 색상인 '파랑'을 신속하게 맞히는 과정을 통해 뇌의 인지적 억제 제어력과 선택적 주의력을 측정합니다."
        }
      },
      {
        "@type": "Question",
        "name": "스트룹 효과(Stroop Effect)가 발생하는 뇌 과학적 원리는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "인간에게 글자를 읽는 언어 처리 과정은 오랜 학습으로 인해 고도로 자동화(Automatized)되어 있어 의식하지 않아도 저절로 의미가 뇌에 주입됩니다. 반면 색상을 지각하여 명명하는 과정은 의도적인 노력이 필요합니다. 자동적 반응과 의도적 판단이 충돌할 때 발생하는 지연 현상을 스트룹 효과라고 합니다 (MacLeod, 1991)."
        }
      },
      {
        "@type": "Question",
        "name": "인지 억제 기능(Inhibitory Control)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "목표 달성에 방해가 되는 불필요한 생각, 자동적 충동, 주변의 자극을 스스로 억제하고 통제하는 전두엽의 핵심 실행 기능(Executive Function)입니다. 충동 제어, 잡념 차단, 집중력 유지의 근간이 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "스트룹 테스트 점수를 높이는 효과적인 비결이 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "글자를 머릿속으로 발음(속발음)하지 말고, 글자의 윤곽선이나 외곽 픽셀의 물리적 색조 자체를 하나의 기하학적 도형처럼 지각하는 것이 효과적입니다. 무리한 속도보다는 정확한 리듬을 유지하세요."
        }
      },
      {
        "@type": "Question",
        "name": "이 검사는 뇌의 어느 부위를 활성화하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "목표 유지를 담당하는 배외측 전전두피질(DLPFC)과 인지적 갈등을 감지하고 해결하는 전방 대상피질(ACC)이 강력하게 활성화됩니다 (Posner & Petersen, 1990)."
        }
      },
      {
        "@type": "Question",
        "name": "에릭센 플랑커(Flanker) 과제와는 어떻게 다른가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "스트룹 검사는 단일 자극 내부의 모순(단어 의미 vs 색상)을 억제하는 과제이며, 플랑커 과제는 공간적으로 인접한 외부 방해물(예: 반대 방향 화살표들)을 차단하는 능력을 측정합니다."
        }
      },
      {
        "@type": "Question",
        "name": "직장 업무나 공부 집중력 향상에도 실질적인 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 스마트폰 알림, 주변 대화 소음 등 산만한 환경에서 불필요한 자극을 걸러내는 뇌의 에너지 소모를 줄여주어 딥워크(Deep Work) 몰입 시간을 획기적으로 늘려줍니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 검사로 ADHD나 인지 장애를 진단할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "아닙니다. 본 사이트의 도구는 두뇌 훈련 및 자기 점검용 웹 기반 드릴이며 의료 진단 기기가 아닙니다. 의학적 진단은 반드시 정신건강의학과 전문의와 상담하시기 바랍니다."
        }
      },
      {
        "@type": "Question",
        "name": "오답을 누르면 어떤 페널티가 주어지나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "잘못된 색상을 누르면 연속 콤보 배율이 초기화됩니다. 시간 페널티 설정을 켠 상태에서는 0.8초의 잔여 시간이 차감됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "모바일 스마트폰에서도 무료로 플레이할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 완전 무료이며 별도의 앱 설치나 가입 없이 모바일과 PC 브라우저에서 화면 터치로 즉시 이용할 수 있습니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "스트룹 검사로 인지 억제력을 단련하는 4단계",
    "description": "스트룹 색상-단어 간섭 과제를 통해 전두엽 억제 제어력을 극대화하는 훈련법.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "화면 중앙의 색상 단어 주시",
        "text": "제시된 단어(예: 빨간색 잉크로 적힌 '파랑')를 속으로 읽지 않고 바라봅니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "자동적인 글자 읽기 충동 능동 억제",
        "text": "'파랑'이라는 의미의 침투를 차단하고 잉크의 실제 물리적 색상(빨강)에만 시각 초점을 맞춥니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "하단에서 글자 색상에 해당하는 버튼 터치",
        "text": "글자 뜻이 아닌 실제 잉크 색상 버튼(빨강)을 지체 없이 선택합니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "콤보 유지 및 반응 속도 가속화",
        "text": "오답 없이 연속 정답을 기록하여 콤보 점수를 쌓고 고난도 레벨에 도달합니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/distraction-fighter#step-4"
      }
    ]
  };

  const distractionFighterGuide = {
    heading: "스트룹 검사 완벽 가이드 & 인지 억제 조절의 신경과학",
    intro: [
      "스트룹 효과(Stroop Effect)는 1935년 J. 리들리 스트룹(J. Ridley Stroop)에 의해 학계에 보고된 이래 인지 심리학과 뇌 인지 과학 역사상 가장 널리 입증된 현상입니다. 글자의 의미와 물리적 잉크 색상이 일치하지 않을 때(예: 빨간색으로 쓰인 '파랑'), 인간의 판단 속도는 급격히 느려지고 실수 확률이 증가합니다.",
      "인지 신경과학적으로 성인의 글자 읽기(독해)는 일상적인 반복을 통해 무의식적이고 자동화된(Automatic) 프로세스로 굳어져 있습니다 (MacLeod, 1991). 반면 잉크의 색상을 식별하는 작업은 의식적인 노력을 요구합니다. 고든 D. 로건(Gordon D. Logan)과 넬슨 J. 코완(Nelson J. Cowan)의 경주 모델(Race Model, 1984)에 따르면, 자동화된 단어 읽기가 뇌의 인출 경쟁에서 우위를 점하므로, 전두엽이 이를 능동적으로 억제(Inhibition)하지 않으면 실수가 발생합니다.",
      "기능적 뇌 영상 촬영(fMRI) 결과에 따르면, 이러한 인지적 갈등 해결은 주로 전방 대상피질(ACC)과 배외측 전전두피질(DLPFC)의 신경망에 의해 매개됩니다 (Posner & Petersen, 1990). 규칙적인 스트룹 과제 훈련은 주변의 불필요한 자극을 순간적으로 차단하는 선택적 억제 조절 능력을 강화합니다.",
      "SkillDrills 스트룹 검사는 performance.now() 고해상도 디지털 시간 측정(Woods et al., 2015)을 적용하여 기기 지연 없는 정밀한 측정 데이터를 제공합니다."
    ],
    benchmarks: {
      title: "스트룹 검사 성능 등급 & 인지 억제 벤치마크 (45초 세션)",
      headers: ["퍼포먼스 티어", "세션 획득 점수", "적중 정확도", "신경 인지 평가"],
      rows: [
        ["Tier 1 (신속 / 초월적 억제력)", "18,000점 초과", "96% 이상", "완벽한 충동 차단; 글자 의미의 간섭을 완전히 배제하고 빛의 속도로 색상 분별"],
        ["Tier 2 (상급 / 엘리트 집중력)", "12,000 – 17,999점", "92 – 95%", "매우 낮은 스트룹 간섭; 안정적인 템포와 뛰어난 인지 유연성 보유"],
        ["Tier 3 (중급 / 건강한 일반 성인)", "7,000 – 11,999점", "85 – 91%", "일반적인 간섭 지연; 색상 대비가 강할 때 일시적인 망설임 발생"],
        ["Tier 4 (초급 / 빈번한 산만함)", "3,000 – 6,999점", "75 – 84%", "글자 읽기 충동에 쉽게 이끌림; 자극 밀도가 높아지면 반응 속도 저하"],
        ["Tier 5 (입문 / 고도 충동성)", "3,000점 미만", "75% 미만", "잦은 오답과 시간 초과; 뇌 피로도 또는 심한 집중력 저하 상태"]
      ],
      note: "45초 제한 시간 동안 난이도가 점진적으로 상승하는 표준 테스트 기준입니다 (Stroop, 1935; Woods et al., 2015)."
    },
    techniques: {
      title: "스트룹 간섭 극복을 위한 4가지 인지 전략",
      items: [
        {
          name: "글자 외곽선의 물리적 형상 집중",
          desc: "단어의 중심부를 읽지 말고 글자의 테두리나 픽셀 색상에 시각을 고정하여 언어 중추의 자동 활성화를 방지하세요.",
          tips: "단어를 글자가 아닌 하나의 추상적 컬러 그래픽으로 인식하세요."
        },
        {
          name: "머릿속 속발음(Subvocalization) 차단",
          desc: "단어를 소리 내어 읽으면 언어 뇌의 간섭이 심해집니다. 시각적 색상 정보를 음성 변환 없이 바로 손가락 운동 반응으로 연결하세요.",
          tips: "입술과 혀의 긴장을 풀고 편안하게 호흡하세요."
        },
        {
          name: "안정적인 탭 템포 유지",
          desc: "과도하게 서두르면 자동적인 읽기 충동에 굴복하게 됩니다. 한 박자 차분하게 색을 확인한 후 누르는 리듬이 최고 점수를 만듭니다.",
          tips: "속도보다 정확도가 우선입니다. 연속 정답 콤보가 점수를 기하급수적으로 높입니다."
        },
        {
          name: "짧고 집중적인 데일리 세션",
          desc: "인지 억제는 전두엽의 에너지를 빠르게 소모합니다. 하루 3~5분씩 집중하여 반복 훈련하는 것이 신경가소성 형성에 가장 유리합니다.",
          tips: "공부나 중요한 업무를 시작하기 전 뇌를 깨우는 웜업으로 활용하세요."
        }
      ]
    },
    steps: [
      "시작을 누르고 화면 정중앙에 시선을 고정합니다.",
      "의미와 색상이 다른 단어가 깜빡이며 나타납니다 (예: 노란색 글씨로 쓰인 '파랑').",
      "'파랑'이라는 단어를 읽지 말고 노란색이라는 시각 정보를 파악합니다.",
      "하단의 보기 중에서 실제 잉크 색상인 '노랑' 버튼을 터치합니다.",
      "정답 콤보를 이어가며 제한 시간 45초 동안 최고 레벨에 도전합니다."
    ],
    audience: "주의 집중력 강화가 필요한 수험생, 직장인, 멀티태스킹 환경에서 업무 효율을 극대화하고자 하는 전문가 및 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('macLeod1991', 'logan1984', 'posner1990', 'woods2015'),
    related: [
      { href: "/ko/drills/cognitive/focus/concentration-grid", label: "슐테 테이블 집중력 격자" },
      { href: "/ko/drills/cognitive/attention/concentration-stamina", label: "집중력 지구력 테스트" },
      { href: "/ko/drills/cognitive/processing-speed/symbol-matching", label: "기호 일치 속도 테스트" },
      { href: "/ko/drills/reaction-speed/reaction-game", label: "반응속도 테스트 게임" },
      { href: "/ko/drills/reaction-speed/reaction-time-test", label: "반응시간 측정 테스트" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <DistractionFighterClient
        copy={{
          title: "스트룹 검사",
          subtitle: "색상-단어 간섭 과제 & 인지 억제 제어",
          caption: "단어의 의미를 무시하고 실제 잉크 색상을 맞히세요. 자동화된 읽기와 색상 인지 간의 간섭 현상을 통해 뇌의 인지 억제 제어 능력을 측정합니다 (Stroop, 1935).",
          stageCaption: "단어의 의미를 무시하고 실제 글자 잉크 색상에 해당하는 버튼을 터치하세요.",
          rulesTitle: "훈련 규칙 & 점수 체계",
          aboutTitle: "스트룹 효과 & 인지 억제 제어 상세 안내",
          aboutText: "스트룹 효과는 단어의 의미와 잉크 색상이 다를 때 색상 명명 속도가 지연되는 현상입니다 (Stroop, 1935; MacLeod, 1991).\n\n글자 읽기는 고도로 자동화된 인지 프로세스입니다. 뇌는 무의식적으로 튀어나오는 읽기 반응을 전두엽에서 능동적으로 억제해야만 올바른 색상을 골라낼 수 있습니다.\n\n정기적인 훈련은 상위 인지 제어력을 단련하여 산만한 외부 자극 속에서도 깊은 집중력을 발휘하도록 돕습니다.",
          aboutCards: [
            { title: "누구에게 필요한가요?", desc: "주변 소음과 알림 속에서 집중력을 지켜야 하는 학습자, 직장인, 충동 제어 훈련이 필요한 모든 사람.", color: "bg-blue-600" },
            { title: "훈련되는 인지 역량", desc: "스트룹 간섭 저항력, 인지적 억제 제어, 하향식 주의 집중력, 자동 반사 억제.", color: "bg-emerald-600" },
            { title: "억제 조절 훈련", desc: "단어를 읽으려는 무의식적 충동을 누르고 시간 압박 속에서 순수한 색상 지각만을 분리해 터치합니다.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "스트룹 효과 과제", text: "화면에 색상 단어가 깜빡입니다 (예: 빨간색 잉크로 적힌 '파랑')." },
            { title: "목표 선택 규칙", text: "글자 뜻을 무시하고 실제 잉크 색상(예: 빨강) 버튼을 터치합니다 (+100점 × 콤보 × 레벨, +0.6초)." },
            { title: "오답 페널티", text: "오답 시 콤보가 초기화됩니다 (시간 페널티 설정 시 -0.8초). 45초 동안 게임은 계속 진행됩니다." },
            { title: "연속 콤보", text: "오답 없이 정답을 이어갈수록 점수 배율이 곱해지며, 레벨이 오를수록 선택지가 확장됩니다." }
          ]
        }}
      />
      <DrillGuide guide={distractionFighterGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/distraction-fighter"
          locale="ko"
        />
      </div>
    </>
  );
}
