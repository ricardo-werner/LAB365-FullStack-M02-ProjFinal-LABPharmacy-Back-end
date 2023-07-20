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
      usuarioid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      depositoid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'depositos',
          key: 'id'
        }
      },
      nomemedicamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomelaboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricaomedicamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      medicamentodosagem: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      unidadedosagem: {
        type: Sequelize.ENUM,
        values: ['mg', 'mcg', 'g', 'mL', '%', 'Outro'],
        allowNull: false,
        defaultValue: 'mg'
      },
      tipomedicamento: {
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
      precounitario: {
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
