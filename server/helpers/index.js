const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.PRIVATE_KEY

function passwordHasher(password) {
    let salt = bcrypt.genSaltSync(10)
    let hashed = bcrypt.hashSync(password, salt)

    return hashed
}

function passwordCompare(userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword)
} 

function tokenGenerator(payload) {
    const access_token = jwt.sign(payload, PRIVATE_KEY)
    return access_token
}

function tokenDecoder(access_token) {
    const decoded = jwt.verify(access_token, PRIVATE_KEY)
    return decoded
}

module.exports = {
    passwordHasher,
    passwordCompare,
    tokenGenerator,
    tokenDecoder
}