const express = require('express');
const cors = require('cors');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const isAdmin = require('../middlewares/isAdmin');
const {
  register,
  login,
  logout,
  updateUser,
  getUsers,
  verify,
  resetCheckinOne,
  resetCheckinAll,
} = require('../controllers/auth');

const corsOptions = {
  origin: 'http://localhost:3000',
};
const router = express.Router();

router.post('/register', cors(corsOptions), isLoggedIn, isAdmin, register);

router.post('/login', cors(corsOptions), isNotLoggedIn, login);

router.post('/logout', cors(corsOptions), isLoggedIn, logout);

router.patch(
  '/checkin',
  cors(corsOptions),
  isLoggedIn,
  isAdmin,
  resetCheckinAll
);

router.patch('/:id', cors(corsOptions), isLoggedIn, isAdmin, updateUser);

router.get('', cors(corsOptions), isLoggedIn, isAdmin, getUsers);

router.get('/verify', cors(corsOptions), isLoggedIn, verify);

router.patch(
  '/checkin/:id',
  cors(corsOptions),
  isLoggedIn,
  isAdmin,
  resetCheckinOne
);

module.exports = router;
