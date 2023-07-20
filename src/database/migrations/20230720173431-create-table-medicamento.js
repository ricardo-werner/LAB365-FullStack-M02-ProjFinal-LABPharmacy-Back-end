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
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      depositoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'depositos',
          key: 'id'
        }
      },
      medicamentoNome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      laboratorioNome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medicamentoDescricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medicamentoDosagem: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unidadeDosagem: {
        type: Sequelize.ENUM,
        values: ['mg', 'mcg', 'g', 'mL', '%', 'Outro'],
        allowNull: false,
        defaultValue: 'mg'
      },
      medicamentoTipo: {
        type: Sequelize.ENUM,
        values: ['Medicamento Controlado', 'Medicamento Não Controlado'],
        allowNull: false,
        defaultValue: 'Medicamento Não Controlado'
      },
      status: {
        type: Sequelize.ENUM,
        values: ['disponivel', 'indisponivel'],
        allowNull: false,
        defaultValue: 'disponivel'
      },
      precoUnitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
