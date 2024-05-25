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
