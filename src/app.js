var express = require("express");
const connectDB = require("./config/database")
var app = express();
var {userAuth} = require("./middleware/auth")
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req, res) =>{
   try{
        const user = new User(req.body);
        await user.save()
        res.send("User added successfully")
   }catch(err){
        res.send("Something went wrong")
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
