# 📧 Configuração de Email - Placement Test

## Como Receber Resultados no Email (ruan.speakup@gmail.com)

O sistema está preparado para enviar automaticamente os resultados dos testes para seu email. Para ativar, você precisa configurar o **EmailJS** (serviço gratuito).

---

## 📝 Passo a Passo:

### 1. Criar Conta no EmailJS

1. Acesse: https://www.emailjs.com/
2. Clique em **"Sign Up"** (ou faça login se já tiver conta)
3. Complete o cadastro (gratuito, sem cartão de crédito)

### 2. Adicionar Serviço de Email

1. No dashboard do EmailJS, vá em **"Email Services"**
2. Clique em **"Add New Service"**
3. Selecione **Gmail**
4. Conecte sua conta: **ruan.speakup@gmail.com**
5. Anote o **Service ID** (ex: service_abc123)

### 3. Criar Template de Email

1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template assim:

**Subject (Assunto):**
```
Novo Resultado - Placement Test - {{student_name}}
```

**Content (Corpo do Email):**
```
Novo resultado do Placement Test recebido!

ALUNO: {{student_name}}
Email: {{student_email}}

━━━━━━━━━━━━━━━━━━━━━
RESULTADO GERAL
━━━━━━━━━━━━━━━━━━━━━

Score Total: {{total_score}}/{{total_questions}} ({{percentage}}%)
Nível CEFR: {{level}}

━━━━━━━━━━━━━━━━━━━━━
RESULTADOS POR SEÇÃO
━━━━━━━━━━━━━━━━━━━━━

Grammar: {{grammar_score}}
Vocabulary: {{vocabulary_score}}
Reading: {{reading_score}}

━━━━━━━━━━━━━━━━━━━━━
Data/Hora: {{date}}
━━━━━━━━━━━━━━━━━━━━━

Este email foi gerado automaticamente pelo sistema de Placement Test SpeakUp.
```

4. Em **"To email"**, configure para: **ruan.speakup@gmail.com**
5. Salve e anote o **Template ID** (ex: template_xyz789)

### 4. Pegar Public Key

1. Vá em **"Account"** → **"General"**
2. Encontre e copie sua **Public Key** (ex: user_AbCdEfGhIj)

### 5. Configurar no Código

Abra o arquivo: `src/utils/emailService.js`

Substitua estas linhas (no topo do arquivo):

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',     // Cole aqui o Service ID
  templateId: 'YOUR_TEMPLATE_ID',   // Cole aqui o Template ID
  publicKey: 'YOUR_PUBLIC_KEY'      // Cole aqui a Public Key
};
```

**Exemplo:**
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  publicKey: 'user_AbCdEfGhIj'
};
```

### 6. Testar

1. Salve o arquivo
2. O servidor React irá recarregar automaticamente
3. Faça um teste completo do placement
4. Ao finalizar, você receberá um email em **ruan.speakup@gmail.com**

---

## ✅ Como Funciona

Quando um aluno completa o teste:
1. ✅ Resultados aparecem na tela para o aluno
2. ✅ **Automaticamente** um email é enviado para você com todos os detalhes
3. ✅ Aluno vê mensagem: "✓ Results sent to your teacher"

---

## 📋 Informações Recebidas no Email

Você receberá:
- Nome do aluno
- Email do aluno (se fornecido)
- Score total (ex: 45/60)
- Porcentagem (ex: 75%)
- Nível CEFR (ex: A2+ - Pre-Intermediate)
- Detalhes por seção:
  - Grammar: X/30
  - Vocabulary: Y/20
  - Reading: Z/10
- Data e hora do teste

---

## 🔒 Segurança

- ✅ Seus IDs do EmailJS são **públicos** (sem problema)
- ✅ Eles só funcionam com seu domínio configurado
- ✅ No dashboard do EmailJS você pode limitar o número de emails/mês
- ✅ Plano gratuito: 200 emails/mês (mais que suficiente)

---

## 🆘 Problemas?

### Email não chega:

1. Verifique a caixa de SPAM/Lixo eletrônico
2. Confira se os IDs estão corretos no código
3. Vá no dashboard do EmailJS → History para ver se enviou
4. Verifique se atingiu o limite de emails do mês

### Mensagem de erro na tela:

- Se aparecer "⚠ Email configuration needed", significa que os IDs ainda não foram configurados
- Verifique o console do navegador (F12) para ver detalhes do erro

---

## 💡 Dica

Durante testes, você pode comentar a linha de envio de email para não gastar o limite:

No arquivo `ResultsScreen.jsx`, comente estas linhas (adicione // na frente):

```javascript
// sendEmail(); // Comentado temporariamente
```

Quando estiver tudo configurado, descomente para ativar.

---

## 📧 Suporte EmailJS

- Documentação: https://www.emailjs.com/docs/
- FAQ: https://www.emailjs.com/docs/faq/
- Suporte: support@emailjs.com
