import PeripheralReaderClient from './PeripheralReaderClient';

export const metadata = {
  title: 'Peripheral Span Lab - Extrafoveal Vision & Reading Speed Training',
  description: 'Train your peripheral vision and expand your visual span for faster reading. Words flash on left/right sides while you fixate on center. 3 modes with adjustable speed (100-1000ms). 60-second challenge with recall questions.',
  keywords: [
    'peripheral vision training', 'extrafoveal processing', 'visual span expansion',
    'speed reading peripheral', 'peripheral reader', 'eye span training',
    'visual field training', 'reading speed improvement', 'peripheral awareness',
    'vision training drill', 'cognitive peripheral vision', 'visual processing speed'
  ],
  openGraph: {
    title: 'Peripheral Span Lab - Extrafoveal Vision Training',
    description: 'Expand your visual span for faster reading. Train peripheral word recognition with adjustable flash speeds. 3 modes: Left, Right, Both. Random recall questions every 5-10 flashes.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/peripheral-reader',
  },
};

export default function PeripheralReaderPage() {
  return <PeripheralReaderClient />;
}