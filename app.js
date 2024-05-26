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

//1. 라우터 -route/api
//2. 모델 -model
//3. 데이터를 저장(이미 가입된 유저 유무,패스워드 암호화) -controller
//4. 응답을 보낸다(회원가입 완료!)

//2. 로그인
//이메일 패스워드를 입력해서 보냄
//데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
//없으면 로그인 실패
//있다면? 유저정보+토큰(로그인성공하면 웹사이트에서 로그인이 유지되는)

//1. 라우터설정
//2. fe에서 보낸 이메일,패스워드 정보 읽어보기 //req body에서 확인하고 싶음
//3. 이메일을 가지고 유저정보 가져오기
//4. 유저가 있다면, 이 유저에 디비에 있는 패스워드와 프엔이 보낸 패스워드가 같은지 비교
//5. 비교를 해서 맞다면 그러면 토큰 발행
//6. 틀리면 에러메세지 보냄
//7. 응답으로 유저 정보+토큰 보냄(발행)
