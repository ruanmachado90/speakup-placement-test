// UI Messages and Labels
export const MESSAGES = {
  welcome: {
    title: 'English Placement Test',
    subtitle: 'Welcome! This test will help us determine your English level.',
    description: (total) => `You will answer ${total} questions covering grammar, vocabulary, and reading comprehension.`,
    nameLabel: 'Enter your name:',
    namePlaceholder: 'Your name',
    startButton: 'Start Test',
    emptyNameError: 'Please enter your name to start the quiz.'
  },
  
  quiz: {
    title: 'English Placement Test',
    studentLabel: 'Student:',
    nextButton: 'Next Question',
    finishButton: 'Finish Test',
    emptyAnswerError: 'Please select an answer before continuing.',
    progressText: (current, total) => `Question ${current} of ${total}`
  },
  
  results: {
    title: 'Test Results',
    studentLabel: 'Student:',
    correctAnswers: 'Correct Answers',
    recommendedLevel: 'Recommended Level',
    performanceTitle: 'Performance by Level:',
    correctLabel: 'correct',
    restartButton: 'Take Test Again'
  },
  
  sections: {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    reading: 'Reading Comprehension',
    level: (level) => `Level: ${level}`
  },
  
  accessibility: {
    selectOption: 'Select option',
    logoAlt: 'SpeakUp Logo',
    progressBar: 'Test progress'
  }
};
