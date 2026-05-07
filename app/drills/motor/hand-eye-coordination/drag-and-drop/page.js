import DragAndDropClient from './DragAndDropClient';

export const metadata = {
  title: 'Extreme Convergence - Drag & Drop Precision & Hand-Eye Coordination',
  description: 'Master precision mouse control by dragging a ball into a shrinking target ring within 3 seconds. Positions teleport every 3 seconds. 60-second challenge with lives system and streak tracking. Free, no login.',
  keywords: [
    'drag and drop precision', 'mouse control training', 'hand-eye coordination',
    'precision dragging', 'motor control drill', 'mouse accuracy game',
    'drag accuracy', 'fine motor skills', 'convergence training',
    'precision mouse movement', 'target dropping', 'coordination exercise',
    'free motor drill', 'mouse dexterity', 'drag training'
  ],
  openGraph: {
    title: 'Extreme Convergence - Drag & Drop Precision Training',
    description: 'Drag a ball into a shrinking ring within 3 seconds. Positions teleport every 3 seconds. Margin shrinks with streak for increasing difficulty. 60-second challenge with 3 lives.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
  },
};

export default function DragAndDropPage() {
  return <DragAndDropClient />;
}