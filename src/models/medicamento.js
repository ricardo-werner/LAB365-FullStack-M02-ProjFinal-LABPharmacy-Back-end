const { INTEGER, STRING, ENUM, DECIMAL } = require('sequelize');
const { connection } = require('../database/connection');


const Medicamento = connection.define("medicamento", {
    usuario_id: {
        type: INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: {
                tableName: 'usuarios',
            },
            key: 'id'
        },
    },
    deposito_id: {
        type: INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: {
                tableName: 'depositos',
            },
            key: 'id'
        },
    },
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
        type: ENUM,
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

// Medicamento.associate = (models) => {
//     Medicamento.belongsToMany(models.Usuario, {
//         foreignKey: 'usuario_id',
//         allowNull: false,
//     });

//     Medicamento.hasMany(models.Deposito, {
//         foreignKey: 'deposito_id',
//         allowNull: false,
//     });
// }

module.exports = { Medicamento }