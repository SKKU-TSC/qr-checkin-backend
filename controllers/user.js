const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['degree'], ['studentId']],
    });
    res.status(200).json({ status: 'success', data: { users } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { studentId: req.params.id },
    });
    res.status(200).json({ status: 'success', data: { user } });
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
    console.log('trying to update user');
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

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: { studentId: req.params.id },
    });
    res.status(200).json({ status: 'success', message: 'deletion succeeded' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

module.exports = {
  getUser,
  getUsers,
  register,
  updateUser,
  deleteUser,
};
