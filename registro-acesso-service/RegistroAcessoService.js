const express = require('express');
const bodyParser = require('body-parser');
const RegistroAcesso = require('./models/RegistroAcesso');
const mongoose = require('mongoose');
const moment = require('moment');

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

// Rota para registrar um acesso
app.post('/RegistroAcesso', async (req, res) => {
  try {
    const { matricula, numeroSala, dataHora } = req.body;
    
    const novoRegistroAcesso = new RegistroAcesso({
      matricula: matricula,
      numeroSala: numeroSala,
      dataHora: moment(dataHora).format('DD/MM/YYYY HH:mm:ss')
    });

    await novoRegistroAcesso.save();
    console.log('Acesso registrado com sucesso!');
    res.status(200).send('Acesso registrado com sucesso!');
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao registrar acesso.');
  }
});

// Rota para obter registros de acessos de um usuário especifico pela matricula
app.get('/RegistroAcesso/:matricula:', async (req, res) => {
  try {
    const { matricula} = req.query;
    const registrosAcesso = await RegistroAcesso.find({ matricula: matricula});
    
    if (registrosAcesso.length === 0) {
      console.log('Nenhum registro de acesso encontrado.');
      res.status(404).send('Nenhum registro de acesso encontrado.');
    } else {
      res.status(200).send(registrosAcesso);
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao obter registros de acesso.');
  }
});


// rota para buscar todos os registros de acessos
app.get('/RegistroAcesso', async (req, res, next) => {
  try {
      const result = await RegistroAcesso.find({});
          console.log('Total de acessos na base de dados: ' + result.length);
          res.status(200).send(result);
      }catch (err) {
          console.log('Erro: ' + err);
          res.status(500).send('Erro ao obter dados.');
      }
  });


// Iniciar o servidor
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});