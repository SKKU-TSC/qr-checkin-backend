exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      status: 'fail',
      message: '로그인 필요',
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      status: 'fail',
      message: '이미 로그인됨',
    });
  }
};
