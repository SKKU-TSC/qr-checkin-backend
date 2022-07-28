const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        studentId: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          //비밀번호
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        major: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['client', 'admin']],
          },
        },
        degree: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['학사', '석사', '박사', 'admin']],
          },
        },
        isCheckedIn: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          default: false,
        },
      },
      {
        sequelize,
        timestamps: true, // true - createdAt,updatedAt 자동 생성
        underscored: false, //true - created_at
        paranoid: false, //true - createdAt, updatedAt, deletedAt
        //javascript
        modelName: 'User',
        //sql
        tableName: 'users', //sequelize table명 - modelName을 소문자화한 후, 복수형
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
}

module.exports = User;
