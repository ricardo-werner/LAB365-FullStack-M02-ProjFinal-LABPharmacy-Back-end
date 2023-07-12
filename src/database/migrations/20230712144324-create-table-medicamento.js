'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicamentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      depositoId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dosagem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidadeDosagem: {
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false,
      },
      precoUnitario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medicamentos');
  }
};
