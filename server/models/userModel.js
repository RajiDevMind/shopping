const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be empty!"],
  },
  email: {
    type: String,
    required: [true, "Email can't be empty!"],
    unique: true,
    trim: true,
    match: [],
  },
  password: {
    type: String,
    required: [true, "Password can't be empty!"],
    minLength: [6, "Password, Minimum of six(6) characters"],
  },
  role: {
    type: String,
    required: [true],
    default: "customer",
    enum: ["customer", "admin"],
  },
  photo: {
    type: String,
    required: [true, "Kindly add a profile image!"],
    default: "image url here",
  },
  phone: {
    type: String,
    default: "+234",
  },
  address: {
    type: Object,
    // address, state, country
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
