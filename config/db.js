const mongoose = require('mongoose');
const config = require('config');

//Using the config package we can can get MogoURI defined in config file. 
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            usedNewUrlParser: true;
        });        
        console.log("MongoDB Connected...");

    } catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;