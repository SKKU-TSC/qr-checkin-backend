require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_Scanner',
    host: 'qrscanner.capccdljkfca.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_Scanner',
    host: 'qrscanner.capccdljkfca.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_scanner',
    host: 'qrscanner.capccdljkfca.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    logging: true, // seqeulize 실행시, console.log에 찍히지 않음
  },
};
