const express = require("express");
var {userAuth} = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) =>{
    try{
        var user = req.user
        res.send(user)
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = profileRouter;