const { response } = require('express')
const User = require('../models/User')

const index = (req, res,next)=>{
    User.find()
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error'
        })
    })
}

// show single user

const show = (req, res, next) =>{
    let userID = req.body.userID
    User.findById(userID)
    .then(response=>{
        res.json({
            response
        })
    
    })
    .catch(error =>{
        res.json({
            message: "An errpr"
        })
       
    })
}


// add user

const store = (req, res, next)=>{
    let user = new User({
        usename: req.body.usename,
        password: req.body.password,
        Email: req.body.Email,
        
    })
    user.save()
    .then(response =>{
        res.redirect('back')
    })
    .catch(error =>{
        res.json({
            message: 'error'
        })
    })

}


// update user

const update = (req, res, next) =>{
    let userID = req.body.userID

    let updatedData = {
        usename: req.body.usename,
        password: req.body.password,
        Email: req.body.Email
    }
    User.findByIdAndUpdate(userID,{$set: updatedData})
    .then(()=>{
        res.json({
            message: 'user updated'
        })
    })
    .catch(error =>{
        res.json({
            message: 'error'
        })
    })
}


// delete user
const destroy = (req, res, next) =>{
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(()=>{
        req.json({
            message: 'user deleted'
        })
    })
    .catch(error =>{
        req.json({
            message: 'error'
        })
    })
}


module.exports= {
    index, show, store, update, destroy
}