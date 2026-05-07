import RSVPReaderClient from './RSVPReaderClient';

export const metadata = {
  title: 'RSVP Intake Lab - Speed Reading & Optimal Recognition Point Training',
  description: 'Master speed reading with RSVP (Rapid Serial Visual Presentation) technology. Words flash at the Optimal Recognition Point for maximum comprehension. Adjustable 100-1000 WPM speed. Train your brain to read 3-4x faster.',
  keywords: [
    'RSVP reader', 'speed reading', 'rapid serial visual presentation',
    'optimal recognition point', 'reading speed training', 'WPM improvement',
    'speed reading tool', 'visual reading', 'fast reading practice',
    'RSVP training', 'reading comprehension speed', 'cognitive reading',
    'neuroplasticity reading', 'free speed reading app'
  ],
  openGraph: {
    title: 'RSVP Intake Lab - Speed Reading & ORP Training',
    description: 'RSVP technology eliminates eye movements by flashing words at a single focal point. Train at 100-1000 WPM with Optimal Recognition Point alignment. Improve reading speed 3-4x.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/rsvp-reader',
  },
};

export default function RSVPReaderPage() {
  return <RSVPReaderClient />;
}