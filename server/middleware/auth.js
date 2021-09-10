const { verifyToken } = require('../helper')
const { User } = require('../models')

function Authentication(req, res, next) {
  const { access_token } = req.headers
  try {
    if (!access_token) {
      throw ({ name: "token error" })
    }
    const token = verifyToken(access_token)
    User.findByPk(token.id)
      .then((user) => {
        if (user) {
          req.user = {
            id: user.id
          }
          next()
        } else {
          throw ({ name: 'auth error' })
        }
      })
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports = {
  Authentication,
}