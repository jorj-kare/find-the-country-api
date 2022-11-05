const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [5, "Password must contain at least five characters"],
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: (1)[(true, "Please confirm your password")],
    trim: true,
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.method.isPasswordCorrect = async function (
  providedPassword,
  hashedPassword
) {
  return await bcrypt.compare(providedPassword, hashedPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
