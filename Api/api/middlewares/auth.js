const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Nincs bejelentkezve' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');
    req.user = decoded; // { id: user_id, username: name, isAdmin: boolean }
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Érvénytelen token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Hozzáférés megtagadva: Admin jogosultság szükséges' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };