const router = require("express").Router();
const ControllerUser = require("../controllers/users.js");
const ControllerRecipe = require("../controllers/recipes.js");
const ControllerTransaction = require("../controllers/transactions.js");
const { authentication, authorization, recipeGuard } = require("../helpers/auth.js");

router.post("/users/register", ControllerUser.register);
router.post("/users/login", ControllerUser.login);
router.post("/users/login-google", ControllerUser.googleLogin);
router.get("/recipes", ControllerRecipe.viewRecipes);
router.get('/search?', ControllerRecipe.searchRecipe)

router.use(authentication);

router.get("/users/userData", ControllerUser.fetchUserData);
router.get("/myProfile/recipes", ControllerRecipe.viewMyRecipes);
router.get("/recipeDetail/:recipeId", recipeGuard, ControllerRecipe.recipeDetail);
router.post("/newRecipe", ControllerRecipe.addRecipe);
router.post("/newRecipe/components/:recipeId", authorization, ControllerRecipe.addComponent);
router.post("/newRecipe/methods/:recipeId", authorization, ControllerRecipe.addMethod);
router.patch("/newRecipe/publish/:recipeId", authorization, ControllerRecipe.publishRecipe);
router.put("/editRecipe/:recipeId", authorization, ControllerRecipe.editRecipe);
router.put("/editRecipe/components/:recipeId", authorization, ControllerRecipe.editComponent);
router.delete("/destroyMethod/:recipeId", authorization, ControllerRecipe.destroyMethod);

router.post('/createPaymentToken', ControllerTransaction.createPaymentToken)
router.post('/createTransaction', ControllerTransaction.createTransaction)
router.get('/transactions', ControllerTransaction.viewTransactions)
router.patch('/transactions/:transactionId', authorization, ControllerTransaction.updateTransactions)

// router.put("/editRecipe/methods/:methodId", authorization, ControllerRecipe.editMethod);
// router.delete("/recipes/:recipeId", authorization, ControllerRecipe.destroy);

module.exports = router;
