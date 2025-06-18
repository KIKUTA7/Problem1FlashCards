import { expect } from 'chai';
import { toBucketSets, getBucketRange, practice, update, getHint, computeProgress } from '../src/algorithm';
import { AnswerDifficulty, Flashcard } from '../src/flashcards';

const flashcard1: Flashcard = { id: '1', question: 'Q1', answer: 'A1' };
const flashcard2: Flashcard = { id: '2', question: 'Q2', answer: 'A2 A3 A4' };
const flashcard3: Flashcard = { id: '3', question: 'Q3', answer: 'A3' };

const bucketMap = {
  [-1]: [flashcard1],
  [0]: [flashcard2],
  [1]: [],
  [2]: [flashcard3]
};

describe('toBucketSets', () => {
  it('should convert bucketMap to array of sets', () => {
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    expect(sets[0].has('1')).to.be.true;
    expect(sets[1].has('2')).to.be.true;
    expect(sets[3].has('3')).to.be.true;
  });
});

describe('getBucketRange', () => {
  it('should return range containing cardId', () => {
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    const range = getBucketRange(sets, '2');
    expect(range).to.deep.equal([1, 1]);
  });

  it('should return full range if card not found', () => {
    const sets = toBucketSets([flashcard1, flashcard2, flashcard3], bucketMap);
    const range = getBucketRange(sets, '999');
    expect(range).to.deep.equal([0, 3]);
  });
});

describe('practice', () => {
  it('should return first card found', () => {
    expect(practice([], bucketMap)).to.deep.equal(flashcard1);
  });
});

describe('update', () => {
  it('should update card difficulty', () => {
    const mapCopy = JSON.parse(JSON.stringify(bucketMap));
    update(flashcard1, AnswerDifficulty.Mastered, mapCopy);
    expect(mapCopy[2].some((c: Flashcard) => c.id === '1')).to.be.true;
  });
});

describe('getHint', () => {
  it('should return full answer if <=2 words', () => {
    expect(getHint(flashcard3)).to.equal('A3');
  });

  it('should return shortened hint if >2 words', () => {
    expect(getHint(flashcard2)).to.equal('A2 A3...');
  });
});

describe('computeProgress', () => {
  it('should compute correct progress', () => {
    expect(computeProgress(bucketMap)).to.equal(33);
  });

  it('should return 100 if no cards', () => {
    const emptyMap = { [-1]: [], [0]: [], [1]: [], [2]: [] };
    expect(computeProgress(emptyMap)).to.equal(100);
  });
});






