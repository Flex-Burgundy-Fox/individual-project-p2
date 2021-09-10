const { FavoriteMovie } = require("../models")

class FavoriteMovieControllers {
   static checkFavMovie(req, res, next) {
      FavoriteMovie.findOne({
         where: {
            MovieId: req.headers.movieid,
            UserId: req.headers.userid
         }
      })
         .then((favMovie) => {
            if (favMovie.MovieId == req.headers.movieid) {
               res.status(200).json({ message: true })
            } else {
               res.status(404).json({ message: false })
            }
         })
         .catch((err) => next(err))
   }

   static showFavMovie(req, res, next) {
      FavoriteMovie.findAll({
         where: {
            UserId: req.currentUser.id
         }
      })
         .then((data) => res.status(200).json({ data }))
         .catch((err) => next(err))
   }

   static addFavMovie(req, res, next) {
      FavoriteMovie.create({
         MovieId: req.body.MovieId,
         UserId: req.body.UserId
      })
         .then((data) => res.status(201).json({ data }))
         .catch((err) => next(err))
   }

   static cancelFavMovie(req, res, next) {
      FavoriteMovie.destroy({
         where: { MovieId: req.params.MovieId, UserId: req.headers.userid },
         returning: true
      })
         .then((favMovie) => {
            if (favMovie) {
               return res.status(200).json({
                  success_message: "Cancel favorite movie successfully"
               })
            } else {
               return next({ name: "NotFound" })
            }
         })
         .catch((err) => next(err))
   }
}

module.exports = FavoriteMovieControllers
