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
                avatar: user.avatar,
                access_token: access_token
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static register (req, res, next) {
        const { first_name, last_name, email, password } = req.body
        let random = Math.floor(Math.random()*1000)
        User.create(
            {
                first_name,
                last_name,
                email,
                password,
                avatar : `https://avatars.dicebear.com/api/bottts/anon-${random}.svg`
            }
        )
        .then((user) => {
            res.status(201).json({
                name: `${user.first_name} ${user.last_name}`,
                id: user.id,
                email: user.email,
                avatar: user.avatar
            })
        })
        .catch(err => {
            next(err)
        })

    }

    static googleLogin (req, res, next) {
        let random = Math.floor(Math.random()*1000)
        const { token } = req.body
        // console.log(token)
        const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID
        let emailUser
        let first_nameUser
        let last_nameUser

        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
           idToken : token,
           audience : CLIENT_ID
        })
        .then((ticket) => {
            // console.log(ticket)
            const { email, given_name, family_name } = ticket.getPayload()
            emailUser = email
            first_nameUser = given_name,
            last_nameUser = family_name
            return User.findOne({
                    where : {
                        email : emailUser
                    }
            })
        })
       .then((user) => {
        //    console.log(user +'<<<<< ini isi user')
           if (!user) {
               return User.create({
                first_name : first_nameUser,
                last_name : last_nameUser,
                email: emailUser,
                password : process.env.PASSWORD_DEF,
                avatar : `https://avatars.dicebear.com/api/bottts/anon-${random}.svg`
               })
           } else {
               const payload = {id: user.id}
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