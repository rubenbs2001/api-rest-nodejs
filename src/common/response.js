const createError = require("http-errors");

module.exports.Response = {
  success: (res, satus = 200, message = "OK", body = {}) => {
    res.status(satus).json({
      message,
      body,
    });
  },
  error: (res, error = null) => {
    const { statusCode, message } = error
      ? error
      : new createError.InternalServerError();
    res.status(statusCode).json({
      message,
    });
  },
};
