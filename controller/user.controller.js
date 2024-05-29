const User = require('../model/User')
const bcrypt = require('bcryptjs')

const useController = {}

//유저 생성
useController.createUser = async (req, res) => {
   try {
      const { email, name, password } = req.body

      //이메일 중복 검사
      const user = await User.findOne({ email: email })
      if (user) {
         throw new Error('이미 가입이 된 유저 입니다.')
      }

      //패스워드암호화 (암호화 횟수 == 10)
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      console.log('hash', hash) //암호화 확인

      //유저 생성
      const newUser = new User({ email, name, password: hash })
      await newUser.save()
      console.log('### newUser', newUser)

      res.status(200).json({ status: 'success' })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

//유저 로그인
useController.loginWithEmail = async (req, res) => {
   try {
      //email로 유저 정보 가져오기
      const { email, password } = req.body

      //일시적으로 데이터 정보 지우는 법
      const user = await User.findOne({ email }, '-createdAt -updatedAt -__v')

      if (user) {
         //password==>유저가 입력한 그 자체 (fe에서 입력한 비번)
         //use.password ===> 암호화된 패스워드 (DB에 저장된 비번(해시값))
         //둘이 비교하는 방법 bcrypt
         const isMath = bcrypt.compareSync(password, user.password)
         if (isMath) {
            //토큰 생성
            const token = user.generateToken()

            //응답 : 유저정보 + 토큰정보
            return res.status(200).json({ status: 'success', user, token })
         }
      }
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
   } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message })
   }
}

//_id 값으로 유저 정보 가져오기
useController.getUser = async (req, res) => {
   try {
      //authController.authenticate에서 넘겨받은 userId
      const { userId } = req

      const user = await User.findById(userId)
      if (!user) {
         throw new Error('can not find user')
      }

      res.status(200).json({ status: 'success', user })
   } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message })
   }
}

module.exports = useController
