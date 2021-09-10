const { User, Recipe, Transaction } = require("../models");
const { checkToken } = require("./jwt");

function authentication(req, res, next) {
	if(req.path.includes('/recipeDetail/') && !req.headers.access_token ) {
		next()
	}
	else if (!req.headers.access_token) {
		// else next({ name: "Missing JWT" });
		next({ name: "Missing JWT" });
	}else{
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
}

function authorization(req, res, next) {

	if(req.params.recipeId){

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
	
	else if(req.params.transactionId){
		Transaction.findOne({
			where: {
				id: +req.params.transactionId
			}
		})
			.then((result) => {
				if (!result) next({ name: "Transaction Not Found" });
				if (result.userId === req.currentUser.id) {
					req.transactionData = result
					next();
				} 
				else next({ name: "User not authorized" });
			})
			.catch((err) => {
				next(err);
			});
	}
}

function recipeGuard(req, res, next){
	Recipe.findOne({
		where: {
			id: req.params.recipeId
		}
	})
	.then((result) => {
		if (!result) next({ name: "Recipe Not Found" });

		req.restrict = false
		if(result.status && result.category === 'public'){
			next()
		} 
		else if(!req.currentUser && result.status){
			req.restrict = true
			next()
		}
		else if(result.userId === req.currentUser.id) {
			next(); //recipeOwner
		}
		else if(result.category === 'private') {

			Transaction.findOne({
				where : {
					userId : req.currentUser.id,
					recipeId : req.params.recipeId
				}
			})
			.then((result) => {
				if(!result || result.status === 'pending') {
					req.restrict = true
					next()
				}else{
					next()
				}
				
			}).catch((err) => {
				next(err)
			});
		} 
		else if(!result.status){
			next ({ name: "Recipe Not Found" });
		}
		else if(result.category === 'public'){
			next()
		}		
	}).catch((err) => {
		next(err)
	});
}

module.exports = { authentication, authorization, recipeGuard };
