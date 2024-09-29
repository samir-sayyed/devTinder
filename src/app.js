var express = require("express");
const connectDB = require("./config/database")
var app = express();

var {userAuth} = require("./middleware/auth")

const User = require("./models/user")


app.post("/signup", async (req, res) =>{
   try{
        const newUser = {
            firstName: "Samir",
            lastName: "Sayyed",
            emailId:"samir@gmail.com"
        }
        const user = new User(newUser);
        await user.save()
        res.send("User added successfully")
   }catch(err){

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
