const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')


router.get('/', (req,res,next)=>{
    res.redirect('./login')
})
router.get('/register', AuthController.getregister)
router.get('/login', AuthController.getlogin)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router