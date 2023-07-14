const { INTEGER, STRING, DATE, ENUM } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  usuario_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: {
          tablename: 'usuario',
      },
      key: 'id'
  },
  },
  distribuidor_name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  cnpj: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  contato: STRING,
  cep: STRING,
  endereco: STRING,
  bairro: STRING,
  cidade: STRING,
  estado: STRING,
  numero: STRING,
  complemento: STRING,
  latitude: STRING,
  longitude: STRING,
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
  created_at: DATE,
  updated_at: DATE,
  deleted_at: DATE,
}, { underscored: true, paranoid: true })

module.exports = { Deposito }