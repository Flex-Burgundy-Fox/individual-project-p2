const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.PRIVATE_KEY

function hashedPass(pass){
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(pass, salt)
}

function comparePass(pass, dbPass) { 
  return bcrypt.compareSync(pass, dbPass)
} 

function generateToken(payload) {  
  return jwt.sign(payload, PRIVATE_KEY)
}

function verifyToken(token) {
  return jwt.verify(token, PRIVATE_KEY)
}

module.exports = {
  hashedPass, comparePass, generateToken, verifyToken
}