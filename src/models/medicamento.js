const { INTEGER, STRING, ENUM, DECIMAL } = require('sequelize');
const { connection } = require('../database/connection');


const Medicamento = connection.define("medicamento", {
    usuario_id: INTEGER,
    deposito_id: INTEGER,
    nome_medicamento: STRING,
    nome_laboratorio: STRING,
    descricao_medicamento: STRING,
    dosagem_medicamento: DECIMAL(10, 2),
    unidade_dosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
    },
    tipo_medicamento: {
        type: ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM,
        values: ['ativo', 'inativo'],
        allowNull: false,
        defaultValue: 'ativo'
      },
    preco_unitario: {
        type: DECIMAL(10, 2),
        allowNull: false,
    },
    quantidade: INTEGER,

}, { underscored: true, paranoid: true, timestamps: true });

module.exports = { Medicamento }