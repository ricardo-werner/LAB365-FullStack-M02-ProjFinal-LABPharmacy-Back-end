const { INTEGER, STRING, DATE, ENUM } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
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
  contato: {
    type: STRING,
    allowNull: false
  },
  cep: {
    type: STRING,
    allowNull: false
  },
  endereco: {
    type: STRING,
    allowNull: false
  },
  bairro: {
    type: STRING,
    allowNull: false
  },
  cidade: {
    type: STRING,
    allowNull: false
  },
  estado: {
    type: STRING,
    allowNull: false
  },
  numero: {
    type: STRING,
    allowNull: false
  },
  complemento: {
    type: STRING,
    allowNull: true
  },
  latitude: {
    type: STRING,
    allowNull: true
  },
  longitude: {
    type: STRING,
    allowNull: true
  },
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
  created_at: {
    type: DATE,
    allowNull: false
  },
  updated_at: {
    type: DATE,
    allowNull: false
  },
  deleted_at: {
    type: DATE,
    allowNull: true
  },
}, { underscored: true, paranoid: true })

module.exports = { Deposito }