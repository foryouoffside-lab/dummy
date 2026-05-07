import SudokuClient from './SudokuClient';

export const metadata = {
  title: 'Sudoku Speed-Logic - Progressive Grid Puzzle & Logical Deduction Training',
  description: 'Master Sudoku from 4×4 to 7×7 grids with progressive difficulty. 60-second challenge with 3 lives, combo streaks, level completion bonuses, and Sudoku Master achievement for completing all 4 grid sizes.',
  keywords: [
    'sudoku', 'sudoku puzzle', 'logic puzzle', 'number placement',
    'logical deduction', 'sudoku training', 'progressive sudoku',
    'mini sudoku', 'sudoku speed', 'brain training sudoku',
    'puzzle solving', 'number grid', 'cognitive puzzle',
    'free sudoku', 'sudoku practice'
  ],
  openGraph: {
    title: 'Sudoku Speed-Logic - Progressive Grid Puzzle Training',
    description: 'Progressive Sudoku from 4×4 to 7×7. Complete all 4 grid sizes to become a Sudoku Master. 60-second challenge with lives system, combo streaks, and level completion bonuses.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/sudoku',
  },
};

export default function SudokuPage() {
  return <SudokuClient />;
}