import SpeedReaderClient from './SpeedReaderClient';

export const metadata = {
  title: '60s Column Scanner - Speed Reading & Peripheral Vision Training',
  description: 'Train columnar reading with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. 60-second timed challenge that improves peripheral vision, reading stamina, and eliminates subvocalization.',
  keywords: [
    'column scanner', 'speed reading columns', 'columnar reading',
    'peripheral vision reading', 'reading stamina training', 'speed reading drill',
    'column reading practice', 'visual span training', 'subvocalization elimination',
    'fast reading practice', 'reading efficiency', 'WPM training',
    'timed reading challenge', 'free speed reading tool'
  ],
  openGraph: {
    title: '60s Column Scanner - Speed Reading & Peripheral Vision Training',
    description: '10 rotating text columns with adjustable speed and width. Train columnar reading to reduce eye movements and improve peripheral vision. 60-second timed challenge tracks effective WPM.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/speed-reader',
  },
};

export default function SpeedReaderPage() {
  return <SpeedReaderClient />;
}