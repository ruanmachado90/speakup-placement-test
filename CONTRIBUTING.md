# Guia de Contribuição

## 🎯 Antes de Começar

Obrigado por considerar contribuir para o Quiz de Nivelamento! Este documento fornece diretrizes para manter o código consistente e de alta qualidade.

## 📚 Documentação Importante

Leia primeiro:
- [ARCHITECTURE.md](ARCHITECTURE.md) - Estrutura e padrões do projeto
- [STYLE_GUIDE.md](STYLE_GUIDE.md) - Convenções de código

## 🚀 Setup do Ambiente

1. **Clone o repositório**
```bash
git clone [url-do-repo]
cd placement
```

2. **Instale as dependências**
```bash
npm install
```

3. **Rode o projeto**
```bash
npm start
```

4. **Execute os testes**
```bash
npm test
```

## 🔄 Workflow de Desenvolvimento

### 1. Crie uma Branch
```bash
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

**Convenções de nome:**
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `refactor/` - Refatoração de código
- `docs/` - Documentação
- `test/` - Testes

### 2. Faça suas Mudanças

Siga as diretrizes do [STYLE_GUIDE.md](STYLE_GUIDE.md)

### 3. Teste suas Mudanças

```bash
# Testes unitários
npm test

# Lint
npm run lint

# Build
npm run build
```

### 4. Commit

Use commits semânticos:
```bash
git commit -m "feat: adiciona timer para questões"
git commit -m "fix: corrige cálculo de porcentagem"
git commit -m "docs: atualiza README com novos recursos"
```

**Tipos de commit:**
- `feat:` - Nova feature
- `fix:` - Bug fix
- `docs:` - Documentação
- `style:` - Formatação (não muda lógica)
- `refactor:` - Refatoração
- `test:` - Adiciona testes
- `chore:` - Tarefas de manutenção

### 5. Push e Pull Request

```bash
git push origin feature/nome-da-feature
```

Crie um Pull Request com:
- Título descritivo
- Descrição detalhada das mudanças
- Screenshots (se aplicável)
- Referência a issues relacionadas

## 🎨 Diretrizes de Código

### Components

```javascript
// ✅ BOM
function WelcomeScreen({ userName, onStart }) {
  // Hooks no topo
  const [error, setError] = useState(null);
  
  // Handlers claros
  const handleSubmit = (e) => {
    e.preventDefault();
    onStart();
  };
  
  // JSX semântico
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={userName}
        aria-label="Your name"
      />
    </form>
  );
}
```

### Custom Hooks

```javascript
// ✅ BOM - Lógica isolada
export const useQuiz = () => {
  // Estado
  const [state, setState] = useState();
  
  // Lógica
  const handleAction = useCallback(() => {
    // ...
  }, [dependencies]);
  
  // Retorna interface clara
  return {
    state,
    handleAction
  };
};
```

### Utils

```javascript
// ✅ BOM - Função pura com JSDoc
/**
 * Description
 * @param {type} param - Description
 * @returns {type} Description
 */
export const helperFunction = (param) => {
  // Sem side effects
  return result;
};
```

## 🧪 Testes

### Estrutura de Testes

```javascript
describe('ComponentName', () => {
  it('should do something', () => {
    // Arrange
    const props = { ... };
    
    // Act
    const result = render(<Component {...props} />);
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

### Cobertura Mínima

- ✅ Componentes principais: 80%
- ✅ Utils e helpers: 90%
- ✅ Custom hooks: 80%

## 📝 Documentação

### Adicione JSDoc

```javascript
/**
 * Brief description
 * 
 * @param {Object} props - Props description
 * @param {string} props.name - Specific prop
 * @returns {JSX.Element} What it returns
 * 
 * @example
 * <Component name="test" />
 */
```

### Atualize README

Se sua feature é significativa, atualize:
- Lista de features
- Instruções de uso
- Screenshots

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**
   ```
   1. Vá para '...'
   2. Clique em '...'
   3. Veja o erro
   ```
3. **Comportamento esperado**
4. **Comportamento atual**
5. **Screenshots** (se visual)
6. **Ambiente**
   - OS: Windows/Mac/Linux
   - Browser: Chrome/Firefox/Safari
   - Versão do Node: 

## 💡 Sugerindo Features

Features novas devem:

1. **Resolver um problema real**
2. **Estar alinhadas** com o objetivo do projeto
3. **Ser bem definidas**
   - O quê?
   - Por quê?
   - Como?

## ⚠️ Coisas a Evitar

### ❌ NÃO faça:

- Commits direto na `main`
- PRs gigantes (>500 linhas)
- Código sem testes
- console.log em produção
- Hardcoded strings
- Estilos inline excessivos

### ✅ FAÇA:

- PRs pequenos e focados
- Código bem documentado
- Testes adequados
- Use constantes
- CSS modular

## 🎯 Áreas que Precisam de Ajuda

### Alta Prioridade
- [ ] Implementar seção de listening com áudio
- [ ] Adicionar timer por questão
- [ ] Export de resultados em PDF
- [ ] Backend para salvar resultados

### Média Prioridade
- [ ] Testes E2E com Cypress
- [ ] Internacionalização (i18n)
- [ ] Dashboard administrativo
- [ ] Tema dark mode

### Baixa Prioridade
- [ ] PWA features
- [ ] Animações avançadas
- [ ] Gamificação

## 📞 Dúvidas?

- Abra uma Issue
- Entre em contato com os maintainers
- Consulte a documentação

## 🙏 Agradecimentos

Toda contribuição é valiosa, desde:
- Correção de typos
- Melhorias de documentação
- Reportar bugs
- Sugerir features
- Código novo

**Obrigado por contribuir!** 🎉
