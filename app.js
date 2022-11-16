const express = require("express");
const hpp = require("hpp");
const xss = require("xss-clean");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const reateLimit = require("express-rate-limit");
const mainRouter = require("./routers/mainRoutes");
const userRouter = require("./routers/userRoutes");
const viewRouter = require("./routers/viewRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// GLOBAL MIDDLEWARE
app.use(cookieParser());
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
app.use("/", viewRouter);
app.use("/api/v1", mainRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(`Cant find ${req.originalUrl} on this server!`, 404);
  next(err);
});

// Error handling middleware
app.use(globalErrorHandler);
module.exports = app;
