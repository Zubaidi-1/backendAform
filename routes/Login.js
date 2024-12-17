const express = require("express");
const loginController = require("../controllers/Login");
const usersDb = require("../util/db");
const router = express.Router();

router.post("/", loginController.login);
module.exports = router;
