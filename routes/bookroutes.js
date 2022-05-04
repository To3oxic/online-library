const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

const BookController = require('../controllers/BookController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/:name/:token', BookController.index)
router.post('/show', BookController.show)
router.post('/store', upload.single('book') ,BookController.store)
router.post('/update', BookController.update)
router.post('/delete', BookController.destroy)

module.exports = router