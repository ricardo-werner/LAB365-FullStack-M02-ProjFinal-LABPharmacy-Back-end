const { INTEGER, STRING, ENUM } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  usuario_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'usuarios',
      },
      key: 'id'
    },
    allowNull: true
  },
  razao_social: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  cnpj: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  nome_fantasia: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  contato: STRING,
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "Email Inválido" }
    },
    unique: { msg: "Email já existe" }
  },
  telefone: STRING,
  celular: STRING,
  cep: STRING,
  endereco: STRING,
  numero: STRING,
  bairro: STRING,
  cidade: STRING,
  estado: STRING,
  complemento: STRING,
  latitude: STRING,
  longitude: STRING,
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
}, { underscored: true, paranoid: true, timestamps: true })

module.exports = { Deposito }