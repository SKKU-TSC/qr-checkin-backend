const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
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
    if (exUser) {
      res.status(400).json({ status: 'fail', message: 'existing user' });
      return;
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create(req.body);
    return res.status(200).json({ status: 'success', user });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.params.id === req.user.dataValues.studentId) {
      res
        .status(400)
        .json({ status: 'fail', message: "can't update yourself" });
      return;
    }
    const user = await User.findOne({ where: { studentId: req.params.id } });
    if (!user) {
      res.status(404).json({ status: 'fail', message: 'user not found' });
      return;
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const updatedUser = await User.update(req.body, {
      where: { studentId: req.params.id },
    });
    res.status(200).json({ status: 'success', updatedUser });
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
      else
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

const verify = (req, res) =>
  res
    .status(200)
    .json({ status: 'success', data: { role: req.user.dataValues.role } });

const resetCheckinOne = (req, res) => {
  const studentId = req.params.id;
  User.update({ isCheckedIn: false }, { where: { studentId: studentId } })
    .then((data) => res.status(200).json({ status: 'success', data: { data } }))
    .catch((err) =>
      res.status(400).json({ status: 'fail', error: err.message })
    );
};

const resetCheckinAll = (req, res) => {
  User.findAll()
    .then((users) =>
      users.forEach((user) => {
        user.set({ isCheckedIn: false });
        user.save();
      })
    )
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: '성공적으로 qrcheckin을 초기화했습니다.',
      })
    )
    .catch((err) =>
      res.status(400).json({ status: 'fail', error: err.message })
    );
};

module.exports = {
  getUsers,
  register,
  updateUser,
  login,
  logout,
  verify,
  resetCheckinOne,
  resetCheckinAll,
};
