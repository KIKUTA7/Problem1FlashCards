export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export enum AnswerDifficulty {
  Easiest = -2,
  Easy = -1,
  Medium = 0,
  Hard = 1,
  Hardest = 2
}

export type BucketMap = {
  [key in AnswerDifficulty]: Flashcard[];
}

