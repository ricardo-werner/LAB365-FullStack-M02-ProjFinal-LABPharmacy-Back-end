'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('depositos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      usuarioid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
      },
      razaosocial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomefantasia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ativo', 'inativo'],
        allowNull: false,
        defaultValue: 'ativo'
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('depositos');
  }
};

