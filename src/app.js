var express = require("express");
const connectDB = require("./config/database")
var app = express();
var {userAuth} = require("./middleware/auth")
const User = require("./models/user")

app.use(express.json())

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

app.post("/signup", async (req, res) =>{
   try{
        const user = new User(req.body);
        await user.save()
        res.send("User added successfully")
   }catch(err){
        res.send({
            error: err.message
        })
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
