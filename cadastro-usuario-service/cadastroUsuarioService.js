const express = require('express');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuarios');
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

// Rota para cadastrar um novo usuário
app.post('/Usuarios', async (req, res, next) => {
    try {
      const novoUsuario = new Usuario({
        nome: req.body.nome,
        tipoUsuario: req.body.tipoUsuario,
        codigoCurso: req.body.codigoCurso,
        setorLotacao: req.body.setorLotacao,
        matricula: req.body.matricula
      });
  
      await novoUsuario.save();
      console.log('Usuário cadastrado com sucesso!');
      res.status(200).send('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.log('Error: ' + err);
      res.status(500).send('Erro ao cadastrar usuário.');
    }
  });
  
// Rota para obter todos os usuários
app.get('/Usuarios', async (req, res, next) => {
try {
    const result = await Usuario.find({});
        console.log('Total de usuários na base de dados: ' + result.length);
        res.status(200).send(result);
    }catch (err) {
        console.log('Erro: ' + err);
        res.status(500).send('Erro ao obter dados.');
    }
});

// Rota para obter um usuário com base na matrícula
app.get('/Usuarios/matricula/:matricula', async (req, res, next) => {
try {
    const result = await Usuario.findOne({ matricula: req.params.matricula });
    if (result == null) {
        console.log('Usuário não encontrado.');
        res.status(404).send('Usuário não encontrado.');
    } else {
        res.status(200).send(result);
    }
    }catch (err) {
        console.log('Erro: ' + err);
        res.status(500).send('Erro ao obter dados.');
    }
});




// Rota para buscar usuários pela lotação
app.get('/Usuarios/lotacao/:lotacao', async (req, res) => {
    try {
      const usuarios = await Usuario.find({ setorLotacao: req.params.lotacao });
      res.status(200).json(usuarios);
    } catch (err) {
      console.log('Erro: ' + err);
      res.status(500).send('Erro ao obter dados.');
    }
  });
  
// Rota para excluir usuário com base na matrícula
app.delete('/Usuarios/matricula/:matricula', async (req, res) => {
try {
    const result = await Usuario.deleteOne({ matricula: req.params.matricula });
    if (result.deletedCount === 0) {
    console.log('Usuário não encontrado.');
    res.status(404).send('Usuário não encontrado.');
    } else {
    console.log('Usuário excluído com sucesso!');
    res.status(200).send('Usuário excluído com sucesso!');
    }
} catch (err) {
    console.log('Erro: ' + err);
    res.status(500).send('Erro ao excluir usuário.');
}
});

app.put('/Usuarios/matricula/:matricula', async (req, res) => {
    try {
      const result = await Usuario.updateOne(
        { matricula: req.params.matricula },
        req.body
      );
      if (result.nModified === 0) {
        console.log('Usuário não encontrado ou nenhum dado foi modificado.');
        res.status(404).send('Usuário não encontrado ou nenhum dado foi modificado.');
      } else {
        console.log('Usuário atualizado com sucesso!');
        res.status(200).send('Usuário atualizado com sucesso!');
      }
    } catch (err) {
      console.log('Erro: ' + err);
      res.status(500).send('Erro ao atualizar usuário.');
    }
});
  
// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});