const { INTEGER, STRING, ENUM, DECIMAL } = require('sequelize');
const { connection } = require('../database/connection');


const Medicamento = connection.define("medicamento", {
    usuario_id: {
        type: INTEGER,
        foreignKey: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Usuário não se pode deixar vazio",
            },
        },
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
        validate: {
            notNull: {
                msg: "Depósito não se pode deixar vazio",
            },
        },
        references: {
            model: {
                tableName: 'depositos',
            },
            key: 'id'
        },
    },
    nome_medicamento: {
        type:STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nome do Medicamento não se pode deixar vazio",
            },
        },
    },
    nome_laboratorio: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Nome do Laboratório não se pode deixar vazio",
            },
        },
    },
    descricao_medicamento: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Descrição do Medicamento não se pode deixar vazio",
            },
        },
    },
    dosagem_medicamento: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Dosagem do Medicamento não se pode deixar vazio",
            },
        },
    },
    unidade_dosagem: {
        type: ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Unidade de Dosagem não se pode deixar vazio",
            },
        },
    },
    tipo_medicamento: {
        type: ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Tipo de Medicamento não se pode deixar vazio",
            },
        },
    },
    status: {
        type: ENUM ('Ativo', 'Inativo'),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Status não se pode deixar vazio",
            },
        },
    },
    preco_unitario: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Preço Unitário não se pode deixar vazio",
            },
        },
    },
    quantidade: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Quantidade não se pode deixar vazio",
            },
        },
    },
    data_validade: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Data de Validade não se pode deixar vazio",
            },
        },
    },
}, {
    underscored: true,
    paranoid: true,
    timestamps: true,
});


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