const { Verify } = require("../middlewares/verify");
const express = require("express");

const router = express.Router();

// Get all tenants route ==> /api/tenants
router.get("/", Verify, (req, res) => {
  // Bạn có thể truy cập thông tin người dùng qua đối tượng req
  const { _id, email, role } = req.user;
  res.status(200).json({
    status: "success",
    message: "Welcome to the your Dashboard!",
    user: {
      _id,
      email,
      role,
    },
  });
});

module.exports = router;
