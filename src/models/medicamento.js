const { INTEGER, STRING, ENUM, DECIMAL } = require('sequelize');
const { connection } = require('../database/connection');
const { Usuario } = require('./usuario');
const { Deposito } = require('./deposito');
const { DepositosMedicamentos } = require('./depositosMedicamentos');


const Medicamento = connection.define("medicamento", {
    usuario_id: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'usuarios',
                key: 'id'
            }
        },
        notNull: {
            message: "Usuário não se pode deixar vazio",
        },
    },
    deposito_id: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: 'depositos',
                key: 'id'
            }
        },
        notNull: {
            message: "Depósito não se pode deixar vazio",
        },
    },
    medicamento_nome: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: "Nome do Medicamento não se pode deixar vazio",
            },
        },
    },
    laboratorio_nome: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: "Nome do Laboratório não se pode deixar vazio",
            },
        },
    },
    medicamento_descricao: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: "Descrição do Medicamento não se pode deixar vazio",
            },
        },
    },
    medicamento_dosagem: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                message: "Dosagem do Medicamento não se pode deixar vazio",
            },
        },
    },
    unidade_dosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
        defaultValue: 'mg',
        validate: {
            notNull: {
                message: "Unidade de Dosagem não se pode deixar vazio",
            },
        },
    },
    medicamento_tipo: {
        type: ENUM('Controlado', 'Não Controlado'),
        allowNull: false,
        validate: {
            notNull: {
                message: "Tipo de Medicamento não se pode deixar vazio",
            },
        },
    },
    status: {
        type: ENUM,
        values: ['disponivel', 'indisponivel'],
        allowNull: false,
        defaultValue: 'disponivel',
        validate: {
            notNull: {
                message: "Status não se pode deixar vazio",
            },
        },
    },
    preco_unitario: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                message: "Preço Unitário não se pode deixar vazio",
            },
        },
    },
    quantidade: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                message: "Quantidade não se pode deixar vazio",
            },
        },
    },
},
    {
        underscored: true,
        paranoid: true,
        timestamps: true,
    }
);

Medicamento.belongsToMany(Deposito, { through: 'DepositosMedicamentos' });
Deposito.belongsToMany(Medicamento, { through: 'DepositosMedicamentos' });

Usuario.hasMany(Medicamento)

module.exports = { Medicamento }