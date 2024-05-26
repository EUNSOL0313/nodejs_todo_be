const User = require('../model/User')
const bcrypt = require('bcryptjs')
//패스워드 암호화 횟수
const saltRounds = 10

const useController = {}

useController.createUser = async (req, res) => {
   try {
      const { email, name, password } = req.body
      const user = await User.findOne({ email })
      if (user) {
         throw new Error('이미 가입이 된 유저 입니다.')
      }

      //패스워드암호화
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      console.log('hash', hash) //암호화 확인

      const newUser = new User({ email, name, password: hash })
      await newUser.save()
      res.status(200).json({ status: 'success' })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

useController.loginWithEmail = async (req, res) => {
   try {
      const { email, password } = req.body
      //일시적으로 데이터 정보 지우는 법
      const user = await User.findOne({ email }, '-createdAt -updatedAt -__v')
      if (user) {
         //password==>유저가 입력한 그 자체
         //use.password ===> 암호화된 패스워드
         //둘이 비교하는 방법 bcrypt
         const isMath = bcrypt.compareSync(password, user.password)
         if (isMath) {
            const token = user.generateToken()
            return res.status(200).json({ status: 'success', user, token })
         }
      }
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

module.exports = useController
