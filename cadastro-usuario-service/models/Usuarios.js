const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    tipoUsuario: {
      type: String,
      enum: ['estudante', 'técnico', 'professor'],
      required: true,
    },
    codigoCurso: {
      type: String,
      required: function () {
        return this.tipoUsuario === 'estudante';
      },
    },
    setorLotacao: {
      type: String,
      required: function () {
        return this.tipoUsuario !== 'estudante';
      },
    },
    matricula: {
      type: String,
      required: true,
    },
  },
  { collection: 'Usuarios' } // Especifica o nome da coleção como 'Usuarios'
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
