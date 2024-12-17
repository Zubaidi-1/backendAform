const express = require("express");
const signUpController = require("../controllers/SignUp");
const { body } = require("express-validator");
const usersDb = require("../util/db");
const router = express.Router();
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value) => {
        const [rows] = await usersDb.execute(
          "SELECT * FROM users WHERE emailusers = ?",
          [value]
        );
        if (rows.length > 0) {
          throw new Error("Email already registered");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  signUpController.userSignUp
);

module.exports = router;
