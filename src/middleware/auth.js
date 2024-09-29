const userAuth =  (req, res, next) => { 
    const token = "xyz";
    var isTokenValid = token === "xyz"
    if(!isTokenValid){
        res.send(401).send("Unautorised User!!")
    }else{
        next()
    }
};

module.exports = {
    userAuth
};