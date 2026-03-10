const AppError = require("./AppError");

class ValidationError extends AppError
{
    constructor(message = "Validation error occured", options = {})
    {
        super(message, { statusCode: 400, ...options });
    }
}

module.exports = ValidationError;