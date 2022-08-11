const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { login, logout, verify } = require('../controllers/auth');

const router = express.Router();

router.get('/verify', verify);

router.post('/login', login);

router.post('/logout', isLoggedIn, logout);

module.exports = router;
