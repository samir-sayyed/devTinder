var express = require("express");
const connectDB = require("./config/database")
var app = express();
var {userAuth} = require("./middleware/auth")
const User = require("./models/user")
const {validateSignupData} = require("./util/validateSignupData")
const bcrypt = require("bcrypt")
const utils = require("./util/utils")
const cookieParser = require("cookie-parser")
var jwt = require('jsonwebtoken');
const { use } = require("bcrypt/promises");

app.use(express.json())
app.use(cookieParser())

app.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        utils.emailValidaor(emailId);
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            var jwyToken = jwt.sign({ _id: user._id }, 'devtindersecretkey');
            res.cookie("token", jwyToken)
            res.send("User logged in successfully");
        }else{
            throw new Error("Invalid credentials");
        }

    }catch(err){
        res.send("Error: " + err.message)
    }
    
})

app.get("/profile", async (req, res) =>{
    try{
        const cookies = req.cookies;
        const {token} = cookies
        var decodedToken = jwt.verify(token, 'devtindersecretkey');
        console.log(decodedToken)
        const userId = decodedToken._id
        const user = await User.findOne({_id: userId})
        res.send(user)
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
})

app.post("/signup", async (req, res) =>{
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

app.get("/user", async (req, res) => {
    try{
        const userEmail = req.body.emailId
        var user = await User.find({emailId: userEmail})
        res.status(200).send(user)
    }catch(err){
        res.status(404).send("Something went wrong")
    }
})

app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) =>{
    try{
        const userId = req.body.userId
        const user = await User.findByIdAndDelete(userId)
        console.log(user)
        res.send("User deleted successfully")
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})

app.patch("/user", async (req, res) => {
    try{
        const userId = req.body.userId;
        const data = req.body
        const user = await User.findByIdAndUpdate(userId, data)
        res.status(200).send(user)
    }catch(err){
        res.status(404).send("Something went wrong");
    }
})



connectDB().then(()=>{
    console.log("Database comnnected successfully!")
    app.listen(3000, () =>{
        console.log("Server started successfully on port 3000")
    })
}).catch(()=>{
    console.error("Database connection failed!")
})
