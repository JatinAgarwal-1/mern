const mongoose = require('mongoose');


// Defining User Scheme
const userScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    }
});


// Creating a model or document which is inside collection
const User = mongoose.model('USER', userScheme);


module.exports = User;