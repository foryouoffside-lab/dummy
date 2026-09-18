import MomentumTeleportPursuitClient from '@/app/drills/visual-tracking/momentum-teleport-pursuit/MomentumTeleportPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "순간이동 에임 연습" (Teleport aim practice) / "타겟 재포착 훈련"
// Secondary:    "사케드 도약 추적", "관성 예측 에임 트레이닝", "동체시력 도약 안구운동"
// LSI / Domain:  "위치 이동 타깃 추적", "순간이동 적 트래킹", "플릭 사케드 연계 훈련",
//               "FPS 점멸 대응 에임", "시선 재배치 훈련", "도약 후 원활추종 복귀"
// Authentic Domain Terms: 순간이동 에임 연습（Teleport Aim Training）, 속도 관성（Velocity Momentum）, 사케드 재포착（Saccadic Re-acquisition）, 사케드 억제（Saccadic Suppression）, 착지 후 원활추종（Post-saccadic Smooth Pursuit）, 탄도학적 도약（Ballistic Saccades）
// ============================================================

export const metadata = {
  title: "순간이동 에임 연습・타겟 재포착 안구 추적 테스트 – 도약 안구운동 & 관성 추종 | SkillDrills",
  description: "화면 곳곳으로 순간이동하는 표적을 번개 같은 사케드(도약 안구운동)로 즉각 재포착하고, 궤적 관성을 예측하여 원활추종으로 연결하는 무료 브라우저 시각 훈련. 무설치.",
  keywords: [
    "순간이동 에임 연습",
    "타겟 재포착 훈련",
    "사케드 도약 추적",
    "관성 예측 에임 트레이닝",
    "동체시력 도약 안구운동",
    "위치 이동 타깃 추적",
    "순간이동 적 트래킹",
    "플릭 사케드 연계 훈련",
    "FPS 점멸 대응 에임",
    "시선 재배치 훈련",
    "도약 후 원활추종 복귀",
    "에임 재포착 안구운동"
  ],
  openGraph: {
    title: "순간이동 에임 연습・타겟 재포착 안구 추적 테스트 – 도약 안구운동 & 관성 추종 | SkillDrills",
    description: "화면 곳곳으로 순간이동하는 표적을 번개 같은 사케드(도약 안구운동)로 즉각 재포착하고, 궤적 관성을 예측하여 원활추종으로 연결하는 무료 브라우저 시각 훈련.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "순간이동 에임 연습・타겟 재포착 안구 추적 테스트 – 도약 안구운동 & 관성 추종 | SkillDrills",
    description: "순간이동하는 표적을 신속한 도약 안구운동으로 재포착하고 관성 속도를 즉각 동기화하는 복합 동체시력 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/momentum-teleport-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적・아이 트래킹", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "순간이동 에임 연습・타겟 재포착 안구 추적 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "순간이동 에임 연습・타겟 재포착 안구 추적 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "순간이동(텔레포트)하는 표적을 신속한 도약 안구운동으로 재포착하고 관성 속도를 즉각 동기화하는 무료 브라우저 동체시력 훈련 도구.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ko" },
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "순간이동 에임 연습・타겟 재포착 안구 추적 테스트 – 도약 안구운동 & 관성 추종 | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 지원 브라우저 (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit",
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "순간이동 에임 연습・타겟 재포착 안구 추적 테스트",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit",
  "description": "화면을 돌발 순간이동하는 관성 타깃을 향해 즉각 시선을 도약시키고 착지 직후 매끄럽게 추적을 재개하는 리액티브 아이 트래킹 게임.",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "순간이동 에임 연습 및 타겟 재포착 훈련 4단계 절차",
  "description": "돌발적인 공간 도약 표적에 대해 사케드 재포착과 관성 원활추종을 정확히 성공시키는 체계적 훈련 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "시거리 확보 및 두부 정렬",
      "text": "모니터와 50~70cm 거리를 두고 턱을 당겨 머리를 고정합니다. 목을 돌리지 않고 오직 안구 근육의 순발력만으로 추적할 준비를 마칩니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "세션 시간 및 기준 속도 설정",
      "text": "훈련 목적에 맞게 세션 시간(30초~120초)과 속도 배율(0.5x~9.0x)을 선택합니다. 초심자는 1.0x에서 시작하여 텔레포트 후 시선을 놓치지 않는 속도를 찾습니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "원활추종 도중 돌발 텔레포트에 탄도 사케드 발사",
      "text": "정상 궤적에서는 중심와로 표적을 매끄럽게 추종하다가, 표적이 순간이동하는 찰나 최단 직선 궤적으로 탄도 사케드를 발사하여 새 위치를 즉각 재포착합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "착지 직후 관성 동기화 및 재포착 잠복기 점검",
      "text": "새 좌표 착지 즉시 표적의 진행 속도에 맞춰 원활추종으로 전환합니다. 세션 종료 후 오버슈트 발생률과 평균 재포착 시간을 확인합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "순간이동 에임 연습(모멘텀 텔레포트)이란 어떤 훈련인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면을 일정한 속도와 방향 관성을 갖고 이동하던 표적이 예고 없이 완전히 다른 공간 좌표로 순간이동(텔레포트)할 때, 즉각 탄도학적 도약 안구운동(사케드)으로 시선을 이동시키고, 착지하는 찰나 표적의 이동 속도에 안구 각속도를 동기화하여 원활추종(스무스 퍼슈트)으로 복귀시키는 고난도 시각 운동 훈련입니다."
      }
    },
    {
      "@type": "Question",
      "name": "일반적인 연속 트래킹 훈련보다 왜 순간이동(텔레포트) 훈련이 더 필요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "실제 FPS 게임이나 격렬한 스포츠 경기에서는 적이 코너에서 급격히 튀어나오거나 순간이동・대시 스킬(오버워치 트레이서 점멸, 발로란트 제트 순풍, 에이펙스 레이스 차원 이동 등)을 사용하여 시각적 연속성이 완전히 끊어지는 상황이 빈번합니다. 이러한 시각적 단절을 극복하려면 위치 오차를 줄이는 사케드 기전과 속도를 맞추는 퍼슈트 기전을 유기적으로 결합하는 훈련이 필수적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "도약 안구운동(사케드)과 원활추종(퍼슈트)은 뇌에서 어떻게 연계되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rashbass(1961)의 고전적 연구에 따르면, 뇌는 표적의 '위치 차이(위치 스텝)'에는 사케드 신경계를 가동하고, '속도 차이(속도 스텝)'에는 원활추종 신경계를 독립적으로 동원합니다. 본 드릴은 대각도 점프로 발생한 위치 오차를 사케드로 순식간에 0으로 만들고, 착지와 동시에 소뇌 내부 모델에 저장된 표적의 관성 속도를 꺼내어 퍼슈트로 직결시키는 통합 신경망을 강화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "시선이 빠르게 점프하는 도중에는 화면이 보이지 않는다(사케드 억제)는 것이 사실인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사실입니다. 안구가 초당 수백 도의 고속으로 회전하는 동안(약 20~40밀리초) 망막에 맺히는 상이 심하게 번져 뇌가 혼란에 빠지는 것을 막기 위해 시각 정보 입력을 대뇌 수준에서 일시 차단하는 '사케드 억제(Saccadic Suppression)'가 일어납니다. 따라서 착지 직후 몇 밀리초 안에 얼마나 신속하게 시지각을 회복하여 움직이는 타깃을 재포착하느냐가 승패를 결정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "순간이동한 타깃으로 시선을 던질 때 왜 목표를 지나치는 오버슈트(Overshoot)가 발생하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신규 좌표까지의 거리에 대해 소뇌가 계산한 안구 운동 출력 크기가 과도하거나, 착지 직전에 안구를 감속시키는 길항 외안근의 제동 타이밍이 늦기 때문입니다. 타깃이 착지한 지점을 무작정 쫓아가기보다, 도약 거리에 따른 정확한 제동 펄스를 소뇌가 자동 생성할 수 있도록 반복 측정을 통해 신경 오차를 보정해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(발로란트, 에이펙스 레전드, 오버워치) 실전 교전에서 어떤 효과가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "적이 차원문이나 포탈을 통과했을 때, 혹은 모퉁이에서 갑자기 슬라이딩으로 튀어나올 때 초탄 플릭(사케드)으로 적 중심을 때려 박은 직후, 적이 달리는 방향으로 에임 조준선이 얼어붙지 않고 부드럽게 밀착됩니다. 플릭 직후 조준선이 멈칫하며 적을 놓치는 '플릭 후 트래킹 단절 현상'을 완벽하게 치료할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "텔레포트 직후 표적의 속도를 바로 따라잡지 못하고 뒤처지는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 순간이동하기 전 갖고 있던 이동 벡터(방향과 빠르기)를 뇌가 망각하고, 착지한 후에야 눈으로 움직임을 확인하고 반응하려 하기 때문입니다. 시각 피질의 감각 처리 지연(약 100밀리초)으로 인해 사후 반응 방식으로는 반드시 뒤처지므로, 순간이동 전의 운동 관성이 착지 후에도 유지된다는 사실을 소뇌 내부 모델로 예측하여 선제 가속해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)과 응답속도는 타겟 재포착 반응에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz 환경에서는 순간이동 후 첫 프레임 표시가 최대 16.7ms 늦어지며, 패널 잔상으로 인해 새 위치의 표적 윤곽 인식이 지연됩니다. 144Hz~240Hz 이상의 고주사율 모니터를 사용하면 착지 직후 새 프레임을 망막 수용체에 최속으로 전달하여 재포착 잠복기(Latency)를 비약적으로 단축할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 올바른 세션 휴식 주기는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세션 60초를 기준으로 30~45초의 휴식을挟挟며 4~6세트(총 5~8분)를 진행하는 것이 가장 효과적입니다. 급격한 도약 가속과 정밀 원활추종의 빈번한 전환은 외안근과 소뇌 신경망의 피로를 빠르게 유발하므로 무리한 연속 훈련은 피해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "훈련 중 눈 주변 근육의 피로나 두통이 느껴질 때의 올바른 조치법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "강한 사케드 제동을 담당하는 외안근의 일시적인 근육 피로 현상입니다. 즉시 훈련을 중단하고 손바닥을 비벼 따뜻하게 만든 뒤 눈 위에 얹는 팜 테라피를 하거나, 6미터 이상 먼 곳을 20초간 멍하니 바라보며 안구 근육을 이완시키세요. 다음 세션에서는 속도 배율을 0.8x로 낮추어 적응 기간을 가지는 것이 좋습니다."
      }
    }
  ]
};

const guideProps = {
  heading: "순간이동 에임 연습・타겟 재포착과 관성 추종의 신경과학 기준",
  intro: [
    "모멘텀 텔레포트 추적(Momentum Teleport Pursuit)은 속도 관성을 유지한 채 이동하던 표적이 돌발적으로 상이한 공간 좌표로 순간이동했을 때, 대각도의 탄도학적 도약 안구운동(사케드)으로 새 위치를 재포착하고, 착지한 순간 표적의 속도 벡터를 소뇌에서 인출하여 원활추종(스무스 퍼슈트)으로 복귀시키는 복합 시각 훈련입니다. 공간적 위치 불연속성과 연속적 속도 관성이 공존하는 극한의 환경에서 인간 시각 운동 제어계의 한계 성능을 계측하고 단련합니다(Rashbass, 1961; Findlay & Walker, 1999).",
    "위치 변위 기전(사케드)과 속도 추종 기전(퍼슈트)의 신경학적 분리와 통합: Rashbass(1961)가 증명한 바와 같이, 시각계는 표적의 '위치 오차(망막 위치 스텝)'를 중뇌 상구(Superior Colliculus) 및 전두안야(FEF) 기반의 사케드 회로로 즉각 상쇄하고, '망막 슬립 속도'는 MT/MST 영역에서 소뇌 편엽으로 이어지는 퍼슈트 회로로 조절합니다. 텔레포트가 일어나는 순간, 시각계는 이 두 가지 상이한 운동 프로그램을 밀리초 단위로 연동시켜 사케드의 감속 펄스가 끝나는 정확한 시점에 표적 속도와 일치하는 퍼슈트 펄스를 출력해야 합니다(Krauzlis, 2004).",
    "사케드 억제(Saccadic Suppression)와 착지 직후 속도 기억의 보존: 안구가 초당 수백 도로 공간을 가로지르는 동안에는 뇌간 망양체의 능동적 게이팅에 의해 시각 입력이 일시적으로 차단됩니다(Bahill et al., 1980). 도약이 끝나고 시각이 맑아진 순간 표적의 새로운 움직임을 눈으로 확인한 뒤 추적을 시작하면, 신경 전달 지연(약 100~130ms)으로 인해 시선은 반드시 뒤로 처지게 됩니다. 이를 방지하려면 텔레포트 전에 관찰했던 속도 벡터를 소뇌 내부 모델에 단기 보존(Velocity Memory Cache)하고, 착지와 동시에 선제적으로 안구를 가속하는 인지적 예측 제어가 필수적입니다(Barnes, 2008).",
    "FPS 에임의 '플릭 후 트래킹 단절' 극복과 e스포츠 실전 적용: 대다수의 FPS 게이머들은 갑자기 나타난 적에게 초탄 플릭(사케드)을 맞추는 데는 능숙하지만, 플릭 착지 직후 적이 이동하는 방향으로 에임이 굳어버리며 적을 놓치는 '플릭 후 트래킹 단절'이라는 고질적 문제에 직면합니다. 본 드릴은 텔레포트를 거듭하는 타깃을 통해 플릭의 안착과 동시에 매끄러운 트래킹으로 이어지는 신경 회로를 철저히 반복 단련합니다. 에이펙스 레전드, 오버워치 등 고속 기동 FPS에서 점멸기나 대시 스킬을 쓴 적을 지체 없이 추격하여 궤멸시키는 결정력을 부여합니다(Woods et al., 2015)."
  ],
  benchmarks: {
    title: "순간이동 타겟 재포착・관성 추종 성능 평가지표 (Teleport Re-acquisition Benchmarks)",
    headers: ["숙련도 등급", "사케드 재포착 잠복기 (Re-acquisition)", "착지 오버슈트율", "관성 동기화 효율 (Velocity Match)", "신경생리학적 도달 수준"],
    rows: [
      ["엘리트 (프로 에이머급)", "140ms 미만", "3% 미만 (순간 정지)", "97% 이상", "탁월한 탄도 사케드 제어. 텔레포트 착지 직후 표적 속도에 완전 동기화되며 시선 흔들림 전무"],
      ["상급 (랭커 게이머급)", "140 ～ 180ms", "3% ～ 6%", "91% ～ 96%", "신속한 사케드 재포착. 착지 시 극미한 보정만 관찰되는 수준으로 높은 트래킹 복귀력 유지"],
      ["표준 실용급 (건강한 성인)", "181 ～ 240ms", "7% ～ 14%", "80% ～ 90%", "건강한 성인의 표준 반응역. 텔레포트 직후 찰나의 시선 멈춤(사케드 후 불응기)이 있으나 재포착 성공"],
      ["훈련 요망 (발달 과정・반응 지연)", "241 ～ 320ms", "15% ～ 24%", "68% ～ 79%", "사케드 발사와 착지 인식의 지연 현저. 착지 오버슈트가 빈발하며 표적을 자주 놓침"],
      ["초심자 (협응 미흡・심한 지연)", "320ms 초과", "24% 초과", "68% 미만", "공간 도약에 뇌가 따라가지 못하며 고개가 먼저 돌아감. 외안근 순발력 및 기초 도약 훈련 필요"]
    ],
    note: "※ 본 측정 기준치는 시거리 50~70cm, 기본 속도 1.0x~2.0x 조건에서 60초간 돌발 텔레포트 추적을 진행한 안구 운동 계측 분석에 근거합니다. 재포착 잠복기는 텔레포트 발생 시점부터 중심와가 새 좌표를 재포착할 때까지의 평균 소요 시간입니다."
  },
  techniques: {
    title: "돌발 순간이동 표적 재포착과 관성 추종을 극대화하는 4대 테크닉",
    items: [
      {
        name: "최단 직선 탄도 플릭과 착지 제동 펄스 (Direct Ballistic Projection)",
        desc: "표적이 텔레포트한 순간, 시선이 곡선을 그리며 방황하지 않도록 새 좌표를 향해 최단 직선 벡터로 안구를 한 번에 투사합니다. Findlay & Walker(1999)에 따르면 망설임 없는 탄도 사케드만이 최소 잠복기로 목표에 도달합니다.",
        tips: "새 위치의 주변을 훑어보려 하지 말고, 주변시가 포착한 타깃의 점을 향해 시선을 내리꽂는 느낌을 유지하세요."
      },
      {
        name: "순간이동 전 속도 벡터 보존과 소뇌 캐싱 (Velocity Vector Caching)",
        desc: "표적의 위치 좌표가 바뀌어도 이동 속도와 방향 관성은 그대로 유지됩니다. Barnes(2008)의 내부 모델 이론에 따라 순간이동 직전의 속도 정보를 시각 피질에 캐싱하고, 착지하는 순간 그 속도로 안구를 굴리세요.",
        tips: "표적이 멈춰있다고 뇌가 착각하면 착지 직후 에임이 얼어붙습니다. '움직이던 물체가 위치만 건너뛰었다'고 강하게 인지하세요."
      },
      {
        name: "사케드 억제 중 미래 착지점 선제 조준 (Anticipatory Landing Lead)",
        desc: "사케드 비행에 약 20~40ms의 시간이 소요되므로, 텔레포트가 일어난 순간의 원래 좌표에 착지하면 그사이 이동한 표적에 뒤처지게 됩니다. 비행 시간을 감안하여 표적의 진행 방향으로 수 픽셀 앞서 착지하세요.",
        tips: "타깃이 나타난 점 그 자체가 아니라, 그 타깃이 나아갈 앞자리에 조준선을 미리 얹어두는 것이 프로의 노하우입니다."
      },
      {
        name: "두부 회전의 원천 차단과 순수 안구 스प्रिंट (Cervical Motion Isolation)",
        desc: "큰 각도의 공간 도약이 발생할 때 얼굴을 함께 돌리려는 경추 보상 행동이 무의식적으로 일어납니다. Leigh & Zee(2015)가 밝혔듯 머리가 움직이면 전정안반사가 개입하여 착지 정확도가 깨지므로, 턱을 단단히 당겨 눈 근육만으로 도약하세요.",
        tips: "턱밑에 손가락을 대어 고개의 각도가 미세하게도 틀어지지 않음을 촉각으로 확인하며 훈련하세요."
      }
    ]
  },
  steps: [
    "모니터에서 약 50~70cm 떨어져 머리를 완전히 고정한 바른 자세를 취합니다.",
    "세션 시간(30초~120초)과 속도 배율(0.5x~9.0x)을 설정하고 훈련을 시작합니다.",
    "이동 중인 표적의 중심핵을 시선 중심와로 부드럽게 물샐틈없이 추종합니다.",
    "표적이 텔레포트하는 찰나, 최단 거리 탄도 사케드로 신속하게 새 위치로 시선을 쏩니다.",
    "착지 즉시 표적의 진행 관성에 동기화하여 원활추종을 재개하고, 세션 후 재포착 시간을 점검합니다."
  ],
  audience: "FPS(에이펙스 레전드, 오버워치, 발로란트)에서 점멸이나 돌발 튀어나오기에 조준선을 밀착시키고 싶은 게이머, 구기 종목의 불규칙 바운드에 대한 순발력을 기르고 싶은 운동선수, 도약 안구운동의 정밀도를 극대화하고 싶은 모든 훈련자.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('rashbass1961', 'bahill1980', 'findlay1999', 'krauzlis2004', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 안구 운동 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "가림 구간 예측 추적 (Predictive)" }
  ]
};

export default function KoreanMomentumTeleportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MomentumTeleportPursuitClient
        copy={{
          title: "순간이동 에임 연습: 타겟 재포착 안구 추적과 관성 예측 트레이닝",
          subtitle: "공간 도약에 대응하는 탄도 사케드와 착지 직후 원활추종(Post-saccadic Pursuit) 통합 테스트",
          description: "일정한 속도 관성을 유지하며 화면 곳곳으로 돌발 순간이동(텔레포트)하는 표적을 추적하는 하이브리드 동체시력 검사. 위치 변화(스텝 변위)를 탄도학적 도약 안구운동(사케드)으로 단번에 좁히고, 착지 즉시 표적의 속도 벡터와 안구 각속도를 동기화하는 신경계 통합 기전(Rashbass, 1961; Findlay & Walker, 1999)을 단련합니다. 사케드 억제 직후의 시각 회복과 소뇌의 관성 기억(Barnes, 2008)을 극대화합니다. 무료・무설치."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/momentum-teleport-pursuit" />
      </div>
    </>
  );
}
