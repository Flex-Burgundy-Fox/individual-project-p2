function errorHandler(err, req, res, next) {
   let statusCode
   let error_messages = []

   switch (err.name) {
      case "Access token missing":
         statusCode = 404
         error_messages.push("Access token not found")
         break
      case "Unauthenticated":
         statusCode = 401
         error_messages.push("User not found")
         break
      case "NotFound":
         statusCode = 404
         error_messages.push("Product not found")
         break
      case "Unauthorized":
         statusCode = 401
         error_messages.push("Unauthorized access")
         break
      case "LoginFailed":
         statusCode = 400
         error_messages.push(
            "The username and password you entered did not match our records. Please double-check and try again"
         )
         break
      case "Invalid input":
         statusCode = 400
         error_messages.push(
            "The maximum quantity purchased is equal to stock and the minimum is equal to one"
         )
         break
      case "SequelizeValidationError":
         statusCode = 400
         error_messages = err.errors ? err.errors.map((el) => el.message) : []
         break
      case "SequelizeUniqueConstraintError":
         statusCode = 400
         error_messages = err.errors ? err.errors.map((el) => el.message) : []
         break
      default:
         statusCode = 500
         error_messages.push("Internal server error")
         break
   }

   res.status(statusCode).json({ error_messages })
}

module.exports = errorHandler
