const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para verificar acesso e registrar acesso
app.get('/LiberacaoAcesso/:matricula/:numeroSala', async (req, res) => {
  try {
    const matricula = req.params.matricula;
    const numeroSala = req.params.numeroSala;
    
    // Verifica o acesso do usuário no ControleAcessoService
    const controleAcessoResponse = await axios.get(`http://localhost:3003/Acessos/${matricula}/${numeroSala}`);
    const temAcesso = controleAcessoResponse.data && controleAcessoResponse.data.temAcesso;
  
    // Registra o acesso no RegistroAcessoService
    await axios.post('http://localhost:3004/RegistroAcesso', {
      matricula: matricula,
      numeroSala: numeroSala,
      dataHora: new Date().toISOString()
    });

    if (temAcesso) {
      res.status(200).send('Acesso liberado com sucesso');
    } else {
      res.status(403).send('Acesso negado');
    }
  } catch (error) {
    console.log('Erro ao verificar e registrar acesso:', error);
    res.status(500).send('Erro ao verificar e registrar acesso.');
  }
});



// Iniciar o servidor
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
