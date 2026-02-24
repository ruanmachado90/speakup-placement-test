// Example tests for quizHelpers.js
// Run: npm test

import {
  calculateLevel,
  getLevelBreakdown,
  validateUserName,
  calculatePercentage,
  combineQuestions
} from '../quizHelpers';

describe('calculateLevel', () => {
  it('should return C1 for 90% or higher', () => {
    expect(calculateLevel(18, 20)).toBe('C1 - Advanced');
    expect(calculateLevel(25, 25)).toBe('C1 - Advanced');
  });

  it('should return B2 for 75-89%', () => {
    expect(calculateLevel(15, 20)).toBe('B2 - Upper Intermediate');
    expect(calculateLevel(18, 24)).toBe('B2 - Upper Intermediate');
  });

  it('should return B1 for 60-74%', () => {
    expect(calculateLevel(12, 20)).toBe('B1 - Intermediate');
  });

  it('should return A2 for 45-59%', () => {
    expect(calculateLevel(9, 20)).toBe('A2 - Pre-Intermediate');
  });

  it('should return A1 for below 45%', () => {
    expect(calculateLevel(5, 20)).toBe('A1 - Beginner');
    expect(calculateLevel(0, 20)).toBe('A1 - Beginner');
  });
});

describe('getLevelBreakdown', () => {
  it('should correctly group answers by level', () => {
    const answers = [
      { level: 'A1', correct: true },
      { level: 'A1', correct: false },
      { level: 'B1', correct: true },
      { level: 'B1', correct: true }
    ];

    const breakdown = getLevelBreakdown(answers);

    expect(breakdown['A1']).toEqual({ correct: 1, total: 2 });
    expect(breakdown['B1']).toEqual({ correct: 2, total: 2 });
  });

  it('should return empty object for no answers', () => {
    expect(getLevelBreakdown([])).toEqual({});
  });
});

describe('validateUserName', () => {
  it('should validate non-empty names', () => {
    const result = validateUserName('John Doe');
    expect(result.isValid).toBe(true);
    expect(result.value).toBe('John Doe');
  });

  it('should trim whitespace', () => {
    const result = validateUserName('  John  ');
    expect(result.isValid).toBe(true);
    expect(result.value).toBe('John');
  });

  it('should reject empty strings', () => {
    expect(validateUserName('').isValid).toBe(false);
    expect(validateUserName('   ').isValid).toBe(false);
  });

  it('should handle null/undefined', () => {
    expect(validateUserName(null).isValid).toBe(false);
    expect(validateUserName(undefined).isValid).toBe(false);
  });
});

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(15, 20, 0)).toBe(75);
    expect(calculatePercentage(10, 20, 1)).toBe(50.0);
  });

  it('should handle zero total', () => {
    expect(calculatePercentage(5, 0)).toBe(0);
  });

  it('should respect decimal places', () => {
    expect(calculatePercentage(1, 3, 2)).toBe(33.33);
  });
});

describe('combineQuestions', () => {
  it('should combine questions with correct types', () => {
    const grammar = [{ id: 1, question: 'Q1' }];
    const vocab = [{ id: 2, question: 'Q2' }];
    const reading = [{ id: 3, question: 'Q3' }];

    const combined = combineQuestions(grammar, vocab, reading);

    expect(combined).toHaveLength(3);
    expect(combined[0]).toEqual({ id: 1, question: 'Q1', type: 'grammar' });
    expect(combined[1]).toEqual({ id: 2, question: 'Q2', type: 'vocabulary' });
    expect(combined[2]).toEqual({ id: 3, question: 'Q3', type: 'reading' });
  });
});
