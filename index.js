const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const port = 3000;

// Servir arquivos estáticos (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname)));

// Configurar o JSON Server para servir o db.json
const router = jsonServer.router(path.join(__dirname, 'db', 'db.json'));
app.use('/api', router); // Rotas para API JSON

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
