const router = require("express").Router()

const favoriteMovieControllers = require("../controllers/favoriteMovies")

router.get("/", favoriteMovieControllers.checkFavMovie)
router.post("/", favoriteMovieControllers.addFavMovie)
router.get("/showFavMovie", favoriteMovieControllers.showFavMovie)
router.delete("/:MovieId", favoriteMovieControllers.cancelFavMovie)

module.exports = router
