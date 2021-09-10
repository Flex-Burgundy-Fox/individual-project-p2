const { comparePass, generateToken } = require('../helper')
const { User } = require('../models')
const {OAuth2Client} = require("google-auth-library")


class UserC {
  static login(req, res, next) {
    let { email, password } = req.body
    if (!email) {
      throw ({ name: 'login failed' })
    }
    User.findOne({
      where: { email }
    })
      .then((user) => {
        const checkPass = comparePass(password, user.password)
        if (!user) {
          throw ({ name: 'login failed' })
        }
        if (!checkPass) {
          throw ({ name: 'login failed' })
        } else {
          let token = generateToken({
            id: user.id,
            email: user.email
          })
          res.status(200).json({
            access_token: token
          })
        }
      })
      .catch((err) => next(err))
  }

  static register(req, res, next) {
    let { email, password } = req.body
    User.create({ email, password })
      .then((user) => {
        res.status(201).json({
          id: user.id,
          email: user.email
        })
      })
      .catch((err) => next(err))
  }

  static googleLogin(req, res, next) {
    let {token} = req.body
        let CLIENT_ID = process.env.CLIENT_ID
        let emailUser;

        const client = new OAuth2Client(CLIENT_ID)
        client.verifyIdToken({
            idToken : token,
            audience : CLIENT_ID
        })
        .then((ticket) => {
            const {email} = ticket.getPayload()
            emailUser = email
            return User.findOne({ where : {email}})
        })
        .then((user) => {
            if (!user) {
                return User.create({
                    email: emailUser,
                    password: Math.random() * 10000 + "lalapopo"
                })
            } else {
                const token = generateToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token: token
                })   
            }
            
        })
        .then((user) => {
            const token = generateToken({
                id: user.id,
                email: user.email
            })
            res.status(201).json({
                access_token: token
            })   
        })
        .catch((err) => next(err))
  }
}

module.exports = UserC