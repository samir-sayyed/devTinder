const express = require("express");
const {userAuth} = require("../middleware/auth");
const utils = require("../util/utils")


const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) =>{
    try{
        var user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

profileRouter.patch("/edit", userAuth, async (req, res) =>{
    try{
        console.log("outttt ")
        if(!utils.ValidateEditData(req)){
            console.log("in")
            throw new Error("Invalid edit request");
        }
        console.log("out")
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
       
        await loggedInUser.save();
        console.log(loggedInUser);
        res.json(
           { message: "Profile is updated successfully",
                user: loggedInUser
            }
        )
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = profileRouter;