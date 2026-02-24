# Estrutura do Código - Quiz de Nivelamento

## 📁 Organização dos Arquivos

```
src/
├── components/           # Componentes React
│   ├── Quiz.js          # Componente principal (orquestrador)
│   ├── Quiz.css         # Estilos globais do quiz
│   ├── WelcomeScreen.jsx    # Tela de boas-vindas
│   ├── ResultsScreen.jsx    # Tela de resultados
│   ├── ProgressBar.js       # Barra de progresso
│   ├── GrammarSection.js    # Seção de gramática
│   ├── VocabularySection.js # Seção de vocabulário
│   ├── ReadingSection.js    # Seção de leitura
│   └── AudioSection.js      # Seção de áudio (futuro)
├── constants/           # Configurações e textos
│   ├── config.js       # Configurações do quiz
│   └── messages.js     # Textos e labels da UI
├── hooks/              # Hooks customizados
│   └── useQuiz.js     # Lógica principal do quiz
├── utils/             # Funções auxiliares
│   └── quizHelpers.js # Helpers para cálculos
└── data/              # Dados das questões
    ├── grammarQuestions.js
    ├── vocabularyQuestions.js
    └── readingQuestions.js
```

## 🏗️ Arquitetura e Best Practices

### 1. Separação de Responsabilidades

**Components** - Apenas apresentação visual
```javascript
// ✅ BOM - Componente focado apenas em UI
function WelcomeScreen({ userName, setUserName, onStart, error }) {
  return <form onSubmit={onStart}>...</form>
}
```

**Hooks** - Lógica de negócio e estado
```javascript
// ✅ BOM - Toda lógica do quiz centralizada
export const useQuiz = () => {
  // Estado e lógica aqui
  return { /* valores e funções */ }
}
```

**Utils** - Funções puras reutilizáveis
```javascript
// ✅ BOM - Função pura, fácil de testar
export const calculateLevel = (correct, total) => {
  const percentage = (correct / total) * 100;
  // ... lógica
}
```

### 2. Constantes Centralizadas

**Por que?** Facilita manutenção e internacionalização

```javascript
// constants/messages.js
export const MESSAGES = {
  welcome: {
    title: 'English Placement Test',
    // ... outros textos
  }
}

// constants/config.js
export const QUIZ_CONFIG = {
  LEVELS: {
    C1: { name: 'C1 - Advanced', minScore: 90 }
  },
  LOGOS: { /* URLs das logos */ }
}
```

**Vantagens:**
- ✅ Textos em um só lugar
- ✅ Fácil traduzir para outros idiomas
- ✅ Mudanças de marca simplificadas
- ✅ Configurações centralizadas

### 3. Custom Hooks

**useQuiz** - Hook central que gerencia todo o estado do quiz

```javascript
const {
  currentQuestion,    // Questão atual
  selectedAnswer,     // Resposta selecionada
  handleNext,         // Avançar questão
  handleStartQuiz,    // Iniciar quiz
  // ... outros valores e funções
} = useQuiz();
```

**Benefícios:**
- ✅ Lógica reutilizável
- ✅ Estado gerenciado em um só lugar
- ✅ Fácil de testar isoladamente
- ✅ Componentes mais limpos

### 4. Memoização e Performance

```javascript
// useMemo para evitar recálculos desnecessários
const allQuestions = useMemo(
  () => combineQuestions(grammar, vocab, reading),
  []
);

// useCallback para funções estáveis
const handleNext = useCallback(() => {
  // lógica...
}, [dependencies]);
```

### 5. Acessibilidade (A11y)

Todos os componentes seguem padrões WCAG:

```javascript
// ✅ Roles ARIA adequados
<div role="radiogroup" aria-labelledby="question-text">
  
// ✅ Labels descritivos
<button aria-label="Select option 1: answer">

// ✅ Estados comunicados
<input aria-invalid="true" aria-describedby="error-msg">

// ✅ Navegação por teclado
onKeyDown={(e) => e.key === 'Enter' && handleNext()}
```

## 🎨 UX/UI Melhorias Implementadas

### 1. Feedback Visual
- ✅ Mensagens de erro inline com animação
- ✅ Estados hover/focus claros
- ✅ Transições suaves entre telas
- ✅ Progress bar animada

### 2. Estados de Loading
- ✅ Preparado para adicionar loading states
- ✅ Animações de pulse disponíveis

### 3. Validações
- ✅ Validação de nome antes de iniciar
- ✅ Validação de resposta antes de avançar
- ✅ Feedback visual de erros

## 🔧 Como Adicionar Novas Funcionalidades

### Adicionar Nova Seção de Questões

1. **Criar arquivo de dados**
```javascript
// src/data/speakingQuestions.js
export const speakingQuestions = [
  {
    id: 1,
    level: 'B1',
    question: 'Describe your daily routine',
    // ...
  }
];
```

2. **Adicionar no hook useQuiz**
```javascript
import { speakingQuestions } from '../data/speakingQuestions';

const allQuestions = useMemo(
  () => combineQuestions(grammar, vocab, reading, speaking),
  []
);
```

3. **Criar componente da seção**
```javascript
// src/components/SpeakingSection.jsx
export default function SpeakingSection({ question, ... }) {
  return <section>...</section>
}
```

4. **Adicionar no Quiz.js**
```javascript
case 'speaking':
  return <SpeakingSection {...sectionProps} />;
```

### Adicionar Nova Língua

1. **Criar arquivo de mensagens**
```javascript
// constants/messages-pt.js
export const MESSAGES_PT = {
  welcome: {
    title: 'Teste de Nivelamento de Inglês',
    // ...
  }
}
```

2. **Criar contexto de idioma**
```javascript
const LanguageContext = createContext();
// Implementar lógica de troca
```

### Modificar Critérios de Nivelamento

Editar apenas `constants/config.js`:

```javascript
export const QUIZ_CONFIG = {
  LEVELS: {
    C2: { name: 'C2 - Proficient', minScore: 95, color: '#0e48fe' },
    C1: { name: 'C1 - Advanced', minScore: 85, color: '#4a7bfe' },
    // Ajustar minScore conforme necessário
  }
}
```

## 🧪 Testabilidade

O código está estruturado para facilitar testes:

```javascript
// Testar funções puras
describe('calculateLevel', () => {
  it('should return C1 for 90% score', () => {
    expect(calculateLevel(18, 20)).toBe('C1 - Advanced');
  });
});

// Testar hook isoladamente
describe('useQuiz', () => {
  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useQuiz());
    expect(result.current.quizStarted).toBe(false);
  });
});
```

## 📝 Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (`WelcomeScreen.jsx`)
- **Funções**: camelCase (`handleNext`)
- **Constantes**: UPPER_SNAKE_CASE (`QUIZ_CONFIG`)
- **Arquivos de dados**: camelCase (`grammarQuestions.js`)

### Comentários
```javascript
/**
 * Calculates the recommended level based on score
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @returns {string} Level name (e.g., "B2 - Upper Intermediate")
 */
export const calculateLevel = (correctAnswers, totalQuestions) => {
  // ...
}
```

### Estrutura de Componentes
```javascript
// 1. Imports
import React from 'react';
import { MESSAGES } from '../constants/messages';

// 2. Componente com JSDoc
/**
 * Description of component
 */
function ComponentName({ prop1, prop2 }) {
  // 3. Hooks
  // 4. Computed values
  // 5. Handlers
  // 6. Render
  return <div>...</div>
}

// 7. Export
export default ComponentName;
```

## 🚀 Performance Tips

1. **Use useMemo** para cálculos pesados ou arrays
2. **Use useCallback** para funções passadas como props
3. **Lazy loading** para componentes grandes
4. **Virtual scrolling** se tiver muitas questões
5. **Code splitting** para bundles menores

## 🔐 Segurança

- ✅ Validação de inputs
- ✅ Sanitização de dados de usuário
- ✅ CSP headers recomendados
- ✅ HTTPS obrigatório em produção

## 📚 Recursos Adicionais

- [React Best Practices](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
