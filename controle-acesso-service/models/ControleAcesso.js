const mongoose = require('mongoose');

const controleAcessoSchema = new mongoose.Schema({
  
  matricula: {
    type: Number,
    required: function () {
      return this.lotacao === 'técnico' || this.lotacao === 'professor';
    },
  },
  numeroSalaAcesso: {
    type: Number,
    required: true,
  },
},
{ collection: 'Acessos' }

);

const ControleAcesso = mongoose.model('ControleAcesso', controleAcessoSchema);

module.exports = ControleAcesso;