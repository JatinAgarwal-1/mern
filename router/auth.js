const express = require('express');
const router = express.Router();

require('../DB/connection');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello World From The Server Outer`);
});

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    console.log(name, email, phone, work, password, cpassword);
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ message: "Plz Fill the property" })
    }
    try {
        const userExits = await User.findOne({ email: email });
        if (userExits) {
            return res.status(422).json({ message: "Email Already Exits" });
        }
        const user = User({ name, email, phone, work, password, cpassword });
        const status = await user.save();
        return res.status(201).json({ message: "Registraion Successfuly" });
    } catch (error) {
        console.log(error);
    }
    // User.findOne({ email: email }).then((userExits) => {
    //     if (userExits) {
    //         return res.status(422).json({ error: "Email Already Exits" });
    //     }
    //     const user = User({ name, email, phone, work, password, cpassword });
    //     user.save().then(() => {
    //         res.status(201).json({ message: "Registraion Successfuly" })
    //     }).catch(err => res.status(500).json({ message: "Failed to Registered", }));
    // }).catch(err => res.status(505).json({ message: err }));
    // res.status(422).json({ message: req.body });

});

module.exports = router;