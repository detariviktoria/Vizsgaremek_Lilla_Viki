const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Nincs admin jogosultsága ehhez a művelethez!' });
  }
  next();
};

module.exports = adminMiddleware;
