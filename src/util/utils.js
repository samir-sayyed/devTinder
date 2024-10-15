const validator = require("validator");

const emailValidaor = (email) => {
    if(!validator.isEmail(email)){
        throw new Error("Enter valid email")
    }
}


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


const ValidateEditData = (req) =>{
        const allowedFields = ["firstName", "lastName", "age", "skills", "gender", "photo", "about"]
        const isEditAllowedFields = Object.keys(req.body).every((field) =>
            allowedFields.includes(field)
        );
        console.log(isEditAllowedFields)
        return isEditAllowedFields;
}

module.exports = {
    emailValidaor,
    ValidateEditData,
    validateSignupData
}