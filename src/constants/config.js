// Quiz Configuration
// Score ranges adjusted for 60 questions based on Pearson GSE levels
export const QUIZ_CONFIG = {
  LEVELS: {
    'Below A1': { name: 'Below A1 - Starter', minScore: 0, maxScore: 5, gseCodes: '< 22', color: '#ff6b6b' },
    A1: { name: 'A1 - Beginner', minScore: 6, maxScore: 43, gseCodes: '22-29', color: '#ffae1e' },
    A2: { name: 'A2 - Elementary', minScore: 44, maxScore: 70, gseCodes: '30-35', color: '#ffc34d' },
    'A2+': { name: 'A2+ - Pre-Intermediate', minScore: 71, maxScore: 85, gseCodes: '36-42', color: '#7fa8fe' },
    B1: { name: 'B1 - Intermediate', minScore: 86, maxScore: 93, gseCodes: '43-50', color: '#4a7bfe' },
    'B1+': { name: 'B1+ - Upper Intermediate', minScore: 94, maxScore: 100, gseCodes: '> 50', color: '#0e48fe' }
  },
  
  LOGOS: {
    white: 'https://www.speakupcataguases.com/wp-content/uploads/2025/11/logo-speakup-brancal-1.png',
    blue: 'https://www.speakupcataguases.com/wp-content/uploads/2026/02/logo-speakup-azul.png'
  },
  
  ANIMATION_DURATION: 300
};

// Brand Colors
export const COLORS = {
  primary: '#0e48fe',
  secondary: '#ffae1e',
  background: {
    light: '#ffffff',
    lighter: '#f8fbff',
    lightest: '#e8f0ff'
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999'
  }
};
