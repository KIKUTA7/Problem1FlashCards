import { Flashcard, AnswerDifficulty, BucketMap } from './flashcards';

export function toBucketSets(cards: Flashcard[], bucketMap: BucketMap): Set<string>[] {
  const sets: Set<string>[] = [
    new Set<string>(),
    new Set<string>(),
    new Set<string>(),
    new Set<string>()
  ];

  for (const level of [-1, 0, 1, 2] as AnswerDifficulty[]) {
    const bucket = bucketMap[level];
    const setIndex = level + 1;
    for (const card of bucket) {
      sets[setIndex].add(card.id);
    }
  }

  return sets;
}

export function getBucketRange(bucketSets: Set<string>[], cardId: string): [number, number] {
  for (let i = 0; i < bucketSets.length; i++) {
    if (bucketSets[i].has(cardId)) {
      return [i, i];
    }
  }
  return [0, bucketSets.length - 1];
}

export function practice(cards: Flashcard[], bucketMap: BucketMap): Flashcard | undefined {
  for (const level of [-1, 0, 1, 2] as AnswerDifficulty[]) {
    const bucket = bucketMap[level];
    if (bucket.length > 0) {
      return bucket[0];
    }
  }
  return undefined;
}

export function update(card: Flashcard, difficulty: AnswerDifficulty, bucketMap: BucketMap): void {
  for (const level of [-1, 0, 1, 2] as AnswerDifficulty[]) {
    bucketMap[level] = bucketMap[level].filter(c => c.id !== card.id);
  }
  bucketMap[difficulty].push(card);
}

export function getHint(card: Flashcard): string {
  const words = card.answer.split(' ');
  if (words.length <= 2) {
    return card.answer;
  }
  return words.slice(0, 2).join(' ') + '...';
}

export function computeProgress(bucketMap: BucketMap): number {
  const totalCards = Object.values(bucketMap).reduce((sum, bucket) => sum + bucket.length, 0);
  if (totalCards === 0) {
    return 100;
  }
  const masteredCards = bucketMap[AnswerDifficulty.Mastered].length;
  return Math.floor((masteredCards / totalCards) * 100);
}



