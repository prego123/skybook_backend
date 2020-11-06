exports.requiresAdmin = (req, res, next) => {
  if (req.user.role !== 0) {
    res.status(401).end();
  } else {
    next();
  }
};
