require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_Scanner',
    host: process.env.AMAZON_HOST,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_Scanner',
    host: process.env.AMAZON_HOST,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'QR_Scanner',
    host: process.env.AMAZON_HOST,
    dialect: 'mysql',
    logging: true, // seqeulize 실행시, console.log에 찍히지 않음
  },
};
