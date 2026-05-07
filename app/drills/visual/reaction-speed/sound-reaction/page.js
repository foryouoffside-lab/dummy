import NeuroSwitchClient from './NeuroSwitchClient';

export const metadata = {
  title: 'Neuro-Switch - Sound Reaction Speed & Audio Cue Training',
  description: 'Train auditory reaction speed by responding to high and low pitch cues. Click GREEN circle for high pitch (1200Hz), RED for low pitch (250Hz). Adaptive 300-1000ms window. 60-second challenge with 3 lives and streak tracking.',
  keywords: [
    'sound reaction test', 'audio reaction speed', 'auditory cue training',
    'sound reaction drill', 'pitch discrimination', 'audio reflex training',
    'sound response test', 'high pitch low pitch', 'neuro switch drill',
    'auditory processing speed', 'reaction to sound', 'free sound reaction test',
    'audio stimulus training', 'cognitive flexibility drill'
  ],
  openGraph: {
    title: 'Neuro-Switch - Sound Reaction Speed & Audio Cue Training',
    description: 'Respond to audio cues: high pitch = click GREEN, low pitch = click RED. Adaptive 300-1000ms window. 60-second challenge with 3 lives, 5-streak bonuses, and reaction time tracking.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/sound-reaction',
  },
};

export default function NeuroSwitchPage() {
  return <NeuroSwitchClient />;
}