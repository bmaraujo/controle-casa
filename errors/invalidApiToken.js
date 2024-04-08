const http_status = require('http-status-codes');
const StatusCodes = http_status.StatusCodes;

const BaseError = require("./base.js");

class InvalidApiToken extends BaseError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message = "Invalid API token.", errorCode = "INVALID_API_TOKEN") {
    super(message, errorCode);
  }
}

module.exports =  InvalidApiToken;