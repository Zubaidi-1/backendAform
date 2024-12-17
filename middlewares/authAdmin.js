const jwt = require("jsonwebtoken");

// Middleware to authenticate the JWT token and check the user's role
const authenticateAdminToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove "Bearer " from the token string

  if (!token) {
    return res.status(403).send("Access Denied: No token provided");
  }

  try {
    const decoded = jwt.verify(token, "Detroit@Axle@Mike2024"); // Replace with your actual secret key

    req.user = decoded;
    console.log(req.user.role);

    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .send("Access Denied: You do not have admin rights");
    }

    next();
  } catch (err) {
    // Handle JWT errors (expired token, invalid token, etc.)
    return res.status(400).send("Invalid or expired token");
  }
};

module.exports = authenticateAdminToken;
