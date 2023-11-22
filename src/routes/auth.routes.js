const express = require("express");
const AuthController = require("../controllers/auth.controller");
const Validate = require("../middlewares/validate");
const { check } = require("express-validator");

const router = express.Router();

// Register route ==> /api/auth/register
router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("first_name")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("last_name")
    .not()
    .isEmpty()
    .withMessage("You last name is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  Validate,
  AuthController.register
);

// Login route ==> /api/auth/login
router.post(
  "/login",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  Validate,
  AuthController.login
);

// Logout route ==> /api/auth/logout
router.get("/logout", AuthController.logout);

router.get("/", (req, res) => {
  res.json({
    message: "HOME API AUTH ROUTER",
  });
});

module.exports = router;
