const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const isAdmin = require('../middlewares/isAdmin');
const {
  register,
  login,
  logout,
  updateUser,
  getUsers,
  verify,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', isLoggedIn, isAdmin, register);

router.post('/login', isNotLoggedIn, login);

router.post('/logout', isLoggedIn, logout);

router.patch('/:id', isLoggedIn, isAdmin, updateUser);

router.get('', isLoggedIn, isAdmin, getUsers);

router.get('/verify', isLoggedIn, verify);

module.exports = router;
