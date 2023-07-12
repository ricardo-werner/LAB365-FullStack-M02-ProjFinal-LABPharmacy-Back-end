const { INTEGER, STRING, TEXT, ENUM, DATE } = require('sequelize');
const { connection } = require('../database/connection');

const Medicamento = connection.define("medicamento", {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: STRING,
        allowNull: false
    },
    deposito_id: {
        type: STRING,
        allowNull: false
    },
    nome: {
        type: STRING,
        allowNull: false
    },
    laboratorio: {
        type: STRING,
        allowNull: false
    },
    descricao: {
        type: TEXT,
        allowNull: true
    },
    dosagem: {
        type: INTEGER,
        allowNull: false
    },
    unidadeDosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false
    },
    tipo: {
        type: ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false
    },
    precoUnitario: {
        type: INTEGER,
        allowNull: false
    },
    quantidade: {
        type: INTEGER,
        allowNull: false
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
}, { underscored: true, paranoid: true });

module.exports = { Medicamento }