'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
      },
      deposito_id: {
        type: Sequelize.INTEGER,
      },
      nome_medicamento: {
        type: Sequelize.STRING,
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
      },
      descricao_medicamento: {
        type: Sequelize.STRING,
      },
      dosagem_medicamento: {
        type: Sequelize.DECIMAL(10, 2),
      },
      unidade_dosagem: {
        type: Sequelize.ENUM,
        values: ['mg', 'mcg', 'g', 'mL', '%', 'Outro'],
        allowNull: false,
        defaultValue: 'mg'
      },
      tipo_medicamento: {
        type: Sequelize.ENUM,
        values: ['Medicamento Controlado', 'Medicamento Não Controlado'],
        allowNull: false,
        defaultValue: 'Medicamento Não Controlado'
      },
      status: {
        type: Sequelize.ENUM,
        values: ['ativo', 'inativo'],
        allowNull: false,
        defaultValue: 'ativo'
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
      },
      quantidade: {
        type: Sequelize.INTEGER,
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
