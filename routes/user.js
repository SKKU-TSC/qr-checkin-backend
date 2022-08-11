const express = require('express');
const { isLoggedIn } = require('./middlewares');
const isAdmin = require('../middlewares/isAdmin');
const {
  getUser,
  getUsers,
  updateUser,
  register,
  deleteUser,
} = require('../controllers/user');

const router = express.Router();

router.get('', isLoggedIn, isAdmin, getUsers);

router.get('/:id', isLoggedIn, getUser);

router.post('/register', isLoggedIn, isAdmin, register);

router.patch('/:id', isLoggedIn, isAdmin, updateUser);

router.delete('/:id', isLoggedIn, isAdmin, deleteUser);

module.exports = router;
