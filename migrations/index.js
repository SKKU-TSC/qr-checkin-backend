module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'major2');
    await queryInterface.removeColumn('users', 'major3');
    await queryInterface.addColumn('users', 'degree', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['학사', '석사', '박사', 'admin']],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
