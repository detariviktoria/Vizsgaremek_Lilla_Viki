const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.cookies?.token;

  // Alternatíva: Authorization: Bearer <token>
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7);
  }

  if (!token) {
    return res.status(401).json({ message: 'Nincs bejelentkezve' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');
    req.user = decoded; // { id: user_id, username: name, role: 'admin'|'user', ... }
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.status(401).json({ message: 'Érvénytelen token' });
  }
};

const adminMiddleware = (req, res, next) => {
  const role = req.user?.role;
  if (!req.user || role !== 'admin') {
    return res.status(403).json({ message: 'Hozzáférés megtagadva: Admin jogosultság szükséges' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };