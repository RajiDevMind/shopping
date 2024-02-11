require("dotenv").config();

const errorHandler = (err, req, res, next) => {
  const statusCodes = res.statusCode ? res.statusCode : 500;
  res.status(statusCodes);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
