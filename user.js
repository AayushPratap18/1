const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        default: null
    },

    lastname:{
        type: String,
        default: null
    },

    email:{
        type: String,
        unique: true
    },

    password:{
        type: String
    },

    token: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema); //It will be saved in mongodb as "users", no matter how we write, it will always be in lowercase and plural