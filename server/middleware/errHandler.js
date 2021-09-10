function errHandler(err, req, res, next) {
  let statusCode
  let error = []
  switch (err.name) {
      case "JsonWebTokenError":
          statusCode = 400
          error.push("acces token error or invalid token")
          break;
      case "token error":
          statusCode = 400
          error.push("acces token error or invalid token")
          break;
      case "auth error":
          statusCode = 401
          error.push("User not found")
          break;
      case "not found":
          statusCode = 404
          error.push("Data not found")
          break;
      case "login failed":
          statusCode = 400
          error.push("Email or Password Incorrect")
          break;
      case "SequelizeValidationError":
          statusCode = 400
          error = err.errors ? err.errors.map(el => el.message) : []
          break;
      default:
          statusCode = 500
          error.push("internal server error")
          break;
  }

  res.status(statusCode).json({error})
}

module.exports = errHandler