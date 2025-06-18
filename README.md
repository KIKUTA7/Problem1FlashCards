# Flashcard Repetition System — Problem Set 1 (MIT 6.102)

This project implements a **spaced repetition flashcard system** using TypeScript. Cards move through a range of difficulty buckets (`NoIdea → Hard → Medium → Easy → Mastered`) depending on the user's performance, and progress is tracked accordingly.

---

## Bucketing Logic

Cards are classified into these difficulty levels:

| Bucket     | Enum Value |
|------------|------------|
| Mastered   | -2         |
| Easy       | -1         |
| Medium     | 0          |
| Hard       | 1          |
| NoIdea     | 2          |

Each card is stored in a `BucketMap` based on its difficulty.

---

## Functional Overview

- `toBucketSets(cards, bucketMap)`: Returns an array of sets, each set containing card IDs in the respective difficulty bucket.
- `getBucketRange(bucketSets, cardId)`: Locates which bucket a card is in.
- `practice(cards, bucketMap)`: Chooses the next card to review, prioritizing harder buckets.
- `update(card, difficulty, bucketMap)`: Reassigns the card to a new bucket based on the difficulty.
- `getHint(card)`: Returns a truncated hint from the answer.
- `computeProgress(bucketMap)`: Calculates percentage of cards that are mastered.

