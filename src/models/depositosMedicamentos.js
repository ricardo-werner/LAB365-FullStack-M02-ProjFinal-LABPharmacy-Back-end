const { Sequelize } = require('sequelize');
const { INTEGER, DATE } = require('sequelize');
const { connection } = require('../database/connection');

const DepositosMedicamentos = connection.define("depositos_medicamentos", {
    deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'depositos'
            },
            key: 'id'
        },
    },
    medicamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'medicamentos'
            },
            key: 'id'
        },
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
},
    {
        underscored: true,
        paranoid: true,
        timestamps: true
    }
);

module.exports = DepositosMedicamentos;