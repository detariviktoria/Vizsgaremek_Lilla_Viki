const { AppError } = require("../errors");

module.exports = (err, req, res, next) => {
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
  });
};
