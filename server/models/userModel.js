const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    match: [/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/],
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
    default: "https://ibb.co/7jQDzd5",
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

// Encrypt users password b4 sending to DB
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
