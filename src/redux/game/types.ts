export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface GameProgress {
  guessedLetters: string[];
  solved: boolean;
}

export interface GameState {
  questions: Question[];
  currentQuestion: Question | null;
  playerAnswer: string;
  progress: Record<string, GameProgress>; // Прогресс по ID вопроса
  guessedLetters: string[];
  solved: boolean;
  loading: boolean;
  error: string | null;
}
