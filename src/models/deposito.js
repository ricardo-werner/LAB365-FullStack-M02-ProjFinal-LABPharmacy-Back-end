const { INTEGER, STRING, ENUM } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  usuario_id: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true
  },
  razao_social: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Razão Social não se pode deixar vazio",
      },
    },
  },
  cnpj: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        args: [14],
        msg: "CNPJ deve conter 14 números",
      },
      isNumeric: {
        msg: "CNPJ deve conter apenas números",
      },
      notNull: {
        msg: "CNPJ não se pode deixar vazio",
      },
      unique: {
        msg: { "msg": "CNPJ já existe.", "status": "409" },
      }
    },
  },
  nome_fantasia: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Nome Fantasia não se pode deixar vazio",
      },
    },
  },
  contato: {
    type: STRING,
    allowNull: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Email não se pode deixar vazio",
      },
      isEmail: { msg: "Email Inválido" }
    },
    unique: {
      message: {
        "msg": "Email já existe.", "status": "409"
      },
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
        msg: "Celular não se pode deixar vazio",
      },
    },
  },
  cep: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CEP não se pode deixar vazio",
      },
    },
  },
  endereco: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Endereço não se pode deixar vazio",
      },
    },
  },
  numero: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Número não se pode deixar vazio",
      },
    },
  },
  bairro: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Bairro não se pode deixar vazio",
      },
    },
  },
  cidade: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cidade não se pode deixar vazio",
      },
    },
  },

  estado: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Estado não se pode deixar vazio",
      },
    },
  },
  complemento: {
    type: STRING,
    allowNull: true,
  },
  latitude: {
    type: STRING,
    allowNull: true,
  },
  longitude: {
    type: STRING,
    allowNull: true,
  },
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo',
    validate: {
      notNull: {
        msg: "Status não se pode deixar vazio",
      },
    },
  },
}, {
  underscored: true,
  paranoid: true,
  timestamps: true
});




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