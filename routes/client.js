const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

module.exports = router;
