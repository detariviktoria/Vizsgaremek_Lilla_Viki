const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Elsőbbséget élvez az Authorization fejléc (fül-specifikus), utána jön a süti
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7);
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Nincs bejelentkezve' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-key-change-this-in-production');
    req.user = decoded; // { id: user_id, username: name, isAdmin: boolean }
    next();
  } catch (err) {
    // Csak akkor töröljük a sütit, ha volt süti, de érvénytelen
    if (req.cookies.token) {
      res.clearCookie('token');
    }
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