const express = require("express");
const router = express.Router();

require("../DB/connection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello World From The Server Outer`);
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
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
  // const emailCheck = await User.findOne({ email: email });
  const passCheck = await User.find({ email: email, password: password });
  console.log(email, password);
  if (passCheck) {
    res.status(200).json({ meassage: "Sigin Success" });
  }
  res.status(200).json({ meassage: "Sigin UnSuccess" });
});

module.exports = router;
