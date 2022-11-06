const { findOne } = require("../models/userModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createNewUser = catchAsync(async (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  await User.create(userData);

  res.status(201).json({
    status: "success",
  });
});
exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("You must provide an email and a password", 404));
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(new AppError("Wrong email or password, please try again", 404));
  await User.findByIdAndDelete(user._id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
