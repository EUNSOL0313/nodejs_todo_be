const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

//be 에서 fe로 정보를 보낼때 password 빼고 보내는 함수 -보안상 중요!
userSchema.methods.toJSON = function () {
   const obj = this._doc
   delete obj.password
   delete obj.updatedAt
   delete obj.__v

   return obj
}

//json token 만들기
userSchema.methods.generateToken = function () {
   const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY, { expiresIn: '1d' })
   return token
}

const User = mongoose.model('User', userSchema)
module.exports = User
