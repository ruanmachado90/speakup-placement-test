# 🚀 Deploy do Quiz no Netlify e WordPress

## 📦 Preparação Completa

Seu app já está **100% configurado** para deploy! Foram adicionados:

✅ `netlify.toml` - Configuração automática do Netlify
✅ `public/_redirects` - Roteamento para SPA
✅ Meta tags SEO no `index.html`
✅ Otimizações de cache e segurança

---

## 🌐 Passo 1: Deploy no Netlify (5 minutos)

### Opção A: Deploy via Git (Recomendado)

#### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no **+** no canto superior direito → **New repository**
3. Configure:
   - **Repository name**: `speakup-placement-test`
   - **Description**: "SpeakUp English Placement Test - CEFR aligned"
   - **Visibility**: Pode ser Public ou Private
4. **NÃO marque** "Initialize with README" (já temos arquivos)
5. Clique em **Create repository**

#### 2. Subir o código para o GitHub

Abra o terminal no VS Code e execute:

```powershell
# Navegar para a pasta do projeto
cd "C:\Users\Ruan\Desktop\placement"

# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - SpeakUp Placement Test"

# Adicionar o repositório remoto (SUBSTITUA SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/speakup-placement-test.git

# Criar branch main
git branch -M main

# Enviar o código
git push -u origin main
```

**Nota**: Se pedir credenciais, use seu username do GitHub e um **Personal Access Token** (não a senha).

#### 3. Conectar ao Netlify

1. Acesse [netlify.com](https://www.netlify.com) e faça login (pode usar conta do GitHub)
2. Clique em **Add new site** → **Import an existing project**
3. Escolha **GitHub** e autorize o acesso
4. Selecione o repositório `speakup-placement-test`
5. Configure o build (deve auto-preencher com o `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Clique em **Deploy site**

⏱️ **Aguarde 2-3 minutos** - O Netlify vai instalar dependências e fazer o build.

---

### Opção B: Deploy Manual (Drag & Drop)

Se não quiser usar Git:

#### 1. Criar o build localmente

No terminal do VS Code:

```powershell
cd "C:\Users\Ruan\Desktop\placement"
npm run build
```

⏱️ Aguarde o build finalizar (1-2 minutos)

#### 2. Deploy no Netlify

1. Acesse [netlify.com](https://www.netlify.com) e faça login
2. Na página principal, você verá uma área escrita **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
3. **Arraste a pasta `build`** (não o projeto todo, só a pasta build!) para essa área
4. Aguarde o upload e deploy

---

## 🎨 Passo 2: Configurar Site no Netlify

Após o deploy:

1. O site terá um nome aleatório (ex: `random-name-123456.netlify.app`)
2. Para mudar o nome:
   - Vá em **Site settings** → **Site details** → **Change site name**
   - Escolha algo como: `speakup-placement-test`
   - Sua URL será: `https://speakup-placement-test.netlify.app`

3. (Opcional) **Domínio personalizado**:
   - Se tiver um domínio próprio (ex: `quiz.speakup.com`)
   - Vá em **Domain management** → **Add custom domain**
   - Siga as instruções para apontar o DNS

---

## 📝 Passo 3: Adicionar no WordPress

### Opção 1: Iframe Responsivo (Recomendado)

Cole este código em qualquer **página ou post** do WordPress (modo HTML/Código):

```html
<!-- SpeakUp Placement Test -->
<div style="position: relative; padding-bottom: 100vh; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <iframe 
    src="https://SEU-SITE.netlify.app" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    title="SpeakUp English Placement Test"
    loading="lazy"
    allow="clipboard-write"
  ></iframe>
</div>

<style>
  /* Responsivo para mobile */
  @media (max-width: 768px) {
    div[style*="padding-bottom: 100vh"] {
      padding-bottom: 150vh !important;
    }
  }
</style>
```

**⚠️ IMPORTANTE**: Substitua `SEU-SITE.netlify.app` pela URL real do seu site!

---

### Opção 2: Plugin de Shortcode (Mais Flexível)

#### 1. Criar o Shortcode

No WordPress, vá em **Aparência** → **Editor de Temas** → **functions.php** e adicione:

```php
<?php
// SpeakUp Placement Test Shortcode
function speakup_placement_test_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '100vh',
        'url' => 'https://SEU-SITE.netlify.app'
    ), $atts);
    
    $output = '<div class="speakup-quiz-container" style="position: relative; padding-bottom: ' . esc_attr($atts['height']) . '; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin: 20px 0;">';
    $output .= '<iframe src="' . esc_url($atts['url']) . '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" title="SpeakUp English Placement Test" loading="lazy" allow="clipboard-write"></iframe>';
    $output .= '</div>';
    
    return $output;
}
add_shortcode('speakup_quiz', 'speakup_placement_test_shortcode');
?>
```

**⚠️ IMPORTANTE**: Substitua `SEU-SITE.netlify.app` pela URL real!

#### 2. Usar o Shortcode

Em qualquer página ou post, basta adicionar:

```
[speakup_quiz]
```

Ou com altura customizada:

```
[speakup_quiz height="120vh"]
```

---

### Opção 3: Página Full Width (Melhor UX)

1. Crie uma **nova página** no WordPress
2. Use um template **Full Width** ou **Blank Template**
3. Adicione o código HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Placement Test - SpeakUp</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body, html {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <iframe 
        src="https://SEU-SITE.netlify.app" 
        title="SpeakUp English Placement Test"
        allow="clipboard-write"
    ></iframe>
</body>
</html>
```

**Esta opção remove cabeçalho/rodapé do WordPress para experiência imersiva.**

---

## 🔄 Atualizações Futuras

### Se usou Git (Opção A):

1. Faça alterações no código
2. Commit e push:
```powershell
git add .
git commit -m "Descrição da mudança"
git push
```
3. **Netlify rebuilda automaticamente!** 🎉

### Se usou Deploy Manual (Opção B):

1. Rode `npm run build` novamente
2. Arraste a nova pasta `build` no Netlify (substitui a anterior)

---

## 🎯 Links Úteis

Após o deploy, você terá:

- 🌐 **URL do Quiz**: `https://seu-site.netlify.app`
- 📊 **Google Sheets**: Já configurado e funcionando
- 📱 **Responsivo**: Funciona perfeitamente em mobile
- ⚡ **Rápido**: CDN global do Netlify
- 🔒 **HTTPS**: Automático e gratuito

---

## 🐛 Troubleshooting

### Quiz não carrega no WordPress
- Verifique se a URL do iframe está correta
- Teste a URL diretamente no navegador
- Alguns temas WordPress podem bloquear iframes - use plugin "Advanced iframes"

### Build falha no Netlify
- Verifique os logs de build no Netlify
- Confirme que `package.json` tem todas as dependências
- Pode precisar adicionar variável de ambiente: `CI=false`

### Dados não salvam no Google Sheets
- Confirme que a URL do script está correta em `sheetsService.js`
- Teste localmente primeiro (npm start)
- Verifique os logs no Apps Script

---

## ✨ Próximos Passos Opcionais

### Analytics
Adicione Google Analytics editando `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Custom Domain
Configure um subdomínio como `quiz.speakup.com.br` no Netlify:
1. Domain management → Add custom domain
2. Adicione CNAME no seu provedor DNS apontando para o Netlify

### Password Protection
Se quiser proteger com senha:
1. Netlify → Site settings → Access control
2. Ative "Password protection" (plano pago) ou use plugin WordPress

---

## 🎉 Tudo Pronto!

Com essas configurações, seu quiz estará:
- ✅ Hospedado profissionalmente
- ✅ Integrado ao WordPress
- ✅ Salvando resultados automaticamente
- ✅ Funcionando em todos os dispositivos
- ✅ Com HTTPS e CDN global

**Boa sorte com o SpeakUp English School!** 🚀
