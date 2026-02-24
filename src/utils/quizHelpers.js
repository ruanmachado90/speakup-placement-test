import { QUIZ_CONFIG } from '../constants/config';

/**
 * Combines all question sets with their types
 */
export const combineQuestions = (grammarQuestions, vocabularyQuestions, readingQuestions) => {
  return [
    ...grammarQuestions.map(q => ({ ...q, type: 'grammar' })),
    ...vocabularyQuestions.map(q => ({ ...q, type: 'vocabulary' })),
    ...readingQuestions.map(q => ({ ...q, type: 'reading' }))
  ];
};

/**
 * Calculates the recommended level based on score percentage
 * Based on Pearson GSE alignment for 60 questions
 */
export const calculateLevel = (correctAnswers, totalQuestions) => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  // Find the appropriate level based on score range
  for (const level of Object.values(QUIZ_CONFIG.LEVELS)) {
    if (percentage >= level.minScore && percentage <= level.maxScore) {
      return level.name;
    }
  }
  
  // Default to Below A1 if no match found
  return QUIZ_CONFIG.LEVELS['Below A1'].name;
};

/**
 * Groups answers by level and calculates performance
 */
export const getLevelBreakdown = (answers) => {
  const breakdown = {};
  
  answers.forEach(answer => {
    if (!breakdown[answer.level]) {
      breakdown[answer.level] = { correct: 0, total: 0 };
    }
    breakdown[answer.level].total++;
    if (answer.correct) {
      breakdown[answer.level].correct++;
    }
  });
  
  return breakdown;
};

/**
 * Validates user name input
 */
export const validateUserName = (name) => {
  const trimmedName = name?.trim() || '';
  return {
    isValid: trimmedName.length > 0,
    value: trimmedName
  };
};

/**
 * Calculates percentage with decimal places
 */
export const calculatePercentage = (value, total, decimals = 0) => {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
};

/**
 * Sorts level breakdown by level order (Below A1, A1, A2, A2+, B1, B1+, B2, C1)
 */
export const sortedLevelKeys = (breakdown) => {
  const levelOrder = ['Below A1', 'A1', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'C1'];
  return Object.keys(breakdown).sort((a, b) => {
    const indexA = levelOrder.indexOf(a);
    const indexB = levelOrder.indexOf(b);
    // If not found in order, put at end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};
