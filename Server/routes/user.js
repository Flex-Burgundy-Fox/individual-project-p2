const router = require("express").Router()

const userControllers = require("../controllers/user")

router.post("/register", userControllers.register)
router.post("/login", userControllers.login)
// google sign-in
router.post("/google-login", userControllers.googleLogin)
router.get("/", userControllers.getNewRoleUser)

module.exports = router
