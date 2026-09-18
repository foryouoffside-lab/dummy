import { pickSources } from '@/lib/drillSources';
import KeyboardTesterClient from './KeyboardTesterClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
// ============================================================
// SEO & MARKET RESEARCH FINDINGS — keyboard-tester (motor-keyboard-tester)
// PRIMARY:   "keyboard tester"          — ~14,000/mo
//            "keyboard test"            — ~2,500/mo
// SECONDARY: "key test", "keyboard test online", "test my keyboard",
//            "keyboard checker", "stuck key test", "dead key test",
//            "key rollover test", "keyboard ghosting test", "nkro test"
// ============================================================

export const metadata = {
  title: 'Keyboard Tester – Online Key Checker | SkillDrills',
  description:
    'Test every key on your keyboard in the browser. Find dead or stuck keys, check key rollover and ghosting, and inspect event codes. Free, no install.',
  keywords: [
    'keyboard tester',
    'keyboard test',
    'key test',
    'keyboard test online',
    'test my keyboard',
    'keyboard checker',
    'stuck key test',
    'dead key test',
    'key rollover test',
    'keyboard ghosting test',
    'nkro test',
    'online keyboard tester',
  ],
  openGraph: {
    title: 'Keyboard Tester – Online Key Checker | SkillDrills',
    description:
      'Press every key and see which ones register. Find dead or stuck keys, measure key rollover, and read the exact event each key sends. Free, no install.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/keyboard-tester',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyboard Tester – Online Key Checker | SkillDrills',
    description:
      'Press every key and see which ones register. Find dead or stuck keys, measure key rollover, and read the exact event each key sends.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/keyboard-tester',
    languages: getAlternateLanguages('/drills/motor/keyboard-tester'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Motor Training',
      item: 'https://skilldrills.online/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Keyboard Tester',
      item: 'https://skilldrills.online/drills/motor/keyboard-tester',
    },
  ],
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Keyboard Tester',
  alternateName: ['Keyboard Test', 'Key Checker'],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires a modern web browser and a physical keyboard',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free browser-based keyboard tester. Press each key to confirm it registers, identify dead or stuck keys, measure key rollover, and inspect raw key events.',
  url: 'https://skilldrills.online/drills/motor/keyboard-tester',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Keyboard Tester – Key Checker and Ghosting Test Online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based keyboard tester. Press each key to confirm it registers, identify dead or stuck keys, measure key rollover, and inspect raw key events.',
  url: 'https://skilldrills.online/drills/motor/keyboard-tester',
  dateModified: '2026-09-16',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' }
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Keyboard Tester and Key Rollover Game',
  url: 'https://skilldrills.online/drills/motor/keyboard-tester',
  description: 'Interactive online keyboard diagnostic and key testing tool. Verify switch response and multi-key chord inputs.',
  dateModified: '2026-09-16',
  gamePlatform: 'Web Browser',
  genre: ['Keyboard Tester', 'Utilities', 'Hardware Diagnostic', 'Keystroke Test'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Test Keyboard Keys Online',
  description: 'Step-by-step instructions to test keyboard switch registration, detect dead keys, and verify multi-key rollover.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/drills/motor/keyboard-tester#step-1',
      name: 'Press Every Key Individually',
      text: 'Press each key on your keyboard systematically. Each functional key will light up blue while pressed and turn green once confirmed.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/drills/motor/keyboard-tester#step-2',
      name: 'Test Key Rollover and Ghosting',
      text: 'Press multiple keys simultaneously (such as WASD, Shift, and Spacebar) to observe maximum concurrent keystroke registration (NKRO).'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/drills/motor/keyboard-tester#step-3',
      name: 'Inspect Raw Keystroke Telemetry',
      text: 'Examine the real-time event log displaying event.code, event.key, and hardware keyCode data to diagnose driver or mapping issues.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/drills/motor/keyboard-tester#step-4',
      name: 'Review Diagnosis and Reset State',
      text: 'Review untested keys to isolate physical switch failures, stuck keys, or firmware limitations, then click Reset to test again.'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I test if my keyboard keys are working?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open this page and press every key once. Each key highlights while held and stays green once it has registered, so anything still unmarked after a firm press is not reaching the browser. The running not yet confirmed list shows exactly which keys are outstanding.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it mean if a key does not light up?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The key is not reaching the browser. That points to a fault somewhere along the chain of switch, controller, cable or wireless link, driver and operating system. A single unresponsive key is usually a failed switch or debris under the keycap; a whole row failing indicates a ribbon or controller problem.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is key rollover and how do I test it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key rollover is how many keys a keyboard can report simultaneously. Hold several keys down together and read the rollover figure. Many membrane keyboards stop between two and six keys, silently dropping the rest, which is called ghosting. Keyboards advertising NKRO report every key held.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do some keys never register in a browser keyboard test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The operating system intercepts certain combinations before any browser receives them, including Alt+Tab and Ctrl+Alt+Delete. This tester also deliberately passes F5, F11 and F12 through to the browser so you keep refresh, fullscreen and developer tools. Those keys not appearing is expected behaviour.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a stuck key?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Release every key, then look at the layout. A key still showing as held while you are touching nothing is stuck down. Stuck keys are usually mechanical, caused by debris or a spring that has not returned, and they explain repeating characters and shortcuts firing on their own.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this keyboard tester record what I type?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Every key event is handled in your browser and discarded when you leave or reset the page. Nothing is uploaded, nothing is written to storage, and no key history is retained.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between event.code and event.key?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'event.code identifies the physical key position and does not change with layout or modifiers, so the key left of the number row is always Backquote. event.key is the character produced, which changes with Shift, Alt Gr and the active keyboard layout. Diagnosing hardware uses event.code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is keyboard ghosting and how does it happen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Keyboard ghosting occurs when pressing certain key combinations causes an unpressed key to register erroneously, or prevents additional simultaneous keypresses from registering due to shared electrical matrix wiring in cheaper membrane keyboards. Mechanical keyboards avoid this with dedicated diodes per switch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tester support mechanical, optical, and membrane keyboards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The tester intercepts standard W3C KeyboardEvent signals dispatched by the operating system, making it compatible with any USB, Bluetooth, 2.4GHz wireless, mechanical, magnetic Hall-effect, optical, or membrane keyboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this online keyboard tester safe and free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SkillDrills Keyboard Tester is 100% free and completely private. Keystrokes are captured exclusively within your local browser sandbox and are never transmitted to any external server or stored in persistent storage.',
      },
    },
  ],
};

const guideProps = {
  intro: {
    title: 'What a keyboard tester actually checks',
    sources: pickSources('woods2015'),
    paragraphs: [
      'A keyboard tester confirms that each physical key produces an event the computer receives. Press a key, and the browser is handed a code identifying which key position moved; if no event arrives, the key is not being read. That single fact is what separates a hardware fault from a software one, and it is the whole purpose of this page.',
      'What it cannot do is tell you where along the chain the failure sits. A key press passes through the switch, the keyboard controller, the cable or wireless link, the driver and the operating system before a web page hears about it. This tool sees only the far end of that chain. It reliably answers whether a key registers, and deliberately does not guess why.',
    ],
  },
  benchmarks: {
    title: 'Keyboard Rollover and Diagnostic Performance Tiers',
    caption: 'Technical classifications based on keyboard controller matrix scanning, switch debounce, and USB polling architecture. SkillDrills evaluates signals strictly inside your local browser.',
    headers: ['Tier', 'Hardware Architecture', 'Rollover Capacity', 'Matrix Anti-Ghosting', 'Typical Switch Latency', 'Diagnostic and Gaming Profile'],
    rows: [
      [
        'Tier 1',
        'Full NKRO (Magnetic Hall-Effect / Optical)',
        'True N-Key (> 50 keys)',
        'Individual diode per switch; zero matrix blocking',
        'Under 1.0 ms (8000 Hz / 1000 Hz polling)',
        'Elite competitive tier: Instantaneous multi-key chords, rapid trigger actuation, zero chattering.',
      ],
      [
        'Tier 2',
        '6KRO / 10KRO Mechanical (Mechanical Switches)',
        '6 to 10 Simultaneous Keys',
        'Dedicated diodes across all primary alphas and modifiers',
        '2.0–5.0 ms (1000 Hz polling, contact debounce)',
        'High-performance gaming: Flawless chord registrations for complex gaming macros and directional inputs.',
      ],
      [
        'Tier 3',
        'Optimized Gaming Matrix (Hybrid Membrane)',
        '4 to 6 Keys (WASD cluster)',
        'Cluster anti-ghosting around standard gaming keys',
        '8.0–15.0 ms (125–500 Hz polling)',
        'Standard enthusiast: Reliable for FPS movement, occasional blocking on peripheral navigation clusters.',
      ],
      [
        'Tier 4',
        'Standard Office Matrix (Basic Membrane)',
        '2 to 3 Keys (2KRO)',
        'Shared row/column matrix; frequent ghosting dropouts',
        '15.0–30.0 ms (125 Hz USB polling)',
        'Baseline desktop: Prone to ghosting when 3+ rapid simultaneous keys or key chords are pressed.',
      ],
      [
        'Tier 5',
        'Faulty / Chattering Hardware (Degraded Switch)',
        'Intermittent / Single Key Dropout',
        'Matrix trace corrosion or oxidized mechanical contact leaf',
        'Erratic / Double Bounce (> 35 ms jitter)',
        'Hardware failure: Double-activation chatter, dead keycodes, or stuck continuous actuation.',
      ],
    ],
  },
  faqs: {
    title: 'Keyboard testing — frequently asked questions',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function KeyboardTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <KeyboardTesterClient />
      <DrillGuide {...guideProps} />
    </>
  );
}
