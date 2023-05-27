const mongoose = require('mongoose');

const registroAcessoSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true
  },
  numeroSala: {
    type: String,
    required: true
  },
  dataHora: {
    type: String,
    required: true
  },
},
{collection: 'LogAcesso'}
);

const RegistroAcesso = mongoose.model('RegistroAcesso', registroAcessoSchema);

module.exports = RegistroAcesso;
