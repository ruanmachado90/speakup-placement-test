# Code Style Guide - Quiz de Nivelamento

## 📋 Índice
1. [Nomenclatura](#nomenclatura)
2. [Estrutura de Arquivos](#estrutura-de-arquivos)
3. [Componentes React](#componentes-react)
4. [Hooks](#hooks)
5. [Funções Auxiliares](#funções-auxiliares)
6. [CSS](#css)
7. [Comentários](#comentários)

## Nomenclatura

### Componentes
```javascript
// ✅ BOM - PascalCase
WelcomeScreen.jsx
ResultsScreen.jsx
ProgressBar.js

// ❌ EVITAR
welcomeScreen.jsx
welcome-screen.jsx
```

### Funções e Variáveis
```javascript
// ✅ BOM - camelCase
const handleSubmit = () => {}
const currentQuestion = questions[0]

// ❌ EVITAR
const HandleSubmit = () => {}
const current_question = questions[0]
```

### Constantes
```javascript
// ✅ BOM - UPPER_SNAKE_CASE
const QUIZ_CONFIG = {}
const MAX_QUESTIONS = 25

// ❌ EVITAR
const quizConfig = {}
const maxQuestions = 25
```

### Event Handlers
```javascript
// ✅ BOM - Prefixo "handle"
const handleClick = () => {}
const handleInputChange = () => {}
const handleSubmit = () => {}

// ✅ BOM - Callbacks com prefixo "on"
<Button onClick={handleClick} />
<Input onChange={handleInputChange} />
```

## Estrutura de Arquivos

### Organização por Feature
```
src/
├── components/
│   ├── Quiz.js              # Componente principal
│   ├── Quiz.css            
│   ├── WelcomeScreen.jsx    # Componente child
│   └── ResultsScreen.jsx
├── hooks/
│   └── useQuiz.js          # Lógica do Quiz
├── constants/
│   ├── config.js           # Configurações
│   └── messages.js         # Textos
└── utils/
    └── quizHelpers.js      # Funções puras
```

## Componentes React

### Template Padrão
```javascript
// 1. Imports externos
import React from 'react';

// 2. Imports internos
import { MESSAGES } from '../constants/messages';
import { useQuiz } from '../hooks/useQuiz';

// 3. Imports de estilos
import './Quiz.css';

/**
 * 4. JSDoc do componente
 * @param {Object} props - Component properties
 * @param {string} props.userName - User's name
 * @returns {JSX.Element}
 */
function ComponentName({ userName, onSubmit }) {
  // 5. Hooks (sempre no topo)
  const [state, setState] = useState(null);
  const customHook = useQuiz();

  // 6. Variáveis derivadas
  const isValid = userName.length > 0;

  // 7. Event handlers
  const handleClick = () => {
    // lógica
  };

  // 8. Effects (se necessário)
  useEffect(() => {
    // efeito
  }, [dependencies]);

  // 9. Early returns
  if (!userName) return null;

  // 10. Render principal
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
}

// 11. PropTypes (opcional)
ComponentName.propTypes = {
  userName: PropTypes.string.isRequired
};

// 12. Export
export default ComponentName;
```

### Boas Práticas de Componentes

```javascript
// ✅ BOM - Componentes pequenos e focados
function ProgressBar({ current, total }) {
  return <div>...</div>
}

// ❌ EVITAR - Componentes muito grandes
function Quiz() {
  // 500+ linhas de código
}

// ✅ BOM - Extrair lógica complexa
const results = useMemo(() => calculateResults(answers), [answers]);

// ❌ EVITAR - Lógica pesada no render
return <div>{calculateResults(answers)}</div>

// ✅ BOM - Destructuring de props
function Button({ onClick, children, disabled }) {
  return <button onClick={onClick}>{children}</button>
}

// ❌ EVITAR - props.tudo
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

## Hooks

### Custom Hooks

```javascript
// ✅ BOM - Prefixo "use"
export const useQuiz = () => {
  const [state, setState] = useState();
  
  // Retornar objeto com valores e funções
  return {
    // Estado
    currentQuestion,
    selectedAnswer,
    
    // Ações
    handleNext,
    handleRestart
  };
};

// ✅ BOM - Documentação clara
/**
 * Custom hook to manage quiz state and logic
 * @returns {Object} Quiz state and handlers
 */
export const useQuiz = () => { ... }
```

### useCallback e useMemo

```javascript
// ✅ BOM - useCallback para funções
const handleNext = useCallback(() => {
  // lógica
}, [dependencies]);

// ✅ BOM - useMemo para cálculos pesados
const sortedQuestions = useMemo(
  () => questions.sort(compareFn),
  [questions]
);

// ❌ EVITAR - Overuse de memoization
const simpleValue = useMemo(() => a + b, [a, b]);
```

## Funções Auxiliares

### Funções Puras

```javascript
// ✅ BOM - Função pura com JSDoc
/**
 * Calculates the recommended level based on score
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total questions
 * @returns {string} Level name
 */
export const calculateLevel = (correctAnswers, totalQuestions) => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  if (percentage >= 90) return 'C1 - Advanced';
  // ...
};

// ❌ EVITAR - Funções com side effects
export const calculateLevel = (answers) => {
  console.log('Calculating...'); // side effect
  localStorage.setItem('level', level); // side effect
};
```

## CSS

### Nomenclatura BEM-like

```css
/* ✅ BOM - Classes descritivas */
.quiz-container { }
.quiz-header { }
.welcome-screen { }
.start-button { }

/* ✅ BOM - Modificadores com hífen */
.button-primary { }
.button-disabled { }

/* ❌ EVITAR - Classes genéricas */
.container { }
.button { }
.text { }
```

### Organização do CSS

```css
/* 1. Reset e Base */
* {
  box-sizing: border-box;
}

/* 2. Layout Principal */
.quiz-container {
  max-width: 800px;
}

/* 3. Componentes */
.welcome-screen { }
.question-section { }

/* 4. Estados */
.button:hover { }
.button:disabled { }

/* 5. Animações */
@keyframes fadeIn { }

/* 6. Media Queries */
@media (max-width: 768px) { }
```

### Variáveis CSS

```css
/* ✅ BOM - Use CSS custom properties */
:root {
  --color-primary: #0e48fe;
  --color-secondary: #ffae1e;
  --spacing-unit: 8px;
}

.button {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
}
```

## Comentários

### JSDoc para Funções

```javascript
/**
 * Validates user name input
 * @param {string} name - User's name to validate
 * @returns {Object} Validation result
 * @returns {boolean} returns.isValid - Whether name is valid
 * @returns {string} returns.value - Trimmed name value
 * @example
 * validateUserName('  John  ') 
 * // { isValid: true, value: 'John' }
 */
export const validateUserName = (name) => {
  // ...
};
```

### Comentários Inline

```javascript
// ✅ BOM - Explica o "porquê"
// Precisamos resetar o selectedAnswer ao mudar de questão
// para evitar seleção automática na próxima
setSelectedAnswer(null);

// ❌ EVITAR - Explica o "o quê" (óbvio)
// Seta selectedAnswer para null
setSelectedAnswer(null);

// ✅ BOM - TODOs claros
// TODO: Implementar timer por questão (Issue #123)
// FIXME: Bug ao clicar muito rápido no botão Next

// ❌ EVITAR - TODOs vagos
// TODO: melhorar isso
```

## Imports

### Ordem dos Imports

```javascript
// 1. React e bibliotecas externas
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 2. Hooks customizados
import { useQuiz } from '../hooks/useQuiz';

// 3. Componentes
import WelcomeScreen from './WelcomeScreen';
import ResultsScreen from './ResultsScreen';

// 4. Utils e helpers
import { calculateLevel } from '../utils/quizHelpers';

// 5. Constantes
import { MESSAGES } from '../constants/messages';
import { QUIZ_CONFIG } from '../constants/config';

// 6. Estilos
import './Quiz.css';
```

## Tratamento de Erros

```javascript
// ✅ BOM - Validação clara
const validation = validateUserName(userName);
if (!validation.isValid) {
  setError(MESSAGES.welcome.emptyNameError);
  return;
}

// ✅ BOM - Try-catch para operações assíncronas
try {
  const data = await fetchQuizData();
  setQuestions(data);
} catch (error) {
  console.error('Failed to load quiz:', error);
  setError('Failed to load quiz. Please try again.');
}

// ❌ EVITAR - Alerts
alert('Error!'); // Use mensagens na UI
```

## Formatação

### Prettier Config
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### ESLint Rules
```json
{
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

## Checklist de Code Review

- [ ] Componentes têm nomes descritivos
- [ ] Funções são puras quando possível
- [ ] Props são validadas (PropTypes/TypeScript)
- [ ] Sem hardcoded strings (usar constants)
- [ ] Acessibilidade implementada (ARIA)
- [ ] Sem console.log em produção
- [ ] Memoization aplicada corretamente
- [ ] Comentários explicam o "porquê"
- [ ] Testes cobrem casos principais
- [ ] CSS é responsivo
