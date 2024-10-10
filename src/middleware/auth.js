const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth =  async (req, res, next) => { 
   try{

    const {token}  = req.cookies;
    if(!token){
        throw new Error("Token not found");
    }
    const decodedToken = jwt.verify(token, 'devtindersecretkey');

    const userId = decodedToken._id;
    const user = await User.findOne({_id: userId});

    if(!user){
        throw new Error("User is not athorised");
    }
    req.user = user;
    next()

   }catch(err){
    res.status(401).send("Error: " + err.message)
   }
};

module.exports = {
    userAuth
};