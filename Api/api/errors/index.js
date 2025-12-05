class DbError extends Error {
  constructor(message) {
    super(message);
    this.name = "DbError";
  }
}

class ValidationError extends Error {
  constructor(message, data = {}) {
    super(message);
    this.name = "ValidationError";
    this.data = data;
  }
}

module.exports = {
  DbError,
  ValidationError,
};
