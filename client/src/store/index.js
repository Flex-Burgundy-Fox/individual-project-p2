require('dotenv').config()
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = "https://individual-project-p2-production.up.railway.app/"

Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		mealDB_recipes: [],
		gourmetTavern_recipes: [],
		token: '',
		userData: {
			name: '',
			email: '',
			status: '',
		},
		userRecipes: {
			originalRecipes: [],
			purchasedRecipes: []
		},
	},
	mutations: {
		SET_MEALDB(state, payload) {
			state.mealDB_recipes = payload
		},
		SET_GOURMETTAVERN(state, payload) {
			state.gourmetTavern_recipes = payload
		},
		SET_TOKEN(state, payload) {
			state.token = payload
		},
		SET_USERDATA(state, payload) {
			state.userData.name = payload.name
			state.userData.email = payload.email
			state.userData.status = payload.status
		},
		SET_ORIGINALRECIPES(state, payload) {
			state.userRecipes.originalRecipes = payload
		},
		SET_PURCHASEDRECIPES(state, payload) {
			state.userRecipes.purchasedRecipes = payload
		},
	},
	actions: {
		createPayment(context, payload) {
			if (!context.state.token) {
				Vue.toasted.info('Please Login First', {
					icon: 'info',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						},
					},
					duration: 5000
				})
			} else {
				axios({
					method: 'post',
					url: 'createPaymentToken',
					data: payload,
					headers: { access_token: context.state.token }
				})
					.then(({ data }) => {
						// console.log(data);

						snap.pay(data.transaction.token, {
							// Optional
							onSuccess: function (result) {
								// GA PERNAH MASUK>??

								/* You may add your own js here, this is just example */
								// document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
								console.log('success');
								console.log(result);
							},
							// Optional
							onPending: function (result) {
								/* You may add your own js here, this is just example */
								// document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);

								// console.log(result);
								const { order_id, transaction_status } = result
								console.log(order_id, transaction_status);
								axios({
									method: 'post',
									url: 'createTransaction',
									data: {
										order_id: order_id,
										transaction_status: transaction_status
									},
									headers: { access_token: context.state.token }
								})
									.then((result) => {
										console.log(result);
										router.push('/profile/purchased')
									}).catch((err) => {
										console.log(err);
									});
							},
							// Optional
							onError: function (result) {
								// GA PERNAH MASUK>??

								/* You may add your own js here, this is just example */
								// document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
								console.log('error');

								console.log(result);
							}
						})
					})
					.catch(err => console.log(err))
			}
		},

		updatePayment(context, payload) {
			return axios({
				method: 'patch',
				url: 'transactions/' + payload.transactionId,
				headers: { access_token: context.state.token }
			})
		},

		login(context, payload) {
			return axios({
				method: 'post',
				url: 'users/login',
				data: payload
			})
		},

		loginGoogle(context, payload) {
			return axios({
				method: "POST",
				url: `users/login-google`,
				data: {
					token: payload.token
				},
			})
		},

		register(context, payload) {
			axios({
				method: 'post',
				url: 'users/register',
				data: payload
			})
				.then((result) => {
					// console.log(result);
					Vue.toasted.success('Account Created', {
						icon: 'check',
						action: {
							text: 'Close',
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						duration: 3000
					})
				}).catch((err) => {
					console.log(err.response);
				});
		},

		fetchUserData(context, payload) {

			axios({
				method: 'get',
				url: 'users/userData',
				headers: payload
			})
				.then(({ data }) => {
					context.commit('SET_USERDATA', data)
				}).catch((err) => {
					console.log(err.response);
				});
		},

		seedMealDB({ commit }, payload) {
			let mealDB_A =
				axios({
					method: 'get',
					url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
				});
			let mealDB_B =
				axios({
					method: 'get',
					url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=b',
				});
			let mealDB_C =
				axios({
					method: 'get',
					url: 'https://www.themealdb.com/api/json/v1/1/search.php?f=c',
				});

			Promise.all([mealDB_A, mealDB_B, mealDB_C])
				.then((result) => {
					let output = []
					result.forEach(el => {
						// console.log(el.data.meals.slice(0,3));
						output.push(...el.data.meals.slice(0, 3))
					})
					commit('SET_MEALDB', output)
				}).catch((err) => {
					console.log(err);
				});
		},

		seedGourmetTavern({ commit }, payload) {

			axios({
				method: 'get',
				url: 'recipes'
			})
				.then(({ data }) => {
					commit('SET_GOURMETTAVERN', data)
				}).catch((err) => {
					console.log(err);
				});
		},

		fetchMealDB_recipe(context, payload) {
			return axios({
				method: 'get',
				url: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + payload.mealDB_id,
			});
		},

		fetchRecipeDetail(context, payload) {

			return axios({
				method: 'get',
				url: 'recipeDetail/' + payload.recipeId,
				headers: { access_token: context.state.token },
			});
		},

		postRecipe(context, payload) {
			axios({
				method: 'post',
				url: 'newRecipe',
				headers: { access_token: context.state.token },
				data: payload,
			})
				.then(({ data }) => {
					Vue.toasted.success('Recipe Created', {
						icon: 'check',
						action: {
							text: 'Close',
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						duration: 3000
					})
					router.push('/addRecipe/components/' + data.id)
					// context.commit('SET_USERDATA', data)
				}).catch((err) => {
					console.log(err);
				});
		},

		addComponents(context, payload) {
			axios({
				method: 'post',
				url: '/newRecipe/components/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: {
					ingredients: payload.ingredients,
					tools: payload.tools,
				},
			})
				.then((result) => {
					console.log(result);
					Vue.toasted.success('Ingredietns / Tools Created', {
						icon: 'check',
						action: {
							text: 'Close',
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						duration: 3000
					})
					router.push('/addRecipe/methods/' + payload.recipeId)
				}).catch((err) => {
					console.log(err);
				});
		},

		postMethod(context, payload) {
			return axios({
				method: 'post',
				url: 'newRecipe/methods/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: payload.data,
			})
		},

		editComponents(context, payload) {
			axios({
				method: 'put',
				url: '/editRecipe/components/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: {
					ingredients: payload.ingredients,
					tools: payload.tools,
				},
			})
				.then(({ data }) => {
					console.log(data);
					//toasted succ
				}).catch((err) => {
					console.log(err);
				});
		},

		patchStatusRecipe(context, payload) {
			return axios({
				method: 'patch',
				url: 'newRecipe/publish/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: { status: payload.status }
			})
		},

		fetchUserRecipe(context, payload) {
			axios({
				method: 'get',
				url: 'myProfile/recipes',
				headers: { access_token: context.state.token },
			})
				.then(({ data }) => {
					context.commit('SET_ORIGINALRECIPES', data)
				}).catch((err) => {

					console.log(err);
				});
		},

		fetchPurchasedRecipe(context, payload) {
			// console.log('disini');
			axios({
				method: 'get',
				url: 'transactions',
				headers: { access_token: context.state.token },
			})
				.then(({ data }) => {
					context.commit('SET_PURCHASEDRECIPES', data)
					context.state.userRecipes.purchasedRecipes.forEach(transaction => {
						if (transaction.status === 'pending') {
							context.dispatch('updatePayment', { transactionId: transaction.id })
								.then(({ data }) => {
									if (data.message === 'Transaction succesfully updated') {
										// toasted transaction complete, thank you for your purchase
										axios({
											method: 'get',
											url: 'transactions',
											headers: { access_token: context.state.token },
										})
											.then(({ data }) => {
												context.commit('SET_PURCHASEDRECIPES', data)


											}).catch((err) => {
												console.log(err);
											});
									} else {
										// toasted please complete your purchase
									}
								}).catch((err) => {
									console.log(err);
								});
						}
					});
				}).catch((err) => {
					console.log(err);
				});

		},

		editRecipe(context, payload) {
			axios({
				method: 'put',
				url: 'editRecipe/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: payload.recipe
			})
				.then(({ data }) => {
					console.log(data);
					//toasted edit berhasil data.message
				}).catch((err) => {
					console.log(err);
				});
		},

		destroyMethod(context, payload) {
			return axios({
				method: 'delete',
				url: 'destroyMethod/' + payload.recipeId,
				headers: { access_token: context.state.token },
				data: { methodId: payload.methodId }
			})

		},

		searchMealDB(context, payload) {
			return axios({
				method: 'get',
				url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + payload.search
			})

		},

		searchGourmetTavern(context, payload) {
			return axios({
				method: 'get',
				url: '/search?search=' + payload.search
			})
		}

	},
	modules: {
	}
})
