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
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deposito_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosagem_medicamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_dosagem: {
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
      },
      tipo_medicamento: {
        type: Sequelize.ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
    return Promise.all([
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_medicamentos_tipo_medicamento";'
      ),
    ]);
  }

};
