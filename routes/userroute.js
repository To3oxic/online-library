const express = require('express')
const router = express.Router()

const Usercontroller = require('../controllers/UserController')
const authenticate = require('../middleware/authenticate')


router.get('/:token',authenticate, Usercontroller.index)
router.post('/show', Usercontroller.show)
router.post('/store', Usercontroller.store)
router.post('/update', Usercontroller.update)
router.post('/delete', Usercontroller.destroy)

module.exports = router
