const express = require("express");
const refundsController = require("../controllers/refunds");
const adminAuth = require("../middlewares/authAdmin");
const router = express.Router();
router.get("/refunds", adminAuth, refundsController.getRefunds);
router.patch("/refunds", adminAuth, refundsController.updatefinsihed);

module.exports = router;
