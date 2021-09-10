const Covid = require('../Controller/index')
const UserC = require('../Controller/User')
const { Authentication } = require('../middleware/auth')
const router = require('express').Router()



router.post('/users/login', UserC.login)
router.post('/users/login-google', UserC.googleLogin)
router.post('/users/register', UserC.register)
router.get('/covids/weekly', Covid.getWeekly)
router.get('/covids/covid-news', Covid.getCovidNews)
router.use(Authentication)
router.get('/covids/prov', Covid.getDataProv)
router.get('/news-category/:cat', Covid.getCatNews)

module.exports = router
