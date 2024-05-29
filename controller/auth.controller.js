const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authController = {}

authController.authenticate = (req, res, next) => {
   try {
      const tokenString = req.headers.authorization //Bearer dfff
      if (!tokenString) {
         throw new Error('invalid token')
      }
      const token = tokenString.replace('Bearer ', '')
      jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
         if (error) {
            throw new Error('invalid token')
         }
         //res.status(200).json({ status: 'success', userID: payload._id })
         //console.log('payload', payload)

         //user id값 가져오기
         req.userId = payload._id
      })
      next()
   } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message })
   }
}

module.exports = authController

//미들웨어 -next 중간에서 작업해서 보내는 곳
