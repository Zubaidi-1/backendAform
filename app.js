const express = require("express");
const cors = require("cors");
const path = require("path");

const signUpRouter = require("./routes/SignUp.js");
const loginRouter = require("./routes/Login.js");
const formsRouter = require("./routes/forms.js");
const refundsRouter = require("./routes/refundsForm.js");
const userRouter = require("./routes/users.js");
const multer = require("multer");
const app = express();
app.use(cors());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Store uploaded files in the 'images' directory
  },
  filename: (req, file, cb) => {
    console.log(file);

    cb(
      null,
      new Date().toISOString().replace(/[^\w\s]/gi, "-") + file.originalname
    ); // Custom filename with timestamp
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use((error, req, res, next) => {
  const status = error.statusCode || 500; // Default to 500 for internal errors
  const message = error.message || "An unexpected error occurred";
  const data = error.data || null;
  res.status(status).json({ message, data });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(formsRouter);

app.use(signUpRouter);
app.use(loginRouter);
app.use(refundsRouter);
app.use(userRouter);

app.listen(3001);
