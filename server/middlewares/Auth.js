const { tokenDecoder } = require('../helpers/index')
const { User, Blabla } = require('../models')


function authentication (req, res, next) {

    const { access_token } = req.headers

    if (!access_token) return next({error: 'No Access Token'})

    try {
        const decoded = tokenDecoder(access_token)

        User.findByPk(decoded.id)
            .then((user) => {
                if (!user) {
                    throw {error: 'Invalid Token'}
                } else {
                    req.currentUser = {
                        id : user.id
                    }
                    next()
                }
            })
            .catch(err => {
                next(err)
            })
    } catch(err) {
        next(err)
    }

}

function authorization (req, res, next) {

    let id = +req.params.id
    Blabla.findByPk(id)
    .then((data) => {
        if (!data) {
            throw {error: 'Authorization Error'}
        } else {
            if (data.UserId === req.currentUser.id) {
                next()
            } else {
                throw {error: 'Authorization Error'}
            }
        }
    })
    .catch(err => {
        next(err)
    })

}


module.exports = {
    authentication,
    authorization
}