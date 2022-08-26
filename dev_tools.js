require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize } = require('./models');
const User = require('./models/user');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const serializeUsers = () => {
  try {
    User.findAll().then((users) => {
      users.forEach(async (user) => {
        if (user.password.length < 7) {
          //아직 암호화 안된 것만
          user.password = await bcrypt.hash(user.password, 12);
          user.save();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const fillZeros = () => {
  try {
    User.findAll().then((users) =>
      users.forEach(async (user) => {
        if (user.password.length < 6 && user.role === 'client') {
          user.password = user.password.padStart(6, '0');
          user.save();
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
};

const ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const findOutEnglishUsernames = () => {
  try {
    const englishNames = [];
    User.findAll()
      .then((users) =>
        users.forEach((user) => {
          if (ENGLISH.indexOf(user.name[0]) >= 0) {
            englishNames.push(user.name);
          }
        })
      )
      .then(() => {
        console.log(englishNames);
        console.log(`영어이름 개수: ${englishNames.length}`);
      });
  } catch (error) {
    console.log(error);
  }
};

serializeUsers();
