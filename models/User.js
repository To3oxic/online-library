const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    usename: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required: true
    },
    isadmin:{
        type:Boolean
    }
})


const User = mongoose.model('User', userSchema)
module.exports = User