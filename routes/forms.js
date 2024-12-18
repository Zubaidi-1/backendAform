const express = require("express");
const loginController = require("../controllers/Login");
const formsController = require("../controllers/forms");
const auth = require("../middlewares/auth"); // Import the auth middleware
const router = express.Router();
const adminAuth = require("../middlewares/authAdmin");

// Protected routes using auth middleware
router.post("/aform/Refunds", auth, formsController.submitRefund);

router.post("/aform/P&P", auth, formsController.submitPP);
router.get("/aform/P&P", adminAuth, formsController.getPP);
router.patch("/pp", adminAuth, formsController.updateFinished);
router.post("/aform/WE", auth, formsController.submitWe);
router.get("/aform/WE", adminAuth, formsController.getWE);
router.patch("/WE", adminAuth, formsController.updateFinishedWE);
router.post("/aform/Lost", auth, formsController.submitLost);
router.get("/lost", adminAuth, formsController.getLOST);
router.patch("/lost", adminAuth, formsController.updateFinishedLost);

router.post("/aform/LE", auth, formsController.submitLE);
router.get("/LE", adminAuth, formsController.getLE);
router.patch("/LE", adminAuth, formsController.updateFinishedListing);
router.post("/aform/REF", auth, formsController.submitREF);
router.get("/REF", adminAuth, formsController.getRef);
router.patch("/REF", adminAuth, formsController.updateFinishedRef);
router.post("/aform/DEF", auth, formsController.submitDEF);
router.get("/DEF", adminAuth, formsController.getDEF);
router.patch("/DEF", adminAuth, formsController.updateFinishedDefective);
router.post("/aform/PWDC", auth, formsController.submitPWDC);
router.get("/PWDC", adminAuth, formsController.getPWDC);
router.patch("/PWDC", adminAuth, formsController.updateFinishedPwdc);
router.post("/aform/SS", auth, formsController.submitSS);
router.get("/SS", adminAuth, formsController.getSaved);
router.patch("/SS", adminAuth, formsController.updateFinishedSaved);
router.post("/aform/SPA", auth, formsController.submitSPA);
router.get("/SPA", adminAuth, formsController.getSpanish);
router.patch("/SPA", adminAuth, formsController.updateFinishedSpanish);
router.post("/aform/CC", auth, formsController.submitCC);
router.get("/CC", adminAuth, formsController.getContact);
router.patch("/CC", adminAuth, formsController.updateFinishedContact);

module.exports = router;
