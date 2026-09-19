import VerticalAirTrackClient from './VerticalAirTrackClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: 'Vertical Aim Trainer – Y-Axis Air Tracking | SkillDrills',
  description: "Free vertical aim trainer. Track targets on the Y-axis and predict falling arcs for airborne fights in Apex Legends, Overwatch 2 and Halo Infinite.",
  keywords: [
    'vertical aim trainer',
    'vertical aim training',
    'vertical tracking trainer',
    'y axis aim trainer',
    'y axis mouse control drill',
    'aerial target tracking',
    'popcorn tracking aim practice',
    'air tracking trainer',
    'apex legends vertical aim',
    'overwatch air tracking',
    'parabolic arc tracking drill',
    'free vertical aim trainer'
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/fps/vertical-air-track",
    languages: getAlternateLanguages('/drills/fps/vertical-air-track'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Vertical Aim Trainer – Y-Axis Air Tracking | SkillDrills',
    description: "Improve your Y-axis mouse control, aerial target tracking, and parabolic arc prediction with our free Vertical Aim Trainer for Apex Legends, Overwatch 2, and Halo Infinite.",
    url: "https://skilldrills.online/drills/fps/vertical-air-track",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertical Aim Trainer – Y-Axis Air Tracking | SkillDrills',
    description: "Improve your Y-axis mouse control, aerial target tracking, and parabolic arc prediction with our free Vertical Aim Trainer for Apex Legends, Overwatch 2, and Halo Infinite.",
  },
};

export default function VerticalAirTrackPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS Drills", "item": "https://skilldrills.online/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "Vertical Air Track", "item": "https://skilldrills.online/drills/fps/vertical-air-track" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vertical Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Halo Infinite.",
    "genre": "FPS Training / Vertical & Aerial Tracking",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Vertical Aim Trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Requires Pointer Lock API, JavaScript, HTML5 Canvas",
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Halo Infinite.",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Vertical Aim Trainer",
    "url": "https://skilldrills.online/drills/fps/vertical-air-track",
    "description": "A free browser FPS drill training vertical aim, aerial target tracking, Y-axis mouse control, and jump shot prediction for Apex Legends, Overwatch 2, and Halo Infinite.",
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
        "name": "What is vertical aim training in FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vertical aim training focuses on the Y-axis (up and down) movement of your mouse, which is systematically under-trained compared to horizontal tracking. Airborne targets require vertical mouse tracking to follow cleanly in games like Apex Legends, Overwatch 2, and Halo Infinite."
        }
      },
      {
        "@type": "Question",
        "name": "What is popcorn tracking and does this drill train it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Popcorn tracking is tracking targets that bounce or hop vertically, creating irregular parabolic movement patterns like popcorn kernels popping. This drill isolates and conditions the vertical smooth pursuit necessary to track bouncing aerial movement."
        }
      },
      {
        "@type": "Question",
        "name": "How does vertical aim training help in Apex Legends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex Legends features high vertical movement including Octane jump pads, Horizon gravity lifts, Pathfinder grapple swings, and Valkyrie jetpacks. Training vertical aim enables players to track and beam airborne opponents without losing crosshair alignment."
        }
      },
      {
        "@type": "Question",
        "name": "What is an elevator peek in competitive FPS games?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An elevator peek occurs when an opponent uses vertical mobility (ropes, ziplines, or high-ground elevation) to appear above crosshair level unexpectedly. This drill trains the upward snap and tracking hold motion required to punish vertical peeks."
        }
      },
      {
        "@type": "Question",
        "name": "Why is vertical tracking biomechanically harder than horizontal tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Horizontal tracking relies on natural forearm rotation at the elbow and wrist flexion. Vertical tracking requires awkward wrist extension, finger contraction, or sliding the entire forearm across the mouse pad, encountering higher static friction."
        }
      },
      {
        "@type": "Question",
        "name": "How do Overwatch 2 players train aerial tracking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Overwatch 2 players practice tracking high-mobility aerial heroes like Pharah, Echo, Mercy, and diving Winston or Doomfist. Using vertical tracking drills develops consistent Y-axis velocity matching against erratic airborne flight paths."
        }
      },
      {
        "@type": "Question",
        "name": "Does vertical aim training improve Halo Infinite performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Halo Infinite features Grappleshot mechanics, Repulsor jumps, and Man Cannons that launch Spartans across vertical axes. Dedicated vertical pursuit training helps players land four-shot BR bursts on airborne opponents."
        }
      },
      {
        "@type": "Question",
        "name": "How are errors penalised in Vertical Air-Track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Losing tracking contact resets your active combo streak multiplier. When the optional Time Penalty setting is enabled, letting an airborne target drop past the bottom boundary without destroying it deducts 0.6s from your session timer."
        }
      },
      {
        "@type": "Question",
        "name": "How often should competitive gamers practice vertical aim drills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ten to fifteen minutes of dedicated vertical tracking 3 to 4 times per week builds muscular endurance in the wrist extensors and reduces tracking jitter during intense vertical gunfights."
        }
      },
      {
        "@type": "Question",
        "name": "Is this Vertical Air-Track aim trainer free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this Vertical Aim Trainer is completely free, open-source, and runs directly in your web browser with zero downloads, installs, or account registrations required."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Vertical Y-Axis Tracking",
    "description": "Step-by-step instructions to train aerial tracking, parabolic arc prediction, and vertical mouse control.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Center Reticle and Engage Pointer Lock",
        "text": "Calibrate your sensitivity, lock the mouse cursor to the canvas, and rest your forearm comfortably on the mouse pad.",
        "url": "https://skilldrills.online/drills/fps/vertical-air-track#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Match Parabolic Ascent and Apex Velocity",
        "text": "Track the rising aerial target smoothly, anticipating deceleration at the apex of the jump arc where relative velocity drops.",
        "url": "https://skilldrills.online/drills/fps/vertical-air-track#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Execute Smooth Gravitational Pull-Downs",
        "text": "When the target accelerates downward under gravity, draw the mouse straight down with relaxed wrist extension without horizontal jitter.",
        "url": "https://skilldrills.online/drills/fps/vertical-air-track#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Accelerate Ground Interception and Reset Reticle",
        "text": "Sustain tracking contact as the target accelerates toward the floor, eliminating bounce drift and recentering for the subsequent launch.",
        "url": "https://skilldrills.online/drills/fps/vertical-air-track#step-4"
      }
    ]
  };

  const verticalAirTrackGuide = {
    heading: "Vertical Aim Trainer Guide & Aerial Parabolic Tracking",
    intro: [
      "Vertical Aim Trainer (Vertical Air-Track) is an advanced motor-control drill engineered to isolate and cultivate Y-axis tracking precision, gravitational arc prediction, and aerial target interception. In modern movement shooters—such as Apex Legends, Overwatch 2, Halo Infinite, and Destiny 2—opponents frequently exploit verticality via jump pads, grapple hooks, elevation lifts, and high-ground drops to disrupt horizontal crosshair placement.",
      "The neurobiology of vertical pursuit tracking differs fundamentally from horizontal tracking. Richard J. Krauzlis (2004) showed that vertical smooth pursuit engages distinct cerebellar vermis and brainstem pathways, showing higher susceptibility to motor jitter due to the asymmetry of upper-limb musculoskeletal biomechanics. Cyril Rashbass (1961) proved that smooth pursuit is driven by velocity error (retinal slip) rather than positional error, requiring continuous speed matching rather than static flicking.",
      "Tracking airborne entities requires internalizing gravitational physics ($g = 9.81\\text{ m/s}^2$). As established by Peter R. Cavanagh et al. (1984) and Michael F. Land & Peter McLeod (2000), human visual motor systems anticipate parabolic trajectory deceleration at the jump apex and rapid acceleration during descent. Players who fail to anticipate this velocity curvature consistently under-track falling targets.",
      "By eliminating horizontal crutches and isolating pure Y-axis motion with performance.now() digital chronometry (Woods et al., 2015), this drill bridges the gap between horizontal muscle memory and 360-degree three-dimensional tracking proficiency.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Two things this cannot control: browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes the stimulus to its refresh interval -- about 16.7 ms per frame at 60 Hz, 6.9 ms at 144 Hz and 4.1 ms at 240 Hz (Woods et al., 2015). Mouse polling adds roughly 8 ms at 125 Hz versus 1 ms at 1000 Hz. So treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup."
    ],
    benchmarks: {
      title: "Vertical Smooth Pursuit & Aerial Tracking Benchmarks",
      headers: ["Performance Tier", "Airborne Uptime", "Directional Reversal Latency", "Competitive In-Game Implication"],
      rows: [
        ["Tier 1 (Apex Predator / Grandmaster / Air Ace)", "> 82% Uptime", "Sub-180 ms", "Laser tracking on jump-padded and grappled enemies; near-perfect velocity matching across apex and descent transitions"],
        ["Tier 2 (Competitive Master / Tier-2 Esports)", "70% – 82% Uptime", "180 – 230 ms", "Consistent Y-axis tracking; minor micro-jitters during explosive launch accelerations; reliably beams aerial targets"],
        ["Tier 3 (High-Skill Diamond / Ascendant)", "56% – 70% Uptime", "230 – 290 ms", "Good vertical tracking on predictable parabolic arcs; struggles when aerial targets perform mid-air air-strafes"],
        ["Tier 4 (Intermediate / Gold / Platinum)", "40% – 56% Uptime", "290 – 360 ms", "Noticeable tracking lag during gravitational descent; tends to lag behind fast-falling targets and over-compensate"],
        ["Tier 5 (Developing / Novice)", "Sub-40% Uptime", "360 ms+", "Severe Y-axis jitter; struggles to decouple wrist from arm; loses tracking contact completely during jump arc transitions"]
      ],
      note: "Airborne uptime measures the percentage of active target flight time that crosshairs remain within damage boundaries; directional reversal latency measures time to reverse Y-axis tracking direction at the jump apex (Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols for Perfecting Vertical Aim",
      items: [
        {
          name: "Decoupled Wrist Extension & Fingertip Articulation",
          desc: "Allow your fingers to flex and extend to guide vertical mouse travel (Fitts, 1954). Avoid locking your wrist or pushing the entire mouse with rigid shoulder movement, which introduces lateral tracking wobble.",
          tips: "Curl your fingers slightly to pull the mouse downward smoothly; extend fingers to push the mouse upward."
        },
        {
          name: "Gravitational Velocity Slip Matching at Arc Apex",
          desc: "Anticipate the kinetic slowdown at the apex of every jump arc where vertical velocity momentarily drops toward zero (Rashbass, 1961; Land & McLeod, 2000). Decelerate your crosshair before the target stops ascending.",
          tips: "Treat the apex as an easy hit-window: ease off your mouse speed right before the top of the arc."
        },
        {
          name: "Foveal Gaze Anchoring Ahead of Descent Acceleration",
          desc: "Shift your visual gaze to the bottom edge of the airborne target as it begins its descent. Gravitational acceleration ($g$) causes downward velocity to increase rapidly, requiring proactive downward pulling.",
          tips: "Never stare above a falling target; anchor your eyes slightly below its silhouette to guide the downward pull."
        },
        {
          name: "Forearm Gliding & Pad Friction Calibration",
          desc: "Ensure your forearm glides smoothly along your desk and mouse pad without sticking. High static friction between skin and fabric causes sudden stuttering and tracking disconnects during downward pulls.",
          tips: "Use an arm sleeve or rest your wrist on a low-friction portion of the pad to eliminate skin drag during vertical strokes."
        }
      ]
    },
    steps: [
      "Calibrate your in-game sensitivity and mouse DPI in Settings to match your primary shooter, then lock the hardware cursor.",
      "Position your crosshair near the lower third of the canvas, anticipating the target's vertical launch point.",
      "Follow the upward launch trajectory smoothly, matching vertical ascent velocity with relaxed finger extension.",
      "Hold continuous tracking contact through the apex slowdown to deal maximum damage while the target is high.",
      "Accelerate your downward mouse pull as gravity speeds up the target's descent, maintaining contact until destruction."
    ],
    audience: "Competitive FPS players in Apex Legends, Overwatch 2, Halo Infinite, and Destiny 2 seeking elite Y-axis mouse control, effortless aerial beam tracking, and mastery of jump-pad and elevator peek engagements.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'rashbass1961', 'land2000'),
    related: [
      { href: "/drills/fps/pro-smooth-pursuit", label: "Smooth Pursuit Aim Trainer" },
      { href: "/drills/fps/strafe-tracking", label: "Strafe Tracking Aim Trainer" },
      { href: "/drills/fps/target-switching-swarm", label: "Target Switching Aim Trainer" },
      { href: "/drills/fps/flick-shot-training", label: "Flick Shot Trainer" },
      { href: "/drills/fps/recoil-control", label: "Recoil Control Trainer" }
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
          h1Keyword: "Vertical Aim Trainer",
          h1Suffix: " - Free Airborne Tracking Drill",
          rulesItems: [
            { num: "1", text: "Airborne Target", highlight: "+100 PTS / +0.4s", result: "Track Parabolic Trajectory" },
            { num: "2", text: "Height Bonus", highlight: "Up to +75 PTS", result: "Apex Destructions Award More" },
            { num: "3", text: "Failure Rule", highlight: "Combo Reset", result: "Target Drop Penalty (-0.6s)" },
            { num: "4", text: "Level Progression", highlight: "+1 Level / 1400 PTS", result: "Continuous Dynamic Gravity & Speed" }
          ]
        }}
      />
      <DrillGuide guide={verticalAirTrackGuide} />
      <DrillFooter />
    </>
  );
}
