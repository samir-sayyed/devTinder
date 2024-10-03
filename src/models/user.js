const mongoose = require('mongoose');

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

module.exports = mongoose.model("User", userSchema)