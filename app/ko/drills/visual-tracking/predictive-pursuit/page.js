import PredictivePursuitClient from '@/app/drills/visual-tracking/predictive-pursuit/PredictivePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "예측 에임 연습" (Predictive aim practice) / "리드샷 연습"
// Secondary:    "예측 사격 훈련", "동체시력 선행 예측", "가림 궤적 추적", "프리에임 연습"
// LSI / Domain:  "소뇌 내부 모델", "원활추종 안구운동", "궤적 외삽", "가림 구간 오클루전",
//               "시각 작업 기억", "망막 슬립 지연", "피드포워드 모터 제어", "착지점 선행 시선"
// Authentic Domain Terms: 예측 에임(Predictive Aim), 리드샷(Lead Shot / Deflection Aim), 예측성 원활추종(Predictive Smooth Pursuit), 가림 구간(Visual Occlusion), 내부 전향 모델(Internal Forward Model), 궤적 외삽(Trajectory Extrapolation), 망막 슬립(Retinal Slip)
// ============================================================

export const metadata = {
  title: "예측 에임 연습・가림 궤적 예측 추적 – 예측성 원활추종 | SkillDrills",
  description: "장애물에 가려 일시적으로 소실되는 표적의 이동 궤적을 뇌의 소뇌 내부 모델로 예측하고, 재출현 위치에 시선을 선행 배치하는 무료 안구 훈련. 시각 작업 기억과 피드포워드 에임 강화. 무설치 웹 테스트.",
  keywords: [
    "예측 에임 연습",
    "리드샷 연습",
    "예측 사격 훈련",
    "동체시력 선행 예측",
    "가림 궤적 추적",
    "프리에임 연습",
    "소뇌 내부 모델",
    "원활추종 안구운동",
    "궤적 외삽",
    "가림 구간 오클루전",
    "시각 작업 기억",
    "피드포워드 모터 제어"
  ],
  openGraph: {
    title: "예측 에임 연습・가림 궤적 예측 추적 – 예측성 원활추종 | SkillDrills",
    description: "소실되는 표적의 이동 궤적을 소뇌 내부 모델로 예측하여 재출현 지점을 선점하는 무료 온라인 예측 에임 훈련.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "예측 에임 연습・가림 궤적 예측 추적 – 예측성 원활추종 | SkillDrills",
    description: "130~150ms의 시각 신경 지연을 소뇌 선행 예측으로 극복하는 과학적 예측 안구 추적 트레이너.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/predictive-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 운동", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "예측 에임 연습・가림 궤적 예측 추적 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "예측 에임 연습・가림 궤적 예측 추적 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "시각적 단서가 차단된 가림(오클루전) 구간에서 소뇌와 전두안구야의 내부 모델을 활용하여 표적의 이동 궤적을 외삽하고 선행 안구 추종을 수행하는 브라우저 기반 트레이닝 도구.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ko" },
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "예측 에임・가림 궤적 예측 추적기 (SkillDrills Predictive Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 canvas and JavaScript ES6+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit",
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "예측 에임 추적 훈련 (Predictive Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit",
  "description": "엄폐물 뒤로 사라지는 적의 속도와 방향을 계산하여 재출현 지점에 조준선을 선점 대기시키는 e스포츠 게이머용 시각 반응 훈련 게임.",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "예측성 원활추종과 리드샷 에임 훈련 프로토콜",
  "description": "감각운동 지연을 상쇄하고 뇌의 내부 모델을 가동하여 사라진 표적의 궤적을 완벽하게 외삽하는 4단계 절차.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "초기 속도 및 방향 벡터 추출",
      "text": "표적이 움직이기 시작하는 최초 100~200ms 동안 시선 중심와로 이동 궤적을 포착하고 속도 정보를 작업 기억에 입력합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "궤적선 비표시(가림) 상태에서의 멘탈 외삽",
      "text": "가이드 라인이 사라지거나 표적이 은폐 영역을 지나는 동안 시선을 멈추지 않고 머릿속으로 등속 운동 궤적을 그립니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "재출현 지점(착지점) 선행 시선 배치",
      "text": "표적이 다시 시야에 나타날 예상 시간과 좌표에 미리 시선을 도달시켜 대기시킵니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "착지 오차 피드백 및 내부 모델 교정",
      "text": "표적이 다시 나타났을 때 시선과 표적의 오차를 확인하고 소뇌 내부 모델의 예측 매개변수를 미세 조정합니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "예측성 원활추종(Predictive Smooth Pursuit)이란 무엇이며 일반 추적과 어떻게 다른가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 시각 시스템에는 빛이 망막에 도달한 후 안구 근육이 움직이기까지 약 130~150ms의 생리학적 지연(망막 슬립)이 존재합니다. 수동적(사후 반응형) 추적은 표적의 뒤를 쫓아가므로 고속 표적을 놓치게 됩니다. 반면 예측성 원활추종은 소뇌와 전두안구야(FEF)에 저장된 내부 순방향 모델을 가동하여 미래의 위치를 선행 계산해 눈동자를 미리 움직이는 피드포워드 제어 기제입니다 (Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임의 '리드샷(예측샷)'과 '프리에임'에 이 드릴이 어떤 직접적 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "에이펙스 레전드, 배틀그라운드, 발로란트 등에서 엄폐물 뒤로 숨었다가 다시 피킹하는 적이나 공중에서 낙하하는 적을 맞추려면 눈으로 보고 쏘아서는 늦습니다. 본 드릴을 통해 표적의 속도 벡터를 뇌에서 자동 연산하는 능력을 키우면, 적이 튀어나올 정확한 지점에 조준선을 미리 얹어두는 리드샷 정확도가 비약적으로 향상됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적이 가림막 뒤로 숨어 보이지 않는데도 눈이 궤적을 따라갈 수 있는 신경학적 원리는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bennett & Barnes (2003)의 연구에 따르면, 전두안구야(FEF)와 보조안구야(SEF)에는 직전까지 관찰했던 시각 표적의 속도 정보를 단기 보존하는 '작업 기억 버퍼'가 존재합니다. 시각 자극이 완전히 차단되어도 이 버퍼가 안구 운동 신경핵을 1~2초간 지속 구동하여 등속 궤적을 뇌 내에서 유지하도록 만듭니다."
      }
    },
    {
      "@type": "Question",
      "name": "초보자가 예측 추적을 연습할 때 가장 자주 범하는 실수는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 사라지는 순간 시선을 멈추고 기다렸다가, 표적이 다시 나타나는 것을 눈으로 확인한 뒤에야 급격한 사케드(도약 안구운동)로 따라붙으려는 것입니다. 이는 150ms 이상의 지연을 유발하므로, 표적이 사라져도 궤적을 따라 부드럽게 시선을 계속 진행시키는 것이 올바른 훈련법입니다."
      }
    },
    {
      "@type": "Question",
      "name": "소뇌의 '내부 순방향 모델(Internal Forward Model)'이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "소뇌는 운동 명령의 원심 복사본(Efference Copy)을 기반으로 물리 세계의 인과관계를 모의 계산하는 신경 회로를 갖추고 있습니다 (Robinson, 1965; Krauzlis, 2004). 이 모델이 발달하면 외부 시각 정보가 없는 순간에도 물체가 어떻게 움직일지를 오차 없이 예측할 수 있게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "가이드 라인을 켠 상태와 끈 상태(Hide Line)는 훈련 효과에 어떤 차이가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "라인이 보일 때는 공간 기하학적 단서에 의존한 시각 추적이 이루어집니다. 반면 라인을 숨긴(Hide Line) 상태에서는 시각 단서가 배제되어 뇌가 순수한 속도 벡터와 시간 감각만으로 멘탈 궤적을 계산해야 하므로, 실전 게임이나 스포츠에 필요한 순수 예측 능력이 극대화됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "야구, 테니스, 축구 등 현실 스포츠 종목에서도 이 예측 능력이 필수적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그렇습니다. 시속 150km의 야구공은 0.4초 만에 포수 미트에 도달하기 때문에 타자는 공의 궤적을 끝까지 보고 칠 수 없으며, 투구 초반 100ms의 정보를 바탕으로 타격 지점을 예측성 추종으로 선점합니다. 스포츠 엘리트 선수는 일반인 대비 이 궤적 외삽 게인이 압도적으로 높습니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)이 예측 안구 훈련에 미치는 영향이 큰가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 매우 큽니다. 144Hz 이상의 고주사율 환경에서는 표적이 사라지기 직전의 미세한 프레임 벡터가 망막에 선명하게 전달되어 소뇌가 초기 속도값을 정밀하게 계산할 수 있습니다 (Woods et al., 2015). 이를 통해 가림 구간에서의 궤적 오차를 줄일 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 적정 훈련 시간과 세션 수는 어느 정도가 적당한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "작업 기억과 전두엽의 인지 리소스를 고도로 소비하므로, 1회 60초 세션을 5~8회 반복(총 5~10분), 주 4~5회 진행하는 것이 권장됩니다. 피로가 쌓여 궤적 예측 타이밍이 크게 빗나가기 시작하면 즉시 휴식을 취해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "예측성 동체시력은 나이가 들면 저하되나요? 훈련으로 유지가 가능한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단순한 물리적 반사 속도는 나이가 듦에 따라 미세하게 감소하지만, 소뇌의 운동 제어 모델과 경험 기반 궤적 외삽 능력(Kowler, 1989)은 훈련을 통해 고령층에서도 지속적으로 향상되고 강력하게 유지될 수 있습니다."
      }
    }
  ]
};

const guideProps = {
  heading: "예측 에임・가림 궤적 추적 훈련의 과학적 원리와 실전 가이드",
  intro: [
    "인간의 시각-운동 신경계에는 빛이 망막에 결상되어 시각 피질을 거쳐 외안근 운동 신경으로 전달되기까지 필연적으로 발생하는 약 130~150ms의 생리학적 감각운동 지연(Sensorimotor Delay)이 존재합니다. 만약 인간의 뇌가 수동적인 사후 반응(Feedback Control)에만 의존한다면, 빠르게 비행하는 물체를 절대 중심와(Fovea)로 쫓아갈 수 없으며 시선은 늘 표적의 뒤편 허공을 맴도는 '망막 슬립(Retinal Slip)'에 갇히게 됩니다. 이 지연을 극복하기 위해 뇌가 진화시킨 핵심 신경 기제가 바로 '예측성 원활추종 안구운동(Predictive Smooth Pursuit)'입니다.",
    "시각 운동학의 세계적 석학 데이비드 로빈슨(Robinson, 1965)과 바네스(Barnes, 2008) 등의 신경생리학적 연구에 따르면, 소뇌(Cerebellum)와 전두안구야(FEF)는 표적이 움직이기 시작하는 최초의 궤적에서 속도와 방향 벡터를 신속하게 추출하여 뇌 내에 '내부 순방향 모델(Internal Forward Model)'을 즉각 구축합니다. 이 모델이 발신하는 피드포워드(Feedforward) 구동 신호 덕분에 안구는 신경 전달 지연 시간을 사전에 상쇄하고, 실제 표적과 완전히 동기화된 각속도로 선행 회전할 수 있습니다.",
    "특히 FPS 게임의 엄폐 전투나 야구·테니스 같은 고속 구기 스포츠에서는 표적이 장애물 뒤로 숨거나 순간적으로 시야에서 소실되는 '가림 현상(Visual Occlusion)'이 수시로 발생합니다. 베넷과 바네스(Bennett & Barnes, 2003)의 획기적인 실험은, 시각적 입력이 완전히 차단된 암흑 상태에서도 전두엽의 시각 작업 기억(Visual Working Memory)에 보존된 속도 메모리가 외안근 핵을 1~2초 동안 계속 구동하여 등속 궤적을 머릿속에서 외삽(Extrapolation)해 낸다는 사실을 밝혀냈습니다. 이 궤적 외삽 능력이야말로 벽 뒤에서 튀어나오는 적의 머리를 즉시 저격하는 '리드샷'과 '프리에임'의 진정한 신경생리학적 실체입니다.",
    "본 드릴(Predictive Pursuit)은 등속 및 가속 곡선 궤적을 그리는 표적의 운동을 예측하고, 궤적선 비표시(Hide Line) 모드를 통해 시각 단서가 배제된 상태에서 뇌 내 궤적 시뮬레이션을 수행하도록 유도합니다. 시각 정보의 결손에도 흔들림 없이 미래의 물리 좌표를 꿰뚫는 선행 시선을 체득하여 실전 e스포츠와 반응성 스포츠에서 압도적인 조준 우위를 확보하십시오."
  ],
  benchmarks: {
    title: "예측 궤적 외삽 및 가림 구간 추종 정밀도 표준 벤치마크 (Occlusion Tracking)",
    headers: ["숙련도 등급", "궤적 외삽 정확도 (Accuracy %)", "재출현 시 착지 오차", "원활추종 게인 (Pursuit Gain)", "선행 예측 판정"],
    rows: [
      ["엘리트 (Elite)", "94% 이상", "15px 미만 (완벽한 선행 착지)", "0.95 ~ 1.02", "완벽한 소뇌 내부 모델 구축 및 무지연 리드샷"],
      ["마스터 (Master)", "86% ~ 93%", "15px ~ 28px", "0.88 ~ 0.94", "뛰어난 궤적 외삽 및 돌발 피킹 즉각 제압"],
      ["다이아몬드 (Diamond)", "76% ~ 85%", "29px ~ 45px", "0.78 ~ 0.87", "양호한 예측 추종, 장시간 가림 시 미세 오차"],
      ["골드 (Gold)", "62% ~ 75%", "46px ~ 65px", "0.65 ~ 0.77", "수동 반응 성향, 재출현 후 보정 사케드 발생"],
      ["비기너 (Beginner)", "62% 미만", "65px 초과", "0.65 미만", "가림 시 시선 정지, 보고 나서 쫓아가는 지연형"]
    ],
    note: "※ 본 기준은 1080p 해상도, 속도 1.0x~1.5x, Hide Line(가이드 라인 비표시) 환경에서 실측된 데이터 기준입니다. 재출현 시 보정 도약(사케드) 없이 중심와에 즉각 안착한 비율을 평가합니다."
  },
  techniques: {
    title: "선행 궤적 외삽과 리드샷 조준을 완성하는 4대 핵심 기술",
    items: [
      {
        name: "초동 속도 벡터 순간 입력 (Initial Vector Encoding)",
        desc: "표적이 발사되는 최초 100~200ms 동안 시선의 모든 해상도를 집중하여 이동 속도와 발사 각도를 명확히 파악합니다. 이 초동 벡터가 소뇌 내부 모델을 구동하는 원시 데이터가 되므로 초반 관찰의 정확도가 외삽 성공을 좌우합니다.",
        tips: "표적의 겉모습을 보지 말고 배경 그리드에 대해 표적이 얼마나 빠른 속도로 흘러가는지 속도감을 감각하세요."
      },
      {
        name: "멘탈 궤적 시뮬레이션 및 시선 선행 유도 (Mental Vector Extrapolation)",
        desc: "표적이 가림막 뒤로 숨는 순간 시선을 멈추지 말고, 머릿속으로 등속 운동 가상선을 그리며 마우스나 시선을 소실점에서 출현 예정 지점으로 일정한 리듬으로 미끄러뜨립니다.",
        tips: "표적이 사라진 자리를 쳐다보지 말고, 다음 순간 표적이 도달해 있을 빈 공간을 향해 시선을 과감히 선행시키세요."
      },
      {
        name: "가림 구간 불필요한 사케드 억제 (Saccadic Suppression Control)",
        desc: "표적이 눈앞에서 사라지면 뇌는 불안감으로 인해 주변을 두리번거리는 무작위 사케드(도약 안구운동)를 일으키기 쉽습니다. 사케드가 발생하는 순간 시각 인지 차단이 일어나 궤적 계산이 리셋되므로 침착하게 부드러운 안구 속도를 유지해야 합니다.",
        tips: "눈동자를 튀기지 말고, 가상의 레일 위를 안구가 미끄러지듯 스무스하게 움직이는 느낌을 유지하세요."
      },
      {
        name: "재출현 오차 기반 피드포워드 교정 (Error-Driven Feedback Loop)",
        desc: "표적이 다시 시야에 나타나는 순간, 자신의 시선이 표적보다 앞서 있었는지(과대 예측), 뒤처져 있었는지(과소 예측)를 밀리초 단위로 자각하고 즉각 소뇌 모델의 파라미터를 보정합니다.",
        tips: "오차가 발생했을 때 자책하지 말고 '너무 빨랐으니 다음엔 완만하게', '너무 느렸으니 다음엔 과감히 선행'과 같이 피드백을 축적하세요."
      }
    ]
  },
  steps: [
    "자세 및 시야 정렬: 모니터 중앙과 시선의 각도를 수평으로 맞추고 약 55~65cm 거리를 유지하여 안정된 시각 환경을 조성합니다.",
    "초기 난이도 세팅: 속도 1.0x, 가이드 라인 표시(Visible) 상태로 시작하여 표적의 이동 궤적과 소실 리듬을 체화합니다.",
    "Hide Line 모드 가동: 궤적에 익숙해지면 설정에서 가이드 라인을 숨겨 순수한 시각 작업 기억 기반의 멘탈 외삽 훈련으로 전환합니다.",
    "60초 집중 루틴 수행: 60초 동안 연속으로 생성되는 소실 표적들의 궤적을 뇌 내에서 시뮬레이션하고 출현 위치를 선점합니다.",
    "결과 및 오차 분석: 종료 후 산출되는 궤적 외삽 정확도(Accuracy)와 세션 지표를 확인하여 소뇌 예측 신경망의 적응도를 점검합니다."
  ],
  audience: "에이펙스, 배그, 발로란트에서 벽 뒤 돌발 피킹 적을 리드샷으로 제압하고 싶은 게이머, 야구·테니스 등에서 날아오는 공의 궤적을 한발 앞서 예측해 타격하고 싶은 선수, 선행 시선과 동체시력 예측력을 극대화하려는 훈련자.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('barnes2008', 'bennett2003', 'kowler1989', 'krauzlis2004', 'robinson1965', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 안구 운동 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/momentum-teleport-pursuit", label: "순간이동 에임 연습 (Momentum Teleport)" }
  ]
};

export default function KoreanPredictivePursuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PredictivePursuitClient
        copy={{
          title: "예측 에임 연습・가림 궤적 예측 추적 테스트: 선행 시선과 피드포워드 제어",
          subtitle: "소뇌 내부 모델 기반 궤적 외삽 및 가림 구간 예측성 원활추종",
          description: "장애물이나 암전 구간으로 일시 소실되는 표적의 이동 벡터를 소뇌 내부 모델로 선행 계산하여, 재출현 지점에 시선을 미리 대기시키는 과학적 안구 훈련. 130~150ms의 생리학적 지연을 피드포워드 제어로 상쇄하여 FPS 리드샷과 고속 구기 스포츠의 궤적 예측 능력을 극대화합니다. 무료 무설치 웹 테스트."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/predictive-pursuit" />
      </div>
    </>
  );
}
