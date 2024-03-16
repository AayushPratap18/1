const mongoose = require("mongoose")

const MONGO_URL = "mongodb+srv://one:passwore@cluster0.crfqaq9.mongodb.net/"

const connectdb = async () => {
    try {
        const con = await mongoose.connect(MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true
    });
    console.log(`DB connection successful`)
}
     catch (error) {
        console.log(`dB connection failed`)
        console.log(`error`)
        process.exit(1)
    }
}

module.exports = connectDB;

/*const mongoose=require('mongoose')

const mongoAtlasUri="mongodb+srv://sandeep:helloji@cluster0.ufrq1vk.mongodb.net/techClub_nituk?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongoAtlasUri, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}

module.exports = connectDB;*/ 