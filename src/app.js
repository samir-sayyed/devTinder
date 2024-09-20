var express = require("express");

var app = express();

app.use("/profile", (req, res) => {
    res.send("profile")
})

app.use("/", (req, res) =>{
    res.send("Home")
})

app.listen(3000, () =>{
    console.log("Server started successfully on port 3000")
})
