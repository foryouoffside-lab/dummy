import AcademicDrillsClient from './AcademicDrillsClient';

export const metadata = {
  title: 'Academic Drills - Free Math, Reading, Writing & Comprehension Training',
  description: '12 free academic skill training drills. Improve mental math, speed reading, typing accuracy, and comprehension. Covers arithmetic, multiplication, RSVP, peripheral vision, code typing, and critical reasoning.',
  keywords: [
    'academic drills', 'math practice', 'speed reading', 'typing test',
    'comprehension training', 'mental arithmetic', 'multiplication tables',
    'RSVP reader', 'peripheral vision training', 'code typing practice',
    'listening comprehension', 'inference drills', 'critical reasoning',
    'free educational games', 'brain training', 'academic skills'
  ],
  openGraph: {
    title: 'Academic Drills - Free Math, Reading, Writing & Comprehension Training',
    description: 'Master academic skills with 12 free interactive drills. Math Speed, Reading Speed, Writing Speed, and Comprehension. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/academic',
    siteName: 'SkillDrills',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic',
  },
};

export default function AcademicDrillsPage() {
  return <AcademicDrillsClient />;
}