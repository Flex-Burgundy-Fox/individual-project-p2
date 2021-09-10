const router = require("express").Router()

const userRoutes = require("./user")
const favoriteMovieRoutes = require("./favoriteMovies")
const billRoutes = require("./bill")
const { authentification } = require("../middlewares/auth")

router.use("/users", userRoutes)

router.use(authentification)

router.use("/favoriteMovies", favoriteMovieRoutes)

router.use("/bills", billRoutes)

module.exports = router
