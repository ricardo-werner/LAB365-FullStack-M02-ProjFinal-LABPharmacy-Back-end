const { INTEGER, STRING, ENUM } = require('sequelize');
const { connection } = require('../database/connection');

const Deposito = connection.define("deposito", {
  usuario_id: {
    type: INTEGER,
    allowNull: false,
    foreignKey: true
  },
  medicamento_id: {
    type: INTEGER,
    allowNull: false
  },
  razao_social: {
    type: STRING,
    allowNull: false,
    unique: true
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
    unique: true
  },
  contato: STRING,
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "Email Inválido" }
    },
    unique: { msg: "Email já existe" }
  },
  telefone: STRING,
  celular: STRING,
  cep: STRING,
  endereco: STRING,
  numero: STRING,
  bairro: STRING,
  cidade: STRING,
  estado: STRING,
  complemento: STRING,
  latitude: STRING,
  longitude: STRING,
  status: {
    type: ENUM,
    values: ['ativo', 'inativo'],
    allowNull: false,
    defaultValue: 'ativo'
  },
}, { underscored: true, paranoid: true, timestamps: true })

Deposito.associate = (models) => {
  Deposito.hasMany(models.Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
  });
  Deposito.hasMany(models.Medicamento, {
    foreignKey: 'deposito_id',
    as: 'medicamentos'
  });
}


module.exports = { Deposito }