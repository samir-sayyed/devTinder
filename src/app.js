var express = require("express");
const connectDB = require("./config/database");
var app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.use("/users", async (req, res) =>{
    try{
        const users = await User.find({});
        res.status(200).send(users)
    }catch(err){
        res.status(200).send("Error: " + err.message);
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
