const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        if(ext === '.pdf'){
            cb(null, Date.now() + ext)
        }else{
            cb(null, 'null');
        }  
    }
})

var upload = multer({
    storage: storage
})

module.exports = upload