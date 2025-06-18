import { Flashcard, AnswerDifficulty, BucketMap } from './flashcards';

export function toBucketSets(cards: Flashcard[], bucketMap: BucketMap): Set<string>[] {
    const sets: Set<string>[] = Array.from({ length: 5 }, () => new Set<string>());
    
    for (const level of [-2, -1, 0, 1, 2] as AnswerDifficulty[]) {
        const bucket = bucketMap[level];
        const setIndex = level + 2;
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
    for (const level of [2, 1, 0, -1, -2] as AnswerDifficulty[]) {
        const bucket = bucketMap[level];
        if (bucket.length > 0) {
            return bucket[0];
        }
    }
    return undefined;
}

export function update(card: Flashcard, difficulty: AnswerDifficulty, bucketMap: BucketMap): void {
    for (const level of [-2, -1, 0, 1, 2] as AnswerDifficulty[]) {
        bucketMap[level] = bucketMap[level].filter(c => c.id !== card.id);
    }
    bucketMap[difficulty].push(card);
}

export function getHint(card: Flashcard): string {
    const MAX_HINT_LENGTH = 10;
    if (card.answer.length <= MAX_HINT_LENGTH) {
        return card.answer;
    }
    return card.answer.slice(0, MAX_HINT_LENGTH) + '...';
}

export function computeProgress(bucketMap: BucketMap): number {
    let totalCards = 0;
    for (const level of [-2, -1, 0, 1, 2]) {
        totalCards += bucketMap[level as AnswerDifficulty].length;
    }
    
    if (totalCards === 0) {
        return 100;
    }
    
    const masteredCards = bucketMap[AnswerDifficulty.Mastered].length;
    return Math.floor((masteredCards / totalCards) * 100);
}



