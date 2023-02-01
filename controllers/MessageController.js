const { response } = require('express')
const Message = require('../models/Message')
const express = require('express')
const flash = require('connect-flash');


    var allusers = [String]
    var allmessages =[String] 
    

// show requstes of books 
const index = (req, res,next)=>{
    
    Message.find({})
    .then(Messages =>{
        var usename = req.params.name
        var token = req.params.token
        res.render('../views/adminpanel', {Messages:Messages,usename:usename,token:token })         
    }) 
}


// add mesage
const store = (req, res, next)=>{
     
    Message.find({}, (err, result)=>{
        if (err){}
        else{
            var x = true // to check if request exisit already
            // check if user sent already a request 
            for (let i = 0; i < result.length; i++) {      
                allusers[i] = result[i].usename
                allmessages[i] = result[i].message
                if (allusers[i] == req.body.usename ){
                    if(allmessages[i] == req.body.message){
                        x = false
                        break;
                    }     
                }
              }
              if (x){
                  let message = new Message({
                      usename: req.body.usename,
                      message: req.body.message,    
                  })
                  message.save()
                  .then(response =>{
                    res.redirect('back')                   
                  })
                  .catch(error =>{
                      res.json({
                          message: 'error'
                      })
                  })            
              }
              else{
                  res.redirect('back')
              }
        }
    }) 
}


module.exports= {
    index,store
}