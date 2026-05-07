import CodeTypingClient from './CodeTypingClient';

export const metadata = {
  title: 'Syntax Kinematics - Code Typing Speed & Accuracy Training',
  description: 'Improve your coding speed and accuracy with progressive code typing drills. 3 languages: JavaScript, Python, HTML. 22-25 unique snippets per language. Dynamic 15-45s timer per snippet with combo bonuses and WPM tracking.',
  keywords: [
    'code typing', 'coding speed test', 'programming typing practice',
    'JavaScript typing', 'Python typing', 'HTML typing',
    'developer typing speed', 'syntax typing', 'code typing drill',
    'coding accuracy', 'programming practice', 'typing speed for coders',
    'code snippet typing', 'coding WPM test', 'free code typing test'
  ],
  openGraph: {
    title: 'Syntax Kinematics - Code Typing Speed & Accuracy Training',
    description: 'Type real code snippets in JavaScript, Python, or HTML. Progressive difficulty with dynamic timing. Track WPM, accuracy, and combo streaks. Perfect for developers improving typing speed.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/writing-speed/code-typing',
  },
};

export default function CodeTypingPage() {
  return <CodeTypingClient />;
}