import SplitScreenTrackingClient from '@/app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "화면 분할 시각 추적・분할 주의력 안구 훈련 | SkillDrills",
  description: "좌우 시야에서 직교 궤적으로 독립 이동하는 두 표적을 동시 모니터링하는 화면 분할 시각 추적 훈련. 양측 대뇌 반구의 분할 주의력과 잠재적 공간 주의를 단련합니다. 무료.",
  keywords: [
    "화면 분할 시각 추적",
    "분할 주의력 안구 훈련",
    "양측 반구 시각 추종",
    "다중 목표 시선 분리",
    "미니맵 중심시 동시 주시",
    "주변시 동체시력 훈련",
    "터널 비전 개선 운동",
    "에임 분할 주시 훈련",
    "FPS 시선 분산 연습",
    "다중 표적 추적 검사",
    "화면 분할 동체시력",
    "양안 동시 주시 훈련"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking",
    languages: getAlternateLanguages("/drills/visual-tracking/split-screen-tracking"),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "화면 분할 시각 추적・분할 주의력 안구 훈련 | SkillDrills",
    description: "좌우 시야에서 직교 궤적으로 독립 이동하는 두 표적을 동시 모니터링하는 화면 분할 시각 추적 훈련. 양측 대뇌 반구의 분할 주의력과 잠재적 공간 주의를 단련합니다. 무료.",
    url: "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking",
    siteName: "SkillDrills",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "화면 분할 시각 추적・분할 주의력 안구 훈련 | SkillDrills",
    description: "좌우 시야에서 직교 궤적으로 독립 이동하는 두 표적을 동시 모니터링하는 화면 분할 시각 추적 훈련. 양측 대뇌 반구의 분할 주의력과 잠재적 공간 주의를 단련합니다. 무료.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills 홈",
      "item": "https://skilldrills.online/ko"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "시각 추적 드릴",
      "item": "https://skilldrills.online/ko/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "화면 분할 시각 추적",
      "item": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "화면 분할 시각 추적・분할 주의력 안구 훈련",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "좌우 시야에서 직교 궤적으로 독립 이동하는 두 표적을 동시 모니터링하는 화면 분할 시각 추적 훈련. 양측 대뇌 반구의 분할 주의력과 잠재적 공간 주의를 단련합니다.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "화면 분할 시각 추적・분할 주의력 안구 훈련",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 자바스크립트 지원 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "화면 분할 시각 추적・분할 주의력 안구 훈련",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking",
  "description": "좌우 시야에서 직교 궤적으로 독립 이동하는 두 표적을 동시 모니터링하는 화면 분할 시각 추적 훈련. 양측 대뇌 반구의 분할 주의력과 잠재적 공간 주의를 단련합니다.",
  "genre": [
    "액션",
    "두뇌 트레이닝",
    "시각 인지 훈련"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "화면 분할 시각 추적 훈련 진행 방법",
  "description": "분할된 화면에서 직교 운동하는 두 표적을 동시에 추종하고 분할 주의력과 양측 반구 정보 처리 능력을 극대화하는 4단계.",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "훈련 환경 및 세션 매개변수 설정",
      "text": "세션 시간(30~120초), 표적 이동 속도 배율, 구체 크기를 선택하고, 필요에 따라 가이드 라인 숨김(Hide Line) 또는 무작위 속도 가속을 활성화합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "중앙 경계선 시선 고정 앵커 형성",
      "text": "모니터 정중앙의 좌우 분할 경계선에 시선의 기준 앵커를 배치하고 머리의 움직임 없이 편안한 고정 시선을 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "잠재적 주변시를 활용한 직교 표적 병렬 감지",
      "text": "표적 간을 빠른 도약안구운동(단속운동)으로 번갈아 주시하지 않고, 중앙 앵커를 유지한 채 잠재적 공간 주의(Covert Attention)를 좌우 시야로 분할 확장합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "양측 반구 시각 대칭성 및 추적 안정성 분석",
      "text": "세션 완료 후 좌측(수직) 또는 우측(수평) 표적 중 어느 한쪽을 반복적으로 놓치는 반구 편향이 없었는지 확인하고 점진적으로 속도를 높입니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "화면 분할 시각 추적 훈련(Split-Screen Tracking)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면 중앙을 기준으로 좌측 영역의 수직 왕복 표적과 우측 영역의 수평 왕복 표적을 동시에 추종하고 인지하는 신경 안구 운동 훈련입니다. 시선을 한쪽으로 고정하지 않고 중앙 앵커를 유지한 상태에서 좌우 대뇌 반구의 분할 주의력(Divided Attention)과 잠재적 공간 주의를 극대화하여 시야 협착(터널 비전)을 방지합니다."
      }
    },
    {
      "@type": "Question",
      "name": "사람의 눈이 물리적으로 두 개의 다른 물체를 동시에 볼 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막 중심와(Fovea)의 고해상도 영역은 시야각 1~2도에 불과하므로 물리적 중심시로 두 대상을 동시에 정밀 포착하는 것은 불가능합니다. 하지만 Pylyshyn & Storm (1988)의 다중 표적 추적(MOT) 연구와 Cavanagh & Alvarez (2005)의 다초점 주의 모델에 따르면, 뇌는 중심 시선을 유지한 채 주변 시야 내 여러 물체에 독립적인 주의 지표(FINST)를 부여하여 병렬 추적할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "좌우 표적을 빠르게 번갈아 쳐다보는 것과 중앙을 고정하는 것 중 무엇이 더 좋나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "중앙에 시선 앵커를 고정하고 잠재적 주변시를 활용하는 전략이 과학적으로 훨씬 뛰어납니다. 표적 간을 오가는 급격한 도약안구운동(단속운동)은 매회 20~50ms의 시간이 소요되며, 도약 도중 시각 정보 입력이 차단되는 단속 억제(Saccadic Suppression)가 발생하여 표적 재포착 지연과 치명적인 정보 공백을 초래합니다."
      }
    },
    {
      "@type": "Question",
      "name": "‘양측 반구 시각 우위성(Bilateral Hemifield Advantage)’이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alvarez & Cavanagh (2005)의 연구에 따르면 시각 추적에 할당되는 신경 자원은 대뇌 반구별로 독립적으로 배분됩니다. 단일 시야(예: 우측 시야 내)에서 두 물체를 추적할 때보다, 좌측 시야(우반구 처리)와 우측 시야(좌반구 처리)로 표적이 나뉘어 있을 때 신경 자원 경합이 발생하지 않아 추적 속도와 정확도가 비약적으로 향상됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "왜 좌측은 수직, 우측은 수평의 직교 벡터로 움직이나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "두 표적이 동일한 방향으로 평행하게 움직이면 게슈탈트의 ‘공동 운명의 법칙’에 의해 뇌가 두 물체를 단일 객체로 묶어(Binding) 단순화하려 합니다. 수직과 수평이라는 직교 운동 궤적을 부여함으로써 시각 피질이 좌우에서 완전히 독립된 2차원 운동 방정식을 병렬 계산하도록 강제합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임이나 배틀로얄 e스포츠에서 이 훈련이 어떻게 도움되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "발로란트, 오버워치, 배틀그라운드, 에이펙스 레전드 등 현대 FPS에서는 크로스헤어로 조준점을 정밀 유지(중심시)하면서도 미니맵, 킬로그, 스킬 쿨다운, 주변 적의 실루엣을 동시에 인지해야 합니다(Green & Bavelier, 2006). 이 훈련은 교전 중 조준선을 놓치지 않으면서도 주변 전황 정보를 완벽히 읽어내는 능력을 길러줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "유독 한쪽 표적(좌측 또는 우측)만 계속 놓치는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대다수의 사람은 주안(우성안) 및 우성 대뇌 반구에 따른 시야 비대칭성을 지닙니다. 우측 표적을 자주 놓친다면 좌반구의 주의 배분이 부족한 것이며, 좌측을 놓친다면 우반구 주의 자원이 부족한 것입니다. 취약한 쪽의 표적에 의식적으로 60% 이상의 주의를 기울이며 훈련하면 양측 시각 균형을 되찾을 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "가이드 라인 숨김(Hide Line) 옵션을 켜면 어떤 신경학적 효과가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "궤적 가이드 라인이 사라지면 외부 좌표 단서가 완전히 차단됩니다. 이로 인해 두정엽의 공간 인지 피질은 표적의 순간 속도와 최근 위치만을 기반으로 내부 예측 모델(피드포워드 모델)을 능동적으로 생성해야 하므로, 안구 운동 예측력과 공간 작업기억 용량이 비약적으로 향상됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "권장 훈련 시간과 세트 구성은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1회 60초 세션을 2~3회 수행하여 매일 총 5분 정도 진행하는 것이 가장 효과적입니다. 분할 주의력 훈련은 전두-두정엽 주의 네트워크에 매우 높은 인지적 피로를 유발하므로, 피로가 누적된 상태의 장시간 훈련보다 고도의 집중력을 발휘하는 단기 세션이 뇌신경 가소성 정착에 유리합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고주사율(144Hz/240Hz) 모니터가 분할 추적 훈련에 미치는 영향은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기본 60Hz(프레임 간격 약 16.7ms) 디스플레이에 비해 144Hz(약 6.9ms) 이상의 고주사율 환경에서는 두 직교 표적의 궤적이 끊김 없이 연속 렌더링됩니다(Woods et al., 2015). 잔상 및 하드웨어 디스플레이 지연으로 인한 오차가 배제되어 오롯이 신경계 자체의 다중 표적 인지 능력만을 순수하게 훈련할 수 있습니다."
      }
    }
  ]
};

const guide = {
  heading: "화면 분할 시각 추적・분할 주의력 안구 훈련: 양측 반구 병렬 추종과 시선 분리 테스트",
  intro: [
    "인간 시각 시스템의 최고 해상도 영역인 망막 중심와(Fovea Centralis)는 시야각 1~2도에 불과하여, 공간적으로 멀리 떨어진 두 개의 독립적 동적 표적을 물리적으로 동시에 초점 주시하는 것은 불가능합니다. 시야 내에서 복수의 중요 정보가 동시다발적으로 전개될 때, 인간은 표적 간을 빠른 도약안구운동(단속운동)으로 번갈아 주시하거나, 중심점에 앵커를 두고 주변 시야로 주의를 확산시키는 잠재적 공간 주의(Covert Spatial Attention)를 발휘해야 합니다.",
    "인지신경과학의 고전적 이정표인 Pylyshyn & Storm (1988)의 다중 표적 추적(Multiple Object Tracking: MOT) 연구는 뇌가 매 순간 시선을 이동시키지 않고도 복수의 독립 객체를 병렬 처리하는 시각 지표 기제(FINSTs)를 보유하고 있음을 입증했습니다. 나아가 Alvarez & Cavanagh (2005)는 시각 추적 신경 자원이 좌우 대뇌 반구에 독립적으로 분배된다는 '양측 반구 시각 우위성(Bilateral Hemifield Advantage)'을 규명했습니다. 좌측 시야(우반구 처리)와 우측 시야(좌반구 처리)에 분할된 표적은 단일 시야 내 복수 표적보다 신경 자원 충돌이 현저히 적어 병렬 추적 능력이 극대화됩니다.",
    "표적 사이를 안구가 뛰어넘을 때 발생하는 신경생리학적 손실은 심각합니다. 단속운동 자체에 20~50밀리초가 소요될 뿐 아니라, 이동 중 시각 민감도가 급격히 억제되는 단속 억제(Saccadic Suppression)로 인해 중요한 궤적 정보가 소실됩니다. 반면 중앙에 기준 시선을 두고 다초점 주의(Multifocal Attention; Awh & Pashler, 2000; Cavanagh & Alvarez, 2005)를 양측 시야로 전개하면 시각 입력의 단절 없이 두 궤적을 연속 모니터링할 수 있으며, 이는 액션 비디오 게임 숙련자들에게서 고도로 발달하는 핵심 인지 능력입니다(Green & Bavelier, 2006).",
    "본 화면 분할 시각 추적 훈련은 좌측의 수직 진동과 우측의 수평 진동이라는 완전 직교 벡터 궤적을 통해 게슈탈트의 통합 지각(공동 운명의 법칙)을 차단하고 순수한 2차원 독립 운동 분석을 유도합니다. 디스플레이 주사율에 따른 시각 양자화(60Hz 시 16.7ms, 144Hz 시 6.9ms) 및 입력 장치 폴링 레이트(Woods et al., 2015)를 고려하여 최적의 환경에서 훈련하십시오. 모든 세션 측정 기록은 브라우저 로컬 스토리지에 안전하게 보관됩니다."
  ],
  benchmarks: {
    title: "분할 주의력 시각 추적 성능 벤치마크 (표적 속도 및 반구 대칭성)",
    headers: ["숙련도 등급", "권장 속도 배율", "시선 앵커 안정성", "좌우 반구 추적 대칭성", "예상 인구 백분위"],
    rows: [
      ["엘리트 / 신경 적응 완료 (Elite)", "3.5x ~ 5.0x+", "중앙 경계선 완전 고정・단속운동 0회", "좌우 탈락률 편차 < 3% (완전 병렬 처리)", "상위 1.5%"],
      ["마스터 / 고도 분할 (Master)", "2.5x ~ 3.5x", "중앙 앵커 유지・미세 단속운동 극소", "좌우 탈락률 편차 < 7% (안정적 추종)", "상위 8%"],
      ["어드밴스 / 실전 수준 (Advanced)", "1.8x ~ 2.5x", "대체로 중앙 유지・급가속 시 미세 흔들림", "좌우 탈락률 편차 < 12% (경미한 편향)", "상위 25%"],
      ["인터미디에이트 / 기초 (Intermediate)", "1.2x ~ 1.8x", "좌우 표적으로의 무의식적 시선 이동 발생", "단일 시야 반응 지연 빈번 (15~25%)", "중위 45%"],
      ["비기너 / 훈련 미경험 (Novice)", "0.5x ~ 1.2x", "좌우 표적 사이를 분주하게 단속 왕복", "한쪽 표적의 완전 추적 실패 다발 (> 25%)", "입문 기준"]
    ],
    note: "벤치마크 수치는 Pylyshyn & Storm (1988)의 다중 표적 추적 한계 모델 및 Alvarez & Cavanagh (2005)의 양측 반구 분할 주의 지표를 바탕으로 정립되었습니다."
  },
  techniques: [
    {
      title: "중앙 경계선 앵커링과 잠재적 공간 주의 분할 기법",
      description: "한쪽 표적으로 시선이 쏠리는 순간 반대쪽 표적은 주변시 해상도 저하로 즉각 시야에서 소실됩니다. 양안 초점을 화면 정중앙의 수직 분할선에 부드럽게 고정하고, 의식적 주의의 범위만을 양옆으로 넓히는 '소프트 포커스(Soft Focus)' 상태를 유지합니다.",
      tips: [
        "모니터 표면보다 살짝 앞쪽 공간을 멍하니 바라보는 느낌으로 안구 근육의 힘을 완전히 뺀다",
        "표적 구체 자체를 세밀하게 보려 하지 말고, 주변시의 간상세포를 통해 표적이 방출하는 빛의 잔상과 움직임을 포착한다",
        "시선이 한쪽 표적으로 끌려가려 할 때마다 즉각 중앙 경계선으로 초점을 되돌리는 리셋 루틴을 훈련한다"
      ]
    },
    {
      title: "직교 운동 벡터의 인지적 분리 (수직-수평 디커플링)",
      description: "좌측 시야의 Y축 상하 운동과 우측 시야의 X축 좌우 운동은 뇌 내에서 융합될 경우 사선 합성 벡터로 왜곡되기 쉽습니다. 두정엽의 공간 정보 처리 과정에서 좌측 수직 데이터와 우측 수평 데이터를 독립 변수로 분리하여 계산하는 감각을 체득합니다.",
      tips: [
        "좌측 표적의 상하 반전 리듬과 우측 표적의 좌우 반전 리듬이 서로 어긋나 있음을 차분히 인지한다",
        "반전 순간 발생하는 가속도 변화를 시각적 박자처럼 직관적으로 수용한다",
        "‘Hide Line’ 옵션을 활성화하여 배경의 보조선 없이 순수한 운동 궤적만을 추정하는 훈련을 병행한다"
      ]
    },
    {
      title: "주안(우성안) 및 우성 반구 편향의 능동적 교정",
      description: "오른손잡이・우안 우성인 사용자는 좌반구(우측 시야)로 주의가 쏠려 좌측의 수직 표적을 놓치는 경향이 강합니다. 자신이 어떤 방향의 표적을 더 자주 놓치는지 세션 결과를 통해 파악하고, 취약한 쪽에 의식적으로 60:40 비율의 주의 가중치를 부여합니다.",
      tips: [
        "훈련 카운트다운 동안 자주 놓치는 쪽의 시야 공간을 의식적으로 먼저 인지하고 준비한다",
        "취약한 쪽 표적이 반전할 때를 기준으로 삼아 반대쪽 표적의 위치를 교차 확인하는 습관을 들인다",
        "양측 표적의 추적 감각이 균등해질 때까지 속도 배율을 무리하게 올리지 않고 기본 속도에서 안정성을 다진다"
      ]
    },
    {
      title: "미세 도약(마이크로새카드) 억제와 깜빡임 타이밍 제어",
      description: "60초 동안 극도의 주의력을 분할할 때 무의식적인 눈 깜빡임이나 안구 떨림은 결정적인 표적 이탈을 초래합니다. 두 표적이 양 끝에 도달하여 운동 경로가 가장 예측 가능해지는 순간을 포착하여 순식간에 눈을 깜빡입니다.",
      tips: [
        "표적이 최고 속도로 중앙을 통과하는 구간에서의 눈 깜빡임을 철저히 피한다",
        "방 안의 조명과 모니터의 밝기 균형을 맞추어 눈의 피로와 안구 건조를 최소화한다",
        "규칙적인 호흡을 유지하여 전신 긴장이 목과 안구 근육으로 전달되는 것을 방지한다"
      ]
    }
  ],
  deviceCalibration: {
    title: "분할 시각 추적을 위한 하드웨어 환경 및 인체공학적 세팅",
    points: [
      "디스플레이 주사율: 직교 이동하는 두 표적의 위치 갱신 정밀도를 확보하기 위해 144Hz 이상의 고주사율 게이밍 모니터를 권장합니다. 60Hz(16.7ms) 대비 프레임 간격을 6.9ms 이하로 단축합니다.",
      "시청 거리와 유효 시야각: 화면 전체가 중심시 기준 40~50도 내외의 수평 시야각에 안착하도록 모니터와 50~70cm 거리를 유지하십시오. 너무 가까우면 주변시 한계를 벗어납니다.",
      "대비 및 조명 최적화: 다크 모드 또는 고대비 표적 색상(사이버 레드/네온 블루)을 설정하여 망막 주변부에서의 플리커 및 명암 대비 감도를 극대화합니다.",
      "안면 정렬 및 신체 중심축: 모니터 중앙 분할선이 신체의 정중면(코와 척추의 중심축)과 정확히 수직을 이루도록 의자 높이와 모니터 각도를 정밀 교정합니다."
    ]
  },
  faqs: [
    {
      q: "화면 분할 시각 추적 훈련(Split-Screen Tracking)이란 무엇인가요?",
      a: "화면 중앙을 기준으로 좌측 영역의 수직 왕복 표적과 우측 영역의 수평 왕복 표적을 동시에 추종하고 인지하는 신경 안구 운동 훈련입니다. 시선을 한쪽으로 고정하지 않고 중앙 앵커를 유지한 상태에서 좌우 대뇌 반구의 분할 주의력(Divided Attention)과 잠재적 공간 주의를 극대화하여 시야 협착(터널 비전)을 방지합니다."
    },
    {
      q: "사람의 눈이 물리적으로 두 개의 다른 물체를 동시에 볼 수 있나요?",
      a: "망막 중심와(Fovea)의 고해상도 영역은 시야각 1~2도에 불과하므로 물리적 중심시로 두 대상을 동시에 정밀 포착하는 것은 불가능합니다. 하지만 Pylyshyn & Storm (1988)의 다중 표적 추적(MOT) 연구와 Cavanagh & Alvarez (2005)의 다초점 주의 모델에 따르면, 뇌는 중심 시선을 유지한 채 주변 시야 내 여러 물체에 독립적인 주의 지표(FINST)를 부여하여 병렬 추적할 수 있습니다."
    },
    {
      q: "좌우 표적을 빠르게 번갈아 쳐다보는 것과 중앙을 고정하는 것 중 무엇이 더 좋나요?",
      a: "중앙에 시선 앵커를 고정하고 잠재적 주변시를 활용하는 전략이 과학적으로 훨씬 뛰어납니다. 표적 간을 오가는 급격한 도약안구운동(단속운동)은 매회 20~50ms의 시간이 소요되며, 도약 도중 시각 정보 입력이 차단되는 단속 억제(Saccadic Suppression)가 발생하여 표적 재포착 지연과 치명적인 정보 공백을 초래합니다."
    },
    {
      q: "‘양측 반구 시각 우위성(Bilateral Hemifield Advantage)’이란 무엇인가요?",
      a: "Alvarez & Cavanagh (2005)의 연구에 따르면 시각 추적에 할당되는 신경 자원은 대뇌 반구별로 독립적으로 배분됩니다. 단일 시야(예: 우측 시야 내)에서 두 물체를 추적할 때보다, 좌측 시야(우반구 처리)와 우측 시야(좌반구 처리)로 표적이 나뉘어 있을 때 신경 자원 경합이 발생하지 않아 추적 속도와 정확도가 비약적으로 향상됩니다."
    },
    {
      q: "왜 좌측은 수직, 우측은 수평의 직교 벡터로 움직이나요?",
      a: "두 표적이 동일한 방향으로 평행하게 움직이면 게슈탈트의 ‘공동 운명의 법칙’에 의해 뇌가 두 물체를 단일 객체로 묶어(Binding) 단순화하려 합니다. 수직과 수평이라는 직교 운동 궤적을 부여함으로써 시각 피질이 좌우에서 완전히 독립된 2차원 운동 방정식을 병렬 계산하도록 강제합니다."
    },
    {
      q: "FPS 게임이나 배틀로얄 e스포츠에서 이 훈련이 어떻게 도움되나요?",
      a: "발로란트, 오버워치, 배틀그라운드, 에이펙스 레전드 등 현대 FPS에서는 크로스헤어로 조준점을 정밀 유지(중심시)하면서도 미니맵, 킬로그, 스킬 쿨다운, 주변 적의 실루엣을 동시에 인지해야 합니다(Green & Bavelier, 2006). 이 훈련은 교전 중 조준선을 놓치지 않으면서도 주변 전황 정보를 완벽히 읽어내는 능력을 길러줍니다."
    },
    {
      q: "유독 한쪽 표적(좌측 또는 우측)만 계속 놓치는 이유는 무엇인가요?",
      a: "대다수의 사람은 주안(우성안) 및 우성 대뇌 반구에 따른 시야 비대칭성을 지닙니다. 우측 표적을 자주 놓친다면 좌반구의 주의 배분이 부족한 것이며, 좌측을 놓친다면 우반구 주의 자원이 부족한 것입니다. 취약한 쪽의 표적에 의식적으로 60% 이상의 주의를 기울이며 훈련하면 양측 시각 균형을 되찾을 수 있습니다."
    },
    {
      q: "가이드 라인 숨김(Hide Line) 옵션을 켜면 어떤 신경학적 효과가 있나요?",
      a: "궤적 가이드 라인이 사라지면 외부 좌표 단서가 완전히 차단됩니다. 이로 인해 두정엽의 공간 인지 피질은 표적의 순간 속도와 최근 위치만을 기반으로 내부 예측 모델(피드포워드 모델)을 능동적으로 생성해야 하므로, 안구 운동 예측력과 공간 작업기억 용량이 비약적으로 향상됩니다."
    },
    {
      q: "권장 훈련 시간과 세트 구성은 어떻게 되나요?",
      a: "1회 60초 세션을 2~3회 수행하여 매일 총 5분 정도 진행하는 것이 가장 효과적입니다. 분할 주의력 훈련은 전두-두정엽 주의 네트워크에 매우 높은 인지적 피로를 유발하므로, 피로가 누적된 상태의 장시간 훈련보다 고도의 집중력을 발휘하는 단기 세션이 뇌신경 가소성 정착에 유리합니다."
    },
    {
      q: "고주사율(144Hz/240Hz) 모니터가 분할 추적 훈련에 미치는 영향은 무엇인가요?",
      a: "기본 60Hz(프레임 간격 약 16.7ms) 디스플레이에 비해 144Hz(약 6.9ms) 이상의 고주사율 환경에서는 두 직교 표적의 궤적이 끊김 없이 연속 렌더링됩니다(Woods et al., 2015). 잔상 및 하드웨어 디스플레이 지연으로 인한 오차가 배제되어 오롯이 신경계 자체의 다중 표적 인지 능력만을 순수하게 훈련할 수 있습니다."
    }
  ],
  related: [
    { href: "/ko/drills/visual-tracking/peripheral-ping-pursuit", label: "주변시 핑 추적 훈련" },
    { href: "/ko/drills/visual-tracking/spatial-shift-pursuit", label: "화면 흔들림 공간 시프트 추적 훈련" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "예측 에임 연습・가림 궤적 추적 테스트" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "불규칙 방향 전환・급제동 추적 훈련" },
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "원활추종 기초 안구 운동 훈련" }
  ],
  sources: pickSources('pylyshyn1988', 'alvarez2005', 'awh2000', 'cavanagh2005', 'green2006', 'woods2015'),
};

export default function SplitScreenTrackingKoPage() {
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

      <SplitScreenTrackingClient
        copy={{
          title: "화면 분할 시각 추적",
          subtitle: "분할 주의력 안구 훈련・양측 반구 시각 추종",
          description: "화면 중앙을 기준으로 좌우 영역에서 직교하는 수직・수평 벡터로 독립 이동하는 두 표적을 동시 추종하는 시각 신경 훈련. 중심 시선을 유지하며 잠재적 공간 주의를 좌우 대뇌 반구로 균등 분배하여 시야 협착을 방지하고 병렬 시각 정보 처리 능력을 극대화합니다."
        }}
      />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/split-screen-tracking" />
      </div>
    </>
  );
}
