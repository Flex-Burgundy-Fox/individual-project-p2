const bcrypt = require("bcryptjs")

function hashingPassword(plainText) {
   const salt = bcrypt.genSaltSync(10)
   const hash = bcrypt.hashSync(plainText, salt)
   // Store hash in your password DB.
   return hash
}

function comparePassword(plainText, hash) {
   // Load hash from your password DB.
   return bcrypt.compareSync(plainText, hash)
}

module.exports = {
   hashingPassword,
   comparePassword
}
