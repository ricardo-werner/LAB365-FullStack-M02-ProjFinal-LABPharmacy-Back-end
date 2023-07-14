const { STRING, DATE, ENUM, BOOLEAN } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
  nome: STRING,
  sobrenome: STRING,
  genero: STRING,
  dt_nascimento: DATE,
  pessoa_com_deficiencia: BOOLEAN,

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
  senha: STRING,
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
}, { underscore: true, paranoid: true, timestamps: true });

module.exports = { Usuario }
