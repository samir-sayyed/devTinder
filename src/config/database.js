const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://samirsayyed:786Samir!@cluster1.7ryvl.mongodb.net/devTinder");
}

module.exports = connectDB;
