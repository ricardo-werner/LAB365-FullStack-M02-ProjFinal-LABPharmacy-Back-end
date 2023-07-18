const { STRING, DATE, ENUM } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
  nome: STRING,
  sobrenome: STRING,
  genero: STRING,
  dt_nascimento: DATE,

  cpf: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        args: [11],
        msg: "CPF deve conter 11 números",
      },
      isNumeric: {
        msg: "CPF deve conter apenas números",
      },
      notNull: {
        msg: "CPF não se pode deixar vazio",
      },
    },
    unique: {
      msg: { "msg": "CPF já existe.", "status": "409" },
    },
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
    defaultValue: 'ativo'
  },
}, { underscore: true, paranoid: true, timestamps: true });

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
