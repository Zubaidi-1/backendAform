const usersdb = require("../util/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  usersdb
    .execute("SELECT * FROM users WHERE emailusers = ?", [email])
    .then(([rows]) => {
      if (rows.length === 0) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = rows[0]; // Use the first result
      console.log(loadedUser, "loaded");

      return bcrypt.compare(password, loadedUser.passwordsusers);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.emailusers,
          id: loadedUser.idusers,
          role: loadedUser.role,
        },
        "Detroit@Axle@Mike2024",
        { expiresIn: "9h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser.idusers,
        message: "Login successful",
        email: email,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        res.status(err.statusCode || 500).json({ message: err.message });

        err.statusCode = 500;
      }
      next(err);
    });
};
