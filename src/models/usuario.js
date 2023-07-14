const { STRING, DATE, ENUM, BOOLEAN } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
  nome: STRING,
  sobrenome: STRING,
  genero: STRING,
  dt_nascimento: DATE,

  cpf: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  telefone: STRING,

  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "Email Inválido" }
    },
    unique: { msg: "Email já existe" }
  },
  senha: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 50],
        msg: "Senha precisa ter entre 8 a 50 char., sendo pelo menos 1 letra maiúscula, 1 minúscula e 1 número e 1 catacter especial"
      },
      //is: {
        //args: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$",
        //msg: "Senha muito fraca"
      //}
    }
  },
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
  created_at: DATE,
  updated_at: DATE,
  deleted_at: DATE,
}, { underscore: true, paranoid: true });

module.exports = { Usuario }
