const express = require("express");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const reateLimit = require("express-rate-limit");
const mainRouter = require("./routers/mainRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();
// GLOBAL MIDDLEWARE

// Set security http headers
app.use(helmet());
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);
// Limit request fro the same IP
const limiter = reateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "To many request from this ip please try in an hour again.",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query infections
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));

// Serving static files
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1", mainRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(`Cant find ${req.originalUrl} on this server!`, 404);
  next(err);
});

// Error handling middleware
app.use(globalErrorHandler);
module.exports = app;
