import GhostingSuppressPursuitClient from '@/app/drills/visual-tracking/ghosting-suppress-pursuit/GhostingSuppressPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "잔상 억제 시선 고정 훈련" / "안구 고정 안정성 검사" (Ghosting suppression gaze fixation training)
// Secondary:    "동체시력 잔상 제거", "모션 블러 시각 훈련", "시선 고정력 테스트"
// LSI / Domain:  "미세사케드 고정 훈련", "중심와 고정력 측정", "에임 시선 흔들림 교정",
//               "동체시력 흔들림 방지", "망막 잔상 억제", "스무스 퍼슈트 고정력", "전정안구반사 억제"
// Authentic Domain Terms: 잔상 억제(Ghosting Suppression), 모션 스미어(Motion Smear), 미세사케드(Microsaccades), 중심와 고정(Foveal Fixation), 원활추종(Smooth Pursuit), 전정안구반사 억제(VOR Suppression)
// ============================================================

export const metadata = {
  title: "잔상 억제 시선 고정 훈련・동체시력 테스트 – 모션 스미어 억제 | SkillDrills",
  description: "이동 표적의 후방에 생기는 동적 잔상(고스팅)과 모션 스미어를 대뇌 시각 피질에서 능동적으로 억제하고 중심와 고정 안정성을 극대화하는 안구 훈련. 무료・무설치.",
  keywords: [
    "잔상 억제 시선 고정 훈련",
    "안구 고정 안정성 검사",
    "동체시력 잔상 제거",
    "모션 블러 시각 훈련",
    "시선 고정력 테스트",
    "미세사케드 고정 훈련",
    "중심와 고정력 측정",
    "에임 시선 흔들림 교정",
    "동체시력 흔들림 방지",
    "망막 잔상 억제",
    "스무스 퍼슈트 고정력",
    "전정안구반사 억제"
  ],
  openGraph: {
    title: "잔상 억제 시선 고정 훈련・동체시력 테스트 – 모션 스미어 억제 | SkillDrills",
    description: "이동 표적의 후방에 생기는 동적 잔상(고스팅)과 모션 스미어를 대뇌 시각 피질에서 능동적으로 억제하고 중심와 고정 안정성을 극대화하는 안구 훈련.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "잔상 억제 시선 고정 훈련・동체시력 테스트 – 모션 스미어 억제 | SkillDrills",
    description: "동적 잔상과 모션 스미어를 뇌 수준에서 억제하여 중심와 시선 고정 안정성을 기르는 무료 온라인 안구 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/ghosting-suppress-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 훈련", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "잔상 억제 시선 고정 훈련 (고스팅 억제 검사)", "item": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "잔상 억제 시선 고정 훈련・동체시력 고정 안정성 테스트 (Ghosting Suppress Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "이동 표적 후방에 생기는 동적 잔상 링과 시각 노이즈를 능동적으로 걸러내고 중심와에서 타깃을 견고하게 유지하는 브라우저 기반 시선 안정성 측정 도구.",
  "featureList": [
    "모션 스미어 및 다중 잔상 링을 생성하는 정밀 캔버스 시각화 알고리즘",
    "0.5배속부터 9.0배속까지 가변 속도 설정 및 벽면 반사 바운드 궤적 제어",
    "표적 크기, 발광(Glow), CRT 주사선 효과 등 맞춤형 렌더링 옵션",
    "외부 서버 통신 없는 완전한 클라이언트 단 로컬 데이터 저장"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "잔상 억제 시선 고정 훈련 – 동체시력 고정 안정성 온라인 트레이너 | SkillDrills",
  "alternateName": "Ghosting Suppress Pursuit Korea",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit",
  "dateModified": "2026-09-15",
  "description": "무료 온라인 동체시력・시선 안정성 훈련. 시각적 잔상 노이즈 속에서도 시야의 초점을 표적의 중심핵에 고정 유지하는 신경 안구 훈련 도구.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "잔상 억제, 중심와 고정 안정성, 미세사케드 제어, 모션 스미어 차단, 동체시력 해상도 향상"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "잔상 억제 시선 고정 훈련・동체시력 고정 안정성 테스트 (Ghosting Suppress Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit",
  "description": "잔상을 달고 이동하는 타깃을 시선으로 흔들림 없이 고정 추적하는 무료 웹 게임. 에임 떨림을 방지하고 시각 선명도를 단련합니다.",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "잔상 억제 시선 고정 및 안정성 향상 트레이닝 진행 방법",
  "dateModified": "2026-09-15",
  "description": "표적 후방의 잔상 노이즈를 무시하고 중심핵에 시선을 집중시켜 고정 정밀도를 극대화하기 위한 단계별 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "속도 배율 및 세션 시간 설정",
      "text": "초기에는 잔상 속에서 중심핵을 명확히 식별하기 위해 1.0x 기준 속도와 60초 세션을 선택합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "두부 고정 및 표적 중심핵 시선 앵커링",
      "text": "모니터와 50~70cm 거리를 두고 머리를 완전히 고정한 채 표적 중앙의 고휘도 핵에만 중심와 초점을 고정합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "후방 잔상 링의 능동적 인지 차단",
      "text": "타깃 뒤에 남는 잔상 링이나 번짐에 시선이 뒤로 끌리지 않도록 의식적으로 무시하며 부드러운 원활추종을 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "벽면 반사 바운드 시 중심와 즉시 재락온",
      "text": "표적이 가장자리에서 튕겨 나올 때도 시선을 놓치지 않고 미세한 안구 보정으로 새로운 진행 궤적의 중심을 즉시 재고정합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "잔상 억제 시선 고정 훈련(Ghosting Suppress Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이 훈련은 이동하는 표적 뒤에 생기는 동적 잔상 링(고스팅)과 모션 스미어에 시선이 후방으로 끌려가는 것을 뇌에서 능동적으로 억제하고, 오직 표적의 중심핵에만 중심와 초점을 안정적으로 고정 유지하도록 훈련하는 신경 안구 드릴입니다(Burr, 1980; Martinez-Conde et al., 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "시각 운동 중에 나타나는 '모션 스미어(동적 잔상)'란 어떤 현상인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막 광수용세포(원추체・간상체)의 광화학적 반응에는 수십 밀리초의 잔광 감쇠 시간이 존재하며, 디스플레이 픽셀 응답 속도의 지연이 결합되어 빠르게 움직이는 물체 뒤로 꼬리를 무는 시각 잔상이 형성되는 현상입니다. 이 잔상에 주의가 쏠리면 실제 표적 위치에 대한 지각 오차가 발생합니다."
      }
    },
    {
      "@type": "Question",
      "name": "인간의 뇌는 동적 잔상을 어떻게 능동적으로 지워내나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대뇌 초기 시각 피질(V1)과 중측두 시각 피질(MT/V5)에는 물체가 움직이는 동안 그 진행 경로 뒤에 남는 잔상 신호를 능동적으로 감쇠시키는 '시간적 마스킹 억제 기전'이 존재합니다(Burr, 1980). 본 드릴은 이러한 대뇌 억제 회로를 지속적으로 자극하여 활성화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "미세사케드(Microsaccades)는 이동 표적 추적에서 어떤 역할을 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "미세사케드는 시선을 한곳에 고정하고 있을 때도 초당 1~3회 발생하는 극소의 불수의적 안구 운동입니다. 망막 광수용기 수용야를 미세하게 흔들어 시각 신호가 사라지는 현상(Troxler 퇴색)을 방지하고, 미세한 시선 드리프트를 밀리초 단위로 교정하여 중심와 해상도를 최상으로 유지합니다(Martinez-Conde et al., 2004; Rolfs, 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "저속 추종(Constant Slow Pursuit)과 본 잔상 억제 훈련의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "저속 추종 훈련은 깔끔한 리사주 곡선을 따라 부드러운 안구 운동 자체를 매끄럽게 유지하는 것이 핵심입니다. 반면 잔상 억제 훈련은 표적 뒤에 의도적인 시각 노이즈 링을 생성하여, 시각 방해 요소를 걸러내는 '디스트랙터 억제력'과 '중심핵 고정 앵커링'을 집중 연마합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(에이펙스 레전드, 오버워치, 발로란트) 트래킹 에임에 어떤 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "난전 중에는 총구 화염(머즐 플래시), 연막, 파티클 효과, 화면 흔들림 등 방해 시각 요소가 표적 주위에 대량 발생합니다. 잔상 억제력이 단련된 게이머는 주변 시각 혼란에 흔들리지 않고 적 캐릭터의 정중앙 히트박스에 시선을 고정할 수 있어 에임 떨림이 획기적으로 줄어듭니다(Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "야구, 테니스, 탁구 등 고속 구기 스포츠 동체시력에는 어떤 효과가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "초고속으로 회전하며 날아오는 공의 회전축이나 솔기, 상대방의 격렬한 페인트 동작을 볼 때 잔상에 의한 시야 번짐을 억제하고 선명한 중심 시력을 유지하여 정확한 임팩트 타이밍을 맞출 수 있는 시각 기초를 형성합니다(Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "머리를 움직이지 않고 눈동자만으로 추적해야 하는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "머리를 함께 움직이면 전정안구반사(VOR)가 개입하여 순수 외안근의 미세 제어 및 대뇌 고정 유지 회로에 온전한 부하가 걸리지 않습니다(Leigh & Zee, 2015). 안구의 독립적인 미세 운동 조절력과 망막 슬립 억제력을 키우려면 두부 고정이 필수적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터의 응답 속도(GtG)와 주사율(Hz)이 잔상 감지에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "응답 속도가 느린 디스플레이는 물리적인 패널 잔상(하드웨어 고스팅)을 발생시켜 생물학적 신경 측정에 오차를 유발합니다. 패스트 IPS나 OLED, 144Hz 이상의 고주사율 모니터를 사용하면 물리 지연을 배제하고 순수한 뇌 신경 고정력을 단련할 수 있습니다(Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 세트 구성은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세션당 60초 훈련 후 30초 휴식을 취하며, 하루 5~8세트(총 5~10분)가 권장됩니다. 시각적 노이즈를 차단하는 집중 응시는 외안근 피로도가 높으므로 적절한 휴식을 취하며 매일 규칙적으로 진행하는 것이 효과적입니다."
      }
    }
  ]
};

const guideProps = {
  heading: "동적 잔상 억제와 중심와 고정 안정성의 신경안과학 기준",
  intro: [
    "동적 잔상 억제(Ghosting Suppress Pursuit)는 빠르게 이동하는 표적 뒤에 형성되는 망막 잔광과 시각적 번짐(모션 스미어)을 대뇌 피질 수준에서 능동적으로 필터링하고, 표적 중심핵에 대한 중심와 고정(Foveal Fixation)을 안정적으로 유지하는 고난도 아이트라킹 과제입니다. 시각 자극이 망막 위를 스쳐 지나갈 때 광수용기 반응 시간차로 인해 필연적으로 발생하는 시각적 혼란을 배제하고 선명한 윤곽 지각을 담보하는 신경 메커니즘을 극한까지 시험합니다(Burr, 1980).",
    "피질의 능동적 억제와 미세사케드(Microsaccades)의 생체 제어 기전: 표적이 초당 약 30° 이상의 각속도로 움직이면 망막 슬립이 발생하여 후방으로 꼬리를 무는 잔상 흔적이 형성됩니다(Krauzlis, 2004). 보통 이 후방 노이즈는 시선을 뒤로 끌어당기는 방해물로 작용하지만, 초기 시각 피질(V1/MT)의 시간적 억제 회로가 작동하여 잔상을 뇌 수준에서 지워냅니다(Burr, 1980). 동시에 초당 1~3회 발생하는 미세사케드가 중심와 수용야를 미세 진동시켜 시각 신호의 퇴색(Troxler 현상)을 방지하고 표적 중심에 흔들림 없는 고정 앵커를 유지합니다(Martinez-Conde, Macknik, & Hubel, 2004; Rolfs, 2009).",
    "e스포츠 및 고속 스포츠에서의 실전 적용 가치: FPS 게임에서 총구 화염(Muzzle Flash), 연막탄, 폭발 파티클이 난무하는 전장이나 야구·테니스에서 초고속으로 회전하며 날아오는 공을 추적할 때 주변 시각 노이즈에 동요하지 않고 타깃 중심을 꿰뚫어 보는 능력은 명중률과 직결됩니다(Yang et al., 2025; Appelbaum & Erickson, 2018). 본 드릴은 의도적으로 후방 잔상 링을 생성하여 시각 노이즈에 대한 대뇌 억제력과 중심와 고정 정밀도를 비약적으로 향상시킵니다.",
    "하드웨어 환경의 표준화와 전정안구반사 억제: 디스플레이 픽셀의 응답 속도(GtG)가 느린 환경에서는 패널의 물리적 고스팅이 겹쳐 순수한 신경학적 측정에 왜곡을 초래하므로 144Hz 이상의 고주사율·저잔상 모니터에서의 훈련이 권장됩니다(Woods et al., 2015). 아울러 두부를 완전히 고정하여 전정안구반사(VOR)를 억제함으로써 순수한 외안근 미세 제어 및 대뇌 고정 유지 회로를 독립적으로 단련할 수 있습니다(Leigh & Zee, 2015). 모든 훈련 데이터는 브라우저 로컬 저장소에 안전하게 유지됩니다."
  ],
  benchmarks: {
    title: "잔상 억제 시선 고정 안정성 및 중심와 락온 평가 기준 (에디토리얼 가이드)",
    headers: ["숙련도 등급", "목표 속도 배율 (Speed Multiplier)", "잔상 및 시각 노이즈 환경에서의 고정 유지 특성", "신경 반응 및 시선 안정성 프로필"],
    rows: [
      ["티어 1: 최상위 절대 고정 락온 (Apex Fixation)", "2.0x 이상의 초고속 영역", "격렬한 잔상 링과 벽면 반사 바운드 속에서도 시선이 후방으로 전혀 끌리지 않고 표적 중심핵에 완전 밀착.", "초기 시각 피질의 탁월한 모션 스미어 억제력과 미세사케드 제어. 프로 게이머 및 최상위 엘리트 운동선수 수준."],
      ["티어 2: 우수 고정 안정성 (Superior Steadiness)", "1.4x – 1.9x 고속 영역", "고속 이동 중에도 잔상에 현혹되지 않고 타깃 윤곽을 선명하게 포착. 반사 직후에도 극소의 흔들림 후 즉각 안정.", "뛰어난 외안근 미세 협응력과 주의 집중 필터링. 격렬한 인게임 시각 효과 속에서도 정밀 에임 유지."],
      ["티어 3: 표준 성인 기준 (Solid Baseline)", "1.0x – 1.3x 표준 영역", "표준 속도의 이동 표적을 안정적으로 추적. 급격한 반사 바운드나 짙은 잔상 시 찰나의 시선 방황 발생.", "건강한 성인의 표준적인 고정 안정성 수준. 일상적인 스포츠 및 캐주얼 게임에 충분한 시선 유지력."],
      ["티어 4: 시선 흔들림・요훈련 (Developing Control)", "0.7x – 0.9x 저속 영역", "이동 표적의 후방 잔상에 시선이 계속 끌려가며 표적 중심으로부터 시선이 뒤로 처지는 현상 발생.", "시각 노이즈에 대한 대뇌 억제 지연. 저속 영역에서 표적 중심핵만을 응시하는 반복 연습 요망."],
      ["티어 5: 고정 불안정 초심자 (High Drift)", "0.7x 미만", "잔상 노이즈에 시야가 어지러워 표적을 놓치고 화면 전체로 시선이 무질서하게 방황.", "머리를 완전히 고정하고 저속에서 밝은 표적 중심점 하나만을 지긋이 응시하는 기초부터 시작 필요."]
    ],
    note: "본 기준은 동적 잔상 억제 및 미세사케드 고정 제어 연구(Burr, 1980; Martinez-Conde et al., 2004; Rolfs, 2009; Krauzlis, 2004)를 토대로 수립된 편집 기준입니다."
  },
  techniques: {
    title: "동적 잔상을 억제하고 중심와 고정력을 강화하는 4대 기술",
    items: [
      {
        name: "표적 중심핵(고휘도 중심점)에 시선 앵커 집중",
        desc: "Martinez-Conde et al.(2004)의 연구처럼 동적 자극의 중심핵에 초점을 모을 때 미세사케드가 적절히 유도되어 시선 고정 정밀도가 극대화됩니다.",
        tips: "바깥쪽 잔상 링을 보지 말고, 항상 자체 발광하는 중심 코어만을 핀포인트로 꿰뚫어 보십시오."
      },
      {
        name: "대뇌 시각 피질을 통한 모션 스미어의 능동적 억제",
        desc: "Burr(1980)가 증명했듯 후방으로 흐르는 잔상은 뇌 안에서 지워낼 수 있습니다. '잔상은 무시할 배경 잡음'이라고 의식적으로 규정하십시오.",
        tips: "꼬리를 무는 잔상 흔적을 흐릿한 배경으로 넘겨버리고, 의식의 초점을 중심핵 하나에만 압축하십시오."
      },
      {
        name: "두부 완전 고정을 통한 전정안구반사(VOR) 개입 차단",
        desc: "Leigh & Zee(2015)에 따르면 머리를 움직이면 전정반사가 유입되어 외안근의 미세한 고정 안정 회로가 훈련되지 않습니다.",
        tips: "턱을 당기고 목을 완전히 고정한 채 안구 자체의 순수한 회전력만으로 이동 표적을 락온하십시오."
      },
      {
        name: "144Hz+ 고응답 디스플레이를 활용한 물리적 잔상 배제",
        desc: "Woods et al.(2015)의 분석처럼 모니터 응답 지연에 따른 하드웨어 고스팅을 없애야 순수한 시각 고정 능력을 정밀하게 측정할 수 있습니다.",
        tips: "고주사율 게이밍 모니터를 사용하고 적절한 실내 조명을 갖추어 외안근의 피로를 최소화하십시오."
      }
    ]
  },
  steps: [
    "속도 배율(0.5x~2.0x)과 훈련 시간(60초)을 설정하고 훈련을 시작합니다.",
    "화면과 약 50~70cm 거리를 두고 머리를 완전히 고정한 정자세를 취합니다.",
    "이동을 시작한 타깃의 '중심핵'에만 시선을 단단히 고정합니다.",
    "후방에 생기는 잔상 링과 모션 번짐을 의식적으로 무시하며 벽면 반사 바운드 시에도 중심핵을 놓치지 않습니다.",
    "세션 종료 후 잔상에 끌려가지 않고 중심을 유지한 안정도 비율을 확인하고 다음 훈련에 반영합니다."
  ],
  audience: "경쟁형 FPS(에이펙스 레전드, 오버워치, 발로란트, CS2) 게이머, 격투 게임 플레이어, 고속 구기 스포츠 선수(테니스, 탁구, 야구, 배드민턴), 시선 흔들림을 억제하고 동체시력 해상도를 극대화하고자 하는 모든 훈련자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('burr1980', 'martinezConde2004', 'rolfs2009', 'krauzlis2004', 'leigh2015', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "정속 저속 추종 안구 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 추적 훈련 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "동적 회피 시선 추적 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/sine-wave-pursuit", label: "사인파 추종 훈련 (Sine Wave)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 루프 안구 추적 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "예측 시선 추적 (Predictive)" }
  ]
};

export default function LocalizedPage() {
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
      <GhostingSuppressPursuitClient
        copy={{
          title: "잔상 억제 시선 고정 훈련・동체시력 고정 안정성 테스트",
          subtitle: "중심와 고정력 & 모션 스미어 억제 훈련",
          description: "빠르게 움직이는 물체를 추적할 때 망막 광수용체의 잔광과 디스플레이 잔상으로 인해 동적 모션 스미어(Motion Smear)가 발생합니다(Burr, 1980). 본 훈련은 초기 시각 피질(V1/MT)의 능동적 억제 기전과 미세사케드(Microsaccades)를 활성화하여, 후방의 시각적 노이즈를 배제하고 표적 중심핵에 시선을 견고히 락온하는 중심와 고정력을 단련합니다(Martinez-Conde et al., 2004; Rolfs, 2009)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/ghosting-suppress-pursuit" />
      </div>
    </>
  );
}
