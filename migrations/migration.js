//이것은 그저 모델을 업데이트하기 위한 파일일 뿐입니다.

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn('users', 'major2');
//     await queryInterface.removeColumn('users', 'major3');
//     await queryInterface.addColumn('users', 'degree', {
//       type: Sequelize.DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isIn: [['학사', '석사', '박사', 'admin']],
//       },
//     });
//   },

//   down: async (queryInterface, Sequelize) => {},
// };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'comment', {
      type: Sequelize.DataTypes.STRING,
      validate: {
        max: 15,
      },
    });
    await queryInterface.removeColumn('users', 'isCheckedIn');
  },
  down: async (queryInterface, Sequelize) => {},
};
