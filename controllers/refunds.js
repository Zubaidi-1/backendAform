const db = require("../util/db");
const refunds = require("../models/refunds");
exports.getRefunds = async (req, res, next) => {
  try {
    const refundsSubmissions = await refunds.getPosts();
    res.status(200).json({ refunds: refundsSubmissions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch refunds" });
  }
};

exports.updatefinsihed = async (req, res, next) => {
  try {
    // Validate that finished and id are provided
    const { request, finished, id } = req.body;

    if (typeof finished !== "boolean" || !id) {
      return res.status(400).json({
        error:
          "Invalid request. 'finished' should be boolean and 'id' is required.",
      });
    }

    // Call the update function to update the refund status
    if (request === "finished") {
      await refunds.updateFinished(finished, id);
    } else if (request === "hold") {
      await refunds.updateHold(finished, id);
    } else if (request === "wrong") {
      await refunds.updateWrong(finished, id);
    }

    // If successful, respond with a success message or updated refund data
    res.status(200).json({ message: "Refund updated successfully." });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error updating refund:", err);

    // Return a failure response
    res.status(500).json({ error: "Failed to update refund." });
  }
};
