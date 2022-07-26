const isClient = (req, res, next) => {
  next();
};

export default isClient;
