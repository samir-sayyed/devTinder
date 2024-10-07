const validator = require("validator");

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req;
    if(!firstName || !lastName){
        throw new Error("Enter valid first and last name");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Enter valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
    }

}

module.exports = {
    validateSignupData
}