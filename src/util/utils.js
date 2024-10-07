const validator = require("validator");

const emailValidaor = (email) => {
    if(!validator.isEmail(email)){
        throw new Error("Enter valid email")
    }
}

module.exports = {
    emailValidaor
}