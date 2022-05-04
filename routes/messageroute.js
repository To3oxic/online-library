const express = require('express')
const router = express.Router()
const flash = require('connect-flash');
const MessageController = require('../controllers/MessageController')
const authenticate = require('../middleware/authenticate')

router.get('/:name/:token',authenticate, MessageController.index)

router.post('/', MessageController.store)


module.exports = router