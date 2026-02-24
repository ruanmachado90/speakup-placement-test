# ✅ Checklist Completo - Deploy e Integração WordPress

## 📋 Resumo do Processo

Use este checklist para não esquecer nenhum passo importante.

---

## PRÉ-REQUISITOS

- [ ] Node.js instalado
- [ ] Conta no Google (para Sheets)
- [ ] Conta no GitHub (recomendado)
- [ ] Conta no Netlify (gratuita)
- [ ] Acesso admin ao WordPress

---

## PARTE 1: GOOGLE SHEETS (JÁ FEITO ✅)

- [x] Planilha criada no Google Sheets
- [x] Apps Script configurado
- [x] Script testado (testScript funcionou)
- [x] Deploy feito como Web App
- [x] URL do script copiada
- [x] URL adicionada em `src/utils/sheetsService.js`
- [x] Teste local funcionou (dados aparecem na planilha)

**✅ Status**: COMPLETO

---

## PARTE 2: PREPARAR PARA DEPLOY

- [x] `netlify.toml` criado
- [x] `public/_redirects` criado
- [x] `.gitignore` existe
- [x] Meta tags SEO adicionadas no `index.html`
- [ ] **PRÓXIMO**: Testar build localmente

### Teste local do build:

```powershell
cd "C:\Users\Ruan\Desktop\placement"
npm run build
```

**Espere ver**: `The build folder is ready to be deployed.`

- [ ] Build completou sem erros
- [ ] Pasta `build` foi criada

---

## PARTE 3A: DEPLOY NO NETLIFY (Via Git - Recomendado)

### GitHub

- [ ] Repositório criado no GitHub
- [ ] Nome: `speakup-placement-test`
- [ ] URL copiada (ex: `https://github.com/usuario/speakup-placement-test.git`)

### Comandos Git

Execute no terminal:

```powershell
cd "C:\Users\Ruan\Desktop\placement"
git init
git add .
git commit -m "Initial commit - SpeakUp Placement Test"
git remote add origin https://github.com/SEU_USUARIO/speakup-placement-test.git
git branch -M main
git push -u origin main
```

- [ ] Código enviado para GitHub
- [ ] Repositório visível no GitHub

### Netlify

- [ ] Login feito em netlify.com
- [ ] "Add new site" → "Import an existing project"
- [ ] GitHub conectado e autorizado
- [ ] Repositório `speakup-placement-test` selecionado
- [ ] Build settings confirmados:
  - Build command: `npm run build`
  - Publish directory: `build`
- [ ] Deploy iniciado
- [ ] ⏱️ Aguardar 2-3 minutos
- [ ] ✅ Deploy completou com sucesso
- [ ] Site está acessível (clicar no link)

### Configuração do Site

- [ ] Nome do site alterado (Site settings → Change site name)
- [ ] Novo nome: `speakup-placement-test` (ou outro de sua escolha)
- [ ] URL final: `https://speakup-placement-test.netlify.app`
- [ ] URL testada no navegador
- [ ] Quiz carrega corretamente
- [ ] Teste completado
- [ ] Dados apareceram no Google Sheets

**✅ URL final do site**: ____________________________

---

## PARTE 3B: DEPLOY NO NETLIFY (Manual - Alternativa)

Se NÃO usar Git:

### Build Local

```powershell
cd "C:\Users\Ruan\Desktop\placement"
npm run build
```

- [ ] Build completou
- [ ] Pasta `build` criada

### Upload Netlify

- [ ] Login em netlify.com
- [ ] Área de "Drag and drop" localizada
- [ ] Pasta `build` arrastada para o Netlify
- [ ] Upload completado
- [ ] Site publicado
- [ ] URL copiada
- [ ] Site testado

**✅ URL final do site**: ____________________________

---

## PARTE 4: INTEGRAÇÃO COM WORDPRESS

### Escolher Método

Qual método você vai usar?
- [ ] Opção 1: HTML/Iframe simples (mais fácil)
- [ ] Opção 2: Shortcode PHP (mais flexível)
- [ ] Opção 3: Página Full Width (melhor UX)
- [ ] Opção 4: Widget na Sidebar
- [ ] Opção 5: Link no Menu

### Para TODAS as opções:

**⚠️ IMPORTANTE: Substitua `SEU-SITE.netlify.app` pela URL real!**

URL do Netlify: ____________________________

### Implementação

#### Se escolheu Opção 1 (HTML Simples):

- [ ] Abrir [WORDPRESS_CODES.md](WORDPRESS_CODES.md#L5-L24)
- [ ] Copiar código da seção 1
- [ ] Substituir URL
- [ ] WordPress Admin → Páginas → Nova/Editar
- [ ] Modo **HTML/Código** ativado
- [ ] Código colado
- [ ] Página publicada
- [ ] Página testada no navegador
- [ ] Quiz aparece corretamente

#### Se escolheu Opção 2 (Shortcode):

- [ ] Abrir [WORDPRESS_CODES.md](WORDPRESS_CODES.md#L33-L66)
- [ ] Copiar código PHP da seção 2
- [ ] Substituir URL na linha 10
- [ ] WordPress Admin → Aparência → Editor de Temas
- [ ] `functions.php` aberto
- [ ] Código colado no final
- [ ] Arquivo salvo
- [ ] Nova página criada
- [ ] Shortcode `[speakup_quiz]` adicionado
- [ ] Página publicada
- [ ] Página testada

#### Se escolheu Opção 3 (Full Page):

- [ ] Abrir [WORDPRESS_CODES.md](WORDPRESS_CODES.md#L89-L143)
- [ ] Copiar código do template
- [ ] Substituir URL
- [ ] Criar arquivo `page-quiz.php` no tema
- [ ] Código colado
- [ ] Arquivo salvo
- [ ] Nova página criada no WordPress
- [ ] Template "Quiz Full Page" selecionado
- [ ] Página publicada
- [ ] Página testada

#### Se escolheu Opção 4 (Widget):

- [ ] Copiar código do widget
- [ ] Colar em `functions.php`
- [ ] WordPress Admin → Aparência → Widgets
- [ ] Widget configurado
- [ ] URL do quiz adicionada
- [ ] Widget salvo
- [ ] Site testado

#### Se escolheu Opção 5 (Menu):

- [ ] WordPress Admin → Aparência → Menus
- [ ] Link personalizado adicionado
- [ ] URL do Netlify colada
- [ ] Texto do link definido
- [ ] Menu salvo
- [ ] Link testado

---

## PARTE 5: TESTES FINAIS

### Teste Desktop

- [ ] Abrir página do quiz no WordPress
- [ ] Quiz carrega corretamente
- [ ] Iniciar teste
- [ ] Responder algumas questões
- [ ] Completar teste
- [ ] Tela de resultados aparece
- [ ] Botões de compartilhar funcionam
- [ ] Verificar Google Sheets
- [ ] Nova linha com dados apareceu
- [ ] Dados estão corretos

### Teste Mobile

- [ ] Abrir no celular
- [ ] Quiz é responsivo
- [ ] Botões são clicáveis
- [ ] Texto é legível
- [ ] Completar teste
- [ ] Resultados exibidos corretamente
- [ ] Dados salvos no Sheets

### Teste de Performance

- [ ] PageSpeed Insights testado
- [ ] Score aceitável (>80)
- [ ] Nenhum erro no console (F12)

---

## PARTE 6: CONFIGURAÇÕES OPCIONAIS

### Analytics (Opcional)

- [ ] Google Analytics ID obtido
- [ ] Tag adicionada em `public/index.html`
- [ ] Code commitado e push feito (se usar Git)
- [ ] Netlify rebuilda automaticamente
- [ ] Analytics funcionando

### Domínio Personalizado (Opcional)

- [ ] Domínio próprio disponível (ex: quiz.speakup.com.br)
- [ ] Netlify → Domain management
- [ ] Custom domain adicionado
- [ ] CNAME configurado no DNS
- [ ] Aguardar propagação (até 48h)
- [ ] HTTPS ativado automaticamente
- [ ] Domínio funcionando

### Dashboard do Sheets (Opcional)

- [ ] Aba "Dashboard" criada na planilha
- [ ] Fórmulas de contagem adicionadas
- [ ] Gráfico criado
- [ ] Formatação aplicada

---

## PARTE 7: DOCUMENTAÇÃO E BACKUP

### Documentação

- [ ] URLs importantes anotadas:
  - Netlify: ____________________________
  - WordPress: ____________________________
  - Google Sheets: ____________________________
  - Apps Script: ____________________________
  - GitHub (se usado): ____________________________

### Backup

- [ ] Código no GitHub (se Opção A) OU
- [ ] Pasta do projeto em backup local
- [ ] URL do Apps Script salva
- [ ] Cópia da planilha Google Sheets feita

---

## TROUBLESHOOTING COMUM

### ❌ Build falha no Netlify
**Solução**:
- Verificar logs de erro no Netlify
- Testar build localmente: `npm run build`
- Adicionar variável de ambiente: `CI=false`

### ❌ Quiz não aparece no WordPress
**Solução**:
- Verificar se URL está correta
- Testar URL diretamente no navegador
- Verificar se tema bloqueia iframes
- Tentar plugin "Advanced iframes"

### ❌ Dados não salvam no Sheets
**Solução**:
- Verificar console do navegador (F12)
- Confirmar URL do Apps Script em `sheetsService.js`
- Testar localmente primeiro (`npm start`)
- Verificar logs no Apps Script (Executions)
- Confirmar que script está deployed como "Anyone"

### ❌ Quiz lento para carregar
**Solução**:
- Verificar tamanho das imagens
- Confirmar que Netlify CDN está ativo
- Testar em aba anônima
- Limpar cache do navegador

---

## 🎉 PROJETO COMPLETO!

Quando todos os itens estiverem marcados:

✅ Quiz funcionando no Netlify
✅ Integrado ao WordPress
✅ Salvando dados no Google Sheets
✅ Responsivo (mobile + desktop)
✅ Testado e validado

---

## 📞 LINKS DE SUPORTE

- **Netlify Docs**: https://docs.netlify.com
- **WordPress Support**: https://wordpress.org/support
- **Apps Script Docs**: https://developers.google.com/apps-script
- **React Docs**: https://react.dev

---

## 📝 NOTAS ADICIONAIS

Use este espaço para anotações pessoais:

____________________________________________________________________

____________________________________________________________________

____________________________________________________________________

____________________________________________________________________
