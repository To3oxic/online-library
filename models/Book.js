const text = require('body-parser/lib/types/text');
const mongoose=require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required:true
    },
    year:{
        type: String,
        required:true
    },
    book:{
        type:String,
        required: true
    },
    canreadusers:[String],
    booktext:{
        type: String,
        required:true
    }
});

const Book = mongoose.model('Book',bookSchema)
module.exports = Book