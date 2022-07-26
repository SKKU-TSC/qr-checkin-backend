const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', data: { users } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

const register = async (req, res) => {
  try {
    //이미 해당 유저가 있으면 에러를 반환
    const exUser = await User.findOne({
      where: { studentId: req.body.studentId },
    });
    if (exUser)
      res.status(400).json({ status: 'fail', message: 'existing user' });
    const hash = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      ...req.body,
      password: hash,
    });
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { studentId: req.params.id } });
    if (!user)
      res.status(404).json({ status: 'fail', message: 'user not found' });
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const updatedUser = await user.upsert(req.body);
    res.status(200).json({ status: 'success', data: { updatedUser } });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) return res.status(400).json({ status: 'fail', authError });
    if (!user)
      return res.status(400).json({ status: 'fail', message: info.message });
    req.login(user, (loginError) => {
      if (loginError)
        res.status(400).json({ status: 'fail', message: loginError });
      res.status(200).json({ status: 'success', message: 'Login Success' });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).json({ status: 'fail', message: err });
    res.status(200).json({ status: 'success', message: 'logout success' });
  });
};

module.exports = { getUsers, register, updateUser, login, logout };
