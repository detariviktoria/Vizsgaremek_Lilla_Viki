const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Nincs bejelentkezve' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');
    req.user = decoded; // { id: user_id, username: name }
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Érvénytelen token' });
  }
};

module.exports = authMiddleware;