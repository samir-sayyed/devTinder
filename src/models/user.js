const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength:50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lower:true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    photo: {
        type: String
    },
    about: {
        type: String,
        minLength: 20,
        maxLength: 100
    },
    skills: {
        type: ["String"]
    }
})

userSchema.methods.getJWT = function() {
    const user = this;
    var jwyToken = jwt.sign({ _id: user._id }, 'devtindersecretkey');
    return jwyToken;
}

userSchema.methods.validatePassword = async function(userInputPassword){
    const user = this;
    const isValidPassword = await bcrypt.compare(userInputPassword, user.password);

    return isValidPassword;
}

module.exports = mongoose.model("User", userSchema)