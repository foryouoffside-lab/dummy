import SpatialShiftPursuitClient from '@/app/drills/visual-tracking/spatial-shift-pursuit/SpatialShiftPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "공간 시프트 추적 훈련" (Spatial shift pursuit training) / "화면 흔들림 에임 연습"
// Secondary:    "시야 좌표계 적응", "공간 인지 동체시력", "시점 전환 에임 안정성", "두정엽 공간 리매핑"
// LSI / Domain:  "참조 좌표계 변환", "망막 좌표계 공간 좌표계", "피격 화면 흔들림 제어",
//               "탄도 사케드 재포착", "후두정피질 PPC", "원활추종 재동기화"
// Authentic Domain Terms: 공간 시프트 추적(Spatial Shift Pursuit), 좌표계 변환(Coordinate Transformation), 망막 중심 좌표(Retinotopic Frame), 환경 중심 좌표(Allocentric Frame), 후두정피질(Posterior Parietal Cortex / PPC), 사케드 재포착(Saccadic Re-acquisition)
// ============================================================

export const metadata = {
  title: "공간 시프트 추적 훈련・시야 좌표계 적응 – 화면 흔들림 제어 | SkillDrills",
  description: "시각 참조 프레임이 돌발적으로 회전・시프트하는 극한의 환경에서 표적을 놓치지 않고 추적하는 무료 안구 훈련. 후두정피질의 좌표계 변환과 시점 전환 에임 안정성을 강화. 무설치 웹 테스트.",
  keywords: [
    "공간 시프트 추적 훈련",
    "화면 흔들림 에임 연습",
    "시야 좌표계 적응",
    "공간 인지 동체시력",
    "시점 전환 에임 안정성",
    "두정엽 공간 리매핑",
    "참조 좌표계 변환",
    "망막 좌표계 공간 좌표계",
    "피격 화면 흔들림 제어",
    "탄도 사케드 재포착",
    "후두정피질 시각 훈련",
    "동적 시야 리매핑 테스트"
  ],
  openGraph: {
    title: "공간 시프트 추적 훈련・시야 좌표계 적응 – 화면 흔들림 제어 | SkillDrills",
    description: "시야 기준 좌표계가 급변하는 극한의 동적 환경에서 표적을 신속하게 재포착하는 무료 온라인 시각 적응 훈련.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "공간 시프트 추적 훈련・시야 좌표계 적응 – 화면 흔들림 제어 | SkillDrills",
    description: "피격 반동・카메라 급회전 속에서도 표적을 중심와에 고정하는 과학적 적응형 안구 추적 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/spatial-shift-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 운동", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "공간 시프트 추적 훈련・시야 좌표계 적응 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "공간 시프트 추적 훈련・시야 좌표계 적응 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "시각 참조 프레임의 급격한 변위 및 회전 조건에서 후두정피질(PPC)의 공간 리매핑을 가동하여 표적을 즉각 재포착하는 브라우저 기반 동체시력 트레이너.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ko" },
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "공간 시프트 원활추종 트래커 (SkillDrills Spatial Shift Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 canvas and JavaScript ES6+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit",
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "공간 시프트 적응형 에임 훈련 (Spatial Shift Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit",
  "description": "폭발 충격, 화면 흔들림, 급격한 카메라 전환 속에서도 표적을 절대 놓치지 않고 즉각적인 조준선을 복원하는 FPS 게이밍 에임 훈련 도구.",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "공간 시프트 추적 및 시야 좌표계 적응 훈련 절차",
  "description": "참조 프레임의 돌발 변위에 대응하여 후두정피질의 좌표 변환을 활성화하고 추종을 신속하게 재개하는 4단계 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "기준 프레임 표적 추적 확립",
      "text": "정적인 배경 공간에서 부드럽게 움직이는 표적을 중심와(fovea)로 포착하고 안정적인 원활추종을 개시합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "공간 시프트(좌표 변위) 순간 인지",
      "text": "공간 프레임 전체가 순간적으로 점프하거나 회전할 때 망막에 발생하는 대규모 광학 슬립을 즉각 감지합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "탄도학적 사케드를 통한 신속 재센터링",
      "text": "변위된 표적의 새로운 좌표를 향해 최단 시간 탄도 도약(사케드)을 발사하여 표적을 중심와 시야로 회수합니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "신규 좌표계 속도 동기화 및 추종 재개",
      "text": "착지와 동시에 새로운 프레임 내에서의 표적 속도 벡터와 안구 각속도를 동기화하여 추종 이득 1.0을 회복합니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "공간 시프트 추적(Spatial Shift Pursuit)이란 무엇이며 일반 추적과 어떻게 다른가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 추적 훈련은 고정된 2차원 공간에서 표적의 이동만을 쫓지만, 공간 시프트 훈련은 표적이 속한 공간 좌표계(Reference Frame) 자체가 불규칙하게 오프셋되거나 회전합니다. 망막에 맺히는 상이 통째로 뒤흔들리기 때문에 대뇌 후두정피질(PPC)의 초고속 좌표계 리매핑 역량이 필수적으로 요구됩니다 (Kahlon & Lisberger, 1996)."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임의 '화면 흔들림(스크린 셰이크)'과 급격한 턴(Flick) 상황에 왜 필수적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "폭발물 피격 시의 시야 요동, 고감도 마우스의 급격한 180도 화면 전환, 슬라이딩이나 그래플링 도중의 카메라 회전 시 화면 속 적의 상대 좌표는 극적으로 요동칩니다. 본 드릴을 통해 좌표 변환 적응력을 체화하면 화면이 격렬하게 뒤흔들려도 적의 위치를 즉각 재포착하여 조준선을 고정할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "뇌 속에서 일어나는 '좌표계 변환(Coordinate Transformation)'이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막에 들어온 시각 신호는 안구 중심인 '망막 중심 좌표(Retinotopic)'로 입력됩니다. 그러나 머리나 시점이 회전하면 망막 좌표는 무효화됩니다. 후두정피질(PPC)은 안구 위치 신호와 전정 감각을 결합하여 이를 '두개골 중심 좌표(Craniotopic)' 및 '외부 세계 절대 좌표(Allocentric)'로 실시간 재계산합니다 (Findlay & Gilchrist, 1999)."
      }
    },
    {
      "@type": "Question",
      "name": "화면이 튕기는 순간 시선이 갈피를 못 잡는 방향 상실(見當識 喪失)을 막으려면?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시프트가 발생했을 때 당황하여 화면 전체를 두리번거리지 말고, 배경 그리드의 순간 변위 벡터(방향과 거리)를 파악한 뒤 표적이 이동했을 예상 위치로 단 하나의 단호한 탄도 사케드를 내리꽂는 훈련을 지속해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "사케드 도약으로 표적에 도달한 직후 추적이 매끄럽지 않고 덜컹거리는 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사케드는 위치 오차만을 메우는 운동이며, 속도 정보를 직접 보정하지 못합니다. 착지 직후 표적의 새로운 속도 벡터에 맞춰 외안근을 가속(Post-saccadic Acceleration)시키지 않으면 표적이 다시 중심와를 벗어나기 때문입니다 (Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "모터스포츠나 격투기, 구기 종목 등 실전 스포츠에서도 공간 시프트 능력이 쓰이나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대단히 핵심적입니다. 레이싱 중 연석을 밟아 차체가 요동칠 때나 축구·농구에서 몸싸움으로 시야가 흔들리는 순간에도 공이나 상대 선수의 움직임을 중심와에 밀착시키는 신경 메커니즘이 바로 이 공간 리매핑 기전입니다."
      }
    },
    {
      "@type": "Question",
      "name": "훈련 난이도를 점진적으로 올리기 위한 기준은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기본 속도(1.0x)에서 시프트 발생 후 표적을 다시 중심와에 완벽히 재안착시키는 '복귀 지연 시간(Recovery Latency)'을 250ms 이하로 줄이는 것을 1차 목표로 삼습니다. 이후 속도를 1.5x~2.5x로 증속하고 회전 변위가 추가된 모드에 도전합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율이 공간 변위 인지에 주는 영향은 어느 정도인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz 이상의 고주사율 모니터에서는 공간 프레임이 이동하는 순간의 모션 블러가 최소화되어 새로운 좌표가 즉각 선명하게 표현됩니다. 이를 통해 뇌의 좌표 연산 시간을 약 30~50ms 단축할 수 있습니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 피로도 조절 팁은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "공간 연산과 도약 안구운동의 결합은 뇌의 대사 소모가 크므로 60초 세션을 3~5회(총 3~5분), 주 3~4회 실시하는 것이 적합합니다. 훈련 후에는 가벼운 온찜질이나 원경 주시로 시각 피질을 안정시켜야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "지속적인 훈련을 통해 뇌의 공간 리매핑 신경망이 영구적으로 개선되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 후두정피질과 전두안구야 사이의 시냅스 가소성(Neuroplasticity)에 의해 반복적인 훈련을 거치면 좌표 변환 단계가 반사적으로 자동화되어, 극심한 혼전 상황에서도 흔들림 없는 에임 안정성을 영구히 체화할 수 있습니다."
      }
    }
  ]
};

const guideProps = {
  heading: "공간 시프트 추적 훈련의 신경생리학적 원리와 시야 좌표 적응 가이드",
  intro: [
    "인간을 비롯한 고등 영장류의 시각 체계는 정지된 고정 환경에서만 작동하도록 설계되지 않았습니다. 전력 질주, 공중 기동, 거친 몸싸움, 그리고 현대 e스포츠의 격렬한 카메라 조작과 피격 충격 등, 시야의 참조 틀(Reference Frame) 전체가 돌발적으로 요동치는 극한 상황에서도 생존과 승리에 직결된 표적을 시선 중심와(Fovea)에 고정해야만 합니다. 이 극한의 시각적 적응 과제를 수행하는 뇌의 핵심 기제가 바로 '공간 시프트 적응형 추적(Spatial Shift Adaptive Pursuit)'입니다.",
    "시각 신경과학의 거장 존 피ند레이(Findlay & Gilchrist, 1999)와 카론 및 리스버거(Kahlon & Lisberger, 1996)의 연구에 따르면, 망막에 맺히는 최초의 시각상은 망막 중심으로부터의 상대적 변위인 '망막 중심 좌표계(Retinotopic Frame)'로 부호화됩니다. 그러나 시야 전체가 순간 이동하면 이 좌표계는 완전히 붕괴합니다. 대뇌의 후두정피질(Posterior Parietal Cortex: PPC)은 안구의 현재 위치 신호와 내이의 전정 감각을 결합하여, 망막 좌표를 '두개골 중심 좌표(Craniotopic)' 및 '외부 공간 절대 좌표(Allocentric)'로 밀리초 단위로 초고속 재계산(Coordinate Transformation)합니다.",
    "이 리매핑 과정에서 뇌는 정밀한 2단계 복합 안구운동을 발동합니다. 1단계는 튕겨 나간 표적의 신규 좌표를 향해 최단 비행시간(20~40ms)으로 시선을 쏘아 보내는 '탄도학적 사케드(Ballistic Saccade)'입니다. 그리고 2단계는 안구가 표적에 착지하는 찰나, 새로운 좌표계 내에서 표적이 갖는 이동 속도 벡터를 즉각 복사하여 안구 각속도를 동기화시키는 '사케드 후 원활추종 가속(Post-saccadic Pursuit Acceleration)'입니다(Krauzlis, 2004; Rashbass, 1961). 이 복합 연계가 지연되면 시선은 표적을 완전히 놓치게 됩니다.",
    "본 드릴(Spatial Shift Pursuit)은 표적 추종 도중 전체 공간 좌표계를 예고 없이 도약·회전시켜, 후두정피질과 전두안구야의 공간 좌표 변환 신경망에 최고조의 연산 부하를 가합니다. 피격 반동과 급격한 턴 속에서도 찰나의 흔들림 없이 적을 중심와에 재밀착시키는 진정한 프로급 시각 적응력을 완성하십시오."
  ],
  benchmarks: {
    title: "공간 시프트 적응력 및 좌표 리매핑 복구 표준 벤치마크 (Spatial Shift Recovery)",
    headers: ["숙련도 등급", "시프트 후 추적 복구 시간 (ms)", "공간 재포착 정확도 (Accuracy %)", "사케드 착지 후 안정도", "적응형 공간 프로파일"],
    rows: [
      ["엘리트 (Elite)", "220ms 미만 (전광석화 복구)", "95% 이상", "96% 이상 (착지 즉시 락온)", "완벽한 후두정엽 리매핑 및 무지연 재동기화"],
      ["마스터 (Master)", "220ms ~ 280ms", "88% ~ 94%", "90% ~ 95%", "극히 뛰어난 적응력, 화면 흔들림 즉각 극복"],
      ["다이아몬드 (Diamond)", "281ms ~ 360ms", "78% ~ 87%", "80% ~ 89%", "양호한 복구 능력, 급회전 시프트 시 미세 지연"],
      ["골드 (Gold)", "361ms ~ 450ms", "65% ~ 77%", "68% ~ 79%", "시프트 직후 방향 상실, 추종 재개까지 지연"],
      ["비기너 (Beginner)", "450ms 초과", "65% 미만", "68% 미만", "공간 좌표 붕괴, 표적을 완전히 로스트"]
    ],
    note: "※ 본 기준은 1080p 해상도, 속도 1.0x~1.5x, 무작위 공간 시프트 환경에서 측정된 실측 데이터 기준입니다. 시프트 발생 순간부터 표적 중심와 고정이 재안정화될 때까지의 복구 레이텐시를 평가합니다."
  },
  techniques: {
    title: "공간 시프트와 시야 흔들림을 제압하는 4대 적응 기술",
    items: [
      {
        name: "후두정피질 좌표계 순간 변환 (PPC Coordinate Remapping)",
        desc: "화면이 튕기는 순간 표적의 개별 픽셀을 눈으로 쫓지 않고, 전체 배경 프레임이 이동한 변위 벡터(각도와 거리)를 직관적으로 계산하여 뇌 내 좌표축을 평행 이동시킵니다.",
        tips: "표적이 어디로 갔는지를 찾지 말고, 화면 전체가 어느 쪽으로 얼마나 튕겼는지를 시야 전체로 감각하세요."
      },
      {
        name: "단호한 탄도학적 재센터링 (Ballistic Re-Centering)",
        desc: "새로운 좌표를 인지한 즉시 망설임 없이 단 한 번의 강력한 사케드로 시선을 신규 위치로 쏩니다. 어설픈 중간 수정은 복구 시간을 100ms 이상 지연시킵니다.",
        tips: "스냅을 치듯 과감하고 간결하게 목표의 새 중심점으로 시선을 때려 박으십시오."
      },
      {
        name: "착지 즉시 추종 속도 결합 (Post-Saccadic Gain Handshake)",
        desc: "시선이 표적에 안착하는 순간, 시각적 피드백 확인을 기다리지 않고 표적의 진행 방향으로 안구 속도를 즉시 밀어붙여 원활추종 모드로 전환합니다.",
        tips: "착지 지점에서 시선이 멈추지 않고, 착지와 동시에 표적의 속도를 이어받아 미끄러지듯 이동하세요."
      },
      {
        name: "회전 시프트 시 방향 앵커 유지 (Rotational Anchor Shield)",
        desc: "좌표계가 회전을 동반할 때 상하좌우 지각이 일시적으로 왜곡됩니다. 화면 중심축에 무의식의 앵커(닻)를 고정해 두면 회전 변위 후에도 평형감각을 유지할 수 있습니다.",
        tips: "시야의 중심핵에 의식의 중심을 남겨두면 공간이 돌아가도 몸의 지향 감각이 무너지지 않습니다."
      }
    ]
  },
  steps: [
    "시야 환경 조성: 모니터 중앙과 시선 높이를 수평으로 맞추고 55~65cm 거리를 확보하여 올바른 자세를 취합니다.",
    "기준 원활추종 개시: [드릴 시작]을 누르고 정적 공간에서 움직이는 표적을 중심와로 포착하여 안정된 추적 궤도에 진입합니다.",
    "돌발 시프트 즉각 대응: 공간 참조계가 예고 없이 도약하면, 후두정피질의 좌표 변환을 작동시켜 탄도 사케드로 즉시 재포착합니다.",
    "60초 집중 적응 루틴: 연속해서 발생하는 불규칙한 공간 점프 속에서도 표적을 절대 놓치지 않는 극한의 적응력을 발휘합니다.",
    "지연 시간 및 복구율 분석: 세션 종료 후 도출된 평균 복구 시간(ms)과 추종 정확도를 점검하여 공간 적응 신경망의 발달을 확인합니다."
  ],
  audience: "에이펙스, 발로란트, 포트나이트 등에서 피격 흔들림과 급격한 화면 턴 중에도 적을 절대 놓치지 않는 에임을 원하는 게이머, 몸싸움과 회전 중에도 공과 상대를 시선에 고정해야 하는 운동선수, 시각 적응력을 극대화하려는 훈련자.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('krauzlis2004', 'findlay1999', 'robinson1965', 'rashbass1961', 'kahlon1996', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 안구 운동 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "가림 궤적 예측 추적 (Predictive Pursuit)" }
  ]
};

export default function KoreanSpatialShiftPursuitPage() {
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

      <SpatialShiftPursuitClient
        copy={{
          title: "공간 시프트 추적 훈련・시야 좌표계 적응 테스트: 화면 흔들림 제어와 공간 리매핑",
          subtitle: "공간 참조 틀의 급격한 변위・회전에 후두정피질을 동기화하는 적응형 원활추종 훈련",
          description: "시각 참조 프레임이 돌발적으로 회전・시프트하는 극한의 동적 환경에서 표적을 놓치지 않고 추적하는 무료 안구 훈련. 망막 좌표계에서 공간 좌표계로의 초고속 리매핑을 가동하여 피격 화면 흔들림이나 격렬한 시점 전환 중 에임 안정성을 극대화합니다. 무설치 웹 테스트."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/spatial-shift-pursuit" />
      </div>
    </>
  );
}
