const { Sequelize } = require('sequelize');
const { INTEGER, STRING, ENUM, FLOAT } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  usuarioid: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    validate: {
      notNull: {
        message: "Usuário_id não se pode deixar vazio",
      },
    },
    razaosocial: {
      type: STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Razão Social não se pode deixar vazio",
        },
      },
    },
    cnpj: {
      type: STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "CNPJ não se pode deixar vazio",
        },
        len: {
          args:
            [14, 14],
          message: "CNPJ deve conter 14 números",
        },
      },
      isNumeric: {
        message: "CNPJ deve conter apenas números",
      },
      unique: {
        message: {
          "msg": "CNPJ já existe.", "status": "409"
        },
      },
      nomefantasia: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Nome Fantasia não se pode deixar vazio",
          },
        },
      },
      email: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Email não se pode deixar vazio",
          },
          isEmail: {
            message: "Email inválido",
          },
        },
        unique: {
          message: {
            "msg": "Email já existe.", "status": "409"
          }
        }
      },
      telefone: {
        type: STRING,
        allowNull: true,
      },
      celular: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Celular não se pode deixar vazio",
          },
        },
      },
      cep: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "CEP não se pode deixar vazio",
          },
        },
      },
      endereco: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Endereço não se pode deixar vazio",
          },
        },
      },
      numero: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Número não se pode deixar vazio",
          },
        },
      },
      complemento: {
        type: STRING,
        allowNull: true,
      },
      bairro: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Bairro não se pode deixar vazio",
          },
        },
      },
      cidade: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Cidade não se pode deixar vazio",
          },
        },
      },
      estado: {
        type: STRING,
        allowNull: false,
        validate: {
          notNull: {
            message: "Estado não se pode deixar vazio",
          },
        },
      },
      latitude: {
        type: FLOAT,
        allowNull: true,
      },
      longitude: {
        type: FLOAT,
        allowNull: true,
      },
      status: {
        type: ENUM,
        values: ['ativo', 'inativo'],
        allowNull: false,
        defaultValue: 'ativo',
        validate: {
          notNull: {
            message: "Status não se pode deixar vazio",
          },
        }
      }
    }
  }
},
  {
    underscored: true,
    paranoid: true,
    timestamps: true
  }
);




// Deposito.associate = (models) => {
//   Deposito.hasMany(models.Usuario, {
//     foreignKey: 'usuario_id',
//     as: 'usuario'
//   });
//   Deposito.hasMany(models.Medicamento, {
//     foreignKey: 'deposito_id',
//     as: 'medicamentos'
//   });
// }


module.exports = { Deposito }