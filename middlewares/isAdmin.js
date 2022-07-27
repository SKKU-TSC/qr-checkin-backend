const isAdmin = async (req, res, next) => {
  try {
    const { dataValues } = await req.user;
    if (dataValues.role !== 'admin')
      res
        .status(403)
        .json({ status: 'fail', message: 'Normal user not allowed' });
    else next();
  } catch (error) {
    res.status(400).json({ status: 'fail', message: '응애' });
  }
};

module.exports = isAdmin;
