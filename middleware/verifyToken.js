const InvalidApiToken = require("../errors/invalidApiToken.js");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = process.env.TOKEN;

  if (req.get("Authorization") !== token) {
    const error = new InvalidApiToken();

    res
        .status(error.statusCode)
        .send(error);
  }

  next();
}

exports.verifyToken = verifyToken