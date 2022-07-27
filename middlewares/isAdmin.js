const isAdmin = async (req, res, next) => {
  try {
    const { dataValues } = await req.user;
    if (dataValues.role !== 'admin')
      res
        .status(403)
        .json({ status: 'fail', message: 'Normal user not allowed' });
    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

module.exports = isAdmin;
