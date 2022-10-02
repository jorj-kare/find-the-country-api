const AppError = require("../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "production") {
    if (err.name === "ValidationError") err = new AppError(err.message, 400);
    if (err.name === "CastError")
      err = new AppError(`Invalid error path ${err.path}: ${err.value}.`, 400);
    if (err.code === 11000)
      err = new AppError(
        `Duplicate field value ${err.keyValue.username} please try another.`,
        400
      );
    if (err.name === "JsonWebTokenError")
      err = new AppError("Invalid Token please login again.", 401);

    if (err.name === "TokenExpiredError")
      err = new AppError("Your token has expire, please login again.", 401);

    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
};
