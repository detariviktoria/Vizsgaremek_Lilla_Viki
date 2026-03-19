const { validationResult } = require('express-validator');

/**
 * express-validator eredmények egységes kezelése.
 * Megtartjuk az { errors: [...] } formátumot, mert a frontend ezt várja.
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    error: 'ValidationError',
    message: 'Validációs hiba',
    errors: errors.array(),
  });
};

