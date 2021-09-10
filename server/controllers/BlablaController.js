const { Blabla } = require('../models')

class BlablaController {

    static showBlablas (req, res, next) {
        Blabla.findAll({
            order: [ 
                ['createdAt', 'DESC'] 
            ]
        })
        .then((data) => {
            res.status(200).json({
                data : data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static createBlabla (req, res, next) {
        let { contents} = req.body

        Blabla.create({
            contents, 
            UserId: req.currentUser.id
        })
        .then((data) => {
            res.status(201).json({
                data : data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static getEditBlabla (req, res, next) {
        const id = +req.params.id

        Blabla.findByPk(id)
        .then((data) => {
            res.status(200).json({
                data : data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static editBlabla (req, res, next) {
        const input = req.body
        const id = +req.params.id

        Blabla.update(input, {
            where: {
                id: id
            },
            returning: true
        })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    data : data[1][0]
                })
            } else {
                throw { message: 'data not found' }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteBlabla (req, res, next) {
        let id = +req.params.id
        // console.log(id)
        Blabla.destroy({
            where: {
                id : id
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'data has been deleted!'
            })
        })
        .catch(err  => {
            next(err)
        })
    }

}


module.exports = BlablaController