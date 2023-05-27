const express = require('express');
const bodyParser = require('body-parser');
const ControleAcesso = require('./models/ControleAcesso');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Acesso ao BD
const uri = 'mongodb+srv://<username>:<password>@cluster0.8an5th6.mongodb.net/<database>?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Erro ao conectar ao banco de dados:', error);
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Rota para criação de controle de acesso
app.post('/Acessos', async (req, res, next) => {
  try {
    const matricula = req.body.matricula;
    const numeroSala = req.body.numeroSalaAcesso;

    // Fazer uma chamada de API para verificar a existência do usuário em CadastroUsuario
    const cadastroUsuarioResponse = await axios.get(`http://localhost:3001/Usuarios/matricula/${matricula}`);

    if (cadastroUsuarioResponse.status === 404 || !cadastroUsuarioResponse.data) {
      console.log('Usuário não encontrado em CadastroUsuario.');
      res.status(404).send('Usuário não encontrado em CadastroUsuario.');
      return; // Encerrar a execução da função
    }

    // Fazer uma chamada de API para verificar a existência da sala em CadastroSala
    const cadastroSalaResponse = await axios.get(`http://localhost:3002/Salas/${numeroSala}`);

    if (cadastroSalaResponse.status === 404 || !cadastroSalaResponse.data) {
      console.log('Sala não encontrada em CadastroSala.');
      res.status(404).send('Sala não encontrada em CadastroSala.');
      return; // Encerrar a execução da função
    }

    // Criar o novo controle de acesso
    const novoControleAcesso = new ControleAcesso({
      matricula: req.body.matricula,
      numeroSalaAcesso: req.body.numeroSalaAcesso,
    });

    await novoControleAcesso.save();
    console.log('Controle de acesso cadastrado com sucesso!');
    res.status(200).send('Controle de acesso cadastrado com sucesso!');
  } catch (err) {
    console.log('Error: ' + err);
    res.status(500).send('Erro ao cadastrar controle de acesso.');
  }
});

// Rota para obter todos os controles de acesso
app.get('/Acessos', async (req, res, next) => {
  try {
    const result = await ControleAcesso.find({});
    console.log('Total de controles de acesso na base de dados: ' + result.length);
    res.status(200).send(result);
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao obter dados.');
  }
});

// Rota para atualizar um controle de acesso com base no ID
app.put('/Acessos/matricula/:matricula', async (req, res) => {
  try {
    const result = await ControleAcesso.updateOne(
      { matricula: req.params.matricula },
      {
        matricula: req.body.matricula,
        numeroSalaAcesso: req.body.numeroSalaAcesso,
      }
    );
    if (result.nModified === 0) {
      console.log('Controle de acesso não encontrado ou nenhum dado modificado.');
      res.status(404).send('Controle de acesso não encontrado ou nenhum dado modificado.');
    } else {
      console.log('Controle de acesso atualizado com sucesso!');
      res.status(200).send('Controle de acesso atualizado com sucesso!');
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao atualizar controle de acesso.');
  }
});

app.get('/Acessos/:matricula/:numeroSala', async (req, res) => {
  try {
    const matricula = req.params.matricula;
    const numeroSala = req.params.numeroSala;

    // Consulta o ControleAcesso para verificar se o usuário tem acesso à sala
    const result = await ControleAcesso.findOne({
      matricula: matricula,
      numeroSalaAcesso: numeroSala
    });

    if (result) {
      console.log('Usuário tem acesso à sala.');
      res.status(200).json({ temAcesso: true });
    } else {
      console.log('Usuário não tem acesso à sala.');
      res.status(200).json({ temAcesso: false });
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao verificar acesso do usuário.');
  }
});



app.delete('/Acessos/matricula/:matricula', async (req, res) => {
  try {
    const result = await ControleAcesso.deleteOne({ matricula: req.params.matricula });
    if (result.deletedCount === 0) {
      console.log('Controle de acesso não encontrado.');
      res.status(404).send('Controle de acesso não encontrado.');
    } else {
      console.log('Controle de acesso excluído com sucesso!');
      res.status(200).send('Controle de acesso excluído com sucesso!');
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao excluir controle de acesso.');
  }
});

// Iniciar o servidor
app.listen(3003, () => {
  console.log('Servidor do Controle de Acesso iniciado na porta 3003!');
});
