// The home page FAQ, kept out of the client component so the server page can
// emit matching FAQPage schema. Google requires the structured data to be the
// same text the visitor sees — one array is the only way to guarantee that.
export const HOME_FAQ_ITEMS = [
  {
    q: 'Are the drills really free, with no account?',
    a: 'Yes. Every drill is open — no sign-up, no email wall, no paid tier. Drills run inside your browser tab rather than on a server, so there is nothing to bill you for.',
  },
  {
    q: 'How does the site measure reaction time?',
    a: 'Input is timed with the browser’s high-resolution clock (performance.now()) and drills render on canvas at your display’s refresh rate. That makes your scores consistent with each other, so you can track your own trend. It does not make them lab-grade: your monitor, mouse polling rate and browser each add latency on top.',
  },
  {
    q: 'Where are my scores stored?',
    a: 'In your browser’s localStorage, on the device you trained on. Personal bests, levels and session history are never uploaded. Clearing site data clears your history, and scores do not follow you to another device.',
  },
  {
    q: 'Can this replace Aim Lab or KovaaK’s?',
    a: 'No, and it is not trying to. Those run a 3D engine and can clone a game’s exact sensitivity. This is for the warm-up: a real drill running a second after you open a tab, on any machine — including one you do not own.',
  },
  {
    q: 'Which drills work on a phone?',
    a: 'Cognitive, memory, visual, visual-tracking and reaction drills are built for touch. FPS, motor and physical drills need a mouse or keyboard, and are labelled desktop-only wherever they appear.',
  },
];
