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
        major2: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        major3: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          validate: {
            isin: [['client', 'admin']],
          },
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
