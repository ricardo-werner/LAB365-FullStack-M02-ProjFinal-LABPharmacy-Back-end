const { INTEGER, STRING, DATE, ENUM, BOOLEAN } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: STRING,
        allowNull: false
      },
      sobrenome: {
        type: STRING,
        allowNull: false
      },
      genero: {
        type: STRING,
        allowNull: true      
      },
      dt_nascimento: {
        type: DATE,
        allowNull: false
      },
      have_special_needs: {
        type: BOOLEAN
      },
      cpf: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      telefone: {
        type: STRING,
        allowNull: true
      },
      email: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "Email Invalido" }
        },
        unique: { msg: "Email já existe" }
      },
      senha: {
        type: STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 50],
                msg: "Senha precisa ter entre 8 a 50 char., sendo pelo menos 1 letra maiúscula, 1 minúscula e 1 número e 1 catacter especial"
            },
            is: {
                args: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$",
                msg: "Senha muito fraca"
            }
        }
      },
      status: {
        type: ENUM,
        values: ['ativo', 'inativo'],
        allowNull: false,
        defaultValue: 'ativo'
      },
      created_at: {
        type: DATE,
        allowNull: false
      },
      updated_at: {
        type: DATE,
        allowNull: false
      },
      deleted_at: {
        type: DATE,
        allowNull: true
      },
  }, { underscore: true, paranoid: true });

module.exports = { Usuario }
