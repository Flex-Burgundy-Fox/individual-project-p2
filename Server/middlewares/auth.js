const { decodeToken } = require("../helpers/jwt")
const { User } = require("../models")

function authentification(req, res, next) {
   const { access_token } = req.headers

   if (!access_token) {
      return next({ name: "Access token missing" })
   }

   try {
      const userDecoded = decodeToken(access_token)

      User.findByPk(userDecoded.id)
         .then((user) => {
            if (!user) {
               throw {
                  name: "Unauthenticated"
               }
            } else {
               req.currentUser = {
                  id: user.id,
                  role: user.role
               }
               next()
            }
         })
         .catch((err) => next(err))
   } catch (err) {
      return next(err)
   }
}

module.exports = {
   authentification
}
