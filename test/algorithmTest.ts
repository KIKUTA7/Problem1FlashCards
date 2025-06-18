import { expect } from 'chai';
import { toBucketSets, getBucketRange, practice, update, getHint, computeProgress } from '../src/algorithm';
import { AnswerDifficulty, Flashcard } from '../src/flashcards';

const flashcard1: Flashcard = { id: '1', question: 'Q1', answer: 'A1' };
const flashcard2: Flashcard = { id: '2', question: 'Q2', answer: 'A2 A3 A4 A5 A7' };
const flashcard3: Flashcard = { id: '3', question: 'Q3', answer: 'A3' };

const bucketMap = {
  [-2]: [],
  [-1]: [flashcard1],
  [0]: [flashcard2],
  [1]: [],
  [2]: [flashcard3]
};

/**
 * ===================================================
 * TESTING STRATEGY for toBucketSets()
 * ---------------------------------------------------
 * Partitions:
 * - Card present in different difficulty buckets
 * - Buckets with multiple or zero cards
 * - All levels from -2 to 2 used
 * ===================================================
 */

describe('toBucketSets', () => {
  it('should convert bucketMap to array of sets', () => {
    const bucketMap = {
      [-2]: [],
      [-1]: [flashcard1],
      [0]: [flashcard2],
      [1]: [],
      [2]: [flashcard3]
    };
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    expect(sets[1].has('1')).to.be.true;
    expect(sets[2].has('2')).to.be.true;
    expect(sets[4].has('3')).to.be.true;
  });
});

/**
 * ===================================================
 * TESTING STRATEGY for getBucketRange()
 * ---------------------------------------------------
 * Partitions:
 * - Card ID found in specific set
 * - Card ID not found at all
 * - Empty sets
 * ===================================================
 */
describe('getBucketRange', () => {
  it('should return range containing cardId', () => {
    const bucketMap = {
      [-2]: [],
      [-1]: [flashcard1],
      [0]: [flashcard2],
      [1]: [],
      [2]: [flashcard3]
    };
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    const range = getBucketRange(sets, '2');
    expect(range).to.deep.equal([2, 2]);
  });

  it('should return full range if card not found', () => {
    const bucketMap = {
      [-2]: [],
      [-1]: [flashcard1],
      [0]: [flashcard2],
      [1]: [],
      [2]: [flashcard3]
    };
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    const range = getBucketRange(sets, '999');
    expect(range).to.deep.equal([0, 4]);
  });
});

/**
 * ===================================================
 * TESTING STRATEGY for practice()
 * ---------------------------------------------------
 * Partitions:
 * - Cards in higher priority buckets
 * - No cards in any bucket
 * ===================================================
 */
describe('practice', () => {
  it('should return first card in highest priority bucket', () => {
    const bucketMap = {
      [-2]: [],
      [-1]: [flashcard1],
      [0]: [flashcard2],
      [1]: [],
      [2]: [flashcard3]
    };
    expect(practice([flashcard1, flashcard2, flashcard3], bucketMap)).to.deep.equal(flashcard3);
  });

  it('should return undefined if no cards', () => {
    const emptyMap = { [-2]: [], [-1]: [], [0]: [], [1]: [], [2]: [] };
    expect(practice([], emptyMap)).to.equal(undefined);
  });
});

/**
 * ===================================================
 * TESTING STRATEGY for update()
 * ---------------------------------------------------
 * Partitions:
 * - Card moved from one bucket to another
 * - Card added to new bucket if not previously present
 * ===================================================
 */
describe('update', () => {
  it('should update card difficulty', () => {
    const bucketMap = {
      [-2]: [],
      [-1]: [flashcard1],
      [0]: [flashcard2],
      [1]: [],
      [2]: [flashcard3]
    };
    update(flashcard1, AnswerDifficulty.Mastered, bucketMap);
    expect(bucketMap[-2].some((c: Flashcard) => c.id === '1')).to.be.true;
    expect(bucketMap[-1].some((c: Flashcard) => c.id === '1')).to.be.false;
  });
});

/**
 * ===================================================
 * TESTING STRATEGY for getHint()
 * ---------------------------------------------------
 * Partitions:
 * - Answer <= MAX_HINT_LENGTH
 * - Answer > MAX_HINT_LENGTH
 * ===================================================
 */
describe('getHint', () => {
  it('should return full answer if <=10 characters', () => {
    expect(getHint(flashcard3)).to.equal('A3');
  });

  it('should return shortened hint if >10 characters', () => {
    expect(getHint(flashcard2)).to.equal('A2 A3 A4 A...');
  });
});

describe('computeProgress', () => {
  it('should compute correct progress', () => {
    expect(computeProgress(bucketMap)).to.equal(33);
  });

  it('should return 100 if no cards', () => {
    const emptyMap = { [-2]: [], [-1]: [], [0]: [], [1]: [], [2]: [] };
    expect(computeProgress(emptyMap)).to.equal(100);
  });
});






