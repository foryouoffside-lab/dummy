import KeyboardRecognitionClient from './KeyboardRecognitionClient';

export const metadata = {
  title: "Keyboard Recognition & Keybind Speed Trainer | SkillDrills",
  description: "Master keyboard layout familiarity and gaming keybind reflex speed. Train keybind muscle memory for Valorant, CS2, Fortnite, Minecraft, Apex, and LoL.",
  keywords: [
    "keyboard recognition trainer",
    "keybind speed trainer",
    "keyboard layout trainer",
    "gaming keybind trainer",
    "keybind muscle memory",
    "keyboard reflex speed",
    "response inhibition training",
    "keyboard familiarity test",
    "valorant keybind training",
    "cs2 keybind practice",
    "fortnite keybind practice",
    "minecraft keyboard training",
    "keyboard speed test online"
  ],
  openGraph: {
    title: "Keyboard Recognition & Keybind Speed Trainer | SkillDrills",
    description: "Master keyboard layout familiarity and gaming keybind reflex speed. Train keybind muscle memory for Valorant, CS2, Fortnite, Minecraft, Apex, and LoL.",
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Keyboard Recognition & Keybind Speed Trainer Online',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Keyboard Recognition & Keybind Speed Trainer | SkillDrills",
    description: "Master keyboard layout familiarity and gaming keybind reflex speed. Train keybind muscle memory for Valorant, CS2, Fortnite, Minecraft, Apex, and LoL.",
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition',
  },
};

export default function KeyboardRecognitionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
      { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
      { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
      { "@type": "ListItem", "position": 4, "name": "Keyboard Recognition & Keybind Speed Trainer", "item": "https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Keyboard Recognition & Keybind Speed Trainer",
    "url": "https://skilldrills.online/drills/motor/movement-speed/keyboard-recognition",
    "description": "Keyboard Recognition & Keybind Speed Trainer is a free web-based simulator designed to train the full cognitive chain of visual prompt detection, keyboard layout mapping, response inhibition, and motor execution. Includes standard presets for Valorant, CS2, Fortnite, Minecraft, LoL, and Apex Legends, as well as a full custom keybind configuration visual utility.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All (Desktop, Web)",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "SkillDrills" },
    "isAccessibleForFree": true
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Keyboard Recognition & Keybind Speed Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is a premium cognitive-motor training drill that displays key binds, sequences, or fake prompts at the center of the screen. You must type the matching inputs as quickly and accurately as possible while avoiding invalid commands."
        }
      },
      {
        "@type": "Question",
        "name": "How does keybind training improve gaming performance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By reinforcing the subconscious link between a tactical visual event (like needing to cast a spell, reload, or deploy a wall) and the physical key location on your keyboard, you reduce input latency and bypass conscious search time, developing pure muscle memory."
        }
      },
      {
        "@type": "Question",
        "name": "What custom options are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can select exactly which keys are enabled using our visual keyboard layout, choose from 10 gameplay modes (including Gaming Keys, Sequences, and Memory Sequences), and pick a difficulty from Adaptive Engine to Expert. Your best score and accuracy are automatically saved in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "What gaming presets are pre-loaded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide pre-loaded profiles for top competitive titles: Valorant, CS2, Fortnite, Minecraft, League of Legends, and Apex Legends, equipping you with the standard layouts of each game immediately."
        }
      },
      {
        "@type": "Question",
        "name": "How does Fake Prompt Mode train response inhibition?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It displays commands like 'Fire', 'Jump', or invalid characters that you must actively ignore. Pressing any key fails the prompt. This trains cognitive self-control, helping you avoid panic inputs in intense clutch situations."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Keyboard Recognition & Keybind Speed",
    "description": "Step-by-step instructions to train keyboard muscle memory, response speed, and finger dexterity.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select a Training Profile",
        "text": "Choose a game preset like Valorant or CS2, or create a custom profile selecting specific keys to train."
      },
      {
        "@type": "HowToStep",
        "name": "Choose a Gameplay Mode",
        "text": "Pick from Single Key, Sequences, Memory Mode, or Dynamic Progression which scales difficulty dynamically."
      },
      {
        "@type": "HowToStep",
        "name": "Execute Key Prompts",
        "text": "Type the displayed keys instantly. For memory sequences, memorize the prompt before it vanishes. For fake prompts, keep your hands off the keyboard."
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <KeyboardRecognitionClient />
    </>
  );
}
