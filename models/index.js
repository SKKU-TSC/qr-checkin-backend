const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

//config.json의 development import
const config = require('../config/config')[env];

const db = {};

// models
const User = require('./user');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
