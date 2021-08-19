module.exports = (err, req, res, next) => {
	// let statusCode;
	// let errors = [];

	// switch (err.name) {
	// 	case "JWT Invalid":
	// 		statusCode = 401;
	// 		errors.push(err.name);
	// 		break;
	// 	case "Missing JWT":
	// 		statusCode = 401;
	// 		errors.push(err.name);
	// 		break;
	// 	case "Task Not Found":
	// 		statusCode = 404;
	// 		errors.push(err.name);
	// 		break;
	// 	case "User not authorized":
	// 		statusCode = 403;
	// 		errors.push("Access Invalid");
	// 		break;
	// 	case "Username or Password is wrong":
	// 		statusCode = 400;
	// 		errors.push(err.name);
	// 		break;
	// 	case "SequelizeValidationError":
	// 		statusCode = 400;
	// 		errors.push(err.errors);
	// 		break;

	// 	default:
	// 		statusCode = 500;
	// 		errors.push("Internal Server Error");
	// 		break;
	// }

	// res.status(statusCode).json({ errors });
	res.status(500).json({ err });
};
