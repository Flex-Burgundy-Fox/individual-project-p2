const { Op } = require("sequelize");
const { Recipe, Component, Method, User } = require("../models");

class Controller {
	static addRecipe(req, res, next) {
		let input = {
			name: req.body.name || null,
			timeReq: req.body.timeReq || null,
			servings: req.body.servings || null,
			summary: req.body.summary || null,
			imageUrl: req.body.imageUrl || null,
			category: req.body.category || null,
			status: req.body.status || null,
			price: req.body.price || 0,
			userId: req.currentUser.id || null,
		};
		Recipe.create(input)
			.then((result) => {
				res.status(201).json(result);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	}

	static addComponent(req, res, next) {
		// console.log(req.body);
		// res.send(req.body)
		let input = {
			ingredients: req.body.ingredients ? JSON.stringify(req.body.ingredients) : null,
			tools: req.body.tools ? JSON.stringify(req.body.tools) : null,
			recipeId: req.params.recipeId || null,
		};
		Component.create(input)
			.then((result) => {
				result.ingredients = JSON.parse(result.ingredients)
				result.tools = JSON.parse(result.tools)
				res.status(201).json(result);
			})
			.catch((err) => {
				// console.log(err);
				next(err);
			});
	}

	static addMethod(req, res, next) {
		let input = {
			title: req.body.title || null,
			description: req.body.description || null,
			imageUrl: req.body.imageUrl || null,
			recipeId: req.params.recipeId || null,
		};
		Method.create(input)
			.then((result) => {
				res.status(201).json(result);
			})
			.catch((err) => {
				next(err);
			});
	}

	static viewRecipes(req, res, next) {
		Recipe.findAll({
			where: {
				status : 'published'
			},
			order: [['createdAt', 'DESC']],
		})
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				next(err);
			});
	}

	static viewMyRecipes(req, res, next) {
		Recipe.findAll({
			where: {
				userId: req.currentUser.id
			},
			order: [['createdAt', 'DESC']]
		})
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				next(err);
			});
	}

	static recipeDetail(req, res, next) {
		Recipe.findOne({
			where: {
				id: req.params.recipeId
			},
			include: [ Component, Method, 
				{ 
					model: User, 
					attributes : ['name', 'status'],
					include: [{
						model : Recipe , 
						attributes : ['id']
					}]
				}
			]
		})
			.then((result) => {
				if(!result) next({ name: "Recipe Not Found" });
				let restrict = {
					id: result.id,
					name: result.name,
					timeReq: result.timeReq,
					servings: result.servings,
					summary: result.summary,
					imageUrl: result.imageUrl,
					status: result.status,
					category: result.category,
					price: result.price,
					userId: result.userId,
					createdAt: result.createdAt,
					updatedAt: result.updatedAt,
					User : result.User
				}
				if(req.restrict){
					res.status(200).json(restrict);
				}else res.status(200).json(result);
			})
			.catch((err) => {
				next(err);
			});
	}

	static editRecipe(req, res, next) {
		let input = {
			name: req.body.name || null,
			timeReq: req.body.timeReq || null,
			servings: req.body.servings || null,
			summary: req.body.summary || null,
			imageUrl: req.body.imageUrl || null,
			category: req.body.category || null,
			status: req.body.status || null,
			price: req.body.price || 0,
			userId: req.currentUser.id || null,
		};

		Recipe.update(input, {
			where: {
				id: +req.params.recipeId,
			},
		})
			.then((result) => {
				if (result[0]) res.status(200).json({
					message : 'Recipe succesfully edited'
				});
				else next({ name: "Recipe Not Found" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static editComponent(req, res, next) {
		let input = {
			ingredients: req.body.ingredients ? JSON.stringify(req.body.ingredients) : null,
			tools: req.body.tools ? JSON.stringify(req.body.tools) : null,
		};
		Component.update(input, {
			where: {
				recipeId: +req.params.recipeId,
			},
		})
			.then((result) => {
				if (result[0]) res.status(200).json({
					message : 'Component succesfully edited'
				});
				else next({ name: "Recipe Not Found" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static editMethod(req, res, next) {
		let input = {
			title: req.body.title || null,
			description: req.body.description || null,
			imageUrl: req.body.imageUrl || null,
		};

		Method.update(input, {
			where: {
				id: +req.params.methodId,
			},
			returning: true,
		})
			.then((result) => {
				if (result[0]) res.status(200).json(result[1]);
				else next({ name: "Recipe Not Found" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static publishRecipe(req, res, next){
		let input = {
			status: req.body.status,
		};

		Recipe.update(input, {
			where: {
				id: +req.params.recipeId,
			},
		})
			.then((result) => {
				if (result[0]) res.status(200).json({
					message : 'Recipe succesfully published'
				});
				else next({ name: "Recipe Not Found" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static destroyMethod(req, res, next){
		Method.destroy({
			where: {
				id: +req.body.methodId,
			},
		})
			.then((result) => {
				res.status(200).json({ message: "Method Successfully Deleted" });
			})
			.catch((err) => {
				next(err);
			});
	}

	static searchRecipe(req, res, next){
		Recipe.findAll({
			where : {
				name : {
					[Op.iLike]: '%' + req.query.search + '%'
				},
				status : 'published'
			}
		})
		.then((result) => {
			res.status(200).json(result)
		}).catch((err) => {
			next(err);
		});
	}

	// static destroy(req, res, next) {

	// 	const recipe = Recipe.destroy({
	// 		where: {
	// 			id: +req.params.recipeId,
	// 		},
	// 	})

	// 	const component = Component.destroy({
	// 		where: {
	// 			recipeId: +req.params.recipeId,
	// 		},
	// 	})

	// 	const method = Method.destroy({
	// 		where: {
	// 			recipeId: +req.params.recipeId,
	// 		},
	// 	})

	// 	Promise.all([recipe, component, method])
	// 		.then((result) => {
	// 			res.status(200).json({ message: "Recipe Successfully Deleted" });
	// 		})
	// 		.catch((err) => {
	// 			next(err);
	// 		});
	// }

	// static continueTask(req, res, next) {
	// 	let input = {
	// 		category: req.body.category || null,
	// 	};

	// 	Task.update(input, {
	// 		where: {
	// 			id: +req.params.taskId,
	// 		},
	// 		returning: true,
	// 	})
	// 		.then((result) => {
	// 			if (result[0]) res.status(200).json(result[1]);
	// 			else next({ name: "Task Not Found" });
	// 		})
	// 		.catch((err) => {
	// 			next(err);
	// 		});
	// }
}

module.exports = Controller;
