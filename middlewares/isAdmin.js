const User = require('../models/user');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user)
      res
        .status(404)
        .json({ status: 'fail', message: 'You are not even logged in' });
    if (user.role !== 'admin')
      res
        .status(403)
        .json({ status: 'fail', message: 'Normal user not allowed' });
    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

module.exports = isAdmin;
