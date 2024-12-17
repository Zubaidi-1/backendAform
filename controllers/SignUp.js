const usersDb = require("../util/db");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const { validationResult } = require("express-validator");
exports.userSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm;
  const hashedPass = await bcrypt.hash(password, 12);
  console.log(hashedPass, "hashed");

  try {
    // Create and save the user
    const newUser = new user(null, email, hashedPass);
    await newUser.signUp();

    // Respond with success
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (err) {
    // Log and handle the error
    console.log(err);

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
