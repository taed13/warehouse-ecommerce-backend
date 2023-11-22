// const TodoModel = require("../models/todo.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");

class AuthController {
  async register(req, res, next) {
    const {
      first_name,
      last_name,
      email,
      password,
      id_card,
      full_name,
      date_range,
      place_of_grant,
      image_cccd,
      country_region,
      state,
      city,
      zip_code,
      phone_number,
    } = req.body;

    try {
      const newUser = new User({
        first_name,
        last_name,
        email,
        password,
        id_card,
        full_name,
        date_range,
        place_of_grant,
        image_cccd,
        country_region,
        state,
        city,
        zip_code,
        phone_number,
      });
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          status: "failed",
          data: [],
          message:
            "It seems you already have an account, please log in instead.",
        });

      const savedUser = await newUser.save(); // save new user into the database
      const { password: savedPassword, role, ...user_data } = savedUser._doc;
      res.status(200).json({
        status: "success",
        data: [user_data],
        message:
          "Thank you for registering with us. Your account has been successfully created.",
      });
    } catch (err) {
      next(err);
    }
    res.end();
  }

  async login(req, res, next) {
    // Get variables for the login process
    const { email } = req.body;
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
