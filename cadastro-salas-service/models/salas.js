const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  NumeroSala: {
    type: Number,
    required: true,
  },
  IdPredio: {
    type: Number,
    required: true, 
  },

  },
  { collection: 'Salas' }
);

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;
