# 🎓 SpeakUp English Placement Test

Um teste de nivelamento de inglês completo, responsivo e moderno, alinhado ao CEFR (Common European Framework of Reference).

![React](https://img.shields.io/badge/React-19.2.4-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-success)

---

## ✨ Features

- 🎯 **60 questões** divididas em Grammar (30), Vocabulary (20) e Reading (10)
- 📊 **6 níveis CEFR**: Below A1, A1, A2, A2+, B1, B1+
- 🎨 **Design moderno** com cores da marca SpeakUp (#0e48fe, #ffae1e)
- 📱 **100% Responsivo** - funciona perfeitamente em mobile e desktop
- ☁️ **Google Sheets Integration** - salva resultados automaticamente
- 📈 **Página de resultados visual** com gráficos circulares e breakdown detalhado
- 🔗 **Compartilhamento social** (Facebook, LinkedIn, clipboard)
- ⚡ **Performance otimizada** para deploy em produção

---

## 🚀 Quick Start

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Abrir no navegador
http://localhost:3000
```

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Testar build localmente (opcional)
npx serve -s build
```

---

## 📂 Estrutura do Projeto

```
placement/
├── public/
│   ├── images/           # Logos da SpeakUp
│   ├── _redirects        # Config para SPA routing
│   └── index.html        # HTML com meta tags SEO
├── src/
│   ├── components/       # Componentes React
│   │   ├── Quiz.js       # Componente principal do quiz
│   │   ├── Question.js   # Renderização de questões
│   │   ├── Quiz.css      # Estilos completos
│   │   └── ResultsScreen.jsx  # Tela de resultados moderna
│   ├── data/            # Questões do teste
│   │   ├── grammarQuestions.js    # 30 questões de gramática
│   │   ├── vocabularyQuestions.js # 20 questões de vocabulário
│   │   └── readingQuestions.js    # 10 questões de reading
│   ├── constants/       # Configurações
│   │   ├── config.js    # Níveis CEFR e scoring
│   │   └── messages.js  # Textos da interface
│   ├── utils/           # Utilitários
│   │   ├── quizHelpers.js   # Cálculos de nível
│   │   └── sheetsService.js # Integração Google Sheets
│   └── App.js          # Componente raiz
├── netlify.toml        # Configuração Netlify
├── package.json        # Dependências
└── README.md          # Esta documentação
```

---

## 📚 Documentação

Guias detalhados disponíveis:

| Arquivo | Descrição |
|---------|-----------|
| [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) | ⚙️ Configurar integração com Google Sheets |
| [WORDPRESS_DEPLOY.md](WORDPRESS_DEPLOY.md) | 🌐 Deploy no Netlify e integração WordPress |
| [WORDPRESS_CODES.md](WORDPRESS_CODES.md) | 📝 Códigos prontos para copiar no WordPress |
| [CHECKLIST_DEPLOY.md](CHECKLIST_DEPLOY.md) | ✅ Checklist completo passo a passo |

---

## 🔧 Configuração

### 1. Google Sheets (Obrigatório)

Para salvar os resultados dos testes:

1. Siga o guia completo: [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
2. Crie planilha e Apps Script
3. Faça deploy como Web App
4. Cole a URL em `src/utils/sheetsService.js`:

```javascript
const SHEETS_CONFIG = {
  scriptUrl: 'SUA_URL_DO_APPS_SCRIPT_AQUI'
};
```

### 2. Personalização (Opcional)

#### Alterar cores da marca:

Edite `src/constants/config.js`:

```javascript
export const QUIZ_CONFIG = {
  BRAND: {
    PRIMARY_COLOR: '#0e48fe',  // Azul principal
    SECONDARY_COLOR: '#ffae1e', // Laranja/amarelo
    // ...
  }
};
```

#### Adicionar/Modificar questões:

Edite os arquivos em `src/data/`:
- `grammarQuestions.js` - Questões de gramática
- `vocabularyQuestions.js` - Questões de vocabulário
- `readingQuestions.js` - Questões de leitura

---

## 🌐 Deploy

### Netlify (Recomendado)

**Guia completo**: [WORDPRESS_DEPLOY.md](WORDPRESS_DEPLOY.md)

**Deploy rápido com Git:**

```bash
# 1. Criar repositório no GitHub
# 2. Push do código

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/speakup-placement-test.git
git push -u origin main

# 3. Conectar no Netlify
# - Login em netlify.com
# - Import from GitHub
# - Deploy automático!
```

O arquivo `netlify.toml` já está configurado com todas as otimizações.

### Outros Serviços

O app também funciona em:
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Requer configuração adicional
- **AWS S3 + CloudFront**: Deploy manual da pasta `build`

---

## 📊 Sistema de Scoring

Baseado no Pearson GSE (Global Scale of English):

| Nível CEFR | Score Range | GSE Range | Descrição |
|------------|-------------|-----------|-----------|
| **Below A1** | 0-5% (0-3) | < 22 | Beginner |
| **A1** | 6-43% (4-26) | 22-29 | Elementary |
| **A2** | 44-70% (27-42) | 30-35 | Pre-Intermediate |
| **A2+** | 71-85% (43-51) | 36-42 | Upper Pre-Intermediate |
| **B1** | 86-93% (52-56) | 43-50 | Intermediate |
| **B1+** | 94-100% (57-60) | > 50 | Upper Intermediate |

---

## 📱 Integração WordPress

Várias opções disponíveis - veja [WORDPRESS_CODES.md](WORDPRESS_CODES.md):

### Opção 1: Iframe Simples

```html
<iframe src="https://seu-site.netlify.app" width="100%" height="100vh"></iframe>
```

### Opção 2: Shortcode PHP

```php
[speakup_quiz]
```

### Opção 3: Página Full Width

Template personalizado sem header/footer.

---

## 🎨 Customização Visual

### CSS Principal

Todo o estilo está em `src/components/Quiz.css`, incluindo:
- Design responsivo com media queries
- Animações e transições
- Tela de resultados moderna com círculos SVG
- Gradientes e sombras
- Cores da marca SpeakUp

### Logos

Localização: `public/images/`
- `SpeakUp-Logo-Azul.svg` - Logo azul (usado no quiz)
- `SpeakUp-Logo-Branco.svg` - Logo branco (alternativa)

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Coverage
npm test -- --coverage
```

---

## 🔒 Segurança e Privacidade

- ✅ Dados salvos via Google Sheets (você tem controle total)
- ✅ Nenhum dado vendido ou compartilhado
- ✅ HTTPS automático via Netlify
- ✅ Sem cookies de tracking (exceto se adicionar Analytics)
- ✅ Conformidade com LGPD (dados educacionais)

---

## 🐛 Troubleshooting

### Build falha

```bash
# Limpar cache e rebuildar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Google Sheets não salva

1. Verifique a URL em `src/utils/sheetsService.js`
2. Teste o Apps Script diretamente (function `testScript`)
3. Confirme que o script está deployed como "Anyone"
4. Veja logs de erro no console do navegador (F12)

### Quiz não carrega no WordPress

1. Teste a URL do Netlify diretamente
2. Verifique se tema WordPress permite iframes
3. Tente plugin "Advanced iframes" se necessário

---

## 📄 License

© 2026 SpeakUp English School. Todos os direitos reservados.

---

## 📞 Suporte

Para questões sobre o quiz:
- 📧 Email: ruan.speakup@gmail.com

---

## 🎉 Status

**Versão atual**: 1.0.0
**Status**: ✅ Production Ready
**Última atualização**: Fevereiro 2026

---

**Made with ❤️ for SpeakUp English School**
