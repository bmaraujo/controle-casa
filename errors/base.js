const http_status = require('http-status-codes');
const StatusCodes = http_status.StatusCodes;

class BaseError extends Error {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  errorCode;

  constructor(message = "Something went wrong!", errorCode = "ERROR") {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }

  get errorResponse() {
    return {
      error: {
        code: this.errorCode,
        message: this.message,
      },
    };
  }
}

module.exports = BaseError;