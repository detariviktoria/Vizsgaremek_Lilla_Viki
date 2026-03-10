const { AppError } = require("../errors");

module.exports = (err, req, res, next) => {
<<<<<<< Updated upstream
  const isOperational = err instanceof AppError;
  const statusCode = isOperational ? err.statusCode : 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    console.error(err?.message || err);
  }

  res.status(statusCode).json({
    error: isOperational ? 'RequestError' : 'InternalServerError',
    message: err?.message || 'Valami hiba történt!',
    details: isOperational ? err.details : undefined,
    data: isOperational ? err.data : undefined,
    stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack,
=======
  console.error(err.stack);

  // Ha saját AppError típusunk van
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name || "AppError",
      message: err.message,
      details: err.details,
      data: err.data,
    });
  }

  // Sequelize specifikus hibák kezelése
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      error: "ValidationError",
      message: "Adatbázis validációs hiba",
      errors: err.errors.map((e) => ({ message: e.message, path: e.path })),
    });
  }

  // Alapértelmezett 500-as hiba
  res.status(500).json({
    error: "InternalServerError",
    message: process.env.NODE_ENV === "production" ? "Valami hiba történt a szerveren!" : err.message,
>>>>>>> Stashed changes
  });
};
