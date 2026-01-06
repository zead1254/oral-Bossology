
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of options array
  explanation?: string;
}

export interface Exam {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  isSubmitted: boolean;
  timeLeft: number;
  questionTimeLeft: number;
  isPaused: boolean;
}

export interface ScoreRecord {
  examId: number;
  score: number;
  total: number;
  percentage: number;
  date: string;
}
