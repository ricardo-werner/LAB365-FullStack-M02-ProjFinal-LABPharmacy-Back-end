const { INTEGER, STRING, TEXT, ENUM, DECIMAL } = require('sequelize');
const { connection } = require('../database/connection');

const Medicamento = connection.define("medicamento", {
    usuario_id: INTEGER,
    deposito_id: INTEGER,
    nome: STRING,
    laboratorio: STRING,
    descricao: TEXT,
    dosagem: INTEGER,
    unidade_dosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false
    },
    tipo: {
        type: ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false
    },
    preco_unitario: DECIMAL(10, 2),
    quantidade: INTEGER,
}, { underscored: true, paranoid: true, timestamps: true });

module.exports = { Medicamento }