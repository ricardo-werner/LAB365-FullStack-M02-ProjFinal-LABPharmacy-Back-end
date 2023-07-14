const { INTEGER, STRING, TEXT, ENUM, DATE } = require('sequelize');
const { connection } = require('../database/connection');

const Medicamento = connection.define("medicamento", {
    usuario_id: INTEGER,
    deposito_id: INTEGER,
    nome: STRING,
    laboratorio: STRING,
    descricao: TEXT,
    dosagem: INTEGER,
    unidadeDosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false
    },
    tipo: {
        type: ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false
    },
    precoUnitario: INTEGER,
    quantidade: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    deleted_at: DATE,
}, { underscored: true, paranoid: true });

module.exports = { Medicamento }