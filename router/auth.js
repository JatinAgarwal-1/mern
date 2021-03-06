const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

require("../DB/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello World From The Server Outer`);
});

router.post("/register", async (req, res) => {
  let { name, email, phone, work, password, cpassword } = req.body;
  console.log(name, email, phone, work, password, cpassword);
  if (!name || !email || !phone || !work || !password || !cpassword) {
    res.status(422).json({ message: "Plz Fill the property" });
  }
  try {
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return res.status(422).json({ message: "Email Already Exits" });
    }
    if (password != cpassword) {
      return res
        .status(422)
        .json({ message: "Password and Confirm Password Should Be Same" });
    }
    const user = User({ name, email, phone, work, password, cpassword });
    await user.save();
    return res.status(201).json({ message: "Registraion Successfuly" });
  } catch (error) {
    console.log(error);
  }
});
/******************Login***********************************/
router.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    res.status(200).json({ meassage: "Please Filled The Data" });
  } else {
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      let token = await checkEmail.generateAuthToken();
      console.log(token);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      });

      const checkPass = await bcryptjs.compare(password, checkEmail.password);
      if (checkPass) {
        res.status(200).json({ meassage: "Sigin Success" });
      }
    } else {
      res.status(200).json({ meassage: "Invalid Credentials" });
    }
  }
});

module.exports = router;
