// const TodoModel = require("../models/todo.model");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
      role,
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
        role,
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
      const { password: savedPassword, ...user_data } = savedUser._doc;
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
      // check if user exists
      const user = await User.findOne({ email: email }).select("+password");
      if (!user)
        return res.status(401).json({
          status: "failed",
          data: [],
          message:
            "Invalid email or password. Please try again with the correct credentials.",
        });

      // if user exists
      // validate password
      const isPasswordValid = bcrypt.compareSync(
        `${req.body.password}`,
        user.password
      );

      // if not valid, return unathorized response
      if (!isPasswordValid)
        return res.status(401).json({
          status: "failed",
          data: [],
          message:
            "Invalid email or password. Please try again with the correct credentials.",
        });

      let option = {
        maxAge: 20 * 60 * 1000, // would expire in 20minutes
        httpOnly: true, // The cookie only accessible by the web server
        secure: true, // The cookie only accessible by
        sameSite: "none",
      };

      const token = user.generateAccessJWT();
      res.cookie("token", token, option); // options is optional

      // return user info except password
      const { password, ...user_data } = user._doc;
      res.status(200).json({
        status: "success",
        data: [user_data],
        message: "You have successfully logged in.",
      });
    } catch (err) {
      next(err);
    }
    res.end();
  }
}

module.exports = new AuthController();
