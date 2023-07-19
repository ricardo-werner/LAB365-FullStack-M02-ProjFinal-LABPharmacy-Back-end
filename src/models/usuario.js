const { Sequelize } = require('sequelize')
const { STRING, DATE, ENUM } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
  nome: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Nome não se pode deixar vazio",
      },
    },
  },
  sobrenome: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Sobrenome não se pode deixar vazio",
      },
    },
  },
  genero: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Gênero não se pode deixar vazio",
      },
    },
  },
  dt_nascimento: {
    type: DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Data de Nascimento não se pode deixar vazio",
      },
    },
  },
  cpf: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CPF não se pode deixar vazio",
      },
      len: {
        args: [11],
        is: /^\d{11}$/,
        is: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        msg: "CPF deve conter 11 números",
      },
      isNumeric: {
        msg: "CPF deve conter apenas números",
      },
    },
    unique: true
  },

  telefone: STRING,

  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "Email Inválido" }
    },
    unique: { msg: "Email já existe" }
  },
  senha: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 20],
        msg: "Senha precisa ter no mímino 8 letras, sendo pelo menos 1 letra maiúscula, 1 minúscula e 1 caracter especial."
      },
      is: {
        args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
        msg: "Senha muito fraca."
      }
    }
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
})

// Usuario.associate = (models) => {
//   Usuario.hasMany(models.Medicamentos, {
//     foreignKey: "usuario_id",
//     allowNull: false,
//   });

//   Usuario.hasMany(models.Depositos, {
//     foreignKey: "usuario_id",
//     allowNull: false,
//   });
//};

module.exports = { Usuario }
