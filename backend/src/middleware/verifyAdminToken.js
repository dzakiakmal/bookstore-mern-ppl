const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = user; // Attach user information to request object
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    req.userId = user.id; // Store user ID in request for further use
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyAdminToken;
