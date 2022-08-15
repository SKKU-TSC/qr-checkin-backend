const passport = require('passport');

const login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) return res.status(400).json({ status: 'fail', authError });
    if (!user)
      return res.status(400).json({ status: 'fail', message: info.message });
    req.login(user, (loginError) => {
      if (loginError)
        res.status(400).json({ status: 'fail', message: loginError });
      else
        res.status(200).json({ status: 'success', message: 'Login Success' });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).json({ status: 'fail', message: err });
    res.status(200).json({ status: 'success', message: 'logout success' });
  });
};

const verify = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        studentId: req.user.dataValues.studentId,
        major: req.user.dataValues.major,
        name: req.user.dataValues.name,
        role: req.user.dataValues.role,
        degree: req.user.dataValues.degree,
        comment: req.user.dataValues.comment,
        isCheckedIn: req.user.dataValues.isCheckedIn,
      },
    });
  } catch (error) {
    res.status(401).json({ status: 'fail', message: "User isn't logged in." });
  }
};

module.exports = {
  login,
  logout,
  verify,
};
