const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// Defining User Scheme
const userScheme = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  work: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
});

userScheme.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.cpassword = await bcryptjs.hash(this.cpassword, 12);
    console.log(this.cpassword);
    next();
  }
});

// Creating a model or document which is inside collection
const User = mongoose.model("USER", userScheme);

module.exports = User;
