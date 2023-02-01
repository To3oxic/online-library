const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const { redirect } = require('express/lib/response')


//make a new account and store it in the db
const register = (req, res, next)=>{
    var username=req.body.usename
    var email=req.body.Email
    User.findOne({$or: [{Email: email}, {usename: username}]})
    .then(user =>{
        if(user){
            res.redirect('back')      
         }
         else{
            bcrypt.hash(req.body.password, 10, function(err, hasedPass){
                if(err){
                    res.json({
                        error: err
                    })
                }
                let user = new User({
                    usename: req.body.usename,
                    Email: req.body.Email,
                    isadmin: false,
                    password: hasedPass
                })
                user.save()
                .then(user =>{
                    res.render('../views/login')
                })
                .catch(error =>{
                    res.json({
                        message: 'error  '
                    })
                })
            })
         }
        })
         
   
    
}

 

//check if the given login infos are stored in the db
const login = (req, res, next) =>{
    //username by login is the Email
    var  usename = req.body.usename
    var password = req.body.password
    
    User.findOne({$or: [{Email: usename}]})
    .then(user =>{
        if(user){ // if there is user with this info in the db
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if (result){
                    if(user.isadmin === true){
                        let token = jwt.sign({name: user.usename}, 'secretValue', {expiresIn: "1h"})
                        res.redirect('/adminpanel/' + user.usename + '/' + token)
                     }else{
                        let token = "user"                   
                         res.redirect('/book/' + user.usename + '/' + token)
                     }
                }else {
                    res.json({
                        message: "password doesnot match"
                    })
                }
            })
        }else{
            res.json({
                message: 'you are not registerd' 
            }) 
        }
    })
}



const getlogin = (req, res, next)=>{
    res.render('../views/login')
}
const getregister = (req, res, next)=>{
    res.render('../views/register')
}

module.exports = {
    register, login, getlogin, getregister
 

}


