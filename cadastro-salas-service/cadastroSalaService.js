const express = require('express');
const bodyParser = require('body-parser');
const Sala = require('./models/salas');
const mongoose = require('mongoose');

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

// Rota para cadastrar uma nova sala
app.post('/Salas', async (req, res) => {
  try {
    const novaSala = new Sala(req.body);

    await novaSala.save();
    console.log('Sala cadastrada com sucesso!');
    res.status(200).send('Sala cadastrada com sucesso!');
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao cadastrar sala.');
  }
});

// Rota para obter todas as salas
app.get('/Salas', async (req, res) => {
  try {
    const result = await Sala.find({});
    console.log('Total de salas na base de dados: ' + result.length);
    res.status(200).send(result);
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao obter dados.');
  }
});

// Rota para obter uma sala com base no número da sala
app.get('/Salas/:numeroSala', async (req, res) => {
  try {
    const result = await Sala.findOne({ NumeroSala: req.params.numeroSala });
    if (result == null) {
      console.log('Sala não encontrada.');
      res.status(404).send('Sala não encontrada.');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao obter dados.');
  }
});

// Rota para atualizar uma sala com base no número da sala
app.put('/Salas/:numeroSala', async (req, res) => {
  try {
    const result = await Sala.updateOne(
      { NumeroSala: req.params.numeroSala },
      req.body
    );
    if (result.nModified === 0) {
      console.log('Sala não encontrada ou nenhum dado foi modificado.');
      res.status(404).send('Sala não encontrada ou nenhum dado foi modificado.');
    } else {
      console.log('Sala atualizada com sucesso!');
      res.status(200).send('Sala atualizada com sucesso!');
    }
  } catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao atualizar sala.');
  }
});

// Rota para excluir uma sala com base no número da sala
app.delete('/Salas/:numeroSala', async (req, res) => {
  try {
    const result = await Sala.deleteOne({ NumeroSala: req.params.numeroSala });
    if (result.deletedCount === 0) {
        console.log('Sala não encontrada.');
        res.status(404).send('Sala não encontrada.');
      } else {
        console.log('Sala excluída com sucesso!');
        res.status(200).send('Sala excluída com sucesso!');
      }
    } catch (err) {
      console.log('Erro: ' + err);
      res.status(500).send('Erro ao excluir sala.');
    }
});

// Iniciar o servidor
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
