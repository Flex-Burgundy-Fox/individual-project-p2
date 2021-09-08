const { User } = require('../models')
const { passwordCompare, tokenGenerator } = require('../helpers/index')
const { OAuth2Client } = require('google-auth-library')


class UserController {

    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then((user) => {
            if (!user) throw {error : 'Login Failed'}
            const isCorrect = passwordCompare(password, user.password)

            if (!isCorrect) {
                throw {error: 'Login Failed'}
            }
            const access_token = tokenGenerator({
                id : user.id
            })
            res.status(200).json({
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                access_token: access_token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static register (req, res, next) {
        const { first_name, last_name, email, password } = req.body
        User.create(
            {
                first_name,
                last_name,
                email,
                password
            }
        )
        .then((user) => {
            res.status(201).json({
                name: `${user.first_name} ${user.last_name}`,
                id: user.id,
                email: user.email
            })
        })
        .catch(err => {
            next(err)
        })

    }

    static googleLogin (req, res, next) {

        const { token } = req.body
        const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID
        let emailUser

        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
           idToken : token,
           audience : CLIENT_ID
        })
        .then((ticket) => {
            const { email } = ticket.getPayload()
            emailUser = email
            return User.findOne(
                {
                    where : {
                        email : email
                    }
                })
        })
       .then((user) => {
           if (!user) {
               return User.create({
                   email: emailUser,
                   password: process.env.PASSWORD_DEF
               })
           } else {
               const payload = {email: user.email, id: user.id}
               const access_token = tokenGenerator(payload)
               res.status(200).json({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    access_token: access_token
               })
           }
       })
       .then((user) => {
            const payload = {email: user.email, id: user.id}
            const access_token = tokenGenerator(payload)
            res.status(201).json({
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                access_token: access_token
            })
       })
       .catch(err => {
           next(err)
       })
    }
}


module.exports =  UserController