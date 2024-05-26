const express = require('express')
const router = express.Router()
const useController = require('../controller/user.controller')

//1.회원가입 endpoint
router.post('/', useController.createUser)

router.post('/login', useController.loginWithEmail)

module.exports = router
