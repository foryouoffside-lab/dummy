import VerticalAirTrackClient from '@/app/drills/fps/vertical-air-track/VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (fps / vertical-air-track)
// PRIMARY DOMESTIC: "수직 에임 연습"          — High conversion intent (Winner)
//                   "트래킹 에임"              — Top Korean aim search query
//                   "트래킹 에임 연습"         — High-intent practice term
//                   "수직 트래킹 에임"         — Airborne tracking technical term
//                   "에임 연습 게임"           — Broad domestic gaming term
// SECONDARY / LSI:
//                   "공중 타겟 트래킹"         — Aerial pursuit specific
//                   "FPS 수직 에임"            — Genre keyword
//                   "오버워치 파라 에임 연습"   — Game specific demand
//                   "에임 트레이너 사이트"     — Platform search term
// WINNER TITLE:     수직 에임 연습 – 브라우저 무료 FPS 공중 트래킹 에임 트레이너 | SkillDrills
// ============================================================

export const metadata = {
  title: "수직 에임 연습 – 브라우저 무료 FPS 공중 트래킹 에임 트레이너 | SkillDrills",
  description: "브라우저에서 무료로 즐기는 FPS 수직 에임 및 공중 타겟 트래킹 연습 사이트. 중력 가속도로 낙하하는 포물선 궤적 예측, Y축 마우스 정밀 컨트롤, 파라/에코 대공 추적을 훈련하여 에이펙스 레전드와 오버워치 2 승률을 높이세요.",
  keywords: [
    '수직 에임 연습',
    '트래킹 에임',
    '트래킹 에임 연습',
    '수직 트래킹 에임',
    '공중 타겟 트래킹',
    '에임 연습 게임',
    'FPS 수직 에임',
    '오버워치 파라 에임 연습',
    '에임 트레이너 사이트',
    'Y축 마우스 컨트롤',
    '에이펙스 수직 에임',
    '공중전 에임 트레이너'
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/vertical-air-track",
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "수직 에임 연습 – 브라우저 무료 FPS 공중 트래킹 에임 트레이너 | SkillDrills",
    description: "브라우저에서 무료로 즐기는 FPS 수직 에임 및 공중 타겟 트래킹 연습 사이트. 중력 가속도로 낙하하는 포물선 궤적 예측, Y축 마우스 정밀 컨트롤, 파라/에코 대공 추적을 훈련하여 에이펙스 레전드와 오버워치 2 승률을 높이세요.",
    url: "https://skilldrills.online/ko/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "수직 에임 연습 – 브라우저 무료 FPS 공중 트래킹 에임 트레이너 | SkillDrills",
    description: "브라우저에서 무료로 즐기는 FPS 수직 에임 및 공중 타겟 트래킹 연습 사이트. 중력 가속도로 낙하하는 포물선 궤적 예측, Y축 마우스 정밀 컨트롤, 파라/에코 대공 추적을 훈련하여 에이펙스 레전드와 오버워치 2 승률을 높이세요.",
  },
};

export default function VerticalAirTrackPageKo() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 드릴", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "수직 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "수직 에임 연습 (Vertical Aim Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 수직 트래킹 에임 연습 도구. 중력 가속도로 낙하하는 공중 타겟의 포물선 궤적 예측과 Y축 마우스 조작을 단련합니다.",
    "genre": "FPS Training / Vertical Tracking",
    "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "수직 에임 연습 (Vertical Aim Trainer)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Pointer Lock API, JavaScript, HTML5 Canvas 지원 브라우저",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 수직 트래킹 에임 연습 도구. 중력 가속도로 낙하하는 공중 타겟의 포물선 궤적 예측과 Y축 마우스 조작을 단련합니다.",
    "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "수직 에임 연습 (Vertical Aim Trainer)",
    "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 수직 트래킹 에임 연습 도구. 중력 가속도로 낙하하는 공중 타겟의 포물선 궤적 예측과 Y축 마우스 조작을 단련합니다.",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Vertical Tracking"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPS 게임에서 '수직 에임(Y축 에임)' 연습이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "수직 에임 연습은 마우스의 Y축(상하 방향) 이동과 시각 추적 능력을 집중적으로 훈련하는 과정입니다. 좌우 수평 트래킹에 비해 평소 연습량이 부족하기 쉬운 공중 및 낙하 궤적 조준을 전문적으로 보완합니다."
        }
      },
      {
        "@type": "Question",
        "name": "팝콘 트래킹이란 무엇이며, 이 드릴로 연습할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "팝콘 트래킹은 팝콘이 튀어 오르듯 공중으로 높이 발사된 후 중력에 의해 포물선을 그리며 떨어지는 타겟을 매끄럽게 추적하는 기술입니다. 본 드릴은 중력 가속도 물리 엔진을 적용하여 공중 팝콘 궤적 추적을 정밀하게 훈련합니다."
        }
      },
      {
        "@type": "Question",
        "name": "에이펙스 레전드(Apex Legends)에서 수직 에임이 중요한 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "에이펙스 레전드는 옥테인의 점프 패드, 호라이즌의 중력 리프트, 패스파인더의 그래플링 훅, 발키리의 제트팩 등 공중 입체 기동이 매우 빈번합니다. 수직 에임을 단련하면 공중으로 도주하거나 강습하는 적을 놓치지 않고 레이저 트래킹할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "FPS 경기에서 '엘리베이터 피크'란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "로프나 집라인 승강, 혹은 고지대 낙하를 통해 수평이 아닌 수직 상하에서 돌발적으로 머리를 내미는 교전 형태를 말합니다. 본 드릴은 상하 돌발 등장에 대한 신속한 초기 정렬과 추적을 단련합니다."
        }
      },
      {
        "@type": "Question",
        "name": "수직 트래킹이 수평 트래킹보다 생체역학적으로 더 어려운 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "수평 트래킹은 팔꿈치 회전과 손목의 자연스러운 굴곡으로 편안하게 수행되지만, 수직 트래킹은 손목 신전, 손가락 굴곡, 또는 전완 전체를 마우스패드 위에 마찰시키며 당겨야 하므로 정지 마찰력의 변화가 훨씬 크기 때문입니다."
        }
      },
      {
        "@type": "Question",
        "name": "오버워치 2(Overwatch 2) 대공 트래킹에 실질적인 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큰 도움이 됩니다. 공중에 체공하는 파라, 에코, 메르시를 요격하거나 진입하는 윈스턴과 둠피스트의 포물선 도약 궤적에 크로스헤어를 완벽하게 일치시킬 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "헤일로 인피니트 같은 하이퍼 슈터에서도 유용한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 그래플샷, 리펄서 도약, 맨 캐논 발사 등으로 체공하는 스파르탄을 상대로 BR 4점사를 침착하게 적중시키는 Y축 마우스 컨트롤이 향상됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "Vertical Air-Track 드릴의 점수 체계와 페널티는 어떻게 작동하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "타겟을 조준선에서 놓치면 활성 콤보 배율이 초기화됩니다. 시간 페널티 설정을 활성화한 상태에서 타겟을 파괴하지 못하고 바닥으로 떨어뜨릴 경우 세션 타이머가 0.6초 차감됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "수직 에임 연습은 일주일에 몇 번 하는 것이 좋은가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "회당 10~15분씩 주 3~4회 꾸준히 연습하면 손목 신전근의 근지구력이 향상되어 교전 중 발생하는 미세한 마우스 상하 떨림(지터)이 눈에 띄게 줄어듭니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 수직 에임 트레이너는 무료로 이용할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 완전 무료이며 별도의 다운로드나 회원가입 없이 PC 브라우저에서 하드웨어 RAW 마우스 입력으로 즉시 실행됩니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "수직 Y축 트래킹 에임 훈련법",
    "description": "공중 포물선 낙하 타겟을 예측하고 매끄러운 수직 마우스 컨트롤을 완성하는 4단계.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "감도 일치 및 포인터 락 활성화",
        "text": "자신이 플레이하는 주력 FPS 게임의 감도와 DPI를 설정하고, 화면을 클릭하여 마우스 포인터를 고정합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "포물선 상승 궤적 및 정점 감속 속도 일치",
        "text": "발사된 타겟의 상승 궤적을 부드럽게 추종하며, 최고 정점(Apex)에서 수직 속도가 0에 수렴하는 순간을 예측해 마우스 속도를 조절합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "중력 가속 낙하에 맞춘 매끄러운 수직 드래그",
        "text": "정점을 지나 중력으로 가속 낙하하는 타겟에 맞춰 손목과 손가락을 부드럽게 이완시키며 수직으로 흔들림 없이 마우스를 아래로 당깁니다.",
        "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "바닥 착지 전 요격 완료 및 크로스헤어 재정렬",
        "text": "타겟이 화면 아래로 떨어지기 전에 완전히 파괴하고, 여분의 반동 없이 신속하게 중앙으로 조준선을 복귀시켜 다음 발사에 대비합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/vertical-air-track#step-4"
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "수직 에임 연습 가이드 & 공중 포물선 트래킹 이론",
    intro: [
      "수직 에임 연습(Vertical Air-Track)은 마우스의 Y축 추적 정밀도, 중력 포물선 궤적 예측, 공중 타겟 요격 능력을 체계적으로 단련하기 위해 설계된 고급 FPS 모터 컨트롤 드릴입니다. 에이펙스 레전드, 오버워치 2, 헤일로 인피니트 등 입체 기동 슈터에서는 점프 패드, 와이어, 고지대 낙하 등을 활용해 수평 조준선을 교란하는 플레이가 핵심 승부처가 됩니다.",
      "상하(수직) 부드러운 안구 추종(Smooth Pursuit)의 신경생리학적 메커니즘은 좌우 수평 추적과 근본적으로 다릅니다. Richard J. Krauzlis(2004)의 연구에 따르면 수직 시각 추적은 소뇌 충부와 뇌간의 고유 경로를 활성화하며, 상지 골격 구조의 비대칭성으로 인해 모터 지터(떨림)에 더 취약합니다. 또한 Cyril Rashbass(1961)가 입증했듯 매끄러운 추적 운동은 위치 오차가 아닌 '속도 오차(망막 슬립)'에 의해 구동되므로, 딱딱 끊어 치는 플릭이 아닌 연속적인 속도 동기화가 필수적입니다.",
      "공중에 뜬 적을 명중시키려면 중력 가속도(g = 9.81 m/s²)의 물리 법칙을 직관적으로 내면화해야 합니다. Peter R. Cavanagh 등(1984)과 Michael F. Land & Peter McLeod(2000)의 분석에 따르면 숙련된 요격자는 도약 정점에서의 감속과 이후의 급격한 낙하 가속을 미리 예측하고 시선과 손목을 선행 연동시킵니다.",
      "본 드릴은 수평 방향의 타성을 배제하고 순수한 Y축 운동만을 분리 훈련합니다. performance.now() 고해상도 디지털 시간 측정(Woods et al., 2015)을 통해 수평 머슬 메모리와 진정한 360도 3D 입체 트래킹 숙련도 사이의 격차를 완벽하게 메워줍니다.",
      "측정 정확도 안내: 모든 이벤트는 브라우저의 performance.now() 고정밀 클록을 사용해 사용자 기기 내에서 밀리초 단위로 안전하게 처리됩니다. 브라우저 보안 완화책으로 타이머는 약 1ms 단위로 반올림되며, 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 양자화가 발생합니다. 5ms 미만의 차이는 측정 편차로 간주하고 다른 사람의 PC 환경과 단순 비교하기보다는 동일한 기기 환경에서의 개인 성취도 향상 지표로 활용하시기 바랍니다."
    ],
    benchmarks: {
      title: "수직 부드러운 안구 추종 및 공중 트래킹 벤치마크",
      headers: ["퍼포먼스 티어", "공중 타겟 체공 적중률", "정점 방향 전환 지연시간", "게임 내 실전 교전력"],
      rows: [
        ["Tier 1 (프레데터 / 그랜드마스터 / 대공 에이스)", "82% 이상", "180 ms 미만", "점프 패드 및 그래플로 날아가는 적을 완벽하게 레이저 트래킹. 정점 감속 및 낙하 가속 전환이 무결점"],
        ["Tier 2 (마스터 / 세미프로급 게이머)", "70% – 82%", "180 – 230 ms", "안정적인 Y축 트래킹. 돌발 발사 순간에 미세한 흔들림이 있으나 공중 타겟을 확실하게 처치함"],
        ["Tier 3 (다이아몬드 / 상위권 랭커)", "56% – 70%", "230 – 290 ms", "예측 가능한 포물선 궤적은 양호하게 추적함. 공중에서 에어 스트레이프가 섞일 때 반응이 지연됨"],
        ["Tier 4 (골드 / 플래티넘 구간)", "40% – 56%", "290 – 360 ms", "낙하 가속 시 크로스헤어가 타겟 뒤로 처지며, 이를 만회하려다 과도하게 지나쳐버리는 현상 발생"],
        ["Tier 5 (초심자 / 비기너)", "40% 미만", "360 ms 이상", "심한 Y축 손목 떨림. 손목과 팔에 과도한 힘이 들어가 정점을 지나면 타겟을 완전히 시야에서 놓침"]
      ],
      note: "체공 적중률은 타겟의 총 공중 비행 시간 중 조준선이 유효 타격 범위 내에 머무른 비율을 뜻하며, 방향 전환 지연시간은 최고 정점에서 Y축 이동 방향을 반전시키는 데 걸린 시간을 의미합니다 (Woods et al., 2015)."
    },
    techniques: {
      title: "수직 에임 정밀도를 극대화하는 신경 운동 프로토콜",
      items: [
        {
          name: "손목 신전과 손가락 관절의 독립적 미세 조절",
          desc: "마우스 상하 이동 시 팔 전체를 경직시켜 움직이지 말고 손가락을 굽히고 펴면서 세밀하게 컨트롤합니다 (Fitts, 1954). 어깨나 팔에 불필요한 힘이 들어가면 좌우로 흔들리는 와블 현상이 발생합니다.",
          tips: "손가락을 살짝 오므려 마우스를 부드럽게 아래로 당기고, 손가락을 펴면서 위로 밀어 올리세요."
        },
        {
          name: "포물선 정점(Apex)에서의 속도 감속 동기화",
          desc: "점프의 최고 정점에서는 수직 이동 속도가 일시적으로 0에 가까워집니다 (Rashbass, 1961; Land & McLeod, 2000). 타겟이 멈추기 직전 마우스 이동 속도를 의도적으로 늦추어야 합니다.",
          tips: "정점 구간은 가장 손쉬운 킬 찬스입니다. 궤적의 꼭대기 직전에 마우스 당김 속도를 늦추세요."
        },
        {
          name: "낙하 가속에 선행하는 시선 하단 앵커링",
          desc: "타겟이 낙하하기 시작하면 시선을 타겟의 밑단으로 빠르게 옮기세요. 중력 가속도로 인해 떨어지는 속도가 급격히 빨라지므로 시선이 하단을 먼저 리드해야 합니다.",
          tips: "떨어지는 적의 윗부분을 보지 마세요. 적의 바닥 실루엣에 시선을 두고 마우스를 아래로 당기세요."
        },
        {
          name: "전완 마찰 감소 및 마우스패드 글라이딩",
          desc: "책상이나 패드에 팔뚝 피부가 들러붙으면 마우스를 아래로 당길 때 턱턱 걸리는 현상이 발생합니다. 정지 마찰력이 높으면 부드러운 수직 추적이 불가능합니다.",
          tips: "암 슬리브를 착용하거나 손목을 패드의 매끄러운 부위에 위치시켜 피부 마찰 저항을 없애세요."
        }
      ]
    },
    steps: [
      "설정에서 인게임 감도와 마우스 DPI를 평소 플레이하는 FPS 환경과 일치시키고 클릭하여 포인터 고정.",
      "화면 하단의 타겟 발사 위치 부근에 크로스헤어를 미리 배치하고 돌발 수직 사출에 대비.",
      "공중으로 솟구치는 상승 궤적을 부드럽게 추종하며 손가락 신전을 이용해 상승 속도와 일치.",
      "정점에서의 감속 타이밍에 맞춰 마우스 호흡을 가다듬고 체공 시간 동안 집중 타격.",
      "중력으로 가속 낙하하는 타겟에 맞춰 마우스를 수직 아래로 가속하며 바닥에 닿기 전에 완전 격추."
    ],
    audience: "에이펙스 레전드, 오버워치 2, 헤일로 인피니트, 발로란트 등에서 공중 기동 및 엘리베이터 피크, 입체전 교전 승률을 끌어올리고자 하는 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'rashbass1961', 'land2000'),
    related: [
      { href: "/ko/drills/fps/strafe-tracking", label: "에임 트래킹 연습 (무빙 추적)" },
      { href: "/ko/drills/motor/hand-eye-coordination/aim-trainer", label: "에임 트레이너 (플릭 샷)" },
      { href: "/ko/drills/reaction-speed/reaction-game", label: "반응속도 테스트 게임" },
      { href: "/ko/drills/reaction-speed/visual-tracking-speed-test", label: "시각 추적 속도 테스트" },
      { href: "/ko/drills/motor/keyboard-tester", label: "키보드 테스트기" }
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
      <VerticalAirTrackClient
        copy={{
          h1Keyword: "수직 에임 연습",
          h1Suffix: " – 브라우저 무료 FPS 공중 트래킹 트레이너",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "트래킹 적중률",
          statBestScore: "최고 점수",
          statTargetsDestroyed: "파괴 타겟",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "Vertical Air-Track",
          startSubtitle: "초정밀 RAW 마우스 입력 • 무한 난이도 진행",
          startButtonText: "훈련 시작",
          playAgainText: "다시 도전",
          shareText: "결과 공유",
          exitText: "나가기",
          stageCaption: "중력 가속도로 포물선을 그리며 낙하하는 공중 타겟을 추적하여 매끄러운 Y축 트래킹 정밀도를 훈련합니다.",
          rulesTitle: "드릴 조작법 & 점수 획득 규칙",
          aboutTitle: "수직 에임 연습(Vertical Air-Track)에 대하여",
          rulesItems: [
            {
              num: "1",
              text: "공중 타겟 추적",
              highlight: "파괴 시 +100점 / +0.4초",
              result: "중력 포물선 낙하 궤적을 부드럽게 추종"
            },
            {
              num: "2",
              text: "고도 보너스",
              highlight: "최대 +75점",
              result: "높은 고도에서 타겟을 요격할수록 추가 점수"
            },
            {
              num: "3",
              text: "미스 및 낙하 페널티",
              highlight: "콤보 초기화",
              result: "조준선 이탈 시 콤보 리셋 (페널티 활성화 시 -0.6초)"
            },
            {
              num: "4",
              text: "레벨 상승 시스템",
              highlight: "1400점마다 레벨업",
              result: "중력 가속도와 비행 속도가 점진적으로 증가"
            }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/vertical-air-track"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
