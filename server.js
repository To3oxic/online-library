const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash');

const UserRoute = require('./routes/userroute')
const BookRoute = require('./routes/bookroutes')
const AuthRoute = require('./routes/authroute')
const MessageRoute = require('./routes/messageroute')



//connect to the database
mongoose.connect('mongodb+srv://To3oxic:Projectlibrary@cluster0.ftvrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('DB connected')
})



const app = express()

// set the view engine to ejs
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'))

//middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// upload the files into uploads
app.use('/uploads', express.static('uploads'))



const PORT   = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server is running ${PORT}')
})

app.use(flash());
app.use('/', AuthRoute) 
app.use('/book', BookRoute)
app.use('/user', UserRoute)
app.use('/adminpanel', MessageRoute)