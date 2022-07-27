const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const isAdmin = require('../middlewares/isAdmin');
const csrfProtection = require('../middlewares/csrfProtection');
const {
  register,
  login,
  logout,
  updateUser,
  getUsers,
  verify,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', isLoggedIn, isAdmin, csrfProtection, register);

router.post('/login', isNotLoggedIn, login);

router.post('/logout', isLoggedIn, logout);

router.patch('/:id', isLoggedIn, isAdmin, csrfProtection, updateUser);

router.get('', isLoggedIn, isAdmin, getUsers);

router.get('/verify', isLoggedIn, verify);

module.exports = router;
