const router = require('express').Router()

const UserController = require('../controllers/UserController')
const BlablaController = require('../controllers/BlablaController')

const { authentication, authorization } = require('../middlewares/Auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login-google', UserController.googleLogin)
router.use(authentication)
router.get('/blablas', BlablaController.showBlablas)
router.post('/blablas', BlablaController.createBlabla)
router.get('/blablas/:id', authorization, BlablaController.getEditBlabla)
router.put('/blablas/:id', authorization, BlablaController.editBlabla)
router.delete('/blablas/:id', authorization, BlablaController.deleteBlabla)



module.exports = router