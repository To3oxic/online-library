const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    usename: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required:true,
        
    }
})


const Message = mongoose.model('Message', messageSchema)
module.exports = Message