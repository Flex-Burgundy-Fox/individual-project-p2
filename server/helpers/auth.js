const { User, Recipe } = require("../models");
const { checkToken } = require("./jwt");

function authentication(req, res, next) {
	if (!req.headers.access_token) {
		next({ name: "Missing JWT" });
	}
	let token = req.headers.access_token;
	try {
		let payload = checkToken(token);
		User.findByPk(+payload.id)
			.then((result) => {
				if (!result) throw { name: "JWT Invalid" };
				req.currentUser = {
					id: result.id,
					email: result.email,
				};
				next();
			})
			.catch((err) => {
				throw err;
			});
	} catch (err) {
		next(err);
	}
}

function authorization(req, res, next) {
	Recipe.findOne({
		where: {
			id: +req.params.recipeId
		}
	})
		.then((result) => {
			if (!result) next({ name: "Recipe Not Found" });
			if (result.userId === req.currentUser.id) next();
			else next({ name: "User not authorized" });
		})
		.catch((err) => {
			next(err);
		});
}

module.exports = { authentication, authorization };
