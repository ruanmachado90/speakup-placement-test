# 📊 Configuração Google Sheets - Quiz de Nivelamento

## ⚡ Setup Rápido (3 minutos)

### 1️⃣ Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha (pode chamar de "Quiz Results - SpeakUp")
3. Na primeira linha (cabeçalho), adicione as seguintes colunas:

```
A1: Data/Hora
B1: Nome do Aluno
C1: Score Total
D1: Percentual
D1: Nível CEFR
F1: Grammar Score
G1: Vocabulary Score
H1: Reading Score
```

---

### 2️⃣ Criar o Apps Script

1. Na planilha, clique em **Extensions** (Extensões) → **Apps Script**
2. Delete o código padrão
3. **Cole o código completo abaixo:**
4. ⚠️ **IMPORTANTE**: Se sua planilha estiver em português, mude na linha 7:
   - De: `const SHEET_NAME = 'Sheet1';`
   - Para: `const SHEET_NAME = 'Planilha1';` (ou execute `findSheetName` para descobrir)

```javascript
/**
 * SpeakUp Placement Test - Google Sheets Integration
 * This script receives test results and saves them to the spreadsheet
 */

// Configuration
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name (Planilha1 for Portuguese)
const TIMEZONE = 'America/Sao_Paulo'; // Brazilian timezone

/**
 * Helper function to find the correct sheet name
 * Run this if you get "Sheet not found" error
 */
function findSheetName() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  Logger.log('📋 Available sheets in your spreadsheet:');
  sheets.forEach(sheet => {
    Logger.log('  - "' + sheet.getName() + '"');
  });
  Logger.log('👆 Copy one of these names and update SHEET_NAME at the top of the code');
}

/**
 * Handles POST requests from the React app
 */
function doPost(e) {
  try {
    // Validate incoming request
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('Invalid request - missing data');
      return ContentService
        .createTextOutput(JSON.stringify({ 
          'result': 'error', 
          'message': 'Invalid request format. Use testScript() to test manually.' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'message': 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Format the timestamp to Brazilian format
    const timestamp = new Date(data.timestamp);
    const formattedDate = Utilities.formatDate(timestamp, TIMEZONE, 'dd/MM/yyyy HH:mm:ss');
    
    // Prepare row data
    const rowData = [
      formattedDate,                    // Data/Hora
      data.studentName,                 // Nome do Aluno
      data.totalScore,                  // Score Total (ex: 45/60)
      data.percentage,                  // Percentual (ex: 75%)
      data.level,                       // Nível CEFR (ex: B1)
      data.grammarScore,                // Grammar Score (ex: 22/30)
      data.vocabularyScore,             // Vocabulary Score (ex: 15/20)
      data.readingScore                 // Reading Score (ex: 8/10)
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Optional: Format the new row
    const lastRow = sheet.getLastRow();
    
    // Center align all cells in the new row
    sheet.getRange(lastRow, 1, 1, 8).setHorizontalAlignment('center');
    
    // Bold the level column (column E)
    sheet.getRange(lastRow, 5).setFontWeight('bold');
    
    // Color code based on level
    const levelColors = {
      'Below A1': '#ffebee',  // Light red
      'A1': '#fff3e0',        // Light orange
      'A2': '#fff9c4',        // Light yellow
      'A2+': '#f0f4c3',       // Light lime
      'B1': '#c8e6c9',        // Light green
      'B1+': '#b2dfdb'        // Light teal
    };
    
    const levelColor = levelColors[data.level] || '#ffffff';
    sheet.getRange(lastRow, 5).setBackground(levelColor);
    
    // Log success
    Logger.log('Data saved successfully for: ' + data.studentName);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': lastRow }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify the script is working
 * SELECT THIS FUNCTION in the dropdown and click Run
 */
function testScript() {
  Logger.log('=== Starting Test ===');
  
  const testData = {
    timestamp: new Date().toISOString(),
    studentName: 'Test Student',
    totalScore: '45/60',
    percentage: '75%',
    level: 'B1',
    grammarScore: '22/30',
    vocabularyScore: '15/20',
    readingScore: '8/10'
  };
  
  Logger.log('Test data: ' + JSON.stringify(testData));
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
  Logger.log('=== Check your spreadsheet - a test row should appear ===');
}

/**
 * Alternative: Add test data directly without using doPost
 * Use this if testScript() doesn't work
 */
function addTestDataDirectly() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    Logger.log('ERROR: Sheet "' + SHEET_NAME + '" not found!');
    Logger.log('Available sheets: ' + SpreadsheetApp.getActiveSpreadsheet().getSheets().map(s => s.getName()).join(', '));
    return;
  }
  
  const testRow = [
    Utilities.formatDate(new Date(), TIMEZONE, 'dd/MM/yyyy HH:mm:ss'),
    'Test Student',
    '45/60',
    '75%',
    'B1',
    '22/30',
    '15/20',
    '8/10'
  ];
  
  sheet.appendRow(testRow);
  Logger.log('✅ Test row added successfully! Check your spreadsheet.');
}
```

---

### 3️⃣ Deploy como Web App

1. No Apps Script, clique em **Deploy** (Implantar) → **New deployment** (Nova implantação)
2. Clique no ícone de engrenagem ⚙️ ao lado de "Select type" e escolha **Web app**
3. Configure:
   - **Description**: "SpeakUp Quiz Integration"
   - **Execute as**: Me (seu email)
   - **Who has access**: **Anyone** (Qualquer pessoa)
4. Clique em **Deploy**
5. **IMPORTANTE**: Autorize o script (clique em "Authorize access" e siga os passos)
6. **Copie a URL** que aparece (algo como: `https://script.google.com/macros/s/...../exec`)

---

### 4️⃣ Configurar no React App

1. Abra o arquivo: `src/utils/sheetsService.js`
2. Substitua `YOUR_GOOGLE_SCRIPT_URL_HERE` pela URL que você copiou:

```javascript
const SHEETS_CONFIG = {
  scriptUrl: 'https://script.google.com/macros/s/SEU_ID_AQUI/exec'
};
```

3. Salve o arquivo

---

## ✅ Testar a Integração

### Opção 1: Testar no Apps Script (Recomendado primeiro)

1. No Apps Script, **selecione a função `testScript`** no menu dropdown (ao lado do botão Run)
   - ⚠️ **IMPORTANTE**: Certifique-se de que "testScript" está selecionado, NÃO "doPost"!
2. Clique em **Run** (▶️ Executar)
3. Autorize o script se solicitado (primeira vez apenas)
4. Verifique os logs: **View** → **Logs** ou **Executions**
5. Verifique sua planilha - deve aparecer uma linha de teste com "Test Student"

**Se der erro:**
- Tente executar a função `addTestDataDirectly` em vez de `testScript`
- Verifique se o nome da aba é "Sheet1" (ou mude no código)
- Veja os logs para detalhes do erro

### Opção 2: Testar com o App

1. Execute o quiz completo
2. Ao finalizar, verifique a planilha
3. Deve aparecer uma nova linha com os dados do teste

---

## 🎨 Formatação da Planilha (Opcional)

### Cabeçalho estilizado:
1. Selecione a primeira linha (A1:H1)
2. **Format** → **Bold** (Negrito)
3. **Format** → **Fill color** → Escolha azul (#0e48fe) ou laranja (#ffae1e)
4. **Format** → **Text color** → Branco

### Largura das colunas:
- Coluna A (Data/Hora): 150px
- Coluna B (Nome): 200px
- Colunas C-H: 120px

### Congelar cabeçalho:
1. Clique na linha 1
2. **View** → **Freeze** → **1 row**

---

## 📈 Recursos Extras

### Criar um Dashboard Automático:

Adicione essas fórmulas em uma aba separada (Dashboard):

**Total de testes realizados:**
```
=COUNTA(Sheet1!B2:B)
```

**Média geral de percentual:**
```
=AVERAGEIF(Sheet1!D2:D,">0",Sheet1!D2:D)
```

**Contagem por nível:**
```
A1: Nível
A2: Below A1
A3: A1
A4: A2
A5: A2+
A6: B1
A7: B1+

B1: Quantidade
B2: =COUNTIF(Sheet1!E:E,"Below A1")
B3: =COUNTIF(Sheet1!E:E,"A1")
B4: =COUNTIF(Sheet1!E:E,"A2")
B5: =COUNTIF(Sheet1!E:E,"A2+")
B6: =COUNTIF(Sheet1!E:E,"B1")
B7: =COUNTIF(Sheet1!E:E,"B1+")
```

**Criar gráfico:**
1. Selecione os dados de nível (A1:B7)
2. **Insert** → **Chart**
3. Escolha "Pie chart" ou "Column chart"

---

## 🔒 Segurança

### Notas importantes:

✅ **Seguro**: O script é público (qualquer um com a URL pode enviar dados), mas:
- Apenas você tem acesso à planilha
- A URL do script é difícil de adivinhar
- Você pode revogar acesso a qualquer momento

❌ **NÃO compartilhe** a URL do script publicamente

🔄 **Para trocar a URL** (se comprometida):
1. No Apps Script, vá em **Deploy** → **Manage deployments**
2. Clique em ✏️ editar
3. Clique em **New version**
4. Deploy
5. Atualize a URL em `sheetsService.js`

---

## 🐛 Troubleshooting

### "Sheet not found: Sheet1" ⚠️ ERRO MAIS COMUM
- **Causa**: Sua aba não se chama "Sheet1" (provavelmente é "Planilha1" se estiver em português)
- **Solução rápida:**
  1. Execute a função **`findSheetName`** no Apps Script
  2. Veja nos logs o nome exato da sua aba (ex: "Planilha1")
  3. No código, mude a linha: `const SHEET_NAME = 'Sheet1';` para `const SHEET_NAME = 'Planilha1';`
  4. Salve e execute `testScript` novamente

### "Cannot read properties of undefined (reading 'postData')"
- **Causa**: Você executou a função `doPost` diretamente em vez de `testScript`
- **Solução**: Selecione **`testScript`** no dropdown e execute novamente
- **Alternativa**: Execute a função `addTestDataDirectly` para adicionar uma linha de teste

### "Google Sheets setup needed" aparece no React?
- Verifique se você colocou a URL correta em `sheetsService.js`
- Confirme que o script está deployed como "Anyone"
- Teste a função `testScript` no Apps Script primeiro

### Dados não aparecem na planilha?
- Execute `findSheetName` para verificar o nome correto da aba
- Veja os logs no Apps Script: **View** → **Executions**
- Teste manualmente com `testScript`

### Erro de autorização?
- Re-authorize o script: **Deploy** → **New deployment**
- Certifique-se de selecionar "Anyone" em "Who has access"

---

## 📞 Suporte

Se precisar de ajuda, verifique:
1. Console do navegador (F12) para erros JavaScript
2. Apps Script Executions para erros no servidor
3. A URL está correta no código

---

## ✨ Pronto!

Agora toda vez que um aluno completar o teste, os resultados serão salvos automaticamente na sua planilha do Google Sheets! 🎉
