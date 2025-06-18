export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export enum AnswerDifficulty {
  Wrong = -1,
  Unknown = 0,
  Right = 1,
  Mastered = 2
}

export type BucketMap = {
  [key in AnswerDifficulty]: Flashcard[];
}

