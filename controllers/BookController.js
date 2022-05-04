const { response } = require('express')
const Book = require('../models/Book')
const Msg = require('../models/Message')
const express = require('express')
const fs = require('fs')
const pdfparse = require('pdf-parse')
const flash = require('connect-flash');


var allbookstitle = [String]
    var allbooksauthor =[String] 
    var allbooksyear =[String] 
    var allbookscanreadusers =[String] 
    var allbooksurl =[String] 
    

    
const index = (req, res,next)=>{
    
    
    Book.find({}, (err, result)=>{

        var usename = req.params.name
        var token = req.params.token
        console.log(token)
        
        res.render('../views/index', {allbooks: result ,search: true, usename:usename,token:token} ) 
    })

    
    
   
   
}

//  single book

const show = (req, res, next) =>{
    
    // enable search
    let searchedtext = req.body.searchedtext
    var usename = req.body.username
    var pdffiles = []

   Book.find({
     
    title:searchedtext
   })
    .then(booksfound =>{
     
        // var usename = req.params.name
        var token = req.params.token
        // let position = text.search(searchedtext)
       
        let text = [String]
        console.log(booksfound.length)
       
        if(booksfound.length>0){
            res.render('../views/index', {allbooks: booksfound ,search: true, usename:usename,token:token})
        }else{ var myindex = 0
            Book.find({}).then(allboooks =>{
                for (let index = 0; index < allboooks.length; index++) {
                    let position = allboooks[index].booktext.search(searchedtext)
                    if(position>0){
                        pdffiles[myindex] = allboooks[index]
                        myindex = myindex +1
                    }
                }
                res.render('../views/index', {allbooks: pdffiles ,search: true, usename:usename,token:token})

                
            })
        }
            
           


      

        
       
    })

   


    

   
    
    
}


// add Book
const store = (req, res, next)=>{
     
    var myfile = fs.readFileSync(req.file.path)
     pdfparse(myfile).then(function(data){
        var text = data.text
        let book = new Book({
            author: req.body.author,
            year: req.body.year,
            title: req.body.filename,
            canreadusers: req.body.canreadusers,
            booktext:text
            
        })
        if(req.file){
            book.book = req.file.path
            
        }else{}
    
        book.save()
        .then(response =>{
            
            res.redirect('back')
            
        })
        .catch(error =>{
            res.json({
                message: 'error'
            })
        })

        

    })

   

}


// update book

const update = (req, res, next) =>{
    
    let booktitle = req.body.booktitle
    let addusername = req.body.addeduser
    let msgid = req.body.msgid
    Book.updateOne(
        { title: booktitle },
        { $addToSet: { canreadusers: { $each: [ addusername ] } } }
      ).then(()=>{
        
        Msg.findByIdAndRemove(msgid)
        .then(response =>{
            res.redirect('back');
        })
        .catch(error =>{
            res.json({
                message: 'error'
            })
        })
        
    })
    .catch(error =>{
        res.json({
            message: 'error'
        })
    })
}


// delete book
const destroy = (req, res, next) =>{
    let booktitle = req.body.booktitle
    let addusername = req.body.addeduser

    Book.updateOne(
        { title: booktitle },
        { $pull: { canreadusers: { $in: [ addusername ] } } }
      ).then(()=>{
        res.redirect('back')
    })
    .catch(error =>{
        res.json({
            message: 'error'
        })
    })
}


module.exports= {
    index, show, store, update, destroy
}