const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/userController')

// register router
router.post('/register/', register)

// login router
router.get('/login/', login)

module.exports = router 