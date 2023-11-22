const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    id_card: {
      type: String,
      required: false,
    },
    full_name: {
      type: String,
      required: false,
    },
    date_range: {
      type: String,
      required: false,
    },
    place_of_grant: {
      type: String,
      required: false,
    },
    image_cccd: {
      type: String, // Đường dẫn đến hình ảnh Căn cước công dân
      required: false,
    },
    country_region: {
      type: String,
      required: false,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    phone_number: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["tenant", "homeowner"],
      default: "tenant",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;
