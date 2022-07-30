const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.studentId); //세션에 user id저장
  });

  passport.deserializeUser((studentId, done) => {
    User.findOne({ where: { studentId } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
