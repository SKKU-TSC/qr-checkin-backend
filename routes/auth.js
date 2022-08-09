const express = require('express');
const { isLoggedIn } = require('./middlewares');
const isAdmin = require('../middlewares/isAdmin');
const {
  register,
  login,
  logout,
  updateUser,
  getUsers,
  getUser,
  verify,
  resetCheckinOne,
  resetCheckinAll,
} = require('../controllers/auth');

const router = express.Router();

router.post('/register', isLoggedIn, isAdmin, register);

router.post('/login', login);

router.post('/logout', isLoggedIn, logout);

router.patch(
  '/checkin',

  isLoggedIn,
  isAdmin,
  resetCheckinAll
);

router.patch('/:id', isLoggedIn, isAdmin, updateUser);

router.get('/verify', isLoggedIn, verify);

router.get('', isLoggedIn, isAdmin, getUsers);

router.get('/:id', isLoggedIn, isAdmin, getUser);

router.patch('/checkin/:id', isLoggedIn, isAdmin, resetCheckinOne);

module.exports = router;
