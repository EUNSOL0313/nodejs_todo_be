const express = require('express')
const router = express.Router()
const useController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')

//1.회원가입 endpoint
router.post('/', useController.createUser)

router.post('/login', useController.loginWithEmail)

//2. 토큰을 통해 유저 id빼내고 => 그 아이디로 유저 객체 찾아서 보내주기

router.get('/me', authController.authenticate, useController.getUser)
//함수는 원하는 만큼 넣을 수 있음. next사용

module.exports = router
