const express = require("express");
const loginController = require("../controllers/Login");
const formsController = require("../controllers/forms");
const auth = require("../middlewares/auth"); // Import the auth middleware
const router = express.Router();

// Protected routes using auth middleware
router.post("/aform/Refunds", auth, formsController.submitRefund);

router.post("/aform/P&P", auth, formsController.submitPP);
router.get("/aform/P&P", auth, formsController.getPP);
router.patch("/pp", auth, formsController.updateFinished);
router.post("/aform/WE", auth, formsController.submitWe);
router.get("/aform/WE", auth, formsController.getWE);
router.patch("/WE", auth, formsController.updateFinishedWE);
router.post("/aform/Lost", auth, formsController.submitLost);
router.get("/lost", auth, formsController.getLOST);
router.patch("/lost", auth, formsController.updateFinishedLost);

router.post("/aform/LE", auth, formsController.submitLE);
router.get("/LE", auth, formsController.getLE);
router.patch("/LE", auth, formsController.updateFinishedListing);
router.post("/aform/REF", auth, formsController.submitREF);
router.get("/REF", auth, formsController.getRef);
router.patch("/REF", auth, formsController.updateFinishedRef);
router.post("/aform/DEF", auth, formsController.submitDEF);
router.get("/DEF", auth, formsController.getDEF);
router.patch("/DEF", auth, formsController.updateFinishedDefective);
router.post("/aform/PWDC", auth, formsController.submitPWDC);
router.get("/PWDC", auth, formsController.getPWDC);
router.patch("/PWDC", auth, formsController.updateFinishedPwdc);
router.post("/aform/SS", auth, formsController.submitSS);
router.get("/SS", auth, formsController.getSaved);
router.patch("/SS", auth, formsController.updateFinishedSaved);
router.post("/aform/SPA", auth, formsController.submitSPA);
router.get("/SPA", auth, formsController.getSpanish);
router.patch("/SPA", auth, formsController.updateFinishedSpanish);
router.post("/aform/CC", auth, formsController.submitCC);
router.get("/CC", auth, formsController.getContact);
router.patch("/CC", auth, formsController.updateFinishedContact);

module.exports = router;
