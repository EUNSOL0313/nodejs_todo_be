const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()
const app = express()
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
//console.log('mongouri', MONGODB_URI_PROD)

// CORS 설정 - 모든 출처 허용
app.use(cors({ origin: '*' }))

// BodyParser 설정
app.use(bodyParser.json())

// 라우터 설정
app.use('/api', indexRouter)

// MongoDB 연결 설정
const mongoURI = MONGODB_URI_PROD

mongoose
   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Mongoose connected')
   })
   .catch((err) => {
      console.log('DB connection failed', err)
   })

// 서버 실행
app.listen(process.env.PORT || 4500, () => {
   console.log('Server running on port 4500')
})

//1. 회원가입
//유저가 이메일,패스워드, 유저이름을 입력해서 보냄
//받은 정보를 저장함.(데이터베이스 모델필요)
//패스워드를 암호화 시켜서 저장 -> 암호화 라이브러리 사용

//1. 라우터
//2. 모델
//3. 데이터를 저장(이미 가입된 유저 유무,패스워드 암호화)
//4. 응답을 보낸다(회원가입 완료!)
