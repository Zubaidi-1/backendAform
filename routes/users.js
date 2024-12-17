const express = require("express");
const usersController = require("../controllers/user");
const adminAuth = require("../middlewares/authAdmin");
const router = express.Router();

router.get("/userControl", adminAuth, usersController.getUser);
router.patch("/userControl", adminAuth, usersController.patchUser);
module.exports = router;
