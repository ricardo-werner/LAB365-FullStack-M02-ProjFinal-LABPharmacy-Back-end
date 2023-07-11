const { INTEGER, STRING, DATE } = require('sequelize')
const { connection } = require('../database/connection')


const Usuario = connection.define("usuario", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING
    },
    lastName: {
        type: STRING
    },
    gender: {
        type: STRING
    },
    birth_day: {
        type: DATE
    },
    cpf: {
        type: STRING,
    },
    primary_phone_contact: {
        type: STRING
    },
    email: {
        type: STRING,
        validate:{
            isEmail: {msg: "Email Invalido"}
        },
        unique: {msg: "Email já existe"}
    },
    password: {
        type: STRING,
        validate:{
            len:{args:[8,50], 
                msg: "Senha precisa ter entre 8 a 50 char., sendo pelo menos 1 letra maiúscula, 1 minúscula e 1 número e 1 catacter especial"},
            is: {args: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$",
            msg: "Senha muito fraca"}
        }
    },
    have_special_needs: {
        type: STRING
    },
    status: {
        type: STRING,
        defaultValue: "Ativo"
    },
    createdAt: DATE,
    updatedAt: DATE
})

module.exports = { Usuario}
