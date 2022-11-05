const User = require("../models/userModel");
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
