export type AudienceType = 'TEEN' | 'ADULT';

export interface Question {
  id: number;
  text: string;
  options: string[]; // For True/False, this will be ['True', 'False']
  correctAnswer: string;
  explanation?: string; // Optional context if they ask
}

export interface QuizConfig {
  title: string;
  description: string;
  questions: Question[];
  eventDate: string;
  themeColor: string;
  accentColor: string;
}
