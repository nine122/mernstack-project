const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const { body } = require("express-validator");
const User = require("../models/User");

router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UserController.register
);

module.exports = router;
