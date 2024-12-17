const refunds = require("../models/refunds");
const pushpull = require("../models/pushpull");
const listing = require("../models/listing");
const ref = require("../models/REF");
const pwdc = require("../models/pwdc");
const SPANISH = require("../models/spanish");
const SS = require("../models/SS");
const CC = require("../models/contact");
const WH = require("../models/WH");
const multer = require("multer");
const LOST = require("../models/lost");
const DEF = require("../models/defective");
const upload = multer({ dest: "uploads/" });
exports.submitRefund = async (req, res, next) => {
  const email = req.body.email;
  const order = req.body.order;
  const amount = req.body.amount;
  const ReasonForRefund = req.body.reasonForRefund;
  const tracking = req.body.tracking;
  const platform = req.body.platform;
  const description = req.body.description;
  const reasonForDiscount = req.body.reasonForDiscount;
  const timeStamp = req.body.time;
  try {
    const newRefund = new refunds(
      null,
      email,
      order,
      ReasonForRefund,
      reasonForDiscount,
      platform,
      amount,
      tracking,
      description
    );
    await newRefund.submitRefund();
    res.status(201).json({ message: "Refund submitted Successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.submitPP = async (req, res, next) => {
  const pushpullRequest = new pushpull(
    req.body.email,
    req.body.order,
    req.body.partNumber,
    req.body.reman,
    req.body.warehouse,
    req.body.pushpull,
    req.body.tracking
  );
  console.log(req.body);

  try {
    await pushpullRequest.postPushPull();
    res.status(201).json({ message: "Push/Pull submitted Successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
exports.getPP = async (req, res, next) => {
  try {
    const ppSubmissions = await pushpull.getPosts();
    res.status(200).json({ pp: ppSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitWe = async (req, res, next) => {
  try {
    console.log(req.body);

    const image = req.file;
    console.log(image);

    let imageUrl;
    if (image) {
      console.log(image.path, "image");

      imageUrl = image.path;
    }

    const WHrequest = new WH(
      req.body.email,
      req.body.date,
      req.body.orderNo,
      req.body.partNumber,
      req.body.warehouse,
      req.body.description,
      req.body.issue,
      imageUrl ? imageUrl : null //
    );

    await WHrequest.postWH();

    res.status(201).json({ message: "Push/Pull submitted successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    console.log("Error occurred:", e);

    next(e);
  }
};
exports.getWE = async (req, res, next) => {
  try {
    const WESubmissions = await WH.getPosts();
    res.status(200).json({ WE: WESubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};

exports.submitLost = async (req, res, next) => {
  try {
    const image = req.file || null;
    console.log(image);

    let imageUrl;
    if (image) {
      imageUrl = image.path;
    }

    // console.log(image.path, "image");

    const LOSTrequest = new LOST(
      req.body.email,
      req.body.date,
      req.body.orderNo,
      req.body.tracking,
      req.body.lostdamaged,

      req.body.warehouse,
      imageUrl ? imageUrl : null
    );

    await LOSTrequest.postLost();
    res.status(201).json({ message: "submitted successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    console.log("Error occurred:", e);

    next(e);
  }
};

exports.getLOST = async (req, res, next) => {
  try {
    const lostSubmissions = await LOST.getPosts();
    res.status(200).json({ lost: lostSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitLE = async (req, res, next) => {
  console.log(req.body);

  const listingRequest = new listing(
    req.body.email,
    req.body.orderNo,
    req.body.listing,
    req.body.description,
    req.body.errorType,
    req.body.error,
    req.body.platform
  );
  try {
    await listingRequest.postListing();
    res.status(201).json({ message: "Submitted Successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.getLE = async (req, res, next) => {
  try {
    const listSubmissions = await listing.getPosts();
    res.status(200).json({ list: listSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitREF = async (req, res, next) => {
  const refRequest = new ref(req.body.email, req.body.orderNo, req.body.RFR);

  try {
    await refRequest.postRef();
    res.status(201).json({ message: "Submitted Successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
exports.getRef = async (req, res, next) => {
  try {
    const refSubmissions = await ref.getPosts();
    res.status(200).json({ ref: refSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitDEF = async (req, res, next) => {
  try {
    const image = req.file || null;
    console.log(image);

    let imageUrl;
    if (image) {
      imageUrl = image.path;
    }

    const DEFrequest = new DEF(
      req.body.email,
      req.body.orderNo,
      req.body.partNumber,
      req.body.warehouse,
      req.body.description,
      imageUrl
    );

    await DEFrequest.postDEF();
    res.status(201).json({ message: "submitted successfully" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    console.log("Error occurred:", e);

    next(e);
  }
};
exports.getDEF = async (req, res, next) => {
  try {
    const DEFSubmissions = await DEF.getPosts();
    res.status(200).json({ def: DEFSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitPWDC = async (req, res, next) => {
  const pwdcRequest = new pwdc(
    req.body.email,
    req.body.partName,
    req.body.specs
  );
  console.log(req.body);

  try {
    await pwdcRequest.postPwdc();
    res.status(201).json({ message: "Submitted !" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
exports.getPWDC = async (req, res, next) => {
  try {
    const pwdcSubmissions = await pwdc.getPosts();
    res.status(200).json({ pwdc: pwdcSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitSS = async (req, res, next) => {
  console.log(req.body);

  try {
    const SSrequest = new SS(
      req.body.email,
      req.body.orderNo,
      req.body.RFR,
      req.body.actionTaken,
      req.body.describeAction
    );
    await SSrequest.postSS();
    res.status(201).json({ message: "Success" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
exports.getSaved = async (req, res, next) => {
  try {
    const savedSubmissions = await SS.getPosts();
    res.status(200).json({ saved: savedSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitSPA = async (req, res, next) => {
  console.log(req.body);

  const spanishRequest = new SPANISH(
    req.body.orderNo ? req.body.orderNo : null,
    req.body.phoneNumber,
    req.body.email
  );

  try {
    await spanishRequest.postSpanish();
    res.status(201).json({ message: "Success" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.getSpanish = async (req, res, next) => {
  try {
    const spanishSubmissions = await SPANISH.getPosts();
    res.status(200).json({ spa: spanishSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};
exports.submitCC = async (req, res, next) => {
  try {
    const CCRequest = new CC(
      req.body.email,
      req.body.orderNo,
      req.body.phoneNumber,
      req.body.reason
    );
    await CCRequest.postContact();
    res.status(201).json({ message: "Success" });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
exports.getContact = async (req, res, next) => {
  try {
    const contactSubmissions = await CC.getPosts();
    res.status(200).json({ cc: contactSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch push requests" });
  }
};

exports.updateFinished = async (req, res, next) => {
  console.log(req.body);

  try {
    // Validate that finished and id are provided
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    // Call the update function to update the refund status
    let updateResult;
    if (request === "finished") {
      updateResult = await pushpull.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await pushpull.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    // If successful, respond with a success message or updated refund data
    res
      .status(200)
      .json({ message: "Refund updated successfully.", data: updateResult });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error updating refund:", err);

    // Return a failure response
    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedWE = async (req, res, next) => {
  console.log(req.body);

  try {
    // Validate that finished and id are provided
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    // Call the update function to update the refund status
    let updateResult;
    if (request === "finished") {
      updateResult = await WH.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await WH.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    // If successful, respond with a success message or updated refund data
    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error updating refund:", err);

    // Return a failure response
    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedLost = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await LOST.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await LOST.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedListing = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await listing.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await listing.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedRef = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await ref.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await ref.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedPwdc = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await pwdc.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await pwdc.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedSaved = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await SS.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await SS.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedSpanish = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await SPANISH.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await SPANISH.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedContact = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await CC.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await CC.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
exports.updateFinishedDefective = async (req, res, next) => {
  console.log(req.body);

  try {
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be a boolean and 'id' is required.",
      });
    }

    let updateResult;
    if (request === "finished") {
      updateResult = await DEF.updateFinished(finished, id);
    } else if (request === "wrong") {
      updateResult = await DEF.updateWrong(finished, id);
    } else {
      return res.status(400).json({ error: "Invalid 'request' value." });
    }

    res
      .status(200)
      .json({ message: " updated successfully.", data: updateResult });
  } catch (err) {
    console.error("Error updating refund:", err);

    res
      .status(500)
      .json({ error: "Failed to update refund. Please try again later." });
  }
};
