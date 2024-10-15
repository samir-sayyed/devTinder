const express = require("express");
const bcrypt = require("bcrypt")
const utils = require("../util/utils")
const User = require("../models/user")
const {validateSignupData} = require("../util/validateSignupData");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) =>{
    try{
         validateSignupData(req.body);
         const {firstName, lastName, emailId, password} = req.body
         const hashPassword = await bcrypt.hash(password, 10);
         const user = new User({
             firstName,
             lastName,
             emailId,
             password: hashPassword
         });
         await user.save()
         res.send("User added successfully")
    }catch(err){
         res.send({
             error: err.message
         })
    }
 })

 authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        utils.emailValidaor(emailId);
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = user.validatePassword(user.password); 
        if(isPasswordValid){
            var jwyToken = user.getJWT();
            res.cookie("token", jwyToken)
            res.send("User logged in successfully");
        }else{
            throw new Error("Invalid credentials");
        }

    }catch(err){
        res.send("Error: " + err.message)
    }
    
})


module.exports = authRouter;