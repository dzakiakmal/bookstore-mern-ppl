const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      return res.status(404).send({ message: "admin not found" });
    }
    if (admin.password !== password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token: token,
      admin: { username: admin.username, role: admin.role },
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Error logging in admin", error });
  }
});

module.exports = router;
